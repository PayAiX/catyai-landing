import { useState, useEffect, useRef } from 'react'

const translations = {
  en: {
    badge: 'No Website Needed',
    title1: 'No website?',
    title2: 'No problem.',
    subtitle: 'Connect your WhatsApp in 2 minutes. Caty responds to your customers instantly. Perfect for small businesses, freelancers, and local services.',
    step1: 'Scan QR code',
    step1desc: 'Like WhatsApp Web. Use your existing business number.',
    step2: 'Tell Caty about your business',
    step2desc: 'Services, prices, hours. Voice or text, takes 5 minutes.',
    step3: 'Start receiving customers',
    step3desc: 'Caty responds 24/7. Books appointments. Sends quotes.',
    cta: 'Connect WhatsApp Now →',
    trust: 'No website. No technical skills. No monthly fees for 500 conversations.',
    perfect: 'Perfect for:',
    industries: ['Hairdressers', 'Mechanics', 'Plumbers', 'Dentists', 'Trainers', 'Freelancers'],
    testimonial: '"I connected in 2 minutes. Now Caty books my appointments while I work."',
    testimonialAuthor: '— Maria, Hair Stylist'
  },
  ro: {
    badge: 'Fără Site Web',
    title1: 'Nu ai site?',
    title2: 'Nu-i problemă.',
    subtitle: 'Conectează-ți WhatsApp-ul în 2 minute. Caty răspunde instant clienților tăi. Perfect pentru afaceri mici, freelanceri și servicii locale.',
    step1: 'Scanează codul QR',
    step1desc: 'Ca la WhatsApp Web. Folosești numărul tău de business.',
    step2: 'Spune-i lui Caty despre afacerea ta',
    step2desc: 'Servicii, prețuri, program. Vocal sau text, durează 5 minute.',
    step3: 'Începe să primești clienți',
    step3desc: 'Caty răspunde 24/7. Programează întâlniri. Trimite oferte.',
    cta: 'Conectează WhatsApp Acum →',
    trust: 'Fără site. Fără cunoștințe tehnice. Fără taxe lunare pentru 500 conversații.',
    perfect: 'Perfect pentru:',
    industries: ['Frizeri', 'Mecanici', 'Instalatori', 'Stomatologi', 'Antrenori', 'Freelanceri'],
    testimonial: '"M-am conectat în 2 minute. Acum Caty îmi face programări în timp ce lucrez."',
    testimonialAuthor: '— Maria, Stilist'
  },
  es: {
    badge: 'Sin Sitio Web',
    title1: '¿No tienes web?',
    title2: 'No hay problema.',
    subtitle: 'Conecta tu WhatsApp en 2 minutos. Caty responde a tus clientes al instante. Perfecto para pequeños negocios, freelancers y servicios locales.',
    step1: 'Escanea el código QR',
    step1desc: 'Como WhatsApp Web. Usa tu número de negocio existente.',
    step2: 'Cuéntale a Caty sobre tu negocio',
    step2desc: 'Servicios, precios, horarios. Voz o texto, toma 5 minutos.',
    step3: 'Empieza a recibir clientes',
    step3desc: 'Caty responde 24/7. Agenda citas. Envía presupuestos.',
    cta: 'Conectar WhatsApp Ahora →',
    trust: 'Sin web. Sin conocimientos técnicos. Sin cuotas mensuales para 500 conversaciones.',
    perfect: 'Perfecto para:',
    industries: ['Peluqueros', 'Mecánicos', 'Fontaneros', 'Dentistas', 'Entrenadores', 'Freelancers'],
    testimonial: '"Me conecté en 2 minutos. Ahora Caty agenda mis citas mientras trabajo."',
    testimonialAuthor: '— María, Estilista'
  },
  pt: {
    badge: 'Sem Site Web',
    title1: 'Não tem site?',
    title2: 'Sem problema.',
    subtitle: 'Conecte seu WhatsApp em 2 minutos. Caty responde aos seus clientes instantaneamente. Perfeito para pequenos negócios, freelancers e serviços locais.',
    step1: 'Escaneie o código QR',
    step1desc: 'Como WhatsApp Web. Use seu número de negócio existente.',
    step2: 'Conte ao Caty sobre seu negócio',
    step2desc: 'Serviços, preços, horários. Voz ou texto, leva 5 minutos.',
    step3: 'Comece a receber clientes',
    step3desc: 'Caty responde 24/7. Agenda compromissos. Envia orçamentos.',
    cta: 'Conectar WhatsApp Agora →',
    trust: 'Sem site. Sem conhecimentos técnicos. Sem taxas mensais para 500 conversas.',
    perfect: 'Perfeito para:',
    industries: ['Cabeleireiros', 'Mecânicos', 'Encanadores', 'Dentistas', 'Personal', 'Freelancers'],
    testimonial: '"Me conectei em 2 minutos. Agora Caty agenda minhas consultas enquanto trabalho."',
    testimonialAuthor: '— Maria, Cabeleireira'
  },
  fr: {
    badge: 'Sans Site Web',
    title1: 'Pas de site web?',
    title2: 'Pas de problème.',
    subtitle: 'Connectez votre WhatsApp en 2 minutes. Caty répond instantanément à vos clients. Parfait pour les petites entreprises, freelances et services locaux.',
    step1: 'Scannez le code QR',
    step1desc: 'Comme WhatsApp Web. Utilisez votre numéro professionnel.',
    step2: 'Parlez de votre entreprise à Caty',
    step2desc: 'Services, prix, horaires. Vocal ou texte, 5 minutes.',
    step3: 'Commencez à recevoir des clients',
    step3desc: 'Caty répond 24/7. Prend les rendez-vous. Envoie des devis.',
    cta: 'Connecter WhatsApp Maintenant →',
    trust: 'Sans site. Sans compétences techniques. Sans frais mensuels pour 500 conversations.',
    perfect: 'Parfait pour:',
    industries: ['Coiffeurs', 'Mécaniciens', 'Plombiers', 'Dentistes', 'Coachs', 'Freelances'],
    testimonial: '"Je me suis connecté en 2 minutes. Maintenant Caty prend mes rendez-vous pendant que je travaille."',
    testimonialAuthor: '— Marie, Coiffeuse'
  }
}

