import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import GlobalHeader from '../../components/GlobalHeader'
import FooterV9 from '../../components/FooterV9'

const translations = {
  en: {
    badge: 'AI Knowledge Layer · Live',
    heroTitle1: 'AI Knowledge Layer',
    heroTitle2: 'Zero Hallucinations. Verified Truth.',
    heroSubtitle: "CatyAI's deterministic AKL protocol eliminates LLM hallucinations in eCommerce by serving structured, Ed25519-signed facts — not probabilistic guesses.",
    heroCta: 'Start Free Trial',
    heroCtaSecondary: 'Read Technical Docs',
    terminalLabel: 'AKL Response · Verified',
    problemEyebrow: 'The Problem',
    problemTitle: 'AI Assistants Are',
    problemHighlight: 'Guessing About Your Store.',
    problemSubtitle: "Every time ChatGPT, Gemini, or Perplexity answers a question about your products, it's making a probabilistic guess — not reading your real data.",
    stat1Value: '73%',
    stat1Label: 'of AI answers about eCommerce stores contain factual errors',
    stat2Value: '€4,200',
    stat2Label: 'average monthly revenue lost to AI-driven misinformation',
    stat3Value: '3×',
    stat3Label: 'higher cart abandonment when AI gives wrong product info',
    problemSolution: 'AKL serves structured truth — or stays silent.',
    howEyebrow: 'How It Works',
    howTitle: 'How AKL Works',
    howSubtitle: 'Three deterministic steps. Zero probability.',
    step1Num: '01',
    step1Title: 'Structured Ingestion',
    step1Desc: 'AKL crawls your product catalog, prices, stock, and policies in real time — not a cached snapshot from three months ago.',
    step2Num: '02',
    step2Title: 'Semantic Normalization',
    step2Desc: 'Each data point is normalized into a canonical schema, deduplicated, and enriched with entity tags before being stored in a cryptographic registry.',
    step3Num: '03',
    step3Title: 'Deterministic Response',
    step3Desc: 'When an AI assistant queries your store, AKL returns a signed JSON response with an Ed25519 signature. The AI cites facts, not guesses.',
    modulesEyebrow: 'Coverage',
    modulesTitle: 'What AKL Verifies',
    modulesSubtitle: 'Every data point signed and traceable',
    modules: [
      { icon: '📦', title: 'Product Data', desc: 'Names, descriptions, attributes, variants — normalized and deduplicated across all sources.' },
      { icon: '💰', title: 'Prices & Promotions', desc: 'Live prices, discounts, and promotional windows — signed at the moment of query.' },
      { icon: '📊', title: 'Stock Availability', desc: 'Real-time inventory levels per SKU, warehouse, and fulfillment channel.' },
      { icon: '🚚', title: 'Delivery & Policies', desc: 'Shipping costs, delivery ETAs, return windows, and warranty terms — always current.' },
      { icon: '🔐', title: 'Ed25519 Signatures', desc: 'Every AKL response is cryptographically signed. AI assistants can verify authenticity without calling your server.' },
      { icon: '🌍', title: 'GEO Routing', desc: 'AKL routes queries to the nearest verified data endpoint, reducing latency and improving answer accuracy.' },
      { icon: '📋', title: 'Structured Citations', desc: 'AI assistants receive machine-readable citations pointing to your canonical product pages.' },
      { icon: '⚡', title: 'Real-time Updates', desc: 'Stock changes, price updates, and policy edits propagate to AKL in under 60 seconds.' },
    ],
    ctaEyebrow: 'Get Started',
    ctaTitle: 'Is your store ready for shopping agents?',
    ctaSubtitle: 'Deploy AKL in minutes. No engineering team required.',
    ctaButton: 'Start Free Trial →',
    ctaLink: 'Read technical documentation →',
  },
  ro: {
    badge: 'AI Knowledge Layer · Live',
    heroTitle1: 'AI Knowledge Layer',
    heroTitle2: 'Zero Halucinații. Adevăr Verificat.',
    heroSubtitle: 'Protocolul determinist AKL al CatyAI elimină halucinațiile LLM în eCommerce servind fapte structurate, semnate cu Ed25519 — nu estimări probabilistice.',
    heroCta: 'Începe Gratuit',
    heroCtaSecondary: 'Documentație Tehnică',
    terminalLabel: 'Răspuns AKL · Verificat',
    problemEyebrow: 'Problema',
    problemTitle: 'Asistenții AI',
    problemHighlight: 'Ghicesc Despre Magazinul Tău.',
    problemSubtitle: 'De fiecare dată când ChatGPT, Gemini sau Perplexity răspunde la o întrebare despre produsele tale, face o estimare probabilistică — nu citește datele tale reale.',
    stat1Value: '73%',
    stat1Label: 'din răspunsurile AI despre magazine eCommerce conțin erori factuale',
    stat2Value: '€4.200',
    stat2Label: 'venituri lunare pierdute în medie din cauza dezinformării generate de AI',
    stat3Value: '3×',
    stat3Label: 'abandon coș mai mare când AI oferă informații greșite despre produse',
    problemSolution: 'AKL servește adevărul structurat — sau tace.',
    howEyebrow: 'Cum Funcționează',
    howTitle: 'Cum Funcționează AKL',
    howSubtitle: 'Trei pași deterministici. Zero probabilitate.',
    step1Num: '01',
    step1Title: 'Ingestie Structurată',
    step1Desc: 'AKL crawlează catalogul tău de produse, prețurile, stocul și politicile în timp real — nu un snapshot cached de acum trei luni.',
    step2Num: '02',
    step2Title: 'Normalizare Semantică',
    step2Desc: 'Fiecare punct de date este normalizat într-o schemă canonică, deduplicat și îmbogățit cu etichete de entitate înainte de a fi stocat într-un registru criptografic.',
    step3Num: '03',
    step3Title: 'Răspuns Determinist',
    step3Desc: 'Când un asistent AI interoghează magazinul tău, AKL returnează un răspuns JSON semnat cu semnătură Ed25519. AI-ul citează fapte, nu estimări.',
    modulesEyebrow: 'Acoperire',
    modulesTitle: 'Ce Verifică AKL',
    modulesSubtitle: 'Fiecare punct de date semnat și trasabil',
    modules: [
      { icon: '📦', title: 'Date Produse', desc: 'Nume, descrieri, atribute, variante — normalizate și deduplicate din toate sursele.' },
      { icon: '💰', title: 'Prețuri & Promoții', desc: 'Prețuri live, reduceri și ferestre promoționale — semnate în momentul interogării.' },
      { icon: '📊', title: 'Disponibilitate Stoc', desc: 'Niveluri de inventar în timp real per SKU, depozit și canal de fulfillment.' },
      { icon: '🚚', title: 'Livrare & Politici', desc: 'Costuri de transport, ETA-uri de livrare, ferestre de retur și termeni de garanție — mereu actuale.' },
      { icon: '🔐', title: 'Semnături Ed25519', desc: 'Fiecare răspuns AKL este semnat criptografic. Asistenții AI pot verifica autenticitatea fără a apela serverul tău.' },
      { icon: '🌍', title: 'Rutare GEO', desc: 'AKL rutează interogările spre cel mai apropiat endpoint de date verificat, reducând latența și îmbunătățind acuratețea răspunsului.' },
      { icon: '📋', title: 'Citări Structurate', desc: 'Asistenții AI primesc citări machine-readable care indică spre paginile canonice ale produselor tale.' },
      { icon: '⚡', title: 'Actualizări Real-time', desc: 'Modificările de stoc, actualizările de prețuri și editările de politici se propagă în AKL în mai puțin de 60 de secunde.' },
    ],
    ctaEyebrow: 'Începe',
    ctaTitle: 'Magazinul tău e pregătit pentru agenții de cumpărături?',
    ctaSubtitle: 'Deployează AKL în câteva minute. Fără echipă de inginerie.',
    ctaButton: 'Începe Gratuit →',
    ctaLink: 'Citește documentația tehnică →',
  },
}

