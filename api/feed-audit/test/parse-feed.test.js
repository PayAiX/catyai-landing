'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('stream');
const { parseFeed } = require('../parse-feed');

function streamFrom(...chunks) {
  return Readable.from(chunks.map((c) => (Buffer.isBuffer(c) ? c : Buffer.from(c, 'utf8'))));
}

const RSS_3 = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Feed test</title>
  <item>
    <g:id>SKU-1</g:id>
    <g:title>Produs &amp; Test &#65;</g:title>
    <link>http://example.com/p/1</link>
    <g:image_link>http://img.example.com/1.jpg</g:image_link>
    <g:price>2999.99 RON</g:price>
    <g:availability>in stock</g:availability>
    <g:brand>BrandX</g:brand>
    <g:gtin>1234567890123</g:gtin>
    <g:description>Desc &lt;b&gt;relevant&lt;/b&gt;</g:description>
  </item>
  <item>
    <g:id>SKU-2</g:id>
    <g:title>Al doilea</g:title>
    <link>http://example.com/p/2</link>
    <g:price>100</g:price>
  </item>
  <item>
    <g:id>SKU-3</g:id>
    <title>Fără g</title>
    <link>http://example.com/p/3</link>
    <g:price>50,99 RON</g:price>
    <g:sale_price>40,99 RON</g:sale_price>
  </item>
</channel>
</rss>`;

test('XML RSS cu namespace g: → 3 iteme normalizate', async () => {
  const { items, stats } = await parseFeed(streamFrom(RSS_3));
  assert.equal(items.length, 3);
  assert.equal(stats.format, 'xml');
  assert.equal(stats.encoding, 'utf-8');
  assert.equal(stats.total_seen, 3);
  assert.equal(stats.invalid_rows, 0);
  assert.equal(stats.truncated, false);

  const [i1, i2, i3] = items;
  assert.equal(i1.id, 'SKU-1');
  assert.equal(i1.title, 'Produs & Test A');
  assert.equal(i1.link, 'http://example.com/p/1');
  assert.equal(i1.image, 'http://img.example.com/1.jpg');
  assert.equal(i1.price, '2999.99 RON');
  assert.equal(i1.price_numeric, 2999.99);
  assert.equal(i1.availability, 'in stock');
  assert.equal(i1.brand, 'BrandX');
  assert.equal(i1.gtin, '1234567890123');
  assert.equal(i2.image, undefined, 'image lipsă → undefined');
  assert.equal(i2.brand, undefined);
  assert.equal(i3.sale_price, '40,99 RON');
});

test('Atom <entry> cu enclosure self-closing', async () => {
  const atom = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom">
  <entry><id>e1</id><title>Entry 1</title><link href="http://x/1"/><enclosure url="http://img/1.png" type="image/png"/></entry>
  <entry><id>e2</id><title>Entry 2</title><link>http://x/2</link></entry>
</feed>`;
  const { items, stats } = await parseFeed(streamFrom(atom));
  assert.equal(items.length, 2);
  assert.equal(stats.total_seen, 2);
  assert.equal(items[0].image, 'http://img/1.png', 'enclosure url devine image');
  assert.equal(items[1].link, 'http://x/2');
});

test('XML cu DOCTYPE rău → ignorat fără crash, entitatea externă NU se expandează', async () => {
  const evil = `<!DOCTYPE rss [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<rss version="2.0"><channel>
<item><id>1</id><title>Safe &xxe;</title><link>http://x/1</link></item>
</channel></rss>`;
  const { items, stats } = await parseFeed(streamFrom(evil));
  assert.equal(items.length, 1);
  assert.match(items[0].title, /&xxe;/, 'entitatea necunoscută rămâne literală, neexpandată');
  assert.equal(stats.error, null);
});

test('CSV cu header, ghilimele și delimiter virgulă', async () => {
  const csv = 'id,title,price,brand\n1,"Foo, cu virgulă",10 RON,BrandA\n2,Bâr,20,BrandB\n';
  const { items, stats } = await parseFeed(streamFrom(csv));
  assert.equal(stats.format, 'csv');
  assert.equal(items.length, 2);
  assert.equal(items[0].title, 'Foo, cu virgulă');
  assert.equal(items[0].price_numeric, 10);
  assert.equal(items[1].brand, 'BrandB');
});

