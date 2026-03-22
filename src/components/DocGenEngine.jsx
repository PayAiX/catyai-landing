import { useState, useEffect, useRef } from 'react'

const translations = {
  en: {
    badge: 'Document Automation',
    title1: 'Documents generated',
    title2: 'from conversation',
    desc: 'Customer asks for price? Caty generates the quote. Wants to book? Gets PDF confirmation on WhatsApp. You do nothing manually.',
    feature1: 'Your logo and brand colors in every document',
    feature2: 'Sent automatically via WhatsApp or email',
    feature3: 'Automatic follow-up if customer doesn\'t respond',
    footer: 'Included in Growth+. At competitors: you need to integrate Zapier + PandaDoc + other tools.',
    includedIn: 'Included in Growth+',
    docTypes: 'Doc types',
    generation: 'Generation',
    format: 'Format',
    chat: {
      user: 'How much does cleaning service cost for a 3-room apartment?',
      bot: 'For 3 rooms: €50/session. I\'ll send you the detailed quote now! 📄',
      file: 'Quote_Cleaning_John_Smith.pdf',
      sent: 'Sent'
    },
    docs: [
      { icon: '📄', name: 'Quotes', desc: 'Generate personalized quotes from conversation' },
      { icon: '📋', name: 'Contracts', desc: 'Standard contracts pre-filled automatically' },
      { icon: '🧾', name: 'Invoices', desc: 'Invoices with customer data extracted from chat' },
      { icon: '📝', name: 'Confirmations', desc: 'Booking confirmations sent instantly' },
      { icon: '📊', name: 'Reports', desc: 'Conversation summary for your team' },
      { icon: '✉️', name: 'Follow-up', desc: 'Automatic messages at 48h and 7 days' }
    ]
  },
  ro: {
    badge: 'Automatizare Documente',
    title1: 'Documente generate',
    title2: 'din conversație',
    desc: 'Clientul întreabă de preț? Caty generează oferta. Vrea să programeze? Primește confirmare PDF pe WhatsApp. Tu nu faci nimic manual.',
    feature1: 'Logo și culori brand-ul tău în fiecare document',
    feature2: 'Trimise automat pe WhatsApp sau email',
    feature3: 'Follow-up automat dacă clientul nu răspunde',
    footer: 'Inclus în Growth+. La competitori: trebuie să integrezi Zapier + PandaDoc + alte tool-uri.',
    includedIn: 'Inclus în Growth+',
    docTypes: 'Tipuri doc',
    generation: 'Generare',
    format: 'Format',
    chat: {
      user: 'Cât costă serviciul de curățenie pentru un apartament cu 3 camere?',
      bot: 'Pentru 3 camere: 250 lei/ședință. Îți trimit oferta detaliată acum! 📄',
      file: 'Oferta_Curatenie_Ion_Popescu.pdf',
      sent: 'Trimis'
    },
    docs: [
      { icon: '📄', name: 'Oferte', desc: 'Generează oferte personalizate din conversație' },
      { icon: '📋', name: 'Contracte', desc: 'Contracte standard pre-completate automat' },
      { icon: '🧾', name: 'Facturi', desc: 'Facturi cu datele clientului extrase din chat' },
      { icon: '📝', name: 'Confirmări', desc: 'Confirmări programări trimise instant' },
      { icon: '📊', name: 'Rapoarte', desc: 'Sumar conversație pentru echipă' },
      { icon: '✉️', name: 'Follow-up', desc: 'Mesaje automate la 48h și 7 zile' }
    ]
  },
  es: {
    badge: 'Automatización de Documentos',
    title1: 'Documentos generados',
    title2: 'desde la conversación',
    desc: '¿El cliente pregunta por el precio? Caty genera el presupuesto. ¿Quiere reservar? Recibe confirmación PDF en WhatsApp. Tú no haces nada manual.',
    feature1: 'Tu logo y colores de marca en cada documento',
    feature2: 'Enviados automáticamente por WhatsApp o email',
    feature3: 'Follow-up automático si el cliente no responde',
    footer: 'Incluido en Growth+. En competidores: necesitas integrar Zapier + PandaDoc + otras herramientas.',
    includedIn: 'Incluido en Growth+',
    docTypes: 'Tipos doc',
    generation: 'Generación',
    format: 'Formato',
    chat: {
      user: '¿Cuánto cuesta el servicio de limpieza para un apartamento de 3 habitaciones?',
      bot: 'Para 3 habitaciones: €50/sesión. ¡Te envío el presupuesto detallado ahora! 📄',
      file: 'Presupuesto_Limpieza_Juan_Garcia.pdf',
      sent: 'Enviado'
    },
    docs: [
      { icon: '📄', name: 'Presupuestos', desc: 'Genera presupuestos personalizados desde la conversación' },
      { icon: '📋', name: 'Contratos', desc: 'Contratos estándar pre-completados automáticamente' },
      { icon: '🧾', name: 'Facturas', desc: 'Facturas con datos del cliente extraídos del chat' },
      { icon: '📝', name: 'Confirmaciones', desc: 'Confirmaciones de reserva enviadas al instante' },
      { icon: '📊', name: 'Informes', desc: 'Resumen de conversación para tu equipo' },
      { icon: '✉️', name: 'Follow-up', desc: 'Mensajes automáticos a las 48h y 7 días' }
    ]
  }
};

export default function DocGenEngine() {
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
    <section ref={ref} id="docgen" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-purple-950/20 to-gray-900">
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.title1}<br />
              <span className="text-purple-400">{t.title2}</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t.desc}
            </p>

            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">👤</div>
                  <div className="bg-gray-700/50 rounded-2xl rounded-tl-none px-4 py-2 text-gray-300 text-sm">
                    {t.chat.user}
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-purple-500/20 rounded-2xl rounded-tr-none px-4 py-2 text-gray-200 text-sm max-w-xs">
                    {t.chat.bot}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm">🤖</div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2 text-green-400 text-sm flex items-center gap-2">
                    <span>📎</span>
                    <span>{t.chat.file}</span>
                    <span className="text-green-300">✓ {t.chat.sent}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>{t.feature1}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>{t.feature2}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>{t.feature3}</span>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid grid-cols-2 gap-4">
              {t.docs.map((doc, i) => (
                <div
                  key={i}
                  className="bg-gray-800/30 backdrop-blur rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-all group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{doc.icon}</div>
                  <h4 className="text-white font-semibold mb-1">{doc.name}</h4>
                  <p className="text-gray-500 text-xs">{doc.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-purple-500/10 rounded-xl p-6 border border-purple-500/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-400">12+</div>
                  <div className="text-gray-500 text-xs">{t.docTypes}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">&lt;5s</div>
                  <div className="text-gray-500 text-xs">{t.generation}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">PDF</div>
                  <div className="text-gray-500 text-xs">{t.format}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm">
            <span className="text-purple-400 font-semibold">{t.includedIn}</span>.
            {t.footer.split(t.includedIn)[1]}
          </p>
        </div>
      </div>
    </section>
  )
}