export default function QRFirst() {
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

  const steps = [
    { num: '1', title: t.step1, desc: t.step1desc, icon: '📱' },
    { num: '2', title: t.step2, desc: t.step2desc, icon: '💬' },
    { num: '3', title: t.step3, desc: t.step3desc, icon: '🚀' }
  ]

  return (
    <section ref={ref} id="qr-first" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-green-950/20 to-gray-900 relative overflow-hidden">
      {/* WhatsApp pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325D366' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left - Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t.title1}<br />
              <span className="text-green-400">{t.title2}</span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">{step.title}</div>
                    <div className="text-gray-500 text-sm">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://app.catyai.io/qr-first"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.cta}
            </a>

            <p className="text-gray-500 text-sm mt-4">
              {t.trust}
            </p>
          </div>

          {/* Right - Visual */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Phone mockup with QR */}
            <div className="relative mx-auto max-w-sm">
              {/* Phone frame */}
              <div className="bg-gray-800 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-gray-800 px-6 py-2 flex justify-between items-center text-xs text-gray-400">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* WhatsApp header */}
                  <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-xl">🐱</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Caty AI</div>
                      <div className="text-green-200 text-xs">Online</div>
                    </div>
                  </div>

                  {/* Chat area */}
                  <div className="bg-[#0b141a] p-4 min-h-[300px] space-y-3">
                    {/* QR Code placeholder */}
                    <div className="bg-white rounded-xl p-4 mx-auto w-fit">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v1h-1v-1zm-1 1h1v1h-1v-1zm2 0h1v1h-1v-1zm1 1h1v1h-1v-1zm-1 1h1v1h-1v-1zm1 1h1v1h-1v-1zm1-3h1v1h-1v-1zm1 1h1v3h-1v-3zm-1 3h1v1h-1v-1zm-2 0h1v1h-1v-1zm-1-1h1v1h-1v-1zm-1 1h1v1h-1v-1z"/>
                        </svg>
                      </div>
                      <div className="text-center mt-2 text-gray-600 text-xs">Scan to connect</div>
                    </div>

                    {/* Connected message */}
                    <div className="flex justify-end">
                      <div className="bg-green-700 rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                        <p className="text-white text-sm">✅ Connected!</p>
                        <p className="text-green-200 text-xs mt-1">2 min ago</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-gray-800 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                        <p className="text-white text-sm">Perfect! Tell me about your business and I'll start helping your customers 24/7 🚀</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                2 min setup!
              </div>
            </div>

            {/* Industries */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm mb-3">{t.perfect}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {t.industries.map((industry, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-400 text-xs">
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-300 text-sm italic">{t.testimonial}</p>
              <p className="text-green-400 text-xs mt-2">{t.testimonialAuthor}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
