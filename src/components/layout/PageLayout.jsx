import TaithonNav from './TaithonNav';
import ExposedFooter from './ExposedFooter';

/**
 * Standard page wrapper. Wrap every route with this:
 *   <PageLayout><MyPageContent /></PageLayout>
 *
 * Templates (HomePageTemplate, ProductPageTemplate, etc.) use this internally.
 * Body has bg-navy + ambient gradient applied globally via design-tokens (no per-page overhead).
 */
export default function PageLayout({ children, lang, onLangChange }) {
  return (
    <>
      <TaithonNav lang={lang} onLangChange={onLangChange} />
      <main className="min-h-screen overflow-x-hidden bg-navy text-slate-200">
        {children}
      </main>
      <ExposedFooter />
    </>
  );
}
