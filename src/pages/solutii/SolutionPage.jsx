/**
 * Layout comun pentru paginile /solutii/* (EN) și /ro/solutii/* (RO) — 6 oct 2026.
 * Conținutul vine din fiecare pagină (T.en / T.ro); copy-ul RO = documentul Kimi
 * COPY-RO-PAGINI-SOLUTII-COMPARE-2026-10-06 (zero cifre-rezultat, capabilități nu promisiuni).
 * Paginile folosesc layout-ul comun din App.jsx (Header + main + Footer), de aceea pt-24.
 */
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { pageUrl, alternatesFor } from '../../lib/localeUrls'

function PainCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0A1628]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1a2744]/50 hover:border-gold/50 transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function StepCard({ step, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-sm font-bold flex-shrink-0 mt-1">
        {step}
      </div>
      <div>
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#010A1F]/50 rounded-xl border border-[#1a2744]/50">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
    </div>
  )
}

const PRIMARY = 'inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg'
const SECONDARY = 'inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors'

/** Buton secundar: Link intern (to) sau <a> extern/mailto (href). */
function SecondaryCta({ cta }) {
  if (!cta) return null
  if (cta.href) return <a href={cta.href} className={SECONDARY}>{cta.label}</a>
  return <Link to={cta.to} className={SECONDARY}>{cta.label}</Link>
}

export default function SolutionPage({ slug, locale, t, jsonLd }) {
  const lang = locale || 'en'
  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.desc}
        url={pageUrl(`solutii/${slug}`, locale)}
        lang={lang}
        alternates={alternatesFor(`solutii/${slug}`)}
        jsonLd={jsonLd}
      />

      <div className="bg-[#010A1F] min-h-screen pt-24">
        {/* HERO */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm mb-6">
              {t.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.h1Prefix}{' '}
              <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">{t.h1Accent}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">{t.heroLead}</p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">{t.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register" className={PRIMARY}>{t.ctaPrimary}</a>
              <SecondaryCta cta={t.ctaSecondary} />
            </div>
          </div>
        </section>

        {/* PLATFORMS (doar e-commerce) */}
        {t.platforms && (
          <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">{t.platformsLabel}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {t.platforms.map((p) => (
                  <span key={p} className="px-4 py-2 bg-[#0A1628]/50 border border-[#1a2744]/50 rounded-full text-sm text-gray-300 font-medium">{p}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PAIN POINTS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">{t.painsTitle}</h2>
            {t.painsSub && <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">{t.painsSub}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.pains.map((p) => <PainCard key={p.title} icon={p.icon} title={p.title} desc={p.desc} />)}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">{t.stepsTitle}</h2>
            <div className="space-y-8">
              {t.steps.map((s, i) => <StepCard key={s.title} step={String(i + 1)} title={s.title} desc={s.desc} />)}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">{t.featuresTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.features.map((f) => <FeatureItem key={f.text} icon={f.icon} text={f.text} />)}
            </div>
          </div>
        </section>

        {/* RESELLER (doar agenții) */}
        {t.reseller && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 bg-[#0A1628]/50 rounded-2xl border border-gold/30 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h2 className="text-2xl font-bold text-white mb-3">{t.reseller.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{t.reseller.text}</p>
                <a href="mailto:contact@catyai.io?subject=CatyAI Reseller Partnership" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-[#D4B57A] text-[#010A1F] font-bold rounded-xl transition-all">
                  {t.reseller.cta}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a2744]/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">{t.finalTitle}</h2>
            {t.finalSub && <p className="text-gray-400 mb-8">{t.finalSub}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register" className={PRIMARY}>{t.finalPrimary}</a>
              <SecondaryCta cta={t.finalSecondary} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
