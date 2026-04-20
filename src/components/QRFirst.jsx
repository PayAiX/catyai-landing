import { useState, useEffect, useRef } from 'react'

const translations = {
  en: {
    badge: 'No Website Needed',
    title1: 'No website?',
    title2: 'No problem.',
    subtitle: 'Connect your WhatsApp in 2 minutes. Caty responds to your customers instantly. Perfect for small businesses, freelancers, and local services.',

    // Benefits
    benefitsTitle: 'Why QR-First Works',
    benefits: [
      { icon: '⚡', title: 'Live in 2 Minutes', desc: 'Scan QR, answer a few questions, done. No apps to install.' },
      { icon: '💰', title: 'Zero Technical Costs', desc: 'No website hosting, no domain, no developer fees.' },
      { icon: '📱', title: 'Use Your Number', desc: 'Customers message YOUR existing WhatsApp number.' },
      { icon: '🌙', title: 'Never Miss a Lead', desc: 'Caty responds 24/7, even at 3 AM on weekends.' },
      { icon: '📅', title: 'Automatic Bookings', desc: 'Google Calendar sync. Confirmations via WhatsApp.' },
      { icon: '🛡️', title: 'Scam Protection', desc: 'FraudAI blocks phishing before you see it.' }
    ],

    // Steps
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

    // Mock - Customer view after scanning QR
    mockBizName: "Maria's Hair Salon",
    mockBizInfo: 'Mon-Sat 9:00-19:00 • ⭐ 4.9',
    mockServices: ['Haircut €25', 'Color €50', 'Styling €35'],
    mockCustomerAsk: 'Do you have appointments tomorrow?',
    mockCatyReply: "Yes! Tomorrow I have slots at 10:00, 14:00, and 16:30. Which works for you? I'll book it right away 💇‍♀️",
    mockCustomerBook: '14:00 please',
    mockBooked: "Perfect! You're booked for tomorrow at 14:00 with Maria. You'll get a reminder 30 min before. See you! ✅",

    testimonial: '"Customers scan my QR, see my services, and book instantly. No website needed."',
    testimonialAuthor: '— Maria, Hair Stylist',

    resultsTitle: 'Results in 7 Days',
    results: [
      { value: '47', label: 'customers served' },
      { value: '12', label: 'appointments booked' },
      { value: '€0', label: 'spent on website' }
    ]
  },
  ro: {
    badge: 'Fără Site Web',
    title1: 'Nu ai site?',
    title2: 'Nu-i problemă.',
    subtitle: 'Conectează-ți WhatsApp-ul în 2 minute. Caty răspunde instant clienților tăi. Perfect pentru afaceri mici, freelanceri și servicii locale.',

    benefitsTitle: 'De Ce Funcționează',
    benefits: [
      { icon: '⚡', title: 'Live în 2 Minute', desc: 'Scanezi QR, răspunzi la câteva întrebări, gata. Fără aplicații.' },
      { icon: '💰', title: 'Zero Costuri Tehnice', desc: 'Fără hosting, fără domeniu, fără dezvoltatori.' },
      { icon: '📱', title: 'Folosești Numărul Tău', desc: 'Clienții scriu pe NUMĂRUL TĂU de WhatsApp.' },
      { icon: '🌙', title: 'Nu Pierzi Niciun Lead', desc: 'Caty răspunde 24/7, chiar și la 3 dimineața.' },
      { icon: '📅', title: 'Programări Automate', desc: 'Sync cu Google Calendar. Confirmări pe WhatsApp.' },
      { icon: '🛡️', title: 'Protecție Înșelăciuni', desc: 'FraudAI blochează phishing-ul înainte să-l vezi.' }
    ],

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

    mockBizName: 'Salon Maria',
    mockBizInfo: 'Lun-Sâm 9:00-19:00 • ⭐ 4.9',
    mockServices: ['Tuns €25', 'Vopsit €50', 'Coafat €35'],
    mockCustomerAsk: 'Aveți loc mâine?',
    mockCatyReply: 'Da! Mâine am loc la 10:00, 14:00 și 16:30. Care îți convine? Fac programarea imediat 💇‍♀️',
    mockCustomerBook: 'La 14:00 te rog',
    mockBooked: 'Perfect! Ești programat/ă mâine la 14:00 la Maria. Primești reminder cu 30 min înainte. Ne vedem! ✅',

    testimonial: '"Clienții scanează QR-ul, văd serviciile mele și programează instant. Fără site."',
    testimonialAuthor: '— Maria, Stilist',

    resultsTitle: 'Rezultate în 7 Zile',
    results: [
      { value: '47', label: 'clienți serviți' },
      { value: '12', label: 'programări făcute' },
      { value: '€0', label: 'cheltuiți pe site' }
    ]
  },
  es: {
    badge: 'Sin Sitio Web',
    title1: '¿No tienes web?',
    title2: 'No hay problema.',
    subtitle: 'Conecta tu WhatsApp en 2 minutos. Caty responde a tus clientes al instante. Perfecto para pequeños negocios, freelancers y servicios locales.',

    benefitsTitle: 'Por Qué Funciona',
    benefits: [
      { icon: '⚡', title: 'En Vivo en 2 Min', desc: 'Escanea QR, responde preguntas, listo. Sin apps.' },
      { icon: '💰', title: 'Cero Costos Técnicos', desc: 'Sin hosting, sin dominio, sin desarrolladores.' },
      { icon: '📱', title: 'Usa Tu Número', desc: 'Los clientes escriben a TU número de WhatsApp.' },
      { icon: '🌙', title: 'No Pierdas Leads', desc: 'Caty responde 24/7, incluso a las 3 AM.' },
      { icon: '📅', title: 'Reservas Automáticas', desc: 'Sync con Google Calendar. Confirmaciones por WhatsApp.' },
      { icon: '🛡️', title: 'Protección Estafas', desc: 'FraudAI bloquea phishing antes de que lo veas.' }
    ],

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

    mockBizName: 'Peluquería María',
    mockBizInfo: 'Lun-Sáb 9:00-19:00 • ⭐ 4.9',
    mockServices: ['Corte €25', 'Color €50', 'Peinado €35'],
    mockCustomerAsk: '¿Tienen citas mañana?',
    mockCatyReply: '¡Sí! Mañana tengo horarios a las 10:00, 14:00 y 16:30. ¿Cuál te viene bien? Te agendo al momento 💇‍♀️',
    mockCustomerBook: 'A las 14:00 por favor',
    mockBooked: '¡Perfecto! Tienes cita mañana a las 14:00 con María. Recibirás recordatorio 30 min antes. ¡Nos vemos! ✅',

    testimonial: '"Los clientes escanean mi QR, ven mis servicios y reservan al instante. Sin web."',
    testimonialAuthor: '— María, Estilista',

    resultsTitle: 'Resultados en 7 Días',
    results: [
      { value: '47', label: 'clientes atendidos' },
      { value: '12', label: 'citas agendadas' },
      { value: '€0', label: 'gastado en web' }
    ]
  },
  pt: {
    badge: 'Sem Site Web',
    title1: 'Não tem site?',
    title2: 'Sem problema.',
    subtitle: 'Conecte seu WhatsApp em 2 minutos. Caty responde aos seus clientes instantaneamente. Perfeito para pequenos negócios, freelancers e serviços locais.',

    benefitsTitle: 'Por Que Funciona',
    benefits: [
      { icon: '⚡', title: 'Online em 2 Min', desc: 'Escaneie QR, responda perguntas, pronto. Sem apps.' },
      { icon: '💰', title: 'Zero Custos Técnicos', desc: 'Sem hosting, sem domínio, sem desenvolvedores.' },
      { icon: '📱', title: 'Use Seu Número', desc: 'Clientes mandam mensagem para SEU número.' },
      { icon: '🌙', title: 'Não Perca Leads', desc: 'Caty responde 24/7, mesmo às 3 da manhã.' },
      { icon: '📅', title: 'Agendamento Auto', desc: 'Sync com Google Calendar. Confirmações no WhatsApp.' },
      { icon: '🛡️', title: 'Proteção Golpes', desc: 'FraudAI bloqueia phishing antes de você ver.' }
    ],

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

    mockBizName: 'Salão da Maria',
    mockBizInfo: 'Seg-Sáb 9:00-19:00 • ⭐ 4.9',
    mockServices: ['Corte €25', 'Coloração €50', 'Penteado €35'],
    mockCustomerAsk: 'Tem horário amanhã?',
    mockCatyReply: 'Sim! Amanhã tenho às 10:00, 14:00 e 16:30. Qual prefere? Agendo na hora 💇‍♀️',
    mockCustomerBook: 'Às 14:00 por favor',
    mockBooked: 'Perfeito! Você está agendada para amanhã às 14:00 com Maria. Receberá lembrete 30 min antes. Até lá! ✅',

    testimonial: '"Clientes escaneiam meu QR, veem meus serviços e agendam na hora. Sem site."',
    testimonialAuthor: '— Maria, Cabeleireira',

    resultsTitle: 'Resultados em 7 Dias',
    results: [
      { value: '47', label: 'clientes atendidos' },
      { value: '12', label: 'agendamentos feitos' },
      { value: '€0', label: 'gasto em site' }
    ]
  },
  fr: {
    badge: 'Sans Site Web',
    title1: 'Pas de site web?',
    title2: 'Pas de problème.',
    subtitle: 'Connectez votre WhatsApp en 2 minutes. Caty répond instantanément à vos clients. Parfait pour les petites entreprises, freelances et services locaux.',

    benefitsTitle: 'Pourquoi Ça Marche',
    benefits: [
      { icon: '⚡', title: 'En Ligne en 2 Min', desc: 'Scannez QR, répondez aux questions, terminé. Sans apps.' },
      { icon: '💰', title: 'Zéro Coûts Techniques', desc: 'Sans hébergement, sans domaine, sans développeurs.' },
      { icon: '📱', title: 'Utilisez Votre Numéro', desc: 'Les clients écrivent à VOTRE numéro WhatsApp.' },
      { icon: '🌙', title: 'Ne Perdez Plus de Leads', desc: 'Caty répond 24/7, même à 3h du matin.' },
      { icon: '📅', title: 'Réservations Auto', desc: 'Sync Google Calendar. Confirmations via WhatsApp.' },
      { icon: '🛡️', title: 'Protection Arnaques', desc: 'FraudAI bloque le phishing avant que vous ne le voyiez.' }
    ],

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

    mockBizName: 'Salon Marie',
    mockBizInfo: 'Lun-Sam 9:00-19:00 • ⭐ 4.9',
    mockServices: ['Coupe €25', 'Coloration €50', 'Coiffage €35'],
    mockCustomerAsk: 'Avez-vous des créneaux demain?',
    mockCatyReply: 'Oui! Demain j\'ai des créneaux à 10:00, 14:00 et 16:30. Lequel vous convient? Je réserve immédiatement 💇‍♀️',
    mockCustomerBook: 'À 14:00 s\'il vous plaît',
    mockBooked: 'Parfait! Vous êtes réservé pour demain à 14:00 avec Marie. Rappel 30 min avant. À bientôt! ✅',

    testimonial: '"Les clients scannent mon QR, voient mes services et réservent instantanément. Sans site."',
    testimonialAuthor: '— Marie, Coiffeuse',

    resultsTitle: 'Résultats en 7 Jours',
    results: [
      { value: '47', label: 'clients servis' },
      { value: '12', label: 'rendez-vous pris' },
      { value: '€0', label: 'dépensé en site' }
    ]
  }
}

