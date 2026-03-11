import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const translations = {
  en: {
    badge: 'Free in 30 Seconds',
    title1: 'How much money are you',
    title2: 'losing right now?',
    subtitle: 'Enter your website and get instant ROI analysis. See exactly how many leads you\'re missing and how much revenue Caty can generate.',
    feature1: 'Scans your entire website',
    feature2: 'Detects products, FAQ, services',
    feature3: 'Calculates potential leads/month',
    feature4: 'Estimates additional revenue',
    cta: 'Analyze My Website Free →',
    trust1: 'No registration',
    trust2: '30 seconds',
    trust3: '100% free',
    example: 'Example result:',
    exampleSite: 'dental-clinic.ro',
    exampleLeads: '+47 leads/month',
    exampleRevenue: '+€8,400/year',
    footer: 'Over 200 websites analyzed. Average ROI: 340%'
  },
  ro: {
    badge: 'Gratuit în 30 Secunde',
    title1: 'Câți bani pierzi',
    title2: 'în fiecare lună?',
    subtitle: 'Introdu site-ul tău și primești instant analiza ROI. Vezi exact câte lead-uri pierzi și cât venit poate genera Caty.',
    feature1: 'Scanează întreg site-ul',
    feature2: 'Detectează produse, FAQ, servicii',
    feature3: 'Calculează lead-uri potențiale/lună',
    feature4: 'Estimează venit adițional',
    cta: 'Analizează Site-ul Meu Gratis →',
    trust1: 'Fără înregistrare',
    trust2: '30 secunde',
    trust3: '100% gratuit',
    example: 'Exemplu rezultat:',
    exampleSite: 'clinica-dentara.ro',
    exampleLeads: '+47 lead-uri/lună',
    exampleRevenue: '+€8,400/an',
    footer: 'Peste 200 site-uri analizate. ROI mediu: 340%'
  },
  es: {
    badge: 'Gratis en 30 Segundos',
    title1: '¿Cuánto dinero estás',
    title2: 'perdiendo ahora mismo?',
    subtitle: 'Ingresa tu sitio web y obtén análisis ROI instantáneo. Ve exactamente cuántos leads estás perdiendo y cuánto ingreso puede generar Caty.',
    feature1: 'Escanea todo tu sitio web',
    feature2: 'Detecta productos, FAQ, servicios',
    feature3: 'Calcula leads potenciales/mes',
    feature4: 'Estima ingresos adicionales',
    cta: 'Analizar Mi Sitio Gratis →',
    trust1: 'Sin registro',
    trust2: '30 segundos',
    trust3: '100% gratis',
    example: 'Ejemplo resultado:',
    exampleSite: 'clinica-dental.es',
    exampleLeads: '+47 leads/mes',
    exampleRevenue: '+€8,400/año',
    footer: 'Más de 200 sitios analizados. ROI promedio: 340%'
  }
}

export default function ROICalculator() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored && translations[stored]) {
      setLang(stored)
    } else {
      const browserLang = navigator.language?.slice(0, 2)
      if (translations[browserLang]) setLang(browserLang)
    }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const t = translations[lang] || translations.en

  return (
    <section ref={ref} id="roi-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-indigo-950/30 to-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left - Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t.title1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{t.title2}</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {[t.feature1, t.feature2, t.feature3, t.feature4].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/analyze"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {t.cta}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[t.trust1, t.trust2, t.trust3].map((trust, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-500 text-sm">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {trust}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Example Result Preview */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="text-gray-500 text-sm mb-4">{t.example}</div>

              {/* Site header */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-700/50">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                  🦷
                </div>
                <div>
                  <div className="text-white font-semibold">{t.exampleSite}</div>
                  <div className="text-gray-500 text-sm">Dental Clinic</div>
                </div>
              </div>

              {/* ROI Numbers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Leads</span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{t.exampleLeads}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Revenue</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">{t.exampleRevenue}</span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="mt-6 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Current conversion</span>
                    <span className="text-gray-400">2.1%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[21%] bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">With CatyAI</span>
                    <span className="text-green-400">8.4%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[84%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer stat */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  )
}
