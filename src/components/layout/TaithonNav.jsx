import { Link } from 'react-router-dom';
import { Cpu, Zap, ArrowUpRight } from 'lucide-react';

/**
 * Sales-focused nav for IMM RO + separated Enterprise link to /geo-gateway.
 * Lang switcher kept simple (controlled component — pass `lang` and `onLangChange` from parent i18n context).
 */
export default function TaithonNav({ lang = 'RO', onLangChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold/10 rounded border border-gold/30 flex items-center justify-center">
            <Cpu className="text-gold w-5 h-5" />
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

          {/* Separator + Enterprise link */}
          <span className="h-4 w-px bg-white/10" />
          <Link to="/geo-gateway" className="group flex items-center gap-1.5 text-slate-500 hover:text-gold transition-colors">
            <Zap className="w-3.5 h-3.5" />
            <span>Enterprise</span>
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
