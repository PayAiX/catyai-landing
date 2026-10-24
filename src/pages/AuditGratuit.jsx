import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Mail, MessageCircle, Gauge, ListChecks, Wrench, ArrowRight, ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

// Pagina /audit-gratuit — formular de captare clienți (doar RO, piața țintă).
// Postează la același endpoint public ca homepage-ul, cu caty_source
// 'audit-gratuit' și câmpurile de calificare validate pe server
// (src/api/leads/catalog-audit.js, QUALIFICATION_OPTIONS — valorile de mai jos
// trebuie să rămână identice cu cele de acolo).
//
// Conversie (propunerea 1, diagnostic 24.10): formular în 2 pași —
// pasul 1 cere DOAR site + email + GDPR; pasul 2 (nume, telefon, platformă,
// calificare) e opțional. Serverul acceptă payload minimal pentru
// caty_source 'audit-gratuit' (name/platform cad pe store/'Nespecificat').

const LEADS_API = 'https://api.catyai.io/api/leads/catalog-audit'
// Conversia „Cerere audit gratuit - catyai.io" din Google Ads PayAi-X (722-216-8650),
// singurul obiectiv licitat de campania PMax catyai.io.
const ADS_AUDIT_CONVERSION = 'AW-18223286697/DT4iCI3vsKIdEKmTxfFD'
const CATY_SOURCE = 'audit-gratuit'
const PAGE_URL = 'https://catyai.io/audit-gratuit'
// Linia CatyAI (folosită și pentru demo secretară) — confirmă înainte de campanie
// dacă vrem un număr dedicat vânzărilor.
const WHATSAPP_NUMBER = '40750195048'

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

// Propunerea 2 (diagnostic 24.10): hero realiniat pe termenii câștigători
// („audit seo / agentie seo / promovare online"), nu pe „audit catalog".
const WHAT_YOU_GET = [
  { icon: Gauge, h: 'Scorul magazinului, din 100', p: 'Cât de pregătit e site-ul pentru Google Shopping și pentru asistenții AI (ChatGPT, Gemini, Perplexity) — măsurat pe magazinul tău, nu generic.' },
  { icon: ListChecks, h: 'Problemele concrete, cu exemple', p: 'Pagini neindexate, categorii lipsă, date structurate invalide, produse invizibile în Google Shopping — fiecare cu exemple din magazinul tău.' },
  { icon: Wrench, h: 'Plan de reparare în 24 de ore', p: 'Ce reparăm automat, ce poți face singur în ziua următoare și ce impact are asupra vânzărilor.' },
]

// Propunerea 3: model vizual de rezultat (structură reală, cifre ilustrative).
const SAMPLE_RESULT = {
  score: 62,
  rows: [
    { ok: false, label: 'Produse fără categorie Google' },
    { ok: false, label: 'Date structurate cu erori' },
    { ok: true, label: 'Viteză mobil în parametri' },
  ],
}

