'use strict';

// Entry point-ul Lambda: `feed-audit/lambda-entry.handler` (zip cu feed-audit/
// la rădăcină + node_modules; handlerul de bază din index.js rămâne curat și
// testabil fără Lambda, cu dependențe injectabile).
//
// Acest fișier face WIRE-UL DE DEPLOY (până acum trăia doar în /tmp/feed-audit-deploy
// — pierdut la reboot; de aceea e în git de acum):
//
//   1. RATE-LIMITER → Valkey AWS (ElastiCache) — aceeași instanță pe care o
//      folosește aplicația principală (ECS caty-api, src/services/redis.js),
//      prin secretul dedicat `caty/production/ELASTICACHE_REDIS_URL`.
//      FIX-ul principal: fără store partajat, limita 3 audite/zi/IP trăia în
//      memoria containerului → orice cold start o reseta → limita ocolibilă.
//      Degradare FAIL-CLOSED: dacă Valkey e indisponibil sau secretul lipsește,
//      POST /api/feed-audit răspunde 503 „retry later" (unavailableStore) —
//      NICIODATă fallback silențios pe memorie. GET status nu trece prin
//      store și rămâne funcțional.
//   2. MongoDB (best-effort): telemetrie în `feed_audits` + comparator
//      read-only pe `retail_product_offers` (contract fabrică: doar citiri,
//      zero scrieri). MONGODB_URI din secretul JSON `caty/production`.
//      Dacă Mongo nu e disponibil, handlerul rulează fără ele — telemetria
//      sare onest cu log (createTelemetry fără colecție), comparatorul
//      rămâne {skipped:true}; limiterul NU depinde de Mongo.
//
// Secretele pot fi suprascrise direct din env-ul Lambda (ELASTICACHE_REDIS_URL /
// MONGODB_URI) — Secrets Manager e sursa canonică, env-ul e scurtătură pentru
// debugging. Inițializarea e memoizată la nivel de modul (un singur client de
// fiecare per execution environment).

const { createHandler } = require('./index');
const { redisStore, guardedStore, unavailableStore } = require('./rate-limit');
const { createGoldenRecordsLookup } = require('./db-adapter');

const REDIS_SECRET_ID = process.env.REDIS_SECRET_ID || 'caty/production/ELASTICACHE_REDIS_URL';
const MONGO_SECRET_ID = process.env.MONGO_SECRET_ID || 'caty/production';
const REDIS_COMMAND_TIMEOUT_MS = Number(process.env.REDIS_COMMAND_TIMEOUT_MS || 10000);
const MONGO_SELECTION_TIMEOUT_MS = Number(process.env.MONGO_SELECTION_TIMEOUT_MS || 5000);

let secretsClient = null;
function getSecretsClient() {
  if (!secretsClient) {
    // v3 SDK — NU e inclus în runtime-ul nodejs20.x; trebuie bundled în zip.
    const { SecretsManagerClient } = require('@aws-sdk/client-secrets-manager');
    secretsClient = new SecretsManagerClient({
      region: process.env.AWS_REGION || 'eu-central-1',
    });
  }
  return secretsClient;
}

// Secret dedicat: valoarea string e direct URL-ul (rediss://...:6379).
async function readRedisUrlFromSecrets() {
  const { GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
  const res = await getSecretsClient().send(new GetSecretValueCommand({ SecretId: REDIS_SECRET_ID }));
  if (!res.SecretString || !res.SecretString.startsWith('redis')) {
    throw new Error(`secretul ${REDIS_SECRET_ID} nu arată ca un URL redis`);
  }
  return res.SecretString.trim();
}

// Secret JSON: câmpul MONGODB_URI.
async function readMongoUriFromSecrets() {
  const { GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
  const res = await getSecretsClient().send(new GetSecretValueCommand({ SecretId: MONGO_SECRET_ID }));
  const parsed = JSON.parse(res.SecretString || '{}');
  if (!parsed.MONGODB_URI) throw new Error(`secretul ${MONGO_SECRET_ID} nu are câmpul MONGODB_URI`);
  return parsed.MONGODB_URI;
}

// ioredis cu aceleași opțiuni ca src/services/redis.js din caty-api
// (lazyConnect + commandTimeout + retryStrategy + listener 'error' — fără
// listener, un 'error' event neascultat ar crăpa procesul Lambda).
function buildRedisStore(redisUrl, logger) {
  const Redis = require('ioredis');
  const client = new Redis(redisUrl, {
    lazyConnect: true, // conectare la prima comandă, nu la import
    commandTimeout: REDIS_COMMAND_TIMEOUT_MS,
    retryStrategy: (times) => Math.min(times * 200, 5000),
  });
  client.on('error', (err) => {
    logger.warn(`[feed-audit] Valkey error: ${err.message}`);
  });
  return redisStore({ client });
}

// Mongo best-effort: null la orice eșec — limiterul nu depinde de el.
async function buildMongoDeps(mongoUri, logger) {
  const { MongoClient } = require('mongodb');
  const mongo = new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: MONGO_SELECTION_TIMEOUT_MS,
    maxPoolSize: 2,
  });
  await mongo.connect();
  const db = mongo.db();
  logger.log('[feed-audit] Mongo conectat — telemetrie feed_audits + comparator retail_product_offers active');
  return {
    collection: db.collection('feed_audits'),
    lookupGtins: createGoldenRecordsLookup({ collection: db.collection('retail_product_offers') }),
  };
}

async function initDeps(logger = console) {
  const deps = {};

  // 1) Store limiter — OBLIGATORIU. Orice eșec → unavailableStore (fail-closed 503).
  let redisUrl = process.env.ELASTICACHE_REDIS_URL || null;
  if (!redisUrl) {
    try {
      redisUrl = await readRedisUrlFromSecrets();
    } catch (err) {
      logger.error(`[feed-audit] NU am putut citi secretul ${REDIS_SECRET_ID}: ${err.message} — limiterul e fail-closed (POST → 503) până se rezolvă`);
    }
  }
  deps.store = redisUrl
    ? guardedStore({ store: buildRedisStore(redisUrl, logger), logger })
    : unavailableStore();

  // 2) Mongo — best-effort, niciodată fatal pentru handler.
  let mongoUri = process.env.MONGODB_URI || null;
  if (!mongoUri) {
    try {
      mongoUri = await readMongoUriFromSecrets();
    } catch (err) {
      logger.warn(`[feed-audit] secretul ${MONGO_SECRET_ID} indisponibil (${err.message}) — rulez fără telemetrie/comparator`);
    }
  }
  if (mongoUri) {
    try {
      Object.assign(deps, await buildMongoDeps(mongoUri, logger));
    } catch (err) {
      logger.warn(`[feed-audit] Mongo indisponibil (${err.message}) — rulez fără telemetrie/comparator; limiterul Valkey nu e afectat`);
    }
  }

  return deps;
}

// Memoizare per execution environment: un singur init, un singur handler.
let handlerPromise = null;
function getHandler(logger = console) {
  if (!handlerPromise) {
    handlerPromise = initDeps(logger)
      .then((deps) => createHandler(deps))
      .catch((err) => {
        // ultima linie de apărare: nici măcar initul nu a mers → handler
        // fail-closed pe limiter, restul funcțional (GET status inclus).
        logger.error(`[feed-audit] init eșuat complet (${err.message}) — handler fail-closed pe limiter`);
        return createHandler({ store: unavailableStore() });
      });
  }
  return handlerPromise;
}

// Semnătura pe care o invochează AWS Lambda.
async function handler(event, context) {
  const h = await getHandler();
  return h(event, context);
}

module.exports = { handler, getHandler, initDeps };
