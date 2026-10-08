import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  RefreshCw, Bot, BadgePercent, ShoppingBag, ArrowRight, CheckCircle2,
  Globe2, Building2, UtensilsCrossed, Briefcase, Mail,
} from 'lucide-react';
import SEO from '../components/SEO';
import GlobalHeader from '../components/GlobalHeader';
import FooterV9 from '../components/FooterV9';
import { MERCHANT_COUNT, productsShortM } from '../lib/catalogStats';

// Cifrele din sursa unică (actualizate la build din api.catyai.io/api/public/catalog-stats). Nu hardcoda.
const N_M = String(MERCHANT_COUNT);
const M_DOT = productsShortM('en');
const M_COMMA = productsShortM('ro');

// Endpoint public de lead-uri — același folosit de /chatgpt-feed (api.catyai.io).
const LEADS_API = 'https://api.catyai.io/api/leads/catalog-audit';

// Clienți reali. Fiecare cifră are sursă — vezi docs/audit/AGENT89-homepage-vizibilitate-2026-10-08.md.
const CLIENTS = [
  {
    id: 'gotrendy',
    domain: 'gotrendy.ro',
    tag: { ro: 'Feed CSS activ', en: 'Active CSS feed' },
    stats: [
      {
        value: '185',
        label: { ro: 'produse în feedul Google', en: 'products in the Google feed' },
        source: 'feed gotrendy republicat 6 oct 2026',
      },
      {
        value: '26/76',
        label: { ro: 'defecte de feed găsite și reparate în <48h', en: 'feed defects found and fixed in <48h' },
        source: 'payai-x.com · case study CS.04',
      },
    ],
  },
  {
    id: 'luxoryavelar',
    domain: 'luxoryavelar.com',
    tag: { ro: 'Feed + conținut', en: 'Feed + content' },
    stats: [
      {
        value: '52',
        label: { ro: 'produse în feed (v6)', en: 'products in feed (v6)' },
        source: 'feed luxoryavelar v6, 6 oct 2026',
      },
      {
        value: '28',
        label: { ro: 'descrieri de produs rescrise', en: 'product descriptions rewritten' },
        source: 'GoMag luxoryavelar, 6 oct 2026',
      },
    ],
  },
];

