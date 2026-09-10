'use strict';

// PR-1 (C1+C2) + PR-2 (C3) — handler Lambda minimal pentru audit feed public
// (ziua 1–2 din planul SPEC §3: job async în același warm container, Map
// module-level; persistența 72h = ziua 4 / C6).
//
// POST /api/feed-audit {url} → validare SSRF (400 la URL privat) → 202 {audit_id, status_url}
// GET  /api/feed-audit?audit_id=… → {status, result?} cu result = {
//   sample_size, stats, specs: {google, meta, chatgpt}, top_fields_missing }
//
// Testabil fără Lambda: createHandler(deps) primește dependențe injectabile
// (validator, fetcher). Wrapper-ul de jos e cel pe care îl apelează AWS.

const crypto = require('crypto');
const path = require('path');
const { validateSafeUrl, HttpError } = require('./validate-url');
const { fetchFeed } = require('./fetch-feed');
const { parseFeed } = require('./parse-feed');
const { loadRules, runAll } = require('./validators/engine');

// Reguli declarative C3 — încărcate și validate structural la startup (fail fast).
const RULES = loadRules(path.join(__dirname, 'validators'));

const SAMPLE_LIMIT = 5000;
const SAMPLE_NOTICE =
  'Feedul depășește eșantionul gratuit: auditul gratuit acoperă un eșantion de 5000 produse. ' +
  'Auditul complet al catalogului este disponibil la cerere.';

const FIELDS_FOR_MISSING = ['id', 'title', 'link', 'image', 'price', 'availability', 'brand', 'gtin', 'mpn'];

function computeTopFieldsMissing(items) {
  const counts = new Map(FIELDS_FOR_MISSING.map((f) => [f, 0]));
  for (const item of items) {
    for (const f of FIELDS_FOR_MISSING) {
      if (item[f] == null || item[f] === '') counts.set(f, counts.get(f) + 1);
    }
  }
  return [...counts.entries()]
    .map(([field, missing]) => ({ field, missing }))
    .sort((a, b) => b.missing - a.missing)
    .slice(0, 5);
}

function safeDomain(urlString) {
  try {
    return new URL(urlString).hostname;
  } catch {
    return 'unknown';
  }
}

function makeJob(url) {
  return {
    id: crypto.randomBytes(9).toString('base64url'),
    url,
    domain: safeDomain(url),
    status: 'queued',
    created_at: new Date().toISOString(),
    result: null,
    error: null,
  };
}

async function processJob(job, deps) {
  job.status = 'running';
  try {
    const { stream, truncated: feedTruncated } = await deps.fetcher(job.url);
    const { items, stats } = await parseFeed(stream, { limit: SAMPLE_LIMIT });
    if (stats.error && items.length === 0) {
      throw Object.assign(new Error(stats.error), { publicMessage: stats.error });
    }
    const result = {
      sample_size: items.length,
      stats: {
        total_seen: stats.total_seen,
        invalid_rows: stats.invalid_rows,
        truncated: stats.truncated,
        format: stats.format,
        encoding: stats.encoding,
        ...(stats.error ? { error: stats.error } : {}),
      },
      // C3: scorurile spec (google/meta/chatgpt) se calculează în același job,
      // imediat după parsing; motor declarativ — validators/rules-*.json
      specs: runAll(items, RULES),
      top_fields_missing: computeTopFieldsMissing(items),
    };
    if (stats.truncated || feedTruncated) result.notice = SAMPLE_NOTICE;
    job.result = result;
    job.status = 'done';
  } catch (err) {
    job.status = 'failed';
    // fără scurgeri de URL-uri private în răspuns: doar mesajele 400/502 controlate
    job.error = err.publicMessage || (err instanceof HttpError || err.statusCode ? err.message : 'Eroare la procesarea feedului');
  }
  // logăm doar domeniul, niciodată URL-ul complet (SPEC §3 C1)
  console.log(`[feed-audit] job ${job.id} status=${job.status} domain=${job.domain}`);
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  };
}

function createHandler(deps = {}) {
  const d = { validateUrl: validateSafeUrl, fetcher: fetchFeed, ...deps };
  const jobs = new Map();

  async function handler(event = {}) {
    const method = String(event.httpMethod || event.requestContext?.http?.method || 'GET').toUpperCase();
    const path = event.rawPath || event.path || '/';
    const params = event.queryStringParameters || {};

    if (method === 'POST' && /\/api\/feed-audit\/?$/.test(path)) {
      let body = {};
      try {
        body = JSON.parse(event.body || '{}');
      } catch {
        return json(400, { error: 'Body invalid: se așteaptă JSON' });
      }
      try {
        await d.validateUrl(body.url);
      } catch (err) {
        return json(err.statusCode || 400, { error: err.message });
      }
      const job = makeJob(body.url);
      jobs.set(job.id, job);
      console.log(`[feed-audit] job start id=${job.id} domain=${job.domain}`);
      // job async în același warm container; TTL 72h ca să nu crească Map-ul la infinit
      processJob(job, d).finally(() => {
        setTimeout(() => jobs.delete(job.id), 72 * 3600 * 1000).unref?.();
      });
      return json(202, { audit_id: job.id, status_url: `/api/feed-audit?audit_id=${job.id}` });
    }

    if (method === 'GET' && /\/api\/feed-audit\/?$/.test(path)) {
      const id = params.audit_id;
      if (!id) return json(400, { error: 'Parametrul audit_id lipsește' });
      const job = jobs.get(id);
      if (!job) return json(404, { error: 'Audit negăsit (ID greșit sau expirat după 72h)' });
      const out = { audit_id: job.id, status: job.status };
      if (job.status === 'done') out.result = job.result;
      if (job.status === 'failed') out.error = job.error;
      return json(200, out);
    }

    return json(404, { error: 'Rută negăsită' });
  }

  handler.jobs = jobs;
  return handler;
}

// Wrapper-ul pe care îl invochează Lambda; logica pură rămâne în createHandler.
const handler = createHandler();

module.exports = { handler, createHandler, processJob };
