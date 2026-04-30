import { Link } from 'react-router-dom';

const IconCpu = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);

const IconZap = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function TaithonNav({ lang = 'RO', onLangChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold/10 rounded border border-gold/30 flex items-center justify-center">
            <IconCpu className="text-gold w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-white">
            Caty<span className="text-gold">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-slate-400 font-medium">
          <Link to="/features" className="hover:text-white transition-colors">Soluții</Link>
          <a href="/#cum" className="hover:text-white transition-colors">Cum funcționează</a>
          <Link to="/#industrii" className="hover:text-white transition-colors">Industrii</Link>
          <Link to="/pricing" className="hover:text-white transition-colors">Prețuri</Link>
          <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>

          <span className="h-4 w-px bg-white/10" />
          <Link to="/geo-gateway" className="group flex items-center gap-1.5 text-slate-500 hover:text-gold transition-colors">
            <IconZap className="w-3.5 h-3.5" />
            <span>Enterprise</span>
            <IconArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium">
          <select
            value={lang}
            onChange={(e) => onLangChange?.(e.target.value)}
            className="bg-transparent border border-white/10 text-slate-400 rounded-md px-2 py-1 text-xs cursor-pointer hover:border-white/20"
          >
            <option value="RO">RO</option>
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="PT">PT</option>
            <option value="FR">FR</option>
          </select>
          <a href="https://app.catyai.io/login" className="text-slate-400 hover:text-white transition-colors hidden md:block">Login</a>
          <a href="https://app.catyai.io/signup" className="btn-primary px-4 py-2 rounded-md font-semibold whitespace-nowrap">
            Începe gratuit
          </a>
        </div>
      </div>
    </nav>
  );
}
