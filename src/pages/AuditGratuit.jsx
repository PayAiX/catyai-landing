import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Mail, Gauge, ListChecks, Wrench } from 'lucide-react'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

// Pagina /audit-gratuit — formular de captare clienți (doar RO, piața țintă).
// Postează la același endpoint public ca homepage-ul, cu caty_source
// 'audit-gratuit' și câmpurile de calificare validate pe server
// (src/api/leads/catalog-audit.js, QUALIFICATION_OPTIONS — valorile de mai jos
// trebuie să rămână identice cu cele de acolo).

const LEADS_API = 'https://api.catyai.io/api/leads/catalog-audit'
// Conversia „Cerere audit gratuit - catyai.io" din Google Ads PayAi-X (722-216-8650),
// singurul obiectiv licitat de campania PMax catyai.io.
const ADS_AUDIT_CONVERSION = 'AW-18223286697/DT4iCI3vsKIdEKmTxfFD'
const CATY_SOURCE = 'audit-gratuit'
const PAGE_URL = 'https://catyai.io/audit-gratuit'

const PLATFORMS = ['GoMag', 'Shopify', 'WooCommerce', 'MerchantPro', 'Altă platformă']
const CHANNELS = [
  { v: 'site', l: 'Site-ul propriu' },
  { v: 'emag', l: 'eMAG' },
  { v: 'trendyol', l: 'Trendyol' },
  { v: 'altele', l: 'Alte canale' },
]
const CATALOG_SIZES = [
  { v: 'sub-500', l: 'Sub 500 de produse' },
  { v: '500-2000', l: '500 – 2.000 de produse' },
  { v: 'peste-2000', l: 'Peste 2.000 de produse' },
]
const MONTHLY_SALES = [
  { v: 'sub-50k', l: 'Sub 50.000 lei / lună' },
  { v: '50k-200k', l: '50.000 – 200.000 lei / lună' },
  { v: 'peste-200k', l: 'Peste 200.000 lei / lună' },
]
const PAIN_POINTS = [
  { v: 'timp-produse', l: 'Nu am timp să urc și să întrețin produsele' },
  { v: 'reclame-fara-rezultat', l: 'Reclamele nu aduc vânzări pe cât costă' },
  { v: 'invizibil-ai-google', l: 'Nu apar în ChatGPT sau în Google Shopping' },
  { v: 'stoc-facturi-canale', l: 'Stocul și facturile pe mai multe canale îmi iau prea mult timp' },
]

const WHAT_YOU_GET = [
  { icon: Gauge, h: 'Scorul catalogului, din 100', p: 'Cât de pregătite sunt produsele tale pentru Google Shopping și pentru asistenții AI (ChatGPT, Gemini, Perplexity).' },
  { icon: ListChecks, h: 'Problemele concrete, cu exemple', p: 'Categorii lipsă, coduri de bare greșite sau duplicate, date structurate invalide, fișierul pentru AI — fiecare cu produsele afectate.' },
  { icon: Wrench, h: 'Ce se poate repara și cât durează', p: 'Ce reparăm automat, ce ne trebuie de la tine și ce impact are asupra vânzărilor.' },
]

const STEPS = [
  'Completezi formularul (sub un minut).',
  'Analizăm feedul, paginile de produs și vizibilitatea în AI.',
  'Primești rezultatul pe email în maximum 24 de ore lucrătoare.',
]

export default function AuditGratuit() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState('ro')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SEO
        title="Audit gratuit al magazinului online — CatyAI"
        description="Află de ce ChatGPT și Google nu îți recomandă produsele. Audit gratuit al catalogului: scor din 100, problemele concrete și ce se poate repara. Rezultatul în 24 de ore."
        url={PAGE_URL}
        lang="ro"
      />
      <Helmet>
        <html lang="ro" />
      </Helmet>

      <div className="min-h-screen bg-navy text-slate-200 font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>
          <section aria-labelledby="audit-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold mb-4">AUDIT GRATUIT · MAGAZINE ONLINE</p>
              <h1 id="audit-heading" className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-white">
                De ce ChatGPT și Google <span className="text-gold">nu îți recomandă produsele?</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Îți analizăm gratuit catalogul și îți arătăm exact ce te ține departe de clienții care caută pe Google Shopping și în asistenții AI.
              </p>

              <ul className="space-y-6 mb-12">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item.h} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl border border-gold/40 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-white mb-1">{item.h}</h2>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.p}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-navy-lighter bg-navy-light p-6">
                <h2 className="text-xs tracking-[0.2em] text-slate-500 mb-4">CUM FUNCȚIONEAZĂ</h2>
                <ol className="space-y-3">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-slate-300">
                      <span className="text-gold font-bold">{i + 1}.</span>{s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <AuditForm />
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}

function AuditForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  // UTM captate leneș la montare (același pattern ca LeadForm din HomePage).
  const [utm] = useState(() => {
    if (typeof window === 'undefined') return {}
    const q = new URLSearchParams(window.location.search)
    const captured = {}
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (q.get(k)) captured[k] = q.get(k)
    }
    return captured
  })

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      site_url: form.get('site_url'),
      platform: form.get('platform'),
      channels: form.getAll('channels'),
      catalog_size: form.get('catalog_size'),
      monthly_sales: form.get('monthly_sales'),
      pain_points: form.getAll('pain_points'),
      gdpr_consent: form.get('gdpr_consent') === 'on',
      company_website: form.get('company_website'),
      ...utm,
      caty_source: CATY_SOURCE,
    }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch(LEADS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.success) {
        setStatus('done')
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: CATY_SOURCE })
          window.gtag('event', 'conversion', { send_to: ADS_AUDIT_CONVERSION, value: 1, currency: 'RON' })
        }
      } else {
        setStatus('error')
        setError(body.error === 'rate_limited'
          ? 'Prea multe trimiteri de pe această adresă. Încearcă din nou peste o oră.'
          : (body.error || 'Nu am putut trimite formularul. Scrie-ne la contact@catyai.io.'))
      }
    } catch (err) {
      console.error('[AuditGratuit] submit failed', { message: err.message })
      setStatus('error')
      setError('Problemă de conexiune. Verifică internetul și încearcă din nou.')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-gold/40 bg-navy-light p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="text-xl font-bold mb-3 text-white">Am primit cererea</h2>
        <p className="text-slate-400 leading-relaxed">Îți analizăm magazinul și îți trimitem rezultatul pe email în maximum 24 de ore lucrătoare.</p>
      </div>
    )
  }

  const inputCls = 'w-full rounded-xl border border-navy-lighter bg-navy px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/40 transition-colors'
  const labelCls = 'block text-sm font-medium text-slate-300 mb-2'
  const legendCls = 'text-sm font-medium text-slate-300 mb-3'
  const choiceCls = 'flex items-start gap-3 rounded-lg border border-navy-lighter px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:border-gold/40 has-[:checked]:border-gold/70 has-[:checked]:bg-gold/5 transition-colors'

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-navy-lighter bg-navy-light p-6 sm:p-8 space-y-7" noValidate={false}>
      <div>
        <label htmlFor="af-site" className={labelCls}>Adresa magazinului *</label>
        <input id="af-site" name="site_url" type="url" required placeholder="https://magazinul-tau.ro" autoComplete="url" className={inputCls} />
      </div>

      <div>
        <label htmlFor="af-platform" className={labelCls}>Platforma magazinului *</label>
        <select id="af-platform" name="platform" required defaultValue="" className={inputCls}>
          <option value="" disabled>Alege platforma</option>
          {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <fieldset>
        <legend className={legendCls}>Unde vinzi acum?</legend>
        <div className="grid sm:grid-cols-2 gap-2">
          {CHANNELS.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="checkbox" name="channels" value={c.v} className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Câte produse ai?</legend>
        <div className="grid gap-2">
          {CATALOG_SIZES.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="radio" name="catalog_size" value={c.v} className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Cât vinzi pe lună, aproximativ?</legend>
        <div className="grid gap-2">
          {MONTHLY_SALES.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="radio" name="monthly_sales" value={c.v} className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Ce te încurcă cel mai tare?</legend>
        <div className="grid gap-2">
          {PAIN_POINTS.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="checkbox" name="pain_points" value={c.v} className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label htmlFor="af-name" className={labelCls}>Numele tău *</label>
          <input id="af-name" name="name" type="text" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="af-email" className={labelCls}>Email *</label>
          <input id="af-email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </div>
        <div>
          <label htmlFor="af-phone" className={labelCls}>Telefon</label>
          <input id="af-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </div>
      </div>

      {/* Honeypot — invizibil pentru oameni; completat doar de boți (serverul îl ignoră silențios). */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="af-company-website">Nu completa acest câmp</label>
        <input id="af-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed cursor-pointer">
        <input type="checkbox" name="gdpr_consent" required className="mt-0.5 accent-[#C8A165]" />
        <span>Sunt de acord să fiu contactat de CatyAI (PayAi-X S.R.L.) despre rezultatul auditului. Datele nu sunt transmise terților. <a href="/gdpr" className="text-gold underline underline-offset-2">Politica GDPR</a></span>
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">{error}</p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-60">
        {status === 'sending' ? 'Se trimite…' : 'Vreau auditul gratuit'}
      </button>
      <p className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
        <Mail className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        Fără obligații. Rezultatul îl primești pe email.
      </p>
    </form>
  )
}
