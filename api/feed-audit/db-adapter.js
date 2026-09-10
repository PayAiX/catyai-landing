'use strict';

// C5 — adaptor subțire pentru wiring-ul Mongo de la deploy (PR-4). FIȘIER DE
// INTERFAȚĂ: nu conectează nimic, nu rulează în teste fără DB.
//
// CONTRACT DE FABRICĂ (read-only):
// - colecția țintă este `retail_product_offers` — NUMELE CORECT din spec C5
//   (NU caty_*; golden records e motor de dedup, nu sursă de feed/oferte);
// - DOAR citiri indexate (index pe gtin), zero scrieri, zero deleteMany/drop.

// collection: interfață Mongo-like —
//   collection.find({ gtin: { $in: [...] } })
//     .project({ gtin: 1, price: 1, merchant_count: 1, title: 1 })
//     .toArray()
// Returnează lookupGtins(gtin[]) => Map<gtin, { price, merchant_count, title }>
// pe care comparator.js îl primește injectat.
function createGoldenRecordsLookup({ collection }) {
  if (!collection || typeof collection.find !== 'function') {
    throw new Error('createGoldenRecordsLookup: collection invalidă (lipsește find)');
  }
  return async function lookupGtins(gtins) {
    const out = new Map();
    const list = (Array.isArray(gtins) ? gtins : []).filter((g) => g !== undefined && g !== null && String(g).trim() !== '').map(String);
    if (list.length === 0) return out;
    const docs = await collection
      .find({ gtin: { $in: list } })
      .project({ gtin: 1, price: 1, merchant_count: 1, title: 1 })
      .toArray();
    for (const doc of docs) {
      if (doc.gtin === undefined || doc.gtin === null) continue;
      out.set(String(doc.gtin), {
        price: Number(doc.price),
        merchant_count: Number(doc.merchant_count) || 1,
        title: doc.title !== undefined && doc.title !== null ? String(doc.title) : undefined,
      });
    }
    return out;
  };
}

module.exports = { createGoldenRecordsLookup };
