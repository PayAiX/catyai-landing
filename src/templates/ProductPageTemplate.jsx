import PageLayout from '../components/layout/PageLayout';
import HeroBadge from '../components/sections/HeroBadge';
import CardBase from '../components/ui/CardBase';
import CodeBlock from '../components/ui/CodeBlock';
import StatusDot from '../components/ui/StatusDot';

/*
 * Data shape expected by t:
 * {
 *   badge, h1, sub, cta: { primary, primaryHref, secondary, secondaryHref },
 *   features: { tag, h2, items: [{ icon, title, desc }] },
 *   useCases: { tag, h2, items: [{ title, body, snippet }] },
 *   faqs: { tag, h2, items: [{ q, a }] },
 *   finalCta: { h2, sub, primary, primaryHref }
 * }
 */

function ProductHero({ t }) {
  return (
    <section className="relative min-h-[80vh] flex items-center px-6 pt-28 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <HeroBadge label={t.badge} />
        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight text-slate-50 leading-[1.05] mb-6">
          {t.h1}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">{t.sub}</p>
        <div className="flex flex-wrap gap-4">
          <a href={t.cta.primaryHref} className="btn-primary rounded-xl px-8 py-3 text-sm font-semibold">
            {t.cta.primary}
          </a>
          {t.cta.secondary && (
            <a href={t.cta.secondaryHref} className="btn-secondary rounded-xl px-8 py-3 text-sm font-semibold">
              {t.cta.secondary}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.h2}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, i) => (
            <CardBase key={i} className="p-7 flex flex-col gap-3">
              <div className="text-2xl">{item.icon}</div>
              <h3 className="text-base font-semibold text-slate-50">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ t }) {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.h2}</h2>
        </div>
        <div className="space-y-8">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-white/6 p-8"
              style={{ background: 'rgba(10,27,61,0.35)' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <StatusDot />
                  <span className="font-mono text-xs text-gold/70 uppercase tracking-widest">{`case_${String(i + 1).padStart(2, '0')}`}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
              </div>
              {item.snippet && (
                <CodeBlock lang="json">
                  <pre>{item.snippet}</pre>
                </CodeBlock>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductFaqSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.h2}</h2>
        </div>
        <div className="space-y-3">
          {t.items.map((item, i) => (
            <details key={i} className="ds-card group">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none text-slate-200 font-medium text-sm">
                {item.q}
                <span className="text-gold transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductFinalCta({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-50 mb-4">{t.h2}</h2>
        <p className="text-slate-400 mb-8">{t.sub}</p>
        <a href={t.primaryHref} className="btn-primary rounded-xl px-8 py-3 text-sm font-semibold inline-block">
          {t.primary}
        </a>
      </div>
    </section>
  );
}

export default function ProductPageTemplate({ t, lang, onLangChange }) {
  return (
    <PageLayout lang={lang} onLangChange={onLangChange}>
      <ProductHero t={t} />
      <FeaturesSection t={t.features} />
      <UseCasesSection t={t.useCases} />
      <ProductFaqSection t={t.faqs} />
      <ProductFinalCta t={t.finalCta} />
    </PageLayout>
  );
}
