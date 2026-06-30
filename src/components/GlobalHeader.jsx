import { useState, useEffect, useRef } from 'react';

const LANG_OPTIONS = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

const NAV_ITEMS = [
  {
    label: 'Platform',
    items: [
      { label: 'GEO Gateway', desc: 'AI-native geographic routing', href: '/geo-gateway', icon: 'globe-2' },
      { label: 'Neural Node', desc: 'LLM visibility protocol', href: '/protocol', icon: 'cpu' },
      { label: 'FraudAI Shield', desc: 'Anti-phishing & scam detection', href: '/fraud-shield', icon: 'shield-check' },
      { label: 'Zero-Trust AI Ads', desc: 'Cryptographic ad verification', href: '/research/zero-trust-ai-ads-en', icon: 'fingerprint' },
      { label: 'Agentic Marketplace', desc: 'AI-to-AI verified commerce', href: '/agentic-marketplace', icon: 'store' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'Healthcare', desc: 'GDPR-compliant AI for clinics', href: '/healthcare', icon: 'heart-pulse' },
      { label: 'Enterprise', desc: 'SOC2-ready deployments', href: '/enterprise', icon: 'building-2' },
      { label: 'E-commerce', desc: 'AI-powered storefront', href: '/ecommerce', icon: 'shopping-bag' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { label: 'White-Label Program', desc: 'Deploy CatyAI under your brand', href: '/white-label', icon: 'layers' },
      { label: 'Agency Network', desc: 'Certified reseller tiers', href: '/agency-network', icon: 'network' },
      { label: 'Technology Partners', desc: 'API & integration ecosystem', href: '/technology-partners', icon: 'plug' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', desc: 'PayAi-X FZE · Dubai, UAE', href: '/company', icon: 'info' },
      { label: 'Trust Center', desc: 'Security, SLA & compliance docs', href: '/trust-center', icon: 'lock' },
      { label: 'Investor Relations', desc: 'C-Corp structure & deck', href: '/investor-relations', icon: 'bar-chart-2' },
      { label: 'Legal', desc: 'Terms, privacy & licensing', href: '/licensing', icon: 'file-text' },
    ],
  },
];

function DropdownMenu({ items, visible }) {
  return (
    <div
      className="gh-dropdown"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {items.map((item) => (
        <a key={item.label} href={item.href} className="gh-dropdown-item">
          <span className="gh-dropdown-icon">
            <i data-lucide={item.icon} className="w-4 h-4" />
          </span>
          <span>
            <span className="gh-dropdown-label">{item.label}</span>
            <span className="gh-dropdown-desc">{item.desc}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

function LangSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANG_OPTIONS.find((o) => o.code === lang) || LANG_OPTIONS[0];

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="gh-lang-btn"
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span className="text-xs font-mono">{current.label}</span>
        <i data-lucide="chevron-down" className="w-3 h-3 opacity-50" />
      </button>
      {open && (
        <div className="gh-lang-menu">
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                setLang(opt.code);
                localStorage.setItem('caty-lang', opt.code);
                setOpen(false);
              }}
              className={`gh-lang-option ${lang === opt.code ? 'gh-lang-active' : ''}`}
            >
              <span>{opt.flag}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GlobalHeader({ lang, setLang }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  function handleMouseEnter(label) {
    clearTimeout(hoverTimeout.current);
    setActiveMenu(label);
  }

  function handleMouseLeave() {
    hoverTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  }

  return (
    <>
      <style>{`
        .gh-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .gh-root.gh-scrolled {
          background: rgba(1, 10, 31, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 1px 40px rgba(0,0,0,0.4);
        }
        .gh-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .gh-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .gh-logo-text {
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .gh-logo-accent { color: #C8A165; }

        /* ---- Desktop nav ---- */
        .gh-nav {
          display: none;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }
        @media (min-width: 900px) { .gh-nav { display: flex; } }

        .gh-nav-item {
          position: relative;
        }
        .gh-nav-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(148,163,184,1);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .gh-nav-btn:hover, .gh-nav-btn.active {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }
        .gh-nav-link {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(148,163,184,1);
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .gh-nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
        }

        /* ---- Dropdown ---- */
        .gh-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform-origin: top center;
          transform: translateX(-50%) translateY(-6px);
          min-width: 260px;
          background: rgba(4, 14, 40, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,161,101,0.06);
          transition: opacity 0.18s cubic-bezier(0.16,1,0.3,1), transform 0.18s cubic-bezier(0.16,1,0.3,1);
          z-index: 100;
        }
        /* Override transform when visible (JS sets inline translateY(0)) */
        .gh-dropdown[style*="translateY(0)"] {
          transform: translateX(-50%) translateY(0) !important;
        }
        .gh-dropdown-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .gh-dropdown-item:hover { background: rgba(255,255,255,0.06); }
        .gh-dropdown-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8A165;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .gh-dropdown-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #f1f5f9;
          line-height: 1.3;
        }
        .gh-dropdown-desc {
          display: block;
          font-size: 0.75rem;
          color: rgba(148,163,184,0.7);
          margin-top: 2px;
          line-height: 1.4;
        }

        /* ---- Actions ---- */
        .gh-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .gh-login {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(148,163,184,1);
          text-decoration: none;
          transition: color 0.15s;
          display: none;
        }
        @media (min-width: 900px) { .gh-login { display: block; } }
        .gh-login:hover { color: #fff; }

        .gh-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          background: #C8A165;
          color: #080f21;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 0 0 0 rgba(200,161,101,0);
          white-space: nowrap;
        }
        .gh-cta:hover {
          background: #d4af7a;
          box-shadow: 0 0 24px rgba(200,161,101,0.45), 0 4px 12px rgba(0,0,0,0.3);
          transform: translateY(-1px);
        }
        .gh-cta:active { transform: translateY(0); }

        /* ---- Lang ---- */
        .gh-lang-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 8px;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(148,163,184,1);
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
          font-size: 0.75rem;
        }
        .gh-lang-btn:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
        .gh-lang-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          background: rgba(4,14,40,0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 4px;
          min-width: 90px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          z-index: 200;
        }
        .gh-lang-option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 7px 10px;
          border-radius: 7px;
          font-size: 0.75rem;
          font-weight: 500;
          background: transparent;
          border: none;
          color: rgba(148,163,184,1);
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
          text-align: left;
        }
        .gh-lang-option:hover { background: rgba(255,255,255,0.07); color: #fff; }
        .gh-lang-active { color: #C8A165 !important; }

        /* ---- Hamburger ---- */
        .gh-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 36px;
          height: 36px;
          gap: 5px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          cursor: pointer;
          padding: 0;
          transition: border-color 0.15s;
        }
        @media (min-width: 900px) { .gh-hamburger { display: none; } }
        .gh-hamburger:hover { border-color: rgba(255,255,255,0.3); }
        .gh-hamburger span {
          display: block;
          width: 16px;
          height: 1.5px;
          background: rgba(148,163,184,1);
          border-radius: 2px;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s;
        }
        .gh-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .gh-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .gh-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ---- Mobile overlay ---- */
        .gh-mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(1, 8, 26, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          padding: 80px 28px 40px;
          overflow-y: auto;
          transition: opacity 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .gh-mobile-overlay.entering { opacity: 0; }
        .gh-mobile-overlay.visible { opacity: 1; }

        .gh-mobile-group { margin-bottom: 8px; }
        .gh-mobile-group-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 0;
          font-size: 1.375rem;
          font-weight: 600;
          color: rgba(248,250,252,0.9);
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          letter-spacing: -0.02em;
          text-align: left;
        }
        .gh-mobile-group-btn .chevron {
          transition: transform 0.2s;
          color: rgba(148,163,184,0.5);
        }
        .gh-mobile-group-btn.expanded .chevron { transform: rotate(180deg); }
        .gh-mobile-subitems {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .gh-mobile-subitems.open { max-height: 400px; }
        .gh-mobile-subitem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0 12px 4px;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .gh-mobile-subitem-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C8A165;
          flex-shrink: 0;
        }
        .gh-mobile-subitem-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(241,245,249,0.85);
        }
        .gh-mobile-subitem-desc {
          font-size: 0.75rem;
          color: rgba(148,163,184,0.6);
          margin-top: 1px;
        }
        .gh-mobile-pricing {
          display: block;
          padding: 14px 0;
          font-size: 1.375rem;
          font-weight: 600;
          color: rgba(248,250,252,0.9);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          letter-spacing: -0.02em;
        }
        .gh-mobile-bottom {
          margin-top: auto;
          padding-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .gh-mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          background: #C8A165;
          color: #080f21;
          text-decoration: none;
          letter-spacing: -0.01em;
        }
        .gh-mobile-login {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(148,163,184,0.8);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .gh-mobile-lang {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .gh-mobile-lang-btn {
          padding: 6px 12px;
          border-radius: 7px;
          font-size: 0.75rem;
          font-weight: 500;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(148,163,184,0.8);
          cursor: pointer;
          transition: all 0.15s;
        }
        .gh-mobile-lang-btn.active { color: #C8A165; border-color: rgba(200,161,101,0.4); background: rgba(200,161,101,0.08); }
      `}</style>

      <header className={`gh-root${scrolled ? ' gh-scrolled' : ''}`}>
        <div className="gh-inner">
          {/* Logo */}
          <a href="/" className="gh-logo">
            <img src="/logo-caty.png" alt="CatyAI" style={{ width: 30, height: 30, objectFit: 'contain' }} />
            <span className="gh-logo-text">Caty<span className="gh-logo-accent">AI</span></span>
          </a>

          {/* Desktop nav */}
          <nav className="gh-nav">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="gh-nav-item"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`gh-nav-btn${activeMenu === item.label ? ' active' : ''}`}>
                  {item.label}
                  <i data-lucide="chevron-down" className="w-3 h-3 opacity-50" />
                </button>
                <DropdownMenu items={item.items} visible={activeMenu === item.label} />
              </div>
            ))}
            <a href="/pricing" className="gh-nav-link">Pricing</a>
          </nav>

          {/* Actions */}
          <div className="gh-actions">
            <LangSelector lang={lang} setLang={setLang} />
            <a href="https://app.catyai.io/login" className="gh-login">Log in</a>
            <a href="#hero" className="gh-cta" onClick={(e) => { e.preventDefault(); document.querySelector('#hero input')?.focus(); }}>
              <i data-lucide="scan-search" className="w-4 h-4" />
              Run Diagnostics
            </a>
            {/* Hamburger */}
            <button
              className={`gh-hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className={`gh-mobile-overlay visible`}>
          {NAV_ITEMS.map((group) => (
            <div key={group.label} className="gh-mobile-group">
              <button
                className={`gh-mobile-group-btn${mobileExpanded === group.label ? ' expanded' : ''}`}
                onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
              >
                {group.label}
                <i data-lucide="chevron-down" className="w-5 h-5 chevron" />
              </button>
              <div className={`gh-mobile-subitems${mobileExpanded === group.label ? ' open' : ''}`}>
                {group.items.map((item) => (
                  <a key={item.label} href={item.href} className="gh-mobile-subitem" onClick={() => setMobileOpen(false)}>
                    <span className="gh-mobile-subitem-icon">
                      <i data-lucide={item.icon} className="w-3.5 h-3.5" />
                    </span>
                    <span>
                      <span className="gh-mobile-subitem-label">{item.label}</span>
                      <span className="gh-mobile-subitem-desc">{item.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
          <a href="/pricing" className="gh-mobile-pricing" onClick={() => setMobileOpen(false)}>Pricing</a>

          <div className="gh-mobile-bottom">
            <a href="#hero" className="gh-mobile-cta" onClick={(e) => { e.preventDefault(); setMobileOpen(false); setTimeout(() => document.querySelector('#hero input')?.focus(), 300); }}>
              <i data-lucide="scan-search" className="w-5 h-5" />
              Run Diagnostics
            </a>
            <a href="https://app.catyai.io/login" className="gh-mobile-login" onClick={() => setMobileOpen(false)}>Log in</a>
            <div className="gh-mobile-lang">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  className={`gh-mobile-lang-btn${lang === opt.code ? ' active' : ''}`}
                  onClick={() => { setLang(opt.code); localStorage.setItem('caty-lang', opt.code); }}
                >
                  {opt.flag} {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
