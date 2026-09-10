'use strict';

// C2 — parser streaming multi-format: XML (RSS/Atom, namespace g:), CSV/TSV,
// gzip (deja decomprimat de fetch-feed), detectare encoding (BOM + sniff),
// normalizare la forma internă, cutoff 5000 iteme, rânduri invalide NU opresc
// parsingul. Erorile de conținut devin stats.error, nu crash.

const { StringDecoder } = require('string_decoder');

const DEFAULT_LIMIT = 5000;
const MAX_ROW_BYTES = 1024 * 1024; // cap per rând CSV (SPEC §7.3)
const MAX_ITEM_TEXT = 10 * 1024 * 1024; // fereastră maximă așteptând </item>
const MAX_BLOCK_BYTES = 5 * 1024 * 1024; // un <item> mai mare = invalid
const MAX_TEXT_FIELD = 100 * 1024;

// Variante de nume acceptate per câmp (SPEC §3 C2)
const ALIASES = {
  id: ['g:id', 'id', 'guid', 'product_id', 'sku'],
  title: ['g:title', 'title', 'name', 'product_name'],
  link: ['link', 'url', 'product_url'],
  image: ['g:image_link', 'image_link', 'image', 'image_url', 'imageurl', 'thumbnail', 'img'],
  price: ['g:price', 'price', 'regular_price', 'current_price'],
  sale_price: ['g:sale_price', 'sale_price', 'saleprice', 'discounted_price'],
  availability: ['g:availability', 'availability', 'stock', 'stock_status', 'available'],
  brand: ['g:brand', 'brand', 'brand_name', 'manufacturer', 'vendor'],
  gtin: ['g:gtin', 'gtin', 'gtin8', 'gtin12', 'gtin13', 'gtin14', 'ean', 'upc', 'isbn', 'barcode'],
  mpn: ['g:mpn', 'mpn', 'part_number', 'partno', 'model'],
  description: ['g:description', 'description', 'desc', 'short_description', 'summary'],
  category: ['g:product_category', 'g:google_product_category', 'product_category', 'category', 'product_type', 'category_path'],
};

const FIELDS = Object.keys(ALIASES);

// ---------------------------------------------------------------------------
// Entități: doar cele built-in + numerice. Fără entity externe, fără expandare
// periculoasă (XXE). Max 3 treceri, cap de lungime — protecție contra bombe.
function decodeEntities(s) {
  if (!s.includes('&')) return s;
  let out = s;
  for (let pass = 0; pass < 3 && out.includes('&'); pass++) {
    out = out.replace(/&(#x?[0-9a-fA-F]+|amp|lt|gt|quot|apos);/g, (m, e) => {
      switch (e) {
        case 'amp': return '&';
        case 'lt': return '<';
        case 'gt': return '>';
        case 'quot': return '"';
        case 'apos': return "'";
        default: {
          const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
          if (Number.isFinite(code) && code >= 0 && code <= 0x10ffff) {
            try {
              return String.fromCodePoint(code);
            } catch {
              return m;
            }
          }
          return m;
        }
      }
    });
  }
  if (out.length > MAX_TEXT_FIELD) out = out.slice(0, MAX_TEXT_FIELD);
  return out;
}

function stripCdata(s) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function cleanText(s) {
  s = stripCdata(s);
  s = s.replace(/<[^>]*>/g, ' '); // taguri nested (ex. <g:shipping> în item)
  s = decodeEntities(s);
  return s.replace(/\s+/g, ' ').trim();
}

function normalizeFields(raw) {
  const item = {};
  for (const field of FIELDS) {
    let v;
    for (const alias of ALIASES[field]) {
      if (raw[alias] !== undefined && raw[alias] !== null && String(raw[alias]).trim() !== '') {
        v = cleanText(String(raw[alias]));
        break;
      }
    }
    item[field] = v; // undefined când lipsește — contabilizat în top_fields_missing
  }
  if (!item.image && raw.__enclosure_url) item.image = raw.__enclosure_url;
  if (item.price != null) {
    // price brut păstrat în MVP; extragere numerică minimală (SPEC §3 C2)
    const m = String(item.price).match(/-?\d[\d.,]*/);
    item.price_numeric = m ? parseFloat(m[0]) : null;
  } else {
    item.price_numeric = null;
  }
  return item;
}

