import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import { MERCHANT_COUNT, productsFull, productsShortM } from '../lib/catalogStats'

// Cifrele din sursa unică (actualizate la build). Nu hardcoda.
const N_M = String(MERCHANT_COUNT)
const P_RO = productsFull('ro')
const P_EN = productsFull('en')
const M_DOT = productsShortM('en')
const M_COMMA = productsShortM('ro')

const translations = {
  ro: {
    badge: 'Capătul lanțului · Agentic Marketplace',
    h1: 'Și totul se termină',
    h1Accent: 'în bani.',
    sub: 'Catalogul tău, rescris semantic și semnat criptografic, expus agenților AI ca sursă de adevăr. Click atribuit, comandă dovedită, comision facturat automat la livrare. Tu rămâi Merchant of Record — noi nu atingem banii clientului tău.',
    ctaPrimary: 'Deschide marketplace-ul live',
    ctaSecondary: 'Programează o discuție',
    // live proof
    liveTag: 'Dovada vie — nu promitem, arătăm',
    liveH2: 'Funcționează deja. În bani, nu în sliduri.',
    stat1N: P_RO + '+', stat1L: 'produse indexate în Agentic Marketplace', stat1T: 'LIVE pe shop.catyai.io',
    stat2N: '21', stat2L: 'comercianți conectați prin feed-uri semnate', stat2T: 'Feed-uri Ed25519 · livrare <3s',
    stat3N: '5%', stat3L: 'comision doar la comandă livrată — nu plătești vizibilitate, plătești rezultat', stat3T: 'Facturare B2B automată',
    stat4N: '#80179', stat4L: 'comandă reală atribuită end-to-end: citare → click → comandă → comision', stat4T: 'IPB · lanț dovedit în producție',
    // how
    howTag: 'Cum funcționează',
    howH2: 'De la catalogul tău la comisionul din cont.',
    how1T: 'Conectezi catalogul',
    how1P: 'Feed, API sau crawl automat. GoMag, WooCommerce, Shopify sau XML — nu schimbi nimic la magazin, nu atingi DNS-ul.',
    how2T: 'Îl rescriem și îl semnăm',
    how2P: 'Fabrica Semantică transformă produsele în pagini curate, structurate și semnate criptografic — exact formatul pe care AI-ul îl citește și îl poate verifica.',
    how3T: 'AI-ul te citează',
    how3P: 'ChatGPT, Perplexity și Gemini citesc catalogul tău semnat și îl recomandă ca sursă de adevăr — nu pe al competitorului.',
    how4T: 'Tu vezi comisionul',
    how4P: 'Fiecare citare → click → comandă e atribuită automat. Reconciliere săptămânală, factură B2B doar la comenzi livrate.',
    // pricing model
    modelTag: 'Modelul de parteneriat',
    modelH2: 'Plătești setup o dată. Apoi câștigăm doar când vinzi tu.',
    setupPrice: '€1.500',
    setupLabel: 'taxă de setup, o singură dată',
    revshare: '+5%',
    revshareLabel: 'revenue share — doar din comenzile livrate, generate organic de agenții AI',
    modelFeat1: 'GEO Gateway — catalog citibil de ChatGPT, Perplexity, Gemini',
    modelFeat2: 'Trust Gateway — prețuri și stoc semnate criptografic',
    modelFeat3: 'Pagini SSR de produs pe shop.catyai.io, cu atribuire completă',
    modelFeat4: 'Reconciliere automată săptămânală · factură B2B doar la livrare',
    modelFeat5: 'Dashboard: citări, clickuri din AI, comision — în bani',
    modelAlign: 'Aliniere totală: dacă tu nu vinzi, noi nu câștigăm nimic.',
    modelCta: 'Programează o discuție de parteneriat',
    // earn transparency
    earnTitle: 'De ce poți avea încredere în model: noi câștigăm din exact același mecanism.',
    earnBody: 'Marketplace-ul nostru propriu — shop.catyai.io — trăiește din aceleași comisioane de afiliere pe care le va genera și catalogul tău: ' + P_RO + '+ produse · ' + N_M + ' de comercianți activi · comisioane de la 1% la 20% per tranzacție, aduse organic de agenții AI, cu zero buget de reclame (Zero-CAC). Îți instalăm infrastructura pe care o folosim noi înșine, în producție, în fiecare zi.',
    // faq
    faqTag: 'Întrebări frecvente',
    faq1Q: 'Cum funcționează comisionul de 5%?',
    faq1A: 'Plătești 5% doar din comenzile livrate cu succes, generate organic de agenții AI. Tu rămâi Merchant of Record — banii clientului intră direct la tine. Reconcilierea e automată săptămânal, iar factura B2B se emite doar pentru comenzile livrate. Fără vânzare, fără comision.',
    faq2Q: 'Ce include taxa de setup de €1.500?',
    faq2A: 'Rescrierea semantică a catalogului, semnarea criptografică a datelor, generarea paginilor SSR pe shop.catyai.io, configurarea atribuției complete și o sesiune de onboarding dedicată. E o taxă unică — nu e abonament.',
    faq3Q: 'Cât durează până apar primele vânzări?',
    faq3A: 'Catalogul devine citibil de agenții AI în câteva zile de la setup. Primele citări apar de regulă în 1–2 săptămâni, în funcție de categorie și de cât de des întreabă clienții AI-ul despre produsele tale.',
    faq4Q: 'Trebuie să modific ceva la magazinul meu?',
    faq4A: 'Nu. Conectăm catalogul prin feed, API sau crawl — nu atingi DNS-ul, nu instalezi nimic, nu ai nevoie de developer. Magazinul tău rămâne exact cum e.',
    faq5Q: 'Cum știu că atribuirea e corectă?',
    faq5A: 'Fiecare citare, click și comandă poartă o referință unică de atribuire, înregistrată și auditabilă. Vezi în dashboard întregul lanț, de la citarea AI până la comanda livrată — nu e o estimare, e un lanț dovedit.',
    // final
    finalH2: 'Vrei catalogul tău aici?',
    finalSub: 'Vezi marketplace-ul live cu ' + M_COMMA + ' produse, sau programează direct o discuție de parteneriat.',
    finalCta1: 'Deschide shop.catyai.io',
    finalCta2: 'Discută cu noi',
    // prev
    prevLabel: 'Veriga anterioară',
    prevTitle: 'Trust Gateway — AI nu poate inventa prețul tău',
  },
  en: {
    badge: 'End of the chain · Agentic Marketplace',
    h1: 'And it all ends',
    h1Accent: 'in money.',
    sub: 'Your catalog, semantically rewritten and cryptographically signed, exposed to AI agents as a source of truth. Attributed click, proven order, commission invoiced automatically on delivery. You remain Merchant of Record — we never touch your customer\'s money.',
    ctaPrimary: 'Open the live marketplace',
    ctaSecondary: 'Book a call',
    liveTag: 'Live proof — we don\'t promise, we show',
    liveH2: 'It already works. In money, not in slides.',
    stat1N: P_EN + '+', stat1L: 'products indexed in the Agentic Marketplace', stat1T: 'LIVE on shop.catyai.io',
    stat2N: '21', stat2L: 'merchants connected via signed feeds', stat2T: 'Ed25519 feeds · <3s delivery',
    stat3N: '5%', stat3L: 'commission on delivered orders only — you pay for results, not visibility', stat3T: 'Automated B2B invoicing',
    stat4N: '#80179', stat4L: 'real order attributed end-to-end: citation → click → order → commission', stat4T: 'IPB · chain proven in production',
    howTag: 'How it works',
    howH2: 'From your catalog to the commission in your account.',
    how1T: 'Connect your catalog',
    how1P: 'Feed, API or automatic crawl. GoMag, WooCommerce, Shopify or XML — you change nothing in your store, you touch no DNS.',
    how2T: 'We rewrite and sign it',
    how2P: 'The Semantic Factory turns your products into clean, structured, cryptographically signed pages — exactly the format AI reads and can verify.',
    how3T: 'AI cites you',
    how3P: 'ChatGPT, Perplexity and Gemini read your signed catalog and recommend it as the source of truth — not your competitor\'s.',
    how4T: 'You see the commission',
    how4P: 'Every citation → click → order is attributed automatically. Weekly reconciliation, B2B invoice on delivered orders only.',
    modelTag: 'The partnership model',
    modelH2: 'Pay setup once. Then we only earn when you sell.',
    setupPrice: '€1,500',
    setupLabel: 'one-time setup fee',
    revshare: '+5%',
    revshareLabel: 'revenue share — on delivered orders only, generated organically by AI agents',
    modelFeat1: 'GEO Gateway — catalog readable by ChatGPT, Perplexity, Gemini',
    modelFeat2: 'Trust Gateway — prices and stock cryptographically signed',
    modelFeat3: 'SSR product pages on shop.catyai.io, with full attribution',
    modelFeat4: 'Automated weekly reconciliation · B2B invoice on delivery only',
    modelFeat5: 'Dashboard: citations, AI clicks, commission — in money',
    modelAlign: 'Full alignment: if you don\'t sell, we earn nothing.',
    modelCta: 'Book a partnership call',
    earnTitle: 'Why you can trust the model: we earn from the exact same mechanism.',
    earnBody: 'Our own marketplace — shop.catyai.io — runs on the same affiliate commissions your catalog will generate: ' + P_EN + '+ products · ' + N_M + ' active merchants · 1% to 20% commission per transaction, brought organically by AI agents, with zero ad spend (Zero-CAC). We install for you the very infrastructure we run ourselves, in production, every day.',
    faqTag: 'Frequently asked questions',
    faq1Q: 'How does the 5% commission work?',
    faq1A: 'You pay 5% only on successfully delivered orders generated organically by AI agents. You remain Merchant of Record — the customer\'s money goes straight to you. Reconciliation is automated weekly, and the B2B invoice is issued only for delivered orders. No sale, no commission.',
    faq2Q: 'What does the €1,500 setup fee include?',
    faq2A: 'Semantic rewriting of your catalog, cryptographic signing of the data, generation of SSR pages on shop.catyai.io, full attribution setup, and a dedicated onboarding session. It is a one-time fee — not a subscription.',
    faq3Q: 'How long until the first sales?',
    faq3A: 'Your catalog becomes readable by AI agents within days of setup. The first citations typically appear within 1–2 weeks, depending on your category and how often customers ask AI about your products.',
    faq4Q: 'Do I need to change anything in my store?',
    faq4A: 'No. We connect your catalog via feed, API or crawl — you touch no DNS, install nothing, and need no developer. Your store stays exactly as it is.',
    faq5Q: 'How do I know the attribution is accurate?',
    faq5A: 'Every citation, click and order carries a unique attribution reference, logged and auditable. You see the full chain in the dashboard, from AI citation to delivered order — it is not an estimate, it is a proven chain.',
    finalH2: 'Want your catalog here?',
    finalSub: 'See the live marketplace with ' + M_DOT + ' products, or book a partnership call directly.',
    finalCta1: 'Open shop.catyai.io',
    finalCta2: 'Talk to us',
    prevLabel: 'Previous link',
    prevTitle: 'Trust Gateway — AI cannot invent your price',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'CatyAI Agentic Marketplace',
  serviceType: 'B2B Revenue-Share Partnership',
  description: 'Catalog semantically rewritten and cryptographically signed, exposed to AI agents with full attribution from citation to order. €1,500 setup + 5% on delivered orders.',
  provider: { '@type': 'Organization', name: 'CatyAI', url: 'https://catyai.io' },
}

export default function Marketplace() {
  const [lang, setLang] = useState('ro')

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && translations[saved]) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  const t = translations[lang] || translations.ro

  return (
    <>
      <SEO
        title="Agentic Marketplace — Și totul se termină în bani | CatyAI"
        description="Catalogul tău, rescris semantic și semnat criptografic, expus agenților AI. Click atribuit, comandă dovedită, comision 5% doar la livrare. €1.500 setup."
        canonical="https://catyai.io/marketplace"
        jsonLd={jsonLd}
      />
      <GlobalHeader />
      <style>{`
        .mk-page { background: #010A1F; min-height: 100vh; color: #f1f5f9; font-family: 'Inter', sans-serif; }
        .mk-page * { box-sizing: border-box; }
        .mk-wrap { max-width: 1160px; margin: 0 auto; padding: 0 1.5rem; }

        .mk-lang { position: fixed; top: 88px; right: 1.25rem; z-index: 30; display: flex; gap: 0.25rem; padding: 0.25rem; background: rgba(1,10,31,0.85); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; backdrop-filter: blur(8px); }
        .mk-lang button { background: transparent; border: none; color: #94a3b8; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.35rem 0.7rem; border-radius: 100px; cursor: pointer; transition: all 0.18s; }
        .mk-lang button.active { background: rgba(200,161,101,0.15); color: #C8A165; }
        .mk-lang button:hover:not(.active) { color: #f1f5f9; }

        .mk-hero { padding: 9rem 1.5rem 5rem; text-align: center; background: linear-gradient(180deg, #030D26 0%, #010A1F 100%); position: relative; overflow: hidden; }
        .mk-hero::before { content: ''; position: absolute; top: -300px; left: 50%; transform: translateX(-50%); width: 900px; height: 600px; background: radial-gradient(ellipse, rgba(200,161,101,0.10), transparent 65%); pointer-events: none; }
        .mk-hero-inner { position: relative; max-width: 860px; margin: 0 auto; }
        .mk-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #C8A165; border: 1px solid rgba(200,161,101,0.3); border-radius: 100px; padding: 7px 16px; background: rgba(200,161,101,0.06); }
        .mk-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; }
        .mk-h1 { font-size: clamp(2.4rem, 5.4vw, 4rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.08; margin-top: 1.75rem; }
        .mk-h1 .gold { color: #C8A165; }
        .mk-sub { color: #94a3b8; font-size: 1.14rem; line-height: 1.65; max-width: 660px; margin: 1.5rem auto 0; }
        .mk-btns { display: flex; gap: 0.9rem; justify-content: center; flex-wrap: wrap; margin-top: 2.25rem; }
        .mk-btn { display: inline-flex; align-items: center; gap: 8px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; padding: 0.95rem 1.75rem; text-decoration: none; transition: transform 0.15s; }
        .mk-btn:hover { transform: translateY(-1px); }
        .mk-btn-primary { background: linear-gradient(135deg, #D4B57A, #C8A165); color: #010A1F; box-shadow: 0 4px 22px rgba(200,161,101,0.28); }
        .mk-btn-ghost { background: transparent; color: #f1f5f9; border: 1px solid rgba(255,255,255,0.14); }

        .mk-section { padding: 5.5rem 1.5rem; }
        .mk-section.alt { background: #0A1220; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .mk-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: #C8A165; border: 1px solid rgba(200,161,101,0.25); border-radius: 100px; padding: 6px 15px; margin-bottom: 1.5rem; background: rgba(200,161,101,0.05); }
        .mk-h2 { font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1.12; }
        .mk-lead { color: #94a3b8; font-size: 1.05rem; line-height: 1.65; max-width: 640px; margin-top: 1.1rem; }
        .mk-center { text-align: center; }
        .mk-center .mk-lead { margin-left: auto; margin-right: auto; }

        /* Live stats — 4 coloane */
        .mk-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.1rem; margin-top: 3rem; }
        .mk-stat { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.75rem 1.5rem; }
        .mk-stat .n { font-size: 2.1rem; font-weight: 800; letter-spacing: -0.02em; color: #C8A165; }
        .mk-stat .l { color: #94a3b8; font-size: 0.88rem; margin-top: 0.5rem; line-height: 1.5; }
        .mk-stat .t { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #34d399; margin-top: 0.9rem; display: flex; align-items: center; gap: 6px; }
        .mk-stat .t::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #34d399; }

        /* How — 4 pași */
        .mk-how { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.1rem; margin-top: 3rem; }
        .mk-step { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 1.9rem 1.6rem; position: relative; }
        .mk-step .sn { position: absolute; top: 1.3rem; right: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 700; color: rgba(200,161,101,0.15); }
        .mk-step h3 { font-size: 1.12rem; font-weight: 700; margin-bottom: 0.65rem; }
        .mk-step p { color: #94a3b8; font-size: 0.88rem; line-height: 1.6; }

        /* Model card */
        .mk-model { max-width: 880px; margin: 3rem auto 0; background: linear-gradient(180deg, rgba(200,161,101,0.07), rgba(255,255,255,0.02)); border: 1px solid rgba(200,161,101,0.32); border-radius: 22px; padding: 2.75rem 2.75rem 2.5rem; position: relative; }
        .mk-model-badge { position: absolute; top: -14px; left: 2.5rem; background: linear-gradient(90deg, #C8A165, #D4B57A); color: #010A1F; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.4rem 1rem; border-radius: 100px; }
        .mk-model-pricing { display: flex; gap: 2.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.5rem; padding-bottom: 1.75rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .mk-amount { font-size: 3rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
        .mk-amount-label { color: #64748b; font-size: 0.85rem; margin-top: 0.4rem; }
        .mk-rev { display: flex; align-items: center; gap: 0.9rem; background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.28); border-radius: 14px; padding: 0.9rem 1.2rem; }
        .mk-rev-num { font-size: 2rem; font-weight: 800; color: #C8A165; line-height: 1; }
        .mk-rev-label { color: #94a3b8; font-size: 0.82rem; max-width: 230px; line-height: 1.4; }
        .mk-feats { list-style: none; padding: 0; margin: 0 0 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem 1.5rem; }
        .mk-feats li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; }
        .mk-feats li::before { content: '✓'; color: #C8A165; font-weight: 700; flex-shrink: 0; }
        .mk-align { color: #C8A165; font-weight: 600; font-size: 0.9rem; margin-bottom: 1.75rem; }
        .mk-model-cta { display: block; text-align: center; background: linear-gradient(90deg, #C8A165, #D4B57A); color: #010A1F; font-weight: 700; font-size: 1rem; padding: 1rem; border-radius: 10px; text-decoration: none; transition: opacity 0.2s; }
        .mk-model-cta:hover { opacity: 0.92; }

        /* Earn band */
        .mk-earn { max-width: 880px; margin: 1.5rem auto 0; background: rgba(255,255,255,0.02); border: 1px dashed rgba(200,161,101,0.3); border-radius: 16px; padding: 1.75rem 2rem; display: flex; gap: 1.25rem; align-items: flex-start; }
        .mk-earn-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(200,161,101,0.1); border: 1px solid rgba(200,161,101,0.25); display: grid; place-items: center; font-size: 1.25rem; flex-shrink: 0; }
        .mk-earn-title { color: #f1f5f9; font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
        .mk-earn-body { color: #94a3b8; font-size: 0.86rem; line-height: 1.6; margin: 0; }

        /* FAQ */
        .mk-faq { max-width: 780px; margin: 3rem auto 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .mk-faq details { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 1.4rem 1.6rem; }
        .mk-faq summary { cursor: pointer; font-weight: 700; font-size: 0.98rem; list-style: none; display: flex; justify-content: space-between; align-items: center; color: #e2e8f0; }
        .mk-faq summary::after { content: '+'; color: #C8A165; font-size: 1.4rem; font-weight: 400; }
        .mk-faq details[open] summary::after { content: '–'; }
        .mk-faq details p { color: #94a3b8; font-size: 0.92rem; line-height: 1.6; margin-top: 0.9rem; }

        .mk-nav { display: grid; grid-template-columns: 1fr; gap: 1.1rem; margin-top: 3rem; }
        .mk-navcard { background: rgba(13,21,38,0.6); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.75rem; text-decoration: none; transition: border-color 0.2s, transform 0.2s; display: block; }
        .mk-navcard:hover { border-color: rgba(200,161,101,0.35); transform: translateY(-2px); }
        .mk-navcard .lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: #C8A165; margin-bottom: 0.5rem; }
        .mk-navcard .t { font-size: 1.12rem; font-weight: 700; color: #f1f5f9; }

        .mk-final { background: linear-gradient(135deg, rgba(200,161,101,0.10), rgba(200,161,101,0.02)); border: 1px solid rgba(200,161,101,0.25); border-radius: 24px; padding: 4rem 2.5rem; text-align: center; }
        .mk-final h2 { font-size: clamp(1.8rem, 3.6vw, 2.5rem); font-weight: 800; }
        .mk-final p { color: #94a3b8; margin: 1rem auto 2rem; max-width: 480px; }

        @media (max-width: 980px) {
          .mk-stats, .mk-how { grid-template-columns: repeat(2, 1fr); }
          .mk-feats { grid-template-columns: 1fr; }
          .mk-section { padding: 4rem 1.5rem; }
        }
        @media (max-width: 560px) {
          .mk-stats, .mk-how { grid-template-columns: 1fr; }
          .mk-earn { flex-direction: column; }
        }
      `}</style>

      <div className="mk-page">
        <div className="mk-lang">
          {['ro', 'en'].map((l) => (
            <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* HERO */}
        <section className="mk-hero">
          <div className="mk-hero-inner">
            <div className="mk-eyebrow"><span className="dot"></span>{t.badge}</div>
            <h1 className="mk-h1">{t.h1} <span className="gold">{t.h1Accent}</span></h1>
            <p className="mk-sub">{t.sub}</p>
            <div className="mk-btns">
              <a href="https://shop.catyai.io/aff-index" target="_blank" rel="noopener noreferrer" className="mk-btn mk-btn-primary">{t.ctaPrimary} ↗</a>
              <Link to="/contact?plan=marketplace" className="mk-btn mk-btn-ghost">{t.ctaSecondary}</Link>
            </div>
          </div>
        </section>

        {/* LIVE PROOF */}
        <section className="mk-section">
          <div className="mk-wrap">
            <span className="mk-tag">{t.liveTag}</span>
            <h2 className="mk-h2">{t.liveH2}</h2>
            <div className="mk-stats">
              <div className="mk-stat"><div className="n">{t.stat1N}</div><div className="l">{t.stat1L}</div><div className="t">{t.stat1T}</div></div>
              <div className="mk-stat"><div className="n">{t.stat2N}</div><div className="l">{t.stat2L}</div><div className="t">{t.stat2T}</div></div>
              <div className="mk-stat"><div className="n">{t.stat3N}</div><div className="l">{t.stat3L}</div><div className="t">{t.stat3T}</div></div>
              <div className="mk-stat"><div className="n">{t.stat4N}</div><div className="l">{t.stat4L}</div><div className="t">{t.stat4T}</div></div>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section className="mk-section alt">
          <div className="mk-wrap mk-center">
            <span className="mk-tag">{t.howTag}</span>
            <h2 className="mk-h2">{t.howH2}</h2>
            <div className="mk-how" style={{ textAlign: 'left' }}>
              <div className="mk-step"><div className="sn">01</div><h3>{t.how1T}</h3><p>{t.how1P}</p></div>
              <div className="mk-step"><div className="sn">02</div><h3>{t.how2T}</h3><p>{t.how2P}</p></div>
              <div className="mk-step"><div className="sn">03</div><h3>{t.how3T}</h3><p>{t.how3P}</p></div>
              <div className="mk-step"><div className="sn">04</div><h3>{t.how4T}</h3><p>{t.how4P}</p></div>
            </div>
          </div>
        </section>

        {/* MODEL */}
        <section className="mk-section">
          <div className="mk-wrap mk-center">
            <span className="mk-tag">{t.modelTag}</span>
            <h2 className="mk-h2">{t.modelH2}</h2>
            <div className="mk-model" style={{ textAlign: 'left' }}>
              <div className="mk-model-badge">🤝 Parteneriat B2B · Revenue Share</div>
              <div className="mk-model-pricing">
                <div>
                  <div className="mk-amount">{t.setupPrice}</div>
                  <div className="mk-amount-label">{t.setupLabel}</div>
                </div>
                <div className="mk-rev">
                  <div className="mk-rev-num">{t.revshare}</div>
                  <div className="mk-rev-label">{t.revshareLabel}</div>
                </div>
              </div>
              <ul className="mk-feats">
                <li>{t.modelFeat1}</li>
                <li>{t.modelFeat2}</li>
                <li>{t.modelFeat3}</li>
                <li>{t.modelFeat4}</li>
                <li>{t.modelFeat5}</li>
              </ul>
              <div className="mk-align">{t.modelAlign}</div>
              <Link to="/contact?plan=marketplace" className="mk-model-cta">{t.modelCta} →</Link>
            </div>

            <div className="mk-earn" style={{ textAlign: 'left' }}>
              <div className="mk-earn-icon">🔁</div>
              <div>
                <h3 className="mk-earn-title">{t.earnTitle}</h3>
                <p className="mk-earn-body">{t.earnBody}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PREV + FAQ */}
        <section className="mk-section alt">
          <div className="mk-wrap mk-center">
            <span className="mk-tag">{t.faqTag}</span>
            <div className="mk-faq" style={{ textAlign: 'left' }}>
              <details><summary>{t.faq1Q}</summary><p>{t.faq1A}</p></details>
              <details><summary>{t.faq2Q}</summary><p>{t.faq2A}</p></details>
              <details><summary>{t.faq3Q}</summary><p>{t.faq3A}</p></details>
              <details><summary>{t.faq4Q}</summary><p>{t.faq4A}</p></details>
              <details><summary>{t.faq5Q}</summary><p>{t.faq5A}</p></details>
            </div>
            <div className="mk-nav" style={{ textAlign: 'left' }}>
              <Link to="/trust-gateway" className="mk-navcard">
                <div className="lbl">{t.prevLabel}</div>
                <div className="t">← {t.prevTitle}</div>
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mk-section">
          <div className="mk-wrap">
            <div className="mk-final">
              <h2>{t.finalH2}</h2>
              <p>{t.finalSub}</p>
              <div className="mk-btns" style={{ marginTop: 0 }}>
                <a href="https://shop.catyai.io/aff-index" target="_blank" rel="noopener noreferrer" className="mk-btn mk-btn-primary">{t.finalCta1} ↗</a>
                <Link to="/contact?plan=marketplace" className="mk-btn mk-btn-ghost">{t.finalCta2}</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <FooterV9 />
    </>
  )
}
