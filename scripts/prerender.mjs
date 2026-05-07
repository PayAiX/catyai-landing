import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/prerenderRoutes.json'), 'utf-8')
);
const distDir = path.join(__dirname, '../dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const PORT = 4173;
let success = 0;
let skipped = 0;
let rendered = 0;

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);

      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, 'index.html');
      } else if (fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        if (!fs.existsSync(filePath)) {
          filePath = path.join(distDir, 'index.html');
        }
      }

      const ext = path.extname(filePath);
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.woff2': 'font/woff2',
      };

      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderWithPuppeteer(route, browser) {
  const page = await browser.newPage();

  try {
    await page.goto(`http://localhost:${PORT}${route.path}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.waitForSelector('main, article, .zta-research, [data-page-ready]', { timeout: 10000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 500));

    let html = await page.content();

    html = html.replace(
      /<script[^>]*>window\.__REACT_DEVTOOLS[^<]*<\/script>/g,
      ''
    );

    html = html.replace(
      /<link rel="canonical" href="https:\/\/catyai\.io"[^>]*>(?=[\s\S]*<link rel="canonical"[^>]*data-rh="true")/g,
      ''
    );

    html = html.replace(
      /<meta name="description" content="[^"]*"[^>]*>(?=[\s\S]*<meta name="description"[^>]*data-rh="true")/g,
      ''
    );

    html = html.replace(
      /<title>[^<]*<\/title>(?=[\s\S]*<title data-rh="true">)/g,
      ''
    );

    html = html.replace(
      /<meta property="og:image" content="[^"]*"[^>]*>(?=[\s\S]*<meta property="og:image"[^>]*data-rh="true")/g,
      ''
    );

    const segments = route.path.split('/').filter(Boolean);
    const dir = path.join(distDir, ...segments);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);

    return true;
  } catch (err) {
    console.error(`  ✗ ${route.path}: ${err.message}`);
    return false;
  } finally {
    await page.close();
  }
}

function prerenderMetaOnly(route) {
  let html = indexHtml;

  if (route.title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
    html = html.replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${route.title}$2`
    );
  }
  if (route.description) {
    html = html.replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${route.description}$2`
    );
    html = html.replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${route.description}$2`
    );
  }

  const segments = route.path.split('/').filter(Boolean);
  const dir = path.join(distDir, ...segments);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

async function main() {
  const criticalRoutes = routes.filter(r => r.title && r.description);
  const metaOnlyRoutes = routes.filter(r => !r.title || !r.description);

  if (criticalRoutes.length > 0) {
    console.log(`Starting Puppeteer pre-render for ${criticalRoutes.length} critical routes...`);

    const server = await startServer();
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const route of criticalRoutes) {
      const ok = await prerenderWithPuppeteer(route, browser);
      if (ok) {
        console.log(`✓ ${route.path} (rendered)`);
        rendered++;
        success++;
      } else {
        prerenderMetaOnly(route);
        console.log(`✓ ${route.path} (meta-only fallback)`);
        success++;
      }
    }

    await browser.close();
    server.close();
  }

  for (const route of metaOnlyRoutes) {
    prerenderMetaOnly(route);
    console.log(`✓ ${route.path}`);
    success++;
  }

  skipped = 0;

  console.log(`\nPre-render done: ${success} routes generated (${rendered} fully rendered), ${skipped} skipped.`);
}

main().catch(console.error);
