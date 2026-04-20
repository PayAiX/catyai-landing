import { useState, useEffect, useRef } from 'react'

const translations = {
  en: {
    badge: 'WhatsApp AI Secretary',
    title1: 'Your AI Secretary',
    title2: 'on WhatsApp',
    subtitle: 'Responds to customers 24/7. Books appointments. Generates documents. Blocks scams. Works on your existing WhatsApp number.',
    feature1: 'Answers customers 24/7',
    feature1desc: 'Instant responses in natural language. Remembers context. 6 languages with auto-detection.',
    feature2: 'Books appointments',
    feature2desc: 'Google Calendar sync. Real-time availability. WhatsApp confirmations & reminders.',
    feature3: 'Generates documents',
    feature3desc: 'Quotes, invoices, booking confirmations as PDF. Sent directly in WhatsApp.',
    feature4: 'Blocks scams with FraudAI',
    feature4desc: '8 detection modules: phishing, fake urgency, impersonation. Protects before you see.',
    cta: 'Try Demo on WhatsApp',
    ctaSecondary: 'Book Demo Call',
    trust: '500 conversations/month FREE. No credit card.',
    demoNumber: 'Send "demo" to +40 750 195 048',
    testimonial: '"Caty handles 80% of my customer inquiries. I just review bookings in the morning."',
    testimonialAuthor: '— Dr. Ion, Dental Clinic'
  },
  ro: {
    badge: 'Secretară AI pe WhatsApp',
    title1: 'Secretara ta AI',
    title2: 'pe WhatsApp',
    subtitle: 'Răspunde clienților 24/7. Programează întâlniri. Generează documente. Blochează escrocherii. Funcționează pe numărul tău de WhatsApp.',
    feature1: 'Răspunde clienților 24/7',
    feature1desc: 'Răspunsuri instant în limbaj natural. Ține minte contextul. 6 limbi cu auto-detectare.',
    feature2: 'Programează întâlniri',
    feature2desc: 'Sincronizare Google Calendar. Disponibilitate în timp real. Confirmări și remindere pe WhatsApp.',
    feature3: 'Generează documente',
    feature3desc: 'Oferte, facturi, confirmări rezervări ca PDF. Trimise direct în WhatsApp.',
    feature4: 'Blochează escrocherii cu FraudAI',
    feature4desc: '8 module de detecție: phishing, urgențe false, impersonare. Te protejează înainte să vezi.',
    cta: 'Încearcă Demo pe WhatsApp',
    ctaSecondary: 'Programează Demo',
    trust: '500 conversații/lună GRATUIT. Fără card bancar.',
    demoNumber: 'Trimite "demo" la +40 750 195 048',
    testimonial: '"Caty gestionează 80% din solicitările clienților mei. Doar verific programările dimineața."',
    testimonialAuthor: '— Dr. Ion, Clinică Dentară'
  },
  es: {
    badge: 'Secretaria IA en WhatsApp',
    title1: 'Tu Secretaria IA',
    title2: 'en WhatsApp',
    subtitle: 'Responde a clientes 24/7. Reserva citas. Genera documentos. Bloquea estafas. Funciona con tu número de WhatsApp existente.',
    feature1: 'Responde clientes 24/7',
    feature1desc: 'Respuestas instantáneas en lenguaje natural. Recuerda el contexto. 6 idiomas con auto-detección.',
    feature2: 'Reserva citas',
    feature2desc: 'Sincronización con Google Calendar. Disponibilidad en tiempo real. Confirmaciones y recordatorios por WhatsApp.',
    feature3: 'Genera documentos',
    feature3desc: 'Presupuestos, facturas, confirmaciones de reserva como PDF. Enviados directamente en WhatsApp.',
    feature4: 'Bloquea estafas con FraudAI',
    feature4desc: '8 módulos de detección: phishing, urgencia falsa, suplantación. Te protege antes de que lo veas.',
    cta: 'Prueba Demo en WhatsApp',
    ctaSecondary: 'Reservar Demo',
    trust: '500 conversaciones/mes GRATIS. Sin tarjeta de crédito.',
    demoNumber: 'Envía "demo" al +40 750 195 048',
    testimonial: '"Caty gestiona el 80% de las consultas de mis clientes. Solo reviso las citas por la mañana."',
    testimonialAuthor: '— Dr. Ion, Clínica Dental'
  },
  pt: {
    badge: 'Secretária IA no WhatsApp',
    title1: 'Sua Secretária IA',
    title2: 'no WhatsApp',
    subtitle: 'Responde a clientes 24/7. Agenda consultas. Gera documentos. Bloqueia golpes. Funciona no seu número de WhatsApp existente.',
    feature1: 'Responde clientes 24/7',
    feature1desc: 'Respostas instantâneas em linguagem natural. Lembra o contexto. 6 idiomas com auto-detecção.',
    feature2: 'Agenda consultas',
    feature2desc: 'Sincronização com Google Calendar. Disponibilidade em tempo real. Confirmações e lembretes no WhatsApp.',
    feature3: 'Gera documentos',
    feature3desc: 'Orçamentos, faturas, confirmações de reserva como PDF. Enviados diretamente no WhatsApp.',
    feature4: 'Bloqueia golpes com FraudAI',
    feature4desc: '8 módulos de detecção: phishing, urgência falsa, impersonação. Protege antes de você ver.',
    cta: 'Experimente Demo no WhatsApp',
    ctaSecondary: 'Agendar Demo',
    trust: '500 conversas/mês GRÁTIS. Sem cartão de crédito.',
    demoNumber: 'Envie "demo" para +40 750 195 048',
    testimonial: '"Caty gerencia 80% das consultas dos meus clientes. Só verifico os agendamentos de manhã."',
    testimonialAuthor: '— Dr. Ion, Clínica Odontológica'
  },
  fr: {
    badge: 'Secrétaire IA sur WhatsApp',
    title1: 'Votre Secrétaire IA',
    title2: 'sur WhatsApp',
    subtitle: 'Répond aux clients 24/7. Prend des rendez-vous. Génère des documents. Bloque les arnaques. Fonctionne avec votre numéro WhatsApp existant.',
    feature1: 'Répond aux clients 24/7',
    feature1desc: 'Réponses instantanées en langage naturel. Mémorise le contexte. 6 langues avec auto-détection.',
    feature2: 'Prend des rendez-vous',
    feature2desc: 'Synchronisation Google Calendar. Disponibilité en temps réel. Confirmations et rappels sur WhatsApp.',
    feature3: 'Génère des documents',
    feature3desc: 'Devis, factures, confirmations de réservation en PDF. Envoyés directement dans WhatsApp.',
    feature4: 'Bloque les arnaques avec FraudAI',
    feature4desc: '8 modules de détection: phishing, fausse urgence, usurpation. Vous protège avant de voir.',
    cta: 'Essayez la Démo sur WhatsApp',
    ctaSecondary: 'Réserver une Démo',
    trust: '500 conversations/mois GRATUIT. Sans carte bancaire.',
    demoNumber: 'Envoyez "demo" au +40 750 195 048',
    testimonial: '"Caty gère 80% des demandes de mes clients. Je vérifie juste les rendez-vous le matin."',
    testimonialAuthor: '— Dr. Ion, Cabinet Dentaire'
  }
}

