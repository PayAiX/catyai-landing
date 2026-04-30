import { Link } from 'react-router-dom';
import { Cpu, Github, Linkedin, Mail, ArrowUpRight, Globe } from 'lucide-react';
import StatusDot from '../ui/StatusDot';
import SocialIcon from '../ui/SocialIcon';

/**
 * Exposed footer (Taithon style) — newsletter + 5 columns + oversized wordmark + legal strip.
 * Newsletter form is a stub — POST endpoint wired in PR #6 (corporate).
 */
function FooterLink({ to, href, children }) {
  const Component = to ? Link : 'a';
  const props = to ? { to } : { href };
  return (
    <Component {...props} className="footer-link">
      {children}
      <ArrowUpRight className="w-3 h-3" />
    </Component>
  );
}

export default function ExposedFooter() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/5">
      {/* Pre-footer: status + newsletter */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <StatusDot />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">All systems operational</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
            GEO intel săptămânal,<br />înainte de concurență.
          </h3>
          <p className="text-slate-400 max-w-md">
            Update-uri lunare despre AI search, comportament LLM, protocol CatyAI. Fără spam.
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const btn = e.currentTarget.querySelector('button');
              if (btn) btn.textContent = 'Subscribed ✓';
            }}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="newsletter-input flex-grow rounded-lg px-4 py-3.5 text-white placeholder-slate-500 font-mono text-sm"
            />
            <button type="submit" className="btn-primary px-6 py-3.5 rounded-lg font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-slate-600 mt-3 font-mono">
            No spam · GDPR compliant · Unsubscribe oricând
          </p>
        </div>
      </div>

      {/* 5-column grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gold/10 rounded border border-gold/30 flex items-center justify-center">
              <Cpu className="text-gold w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-lg text-white">
              Caty<span className="text-gold">AI</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
            Infrastructura neurală pentru AI internet. Ne asigurăm că GPTBot, ClaudeBot și Perplexity te recomandă.
          </p>
          <div className="flex items-center gap-3">
            <SocialIcon href="https://x.com/catyai" label="X / Twitter">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </SocialIcon>
            <SocialIcon href="https://github.com/PayAiX" label="GitHub"><Github className="w-4 h-4" /></SocialIcon>
            <SocialIcon href="https://linkedin.com/company/payai-x" label="LinkedIn"><Linkedin className="w-4 h-4" /></SocialIcon>
            <SocialIcon href="mailto:contact@payai-x.com" label="Email"><Mail className="w-4 h-4" /></SocialIcon>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="footer-col-title">Produs</h4>
          <ul className="space-y-3 text-sm">
            <li><FooterLink to="/widget">Widget Chat</FooterLink></li>
            <li><FooterLink to="/whatsapp">WhatsApp Secretary</FooterLink></li>
            <li><FooterLink to="/fraud-shield">FraudAI Shield</FooterLink></li>
            <li><FooterLink to="/geo-gateway">GEO Gateway</FooterLink></li>
            <li><FooterLink to="/pricing">Prețuri</FooterLink></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="footer-col-title">Resurse</h4>
          <ul className="space-y-3 text-sm">
            <li><FooterLink href="https://docs.catyai.io">Documentație</FooterLink></li>
            <li><FooterLink to="/features">Features</FooterLink></li>
            <li><FooterLink to="/blog">Blog</FooterLink></li>
            <li><FooterLink to="/analyze">Site Analyzer</FooterLink></li>
            <li><FooterLink to="/infrastructura">Infrastructură</FooterLink></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="footer-col-title">Companie</h4>
          <ul className="space-y-3 text-sm">
            <li><FooterLink to="/about">Despre</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink href="mailto:press@payai-x.com">Press Kit</FooterLink></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="footer-col-title">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><FooterLink to="/privacy">Privacy</FooterLink></li>
            <li><FooterLink to="/terms">Termeni</FooterLink></li>
            <li><FooterLink to="/gdpr">GDPR</FooterLink></li>
            <li><FooterLink to="/licensing">Licensing</FooterLink></li>
          </ul>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="overflow-hidden -mb-4 select-none pointer-events-none">
        <div className="footer-wordmark text-center px-6">CatyAI</div>
      </div>

      {/* Legal bottom strip */}
      <div className="border-t border-white/5 relative z-10 bg-navy">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-4">
            <span>© 2026 PayAi-X FZE</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Built in eu-west-1</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> RO</span>
            <span>·</span>
            <span>v3.0.18</span>
            <span>·</span>
            <a href="https://status.catyai.io" className="hover:text-gold transition-colors flex items-center gap-1.5">
              <StatusDot size={6} />
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
