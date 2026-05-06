import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const COMPLIANCE = [
  {
    badge: 'SOC2 Type II',
    title: 'Security Operations',
    desc: 'Annual third-party audit covering availability, confidentiality, and processing integrity. Full controls report available under NDA.',
    status: 'Certified Architecture',
    icon: '🛡',
  },
  {
    badge: 'GDPR',
    title: 'EU Data Residency',
    desc: 'All EU client data processed and stored exclusively in Frankfurt, DE. DPA agreements available. Right to erasure enforced at infrastructure level.',
    status: 'EU Residency Guaranteed',
    icon: '🇪🇺',
  },
  {
    badge: 'EU AI Act',
    title: 'Article 52 Compliant',
    desc: 'Transparency obligations met for all AI-generated outputs. Human oversight mechanisms active. Risk classification documented for each AI system.',
    status: 'Article 52 Compliant',
    icon: '⚖',
  },
  {
    badge: 'ISO 27001',
    title: 'Information Security',
    desc: 'Information Security Management System aligned with ISO/IEC 27001:2022. Continuous risk assessment with quarterly penetration testing.',
    status: 'Aligned & Audited',
    icon: '🔒',
  },
]

const ISOLATION = [
  { icon: '⬡', title: 'Private Vector Clusters', desc: 'Dedicated Qdrant instance per Enterprise client — zero cross-tenant data access, guaranteed.' },
  { icon: '🔑', title: 'Customer-Managed Keys', desc: 'Bring your own KMS (AWS KMS, GCP CMEK, Azure Key Vault). We never hold your encryption keys.' },
  { icon: '🌐', title: 'VPC-Isolated Deployment', desc: 'Optional private network deployment with no public internet egress for data processing pipelines.' },
  { icon: '📋', title: 'Full Audit Trail', desc: 'Immutable, cryptographically signed logs of all data access, modifications, and AI sync events.' },
  { icon: '🚫', title: 'No LLM Training', desc: 'Your proprietary data is never used to train public or shared AI models. Zero-retention policy enforced.' },
  { icon: '⚡', title: 'Sub-100ms Latency', desc: 'Private cluster topology eliminates shared-resource contention. P99 latency guaranteed under SLA.' },
]

const STACK = [
  { label: 'TLS 1.3 + HSTS', color: 'rgba(200,161,101,0.15)', border: 'rgba(200,161,101,0.3)' },
  { label: 'WAF + DDoS Protection', color: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)' },
  { label: 'Zero-Trust Network (BeyondCorp)', color: 'rgba(200,161,101,0.08)', border: 'rgba(200,161,101,0.2)' },
  { label: 'AES-256 Encryption at Rest', color: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.18)' },
  { label: 'Ed25519 Payload Signing', color: 'rgba(200,161,101,0.06)', border: 'rgba(200,161,101,0.15)' },
  { label: 'Private Qdrant Vector Store', color: 'rgba(99,102,241,0.05)', border: 'rgba(99,102,241,0.12)' },
]

const FAQS = [
  {
    q: 'Where is my data stored?',
    a: 'EU clients: Frankfurt, Germany (AWS eu-central-1). US clients: Virginia, USA (AWS us-east-1). Data never leaves the designated region without explicit client authorization.',
  },
  {
    q: 'Is my business data used to train AI models?',
    a: 'Never. Your proprietary data — business information, pricing, services, customer interactions — is processed exclusively within your private infrastructure and is never shared with any third-party model training pipeline.',
  },
  {
    q: 'How do I request a security review or penetration test report?',
    a: 'Enterprise clients receive our latest pen test executive summary under NDA. Contact your account manager or email security@catyai.io to request access.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Upon account termination, all data is purged from active systems within 24 hours and from all backups within 30 days. A cryptographic deletion certificate is issued upon request.',
  },
]