function isEmptyItem(item) {
  return !item.id && !item.title && !item.link;
}

// ---------------------------------------------------------------------------
// Encoding: BOM (utf-8/utf-16le/utf-16be) + sniff NUL-uri (lecția pandas:
// capcana utf-16le + TSV fără BOM).
function utf16beDecoder() {
  const dec = new StringDecoder('utf16le');
  let carry = null;
  return {
    write(buf) {
      let b = buf;
      if (carry !== null) {
        b = Buffer.concat([Buffer.from([carry]), b]);
        carry = null;
      }
      if (b.length % 2 === 1) {
        carry = b[b.length - 1];
        b = b.subarray(0, b.length - 1);
      }
      if (!b.length) return '';
      const swapped = Buffer.allocUnsafe(b.length);
      for (let i = 0; i < b.length; i += 2) {
        swapped[i] = b[i + 1];
        swapped[i + 1] = b[i];
      }
      return dec.write(swapped);
    },
    end() {
      if (carry !== null) {
        const r = dec.end(Buffer.from([0, carry]));
        carry = null;
        return r;
      }
      return dec.end();
    },
  };
}

async function* bytes(src, stats) {
  try {
    for await (const chunk of src) yield chunk;
  } catch (err) {
    stats.error = `Eroare la citirea streamului: ${err.message}`;
  }
}

async function* toText(byteGen, stats, isCancelled) {
  // iterator manual: `break` din for-await ar apela .return() pe byteGen și
  // l-ar termina — chunk-urile următoare s-ar pierde
  const bit = byteGen[Symbol.asyncIterator]();
  let head = Buffer.alloc(0);
  while (head.length < 4) {
    const { value, done } = await bit.next();
    if (done) break;
    head = head.length ? Buffer.concat([head, value]) : value;
  }
  if (!head.length) return;

  let enc = 'utf-8';
  let bomLen = 0;
  if (head.length >= 3 && head[0] === 0xef && head[1] === 0xbb && head[2] === 0xbf) {
    enc = 'utf-8';
    bomLen = 3;
  } else if (head.length >= 2 && head[0] === 0xff && head[1] === 0xfe) {
    enc = 'utf-16le';
    bomLen = 2;
  } else if (head.length >= 2 && head[0] === 0xfe && head[1] === 0xff) {
    enc = 'utf-16be';
    bomLen = 2;
  } else {
    const probe = head.subarray(0, Math.min(head.length, 200));
    let even = 0;
    let odd = 0;
    for (let i = 0; i < probe.length; i++) {
      if (probe[i] === 0) (i % 2 === 0 ? even++ : odd++);
    }
    // utf-16le: 'a' = 61 00 → NUL pe poziții impare; utf-16be invers
    if (odd > 10 && odd > even * 4) enc = 'utf-16le';
    else if (even > 10 && even > odd * 4) enc = 'utf-16be';
  }
  stats.encoding = enc;

  const decoder =
    enc === 'utf-8' ? new StringDecoder('utf8') : enc === 'utf-16le' ? new StringDecoder('utf16le') : utf16beDecoder();

  const first = head.subarray(bomLen);
  if (first.length) {
    const s = decoder.write(first);
    if (s) yield s;
  }
  while (true) {
    const { value: chunk, done } = await bit.next();
    if (done) break;
    if (isCancelled()) return;
    const s = decoder.write(chunk);
    if (s) yield s;
  }
  const tail = decoder.end();
  if (tail) yield tail;
}

async function* replay(firstText, it) {
  yield firstText;
  while (true) {
    const { value, done } = await it.next();
    if (done) return;
    yield value;
  }
}

