import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const TOOL_CATEGORIES = [
  {
    icon: '🔐',
    title: 'Trust & Visibility',
    count: 8,
    tools: 'caty_geo_answer · caty_nap_verify · caty_zero_trust_verify · caty_knowledge_json · caty_llms_txt · caty_jwks · caty_ai_visibility · caty_tso_build',
    desc: 'Cryptographic data signing, EdDSA verification, and AI crawler discovery. The only MCP with Zero-Trust commerce.',
  },
  {
    icon: '🛒',
    title: 'E-commerce & Fraud',
    count: 10,
    tools: 'caty_order_shield · caty_fraud_dna · caty_catalog_rebuild · caty_intent_detect · caty_render_product_cards · caty_get_order_status · caty_create_gomag_order · caty_check_availability · caty_request_callback · caty_liquid_ui',
    desc: 'COD fraud scoring unique to CEE/MENA markets. Real-time catalog enrichment and order management.',
  },
  {
    icon: '🧠',
    title: 'Semantic & Semiotic',
    count: 10,
    tools: 'caty_semantic_enrich · caty_auto_keywords · caty_semantic_signal · caty_industry_schema · caty_market_intel_report · caty_competitor_alert · caty_kb_reindex · caty_kb_learn · caty_crawl_trigger · caty_auto_brain',
    desc: '15-layer DeepSeek enrichment, semiotic market signals, and autonomous knowledge base management.',
  },
  {
    icon: '⚡',
    title: 'Ahauros SAG Agents',
    count: 11,
    tools: 'caty_ahauros_pricing · caty_ahauros_forecast · caty_ahauros_fraud · caty_ahauros_supplier · caty_ahauros_profit · caty_ahauros_courier · caty_ahauros_neuromarketing · caty_ahauros_growth · caty_ahauros_mentor · caty_ahauros_cee_certify · caty_ahauros_health',
    desc: 'Deterministic SAG agents for pricing, logistics, and business intelligence. Zero LLM calls — zero hallucinations.',
  },
]

