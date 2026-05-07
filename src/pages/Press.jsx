import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const pressCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');
.pr-page { background: #010A1F; min-height: 100vh; font-family: 'Inter', sans-serif; color: #e2e8f0; }
.pr-hero { background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200,161,101,0.08) 0%, transparent 60%); border-bottom: 1px solid rgba(255,255,255,0.06); }
.pr-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: #C8A165; background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2); padding: 0.3rem 0.85rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.4rem; }
.pr-heading { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #f8fafc; line-height: 1.15; }
.pr-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; transition: all 0.25s ease; overflow: hidden; }
.pr-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(200,161,101,0.2); transform: translateY(-2px); }
.pr-card-featured { background: rgba(200,161,101,0.04); border: 1px solid rgba(200,161,101,0.15); }
.pr-card-featured:hover { background: rgba(200,161,101,0.08); border-color: rgba(200,161,101,0.3); }
.pr-kit-btn { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 2rem; background: linear-gradient(135deg, #C8A165, #D4B57A); color: #010A1F; font-weight: 700; font-size: 0.9rem; border-radius: 10px; text-decoration: none; transition: opacity 0.2s; }
.pr-kit-btn:hover { opacity: 0.9; }
.pr-kit-secondary { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 2rem; background: transparent; color: #94a3b8; font-weight: 600; font-size: 0.9rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); text-decoration: none; transition: all 0.2s; }
.pr-kit-secondary:hover { border-color: rgba(200,161,101,0.3); color: #D4B57A; }
.pr-source-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; padding: 0.2rem 0.6rem; border-radius: 6px; }
.pr-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(200,161,101,0.15), transparent); margin: 4rem 0; }
.pr-section-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #C8A165; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.pr-impact { font-size: 0.75rem; color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); padding: 0.4rem 0.8rem; border-radius: 6px; display: inline-block; margin-top: 0.75rem; }
`

const featuredArticles = [
  {
    source: 'Ziarul Financiar',
    subtitle: 'ZF IT Generation',
    logo: 'ZF',
    color: '#3b82f6',
    subject: 'Interviu cu Adrian Vitan Lopes, Fondator PayAi-X, despre viitorul agenților autonomi.',
    impact: 'Validare la cel mai înalt nivel de business din România.',
    href: 'https://www.zf.ro/zf-it-generation/video-adrian-vitan-lopes-fondator-payai-x-agentii-autonomi-nu-22011858',
    cta: 'Urmărește interviul integral pe ZF.ro',
  },
  {
    source: 'AIthority',
    subtitle: 'Global Tech Media',
    logo: 'AI',
    color: '#8b5cf6',
    subject: 'PayAi-X FZE Launches CatyAI v3.0, Offering Cryptographically Verifiable AI Data Infrastructure for Enterprise Governance.',
    impact: 'Recunoaștere internațională a arhitecturii Zero-Trust și a alinierii la EU AI Act.',
    href: 'https://aithority.com/natural-language/chatgpt/payai-x-fze-launches-catyai-v3-0-offering-cryptographically-verifiable-ai-data-infrastructure-for-enterprise-governance/',
    cta: 'Citește pe AIthority.com',
  },
  {
    source: 'Start-up.ro',
    subtitle: 'Tech & Business',
    logo: 'SU',
    color: '#10b981',
    subject: 'Cum încearcă o companie românească să rezolve criza de încredere a inteligenței artificiale prin semnături criptografice.',
    impact: 'Explicația perfectă a tranziției de la SEO la GEO (Generative Engine Optimization).',
    href: 'https://start-up.ro/cum-incearca-o-companie-romaneasca-sa-rezolve-criza-de-incredere-a-inteligentei-artificiale-prin-semnaturi-criptografice/',
    cta: 'Citește analiza pe Start-up.ro',
  },
  {
    source: 'PrimaNews / PrimaPlay',
    subtitle: 'TV Mainstream',
    logo: 'PN',
    color: '#ef4444',
    subject: 'Apariție TV Mainstream despre impactul AI-ului în business.',
    impact: 'Autoritate publică masivă și dovada adopției la scară largă a tehnologiei.',
    href: 'https://www.primaplay.ro/emisiuni/primanews/inteligenta-artificiala-in-afaceri-bune-practici-si-provocari_4194',
    cta: 'Urmărește emisiunea pe PrimaPlay',
  },
]

const globalArticles = [
  {
    source: 'EIN Presswire',
    subtitle: 'Global Syndication',
    logo: 'EIN',
    color: '#f59e0b',
    subject: 'Lansarea oficială CatyAI v3.0 pe piețele internaționale, detaliind arhitectura Qdrant Vector DB și protocolul EdDSA.',
    href: 'https://www.einnews.com/pr_news/800982685/payai-x-fze-launches-catyai-v3-0-with-cryptographically-verifiable-ai-data-infrastructure',
    cta: 'Citește pe EIN News',
  },
  {
    source: 'ComunicateDePresa.ro',
    subtitle: 'Technical Release',
    logo: 'CP',
    color: '#6366f1',
    subject: 'Lansarea FraudAI Shield – prima platformă AI Sales din România cu protecție anti-fraudă integrată în timp real, care protejează utilizatorii de phishing și atacuri de impersonare.',
    href: 'https://www.comunicatedepresa.ro/payai-x-fze/payai-x-fze-lanseaza-catyai-prima-platforma-ai-sales-din-romania-cu-protectie-anti-frauda-integrata',
    cta: 'Citește comunicatul tehnic',
  },
]

const resources = [
  { icon: '📊', label: 'Crunchbase Profile', desc: 'Official company profile & metrics', href: 'https://www.crunchbase.com/organization/catyai' },
  { icon: '📄', label: 'Technical Whitepaper', desc: 'NAP & Deterministic Trust in AI', href: 'mailto:press@catyai.io?subject=Whitepaper%20Request' },
  { icon: '🖼️', label: 'Logo Pack', desc: 'SVG + PNG, light/dark, all sizes', href: '#kit' },
  { icon: '📐', label: 'Brand Guidelines', desc: 'Colors, typography, usage rules', href: '#kit' },
  { icon: '📸', label: 'Screenshots', desc: 'Dashboard, product, mobile — 4K', href: '#kit' },
  { icon: '👤', label: 'Founder Photos', desc: 'Hi-res headshots, team photos', href: '#kit' },
]

export default function Press() {
  const [lang, setLang] = useState('ro')

  return (
    <div className="pr-page">
      <Helmet>
        <title>Press & Newsroom — CatyAI</title>
        <meta name="description" content="CatyAI & PayAi-X Newsroom. Featured in Ziarul Financiar, AIthority, Start-up.ro. Media kit, brand assets, and press coverage." />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: pressCss }} />

      <GlobalHeader lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="pr-hero pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="pr-tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
              Newsroom
            </span>
          </div>
          <h1 className="pr-heading text-4xl md:text-6xl mb-6">
            CatyAI &amp; PayAi-X<br />Newsroom
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Featured and recognized in global tech media and top-tier business publications.
          </p>

          {/* AI Trust Crisis Box */}
          <div className="pr-card p-6 md:p-8 text-left max-w-3xl mx-auto mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              The AI Trust Crisis: Cum răspundem lansării reclamelor în ChatGPT
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Odată cu lansarea de către OpenAI a platformei <strong className="text-white">ChatGPT Ads Manager</strong>, modelele de limbaj mari (LLM) au făcut tranziția către medierea comercială. Această evoluție expune brandurile la riscuri legale majore din cauza <em>„Halucinațiilor Comerciale"</em>. CatyAI, prin platforma sa v3.0 și protocolul <strong className="text-white">NAP (Neural Assurance Protocol)</strong>, a devenit infrastructura Zero-Trust esențială care leagă matematic token-urile generate de AI de adevărul criptografic al brandului, eliminând răspunderea legală a comercianților.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:press@catyai.io" className="pr-kit-btn">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              press@catyai.io
            </a>
            <a href="#kit" className="pr-kit-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Press Kit
            </a>
          </div>
        </div>
      </section>

      {/* Featured Coverage */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="pr-section-tag">
          <span>🏆</span>
          Featured Coverage (The Crown Jewels)
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
          Aparițiile care contează
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredArticles.map((a, i) => (
            <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" className="pr-card pr-card-featured block p-6 no-underline">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm font-mono"
                  style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}40` }}
                >
                  {a.logo}
                </div>
                <div>
                  <div className="font-semibold text-white">{a.source}</div>
                  <div className="text-slate-500 text-xs">{a.subtitle}</div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                <strong className="text-slate-200">Subiect:</strong> {a.subject}
              </p>
              <div className="pr-impact">
                <strong>Impact:</strong> {a.impact}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: '#C8A165' }}>
                🔗 {a.cta}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="pr-divider mx-6" />

      {/* Global Syndication */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="pr-section-tag">
          <span>🌍</span>
          Global Syndication &amp; Technical Releases
        </div>
        <h2 className="text-2xl font-bold text-white mb-10">
          Comunicări oficiale
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {globalArticles.map((a, i) => (
            <a key={i} href={a.href} target="_blank" rel="noopener noreferrer" className="pr-card block p-6 no-underline">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs font-mono"
                  style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}30` }}
                >
                  {a.logo}
                </div>
                <div>
                  <div className="font-semibold text-slate-200 text-sm">{a.source}</div>
                  <div className="text-slate-500 text-xs">{a.subtitle}</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{a.subject}</p>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#C8A165' }}>
                🔗 {a.cta}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="pr-divider mx-6" />

      {/* Company Resources */}
      <section id="kit" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="pr-section-tag">
          <span>📊</span>
          Company Resources &amp; Technical Papers
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Resurse pentru jurnaliști, analiști și CISO
        </h2>
        <p className="text-slate-500 text-sm mb-10">
          Materiale oficiale pentru articole, prezentări și due diligence.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {resources.map((a, i) => (
            <a key={i} href={a.href} target={a.href.startsWith('http') ? '_blank' : undefined} rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="pr-card flex items-center gap-4 p-5 no-underline">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{a.label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{a.desc}</div>
              </div>
              <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          ))}
        </div>

        <div className="pr-card p-8 text-center">
          <p className="text-slate-400 mb-2">Press Inquiries</p>
          <h3 className="text-white font-bold text-xl mb-4">Contactează echipa de presă</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Interviuri, declarații, cifre exclusive sau orice altceva pentru articolul tău — răspundem în 24h.
          </p>
          <a href="mailto:press@catyai.io" className="pr-kit-btn">
            press@catyai.io
          </a>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
