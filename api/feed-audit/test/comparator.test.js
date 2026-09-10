'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { compareToMarket, median, fmtPct, pickPrice } = require('../comparator');
const { createGoldenRecordsLookup } = require('../db-adapter');
const { validGtin } = require('../validators/engine');

// GTIN-8 cu cifră de control GS1 calculată corect (aceeași regulă ca în engine).
function makeGtin7(i) {
  const base = String(1000000 + i); // 7 cifre
  const digits = base.split('').map(Number);
  let sum = 0;
  for (let i2 = digits.length - 1; i2 >= 0; i2--) {
    sum += digits[i2] * ((digits.length - i2) % 2 === 1 ? 3 : 1);
  }
  return base + String((10 - (sum % 10)) % 10);
}

function marketItem(i, price, overrides = {}) {
  return {
    id: `SKU-${i}`,
    title: `Produs ${i}`,
    gtin: makeGtin7(i),
    price: `${price} RON`,
    price_numeric: price,
    sale_price: undefined,
    sale_price_numeric: null,
    ...overrides,
  };
}

function mapLookup(entries) {
  const market = new Map(entries);
  return async (gtins) => {
    const out = new Map();
    for (const g of gtins) if (market.has(g)) out.set(g, market.get(g));
    return out;
  };
}

test('makeGtin7 generează GTIN-uri valide', () => {
  for (let i = 1; i <= 30; i++) assert.equal(validGtin(makeGtin7(i)).ok, true, `GTIN ${i} invalid`);
});

test('30 iteme, 25 în piață → hidden:false, cifre verificate manual', async () => {
  const items = [];
  const market = [];
  for (let i = 1; i <= 30; i++) {
    // 1..15: preț propriu 120 vs piață 100 → +20% (above)
    // 16..25: preț propriu 80 vs piață 100 → −20% (below)
    // 26..30: GTIN valid dar absent din piață
    if (i <= 15) items.push(marketItem(i, 120));
    else if (i <= 25) items.push(marketItem(i, 80));
    else items.push(marketItem(i, 90));
    if (i <= 25) {
      market.push([makeGtin7(i), { price: 100, merchant_count: i <= 20 ? 1 : 2, title: `Competitor ${i}` }]);
    }
  }
  const r = await compareToMarket(items, { lookupGtins: mapLookup(market) });
  assert.equal(r.hidden, false);
  assert.equal(r.matched, 25);
  assert.equal(r.competitors, 20 * 1 + 5 * 2, 'suma merchant_count: 20×1 + 5×2');
  assert.equal(r.above_market, 15);
  assert.equal(r.below_market, 10);
  assert.equal(r.median_delta_pct, '+20%', 'mediană: 15×(+20), 10×(−20) → +20');
  assert.equal(r.examples_above.length, 3);
  assert.equal(r.examples_below.length, 3);
  assert.equal(r.examples_above[0].price, 120);
  assert.equal(r.examples_above[0].market_price, 100);
  assert.equal(r.examples_above[0].delta_pct, '+20%');
  assert.equal(r.examples_below[0].delta_pct, '-20%');
});

test('10 iteme, 5 găsite (<20) → hidden:true, doar matched raportat', async () => {
  const items = [];
  const market = [];
  for (let i = 1; i <= 10; i++) {
    items.push(marketItem(i, 100));
    if (i <= 5) market.push([makeGtin7(i), { price: 90, merchant_count: 1 }]);
  }
  const r = await compareToMarket(items, { lookupGtins: mapLookup(market) });
  assert.equal(r.hidden, true);
  assert.equal(r.matched, 5);
  assert.equal(r.min_matches, 20);
  assert.equal(r.above_market, undefined, 'nu afișăm cifre pe zgomot');
});

test('GTIN cu check-digit invalid e ignorat la match', async () => {
  let received = null;
  const lookup = async (gtins) => {
    received = gtins;
    return new Map();
  };
  const items = [marketItem(1, 100, { gtin: '5901234123456' }), marketItem(2, 100)];
  const r = await compareToMarket(items, { lookupGtins: lookup, minMatches: 1 });
  assert.deepEqual(received, [makeGtin7(2)], 'doar GTIN-ul valid ajunge la lookup');
  assert.equal(r.matched, 0);
  assert.equal(r.hidden, true);
});

test('mediană cu merchant_count>1: prețul de piață e deja mediana ofertelor', async () => {
  const items = [marketItem(1, 200)];
  const lookup = mapLookup([[makeGtin7(1), { price: 150, merchant_count: 2 }]]); // mediana ofertelor 100 și 200
  const r = await compareToMarket(items, { lookupGtins: lookup, minMatches: 1 });
  assert.equal(r.hidden, false);
  assert.equal(r.matched, 1);
  assert.equal(r.competitors, 2);
  assert.equal(r.median_delta_pct, '+33.3%', '(200−150)/150 = 33.33%');
});

test('item fără price dar cu sale_price → compară la sale_price', async () => {
  const items = [marketItem(1, 0, { price: undefined, price_numeric: null, sale_price: '90 RON', sale_price_numeric: 90 })];
  const lookup = mapLookup([[makeGtin7(1), { price: 100, merchant_count: 1 }]]);
  const r = await compareToMarket(items, { lookupGtins: lookup, minMatches: 1 });
  assert.equal(r.matched, 1);
  assert.equal(r.below_market, 1);
  assert.equal(r.median_delta_pct, '-10%');
  assert.equal(r.examples_below[0].price, 90);
});