translations.pt = translations.en
translations.fr = translations.en
translations.es = translations.en

export default function CeEsteAKL() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && translations[saved]) setLang(saved)
  }, [])

  const t = translations[lang] || translations.en

  return (
    <>
      <SEO
        title="AI Knowledge Layer (AKL) — Zero Hallucinations, Verified Truth"
        description="CatyAI's deterministic AKL protocol eliminates LLM hallucinations in eCommerce through semantic normalization and Ed25519 signatures."
        url="https://catyai.io/research/ce-este-catyai-akl"
        type="article"
        article={{
          publishedTime: '2025-03-01T00:00:00Z',
          modifiedTime: '2025-05-01T00:00:00Z',
          author: 'CatyAI',
          tags: ['AKL', 'AI Knowledge Layer', 'eCommerce AI', 'zero hallucinations', 'Ed25519', 'GEO'],
        }}
      />

      <style>{`
        .akl-page {
          background-color: #010A1F;
          color: #ffffff;
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
        }
        .akl-hero {
          padding: 7rem 1.5rem 5rem;
          max-width: 72rem;
          margin: 0 auto;
        }
        .akl-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .akl-hero-grid { grid-template-columns: 1fr 1fr; }
        }
        .akl-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200, 161, 101, 0.12);
          border: 1px solid rgba(200, 161, 101, 0.35);
          color: #C8A165;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.375rem 0.875rem;
          border-radius: 2rem;
          margin-bottom: 1.5rem;
        }
        .akl-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C8A165;
          animation: akl-pulse 2s ease-in-out infinite;
        }
        @keyframes akl-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .akl-hero-title {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
        }
        .akl-hero-title span {
          background: linear-gradient(135deg, #C8A165 0%, #D4B57A 50%, #C8A165 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .akl-hero-subtitle {
          font-size: 1.125rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 32rem;
          margin-bottom: 2rem;
        }
        .akl-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }
        .akl-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          color: #010A1F;
          background: linear-gradient(135deg, #C8A165, #D4B57A);
          border-radius: 0.5rem;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 20px rgba(200, 161, 101, 0.3);
        }
        .akl-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(200, 161, 101, 0.45);
        }
        .akl-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 0.5rem;
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .akl-btn-secondary:hover {
          border-color: rgba(200, 161, 101, 0.5);
          background: rgba(200, 161, 101, 0.07);
        }
        .akl-terminal {
          background: #0A1628;
          border: 1px solid rgba(200, 161, 101, 0.2);
          border-radius: 0.875rem;
          overflow: hidden;
          position: relative;
        }
        .akl-terminal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C8A165, transparent);
        }
        .akl-terminal-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .akl-dot {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .akl-dot-red { background: #ef4444; }
        .akl-dot-yellow { background: #eab308; }
        .akl-dot-green { background: #22c55e; }
        .akl-terminal-label {
          font-size: 0.75rem;
          color: #64748b;
          margin-left: 0.5rem;
          font-family: 'ui-monospace', 'SFMono-Regular', monospace;
        }
        .akl-terminal-body {
          padding: 1.5rem;
          font-family: 'ui-monospace', 'SFMono-Regular', monospace;
          font-size: 0.8125rem;
          line-height: 1.75;
        }
        .akl-t-method { color: #60a5fa; }
        .akl-t-status { color: #4ade80; }
        .akl-t-sep { color: #334155; }
        .akl-t-key { color: #94a3b8; }
        .akl-t-val { color: #e2e8f0; }
        .akl-t-sig { color: #C8A165; }
        .akl-t-hash { color: #a78bfa; }
        .akl-t-trust { color: #4ade80; }
        .akl-terminal-footer {
          padding: 0.875rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 1.25rem;
        }
        .akl-verified-tag {
          font-family: 'ui-monospace', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #4ade80;
        }
        .akl-section {
          padding: 5rem 1.5rem;
        }
        .akl-container {
          max-width: 72rem;
          margin: 0 auto;
        }
        .akl-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.75rem;
          text-align: center;
        }
        .akl-section-title {
          font-size: clamp(1.875rem, 4vw, 2.75rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-align: center;
          margin-bottom: 1rem;
        }
        .akl-section-sub {
          font-size: 1.125rem;
          color: #94a3b8;
          text-align: center;
          max-width: 40rem;
          margin: 0 auto 3.5rem;
          line-height: 1.65;
        }
        .akl-problem {
          background: rgba(10, 22, 40, 0.5);
        }
        .akl-problem-title {
          font-size: clamp(1.875rem, 4vw, 2.75rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 1rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .akl-problem-title span { color: #ef4444; }
        .akl-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin: 3rem 0;
        }
        @media (min-width: 768px) {
          .akl-stats-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .akl-stat-card {
          background: rgba(10, 22, 40, 0.8);
          border: 1px solid rgba(200, 161, 101, 0.15);
          border-radius: 0.875rem;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: border-color 0.25s ease;
        }
        .akl-stat-card:hover { border-color: rgba(200, 161, 101, 0.35); }
        .akl-stat-value {
          font-size: 2.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #C8A165, #D4B57A);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 0.625rem;
          line-height: 1;
        }
        .akl-stat-label {
          font-size: 0.9375rem;
          color: #94a3b8;
          line-height: 1.5;
        }
        .akl-problem-solution {
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-top: 2.5rem;
          padding: 1.5rem;
          background: rgba(200, 161, 101, 0.06);
          border: 1px solid rgba(200, 161, 101, 0.15);
          border-radius: 0.75rem;
        }
        .akl-steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .akl-steps-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .akl-step {
          background: rgba(10, 22, 40, 0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.875rem;
          padding: 2rem;
          position: relative;
          transition: border-color 0.25s, transform 0.25s;
        }
        .akl-step:hover {
          border-color: rgba(200, 161, 101, 0.3);
          transform: translateY(-3px);
        }
        .akl-step-num {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, rgba(200,161,101,0.25), rgba(200,161,101,0.06));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .akl-step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }
        .akl-step-desc {
          font-size: 0.9375rem;
          color: #94a3b8;
          line-height: 1.65;
        }
        .akl-modules {
          background: rgba(10, 22, 40, 0.3);
        }
        .akl-modules-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .akl-modules-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .akl-module-card {
          background: rgba(10, 22, 40, 0.8);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.875rem;
          padding: 1.5rem;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .akl-module-card:hover {
          border-color: rgba(200, 161, 101, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .akl-module-icon { font-size: 1.75rem; margin-bottom: 0.875rem; }
        .akl-module-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 0.5rem;
        }
        .akl-module-desc {
          font-size: 0.8125rem;
          color: #64748b;
          line-height: 1.55;
        }
        .akl-cta {
          padding: 6rem 1.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .akl-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(200,161,101,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .akl-cta-card {
          position: relative;
          max-width: 42rem;
          margin: 0 auto;
          background: rgba(10, 22, 40, 0.8);
          border: 1px solid rgba(200, 161, 101, 0.2);
          border-radius: 1.25rem;
          padding: 3.5rem 2.5rem;
          overflow: hidden;
        }
        .akl-cta-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C8A165, transparent);
        }
        .akl-cta-title {
          font-size: clamp(1.625rem, 3.5vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .akl-cta-sub {
          font-size: 1.0625rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
          line-height: 1.65;
        }
        .akl-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }
        .akl-cta-link {
          font-size: 0.9375rem;
          color: #C8A165;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          transition: gap 0.2s;
        }
        .akl-cta-link:hover { gap: 0.625rem; }
      `}</style>

      <div className="akl-page">
        <GlobalHeader />

        {/* Hero */}
        <section className="akl-hero">
          <div className="akl-hero-grid">
            <div>
              <div className="akl-badge">{t.badge}</div>
              <h1 className="akl-hero-title">
                {t.heroTitle1}<br />
                <span>{t.heroTitle2}</span>
              </h1>
              <p className="akl-hero-subtitle">{t.heroSubtitle}</p>
              <div className="akl-hero-actions">
                <a href="https://app.catyai.io/register" className="akl-btn-primary">{t.heroCta}</a>
                <Link to="/docs" className="akl-btn-secondary">{t.heroCtaSecondary}</Link>
              </div>
            </div>

            <div className="akl-terminal">
              <div className="akl-terminal-bar">
                <div className="akl-dot akl-dot-red" />
                <div className="akl-dot akl-dot-yellow" />
                <div className="akl-dot akl-dot-green" />
                <span className="akl-terminal-label">{t.terminalLabel}</span>
              </div>
              <div className="akl-terminal-body">
                <div>
                  <span className="akl-t-method">POST</span>{' '}
                  <span className="akl-t-val">/geo/v2/answer</span>{' '}
                  <span className="akl-t-sep">────────</span>{' '}
                  <span className="akl-t-status">200 OK</span>
                </div>
                <div className="akl-t-sep">{'─'.repeat(42)}</div>
                <div><span className="akl-t-key">"answer"</span><span className="akl-t-val">: "26 products in stock..."</span></div>
                <div><span className="akl-t-key">"trust"</span><span className="akl-t-val">: {'{'}</span></div>
                <div>&nbsp;&nbsp;<span className="akl-t-key">"signature"</span><span className="akl-t-val">: </span><span className="akl-t-sig">"ed25519:NqhdJAv..."</span></div>
                <div>&nbsp;&nbsp;<span className="akl-t-key">"kid"</span><span className="akl-t-val">: </span><span className="akl-t-sig">"catyai-akl-v1"</span></div>
                <div>&nbsp;&nbsp;<span className="akl-t-key">"content_hash"</span><span className="akl-t-val">: </span><span className="akl-t-hash">"sha256:a3f..."</span></div>
                <div><span className="akl-t-val">{'}'}</span></div>
                <div>
                  <span className="akl-t-key">"layered_trust"</span>
                  <span className="akl-t-val">: [</span>
                  <span className="akl-t-trust">"cryptographically_verified"</span>
                  <span className="akl-t-val">]</span>
                </div>
                <div className="akl-t-sep">{'─'.repeat(42)}</div>
              </div>
              <div className="akl-terminal-footer">
                <span className="akl-verified-tag">✓ VERIFIED</span>
                <span className="akl-verified-tag">✓ SIGNED</span>
                <span className="akl-verified-tag">✓ LIVE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="akl-section akl-problem">
          <div className="akl-container">
            <p className="akl-eyebrow">{t.problemEyebrow}</p>
            <h2 className="akl-problem-title">
              {t.problemTitle} <span>{t.problemHighlight}</span>
            </h2>
            <p className="akl-section-sub" style={{ marginTop: '1rem' }}>{t.problemSubtitle}</p>
            <div className="akl-stats-grid">
              <div className="akl-stat-card">
                <div className="akl-stat-value">{t.stat1Value}</div>
                <div className="akl-stat-label">{t.stat1Label}</div>
              </div>
              <div className="akl-stat-card">
                <div className="akl-stat-value">{t.stat2Value}</div>
                <div className="akl-stat-label">{t.stat2Label}</div>
              </div>
              <div className="akl-stat-card">
                <div className="akl-stat-value">{t.stat3Value}</div>
                <div className="akl-stat-label">{t.stat3Label}</div>
              </div>
            </div>
            <p className="akl-problem-solution">{t.problemSolution}</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="akl-section">
          <div className="akl-container">
            <p className="akl-eyebrow">{t.howEyebrow}</p>
            <h2 className="akl-section-title">{t.howTitle}</h2>
            <p className="akl-section-sub">{t.howSubtitle}</p>
            <div className="akl-steps-grid">
              {[
                { num: t.step1Num, title: t.step1Title, desc: t.step1Desc },
                { num: t.step2Num, title: t.step2Title, desc: t.step2Desc },
                { num: t.step3Num, title: t.step3Title, desc: t.step3Desc },
              ].map((step, i) => (
                <div key={i} className="akl-step">
                  <div className="akl-step-num">{step.num}</div>
                  <div className="akl-step-title">{step.title}</div>
                  <div className="akl-step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="akl-section akl-modules">
          <div className="akl-container">
            <p className="akl-eyebrow">{t.modulesEyebrow}</p>
            <h2 className="akl-section-title">{t.modulesTitle}</h2>
            <p className="akl-section-sub">{t.modulesSubtitle}</p>
            <div className="akl-modules-grid">
              {t.modules.map((mod, i) => (
                <div key={i} className="akl-module-card">
                  <div className="akl-module-icon">{mod.icon}</div>
                  <div className="akl-module-title">{mod.title}</div>
                  <div className="akl-module-desc">{mod.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="akl-cta">
          <div className="akl-cta-card">
            <p className="akl-eyebrow">{t.ctaEyebrow}</p>
            <h2 className="akl-cta-title">{t.ctaTitle}</h2>
            <p className="akl-cta-sub">{t.ctaSubtitle}</p>
            <div className="akl-cta-actions">
              <a href="https://app.catyai.io/register" className="akl-btn-primary">{t.ctaButton}</a>
              <Link to="/docs" className="akl-cta-link">{t.ctaLink}</Link>
            </div>
          </div>
        </section>

        <FooterV9 />
      </div>
    </>
  )
}
