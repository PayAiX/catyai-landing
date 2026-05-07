import { Link } from 'react-router-dom';
import StatusDot from '../ui/StatusDot';
import SocialIcon from '../ui/SocialIcon';

const IconCpu = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);

const IconArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const IconGlobe = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconGithub = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconMail = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconX = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function FooterLink({ to, href, children }) {
  const Component = to ? Link : 'a';
  const props = to ? { to } : { href };
  return (
    <Component {...props} className="footer-link">
      {children}
      <IconArrowUpRight className="w-3 h-3" />
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
              <IconCpu className="text-gold w-5 h-5" />
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
              <IconX className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="https://github.com/PayAiX" label="GitHub">
              <IconGithub className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/company/payai-x" label="LinkedIn">
              <IconLinkedin className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="mailto:contact@payai-x.com" label="Email">
              <IconMail className="w-4 h-4" />
            </SocialIcon>
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
            <li><FooterLink to="/contact">Despre</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink to="/press">Press Kit</FooterLink></li>
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
            <span className="flex items-center gap-1.5"><IconGlobe className="w-3 h-3" /> RO</span>
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