const translations = {
  ro: {
    seoTitle: 'Facem catalogul tău vizibil pe Google Shopping și în ChatGPT | CatyAI',
    seoDescription: 'Feed automation, Google CSS Partner și optimizare GEO: CatyAI sincronizează catalogul tău de produse în Google Merchant Center și îl structurează pentru ca ChatGPT, Gemini și Perplexity să-l citească și să-l recomande.',
    keywords: 'google shopping feed, css partner, feed automation, vizibilitate AI, GEO optimizare, google merchant center, catalog produse, chatgpt produse, promovare google shopping',
    heroBadge: 'FEED AUTOMATION & GEO ENGINE',
    heroLine1: 'Facem catalogul tău vizibil',
    heroAccent: 'pe Google Shopping și în ChatGPT',
    heroSubtitle: 'Sincronizăm automat inventarul de produse în Google Merchant Center prin canal CSS direct și structurăm datele pentru motoarele de căutare conversaționale.',
    heroCtaPrimary: 'Vezi prețurile',
    heroCtaSecondary: 'Fă-ți catalogul vizibil',
    heroNote: 'Răspuns tehnic în maximum 24 de ore lucrătoare.',
    termProduct: 'produse',
    termMerchants: 'comercianți activi',
    termGMC: 'Google Merchant Center: conector activ',
    termAI: 'Indexare AI: ChatGPT / Gemini / Perplexity',
    termBadgeGeo: 'GEO READY',
    termBadgeCss: 'CSS DIRECT',
    termFootnote: 'cifre reale din catalogul public CatyAI (shop.catyai.io), actualizate la fiecare release',
    piecesLabel: 'ARHITECTURA PLATFORMEI',
    piecesTitle: 'Cele trei piese fundamentale ale vizibilității CatyAI',
    piece1Tag: 'PIESA 01 // CATALOG AUTOMATION',
    piece1Title: 'Feed: gestionarea catalogului de produse',
    piece1Body: 'Preluare, curățare și mapare automată a feed-urilor complexe. Corectăm atributele invalide, actualizăm stocurile și generăm fișiere optimizate pentru fiecare canal de distribuție.',
    piece2Tag: 'PIESA 02 // GENERATIVE ENGINE OPTIMIZATION',
    piece2Title: 'Vizibilitate AI / GEO',
    piece2Body: 'Optimizare semantică pentru ChatGPT, Gemini și Perplexity. Structurăm produsele astfel încât asistenții AI să le citească și să le recomande direct în conversații.',
    piece3Tag: 'PIESA 03 // CSS DIRECT ACCESS',
    piece3Title: 'Google CSS Partner',
    piece3Body: 'Canal direct și oficial către Google Shopping. Prin conexiunea CSS, bidul tău ajunge integral în licitație — fără comisionul de intermediere păstrat de Google pe conturile standard.',
    clientsLabel: 'CLIENȚI REALI',
    clientsTitle: 'Cataloage reale, în producție',
    clientsSub: 'Numere măsurate pe feed-urile clienților, nu promisiuni de marketing. Fiecare cifră are sursa listată mai jos.',
    clientsFootnote: 'Surse: feed-uri de producție gotrendy.ro și luxoryavelar.com (6 oct 2026) · case study CS.04 pe payai-x.com.',
    verticalLabel: 'SPECIALIZARE PE DOMENIU',
    verticalTitle: 'Ecommerce mai întâi',
    verticalSub: 'Cataloage extinse, variante multiple de produs și sincronizare dinamică de stoc — construite pentru magazine online care vând pe Google Shopping.',
    verticalFeatures: [
      'Mapare atribute obligatorii Google Merchant Center',
      'Variante de produs (mărime, culoare) fără erori de asociere',
      'Sincronizare stoc și preț la interval fix',
      'Structurare semantică pentru asistenții AI',
    ],
    verticalCta: 'Discută catalogul tău',
    verticalOtherTitle: 'Alte verticale, la cerere',
    verticalOtherBody: 'Clinici, imobiliare, restaurante, agenții — aceeași inginerie de date, adaptată structurii afacerii tale. Întreabă-ne dacă ni se potrivește.',
    cssLabel: 'AVANTAJUL STRUCTURAL',
    cssTitle: 'Canalul direct, nu intermediarul',
    cssBody: 'CatyAI operează ca serviciu de comparare a prețurilor (CSS). Pe un cont Google standard, Google păstrează aproximativ 20% din fiecare click plătit în Shopping. Prin conexiunea CSS directă, bugetul licitat ajunge integral în licitație — aceeași vizibilitate, fără diminuarea de la sursă.',
    cssWithoutTitle: 'Google standard (fără CSS)',
    cssWithoutBody: 'Google păstrează ~20% din fiecare licitație CPC. Bugetul de promovare e diminuat direct la sursă.',
    cssWithoutPct: '~80%',
    cssWithoutPctLabel: 'din bid ajunge în licitație',
    cssWithTitle: 'Prin canalul CatyAI CSS',
    cssWithBody: 'Bugetul licitat ajunge integral în licitație. Economia structurală de ~20% rămâne în bugetul tău de promovare.',
    cssWithPct: '100%',
    cssWithPctLabel: 'din bid ajunge în licitație',
    pricingLabel: 'COSTURI PREDICTIBILE',
    pricingTitle: 'Prețuri transparente, fără comisioane pe vânzări',
    pricingSub: 'Cost fix lunar pentru sincronizare continuă, plus un setup unic calibrat după complexitatea catalogului tău.',
    pricingMonthlyTag: 'Recurent',
    pricingMonthlyTitle: 'Abonament lunar',
    pricingMonthlyDesc: 'Plan lunar de sincronizare continuă și optimizare feed.',
    pricingSetupTag: 'Plată unică',
    pricingSetupTitle: 'Implementare & onboarding',
    pricingSetupDesc: 'Audit inițial, mapare atribute și configurare tehnică a catalogului.',
    pricingMonthlyFeatures: [
      'Sincronizare continuă Google Merchant Center',
      'Optimizare automată feed & curățare atribute',
      'Indexare semantică GEO pentru ChatGPT și AI',
      'Canal CSS direct (fără comisionul standard)',
    ],
    pricingSetupFeatures: [
      'Audit inițial și mapare atribute de produs',
      'Configurare conexiune Google Merchant Center & CSS',
      'Validare structură de date JSON-LD pentru AI',
    ],
    pricingMonthlyPrice: 'Preț calibrat după mărimea și complexitatea catalogului',
    pricingSetupPrice: 'Cost unic, calibrat după complexitatea catalogului',
    pricingOfferCta: 'Cere ofertă',
    pricingOfferNote: 'răspuns în 24h lucrătoare',
    formLabel: 'ACTIVEAZĂ FLUXUL',
    formTitle: 'Fă-ți catalogul vizibil în câteva zile',
    formSub: 'Completează datele magazinului tău pentru o analiză tehnică a feedului de produse și o demonstrație live a platformei CatyAI. Fără obligații contractuale.',
    formTelemetryTitle: 'TELEMETRIE INTEGRARE // CATY-ROUTER',
    formTelemetry: [
      { k: 'Protocol', v: 'Google CSS / OpenAI Engine' },
      { k: 'Timp răspuns', v: 'max. 24 ore lucrătoare' },
      { k: 'Procesare catalog', v: 'Automatizată & securizată' },
    ],
    fieldName: 'Nume',
    fieldEmail: 'Email',
    fieldPhone: 'Telefon',
    fieldSite: 'Site (URL magazin)',
    formSubmit: 'Trimite',
    formSending: 'Se trimite…',
    formDoneTitle: 'Cerere trimisă',
    formDoneText: 'Am primit datele. Un inginer CatyAI îți analizează feedul și revine cu rezultatele în maximum 24 de ore lucrătoare.',
    formErrGeneric: 'Nu am putut trimite cererea. Încearcă din nou sau scrie-ne pe contact@catyai.io.',
    formErrRate: 'Prea multe cereri de pe această adresă — revino peste câteva minute.',
    formErrNetwork: 'Problemă de conexiune. Verifică internetul și reîncearcă.',
    formGdpr: 'Trimițând formularul ești de acord să fii contactat despre analiza feedului. Datele nu pleacă la terți.',
  },
  en: {
    seoTitle: 'We make your catalog visible on Google Shopping and in ChatGPT | CatyAI',
    seoDescription: 'Feed automation, Google CSS Partner and GEO optimization: CatyAI syncs your product catalog into Google Merchant Center and structures it so ChatGPT, Gemini and Perplexity can read and recommend it.',
    keywords: 'google shopping feed, css partner, feed automation, ai visibility, geo optimization, google merchant center, product catalog, chatgpt products',
    heroBadge: 'FEED AUTOMATION & GEO ENGINE',
    heroLine1: 'We make your catalog visible',
    heroAccent: 'on Google Shopping and in ChatGPT',
    heroSubtitle: 'We automatically sync your product inventory into Google Merchant Center through a direct CSS channel and structure the data for conversational search engines.',
    heroCtaPrimary: 'See pricing',
    heroCtaSecondary: 'Make your catalog visible',
    heroNote: 'Technical reply within 24 business hours.',
    termProduct: 'products',
    termMerchants: 'active merchants',
    termGMC: 'Google Merchant Center: connector active',
    termAI: 'AI indexing: ChatGPT / Gemini / Perplexity',
    termBadgeGeo: 'GEO READY',
    termBadgeCss: 'CSS DIRECT',
    termFootnote: 'real figures from the public CatyAI catalog (shop.catyai.io), updated at every release',
    piecesLabel: 'PLATFORM ARCHITECTURE',
    piecesTitle: 'The three building blocks of CatyAI visibility',
    piece1Tag: 'PIECE 01 // CATALOG AUTOMATION',
    piece1Title: 'Feed: product catalog management',
    piece1Body: 'Automated ingestion, cleaning and mapping of complex feeds. We fix invalid attributes, keep stock up to date and generate files optimized for every distribution channel.',
    piece2Tag: 'PIECE 02 // GENERATIVE ENGINE OPTIMIZATION',
    piece2Title: 'AI visibility / GEO',
    piece2Body: 'Semantic optimization for ChatGPT, Gemini and Perplexity. We structure your products so AI assistants can read them and recommend them directly in conversations.',
    piece3Tag: 'PIECE 03 // CSS DIRECT ACCESS',
    piece3Title: 'Google CSS Partner',
    piece3Body: 'A direct, official channel to Google Shopping. Through the CSS connection, your bid reaches the auction in full — without the intermediary margin Google keeps on standard accounts.',
    clientsLabel: 'REAL CLIENTS',
    clientsTitle: 'Real catalogs, in production',
    clientsSub: 'Numbers measured on client feeds, not marketing promises. Every figure lists its source below.',
    clientsFootnote: 'Sources: production feeds gotrendy.ro and luxoryavelar.com (Oct 6, 2026) · case study CS.04 on payai-x.com.',
    verticalLabel: 'DOMAIN SPECIALIZATION',
    verticalTitle: 'Ecommerce first',
    verticalSub: 'Large catalogs, multiple product variants and dynamic stock sync — built for online stores selling on Google Shopping.',
    verticalFeatures: [
      'Mapping of mandatory Google Merchant Center attributes',
      'Product variants (size, color) without association errors',
      'Stock and price sync on a fixed schedule',
      'Semantic structuring for AI assistants',
    ],
    verticalCta: 'Discuss your catalog',
    verticalOtherTitle: 'Other verticals, on request',
    verticalOtherBody: 'Clinics, real estate, restaurants, agencies — the same data engineering, adapted to your business structure. Ask us if we are a fit.',
    cssLabel: 'THE STRUCTURAL ADVANTAGE',
    cssTitle: 'The direct channel, not the middleman',
    cssBody: 'CatyAI operates as a comparison shopping service (CSS). On a standard Google account, Google keeps roughly 20% of every click paid in Shopping. Through the direct CSS connection, your full bid reaches the auction — the same visibility, without the source-level cut.',
    cssWithoutTitle: 'Google standard (no CSS)',
    cssWithoutBody: 'Google keeps ~20% of every CPC auction. Your advertising budget is reduced at the source.',
    cssWithoutPct: '~80%',
    cssWithoutPctLabel: 'of bid reaches the auction',
    cssWithTitle: 'Through the CatyAI CSS channel',
    cssWithBody: 'The full bid reaches the auction. The structural ~20% saving stays in your advertising budget.',
    cssWithPct: '100%',
    cssWithPctLabel: 'of bid reaches the auction',
    pricingLabel: 'PREDICTABLE COSTS',
    pricingTitle: 'Transparent pricing, no sales commissions',
    pricingSub: 'A fixed monthly cost for continuous sync, plus a one-time setup calibrated to your catalog complexity.',
    pricingMonthlyTag: 'Recurring',
    pricingMonthlyTitle: 'Monthly subscription',
    pricingMonthlyDesc: 'Monthly plan for continuous sync and feed optimization.',
    pricingSetupTag: 'One-time',
    pricingSetupTitle: 'Implementation & onboarding',
    pricingSetupDesc: 'Initial audit, attribute mapping and technical catalog setup.',
    pricingMonthlyFeatures: [
      'Continuous Google Merchant Center sync',
      'Automatic feed optimization & attribute cleaning',
      'GEO semantic indexing for ChatGPT and AI',
      'Direct CSS channel (no standard commission)',
    ],
    pricingSetupFeatures: [
      'Initial audit and product attribute mapping',
      'Google Merchant Center & CSS connection setup',
      'JSON-LD data structure validation for AI',
    ],
    pricingMonthlyPrice: 'Price calibrated to the size and complexity of your catalog',
    pricingSetupPrice: 'One-time cost, calibrated to catalog complexity',
    pricingOfferCta: 'Request a quote',
    pricingOfferNote: 'reply within 24 business hours',
    formLabel: 'ACTIVATE THE FEED',
    formTitle: 'Make your catalog visible within days',
    formSub: 'Fill in your store details for a technical analysis of your product feed and a live demo of the CatyAI platform. No contractual obligations.',
    formTelemetryTitle: 'INTEGRATION TELEMETRY // CATY-ROUTER',
    formTelemetry: [
      { k: 'Protocol', v: 'Google CSS / OpenAI Engine' },
      { k: 'Response time', v: 'max. 24 business hours' },
      { k: 'Catalog processing', v: 'Automated & secure' },
    ],
    fieldName: 'Name',
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldSite: 'Website (store URL)',
    formSubmit: 'Submit',
    formSending: 'Sending…',
    formDoneTitle: 'Request sent',
    formDoneText: 'We received your details. A CatyAI engineer will analyze your feed and come back with results within 24 business hours.',
    formErrGeneric: 'Could not send the request. Try again or write to contact@catyai.io.',
    formErrRate: 'Too many requests from this address — come back in a few minutes.',
    formErrNetwork: 'Connection problem. Check your internet and retry.',
    formGdpr: 'By submitting you agree to be contacted about the feed analysis. Your data is not shared with third parties.',
  },
};

