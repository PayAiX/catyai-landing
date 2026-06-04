import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    seoTitle: 'NAP V3 Protocol — Native AI Protocol by CatyAI',
    seoDesc: 'Open protocol for AI crawler discovery. NAP V3 + AKL v2 transforms your business data into cryptographically signed, AI-native endpoints indexed by GPT, Gemini, Claude, and Perplexity.',
    badgeProtocol: '⬡ NAP V3',
    badgeAkl: 'AKL v2',
    badgeAnthropic: '✦ Anthropic Claude Partner Network',
    heroTitle: 'Native AI Protocol',
    heroTitle2: 'V3 Specification.',
    heroSub: 'NAP V3 + AKL v2 transform your business data into cryptographically signed, AI-native endpoints — verified by Ed25519, discovered via /.well-known/ai-context, and indexed natively by GPT, Gemini, Claude, and Perplexity.',
    heroCta: 'Deploy NAP Protocol',
    heroCtaAlt: 'View Platform Architecture →',
    metrics: [
      { value: '9', label: 'AI Crawlers Supported' },
      { value: '<15m', label: 'Sync Latency' },
      { value: 'Ed25519', label: 'Signing Algorithm' },
      { value: '99.97%', label: 'Uptime SLA' },
    ],
    protocolLabel: 'Protocol Stack',
    protocolTitle: 'Four Layers of\nAI-Native Authority',
    protocolSub: 'NAP V3 is not a plugin. It is a foundational infrastructure specification that makes your business data verifiable, structured, cryptographically signed, and continuously synchronized with every major AI model.',
    layers: [
      {
        num: '01',
        title: 'NAP V3 — Native AI Protocol',
        desc: 'NAP V3 (Native AI Protocol) is the third-generation specification for exposing business data as first-class AI-readable endpoints. Every payload is structured as JSON-LD + Schema.org and delivered through a standardized /.well-known/ai-context discovery endpoint.',
        detail: 'JSON-LD · Schema.org · /.well-known/ai-context',
      },
      {
        num: '02',
        title: 'AKL v2 — AI Knowledge Layer',
        desc: 'The AI Knowledge Layer sits between your raw business content and AI crawlers. AKL v2 normalises pricing, services, FAQs, team, and hours into a unified semantic graph that 9 major LLMs can traverse natively — without custom adapters per model.',
        detail: 'Semantic graph · Vector-ready · Cross-model',
      },
      {
        num: '03',
        title: 'EdDSA Signing + JWKS Endpoint',
        desc: 'Every knowledge payload is signed with Ed25519 (EdDSA) asymmetric cryptography. AI crawlers and third-party verifiers can retrieve the public key set from our JWKS endpoint and independently validate the integrity and origin of your business data.',
        detail: 'Ed25519 · X.509 · HTTPS pinning',
      },
      {
        num: '04',
        title: '/.well-known/ai-context Discovery',
        desc: 'The ai-context well-known endpoint exposes the full machine-readable business identity in a single authenticated fetch. It follows the emerging AI Discovery standard, making your data natively indexable by GPT, Gemini, Claude, Perplexity, and every major LLM crawler.',
        detail: 'RFC 8615 · AI Discovery · LLM-native',
      },
    ],
    endpointsLabel: 'Live Endpoints',
    endpointsTitle: 'Public discovery\nendpoints.',
    endpointsSub: "CatyAI's own infrastructure implements the full NAP V3 spec. Both endpoints are live, publicly accessible, and signed with our Ed25519 key pair. Use them to verify the protocol works before deploying for your business.",
    endpointFeatures: [
      'ai-context returns full JSON-LD business identity',
      'jwks.json exposes the Ed25519 public key for verification',
      'Both endpoints are RFC 8615 well-known compliant',
      'Signed payloads verifiable by any JOSE-compliant client',
      'Zero authentication required for public discovery',
    ],
    endpoints: [
      {
        label: '/.well-known/ai-context',
        url: 'https://api.catyai.io/.well-known/ai-context',
        desc: 'Live machine-readable business identity endpoint',
      },
      {
        label: '/.well-known/jwks.json',
        url: 'https://api.catyai.io/.well-known/jwks.json',
        desc: 'Public key set for EdDSA signature verification',
      },
    ],
    codeLabel: 'Verify EdDSA signature',
    ctaLabel: 'Get Started',
    ctaTitle: 'Your business,\nnative to every AI.',
    ctaSub: 'Join 3,000+ businesses already verified on the NAP Protocol. 14-day free trial, no credit card required.',
    ctaBtn: 'Start Free Trial',
    ctaBtnAlt: 'Talk to Sales →',
  },
  ro: {
    seoTitle: 'Protocolul NAP V3 — Native AI Protocol de CatyAI',
    seoDesc: 'Protocol deschis pentru descoperire de crawlere AI. NAP V3 + AKL v2 transformă datele afacerii tale în endpoint-uri AI-native, semnate criptografic, indexate de GPT, Gemini, Claude și Perplexity.',
    badgeProtocol: '⬡ NAP V3',
    badgeAkl: 'AKL v2',
    badgeAnthropic: '✦ Rețeaua Partenerilor Anthropic Claude',
    heroTitle: 'Protocol AI Nativ',
    heroTitle2: 'Specificația V3.',
    heroSub: 'NAP V3 + AKL v2 transformă datele afacerii tale în endpoint-uri AI-native, semnate criptografic — verificate prin Ed25519, descoperite prin /.well-known/ai-context și indexate nativ de GPT, Gemini, Claude și Perplexity.',
    heroCta: 'Implementează Protocolul NAP',
    heroCtaAlt: 'Vezi Arhitectura Platformei →',
    metrics: [
      { value: '9', label: 'Crawlere AI Suportate' },
      { value: '<15m', label: 'Latență Sincronizare' },
      { value: 'Ed25519', label: 'Algoritm Semnare' },
      { value: '99.97%', label: 'SLA Disponibilitate' },
    ],
    protocolLabel: 'Stiva Protocolului',
    protocolTitle: 'Patru Straturi de\nAutoritate AI-Nativă',
    protocolSub: 'NAP V3 nu este un plugin. Este o specificație de infrastructură fundamentală care face datele afacerii tale verificabile, structurate, semnate criptografic și sincronizate continuu cu fiecare model AI major.',
    layers: [
      {
        num: '01',
        title: 'NAP V3 — Protocol AI Nativ',
        desc: 'NAP V3 (Native AI Protocol) este specificația de generație a treia pentru expunerea datelor de afaceri ca endpoint-uri AI-readable de primă clasă. Fiecare payload este structurat ca JSON-LD + Schema.org și livrat printr-un endpoint standardizat /.well-known/ai-context.',
        detail: 'JSON-LD · Schema.org · /.well-known/ai-context',
      },
      {
        num: '02',
        title: 'AKL v2 — Stratul de Cunoaștere AI',
        desc: 'Stratul de Cunoaștere AI se află între conținutul brut al afacerii tale și crawlerele AI. AKL v2 normalizează prețuri, servicii, FAQ-uri, echipă și program într-un graf semantic unificat pe care 9 LLM-uri majore îl pot traversa nativ — fără adaptoare personalizate.',
        detail: 'Graf semantic · Vector-ready · Cross-model',
      },
      {
        num: '03',
        title: 'Semnare EdDSA + Endpoint JWKS',
        desc: 'Fiecare payload de cunoaștere este semnat cu criptografie asimetrică Ed25519 (EdDSA). Crawlerele AI și verificatorii terți pot prelua setul de chei publice din endpoint-ul JWKS și pot valida independent integritatea și originea datelor tale de afaceri.',
        detail: 'Ed25519 · X.509 · Fixare HTTPS',
      },
      {
        num: '04',
        title: 'Descoperire /.well-known/ai-context',
        desc: 'Endpoint-ul well-known ai-context expune identitatea completă a afacerii, citibilă de mașini, într-un singur fetch autentificat. Urmează standardul emergent AI Discovery, făcând datele tale indexabile nativ de GPT, Gemini, Claude, Perplexity și orice crawler LLM major.',
        detail: 'RFC 8615 · AI Discovery · LLM-nativ',
      },
    ],
    endpointsLabel: 'Endpoint-uri Live',
    endpointsTitle: 'Endpoint-uri publice\nde descoperire.',
    endpointsSub: 'Infrastructura proprie a CatyAI implementează specificația completă NAP V3. Ambele endpoint-uri sunt live, accesibile public și semnate cu perechea noastră de chei Ed25519. Folosește-le pentru a verifica că protocolul funcționează înainte de a-l implementa pentru afacerea ta.',
    endpointFeatures: [
      'ai-context returnează identitatea completă a afacerii în JSON-LD',
      'jwks.json expune cheia publică Ed25519 pentru verificare',
      'Ambele endpoint-uri sunt conforme RFC 8615 well-known',
      'Payload-urile semnate sunt verificabile de orice client compatibil JOSE',
      'Zero autentificare necesară pentru descoperire publică',
    ],
    endpoints: [
      {
        label: '/.well-known/ai-context',
        url: 'https://api.catyai.io/.well-known/ai-context',
        desc: 'Endpoint live de identitate a afacerii, citibil de mașini',
      },
      {
        label: '/.well-known/jwks.json',
        url: 'https://api.catyai.io/.well-known/jwks.json',
        desc: 'Set de chei publice pentru verificarea semnăturii EdDSA',
      },
    ],
    codeLabel: 'Verifică semnătura EdDSA',
    ctaLabel: 'Începe Acum',
    ctaTitle: 'Afacerea ta,\nnativă pentru orice AI.',
    ctaSub: 'Alătură-te celor 3.000+ afaceri deja verificate pe Protocolul NAP. 14 zile gratuit, fără card de credit.',
    ctaBtn: 'Încearcă Gratuit',
    ctaBtnAlt: 'Discută cu Vânzări →',
  },
}