export default function WhatsAppSecretary() {
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

  const features = [
    { title: t.feature1, desc: t.feature1desc, icon: '💬' },
    { title: t.feature2, desc: t.feature2desc, icon: '📅' },
    { title: t.feature3, desc: t.feature3desc, icon: '📄' },
    { title: t.feature4, desc: t.feature4desc, icon: '🛡️' }
  ]

  return (
    <section ref={ref} id="whatsapp-secretary" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-green-950/20 to-gray-900 relative overflow-hidden">
      {/* WhatsApp pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325D366' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {t.title1} <span className="text-gold">{t.title2}</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Features */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 bg-[#0A1628]/40 rounded-xl border border-[#1a2744]/50 transition-all duration-500 hover:border-green-500/30 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">{feature.title}</div>
                  <div className="text-gray-500 text-sm">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Phone Mockup & CTA */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* WhatsApp Mockup */}
            <div className="relative mx-auto max-w-xs mb-8">
              <div className="bg-[#0A1628] rounded-[2.5rem] p-2 shadow-2xl border border-[#1a2744]">
                <div className="bg-[#010A1F] rounded-[2rem] overflow-hidden">
                  {/* WhatsApp header */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      <img src="/images/caty-logo.png" alt="Caty" className="w-7 h-7 object-contain" width="28" height="28" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">Caty Secretary</div>
                      <div className="text-green-200 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Online 24/7
                      </div>
                    </div>
                  </div>

                  {/* Chat */}
                  <div className="bg-[#0b141a] p-3 min-h-[220px] space-y-2">
                    <div className="flex justify-start">
                      <div className="bg-[#0A1628] rounded-xl rounded-tl-none px-3 py-2 max-w-[85%]">
                        <p className="text-white text-xs">Bună! Cum te pot ajuta? 👋</p>
                        <p className="text-gray-500 text-[10px] text-right mt-1">09:00</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-700 rounded-xl rounded-tr-none px-3 py-2 max-w-[85%]">
                        <p className="text-white text-xs">Aș vrea o programare marți</p>
                        <p className="text-green-200 text-[10px] text-right mt-1">09:01</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#0A1628] rounded-xl rounded-tl-none px-3 py-2 max-w-[85%]">
                        <p className="text-white text-xs">Perfect! Marți am disponibil:<br/>• 10:00<br/>• 14:00<br/>• 16:30<br/><br/>Ce oră ți se potrivește? 📅</p>
                        <p className="text-gray-500 text-[10px] text-right mt-1">09:01</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-gold text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                24/7 AI
              </div>
            </div>

            {/* CTAs */}
            <div className="text-center space-y-4">
              <a
                href="https://app.catyai.io/login"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-[#D4B57A] text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.cta}
              </a>

              <div>
                <a
                  href="https://calendly.com/adrian-payai-x/30min?month=2026-03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1628] hover:bg-[#1a2744] text-white font-semibold rounded-xl transition-all border border-[#1a2744]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t.ctaSecondary}
                </a>
              </div>

              <p className="text-gray-500 text-sm">{t.trust}</p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.demoNumber}
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 bg-[#0A1628]/30 rounded-xl p-4 border border-[#1a2744]/50">
              <p className="text-gray-300 text-sm italic">{t.testimonial}</p>
              <p className="text-gold text-xs mt-2">{t.testimonialAuthor}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
