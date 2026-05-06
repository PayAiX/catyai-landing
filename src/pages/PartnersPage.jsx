import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const PARTNER_TIERS = [
  {
    name: 'Reseller',
    icon: '🤝',
    margin: '20%',
    desc: 'Resell CatyAI subscriptions to your clients under your agency brand. Access co-marketing materials, sales training, and dedicated partner support.',
    features: [
      '20% recurring revenue share',
      'Co-branded sales materials',
      'Partner portal & dashboard',
      'Quarterly business reviews',
    ],
  },
  {
    name: 'White-Label',
    icon: '🏷️',
    margin: '35%',
    desc: 'Deploy the full CatyAI platform under your own brand. Custom domain, custom UI, your logo — powered by our infrastructure.',
    features: [
      '35% recurring revenue share',
      'Custom domain & branding',
      'Full white-label client dashboard',
      'Dedicated onboarding engineer',
      'Priority SLA support',
    ],
    highlighted: true,
  },
  {
    name: 'Technology Partner',
    icon: '🔌',
    margin: 'Custom',
    desc: 'Build native integrations into CatyAI\'s API and list your product in our marketplace. Reach 3,000+ active CatyAI businesses.',
    features: [
      'API sandbox & developer docs',
      'Marketplace listing & promotion',
      'Joint go-to-market programs',
      'Technical integration support',
    ],
  },
]

