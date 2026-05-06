import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const TIERS = [
  {
    name: 'Growth',
    price: '$99',
    period: '/month',
    desc: 'The complete GEO stack for growing businesses. Everything you need to become visible to AI engines.',
    badge: null,
    highlighted: false,
    features: [
      '5,000 AI sessions/month',
      'GEO Gateway — full 6-layer stack',
      'NAP Protocol v2.0',
      'FraudAI Shield',
      'WhatsApp AI integration',
      '3 website widgets',
      'Knowledge base (50 documents)',
      'API access',
      'Priority email support',
    ],
    cta: 'Start Growth',
    ctaLink: 'https://app.catyai.io/register?plan=growth',
    external: true,
  },
  {
    name: 'Agency',
    price: '$499',
    period: '/month',
    desc: 'Multi-tenant infrastructure for agencies managing AI visibility for multiple client businesses.',
    badge: 'Most Popular',
    highlighted: true,
    features: [
      'Unlimited AI sessions',
      'Up to 25 client accounts',
      'White-label dashboard option',
      'Full GEO Gateway suite',
      'NAP Protocol v2.0 + multi-location',
      'FraudAI Shield + SENTINEL',
      'WhatsApp + omnichannel',
      'Unlimited widgets',
      'Unlimited knowledge base',
      'SSO / SAML',
      'Dedicated onboarding call',
      'SLA-backed support',
    ],
    cta: 'Start Agency',
    ctaLink: 'https://app.catyai.io/register?plan=agency',
    external: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    desc: 'Dedicated infrastructure, custom compliance requirements, and a named account manager for large organizations.',
    badge: null,
    highlighted: false,
    features: [
      'Dedicated VPC / data residency',
      'Unlimited client accounts',
      'Full white-label deployment',
      'Custom AI model fine-tuning',
      'SOC2 / GDPR compliance docs',
      'EU AI Act alignment review',
      'Custom API & integrations',
      'SLA with financial penalties',
      'Named account manager',
      'Quarterly business reviews',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact?plan=enterprise',
    external: false,
  },
]

const FAQS = [
  {
    q: 'Can I change plans at any time?',
    a: 'Yes. Upgrades take effect immediately with prorated billing. Downgrades apply at the start of your next billing cycle. No lock-in contracts on Growth or Agency.',
  },
  {
    q: 'What happens when I reach the session limit?',
    a: 'You\'ll receive an email notification at 80% usage. If you hit the limit, AI responses pause until the next billing cycle. You can upgrade at any time to restore service immediately.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. All plans include a 14-day free trial. No credit card required to start. Growth and Agency trials include the full feature set.',
  },
  {
    q: 'What is a "session"?',
    a: 'One session equals one complete conversation with a user — from first message to conversation close or 30 minutes of inactivity, whichever comes first. Background API calls for NAP sync and GEO crawling do not consume sessions.',
  },
  {
    q: 'Do you offer annual billing discounts?',
    a: 'Yes. Annual billing saves 20% on Growth and Agency plans. Enterprise agreements are negotiated separately and typically include multi-year pricing with custom terms.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'CatyAI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: [
        { '@type': 'Offer', name: 'Growth', price: '99', priceCurrency: 'USD', description: 'Complete GEO stack for growing businesses' },
        { '@type': 'Offer', name: 'Agency', price: '499', priceCurrency: 'USD', description: 'Multi-tenant AI infrastructure for agencies' },
        { '@type': 'Offer', name: 'Enterprise', price: '0', priceCurrency: 'USD', description: 'Dedicated infrastructure for large organizations' },
      ],
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
        title="Pricing — Growth $99 · Agency $499 · Enterprise | CatyAI"
        description="Simple, transparent pricing for AI infrastructure. Growth $99/month, Agency $499/month, Enterprise custom. 14-day free trial. No credit card required."
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

        /* Tiers */
        .pri-tiers-section { padding: 0 1.5rem 6rem; }
        .pri-tiers-grid {
          max-width: 1060px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .pri-tiers-grid { grid-template-columns: 1fr; max-width: 480px; }
        }
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
          <div className="pri-badge">💎 Simple, Transparent Pricing</div>
          <h1 className="pri-hero-title">Plans that grow<br />with your business.</h1>
          <p className="pri-hero-sub">
            One stack. Three plans. Full GEO infrastructure, NAP Protocol, and FraudAI Shield included in every tier.
          </p>
          <p className="pri-trial-note"><span>14-day free trial</span> · No credit card required · Cancel anytime</p>
        </section>

        {/* Tiers */}
        <section className="pri-tiers-section">
          <div className="pri-tiers-grid">
            {TIERS.map((tier) => (
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
            All plans include GEO Gateway, NAP Protocol v2.0, and FraudAI Shield.&nbsp;
            <a href="https://docs.catyai.io/pricing" target="_blank" rel="noopener noreferrer">Full feature comparison →</a>
          </p>
        </section>

        {/* FAQ */}
        <section className="pri-faq-section">
          <div className="pri-faq-container">
            <h2 className="pri-faq-title">Frequently Asked Questions</h2>
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
          <h2 className="pri-cta-title">Ready to get started?</h2>
          <p className="pri-cta-sub">Start your 14-day free trial. No credit card required.</p>
          <div className="pri-cta-row">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="pri-cta-btn-a"
            >
              Start Free Trial
            </a>
            <Link to="/contact" className="pri-cta-btn-b">Talk to Sales</Link>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
