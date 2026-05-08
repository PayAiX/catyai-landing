import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const COMPLIANCE = [
  { icon: '🛡️', title: 'SOC2 Ready', desc: 'Enterprise-grade access controls and strict audit logging across all CatyAI production systems.', tag: 'Enterprise Security' },
  { icon: '🇪🇺', title: 'GDPR Compliant', desc: 'Absolute EU data residency and rigorous processing standards. DPA available for enterprise clients.', tag: 'EU Data Residency' },
  { icon: '🤖', title: 'EU AI Act Ready', desc: 'Built from the ground up to comply with upcoming AI transparency regulations and high-risk AI requirements.', tag: 'AI Transparency' },
]

const DATA_ISOLATION = [
  { label: 'Private Qdrant vector cluster per tenant', icon: '🗄️' },
  { label: 'Zero cross-tenant data access', icon: '🚫' },
  { label: 'Data never used to train public LLMs', icon: '🔒' },
  { label: 'Encryption at rest (AES-256) and in transit (TLS 1.3)', icon: '🔐' },
  { label: 'Audit logs retained 90 days, exportable on request', icon: '📋' },
  { label: 'Right to erasure processed within 72 hours', icon: '✅' },
]

const ARCH_LAYERS = [
  { label: 'TLS 1.3 Termination', bg: 'rgba(99,102,241,0.07)' },
  { label: 'WAF / DDoS Protection', bg: 'rgba(200,161,101,0.05)' },
  { label: 'Auth Layer (JWT + RBAC)', bg: 'rgba(16,185,129,0.05)' },
  { label: 'API Gateway (rate-limited)', bg: 'rgba(99,102,241,0.07)' },
  { label: 'Qdrant Vector Cluster (per tenant)', bg: 'rgba(200,161,101,0.05)' },
  { label: 'Encrypted Object Storage (AES-256)', bg: 'rgba(16,185,129,0.05)' },
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
        description="Built by PayAi-X FZE in Dubai, CatyAI is the enterprise AI infrastructure engineered for absolute trust. SOC2, GDPR, and EU AI Act ready from day one."
        url="https://catyai.io/company"
      />
      <style>{`
        .co-page { background: #010A1F; color: #e8e8f0; font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }

        /* Hero layout */
        .co-hero {
          min-height: 92vh; display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; gap: 4rem; max-width: 1200px;
          margin: 0 auto; padding: 7rem 2rem 5rem; position: relative;
        }
        @media (max-width: 900px) {
          .co-hero { grid-template-columns: 1fr; padding: 6rem 1.5rem 4rem; text-align: center; }
          .co-hero-visual { order: -1; margin: 0 auto; }
          .co-hero-sub { margin: 0 auto 2.5rem !important; }
          .co-cta-row { justify-content: center; }
        }
        .co-hero-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 50% 60% at 70% 40%, rgba(200,161,101,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 70%, rgba(91,141,239,0.04) 0%, transparent 55%);
        }
        .co-hero-text { position: relative; z-index: 1; }

        .co-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.22);
          color: #C8A165; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.45rem 1rem; border-radius: 100px; margin-bottom: 2rem;
        }
        .co-badge span { font-size: 1rem; }
        .co-hero-title {
          font-weight: 800; font-size: clamp(2.6rem, 5vw, 4.5rem);
          line-height: 1.06; letter-spacing: -0.035em; color: #f1f5f9; margin-bottom: 1.5rem;
        }
        .co-hero-title em { color: #C8A165; font-style: normal; display: block; }
        .co-hero-sub {
          font-size: clamp(0.95rem, 1.4vw, 1.1rem); color: #7a8fa8;
          max-width: 500px; line-height: 1.75; margin-bottom: 2.5rem;
        }
        .co-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .co-cta-primary {
          background: #C8A165; color: #010A1F; font-weight: 700; font-size: 0.9rem;
          padding: 0.85rem 1.75rem; border-radius: 8px; text-decoration: none;
          transition: background 0.2s, transform 0.15s; letter-spacing: 0.01em;
        }
        .co-cta-primary:hover { background: #D4B57A; transform: translateY(-1px); }
        .co-cta-secondary {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: #cbd5e1; font-weight: 600; font-size: 0.9rem;
          padding: 0.85rem 1.75rem; border-radius: 8px; text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .co-cta-secondary:hover { border-color: #C8A165; color: #C8A165; }

        /* Visual container */
        .co-hero-visual { position: relative; width: 460px; height: 460px; flex-shrink: 0; z-index: 1; }

        .co-scene-frame {
          position: absolute; inset: 20px; border-radius: 24px;
          border: 1px solid rgba(200,161,101,0.12); background: rgba(200,161,101,0.02); pointer-events: none;
        }
        .co-corner {
          position: absolute; width: 14px; height: 14px;
          border-color: rgba(200,161,101,0.45); border-style: solid; pointer-events: none; z-index: 5;
        }
        .co-corner-tl { top: 24px; left: 24px; border-width: 1.5px 0 0 1.5px; }
        .co-corner-tr { top: 24px; right: 24px; border-width: 1.5px 1.5px 0 0; }
        .co-corner-bl { bottom: 24px; left: 24px; border-width: 0 0 1.5px 1.5px; }
        .co-corner-br { bottom: 24px; right: 24px; border-width: 0 1.5px 1.5px 0; }

        .co-scene-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 65% at 50% 50%, rgba(200,161,101,0.06) 0%, transparent 65%);
        }
        .co-topo-svg {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          width: 420px; height: 160px; opacity: 0.7; pointer-events: none;
        }

        /* 3D Hex SVG — float animation */
        .co-hex-svg {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) translateY(8px);
          animation: hex-float 7s ease-in-out infinite;
          z-index: 3;
          filter: drop-shadow(0 0 28px rgba(200,161,101,0.14));
        }
        @keyframes hex-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(8px); }
          50%       { transform: translate(-50%, -50%) translateY(-6px); }
        }

        /* Orbital compliance rings */
        .co-hex-ring {
          position: absolute; border-radius: 50%; border: 1px solid;
          pointer-events: none; left: 50%; top: 61%;
        }
        .co-hex-ring-1 {
          width: 232px; height: 65px; margin-top: -32px; margin-left: -116px;
          border-color: rgba(200,161,101,0.4);
          box-shadow: 0 0 12px rgba(200,161,101,0.08);
          animation: ring-fwd 15s linear infinite;
        }
        .co-hex-ring-2 {
          width: 312px; height: 87px; margin-top: -43px; margin-left: -156px;
          border-color: rgba(200,161,101,0.22);
          animation: ring-rev 24s linear infinite;
        }
        .co-hex-ring-3 {
          width: 402px; height: 112px; margin-top: -56px; margin-left: -201px;
          border-color: rgba(200,161,101,0.11);
          animation: ring-fwd 36s linear infinite;
        }
        @keyframes ring-fwd { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ring-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        .co-ring-badge {
          position: absolute; right: -2px; top: 50%; transform: translateY(-50%);
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: #C8A165; background: rgba(6,12,26,0.92);
          border: 1px solid rgba(200,161,101,0.32);
          padding: 0.28rem 0.58rem; border-radius: 100px; white-space: nowrap;
          backdrop-filter: blur(10px);
        }
        .co-ring-badge::before {
          content: ''; display: inline-block; width: 4px; height: 4px; border-radius: 50%;
          background: #C8A165; margin-right: 4px; vertical-align: middle;
          box-shadow: 0 0 5px #C8A165;
        }
        .co-hex-ring-1 .co-ring-badge { animation: badge-rev 15s linear infinite; }
        .co-hex-ring-2 .co-ring-badge { animation: badge-fwd 24s linear infinite; }
        .co-hex-ring-3 .co-ring-badge { animation: badge-rev 36s linear infinite; }
        @keyframes badge-rev { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(-360deg); } }
        @keyframes badge-fwd { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }

        /* Sections */
        .co-section     { padding: 6rem 1.5rem; background: #010A1F; }
        .co-section-alt { padding: 6rem 1.5rem; background: #020C1E; }
        .co-container   { max-width: 1120px; margin: 0 auto; }
        .co-label {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #C8A165; margin-bottom: 0.75rem;
        }
        .co-title {
          font-weight: 800; font-size: clamp(1.8rem, 3vw, 2.6rem); color: #f1f5f9;
          letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 1rem;
        }
        .co-title em { color: #C8A165; font-style: normal; }
        .co-desc { color: #7a8fa8; font-size: 1.05rem; line-height: 1.75; max-width: 560px; margin-bottom: 3rem; }

        /* Compliance 3-col */
        .co-compliance-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 900px) { .co-compliance-grid { grid-template-columns: 1fr; } }
        .co-compliance-card {
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.75rem; position: relative; overflow: hidden;
          transition: border-color 0.25s, background 0.25s;
        }
        .co-compliance-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #C8A165, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .co-compliance-card:hover { border-color: rgba(200,161,101,0.25); background: rgba(200,161,101,0.03); }
        .co-compliance-card:hover::after { opacity: 1; }
        .co-compliance-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .co-compliance-title { font-weight: 700; font-size: 1rem; color: #f1f5f9; margin-bottom: 0.5rem; }
        .co-compliance-desc { color: #7a8fa8; font-size: 0.875rem; line-height: 1.65; margin-bottom: 1rem; }
        .co-compliance-tag {
          display: inline-block; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: #6ee7b7; background: rgba(16,185,129,0.1);
          padding: 0.22rem 0.6rem; border-radius: 4px;
        }

        /* Data isolation */
        .co-isolation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 768px) { .co-isolation-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .co-isolation-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.875rem; }
        .co-isolation-list li {
          display: flex; align-items: center; gap: 0.75rem; color: #cbd5e1; font-size: 0.9rem;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px; padding: 0.75rem 1rem;
        }
        .co-isolation-list li span { font-size: 1.1rem; flex-shrink: 0; }
        .co-arch-visual {
          background: #0A1525; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 1.75rem; display: flex; flex-direction: column; gap: 0.6rem;
        }
        .co-arch-label-top {
          font-size: 0.65rem; color: #475569; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem;
        }
        .co-arch-layer {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);
        }
        .co-arch-layer-label { font-size: 0.8rem; font-weight: 500; color: #94a3b8; flex: 1; }
        .co-arch-layer-status {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.2rem 0.5rem; border-radius: 4px; background: rgba(16,185,129,0.12); color: #6ee7b7;
        }

        /* Vision */
        .co-vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 768px) { .co-vision-grid { grid-template-columns: 1fr; } }
        .co-vision-block {
          padding: 2rem; background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; transition: border-color 0.2s;
        }
        .co-vision-block:hover { border-color: rgba(200,161,101,0.2); }
        .co-vision-block h3 { font-weight: 700; font-size: 1.05rem; color: #f1f5f9; margin-bottom: 0.75rem; }
        .co-vision-block p { color: #7a8fa8; font-size: 0.9rem; line-height: 1.7; margin: 0; }

        /* CTA */
        .co-cta-section {
          padding: 7rem 1.5rem; text-align: center;
          background: linear-gradient(170deg, #020C1E 0%, #010A1F 100%);
          border-top: 1px solid rgba(200,161,101,0.1); position: relative; overflow: hidden;
        }
        .co-cta-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 50% 60% at 50% 100%, rgba(200,161,101,0.06) 0%, transparent 70%);
        }
        .co-cta-title {
          font-weight: 800; font-size: clamp(1.8rem, 3vw, 2.5rem); color: #f1f5f9;
          letter-spacing: -0.025em; margin-bottom: 1rem; position: relative;
        }
        .co-cta-sub { color: #7a8fa8; font-size: 1.05rem; margin-bottom: 2.5rem; position: relative; }
      `}</style>

      <div className="co-page">
        <div className="co-hero-bg" aria-hidden="true" />
        <GlobalHeader lang={lang} setLang={setLang} />

        {/* ── HERO ── */}
        <section style={{ position: 'relative', zIndex: 1 }}>
          <div className="co-hero">

            {/* Left: copy */}
            <div className="co-hero-text">
              <div className="co-badge"><span>⬡</span> PayAi-X FZE · Dubai, UAE</div>
              <h1 className="co-hero-title">
                Engineered for
                <em>absolute trust.</em>
              </h1>
              <p className="co-hero-sub">
                Security, compliance, and transparency are embedded at the core of our neural architecture.
              </p>
              <div className="co-cta-row">
                <a href="mailto:contact@payai-x.com?subject=Security Whitepaper Request" className="co-cta-primary">
                  Read our Security Whitepaper
                </a>
                <Link to="/trust-center" className="co-cta-secondary">Trust Center →</Link>
              </div>
            </div>

            {/* Right: 3D hex visual */}
            <div className="co-hero-visual" aria-hidden="true">
              <div className="co-scene-frame" />
              <div className="co-corner co-corner-tl" />
              <div className="co-corner co-corner-tr" />
              <div className="co-corner co-corner-bl" />
              <div className="co-corner co-corner-br" />
              <div className="co-scene-glow" />

              {/* Topographic ground grid */}
              <svg className="co-topo-svg" viewBox="0 0 420 160" fill="none">
                <ellipse cx="210" cy="155" rx="200" ry="48" stroke="rgba(200,161,101,0.09)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="155" ry="37" stroke="rgba(200,161,101,0.07)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="110" ry="26" stroke="rgba(200,161,101,0.06)" strokeWidth="0.5"/>
                <ellipse cx="210" cy="155" rx="68" ry="16" stroke="rgba(200,161,101,0.05)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="10" y2="107" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="410" y2="107" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="110" y2="107" stroke="rgba(200,161,101,0.03)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="310" y2="107" stroke="rgba(200,161,101,0.03)" strokeWidth="0.5"/>
                <line x1="210" y1="155" x2="210" y2="107" stroke="rgba(200,161,101,0.04)" strokeWidth="0.5"/>
              </svg>

              {/* Orbital compliance rings — each with a counter-rotating label */}
              <div className="co-hex-ring co-hex-ring-1">
                <span className="co-ring-badge">SOC2</span>
              </div>
              <div className="co-hex-ring co-hex-ring-2">
                <span className="co-ring-badge">GDPR</span>
              </div>
              <div className="co-hex-ring co-hex-ring-3">
                <span className="co-ring-badge">EU AI Act</span>
              </div>

              {/* 3D Hexagonal Prism
                  Pointy-top hex, R=72, center (105,185) in 210×275 viewBox.
                  Extrusion vector: dx=+15, dy=-22.
                  Front: 105,113  167,149  167,221  105,257  43,221  43,149
                  Top cap: 43,149  105,113  167,149  182,127  120,91  58,127
                  Right face: 167,149  167,221  182,199  182,127                */}
              <svg
                className="co-hex-svg"
                width="240"
                height="290"
                viewBox="0 0 210 275"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="hex-front-clip">
                    <polygon points="105,113 167,149 167,221 105,257 43,221 43,149" />
                  </clipPath>
                  <radialGradient id="hex-core-grad" cx="105" cy="185" r="58" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#C8A165" stopOpacity="0.48" />
                    <stop offset="45%" stopColor="#C8A165" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#C8A165" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="hex-top-grad" x1="0" y1="91" x2="0" y2="149" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1E2E44" />
                    <stop offset="100%" stopColor="#0D1620" />
                  </linearGradient>
                  <linearGradient id="hex-front-grad" x1="105" y1="113" x2="105" y2="257" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1A2840" />
                    <stop offset="35%" stopColor="#0E1828" />
                    <stop offset="100%" stopColor="#060E1A" />
                  </linearGradient>
                </defs>

                {/* Right shadow face */}
                <polygon
                  points="167,149 167,221 182,199 182,127"
                  fill="rgba(3,7,14,0.97)"
                  stroke="rgba(200,161,101,0.1)"
                  strokeWidth="0.5"
                />

                {/* Top cap — dramatic top-down light */}
                <polygon
                  points="43,149 105,113 167,149 182,127 120,91 58,127"
                  fill="url(#hex-top-grad)"
                  stroke="rgba(200,161,101,0.35)"
                  strokeWidth="0.6"
                />

                {/* Front face */}
                <polygon
                  points="105,113 167,149 167,221 105,257 43,221 43,149"
                  fill="url(#hex-front-grad)"
                  stroke="rgba(200,161,101,0.22)"
                  strokeWidth="0.7"
                />

                {/* Inner hex facet */}
                <polygon
                  points="105,142 142,163 142,207 105,228 68,207 68,163"
                  fill="none"
                  stroke="rgba(200,161,101,0.07)"
                  strokeWidth="0.5"
                />

                {/* Inner facet diagonals */}
                <line x1="105" y1="142" x2="105" y2="228" stroke="rgba(200,161,101,0.045)" strokeWidth="0.4" />
                <line x1="68" y1="163" x2="142" y2="207" stroke="rgba(200,161,101,0.035)" strokeWidth="0.4" />
                <line x1="142" y1="163" x2="68" y2="207" stroke="rgba(200,161,101,0.035)" strokeWidth="0.4" />

                {/* Core radial glow — pulsing */}
                <ellipse cx="105" cy="185" rx="48" ry="36" fill="url(#hex-core-grad)">
                  <animate attributeName="opacity" values="0.65;1;0.65" dur="3.5s" repeatCount="indefinite" />
                </ellipse>

                {/* Apex glow (top-down light hit) */}
                <ellipse cx="105" cy="118" rx="20" ry="11" fill="rgba(200,161,101,0.2)" />
                <ellipse cx="113" cy="108" rx="10" ry="6" fill="rgba(200,161,101,0.12)" />

                {/* Crypto texture — extremely faint */}
                <text x="58" y="162" fill="rgba(200,161,101,0.055)" fontSize="5" fontFamily="Courier New, monospace" letterSpacing="0.8" clipPath="url(#hex-front-clip)">SHA·256·HMAC·AES·256·GCM</text>
                <text x="58" y="177" fill="rgba(200,161,101,0.055)" fontSize="5" fontFamily="Courier New, monospace" letterSpacing="0.8" clipPath="url(#hex-front-clip)">TLS·1.3·GDPR·Art6·SOC2·II</text>
                <text x="58" y="192" fill="rgba(200,161,101,0.055)" fontSize="5" fontFamily="Courier New, monospace" letterSpacing="0.8" clipPath="url(#hex-front-clip)">EU·AI·ACT·RSA·4096·ECDH</text>
                <text x="58" y="207" fill="rgba(200,161,101,0.055)" fontSize="5" fontFamily="Courier New, monospace" letterSpacing="0.8" clipPath="url(#hex-front-clip)">0xC8A165·VERIFIED·TRUST</text>

                {/* Scan line — SVG native animate, clipped to hex shape */}
                <rect x="40" y="113" width="130" height="1.5" fill="rgba(200,161,101,0.65)" clipPath="url(#hex-front-clip)">
                  <animate attributeName="y" from="113" to="257" dur="4.5s" repeatCount="indefinite" calcMode="linear" />
                  <animate attributeName="opacity" values="0;0;0.85;0.85;0" keyTimes="0;0.06;0.14;0.88;1" dur="4.5s" repeatCount="indefinite" />
                </rect>

                {/* Status LEDs */}
                <circle cx="81" cy="132" r="2.2" fill="#10B981">
                  <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="89" cy="132" r="2.2" fill="#10B981">
                  <animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="0.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="97" cy="132" r="2.2" fill="#C8A165">
                  <animate attributeName="opacity" values="1;0.15;1" dur="5s" begin="1.2s" repeatCount="indefinite" />
                </circle>

                {/* Top edge highlight lines */}
                <line x1="43" y1="149" x2="105" y2="113" stroke="rgba(200,161,101,0.45)" strokeWidth="0.9" />
                <line x1="105" y1="113" x2="167" y2="149" stroke="rgba(200,161,101,0.32)" strokeWidth="0.8" />
                <line x1="105" y1="113" x2="120" y2="91" stroke="rgba(200,161,101,0.3)" strokeWidth="0.7" />
                <line x1="120" y1="91" x2="182" y2="127" stroke="rgba(200,161,101,0.22)" strokeWidth="0.5" />
                <line x1="58" y1="127" x2="120" y2="91" stroke="rgba(200,161,101,0.22)" strokeWidth="0.5" />
              </svg>
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

        {/* ── Absolute Data Isolation ── */}
        <section className="co-section">
          <div className="co-container">
            <div className="co-isolation-grid">
              <div>
                <div className="co-label">Data Architecture</div>
                <h2 className="co-title">Absolute Data<br /><em>Isolation.</em></h2>
                <p className="co-desc">
                  Each customer's knowledge base is stored in a private Qdrant vector cluster — fully isolated from all other tenants. Your data is never used to train public language models or shared with any third party.
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
                {ARCH_LAYERS.map((l) => (
                  <div key={l.label} className="co-arch-layer" style={{ background: l.bg }}>
                    <div className="co-arch-layer-label">{l.label}</div>
                    <div className="co-arch-layer-status">Active</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Backed by PayAi-X FZE ── */}
        <section className="co-section-alt">
          <div className="co-container">
            <div className="co-label">Our Story</div>
            <h2 className="co-title" style={{ marginBottom: '2.5rem' }}>
              Backed by<br /><em>PayAi-X FZE.</em>
            </h2>
            <div className="co-vision-grid">
              <div className="co-vision-block">
                <h3>The Zero-Click Era</h3>
                <p>
                  CatyAI was built for the moment AI answer engines replaced traditional search. Businesses became invisible overnight — no clicks, no discovery, no citations. GEO Gateway, NAP Protocol, and SENTINEL give every business a verified AI identity.
                </p>
              </div>
              <div className="co-vision-block">
                <h3>PayAi-X FZE</h3>
                <p>
                  CatyAI is a product of PayAi-X FZE, registered in the Dubai Silicon Oasis Free Zone (UAE). Our contracts and enterprise agreements operate under UAE commercial law with full GDPR compliance for all EU data subjects.
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