export default function PartnersPage() {
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
        title="Partner Program — White-Label & Reseller | CatyAI"
        description="Own the GEO standard in your market. White-label CatyAI for your agency, resell AI infrastructure, or build native integrations through our Technology Partner program."
        canonical="https://catyai.io/partners"
      />
      <style>{`
        .par-hero {
          min-height: 85vh;
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
        .par-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.1) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 35% at 90% 60%, rgba(16,185,129,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .par-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          color: #6ee7b7;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .par-hero-title {
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
        .par-hero-title em { color: #C8A165; font-style: normal; }
        .par-hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: #94a3b8;
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .par-cta-row {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .par-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .par-cta-primary:hover { background: #D4B57A; }
        .par-cta-secondary {
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
        .par-cta-secondary:hover { border-color: #C8A165; }

        .par-section { background: #010A1F; padding: 6rem 1.5rem; }
        .par-section-alt { background: #030D26; padding: 6rem 1.5rem; }
        .par-container { max-width: 1120px; margin: 0 auto; }
        .par-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.75rem;
        }
        .par-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 1rem;
          text-transform: none;
        }
        .par-title em { color: #C8A165; font-style: normal; }
        .par-desc {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 3rem;
        }

        /* Tier Cards */
        .par-tiers {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          align-items: start;
        }
        .par-tier-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          transition: border-color 0.2s;
        }
        .par-tier-card.highlighted {
          background: rgba(200,161,101,0.06);
          border-color: rgba(200,161,101,0.3);
        }
        .par-tier-card:hover { border-color: rgba(200,161,101,0.2); }
        .par-tier-card.highlighted:hover { border-color: rgba(200,161,101,0.5); }
        .par-tier-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #C8A165;
          color: #010A1F;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          white-space: nowrap;
        }
        .par-tier-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .par-tier-name {
          font-weight: 800;
          font-size: 1.2rem;
          color: #f1f5f9;
          margin-bottom: 0.25rem;
        }
        .par-tier-margin {
          font-size: 2rem;
          font-weight: 800;
          color: #C8A165;
          margin-bottom: 0.5rem;
          line-height: 1;
        }
        .par-tier-margin-label {
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .par-tier-desc {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .par-tier-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .par-tier-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: #cbd5e1;
          font-size: 0.88rem;
        }
        .par-tier-features li::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* Multi-Tenant Engine */
        .par-engine-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) { .par-engine-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .par-engine-visual {
          background: #0D1A2D;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .par-engine-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        .par-engine-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .par-engine-client { font-size: 0.88rem; color: #f1f5f9; font-weight: 600; flex: 1; }
        .par-engine-status {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .par-engine-status.active { background: rgba(16,185,129,0.15); color: #6ee7b7; }
        .par-engine-status.syncing { background: rgba(200,161,101,0.15); color: #C8A165; }
        .par-revenue-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 2rem;
        }
        .par-revenue-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 1.25rem;
          text-align: center;
        }
        .par-revenue-num {
          font-weight: 800;
          font-size: 1.6rem;
          color: #C8A165;
          margin-bottom: 0.3rem;
        }
        .par-revenue-label { font-size: 0.8rem; color: #94a3b8; }

        .par-cta-section {
          background: linear-gradient(135deg, #030D26 0%, #010A1F 100%);
          padding: 6rem 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(200,161,101,0.12);
        }
        .par-cta-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
          text-transform: none;
        }
        .par-cta-sub { color: #94a3b8; font-size: 1.05rem; margin-bottom: 2.5rem; }
      `}</style>

      <GlobalHeader lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="par-hero">
        <div className="par-badge">
          <span>◆</span> Partner Program
        </div>
        <h1 className="par-hero-title">
          Own the GEO standard<br />
          <em>in your market.</em>
        </h1>
        <p className="par-hero-sub">
          White-label the full CatyAI platform, build on our API, or resell to your clients. Three partner tracks. One infrastructure stack. Your brand on top.
        </p>
        <div className="par-cta-row">
          <a href="https://app.catyai.io/partner-apply" className="par-cta-primary">Apply for Partner Program</a>
          <a href="#tiers" className="par-cta-secondary">See Partner Tiers →</a>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="par-section-alt" id="tiers">
        <div className="par-container">
          <div className="par-label">Partner Tracks</div>
          <h2 className="par-title">Three ways to grow<br /><em>with CatyAI.</em></h2>
          <p className="par-desc">Choose the track that matches your business model. All tiers include access to our partner portal, training resources, and dedicated support.</p>
          <div className="par-tiers">
            {PARTNER_TIERS.map((tier) => (
              <div key={tier.name} className={`par-tier-card${tier.highlighted ? ' highlighted' : ''}`}>
                {tier.highlighted && <div className="par-tier-badge">Most Popular</div>}
                <div className="par-tier-icon">{tier.icon}</div>
                <div className="par-tier-name">{tier.name}</div>
                <div className="par-tier-margin">{tier.margin}</div>
                <div className="par-tier-margin-label">revenue share</div>
                <p className="par-tier-desc">{tier.desc}</p>
                <ul className="par-tier-features">
                  {tier.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Tenant Engine */}
      <section className="par-section">
        <div className="par-container">
          <div className="par-engine-grid">
            <div>
              <div className="par-label">Multi-Tenant Engine</div>
              <h2 className="par-title">Manage all your clients<br /><em>from one dashboard.</em></h2>
              <p className="par-desc">
                The White-Label partner dashboard gives you full visibility and control across every client account — NAP sync status, AI visibility scores, fraud alerts, and billing — in a single pane of glass.
              </p>
              <div className="par-revenue-grid">
                <div className="par-revenue-card">
                  <div className="par-revenue-num">3,000+</div>
                  <div className="par-revenue-label">Active businesses on platform</div>
                </div>
                <div className="par-revenue-card">
                  <div className="par-revenue-num">35%</div>
                  <div className="par-revenue-label">White-label revenue share</div>
                </div>
                <div className="par-revenue-card">
                  <div className="par-revenue-num">9</div>
                  <div className="par-revenue-label">AI crawlers covered</div>
                </div>
                <div className="par-revenue-card">
                  <div className="par-revenue-num">24/7</div>
                  <div className="par-revenue-label">Partner support SLA</div>
                </div>
              </div>
            </div>
            <div className="par-engine-visual">
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Partner Dashboard · Live
              </div>
              {[
                { name: 'ClinicSoft SRL', status: 'active', color: '#6ee7b7' },
                { name: 'BoutiqueX Agency', status: 'active', color: '#6ee7b7' },
                { name: 'MedCenter Cluj', status: 'syncing', color: '#C8A165' },
                { name: 'AutoDealer Pro', status: 'active', color: '#6ee7b7' },
                { name: 'RetailMax EU', status: 'active', color: '#6ee7b7' },
              ].map((client) => (
                <div key={client.name} className="par-engine-row">
                  <div className="par-engine-dot" style={{ background: client.color }} />
                  <div className="par-engine-client">{client.name}</div>
                  <div className={`par-engine-status ${client.status}`}>{client.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="par-cta-section">
        <div className="par-label">Join the Network</div>
        <h2 className="par-cta-title">Apply for Partner Program</h2>
        <p className="par-cta-sub">Applications reviewed within 2 business days. Onboarding call included for all accepted partners.</p>
        <div className="par-cta-row">
          <a href="https://app.catyai.io/partner-apply" className="par-cta-primary">Apply Now</a>
          <a href="mailto:partners@catyai.io" className="par-cta-secondary">Contact Partnership Team</a>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </>
  )
}
