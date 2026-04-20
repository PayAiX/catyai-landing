import { useState, useEffect, useRef } from 'react'

const translations = {
  en: {
    badge: 'Active Protection 24/7',
    title: 'FraudAI Shield',
    subtitle: 'Blocks scams before you see them',
    desc: '8 detection modules analyze every message in real-time. You only receive legitimate conversations — the rest are blocked automatically.',
    modules: 'Detection Modules',
    analysisTime: 'Analysis Time',
    accuracy: 'Accuracy',
    falsePositives: 'False Positives/day',
    footer: 'Included free in all CatyAI plans. At competitors: doesn\'t exist or separate add-on.',
    includedFree: 'Included free',
    threats: [
      { icon: '🔗', title: 'Dangerous Links', desc: 'Automatically detects phishing links, fake sites, and suspicious URLs before they reach you.' },
      { icon: '💸', title: 'Money Requests', desc: 'Blocks messages with "urgent transfer", "crypto", "guaranteed investment" and other financial schemes.' },
      { icon: '🎭', title: 'Impersonation', desc: 'Identifies when someone pretends to be a bank, courier, or authority to obtain personal data.' },
      { icon: '⏰', title: 'Fake Urgency', desc: 'Detects artificial urgency tactics: "today only", "last 2 spots", "respond in 5 minutes".' },
      { icon: '📱', title: 'Repeated Spam', desc: 'Automatically blocks contacts who send the same message multiple times or mass forwarding.' },
      { icon: '🌍', title: 'Suspicious Numbers', desc: 'Alerts for unknown international numbers with aggressive behavior from first interaction.' }
    ]
  },
  ro: {
    badge: 'Protecție Activă 24/7',
    title: 'FraudAI Shield',
    subtitle: 'Blochează escrocheriile înainte să le vezi',
    desc: '8 module de detecție analizează fiecare mesaj în timp real. Tu primești doar conversațiile legitime — restul sunt blocate automat.',
    modules: 'Module Detecție',
    analysisTime: 'Timp Analiză',
    accuracy: 'Acuratețe',
    falsePositives: 'False Pozitive/zi',
    footer: 'Inclus gratuit în toate planurile CatyAI. La competitori: nu există sau add-on separat.',
    includedFree: 'Inclus gratuit',
    threats: [
      { icon: '🔗', title: 'Link-uri Periculoase', desc: 'Detectează automat link-uri de phishing, site-uri false și URL-uri suspecte înainte să ajungă la tine.' },
      { icon: '💸', title: 'Cereri de Bani', desc: 'Blochează mesaje cu "transfer urgent", "crypto", "investiție garantată" și alte scheme financiare.' },
      { icon: '🎭', title: 'Impersonare', desc: 'Identifică când cineva pretinde că e bancă, curier, sau autoritate pentru a obține date personale.' },
      { icon: '⏰', title: 'Presiune Falsă', desc: 'Detectează tactici de urgență artificială: "doar azi", "ultimele 2 locuri", "răspunde în 5 minute".' },
      { icon: '📱', title: 'Spam Repetat', desc: 'Blochează automat contactele care trimit același mesaj de mai multe ori sau forwarding în masă.' },
      { icon: '🌍', title: 'Numere Suspecte', desc: 'Alertă pentru numere internaționale necunoscute cu comportament agresiv din prima interacțiune.' }
    ]
  },
  es: {
    badge: 'Protección Activa 24/7',
    title: 'FraudAI Shield',
    subtitle: 'Bloquea estafas antes de que las veas',
    desc: '8 módulos de detección analizan cada mensaje en tiempo real. Solo recibes conversaciones legítimas — el resto se bloquean automáticamente.',
    modules: 'Módulos Detección',
    analysisTime: 'Tiempo Análisis',
    accuracy: 'Precisión',
    falsePositives: 'Falsos Positivos/día',
    footer: 'Incluido gratis en todos los planes CatyAI. En competidores: no existe o add-on separado.',
    includedFree: 'Incluido gratis',
    threats: [
      { icon: '🔗', title: 'Links Peligrosos', desc: 'Detecta automáticamente links de phishing, sitios falsos y URLs sospechosas antes de que lleguen a ti.' },
      { icon: '💸', title: 'Pedidos de Dinero', desc: 'Bloquea mensajes con "transferencia urgente", "crypto", "inversión garantizada" y otros esquemas financieros.' },
      { icon: '🎭', title: 'Suplantación', desc: 'Identifica cuando alguien se hace pasar por banco, mensajería o autoridad para obtener datos personales.' },
      { icon: '⏰', title: 'Urgencia Falsa', desc: 'Detecta tácticas de urgencia artificial: "solo hoy", "últimos 2 lugares", "responde en 5 minutos".' },
      { icon: '📱', title: 'Spam Repetido', desc: 'Bloquea automáticamente contactos que envían el mismo mensaje varias veces o reenvío masivo.' },
      { icon: '🌍', title: 'Números Sospechosos', desc: 'Alerta para números internacionales desconocidos con comportamiento agresivo desde la primera interacción.' }
    ]
  }
};

export default function FraudShield() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const updateLang = () => {
      const stored = localStorage.getItem('caty-lang')
      if (stored && translations[stored]) {
        setLang(stored)
      } else {
        const browserLang = navigator.language?.slice(0, 2)
        if (translations[browserLang]) setLang(browserLang)
      }
    }
    updateLang()
    const interval = setInterval(updateLang, 500)
    return () => clearInterval(interval)
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
    <section ref={ref} id="fraud-shield" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-red-950/20 to-gray-900">
      <div className="max-w-6xl mx-auto">

        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-red-400 font-semibold mb-4">
            {t.subtitle}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.threats.map((threat, i) => (
            <div
              key={i}
              className={`bg-[#0A1628]/50 backdrop-blur rounded-2xl p-6 border border-[#1a2744]/50 hover:border-red-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)' }}
              >
                {threat.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{threat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{threat.desc}</p>
            </div>
          ))}
        </div>

        <div className={`bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-red-500/20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-red-400">8</div>
              <div className="text-gray-400 text-sm mt-1">{t.modules}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">&lt;1s</div>
              <div className="text-gray-400 text-sm mt-1">{t.analysisTime}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">99.2%</div>
              <div className="text-gray-400 text-sm mt-1">{t.accuracy}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400">0</div>
              <div className="text-gray-400 text-sm mt-1">{t.falsePositives}</div>
            </div>
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm">
            <span className="text-red-400 font-semibold">{t.includedFree}</span> {t.footer.split(t.includedFree)[1]}
          </p>
        </div>
      </div>
    </section>
  )
}