export default function HomePage() {
  const [lang, setLang] = useState(localStorage.getItem('caty-lang') || 'ro');
  const t = translations[lang] || translations.ro;

  // Reveal-on-scroll (aceeași mecanică ca vechiul homepage)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  return (
    <>
      <SEO
        url="https://catyai.io/"
        title={t.seoTitle}
        description={t.seoDescription}
        image="https://catyai.io/og-image.png"
        lang={lang}
        service={{
          name: 'CatyAI — Feed Automation & GEO Engine',
          description: t.seoDescription,
          features: [
            'Product catalog sync into Google Merchant Center',
            'Direct Google CSS channel',
            'GEO semantic indexing for ChatGPT, Gemini, Perplexity',
            'Feed audit and attribute mapping',
          ],
        }}
      />
      <Helmet>
        <title>{t.seoTitle}</title>
        <html lang={lang} />
        <meta name="author" content="PayAi-X S.R.L." />
        <meta name="keywords" content={t.keywords} />
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDescription} />
      </Helmet>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .hero-grid-bg {
          background-image:
            linear-gradient(rgba(200,161,101,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,161,101,0.05) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .term-line { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div className="bg-navy text-white min-h-screen font-sans">
        <GlobalHeader lang={lang} setLang={setLang} />

        <main>
          {/* ============== 1. HERO ============== */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 hero-grid-bg" />
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
                 style={{ background: 'radial-gradient(closest-side, #1A3F7A, transparent)' }} />
            <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28 grid lg:grid-cols-2 gap-14 items-center">
              <div className="reveal">
                <p className="term-line text-xs tracking-[0.3em] text-gold mb-6">{t.heroBadge}</p>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                  {t.heroLine1}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#D4B57A]">
                    {t.heroAccent}
                  </span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl font-light">
                  {t.heroSubtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#preturi" className="btn-primary px-8 py-4 rounded-xl text-base font-bold inline-flex items-center gap-2">
                    {t.heroCtaPrimary} <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#contact" className="btn-secondary px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2">
                    {t.heroCtaSecondary}
                  </a>
                </div>
                <p className="term-line text-xs text-slate-500 mt-6">{t.heroNote}</p>
              </div>

              {/* Widget terminal decorativ — afișează DOAR cifre reale din catalogStats (build-time). */}
              <div className="reveal">
                <div className="rounded-2xl border border-navy-lighter bg-navy-light/80 backdrop-blur shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-lighter">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="term-line text-[11px] text-slate-500 ml-2">catyai://feed-orchestrator.v2</span>
                  </div>
                  <div className="p-5 term-line text-[13px] leading-7 text-slate-300">
                    <p><span className="text-gold">&gt;</span> {M_COMMA} {t.termProduct} · {N_M} {t.termMerchants}</p>
                    <p><span className="text-gold">&gt;</span> {t.termGMC}</p>
                    <p><span className="text-gold">&gt;</span> {t.termAI}</p>
                    <div className="flex gap-2 mt-4">
                      <span className="px-3 py-1 rounded border border-green-500/40 text-green-400 text-[11px] tracking-widest">{t.termBadgeGeo}</span>
                      <span className="px-3 py-1 rounded border border-gold/40 text-gold text-[11px] tracking-widest">{t.termBadgeCss}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-3">* {t.termFootnote}</p>
              </div>
            </div>
          </section>

          {/* ============== 2. CELE TREI PIESE ============== */}
          <section id="piese" className="max-w-6xl mx-auto px-6 py-24">
            <div className="reveal mb-14">
              <p className="term-line text-xs tracking-[0.3em] text-gold mb-4">{t.piecesLabel}</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">{t.piecesTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: RefreshCw, tag: t.piece1Tag, title: t.piece1Title, body: t.piece1Body },
                { icon: Bot, tag: t.piece2Tag, title: t.piece2Title, body: t.piece2Body },
                { icon: BadgePercent, tag: t.piece3Tag, title: t.piece3Title, body: t.piece3Body },
              ].map((p, i) => (
                <article key={i} className="reveal rounded-2xl border border-navy-lighter bg-navy-light p-8 hover:border-gold/40 transition-colors">
                  <p.icon className="w-8 h-8 text-gold mb-6" strokeWidth={1.5} />
                  <p className="term-line text-[11px] tracking-[0.2em] text-slate-500 mb-3">{p.tag}</p>
                  <h3 className="text-xl font-bold mb-4 leading-snug">{p.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-[15px]">{p.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ============== 3. CLIENȚI REALI ============== */}
          <section id="clienti" className="border-y border-navy-lighter bg-navy-light/40">
            <div className="max-w-6xl mx-auto px-6 py-24">
              <div className="reveal mb-14">
                <p className="term-line text-xs tracking-[0.3em] text-gold mb-4">{t.clientsLabel}</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{t.clientsTitle}</h2>
                <p className="text-slate-400 max-w-2xl">{t.clientsSub}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {CLIENTS.map((c) => (
                  <article key={c.id} className="reveal rounded-2xl border border-navy-lighter bg-navy p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-extrabold tracking-tight">{c.domain}</h3>
                      <span className="term-line text-[11px] px-3 py-1 rounded-full border border-gold/40 text-gold whitespace-nowrap">
                        {typeof c.tag === 'string' ? c.tag : c.tag[lang] || c.tag.ro}
                      </span>
                    </div>
                    <div className="space-y-6">
                      {c.stats.map((s, i) => (
                        <div key={i}>
                          <p className="text-4xl font-extrabold text-gold tracking-tight">{s.value}</p>
                          <p className="text-slate-300 mt-1">{s.label[lang] || s.label.ro}</p>
                          <p className="term-line text-[11px] text-slate-600 mt-1">src: {s.source}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <p className="term-line text-[11px] text-slate-600 mt-8 reveal">{t.clientsFootnote}</p>
            </div>
          </section>

          {/* ============== 4. VERTICALA: ECOMMERCE ============== */}
          <section id="verticala" className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-start">
            <div className="reveal">
              <p className="term-line text-xs tracking-[0.3em] text-gold mb-4">{t.verticalLabel}</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 flex items-center gap-4">
                <ShoppingBag className="w-10 h-10 text-gold" strokeWidth={1.5} />
                {t.verticalTitle}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">{t.verticalSub}</p>
              <a href="#contact" className="btn-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2">
                {t.verticalCta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="reveal space-y-4">
              {t.verticalFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-navy-lighter bg-navy-light p-5">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-slate-300 text-[15px]">{f}</p>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-navy-lighter p-5">
                <p className="font-semibold text-white mb-1">{t.verticalOtherTitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{t.verticalOtherBody}</p>
                <div className="flex gap-4 mt-4 text-slate-500">
                  <Building2 className="w-5 h-5" strokeWidth={1.5} />
                  <Globe2 className="w-5 h-5" strokeWidth={1.5} />
                  <UtensilsCrossed className="w-5 h-5" strokeWidth={1.5} />
                  <Briefcase className="w-5 h-5" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </section>

          {/* ============== 5. CSS DIRECT ============== */}
          <section id="css" className="border-y border-navy-lighter bg-navy-light/40">
            <div className="max-w-6xl mx-auto px-6 py-24">
              <div className="reveal mb-14 max-w-3xl">
                <p className="term-line text-xs tracking-[0.3em] text-gold mb-4">{t.cssLabel}</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{t.cssTitle}</h2>
                <p className="text-slate-400 leading-relaxed">{t.cssBody}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="reveal rounded-2xl border border-navy-lighter bg-navy p-8 opacity-90">
                  <h3 className="font-bold text-lg mb-3 text-slate-300">{t.cssWithoutTitle}</h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-8">{t.cssWithoutBody}</p>
                  <p className="text-4xl font-extrabold text-slate-500 tracking-tight">{t.cssWithoutPct}</p>
                  <p className="term-line text-[11px] text-slate-600 mt-1">{t.cssWithoutPctLabel}</p>
                </div>
                <div className="reveal rounded-2xl border border-gold/40 bg-navy p-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.06]"
                       style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C8A165 0, #C8A165 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
                  <div className="relative">
                    <h3 className="font-bold text-lg mb-3 text-gold">{t.cssWithTitle}</h3>
                    <p className="text-slate-400 text-[15px] leading-relaxed mb-8">{t.cssWithBody}</p>
                    <p className="text-4xl font-extrabold text-gold tracking-tight">{t.cssWithPct}</p>
                    <p className="term-line text-[11px] text-slate-600 mt-1">{t.cssWithPctLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============== 6. PREȚURI (PLACEHOLDER) ============== */}
          <section id="preturi" className="max-w-6xl mx-auto px-6 py-24">
            <div className="reveal text-center mb-14">
              <p className="term-line text-xs tracking-[0.3em] text-gold mb-4">{t.pricingLabel}</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{t.pricingTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{t.pricingSub}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <article className="reveal rounded-2xl border border-gold/40 bg-navy-light p-8">
                <p className="term-line text-[11px] tracking-[0.2em] text-gold mb-3">{t.pricingMonthlyTag}</p>
                <h3 className="text-xl font-bold mb-2">{t.pricingMonthlyTitle}</h3>
                <p className="text-slate-500 text-sm mb-6">{t.pricingMonthlyDesc}</p>
                <p className="text-lg font-bold text-gold leading-snug mb-8">{t.pricingMonthlyPrice}</p>
                <ul className="space-y-3">
                  {t.pricingMonthlyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-[15px]">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} /> {f}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="reveal rounded-2xl border border-navy-lighter bg-navy-light p-8">
                <p className="term-line text-[11px] tracking-[0.2em] text-slate-500 mb-3">{t.pricingSetupTag}</p>
                <h3 className="text-xl font-bold mb-2">{t.pricingSetupTitle}</h3>
                <p className="text-slate-500 text-sm mb-6">{t.pricingSetupDesc}</p>
                <p className="text-lg font-bold text-white leading-snug mb-8">{t.pricingSetupPrice}</p>
                <ul className="space-y-3">
                  {t.pricingSetupFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-[15px]">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-1" strokeWidth={1.5} /> {f}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="reveal text-center mt-12">
              <a href="#contact" className="btn-primary px-10 py-4 rounded-xl font-bold inline-flex items-center gap-2">
                {t.pricingOfferCta} <ArrowRight className="w-4 h-4" />
              </a>
              <p className="term-line text-xs text-slate-500 mt-4">{t.pricingOfferNote}</p>
            </div>
          </section>

          {/* ============== 7. CTA / FORMULAR ============== */}
          <section id="contact" className="border-t border-navy-lighter bg-navy-light/40">
            <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-start">
              <div className="reveal">
                <p className="term-line text-xs tracking-[0.3em] text-gold mb-4">{t.formLabel}</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{t.formTitle}</h2>
                <p className="text-slate-400 leading-relaxed mb-10">{t.formSub}</p>
                <div className="rounded-2xl border border-navy-lighter bg-navy p-6 term-line text-[12px] leading-7 text-slate-400">
                  <p className="text-slate-500 tracking-[0.2em] text-[10px] mb-4">{t.formTelemetryTitle}</p>
                  {t.formTelemetry.map((row, i) => (
                    <p key={i}><span className="text-gold">&gt;</span> {row.k}: <span className="text-slate-300">{row.v}</span></p>
                  ))}
                </div>
              </div>
              <LeadForm t={t} lang={lang} />
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />

        {/* WhatsApp floating button (număr real, existent pe site) */}
        <a
          href="https://wa.me/40750195048?text=Salut! Vreau să aflu mai multe despre CatyAI"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#A68246] hover:bg-[#8f6e38] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.122 1.523 5.855L.057 23.882a.5.5 0 0 0 .606.63l6.208-1.637A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.213-3.724.982.993-3.634-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
          </svg>
          <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
        </a>
      </div>
    </>
  );
}

function LeadForm({ t, lang }) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  // UTM captate leneș la montare (fără effect — react-hooks/set-state-in-effect).
  const [utm] = useState(() => {
    if (typeof window === 'undefined') return {};
    const q = new URLSearchParams(window.location.search);
    const captured = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (q.get(k)) captured[k] = q.get(k);
    }
    return captured;
  });

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      ...Object.fromEntries(form.entries()),
      ...utm,
      caty_source: 'homepage-vizibilitate',
      lang,
    };
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(LEADS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.success) {
        setStatus('done');
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: 'homepage-vizibilitate' });
        }
      } else {
        setStatus('error');
        setError(body.error === 'rate_limited' ? t.formErrRate : (body.error || t.formErrGeneric));
      }
    } catch {
      setStatus('error');
      setError(t.formErrNetwork);
    }
  }

  if (status === 'done') {
    return (
      <div className="reveal visible rounded-2xl border border-gold/40 bg-navy p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="text-xl font-bold mb-3">{t.formDoneTitle}</h3>
        <p className="text-slate-400 leading-relaxed">{t.formDoneText}</p>
      </div>
    );
  }

  const inputCls = 'w-full rounded-xl border border-navy-lighter bg-navy px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/60 transition-colors';
  const labelCls = 'block text-sm font-medium text-slate-300 mb-2';

  return (
    <form onSubmit={onSubmit} className="reveal visible rounded-2xl border border-navy-lighter bg-navy-light p-8 space-y-5">
      <div>
        <label htmlFor="lf-name" className={labelCls}>{t.fieldName}</label>
        <input id="lf-name" name="name" type="text" required autoComplete="name" className={inputCls} />
      </div>
      <div>
        <label htmlFor="lf-email" className={labelCls}>{t.fieldEmail}</label>
        <input id="lf-email" name="email" type="email" required autoComplete="email" className={inputCls} />
      </div>
      <div>
        <label htmlFor="lf-phone" className={labelCls}>{t.fieldPhone}</label>
        <input id="lf-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
      </div>
      <div>
        <label htmlFor="lf-site" className={labelCls}>{t.fieldSite}</label>
        <input id="lf-site" name="site" type="url" required placeholder="https://" autoComplete="url" className={inputCls} />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">{error}</p>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-60">
        {status === 'sending' ? t.formSending : t.formSubmit}
      </button>
      <p className="text-[11px] text-slate-600 leading-relaxed flex items-start gap-2">
        <Mail className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        {t.formGdpr}
      </p>
    </form>
  );
}
