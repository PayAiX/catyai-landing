import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

export default function PlatformPage() {
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
        title="Platform — The GEO Architecture | CatyAI"
        description="CatyAI's three-layer infrastructure: NAP Protocol for verified business data, AI-native geographic routing, and real-time fraud detection. Built for enterprise scale."
        canonical="https://catyai.io/platform"
      />
      <style>{`
        .plat-hero {
          min-height: 90vh;
          background: #010A1F;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .plat-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,161,101,0.12) 0%, transparent 70%),
                      radial-gradient(ellipse 50% 40% at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .plat-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.12);
          border: 1px solid rgba(200,161,101,0.3);
          color: #C8A165;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .plat-hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          text-transform: none;
          margin-bottom: 1.5rem;
          max-width: 900px;
        }
        .plat-hero-title span {
          color: #C8A165;
          display: block;
        }
        .plat-hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          color: #94a3b8;
          max-width: 660px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .plat-cta-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .plat-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .plat-cta-primary:hover { background: #D4B57A; }
        .plat-cta-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .plat-cta-secondary:hover { border-color: #C8A165; background: rgba(200,161,101,0.06); }

        /* NAP Section */
        .plat-section {
          background: #010A1F;
          padding: 6rem 1.5rem;
        }
        .plat-section-alt {
          background: #030D26;
          padding: 6rem 1.5rem;
        }
        .plat-container {
          max-width: 1120px;
          margin: 0 auto;
        }
        .plat-section-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.75rem;
        }
        .plat-section-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: #f1f5f9;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
          text-transform: none;
        }
        .plat-section-title em {
          color: #C8A165;
          font-style: normal;
        }
        .plat-section-desc {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 600px;
          margin-bottom: 3.5rem;
        }
        .plat-nap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .plat-nap-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .plat-nap-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C8A165, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .plat-nap-card:hover { border-color: rgba(200,161,101,0.25); background: rgba(200,161,101,0.04); }
        .plat-nap-card:hover::before { opacity: 1; }
        .plat-nap-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(200,161,101,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
        }
        .plat-nap-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }
        .plat-nap-desc {
          color: #94a3b8;
          font-size: 0.93rem;
          line-height: 1.65;
        }
        .plat-nap-tag {
          display: inline-block;
          margin-top: 1rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8A165;
          background: rgba(200,161,101,0.1);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }

        /* API Section */
        .plat-api-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .plat-api-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        .plat-code-block {
          background: #0D1A2D;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.82rem;
          line-height: 1.7;
          color: #94a3b8;
          overflow-x: auto;
        }
        .plat-code-block .k { color: #C8A165; }
        .plat-code-block .s { color: #86efac; }
        .plat-code-block .c { color: #64748b; }
        .plat-code-block .n { color: #93c5fd; }
        .plat-feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .plat-feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: #cbd5e1;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .plat-feature-list li::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        /* FraudAI Section */
        .plat-fraud-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-top: 3rem;
        }
        .plat-fraud-stat {
          text-align: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1.75rem 1.25rem;
        }
        .plat-fraud-stat .num {
          font-size: 2.5rem;
          font-weight: 800;
          color: #C8A165;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .plat-fraud-stat .label {
          color: #94a3b8;
          font-size: 0.88rem;
        }

        /* CTA Section */
        .plat-cta-section {
          background: linear-gradient(135deg, #030D26 0%, #010A1F 100%);
          padding: 6rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(200,161,101,0.12);
        }
        .plat-cta-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
          text-transform: none;
        }
        .plat-cta-sub {
          color: #94a3b8;
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
        }
      `}</style>

      <GlobalHeader lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="plat-hero">
        <div className="plat-badge">
          <span>⬡</span> Infrastructure Layer
        </div>
        <h1 className="plat-hero-title">
          The GEO Architecture
          <span>Built for AI-First Business</span>
        </h1>
        <p className="plat-hero-sub">
          Three interconnected layers — NAP Protocol, GEO Gateway, and FraudAI Shield — form the infrastructure that makes your business verifiable, visible, and protected across every AI engine.
        </p>
        <div className="plat-cta-row">
          <a href="https://app.catyai.io/register" className="plat-cta-primary">Start Building</a>
          <a href="/geo-gateway" className="plat-cta-secondary">See GEO Gateway →</a>
        </div>
      </section>

      {/* NAP Protocol */}
      <section className="plat-section-alt">
        <div className="plat-container">
          <div className="plat-section-label">NAP Protocol v2.0</div>
          <h2 className="plat-section-title">Data Structuring. Signing. <em>Continuous Sync.</em></h2>
          <p className="plat-section-desc">
            NAP Protocol transforms raw business data into cryptographically signed, AI-readable truth — consumed by every major LLM crawler in real time.
          </p>
          <div className="plat-nap-grid">
            <div className="plat-nap-card">
              <div className="plat-nap-icon">🗂️</div>
              <div className="plat-nap-title">Data Structuring</div>
              <p className="plat-nap-desc">
                NAP (Name, Address, Phone) data is parsed from your existing CRM, website, and third-party sources into a canonical JSON-LD schema. Every field normalized, every conflict resolved automatically.
              </p>
              <span className="plat-nap-tag">JSON-LD / Schema.org</span>
            </div>
            <div className="plat-nap-card">
              <div className="plat-nap-icon">🔐</div>
              <div className="plat-nap-title">Cryptographic Signing</div>
              <p className="plat-nap-desc">
                Each NAP record is signed with an Ed25519 key anchored to your verified domain. LLMs and AI engines that support verifiable credentials can independently confirm data authenticity without calling our API.
              </p>
              <span className="plat-nap-tag">Ed25519 · Verifiable Credentials</span>
            </div>
            <div className="plat-nap-card">
              <div className="plat-nap-icon">🔄</div>
              <div className="plat-nap-title">Continuous Sync</div>
              <p className="plat-nap-desc">
                Changes to your hours, locations, or services propagate to 9 AI crawler endpoints within minutes — not weeks. No manual submissions. No stale data in ChatGPT or Perplexity answers.
              </p>
              <span className="plat-nap-tag">Real-time · 9 AI Crawlers</span>
            </div>
          </div>
        </div>
      </section>

      {/* API & Integrations */}
      <section className="plat-section">
        <div className="plat-container">
          <div className="plat-api-grid">
            <div>
              <div className="plat-section-label">API & Integrations</div>
              <h2 className="plat-section-title">Every system.<br /><em>One truth layer.</em></h2>
              <p className="plat-section-desc">
                Connect CatyAI to your CRM, POS, e-commerce platform, or booking system. The platform continuously reads from your source of truth and pushes verified data to AI endpoints.
              </p>
              <ul className="plat-feature-list">
                <li>REST & webhook integrations — connect any stack in under 10 minutes</li>
                <li>Native connectors for Shopify, HubSpot, Salesforce, and Google Business</li>
                <li>Zapier & Make automations for no-code workflows</li>
                <li>GraphQL endpoint for custom enterprise data pipelines</li>
                <li>SLA-backed uptime with 99.9% API availability guarantee</li>
              </ul>
            </div>
            <div className="plat-code-block">
              <pre>{`<span class="c">// POST /v1/nap/sync</span>
{
  <span class="k">"business_id"</span>: <span class="s">"biz_4x8f..."</span>,
  <span class="k">"nap"</span>: {
    <span class="k">"name"</span>:    <span class="s">"Acme Clinic SRL"</span>,
    <span class="k">"address"</span>: <span class="s">"Str. Victoriei 12"</span>,
    <span class="k">"phone"</span>:   <span class="s">"+40 21 300 0000"</span>
  },
  <span class="k">"hours"</span>: { <span class="k">"mon-fri"</span>: <span class="s">"08:00-20:00"</span> },
  <span class="k">"push_to"</span>: [
    <span class="s">"gptbot"</span>, <span class="s">"claudebot"</span>,
    <span class="s">"perplexitybot"</span>, <span class="s">"gemini"</span>
  ]
}

<span class="c">// Response</span>
{
  <span class="k">"status"</span>: <span class="s">"synced"</span>,
  <span class="k">"crawlers_notified"</span>: <span class="n">9</span>,
  <span class="k">"signature"</span>: <span class="s">"ed25519:a3f9..."</span>,
  <span class="k">"propagation_eta_ms"</span>: <span class="n">340</span>
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* FraudAI Shield */}
      <section className="plat-section-alt">
        <div className="plat-container" style={{ textAlign: 'center' }}>
          <div className="plat-section-label">FraudAI Shield</div>
          <h2 className="plat-section-title" style={{ margin: '0 auto 1rem' }}>
            Anti-Phishing. Anti-Impersonation. <em>Always On.</em>
          </h2>
          <p className="plat-section-desc" style={{ margin: '0 auto 0' }}>
            AI-generated phishing attacks are doubling every quarter. FraudAI Shield monitors brand impersonation, fake business listings, and AI-synthesized fraud in real time.
          </p>
          <div className="plat-fraud-grid">
            {[
              { num: '99.3%', label: 'Fraud detection accuracy' },
              { num: '<120ms', label: 'Average threat response time' },
              { num: '14+', label: 'Phishing vector categories monitored' },
              { num: '24/7', label: 'Always-on threat intelligence' },
            ].map((s) => (
              <div key={s.label} className="plat-fraud-stat">
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/fraud-shield" className="plat-cta-secondary" style={{ display: 'inline-block' }}>
              Explore FraudAI Shield →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="plat-cta-section">
        <div className="plat-section-label">Get Started</div>
        <h2 className="plat-cta-title">Explore the Documentation</h2>
        <p className="plat-cta-sub">Full API reference, integration guides, and architecture diagrams.</p>
        <div className="plat-cta-row">
          <a href="https://docs.catyai.io" target="_blank" rel="noopener noreferrer" className="plat-cta-primary">
            Open Documentation
          </a>
          <a href="https://app.catyai.io/register" className="plat-cta-secondary">Start Free Trial</a>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </>
  )
}
