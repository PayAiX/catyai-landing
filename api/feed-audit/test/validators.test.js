'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { loadRules, validateRuleset, runSpec, runAll, validGtin, DISCLAIMER } = require('../validators/engine');
const { testValidator, startServer, closeServer, waitFor } = require('./helpers');

const RULES_DIR = path.join(__dirname, '..', 'validators');
const RULES = loadRules(RULES_DIR);

// Item complet valid pentru toate cele 3 specuri.
function validItem(overrides = {}) {
  return {
    id: 'SKU-1',
    title: 'Cablu USB-C 1m alb',
    link: 'http://example.com/p/1',
    image: 'http://img.example.com/1.jpg',
    price: '299 RON',
    price_numeric: 299,
    sale_price: undefined,
    sale_price_numeric: null,
    availability: 'in_stock',
    brand: 'BrandX',
    gtin: '5901234123457', // EAN-13 valid
    mpn: 'BX-CBL-1M',
    description: 'Cablu USB-C de 1 metru, alb.',
    category: 'Electronice > Cabluri',
    ...overrides,
  };
}

test('regulile JSON se încarcă și se validează la startup', () => {
  const rules = loadRules(RULES_DIR);
  assert.ok(Array.isArray(rules.google) && rules.google.length > 0);
  assert.ok(Array.isArray(rules.meta) && rules.meta.length > 0);
  assert.ok(Array.isArray(rules.chatgpt) && rules.chatgpt.length > 0);
  // fiecare regulă are structura completă
  for (const spec of ['google', 'meta', 'chatgpt']) {
    for (const rule of rules[spec]) {
      assert.equal(typeof rule.id, 'string');
      assert.match(rule.severity, /^(error|warning)$/);
      assert.ok(rule.check && rule.check.type);
      assert.ok(Number.isInteger(rule.example_limit));
    }
  }
});

test('validateRuleset respinge structuri stricate', () => {
  assert.throws(() => validateRuleset([{ id: 'x', severity: 'error', title: 't', check: { type: 'nonsense' } }], 'test'), /check.type invalid/);
  assert.throws(() => validateRuleset([{ id: 'x', severity: 'fatal', title: 't', check: { type: 'required', field: 'id' } }], 'test'), /severity invalid/);
  assert.throws(() => validateRuleset([{ id: 'x', severity: 'error', check: { type: 'required', field: 'id' } }], 'test'), /title/);
  assert.throws(() => validateRuleset([{ id: 'x', severity: 'error', title: 't', check: { type: 'required' } }], 'test'), /check.field/);
  assert.throws(() => validateRuleset([{ id: 'x', severity: 'error', title: 't', check: { type: 'format', field: 'p', pattern: '(' } }], 'test'), /pattern/);
  assert.throws(() => validateRuleset([{ id: 'x', severity: 'error', title: 't', check: { type: 'required', field: 'id' } }, { id: 'x', severity: 'error', title: 't', check: { type: 'required', field: 'id' } }], 'test'), /id duplicat/);
  assert.throws(() => validateRuleset('nu-array', 'test'), /array/);
});

test('item valid → toate cele 3 specuri scor 100', () => {
  const specs = runAll([validItem()], RULES);
  for (const spec of ['google', 'meta', 'chatgpt']) {
    assert.equal(specs[spec].score, 100, `${spec} trebuia 100`);
    assert.equal(specs[spec].compliant, 1);
    assert.equal(specs[spec].problems.length, 0);
    assert.equal(specs[spec].disclaimer, DISCLAIMER);
    assert.match(specs[spec].disclaimer, /nu este o certificare oficială/);
  }
});

test('item fără gtin/mpn/brand → error la 2-din-3 doar la Google', () => {
  const item = validItem({ brand: undefined, gtin: undefined, mpn: undefined });
  const specs = runAll([item], RULES);
  const google = specs.google;
  assert.equal(google.score, 0);
  const ident = google.problems.find((p) => p.rule_id === 'g.idents.2of3');
  assert.ok(ident, 'trebuia problema 2-din-3');
  assert.equal(ident.severity, 'error');
  assert.ok(ident.examples[0].value.includes('niciunul'));
  // meta și chatgpt nu cer identificatorii
  assert.equal(specs.meta.score, 100);
  assert.equal(specs.chatgpt.score, 100);
});

