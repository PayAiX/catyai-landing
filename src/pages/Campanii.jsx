import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

// Pagina /campanii — campanii Google Shopping prin CSS, comparator de prețuri,
// vizibilitate AI și grila oficială de prețuri (10.10.2026).
// Conținut aprobat verbatim de Adrian — NU se reformulează textele/cifrele.
// Layout: GlobalHeader + FooterV9 (aceleași cu restul paginilor standalone).

const META = {
  title: 'Campanii Google Shopping & Comparator de Prețuri — CatyAI',
  desc: 'CatyAI: campanii Google Shopping prin CSS cu până la ~20% economie pe clic, comparator de prețuri cu motor semantic EAN/GTIN și vizibilitate în căutările AI.',
}

const STATS = [
  { v: '2,8 mil.+', l: 'produse în comparatorul nostru' },
  { v: '3,7 mil.', l: 'vectori în motorul semantic' },
  { v: '500.000+', l: 'produse procesate zilnic din feeduri' },
  { v: '24–48h', l: 'activare CSS pentru magazinul tău' },
]

const CSS_BULLETS = [
  'Produsele tale apar în Shopping fără supraprețul licitației standard',
  'Păstrezi controlul total: alegi ce produse și ce buget promovezi',
  'Migrare din contul tău Merchant Center fără pierdere de istoric de performanță',
  'Raportare transparentă — vezi exact ce plătești și ce primești',
]

const COMPARATOR_BULLETS = [
  'Peste 2,8 milioane de produse indexate și actualizate zilnic',
  'Potrivire EAN/GTIN + matching semantic pentru produsele fără cod',
  'Oferte similare generate de motorul de vectori, nu de reguli manuale',
  'Traficul de pe comparator ajunge direct pe pagina ta de produs',
]

const AI_BULLETS = [
  'Date structurate și feeduri pregătite pentru consumul de către agenții AI',
  'Pagini de produs indexabile, rapide, cu preț și disponibilitate corecte',
  'Monitorizăm cum apari în răspunsurile AI și ajustăm continuu',
]

const SERVICES = [
  { h: 'Feed management', p: 'Curățăm, completăm și validăm feedul de produse: titluri, atribute, GTIN-uri, categorii Google. Feedul este fundația — de el depinde tot restul.' },
  { h: 'Google Merchant Center', p: 'Configurăm și administrăm conturile Merchant Center, inclusiv arhitecturi multi-cont. Rezolvăm suspendări, avertismente și erori de feed.' },
  { h: 'Comparator de prețuri', p: 'Îți listăm produsele în comparatorul nostru, cu prețuri actualizate zilnic și trafic trimis direct către paginile tale de produs.' },
  { h: 'Campanii CSS', p: 'Mutăm campaniile Shopping pe CSS-ul nostru, cu economie de până la ~20% pe clic și aceeași vizibilitate în Google.' },
  { h: 'Vizibilitate AI (GEO)', p: 'Pregătim catalogul pentru era căutării conversaționale: asistenții AI citesc, înțeleg și recomandă produsele tale.' },
  { h: 'Marketplace Sync', p: 'Add-on de sincronizare a catalogului cu marketplace-uri: stocuri și prețuri aliniate automat pe toate canalele.' },
]

const STEPS = [
  { h: 'Audit gratuit al feedului', p: 'Analizăm catalogul tău și îți spunem concret ce lipsește: GTIN-uri, atribute, erori de Merchant Center, oportunități de potrivire în comparator.' },
  { h: 'Conectare și activare', p: 'Îți conectăm magazinul la CSS-ul nostru și la comparator. Activarea durează 24–48 de ore, fără modificări în site-ul tău.' },
  { h: 'Monitorizare zilnică', p: 'Urmărim prețurile, disponibilitatea și performanța. Primești rapoarte clare: ce s-a vândut, ce costă clicul, unde poți crește.' },
]

