import { useState, useRef } from 'react';
import PageLayout from '../components/layout/PageLayout';
import HeroBadge from '../components/sections/HeroBadge';
import MarqueeCrawlers from '../components/sections/MarqueeCrawlers';
import StackingCards from '../components/sections/StackingCards';
import StackCard from '../components/sections/StackCard';
import CardBase from '../components/ui/CardBase';
import StatusDot from '../components/ui/StatusDot';

/* ─── HERO ──────────────────────────────────────────── */
function HeroSection({ t }) {
  const [state, setState] = useState('idle'); // idle | loading | result
  const [domain, setDomain] = useState('');
  const inputRef = useRef(null);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setState('loading');
    setTimeout(() => setState('result'), 2200);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      {/* ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,161,101,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl w-full text-center">
        <HeroBadge label={t.hero.badge} />

        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight text-slate-50 leading-[1.05]">
          {t.hero.h1[0]}{' '}
          <span className="text-gold">{t.hero.h1[1]}</span>
          {t.hero.h1[2] && <><br />{t.hero.h1[2]}</>}
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t.hero.sub}
        </p>

        {/* diagnostic form */}
        <form onSubmit={handleAudit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder={t.hero.placeholder}
            className="newsletter-input flex-1 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500"
          />
          <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold">
            {t.hero.cta}
          </button>
        </form>

        {/* loading bar */}
        {state === 'loading' && (
          <div className="mt-6 relative h-1 rounded-full overflow-hidden bg-navy-800 max-w-lg mx-auto">
            <div
              className="absolute top-0 h-full w-1/3 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #C8A165, transparent)',
                animation: 'ds-loading 1.2s ease-in-out infinite',
              }}
            />
          </div>
        )}

        {/* result card */}
        {state === 'result' && (
          <div className="mt-6 ds-card p-4 text-left max-w-lg mx-auto flex items-start gap-3">
            <StatusDot />
            <div>
              <p className="text-sm font-semibold text-gold">{t.hero.resultTitle}</p>
              <p className="text-xs text-slate-400 mt-0.5">{domain} — {t.hero.resultSub}</p>
            </div>
          </div>
        )}
      </div>

      {/* trust strip */}
      <div className="relative z-10 mt-16 flex items-center gap-3 text-xs text-slate-500">
        <StatusDot />
        <span>{t.hero.trust}</span>
      </div>
    </section>
  );
}

/* ─── PRODUCTS ──────────────────────────────────────── */
function ProductsSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.products.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.products.h2}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.products.items.map((item, i) => (
            <CardBase key={i} className="p-8 flex flex-col gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <div className="card-tag">{item.tag}</div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">{item.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
              <a
                href={item.href}
                className="mt-auto inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors"
              >
                {item.cta} <span aria-hidden>→</span>
              </a>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ──────────────────────────────────── */
function HowItWorksSection({ t }) {
  const cards = t.howItWorks.cards;
  return (
    <StackingCards>
      {cards.map((card, i) => (
        <StackCard key={i} index={i}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="card-tag">{card.tag}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">{card.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{card.body}</p>
              <ul className="space-y-2">
                {card.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-gold mt-0.5">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="code-block w-full">
                <pre>{card.snippet}</pre>
              </div>
            </div>
          </div>
        </StackCard>
      ))}
    </StackingCards>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────── */
function TestimonialsSection({ t }) {
  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-gold/60">{t.testimonials.tag}</p>
      </div>
      <div className="relative overflow-hidden">
        <MarqueeCrawlers items={t.testimonials.items} />
      </div>
    </section>
  );
}

/* ─── INDUSTRIES ────────────────────────────────────── */
function IndustriesSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.industries.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.industries.h2}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.industries.items.map((item, i) => (
            <CardBase key={i} className="p-6 flex flex-col items-center text-center gap-3">
              <span className="text-4xl">{item.icon}</span>
              <span className="text-sm font-medium text-slate-300">{item.label}</span>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────── */
function FaqSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.faq.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.faq.h2}</h2>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <details
              key={i}
              className="ds-card group"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none text-slate-200 font-medium text-sm">
                {item.q}
                <span className="text-gold transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─────────────────────────────────────── */
function FinalCtaSection({ t }) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="rounded-3xl p-12 border border-white/8"
          style={{ background: 'linear-gradient(180deg, rgba(10,27,61,0.7) 0%, rgba(1,10,31,0.95) 100%)' }}
        >
          <HeroBadge label={t.finalCta.badge} />
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-50 mt-4 mb-4">{t.finalCta.h2}</h2>
          <p className="text-slate-400 mb-8">{t.finalCta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={t.finalCta.primaryHref} className="btn-primary rounded-xl px-8 py-3 text-sm font-semibold inline-block">
              {t.finalCta.primary}
            </a>
            <a href={t.finalCta.secondaryHref} className="btn-secondary rounded-xl px-8 py-3 text-sm font-semibold inline-block">
              {t.finalCta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TEMPLATE ──────────────────────────────────────── */
export default function HomePageTemplate({ t, lang, onLangChange }) {
  return (
    <PageLayout lang={lang} onLangChange={onLangChange}>
      <HeroSection t={t} />
      <MarqueeCrawlers items={t.marquee} className="py-8 border-y border-white/5" />
      <ProductsSection t={t} />
      <HowItWorksSection t={t} />
      <TestimonialsSection t={t} />
      <IndustriesSection t={t} />
      <FaqSection t={t} />
      <FinalCtaSection t={t} />
    </PageLayout>
  );
}
