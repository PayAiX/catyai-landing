'use strict';

// C1 — fetcher streaming cu re-validare SSRF pe FIECARE redirect.
// redirect: 'manual' (max 5 hop-uri), timeout 15s connect / 120s total,
// cap 200MB (truncated, NU eroare), sniff gzip din magic bytes 1f 8b.

const http = require('http');
const https = require('https');
const zlib = require('zlib');
const { Transform, PassThrough } = require('stream');
const { validateSafeUrl, HttpError } = require('./validate-url');

const DEFAULTS = {
  maxRedirects: 5,
  connectTimeoutMs: 15000,
  totalTimeoutMs: 120000,
  maxBytes: 200 * 1024 * 1024,
  validateUrl: validateSafeUrl,
};

const ACCEPTED_CONTENT_TYPES = new Set([
  'application/xml',
  'text/xml',
  'application/rss+xml',
  'application/atom+xml',
  'application/rdf+xml',
  'text/csv',
  'application/csv',
  'text/tab-separated-values',
  'text/plain',
  'application/octet-stream',
  'binary/octet-stream',
  'application/gzip',
  'application/x-gzip',
]);

// Decide din primii 2 octeți dacă streamul e gzip și decomprimă streaming.
class MaybeGunzip extends Transform {
  constructor() {
    super();
    this.head = null;
    this.gz = null;
  }

  _transform(chunk, _enc, cb) {
    if (this.gz) {
      this.gz.write(chunk, cb);
      return;
    }
    this.head = this.head ? Buffer.concat([this.head, chunk]) : chunk;
    if (this.head.length < 2) {
      cb();
      return;
    }
    const buf = this.head;
    this.head = null;
    if (buf[0] === 0x1f && buf[1] === 0x8b) {
      this.gz = zlib.createGunzip();
      this.gz.on('data', (d) => this.push(d));
      this.gz.once('end', () => this.push(null));
      this.gz.once('error', (err) => this.destroy(err));
      this.gz.write(buf, cb);
    } else {
      this.push(buf);
      cb();
    }
  }

  _flush(cb) {
    if (this.gz) {
      this.gz.end(cb);
      return;
    }
    if (this.head) this.push(this.head);
    cb();
  }
}

function requestOnce(target, connectTimeoutMs, onRequest) {
  return new Promise((resolve, reject) => {
    const mod = target.protocol === 'https:' ? https : http;
    const req = mod.request(target, { method: 'GET' }, resolve);
    if (onRequest) onRequest(req);
    req.setTimeout(connectTimeoutMs, () => {
      req.destroy(new HttpError(504, 'Timeout la conectare (15s)'));
    });
    req.once('error', reject);
    req.end();
  });
}

// Returnează { stream, contentType, finalUrl, truncated }.
// truncated e citit după terminarea streamului (cap 200MB atins).
async function fetchFeed(urlString, options = {}) {
  const opts = { ...DEFAULTS, ...options };
  let current = urlString;
  // Timeout total: acoperă conectarea, redirecturile ȘI descărcarea body-ului.
  let activeReq = null;
  let activeRes = null;
  let out = null;
  const totalTimer = setTimeout(() => {
    const err = new HttpError(504, 'Timeout total (120s) la descărcarea feedului');
    if (activeReq) activeReq.destroy(err);
    else if (activeRes) {
      activeRes.destroy();
      if (out && !out.destroyed) out.destroy(err);
    }
  }, opts.totalTimeoutMs);
  if (typeof totalTimer.unref === 'function') totalTimer.unref();

  try {
    for (let hop = 0; ; hop++) {
      // Re-validare SSRF la FIECARE hop — capcana /img-proxy: hostul FINAL privat
      // ocolit prin redirect e prins aici.
      const target = await opts.validateUrl(current);
      const res = await requestOnce(target, opts.connectTimeoutMs, (r) => {
        activeReq = r;
      });
      activeReq = null;
      activeRes = res;
      const status = res.statusCode || 0;

      if (status >= 300 && status < 400) {
        const location = res.headers.location;
        res.resume();
        if (!location) {
          throw new HttpError(502, `Redirect ${status} fără header Location`);
        }
        if (hop >= opts.maxRedirects) {
          throw new HttpError(502, `Prea multe redirecturi (max ${opts.maxRedirects})`);
        }
        current = new URL(location, target).toString();
        continue;
      }

      if (status !== 200) {
        res.resume();
        throw new HttpError(502, `Feedul a răspuns cu status HTTP ${status}`);
      }

      const contentType = String(res.headers['content-type'] || '')
        .split(';')[0]
        .trim()
        .toLowerCase();
      if (contentType && !ACCEPTED_CONTENT_TYPES.has(contentType)) {
        res.resume();
        throw new HttpError(400, `Content-Type neacceptat: "${contentType}"`);
      }

      out = new PassThrough();
      let truncated = false;
      let received = 0;

      const cap = new Transform({
        transform(chunk, _enc, cb) {
          received += chunk.length;
          if (received > opts.maxBytes) {
            // Cap 200MB: nu e eroare — feedul devine eșantion (SPEC §2).
            truncated = true;
            out.end();
            res.destroy();
            cb();
            return;
          }
          cb(null, chunk);
        },
      });

      const gun = new MaybeGunzip();
      const fail = (err) => {
        if (!out.destroyed) out.destroy(err);
      };
      cap.once('error', fail);
      gun.once('error', fail);
      res.once('error', fail);

      res.pipe(cap).pipe(gun).pipe(out);
      out.once('end', () => clearTimeout(totalTimer));
      out.once('close', () => clearTimeout(totalTimer));

      return {
        stream: out,
        contentType: contentType || 'application/octet-stream',
        finalUrl: target.toString(),
        get truncated() {
          return truncated;
        },
      };
    }
  } finally {
    clearTimeout(totalTimer);
  }
}

module.exports = { fetchFeed, MaybeGunzip };
