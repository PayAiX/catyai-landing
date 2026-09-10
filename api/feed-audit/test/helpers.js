'use strict';

// Helpers comuni pentru teste. ALLOW_MOCK=false: parserul/fetcher-ul rulează pe
// logică reală; singurul test double permite loopback (127.0.0.1) la rețea —
// validatorul real respinge 127.x ca privat, deci pentru mock servere locale
// injectăm un validator care trece loopbackul și DELEGAZĂ restul la
// validateSafeUrl real (inclusiv toate redirecturile spre exterior).

const http = require('http');
const { validateSafeUrl } = require('../validate-url');

async function testValidator(urlString) {
  const u = new URL(urlString);
  if (u.hostname === '127.0.0.1' && (u.protocol === 'http:' || u.protocol === 'https:') && !u.username && !u.password) {
    // dublură de test: permite orice port pe loopback (mock servere locale);
    // TOATĂ logica reală (scheme, userinfo, redirecturi spre exterior) rămâne
    // în validateSafeUrl, care e delegată mai jos pentru orice non-loopback.
    return u;
  }
  return validateSafeUrl(urlString);
}

function startServer(handler) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(handler);
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function closeServer(server) {
  return new Promise((resolve) => server.close(resolve));
}

function collect(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (c) => chunks.push(c));
    stream.once('end', () => resolve(Buffer.concat(chunks)));
    stream.once('error', reject);
  });
}

async function waitFor(fn, timeoutMs = 8000, stepMs = 50) {
  const t0 = Date.now();
  for (;;) {
    const v = await fn();
    if (v) return v;
    if (Date.now() - t0 > timeoutMs) throw new Error('timeout la așteptarea condiției');
    await new Promise((r) => setTimeout(r, stepMs));
  }
}

module.exports = { testValidator, startServer, closeServer, collect, waitFor };
