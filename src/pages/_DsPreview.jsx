import { useState } from 'react';
import HomePageTemplate from '../templates/HomePageTemplate';
import ProductPageTemplate from '../templates/ProductPageTemplate';
import EnterpriseTemplate from '../templates/EnterpriseTemplate';
import StaticPageTemplate from '../templates/StaticPageTemplate';
import LegalPageTemplate from '../templates/LegalPageTemplate';

/* ─── MOCK DATA ─────────────────────────────────────── */

const HOME_T = {
  hero: {
    badge: '✦ AI Platform — v2.0',
    h1: ['Transformă', 'conversia', 'cu AI'],
    sub: 'Soluții AI enterprise pentru creșterea afacerii tale. Automatizare, analiză și engagement în timp real.',
    placeholder: 'Introdu domeniul tău — ex: magazin.ro',
    cta: 'Audit Gratuit',
    trust: 'Online • 247 audituri azi',
    resultTitle: 'Audit completat',
    resultSub: 'Scor de oportunitate: 8.4 / 10',
  },
  marquee: [
    'WhatsApp AI', 'GEO Gateway', 'Fraud Shield', 'Caty Widget',
    'Analytics', 'Multi-Channel', 'Enterprise API', 'GDPR Ready',
    'WhatsApp AI', 'GEO Gateway', 'Fraud Shield', 'Caty Widget',
    'Analytics', 'Multi-Channel', 'Enterprise API', 'GDPR Ready',
  ],
  products: {
    tag: '// produse',
    h2: 'Suite completă AI',
    items: [
      {
        icon: '💬',
        tag: 'WhatsApp',
        name: 'WhatsApp AI',
        desc: 'Agent conversațional multilingv, 24/7, integrat direct în WhatsApp Business.',
        href: '/whatsapp-ai',
        cta: 'Află mai mult',
      },
      {
        icon: '🌍',
        tag: 'GEO',
        name: 'GEO Gateway',
        desc: 'Rutare inteligentă a traficului bazată pe locație, limbă și context.',
        href: '/geo-gateway',
        cta: 'Află mai mult',
      },
      {
        icon: '🛡️',
        tag: 'Fraud',
        name: 'Fraud AI',
        desc: 'Detectare fraude în timp real cu precizie de 99.7% prin ML avansat.',
        href: '/fraud-ai',
        cta: 'Află mai mult',
      },
    ],
  },
  howItWorks: {
    cards: [
      {
        tag: '// layer_01 — NAP',
        title: 'Natural Action Processing',
        body: 'Motorul NLP înțelege intenția clientului în orice limbă, instant.',
        bullets: ['95+ limbi suportate', 'Latency < 200ms', 'Context multi-turn'],
        snippet: '{\n  "intent": "rezervare",\n  "confidence": 0.97,\n  "lang": "ro"\n}',
      },
      {
        tag: '// layer_02 — Trust',
        title: 'Trust Scoring Engine',
        body: 'Fiecare sesiune primește un scor de risc calculat în timp real.',
        bullets: ['Fraud detection', 'Behavioral biometrics', 'Device fingerprinting'],
        snippet: '{\n  "trust_score": 94,\n  "risk": "LOW",\n  "action": "allow"\n}',
      },
      {
        tag: '// layer_03 — AKL',
        title: 'Adaptive Knowledge Layer',
        body: 'Modelele se antrenează continuu pe datele afacerii tale.',
        bullets: ['Fine-tuning automat', 'Knowledge graph', 'Zero-shot learning'],
        snippet: '{\n  "model": "caty-v2",\n  "accuracy": "99.1%",\n  "latency": "180ms"\n}',
      },
      {
        tag: '// layer_04 — SENTINEL',
        title: 'SENTINEL Security',
        body: 'Protecție enterprise completă, audit trail și conformitate GDPR.',
        bullets: ['End-to-end encryption', 'SOC 2 Type II', 'GDPR & CCPA ready'],
        snippet: '{\n  "encryption": "AES-256",\n  "audit": "enabled",\n  "gdpr": true\n}',
      },
    ],
  },
  testimonials: {
    tag: '// clienți',
    items: [
      '"Rata de conversie a crescut cu 340% în prima lună" — Andreea M., eCommerce',
      '"Suport 24/7 fără personal adițional. Revoluționar." — Dan P., Clinică',
      '"ROI de 12x în 6 luni. CatyAI este cel mai bun investment." — Radu T., Agenție',
      '"Am redus costurile de suport cu 70%" — Maria I., Retail',
      '"Implementare în 48h. Echipa tehnică excepțională." — Alexandru N., CEO',
    ],
  },
  industries: {
    tag: '// industrii',
    h2: 'Soluții pentru orice industrie',
    items: [
      { icon: '🛒', label: 'eCommerce' },
      { icon: '🏥', label: 'Clinici' },
      { icon: '🏨', label: 'Hotele' },
      { icon: '🏠', label: 'Imobiliare' },
      { icon: '🍽️', label: 'Restaurante' },
      { icon: '📱', label: 'SaaS' },
      { icon: '⚖️', label: 'Legal' },
      { icon: '🏦', label: 'Financiar' },
    ],
  },
  faq: {
    tag: '// faq',
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Cât durează implementarea?', a: 'Implementarea standard durează 24-48h. Planurile Enterprise pot include configurări personalizate care durează 1-2 săptămâni.' },
      { q: 'Este compatibil cu WhatsApp Business API?', a: 'Da, CatyAI este partener oficial Meta și se integrează nativ cu WhatsApp Business API.' },
      { q: 'Cum este protejată confidențialitatea datelor?', a: 'Toate datele sunt criptate AES-256, stocate în UE și procesate conform GDPR. Nu vindem sau partajăm date.' },
      { q: 'Există o perioadă de probă gratuită?', a: 'Oferim 14 zile trial gratuit fără card de credit pentru toate planurile.' },
      { q: 'Ce suport tehnic este inclus?', a: 'Planul Starter include suport email. Pro include suport prioritar. Enterprise include un dedicated account manager.' },
    ],
  },
  finalCta: {
    badge: '✦ Începe acum',
    h2: 'Gata să transformi afacerea ta?',
    sub: '14 zile gratuit. Fără card. Fără contracte.',
    primary: 'Creează cont gratuit',
    primaryHref: 'https://app.catyai.io',
    secondary: 'Vorbește cu un expert',
    secondaryHref: '/contact',
  },
};

