'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('stream');
const { createHandler } = require('../index');
const { fetchFeed } = require('../fetch-feed');
const { testValidator, startServer, closeServer, waitFor } = require('./helpers');

const FEED_3 = `<?xml version="1.0"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <item><g:id>1</g:id><g:title>A</g:title><link>http://x/1</link><g:price>10</g:price><g:image_link>http://i/1</g:image_link></item>
  <item><g:id>2</g:id><g:title>B</g:title><link>http://x/2</link><g:price>20</g:price></item>
  <item><g:id>3</g:id><g:title>C</g:title><link>http://x/3</link></item>
</channel></rss>`;

function postEvent(url) {
  return {
    version: '2.0',
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'POST' } },
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

function makeHandler() {
  return createHandler({ validateUrl: testValidator, fetcher: (u) => fetchFeed(u, { validateUrl: testValidator }) });
}

test('POST fără url → 400', async () => {
  const h = makeHandler();
  const out = await h(postEvent(undefined));
  assert.equal(out.statusCode, 400);
  assert.match(JSON.parse(out.body).error, /url/i);
});

test('POST URL invalid (ftp) → 400 cu mesajul validatorului', async () => {
  const h = makeHandler();
  const out = await h(postEvent('ftp://example.com/feed'));
  assert.equal(out.statusCode, 400);
  assert.match(JSON.parse(out.body).error, /Protocol neacceptat/);
});

test('POST URL privat → 400 la validare, fără job creat', async () => {
  const h = makeHandler();
  const out = await h(postEvent('http://169.254.169.254/latest/meta-data'));
  assert.equal(out.statusCode, 400);
  assert.match(JSON.parse(out.body).error, /169\.254/);
  assert.equal(h.jobs.size, 0);
});

test('flow complet: POST 202 → running → done cu rezultat minimal', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/rss+xml' });
    res.end(FEED_3);
  });
  t.after(() => closeServer(server));

  const h = makeHandler();
  const out = await h(postEvent(`http://127.0.0.1:${port}/feed`));
  assert.equal(out.statusCode, 202);
  const { audit_id, status_url } = JSON.parse(out.body);
  assert.ok(audit_id);
  assert.match(status_url, new RegExp(`audit_id=${audit_id}`));

  const job = h.jobs.get(audit_id);
  await waitFor(() => job.status === 'done');
  assert.equal(job.status, 'done');

  const getOut = await h(getEvent(audit_id));
  assert.equal(getOut.statusCode, 200);
  const body = JSON.parse(getOut.body);
  assert.equal(body.status, 'done');
  assert.equal(body.result.sample_size, 3);
  assert.equal(body.result.stats.format, 'xml');
  assert.equal(body.result.stats.truncated, false);
  assert.ok(Array.isArray(body.result.top_fields_missing));
  const brand = body.result.top_fields_missing.find((x) => x.field === 'brand');
  assert.equal(brand.missing, 3, 'toate itemele lipsesc de brand');
});

test('feed >5000 iteme → notice despre eșantion în result', async (t) => {
  const parts = ['<?xml version="1.0"?><rss version="2.0"><channel>'];
  let chunk = '';
  for (let i = 1; i <= 6001; i++) {
    chunk += `<item><id>${i}</id><title>P${i}</title><link>http://x/${i}</link></item>`;
    if (i % 500 === 0) {
      parts.push(chunk);
      chunk = '';
    }
  }
  parts.push(chunk, '</channel></rss>');
  const big = Readable.from(parts.map((p) => Buffer.from(p, 'utf8')));

  // server care trimite feedul mare dintr-un generator
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/rss+xml' });
    big.pipe(res);
  });
  t.after(() => closeServer(server));

  const h = makeHandler();
  const out = await h(postEvent(`http://127.0.0.1:${port}/big`));
  const { audit_id } = JSON.parse(out.body);
  const job = h.jobs.get(audit_id);
  await waitFor(() => job.status === 'done');
  assert.equal(job.result.sample_size, 5000);
  assert.equal(job.result.stats.truncated, true);
  assert.match(job.result.notice, /eșantion de 5000 produse/);
});

test('feed care răspunde 404 → job failed cu eroare curată', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(404);
    res.end('nope');
  });
  t.after(() => closeServer(server));

  const h = makeHandler();
  const out = await h(postEvent(`http://127.0.0.1:${port}/missing`));
  assert.equal(out.statusCode, 202);
  const { audit_id } = JSON.parse(out.body);
  const job = h.jobs.get(audit_id);
  await waitFor(() => job.status === 'failed');
  const getOut = await h(getEvent(audit_id));
  const body = JSON.parse(getOut.body);
  assert.equal(body.status, 'failed');
  assert.match(body.error, /404/);
  assert.equal(body.result, undefined);
});

test('GET audit_id necunoscut → 404', async () => {
  const h = makeHandler();
  const out = await h(getEvent('nu-exista'));
  assert.equal(out.statusCode, 404);
});

test('GET fără audit_id → 400', async () => {
  const h = makeHandler();
  const out = await h({
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'GET' } },
    queryStringParameters: {},
  });
  assert.equal(out.statusCode, 400);
});

test('rută necunoscută → 404', async () => {
  const h = makeHandler();
  const out = await h({ rawPath: '/api/altceva', requestContext: { http: { method: 'GET' } } });
  assert.equal(out.statusCode, 404);
});

test('body JSON invalid → 400', async () => {
  const h = makeHandler();
  const out = await h({
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'POST' } },
    body: '{nu-json',
  });
  assert.equal(out.statusCode, 400);
});
