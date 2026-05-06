import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const ROLES = [
  { dept: 'Engineering', title: 'Senior Full-Stack Engineer', location: 'Remote · EU timezone', type: 'Full-time' },
  { dept: 'Engineering', title: 'AI/ML Engineer — LLM Integrations', location: 'Remote · Global', type: 'Full-time' },
  { dept: 'Product', title: 'Product Manager — AI Infrastructure', location: 'Remote · EU timezone', type: 'Full-time' },
  { dept: 'GTM', title: 'Head of Partnerships', location: 'Dubai / Remote', type: 'Full-time' },
  { dept: 'GTM', title: 'Account Executive — EMEA', location: 'Remote · EMEA', type: 'Full-time' },
]

const VALUES = [
  { icon: '🌍', title: 'Remote-first', body: 'Async by default. Work from anywhere, ship what matters.' },
  { icon: '⚡', title: 'Move fast', body: 'We build, ship, and learn. Bureaucracy is the enemy of progress.' },
  { icon: '🔒', title: 'Trust over control', body: 'Radical ownership. You own your work end-to-end.' },
  { icon: '🤖', title: 'AI-native', body: 'We use AI in everything we build — and how we build it.' },
]

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers — Join CatyAI | Build the AI Visibility Layer"
        description="Join a remote-first team building the AI-to-AI communication infrastructure for the next decade. Open roles in engineering, product, and GTM."
        canonical="https://catyai.io/careers"
      />
      <style>{`
        .car-page { background: #010A1F; min-height: 100vh; }
        .car-hero {
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .car-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .car-badge {
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
        .car-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 6vw, 5rem);
          color: #f1f5f9;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .car-hero-title span { color: #C8A165; }
        .car-hero-sub {
          font-size: 1.125rem;
          color: #94a3b8;
          max-width: 540px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          position: relative;
        }
        .car-section {
          max-width: 860px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }
        .car-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .car-section-sub {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 2.5rem;
        }
        .car-values {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 5rem;
        }
        @media (max-width: 600px) { .car-values { grid-template-columns: 1fr; } }
        .car-value-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .car-value-icon { font-size: 1.75rem; margin-bottom: 0.75rem; }
        .car-value-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #f1f5f9;
          margin-bottom: 0.4rem;
        }
        .car-value-body { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; }
        .car-roles { display: flex; flex-direction: column; gap: 1rem; }
        .car-role {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          transition: border-color 0.2s;
          text-decoration: none;
        }
        .car-role:hover { border-color: rgba(200,161,101,0.3); }
        .car-role-dept {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.25rem;
        }
        .car-role-title { font-size: 1rem; font-weight: 600; color: #f1f5f9; }
        .car-role-meta { font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; }
        .car-role-badge {
          flex-shrink: 0;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.2);
          color: #C8A165;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
        }
        .car-open-note {
          margin-top: 2rem;
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
        }
        .car-open-note a { color: #C8A165; text-decoration: underline; }
        .car-cta-section {
          background: rgba(200,161,101,0.05);
          border-top: 1px solid rgba(200,161,101,0.12);
          padding: 5rem 1.5rem;
          text-align: center;
        }
        .car-cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          color: #f1f5f9;
          margin-bottom: 0.75rem;
        }
        .car-cta-sub {
          color: #94a3b8;
          margin-bottom: 2rem;
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 0;
        }
        .car-btn {
          display: inline-block;
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .car-btn:hover { opacity: 0.88; }
      `}</style>
      <div className="car-page">
        <GlobalHeader />
        <section className="car-hero">
          <div className="car-badge">We're Hiring</div>
          <h1 className="car-hero-title">Build the <span>AI Visibility</span><br />Layer for Every Business</h1>
          <p className="car-hero-sub">
            CatyAI is building the infrastructure that makes businesses visible to ChatGPT, Gemini, and Perplexity. Join a small, high-ownership team shipping at speed.
          </p>
        </section>

        <div className="car-section">
          <h2 className="car-section-title">How We Work</h2>
          <p className="car-section-sub">Four principles that define our team.</p>
          <div className="car-values">
            {VALUES.map((v) => (
              <div key={v.title} className="car-value-card">
                <div className="car-value-icon">{v.icon}</div>
                <div className="car-value-title">{v.title}</div>
                <div className="car-value-body">{v.body}</div>
              </div>
            ))}
          </div>

          <h2 className="car-section-title">Open Roles</h2>
          <p className="car-section-sub">All roles are remote. We move fast and give you real ownership.</p>
          <div className="car-roles">
            {ROLES.map((r) => (
              <a key={r.title} href="mailto:careers@payai-x.com?subject=Application" className="car-role">
                <div>
                  <div className="car-role-dept">{r.dept}</div>
                  <div className="car-role-title">{r.title}</div>
                  <div className="car-role-meta">{r.location}</div>
                </div>
                <div className="car-role-badge">{r.type}</div>
              </a>
            ))}
          </div>
          <p className="car-open-note">
            Don't see your role? <a href="mailto:careers@payai-x.com">Send a speculative application</a> — we review them all.
          </p>
        </div>

        <section className="car-cta-section">
          <h2 className="car-cta-title">Ready to Build with Us?</h2>
          <p className="car-cta-sub">Email your CV and a short note on what you'd build at CatyAI.</p>
          <a href="mailto:careers@payai-x.com" className="car-btn">Apply → careers@payai-x.com</a>
        </section>

        <FooterV9 />
      </div>
    </>
  )
}
