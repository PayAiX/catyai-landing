'use strict';

// Rulare locală a handlerului, fără Lambda:
//   node api/feed-audit/local.js  → http://localhost:3001/api/feed-audit
// Atenție: validatorul real respinge 127.0.0.1 (privat) — pentru teste locale
// cu servere loopback folosește testele din api/feed-audit/test/.

const http = require('http');
const { handler } = require('./index');

const PORT = Number(process.env.PORT || 3001);

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (c) => {
    body += c;
  });
  req.on('end', async () => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const event = {
        httpMethod: req.method,
        path: url.pathname,
        queryStringParameters: Object.fromEntries(url.searchParams.entries()),
        headers: req.headers,
        body: body || null,
      };
      const out = await handler(event);
      res.writeHead(out.statusCode, out.headers);
      res.end(out.body);
    } catch (err) {
      res.writeHead(500, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'Eroare internă' }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`feed-audit local: http://localhost:${PORT}/api/feed-audit`);
});
