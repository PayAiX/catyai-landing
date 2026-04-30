import PageLayout from '../components/layout/PageLayout';
import HeroBadge from '../components/sections/HeroBadge';
import StackingCards from '../components/sections/StackingCards';
import StackCard from '../components/sections/StackCard';
import CardBase from '../components/ui/CardBase';

/*
 * Data shape:
 * {
 *   hero: { badge, h1, sub, cta: { primary, primaryHref, secondary?, secondaryHref? } },
 *   layers: [{ tag, title, body, bullets: string[], metric?: { value, label } }],
 *   partners: { tag, h2, logos: [{ name, src }] },
 *   cta: { h2, sub, primary, primaryHref, secondary?, secondaryHref? }
 * }
 */

function EnterpriseHero({ t }) {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden">
      {/* grid lines ambient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,161,101,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,161,101,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(200,161,101,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <HeroBadge label={t.badge} />
        <h1 className="mt-6 text-5xl md:text-8xl font-black tracking-tight text-slate-50 leading-[0.95] mb-8">
          {t.h1}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">{t.sub}</p>
        <div className="flex flex-wrap gap-4">
          <a href={t.cta.primaryHref} className="btn-primary rounded-xl px-10 py-4 text-base font-semibold">
            {t.cta.primary}
          </a>
          {t.cta.secondary && (
            <a href={t.cta.secondaryHref} className="btn-secondary rounded-xl px-10 py-4 text-base font-semibold">
              {t.cta.secondary}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function EnterpriseLayers({ layers }) {
  return (
    <StackingCards>
      {layers.map((layer, i) => (
        <StackCard key={i} index={i}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="card-tag">{layer.tag}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-5">{layer.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-8">{layer.body}</p>
              <ul className="space-y-3">
                {layer.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(200,161,101,0.15)', border: '1px solid rgba(200,161,101,0.3)' }}
                    >
                      <span className="text-gold text-[10px]">✓</span>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            {layer.metric && (
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl md:text-9xl font-black text-gold leading-none">{layer.metric.value}</div>
                  <div className="text-slate-400 font-mono text-sm mt-3 uppercase tracking-widest">{layer.metric.label}</div>
                </div>
              </div>
            )}
          </div>
        </StackCard>
      ))}
    </StackingCards>
  );
}

function PartnersSection({ t }) {
  if (!t?.logos?.length) return null;
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-2">{t.tag}</p>
          <h2 className="text-2xl font-bold text-slate-50">{t.h2}</h2>
        </div>
        <div className="flex flex-wrap gap-6 items-center justify-center opacity-50">
          {t.logos.map((logo, i) => (
            <div key={i} className="px-6 py-3 ds-card text-slate-400 text-sm font-mono">
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseCtaSection({ t }) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-12 md:p-20 border border-white/8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(10,27,61,0.8) 0%, rgba(1,10,31,0.98) 100%)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(200,161,101,0.06) 0%, transparent 70%)' }}
          />
          <h2 className="relative text-4xl md:text-5xl font-bold text-slate-50 mb-5">{t.h2}</h2>
          <p className="relative text-slate-400 text-lg mb-10 max-w-xl mx-auto">{t.sub}</p>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <a href={t.primaryHref} className="btn-primary rounded-xl px-10 py-4 text-base font-semibold inline-block">
              {t.primary}
            </a>
            {t.secondary && (
              <a href={t.secondaryHref} className="btn-secondary rounded-xl px-10 py-4 text-base font-semibold inline-block">
                {t.secondary}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EnterpriseTemplate({ t, lang, onLangChange }) {
  return (
    <PageLayout lang={lang} onLangChange={onLangChange}>
      <EnterpriseHero t={t.hero} />
      <EnterpriseLayers layers={t.layers} />
      {t.partners && <PartnersSection t={t.partners} />}
      <EnterpriseCtaSection t={t.cta} />
    </PageLayout>
  );
}
