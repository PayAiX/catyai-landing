'use strict';

// C8 + C9 — teste notificare webhook + telemetrie feed_audits (zero PII),
// plus un test end-to-end prin createHandler cu store real în memorie:
// POST 202 → poll done → GET cu specs+comparator + telemetrie/notificare
// apelate o dată + al 2-lea POST concurent pe același domeniu → 429.

const test = require('node:test');
const assert = require('node:assert/strict');
const { createHandler } = require('../index');
const { fetchFeed } = require('../fetch-feed');
const { memoryStore } = require('../rate-limit');
const { createNotifier } = require('../notify');
const { createTelemetry } = require('../telemetry');
const { testValidator, startServer, closeServer, collect, waitFor } = require('./helpers');

const FEED_2 = `<?xml version="1.0"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <item><g:id>1</g:id><g:title>A</g:title><link>http://x/1</link><g:price>10</g:price><g:image_link>http://i/1</g:image_link></item>
  <item><g:id>2</g:id><g:title>B</g:title><link>http://x/2</link><g:price>20</g:price></item>
</channel></rss>`;

const quiet = { warn() {}, log() {} };

// ---------------------------------------------------------------------------
// C8 — notificare webhook

test('notify: webhook local primește JSON-ul complet (fetch Node 20 → http://127.0.0.1)', async (t) => {
  let received = null;
  const { server, port } = await startServer(async (req, res) => {
    received = JSON.parse((await collect(req)).toString('utf8'));
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end('{"ok":true}');
  });
  t.after(() => closeServer(server));

  const notify = createNotifier({ webhookUrl: `http://127.0.0.1:${port}/hook`, logger: quiet });
  const result = await notify({ event: 'audit_completed', domain: 'exemplu.ro', audit_id: 'abc', scores: { google: 90 } });
  assert.deepEqual(result, { sent: true });
  assert.equal(received.event, 'audit_completed');
  assert.equal(received.domain, 'exemplu.ro');
  assert.equal(received.audit_id, 'abc');
  assert.equal(received.scores.google, 90);
  assert.match(received.sent_at, /^\d{4}-\d{2}-\d{2}T/);
});

test('notify: fără URL → no-op fără throw', async () => {
  const notify = createNotifier({ webhookUrl: null, logger: quiet });
  const result = await notify({ event: 'audit_completed' });
  assert.deepEqual(result, { sent: false, reason: 'no-webhook-configured' });
});

test('notify: webhook care răspunde 500 → sent:false, fără throw', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(500);
    res.end('boom');
  });
  t.after(() => closeServer(server));
  const notify = createNotifier({ webhookUrl: `http://127.0.0.1:${port}/hook`, logger: quiet });
  const result = await notify({ event: 'audit_completed' });
  assert.deepEqual(result, { sent: false, reason: 'http-500' });
});

// ---------------------------------------------------------------------------
// C9 — telemetrie feed_audits, zero PII

test('telemetry: doc inserat are exact câmpurile așteptate, fără ip/email/url', async () => {
  const docs = [];
  const collection = { async insertOne(doc) { docs.push(doc); return { insertedId: 'x' }; } };
  const record = createTelemetry({ collection, logger: quiet });

  const topProblems = Array.from({ length: 20 }, (_, i) => ({ spec: 'google', rule_id: `r${i}`, count: i }));
  const result = await record({
    audit_id: 'audit-1',
    domain: 'exemplu.ro',
    sample_size: 250,
    scores: { google: 80, meta: 70, chatgpt: 60 },
    top_problems: topProblems,
    comparator: { matched: 12, hidden: 3 },
  });
  assert.deepEqual(result, { recorded: true });
  assert.equal(docs.length, 1);
  const doc = docs[0];
  // exact cheile contractului — nimic în plus (zero PII)
  assert.deepEqual(Object.keys(doc).sort(), ['audit_id', 'comparator', 'created_at', 'domain', 'sample_size', 'scores', 'top_problems']);
  assert.equal(doc.audit_id, 'audit-1');
  assert.equal(doc.domain, 'exemplu.ro');
  assert.equal(doc.sample_size, 250);
  assert.deepEqual(doc.scores, { google: 80, meta: 70, chatgpt: 60 });
  assert.equal(doc.top_problems.length, 15); // slice 5/spec × 3 specuri
  assert.deepEqual(doc.comparator, { matched: 12, hidden: 3 });
  assert.match(doc.created_at, /^\d{4}-\d{2}-\d{2}T/);
  // domeniu, nu URL complet
  assert.doesNotMatch(doc.domain, /\//);
});

test('telemetry: fără colecție → skip safe, fără throw', async () => {
  const record = createTelemetry({ collection: null, logger: quiet });
  assert.deepEqual(await record({ audit_id: 'x', domain: 'd' }), { recorded: false });
});

// ---------------------------------------------------------------------------
// End-to-end prin createHandler cu store real (rate-limit activ)

function postEvent(url, { ip = '9.9.9.9', turnstileToken } = {}) {
  return {
    version: '2.0',
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'POST', sourceIp: ip } },
    headers: turnstileToken ? { 'x-turnstile-token': turnstileToken } : {},
    body: JSON.stringify({ url }),
  };
}

