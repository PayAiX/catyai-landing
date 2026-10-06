/**
 * /chatgpt-feed — ChatGPT Product Feeds (PAS 3, brief 28 aug 2026).
 * URL decis de Adrian: /chatgpt-feed (consecvent cu /google-shopping-feed,
 * /facebook-instagram-feed; „ChatGPT" e termenul căutat de comercianți).
 * FĂRĂ redirect de pe /gpt-feeds — URL-ul n-a existat niciodată public.
 *
 * EN la /chatgpt-feed; versiunea RO la /ro/chatgpt-feed (6 oct 2026) = adaptare
 * 1:1 a copy-ului EN din brief: aceleași cifre și afirmații, zero claims noi.
 * Cifrele vin din sursa unică (src/lib/catalogStats.js — aff-llms.txt query).
 * Formularul = endpointul comun POST /api/leads/catalog-audit (repo Caty.AI),
 * caty_source=chatgpt-feed-page, GDPR + honeypot + conversie generate_lead.
 * ⚠️ Fără claims de refresh-rate („15-minute refresh" etc.) — pipeline-ul nu
 * livrează azi o rată garantată; formularea e „re-verified at every feed
 * generation".
 */
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'
import PartnerBadges from '../components/PartnerBadges'
import { MERCHANT_COUNT, productsShortM } from '../lib/catalogStats'
import { pageUrl, alternatesFor } from '../lib/localeUrls'

const SLUG = 'chatgpt-feed'
const N_MERCHANTS = String(MERCHANT_COUNT)
const M_DOT = productsShortM('en')
const M_COMMA = productsShortM('ro')

const API_LEADS_URL = 'https://api.catyai.io/api/leads/catalog-audit'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'ChatGPT Product Feeds',
      serviceType: 'AI commerce catalog pipeline',
      provider: { '@type': 'Organization', name: 'CatyAI' },
      areaServed: 'EU',
      description: 'Validation, enrichment and cryptographic signing of merchant product catalogs for AI commerce: ChatGPT product-feed campaigns, Google Shopping via CSS, Meta catalogs and AI agents — from one validated source of truth, operated by the team behind the PayAI-x CSS, a Google-approved Comparison Shopping Service serving a network of ' + N_MERCHANTS + ' merchants.',
    },
  ],
}

// Exemplul de feed (date-mostră, identice în ambele limbi).
const RAW_LINES = [
  { k: 'title', v: 'LAPTOP GAMING!!! REDUCERE' },
  { k: 'price', v: '1 RON' },
  { k: 'brand', v: 'SC EXAMPLE TRADING SRL' },
  { k: 'availability', v: 'in stock (?)' },
  { k: 'description', v: '<p>&nbsp;&amp;...' },
]

const CLEAN_LINES = [
  { k: 'title', v: 'Laptop gaming Lenovo LOQ 15, RTX 4060' },
  { k: 'price', v: '4,299.00 RON' },
  { k: 'brand', v: 'Lenovo' },
  { k: 'availability', v: 'in_stock · verified' },
  { k: 'signature', v: 'Ed25519 · verifiable' },
]

const PLATFORMS = ['Shopify', 'WooCommerce', 'PrestaShop', 'Magento', 'OpenCart', 'Gomag', 'MerchantPro']

