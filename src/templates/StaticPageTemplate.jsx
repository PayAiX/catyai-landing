import PageLayout from '../components/layout/PageLayout';

/*
 * Generic content page with hero header + children slot.
 * Data shape:
 * {
 *   tag?: string,
 *   h1: string,
 *   sub?: string,
 * }
 */
export default function StaticPageTemplate({ t, children, lang, onLangChange }) {
  return (
    <PageLayout lang={lang} onLangChange={onLangChange}>
      <header className="relative pt-32 pb-16 px-6 border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(200,161,101,0.05) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          {t.tag && (
            <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-4">{t.tag}</p>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-slate-50 tracking-tight mb-4">{t.h1}</h1>
          {t.sub && <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">{t.sub}</p>}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {children}
      </div>
    </PageLayout>
  );
}
