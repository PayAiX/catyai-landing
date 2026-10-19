import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Store, Search, MousePointerClick, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

// Pagina /pentru-vanzatori-marketplace — nișa „seller eMAG/Trendyol fără site propriu".
// Poziționare (studiu 19.10, sinteza AGENT-88-sinteza-nisa-selleri-fara-site): durerea
// e identitatea — sellerul nu are nimic al lui în afara feedului din marketplace.
// Postează la același endpoint ca /audit-gratuit, cu caty_source 'vanzatori-marketplace'
// (backendul relaxează site_url doar pentru această sursă și validează bugetul —
// valorile de mai jos trebuie să rămână identice cu QUALIFICATION_OPTIONS din
// src/api/leads/catalog-audit.js).

const LEADS_API = 'https://api.catyai.io/api/leads/catalog-audit'
const CATY_SOURCE = 'vanzatori-marketplace'
const PAGE_URL = 'https://catyai.io/pentru-vanzatori-marketplace'

const MARKETPLACES = [
  { v: 'emag', l: 'eMAG' },
  { v: 'trendyol', l: 'Trendyol' },
  { v: 'emag+trendyol', l: 'Ambele' },
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
const BUDGETS = [
  { v: 'sub-500', l: 'Sub 500 lei / lună' },
  { v: '500-2000', l: '500 – 2.000 lei / lună' },
  { v: 'peste-2000', l: 'Peste 2.000 lei / lună' },
]

const WHAT_YOU_GET = [
  { icon: Store, h: 'Pagina ta de vânzător', p: 'Un spațiu al tău pe catyai.io, cu numele magazinului tău și pagini pentru produsele tale. Nu mai exiști doar ca o linie „vândut de…” în interiorul marketplace-ului.' },
  { icon: Search, h: 'Produsele tale în Google', p: 'Paginile sunt indexate de Google și au date structurate complete — ceva ce fără site propriu nu poți avea, pentru că Google Shopping cere un site verificat.' },
  { icon: MousePointerClick, h: 'Vizibile pentru ChatGPT și Perplexity', p: 'Fișier llms.txt și conținut structurat, ca agenții AI să poată citi și recomanda produsele tale. Promitem „descoperibil” — recomandarea se câștigă în timp, nu se garantează.' },
  { icon: ShieldCheck, h: 'Clientul cumpără tot de la tine', p: 'Butonul de cumpărare duce direct pe listingul tău de pe eMAG sau Trendyol. Comanda, plata și livrarea rămân la tine — noi nu ne atingem de ele.' },
]

const STEPS = [
  'Completezi formularul și ne trimiți exportul de produse (îți spunem noi exact ce format).',
  'Verificăm catalogul — EAN-uri, titluri, poze — și publicăm pagina ta cu produsele.',
  'Primești raport de vizibilitate: ce s-a indexat, ce apare în Google, ce citește AI-ul.',
]

const ALREADY_PAY = [
  ['BaseLinker sau alte integratoare', 'ca să țină stocul și comenzile pe mai multe canale'],
  ['eMAG Ads', 'ca produsele să apară mai sus în interiorul marketplace-ului'],
  ['FBE — Fulfillment by eMAG', 'ca livrarea să fie rapidă, plătită per comandă'],
]

const FAQ = [
  ['Nu-mi arată eMAG deja produsele?', 'În interiorul eMAG, da. Dar în afara lui — pe Google, în ChatGPT — nu exiști: fără site propriu nu ai cum apărea. Pagina ta de vânzător e singura ta proprietate vizibilă în afara marketplace-ului, fără să-ți faci un magazin întreg.'],
  ['Cine ia comanda și banii?', 'Tu, ca și până acum. Clientul ajunge pe listingul tău de pe eMAG sau Trendyol și cumpără de acolo. Noi doar îți aducem vizibilitatea în plus.'],
  ['Ce se întâmplă dacă scot un produs de pe marketplace?', 'Verificăm periodic linkurile; dacă un produs nu mai există, pagina lui se ia jos. Nu rămân linkuri moarte.'],
  ['Cât durează până apar paginile?', 'După ce primim exportul, paginile sunt publicate în câteva zile lucrătoare. Indexarea în Google și citirea de către agenții AI vin apoi, în zile-săptămâni.'],
  ['Cât costă?', 'Depinde de numărul de produse și de pachet. Îți spunem prețul concret după ce vedem catalogul — fără angajamente, iar auditul inițial e gratuit.'],
  ['De ce nu-mi fac propriul meu site?', 'Poți — dacă ai buget de mii de euro și timp de întreținere. Pagina de vânzător e varianta fără site: apari în Google și în AI în zile, nu în luni, și fără costul unui magazin.'],
]

export default function VanzatoriMarketplace() {
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
        title="Nu ai site? Pagina ta de vânzător, vizibilă în Google și în ChatGPT — CatyAI"
        description="Selleri eMAG și Trendyol fără site propriu: pagina ta de vânzător cu produsele tale, indexată în Google și citibilă de ChatGPT. Clientul cumpără tot de la tine, pe marketplace. Audit gratuit de catalog."
        url={PAGE_URL}
        lang="ro"
      />
      <Helmet>
        <html lang="ro" />
      </Helmet>

      <div className="min-h-screen bg-navy text-slate-200 font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>
          <section aria-labelledby="vm-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold mb-4">PENTRU VÂNZĂTORI eMAG · TRENDYOL</p>
              <h1 id="vm-heading" className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-white">
                Nu ai site? <span className="text-gold">Ai acum pagina ta de vânzător</span> — cu produsele tale, vizibilă în Google și în ChatGPT.
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">
                Dacă vinzi doar prin eMAG sau Trendyol, în afara marketplace-ului nu exiști: nimeni nu te găsește pe Google, iar ChatGPT nu știe de tine. Îți facem pagina ta — cu numele tău și produsele tale — iar cumpărarea rămâne pe marketplace, unde e deja.
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

            <MarketplaceForm />
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            <div className="rounded-2xl border border-gold/30 bg-navy-light p-8">
              <h2 className="text-lg font-bold text-white mb-2">Cine plătește deja pentru asta</h2>
              <p className="text-sm text-slate-400 mb-6">Sellerii serioși investesc deja în vizibilitate și operațiuni. Pagina ta de vânzător completează exact ce lipsește: prezența în afara marketplace-ului.</p>
              <ul className="grid md:grid-cols-3 gap-4">
                {ALREADY_PAY.map(([h, p]) => (
                  <li key={h} className="rounded-xl border border-navy-lighter bg-navy p-5">
                    <h3 className="font-semibold text-white text-sm mb-2">{h}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gold/30 bg-navy-light p-8">
              <h2 className="text-lg font-bold text-white mb-4">Pentru cine e</h2>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <li>— Vinzi serios pe eMAG sau Trendyol (zeci-sute de produse) și vrei să exiști și în afara marketplace-ului.</li>
                <li>— Nu ai site propriu și nu vrei să plătești mii de euro pentru unul.</li>
                <li>— Ai buget de promovare și vrei rezultate măsurabile, nu promisiuni.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-navy-lighter bg-navy-light p-8">
              <h2 className="text-lg font-bold text-white mb-4">Pentru cine NU e</h2>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <li>— Vânzări ocazionale, câteva produse fără stoc constant.</li>
                <li>— Așteptări de vânzări garantate — noi măsurăm vizibilitatea și clickurile, nu promitem cifre.</li>
                <li>— Dacă ești la început, <a href="/audit-gratuit" className="text-gold underline underline-offset-2">auditul gratuit</a> e tot ce-ți trebuie acum.</li>
              </ul>
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-8">Întrebări frecvente</h2>
            <div className="space-y-4">
              {FAQ.map(([q, a]) => (
                <details key={q} className="rounded-2xl border border-navy-lighter bg-navy-light px-6 py-4 group">
                  <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                    {q}
                    <span className="text-gold text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-slate-400 leading-relaxed mt-4">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}

function MarketplaceForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
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
    // „Ambele" = ambele canale bifate; valorile trebuie să fie în QUALIFICATION_OPTIONS.channels.
    const marketplace = form.get('marketplace')
    const channels = marketplace === 'emag+trendyol' ? ['emag', 'trendyol'] : [marketplace]
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      store: form.get('store'),
      marketplace_seller: form.get('marketplace_seller'),
      platform: 'Fara site (doar marketplace)',
      channels,
      catalog_size: form.get('catalog_size'),
      monthly_sales: form.get('monthly_sales'),
      budget: form.get('budget'),
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
        }
      } else {
        setStatus('error')
        setError(body.error === 'rate_limited'
          ? 'Prea multe trimiteri de pe această adresă. Încearcă din nou peste o oră.'
          : (body.error || 'Nu am putut trimite formularul. Scrie-ne la contact@catyai.io.'))
      }
    } catch (err) {
      console.error('[VanzatoriMarketplace] submit failed', { message: err.message })
      setStatus('error')
      setError('Problemă de conexiune. Verifică internetul și încearcă din nou.')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-gold/40 bg-navy-light p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="text-xl font-bold mb-3 text-white">Am primit cererea</h2>
        <p className="text-slate-400 leading-relaxed">Verificăm catalogul tău de marketplace și revenim pe email cu ce se poate lista și cu auditul gratuit.</p>
      </div>
    )
  }

  const inputCls = 'w-full rounded-xl border border-navy-lighter bg-navy px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/40 transition-colors'
  const labelCls = 'block text-sm font-medium text-slate-300 mb-2'
  const legendCls = 'text-sm font-medium text-slate-300 mb-3'
  const choiceCls = 'flex items-start gap-3 rounded-lg border border-navy-lighter px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:border-gold/40 has-[:checked]:border-gold/70 has-[:checked]:bg-gold/5 transition-colors'

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-navy-lighter bg-navy-light p-6 sm:p-8 space-y-7" noValidate={false}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="vm-store" className={labelCls}>Numele firmei tale *</label>
          <input id="vm-store" name="store" type="text" required placeholder="S.C. Exemplu S.R.L." autoComplete="organization" className={inputCls} />
        </div>
        <div>
          <label htmlFor="vm-seller" className={labelCls}>Magazinul de pe marketplace</label>
          <input id="vm-seller" name="marketplace_seller" type="text" placeholder="numele magazinului sau ID seller" className={inputCls} />
        </div>
      </div>

      <fieldset>
        <legend className={legendCls}>Unde vinzi? *</legend>
        <div className="grid sm:grid-cols-3 gap-2">
          {MARKETPLACES.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="radio" name="marketplace" value={c.v} required defaultChecked={c.v === 'emag'} className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Câte produse ai? *</legend>
        <div className="grid gap-2">
          {CATALOG_SIZES.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="radio" name="catalog_size" value={c.v} required className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Cât vinzi pe lună, aproximativ? *</legend>
        <div className="grid gap-2">
          {MONTHLY_SALES.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="radio" name="monthly_sales" value={c.v} required className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>Ce buget ai pentru promovare, lunar? *</legend>
        <div className="grid gap-2">
          {BUDGETS.map((c) => (
            <label key={c.v} className={choiceCls}>
              <input type="radio" name="budget" value={c.v} required className="mt-0.5 accent-[#C8A165]" />{c.l}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label htmlFor="vm-name" className={labelCls}>Numele tău *</label>
          <input id="vm-name" name="name" type="text" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="vm-email" className={labelCls}>Email *</label>
          <input id="vm-email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </div>
        <div>
          <label htmlFor="vm-phone" className={labelCls}>Telefon</label>
          <input id="vm-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </div>
      </div>

      {/* Honeypot — invizibil pentru oameni; completat doar de boți (serverul îl ignoră silențios). */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="vm-company-website">Nu completa acest câmp</label>
        <input id="vm-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed cursor-pointer">
        <input type="checkbox" name="gdpr_consent" required className="mt-0.5 accent-[#C8A165]" />
        <span>Sunt de acord să fiu contactat de CatyAI (PayAi-X S.R.L.) despre ofertă. Datele nu sunt transmise terților. <a href="/gdpr" className="text-gold underline underline-offset-2">Politica GDPR</a></span>
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">{error}</p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-60">
        {status === 'sending' ? 'Se trimite…' : 'Vreau pagina mea de vânzător'}
      </button>
      <p className="text-[11px] text-slate-500 leading-relaxed">
        Fără obligații. Revenim pe email cu verificarea catalogului tău.
      </p>
    </form>
  )
}
