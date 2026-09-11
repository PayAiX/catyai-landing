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
const { compareToMarket } = require('./comparator');
const { createRateLimiter, noopLimiter, RateLimitError } = require('./rate-limit');
const { createNotifier } = require('./notify');
const { createTelemetry } = require('./telemetry');

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

// C5: comparatorul de piață e defensiv — orice eroare de lookup nu trebuie să
// rupă jobul (rămâne secțiunea „skipped"), iar fără lookup injectat nu rulează deloc.
async function runComparator(items, deps) {
  if (typeof deps.lookupGtins !== 'function') return { skipped: true };
  try {
    return await compareToMarket(items, { lookupGtins: deps.lookupGtins });
  } catch (err) {
    console.log(`[feed-audit] comparator eșuat: ${err.message}`);
    return { skipped: true };
  }
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
      // C5: comparator „peste piață" (GTIN-only). Fără lookupGtins injectat
      // (Lambda fără DB wiring până la PR-4) secțiunea se sare onest.
      comparator: await runComparator(items, deps),
      top_fields_missing: computeTopFieldsMissing(items),
    };
    if (stats.truncated || feedTruncated) result.notice = SAMPLE_NOTICE;
    job.result = result;
    job.status = 'done';
    await report(job, result, deps);
  } catch (err) {
    job.status = 'failed';
    // fără scurgeri de URL-uri private în răspuns: doar mesajele 400/502 controlate
    job.error = err.publicMessage || (err instanceof HttpError || err.statusCode ? err.message : 'Eroare la procesarea feedului');
  }
  // logăm doar domeniul, niciodată URL-ul complet (SPEC §3 C1)
  console.log(`[feed-audit] job ${job.id} status=${job.status} domain=${job.domain}`);
}

// C9 telemetrie (zero PII: doar domeniu/scoruri) + C8 notificare best-effort.
// Niciuna nu trebuie să poată rupe jobul.
async function report(job, result, deps) {
  try {
    await deps.telemetry({
      audit_id: job.id,
      domain: job.domain,
      sample_size: result.sample_size,
      scores: Object.fromEntries(Object.entries(result.specs).map(([spec, s]) => [spec, s.score])),
      top_problems: Object.entries(result.specs).flatMap(([spec, s]) =>
        s.problems.slice(0, 5).map((p) => ({ spec, rule_id: p.rule_id, count: p.count }))
      ),
      comparator:
        result.comparator && typeof result.comparator.hidden === 'boolean'
          ? { matched: result.comparator.matched ?? 0, hidden: result.comparator.hidden }
          : { skipped: true },
    });
  } catch (err) {
    console.warn(`[feed-audit] telemetrie eșuată pentru job ${job.id}: ${err.message}`);
  }
  try {
    await deps.notifier({
      event: 'audit_completed',
      email: null,
      feed_url: job.url,
      domain: job.domain,
      audit_id: job.id,
      scores: Object.fromEntries(Object.entries(result.specs).map(([spec, s]) => [spec, s.score])),
    });
  } catch (err) {
    console.warn(`[feed-audit] notificare eșuată pentru job ${job.id}: ${err.message}`);
  }
}

function json(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extraHeaders },
    body: JSON.stringify(body),
  };
}

function createHandler(deps = {}) {
  const d = { validateUrl: validateSafeUrl, fetcher: fetchFeed, ...deps };
  const jobs = new Map();
  // C7: rate-limit real doar cu store injectat; fără store → dezactivat explicit
  // (local/test). La deploy: Valkey prin redisStore({client}) — NU Upstash.
  const limiter = d.store
    ? createRateLimiter({ store: d.store, limits: d.limits, turnstileSecret: d.turnstileSecret })
    : noopLimiter();
  // C9 / C8 — ambele no-op safe fără configurare
  const telemetry = createTelemetry({ collection: d.collection });
  const notifier = d.notifier || createNotifier({ webhookUrl: d.notifyWebhookUrl });

  async function handler(event = {}) {
    const method = String(event.httpMethod || event.requestContext?.http?.method || 'GET').toUpperCase();
    const path = event.rawPath || event.path || '/';
    const params = event.queryStringParameters || {};

    if (method === 'POST' && /\/api\/feed-audit\/?$/.test(path)) {
      // C7 (§8.1): endpointul NU intră în NICIO allow-list de feeds/AI-surfaces —
      // catyai.io nu stă în spatele caty-shop-waf; rate-limit la aplicație e
      // singura apărare. Fără el, endpointul NU se lansează (§0).
      let body = {};
      try {
        body = JSON.parse(event.body || '{}');
      } catch {
        return json(400, { error: 'Body invalid: se așteaptă JSON' });
      }
      let validatedDomain;
      try {
        const u = await d.validateUrl(body.url);
        validatedDomain = u.hostname;
      } catch (err) {
        return json(err.statusCode || 400, { error: err.message });
      }

      const ip = event.requestContext?.http?.sourceIp || event.requestContext?.identity?.sourceIp || 'unknown';
      const headers = event.headers || {};
      const turnstileToken = headers['x-turnstile-token'] || headers['X-Turnstile-Token'] || null;
      const job = makeJob(body.url);
      try {
        await limiter.checkIp(ip, { turnstileToken });
        await limiter.checkGlobal();
        await limiter.acquireDomain(validatedDomain, job.id);
      } catch (err) {
        // 429 = limită depășită (RateLimitError); 503 = store-ul limiterului
        // indisponibil (StoreUnavailableError) — ambele au retry_after_sec.
        // Ambele refuză crearea auditului; 503 NU înseamnă „audit creat".
        if (err instanceof RateLimitError || err.statusCode === 429 || err.statusCode === 503) {
          return json(
            err.statusCode === 503 ? 503 : 429,
            {
              error: err.message,
              retry_after_sec: err.retryAfterSec,
              ...(err.turnstileRequired ? { turnstile_required: true } : {}),
            },
            { 'retry-after': String(err.retryAfterSec) }
          );
        }
        throw err;
      }
      jobs.set(job.id, job);
      console.log(`[feed-audit] job start id=${job.id} domain=${job.domain}`);
      // job async în același warm container; TTL 72h ca să nu crească Map-ul la infinit;
      // lock-ul per domeniu se eliberează întotdeauna în finally
      processJob(job, { ...d, telemetry, notifier }).finally(() => {
        limiter.releaseDomain(validatedDomain, job.id);
        setTimeout(() => jobs.delete(job.id), 72 * 3600 * 1000).unref?.();
      });
      return json(202, { audit_id: job.id, status_url: `/api/feed-audit?audit_id=${job.id}` });
    }

    if (method === 'GET' && /\/api\/feed-audit\/?$/.test(path)) {
      const id = params.audit_id;
      if (!id) return json(400, { error: 'Parametrul audit_id lipsește' });
      const job = jobs.get(id);
      if (!job) return json(404, { error: 'Audit negăsit (ID greșit sau expirat după 72h)' }, { 'x-robots-tag': 'noindex' });
      const out = { audit_id: job.id, status: job.status };
      if (job.status === 'done') out.result = job.result;
      if (job.status === 'failed') out.error = job.error;
      // §8.2: paginile de rezultat se servesc noindex (header real la deploy CloudFront/Lambda)
      return json(200, out, { 'x-robots-tag': 'noindex' });
    }

    return json(404, { error: 'Rută negăsită' });
  }

  handler.jobs = jobs;
  return handler;
}

// Wrapper-ul pe care îl invochează Lambda; logica pură rămâne în createHandler.
const handler = createHandler();

module.exports = { handler, createHandler, processJob };
