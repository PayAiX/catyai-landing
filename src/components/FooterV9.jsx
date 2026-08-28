import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Globe } from 'lucide-react'
import { MERCHANT_COUNT, productsShortM } from '../lib/catalogStats';

// Cifrele din sursa unică (actualizate la build). Nu hardcoda.
const N_M = String(MERCHANT_COUNT);
const M_DOT = productsShortM('en');
const M_COMMA = productsShortM('ro');

const translations = {
  en: {
    tagline: 'Weekly GEO intel,\nbefore the competition.',
    newsletter: 'Monthly updates on AI search, LLM behavior, CatyAI protocol. No spam.',
    noSpam: 'No spam · GDPR compliant · Unsubscribe anytime',
    desc: 'Neural infrastructure for AI internet. We make sure GPTBot, ClaudeBot and Perplexity recommend you.',
    product: 'Product', resources: 'Resources', company: 'Company', legal: 'Legal',
    pricing: 'Pricing', docs: 'Documentation', about: 'About',
    careers: 'Careers', terms: 'Terms', security: 'Security',
    liveStats: 'Live in production: ' + M_DOT + '+ products indexed by AI · ' + N_M + ' active merchants',
  },
  ro: {
    tagline: 'GEO intel săptămânal,\nînainte de concurență.',
    newsletter: 'Update-uri lunare despre AI search, comportament LLM, protocol CatyAI. Fără spam.',
    noSpam: 'No spam · GDPR compliant · Unsubscribe oricând',
    desc: 'Infrastructura neurală pentru AI internet. Ne asigurăm că GPTBot, ClaudeBot și Perplexity te recomandă.',
    product: 'Produs', resources: 'Resurse', company: 'Companie', legal: 'Legal',
    pricing: 'Prețuri', docs: 'Documentație', about: 'Despre',
    careers: 'Cariere', terms: 'Termeni', security: 'Securitate',
    liveStats: 'Live în producție: ' + M_COMMA + '+ produse indexate de AI · ' + N_M + ' de comercianți activi',
  },
  es: {
    tagline: 'Inteligencia GEO semanal,\nantes que la competencia.',
    newsletter: 'Actualizaciones mensuales sobre búsqueda IA, comportamiento LLM, protocolo CatyAI. Sin spam.',
    noSpam: 'Sin spam · GDPR compliant · Cancelar en cualquier momento',
    desc: 'Infraestructura neural para internet IA. Nos aseguramos de que GPTBot, ClaudeBot y Perplexity te recomienden.',
    product: 'Producto', resources: 'Recursos', company: 'Empresa', legal: 'Legal',
    pricing: 'Precios', docs: 'Documentación', about: 'Acerca de',
    careers: 'Empleos', terms: 'Términos', security: 'Seguridad',
    liveStats: 'En producción: ' + M_COMMA + '+ productos indexados por IA · ' + N_M + ' comerciantes activos',
  },
  pt: {
    tagline: 'Inteligência GEO semanal,\nantes da concorrência.',
    newsletter: 'Atualizações mensais sobre pesquisa IA, comportamento LLM, protocolo CatyAI. Sem spam.',
    noSpam: 'Sem spam · GDPR compliant · Cancelar a qualquer momento',
    desc: 'Infraestrutura neural para internet IA. Garantimos que GPTBot, ClaudeBot e Perplexity te recomendem.',
    product: 'Produto', resources: 'Recursos', company: 'Empresa', legal: 'Legal',
    pricing: 'Preços', docs: 'Documentação', about: 'Sobre',
    careers: 'Carreiras', terms: 'Termos', security: 'Segurança',
    liveStats: 'Em produção: ' + M_COMMA + '+ produtos indexados por IA · ' + N_M + ' comerciantes ativos',
  },
  fr: {
    tagline: 'Veille GEO hebdomadaire,\navant la concurrence.',
    newsletter: 'Mises à jour mensuelles sur la recherche IA, comportement LLM, protocole CatyAI. Sans spam.',
    noSpam: 'Sans spam · GDPR compliant · Se désabonner à tout moment',
    desc: 'Infrastructure neurale pour l\'internet IA. Nous veillons à ce que GPTBot, ClaudeBot et Perplexity vous recommandent.',
    product: 'Produit', resources: 'Ressources', company: 'Entreprise', legal: 'Légal',
    pricing: 'Tarifs', docs: 'Documentation', about: 'À propos',
    careers: 'Carrières', terms: 'Conditions', security: 'Sécurité',
    liveStats: 'En production : ' + M_COMMA + "+ produits indexés par l'IA · " + N_M + ' marchands actifs',
  },
}