test('gtin cu check-digit greșit → eroare doar la specurile cu gtin_checkdigit', () => {
  const item = validItem({ gtin: '5901234123456' }); // cifră de control greșită
  const specs = runAll([item], RULES);
  assert.ok(specs.google.problems.find((p) => p.rule_id === 'g.gtin.checkdigit'));
  assert.ok(specs.chatgpt.problems.find((p) => p.rule_id === 'c.gtin.checkdigit'));
  assert.equal(specs.meta.problems.find((p) => p.rule_id === 'm.gtin.checkdigit'), undefined, 'Meta nu are regulă GTIN');
  assert.equal(specs.meta.score, 100);
  // GTIN prezent (dar invalid) contează ca prezent pentru 2-din-3 → doar checkdigit e error
  assert.equal(specs.google.score, 0);
});

test('validGtin: algoritm GS1 corect', () => {
  assert.equal(validGtin('5901234123457').ok, true);
  assert.equal(validGtin('5901234123456').ok, false);
  assert.equal(validGtin('1234567890128').ok, true, 'UPC-A 12 valid');
  assert.equal(validGtin('12345670').ok, true, 'GTIN-8 valid');
  assert.equal(validGtin('1234567').ok, false, 'lungime invalidă');
  assert.equal(validGtin('abcdefgh').ok, false);
});

test('sale_price=0 cu price>0 → eroare logică, NU tratat ca lipsă', () => {
  const item = validItem({ sale_price: '0', sale_price_numeric: 0 });
  assert.equal(item.sale_price, '0', 'sale_price=0 e prezent, nu lipsă');
  const specs = runAll([item], RULES);
  const g = specs.google.problems.find((p) => p.rule_id === 'g.sale_price.logic');
  assert.ok(g, 'google trebuia să semnaleze sale_price=0');
  assert.equal(g.severity, 'error');
  assert.match(g.examples[0].value, /sale_price=0/);
  // la Meta e warning
  const m = specs.meta.problems.find((p) => p.rule_id === 'm.sale_price.logic');
  assert.ok(m);
  assert.equal(m.severity, 'warning');
  // chatgpt nu are regulă sale_price
  assert.equal(specs.chatgpt.problems.find((p) => p.rule_id === 'c.sale_price.logic'), undefined);
});

test('sale_price ≥ price → eroare logică', () => {
  const item = validItem({ sale_price: '399 RON', sale_price_numeric: 399 });
  const specs = runAll([item], RULES);
  const g = specs.google.problems.find((p) => p.rule_id === 'g.sale_price.logic');
  assert.ok(g);
  assert.match(g.examples[0].value, /399 ≥ price=299/);
});

test('title ALLCAPS cu TRANSPORT GRATUIT → warnings all_caps + promo_text', () => {
  const item = validItem({ title: 'CABLU USB 2M TRANSPORT GRATUIT' });
  const specs = runAll([item], RULES);
  assert.equal(specs.google.score, 100, 'warning-urile nu scad scorul');
  const allcaps = specs.google.problems.find((p) => p.rule_id === 'g.title.allcaps');
  const promo = specs.google.problems.find((p) => p.rule_id === 'g.title.promo');
  assert.ok(allcaps, 'all_caps trebuia declanșat');
  assert.ok(promo, 'promo_text trebuia declanșat');
  assert.equal(allcaps.severity, 'warning');
  assert.equal(promo.severity, 'warning');
});

test("availability 'pre_order' → error ChatGPT (cu sugestie), warning Google, ok Meta", () => {
  const item = validItem({ availability: 'pre_order' });
  const specs = runAll([item], RULES);
  const c = specs.chatgpt.problems.find((p) => p.rule_id === 'c.availability.enum');
  assert.ok(c, 'chatgpt: pre_order respins');
  assert.equal(c.severity, 'error');
  assert.equal(specs.chatgpt.score, 0);
  assert.match(c.examples[0].value, /folosește "preorder"/);
  const g = specs.google.problems.find((p) => p.rule_id === 'g.availability.enum');
  assert.ok(g, 'google: alias warning');
  assert.equal(g.severity, 'warning');
  assert.equal(specs.google.score, 100, 'warning nu scade scorul');
  assert.equal(specs.meta.problems.find((p) => p.rule_id === 'm.availability.enum'), undefined, 'meta: acceptat silențios');
  assert.equal(specs.meta.score, 100);
});

test("availability 'unknown' respins la ChatGPT", () => {
  const item = validItem({ availability: 'unknown' });
  const specs = runAll([item], RULES);
  assert.ok(specs.chatgpt.problems.find((p) => p.rule_id === 'c.availability.enum'));
  assert.equal(specs.chatgpt.score, 0);
});

