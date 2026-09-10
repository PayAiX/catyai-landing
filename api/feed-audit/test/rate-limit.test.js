'use strict';

// C7 — teste rate-limit: contor/IP/zi, lock per domeniu, cap global,
// flag Turnstile, expirare TTL la nivel de store.

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createRateLimiter,
  memoryStore,
  redisStore,
  noopLimiter,
  RateLimitError,
  dayKey,
  secondsUntilUtcMidnight,
} = require('../rate-limit');

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

test('cheia contorului IP conține ziua UTC curentă', async () => {
  const store = memoryStore();
  const limiter = createRateLimiter({ store, logger: { warn() {}, log() {} } });
  await limiter.checkIp('5.6.7.8');
  const today = dayKey();
  assert.equal(await store.get(`fa:ip:5.6.7.8:${today}`), 1);
  assert.match(today, /^\d{4}-\d{2}-\d{2}$/);
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
