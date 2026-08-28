/**
 * Actualizează cifrele publice ale catalogului ÎNAINTE de build — sursa unică.
 *
 * GET https://api.catyai.io/api/public/catalog-stats (aceeași interogare care
 * alimentează shop.catyai.io/aff-llms.txt: merchanți activi, nepauzați) →
 *   1. src/data/catalog-stats.json (importat de src/lib/catalogStats.js)
 *   2. public/llms.txt — cifrele din cele două fraze cu „products … active
 *      merchants" (fișier static copiat de Vite în dist; fără actualizare,
 *      agenții AI ar citi aici altă cifră decât în aff-llms.txt).
 *
 * FAIL-SOFT: dacă endpointul nu răspunde, build-ul continuă pe valorile din
 * JSON-ul comis (ultimele cunoscute) cu WARNING vizibil — un API căzut nu
 * blochează un deploy de landing.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const STATS_JSON = join(ROOT, 'src/data/catalog-stats.json')
const LLMS_TXT = join(ROOT, 'public/llms.txt')
const STATS_URL = process.env.CATALOG_STATS_URL || 'https://api.catyai.io/api/public/catalog-stats'

async function fetchStats() {
  const res = await fetch(STATS_URL, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const body = await res.json()
  const { totalMerchants, totalProducts } = body?.data || {}
  if (!body?.success || !Number.isFinite(totalMerchants) || totalMerchants <= 0
    || !Number.isFinite(totalProducts) || totalProducts <= 0) {
    throw new Error(`payload invalid: ${JSON.stringify(body).slice(0, 200)}`)
  }
  return { totalMerchants, totalProducts }
}

function updateLlmsTxt(merchants, products) {
  const full = new Intl.NumberFormat('en-US').format(products)
  const before = readFileSync(LLMS_TXT, 'utf8')
  const after = before
    .replace(/[\d,.]+\+? products from [\d,.]+ active merchants/g, `${full} products from ${merchants} active merchants`)
    .replace(/[\d,.]+\+? products, [\d,.]+ active merchants/g, `${full} products, ${merchants} active merchants`)
  if (after !== before) {
    writeFileSync(LLMS_TXT, after)
    console.log('[catalog-stats] public/llms.txt actualizat')
  } else {
    console.log('[catalog-stats] public/llms.txt: nimic de schimbat (deja la zi sau pattern absent)')
  }
}

try {
  const { totalMerchants, totalProducts } = await fetchStats()
  writeFileSync(STATS_JSON, JSON.stringify({
    totalMerchants,
    totalProducts,
    fetched_at: new Date().toISOString(),
    source: STATS_URL,
  }, null, 2) + '\n')
  updateLlmsTxt(totalMerchants, totalProducts)
  console.log(`[catalog-stats] LIVE: ${totalMerchants} merchants · ${totalProducts} products`)
} catch (err) {
  const fallback = JSON.parse(readFileSync(STATS_JSON, 'utf8'))
  console.warn(`[catalog-stats] WARNING: fetch eșuat (${err.message}) — build pe fallback-ul comis: ${fallback.totalMerchants} merchants · ${fallback.totalProducts} products (fetched_at ${fallback.fetched_at})`)
  updateLlmsTxt(fallback.totalMerchants, fallback.totalProducts)
}
