import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const INDUSTRIES = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: '🏥',
    headline: 'GDPR-compliant AI for clinics & hospitals',
    body: 'CatyAI structures your clinic\'s NAP data, services, and availability into verified AI-readable records. Patients asking ChatGPT or Perplexity for specialists in your area get directed to you — with accurate hours, verified credentials, and GDPR-compliant data handling throughout.',
    highlights: [
      'GDPR Article 9 compliant data handling',
      'Verified practitioner credentials in AI answers',
      'Appointment availability synced to LLM crawlers',
      'Multi-location clinic NAP management',
    ],
    metric: { num: '+34%', label: 'LLM visibility uplift for healthcare clients' },
  },
  {
    id: 'enterprise',
    label: 'Enterprise SaaS',
    icon: '🏢',
    headline: 'SOC2-ready AI infrastructure at scale',
    body: 'Deploy CatyAI across your entire product suite with enterprise-grade controls: SSO, audit logs, role-based access, and dedicated infrastructure. Your AI visibility strategy operates under your compliance framework — not around it.',
    highlights: [
      'SOC 2 Type II certified infrastructure',
      'SSO via Okta, Azure AD, or Google Workspace',
      'Full audit trail for every data operation',
      'Dedicated VPC deployment option',
    ],
    metric: { num: '-60%', label: 'L1 support cost reduction via AI deflection' },
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: '🛍️',
    headline: 'AI-powered storefront visibility',
    body: 'When shoppers ask AI engines "where can I buy X near me?" or "best price for Y", your store appears — with real-time inventory, verified pricing, and customer review data injected into AI-readable schema. Convert AI queries into transactions.',
    highlights: [
      'Real-time product catalog sync to AI crawlers',
      'Verified pricing & availability in AI answers',
      'Abandoned cart recovery via WhatsApp AI',
      'Multi-marketplace NAP consistency',
    ],
    metric: { num: '100%', label: 'Verified data accuracy across all AI engines' },
  },
]

const CASE_STUDIES = [
  {
    metric: '+34%',
    desc: 'LLM Visibility',
    detail: 'Healthcare clinic chain gained 34% more AI-referred patient inquiries in 90 days after deploying NAP Protocol.',
    tag: 'Healthcare',
  },
  {
    metric: '-60%',
    desc: 'L1 Support Costs',
    detail: 'Enterprise SaaS company reduced tier-1 support volume by 60% using CatyAI\'s AI deflection layer.',
    tag: 'Enterprise',
  },
  {
    metric: '100%',
    desc: 'Verified Data Accuracy',
    detail: 'E-commerce retailer achieved zero NAP inconsistencies across 9 AI crawlers after 30 days of continuous sync.',
    tag: 'E-commerce',
  },
]

