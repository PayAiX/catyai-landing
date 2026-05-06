import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const COMPLIANCE = [
  {
    icon: '🛡️',
    title: 'SOC 2 Type II',
    desc: 'Annual third-party audit of security, availability, and confidentiality controls across all CatyAI production systems.',
    tag: 'Annual Audit',
  },
  {
    icon: '🇪🇺',
    title: 'GDPR Compliant',
    desc: 'All EU personal data processed under Article 6 lawful bases. DPA available. Data never leaves the EU for European deployments.',
    tag: 'EU Data Residency',
  },
  {
    icon: '🤖',
    title: 'EU AI Act Ready',
    desc: 'CatyAI\'s risk classification, transparency obligations, and human oversight controls are aligned with the EU AI Act framework effective 2025.',
    tag: 'High-Risk AI Compliant',
  },
  {
    icon: '🔒',
    title: 'ISO 27001 (in progress)',
    desc: 'Certification audit scheduled for Q4 2026. Current controls already exceed ISO 27001 requirements for information security management.',
    tag: 'Q4 2026',
  },
]

const DATA_ISOLATION = [
  { label: 'Dedicated database per tenant', icon: '🗄️' },
  { label: 'Zero cross-tenant data access', icon: '🚫' },
  { label: 'Encryption at rest (AES-256) and in transit (TLS 1.3)', icon: '🔐' },
  { label: 'Audit logs retained 90 days, exportable on request', icon: '📋' },
  { label: 'Automated key rotation every 90 days', icon: '🔑' },
  { label: 'Right to erasure processed within 72 hours', icon: '✅' },
]

