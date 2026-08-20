import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

// ─────────────────────────────────────────────────────────────────────────────
// AXA 1 — WEB WIDGET (SaaS, abonament lunar, EUR)
// Self-service: instalezi widget-ul pe site, AI-ul vinde 24/7. Crești când ai trafic.
// ─────────────────────────────────────────────────────────────────────────────
const WIDGET_TIERS = [
  {
    name: 'Starter',
    price: '€49',
    period: '/lună',
    desc: 'Pentru magazine care vor să convertească vizitatorii în clienți.',
    badge: null,
    highlighted: false,
    features: [
      '1.000 sesiuni AI/lună',
      'Web + WhatsApp, aceeași logică de vânzare',
      'Programări + captare lead-uri',
      'Documente PDF cu link de plată',
      'Tracking comportamental + mesaje proactive',
    ],
    cta: 'Pornește Starter',
    ctaLink: 'https://app.catyai.io/register?plan=starter',
    external: true,
  },
  {
    name: 'Growth',
    price: '€99',
    period: '/lună',
    desc: 'Pentru magazine în creștere, cu integrări CRM și handoff către echipă.',
    badge: 'Cel mai ales',
    highlighted: true,
    features: [
      '5.000 sesiuni AI/lună',
      'Integrări CRM native (HubSpot, Pipedrive, Salesforce)',
      'Live handoff către operator uman',
      'Lead scoring automat',
      'Suport prioritar pe email',
    ],
    cta: 'Pornește Growth',
    ctaLink: 'https://app.catyai.io/register?plan=growth',
    external: true,
  },
  {
    name: 'Business',
    price: '€199',
    period: '/lună',
    desc: 'Volum mare, acces API și account manager dedicat.',
    badge: null,
    highlighted: false,
    features: [
      '20.000 sesiuni AI/lună',
      'API access complet',
      'Widget-uri nelimitate',
      'Knowledge base extinsă',
      'Account manager',
    ],
    cta: 'Pornește Business',
    ctaLink: 'https://app.catyai.io/register?plan=business',
    external: true,
  },
  {
    name: 'Enterprise',
    price: '€499',
    period: '/lună',
    desc: 'Sesiuni nelimitate, white-label și SLA contractual.',
    badge: null,
    highlighted: false,
    features: [
      'Sesiuni AI nelimitate',
      'White-label complet',
      'SSO / SAML + SLA garantat',
      'Infrastructură dedicată (VPC)',
      'Onboarding dedicat + suport SLA',
    ],
    cta: 'Discută cu echipa',
    ctaLink: '/contact?plan=enterprise',
    external: false,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// AXA 2 — COMMERCE DISTRIBUTION (Parteneriat B2B: setup + abonament + % ad spend)
// Grila completă (5 pachete, pe dimensiunea catalogului) e pe /agentic-marketplace.
// ─────────────────────────────────────────────────────────────────────────────
const MARKETPLACE = {
  name: 'Commerce Distribution',
  model: 'Parteneriat B2B · Setup + abonament + % ad spend',
  setupPrice: 'de la 1.000 €',
  setupLabel: 'taxă de setup, o singură dată — achitată integral la semnare',
  monthly: 'de la 250 €/lună',
  monthlyLabel: 'abonament lunar, din prima lună — grilă pe dimensiunea catalogului',
  revshare: '+3–5%',
  revshareLabel: 'din ad spend — doar când rulezi campanii Shopping prin contul nostru CSS',
  desc: 'Inginerie de catalog (ingest, deduplicare, golden records, enrichment AI, feed GMC), distribuție prin marketplace-ul CatyAI și contul nostru CSS, plus vizibilitate AI-GEO. Tu rămâi Merchant of Record — noi nu atingem niciodată banii clientului tău.',
  features: [
    'Pipeline complet: ingest → deduplicare → golden records → enrichment AI → feed GMC',
    'Free listings Google + campanii Shopping cu ~20% mai multă putere de licitație prin CSS',
    'Vizibilitate AI: indexare semantică, llms.txt, date structurate, raport lunar GEO',
    'Raport lunar: produse live, sănătatea feed-ului, trafic, ROI campanii',
    'Contract minim 6 luni pentru Entry și Starter · fără trial gratuit',
  ],
  alignNote: 'La un ad spend de 2.000 €/lună, economia CSS acoperă singură abonamentul.',
  cta: 'Vezi grila completă de prețuri',
  ctaLink: '/agentic-marketplace',
  ctaAlt: 'sau programează o discuție de parteneriat →',
  ctaAltLink: '/contact?plan=marketplace',
}

// Banda de transparență: noi câștigăm din același mecanism pe care ți-l instalăm.
const EARN_PROOF = {
  title: 'De ce poți avea încredere în model: noi câștigăm din exact același mecanism.',
  body: 'Marketplace-ul nostru propriu — shop.catyai.io — trăiește din aceleași comisioane de afiliere pe care le va genera și catalogul tău: 3.500.000+ produse · 190 de clienți activi · comisioane de la 1% la 20% per tranzacție, aduse organic de agenții AI, cu zero buget de reclame (Zero-CAC). Îți instalăm infrastructura pe care o folosim noi înșine, în producție, în fiecare zi.',
}

const FAQS = [
  {
    q: 'Care e diferența dintre Web Widget și Commerce Distribution?',
    a: 'Web Widget e un abonament SaaS (€49–€499/lună): instalezi agentul AI pe site și WhatsApp ca să convertești vizitatorii care ajung deja la tine. Commerce Distribution e un parteneriat B2B (setup unic + abonament lunar, pe dimensiunea catalogului): îți reconstruim catalogul, îl distribuim pe Google prin marketplace-ul nostru și contul CSS și îl facem citibil de ChatGPT/Perplexity/Gemini.',
  },
  {
    q: 'Cum funcționează procentul de 3–5% la Commerce Distribution?',
    a: 'Procentul se aplică doar ad spend-ului rulat prin contul nostru CSS — nu vânzărilor tale organice. Bugetul de ads e al tău, separat, transparent în Google Ads. Prin CSS, licitațiile Shopping au ~20% mai multă putere la același buget, deci la un ad spend de 2.000 €/lună economia acoperă singură abonamentul.',
  },
  {
    q: 'Pot schimba planul de Widget oricând?',
    a: 'Da. Upgrade-urile au efect imediat, cu facturare proporțională. Downgrade-urile se aplică de la începutul următorului ciclu de facturare. Fără contracte de lock-in.',
  },
  {
    q: 'Ce se întâmplă când ating limita de sesiuni?',
    a: 'Primești notificare la 80% din utilizare. Dacă atingi limita, răspunsurile AI se opresc până la următorul ciclu — sau poți face upgrade oricând ca să reiei instant serviciul.',
  },
  {
    q: 'Există perioadă de probă?',
    a: 'Da — 14 zile gratuit pe orice plan Widget, fără card. Pentru Commerce Distribution nu există perioadă de trial gratuit; setup-ul include o sesiune de onboarding dedicată.',
  },
  {
    q: 'Ce este o „sesiune"?',
    a: 'O sesiune = o conversație completă cu un utilizator — de la primul mesaj până la închiderea conversației sau 30 de minute de inactivitate. Apelurile API de fundal (sincronizare NAP, crawling GEO) nu consumă sesiuni.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'CatyAI Web Widget',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: [
        { '@type': 'Offer', name: 'Starter', price: '49', priceCurrency: 'EUR', description: '1.000 sesiuni, Web + WhatsApp, lead capture' },
        { '@type': 'Offer', name: 'Growth', price: '99', priceCurrency: 'EUR', description: '5.000 sesiuni, integrări CRM, live handoff' },
        { '@type': 'Offer', name: 'Business', price: '199', priceCurrency: 'EUR', description: '20.000 sesiuni, API access, account manager' },
        { '@type': 'Offer', name: 'Enterprise', price: '499', priceCurrency: 'EUR', description: 'Sesiuni nelimitate, white-label, SLA' },
      ],
    },
    {
      '@type': 'Service',
      name: 'CatyAI Commerce Distribution',
      serviceType: 'B2B Commerce Distribution Partnership',
      description: 'Parteneriat B2B: inginerie de catalog (golden records, enrichment AI, feed GMC), distribuție CSS pe Google și vizibilitate AI-GEO. Setup unic + abonament lunar + 3–5% din ad spend.',
      offers: {
        '@type': 'Offer',
        price: '1000',
        priceCurrency: 'EUR',
        description: 'Setup de la 1.000 € (o singură dată) + abonament lunar de la 250 € + 3–5% din ad spend-ul rulat prin contul CSS CatyAI',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function PricingPage() {
  const [lang, setLang] = useState('en')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  return (
    <>
      <SEO
        title="Prețuri — Web Widget €49–€499/lună · Commerce Distribution de la 1.000 € setup | CatyAI"
        description="Două produse, două modele: Web Widget (abonament SaaS, €49–€499/lună) și Commerce Distribution (parteneriat B2B: setup de la 1.000 € + abonament de la 250 €/lună + 3–5% din ad spend). 14 zile gratuit pe Widget, fără card."
        canonical="https://catyai.io/pricing"
        jsonLd={jsonLd}
      />
      <style>{`
        .pri-page { background: #010A1F; min-height: 100vh; }
        .pri-hero {
          padding: 7rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .pri-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .pri-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.25);
          color: #C8A165;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .pri-hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          color: #f1f5f9;
          line-height: 1.08;
          letter-spacing: -0.03em;
          text-transform: none;
          margin-bottom: 1.25rem;
        }
        .pri-hero-sub {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 520px;
          margin: 0 auto 1rem;
          line-height: 1.7;
        }
        .pri-trial-note {
          font-size: 0.82rem;
          color: #64748b;
          margin-bottom: 4rem;
        }
        .pri-trial-note span { color: #6ee7b7; }

        /* Axis heads (Widget / Marketplace) */
        .pri-axis-head { text-align: center; margin-bottom: 3rem; }
        .pri-axis-tag {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 0.35rem 1rem;
          margin-bottom: 1.25rem;
        }
        .pri-axis-tag.gold { color: #C8A165; border-color: rgba(200,161,101,0.35); }
        .pri-axis-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          margin-bottom: 0.75rem;
        }
        .pri-axis-sub { color: #94a3b8; font-size: 1.02rem; max-width: 560px; margin: 0 auto; }

        /* Tiers */
        .pri-tiers-section { padding: 0 1.5rem 5rem; }
        .pri-tiers-grid {
          max-width: 1060px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        .pri-tiers-grid-5 {
          grid-template-columns: repeat(4, 1fr);
          gap: 1.1rem;
          max-width: 1100px;
        }
        @media (max-width: 1100px) {
          .pri-tiers-grid-5 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pri-tiers-grid-5 { grid-template-columns: 1fr; max-width: 480px; }
        }
        @media (max-width: 900px) {
          .pri-tiers-grid { grid-template-columns: 1fr; max-width: 480px; }
        }

        /* Marketplace (parteneriat) */
        .pri-marketplace-section { padding: 2rem 1.5rem 6rem; }
        .pri-marketplace-card {
          max-width: 860px;
          margin: 0 auto;
          background: linear-gradient(180deg, rgba(200,161,101,0.07), rgba(255,255,255,0.02));
          border: 1px solid rgba(200,161,101,0.32);
          border-radius: 22px;
          padding: 2.75rem 2.75rem 2.5rem;
          position: relative;
        }
        .pri-marketplace-badge {
          position: absolute;
          top: -14px;
          left: 2.5rem;
          background: linear-gradient(90deg, #C8A165, #D4B57A);
          color: #010A1F;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
        }
        .pri-marketplace-pricing {
          display: flex;
          gap: 2.5rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .pri-marketplace-amount {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 3rem;
          color: #f1f5f9;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .pri-marketplace-amount-label { color: #64748b; font-size: 0.85rem; margin-top: 0.4rem; }
        .pri-marketplace-rev {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.28);
          border-radius: 14px;
          padding: 0.9rem 1.2rem;
        }
        .pri-marketplace-rev-num {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: #C8A165;
          line-height: 1;
        }
        .pri-marketplace-rev-label { color: #94a3b8; font-size: 0.82rem; max-width: 220px; line-height: 1.4; }
        .pri-marketplace-desc { color: #94a3b8; font-size: 0.95rem; line-height: 1.65; margin-bottom: 1.5rem; }
        .pri-marketplace-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem 1.5rem;
        }
        @media (max-width: 640px) { .pri-marketplace-features { grid-template-columns: 1fr; } }
        .pri-marketplace-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: #cbd5e1;
          line-height: 1.5;
        }
        .pri-marketplace-features li::before { content: '✓'; color: #C8A165; font-weight: 700; flex-shrink: 0; }
        .pri-marketplace-align {
          color: #C8A165;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 1.75rem;
        }
        .pri-marketplace-cta {
          display: block;
          text-align: center;
          background: linear-gradient(90deg, #C8A165, #D4B57A);
          color: #010A1F;
          font-weight: 700;
          font-size: 1rem;
          padding: 1rem;
          border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .pri-marketplace-cta:hover { opacity: 0.92; }

        /* Earn transparency band */
        .pri-earn-band {
          max-width: 860px;
          margin: 1.5rem auto 0;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(200,161,101,0.3);
          border-radius: 16px;
          padding: 1.75rem 2rem;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }
        .pri-earn-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.25);
          display: grid;
          place-items: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .pri-earn-title { color: #f1f5f9; font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
        .pri-earn-body { color: #94a3b8; font-size: 0.86rem; line-height: 1.6; margin: 0; }
        @media (max-width: 640px) { .pri-earn-band { flex-direction: column; } }
        .pri-tier {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-color 0.2s;
        }
        .pri-tier:hover { border-color: rgba(200,161,101,0.15); }
        .pri-tier.highlighted {
          background: rgba(200,161,101,0.06);
          border-color: rgba(200,161,101,0.35);
          box-shadow: 0 0 60px rgba(200,161,101,0.07);
        }
        .pri-tier.highlighted:hover { border-color: rgba(200,161,101,0.55); }
        .pri-tier-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: #C8A165;
          color: #010A1F;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          white-space: nowrap;
        }
        .pri-tier-name {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        .pri-tier-price {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 3rem;
          color: #f1f5f9;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .pri-tier.highlighted .pri-tier-price { color: #C8A165; }
        .pri-tier-period {
          font-size: 0.88rem;
          color: #64748b;
          margin-bottom: 1rem;
          display: block;
          margin-top: 0.25rem;
        }
        .pri-tier-desc {
          color: #94a3b8;
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .pri-tier-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          flex: 1;
        }
        .pri-tier-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.5;
        }
        .pri-tier-features li::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.05rem;
        }
        .pri-tier-cta {
          display: block;
          text-align: center;
          padding: 0.85rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .pri-tier-cta.primary {
          background: #C8A165;
          color: #010A1F;
        }
        .pri-tier-cta.primary:hover { background: #D4B57A; }
        .pri-tier-cta.secondary {
          border: 1px solid rgba(255,255,255,0.15);
          color: #f1f5f9;
        }
        .pri-tier-cta.secondary:hover { border-color: #C8A165; color: #C8A165; }

        /* Feature comparison note */
        .pri-compare-note {
          text-align: center;
          color: #64748b;
          font-size: 0.85rem;
          max-width: 1060px;
          margin: 0 auto;
          padding-bottom: 2rem;
        }
        .pri-compare-note a { color: #C8A165; text-decoration: none; }
        .pri-compare-note a:hover { text-decoration: underline; }

        /* FAQ */
        .pri-faq-section { background: #030D26; padding: 6rem 1.5rem; }
        .pri-faq-container { max-width: 720px; margin: 0 auto; }
        .pri-faq-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          text-transform: none;
          text-align: center;
          margin-bottom: 3rem;
        }
        .pri-faq-item {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          margin-bottom: 0.75rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .pri-faq-item.open { border-color: rgba(200,161,101,0.2); }
        .pri-faq-q {
          width: 100%;
          background: none;
          border: none;
          color: #f1f5f9;
          font-size: 0.97rem;
          font-weight: 600;
          padding: 1.25rem 1.5rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .pri-faq-q:hover { color: #C8A165; }
        .pri-faq-chevron {
          flex-shrink: 0;
          color: #64748b;
          transition: transform 0.2s;
        }
        .pri-faq-item.open .pri-faq-chevron { transform: rotate(180deg); color: #C8A165; }
        .pri-faq-a {
          padding: 0 1.5rem 1.25rem;
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.7;
        }

        /* CTA */
        .pri-cta-section {
          background: #010A1F;
          padding: 6rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(200,161,101,0.1);
        }
        .pri-cta-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          text-transform: none;
          margin-bottom: 0.75rem;
        }
        .pri-cta-sub { color: #94a3b8; font-size: 1.05rem; margin-bottom: 2.5rem; }
        .pri-cta-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .pri-cta-btn-a {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .pri-cta-btn-a:hover { background: #D4B57A; }
        .pri-cta-btn-b {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.2s;
        }
        .pri-cta-btn-b:hover { border-color: #C8A165; }
      `}</style>

      <div className="pri-page">
        <GlobalHeader lang={lang} setLang={setLang} />

        {/* Hero */}
        <section className="pri-hero">
          <div className="pri-badge">💎 Două produse, două modele — un singur lanț</div>
          <h1 className="pri-hero-title">Widget-ul e abonament.<br />Marketplace-ul e parteneriat.</h1>
          <p className="pri-hero-sub">
            Nu îți vindem „încă un tool". Pe Widget plătești un abonament simplu; pe Commerce Distribution îți reconstruim catalogul și îl distribuim pe Google și în AI — setup unic, abonament lunar și procent doar din ad spend.
          </p>
          <p className="pri-trial-note"><span>14 zile gratuit</span> · Fără card · Anulare oricând</p>
        </section>

        {/* ── AXA 1: WEB WIDGET (SaaS) ── */}
        <section className="pri-tiers-section">
          <div className="pri-axis-head">
            <span className="pri-axis-tag">Axa SaaS · Abonament lunar</span>
            <h2 className="pri-axis-title">Web Widget</h2>
            <p className="pri-axis-sub">Agentul tău de vânzări AI pe site și WhatsApp. Începi simplu, crești când ai trafic.</p>
          </div>
          <div className="pri-tiers-grid pri-tiers-grid-5">
            {WIDGET_TIERS.map((tier) => (
              <div key={tier.name} className={`pri-tier${tier.highlighted ? ' highlighted' : ''}`}>
                {tier.badge && <div className="pri-tier-badge">⭐ {tier.badge}</div>}
                <div className="pri-tier-name">{tier.name}</div>
                <div className="pri-tier-price">{tier.price}</div>
                <span className="pri-tier-period">{tier.period}</span>
                <p className="pri-tier-desc">{tier.desc}</p>
                <ul className="pri-tier-features">
                  {tier.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                {tier.external ? (
                  <a
                    href={tier.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pri-tier-cta ${tier.highlighted ? 'primary' : 'secondary'}`}
                  >
                    {tier.cta}
                  </a>
                ) : (
                  <Link
                    to={tier.ctaLink}
                    className={`pri-tier-cta ${tier.highlighted ? 'primary' : 'secondary'}`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <p className="pri-compare-note" style={{ marginTop: '2rem' }}>
            Toate planurile de Widget includ FraudAI Shield și răspunsuri ancorate în catalogul tău semnat.&nbsp;
            <a href="https://docs.catyai.io/pricing" target="_blank" rel="noopener noreferrer">Comparație completă →</a>
          </p>
        </section>

        {/* ── AXA 2: COMMERCE DISTRIBUTION (Parteneriat B2B) ── */}
        <section className="pri-marketplace-section">
          <div className="pri-axis-head">
            <span className="pri-axis-tag gold">Axa Marketplace · Parteneriat B2B</span>
            <h2 className="pri-axis-title">Commerce Distribution</h2>
            <p className="pri-axis-sub">Inginerie de catalog, distribuție CSS pe Google și vizibilitate AI. Setup unic + abonament lunar + procent doar din ad spend-ul rulat prin noi.</p>
          </div>

          <div className="pri-marketplace-card">
            <div className="pri-marketplace-badge">🤝 {MARKETPLACE.model}</div>
            <div className="pri-marketplace-pricing">
              <div className="pri-marketplace-setup">
                <div className="pri-marketplace-amount" style={{ fontSize: '2.1rem' }}>{MARKETPLACE.setupPrice}</div>
                <div className="pri-marketplace-amount-label">{MARKETPLACE.setupLabel}</div>
              </div>
              <div className="pri-marketplace-setup">
                <div className="pri-marketplace-amount" style={{ fontSize: '2.1rem' }}>{MARKETPLACE.monthly}</div>
                <div className="pri-marketplace-amount-label">{MARKETPLACE.monthlyLabel}</div>
              </div>
              <div className="pri-marketplace-rev">
                <div className="pri-marketplace-rev-num">{MARKETPLACE.revshare}</div>
                <div className="pri-marketplace-rev-label">{MARKETPLACE.revshareLabel}</div>
              </div>
            </div>
            <p className="pri-marketplace-desc">{MARKETPLACE.desc}</p>
            <ul className="pri-marketplace-features">
              {MARKETPLACE.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className="pri-marketplace-align">{MARKETPLACE.alignNote}</div>
            <Link to={MARKETPLACE.ctaLink} className="pri-marketplace-cta">
              {MARKETPLACE.cta} →
            </Link>
            <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: 0 }}>
              <Link to={MARKETPLACE.ctaAltLink} style={{ color: '#C8A165', fontSize: '0.9rem', textDecoration: 'none' }}>
                {MARKETPLACE.ctaAlt}
              </Link>
            </p>
          </div>

          {/* Transparența: câștigăm din același mecanism */}
          <div className="pri-earn-band">
            <div className="pri-earn-icon">🔁</div>
            <div>
              <h3 className="pri-earn-title">{EARN_PROOF.title}</h3>
              <p className="pri-earn-body">{EARN_PROOF.body}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pri-faq-section">
          <div className="pri-faq-container">
            <h2 className="pri-faq-title">Întrebări frecvente</h2>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`pri-faq-item${openFaq === i ? ' open' : ''}`}
              >
                <button
                  className="pri-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <svg className="pri-faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && <p className="pri-faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pri-cta-section">
          <h2 className="pri-cta-title">Începe cu ce ai nevoie acum.</h2>
          <p className="pri-cta-sub">14 zile gratuit pe Widget. Sau discută cu noi despre parteneriatul Marketplace.</p>
          <div className="pri-cta-row">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="pri-cta-btn-a"
            >
              Instalează Widget-ul
            </a>
            <Link to="/contact?plan=marketplace" className="pri-cta-btn-b">Discută despre Marketplace</Link>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
