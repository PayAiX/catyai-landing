import SolutionPage from './SolutionPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['OnlineStore', 'SoftwareApplication'],
  name: 'CatyAI for E-commerce',
  applicationCategory: 'BusinessApplication',
  description: 'AI assistant that answers product questions, recovers abandoned carts on WhatsApp, and increases conversion. Works with Shopify, WooCommerce, GoMag.',
  offers: { '@type': 'Offer', price: '49', priceCurrency: 'EUR' },
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://catyai.io/solutii/ecommerce', serviceType: 'AI E-commerce Sales Assistant' },
  provider: { '@type': 'Organization', name: 'PayAi-X FZE', url: 'https://catyai.io' },
}

const PLATFORMS = ['WordPress', 'Shopify', 'WooCommerce', 'Wix', 'GoMag', 'Magento']

const T = {
  en: {
    meta: { title: 'CatyAI for E-commerce — Boost Conversion with AI | Shopify, WooCommerce', desc: 'AI assistant that answers product questions, stock and delivery inquiries — and recovers abandoned carts on WhatsApp. Compatible with any platform.' },
    badge: '🛍️ Solution for Online Stores',
    h1Prefix: 'CatyAI for', h1Accent: 'E-commerce',
    heroLead: 'Boost conversion with AI — answer product questions instantly and recover abandoned carts on WhatsApp.',
    heroSub: 'CatyAI responds to stock, delivery, and return questions 24/7 — and automatically follows up on abandoned carts with a recovery coupon.',
    ctaPrimary: 'Start free — 2 minute setup →',
    ctaSecondary: { label: 'Caty Widget', to: '/widget' },
    platformsLabel: 'Works with', platforms: PLATFORMS,
    painsTitle: 'Problems costing you sales every day',
    painsSub: 'The most expensive friction points in e-commerce — solved by CatyAI.',
    pains: [
      { icon: '🛒', title: 'Abandoned carts', desc: '70% of carts are abandoned. CatyAI sends a WhatsApp message with a recovery coupon within 30 minutes — 15-25% recovery rate.' },
      { icon: '🔁', title: 'Repetitive pre-sale questions', desc: "'Is it in stock?', 'When will it arrive?', 'Can I return it?'. CatyAI answers instantly, 24/7, no human agent needed." },
      { icon: '📱', title: "Customers who don't return", desc: 'CatyAI sends automated post-purchase follow-ups and relevant cross-sell — on WhatsApp, the channel with 98% open rate.' },
    ],
    stepsTitle: 'How it works for your store',
    steps: [
      { title: 'Install the widget in 5 minutes on any platform', desc: 'One line of code in WordPress, Shopify, or GoMag. Or use the native integration available in the dashboard.' },
      { title: 'CatyAI answers visitors in real-time', desc: 'Product questions, stock, delivery, returns — all resolved instantly. The customer stays on-site and buys.' },
      { title: 'Abandoned carts are recovered automatically', desc: 'Shopify/WooCommerce webhook → CatyAI sends WhatsApp message → 15-25% recovery rate.' },
    ],
    featuresTitle: 'Features built for e-commerce',
    features: [
      { icon: '🛒', text: 'WhatsApp abandoned cart recovery with coupon codes.' },
      { icon: '📦', text: 'Product and stock knowledge base — answers based on your catalog.' },
      { icon: '💬', text: 'Live chat on site + WhatsApp unified — one inbox for everything.' },
      { icon: '📊', text: "Conversion analytics in dashboard — see what's working." },
      { icon: '🔗', text: 'Native Shopify, WooCommerce, GoMag integrations.' },
      { icon: '🛡️', text: 'FraudAI Shield — detects fake orders before they cost you money.' },
    ],
    finalTitle: 'More sales, less support tickets',
    finalSub: 'CatyAI turns visitors into buyers — and buyers into repeat customers.',
    finalPrimary: 'Start free →',
    finalSecondary: { label: 'Compare with alternatives', to: '/compare' },
  },
  ro: {
    meta: { title: 'CatyAI pentru magazine online — Asistent AI care răspunde 24/7 | Shopify, WooCommerce, GoMag', desc: 'CatyAI răspunde instant la întrebări despre produse, stoc și livrare și urmărește automat coșurile abandonate pe WhatsApp. Setup în 5 minute.' },
    badge: '🛍️ Soluție pentru magazine online',
    h1Prefix: 'CatyAI pentru', h1Accent: 'magazine online',
    heroLead: 'Răspunsuri instant la întrebările despre produse — și recuperare automată a coșurilor abandonate pe WhatsApp.',
    heroSub: 'CatyAI răspunde la întrebări despre stoc, livrare și retur, 24/7 — și urmărește automat coșurile abandonate cu un cupon de recuperare.',
    ctaPrimary: 'Începe gratuit — setup în 2 minute →',
    ctaSecondary: { label: 'Widgetul Caty', to: '/widget' },
    platformsLabel: 'Funcționează cu', platforms: PLATFORMS,
    painsTitle: 'Probleme care te costă vânzări zilnic',
    pains: [
      { icon: '🛒', title: 'Coșuri abandonate.', desc: 'Media globală a abandonului de coș e în jur de 70% (Baymard Institute). CatyAI trimite automat un mesaj WhatsApp cu cupon de recuperare la 30 de minute după abandon.' },
      { icon: '🔁', title: 'Aceleași întrebări pre-vânzare, la infinit.', desc: '„E pe stoc?", „Când ajunge?", „Pot returna?". CatyAI răspunde instant, 24/7, fără agent uman.' },
      { icon: '📱', title: 'Clienți care nu revin.', desc: 'CatyAI trimite follow-up-uri automate post-cumpărare și recomandări relevante, pe WhatsApp — canalul cu cea mai mare rată de deschidere dintre canalele de mesagerie.' },
    ],
    stepsTitle: 'Cum funcționează pentru magazinul tău',
    steps: [
      { title: 'Instalezi widgetul în 5 minute, pe orice platformă.', desc: 'O linie de cod în WordPress, Shopify sau GoMag — sau integrarea nativă din dashboard.' },
      { title: 'CatyAI răspunde vizitatorilor în timp real.', desc: 'Întrebări despre produse, stoc, livrare, retur — rezolvate instant. Clientul rămâne pe site și cumpără.' },
      { title: 'Coșurile abandonate sunt urmărite automat.', desc: 'Webhook Shopify/WooCommerce → CatyAI trimite mesajul WhatsApp cu cuponul de recuperare.' },
    ],
    featuresTitle: 'Funcții construite pentru e-commerce',
    features: [
      { icon: '🛒', text: 'Recuperare coșuri abandonate pe WhatsApp, cu cupoane.' },
      { icon: '📦', text: 'Bază de cunoștințe cu produsele și stocul tău — răspunsuri pe catalogul real.' },
      { icon: '💬', text: 'Live chat pe site + WhatsApp unificat — o singură căsuță pentru tot.' },
      { icon: '📊', text: 'Analitice de conversie în dashboard.' },
      { icon: '🔗', text: 'Integrări native Shopify, WooCommerce, GoMag.' },
      { icon: '🛡️', text: 'FraudAI Shield — detectează comenzile false înainte să te coste.' },
    ],
    finalTitle: 'Mai multe vânzări, mai puține tichete de suport.',
    finalPrimary: 'Începe gratuit →',
    finalSecondary: { label: 'Compară cu alternativele', to: '/ro/compare' },
  },
}

export default function ForEcommerce({ locale }) {
  return <SolutionPage slug="ecommerce" locale={locale} t={T[locale] || T.en} jsonLd={jsonLd} />
}
