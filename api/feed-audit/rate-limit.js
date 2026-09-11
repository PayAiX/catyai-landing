'use strict';

// C7 — rate-limit anti-abuz, obligatoriu la lansare (SPEC §0, §8.4). Token
// counter + lock per domeniu cu STORE INJECTABIL: memoryStore() pentru
// local/test, redisStore({client}) thin wrapper ioredis-like la deploy
// (Valkey — NU Upstash, lecția din spec; fallback mort).
//
// Limite (default): 3 audite/zi/IP · 1 job concurent/domeniu · cap global 500/zi.
// Turnstile (gratis) la uz repetat: dacă TURNSTILE_SECRET e configurat și IP-ul
// a depășit limita, se cere token x-turnstile-token (verificarea reală la deploy).
//
// FIX limiter shared (2026-09-11): cheile poartă prefix `feed_audit:rl:` + data
// UTC, iar IP-ul e hash-uit sha256 (zero IP-uri brute în Valkey). Contoarele
// zilnice au TTL 48h — supraviețuiesc trecerii de zi fără garbage permanent.
// Regula de degradare e FAIL-CLOSED: dacă store-ul e indisponibil, crearea de
// audit nou e refuzată cu 503 (guardedStore/unavailableStore), nu cu un
// fallback per-container în memorie (cold start = limiter ocolit — bugul fixat).

const crypto = require('crypto');

class RateLimitError extends Error {
  constructor(message, retryAfterSec, { turnstileRequired = false } = {}) {
    super(message);
    this.name = 'RateLimitError';
    this.statusCode = 429;
    this.retryAfterSec = Math.max(1, Math.ceil(retryAfterSec));
    this.turnstileRequired = turnstileRequired;
  }
}

// Eroare de indisponibilitate a store-ului (Valkey down / secret lipsă).
// statusCode 503 — handlerul răspunde „retry later", NU acceptă auditul.
class StoreUnavailableError extends Error {
  constructor(message = 'Serviciul de limitare e temporar indisponibil. Reîncearcă în câteva secunde.', retryAfterSec = 5) {
    super(message);
    this.name = 'StoreUnavailableError';
    this.statusCode = 503;
    this.retryAfterSec = Math.max(1, Math.ceil(retryAfterSec));
  }
}

// ---------------------------------------------------------------------------
// Chei limiter: `feed_audit:rl:<scope>...` cu dată UTC; IP hash-uit sha256
// (fără IP-uri brute în store-ul partajat).
function hashIp(ip) {
  return crypto.createHash('sha256').update(String(ip)).digest('hex');
}

function ipCounterKey(ip, date = dayKey()) {
  return `feed_audit:rl:ip:${date}:${hashIp(ip)}`;
}

function ipTurnstileKey(ip) {
  return `feed_audit:rl:ts:${hashIp(ip)}`;
}

function globalCounterKey(date = dayKey()) {
  return `feed_audit:rl:global:${date}`;
}

function domainLockKey(domain) {
  return `feed_audit:rl:lock:domain:${domain}`;
}

function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10); // yyyy-mm-dd (UTC)
}

