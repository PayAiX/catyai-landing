import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import { translations } from '../data/catyWidgetTranslations'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'fr', label: 'FR' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Caty Widget',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'AI Sales Agent widget for websites. Converts visitors into customers 24/7.',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'EUR' },
    { '@type': 'Offer', name: 'Pro', price: '49', priceCurrency: 'EUR' },
  ],
}

export default function CatyWidget() {
  const [lang, setLang] = useState('en')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && translations[saved]) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <>
      <SEO
        title="Caty Widget — AI Sales Agent for Your Website | CatyAI"
        description="Smart chat widget that converts visitors into customers 24/7. Lead qualification, appointment booking, document generation. 2-minute install. 500 conversations/month free."
        canonical="https://catyai.io/caty-widget"
        jsonLd={jsonLd}
      />
      <GlobalHeader />
      <style>{`
        .wgt-page { background: #010A1F; min-height: 100vh; color: #f1f5f9; font-family: 'Inter', sans-serif; }
        .wgt-page * { box-sizing: border-box; }

        /* Language switcher */
        .wgt-lang {
          position: fixed;
          top: 88px;
          right: 1.25rem;
          z-index: 30;
          display: flex;
          gap: 0.25rem;
          padding: 0.25rem;
          background: rgba(1,10,31,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          backdrop-filter: blur(8px);
        }
        .wgt-lang button {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.7rem;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.18s;
        }
        .wgt-lang button.active {
          background: rgba(200,161,101,0.15);
          color: #C8A165;
        }
        .wgt-lang button:hover:not(.active) { color: #f1f5f9; }

        /* Hero */
        .wgt-hero {
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .wgt-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,161,101,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .wgt-hero-inner { position: relative; max-width: 880px; margin: 0 auto; }
        .wgt-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.28);
          color: #C8A165;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.45rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .wgt-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #C8A165;
          border-radius: 50%;
          box-shadow: 0 0 10px #C8A165;
        }
        .wgt-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 6vw, 5rem);
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin: 0 0 0.4rem;
          color: #f1f5f9;
        }
        .wgt-h1-gold {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #C8A165;
          margin: 0 0 1.75rem;
        }
        .wgt-sub {
          font-size: 1.12rem;
          color: #94a3b8;
          max-width: 640px;
          margin: 0 auto 2.25rem;
          line-height: 1.65;
        }
        .wgt-cta-row {
          display: flex;
          gap: 0.85rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .wgt-btn-primary, .wgt-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.95rem 1.6rem;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .wgt-btn-primary {
          background: #C8A165;
          color: #010A1F;
          box-shadow: 0 8px 24px rgba(200,161,101,0.25);
        }
        .wgt-btn-primary:hover {
          background: #d4ac6f;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(200,161,101,0.32);
        }
        .wgt-btn-ghost {
          background: transparent;
          color: #f1f5f9;
          border-color: rgba(255,255,255,0.18);
        }
        .wgt-btn-ghost:hover { border-color: #C8A165; color: #C8A165; }

        .wgt-trust {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 0.82rem;
          color: #64748b;
        }
        .wgt-trust span {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .wgt-trust span::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6ee7b7;
        }

        /* Section */
        .wgt-section {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 5.5rem 1.5rem;
        }
        .wgt-container { max-width: 1100px; margin: 0 auto; }
        .wgt-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 1rem;
          text-align: center;
        }
        .wgt-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #f1f5f9;
          text-align: center;
          margin: 0 0 0.75rem;
        }
        .wgt-h2-gold { color: #C8A165; }
        .wgt-h2-sub {
          color: #94a3b8;
          text-align: center;
          font-size: 1rem;
          max-width: 620px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        /* Problem stats */
        .wgt-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 720px) { .wgt-stats { grid-template-columns: 1fr; } }
        .wgt-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: border-color 0.2s;
        }
        .wgt-stat:hover { border-color: rgba(200,161,101,0.3); }
        .wgt-stat-val {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 3rem;
          color: #C8A165;
          line-height: 1;
          margin-bottom: 0.65rem;
        }
        .wgt-stat-label { color: #94a3b8; font-size: 0.92rem; line-height: 1.5; }
        .wgt-problem-solution {
          text-align: center;
          font-size: 1.15rem;
          color: #f1f5f9;
          margin-top: 2rem;
          font-weight: 500;
        }

        /* Steps */
        .wgt-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          counter-reset: step;
        }
        @media (max-width: 720px) { .wgt-steps { grid-template-columns: 1fr; } }
        .wgt-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
          position: relative;
          counter-increment: step;
        }
        .wgt-step::before {
          content: '0' counter(step);
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          color: #C8A165;
          display: block;
          margin-bottom: 0.6rem;
        }
        .wgt-step-icon { font-size: 1.5rem; margin-bottom: 0.85rem; }
        .wgt-step-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: #f1f5f9;
          margin: 0 0 0.45rem;
        }
        .wgt-step-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.55; }

        /* Code block */
        .wgt-code {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #e2e8f0;
          margin: 2rem auto;
          max-width: 760px;
          overflow-x: auto;
          position: relative;
        }
        .wgt-code-label {
          position: absolute;
          top: -10px;
          left: 16px;
          background: #010A1F;
          padding: 0 0.5rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #C8A165;
        }
        .wgt-platforms {
          text-align: center;
          font-size: 0.85rem;
          color: #64748b;
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Modules grid */
        .wgt-modules {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 980px) { .wgt-modules { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .wgt-modules { grid-template-columns: 1fr; } }
        .wgt-module {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.22s;
        }
        .wgt-module:hover {
          border-color: rgba(200,161,101,0.3);
          transform: translateY(-2px);
        }
        .wgt-module-icon { font-size: 1.6rem; margin-bottom: 0.8rem; }
        .wgt-module-name {
          font-weight: 700;
          font-size: 1rem;
          color: #f1f5f9;
          margin: 0 0 0.5rem;
        }
        .wgt-module-desc {
          color: #94a3b8;
          font-size: 0.85rem;
          line-height: 1.55;
          margin: 0 0 0.85rem;
        }
        .wgt-module-feats {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .wgt-module-feats li {
          font-size: 0.72rem;
          color: #cbd5e1;
          background: rgba(200,161,101,0.07);
          border: 1px solid rgba(200,161,101,0.15);
          padding: 0.2rem 0.55rem;
          border-radius: 100px;
          letter-spacing: 0.02em;
        }

        /* Use cases */
        .wgt-use-cases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) { .wgt-use-cases { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .wgt-use-cases { grid-template-columns: 1fr; } }
        .wgt-uc {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .wgt-uc-icon { font-size: 1.6rem; margin-bottom: 0.7rem; }
        .wgt-uc-title { font-weight: 700; color: #f1f5f9; margin: 0 0 0.4rem; font-size: 1rem; }
        .wgt-uc-desc { color: #94a3b8; font-size: 0.88rem; line-height: 1.55; }

        /* Comparison table */
        .wgt-table-wrap {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow-x: auto;
        }
        .wgt-table { width: 100%; border-collapse: collapse; min-width: 640px; }
        .wgt-table th, .wgt-table td {
          padding: 0.95rem 1.1rem;
          text-align: left;
          font-size: 0.88rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .wgt-table th {
          font-weight: 700;
          color: #f1f5f9;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(0,0,0,0.2);
        }
        .wgt-table th.caty-col { color: #C8A165; }
        .wgt-table td { color: #94a3b8; }
        .wgt-table td.caty-cell { color: #C8A165; font-weight: 600; }
        .wgt-table tbody tr:last-child td { border-bottom: none; }
        .wgt-table tbody tr:hover { background: rgba(200,161,101,0.04); }

        /* FAQ */
        .wgt-faqs { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.5rem; }
        .wgt-faq {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .wgt-faq.open { border-color: rgba(200,161,101,0.3); }
        .wgt-faq-q {
          width: 100%;
          background: transparent;
          border: none;
          color: #f1f5f9;
          font-family: inherit;
          font-size: 0.98rem;
          font-weight: 600;
          padding: 1.15rem 1.4rem;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .wgt-faq-toggle {
          color: #C8A165;
          font-size: 1.5rem;
          font-weight: 300;
          line-height: 1;
          transition: transform 0.2s;
        }
        .wgt-faq.open .wgt-faq-toggle { transform: rotate(45deg); }
        .wgt-faq-a {
          padding: 0 1.4rem 1.2rem;
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.65;
        }

        /* Final CTA */
        .wgt-cta-section {
          padding: 6rem 1.5rem;
          text-align: center;
          background:
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,161,101,0.12) 0%, transparent 60%),
            #010A1F;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .wgt-cta-h {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
          line-height: 1.1;
        }
        .wgt-cta-sub { color: #94a3b8; font-size: 1.05rem; margin: 0 0 2rem; max-width: 520px; margin-left: auto; margin-right: auto; }
        .wgt-cta-demo {
          display: block;
          margin-top: 1.25rem;
          color: #C8A165;
          font-size: 0.9rem;
          text-decoration: none;
        }
        .wgt-cta-demo:hover { text-decoration: underline; }
      `}</style>

      <div className="wgt-page">
        <div className="wgt-lang" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              className={lang === l.code ? 'active' : ''}
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* HERO */}
        <section className="wgt-hero">
          <div className="wgt-hero-inner">
            <span className="wgt-badge">{t.badge}</span>
            <h1 className="wgt-h1">{t.heroTitle1}</h1>
            <h2 className="wgt-h1-gold">{t.heroTitle2}</h2>
            <p className="wgt-sub">{t.heroSubtitle}</p>
            <div className="wgt-cta-row">
              <a href="https://app.catyai.io/register" className="wgt-btn-primary">{t.heroCta}</a>
              <Link to="/contact" className="wgt-btn-ghost">{t.heroCtaSecondary}</Link>
            </div>
            <div className="wgt-trust">
              <span>{t.trustBadge1}</span>
              <span>{t.trustBadge2}</span>
              <span>{t.trustBadge3}</span>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="wgt-section">
          <div className="wgt-container">
            <h2 className="wgt-h2">
              {t.problemTitle} <span className="wgt-h2-gold">{t.problemHighlight}</span>
            </h2>
            <div className="wgt-stats" style={{ marginTop: '3rem' }}>
              {t.problemStats.map((s, i) => (
                <div key={i} className="wgt-stat">
                  <div className="wgt-stat-val">{s.value}</div>
                  <div className="wgt-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="wgt-problem-solution">{t.problemSolution}</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="wgt-section">
          <div className="wgt-container">
            <div className="wgt-eyebrow">2-Minute Setup</div>
            <h2 className="wgt-h2">{t.integrationTitle}</h2>
            <p className="wgt-h2-sub">{t.integrationSubtitle}</p>
            <div className="wgt-steps">
              {t.integrationSteps.map((s, i) => (
                <div key={i} className="wgt-step">
                  <div className="wgt-step-icon">{s.icon}</div>
                  <h3 className="wgt-step-title">{s.title}</h3>
                  <p className="wgt-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="wgt-code">
              <span className="wgt-code-label">EMBED</span>
              <code>{t.integrationCode}</code>
            </div>
            <p className="wgt-platforms">{t.integrationPlatforms}</p>
          </div>
        </section>

        {/* AGENT vs CHATBOT */}
        <section className="wgt-section">
          <div className="wgt-container">
            <h2 className="wgt-h2">
              {t.agentTitle} <span className="wgt-h2-gold">{t.agentHighlight}</span>
            </h2>
            <p className="wgt-h2-sub">{t.agentDesc}</p>
            <div className="wgt-table-wrap">
              <table className="wgt-table">
                <thead>
                  <tr>
                    <th>Generic Chatbot</th>
                    <th className="caty-col">Caty Widget</th>
                  </tr>
                </thead>
                <tbody>
                  {t.agentComparison.map((row, i) => (
                    <tr key={i}>
                      <td>{row.chatbot}</td>
                      <td className="caty-cell">{row.caty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section className="wgt-section">
          <div className="wgt-container">
            <div className="wgt-eyebrow">12 Modules</div>
            <h2 className="wgt-h2">{t.modulesTitle}</h2>
            <p className="wgt-h2-sub">{t.modulesSubtitle}</p>
            <div className="wgt-modules">
              {t.modules.map((m, i) => (
                <article key={i} className="wgt-module">
                  <div className="wgt-module-icon">{m.icon}</div>
                  <h3 className="wgt-module-name">{m.name}</h3>
                  <p className="wgt-module-desc">{m.desc}</p>
                  <ul className="wgt-module-feats">
                    {m.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="wgt-section">
          <div className="wgt-container">
            <h2 className="wgt-h2">{t.useCasesTitle}</h2>
            <p className="wgt-h2-sub">{t.useCasesSubtitle}</p>
            <div className="wgt-use-cases">
              {t.useCases.map((u, i) => (
                <div key={i} className="wgt-uc">
                  <div className="wgt-uc-icon">{u.icon}</div>
                  <h3 className="wgt-uc-title">{u.title}</h3>
                  <p className="wgt-uc-desc">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="wgt-section">
          <div className="wgt-container">
            <h2 className="wgt-h2">{t.comparisonTitle}</h2>
            <p className="wgt-h2-sub">{t.comparisonSubtitle}</p>
            <div className="wgt-table-wrap">
              <table className="wgt-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="caty-col">Caty</th>
                    <th>Tidio</th>
                    <th>Intercom</th>
                    <th>Drift</th>
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonItems.map((row, i) => (
                    <tr key={i}>
                      <td style={{ color: '#cbd5e1', fontWeight: 500 }}>{row.feature}</td>
                      <td className="caty-cell">{row.caty}</td>
                      <td>{row.tidio}</td>
                      <td>{row.intercom}</td>
                      <td>{row.drift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="wgt-section">
          <div className="wgt-container">
            <h2 className="wgt-h2">{t.faqTitle}</h2>
            <div className="wgt-faqs" style={{ marginTop: '2.5rem' }}>
              {t.faqs.map((f, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className={`wgt-faq ${isOpen ? 'open' : ''}`}>
                    <button
                      className="wgt-faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{f.q}</span>
                      <span className="wgt-faq-toggle" aria-hidden="true">+</span>
                    </button>
                    {isOpen && <div className="wgt-faq-a">{f.a}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="wgt-cta-section">
          <h2 className="wgt-cta-h">{t.ctaTitle}</h2>
          <p className="wgt-cta-sub">{t.ctaSubtitle}</p>
          <a href="https://app.catyai.io/register" className="wgt-btn-primary">{t.ctaButton}</a>
          <Link to="/contact" className="wgt-cta-demo">{t.ctaDemo}</Link>
        </section>

        <FooterV9 />
      </div>
    </>
  )
}
