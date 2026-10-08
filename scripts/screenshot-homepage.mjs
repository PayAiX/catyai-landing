// Screenshots homepage: desktop + mobile, pe dist servit local.
// Usage: node scripts/screenshot-homepage.mjs
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '../dist');
const outDir = join(dirname(fileURLToPath(import.meta.url)), '../docs/audit/screenshots-2026-10-08');
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

const server = createServer((req, res) => {
  let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(filePath)) filePath = null;
  else if (statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
    if (!existsSync(filePath)) filePath = null;
  }
  if (filePath === null || filePath === join(distDir, 'index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
    return;
  }
  const ext = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  }[extname(filePath)] || 'application/octet-stream';
  function extname(p) { const i = p.lastIndexOf('.'); return i === -1 ? '' : p.slice(i); }
  res.writeHead(200, { 'Content-Type': ext });
  res.end(readFileSync(filePath));
});

await new Promise((r) => server.listen(4199, r));

const browser = await puppeteer.launch();
try {
  for (const [name, width, height] of [['desktop', 1440, 4000], ['mobile', 390, 3800]]) {
    const page = await browser.newPage();
    // Forțăm limba RO (doctrine primary) — altfel auto-detectul vede en-US în headless.
    await page.evaluateOnNewDocument(() => localStorage.setItem('caty-lang', 'ro'));
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:4199/', { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible')));
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: `${outDir}/homepage-${name}.png`, fullPage: true });
    console.log(`homepage-${name}.png OK`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
