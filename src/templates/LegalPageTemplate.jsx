import PageLayout from '../components/layout/PageLayout';

/*
 * Prose article layout for legal/policy pages.
 * Data shape:
 * {
 *   h1: string,
 *   lastUpdated?: string,  // ISO date string
 * }
 * children: raw JSX or markdown-rendered HTML
 */
export default function LegalPageTemplate({ t, children, lang, onLangChange }) {
  return (
    <PageLayout lang={lang} onLangChange={onLangChange}>
      <header className="pt-32 pb-10 px-6 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-4">Legal</p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-50 mb-3">{t.h1}</h1>
          {t.lastUpdated && (
            <p className="text-xs text-slate-500">
              Last updated:{' '}
              <time dateTime={t.lastUpdated}>
                {new Date(t.lastUpdated).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </p>
          )}
        </div>
      </header>

      <article
        className="max-w-3xl mx-auto px-6 py-14 prose prose-invert prose-sm prose-p:text-slate-400 prose-headings:text-slate-50 prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-200 prose-li:text-slate-400"
      >
        {children}
      </article>
    </PageLayout>
  );
}
