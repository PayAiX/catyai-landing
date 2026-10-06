import SolutionPage from './SolutionPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'SoftwareApplication'],
  name: 'CatyAI for Marketing Agencies',
  applicationCategory: 'BusinessApplication',
  description: 'White-label AI Sales Agent for your agency clients — functional in 24 hours. Multi-widget, custom branding, exportable analytics.',
  offers: { '@type': 'Offer', price: '49', priceCurrency: 'EUR' },
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://catyai.io/solutii/agentii-marketing', serviceType: 'AI Agency White-Label Solution' },
  provider: { '@type': 'Organization', name: 'PayAi-X FZE', url: 'https://catyai.io' },
}

const T = {
  en: {
    meta: { title: 'CatyAI for Marketing Agencies — AI for Your Clients in 24h', desc: 'Offer your clients a working AI assistant in 24 hours. Multi-widget, custom branding, exportable analytics. Reseller model available.' },
    badge: '📣 Solution for Marketing Agencies',
    h1Prefix: 'CatyAI for', h1Accent: 'Marketing Agencies',
    heroLead: 'AI Sales Agent for your clients — deployed in 24 hours. Custom branding, exportable analytics, reseller pricing.',
    heroSub: 'Add an AI assistant to your agency offering. Set up CatyAI for clients in less than a day — with their logo, colors, and knowledge base.',
    ctaPrimary: 'Start free — 2 minute setup →',
    ctaSecondary: { label: 'Contact team', href: 'mailto:contact@catyai.io' },
    painsTitle: 'Problems agencies face today',
    painsSub: 'Challenges of the modern digital marketing agency — solved by CatyAI.',
    pains: [
      { icon: '⏳', title: 'Slow setup for new clients', desc: 'Traditional chatbot implementation takes weeks. With CatyAI, your client is live in 24 hours.' },
      { icon: '🎨', title: 'Client branding, not yours', desc: 'CatyAI allows full custom branding — logo, colors, communication tone adapted to each client.' },
      { icon: '📈', title: 'No performance reports', desc: 'Dashboard with detailed exportable analytics — conversations, leads, conversions — ready for your monthly client report.' },
    ],
    stepsTitle: 'How it works for agencies',
    steps: [
      { title: 'Create a separate widget for each client', desc: "From the CatyAI dashboard, configure the widget with client's logo, colors, and knowledge base. Takes under an hour." },
      { title: 'Client installs one line of code on their site', desc: 'Or you install it directly — simple embed compatible with any CMS. No external dependencies.' },
      { title: 'Monitor performance from dashboard and report monthly', desc: 'Conversations, captured leads, frequent topics — all exportable to CSV or PDF for your report.' },
    ],
    featuresTitle: 'Features built for agencies',
    features: [
      { icon: '🎨', text: 'Full custom branding per client — logo, colors, tone.' },
      { icon: '📊', text: 'Exportable analytics CSV/PDF — ready for client reports.' },
      { icon: '🔗', text: 'Multi-widget — one account, multiple clients.' },
      { icon: '🌐', text: 'Web widget + WhatsApp for each client.' },
      { icon: '⚡', text: 'Setup under 24h per client.' },
      { icon: '🛡️', text: 'FraudAI Shield included in all plans.' },
    ],
    reseller: { title: 'CatyAI Reseller Model', text: 'Resell CatyAI under your own brand with your own margin. Special pricing for agencies with a portfolio of 5+ active clients.', cta: 'Request Reseller Details' },
    finalTitle: 'Add AI to your agency offering',
    finalSub: 'First client live in 24 hours. No upfront costs.',
    finalPrimary: 'Start free →',
    finalSecondary: { label: 'Agency pricing', to: '/pricing' },
  },
  ro: {
    meta: { title: 'CatyAI pentru agenții de marketing — AI pentru clienții tăi, live în 24h', desc: 'Agent AI de vânzări pentru clienții agenției — live în 24 de ore. Branding personalizat, analitice exportabile, prețuri de reseller.' },
    badge: '📣 Soluție pentru agenții de marketing',
    h1Prefix: 'CatyAI pentru', h1Accent: 'agenții de marketing',
    heroLead: 'Agent AI de vânzări pentru clienții tăi — live în 24 de ore. Branding personalizat, analitice exportabile, preț de reseller.',
    heroSub: 'Adaugă un asistent AI în oferta agenției. Configurezi CatyAI pentru un client în mai puțin de o zi — cu logo, culori și bază de cunoștințe proprie.',
    ctaPrimary: 'Începe gratuit — setup în 2 minute →',
    ctaSecondary: { label: 'Contactează echipa', href: 'mailto:contact@catyai.io' },
    painsTitle: 'Problemele agențiilor azi',
    pains: [
      { icon: '⏳', title: 'Setup lent pentru clienți noi.', desc: 'Implementarea unui chatbot clasic durează săptămâni. Cu CatyAI, clientul tău e live în 24 de ore.' },
      { icon: '🎨', title: 'Brandingul clientului, nu al tău.', desc: 'CatyAI permite branding complet personalizat — logo, culori, ton de comunicare adaptat fiecărui client.' },
      { icon: '📈', title: 'Zero rapoarte de performanță.', desc: 'Dashboard cu analitice detaliate exportabile — conversații, leaduri, conversii — gata pentru raportul lunar către client.' },
    ],
    stepsTitle: 'Cum funcționează pentru agenții',
    steps: [
      { title: 'Creezi un widget separat pentru fiecare client.', desc: 'Din dashboard: logo, culori și bază de cunoștințe per client. Durează sub o oră.' },
      { title: 'Clientul instalează o singură linie de cod pe site.', desc: 'Sau o instalezi tu — embed simplu, compatibil cu orice CMS, fără dependențe externe.' },
      { title: 'Monitorizezi performanța din dashboard și raportezi lunar.', desc: 'Conversații, leaduri capturate, teme frecvente — exportabile în CSV sau PDF.' },
    ],
    featuresTitle: 'Funcții construite pentru agenții',
    features: [
      { icon: '🎨', text: 'Branding complet personalizat per client — logo, culori, ton.' },
      { icon: '📊', text: 'Analitice exportabile CSV/PDF — gata de raportul către client.' },
      { icon: '🔗', text: 'Multi-widget — un cont, mai mulți clienți.' },
      { icon: '🌐', text: 'Widget web + WhatsApp pentru fiecare client.' },
      { icon: '⚡', text: 'Setup sub 24h per client.' },
      { icon: '🛡️', text: 'FraudAI Shield inclus în toate planurile.' },
    ],
    reseller: { title: 'Modelul Reseller CatyAI', text: 'Revinzi CatyAI sub brandul tău, cu marja ta. Prețuri speciale pentru agenții cu portofoliu de 5+ clienți activi.', cta: 'Cere detalii Reseller' },
    finalTitle: 'Adaugă AI în oferta agenției tale.',
    finalSub: 'Primul client live în 24 de ore. Fără costuri inițiale.',
    finalPrimary: 'Începe gratuit →',
    finalSecondary: { label: 'Prețuri pentru agenții', to: '/pricing' },
  },
}

export default function ForAgencies({ locale }) {
  return <SolutionPage slug="agentii-marketing" locale={locale} t={T[locale] || T.en} jsonLd={jsonLd} />
}
