'use strict';

// C9 — telemetrie per audit în colecția `feed_audits` (query-abilă manual,
// fără dashboard — spec ziua 5). Bonus strategic: generează singură harta
// „comercianți cu feeduri rupte" (input outbound).
//
// ZERO PII: nu se stochează IP, email sau URL complet — DOAR domeniul.
// Interfață injectabilă Mongo-like (insertOne); fără colecție → skip cu log.

function createTelemetry({ collection = null, logger = console } = {}) {
  const enabled = collection && typeof collection.insertOne === 'function';
  if (!enabled) {
    logger.log('[feed-audit] telemetrie: colecție feed_audits neconfigurată — skip (setează collection la deploy)');
  }
  return async function record(entry) {
    if (!enabled) return { recorded: false };
    const doc = {
      audit_id: String(entry.audit_id),
      domain: String(entry.domain),
      created_at: new Date().toISOString(),
      sample_size: Number(entry.sample_size) || 0,
      scores: entry.scores || {},
      top_problems: Array.isArray(entry.top_problems) ? entry.top_problems.slice(0, 15) : [], // 5/spec × 3 specuri
      comparator: entry.comparator || {},
    };
    await collection.insertOne(doc);
    return { recorded: true };
  };
}

module.exports = { createTelemetry };