const PLANS = [
  { name: 'Entry', badge: 'TARIF LANSARE', sku: 'până la 1.000 SKU', setup: '500€ setup', monthly: '200€/lună', commission: 'Comision 5% din bugetul ads', features: ['Listare în comparator', 'Raport lunar'] },
  { name: 'Starter', badge: 'TARIF LANSARE', sku: '1.001–3.000 SKU', setup: '700€ setup', monthly: '250€/lună', commission: 'Comision 5%', features: ['CSS + comparator', 'Feed management'] },
  { name: 'Growth', badge: null, sku: '3.001–10.000 SKU', setup: '3.000€ setup', monthly: '600€/lună', commission: 'Comision 5%', features: ['Tot din Starter', 'Optimizare semantică GTIN'] },
  { name: 'Pro', badge: null, sku: '10.001–50.000 SKU', setup: '6.000€ setup', monthly: '1.200€/lună', commission: 'Comision 4%', features: ['Vizibilitate AI inclusă', 'Manager dedicat'] },
  { name: 'Enterprise', badge: null, sku: 'peste 50.000 SKU', setup: 'custom', monthly: '', commission: 'Comision 3–4%', features: ['Arhitectură multi-cont GMC', 'SLA și integrare API'] },
]

const FAQ = [
  { q: 'Ce este CSS și de ce e clicul mai ieftin?', a: 'CSS (Comparison Shopping Services) este programul Google prin care servicii independente de comparare a prețurilor — cum suntem noi — pot lista produse în Google Shopping. Licitația printr-un CSS are un avantaj de cost integrat în mecanismul Google, ceea ce se traduce în până la ~20% economie pe clic față de contul standard. Vizibilitatea produselor rămâne identică.' },
  { q: 'Trebuie să modific ceva în magazinul meu online?', a: 'Nu. Lucrăm pe baza feedului de produse pe care îl ai deja (sau îl construim noi). Nu instalăm scripturi în site și nu atingem platforma ta — indiferent dacă e GoMag, Shopify, WooCommerce sau altceva.' },
  { q: 'Cât durează până apar produsele mele?', a: 'Activarea CSS și listarea în comparator durează 24–48 de ore de la primirea feedului valid. Prima optimizare de feed (dacă e necesară) adaugă, de regulă, încă 1–2 zile.' },
  { q: 'Ce înseamnă «vizibilitate AI» concret?', a: 'Asistenții AI (ChatGPT, Gemini, Perplexity) recomandă produse pe baza datelor pe care le pot citi și înțelege. Noi ne asigurăm că catalogul tău are date structurate corecte, prețuri reale și pagini indexabile — condițiile ca un AI să te poată cita. Monitorizăm prezența ta în răspunsurile AI și raportăm.' },
  { q: 'Pot renunța oricând?', a: 'Perioada minimă este de 6 luni pentru pachetele Entry și Starter (timpul real în care un canal de acest tip ajunge la performanță). După aceea, colaborarea continuă lunar, fără obligații.' },
]

function Eyebrow({ children }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-gold mb-4">{children}</p>
  )
}