export default function ProtocolPage() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang]

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        canonical="https://catyai.io/protocol"
      />
      <style>{`
        .np-page { background: #010A1F; color: #f1f5f9; font-family: 'Inter', sans-serif; }

        .np-hero {
          min-height: 92vh;
          background: #010A1F;
          display: flex;
          align-items: center;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .np-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 60% 10%, rgba(200,161,101,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(99,102,241,0.09) 0%, transparent 60%);
          pointer-events: none;
        }
        .np-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .np-badge-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.8rem; }
        .np-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.28);
          color: #C8A165;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
        }
        .np-badge-anthropic {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.28);
          color: #818cf8;
        }
        .np-hero-title {
          font-weight: 800;
          font-size: clamp(2.6rem, 5.5vw, 5rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        .np-hero-title span { color: #C8A165; }
        .np-hero-sub {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #94a3b8;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .np-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .np-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .np-cta-primary:hover { background: #D4B57A; }
        .np-cta-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.18);
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .np-cta-secondary:hover { border-color: #C8A165; background: rgba(200,161,101,0.06); }
        .np-visual {
          position: relative;
          height: 460px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          gap: 1.5rem;
          padding: 2rem;
        }
        .np-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,161,101,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .np-node-ring {
          width: 100px;
          height: 100px;
          border: 2px solid rgba(200,161,101,0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: np-pulse 3s ease-in-out infinite;
          flex-shrink: 0;
          z-index: 1;
        }
        .np-node-ring::before {
          content: '';
          position: absolute;
          inset: -12px;
          border: 1px solid rgba(200,161,101,0.2);
          border-radius: 50%;
          animation: np-pulse 3s ease-in-out infinite 0.5s;
        }
        .np-node-ring::after {
          content: '';
          position: absolute;
          inset: -24px;
          border: 1px solid rgba(200,161,101,0.1);
          border-radius: 50%;
          animation: np-pulse 3s ease-in-out infinite 1s;
        }
        @keyframes np-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        .np-node-icon { font-size: 2rem; line-height: 1; }
        .np-endpoint-pills { display: flex; flex-direction: column; gap: 0.6rem; z-index: 1; width: 100%; }
        .np-endpoint-pill {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 0.55rem 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .np-endpoint-pill:hover { border-color: rgba(200,161,101,0.35); background: rgba(200,161,101,0.05); }
        .np-endpoint-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(34,197,94,0.6);
        }
        .np-endpoint-label {
          font-family: monospace;
          font-size: 0.72rem;
          color: #C8A165;
          letter-spacing: 0.04em;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .np-endpoint-arrow { font-size: 0.65rem; color: #475569; }
        .np-metrics {
          background: #030D26;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 3rem 1.5rem;
        }
        .np-metrics-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .np-metric-val {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #C8A165;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .np-metric-label { font-size: 0.8rem; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
        .np-section { background: #010A1F; padding: 7rem 1.5rem; }
        .np-section-alt { background: #030D26; padding: 7rem 1.5rem; }
        .np-container { max-width: 1200px; margin: 0 auto; }
        .np-section-label { font-family: monospace; font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: #C8A165; margin-bottom: 1rem; }
        .np-section-title { font-weight: 800; font-size: clamp(2rem, 3.5vw, 3rem); letter-spacing: -0.025em; line-height: 1.1; color: #f1f5f9; margin-bottom: 1.2rem; white-space: pre-line; }
        .np-section-sub { font-size: 1.05rem; color: #94a3b8; line-height: 1.7; max-width: 560px; font-weight: 300; margin-bottom: 4rem; }
        .np-steps { display: flex; flex-direction: column; gap: 2px; }
        .np-step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 2.5rem;
          align-items: start;
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }
        .np-step:last-child { border-bottom: none; }
        .np-step-num { font-family: monospace; font-size: 3rem; font-weight: 800; color: rgba(200,161,101,0.18); line-height: 1; padding-top: 4px; transition: color 0.2s; }
        .np-step:hover .np-step-num { color: rgba(200,161,101,0.5); }
        .np-step-title { font-weight: 700; font-size: 1.25rem; color: #f1f5f9; margin-bottom: 0.6rem; }
        .np-step-desc { font-size: 0.97rem; color: #94a3b8; line-height: 1.7; font-weight: 300; margin-bottom: 0.8rem; }
        .np-step-detail { font-family: monospace; font-size: 0.72rem; color: #C8A165; letter-spacing: 0.08em; opacity: 0.8; }
        .np-wk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .np-wk-title { font-weight: 800; font-size: clamp(1.8rem, 3vw, 2.6rem); letter-spacing: -0.025em; color: #f1f5f9; margin-bottom: 1rem; white-space: pre-line; }
        .np-wk-sub { font-size: 0.97rem; color: #94a3b8; line-height: 1.7; font-weight: 300; margin-bottom: 2rem; }
        .np-feature-list { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 0.85rem; }
        .np-feature-list li { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.95rem; color: #cbd5e1; }
        .np-feature-list li::before { content: '✓'; color: #C8A165; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
        .np-endpoint-cards { display: flex; flex-direction: column; gap: 1rem; }
        .np-endpoint-card {
          background: #020C1B;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.5rem;
          text-decoration: none;
          transition: border-color 0.2s;
          display: block;
        }
        .np-endpoint-card:hover { border-color: rgba(200,161,101,0.4); }
        .np-endpoint-card-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; }
        .np-endpoint-card-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.5); flex-shrink: 0; }
        .np-endpoint-card-path { font-family: monospace; font-size: 0.8rem; color: #C8A165; letter-spacing: 0.04em; }
        .np-endpoint-card-desc { font-size: 0.88rem; color: #64748b; line-height: 1.5; }
        .np-code-block { background: #020C1B; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; }
        .np-code-header { background: rgba(255,255,255,0.04); padding: 0.75rem 1.2rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .np-code-dot { width: 10px; height: 10px; border-radius: 50%; }
        .np-code-title { font-family: monospace; font-size: 0.72rem; color: #475569; margin-left: 0.5rem; letter-spacing: 0.08em; }
        .np-code-body { padding: 1.5rem 1.4rem; font-family: 'Courier New', monospace; font-size: 0.78rem; line-height: 1.8; color: #94a3b8; white-space: pre; overflow-x: auto; }
        .np-cta-section { background: linear-gradient(135deg, #030D26 0%, #010A1F 100%); border-top: 1px solid rgba(200,161,101,0.15); padding: 7rem 1.5rem; text-align: center; }
        .np-cta-title { font-weight: 800; font-size: clamp(2rem, 4vw, 3.2rem); letter-spacing: -0.025em; color: #f1f5f9; margin-bottom: 1rem; white-space: pre-line; }
        .np-cta-sub { font-size: 1.1rem; color: #94a3b8; font-weight: 300; margin-bottom: 2.5rem; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .np-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 900px) {
          .np-hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .np-visual { height: auto; min-height: 320px; }
          .np-metrics-inner { grid-template-columns: repeat(2, 1fr); }
          .np-wk-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .np-step { grid-template-columns: 60px 1fr; gap: 1.5rem; }
        }
        @media (max-width: 480px) {
          .np-metrics-inner { grid-template-columns: 1fr 1fr; }
          .np-step { grid-template-columns: 1fr; gap: 0.5rem; }
          .np-step-num { font-size: 2rem; }
        }
      `}</style>

      <div className="np-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* Hero */}
        <section className="np-hero">
          <div className="np-hero-inner">
            <div>
              <div className="np-badge-row">
                <span className="np-badge">{t.badgeProtocol}</span>
                <span className="np-badge">{t.badgeAkl}</span>
                <span className="np-badge np-badge-anthropic">{t.badgeAnthropic}</span>
              </div>
              <h1 className="np-hero-title">
                {t.heroTitle}<br />
                <span>{t.heroTitle2}</span>
              </h1>
              <p className="np-hero-sub">{t.heroSub}</p>
              <div className="np-cta-row">
                <a href="https://app.catyai.io/register" className="np-cta-primary">{t.heroCta}</a>
                <Link to="/platform" className="np-cta-secondary">{t.heroCtaAlt}</Link>
              </div>
            </div>

            <div className="np-visual">
              <div className="np-node-ring">
                <span className="np-node-icon">⬡</span>
              </div>
              <div className="np-endpoint-pills">
                {t.endpoints.map((ep) => (
                  <a
                    key={ep.url}
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="np-endpoint-pill"
                  >
                    <span className="np-endpoint-dot" />
                    <span className="np-endpoint-label">{ep.label}</span>
                    <span className="np-endpoint-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <div className="np-metrics">
          <div className="np-metrics-inner">
            {t.metrics.map((m) => (
              <div key={m.label}>
                <div className="np-metric-val">{m.value}</div>
                <div className="np-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Layers */}
        <section className="np-section">
          <div className="np-container">
            <div className="np-section-label">{t.protocolLabel}</div>
            <h2 className="np-section-title">{t.protocolTitle}</h2>
            <p className="np-section-sub">{t.protocolSub}</p>
            <div className="np-steps">
              {t.layers.map((s) => (
                <div className="np-step" key={s.num}>
                  <div className="np-step-num">{s.num}</div>
                  <div>
                    <div className="np-step-title">{s.title}</div>
                    <div className="np-step-desc">{s.desc}</div>
                    <div className="np-step-detail">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Well-known endpoints */}
        <section className="np-section-alt">
          <div className="np-container">
            <div className="np-wk-grid">
              <div>
                <div className="np-section-label">{t.endpointsLabel}</div>
                <h2 className="np-wk-title">{t.endpointsTitle}</h2>
                <p className="np-wk-sub">{t.endpointsSub}</p>
                <ul className="np-feature-list">
                  {t.endpointFeatures.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="np-endpoint-cards">
                {t.endpoints.map((ep) => (
                  <a
                    key={ep.url}
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="np-endpoint-card"
                  >
                    <div className="np-endpoint-card-header">
                      <span className="np-endpoint-card-dot" />
                      <span className="np-endpoint-card-path">{ep.label}</span>
                    </div>
                    <div className="np-endpoint-card-desc">{ep.desc}</div>
                  </a>
                ))}

                <div className="np-code-block">
                  <div className="np-code-header">
                    <div className="np-code-dot" style={{ background: '#ef4444' }} />
                    <div className="np-code-dot" style={{ background: '#f59e0b' }} />
                    <div className="np-code-dot" style={{ background: '#22c55e' }} />
                    <span className="np-code-title">{t.codeLabel}</span>
                  </div>
                  <div className="np-code-body">{`# Fetch public key set
curl https://api.catyai.io/.well-known/jwks.json

# Fetch signed ai-context payload
curl https://api.catyai.io/.well-known/ai-context

# Verify with jose CLI
jose verify --jwks jwks.json payload.json`}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="np-cta-section">
          <div className="np-section-label" style={{ marginBottom: '1.2rem' }}>{t.ctaLabel}</div>
          <h2 className="np-cta-title">{t.ctaTitle}</h2>
          <p className="np-cta-sub">{t.ctaSub}</p>
          <div className="np-cta-btns">
            <a href="https://app.catyai.io/register" className="np-cta-primary">{t.ctaBtn}</a>
            <Link to="/contact" className="np-cta-secondary">{t.ctaBtnAlt}</Link>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
