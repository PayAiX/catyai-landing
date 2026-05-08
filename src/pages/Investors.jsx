import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const investorsCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');

.inv-page { background-color: #010A1F; min-height: 100vh; color: #f8fafc; font-family: 'Inter', sans-serif; }
.inv-hero { background: radial-gradient(circle at 50% 0%, rgba(30,58,138,0.15) 0%, transparent 70%); }
.inv-heading { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #f8fafc; line-height: 1.15; }
.inv-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 2rem; transition: all 0.25s ease; }
.inv-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(200,161,101,0.2); }
.inv-section-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #C8A165; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }

/* Buttons */
.pr-kit-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.9rem 2rem; background: linear-gradient(135deg, #C8A165, #D4B57A); color: #010A1F; font-weight: 700; font-size: 0.95rem; border-radius: 10px; text-decoration: none; transition: opacity 0.2s; width: 100%; }
.pr-kit-btn:hover { opacity: 0.9; }
.pr-kit-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.9rem 2rem; background: rgba(255,255,255,0.03); color: #94a3b8; font-weight: 600; font-size: 0.95rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); text-decoration: none; transition: all 0.2s; width: 100%; }
.pr-kit-secondary:hover { border-color: rgba(200,161,101,0.4); color: #D4B57A; background: rgba(200,161,101,0.05); }
.inv-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(200,161,101,0.15), transparent); margin: 4rem 0; }
`

export default function Investors() {
  const [lang, setLang] = useState('en')

  return (
    <div className="inv-page">
      <Helmet>
        <title>Investor Relations — PayAi-X FZE</title>
        <meta name="description" content="PayAi-X FZE is defining the Zero-Trust standard for the AI economy. Access our technical whitepaper, pitch deck, and corporate data room." />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: investorsCss }} />

      <GlobalHeader lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="inv-hero pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="inv-section-tag justify-center">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A165', display: 'inline-block', boxShadow: '0 0 8px #C8A165' }} />
              PayAi-X FZE
            </span>
          </div>
          <h1 className="inv-heading text-5xl md:text-7xl mb-6">
            Investor Relations
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Defining the Zero-Trust Standard for the AI Economy. We build the cryptographic infrastructure that makes AI legally defensible for global enterprises.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 pb-20">

        {/* Thesis */}
        <div className="inv-card mb-8">
          <div className="inv-section-tag">01 / The Core Thesis</div>
          <h2 className="text-2xl font-bold text-white mb-4">The Generative Liability Gap</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            With the launch of AI programmatic advertising platforms (such as ChatGPT Ads Manager), Large Language Models (LLMs) have transitioned from simple information retrieval to direct commercial mediation. This shift opened a trillion-dollar market but simultaneously created a massive legal exposure.
          </p>
          <p className="text-slate-400 leading-relaxed">
            AI platforms and merchants are now exposed to massive legal risks due to commercial hallucinations (invented prices, unauthorized policies). Our thesis is simple: the future of generative commerce cannot rely on "probabilities". <strong>It requires cryptographic certainty.</strong>
          </p>
        </div>

        {/* Technology Moat */}
        <div className="inv-card mb-8">
          <div className="inv-section-tag">02 / The Moat</div>
          <h2 className="text-2xl font-bold text-white mb-4">Neural Assurance Protocol (NAP)</h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            PayAi-X FZE is not an "AI wrapper." We are a neural data security infrastructure company. We developed CatyAI v3.0, a proprietary system ensuring compliance by design:
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-[#C8A165]">✦</span>
              <span><strong>Ed25519 Cryptography:</strong> Digital signing of every commercial assertion.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C8A165]">✦</span>
              <span><strong>Deterministic Retrieval (Qdrant DB):</strong> Overriding the stochastic nature of LLMs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C8A165]">✦</span>
              <span><strong>Compliance By Design:</strong> Native alignment with the EU AI Act (Art. 50), FTC directives, and GDPR.</span>
            </li>
          </ul>
        </div>

        {/* Corporate Structure */}
        <div className="inv-card mb-12">
          <div className="inv-section-tag">03 / Corporate Governance</div>
          <h2 className="text-2xl font-bold text-white mb-4">Global Operations</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            PayAi-X FZE operates with a scalable legal and operational architecture prepared for global capital markets:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="border-l-2 border-[rgba(200,161,101,0.3)] pl-4">
              <h4 className="text-white font-semibold mb-1">Headquarters</h4>
              <p className="text-sm text-slate-500">Dubai, United Arab Emirates (Strategic hub for global expansion and capitalization).</p>
            </div>
            <div className="border-l-2 border-[rgba(200,161,101,0.3)] pl-4">
              <h4 className="text-white font-semibold mb-1">R&D Operations</h4>
              <p className="text-sm text-slate-500">Bucharest, Romania (Center of excellence in neural engineering and cryptography).</p>
            </div>
          </div>
        </div>

        <div className="inv-divider"></div>

        {/* Data Room CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Access the Data Room</h2>
          <p className="text-slate-400 mb-10">
            PayAi-X FZE maintains a secure Data Room for institutional investors, Venture Capital funds, and strategic partners. Review our public briefings below or request full access.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Tech Whitepaper PDF Button */}
            <a
              href="https://vawohwlmicgalwpuainm.supabase.co/storage/v1/object/public/ENTERPRISE%20BRIEFING/Zero-Trust-Infrastructure-for-Programmatic-AI-Commerce.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pr-kit-secondary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Technical Whitepaper
            </a>

            {/* Investor Pitch PDF Button */}
            <a
              href="https://vawohwlmicgalwpuainm.supabase.co/storage/v1/object/public/ENTERPRISE%20BRIEFING/PayAi-X-Investor-Pitch.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pr-kit-secondary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              Investor Pitch Deck
            </a>
          </div>

          {/* Email Request Button */}
          <a
            href="mailto:adrian@payai-x.com?subject=Data%20Room%20Access%20Request%20-%20PayAi-X%20FZE&body=Hello%20Adrian%2C%0A%0AI%20would%20like%20to%20request%20access%20to%20the%20PayAi-X%20FZE%20full%20Data%20Room.%20Please%20find%20my%20details%20below%3A%0A%0A---%0AName%3A%20%0ACompany%2FFund%3A%20%0ARole%3A%20%0ALinkedIn%20Profile%3A%20%0A---%0A%0AThank%20you."
            className="pr-kit-btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Request Full Data Room Access
          </a>
        </div>

      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
