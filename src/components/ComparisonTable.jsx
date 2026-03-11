import { useState, useEffect, useRef } from 'react'

const translations = {
  en: {
    badge: 'Honest Comparison',
    title1: 'Why CatyAI and not',
    title2: 'Tidio or Intercom?',
    desc: 'At competitors, the price on the website is just the beginning. AI, automations, and integrations are separate add-ons.',
    feature: 'Feature',
    total: 'TOTAL',
    calloutTitle: 'At CatyAI, AI is included. Not an add-on.',
    calloutDesc: 'You pay one price, you get everything: AI, WhatsApp, FraudAI, documents, automations.',
    cta: 'Start Free →',
    source: '* Prices verified on official Tidio and Intercom websites, March 2026. Tidio Lyro: €32.50/month for 50 conv. Tidio Flows: €24.17/month.',
    features: [
      { name: 'Monthly price', caty: '€149', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'Conversational AI', caty: '✓ Included', tidio: '+€32/mo (Lyro)', intercom: '+$0.99/resolution' },
      { name: 'Automations', caty: '✓ Included', tidio: '+€24/mo (Flows)', intercom: '✓ Limited' },
      { name: 'Native WhatsApp', caty: '✓ Included', tidio: '✗ No', intercom: '✗ No' },
      { name: 'FraudAI (anti-scam)', caty: '✓ Included', tidio: '✗ Doesn\'t exist', intercom: '✗ Doesn\'t exist' },
      { name: 'Document generation', caty: '✓ Included', tidio: '✗ Doesn\'t exist', intercom: '✗ Doesn\'t exist' },
      { name: 'QR setup in 2 min', caty: '✓ Yes', tidio: '✗ No', intercom: '✗ No' },
      { name: 'REAL cost/month', caty: '€149', tidio: '€205+', intercom: '$500+' }
    ]
  },
  ro: {
    badge: 'Comparație Onestă',
    title1: 'De ce CatyAI și nu',
    title2: 'Tidio sau Intercom?',
    desc: 'La competitori, prețul de pe site e doar începutul. AI-ul, automatizările și integrările sunt add-on-uri separate.',
    feature: 'Funcție',
    total: 'TOTAL',
    calloutTitle: 'La CatyAI, AI-ul e inclus. Nu e add-on.',
    calloutDesc: 'Plătești un preț, primești totul: AI, WhatsApp, FraudAI, documente, automatizări.',
    cta: 'Începe Gratuit →',
    source: '* Prețuri verificate pe site-urile oficiale Tidio și Intercom, Martie 2026. Tidio Lyro: €32.50/lună pentru 50 conv. Tidio Flows: €24.17/lună.',
    features: [
      { name: 'Preț lunar', caty: '€149', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'AI conversațional', caty: '✓ Inclus', tidio: '+€32/lună (Lyro)', intercom: '+$0.99/rezoluție' },
      { name: 'Automatizări', caty: '✓ Inclus', tidio: '+€24/lună (Flows)', intercom: '✓ Limitat' },
      { name: 'WhatsApp nativ', caty: '✓ Inclus', tidio: '✗ Nu', intercom: '✗ Nu' },
      { name: 'FraudAI (anti-scam)', caty: '✓ Inclus', tidio: '✗ Nu există', intercom: '✗ Nu există' },
      { name: 'Generare documente', caty: '✓ Inclus', tidio: '✗ Nu există', intercom: '✗ Nu există' },
      { name: 'Setup QR în 2 min', caty: '✓ Da', tidio: '✗ Nu', intercom: '✗ Nu' },
      { name: 'Cost REAL/lună', caty: '€149', tidio: '€205+', intercom: '$500+' }
    ]
  },
  es: {
    badge: 'Comparación Honesta',
    title1: '¿Por qué CatyAI y no',
    title2: 'Tidio o Intercom?',
    desc: 'En los competidores, el precio del sitio web es solo el comienzo. IA, automatizaciones e integraciones son add-ons separados.',
    feature: 'Función',
    total: 'TOTAL',
    calloutTitle: 'En CatyAI, la IA está incluida. No es un add-on.',
    calloutDesc: 'Pagas un precio, obtienes todo: IA, WhatsApp, FraudAI, documentos, automatizaciones.',
    cta: 'Empieza Gratis →',
    source: '* Precios verificados en los sitios web oficiales de Tidio e Intercom, Marzo 2026. Tidio Lyro: €32.50/mes por 50 conv. Tidio Flows: €24.17/mes.',
    features: [
      { name: 'Precio mensual', caty: '€149', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'IA conversacional', caty: '✓ Incluido', tidio: '+€32/mes (Lyro)', intercom: '+$0.99/resolución' },
      { name: 'Automatizaciones', caty: '✓ Incluido', tidio: '+€24/mes (Flows)', intercom: '✓ Limitado' },
      { name: 'WhatsApp nativo', caty: '✓ Incluido', tidio: '✗ No', intercom: '✗ No' },
      { name: 'FraudAI (anti-estafa)', caty: '✓ Incluido', tidio: '✗ No existe', intercom: '✗ No existe' },
      { name: 'Generación documentos', caty: '✓ Incluido', tidio: '✗ No existe', intercom: '✗ No existe' },
      { name: 'Setup QR en 2 min', caty: '✓ Sí', tidio: '✗ No', intercom: '✗ No' },
      { name: 'Costo REAL/mes', caty: '€149', tidio: '€205+', intercom: '$500+' }
    ]
  }
};

export default function ComparisonTable() {
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
    <section ref={ref} id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-5xl mx-auto">

        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title1}<br />
            <span className="text-green-400">{t.title2}</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        <div className={`bg-gray-800/30 backdrop-blur rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="grid grid-cols-4 bg-gray-800/50 border-b border-gray-700/50">
            <div className="p-4 text-gray-400 text-sm font-medium">{t.feature}</div>
            <div className="p-4 text-center">
              <div className="text-cyan-400 font-bold">CatyAI</div>
              <div className="text-gray-500 text-xs">€149/mo</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-gray-300 font-medium">Tidio</div>
              <div className="text-gray-500 text-xs">€149+ /mo</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-gray-300 font-medium">Intercom</div>
              <div className="text-gray-500 text-xs">$39+ /seat</div>
            </div>
          </div>

          {t.features.map((f, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors ${i === t.features.length - 1 ? 'bg-green-500/5' : ''}`}
            >
              <div className="p-4 text-gray-300 text-sm flex items-center">
                {f.name}
                {i === t.features.length - 1 && <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">{t.total}</span>}
              </div>
              <div className={`p-4 text-center text-sm ${f.caty.includes('✓') || i === t.features.length - 1 ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>
                {f.caty}
              </div>
              <div className="p-4 text-center text-sm text-gray-500">
                {f.tidio}
              </div>
              <div className="p-4 text-center text-sm text-gray-500">
                {f.intercom}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-8 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-2xl p-8 border border-cyan-500/20 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t.calloutTitle}
              </h3>
              <p className="text-gray-400">
                {t.calloutDesc}
              </p>
            </div>
            <a
              href="https://app.catyai.io"
              className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              {t.cta}
            </a>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          {t.source}
        </p>
      </div>
    </section>
  )
}
