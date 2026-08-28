/**
 * Cifrele publice ale catalogului — SURSA UNICĂ pentru tot ce e afișat pe
 * catyai.io (hero, footer, marketplace, pricing, paginile de feed).
 *
 * Valorile vin din src/data/catalog-stats.json, actualizat LA BUILD de
 * scripts/fetch-catalog-stats.mjs din GET https://api.catyai.io/api/public/
 * catalog-stats — endpointul servit de aceeași interogare care alimentează
 * shop.catyai.io/aff-llms.txt (merchanți ACTIVI, NEpauzați). Decizie 28 aug:
 * consecvența cu ce citesc agenții AI din llms.txt > cifra mai mare.
 *
 * NU hardcoda cifre de catalog în pagini — importă de aici.
 */
import stats from '../data/catalog-stats.json'

export const MERCHANT_COUNT = stats.totalMerchants
export const PRODUCT_COUNT = stats.totalProducts

const INTL_LOCALE = { en: 'en-US', ro: 'ro-RO', es: 'es-ES', pt: 'pt-PT', fr: 'fr-FR' }
const DECIMAL_COMMA = new Set(['ro', 'es', 'pt', 'fr'])

/**
 * „3.4M" / „3,4M" — milioane cu O zecimală, ROTUNJITE ÎN JOS (niciodată în sus:
 * 3.47M afișat „3.5M" ar fi un claim fals).
 */
export function productsShortM(locale = 'en') {
  const m = Math.floor(PRODUCT_COUNT / 100000) / 10
  const s = m.toFixed(1).replace(/\.0$/, '')
  return (DECIMAL_COMMA.has(locale) ? s.replace('.', ',') : s) + 'M'
}

/** Numărul complet de produse, cu separatorii localei („3.473.740" / „3,473,740"). */
export function productsFull(locale = 'en') {
  return new Intl.NumberFormat(INTL_LOCALE[locale] || 'en-US').format(PRODUCT_COUNT)
}
