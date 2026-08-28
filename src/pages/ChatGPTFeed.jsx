/**
 * /chatgpt-feed — ChatGPT Product Feeds (PAS 3, brief 28 aug 2026).
 * URL decis de Adrian: /chatgpt-feed (consecvent cu /google-shopping-feed,
 * /facebook-instagram-feed; „ChatGPT" e termenul căutat de comercianți).
 * FĂRĂ redirect de pe /gpt-feeds — URL-ul n-a existat niciodată public.
 *
 * EN-only la lansare (catyai.io = EN; copy-ul din brief e EN).
 * Cifrele vin din sursa unică (src/lib/catalogStats.js — aff-llms.txt query).
 * Formularul = endpointul comun POST /api/leads/catalog-audit (repo Caty.AI),
 * caty_source=chatgpt-feed-page, GDPR + honeypot + conversie generate_lead.
 * ⚠️ Fără claims de refresh-rate („15-minute refresh" etc.) — pipeline-ul nu
 * livrează azi o rată garantată; formularea e „re-verified at every feed
 * generation".
 */
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'
import PartnerBadges from '../components/PartnerBadges'
import { MERCHANT_COUNT, productsShortM } from '../lib/catalogStats'

const N_MERCHANTS = String(MERCHANT_COUNT)
const M_DOT = productsShortM('en')

const API_LEADS_URL = 'https://api.catyai.io/api/leads/catalog-audit'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'ChatGPT Product Feeds',
      serviceType: 'AI commerce catalog pipeline',
      provider: { '@type': 'Organization', name: 'CatyAI' },
      areaServed: 'EU',
      description: 'Validation, enrichment and cryptographic signing of merchant product catalogs for AI commerce: ChatGPT product-feed campaigns, Google Shopping via CSS, Meta catalogs and AI agents — from one validated source of truth, operated by the team behind the PayAI-x CSS, a Google-approved Comparison Shopping Service serving a network of ' + N_MERCHANTS + ' merchants.',
    },
  ],
}

const RAW_LINES = [
  { k: 'title', v: 'LAPTOP GAMING!!! REDUCERE' },
  { k: 'price', v: '1 RON' },
  { k: 'brand', v: 'SC EXAMPLE TRADING SRL' },
  { k: 'availability', v: 'in stock (?)' },
  { k: 'description', v: '<p>&nbsp;&amp;...' },
]

const CLEAN_LINES = [
  { k: 'title', v: 'Laptop gaming Lenovo LOQ 15, RTX 4060' },
  { k: 'price', v: '4,299.00 RON' },
  { k: 'brand', v: 'Lenovo' },
  { k: 'availability', v: 'in_stock · verified' },
  { k: 'signature', v: 'Ed25519 · verifiable' },
]

const BREAK_CARDS = [
  { h: 'Stale prices', p: 'A price that changed since the last sync becomes ad copy promising the wrong number — a commercial claim you are responsible for.' },
  { h: 'Phantom stock', p: 'Products that sold out days ago keep generating ads that send shoppers to dead ends.' },
  { h: 'Unstructured text', p: 'Copy generated from shouty titles and HTML-polluted descriptions inherits the mess, verbatim.' },
  { h: 'No provenance', p: 'When a claim is challenged, nothing proves which data the merchant actually authorised, or when.' },
]

const STEPS = [
  { n: '01', h: 'Semantic enrichment', p: 'Clean titles with correct diacritics, structured attributes, normalised brands. ' + M_DOT + '+ products processed.' },
  { n: '02', h: 'Validation before publication', p: 'A versioned rules engine gates every product; failures are rejected, never silently published; re-eligibility is deterministic.' },
  { n: '03', h: 'Freshness discipline', p: 'Availability and price are re-verified at every feed generation; products that fail freshness checks are withheld, not published stale.' },
  { n: '04', h: 'Cryptographic provenance', p: 'Ed25519 signatures with a public JWKS: any party can independently verify that a price or availability claim came from merchant-authorised data at a point in time. Trust Gateway, live in production on real merchant traffic.' },
  { n: '05', h: 'One catalog, every channel', p: 'The same validated source of truth produces Google Shopping feeds, Meta catalogs and AI-commerce feeds.' },
]

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '9999px', background: '#34d399', boxShadow: '0 0 8px #34d39988', display: 'inline-block', flexShrink: 0 }} />
}