const css = `
.fv9-footer { background: #010A1F; border-top: 1px solid rgba(255,255,255,0.05); }
.fv9-status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #10b981; box-shadow: 0 0 12px #10b981;
  display: inline-block;
  animation: fv9-pulse 2s ease-in-out infinite;
}
@keyframes fv9-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.fv9-newsletter-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.2s ease;
}
.fv9-newsletter-input:focus {
  background: rgba(255,255,255,0.05);
  border-color: rgba(200,161,101,0.4);
  outline: none;
}
.fv9-btn {
  background: linear-gradient(135deg, #C8A165, #D4B57A);
  color: #010A1F;
  font-weight: 600;
  transition: opacity 0.2s ease;
  cursor: pointer;
  border: none;
}
.fv9-btn:hover { opacity: 0.9; }
.fv9-col-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #64748b;
  margin-bottom: 1.5rem;
}
.fv9-link {
  color: #94a3b8;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}
.fv9-link:hover { color: #D4B57A; }
.fv9-social {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  display: inline-flex; align-items: center; justify-content: center;
  color: #94a3b8; transition: all 0.2s ease; text-decoration: none;
}
.fv9-social:hover {
  background: rgba(200,161,101,0.1);
  border-color: rgba(200,161,101,0.3);
  color: #C8A165;
  transform: translateY(-2px);
}
.fv9-wordmark {
  font-size: clamp(6rem, 22vw, 22rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 0.85;
  background: linear-gradient(180deg, rgba(248,250,252,0.08) 0%, rgba(200,161,101,0.18) 50%, rgba(1,10,31,0.95) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  user-select: none;
  white-space: nowrap;
  text-align: center;
}
`

export default function FooterV9({ lang = 'en' }) {
  const t = translations[lang] || translations.en

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <footer className="fv9-footer">
        {/* Pre-footer: status + newsletter */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="fv9-status-dot"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">All systems operational</span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#C8A165' }}>{t.liveStats}</p>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
              {t.tagline.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </h3>
            <p className="text-slate-400 max-w-md">{t.newsletter}</p>
          </div>
          <div className="flex flex-col justify-center">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => { e.preventDefault(); e.target.querySelector('button').textContent = 'Subscribed ✓' }}>
              <input type="email" required placeholder="you@company.com"
                className="fv9-newsletter-input flex-grow rounded-lg px-4 py-3.5 text-white placeholder-slate-500 font-mono text-sm" />
              <button type="submit" className="fv9-btn px-6 py-3.5 rounded-lg font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-slate-600 mt-3 font-mono">{t.noSpam}</p>
          </div>
        </div>

        {/* Main columns */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <picture>
                <source srcSet="/logo-caty.webp" type="image/webp" />
                <img src="/logo-caty.png" alt="CatyAI" style={{ width: 30, height: 30, objectFit: 'contain' }} />
              </picture>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f1f5f9' }}>
                Caty<span style={{ color: '#C8A165' }}>AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">{t.desc}</p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com/company/payai-x" className="fv9-social" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://medium.com/@adrianvitan" className="fv9-social" aria-label="Medium" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
              </a>
              <a href="mailto:contact@payai-x.com" className="fv9-social" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="fv9-col-title">{t.product}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/no-website" className="fv9-link">QR-First <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/widget" className="fv9-link">Web Widget <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/fraud-shield" className="fv9-link">FraudAI <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/geo-gateway" className="fv9-link">GEO Gateway <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/google-shopping-feed" className="fv9-link">Google Shopping Feed <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/facebook-instagram-feed" className="fv9-link">Facebook & IG Feed <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/pricing" className="fv9-link">{t.pricing} <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="fv9-col-title">{t.resources}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/blog" className="fv9-link">Blog <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://docs.catyai.io" className="fv9-link" target="_blank" rel="noopener noreferrer">{t.docs} <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://docs.catyai.io/api/overview.html" className="fv9-link" target="_blank" rel="noopener noreferrer">API Reference <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><Link to="/protocol" className="fv9-link">NAP V3 Protocol <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/nap" className="fv9-link">AKL v2 Docs <ArrowUpRight className="w-3 h-3" /></Link></li>
              <li><Link to="/mcp" className="fv9-link">MCP Server <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="fv9-col-title">{t.company}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/contact" className="fv9-link">{t.about} <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/press" className="fv9-link">Press Kit <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/investor-relations" className="fv9-link">Investor Relations <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/contact" className="fv9-link">Contact <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="fv9-col-title">{t.legal}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/privacy" className="fv9-link">Privacy <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/terms" className="fv9-link">{t.terms} <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/gdpr" className="fv9-link">GDPR <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="/licensing" className="fv9-link">Licensing <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="overflow-hidden -mb-4 select-none pointer-events-none">
          <div className="fv9-wordmark">CatyAI</div>
        </div>

        {/* Legal bottom row */}
        <div className="border-t border-white/5 bg-[#010A1F]">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} PayAi-X FZE</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">Built in eu-west-1</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> RO
              </span>
              <span>·</span>
              <span>v3.0.18</span>
              <span>·</span>
              <a href="#" className="hover:text-gold transition-colors flex items-center gap-1.5">
                <span className="fv9-status-dot" style={{ width: '6px', height: '6px' }}></span>
                Status
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
