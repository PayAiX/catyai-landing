#!/usr/bin/env node
/**
 * Pre-render script for CatyAI Landing Page
 * Generates static HTML for each route to improve SEO
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

// Routes to pre-render
const routes = [
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

async function startServer() {
  return new Promise((resolve, reject) => {
    // Use serve with -s flag for SPA mode (serves index.html for all routes)
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

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!started) {
        started = true;
        resolve(server); // Resolve anyway, server might be ready
      }
    }, 5000);

    server.on('error', reject);
  });
}

async function prerender() {
  console.log('🚀 Starting pre-render process...\n');

  // Start serve with SPA mode
  console.log('📦 Starting static server with SPA fallback...');
  const server = await startServer();
  const serverUrl = 'http://localhost:4173';

  // Wait a bit for server to be fully ready
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(`📦 Server running at ${serverUrl}\n`);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;
  let errorCount = 0;

  for (const route of routes) {
    try {
      const page = await browser.newPage();

      // Block Facebook pixel to avoid errors
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (req.url().includes('facebook') || req.url().includes('fbevents')) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.setViewport({ width: 1280, height: 800 });

      const url = `${serverUrl}${route.path}`;
      console.log(`⏳ Rendering: ${route.name} (${route.path})`);

      // Navigate and wait
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for React to fully render
      await page.waitForSelector('#root', { timeout: 10000 });

      // Wait extra time for content and React Helmet
      await new Promise(resolve => setTimeout(resolve, 3500));

      // Get the page title
      const pageTitle = await page.title();

      // Get the rendered HTML
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

      // Show title (truncated)
      const shortTitle = pageTitle.length > 50 ? pageTitle.substring(0, 50) + '...' : pageTitle;
      console.log(`✅ ${route.path} → "${shortTitle}"`);
      successCount++;

      await page.close();
    } catch (error) {
      console.error(`❌ Error rendering ${route.path}:`, error.message);
      errorCount++;
    }
  }

  await browser.close();

  // Kill the server
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