function secondsUntilUtcMidnight(now = new Date()) {
  const midnight = new Date(now);
  midnight.setUTCHours(24, 0, 0, 0);
  return Math.max(1, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

// ---------------------------------------------------------------------------
// Store în memorie (local/test). Interfață: incr(key, ttlSec), get(key),
// setIfAbsent(key, value, ttlSec), delIfMatch(key, value).
function memoryStore() {
  const map = new Map(); // key → { value, expiresAt }
  const alive = (e) => e && e.expiresAt > Date.now();
  function sweep() {
    const now = Date.now();
    for (const [k, e] of map) {
      if (e.expiresAt <= now) map.delete(k);
    }
  }
  return {
    async incr(key, ttlSec) {
      sweep();
      const e = map.get(key);
      if (!alive(e)) {
        map.set(key, { value: 1, expiresAt: Date.now() + ttlSec * 1000 });
        return 1;
      }
      e.value += 1;
      return e.value;
    },
    async get(key) {
      sweep();
      const e = map.get(key);
      return alive(e) ? e.value : 0;
    },
    async setIfAbsent(key, value, ttlSec) {
      sweep();
      if (alive(map.get(key))) return false;
      map.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
      return true;
    },
    async delIfMatch(key, value) {
      const e = map.get(key);
      if (alive(e) && e.value === value) {
        map.delete(key);
        return true;
      }
      return false;
    },
  };
}

// Thin wrapper peste un client ioredis-like (Valkey la deploy).
// NU importăm niciun driver — doar wrapping peste interfață.
function redisStore({ client }) {
  if (!client) throw new Error('redisStore: client lipsă');
  return {
    async incr(key, ttlSec) {
      const v = await client.incr(key);
      if (v === 1) await client.expire(key, ttlSec);
      return v;
    },
    async get(key) {
      const v = await client.get(key);
      return v === null || v === undefined ? 0 : Number(v);
    },
    async setIfAbsent(key, value, ttlSec) {
      const r = await client.set(key, value, 'EX', ttlSec, 'NX');
      return r === 'OK';
    },
    // compare-and-delete — evită să eliberăm lock-ul altui job
    async delIfMatch(key, value) {
      const lua = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
      const r = await client.eval(lua, 1, key, String(value));
      return Number(r) === 1;
    },
  };
}

// ---------------------------------------------------------------------------
const DEFAULT_LIMITS = { perIpPerDay: 3, perDomainConcurrent: 1, globalPerDay: 500 };
const IP_TTL_SEC = 48 * 3600; // > 24h: contorul zilei de ieri încă expiră curat
const GLOBAL_TTL_SEC = 48 * 3600;
const DOMAIN_LOCK_TTL_SEC = 3600; // > cel mai lung job observat
const TURNSTILE_FLAG_TTL_SEC = 7 * 24 * 3600; // IP care a depășit: cere token o săptămână

function createRateLimiter({ store, limits = {}, turnstileSecret = process.env.TURNSTILE_SECRET || null, logger = console } = {}) {
  if (!store) throw new Error('createRateLimiter: store lipsă (memoryStore() sau redisStore({client}))');
  const L = { ...DEFAULT_LIMITS, ...limits };
  let warnedNoSecret = false;

  function friendlyIpMessage() {
    return `Ai folosit cele ${L.perIpPerDay} audite gratuite disponibile astăzi. Reîncearcă mâine sau contactează-ne pentru un audit complet al catalogului.`;
  }

  return {
    // 3 audite/zi/IP. La depășire marchează IP-ul pentru Turnstile; dacă secretul
    // e configurat și token-ul lipsește, eroarea cere explicit token.
    async checkIp(ip, { turnstileToken = null } = {}) {
      const key = ipCounterKey(ip);
      const count = await store.incr(key, IP_TTL_SEC);
      if (count <= L.perIpPerDay) return count;
      await store.setIfAbsent(ipTurnstileKey(ip), 1, TURNSTILE_FLAG_TTL_SEC);
      if (turnstileSecret && !turnstileToken) {
        throw new RateLimitError(friendlyIpMessage(), secondsUntilUtcMidnight(), { turnstileRequired: true });
      }
      if (!turnstileSecret && !warnedNoSecret) {
        warnedNoSecret = true;
        logger.warn('[feed-audit] TURNSTILE_SECRET negăsit — Turnstile dezactivat; configură-l la deploy');
      }
      throw new RateLimitError(friendlyIpMessage(), secondsUntilUtcMidnight());
    },

    // cap global /zi — frâna de cost compute (§8.4)
    async checkGlobal() {
      const count = await store.incr(globalCounterKey(), GLOBAL_TTL_SEC);
      if (count > L.globalPerDay) {
        throw new RateLimitError('Am atins limita zilnică globală de audite. Reîncearcă mâine.', secondsUntilUtcMidnight());
      }
      return count;
    },

    // 1 job concurent per domeniu — value = jobId, release doar compare-and-match
    async acquireDomain(domain, jobId) {
      const ok = await store.setIfAbsent(domainLockKey(domain), jobId, DOMAIN_LOCK_TTL_SEC);
      if (!ok) {
        throw new RateLimitError('Pentru acest domeniu rulează deja un audit. Așteaptă finalizarea sau reîncearcă în câteva minute.', DOMAIN_LOCK_TTL_SEC);
      }
      return true;
    },

    async releaseDomain(domain, jobId) {
      try {
        return await store.delIfMatch(domainLockKey(domain), jobId);
      } catch (err) {
        // lock-ul are TTL 1h — o eroare de release nu e fatală
        logger.warn(`[feed-audit] releaseDomain eșuat (${err.message}) — lock-ul expiră singur în 1h`);
        return false;
      }
    },

    // true dacă IP-ul a depășit limita și Turnstile e configurat
    async requiresTurnstile(ip) {
      if (!turnstileSecret) return false;
      return (await store.get(ipTurnstileKey(ip))) > 0;
    },
  };
}

// limiter passthrough pentru local/test fără store — rate-limit dezactivat explicit
function noopLimiter() {
  return {
    checkIp: async () => 1,
    checkGlobal: async () => 1,
    acquireDomain: async () => true,
    releaseDomain: async () => true,
    requiresTurnstile: async () => false,
  };
}

// ---------------------------------------------------------------------------
// FAIL-CLOSED. Wrapper peste orice store: orice eroare a store-ului devine
// StoreUnavailableError (503). Motiv: un fallback silențios pe memoria
// containerului reintroduce exact bugul fixat aici — fiecare cold start
// Lambda resetează contorul și limita 3/zi/IP devine ocolibilă. Mai bine
// refuzi crearea auditului (retry later) decât să lași endpointul neprotejat.
function guardedStore({ store, logger = console } = {}) {
  if (!store) throw new Error('guardedStore: store lipsă');
  let warned = false;
  const guard = (op) => async (...args) => {
    try {
      return await store[op](...args);
    } catch (err) {
      if (!warned) {
        warned = true;
        logger.warn(`[feed-audit] store limiter indisponibil (${err.message}) — POST /api/feed-audit refuzat fail-closed cu 503 până revine store-ul`);
      }
      throw new StoreUnavailableError();
    }
  };
  return {
    incr: guard('incr'),
    get: guard('get'),
    setIfAbsent: guard('setIfAbsent'),
    // releaseDomain e deja într-un try/catch în limiter — păstrăm eroarea
    // originală acolo (lock-ul expiră singur), nu o transformăm în 503.
    delIfMatch: store.delIfMatch ? store.delIfMatch.bind(store) : async () => false,
  };
}

// Store care refuză orice operație — folosit când Valkey NU a putut fi inițializat
// deloc (secret lipsă / VPC fără reachability). POST → 503, GET status rămâne
// servit din Map-ul containerului (nu trece prin store).
function unavailableStore() {
  const boom = async () => {
    throw new StoreUnavailableError();
  };
  return { incr: boom, get: boom, setIfAbsent: boom, delIfMatch: async () => false };
}

module.exports = {
  createRateLimiter,
  memoryStore,
  redisStore,
  guardedStore,
  unavailableStore,
  noopLimiter,
  RateLimitError,
  StoreUnavailableError,
  dayKey,
  secondsUntilUtcMidnight,
  ipCounterKey,
  ipTurnstileKey,
  globalCounterKey,
  domainLockKey,
  hashIp,
  IP_TTL_SEC,
  GLOBAL_TTL_SEC,
  DOMAIN_LOCK_TTL_SEC,
  TURNSTILE_FLAG_TTL_SEC,
  DEFAULT_LIMITS,
};