// ---------------------------------------------------------------------------
// XML: tokenizer streaming pe <item>…</item> / <entry>…</entry> (cu prefix
// namespace opțional), DOCTYPE tăiat din prolog, entități doar built-in.
function longestSuffixPrefix(buf, target) {
  const max = Math.min(buf.length, target.length - 1);
  for (let len = max; len > 0; len--) {
    if (buf.endsWith(target.slice(0, len))) return len;
  }
  return 0;
}

function stripDoctype(buf) {
  const idx = buf.indexOf('<!DOCTYPE');
  if (idx === -1) {
    // posibil început tăiat la final de chunk — păstrăm sufixul suspect
    const keep = longestSuffixPrefix(buf, '<!DOCTYPE');
    return keep > 0 ? buf.slice(0, buf.length - keep) : buf;
  }
  let i = idx + '<!DOCTYPE'.length;
  let depth = 0;
  let complete = false;
  for (; i < buf.length; i++) {
    const c = buf[i];
    if (c === '[') depth++;
    else if (c === ']') depth--;
    else if (c === '>' && depth <= 0) {
      i++;
      complete = true;
      break;
    }
  }
  if (!complete) return buf.slice(idx); // subset intern incomplet — așteptăm
  return buf.slice(0, idx) + buf.slice(i);
}

const ITEM_OPEN_RE = /<([A-Za-z_][\w.-]*:)?(item|entry)(?=[\s/>])/;

function matchItemOpen(buf) {
  const m = ITEM_OPEN_RE.exec(buf);
  if (!m) return null;
  const prefix = m[1] || '';
  const local = m[2];
  return { start: m.index, end: m.index + m[0].length, closeTag: `</${prefix}${local}>`, local };
}

function parseItemBlock(block) {
  if (block.length > MAX_BLOCK_BYTES) return null;
  const raw = {};
  // taguri self-closing (ex. <enclosure url="…" type="image/jpeg"/>)
  const selfRe = /<([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*')|\s)*)\/>/g;
  let m;
  while ((m = selfRe.exec(block))) {
    const attrs = m[2];
    const urlMatch = /url\s*=\s*"([^"]*)"/.exec(attrs) || /url\s*=\s*'([^']*)'/.exec(attrs);
    if (m[1] === 'enclosure' && urlMatch) raw.__enclosure_url = urlMatch[1];
  }
  const tagRe = /<([\w:.-]+)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g;
  while ((m = tagRe.exec(block))) {
    if (raw[m[1]] === undefined) raw[m[1]] = m[2];
    const local = m[1].includes(':') ? m[1].split(':').pop() : m[1];
    if (raw[local] === undefined) raw[local] = m[2];
  }
  const item = normalizeFields(raw);
  return isEmptyItem(item) ? null : item;
}

async function parseXml(nextText, items, stats, limit, cancel, isCancelled) {
  let buf = '';
  while (true) {
    const { value, done } = await nextText();
    if (done) break;
    buf += value;
    buf = stripDoctype(buf);
    while (!isCancelled()) {
      const open = matchItemOpen(buf);
      if (!open) break;
      const closeIdx = buf.indexOf(open.closeTag, open.end);
      if (closeIdx === -1) {
        // așteptăm restul blocului; fereastră capată ca să nu crească nelimitat
        if (buf.length > MAX_ITEM_TEXT) {
          stats.invalid_rows++;
          buf = buf.slice(open.start);
        }
        break;
      }
      const block = buf.slice(open.end, closeIdx);
      buf = buf.slice(closeIdx + open.closeTag.length);
      stats.total_seen++;
      const item = parseItemBlock(block);
      if (item) items.push(item);
      else stats.invalid_rows++;
      if (items.length >= limit) {
        stats.truncated = true;
        cancel();
        return;
      }
    }
    if (!matchItemOpen(buf) && buf.length > MAX_ITEM_TEXT) buf = buf.slice(-4096);
    if (isCancelled()) return;
  }
}

