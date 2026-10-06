/**
 * URL-urile perechilor EN/RO: pagina EN la /<slug>, versiunea RO la /ro/<slug>.
 * Folosit de paginile care primesc prop-ul `locale` din App.jsx (6 oct 2026).
 */
export const SITE_URL = 'https://catyai.io'

export function pageUrl(slug, locale = 'en') {
  return locale === 'ro' ? `${SITE_URL}/ro/${slug}` : `${SITE_URL}/${slug}`
}

export function alternatesFor(slug) {
  return { en: pageUrl(slug, 'en'), ro: pageUrl(slug, 'ro') }
}
