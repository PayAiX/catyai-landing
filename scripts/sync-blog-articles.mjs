#!/usr/bin/env node
/**
 * Sync Blog Articles from Guardian MongoDB to CatyAI Landing
 *
 * This script:
 * 1. Fetches all published blog posts from aurex_generated_pages
 * 2. Exports them as JSON files for the React app
 * 3. Generates sitemap entries
 * 4. Updates the prerender routes
 */

import { MongoClient } from 'mongodb';
import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load env - ahauros-backend first (where Guardian stores data), then fall back to Caty.AI
const __dirnameEarly = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirnameEarly, '../../../Ahauros AEOS/ahauros-backend/.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: join(__dirnameEarly, '../../.env') });
}

const __dirname = __dirnameEarly;
const MONGODB_URI = process.env.MONGODB_URI;
const DATA_DIR = join(__dirname, '..', 'src', 'data');
const PUBLIC_DIR = join(__dirname, '..', 'public');

async function syncBlogArticles() {
  console.log('🔄 Syncing blog articles from Guardian MongoDB...\n');

  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not set in .env');
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    // Fetch all CatyAI blog articles
    // Match on site_url containing catyai.io
    // page_type can be 'blog', 'service', or undefined
    const articles = await db.collection('aurex_generated_pages')
      .find({
        site_url: { $regex: /catyai\.io/i },
        slug: { $exists: true, $ne: null, $ne: '' },
        body_html: { $exists: true, $ne: null, $ne: '' }
      })
      .sort({ generated_at: -1 })
      .toArray();

    // Deduplicate by slug (keep most recent)
    const seen = new Set();
    const uniqueArticles = articles.filter(a => {
      if (seen.has(a.slug)) return false;
      seen.add(a.slug);
      return true;
    });

    console.log(`📚 Found ${articles.length} total articles, ${uniqueArticles.length} unique\n`);

    if (uniqueArticles.length === 0) {
      console.log('⚠️  No articles found. Check site_url and slug in MongoDB.');
      await client.close();
      return;
    }

    // Ensure data directory exists
    await mkdir(DATA_DIR, { recursive: true });

    // Transform articles for frontend
    const blogArticles = uniqueArticles.map((article, index) => ({
      slug: article.slug,
      title: article.title || article.h1,
      excerpt: article.meta_description || '',
      date: formatDate(article.generated_at),
      readTime: `${Math.ceil((article.word_count || 500) / 200)} min read`,
      category: getCategoryFromKeyword(article.keyword),
      image: getImageForArticle(article, index),
      keywords: extractKeywords(article.keyword),
    }));

    // Transform article content
    const articleContent = {};
    uniqueArticles.forEach(article => {
      articleContent[article.slug] = {
        content: article.body_html || '',
        metaDescription: article.meta_description || '',
        schema: article.schema || null,
        faqSchema: article.faq_schema || null,
      };
    });

    // Write blog articles list
    await writeFile(
      join(DATA_DIR, 'blogArticles.json'),
      JSON.stringify(blogArticles, null, 2),
      'utf-8'
    );
    console.log(`✅ Written: src/data/blogArticles.json (${blogArticles.length} articles)`);

    // Write article content
    await writeFile(
      join(DATA_DIR, 'articleContent.json'),
      JSON.stringify(articleContent, null, 2),
      'utf-8'
    );
    console.log(`✅ Written: src/data/articleContent.json`);

    // Generate sitemap
    const sitemap = generateSitemap(blogArticles);
    await writeFile(
      join(PUBLIC_DIR, 'sitemap.xml'),
      sitemap,
      'utf-8'
    );
    console.log(`✅ Written: public/sitemap.xml (${blogArticles.length + 10} URLs)`);

    // Generate prerender routes
    const prerenderRoutes = generatePrerenderRoutes(blogArticles);
    await writeFile(
      join(DATA_DIR, 'prerenderRoutes.json'),
      JSON.stringify(prerenderRoutes, null, 2),
      'utf-8'
    );
    console.log(`✅ Written: src/data/prerenderRoutes.json`);

    // Show summary
    console.log('\n📊 Summary:');
    console.log(`   Articles: ${blogArticles.length}`);
    console.log(`   Categories: ${[...new Set(blogArticles.map(a => a.category))].join(', ')}`);
    console.log('\n🎉 Sync complete! Run `npm run build:seo` to rebuild with new articles.');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

function formatDate(date) {
  if (!date) return 'March 2025';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getCategoryFromKeyword(keyword) {
  if (!keyword) return 'AI Chatbot';
  const kw = keyword.toLowerCase();

  if (kw.includes('shopify')) return 'Shopify';
  if (kw.includes('woocommerce') || kw.includes('wordpress')) return 'WooCommerce';
  if (kw.includes('ecommerce') || kw.includes('magazin')) return 'E-commerce';
  if (kw.includes('chatbot')) return 'AI Chatbot';
  if (kw.includes('whatsapp')) return 'WhatsApp';
  if (kw.includes('support') || kw.includes('customer')) return 'Customer Support';
  if (kw.includes('conversion') || kw.includes('sales')) return 'Conversion';
  if (kw.includes('automation')) return 'Automation';

  return 'AI Chatbot';
}

function getImageForArticle(article, index) {
  // Rotate through stock images
  const images = [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?w=800',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
  ];
  return images[index % images.length];
}

function extractKeywords(keyword) {
  if (!keyword) return ['ai chatbot', 'ecommerce'];
  return keyword.toLowerCase().split(/\s+/).slice(0, 4);
}

function generateSitemap(articles) {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://catyai.io/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://catyai.io/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Add all blog articles
  articles.forEach(article => {
    sitemap += `
  <url>
    <loc>https://catyai.io/blog/${article.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add static pages
  const staticPages = [
    { path: '/about', priority: '0.6' },
    { path: '/contact', priority: '0.6' },
    { path: '/pricing', priority: '0.9' },
    { path: '/privacy', priority: '0.3' },
    { path: '/terms', priority: '0.3' },
    { path: '/gdpr', priority: '0.3' },
    { path: '/licensing', priority: '0.4' },
    { path: '/careers', priority: '0.5' },
  ];

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>https://catyai.io${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += '\n</urlset>\n';
  return sitemap;
}

function generatePrerenderRoutes(articles) {
  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/blog', name: 'Blog' },
  ];

  // Add all blog articles
  articles.forEach((article, index) => {
    routes.push({
      path: `/blog/${article.slug}`,
      name: `Blog: ${article.title.substring(0, 40)}...`
    });
  });

  // Add static pages
  const staticPages = [
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/privacy', name: 'Privacy' },
    { path: '/terms', name: 'Terms' },
    { path: '/gdpr', name: 'GDPR' },
    { path: '/licensing', name: 'Licensing' },
    { path: '/careers', name: 'Careers' },
  ];

  routes.push(...staticPages);
  return routes;
}

syncBlogArticles();
