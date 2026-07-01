#!/usr/bin/env node
/**
 * Push URLs to IndexNow (Bing, Yandex, Seznam) for catyai.io.
 * Usage: node scripts/indexnow-push.mjs https://catyai.io/blog/slug-1 https://catyai.io/blog/slug-2
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HOST = 'catyai.io';

const keyFile = fs.readdirSync(path.join(__dirname, '../public'))
  .find(f => /^[a-f0-9]{32}\.txt$/.test(f));

if (!keyFile) {
  console.error('❌ No IndexNow key file found in public/ (expected <32-hex-char>.txt)');
  process.exit(1);
}
const apiKey = keyFile.replace('.txt', '');

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Usage: node scripts/indexnow-push.mjs <url1> [url2] ...');
  process.exit(1);
}

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

const payload = {
  host: HOST,
  key: apiKey,
  keyLocation: `https://${HOST}/${keyFile}`,
  urlList: urls,
};

for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    console.log(`${endpoint} → ${res.status}`);
  } catch (err) {
    console.error(`${endpoint} → error: ${err.message}`);
  }
}