const PRODUCT_T = {
  badge: '✦ WhatsApp AI',
  h1: 'Agentul AI care vinde non-stop',
  sub: 'Transformă WhatsApp Business în cel mai performant canal de vânzări. Automatizare completă, ton de brand, 95+ limbi.',
  cta: { primary: 'Testează Gratuit', primaryHref: 'https://app.catyai.io', secondary: 'Demo Live', secondaryHref: '/demo' },
  features: {
    tag: '// funcționalități',
    h2: 'Tot ce ai nevoie pentru conversații care convertesc',
    items: [
      { icon: '🌍', title: 'Multilingv nativ', desc: '95+ limbi detectate automat, fără configurare.' },
      { icon: '🤖', title: 'AI conversațional', desc: 'NLP avansat înțelege intenția, nu doar cuvintele.' },
      { icon: '📊', title: 'Analytics real-time', desc: 'Dashboard complet cu rate de conversie și sentimente.' },
      { icon: '🔗', title: 'Integrări native', desc: 'Shopify, WooCommerce, HubSpot, Salesforce din cutie.' },
      { icon: '⚡', title: 'Răspuns < 200ms', desc: 'Latency sub 200ms garantat prin infrastructura edge.' },
      { icon: '🛡️', title: 'GDPR & SOC 2', desc: 'Conformitate completă, audit trail, criptare E2E.' },
    ],
  },
  useCases: {
    tag: '// cazuri de utilizare',
    h2: 'Cum folosesc clienții noștri WhatsApp AI',
    items: [
      {
        title: 'Recuperare coșuri abandonate',
        body: 'Trimite mesaje personalizate automat la 1h, 24h și 72h după abandon. Rata medie de recuperare: 34%.',
        snippet: '// Trigger: cart_abandoned\n{\n  "delay": "1h",\n  "message": "Ai uitat ceva?",\n  "discount": "10%"\n}',
      },
      {
        title: 'Suport post-vânzare',
        body: 'Rezolvă 80% din întrebările de suport fără intervenție umană. Escaladare inteligentă pentru cazuri complexe.',
        snippet: '// Resolved automatically\n{\n  "ticket_id": "T-4821",\n  "resolved": true,\n  "human": false\n}',
      },
    ],
  },
  faqs: {
    tag: '// faq',
    h2: 'Întrebări despre WhatsApp AI',
    items: [
      { q: 'Am nevoie de cont WhatsApp Business API?', a: 'Da. Te ajutăm să îl obții în 24-48h ca partener Meta oficial.' },
      { q: 'Poate agentul prelua conversații umane?', a: 'Da, escaladarea la agent uman se face automat sau manual, cu istoric complet.' },
    ],
  },
  finalCta: {
    h2: 'Începe să vinzi prin WhatsApp azi',
    sub: '14 zile gratuit. Setup în sub 1 oră.',
    primary: 'Activează WhatsApp AI',
    primaryHref: 'https://app.catyai.io',
  },
};