const PLANS = [
  {
    id: 'mcp_agency',
    name: 'Agency',
    price: '€299',
    period: '/month',
    highlight: false,
    features: [
      '50,000 calls/month',
      'All 45 tools',
      'Claude Desktop + Claude Code',
      'Email support',
    ],
    cta: 'Start Agency',
    href: 'https://app.catyai.io/mcp/checkout?plan=mcp_agency',
  },
  {
    id: 'mcp_studio',
    name: 'Studio',
    price: '€599',
    period: '/month',
    highlight: true,
    features: [
      '200,000 calls/month',
      'All 45 tools',
      'Priority support',
      'Usage analytics',
    ],
    cta: 'Start Studio',
    href: 'https://app.catyai.io/mcp/checkout?plan=mcp_studio',
  },
  {
    id: 'mcp_enterprise',
    name: 'Enterprise',
    price: '€1,499',
    period: '/month',
    highlight: false,
    features: [
      'Unlimited calls',
      'All 45 tools',
      'SLA 99.9%',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    href: 'mailto:contact@catyai.io',
  },
]

const STEPS = [
  { num: '01', title: 'Subscribe', desc: 'Choose your plan and get your API key instantly.' },
  { num: '02', title: 'Add config', desc: 'Paste the JSON snippet into claude_desktop_config.json.' },
  { num: '03', title: 'Use 45 tools', desc: 'Claude has access to all production tools immediately.' },
]

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "catyai": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://api.catyai.io/api/mcp"
      ],
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}`

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CatyAI MCP Server',
  description: 'Extend Claude Desktop and Claude Code with 45 production tools: fraud detection, Zero-Trust commerce, semantic enrichment, and market intelligence.',
  url: 'https://catyai.io/mcp',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  offers: [
    { '@type': 'Offer', price: '299', priceCurrency: 'EUR', name: 'Agency' },
    { '@type': 'Offer', price: '599', priceCurrency: 'EUR', name: 'Studio' },
    { '@type': 'Offer', price: '1499', priceCurrency: 'EUR', name: 'Enterprise' },
  ],
  provider: {
    '@type': 'Organization',
    name: 'PayAi-X FZE',
    url: 'https://catyai.io',
  },
}

export default function McpPage() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)

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

  function handleCopy() {
    navigator.clipboard.writeText(CONFIG_SNIPPET).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <SEO
        title="CatyAI MCP Server — 45 AI Commerce Tools for Claude"
        description="Extend Claude Desktop and Claude Code with 45 production tools: fraud detection, Zero-Trust commerce, semantic enrichment, and market intelligence. Official Anthropic partner. From €299/month."
        canonical="https://catyai.io/mcp"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(SOFTWARE_SCHEMA)}</script>
      </Helmet>
      <style>{`
        .mcp-page { background: #010A1F; color: #f1f5f9; font-family: 'Inter', sans-serif; }

        /* Hero */
        .mcp-hero {
          min-height: 92vh;
          background: #010A1F;
          display: flex;
          align-items: center;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .mcp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 65% 5%, rgba(99,102,241,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(200,161,101,0.09) 0%, transparent 60%);
          pointer-events: none;
        }
        .mcp-hero-inner {
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

        /* Badges */
        .mcp-badge-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.8rem; }
        .mcp-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.28);
          color: #818cf8;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
        }
        .mcp-badge-gold {
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.28);
          color: #C8A165;
        }

        .mcp-hero-title {
          font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        .mcp-hero-title span { color: #818cf8; }
        .mcp-hero-sub {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #94a3b8;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .mcp-hero-note {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 1.2rem;
          font-weight: 400;
        }
        .mcp-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .mcp-cta-primary {
          background: #818cf8;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mcp-cta-primary:hover { background: #a5b4fc; }
        .mcp-cta-secondary {
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
        .mcp-cta-secondary:hover { border-color: #818cf8; background: rgba(99,102,241,0.06); }

        /* Code block */
        .mcp-code-block {
          background: #020C1B;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
        }
        .mcp-code-header {
          background: rgba(255,255,255,0.04);
          padding: 0.75rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mcp-code-dots { display: flex; gap: 0.4rem; }
        .mcp-code-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mcp-code-title {
          font-family: monospace;
          font-size: 0.72rem;
          color: #475569;
          letter-spacing: 0.08em;
        }
        .mcp-copy-btn {
          background: rgba(129,140,248,0.12);
          border: 1px solid rgba(129,140,248,0.25);
          color: #818cf8;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.04em;
        }
        .mcp-copy-btn:hover { background: rgba(129,140,248,0.22); }
        .mcp-code-body {
          padding: 1.5rem 1.4rem;
          font-family: 'Courier New', monospace;
          font-size: 0.78rem;
          line-height: 1.8;
          color: #94a3b8;
          white-space: pre;
          overflow-x: auto;
        }

        /* Tools Grid */
        .mcp-tools {
          padding: 6rem 1.5rem;
          background: #010A1F;
        }
        .mcp-section-inner { max-width: 1200px; margin: 0 auto; }
        .mcp-section-title {
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.025em;
          color: #f1f5f9;
          margin-bottom: 0.75rem;
        }
        .mcp-section-sub {
          font-size: 1rem;
          color: #64748b;
          margin-bottom: 3.5rem;
          font-weight: 300;
        }
        .mcp-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .mcp-category-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.8rem;
        }
        .mcp-category-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .mcp-category-icon { font-size: 1.3rem; }
        .mcp-category-name {
          font-weight: 700;
          font-size: 1rem;
          color: #e2e8f0;
        }
        .mcp-category-count {
          margin-left: auto;
          font-size: 0.72rem;
          color: #475569;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .mcp-category-tools {
          font-family: 'Courier New', monospace;
          font-size: 0.72rem;
          color: #818cf8;
          line-height: 1.8;
          margin-bottom: 1rem;
          word-break: break-word;
        }
        .mcp-category-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.6;
          font-weight: 300;
        }

        /* How It Works */
        .mcp-how {
          padding: 6rem 1.5rem;
          background: #030D26;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .mcp-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-top: 3.5rem;
        }
        .mcp-step {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mcp-step-num {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: rgba(129,140,248,0.18);
          line-height: 1;
        }
        .mcp-step-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #e2e8f0;
        }
        .mcp-step-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.65;
          font-weight: 300;
        }

        /* Pricing */
        .mcp-pricing {
          padding: 6rem 1.5rem;
          background: #010A1F;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .mcp-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3.5rem;
        }
        .mcp-plan {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          transition: border-color 0.2s;
        }
        .mcp-plan:hover { border-color: rgba(129,140,248,0.25); }
        .mcp-plan-popular {
          border-color: rgba(129,140,248,0.35);
          background: rgba(99,102,241,0.06);
        }
        .mcp-popular-badge {
          position: absolute;
          top: -0.7rem;
          left: 50%;
          transform: translateX(-50%);
          background: #818cf8;
          color: #010A1F;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.2rem 0.9rem;
          border-radius: 100px;
          white-space: nowrap;
        }
        .mcp-plan-name {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .mcp-plan-price {
          font-weight: 800;
          font-size: 2.4rem;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          line-height: 1;
        }
        .mcp-plan-period {
          font-size: 0.85rem;
          color: #475569;
          font-weight: 400;
          margin-left: 0.2rem;
        }
        .mcp-plan-features {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .mcp-plan-features li {
          font-size: 0.88rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mcp-plan-features li::before {
          content: '✓';
          color: #818cf8;
          font-weight: 700;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .mcp-plan-cta {
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mcp-plan-cta-primary {
          background: #818cf8;
          color: #010A1F;
        }
        .mcp-plan-cta-primary:hover { background: #a5b4fc; }
        .mcp-plan-cta-outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #f1f5f9;
        }
        .mcp-plan-cta-outline:hover { border-color: #818cf8; background: rgba(99,102,241,0.06); }

        /* Live Status */
        .mcp-status {
          padding: 4rem 1.5rem;
          background: #030D26;
          border-top: 1px solid rgba(99,102,241,0.12);
          text-align: center;
        }
        .mcp-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #4ade80;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.55rem 1.2rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mcp-live-badge:hover { background: rgba(34,197,94,0.14); }
        .mcp-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: mcpPulse 1.8s ease-in-out infinite;
        }
        @keyframes mcpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .mcp-status-meta {
          font-size: 0.85rem;
          color: #475569;
          font-family: monospace;
          letter-spacing: 0.04em;
        }

        /* Footer Trust */
        .mcp-trust {
          padding: 4rem 1.5rem 2rem;
          background: #010A1F;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .mcp-trust-text {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .mcp-categories-grid { grid-template-columns: 1fr; }
          .mcp-pricing-grid { grid-template-columns: 1fr; max-width: 420px; }
          .mcp-steps { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 900px) {
          .mcp-hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .mcp-pricing-grid { max-width: 100%; grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .mcp-pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="mcp-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* Hero */}
        <section className="mcp-hero">
          <div className="mcp-hero-inner">
            <div>
              <div className="mcp-badge-row">
                <span className="mcp-badge">MCP Server</span>
                <span className="mcp-badge">45 Tools</span>
                <span className="mcp-badge mcp-badge-gold">Production Ready</span>
              </div>
              <h1 className="mcp-hero-title">
                Add 45 AI Commerce Tools<br />
                <span>to Claude in 60 seconds.</span>
              </h1>
              <p className="mcp-hero-sub">
                CatyAI MCP extends Claude Desktop and Claude Code with fraud detection, semantic enrichment, Zero-Trust commerce, and real-time market intelligence. Built for agencies and developers. Ready for production.
              </p>
              <div className="mcp-cta-row">
                <a href="https://app.catyai.io/mcp/checkout?plan=mcp_agency" className="mcp-cta-primary">
                  Subscribe — from €299/month
                </a>
                <a
                  href="https://api.catyai.io/.well-known/ai-context"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mcp-cta-secondary"
                >
                  View Live Endpoint ↗
                </a>
              </div>
              <p className="mcp-hero-note">
                Works with Claude Desktop · Claude Code · Any MCP client
              </p>
            </div>

            {/* Code block */}
            <div className="mcp-code-block">
              <div className="mcp-code-header">
                <div className="mcp-code-dots">
                  <div className="mcp-code-dot" style={{ background: '#ef4444' }} />
                  <div className="mcp-code-dot" style={{ background: '#f59e0b' }} />
                  <div className="mcp-code-dot" style={{ background: '#22c55e' }} />
                </div>
                <span className="mcp-code-title">claude_desktop_config.json</span>
                <button className="mcp-copy-btn" onClick={handleCopy} type="button">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="mcp-code-body">{CONFIG_SNIPPET}</div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="mcp-tools">
          <div className="mcp-section-inner">
            <h2 className="mcp-section-title">45 Tools. 4 Categories.</h2>
            <p className="mcp-section-sub">Production-ready tools for Trust, Commerce, Intelligence, and Autonomy.</p>
            <div className="mcp-categories-grid">
              {TOOL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="mcp-category-card">
                  <div className="mcp-category-header">
                    <span className="mcp-category-icon">{cat.icon}</span>
                    <span className="mcp-category-name">{cat.title}</span>
                    <span className="mcp-category-count">{cat.count} tools</span>
                  </div>
                  <div className="mcp-category-tools">{cat.tools}</div>
                  <div className="mcp-category-desc">{cat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mcp-how">
          <div className="mcp-section-inner">
            <h2 className="mcp-section-title">Up and running in 3 steps.</h2>
            <p className="mcp-section-sub">No local server, no Docker, no configuration overhead.</p>
            <div className="mcp-steps">
              {STEPS.map((step) => (
                <div key={step.num} className="mcp-step">
                  <div className="mcp-step-num">{step.num}</div>
                  <div className="mcp-step-title">{step.title}</div>
                  <div className="mcp-step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mcp-pricing">
          <div className="mcp-section-inner">
            <h2 className="mcp-section-title">Simple Pricing. Serious Tools.</h2>
            <p className="mcp-section-sub">All plans include every tool. No hidden fees.</p>
            <div className="mcp-pricing-grid">
              {PLANS.map((plan) => (
                <div key={plan.id} className={`mcp-plan${plan.highlight ? ' mcp-plan-popular' : ''}`}>
                  {plan.highlight && <span className="mcp-popular-badge">Most Popular</span>}
                  <div className="mcp-plan-name">{plan.name}</div>
                  <div>
                    <span className="mcp-plan-price">{plan.price}</span>
                    <span className="mcp-plan-period">{plan.period}</span>
                  </div>
                  <ul className="mcp-plan-features">
                    {plan.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <a
                    href={plan.href}
                    className={`mcp-plan-cta ${plan.highlight ? 'mcp-plan-cta-primary' : 'mcp-plan-cta-outline'}`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Status */}
        <section className="mcp-status">
          <a
            href="https://api.catyai.io/api/mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="mcp-live-badge"
          >
            <span className="mcp-live-dot" />
            Live · api.catyai.io/api/mcp
          </a>
          <div className="mcp-status-meta">
            45 tools active · NAP V3 · EdDSA signed · EU AI Act compliant
          </div>
        </section>

        {/* Footer Trust */}
        <section className="mcp-trust">
          <p className="mcp-trust-text">
            Built with Anthropic technology · NAP V3 Protocol · EU AI Act compliant · PayAi-X FZE
          </p>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
