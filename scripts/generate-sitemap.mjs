#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from src/data/prerenderRoutes.json.
 *
 * prerenderRoutes.json is the single source of truth for every route the site
 * serves (it already drives prerender.mjs). Previously sitemap.xml was a
 * hand-maintained file generated once by sync-blog-articles.mjs (which only
 * lists blog posts + a short hardcoded static-page list) and never updated
 * again — it went stale (lastmod stuck at old dates) and missed every page
 * added since (e.g. /mcp, /agentic-marketplace, /geo-gateway, /trust-center).
 *
 * Runs before `vite build` so the regenerated file is in public/ when vite
 * copies it into dist/.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/prerenderRoutes.json'), 'utf-8')
);

const SITE = 'https://catyai.io';
const today = new Date().toISOString().split('T')[0];

function priorityFor(routePath) {
  if (routePath === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (routePath === '/blog') return { priority: '0.9', changefreq: 'daily' };
  if (routePath.startsWith('/blog/')) return { priority: '0.8', changefreq: 'monthly' };
  return { priority: '0.6', changefreq: 'monthly' };
}

const urls = routes.map((route) => {
  const { priority, changefreq } = priorityFor(route.path);
  return `  <url>
    <loc>${SITE}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, sitemap, 'utf-8');
console.log(`✓ public/sitemap.xml generated (${routes.length} URLs, lastmod ${today})`);
