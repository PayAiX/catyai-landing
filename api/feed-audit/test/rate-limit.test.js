'use strict';

// C7 — teste rate-limit: contor/IP/zi, lock per domeniu, cap global,
// flag Turnstile, expirare TTL la nivel de store.

const test = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('stream');
const {
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
} = require('../rate-limit');
const { createHandler } = require('../index');

const quiet = { warn() {}, log() {}, error() {} };

const EMPTY_FEED = '<?xml version="1.0"?><rss version="2.0"><channel></channel></rss>';

function postEvent({ host, ip }) {
  return {
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'POST', sourceIp: ip } },
    body: JSON.stringify({ url: `https://${host}/feed.xml` }),
  };
}

function makeSharedStoreHandler(store) {
  // validator/fetcher injectate: testul e despre limiter, nu despre rețea.
  // fetcher returnează un feed gol valid → joburile create se termină curat.
  return createHandler({
    store,
    validateUrl: async (u) => new URL(u),
    fetcher: async () => ({ stream: Readable.from([EMPTY_FEED]), truncated: false }),
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

test('checkIp: 3 audite/zi trec, al 4-lea aruncă 429 cu retryAfter > 0', async () => {
  const limiter = createRateLimiter({ store: memoryStore(), logger: { warn() {}, log() {} } });
  await limiter.checkIp('1.2.3.4');
  await limiter.checkIp('1.2.3.4');
  await limiter.checkIp('1.2.3.4');
  await assert.rejects(limiter.checkIp('1.2.3.4'), (err) => {
    assert.ok(err instanceof RateLimitError);
    assert.equal(err.statusCode, 429);
    assert.ok(err.retryAfterSec > 0, 'retryAfterSec trebuie > 0');
    assert.ok(err.retryAfterSec <= 24 * 3600, 'retryAfterSec nu depășește o zi');
    return true;
  });
});

test('cheia contorului IP: prefix feed_audit:rl, dată UTC și sha256(ip) — IP brut absent din cheie', async () => {
  const store = memoryStore();
  const limiter = createRateLimiter({ store, logger: quiet });
  await limiter.checkIp('5.6.7.8');
  const today = dayKey();
  const key = ipCounterKey('5.6.7.8', today);
  assert.match(key, new RegExp(`^feed_audit:rl:ip:${today}:[0-9a-f]{64}$`));
  assert.equal(key, `feed_audit:rl:ip:${today}:${hashIp('5.6.7.8')}`);
  assert.equal(await store.get(key), 1);
  assert.ok(!key.includes('5.6.7.8'), 'IP-ul brut nu apare în cheie');
  assert.match(today, /^\d{4}-\d{2}-\d{2}$/);
});

test('contoarele zilnice au TTL 48h (supraviețuiesc trecerii de zi, fără garbage)', () => {
  assert.equal(IP_TTL_SEC, 48 * 3600);
  assert.equal(GLOBAL_TTL_SEC, 48 * 3600);
});

test('IP-uri diferite au contoare separate', async () => {
  const limiter = createRateLimiter({ store: memoryStore(), logger: { warn() {}, log() {} } });
  for (let i = 0; i < 3; i++) await limiter.checkIp('10.0.0.1'); // limita proprie: exact 3
  for (let i = 0; i < 3; i++) await limiter.checkIp('10.0.0.2'); // alt IP: limită proprie
});

test('lock per domeniu: al 2-lea acquire aruncă; release compare-and-match permite din nou', async () => {
  const limiter = createRateLimiter({ store: memoryStore(), logger: { warn() {}, log() {} } });
  await limiter.acquireDomain('exemplu.ro', 'job-1');
  await assert.rejects(limiter.acquireDomain('exemplu.ro', 'job-2'), (err) => {
    assert.equal(err.statusCode, 429);
    assert.equal(err.retryAfterSec, 3600);
    return true;
  });
  // release cu alt jobId NU eliberează lock-ul altuia
  assert.equal(await limiter.releaseDomain('exemplu.ro', 'job-2'), false);
  await assert.rejects(limiter.acquireDomain('exemplu.ro', 'job-3'), RateLimitError);
  // release corect → domeniul e liber din nou
  assert.equal(await limiter.releaseDomain('exemplu.ro', 'job-1'), true);
  await limiter.acquireDomain('exemplu.ro', 'job-4');
  await limiter.releaseDomain('exemplu.ro', 'job-4');
});

test('cap global: al N+1-lea audit/zi aruncă 429', async () => {
  const limiter = createRateLimiter({
    store: memoryStore(),
    limits: { globalPerDay: 2 },
    logger: { warn() {}, log() {} },
  });
  await limiter.checkGlobal();
  await limiter.checkGlobal();
  await assert.rejects(limiter.checkGlobal(), (err) => {
    assert.equal(err.statusCode, 429);
    assert.ok(err.retryAfterSec > 0);
    return true;
  });
});

test('requiresTurnstile: fără secret → mereu false; cu secret după depășire → true', async () => {
  const quiet = { warn() {}, log() {} };
  const noSecret = createRateLimiter({ store: memoryStore(), logger: quiet });
  for (let i = 0; i < 5; i++) await noSecret.checkIp('1.1.1.1').catch(() => {});
  assert.equal(await noSecret.requiresTurnstile('1.1.1.1'), false);

  const withSecret = createRateLimiter({ store: memoryStore(), turnstileSecret: 'secret-test', logger: quiet });
  for (let i = 0; i < 3; i++) await withSecret.checkIp('2.2.2.2');
  assert.equal(await withSecret.requiresTurnstile('2.2.2.2'), false);
  // al 4-lea fără token → 429 cu turnstileRequired
  await assert.rejects(withSecret.checkIp('2.2.2.2'), (err) => {
    assert.equal(err.turnstileRequired, true);
    return true;
  });
  assert.equal(await withSecret.requiresTurnstile('2.2.2.2'), true);
});

test('memoryStore: expirare TTL (cheia dispare după ttl)', async () => {
  const store = memoryStore();
  await store.incr('cheie-scurta', 0.1); // 100 ms
  assert.equal(await store.get('cheie-scurta'), 1);
  await sleep(150);
  assert.equal(await store.get('cheie-scurta'), 0);
});

test('dayKey / secondsUntilUtcMidnight: formate corect', () => {
  assert.match(dayKey(), /^\d{4}-\d{2}-\d{2}$/);
  const s = secondsUntilUtcMidnight();
  assert.ok(s >= 1 && s <= 24 * 3600);
});

test('redisStore: wrapper peste client ioredis-like (interfață, fără driver)', async () => {
  const data = new Map();
  const fake = {
    async incr(k) { const v = (data.get(k) || 0) + 1; data.set(k, v); return v; },
    async expire() { return 1; },
    async get(k) { return data.has(k) ? String(data.get(k)) : null; },
    async set(k, v, _ex, _ttl, nx) { if (nx === 'NX' && data.has(k)) return null; data.set(k, v); return 'OK'; },
    async eval(_lua, _n, k, v) { return data.get(k) === v ? (data.delete(k), 1) : 0; },
  };
  const store = redisStore({ client: fake });
  assert.equal(await store.incr('k', 60), 1);
  assert.equal(await store.get('k'), 1);
  assert.equal(await store.setIfAbsent('lock', 'job-1', 60), true);
  assert.equal(await store.setIfAbsent('lock', 'job-2', 60), false);
  assert.equal(await store.delIfMatch('lock', 'job-2'), false);
  assert.equal(await store.delIfMatch('lock', 'job-1'), true);
});

test('redisStore fără client → eroare explicită', () => {
  assert.throws(() => redisStore({}), /client lipsă/);
});

test('noopLimiter: passthrough complet (local/test fără store)', async () => {
  const limiter = noopLimiter();
  for (let i = 0; i < 100; i++) await limiter.checkIp('x');
  await limiter.checkGlobal();
  assert.equal(await limiter.acquireDomain('d', 'j'), true);
  assert.equal(await limiter.releaseDomain('d', 'j'), true);
  assert.equal(await limiter.requiresTurnstile('x'), false);
});

// ---------------------------------------------------------------------------
// FIX limiter shared (2026-09-11): contorul trebuie să trăiască ÎN STORE-UL
// PARTAJAT, nu în container. Un al doilea handler (= alt container / cold
// start) cu același store vede contorul primului; fără store partajat,
// fiecare cold start reseta limita 3/zi/IP.

test('store PARTAJAT: al 4-lea audit/zi/IP e 429 chiar din alt „container" (handler nou, același store)', async () => {
  const shared = memoryStore();
  const containerA = makeSharedStoreHandler(shared);
  const containerB = makeSharedStoreHandler(shared); // „cold start": handler proaspăt, același store
  const ip = '9.9.9.1';

  assert.equal((await containerA(postEvent({ host: 'a.ro', ip }))).statusCode, 202);
  assert.equal((await containerA(postEvent({ host: 'b.ro', ip }))).statusCode, 202);
  assert.equal((await containerB(postEvent({ host: 'c.ro', ip }))).statusCode, 202); // al 3-lea, din ALT container
  const out = await containerB(postEvent({ host: 'd.ro', ip }));
  assert.equal(out.statusCode, 429, 'contorul NU s-a resetat la containerul nou');
  assert.ok(JSON.parse(out.body).retry_after_sec > 0);

  // alt IP: limită proprie, natinge de contorul primului
  assert.equal((await containerB(postEvent({ host: 'e.ro', ip: '9.9.9.2' }))).statusCode, 202);
});

test('container fără store partajat = noopLimiter → comportamentul vechi, doar local/test', async () => {
  // documentează intenționat diferența: fără store, handlerul NU rate-limitează.
  // De aceea la deploy lambda-entry.js injectează obligatoriu un store
  // (guardedStore peste Valkey sau unavailableStore) — niciodată fără.
  const h = createHandler({ validateUrl: async (u) => new URL(u) });
  for (let i = 0; i < 10; i++) {
    assert.equal((await h(postEvent({ host: `h${i}.ro`, ip: '9.9.9.3' }))).statusCode, 202);
  }
});

// ---------------------------------------------------------------------------
// FAIL-CLOSED la indisponibilitatea store-ului: refuzăm crearea auditului cu
// 503 (retry later), NU cădem pe memoria containerului (aia e bugul vechi).
// GET status e excepția clară: nu trece prin store și rămâne servit.

test('FAIL-CLOSED: unavailableStore → POST 503 cu retry_after, fără job creat', async () => {
  const h = createHandler({ store: unavailableStore(), validateUrl: async (u) => new URL(u) });
  const out = await h(postEvent({ host: 'x.ro', ip: '9.9.9.9' }));
  assert.equal(out.statusCode, 503);
  const body = JSON.parse(out.body);
  assert.ok(body.retry_after_sec > 0);
  assert.equal(out.headers['retry-after'], String(body.retry_after_sec));
  assert.equal(h.jobs.size, 0, 'fail-closed: niciun job creat');
});

test('FAIL-CLOSED: GET status NU e afectat de store-ul indisponibil', async () => {
  const h = createHandler({ store: unavailableStore(), validateUrl: async (u) => new URL(u) });
  h.jobs.set('job-test', { id: 'job-test', status: 'done', result: { ok: true }, error: null });
  const out = await h({
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'GET' } },
    queryStringParameters: { audit_id: 'job-test' },
  });
  assert.equal(out.statusCode, 200);
  assert.equal(JSON.parse(out.body).status, 'done');
});

test('guardedStore: eroarea store-ului devine StoreUnavailableError (503), delIfMatch rămâne ne-fatal', async () => {
  const broken = {
    async incr() { throw new Error('ECONNREFUSED'); },
    async get() { throw new Error('ECONNREFUSED'); },
    async setIfAbsent() { throw new Error('ECONNREFUSED'); },
    async delIfMatch() { throw new Error('ECONNREFUSED'); },
  };
  const limiter = createRateLimiter({ store: guardedStore({ store: broken, logger: quiet }), logger: quiet });
  await assert.rejects(limiter.checkIp('1.2.3.4'), (err) => {
    assert.ok(err instanceof StoreUnavailableError);
    assert.equal(err.statusCode, 503);
    assert.ok(err.retryAfterSec > 0);
    return true;
  });
  await assert.rejects(limiter.checkGlobal(), StoreUnavailableError);
  await assert.rejects(limiter.acquireDomain('x.ro', 'job-1'), StoreUnavailableError);
  // releaseDomain e deja try/catch în limiter — eroarea NU se propagă ca 503
  assert.equal(await limiter.releaseDomain('x.ro', 'job-1'), false);
});

test('guardedStore: peste un store sănătos trece transparent (INCR + limite funcționale)', async () => {
  const limiter = createRateLimiter({ store: guardedStore({ store: memoryStore(), logger: quiet }), logger: quiet });
  for (let i = 0; i < 3; i++) await limiter.checkIp('1.2.3.5');
  await assert.rejects(limiter.checkIp('1.2.3.5'), RateLimitError);
  await limiter.acquireDomain('ok.ro', 'job-1');
  assert.equal(await limiter.releaseDomain('ok.ro', 'job-1'), true);
});