function Rule() {
  return <div style={{ width: 32, height: 3, background: '#d4b07a', borderRadius: 2, marginBottom: 18 }} />
}

function FeedPanel() {
  return (
    <div className="relative font-mono text-[12px]">
      <div className="bg-[#111a2c] border border-[#3d2b2b] rounded-xl p-5">
        <div className="text-[10px] tracking-widest uppercase text-[#e08a8a] mb-3">RAW MERCHANT FEED</div>
        {RAW_LINES.map((l) => (
          <div key={l.k} className="flex gap-2 py-0.5">
            <span className="text-[#5c6883] w-24 flex-shrink-0">{l.k}:</span>
            <span className="text-[#e08a8a] line-through decoration-[#e08a8a]/50">{l.v}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 my-3 px-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b07a] to-transparent" />
        <span className="text-[10px] tracking-widest uppercase text-[#d4b07a]">semantic enrichment · validation gate · signature</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b07a] to-transparent" />
      </div>
      <div className="bg-[#111a2c] border border-[#34d399]/40 rounded-xl p-5" style={{ boxShadow: '0 8px 40px -18px rgba(52,211,153,.35)' }}>
        <div className="text-[10px] tracking-widest uppercase text-[#34d399] mb-3">AI-COMMERCE READY</div>
        {CLEAN_LINES.map((l) => (
          <div key={l.k} className="flex gap-2 py-0.5">
            <span className="text-[#5c6883] w-24 flex-shrink-0">{l.k}:</span>
            <span className="text-[#c7d0e0]">{l.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** VIZUAL 2 — fan-out: un catalog validat, patru destinații. SVG inline, zero raster. */
function FanOutDiagram() {
  const outs = ['Google Shopping via CSS', 'Meta catalog', 'ChatGPT product feeds', 'MCP/UCP agents']
  return (
    <figure aria-label="One validated catalog, four destinations">
      <svg viewBox="0 0 860 300" role="img" className="w-full h-auto">
        <title>Merchant feed → CatyAI pipeline → Google Shopping via CSS, Meta catalog, ChatGPT product feeds, MCP/UCP agents</title>
        <rect x="10" y="110" width="200" height="80" rx="10" fill="#111a2c" stroke="#1f293f" />
        <text x="110" y="140" textAnchor="middle" fill="#e7cfa3" fontSize="14" fontWeight="700">MERCHANT FEED</text>
        <text x="110" y="162" textAnchor="middle" fill="#8b96ab" fontSize="11">CSV · XML · API · Shopify · Woo</text>
        <line x1="210" y1="150" x2="290" y2="150" stroke="#d4b07a" strokeWidth="1.5" />
        <rect x="290" y="95" width="240" height="110" rx="10" fill="#111a2c" stroke="#d4b07a" />
        <text x="410" y="130" textAnchor="middle" fill="#e7cfa3" fontSize="14" fontWeight="700">CATYAI PIPELINE</text>
        <text x="410" y="152" textAnchor="middle" fill="#8b96ab" fontSize="11">enrichment · validation</text>
        <text x="410" y="170" textAnchor="middle" fill="#8b96ab" fontSize="11">golden records · Ed25519</text>
        {outs.map((label, i) => {
          const y = 30 + i * 66
          return (
            <g key={label}>
              <path d={`M 530 150 C 590 150, 590 ${y + 25}, 640 ${y + 25}`} fill="none" stroke="#34d399" strokeWidth="1.2" opacity="0.7" />
              <rect x="640" y={y} width="210" height="50" rx="8" fill="#111a2c" stroke="#1f293f" />
              <text x="745" y={y + 30} textAnchor="middle" fill="#c7d0e0" fontSize="12">{label}</text>
            </g>
          )
        })}
      </svg>
      <figcaption className="text-center text-[13px] text-[#8b96ab] italic mt-2">One validated catalog. Four destinations. No duplicated work.</figcaption>
    </figure>
  )
}

const PLATFORMS = ['Shopify', 'WooCommerce', 'PrestaShop', 'Magento', 'OpenCart', 'Gomag', 'MerchantPro']

function AuditForm() {
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')
  const [utm, setUtm] = useState({})

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const captured = {}
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (q.get(k)) captured[k] = q.get(k)
    }
    setUtm(captured)
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = { ...Object.fromEntries(form.entries()), ...utm, caty_source: 'chatgpt-feed-page' }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch(API_LEADS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.success) {
        setStatus('done')
        // Conversie: lead salvat server-side. Punct de extensie: evenimentul
        // OpenAI Pixel se emite TOT aici când pornește campania ChatGPT Ads.
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: 'catalog-audit-chatgpt-feed' })
        } else {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({ event: 'generate_lead', event_label: 'catalog-audit-chatgpt-feed' })
        }
      } else {
        setStatus('error')
        setError(body.error === 'rate_limited' ? 'Too many submissions — try again in an hour or write to sales@catyai.io.' : (body.error || 'Something went wrong. Write to sales@catyai.io.'))
      }
    } catch {
      setStatus('error')
      setError('Network error. Write to sales@catyai.io.')
    }
  }

  if (status === 'done') {
    return (
      <div className="text-center py-10">
        <p className="text-3xl" aria-hidden="true">✓</p>
        <h3 className="font-extrabold text-xl text-white mt-3">Thank you — we received your request</h3>
        <p className="text-[#8b96ab] mt-3 max-w-md mx-auto">We analyse the feed and email you a concrete report on your catalog: valid GTINs, categories, titles, placeholder prices.</p>
      </div>
    )
  }

  const inputCls = 'w-full bg-[#0a0f1c] border border-[#1f293f] text-white placeholder-[#5c6883] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#d4b07a] transition'
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 text-left">
      {/* honeypot: invisible to humans; bots filling it get a silent success server-side */}
      <div className="hidden" aria-hidden="true"><label>Company website<input type="text" name="company_website" tabIndex="-1" autoComplete="off" /></label></div>
      <input className={inputCls} type="text" name="name" placeholder="Name" required />
      <input className={inputCls} type="text" name="store" placeholder="Store" required />
      <input className={inputCls} type="url" name="site_url" placeholder="Site URL — https://your-store.com" required />
      <input className={inputCls} type="url" name="feed_url" placeholder="Feed URL — https://your-store.com/feed.xml" required />
      <input className={inputCls} type="email" name="email" placeholder="Email" required />
      <input className={inputCls} type="tel" name="phone" placeholder="Phone (optional)" />
      <select className={inputCls + ' sm:col-span-2'} name="platform" required defaultValue="">
        <option value="" disabled>Store platform</option>
        {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
        <option value="alta">Other platform / custom feed</option>
      </select>
      <label className="flex items-start gap-2.5 sm:col-span-2 text-[12px] text-[#8b96ab] leading-relaxed">
        <input type="checkbox" name="gdpr_consent" value="on" required className="mt-0.5" />
        <span>I agree that CatyAI processes the data in this form to contact me about the catalog audit, per the <a href="/privacy" className="text-[#d4b07a] underline underline-offset-2">privacy policy</a>. Consent is required to submit.</span>
      </label>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'} className="font-bold px-6 py-3 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3] disabled:opacity-60" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>
          {status === 'sending' ? 'Sending…' : 'Request the catalog audit'}
        </button>
        {status === 'error' && <p className="text-[#e08a8a] text-sm mt-3">{error}</p>}
      </div>
    </form>
  )
}

export default function ChatGPTFeed() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SEO
        title="ChatGPT Product Feeds — AI commerce catalog pipeline | CatyAI"
        description="ChatGPT advertising opened across Europe in August 2026 with product-feed campaigns. Most merchant feeds are not ready. CatyAI validates, enriches and signs AI-commerce-ready catalogs."
        url="https://catyai.io/chatgpt-feed"
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(JSON_LD)}</script></Helmet>

      <div className="min-h-screen bg-[#0a0f1c] text-[#c7d0e0] font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>
          {/* HERO */}
          <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-20">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(48rem 28rem at 70% -6%, rgba(212,176,122,.10), transparent 62%), radial-gradient(40rem 24rem at 18% 4%, rgba(212,176,122,.05), transparent 60%)' }} />
            <div className="relative grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] text-[#d4b07a] border border-[#1f293f] bg-white/[.02] rounded-full px-3 py-1.5 uppercase font-mono tracking-widest">
                  <Dot /> ChatGPT Product Feeds
                </span>
                <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.05] mt-6 text-white">Your catalog, ready for AI commerce</h1>
                <p className="text-[17px] text-[#8b96ab] mt-6 leading-relaxed max-w-xl">
                  On 24 August 2026 ChatGPT advertising opened across 31 European markets, Romania included.
                  Ads Manager builds campaigns directly from product feeds — the copy a shopper sees is
                  generated from your catalog data. If that data is wrong, the ad is wrong.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#contact" className="font-bold px-6 py-3 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>Book a partnership call</a>
                  <a href="/google-shopping-feed" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-6 py-3 rounded-lg text-white hover:border-[#5c6883] transition">Google Shopping feeds →</a>
                </div>
                <PartnerBadges locale="en" className="mt-6" />
                <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                  {[
                    { v: M_DOT + '+', l: 'products processed' },
                    { v: N_MERCHANTS, l: 'merchants' },
                    { v: '~95%', l: 'acceptance rate' },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-extrabold text-2xl sm:text-3xl text-[#e7cfa3] tracking-tight">{s.v}</div>
                      <div className="text-[12px] text-[#8b96ab] mt-1 leading-snug">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <FeedPanel />
            </div>
          </section>

          {/* WHY FEEDS BREAK */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">Why feeds break in AI advertising</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">
                Traditional feed errors cost you an impression. In AI advertising they cost you the claim.
                When ad copy is generated from your data, a stale price is not a formatting issue — it is
                a commercial claim the advertiser is responsible for.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {BREAK_CARDS.map((c) => (
                  <div key={c.h} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="font-bold text-[#d4b07a]">{c.h}</div>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{c.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT CATYAI DOES */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">What CatyAI does</h2>
              <div className="mt-10 space-y-8 max-w-3xl">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex gap-5">
                    <div className="font-mono text-[#d4b07a] font-bold flex-shrink-0">{s.n}</div>
                    <div>
                      <div className="font-bold text-white">{s.h}</div>
                      <p className="text-sm text-[#8b96ab] mt-1.5 leading-relaxed">{s.p}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-14"><FanOutDiagram /></div>
            </div>
          </section>

          {/* DISCOVERY SHIFT */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl text-white">The discovery shift</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-5 max-w-3xl">
                ChatGPT's in-chat checkout was discontinued in March 2026. What survived is discovery in
                AI, purchase on the merchant's site — which makes catalog data quality the entire
                battleground.
              </p>
            </div>
          </section>

          {/* WHO BUILDS THIS */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl text-white">Who builds this</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-5 max-w-3xl">
                CatyAI is operated by the team behind the PayAI-x Comparison Shopping Service, approved by
                Google, serving a network of {N_MERCHANTS} merchants. The pipeline was built to solve our own
                feed-quality problems first.
              </p>
            </div>
          </section>

          {/* CTA / FORM */}
          <section id="contact" className="border-t border-[#1f293f]">
            <div className="max-w-3xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">See first what's wrong with your catalog</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-5">
                Send us your feed link. You get a concrete report: how many products have a valid GTIN,
                how many have the right category, how many titles are missing, how many prices are
                placeholders. Free.
              </p>
              <div className="mt-8">
                <AuditForm />
              </div>
              <p className="text-sm text-[#5c6883] mt-6">
                Prefer a direct conversation? Write to <a href="mailto:sales@catyai.io" className="text-[#d4b07a] underline underline-offset-2">sales@catyai.io</a>.
              </p>
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