const STEPS = [
  'Ne lași adresa magazinului și emailul (20 de secunde).',
  'Analizăm indexarea, feedul pentru Google Shopping și vizibilitatea în AI.',
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
        title="Audit SEO + Google Shopping gratuit pentru magazine online — CatyAI"
        description="De ce nu apar produsele tale în Google Shopping și în ChatGPT. Audit SEO gratuit al magazinului online: scor din 100, problemele concrete și planul de reparare. Rezultatul în 24 de ore."
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
                Audit SEO + Google Shopping <span className="text-gold">gratuit, în 24 de ore</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Află exact de ce produsele tale nu apar în Google Shopping și în asistenții AI — și ce poți repara imediat. Ne lași doar adresa magazinului.
              </p>

              <ul className="space-y-6 mb-10">
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

              {/* Propunerea 3: model de rezultat — dovadă socială la prima vedere. */}
              <div className="rounded-2xl border border-navy-lighter bg-navy-light p-6 mb-10" aria-label="Exemplu de rezultat de audit">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs tracking-[0.2em] text-slate-500">EXEMPLU DE REZULTAT</h2>
                  <span className="text-[10px] text-slate-600">structură reală · cifre ilustrative</span>
                </div>
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative w-20 h-20 flex-shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" className="text-navy-lighter" strokeWidth="7" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" className="text-gold" strokeWidth="7"
                        strokeDasharray={`${(SAMPLE_RESULT.score / 100) * 213.6} 213.6`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">{SAMPLE_RESULT.score}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Scorul magazinului tău, din 100, cu punctajul pe fiecare verigă: indexare, feed Google Shopping, date structurate, vizibilitate în AI.
                  </p>
                </div>
                <ul className="space-y-2">
                  {SAMPLE_RESULT.rows.map((r) => (
                    <li key={r.label} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.ok ? 'bg-emerald-400' : 'bg-red-400'}`} aria-hidden="true" />
                      {r.label}
                    </li>
                  ))}
                </ul>
              </div>

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
  const [step, setStep] = useState(1)
  // Propunerea 5: form_start o dată, la prima interacțiune cu formularul.
  const formStarted = useRef(false)
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

  function onFirstInteraction() {
    if (formStarted.current) return
    formStarted.current = true
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'form_start', { event_category: 'lead', event_label: CATY_SOURCE })
    }
  }

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
    <form onSubmit={onSubmit} className="rounded-2xl border border-navy-lighter bg-navy-light p-6 sm:p-8 space-y-6" noValidate={false} onFocus={onFirstInteraction}>
      <div className="flex items-center gap-2 text-xs text-slate-500" aria-hidden="true">
        <span className={step === 1 ? 'text-gold font-bold' : ''}>Pasul 1 — magazinul tău</span>
        <span>·</span>
        <span className={step === 2 ? 'text-gold font-bold' : ''}>Pasul 2 — opțional</span>
      </div>

      {/* Honeypot — invizibil pentru oameni; completat doar de boți (serverul îl ignoră silențios). */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="af-company-website">Nu completa acest câmp</label>
        <input id="af-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {step === 1 ? (
        <>
          <div>
            <label htmlFor="af-site" className={labelCls}>Adresa magazinului *</label>
            <input id="af-site" name="site_url" type="url" required placeholder="https://magazinul-tau.ro" autoComplete="url" className={inputCls} />
          </div>

          <div>
            <label htmlFor="af-email" className={labelCls}>Email *</label>
            <input id="af-email" name="email" type="email" required autoComplete="email" placeholder="nume@magazinul-tau.ro" className={inputCls} />
          </div>

          <label className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed cursor-pointer">
            <input type="checkbox" name="gdpr_consent" required className="mt-0.5 accent-[#C8A165]" />
            <span>Sunt de acord să fiu contactat de CatyAI (PayAi-X S.R.L.) despre rezultatul auditului. Datele nu sunt transmise terților. <a href="/gdpr" className="text-gold underline underline-offset-2">Politica GDPR</a></span>
          </label>

          {status === 'error' && (
            <p className="text-sm text-red-400" role="alert">{error}</p>
          )}

          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-60 flex items-center justify-center gap-2">
            {status === 'sending' ? 'Se trimite…' : <>Vreau auditul gratuit <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
          </button>

          <button type="button" onClick={() => setStep(2)} className="w-full py-2 text-sm text-slate-400 hover:text-gold transition-colors flex items-center justify-center gap-1.5">
            Adaugă detalii despre magazin (opțional) <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          {/* Propunerea 4: alternativă la formular pentru cei grăbiți. */}
          <div className="rounded-xl border border-navy-lighter p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="text-xs text-slate-500 leading-relaxed flex-1">Preferi să vorbim direct? Scrie-ne pe WhatsApp sau email și îți răspundem cu auditul.</p>
            <div className="flex gap-2 flex-shrink-0">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Vreau auditul gratuit pentru magazinul meu online.')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gold/40 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/10 transition-colors">
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" /> WhatsApp
              </a>
              <a href="mailto:contact@catyai.io?subject=Audit%20gratuit%20magazin%20online"
                className="inline-flex items-center gap-1.5 rounded-lg border border-navy-lighter px-3 py-2 text-xs font-semibold text-slate-300 hover:border-gold/40 hover:text-gold transition-colors">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" /> Email
              </a>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
            <Mail className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            Fără obligații. Rezultatul îl primești pe email.
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-slate-400 leading-relaxed">Ne ajută să pregătim auditul mai bine. Toate câmpurile sunt opționale — poți trimite oricând doar cu pasul 1.</p>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="af-name" className={labelCls}>Numele tău</label>
              <input id="af-name" name="name" type="text" autoComplete="name" className={inputCls} />
            </div>
            <div>
              <label htmlFor="af-phone" className={labelCls}>Telefon</label>
              <input id="af-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
            </div>
          </div>

          <div>
            <label htmlFor="af-platform" className={labelCls}>Platforma magazinului</label>
            <select id="af-platform" name="platform" defaultValue="" className={inputCls}>
              <option value="">Nespecificat</option>
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

          {status === 'error' && (
            <p className="text-sm text-red-400" role="alert">{error}</p>
          )}

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-60 flex items-center justify-center gap-2">
              {status === 'sending' ? 'Se trimite…' : <>Trimite cererea <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full py-2 text-sm text-slate-400 hover:text-gold transition-colors flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Înapoi la pasul 1
            </button>
          </div>
        </>
      )}
    </form>
  )
}
