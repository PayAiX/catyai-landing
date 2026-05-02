import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FooterV9 from '../components/FooterV9'

const pressCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');
.pr-page { background: #010A1F; min-height: 100vh; font-family: 'Inter', sans-serif; color: #e2e8f0; }
.pr-hero { background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200,161,101,0.08) 0%, transparent 60%); border-bottom: 1px solid rgba(255,255,255,0.06); }
.pr-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: #C8A165; background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2); padding: 0.3rem 0.85rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.4rem; }
.pr-heading { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #f8fafc; line-height: 1.15; }
.pr-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; transition: all 0.25s ease; overflow: hidden; }
.pr-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(200,161,101,0.2); transform: translateY(-2px); }
.pr-kit-btn { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 2rem; background: linear-gradient(135deg, #C8A165, #D4B57A); color: #010A1F; font-weight: 700; font-size: 0.9rem; border-radius: 10px; text-decoration: none; transition: opacity 0.2s; }
.pr-kit-btn:hover { opacity: 0.9; }
.pr-kit-secondary { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 2rem; background: transparent; color: #94a3b8; font-weight: 600; font-size: 0.9rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); text-decoration: none; transition: all 0.2s; }
.pr-kit-secondary:hover { border-color: rgba(200,161,101,0.3); color: #D4B57A; }
.pr-source-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; padding: 0.2rem 0.6rem; border-radius: 6px; }
.pr-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(200,161,101,0.15), transparent); margin: 4rem 0; }
`

const articles = [
  {
    source: 'Tech Crunch RO',
    logo: 'TC',
    color: '#00d4aa',
    date: 'Apr 2025',
    title: 'CatyAI: Startup-ul românesc care optimizează pentru motoarele AI, nu Google',
    excerpt: 'O platformă care schimbă regulile jocului în SEO — acum AI-urile recomandă branduri, nu link-uri.',
    href: '#',
    lang: 'RO',
  },
  {
    source: 'StartupCafe',
    logo: 'SC',
    color: '#6366f1',
    date: 'Mar 2025',
    title: 'GEO (Generative Engine Optimization) vine în România prin CatyAI',
    excerpt: 'PayAi-X FZE lansează CatyAI, prima platformă din regiune dedicată vizibilității în ChatGPT și Perplexity.',
    href: '#',
    lang: 'RO',
  },
  {
    source: 'Wall-Street.ro',
    logo: 'WS',
    color: '#f59e0b',
    date: 'Mar 2025',
    title: 'Cum se adaptează companiile românești la era AI Search',
    excerpt: 'Interviu cu echipa CatyAI despre viitorul marketingului digital când GPTBot devine principalul agent de descoperire.',
    href: '#',
    lang: 'RO',
  },
  {
    source: 'Product Hunt',
    logo: 'PH',
    color: '#ff6154',
    date: 'Feb 2025',
    title: 'CatyAI — #3 Product of the Day',
    excerpt: 'Neural infrastructure that makes AI models recommend your business. Featured by 400+ upvotes in launch week.',
    href: '#',
    lang: 'EN',
  },
  {
    source: 'Ziarul Financiar',
    logo: 'ZF',
    color: '#3b82f6',
    date: 'Jan 2025',
    title: 'Antreprenori din Dubai construiesc infrastructura AI pentru afaceri europene',
    excerpt: 'PayAi-X FZE, compania din spatele CatyAI, atrage atenția investitorilor din regiune cu o abordare nouă față de vizibilitatea digitală.',
    href: '#',
    lang: 'RO',
  },
  {
    source: 'How-To Geek',
    logo: 'HG',
    color: '#10b981',
    date: 'Dec 2024',
    title: 'What is GEO and Why Every Business Needs It in 2025',
    excerpt: 'Generative Engine Optimization explained — and CatyAI is leading the charge with their llms.txt protocol.',
    href: '#',
    lang: 'EN',
  },
]

const assets = [
  { icon: '🖼️', label: 'Logo Pack', desc: 'SVG + PNG, light/dark, all sizes', href: '#' },
  { icon: '📐', label: 'Brand Guidelines', desc: 'Colors, typography, usage rules', href: '#' },
  { icon: '📸', label: 'Screenshots', desc: 'Dashboard, product, mobile — 4K', href: '#' },
  { icon: '👤', label: 'Founder Photos', desc: 'Hi-res headshots, team photos', href: '#' },
  { icon: '📄', label: 'Company Factsheet', desc: 'One-page overview, key metrics', href: '#' },
  { icon: '🎬', label: 'Product Video', desc: '60s demo reel, MP4 + WebM', href: '#' },
]

export default function Press() {
  const [filter, setFilter] = useState('ALL')

  const filtered = filter === 'ALL' ? articles : articles.filter(a => a.lang === filter)

  return (
    <div className="pr-page">
      <Helmet>
        <title>Press & Media — CatyAI</title>
        <meta name="description" content="CatyAI in the press. Media kit, brand assets, and press coverage." />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: pressCss }} />

      {/* Hero */}
      <section className="pr-hero pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="pr-tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
              Press &amp; Media
            </span>
          </div>
          <h1 className="pr-heading text-5xl md:text-7xl mb-6">
            CatyAI<br />in the press
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Acoperire media, resurse pentru jurnaliști și tot ce ai nevoie pentru a scrie despre CatyAI.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:press@payai-x.com" className="pr-kit-btn">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              press@payai-x.com
            </a>
            <a href="#kit" className="pr-kit-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Press Kit
            </a>
          </div>
        </div>
      </section>

      {/* Press Articles */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Articole din presă</h2>
            <p className="text-slate-500 text-sm mt-1 font-mono">Coverage &amp; mentions</p>
          </div>
          <div className="flex items-center gap-2">
            {['ALL', 'RO', 'EN'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-mono text-xs px-4 py-2 rounded-lg border transition-all"
                style={{
                  background: filter === f ? 'rgba(200,161,101,0.12)' : 'transparent',
                  borderColor: filter === f ? 'rgba(200,161,101,0.35)' : 'rgba(255,255,255,0.08)',
                  color: filter === f ? '#C8A165' : '#64748b',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a, i) => (
            <a key={i} href={a.href} className="pr-card block p-6 no-underline">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs font-mono"
                    style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}30` }}
                  >
                    {a.logo}
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{a.source}</span>
                </div>
                <span className="pr-source-badge" style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b' }}>
                  {a.lang}
                </span>
              </div>
              <h3 className="text-white font-semibold leading-snug mb-3 text-sm">{a.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-600">{a.date}</span>
                <span className="text-xs text-gold flex items-center gap-1" style={{ color: '#C8A165' }}>
                  Citește
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="pr-divider mx-6" />

      {/* Press Kit Assets */}
      <section id="kit" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="mb-10">
          <span className="pr-tag mb-4">Press Kit</span>
          <h2 className="text-2xl font-bold text-white mt-4">Brand Assets</h2>
          <p className="text-slate-500 text-sm mt-1">Resurse oficiale pentru articole, prezentări și acoperire media.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {assets.map((a, i) => (
            <a key={i} href={a.href} className="pr-card flex items-center gap-4 p-5 no-underline">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{a.label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{a.desc}</div>
              </div>
              <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          ))}
        </div>

        <div className="pr-card p-8 text-center">
          <p className="text-slate-400 mb-2">Ai nevoie de altceva?</p>
          <h3 className="text-white font-bold text-xl mb-4">Contactează echipa de presă</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Interviuri, declarații, cifre exclusive sau orice altceva pentru articolul tău — răspundem în 24h.
          </p>
          <a href="mailto:press@payai-x.com" className="pr-kit-btn">
            press@payai-x.com
          </a>
        </div>
      </section>

      <FooterV9 lang="ro" />
    </div>
  )
}