export default function CompanyPage() {
  const [lang, setLang] = useState('en')

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
        title="Company — Engineered for Absolute Trust | CatyAI"
        description="Discover PayAi-X FZE. CatyAI is the enterprise AI infrastructure layer built in Dubai for global scale. Engineered for verifiable, compliant, and high-performance AI."
        canonical="https://catyai.io/company"
      />
      <style>{`
        /* ── Base ── */
        .co-page { background: #010A1F; color: #e8e8f0; font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }

        /* ── Hero ── */
        .co-hero {
          min-height: 92vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 7rem 2rem 5rem;
          position: relative;
        }
        @media (max-width: 900px) {
          .co-hero { grid-template-columns: 1fr; padding: 6rem 1.5rem 4rem; text-align: center; }
          .co-hero-visual { order: -1; margin: 0 auto; }
        }
        .co-hero-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 50% 60% at 70% 40%, rgba(200,161,101,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 70%, rgba(91,141,239,0.04) 0%, transparent 55%);
        }
        .co-hero-text { position: relative; z-index: 1; }

        .co-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.22);
          color: #C8A165;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.45rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .co-badge span { font-size: 1rem; }

        .co-hero-title {
          font-weight: 800;
          font-size: clamp(2.6rem, 5vw, 4.5rem);
          line-height: 1.06;
          letter-spacing: -0.035em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        .co-hero-title em { color: #C8A165; font-style: normal; display: block; }

        .co-hero-sub {
          font-size: clamp(0.95rem, 1.4vw, 1.1rem);
          color: #7a8fa8;
          max-width: 500px;
          line-height: 1.75;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 900px) { .co-hero-sub { margin: 0 auto 2.5rem; } }

        .co-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        @media (max-width: 900px) { .co-cta-row { justify-content: center; } }

        .co-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .co-cta-primary:hover { background: #D4B57A; transform: translateY(-1px); }
        .co-cta-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #cbd5e1;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .co-cta-secondary:hover { border-color: #C8A165; color: #C8A165; }

        /* ── Monolith Visual ── */
        .co-hero-visual {
          position: relative;
          width: 460px;
          height: 460px;
          flex-shrink: 0;
          z-index: 1;
        }

        /* Container frame */
        .co-scene-frame {
          position: absolute;
          inset: 20px;
          border-radius: 24px;
          border: 1px solid rgba(200,161,101,0.12);
          background: rgba(200,161,101,0.02);
          pointer-events: none;
        }

        /* Corner accents */
        .co-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(200,161,101,0.45);
          border-style: solid;
          pointer-events: none;
          z-index: 5;
        }
        .co-corner-tl { top: 24px; left: 24px; border-width: 1.5px 0 0 1.5px; }
        .co-corner-tr { top: 24px; right: 24px; border-width: 1.5px 1.5px 0 0; }
        .co-corner-bl { bottom: 24px; left: 24px; border-width: 0 0 1.5px 1.5px; }
        .co-corner-br { bottom: 24px; right: 24px; border-width: 0 1.5px 1.5px 0; }

        /* Ambient scene glow */
        .co-mono-scene-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 55% 65% at 50% 50%, rgba(200,161,101,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Topographic SVG globe grid */
        .co-topo-svg {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 420px;
          height: 160px;
          opacity: 0.7;
          pointer-events: none;
        }

        /* Ground glow */
        .co-ground-glow {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 30px;
          background: radial-gradient(ellipse 100% 100%, rgba(200,161,101,0.18) 0%, transparent 70%);
          filter: blur(10px);
          animation: ground-pulse 6s ease-in-out infinite;
        }
        @keyframes ground-pulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50%       { opacity: 0.3; transform: translateX(-50%) scaleX(0.8); }
        }

        /* Monolith container */
        .co-mono-container {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: mono-float 7s ease-in-out infinite;
          z-index: 3;
        }
        @keyframes mono-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50%       { transform: translate(-50%, -50%) translateY(-12px); }
        }

        /* Monolith block */
        .co-mono-block { position: relative; width: 150px; height: 262px; }

        /* Top face — worm's eye perspective (narrow back, wide front) */
        .co-mono-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          height: 12px;
          clip-path: polygon(9% 0%, 91% 0%, 100% 100%, 0% 100%);
          background: linear-gradient(120deg, rgba(200,161,101,0.22) 0%, rgba(16,26,42,0.9) 70%);
        }

        /* Right side face */
        .co-mono-right {
          position: absolute;
          top: 12px;
          right: 0;
          width: 20px;
          height: 250px;
          background: linear-gradient(90deg, rgba(10,20,36,0.85), rgba(6,12,22,0.97));
          clip-path: polygon(0% 0%, 100% 1.5%, 100% 100%, 0% 100%);
        }

        /* Main front face */
        .co-mono-front {
          position: absolute;
          top: 12px;
          left: 0;
          width: 130px;
          height: 250px;
          background: linear-gradient(175deg, #1C2A40 0%, #0E1828 30%, #081020 60%, #050C18 100%);
          border: 1px solid rgba(200,161,101,0.2);
          border-top-color: rgba(200,161,101,0.4);
          border-right: none;
          overflow: hidden;
        }
        .co-mono-front::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            180deg,
            transparent 0px, transparent 83px,
            rgba(200,161,101,0.05) 83px, rgba(200,161,101,0.05) 84px
          );
          pointer-events: none;
        }

        /* Golden AI core */
        .co-mono-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 50px;
          background: radial-gradient(ellipse 100% 100% at 50% 50%, rgba(200,161,101,0.4) 0%, rgba(200,161,101,0.15) 40%, transparent 70%);
          animation: core-pulse 3.5s ease-in-out infinite;
          z-index: 2;
        }
        @keyframes core-pulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }

        /* Edge light leaks */
        .co-mono-edge-l {
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent 5%, rgba(200,161,101,0.25) 30%, rgba(200,161,101,0.3) 50%, rgba(200,161,101,0.15) 70%, transparent 95%);
          z-index: 3;
        }
        .co-mono-edge-r {
          position: absolute;
          top: 0; bottom: 0; right: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent 5%, rgba(200,161,101,0.15) 30%, rgba(200,161,101,0.2) 50%, rgba(200,161,101,0.1) 70%, transparent 95%);
          z-index: 3;
        }

        /* Scan line */
        .co-mono-scan {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.6), transparent);
          animation: mono-scan 4s ease-in-out infinite;
          z-index: 4;
        }
        @keyframes mono-scan {
          0%   { top: 5%; opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.9; }
          100% { top: 92%; opacity: 0; }
        }

        /* Crypto text on glass */
        .co-mono-crypto {
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: 0.055;
          color: #C8A165;
          font-size: 0.42rem;
          font-family: 'Courier New', monospace;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1.6;
          padding: 8px 6px;
          transform: rotate(-3deg) scale(1.05);
          z-index: 1;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }

        /* Status LEDs */
        .co-mono-leds {
          position: absolute;
          top: 18px;
          left: 12px;
          display: flex;
          gap: 5px;
          z-index: 5;
        }
        .co-led { width: 4px; height: 4px; border-radius: 50%; }
        .co-led-green { background: #10B981; box-shadow: 0 0 4px #10B981; animation: led-blink 3s ease-in-out infinite; }
        .co-led-amber { background: #C8A165; box-shadow: 0 0 4px #C8A165; animation: led-blink 5s ease-in-out infinite 1s; }
        @keyframes led-blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.2; }
        }

        /* Orbital rings — horizontal Saturn belts at monolith mid-height */
        .co-mono-ring {
          position: absolute;
          left: 50%;
          top: 48%;
          border-radius: 50%;
          border: 1px solid rgba(200,161,101,0.32);
          pointer-events: none;
        }
        .co-mono-ring-1 {
          width: 240px; height: 68px;
          margin-top: -34px; margin-left: -120px;
          animation: ring-spin 16s linear infinite;
          box-shadow: 0 0 8px rgba(200,161,101,0.1);
        }
        .co-mono-ring-2 {
          width: 320px; height: 90px;
          margin-top: -45px; margin-left: -160px;
          animation: ring-spin 24s linear infinite reverse;
          border-color: rgba(200,161,101,0.18);
        }
        .co-mono-ring-3 {
          width: 400px; height: 112px;
          margin-top: -56px; margin-left: -200px;
          animation: ring-spin 36s linear infinite;
          border-color: rgba(200,161,101,0.1);
        }
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Compliance orbit badges ── */
        .co-orbit-badge {
          position: absolute;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8A165;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.28);
          padding: 0.3rem 0.65rem;
          border-radius: 100px;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          z-index: 4;
        }
        .co-orbit-badge::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C8A165;
          margin-right: 5px;
          vertical-align: middle;
          box-shadow: 0 0 4px #C8A165;
        }
        .co-badge-soc2  { top: 10%;  right: 4%; }
        .co-badge-gdpr  { bottom: 18%; left: 0%; }
        .co-badge-eu    { top: 50%;  right: 0%; transform: translateY(-50%); }

        /* ── Sections ── */
        .co-section     { padding: 6rem 1.5rem; background: #010A1F; }
        .co-section-alt { padding: 6rem 1.5rem; background: #020C1E; }
        .co-container   { max-width: 1120px; margin: 0 auto; }

        .co-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.75rem;
        }
        .co-title {
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 1rem;
        }
        .co-title em { color: #C8A165; font-style: normal; }
        .co-desc {
          color: #7a8fa8;
          font-size: 1.05rem;
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 3rem;
        }

        /* Compliance Cards */
        .co-compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .co-compliance-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
        }
        .co-compliance-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C8A165, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .co-compliance-card:hover { border-color: rgba(200,161,101,0.25); background: rgba(200,161,101,0.03); }
        .co-compliance-card:hover::after { opacity: 1; }
        .co-compliance-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .co-compliance-title { font-weight: 700; font-size: 1rem; color: #f1f5f9; margin-bottom: 0.5rem; }
        .co-compliance-desc { color: #7a8fa8; font-size: 0.875rem; line-height: 1.65; margin-bottom: 1rem; }
        .co-compliance-tag {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6ee7b7;
          background: rgba(16,185,129,0.1);
          padding: 0.22rem 0.6rem;
          border-radius: 4px;
        }

        /* Data Isolation */
        .co-isolation-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) { .co-isolation-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .co-isolation-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.875rem; }
        .co-isolation-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #cbd5e1;
          font-size: 0.9rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 0.75rem 1rem;
        }
        .co-isolation-list li span { font-size: 1.1rem; flex-shrink: 0; }

        .co-arch-visual {
          background: #0A1525;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .co-arch-label-top {
          font-size: 0.65rem;
          color: #475569;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .co-arch-layer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .co-arch-layer-label { font-size: 0.8rem; font-weight: 500; color: #94a3b8; flex: 1; }
        .co-arch-layer-status {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(16,185,129,0.12);
          color: #6ee7b7;
        }

        /* Vision */
        .co-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 768px) { .co-vision-grid { grid-template-columns: 1fr; } }
        .co-vision-block {
          padding: 2rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: border-color 0.2s;
        }
        .co-vision-block:hover { border-color: rgba(200,161,101,0.2); }
        .co-vision-block h3 { font-weight: 700; font-size: 1.05rem; color: #f1f5f9; margin-bottom: 0.75rem; }
        .co-vision-block p { color: #7a8fa8; font-size: 0.9rem; line-height: 1.7; margin: 0; }

        /* CTA */
        .co-cta-section {
          padding: 7rem 1.5rem;
          text-align: center;
          background: linear-gradient(170deg, #020C1E 0%, #010A1F 100%);
          border-top: 1px solid rgba(200,161,101,0.1);
          position: relative;
          overflow: hidden;
        }
        .co-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 60% at 50% 100%, rgba(200,161,101,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .co-cta-title {
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
          position: relative;
        }
        .co-cta-sub { color: #7a8fa8; font-size: 1.05rem; margin-bottom: 2.5rem; position: relative; }
      `}</style>

      <div className="co-page">
        <div className="co-hero-bg" aria-hidden="true" />
        <GlobalHeader lang={lang} setLang={setLang} />

        {/* ── HERO ── */}
        <section style={{ position: 'relative', zIndex: 1 }}>
          <div className="co-hero">
            {/* Left: text */}
            <div className="co-hero-text">
              <div className="co-badge">
                <span>⬡</span> PayAi-X FZE · Dubai, UAE
              </div>
              <h1 className="co-hero-title">
                Engineered for
                <em>absolute trust.</em>
              </h1>
              <p className="co-hero-sub">
                CatyAI is the AI infrastructure layer built by PayAi-X FZE — a Dubai-based company focused on verifiable, compliant, and high-performance AI for business. SOC2, GDPR, and EU AI Act ready from day one.
              </p>
              <div className="co-cta-row">
                <a href="mailto:contact@payai-x.com?subject=Security Whitepaper Request" className="co-cta-primary">
                  Request Security Whitepaper
                </a>
                <Link to="/trust-center" className="co-cta-secondary">Trust Center →</Link>
              </div>
            </div>

            {/* Right: Monolith Visual */}
            <div className="co-hero-visual" aria-hidden="true">
              {/* Frame */}
              <div className="co-scene-frame" />
              <div className="co-corner co-corner-tl" />
              <div className="co-corner co-corner-tr" />
              <div className="co-corner co-corner-bl" />
              <div className="co-corner co-corner-br" />

              {/* Ambient scene glow */}
              <div className="co-mono-scene-glow" />

              {/* Topographic globe grid */}
              <svg className="co-topo-svg" viewBox="0 0 420 160" fill="none" aria-hidden="true">
                <ellipse cx="210" cy="155" rx="200" ry="48" stroke="rgba(200,161,101,0.09)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="165" ry="38" stroke="rgba(200,161,101,0.08)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="130" ry="30" stroke="rgba(200,161,101,0.07)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="95" ry="22" stroke="rgba(200,161,101,0.06)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="60" ry="14" stroke="rgba(200,161,101,0.05)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="28" ry="7" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="10" y2="107" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="410" y2="107" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="60" y2="110" stroke="rgba(200,161,101,0.035)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="360" y2="110" stroke="rgba(200,161,101,0.035)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="110" y2="107" stroke="rgba(200,161,101,0.03)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="310" y2="107" stroke="rgba(200,161,101,0.03)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="210" y2="107" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="155" y2="107" stroke="rgba(200,161,101,0.025)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="265" y2="107" stroke="rgba(200,161,101,0.025)" strokeWidth="0.5"/>
              </svg>

              {/* Ground glow */}
              <div className="co-ground-glow" />

              {/* Orbital rings — Saturn belt */}
              <div className="co-mono-ring co-mono-ring-1" />
              <div className="co-mono-ring co-mono-ring-2" />
              <div className="co-mono-ring co-mono-ring-3" />

              {/* Compliance badges */}
              <div className="co-orbit-badge co-badge-soc2">SOC2</div>
              <div className="co-orbit-badge co-badge-gdpr">GDPR</div>
              <div className="co-orbit-badge co-badge-eu">EU AI Act</div>

              {/* Monolith */}
              <div className="co-mono-container">
                <div className="co-mono-block">
                  <div className="co-mono-top" />
                  <div className="co-mono-right" />
                  <div className="co-mono-front">
                    <div className="co-mono-core" />
                    <div className="co-mono-crypto">
                      SHA·256·HMAC<br/>
                      AES·256·GCM<br/>
                      TLS·1.3·ECDH<br/>
                      RSA·4096·PSS<br/>
                      GDPR·Art·6<br/>
                      SOC2·TYPE·II<br/>
                      EU·AI·ACT·L3<br/>
                      ISO·27001·2022<br/>
                      0xC8A165·VERIFIED
                    </div>
                    <div className="co-mono-scan" />
                    <div className="co-mono-edge-l" />
                    <div className="co-mono-edge-r" />
                    <div className="co-mono-leds">
                      <div className="co-led co-led-green" />
                      <div className="co-led co-led-green" />
                      <div className="co-led co-led-amber" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Security & Compliance ── */}
        <section className="co-section-alt">
          <div className="co-container">
            <div className="co-label">Security & Compliance</div>
            <h2 className="co-title">Compliance isn't a checkbox.<br /><em>It's the architecture.</em></h2>
            <p className="co-desc">Every layer of CatyAI's stack is designed around compliance requirements — not retrofitted after the fact.</p>
            <div className="co-compliance-grid">
              {COMPLIANCE.map((c) => (
                <div key={c.title} className="co-compliance-card">
                  <div className="co-compliance-icon">{c.icon}</div>
                  <div className="co-compliance-title">{c.title}</div>
                  <p className="co-compliance-desc">{c.desc}</p>
                  <span className="co-compliance-tag">{c.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Data Isolation ── */}
        <section className="co-section">
          <div className="co-container">
            <div className="co-isolation-grid">
              <div>
                <div className="co-label">Data Architecture</div>
                <h2 className="co-title">Your data.<br /><em>Completely isolated.</em></h2>
                <p className="co-desc">
                  Each CatyAI customer operates in a fully isolated tenant environment. No shared databases, no cross-tenant queries, no risk of data leakage.
                </p>
                <ul className="co-isolation-list">
                  {DATA_ISOLATION.map((item) => (
                    <li key={item.label}>
                      <span>{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="co-arch-visual">
                <div className="co-arch-label-top">Infrastructure Stack</div>
                {[
                  { label: 'TLS 1.3 Termination', bg: 'rgba(99,102,241,0.07)' },
                  { label: 'WAF / DDoS Protection', bg: 'rgba(200,161,101,0.05)' },
                  { label: 'Auth Layer (JWT + RBAC)', bg: 'rgba(16,185,129,0.05)' },
                  { label: 'API Gateway (rate-limited)', bg: 'rgba(99,102,241,0.07)' },
                  { label: 'Isolated Tenant DB (AES-256)', bg: 'rgba(200,161,101,0.05)' },
                  { label: 'Encrypted Object Storage', bg: 'rgba(16,185,129,0.05)' },
                ].map((l) => (
                  <div key={l.label} className="co-arch-layer" style={{ background: l.bg }}>
                    <div className="co-arch-layer-label">{l.label}</div>
                    <div className="co-arch-layer-status">Active</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Vision / Story ── */}
        <section className="co-section-alt">
          <div className="co-container">
            <div className="co-label">Our Story</div>
            <h2 className="co-title" style={{ marginBottom: '2.5rem' }}>
              Built in Dubai.<br /><em>Deployed globally.</em>
            </h2>
            <div className="co-vision-grid">
              <div className="co-vision-block">
                <h3>The Mission</h3>
                <p>
                  We founded CatyAI because we saw a gap: businesses were becoming invisible as AI engines replaced traditional search, but no infrastructure existed to make them verifiable and visible in this new paradigm. GEO Gateway, NAP Protocol, and FraudAI Shield are our answer.
                </p>
              </div>
              <div className="co-vision-block">
                <h3>PayAi-X FZE</h3>
                <p>
                  CatyAI is a product of PayAi-X FZE, registered in the Dubai Silicon Oasis Free Zone (UAE). Our legal structure, contracts, and enterprise agreements operate under UAE commercial law with full GDPR compliance for all EU data subjects.
                </p>
              </div>
              <div className="co-vision-block">
                <h3>The Roadmap</h3>
                <p>
                  2025: NAP Protocol v2.0 launch and ISO 27001 audit. 2026: Multi-region EU data residency, Agentic AI integrations, and Series A funding round. We build for a 10-year horizon where every business on Earth has a verified AI identity.
                </p>
              </div>
              <div className="co-vision-block">
                <h3>Investor Relations</h3>
                <p>
                  CatyAI operates a C-Corp structure for US investors alongside UAE holding entity. For deck access, financials, and investor inquiries, contact{' '}
                  <a href="mailto:invest@payai-x.com" style={{ color: '#C8A165', textDecoration: 'none' }}>invest@payai-x.com</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="co-cta-section">
          <div className="co-label" style={{ position: 'relative' }}>Documentation</div>
          <h2 className="co-cta-title">Read our Security Whitepaper</h2>
          <p className="co-cta-sub">Full technical documentation of our security architecture, compliance posture, and data handling practices.</p>
          <div className="co-cta-row" style={{ justifyContent: 'center' }}>
            <a href="mailto:contact@payai-x.com?subject=Security Whitepaper Request" className="co-cta-primary">
              Request Whitepaper
            </a>
            <a href="mailto:contact@payai-x.com" className="co-cta-secondary">Contact Us</a>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