test('duplicate id în 2 iteme → duplicate_id count 1 (feed level, nu afectează scorul)', () => {
  const items = [validItem(), validItem({ title: 'Alt titlu' })];
  const specs = runAll(items, RULES);
  const dup = specs.google.problems.find((p) => p.rule_id === 'g.id.duplicate');
  assert.ok(dup);
  assert.equal(dup.count, 1, 'o singură valoare de ID duplicată');
  assert.equal(dup.examples[0].id, 'SKU-1');
  assert.equal(dup.examples[0].count, 2);
  assert.equal(specs.google.score, 100, 'feed-level nu afectează scorul per-produs');
});

test('scor corect: 10 iteme, 2 cu error → 80', () => {
  const items = [];
  for (let i = 1; i <= 10; i++) {
    items.push(validItem({ id: `SKU-${i}` }));
  }
  // 2 iteme cu error: lipsesc title + image
  items[3].title = undefined;
  items[7].image = undefined;
  const specs = runAll(items, RULES);
  assert.equal(specs.google.score, 80);
  assert.equal(specs.google.compliant, 8);
  assert.equal(specs.google.total, 10);
  // problems sortate după count desc
  const counts = specs.google.problems.map((p) => p.count);
  assert.deepEqual([...counts].sort((a, b) => b - a), counts);
});

test('preț fără monedă: warning Meta, error ChatGPT', () => {
  const item = validItem({ price: '299', price_numeric: 299 });
  const specs = runAll([item], RULES);
  const m = specs.meta.problems.find((p) => p.rule_id === 'm.price.currency');
  assert.ok(m);
  assert.equal(m.severity, 'warning');
  assert.equal(specs.meta.score, 100);
  const c = specs.chatgpt.problems.find((p) => p.rule_id === 'c.price.currency');
  assert.ok(c);
  assert.equal(c.severity, 'error');
  assert.equal(specs.chatgpt.score, 0);
});

test('description cu HTML → warning ChatGPT', () => {
  const item = validItem({ description: 'Descriere <b>cu bold</b> și taguri' });
  const specs = runAll([item], RULES);
  const html = specs.chatgpt.problems.find((p) => p.rule_id === 'c.desc.html');
  assert.ok(html);
  assert.equal(html.severity, 'warning');
  assert.equal(specs.chatgpt.score, 100);
});

test('eșantion gol → scor 100, total 0, fără crash', () => {
  const specs = runAll([], RULES);
  for (const spec of ['google', 'meta', 'chatgpt']) {
    assert.equal(specs[spec].score, 100);
    assert.equal(specs[spec].total, 0);
  }
});

test('integrare index.js: result conține specs cu scoruri + disclaimer', async (t) => {
  const { createHandler } = require('../index');
  const { fetchFeed } = require('../fetch-feed');
  const feed = `<?xml version="1.0"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <item><g:id>1</g:id><g:title>Cablu USB-C 1m</g:title><link>http://x/1</link><g:image_link>http://i/1.jpg</g:image_link><g:price>299 RON</g:price><g:availability>in_stock</g:availability><g:brand>BrandX</g:brand><g:gtin>5901234123457</g:gtin><g:mpn>MPN-1</g:mpn><g:description>Desc</g:description></item>
  <item><g:id>2</g:id><g:title>Produs fără identificatori</g:title><link>http://x/2</link><g:image_link>http://i/2.jpg</g:image_link><g:price>100 RON</g:price><g:availability>in_stock</g:availability><g:description>Desc</g:description></item>
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
  assert.equal(out.statusCode, 202);
  const { audit_id } = JSON.parse(out.body);
  const job = h.jobs.get(audit_id);
  await waitFor(() => job.status === 'done');

  const result = job.result;
  assert.equal(result.sample_size, 2);
  assert.ok(result.specs, 'result trebuia să conțină specs');
  assert.equal(result.specs.google.score, 50, '1 din 2 iteme fără identificatori');
  assert.ok(result.specs.google.problems.find((p) => p.rule_id === 'g.idents.2of3'));
  assert.equal(result.specs.meta.score, 100);
  assert.equal(result.specs.chatgpt.score, 100);
  assert.match(result.specs.google.disclaimer, /nu este o certificare oficială/);
  // compat cu răspunsul GET existent
  assert.ok(Array.isArray(result.top_fields_missing));
  assert.equal(result.stats.format, 'xml');
});