export default function Campanii() {
  const [openFaq, setOpenFaq] = useState(0)
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
        title={META.title}
        description={META.desc}
        image="https://catyai.io/assets/campanii/hero.png"
        url="https://catyai.io/campanii"
        lang="ro"
      />
      <Helmet>
        <html lang="ro" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0f1c] text-[#c7d0e0] font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>

      {/* Secțiunea 1 — Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>CSS · Comparator de prețuri · Vizibilitate AI</Eyebrow>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: '#E9EDF4' }}>
              Produsele tale, <span className="text-gold">pe primul loc</span> în Google Shopping. La cost corect.
            </h1>
            <p className="text-lg mb-8" style={{ color: '#E9EDF4', opacity: 0.85 }}>
              Suntem operator CSS autorizat Google și construim comparatorul de prețuri cu motor semantic propriu. Îți conectăm catalogul, îți curățăm feedul și îți aducem produsele exact acolo unde caută cumpărătorii.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:contact@catyai.io"
                className="inline-block bg-gold hover:bg-[#D4B57A] text-[#0A1628] font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Cere consultanță gratuită
              </a>
              <a
                href="#preturi"
                className="inline-block border border-[#C8A165] text-gold hover:bg-[#C8A165] hover:text-[#0A1628] font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Vezi prețurile
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/campanii/hero.png"
              alt="Campanii Google Shopping prin CSS CatyAI"
              className="w-full h-auto rounded-2xl"
              style={{ maskImage: 'linear-gradient(to right, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)' }}
              width="880"
              height="660"
            />
          </div>
        </div>
      </section>

      {/* Secțiunea 2 — Bară cifre */}
      <section style={{ backgroundColor: '#0F1F38' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.l}>
              <p className="text-3xl lg:text-4xl font-bold text-gold mb-2">{s.v}</p>
              <p className="text-sm" style={{ color: '#E9EDF4', opacity: 0.75 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secțiunea 3 — CSS */}
      <section id="css" className="scroll-mt-24" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Google Shopping prin CSS</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#E9EDF4' }}>
              Același clic, cu până la ~20% mai ieftin
            </h2>
            <p className="mb-8" style={{ color: '#E9EDF4', opacity: 0.85 }}>
              Ca partener CSS (Comparison Shopping Services), listăm produsele tale în Google Shopping prin infrastructura noastră — nu prin contul standard Google. Mecanismul programului CSS reduce costul real al clicului, iar diferența rămâne la tine.
            </p>
            <ul className="space-y-3 mb-8">
              {CSS_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3" style={{ color: '#E9EDF4', opacity: 0.9 }}>
                  <span className="text-gold mt-1">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="inline-block border border-[#C8A165] rounded-full px-5 py-2 text-sm font-semibold text-gold">
              Până la ~20% economie pe clic, prin mecanismul oficial CSS
            </p>
          </div>
          <div>
            <img
              src="/assets/campanii/css-shopping.png"
              alt="Google Shopping prin CSS CatyAI"
              className="w-full h-auto rounded-2xl"
              width="880"
              height="660"
            />
          </div>
        </div>
      </section>

      {/* Secțiunea 4 — Comparator */}
      <section id="comparator" className="scroll-mt-24" style={{ backgroundColor: '#0F1F38' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-last lg:order-first">
            <img
              src="/assets/campanii/motor-semantic.png"
              alt="Comparator de prețuri cu motor semantic EAN/GTIN"
              className="w-full h-auto rounded-2xl"
              width="880"
              height="660"
            />
          </div>
          <div>
            <Eyebrow>Comparator de prețuri cu motor semantic</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#E9EDF4' }}>
              Același produs, toate prețurile. Fără duplicate.
            </h2>
            <p className="mb-8" style={{ color: '#E9EDF4', opacity: 0.85 }}>
              Comparatorul nostru nu potrivește produse după titlu. Motorul semantic propriu înțelege ce este produsul și îl leagă pe baza codurilor EAN/GTIN — astfel același produs de la 5 magazine apare o singură dată, cu toate cele 5 prețuri alăturate.
            </p>
            <ul className="space-y-3">
              {COMPARATOR_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3" style={{ color: '#E9EDF4', opacity: 0.9 }}>
                  <span className="text-gold mt-1">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Secțiunea 5 — Vizibilitate AI */}
      <section id="ai" className="scroll-mt-24" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Vizibilitate în căutările AI</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: '#E9EDF4' }}>
              Când clientul întreabă AI-ul, răspunsul să fie produsul tău
            </h2>
            <p className="mb-8" style={{ color: '#E9EDF4', opacity: 0.85 }}>
              Tot mai mulți cumpărători nu mai caută pe Google — întreabă ChatGPT, Gemini sau Perplexity. Optimizăm structura catalogului tău (date structurate, feeduri curate, conținut citibil de mașini) astfel încât asistenții AI să te găsească și să te recomande.
            </p>
            <ul className="space-y-3">
              {AI_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3" style={{ color: '#E9EDF4', opacity: 0.9 }}>
                  <span className="text-gold mt-1">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src="/assets/campanii/vizibilitate-ai.png"
              alt="Vizibilitate în căutările AI"
              className="w-full h-auto rounded-2xl"
              width="880"
              height="660"
            />
          </div>
        </div>
      </section>

      {/* Secțiunea 6 — Carduri servicii */}
      <section style={{ backgroundColor: '#0F1F38' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Eyebrow>Ce facem concret</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#E9EDF4' }}>
              Infrastructura completă a catalogului tău
            </h2>
            <p style={{ color: '#E9EDF4', opacity: 0.8 }}>
              Nu vindem promisiuni. Operăm zilnic feeduri, conturi Merchant Center și pipeline-uri de date — exact ce vezi mai jos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.h} className="rounded-2xl p-8 border border-[#1E3355]" style={{ backgroundColor: '#0A1628' }}>
                <h3 className="text-xl font-bold mb-3 text-gold">{s.h}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#E9EDF4', opacity: 0.85 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secțiunea 7 — 3 pași */}
      <section style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Eyebrow>Cum funcționează</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#E9EDF4' }}>
              De la feed la vânzare, în trei pași
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.h} className="rounded-2xl p-8" style={{ backgroundColor: '#0F1F38' }}>
                <p className="text-4xl font-bold text-gold mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#E9EDF4' }}>{s.h}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#E9EDF4', opacity: 0.85 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secțiunea 8 — Prețuri */}
      <section id="preturi" className="scroll-mt-24" style={{ backgroundColor: '#F7F4EE' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#A88A52] mb-4">Prețuri transparente</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0A1628]">Grila oficială CatyAI</h2>
            <p className="text-[#0A1628]" style={{ opacity: 0.75 }}>
              Setup unic + abonament lunar + comision din bugetul de ads. Fără costuri ascunse, fără perioade de probă — cu rezultate măsurabile.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {PLANS.map((p) => (
              <div key={p.name} className="rounded-2xl p-6 bg-white shadow-sm border border-[#E5DFD3] flex flex-col">
                {p.badge && (
                  <span className="self-start text-xs font-bold uppercase tracking-wide bg-gold text-[#0A1628] rounded-full px-3 py-1 mb-3">
                    {p.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0A1628] mb-1">{p.name}</h3>
                <p className="text-sm text-[#0A1628] mb-4" style={{ opacity: 0.6 }}>{p.sku}</p>
                <p className="text-2xl font-bold text-[#0A1628]">{p.setup}</p>
                {p.monthly && <p className="text-lg font-semibold text-[#0A1628] mb-3">{p.monthly}</p>}
                {!p.monthly && <p className="text-lg font-semibold text-[#0A1628] mb-3" style={{ opacity: 0.6 }}>la cerere</p>}
                <p className="text-sm font-medium text-[#A88A52] mb-4">{p.commission}</p>
                <ul className="space-y-2 text-sm text-[#0A1628] mt-auto">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-[#A88A52] mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl p-6 bg-white shadow-sm border border-[#E5DFD3]">
              <h3 className="text-lg font-bold text-[#0A1628] mb-2">Marketplace Sync</h3>
              <p className="text-sm text-[#0A1628]" style={{ opacity: 0.75 }}>
                200€ setup/canal + 150€/lună (standalone: 300€ setup + 200€/lună). Sincronizare stocuri și prețuri cu marketplace-urile.
              </p>
            </div>
            <div className="rounded-2xl p-6 bg-white shadow-sm border border-[#E5DFD3]">
              <h3 className="text-lg font-bold text-[#0A1628] mb-2">Canale suplimentare</h3>
              <p className="text-sm text-[#0A1628]" style={{ opacity: 0.75 }}>
                +50€/lună pentru fiecare canal extra la pachetele Entry și Starter.
              </p>
            </div>
          </div>
          <p className="text-xs text-[#0A1628] text-center" style={{ opacity: 0.6 }}>
            Tariful de lansare este valabil pentru primii 10 clienți, până la 31.12.2026. Condiții: setup plătit la semnare, perioadă minimă 6 luni pentru Entry și Starter. Tarifele afișate nu includ TVA.
          </p>
        </div>
      </section>

      {/* Secțiunea 9 — FAQ */}
      <section style={{ backgroundColor: '#0F1F38' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#E9EDF4' }}>
              Întrebări frecvente
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={f.q} className="rounded-2xl border border-[#1E3355]" style={{ backgroundColor: '#0A1628' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-semibold" style={{ color: '#E9EDF4' }}>{f.q}</span>
                    <span className="text-gold text-xl leading-none">{open ? '−' : '+'}</span>
                  </button>
                  {open && (
                    <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: '#E9EDF4', opacity: 0.8 }}>
                      {f.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Secțiunea 10 — CTA final */}
      <section style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#E9EDF4' }}>
            Cere auditul gratuit al feedului tău
          </h2>
          <p className="mb-8" style={{ color: '#E9EDF4', opacity: 0.85 }}>
            Îți spunem în 48 de ore ce pierzi acum: clicuri plătite prea scump, produse invizibile, GTIN-uri lipsă.
          </p>
          <a
            href="mailto:contact@catyai.io"
            className="inline-block bg-gold hover:bg-[#D4B57A] text-[#0A1628] font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            contact@catyai.io
          </a>
        </div>
      </section>
        </main>

        <FooterV9 lang="ro" />
      </div>
    </>
  )
}
