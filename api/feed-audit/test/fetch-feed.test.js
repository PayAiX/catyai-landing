'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const zlib = require('zlib');
const { fetchFeed } = require('../fetch-feed');
const { testValidator, startServer, closeServer, collect } = require('./helpers');

const XML = '<?xml version="1.0"?><rss version="2.0"><channel><item><id>1</id></item></channel></rss>';

test('fetch 200 XML → stream, contentType, finalUrl', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/rss+xml; charset=utf-8' });
    res.end(XML);
  });
  t.after(() => closeServer(server));
  const r = await fetchFeed(`http://127.0.0.1:${port}/feed`, { validateUrl: testValidator });
  assert.equal(r.contentType, 'application/rss+xml');
  assert.ok(r.finalUrl.endsWith('/feed'));
  const buf = await collect(r.stream);
  assert.ok(buf.toString('utf8').includes('<item>'));
  assert.equal(r.truncated, false);
});

test('sniff gzip din magic bytes (content-type octet-stream)', async (t) => {
  const gz = zlib.gzipSync(Buffer.from(XML));
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/octet-stream' });
    res.end(gz);
  });
  t.after(() => closeServer(server));
  const r = await fetchFeed(`http://127.0.0.1:${port}/feed.gz`, { validateUrl: testValidator });
  const buf = await collect(r.stream);
  assert.ok(buf.toString('utf8').includes('<rss'), 'trebuia decomprimat streaming');
});

test('gzip cu content-type gzip explicit', async (t) => {
  const gz = zlib.gzipSync(Buffer.from(XML));
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/x-gzip' });
    res.end(gz);
  });
  t.after(() => closeServer(server));
  const r = await fetchFeed(`http://127.0.0.1:${port}/f`, { validateUrl: testValidator });
  const buf = await collect(r.stream);
  assert.ok(buf.toString('utf8').includes('<rss'));
});

test('follow redirect 302 și re-validare pe noul hop', async (t) => {
  const { server, port } = await startServer((req, res) => {
    if (req.url === '/a') {
      res.writeHead(302, { location: '/b' });
      res.end();
      return;
    }
    res.writeHead(200, { 'content-type': 'text/csv' });
    res.end('id,title\n1,X\n');
  });
  t.after(() => closeServer(server));
  const r = await fetchFeed(`http://127.0.0.1:${port}/a`, { validateUrl: testValidator });
  assert.ok(r.finalUrl.endsWith('/b'));
  const buf = await collect(r.stream);
  assert.ok(buf.toString('utf8').includes('id,title'));
});

test('redirect către 169.254.169.254 respins (capcana /img-proxy)', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(302, { location: 'http://169.254.169.254/latest/meta-data/' });
    res.end();
  });
  t.after(() => closeServer(server));
  await assert.rejects(
    fetchFeed(`http://127.0.0.1:${port}/img-proxy?u=metadata`, { validateUrl: testValidator }),
    (err) => {
      assert.equal(err.statusCode, 400);
      assert.match(err.message, /169\.254/);
      return true;
    }
  );
});

test('lanț redirect spre host public care rezolvă privat — respins la re-validare', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(302, { location: 'http://127.0.0.1.evil.example.internal/' });
    res.end();
  });
  t.after(() => closeServer(server));
  // testValidator deleghează la validatorul real pentru orice non-loopback:
  // hostul țintă e fie nerezolvabil, fie privat — oricum respins.
  await assert.rejects(fetchFeed(`http://127.0.0.1:${port}/r`, { validateUrl: testValidator }), /rezolv|privat|privată/);
});

test('content-type respins (JSON) cu 400 și motiv', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end('{}');
  });
  t.after(() => closeServer(server));
  await assert.rejects(fetchFeed(`http://127.0.0.1:${port}/api`, { validateUrl: testValidator }), (err) => {
    assert.equal(err.statusCode, 400);
    assert.match(err.message, /Content-Type neacceptat/);
    return true;
  });
});

test('status 404 → eroare curată 502', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(404);
    res.end('not found');
  });
  t.after(() => closeServer(server));
  await assert.rejects(fetchFeed(`http://127.0.0.1:${port}/missing`, { validateUrl: testValidator }), (err) => {
    assert.equal(err.statusCode, 502);
    assert.match(err.message, /404/);
    return true;
  });
});

test('cap de octeți → truncated:true, fără eroare', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('x'.repeat(500));
  });
  t.after(() => closeServer(server));
  const r = await fetchFeed(`http://127.0.0.1:${port}/big`, { validateUrl: testValidator, maxBytes: 100 });
  const buf = await collect(r.stream);
  assert.ok(buf.length <= 100 + 16384, 'streamul trebuia oprit la cap');
  assert.equal(r.truncated, true, 'truncated după terminarea streamului');
});

test('prea multe redirecturi → eroare', async (t) => {
  const { server, port } = await startServer((req, res) => {
    res.writeHead(302, { location: '/loop' });
    res.end();
  });
  t.after(() => closeServer(server));
  await assert.rejects(
    fetchFeed(`http://127.0.0.1:${port}/loop`, { validateUrl: testValidator }),
    /redirecturi/i
  );
});

test('timeout total pe server care nu răspunde', async (t) => {
  const { server, port } = await startServer((req, res) => {
    // nu răspundem niciodată
  });
  t.after(() => closeServer(server));
  await assert.rejects(
    fetchFeed(`http://127.0.0.1:${port}/hang`, { validateUrl: testValidator, totalTimeoutMs: 300 }),
    /Timeout total/
  );
});