const ENTERPRISE_T = {
  hero: {
    badge: '✦ Enterprise',
    h1: 'AI la scara\nenterprise',
    sub: 'Infrastructură dedicată, SLA garantat, contract personalizat. Pentru organizații care nu acceptă compromisuri.',
    cta: { primary: 'Vorbește cu Sales', primaryHref: '/contact', secondary: 'Descarcă Deck', secondaryHref: '#' },
  },
  layers: [
    {
      tag: '// layer_01 — Infrastructură',
      title: 'Cloud privat dedicat',
      body: 'Deployment pe infrastructura ta sau VPC dedicat în AWS/GCP/Azure. Zero vendor lock-in.',
      bullets: ['Single-tenant deployment', 'Bare-metal option', 'Custom data residency', 'Multi-region failover'],
      metric: { value: '99.99%', label: 'SLA uptime garantat' },
    },
    {
      tag: '// layer_02 — Securitate',
      title: 'Security-first by design',
      body: 'Conformitate completă cu standardele internaționale. Audit anual independent.',
      bullets: ['SOC 2 Type II', 'ISO 27001', 'GDPR & HIPAA ready', 'Penetration testing trimestrial'],
      metric: { value: '0', label: 'breaches de securitate în 5 ani' },
    },
    {
      tag: '// layer_03 — Support',
      title: 'Dedicated Customer Success',
      body: 'Account manager dedicat, SLA pe răspuns, onboarding white-glove pentru echipa ta.',
      bullets: ['24/7 priority support', '< 1h response SLA', 'Quarterly business reviews', 'Custom training'],
      metric: { value: '< 1h', label: 'timp mediu de răspuns support' },
    },
  ],
  partners: {
    tag: '// parteneri de încredere',
    h2: 'Folosit de echipe enterprise',
    logos: [
      { name: 'Meta Partner' },
      { name: 'AWS Partner' },
      { name: 'Google Cloud' },
      { name: 'Microsoft Azure' },
    ],
  },
  cta: {
    h2: 'Proiect enterprise în minte?',
    sub: 'Vorbim despre nevoile tale. Nicio obligație.',
    primary: 'Programează o discuție',
    primaryHref: '/contact',
    secondary: 'Trimite RFP',
    secondaryHref: '/contact',
  },
};

const STATIC_T = {
  tag: '// pagina',
  h1: 'Despre CatyAI',
  sub: 'Construim viitorul interacțiunii dintre afaceri și clienți.',
};

const LEGAL_T = {
  h1: 'Termeni și Condiții',
  lastUpdated: '2026-04-01',
};

/* ─── TAB BAR ───────────────────────────────────────── */
const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'static', label: 'Static' },
  { id: 'legal', label: 'Legal' },
];

function TabBar({ active, onChange }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] flex items-center gap-1 px-4 py-2 border-b border-white/10"
      style={{ background: 'rgba(1,10,31,0.95)', backdropFilter: 'blur(12px)' }}
    >
      <span className="font-mono text-[10px] text-gold/60 uppercase tracking-widest mr-3">DS Preview</span>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            active === tab.id
              ? 'bg-gold text-navy'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── PREVIEW PAGE ──────────────────────────────────── */
export default function DsPreview() {
  const [active, setActive] = useState('home');
  const [lang, setLang] = useState('ro');

  return (
    <>
      <TabBar active={active} onChange={setActive} />
      <div style={{ paddingTop: '40px' }}>
        {active === 'home' && (
          <HomePageTemplate t={HOME_T} lang={lang} onLangChange={setLang} />
        )}
        {active === 'product' && (
          <ProductPageTemplate t={PRODUCT_T} lang={lang} onLangChange={setLang} />
        )}
        {active === 'enterprise' && (
          <EnterpriseTemplate t={ENTERPRISE_T} lang={lang} onLangChange={setLang} />
        )}
        {active === 'static' && (
          <StaticPageTemplate t={STATIC_T} lang={lang} onLangChange={setLang}>
            <p className="text-slate-400 leading-relaxed">
              CatyAI este o platformă AI enterprise fondată în Dubai în 2023. Misiunea noastră este să democratizăm accesul la tehnologie AI pentru afacerile din toate industriile.
            </p>
            <h2 className="text-xl font-bold text-slate-50 mt-8 mb-3">Echipa noastră</h2>
            <p className="text-slate-400 leading-relaxed">
              O echipă de ingineri, designeri și specialiști în AI cu experiență combinată de peste 50 de ani în tech.
            </p>
          </StaticPageTemplate>
        )}
        {active === 'legal' && (
          <LegalPageTemplate t={LEGAL_T} lang={lang} onLangChange={setLang}>
            <h2>1. Acceptarea termenilor</h2>
            <p>Prin accesarea platformei CatyAI, acceptați în întregime acești termeni și condiții.</p>
            <h2>2. Utilizarea serviciilor</h2>
            <p>Serviciile CatyAI sunt destinate exclusiv utilizării comerciale legitime, în conformitate cu legile aplicabile.</p>
            <h2>3. Confidențialitate</h2>
            <p>Datele dumneavoastră sunt protejate conform <a href="/privacy">Politicii de Confidențialitate</a>.</p>
          </LegalPageTemplate>
        )}
      </div>
    </>
  );
}
