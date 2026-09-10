'use strict';

// C5 — comparator „peste piață": match GTIN-only pe golden records, prin
// INTERFAȚĂ INJECTABILĂ (zero DB wiring aici — driverul Mongo vine la deploy,
// PR-4, via db-adapter.js). Moat-ul ganchoului: fără stratul ăsta suntem
// încă un validator gratis (SPEC §3 C5).
//
// Onestitate (§7 risc 4): dacă matched < minMatches, secțiunea se ascunde
// („hidden: true") — nu afișăm cifre pe zgomot.

const { validGtin } = require('./validators/engine');

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function fmtPct(x) {
  const rounded = Math.round(x * 10) / 10;
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${rounded}%`;
}

function truncate(s, n = 80) {
  const str = String(s);
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

// Prețul propriu de comparat: price_numeric dacă e valid, altfel sale_price
// (un produs cu sale_price activ se compară la prețul lui real de vânzare).
function pickPrice(item) {
  const p = Number(item.price_numeric);
  if (Number.isFinite(p) && p > 0) return p;
  const s = Number(item.sale_price_numeric);
  if (Number.isFinite(s) && s > 0) return s;
  return null;
}

// lookupGtins: async (gtin[]) => Map<gtin, { price, merchant_count, title }>
// price e prețul de piață (mediană între oferte dacă merchant_count > 1 —
// mediană calculată de adaptorul de date, nu aici).
async function compareToMarket(items, { lookupGtins, minMatches = 20 } = {}) {
  if (typeof lookupGtins !== 'function') {
    return { skipped: true };
  }
  const list = Array.isArray(items) ? items : [];

  // doar GTIN-uri cu check-digit GS1 valid (reutilizăm engine-ul din C3)
  const withGtin = [];
  for (const item of list) {
    const raw = item.gtin;
    if (raw === undefined || raw === null || String(raw).trim() === '') continue;
    const gtin = String(raw).replace(/\s+/g, '');
    if (validGtin(gtin).ok) withGtin.push({ item, gtin });
  }
  if (withGtin.length === 0) {
    return { hidden: true, matched: 0, min_matches: minMatches };
  }

  const market = await lookupGtins([...new Set(withGtin.map((v) => v.gtin))]);

  let matched = 0;
  let competitors = 0;
  let above = 0;
  let below = 0;
  const deltas = [];
  const examplesAbove = [];
  const examplesBelow = [];

  for (const { item, gtin } of withGtin) {
    const m = market.get(gtin);
    if (!m) continue;
    const marketPrice = Number(m.price);
    if (!Number.isFinite(marketPrice) || marketPrice <= 0) continue;
    matched++;
    competitors += Number.isFinite(Number(m.merchant_count)) && Number(m.merchant_count) > 0 ? Number(m.merchant_count) : 1;

    const own = pickPrice(item);
    if (own === null) continue; // match există, dar n-avem preț propriu de comparat
    const delta = ((own - marketPrice) / marketPrice) * 100;
    deltas.push(delta);
    const example = {
      id: item.id != null ? String(item.id) : null,
      title: item.title != null ? truncate(item.title) : null,
      gtin,
      price: own,
      market_price: marketPrice,
      delta_pct: fmtPct(delta),
    };
    if (own > marketPrice) {
      above++;
      if (examplesAbove.length < 3) examplesAbove.push(example);
    } else if (own < marketPrice) {
      below++;
      if (examplesBelow.length < 3) examplesBelow.push(example);
    }
  }

  if (matched < minMatches) {
    return { hidden: true, matched, min_matches: minMatches };
  }

  return {
    hidden: false,
    matched,
    competitors,
    above_market: above,
    below_market: below,
    median_delta_pct: fmtPct(median(deltas)),
    examples_above: examplesAbove,
    examples_below: examplesBelow,
  };
}

module.exports = { compareToMarket, median, fmtPct, pickPrice };