export default function QRFirst() {
  const [isVisible, setIsVisible] = useState(false)
  const [mockStep, setMockStep] = useState(0)
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

  // Animate mock conversation
  useEffect(() => {
    if (!isVisible) return
    const timers = [
      setTimeout(() => setMockStep(1), 500),
      setTimeout(() => setMockStep(2), 1500),
      setTimeout(() => setMockStep(3), 3000),
      setTimeout(() => setMockStep(4), 4500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [isVisible])

  const t = translations[lang] || translations.en

  return (
    <section ref={ref} id="qr-first" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-[#1a1408]/20 to-gray-900 relative overflow-hidden">
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A165' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {t.title1} <span className="text-gold">{t.title2}</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Phone Mock with animated conversation */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative mx-auto" style={{ width: '380px' }}>
              {/* Phone frame - realistic iPhone style */}
              <div className="bg-[#010A1F] rounded-[3.5rem] p-4 shadow-2xl border-4 border-[#1a2744] relative">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#010A1F] rounded-full z-10"></div>

                <div className="bg-black rounded-[2.8rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-[#010A1F] px-8 py-3 flex justify-between items-center text-sm text-gray-300">
                    <span className="font-semibold">9:41</span>
                    <div className="flex gap-2 items-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73 1.6 0 3.15.25 4.6.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 4h-3V2h-4v2H7v18h10V4zm-2 16H9V6h6v14z"/></svg>
                    </div>
                  </div>

                  {/* WhatsApp header - business profile */}
                  <div className="bg-gradient-to-r from-gold to-[#D4B57A] px-5 py-5">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <span className="text-3xl">💇‍♀️</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg">{t.mockBizName}</div>
                        <div className="text-green-100 text-sm">{t.mockBizInfo}</div>
                      </div>
                    </div>
                    {/* Services tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {t.mockServices.map((service, i) => (
                        <span key={i} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-medium">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chat area - customer conversation */}
                  <div className="bg-[#0b141a] p-5 min-h-[400px] space-y-4">
                    {/* Customer asks */}
                    {mockStep >= 1 && (
                      <div className="flex justify-end animate-fade-in">
                        <div className="bg-[#005c4b] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] shadow-md">
                          <p className="text-white">{t.mockCustomerAsk}</p>
                          <p className="text-green-200/60 text-xs mt-1 text-right">9:41</p>
                        </div>
                      </div>
                    )}

                    {/* Caty responds with availability */}
                    {mockStep >= 2 && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-[#202c33] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-md">
                          <p className="text-white">{t.mockCatyReply}</p>
                          <p className="text-gray-400 text-xs mt-1 text-right">9:41</p>
                        </div>
                      </div>
                    )}

                    {/* Customer picks time */}
                    {mockStep >= 3 && (
                      <div className="flex justify-end animate-fade-in">
                        <div className="bg-[#005c4b] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] shadow-md">
                          <p className="text-white">{t.mockCustomerBook}</p>
                          <p className="text-green-200/60 text-xs mt-1 text-right">9:42</p>
                        </div>
                      </div>
                    )}

                    {/* Caty confirms booking */}
                    {mockStep >= 4 && (
                      <div className="flex justify-start animate-fade-in">
                        <div className="bg-[#202c33] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-md">
                          <p className="text-white">{t.mockBooked}</p>
                          <p className="text-gray-400 text-xs mt-1 text-right">9:42</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                    <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-gray-400 text-sm">
                      Type a message...
                    </div>
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gold text-[#010A1F] px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                2 min setup!
              </div>

              {/* Results card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0A1628]/95 backdrop-blur rounded-2xl p-4 border border-[#1a2744] shadow-xl">
                <p className="text-gray-400 text-xs mb-3 font-medium">{t.resultsTitle}</p>
                <div className="flex gap-4">
                  {t.results.map((r, i) => (
                    <div key={i} className="text-center">
                      <div className="text-gold text-xl font-bold">{r.value}</div>
                      <div className="text-gray-500 text-[10px]">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-16 bg-[#0A1628]/30 rounded-xl p-5 border border-[#1a2744]/50 max-w-sm mx-auto">
              <p className="text-gray-300 text-sm italic">{t.testimonial}</p>
              <p className="text-gold text-xs mt-2">{t.testimonialAuthor}</p>
            </div>
          </div>

          {/* Right - Benefits */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-2xl font-bold text-white mb-8">{t.benefitsTitle}</h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {t.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-5 bg-[#0A1628]/30 rounded-xl border border-[#1a2744]/50 hover:border-gold/30 transition-all hover:bg-[#0A1628]/50"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://app.catyai.io/qr-first"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-[#D4B57A] text-[#010A1F] font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] group w-full justify-center sm:w-auto"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.cta}
            </a>

            <p className="text-gray-500 text-sm mt-4">
              {t.trust}
            </p>

            {/* Industries */}
            <div className="mt-8">
              <p className="text-gray-500 text-sm mb-3">{t.perfect}</p>
              <div className="flex flex-wrap gap-2">
                {t.industries.map((industry, i) => (
                  <span key={i} className="px-3 py-1 bg-[#0A1628]/50 border border-[#1a2744]/50 rounded-full text-gray-400 text-xs hover:border-gold/30 hover:text-gold transition-colors cursor-default">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
