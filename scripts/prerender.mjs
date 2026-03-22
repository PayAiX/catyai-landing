#!/usr/bin/env node
/**
 * Pre-render script for CatyAI Landing Page
 * Generates static HTML for each route to improve SEO
 *
 * Usage:
 *   1. First run: npm run sync-blog (to fetch articles from Guardian)
 *   2. Then run: npm run build:seo (which runs this script)
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');
const dataPath = join(__dirname, '..', 'src', 'data');

// Default routes (used if prerenderRoutes.json doesn't exist)
const defaultRoutes = [
  { path: '/', name: 'Homepage' },
  { path: '/blog', name: 'Blog' },
  { path: '/blog/ai-chatbot-ecommerce-conversions', name: 'Blog Article 1' },
  { path: '/blog/best-shopify-ai-chatbot-2025', name: 'Blog Article 2' },
  { path: '/blog/24-7-customer-support-ai', name: 'Blog Article 3' },
  { path: '/blog/woocommerce-ai-chatbot-setup', name: 'Blog Article 4' },
  { path: '/blog/why-stores-lose-sales-at-night', name: 'Blog Article 5' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/terms', name: 'Terms' },
];

async function loadRoutes() {
  const routesFile = join(dataPath, 'prerenderRoutes.json');

  if (existsSync(routesFile)) {
    try {
      const data = await readFile(routesFile, 'utf-8');
      const routes = JSON.parse(data);
      console.log(`📄 Loaded ${routes.length} routes from prerenderRoutes.json`);
      return routes;
    } catch (err) {
      console.warn(`⚠️  Could not parse prerenderRoutes.json: ${err.message}`);
    }
  } else {
    console.log('⚠️  prerenderRoutes.json not found, using default routes');
    console.log('   Run "npm run sync-blog" first to sync articles from Guardian');
  }

  return defaultRoutes;
}

async function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['serve', '-s', distPath, '-l', '4173'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let started = false;

    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Accepting connections') || output.includes('http://localhost:4173')) {
        if (!started) {
          started = true;
          resolve(server);
        }
      }
    });

    server.stderr.on('data', (data) => {
      const output = data.toString();
      if (output.includes('4173')) {
        if (!started) {
          started = true;
          resolve(server);
        }
      }
    });

    setTimeout(() => {
      if (!started) {
        started = true;
        resolve(server);
      }
    }, 5000);

    server.on('error', reject);
  });
}

async function prerender() {
  console.log('🚀 Starting pre-render process...\n');

  // Load routes
  const routes = await loadRoutes();

  // Start serve with SPA mode
  console.log('\n📦 Starting static server with SPA fallback...');
  const server = await startServer();
  const serverUrl = 'http://localhost:4173';

  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`📦 Server running at ${serverUrl}\n`);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;
  let errorCount = 0;

  // Process routes in batches to avoid memory issues
  const BATCH_SIZE = 10;
  for (let i = 0; i < routes.length; i += BATCH_SIZE) {
    const batch = routes.slice(i, i + BATCH_SIZE);
    console.log(`\n📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(routes.length / BATCH_SIZE)}...\n`);

    for (const route of batch) {
      try {
        const page = await browser.newPage();

        // Block external resources to speed up rendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          const url = req.url();
          if (
            url.includes('facebook') ||
            url.includes('fbevents') ||
            url.includes('google-analytics') ||
            url.includes('googletagmanager')
          ) {
            req.abort();
          } else {
            req.continue();
          }
        });

        await page.setViewport({ width: 1280, height: 800 });

        const url = `${serverUrl}${route.path}`;
        console.log(`⏳ Rendering: ${route.path}`);

        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        await page.waitForSelector('#root', { timeout: 10000 });
        await new Promise(resolve => setTimeout(resolve, 2500));

        const pageTitle = await page.title();
        let html = await page.content();

        // Add prerender status meta tag
        html = html.replace('</head>', '<meta name="prerender-status" content="200">\n</head>');

        // Determine output path
        let outputPath;
        if (route.path === '/') {
          outputPath = join(distPath, 'index.html');
        } else {
          const routePath = route.path.endsWith('/') ? route.path.slice(0, -1) : route.path;
          const dirPath = join(distPath, routePath);
          await mkdir(dirPath, { recursive: true });
          outputPath = join(dirPath, 'index.html');
        }

        await writeFile(outputPath, html, 'utf-8');

        const shortTitle = pageTitle.length > 50 ? pageTitle.substring(0, 50) + '...' : pageTitle;
        console.log(`✅ ${route.path} → "${shortTitle}"`);
        successCount++;

        await page.close();
      } catch (error) {
        console.error(`❌ Error rendering ${route.path}:`, error.message);
        errorCount++;
      }
    }
  }

  await browser.close();
  server.kill('SIGTERM');

  console.log(`\n🎉 Pre-rendering complete!`);
  console.log(`   ✅ Success: ${successCount}/${routes.length}`);
  if (errorCount > 0) {
    console.log(`   ❌ Errors: ${errorCount}`);
  }
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