const T = {
  en: {
    meta: {
      title: 'ChatGPT Product Feeds — AI commerce catalog pipeline | CatyAI',
      desc: 'ChatGPT advertising opened across Europe in August 2026 with product-feed campaigns. Most merchant feeds are not ready. CatyAI validates, enriches and signs AI-commerce-ready catalogs.',
    },
    badge: 'ChatGPT Product Feeds',
    heroTitle: 'Your catalog, ready for AI commerce',
    heroSub: 'On 24 August 2026 ChatGPT advertising opened across 31 European markets, Romania included. Ads Manager builds campaigns directly from product feeds — the copy a shopper sees is generated from your catalog data. If that data is wrong, the ad is wrong.',
    heroCta: 'Book a partnership call',
    heroCtaAlt: 'Google Shopping feeds →',
    heroCtaAltHref: '/google-shopping-feed',
    stats: [
      { v: M_DOT + '+', l: 'products processed' },
      { v: N_MERCHANTS, l: 'merchants' },
      { v: '~95%', l: 'acceptance rate' },
    ],
    panelRaw: 'RAW MERCHANT FEED',
    panelGate: 'semantic enrichment · validation gate · signature',
    panelClean: 'AI-COMMERCE READY',
    breakTitle: 'Why feeds break in AI advertising',
    breakIntro: 'Traditional feed errors cost you an impression. In AI advertising they cost you the claim. When ad copy is generated from your data, a stale price is not a formatting issue — it is a commercial claim the advertiser is responsible for.',
    breakCards: [
      { h: 'Stale prices', p: 'A price that changed since the last sync becomes ad copy promising the wrong number — a commercial claim you are responsible for.' },
      { h: 'Phantom stock', p: 'Products that sold out days ago keep generating ads that send shoppers to dead ends.' },
      { h: 'Unstructured text', p: 'Copy generated from shouty titles and HTML-polluted descriptions inherits the mess, verbatim.' },
      { h: 'No provenance', p: 'When a claim is challenged, nothing proves which data the merchant actually authorised, or when.' },
    ],
    stepsTitle: 'What CatyAI does',
    steps: [
      { n: '01', h: 'Semantic enrichment', p: 'Clean titles with correct diacritics, structured attributes, normalised brands. ' + M_DOT + '+ products processed.' },
      { n: '02', h: 'Validation before publication', p: 'A versioned rules engine gates every product; failures are rejected, never silently published; re-eligibility is deterministic.' },
      { n: '03', h: 'Freshness discipline', p: 'Availability and price are re-verified at every feed generation; products that fail freshness checks are withheld, not published stale.' },
      { n: '04', h: 'Cryptographic provenance', p: 'Ed25519 signatures with a public JWKS: any party can independently verify that a price or availability claim came from merchant-authorised data at a point in time. Trust Gateway, live in production on real merchant traffic.' },
      { n: '05', h: 'One catalog, every channel', p: 'The same validated source of truth produces Google Shopping feeds, Meta catalogs and AI-commerce feeds.' },
    ],
    fan: {
      aria: 'One validated catalog, four destinations',
      svgTitle: 'Merchant feed → CatyAI pipeline → Google Shopping via CSS, Meta catalog, ChatGPT product feeds, MCP/UCP agents',
      source: 'MERCHANT FEED',
      sourceSub: 'CSV · XML · API · Shopify · Woo',
      pipe: 'CATYAI PIPELINE',
      pipeSub1: 'enrichment · validation',
      pipeSub2: 'golden records · Ed25519',
      outs: ['Google Shopping via CSS', 'Meta catalog', 'ChatGPT product feeds', 'MCP/UCP agents'],
      caption: 'One validated catalog. Four destinations. No duplicated work.',
    },
    shiftTitle: 'The discovery shift',
    shiftText: "ChatGPT's in-chat checkout was discontinued in March 2026. What survived is discovery in AI, purchase on the merchant's site — which makes catalog data quality the entire battleground.",
    whoTitle: 'Who builds this',
    whoText: ['CatyAI is operated by the team behind the PayAI-x Comparison Shopping Service, approved by Google, serving a network of ', ' merchants. The pipeline was built to solve our own feed-quality problems first.'],
    ctaTitle: "See first what's wrong with your catalog",
    ctaText: 'Send us your feed link. You get a concrete report: how many products have a valid GTIN, how many have the right category, how many titles are missing, how many prices are placeholders. Free.',
    prefer: ['Prefer a direct conversation? Write to ', '.'],
    form: {
      honeypot: 'Company website',
      name: 'Name',
      store: 'Store',
      site: 'Site URL — https://your-store.com',
      feed: 'Feed URL — https://your-store.com/feed.xml',
      email: 'Email',
      phone: 'Phone (optional)',
      platform: 'Store platform',
      otherPlatform: 'Other platform / custom feed',
      gdpr: ['I agree that CatyAI processes the data in this form to contact me about the catalog audit, per the ', 'privacy policy', '. Consent is required to submit.'],
      submit: 'Request the catalog audit',
      sending: 'Sending…',
      doneTitle: 'Thank you — we received your request',
      doneText: 'We analyse the feed and email you a concrete report on your catalog: valid GTINs, categories, titles, placeholder prices.',
      errRate: 'Too many submissions — try again in an hour or write to sales@catyai.io.',
      errGeneric: 'Something went wrong. Write to sales@catyai.io.',
      errNetwork: 'Network error. Write to sales@catyai.io.',
    },
  },
  ro: {
    meta: {
      title: 'Feed-uri de produse pentru ChatGPT — pipeline de catalog pentru comerțul AI | CatyAI',
      desc: 'Reclamele ChatGPT s-au deschis în Europa în august 2026, cu campanii din feed-uri de produse. Majoritatea feed-urilor de comerciant nu sunt pregătite. CatyAI validează, îmbogățește și semnează cataloage gata pentru comerțul AI.',
    },
    badge: 'Feed-uri de produse ChatGPT',
    heroTitle: 'Catalogul tău, pregătit pentru comerțul AI',
    heroSub: 'Pe 24 august 2026, reclamele ChatGPT s-au deschis în 31 de piețe europene, inclusiv România. Ads Manager construiește campaniile direct din feed-uri de produse — textul pe care îl vede cumpărătorul e generat din datele catalogului tău. Dacă datele sunt greșite, reclama e greșită.',
    heroCta: 'Programează o discuție de parteneriat',
    heroCtaAlt: 'Feed-uri Google Shopping →',
    heroCtaAltHref: '/ro/google-shopping-feed',
    stats: [
      { v: M_COMMA + '+', l: 'produse procesate' },
      { v: N_MERCHANTS, l: 'comercianți' },
      { v: '~95%', l: 'rată de acceptare' },
    ],
    panelRaw: 'FEED BRUT DE COMERCIANT',
    panelGate: 'îmbogățire semantică · poartă de validare · semnătură',
    panelClean: 'GATA PENTRU COMERȚUL AI',
    breakTitle: 'De ce pică feed-urile în publicitatea AI',
    breakIntro: 'Erorile clasice de feed te costă o afișare. În publicitatea AI te costă afirmația. Când textul reclamei e generat din datele tale, un preț învechit nu e o problemă de formatare — e o afirmație comercială de care răspunde advertiserul.',
    breakCards: [
      { h: 'Prețuri învechite', p: 'Un preț schimbat de la ultima sincronizare devine text de reclamă care promite cifra greșită — o afirmație comercială de care răspunzi tu.' },
      { h: 'Stoc fantomă', p: 'Produse epuizate de zile întregi continuă să genereze reclame care trimit cumpărătorii în fundături.' },
      { h: 'Text nestructurat', p: 'Textul generat din titluri strigate și descrieri pline de HTML moștenește dezordinea, cuvânt cu cuvânt.' },
      { h: 'Fără proveniență', p: 'Când o afirmație e contestată, nimic nu dovedește ce date a autorizat de fapt comerciantul, și când.' },
    ],
    stepsTitle: 'Ce face CatyAI',
    steps: [
      { n: '01', h: 'Îmbogățire semantică', p: 'Titluri curate cu diacritice corecte, atribute structurate, branduri normalizate. ' + M_COMMA + '+ produse procesate.' },
      { n: '02', h: 'Validare înainte de publicare', p: 'Un motor de reguli versionat verifică fiecare produs; cele care pică sunt respinse, niciodată publicate pe tăcute; re-eligibilitatea e deterministică.' },
      { n: '03', h: 'Disciplina prospețimii', p: 'Disponibilitatea și prețul sunt re-verificate la fiecare generare a feed-ului; produsele care pică verificările de prospețime sunt reținute, nu publicate învechite.' },
      { n: '04', h: 'Proveniență criptografică', p: 'Semnături Ed25519 cu JWKS public: orice parte poate verifica independent că o afirmație despre preț sau disponibilitate provine din date autorizate de comerciant, la un moment anume. Trust Gateway, live în producție pe trafic real de comerciant.' },
      { n: '05', h: 'Un catalog, toate canalele', p: 'Aceeași sursă de adevăr validată produce feed-uri Google Shopping, cataloage Meta și feed-uri pentru comerțul AI.' },
    ],
    fan: {
      aria: 'Un catalog validat, patru destinații',
      svgTitle: 'Feed comerciant → pipeline CatyAI → Google Shopping prin CSS, catalog Meta, feed-uri de produse ChatGPT, agenți MCP/UCP',
      source: 'FEED COMERCIANT',
      sourceSub: 'CSV · XML · API · Shopify · Woo',
      pipe: 'PIPELINE CATYAI',
      pipeSub1: 'îmbogățire · validare',
      pipeSub2: 'golden records · Ed25519',
      outs: ['Google Shopping prin CSS', 'Catalog Meta', 'Feed-uri de produse ChatGPT', 'Agenți MCP/UCP'],
      caption: 'Un catalog validat. Patru destinații. Fără muncă duplicată.',
    },
    shiftTitle: 'Schimbarea în descoperire',
    shiftText: 'Checkout-ul din interiorul ChatGPT a fost întrerupt în martie 2026. Ce a rămas e descoperirea în AI și cumpărarea pe site-ul comerciantului — ceea ce face din calitatea datelor de catalog întregul câmp de luptă.',
    whoTitle: 'Cine construiește asta',
    whoText: ['CatyAI este operat de echipa din spatele serviciului de comparare prețuri PayAI-x, aprobat de Google, care deservește o rețea de ', ' comercianți. Pipeline-ul a fost construit mai întâi ca să ne rezolve propriile probleme de calitate a feed-urilor.'],
    ctaTitle: 'Vezi mai întâi ce e în neregulă cu catalogul tău',
    ctaText: 'Trimite-ne linkul feed-ului. Primești un raport concret: câte produse au GTIN valid, câte au categoria corectă, câte titluri lipsesc, câte prețuri sunt placeholder. Gratuit.',
    prefer: ['Preferi o discuție directă? Scrie la ', '.'],
    form: {
      honeypot: 'Site-ul companiei',
      name: 'Nume',
      store: 'Magazin',
      site: 'URL site — https://magazinul-tau.ro',
      feed: 'URL feed — https://magazinul-tau.ro/feed.xml',
      email: 'Email',
      phone: 'Telefon (opțional)',
      platform: 'Platforma magazinului',
      otherPlatform: 'Altă platformă / feed custom',
      gdpr: ['Sunt de acord ca CatyAI să prelucreze datele din acest formular pentru a mă contacta în legătură cu auditul de catalog, conform ', 'politicii de confidențialitate', '. Consimțământul e necesar pentru trimitere.'],
      submit: 'Solicită auditul de catalog',
      sending: 'Se trimite…',
      doneTitle: 'Mulțumim — am primit solicitarea',
      doneText: 'Analizăm feed-ul și îți trimitem pe email un raport concret despre catalogul tău: GTIN-uri valide, categorii, titluri, prețuri placeholder.',
      errRate: 'Prea multe trimiteri — încearcă din nou peste o oră sau scrie la sales@catyai.io.',
      errGeneric: 'Ceva n-a mers. Scrie la sales@catyai.io.',
      errNetwork: 'Eroare de rețea. Scrie la sales@catyai.io.',
    },
  },
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '9999px', background: '#34d399', boxShadow: '0 0 8px #34d39988', display: 'inline-block', flexShrink: 0 }} />
}

