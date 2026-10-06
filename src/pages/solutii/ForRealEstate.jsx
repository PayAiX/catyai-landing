import SolutionPage from './SolutionPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'SoftwareApplication'],
  name: 'CatyAI for Real Estate Agencies',
  applicationCategory: 'BusinessApplication',
  description: 'AI agent that qualifies leads and schedules property viewings automatically. 24/7 on WhatsApp and web.',
  offers: { '@type': 'Offer', price: '49', priceCurrency: 'EUR' },
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://catyai.io/solutii/agentii-imobiliare', serviceType: 'AI Real Estate Lead Qualification' },
  provider: { '@type': 'Organization', name: 'PayAi-X FZE', url: 'https://catyai.io' },
}

const T = {
  en: {
    meta: { title: 'CatyAI for Real Estate — AI Lead Qualification 24/7 | WhatsApp + Web', desc: 'AI agent that qualifies buyers by budget, property type, and location — then delivers ready-to-view leads. No manual follow-up needed.' },
    badge: '🏠 Solution for Real Estate Agencies',
    h1Prefix: 'CatyAI for', h1Accent: 'Real Estate',
    heroLead: 'Qualify leads automatically — budget, property type, preferred area — and receive only viewing-ready prospects.',
    heroSub: 'AI agent that handles inquiries on WhatsApp and your website 24/7. You focus on closing deals, not chasing unqualified calls.',
    ctaPrimary: 'Start free — 2 minute setup →',
    ctaSecondary: { label: 'See pricing', to: '/pricing' },
    painsTitle: 'Problems costing you deals every week',
    painsSub: 'Sound familiar? CatyAI handles all of these automatically.',
    pains: [
      { icon: '🕐', title: 'Hours wasted on unqualified leads', desc: "Agents spend half their day on calls with buyers who don't have the budget or aren't ready to commit." },
      { icon: '📉', title: 'Leads lost overnight', desc: "A buyer messages at 11 PM. By morning, they've already scheduled a viewing with a competitor who replied first." },
      { icon: '📊', title: 'No structured data on preferences', desc: "Without proper qualification, agents don't know which properties to show first — wasting everyone's time." },
    ],
    stepsTitle: 'How it works for your agency',
    steps: [
      { title: 'Prospect messages on WhatsApp or your website', desc: 'CatyAI responds instantly and starts qualification: budget, property type, preferred area, purchase timeline.' },
      { title: 'Qualified lead lands in your dashboard', desc: 'You get a notification with all details: name, contact, preferences — ready for follow-up.' },
      { title: 'Viewing scheduled automatically', desc: 'CatyAI proposes available slots and confirms the viewing directly on WhatsApp. You just show up.' },
    ],
    featuresTitle: 'Features built for real estate',
    features: [
      { icon: '🎯', text: 'Automatic qualification: budget, property type, location, timeline — before you pick up the phone.' },
      { icon: '💬', text: 'WhatsApp 24/7 without Meta API — works with your existing business number.' },
      { icon: '📋', text: 'Exportable leads from dashboard with all collected data.' },
      { icon: '🔔', text: 'Instant notifications for new qualified leads.' },
      { icon: '🌐', text: 'Web widget on your agency website — same AI, unified inbox.' },
      { icon: '🛡️', text: 'FraudAI Shield included — filters fake inquiries before they waste your time.' },
    ],
    finalTitle: 'More viewings, less phone tag',
    finalSub: 'CatyAI works 24/7 — you focus on closing deals.',
    finalPrimary: 'Start free →',
    finalSecondary: { label: 'See all features', to: '/features' },
  },
  ro: {
    meta: { title: 'CatyAI pentru agenții imobiliare — Calificare automată a leadurilor 24/7 | WhatsApp + Web', desc: 'Califică automat leadurile — buget, tip proprietate, zonă — și primește doar prospecți pregătiți de vizionare.' },
    badge: '🏠 Soluție pentru agenții imobiliare',
    h1Prefix: 'CatyAI pentru', h1Accent: 'agenții imobiliare',
    heroLead: 'Califică leadurile automat — buget, tip de proprietate, zonă preferată — și primește doar prospecții pregătite de vizionare.',
    heroSub: 'Agent AI care preia cererile pe WhatsApp și pe site 24/7. Tu te concentrezi pe închis tranzacții, nu pe alergat după apeluri necalificate.',
    ctaPrimary: 'Începe gratuit — setup în 2 minute →',
    ctaSecondary: { label: 'Vezi prețurile', to: '/pricing' },
    painsTitle: 'Probleme care te costă tranzacții săptămânal',
    pains: [
      { icon: '🕐', title: 'Ore pierdute cu leaduri necalificate.', desc: 'Agenții își petrec jumătate din zi în apeluri cu cumpărători care nu au buget sau nu sunt pregătiți.' },
      { icon: '📉', title: 'Leaduri pierdute peste noapte.', desc: 'Un cumpărător scrie la 23:00. Până dimineața, și-a programat vizionare la competitorul care a răspuns primul.' },
      { icon: '📊', title: 'Zero date structurate despre preferințe.', desc: 'Fără calificare, agenții nu știu ce proprietăți să arate mai întâi — pierderea de timp e pe ambele părți.' },
    ],
    stepsTitle: 'Cum funcționează pentru agenția ta',
    steps: [
      { title: 'Prospectul scrie pe WhatsApp sau pe site.', desc: 'CatyAI răspunde instant și începe calificarea: buget, tip proprietate, zonă, orizont de timp.' },
      { title: 'Leadul calificat ajunge în dashboard.', desc: 'Notificare cu toate detaliile: nume, contact, preferințe — gata de follow-up.' },
      { title: 'Vizionarea se programează automat.', desc: 'CatyAI propune sloturi disponibile și confirmă vizionarea direct pe WhatsApp. Tu doar te prezinți.' },
    ],
    featuresTitle: 'Funcții construite pentru imobiliare',
    features: [
      { icon: '🎯', text: 'Calificare automată: buget, tip proprietate, locație, orizont de timp — înainte să ridici telefonul.' },
      { icon: '💬', text: 'WhatsApp 24/7 fără Meta API — cu numărul tău de business existent.' },
      { icon: '📋', text: 'Leaduri exportabile din dashboard, cu toate datele colectate.' },
      { icon: '🔔', text: 'Notificări instant pentru leaduri noi calificate.' },
      { icon: '🌐', text: 'Widget web pe site-ul agenției — același AI, căsuță unificată.' },
      { icon: '🛡️', text: 'FraudAI Shield inclus — filtrează cererile false înainte să-ți mănânce timpul.' },
    ],
    finalTitle: 'Mai multe vizionări, mai puțin telefon după telefon.',
    finalPrimary: 'Începe gratuit →',
    finalSecondary: { label: 'Vezi toate funcțiile', to: '/features' },
  },
}

export default function ForRealEstate({ locale }) {
  return <SolutionPage slug="agentii-imobiliare" locale={locale} t={T[locale] || T.en} jsonLd={jsonLd} />
}