// ---------------------------------------------------------------------------
// CSV/TSV: sniff delimiter din prima linie (tab > ; > ,), header obligatoriu,
// suport minim ghilimele, cap 1MB/rând.
function sniffDelimiter(firstLine) {
  const counts = { '\t': 0, ';': 0, ',': 0 };
  for (const ch of firstLine) {
    if (ch in counts) counts[ch]++;
  }
  if (counts['\t'] > 0) return '\t';
  if (counts[';'] > 0) return ';';
  return ',';
}

function splitRow(line, delim) {
  const out = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQ = true;
    } else if (c === delim) {
      out.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

async function parseDelimited(nextText, items, stats, limit, cancel, isCancelled) {
  let buf = '';
  let header = null;
  let delimiter = null;
  let discarding = false; // în interiorul unui rând >1MB: sar octeții până la newline

  async function handleLine(line) {
    if (!header) {
      delimiter = sniffDelimiter(line);
      header = splitRow(line, delimiter).map((h) => h.trim().toLowerCase().replace(/^\ufeff/, ''));
      return;
    }
    stats.total_seen++;
    const cols = splitRow(line, delimiter);
    const raw = {};
    header.forEach((h, i) => {
      if (h) raw[h] = cols[i];
    });
    const item = normalizeFields(raw);
    if (isEmptyItem(item)) {
      stats.invalid_rows++;
      return;
    }
    items.push(item);
    if (items.length >= limit) {
      stats.truncated = true;
      cancel();
    }
  }

  while (true) {
    const { value, done } = await nextText();
    if (!done) buf += value;

    if (discarding) {
      const nl = buf.indexOf('\n');
      if (nl !== -1) {
        buf = buf.slice(nl + 1);
        discarding = false;
      } else {
        buf = '';
      }
    } else {
      let idx;
      while ((idx = buf.indexOf('\n')) !== -1) {
        let line = buf.slice(0, idx);
        buf = buf.slice(idx + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.length > MAX_ROW_BYTES) {
          stats.invalid_rows++;
        } else {
          await handleLine(line);
        }
        if (isCancelled()) return;
      }
      if (buf.length > MAX_ROW_BYTES) {
        // rând fără newline care depășește deja 1MB → oricum invalid
        stats.invalid_rows++;
        discarding = true;
        buf = '';
      }
    }

    if (done) {
      if (!discarding && buf.length) {
        const line = buf.endsWith('\r') ? buf.slice(0, -1) : buf;
        if (line.length > MAX_ROW_BYTES) stats.invalid_rows++;
        else await handleLine(line);
      }
      return;
    }
    if (isCancelled()) return;
  }
}

// ---------------------------------------------------------------------------
async function parseFeed(inputStream, { limit = DEFAULT_LIMIT } = {}) {
  const stats = { total_seen: 0, invalid_rows: 0, truncated: false, format: null, encoding: null, error: null };
  const items = [];
  let cancelled = false;
  const isCancelled = () => cancelled;
  const cancel = () => {
    cancelled = true;
    try {
      inputStream.destroy();
    } catch {
      /* deja distrus */
    }
  };

  const byteGen = bytes(inputStream, stats);
  const textGen = toText(byteGen, stats, isCancelled);
  const it = textGen[Symbol.asyncIterator]();

  try {
    const first = await it.next();
    if (!first.done) {
      const isXml = /^\s*</.test(first.value.slice(0, 2048));
      stats.format = isXml ? 'xml' : 'csv';
      const rest = replay(first.value, it);
      const nextText = () => rest.next();
      if (isXml) await parseXml(nextText, items, stats, limit, cancel, isCancelled);
      else await parseDelimited(nextText, items, stats, limit, cancel, isCancelled);
    }
  } catch (err) {
    stats.error = `Eroare la parsare: ${err.message}`;
  } finally {
    if (it.return) {
      try {
        await it.return();
      } catch {
        /* generatorul e deja oprit */
      }
    }
    if (!cancelled) cancel(); // eliberăm streamul sursă
  }

  return { items, stats };
}

module.exports = { parseFeed, decodeEntities, sniffDelimiter, normalizeFields, DEFAULT_LIMIT };