test('TSV utf-16le fără BOM (capcana pandas) → detectat și parsat', async () => {
  const tsv = 'id\ttitle\tprice\n1\tProdus A\t10\n2\tProdus B\t11,5\n';
  const buf = Buffer.from(tsv, 'utf16le'); // fără BOM — sniff NUL-uri
  const { items, stats } = await parseFeed(streamFrom(buf));
  assert.equal(stats.encoding, 'utf-16le');
  assert.equal(stats.format, 'csv');
  assert.equal(items.length, 2);
  assert.equal(items[0].title, 'Produs A');
  assert.equal(items[1].price_numeric, 11, 'parseFloat minimal pe primul număr: "11,5" → 11');
});

test('TSV utf-16le CU BOM', async () => {
  const tsv = 'id\ttitle\n1\tBOMed\n';
  const buf = Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(tsv, 'utf16le')]);
  const { items, stats } = await parseFeed(streamFrom(buf));
  assert.equal(stats.encoding, 'utf-16le');
  assert.equal(items.length, 1);
  assert.equal(items[0].id, '1');
});

test('CSV cu punct și virgulă sniff-uit corect', async () => {
  const csv = 'id;title;price\n1;A;10\n2;B;20\n';
  const { items } = await parseFeed(streamFrom(csv));
  assert.equal(items.length, 2);
  assert.equal(items[1].title, 'B');
  assert.equal(items[1].price_numeric, 20);
});

test('CSV cu rând >1MB → invalid_rows, nu crash', async () => {
  const big = 'x'.repeat(2 * 1024 * 1024);
  const csv = `id,title\n1,OK\n${big},prea-mare\n2,Inca-OK\n`;
  const { items, stats } = await parseFeed(streamFrom(csv));
  assert.equal(stats.invalid_rows, 1);
  assert.equal(items.length, 2);
  assert.equal(items[1].title, 'Inca-OK');
});

test('rânduri invalide (goloage) numărate, parsingul continuă', async () => {
  const csv = 'id,title,price\n1,A,10\n,,\n2,B,20\n';
  const { items, stats } = await parseFeed(streamFrom(csv));
  assert.equal(stats.invalid_rows, 1);
  assert.equal(items.length, 2);
});

test('feed "mare" >5000 iteme → cutoff curat, exact 5000, truncated:true', async () => {
  const parts = ['<?xml version="1.0"?><rss version="2.0"><channel>'];
  let chunk = '';
  for (let i = 1; i <= 6000; i++) {
    chunk += `<item><id>P${i}</id><title>Produs ${i}</title><link>http://x/${i}</link></item>`;
    if (i % 500 === 0) {
      parts.push(chunk);
      chunk = '';
    }
  }
  parts.push(chunk, '</channel></rss>');
  const { items, stats } = await parseFeed(streamFrom(...parts));
  assert.equal(items.length, 5000);
  assert.equal(stats.truncated, true);
  assert.equal(items[0].id, 'P1');
  assert.equal(items[4999].id, 'P5000');
});

test('CSV mare >5000 rânduri → cutoff 5000', async () => {
  const parts = ['id,title\n'];
  let chunk = '';
  for (let i = 1; i <= 6000; i++) {
    chunk += `${i},Produs ${i}\n`;
    if (i % 1000 === 0) {
      parts.push(chunk);
      chunk = '';
    }
  }
  const { items, stats } = await parseFeed(streamFrom(...parts));
  assert.equal(items.length, 5000);
  assert.equal(stats.truncated, true);
});

test('stream gol → 0 iteme, fără crash', async () => {
  const { items, stats } = await parseFeed(streamFrom(''));
  assert.equal(items.length, 0);
  assert.equal(stats.format, null);
});

test('stream care aruncă eroare la citire → stats.error, nu throw', async () => {
  const bad = new Readable({
    read() {
      this.destroy(new Error('conexiune întreruptă'));
    },
  });
  const { items, stats } = await parseFeed(bad);
  assert.equal(items.length, 0);
  assert.match(stats.error, /citirea streamului/);
});