function getEvent(id) {
  return {
    version: '2.0',
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'GET' } },
    queryStringParameters: { audit_id: id },
  };
}

test('E2E: POST 202 → done → GET cu specs+comparator, telemetrie+notifier o dată; POST concurent pe același domeniu → 429', async (t) => {
  let feedRequests = 0;
  const { server, port } = await startServer((req, res) => {
    feedRequests++;
    res.writeHead(200, { 'content-type': 'application/rss+xml' });
    res.end(FEED_2);
  });
  t.after(() => closeServer(server));

  const telemetryDocs = [];
  const collection = { async insertOne(doc) { telemetryDocs.push(doc); return {}; } };
  const notifications = [];
  const notifier = async (payload) => { notifications.push(payload); };

  const h = createHandler({
    validateUrl: testValidator,
    fetcher: (u) => fetchFeed(u, { validateUrl: testValidator }),
    store: memoryStore(),
    collection,
    notifier,
    logger: quiet,
  });

  const url = `http://127.0.0.1:${port}/feed`;
  const first = await h(postEvent(url, { ip: '9.9.9.9' }));
  assert.equal(first.statusCode, 202);
  const { audit_id } = JSON.parse(first.body);

  // al 2-lea POST concurent pe același domeniu (alt IP ca să izolăm lock-ul per domeniu)
  const second = await h(postEvent(url, { ip: '8.8.8.8' }));
  assert.equal(second.statusCode, 429);
  const secondBody = JSON.parse(second.body);
  assert.ok(secondBody.retry_after_sec > 0);
  assert.match(second.headers['retry-after'], /^\d+$/);
  // lock-ul nu a pornit un al 2-lea job
  assert.equal(h.jobs.size, 1);

  const job = h.jobs.get(audit_id);
  await waitFor(() => (telemetryDocs.length === 1 && notifications.length === 1) || null);
  // releaseDomain rulează în .finally() după report — lăsăm lockul să se elibereze
  await new Promise((r) => setTimeout(r, 100));

  assert.equal(job.status, 'done');
  assert.equal(feedRequests, 1, 'doar primul job a descărcat feedul');

  // telemetrie: exact un doc, cu scorurile celor 3 specuri
  assert.equal(telemetryDocs.length, 1);
  for (const spec of ['google', 'meta', 'chatgpt']) {
    assert.equal(typeof telemetryDocs[0].scores[spec], 'number');
  }

  // notificare: un singur apel cu payload-ul contractului
  assert.equal(notifications.length, 1);
  assert.equal(notifications[0].event, 'audit_completed');
  assert.equal(notifications[0].domain, '127.0.0.1');
  assert.equal(notifications[0].audit_id, audit_id);

  // GET: rezultat complet + header noindex
  const getOut = await h(getEvent(audit_id));
  assert.equal(getOut.statusCode, 200);
  assert.equal(getOut.headers['x-robots-tag'], 'noindex');
  const body = JSON.parse(getOut.body);
  assert.equal(body.status, 'done');
  assert.equal(body.audit_id, audit_id);
  assert.equal(body.result.sample_size, 2);
  for (const spec of ['google', 'meta', 'chatgpt']) {
    assert.ok(body.result.specs[spec], `lipsește spec ${spec}`);
    assert.equal(typeof body.result.specs[spec].score, 'number');
    assert.ok(Array.isArray(body.result.specs[spec].problems));
  }
  assert.ok(body.result.comparator, 'lipsește comparatorul');

  // după finalizare lock-ul s-a eliberat: încă un POST pe domeniu trece
  // (al 2-lea audit al IP-ului 9.9.9.9 — sub limita de 3/zi)
  const third = await h(postEvent(url, { ip: '9.9.9.9' }));
  assert.equal(third.statusCode, 202);
});

test('E2E: al 4-lea audit din același IP → 429 cu retry_after_sec', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/rss+xml' });
    res.end(FEED_2);
  });
  t.after(() => closeServer(server));

  const h = createHandler({
    validateUrl: testValidator,
    fetcher: (u) => fetchFeed(u, { validateUrl: testValidator }),
    store: memoryStore(),
    logger: quiet,
  });
  const url = `http://127.0.0.1:${port}/feed`;
  for (let i = 0; i < 3; i++) {
    const out = await h(postEvent(url, { ip: '7.7.7.7' }));
    assert.equal(out.statusCode, 202);
    const job = h.jobs.get(JSON.parse(out.body).audit_id);
    await waitFor(() => job.status === 'done');
    // lockul se eliberează în .finally() — așteptăm înainte de următorul POST
    await new Promise((r) => setTimeout(r, 100));
  }
  const fourth = await h(postEvent(url, { ip: '7.7.7.7' }));
  assert.equal(fourth.statusCode, 429);
  const body = JSON.parse(fourth.body);
  assert.ok(body.retry_after_sec > 0);
  assert.ok(!body.turnstile_required, 'fără TURNSTILE_SECRET configurat nu se cere token');
});
