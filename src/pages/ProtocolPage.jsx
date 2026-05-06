import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const NAP_STEPS = [
  {
    num: '01',
    title: 'Data Structuring',
    desc: 'We parse your existing website and business assets into standardized JSON-LD and Schema.org payloads — machine-readable formats that LLMs can ingest natively.',
    detail: 'llms.txt · JSON-LD · Schema.org',
  },
  {
    num: '02',
    title: 'Cryptographic Signing',
    desc: 'Every data payload is signed with Ed25519 asymmetric cryptography. AI crawlers can verify the authenticity of your business data before surfacing it to users.',
    detail: 'Ed25519 · X.509 · HTTPS pinning',
  },
  {
    num: '03',
    title: 'Continuous Vector Sync',
    desc: 'Changes to your pricing, services, or team propagate in real time to 9 major AI crawlers — GPT, Gemini, Claude, Perplexity, and more — within minutes.',
    detail: 'Real-time · 9 crawlers · <15 min TTL',
  },
]

const METRICS = [
  { value: '9', label: 'AI Crawlers Supported' },
  { value: '<15m', label: 'Sync Latency' },
  { value: 'Ed25519', label: 'Signing Algorithm' },
  { value: '99.97%', label: 'Uptime SLA' },
]

const INTEGRATIONS = [
  { lang: 'cURL', code: `curl -X POST https://api.catyai.io/v1/nap/sync \\
  -H "Authorization: Bearer {API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "yourbusiness.com",
    "schema": "LocalBusiness",
    "sync_targets": ["gpt", "gemini", "claude", "perplexity"]
  }'` },
]

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

  return (
    <>
      <SEO
        title="Neural Node Protocol — GEO Infrastructure | CatyAI"
        description="The NAP Protocol transforms your business data into cryptographically verified neural endpoints, native to GPT-4, Gemini, and Claude. Deploy your Neural Node today."
        canonical="https://catyai.io/protocol"
      />
      <style>{`
        .nn-page { background: #010A1F; color: #f1f5f9; font-family: 'Inter', sans-serif; }

        /* Hero */
        .nn-hero {
          min-height: 92vh;
          background: #010A1F;
          display: flex;
          align-items: center;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .nn-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 60% 10%, rgba(200,161,101,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(99,102,241,0.09) 0%, transparent 60%);
          pointer-events: none;
        }
        .nn-hero-inner {
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
        .nn-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.28);
          color: #C8A165;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.38rem 0.9rem;
          border-radius: 100px;
          margin-bottom: 1.8rem;
        }
        .nn-hero-title {
          font-weight: 800;
          font-size: clamp(2.6rem, 5.5vw, 5rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        .nn-hero-title span { color: #C8A165; }
        .nn-hero-sub {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #94a3b8;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .nn-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .nn-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .nn-cta-primary:hover { background: #D4B57A; }
        .nn-cta-secondary {
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
        .nn-cta-secondary:hover { border-color: #C8A165; background: rgba(200,161,101,0.06); }

        /* Neural visual */
        .nn-visual {
          position: relative;
          height: 460px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .nn-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,161,101,0.08) 0%, transparent 70%);
        }
        .nn-node-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
        }
        .nn-node-ring {
          width: 120px;
          height: 120px;
          border: 2px solid rgba(200,161,101,0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: nn-pulse 3s ease-in-out infinite;
        }
        .nn-node-ring::before {
          content: '';
          position: absolute;
          inset: -12px;
          border: 1px solid rgba(200,161,101,0.2);
          border-radius: 50%;
          animation: nn-pulse 3s ease-in-out infinite 0.5s;
        }
        .nn-node-ring::after {
          content: '';
          position: absolute;
          inset: -24px;
          border: 1px solid rgba(200,161,101,0.1);
          border-radius: 50%;
          animation: nn-pulse 3s ease-in-out infinite 1s;
        }
        @keyframes nn-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        .nn-node-icon {
          font-size: 2.5rem;
          line-height: 1;
        }
        .nn-node-label {
          font-family: 'monospace', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #64748b;
        }
        .nn-orbits {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .nn-orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C8A165;
          opacity: 0.7;
        }
        .nn-orbit-dot:nth-child(1) { top: 18%; left: 22%; animation: nn-float 4s ease-in-out infinite; }
        .nn-orbit-dot:nth-child(2) { top: 25%; right: 20%; animation: nn-float 4s ease-in-out infinite 1s; background: #6366f1; }
        .nn-orbit-dot:nth-child(3) { bottom: 22%; left: 18%; animation: nn-float 4s ease-in-out infinite 2s; }
        .nn-orbit-dot:nth-child(4) { bottom: 18%; right: 25%; animation: nn-float 4s ease-in-out infinite 1.5s; background: #6366f1; }
        .nn-orbit-dot:nth-child(5) { top: 50%; left: 8%; animation: nn-float 4s ease-in-out infinite 0.5s; opacity: 0.4; }
        .nn-orbit-dot:nth-child(6) { top: 45%; right: 8%; animation: nn-float 4s ease-in-out infinite 2.5s; opacity: 0.4; }
        @keyframes nn-float {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        .nn-visual-caption {
          position: absolute;
          bottom: 1.2rem;
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #334155;
        }

        /* Metrics bar */
        .nn-metrics {
          background: #030D26;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 3rem 1.5rem;
        }
        .nn-metrics-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .nn-metric-val {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #C8A165;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .nn-metric-label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* NAP Steps */
        .nn-section { background: #010A1F; padding: 7rem 1.5rem; }
        .nn-section-alt { background: #030D26; padding: 7rem 1.5rem; }
        .nn-container { max-width: 1200px; margin: 0 auto; }
        .nn-section-label {
          font-family: monospace;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 1rem;
        }
        .nn-section-title {
          font-weight: 800;
          font-size: clamp(2rem, 3.5vw, 3rem);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #f1f5f9;
          margin-bottom: 1.2rem;
        }
        .nn-section-sub {
          font-size: 1.05rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 560px;
          font-weight: 300;
          margin-bottom: 4rem;
        }
        .nn-steps { display: flex; flex-direction: column; gap: 2px; }
        .nn-step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 2.5rem;
          align-items: start;
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }
        .nn-step:last-child { border-bottom: none; }
        .nn-step-num {
          font-family: monospace;
          font-size: 3rem;
          font-weight: 800;
          color: rgba(200,161,101,0.18);
          line-height: 1;
          padding-top: 4px;
          transition: color 0.2s;
        }
        .nn-step:hover .nn-step-num { color: rgba(200,161,101,0.5); }
        .nn-step-body {}
        .nn-step-title {
          font-weight: 700;
          font-size: 1.25rem;
          color: #f1f5f9;
          margin-bottom: 0.6rem;
        }
        .nn-step-desc {
          font-size: 0.97rem;
          color: #94a3b8;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 0.8rem;
        }
        .nn-step-detail {
          font-family: monospace;
          font-size: 0.72rem;
          color: #C8A165;
          letter-spacing: 0.08em;
          opacity: 0.8;
        }

        /* API Section */
        .nn-api-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .nn-api-title {
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          letter-spacing: -0.025em;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }
        .nn-api-sub {
          font-size: 0.97rem;
          color: #94a3b8;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 2rem;
        }
        .nn-feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem; }
        .nn-feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: #cbd5e1;
        }
        .nn-feature-list li::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .nn-code-block {
          background: #020C1B;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
        }
        .nn-code-header {
          background: rgba(255,255,255,0.04);
          padding: 0.75rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nn-code-dot {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .nn-code-title {
          font-family: monospace;
          font-size: 0.72rem;
          color: #475569;
          margin-left: 0.5rem;
          letter-spacing: 0.08em;
        }
        .nn-code-body {
          padding: 1.5rem 1.4rem;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          line-height: 1.75;
          color: #94a3b8;
          white-space: pre;
          overflow-x: auto;
        }
        .nn-code-body .kw { color: #C8A165; }
        .nn-code-body .str { color: #86efac; }
        .nn-code-body .cm { color: #475569; }

        /* CTA */
        .nn-cta-section {
          background: linear-gradient(135deg, #030D26 0%, #010A1F 100%);
          border-top: 1px solid rgba(200,161,101,0.15);
          padding: 7rem 1.5rem;
          text-align: center;
        }
        .nn-cta-title {
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.2rem);
          letter-spacing: -0.025em;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }
        .nn-cta-sub {
          font-size: 1.1rem;
          color: #94a3b8;
          font-weight: 300;
          margin-bottom: 2.5rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }
        .nn-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* Responsive */
        @media (max-width: 900px) {
          .nn-hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .nn-visual { height: 300px; }
          .nn-metrics-inner { grid-template-columns: repeat(2, 1fr); }
          .nn-api-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .nn-step { grid-template-columns: 60px 1fr; gap: 1.5rem; }
        }
        @media (max-width: 480px) {
          .nn-metrics-inner { grid-template-columns: 1fr 1fr; }
          .nn-step { grid-template-columns: 1fr; gap: 0.5rem; }
          .nn-step-num { font-size: 2rem; }
        }
      `}</style>

      <div className="nn-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* Hero */}
        <section className="nn-hero">
          <div className="nn-hero-inner">
            <div>
              <div className="nn-badge">
                <span>⬡</span> Core Infrastructure v3.0
              </div>
              <h1 className="nn-hero-title">
                The Neural Node<br />
                <span>GEO Protocol.</span>
              </h1>
              <p className="nn-hero-sub">
                We transform static, unreadable HTML into cryptographically verified Neural Endpoints — making your business data native to GPT-4, Gemini, Claude, and every major LLM crawler.
              </p>
              <div className="nn-cta-row">
                <a href="https://app.catyai.io/register" className="nn-cta-primary">Deploy Neural Node</a>
                <Link to="/platform" className="nn-cta-secondary">View Platform Architecture →</Link>
              </div>
            </div>

            <div className="nn-visual">
              <div className="nn-orbits">
                <div className="nn-orbit-dot" />
                <div className="nn-orbit-dot" />
                <div className="nn-orbit-dot" />
                <div className="nn-orbit-dot" />
                <div className="nn-orbit-dot" />
                <div className="nn-orbit-dot" />
              </div>
              <div className="nn-node-center">
                <div className="nn-node-ring">
                  <span className="nn-node-icon">⬡</span>
                </div>
                <span className="nn-node-label">NAP Protocol v3.0</span>
              </div>
              <span className="nn-visual-caption">Neural Node — Data Flow Visualization</span>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <div className="nn-metrics">
          <div className="nn-metrics-inner">
            {METRICS.map((m) => (
              <div key={m.label}>
                <div className="nn-metric-val">{m.value}</div>
                <div className="nn-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NAP Steps */}
        <section className="nn-section">
          <div className="nn-container">
            <div className="nn-section-label">The Protocol</div>
            <h2 className="nn-section-title">Three Layers of<br />AI-Native Authority</h2>
            <p className="nn-section-sub">
              NAP Protocol is not a plugin. It's a foundational infrastructure layer that makes your business data verifiable, structured, and continuously synchronized with every major AI model.
            </p>
            <div className="nn-steps">
              {NAP_STEPS.map((s) => (
                <div className="nn-step" key={s.num}>
                  <div className="nn-step-num">{s.num}</div>
                  <div className="nn-step-body">
                    <div className="nn-step-title">{s.title}</div>
                    <div className="nn-step-desc">{s.desc}</div>
                    <div className="nn-step-detail">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Section */}
        <section className="nn-section-alt">
          <div className="nn-container">
            <div className="nn-api-grid">
              <div>
                <div className="nn-section-label">API & Integration</div>
                <h2 className="nn-api-title">One endpoint.<br />Total AI coverage.</h2>
                <p className="nn-api-sub">
                  A single REST call deploys your verified business identity across the full AI crawler ecosystem. No SDKs required, no complex configuration.
                </p>
                <ul className="nn-feature-list">
                  <li>REST API with OpenAPI 3.1 specification</li>
                  <li>Webhooks for sync status and crawl events</li>
                  <li>White-label deployment for agencies and partners</li>
                  <li>Enterprise SLA with dedicated support channel</li>
                  <li>Full audit log with cryptographic proof chain</li>
                </ul>
              </div>
              <div className="nn-code-block">
                <div className="nn-code-header">
                  <div className="nn-code-dot" style={{ background: '#ef4444' }} />
                  <div className="nn-code-dot" style={{ background: '#f59e0b' }} />
                  <div className="nn-code-dot" style={{ background: '#22c55e' }} />
                  <span className="nn-code-title">POST /v1/nap/sync</span>
                </div>
                <div className="nn-code-body">
{`<span class="cm"># Deploy your Neural Node</span>
<span class="kw">curl</span> -X POST \\
  https://api.catyai.io/v1/nap/sync \\
  -H <span class="str">"Authorization: Bearer {API_KEY}"</span> \\
  -H <span class="str">"Content-Type: application/json"</span> \\
  -d <span class="str">'{
    "domain": "yourbusiness.com",
    "schema": "LocalBusiness",
    "sync_targets": [
      "gpt", "gemini", "claude",
      "perplexity", "you"
    ]
  }'</span>`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="nn-cta-section">
          <div className="nn-section-label" style={{ marginBottom: '1.2rem' }}>Get Started</div>
          <h2 className="nn-cta-title">Your business,<br />native to every AI.</h2>
          <p className="nn-cta-sub">
            Join 3,000+ businesses already verified on the NAP Protocol. 14-day free trial, no credit card required.
          </p>
          <div className="nn-cta-btns">
            <a href="https://app.catyai.io/register" className="nn-cta-primary">Start Free Trial</a>
            <Link to="/contact" className="nn-cta-secondary">Talk to Sales →</Link>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
