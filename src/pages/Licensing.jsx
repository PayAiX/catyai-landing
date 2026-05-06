import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const COMMUNITY_FEATURES = [
  'Use CatyAI for personal or research projects',
  'Modify source code',
  'Share improvements back (copyleft / viral clause)',
  'Community-level support',
]

const ENTERPRISE_FEATURES = [
  'Full commercial SaaS rights',
  'Proprietary modifications (no copyleft)',
  'Custom integrations & SLAs',
  '24/7 priority support',
  'White-label / OEM options',
  'No AGPL obligations',
]

const IP_ITEMS = [
  { title: 'AI Intent Detection Engine', desc: 'Proprietary algorithm for understanding visitor intent and buying signals' },
  { title: 'Lead Capture System', desc: 'Smart lead qualification and scoring methodology' },
  { title: 'Knowledge Base Training', desc: 'Custom AI fine-tuning for business-specific responses' },
  { title: 'Conversation Analytics', desc: 'Proprietary metrics for measuring engagement and conversion' },
  { title: 'Human Handoff Protocol', desc: 'Intelligent escalation system for seamless agent transfer' },
]

export default function Licensing() {
  return (
    <>
      <SEO
        title="Licensing — CatyAI Legal Information"
        description="CatyAI dual licensing: Community (AGPL-3.0) for research and personal use, Enterprise (Proprietary) for commercial SaaS, white-label, and OEM."
        canonical="https://catyai.io/licensing"
      />
      <style>{`
        .lic-page { background: #010A1F; min-height: 100vh; }
        .lic-hero {
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .lic-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .lic-badge {
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
          position: relative;
        }
        .lic-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          color: #f1f5f9;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .lic-hero-title span { color: #C8A165; }
        .lic-hero-sub {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
          position: relative;
        }
        .lic-body {
          max-width: 920px;
          margin: 0 auto;
          padding: 4rem 1.5rem 6rem;
        }
        .lic-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
        }
        .lic-section-sub { color: #64748b; font-size: 0.9rem; margin-bottom: 2rem; }
        .lic-company-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
          margin-bottom: 3rem;
        }
        .lic-company-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (max-width: 500px) { .lic-company-grid { grid-template-columns: 1fr; } }
        .lic-company-cell {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 0.85rem 1rem;
        }
        .lic-company-label { font-size: 0.75rem; color: #64748b; margin-bottom: 0.2rem; }
        .lic-company-value { font-size: 0.95rem; font-weight: 600; color: #f1f5f9; }
        .lic-company-value.gold { color: #C8A165; }
        .lic-tiers {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 640px) { .lic-tiers { grid-template-columns: 1fr; } }
        .lic-tier {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
        }
        .lic-tier.featured {
          border-color: rgba(200,161,101,0.4);
          background: rgba(200,161,101,0.04);
          position: relative;
        }
        .lic-tier-badge {
          position: absolute;
          top: -0.75rem;
          right: 1.25rem;
          background: #C8A165;
          color: #010A1F;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
        }
        .lic-tier-name {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }
        .lic-tier-meta { margin-bottom: 1.25rem; }
        .lic-tier-row { display: flex; gap: 0.5rem; margin-bottom: 0.35rem; font-size: 0.88rem; }
        .lic-tier-row span:first-child { color: #64748b; }
        .lic-tier-row span:last-child { color: #f1f5f9; font-weight: 500; }
        .lic-tier-row span.free { color: #86efac; font-weight: 700; }
        .lic-tier-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #C8A165;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          margin-bottom: 1.25rem;
        }
        .lic-tier-link:hover { opacity: 0.8; }
        .lic-feat-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .lic-feat-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .lic-feat-item { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.875rem; color: #94a3b8; }
        .lic-check { color: #86efac; flex-shrink: 0; margin-top: 0.1rem; }
        .lic-ip-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
          margin-bottom: 3rem;
        }
        .lic-ip-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.25rem; }
        .lic-ip-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 0.85rem 1rem;
        }
        .lic-ip-dot { width: 6px; height: 6px; background: #C8A165; border-radius: 50%; flex-shrink: 0; margin-top: 0.45rem; }
        .lic-ip-title { font-weight: 600; color: #f1f5f9; font-size: 0.9rem; }
        .lic-ip-desc { color: #64748b; font-size: 0.82rem; margin-top: 0.15rem; }
        .lic-cta-box {
          background: rgba(200,161,101,0.05);
          border: 1px solid rgba(200,161,101,0.15);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }
        .lic-cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }
        .lic-cta-sub { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem; }
        .lic-cta-btns { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .lic-btn-primary {
          display: inline-block;
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.875rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .lic-btn-primary:hover { opacity: 0.88; }
        .lic-btn-secondary {
          display: inline-block;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .lic-btn-secondary:hover { border-color: rgba(200,161,101,0.3); color: #f1f5f9; }
      `}</style>
      <div className="lic-page">
        <GlobalHeader />
        <section className="lic-hero">
          <div className="lic-badge">Legal Information</div>
          <h1 className="lic-hero-title">Licensing &amp; <span>Legal</span></h1>
          <p className="lic-hero-sub">
            Community edition for research and personal use. Enterprise licensing for commercial SaaS, white-label, and OEM.
          </p>
        </section>

        <div className="lic-body">
          <div className="lic-company-box">
            <h2 className="lic-section-title" style={{ marginBottom: '1.25rem' }}>Company Information</h2>
            <div className="lic-company-grid">
              <div className="lic-company-cell">
                <div className="lic-company-label">Company</div>
                <div className="lic-company-value">PayAi-X FZE</div>
              </div>
              <div className="lic-company-cell">
                <div className="lic-company-label">CEO</div>
                <div className="lic-company-value">Ioan Adrian Vitan</div>
              </div>
              <div className="lic-company-cell">
                <div className="lic-company-label">Product</div>
                <div className="lic-company-value">Caty.AI — AI Platform</div>
              </div>
              <div className="lic-company-cell">
                <div className="lic-company-label">Licensing Model</div>
                <div className="lic-company-value gold">Dual License</div>
              </div>
            </div>
          </div>

          <h2 className="lic-section-title">License Tiers</h2>
          <p className="lic-section-sub">Choose the license that fits your use case.</p>
          <div className="lic-tiers">
            <div className="lic-tier">
              <div className="lic-tier-name">Community</div>
              <div className="lic-tier-meta">
                <div className="lic-tier-row"><span>License:</span><span>AGPL-3.0-only</span></div>
                <div className="lic-tier-row"><span>Cost:</span><span className="free">FREE</span></div>
                <div className="lic-tier-row"><span>For:</span><span>Research, personal, non-commercial</span></div>
              </div>
              <Link to="/license-agpl" className="lic-tier-link">
                View Full License Text →
              </Link>
              <div className="lic-feat-label">Features</div>
              <ul className="lic-feat-list">
                {COMMUNITY_FEATURES.map(f => (
                  <li key={f} className="lic-feat-item">
                    <span className="lic-check">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lic-tier featured">
              <div className="lic-tier-badge">Most Popular</div>
              <div className="lic-tier-name">Enterprise</div>
              <div className="lic-tier-meta">
                <div className="lic-tier-row"><span>License:</span><span>Proprietary</span></div>
                <div className="lic-tier-row"><span>Cost:</span><span>Custom (multi-year)</span></div>
                <div className="lic-tier-row"><span>For:</span><span>Commercial SaaS, white-label, OEM</span></div>
              </div>
              <a href="mailto:legal@payai-x.com" className="lic-tier-link">
                Contact: legal@payai-x.com →
              </a>
              <div className="lic-feat-label">Features</div>
              <ul className="lic-feat-list">
                {ENTERPRISE_FEATURES.map(f => (
                  <li key={f} className="lic-feat-item">
                    <span className="lic-check">✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lic-ip-box">
            <h2 className="lic-section-title">Protected Intellectual Property</h2>
            <div className="lic-ip-list">
              {IP_ITEMS.map(ip => (
                <div key={ip.title} className="lic-ip-item">
                  <div className="lic-ip-dot" />
                  <div>
                    <div className="lic-ip-title">{ip.title}</div>
                    <div className="lic-ip-desc">{ip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lic-cta-box">
            <div className="lic-cta-title">Questions About Licensing?</div>
            <p className="lic-cta-sub">Contact our legal team for enterprise agreements, custom SLAs, or any licensing inquiries.</p>
            <div className="lic-cta-btns">
              <a href="mailto:legal@payai-x.com" className="lic-btn-primary">legal@payai-x.com</a>
              <a href="mailto:enterprise@payai-x.com" className="lic-btn-secondary">Enterprise Sales</a>
            </div>
          </div>
        </div>

        <FooterV9 />
      </div>
    </>
  )
}