test('median / fmtPct / pickPrice — unitare', () => {
  assert.equal(median([1, 2, 3]), 2);
  assert.equal(median([1, 2, 3, 4]), 2.5);
  assert.equal(median([]), 0);
  assert.equal(fmtPct(20), '+20%');
  assert.equal(fmtPct(-20), '-20%');
  assert.equal(fmtPct(33.33333), '+33.3%');
  assert.equal(pickPrice({ price_numeric: 50, sale_price_numeric: 30 }), 50);
  assert.equal(pickPrice({ price_numeric: null, sale_price_numeric: 30 }), 30);
  assert.equal(pickPrice({ price_numeric: 0, sale_price_numeric: 0 }), null);
});

test('fără lookupGtins → { skipped: true }', async () => {
  const r = await compareToMarket([marketItem(1, 100)], {});
  assert.deepEqual(r, { skipped: true });
});

test('db-adapter: createGoldenRecordsLookup pe colecție Mongo-like', async () => {
  const gA = makeGtin7(101);
  const gB = makeGtin7(102);
  const docs = [
    { gtin: gA, price: 100, merchant_count: 2, title: 'Produs A', secret: 'x' },
    { gtin: gB, price: 50, merchant_count: 1, title: 'Produs B' },
  ];
  let seenQuery = null;
  let seenProjection = null;
  const collection = {
    find(q) {
      seenQuery = q;
      return {
        project(p) {
          seenProjection = p;
          return {
            async toArray() {
              return docs.filter((d) => q.gtin.$in.includes(d.gtin));
            },
          };
        },
      };
    },
  };
  const lookup = createGoldenRecordsLookup({ collection });
  const map = await lookup([gA, gB, 'LIPSĂ']);
  assert.deepEqual(seenQuery, { gtin: { $in: [gA, gB, 'LIPSĂ'] } });
  assert.deepEqual(seenProjection, { gtin: 1, price: 1, merchant_count: 1, title: 1 }, 'doar câmpurile necesare (citire indexată)');
  assert.equal(map.get(gA).price, 100);
  assert.equal(map.get(gA).merchant_count, 2);
  assert.equal(map.get(gB).title, 'Produs B');
  assert.equal(map.has('LIPSĂ'), false);
  // round-trip prin comparator
  const items = [{ id: '1', gtin: gA, price_numeric: 120 }];
  const r = await compareToMarket(items, { lookupGtins: lookup, minMatches: 1 });
  assert.equal(r.hidden, false);
  assert.equal(r.median_delta_pct, '+20%');
});

test('db-adapter: respinge colecție invalidă', () => {
  assert.throws(() => createGoldenRecordsLookup({}), /collection invalidă/);
  assert.throws(() => createGoldenRecordsLookup({ collection: {} }), /collection invalidă/);
});

test('integrare index.js: fără lookupGtins → comparator.skipped, restul intact', async (t) => {
  const { createHandler } = require('../index');
  const { fetchFeed } = require('../fetch-feed');
  const { testValidator, startServer, closeServer, waitFor } = require('./helpers');
  const feed = `<?xml version="1.0"?><rss version="2.0"><channel>
  <item><id>1</id><title>A</title><link>http://x/1</link><price>10 RON</price></item>
</channel></rss>`;
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/rss+xml' });
    res.end(feed);
  });
  t.after(() => closeServer(server));

  const h = createHandler({ validateUrl: testValidator, fetcher: (u) => fetchFeed(u, { validateUrl: testValidator }) });
  const out = await h({
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({ url: `http://127.0.0.1:${port}/feed` }),
  });
  const { audit_id } = JSON.parse(out.body);
  const job = h.jobs.get(audit_id);
  await waitFor(() => job.status === 'done');
  assert.deepEqual(job.result.comparator, { skipped: true });
  assert.equal(job.result.sample_size, 1);
  assert.ok(job.result.specs.google, 'specs rămân intacte');
});

test('integrare index.js: cu lookupGtins injectat → comparator rulează în job', async (t) => {
  const { createHandler } = require('../index');
  const { fetchFeed } = require('../fetch-feed');
  const { testValidator, startServer, closeServer, waitFor } = require('./helpers');
  const feed = `<?xml version="1.0"?><rss version="2.0"><channel>
  <item><id>1</id><title>A</title><link>http://x/1</link><g:price xmlns:g="http://base.google.com/ns/1.0">120 RON</g:price><g:gtin xmlns:g="http://base.google.com/ns/1.0">${makeGtin7(1)}</g:gtin></item>
  <item><id>2</id><title>B</title><link>http://x/2</link><price>80 RON</price><gtin>${makeGtin7(2)}</gtin></item>
</channel></rss>`;
  const { server, port } = await startServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/rss+xml' });
    res.end(feed);
  });
  t.after(() => closeServer(server));

  const lookup = mapLookup([
    [makeGtin7(1), { price: 100, merchant_count: 2 }],
    [makeGtin7(2), { price: 100, merchant_count: 3 }],
  ]);
  const h = createHandler({
    validateUrl: testValidator,
    fetcher: (u) => fetchFeed(u, { validateUrl: testValidator }),
    lookupGtins: lookup,
  });
  const out = await h({
    rawPath: '/api/feed-audit',
    requestContext: { http: { method: 'POST' } },
    body: JSON.stringify({ url: `http://127.0.0.1:${port}/feed` }),
  });
  const { audit_id } = JSON.parse(out.body);
  const job = h.jobs.get(audit_id);
  await waitFor(() => job.status === 'done');
  const c = job.result.comparator;
  assert.equal(c.skipped, undefined);
  assert.equal(c.hidden, true, '2 match-uri < 20 → secțiune ascunsă onest (§7 risc 4)');
  assert.equal(c.matched, 2);
  assert.equal(c.min_matches, 20);
});