export default function SolutionsPage() {
  const [lang, setLang] = useState('en')
  const [activeTab, setActiveTab] = useState('healthcare')

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  const active = INDUSTRIES.find((i) => i.id === activeTab)

  return (
    <>
      <SEO
        title="Solutions — Built for Your Industry | CatyAI"
        description="AI infrastructure tailored for Healthcare, Enterprise SaaS, and E-commerce. GDPR-compliant, SOC2-ready, and built for scale."
        canonical="https://catyai.io/solutions"
      />
      <style>{`
        .sol-hero {
          min-height: 80vh;
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
        .sol-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 10%, rgba(99,102,241,0.1) 0%, transparent 65%),
                      radial-gradient(ellipse 40% 40% at 80% 70%, rgba(200,161,101,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .sol-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .sol-hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(2.6rem, 5.5vw, 5rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          text-transform: none;
          margin-bottom: 1.5rem;
          max-width: 860px;
        }
        .sol-hero-title em {
          color: #C8A165;
          font-style: normal;
        }
        .sol-hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: #94a3b8;
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .sol-cta-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .sol-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .sol-cta-primary:hover { background: #D4B57A; }
        .sol-cta-secondary {
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
        .sol-cta-secondary:hover { border-color: #C8A165; }

        .sol-section {
          background: #010A1F;
          padding: 6rem 1.5rem;
        }
        .sol-section-alt {
          background: #030D26;
          padding: 6rem 1.5rem;
        }
        .sol-container {
          max-width: 1120px;
          margin: 0 auto;
        }
        .sol-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.75rem;
        }
        .sol-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 1rem;
          text-transform: none;
        }
        .sol-title em { color: #C8A165; font-style: normal; }
        .sol-desc {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 3rem;
        }

        /* Industry Tabs */
        .sol-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .sol-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #94a3b8;
          transition: all 0.2s;
        }
        .sol-tab:hover { border-color: rgba(200,161,101,0.3); color: #f1f5f9; }
        .sol-tab.active {
          background: rgba(200,161,101,0.12);
          border-color: #C8A165;
          color: #C8A165;
        }
        .sol-industry-panel {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .sol-industry-panel { grid-template-columns: 1fr; }
        }
        .sol-industry-headline {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.35rem;
          color: #f1f5f9;
          margin-bottom: 0.85rem;
          text-transform: none;
        }
        .sol-industry-body {
          color: #94a3b8;
          font-size: 0.97rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .sol-industry-highlights {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .sol-industry-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          color: #cbd5e1;
          font-size: 0.92rem;
        }
        .sol-industry-highlights li::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
          flex-shrink: 0;
        }
        .sol-metric-card {
          background: rgba(200,161,101,0.06);
          border: 1px solid rgba(200,161,101,0.2);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
        }
        .sol-metric-num {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 3.5rem;
          color: #C8A165;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .sol-metric-label {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Case Studies */
        .sol-case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .sol-case-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.2s;
        }
        .sol-case-card:hover { border-color: rgba(200,161,101,0.2); }
        .sol-case-metric {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 3rem;
          color: #C8A165;
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        .sol-case-desc {
          font-weight: 700;
          color: #f1f5f9;
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        .sol-case-detail {
          color: #94a3b8;
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .sol-case-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8A165;
          background: rgba(200,161,101,0.1);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }

        .sol-cta-section {
          background: linear-gradient(135deg, #030D26 0%, #010A1F 100%);
          padding: 6rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(200,161,101,0.12);
        }
        .sol-cta-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
          text-transform: none;
        }
        .sol-cta-sub {
          color: #94a3b8;
          font-size: 1.05rem;
          margin-bottom: 2.5rem;
        }
      `}</style>

      <GlobalHeader lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="sol-hero">
        <div className="sol-badge">
          <span>◈</span> Industry Solutions
        </div>
        <h1 className="sol-hero-title">
          Built for scale.<br />
          <em>Adapted for your industry.</em>
        </h1>
        <p className="sol-hero-sub">
          CatyAI deploys the same GEO infrastructure with industry-specific compliance, data models, and integrations — so Healthcare, Enterprise SaaS, and E-commerce each get exactly what they need.
        </p>
        <div className="sol-cta-row">
          <a href="https://app.catyai.io/register" className="sol-cta-primary">Start Free Trial</a>
          <a href="#industries" className="sol-cta-secondary">Explore Industries →</a>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="sol-section-alt" id="industries">
        <div className="sol-container">
          <div className="sol-label">Industry Solutions</div>
          <h2 className="sol-title">The right infrastructure<br /><em>for your sector.</em></h2>
          <p className="sol-desc">Select your industry to see how CatyAI's platform adapts to your compliance requirements, data model, and growth objectives.</p>

          <div className="sol-tabs">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                className={`sol-tab${activeTab === ind.id ? ' active' : ''}`}
                onClick={() => setActiveTab(ind.id)}
              >
                <span>{ind.icon}</span> {ind.label}
              </button>
            ))}
          </div>

          {active && (
            <div className="sol-industry-panel">
              <div>
                <h3 className="sol-industry-headline">{active.headline}</h3>
                <p className="sol-industry-body">{active.body}</p>
                <ul className="sol-industry-highlights">
                  {active.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
              <div className="sol-metric-card">
                <div className="sol-metric-num">{active.metric.num}</div>
                <div className="sol-metric-label">{active.metric.label}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies */}
      <section className="sol-section">
        <div className="sol-container" style={{ textAlign: 'center' }}>
          <div className="sol-label">Proven Results</div>
          <h2 className="sol-title" style={{ margin: '0 auto 0.5rem' }}>
            Real numbers from<br /><em>real deployments.</em>
          </h2>
          <p className="sol-desc" style={{ margin: '0 auto 0' }}>
            Every metric below comes from a live CatyAI deployment measured over a minimum 90-day window.
          </p>
          <div className="sol-case-grid">
            {CASE_STUDIES.map((c) => (
              <div key={c.metric} className="sol-case-card" style={{ textAlign: 'left' }}>
                <div className="sol-case-metric">{c.metric}</div>
                <div className="sol-case-desc">{c.desc}</div>
                <p className="sol-case-detail">{c.detail}</p>
                <span className="sol-case-tag">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sol-cta-section">
        <div className="sol-label">Ready to scale?</div>
        <h2 className="sol-cta-title">Speak to a Solutions Architect</h2>
        <p className="sol-cta-sub">We'll map the right configuration for your industry, compliance requirements, and growth targets.</p>
        <div className="sol-cta-row">
          <a href="https://app.catyai.io/register" className="sol-cta-primary">Book a Call</a>
          <Link to="/pricing" className="sol-cta-secondary">View Pricing</Link>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </>
  )
}