function Rule() {
  return <div style={{ width: 32, height: 3, background: '#d4b07a', borderRadius: 2, marginBottom: 18 }} />
}

function FeedPanel({ t }) {
  return (
    <div className="relative font-mono text-[12px]">
      <div className="bg-[#111a2c] border border-[#3d2b2b] rounded-xl p-5">
        <div className="text-[10px] tracking-widest uppercase text-[#e08a8a] mb-3">{t.panelRaw}</div>
        {RAW_LINES.map((l) => (
          <div key={l.k} className="flex gap-2 py-0.5">
            <span className="text-[#5c6883] w-24 flex-shrink-0">{l.k}:</span>
            <span className="text-[#e08a8a] line-through decoration-[#e08a8a]/50">{l.v}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 my-3 px-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b07a] to-transparent" />
        <span className="text-[10px] tracking-widest uppercase text-[#d4b07a]">{t.panelGate}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b07a] to-transparent" />
      </div>
      <div className="bg-[#111a2c] border border-[#34d399]/40 rounded-xl p-5" style={{ boxShadow: '0 8px 40px -18px rgba(52,211,153,.35)' }}>
        <div className="text-[10px] tracking-widest uppercase text-[#34d399] mb-3">{t.panelClean}</div>
        {CLEAN_LINES.map((l) => (
          <div key={l.k} className="flex gap-2 py-0.5">
            <span className="text-[#5c6883] w-24 flex-shrink-0">{l.k}:</span>
            <span className="text-[#c7d0e0]">{l.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** VIZUAL 2 — fan-out: un catalog validat, patru destinații. SVG inline, zero raster. */
function FanOutDiagram({ t }) {
  return (
    <figure aria-label={t.aria}>
      <svg viewBox="0 0 860 300" role="img" className="w-full h-auto">
        <title>{t.svgTitle}</title>
        <rect x="10" y="110" width="200" height="80" rx="10" fill="#111a2c" stroke="#1f293f" />
        <text x="110" y="140" textAnchor="middle" fill="#e7cfa3" fontSize="14" fontWeight="700">{t.source}</text>
        <text x="110" y="162" textAnchor="middle" fill="#8b96ab" fontSize="11">{t.sourceSub}</text>
        <line x1="210" y1="150" x2="290" y2="150" stroke="#d4b07a" strokeWidth="1.5" />
        <rect x="290" y="95" width="240" height="110" rx="10" fill="#111a2c" stroke="#d4b07a" />
        <text x="410" y="130" textAnchor="middle" fill="#e7cfa3" fontSize="14" fontWeight="700">{t.pipe}</text>
        <text x="410" y="152" textAnchor="middle" fill="#8b96ab" fontSize="11">{t.pipeSub1}</text>
        <text x="410" y="170" textAnchor="middle" fill="#8b96ab" fontSize="11">{t.pipeSub2}</text>
        {t.outs.map((label, i) => {
          const y = 30 + i * 66
          return (
            <g key={label}>
              <path d={`M 530 150 C 590 150, 590 ${y + 25}, 640 ${y + 25}`} fill="none" stroke="#34d399" strokeWidth="1.2" opacity="0.7" />
              <rect x="640" y={y} width="210" height="50" rx="8" fill="#111a2c" stroke="#1f293f" />
              <text x="745" y={y + 30} textAnchor="middle" fill="#c7d0e0" fontSize="12">{label}</text>
            </g>
          )
        })}
      </svg>
      <figcaption className="text-center text-[13px] text-[#8b96ab] italic mt-2">{t.caption}</figcaption>
    </figure>
  )
}

function AuditForm({ t }) {
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')
  const [utm, setUtm] = useState({})

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const captured = {}
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (q.get(k)) captured[k] = q.get(k)
    }
    setUtm(captured)
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = { ...Object.fromEntries(form.entries()), ...utm, caty_source: 'chatgpt-feed-page' }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch(API_LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.success) {
        setStatus('done')
        // Conversie: lead salvat server-side. Punct de extensie: evenimentul
        // OpenAI Pixel se emite TOT aici când pornește campania ChatGPT Ads.
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: 'catalog-audit-chatgpt-feed' })
        } else {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({ event: 'generate_lead', event_label: 'catalog-audit-chatgpt-feed' })
        }
      } else {
        setStatus('error')
        setError(body.error === 'rate_limited' ? t.errRate : (body.error || t.errGeneric))
      }
    } catch {
      setStatus('error')
      setError(t.errNetwork)
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center py-10">
        <p className="text-3xl" aria-hidden="true">✓</p>
        <h3 className="font-extrabold text-xl text-white mt-3">{t.doneTitle}</h3>
        <p className="text-[#8b96ab] mt-3 max-w-md mx-auto">{t.doneText}</p>
      </div>
    )
  }

  const inputCls = 'w-full bg-[#0a0f1c] border border-[#1f293f] text-white placeholder-[#5c6883] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4b07a] transition'
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 text-left">
      {/* honeypot: invisible to humans; bots filling it get a silent success server-side */}
      <div className="hidden" aria-hidden="true"><label>{t.honeypot}<input type="text" name="company_website" tabIndex="-1" autoComplete="off" /></label></div>
      <input className={inputCls} type="text" name="name" placeholder={t.name} required />
      <input className={inputCls} type="text" name="store" placeholder={t.store} required />
      <input className={inputCls} type="url" name="site_url" placeholder={t.site} required />
      <input className={inputCls} type="url" name="feed_url" placeholder={t.feed} required />
      <input className={inputCls} type="email" name="email" placeholder={t.email} required />
      <input className={inputCls} type="tel" name="phone" placeholder={t.phone} />
      <select className={inputCls + ' sm:col-span-2'} name="platform" required defaultValue="">
        <option value="" disabled>{t.platform}</option>
        {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
        <option value="alta">{t.otherPlatform}</option>
      </select>
      <label className="flex items-start gap-2.5 sm:col-span-2 text-[12px] text-[#8b96ab] leading-relaxed">
        <input type="checkbox" name="gdpr_consent" value="on" required className="mt-0.5" />
        <span>{t.gdpr[0]}<a href="/privacy" className="text-[#d4b07a] underline underline-offset-2">{t.gdpr[1]}</a>{t.gdpr[2]}</span>
      </label>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'} className="font-bold px-6 py-3 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3] disabled:opacity-60" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>
          {status === 'sending' ? t.sending : t.submit}
        </button>
        {status === 'error' && <p className="text-[#e08a8a] text-sm mt-3">{error}</p>}
      </div>
    </form>
  )
}

// `locale` vine din rută: /ro/chatgpt-feed → 'ro' (limba e fixată de URL);
// /chatgpt-feed → undefined → EN (comportamentul vechi).
export default function ChatGPTFeed({ locale }) {
  const [lang, setLang] = useState(locale || 'en')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.desc}
        url={pageUrl(SLUG, locale)}
        lang={lang}
        alternates={alternatesFor(SLUG)}
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(JSON_LD)}</script></Helmet>

      <div className="min-h-screen bg-[#0a0f1c] text-[#c7d0e0] font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>
          {/* HERO */}
          <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-20">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(48rem 28rem at 70% -6%, rgba(212,176,122,.10), transparent 62%), radial-gradient(40rem 24rem at 18% 4%, rgba(212,176,122,.05), transparent 60%)' }} />
            <div className="relative grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] text-[#d4b07a] border border-[#1f293f] bg-white/[.02] rounded-full px-3 py-1.5 uppercase font-mono tracking-widest">
                  <Dot /> {t.badge}
                </span>
                <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.05] mt-6 text-white">{t.heroTitle}</h1>
                <p className="text-[17px] text-[#8b96ab] mt-6 leading-relaxed max-w-xl">{t.heroSub}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#contact" className="font-bold px-6 py-3 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>{t.heroCta}</a>
                  <a href={t.heroCtaAltHref} className="font-semibold border border-[#1f293f] bg-[#111a2c] px-6 py-3 rounded-lg text-white hover:border-[#5c6883] transition">{t.heroCtaAlt}</a>
                </div>
                <PartnerBadges locale={lang} className="mt-6" />
                <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                  {t.stats.map((s) => (
                    <div key={s.l}>
                      <div className="font-extrabold text-2xl sm:text-3xl text-[#e7cfa3] tracking-tight">{s.v}</div>
                      <div className="text-[12px] text-[#8b96ab] mt-1 leading-snug">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <FeedPanel t={t} />
            </div>
          </section>

          {/* WHY FEEDS BREAK */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.breakTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.breakIntro}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {t.breakCards.map((c) => (
                  <div key={c.h} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="font-bold text-[#d4b07a]">{c.h}</div>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{c.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT CATYAI DOES */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.stepsTitle}</h2>
              <div className="mt-10 space-y-8 max-w-3xl">
                {t.steps.map((s) => (
                  <div key={s.n} className="flex gap-5">
                    <div className="font-mono text-[#d4b07a] font-bold flex-shrink-0">{s.n}</div>
                    <div>
                      <div className="font-bold text-white">{s.h}</div>
                      <p className="text-sm text-[#8b96ab] mt-1.5 leading-relaxed">{s.p}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-14"><FanOutDiagram t={t.fan} /></div>
            </div>
          </section>

          {/* DISCOVERY SHIFT */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl text-white">{t.shiftTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-5 max-w-3xl">{t.shiftText}</p>
            </div>
          </section>

          {/* WHO BUILDS THIS */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl text-white">{t.whoTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-5 max-w-3xl">
                {t.whoText[0]}{N_MERCHANTS}{t.whoText[1]}
              </p>
            </div>
          </section>

          {/* CTA / FORM */}
          <section id="contact" className="border-t border-[#1f293f]">
            <div className="max-w-3xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.ctaTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-5">{t.ctaText}</p>
              <div className="mt-8">
                <AuditForm t={t.form} />
              </div>
              <p className="text-sm text-[#5c6883] mt-6">
                {t.prefer[0]}<a href="mailto:sales@catyai.io" className="text-[#d4b07a] underline underline-offset-2">sales@catyai.io</a>{t.prefer[1]}
              </p>
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