export default function TrustCenter() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

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
        title="Trust Center — Security & Compliance | CatyAI"
        description="Enterprise-grade security is not an add-on. SOC2 Type II, GDPR, EU AI Act Article 52, ISO 27001 — CatyAI's complete security and compliance documentation."
        canonical="https://catyai.io/trust-center"
      />
      <style>{`
        .tc-page { background: #010A1F; color: #f1f5f9; font-family: 'Inter', sans-serif; }

        /* Hero */
        .tc-hero {
          min-height: 85vh;
          background: #010A1F;
          display: flex;
          align-items: center;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .tc-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 30% 35% at 90% 70%, rgba(99,102,241,0.07) 0%, transparent 55%);
          pointer-events: none;
        }
        .tc-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .tc-badge {
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
          margin-bottom: 2rem;
        }
        .tc-hero-title {
          font-weight: 800;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        .tc-hero-title span {
          background: linear-gradient(90deg, #e2e8f0 0%, #64748b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tc-hero-sub {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #94a3b8;
          line-height: 1.75;
          max-width: 640px;
          margin: 0 auto 3rem;
          font-weight: 300;
        }

        /* Vault visual */
        .tc-vault {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          height: 220px;
          border: 1px solid rgba(255,255,255,0.07);
          border-bottom: none;
          border-radius: 3rem 3rem 0 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          overflow: hidden;
        }
        .tc-vault::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,161,101,0.07) 0%, transparent 70%);
        }
        .tc-vault-ring {
          position: relative;
          z-index: 1;
          width: 80px;
          height: 80px;
          border: 2px solid rgba(200,161,101,0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: tc-pulse 2.8s ease-in-out infinite;
        }
        .tc-vault-ring::before {
          content: '';
          position: absolute;
          inset: -10px;
          border: 1px solid rgba(200,161,101,0.2);
          border-radius: 50%;
        }
        @keyframes tc-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,161,101,0); }
          50% { box-shadow: 0 0 0 12px rgba(200,161,101,0.08); }
        }
        .tc-vault-icon { font-size: 1.8rem; line-height: 1; position: relative; z-index: 1; }
        .tc-vault-label {
          position: relative;
          z-index: 1;
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #334155;
        }

        /* Compliance Grid */
        .tc-section { background: #010A1F; padding: 7rem 1.5rem; }
        .tc-section-alt { background: #030D26; padding: 7rem 1.5rem; }
        .tc-container { max-width: 1200px; margin: 0 auto; }
        .tc-section-label {
          font-family: monospace;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 1rem;
        }
        .tc-section-title {
          font-weight: 800;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }
        .tc-section-sub {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 520px;
          font-weight: 300;
          margin-bottom: 4rem;
        }
        .tc-compliance-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          overflow: hidden;
        }
        .tc-compliance-card {
          background: #010A1F;
          padding: 2.5rem;
          transition: background 0.2s;
        }
        .tc-compliance-card:hover { background: #030D26; }
        .tc-compliance-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }
        .tc-compliance-icon { font-size: 1.6rem; line-height: 1; }
        .tc-compliance-badge {
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8A165;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.2);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }
        .tc-compliance-title {
          font-weight: 700;
          font-size: 1.15rem;
          color: #f1f5f9;
          margin-bottom: 0.6rem;
        }
        .tc-compliance-desc {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.65;
          font-weight: 300;
          margin-bottom: 1rem;
        }
        .tc-compliance-status {
          font-family: monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #22c55e;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .tc-compliance-status::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
        }

        /* Isolation Grid */
        .tc-isolation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .tc-isolation-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 2rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .tc-isolation-card:hover {
          border-color: rgba(200,161,101,0.3);
          background: rgba(200,161,101,0.03);
        }
        .tc-isolation-icon { font-size: 1.5rem; margin-bottom: 1rem; line-height: 1; }
        .tc-isolation-title {
          font-weight: 700;
          font-size: 1rem;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }
        .tc-isolation-desc {
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.65;
          font-weight: 300;
        }

        /* Stack Visual */
        .tc-stack {
          display: flex;
          flex-direction: column;
          gap: 3px;
          max-width: 600px;
          margin: 0 auto;
        }
        .tc-stack-layer {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: #cbd5e1;
          border: 1px solid;
          text-align: center;
          transition: opacity 0.2s;
        }
        .tc-stack-label {
          text-align: center;
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #334155;
          margin-bottom: 1.5rem;
        }

        /* FAQ */
        .tc-faqs { display: flex; flex-direction: column; gap: 1px; }
        .tc-faq {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 4px;
        }
        .tc-faq-q {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.3rem 1.5rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.97rem;
          color: #f1f5f9;
          gap: 1rem;
          user-select: none;
        }
        .tc-faq-q:hover { color: #C8A165; }
        .tc-faq-icon {
          font-size: 1.2rem;
          color: #C8A165;
          flex-shrink: 0;
          font-weight: 300;
          line-height: 1;
          transition: transform 0.2s;
        }
        .tc-faq-icon.open { transform: rotate(45deg); }
        .tc-faq-a {
          padding: 0 1.5rem 1.3rem;
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.7;
          font-weight: 300;
        }

        /* CTA */
        .tc-cta-section {
          background: linear-gradient(135deg, #030D26 0%, #010A1F 100%);
          border-top: 1px solid rgba(200,161,101,0.15);
          padding: 7rem 1.5rem;
          text-align: center;
        }
        .tc-cta-title {
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -0.025em;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }
        .tc-cta-sub {
          font-size: 1.05rem;
          color: #94a3b8;
          font-weight: 300;
          max-width: 480px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }
        .tc-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .tc-cta-primary {
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .tc-cta-primary:hover { background: #D4B57A; }
        .tc-cta-secondary {
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
        .tc-cta-secondary:hover { border-color: #C8A165; background: rgba(200,161,101,0.06); }

        /* Responsive */
        @media (max-width: 900px) {
          .tc-compliance-grid { grid-template-columns: 1fr; }
          .tc-isolation-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .tc-isolation-grid { grid-template-columns: 1fr; }
          .tc-vault { height: 180px; }
        }
      `}</style>

      <div className="tc-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* Hero */}
        <section className="tc-hero">
          <div className="tc-hero-inner">
            <div className="tc-badge">🔒 Security &amp; Compliance</div>
            <h1 className="tc-hero-title">
              Engineered for<br />
              <span>Absolute Trust.</span>
            </h1>
            <p className="tc-hero-sub">
              Enterprise-grade security is not an add-on. It's the foundation of our neural infrastructure. We protect your brand identity in the generative era — with verifiable proof, not promises.
            </p>

            <div className="tc-vault">
              <div className="tc-vault-ring">
                <span className="tc-vault-icon">🔒</span>
              </div>
              <span className="tc-vault-label">Encrypted Data Isolation Layer</span>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="tc-section-alt">
          <div className="tc-container">
            <div className="tc-section-label">Certifications</div>
            <h2 className="tc-section-title">Compliance by Design</h2>
            <p className="tc-section-sub">
              Every certification is backed by third-party audits and continuous monitoring — not self-assessment checklists.
            </p>
            <div className="tc-compliance-grid">
              {COMPLIANCE.map((c) => (
                <div className="tc-compliance-card" key={c.badge}>
                  <div className="tc-compliance-top">
                    <span className="tc-compliance-icon">{c.icon}</span>
                    <span className="tc-compliance-badge">{c.badge}</span>
                  </div>
                  <div className="tc-compliance-title">{c.title}</div>
                  <div className="tc-compliance-desc">{c.desc}</div>
                  <div className="tc-compliance-status">{c.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Isolation */}
        <section className="tc-section">
          <div className="tc-container">
            <div className="tc-section-label">Data Architecture</div>
            <h2 className="tc-section-title">Absolute Data Isolation</h2>
            <p className="tc-section-sub">
              Your proprietary business data is never shared, never pooled, and never used to train public LLMs. Zero leakage is an architectural guarantee — not a policy.
            </p>
            <div className="tc-isolation-grid">
              {ISOLATION.map((item) => (
                <div className="tc-isolation-card" key={item.title}>
                  <div className="tc-isolation-icon">{item.icon}</div>
                  <div className="tc-isolation-title">{item.title}</div>
                  <div className="tc-isolation-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Stack */}
        <section className="tc-section-alt">
          <div className="tc-container" style={{ textAlign: 'center' }}>
            <div className="tc-section-label">Infrastructure</div>
            <h2 className="tc-section-title" style={{ marginBottom: '0.8rem' }}>
              Defence in Depth
            </h2>
            <p className="tc-section-sub" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
              Six independent security layers. Every request passes through all of them.
            </p>
            <div className="tc-stack-label">Security Stack — Top to Bottom</div>
            <div className="tc-stack">
              {STACK.map((layer, i) => (
                <div
                  key={layer.label}
                  className="tc-stack-layer"
                  style={{
                    background: layer.color,
                    borderColor: layer.border,
                    opacity: 1 - i * 0.04,
                  }}
                >
                  {layer.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="tc-section">
          <div className="tc-container" style={{ maxWidth: '800px' }}>
            <div className="tc-section-label">Common Questions</div>
            <h2 className="tc-section-title" style={{ marginBottom: '2.5rem' }}>Security FAQ</h2>
            <div className="tc-faqs">
              {FAQS.map((faq, i) => (
                <div className="tc-faq" key={i}>
                  <div className="tc-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className={`tc-faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
                  </div>
                  {openFaq === i && <div className="tc-faq-a">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tc-cta-section">
          <div className="tc-section-label" style={{ marginBottom: '1.2rem' }}>Request Access</div>
          <h2 className="tc-cta-title">Security-first,<br />from day one.</h2>
          <p className="tc-cta-sub">
            Request our full security whitepaper, SOC2 report, or schedule a technical security review with our infrastructure team.
          </p>
          <div className="tc-cta-btns">
            <a href="mailto:security@catyai.io" className="tc-cta-primary">Request Security Whitepaper</a>
            <Link to="/contact" className="tc-cta-secondary">Talk to our Security Team →</Link>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
