import { useState, useEffect, useRef } from 'react'

const translations = {
  ro: {
    badge: 'QR-FIRST · FĂRĂ SITE · DOAR €10/LUNĂ',
    title: 'WhatsApp AI',
    titleHighlight: 'Nu ai site? Nicio problemă.',
    subtitle: '500.000 de afaceri din România funcționează fără website. Saloane, restaurante, meșteri, cabinete — toți pierd clienți când nu pot răspunde. CatyAI QR-First rezolvă asta: lipești un QR pe vitrină, clientul scanează, Caty răspunde instant pe WhatsApp. Setup 2 minute, €10/lună.',
    problemQuote: '„Eram la o clientă cu pensula în mână. Telefonul suna. Am văzut mesajul abia la 11 noaptea. Clienta se programase deja în altă parte."',
    othersTitle: 'Ceilal\u021bi',
    othersSubtitle: 'Cum func\u021bioneaz\u0103',
    othersDesc: 'WhatsApp AI "tradi\u021bional"',
    others: [
      { icon: '\u2715', title: 'Cont Meta Business verificat', desc: '2-4 s\u0103pt\u0103m\u00e2ni de a\u0219teptare' },
      { icon: '\u2715', title: 'WhatsApp Business API', desc: '$0.05 - $0.15 per mesaj trimis' },
      { icon: '\u2715', title: 'Intermediar: Twilio, Whapi, 360dialog', desc: '$50 - $200/lun\u0103 subscription' },
      { icon: '\u2715', title: 'Developer care configureaz\u0103 totul', desc: 'Webhook-uri, template-uri, approval' },
      { icon: '\u2715', title: 'Num\u0103r nou de telefon dedicat', desc: 'Clien\u021bii nu-l recunosc' }
    ],
    othersCost: '$200+',
    othersCostLabel: '/lun\u0103 cost total',
    othersCostExtra: '+ setup weeks',
    catyTitle: 'CatyAI',
    catySubtitle: 'Cum func\u021bioneaz\u0103',
    catyDesc: 'WhatsApp AI cu CatyAI',
    caty: [
      { icon: '\u2713', title: 'Scanezi QR code cu telefonul t\u0103u', desc: 'Ca la WhatsApp Web. At\u00e2t.' },
      { icon: '\u2713', title: 'Zero cost per mesaj', desc: 'Nelimitat, inclus \u00een plan' },
      { icon: '\u2713', title: 'Zero intermediari', desc: 'Conexiune direct\u0103 la WhatsApp' },
      { icon: '\u2713', title: 'Zero configurare tehnic\u0103', desc: 'Nu ai nevoie de developer' },
      { icon: '\u2713', title: 'Num\u0103rul T\u0102U existent', desc: 'Acelea\u0219i contacte, acelea\u0219i conversa\u021bii' }
    ],
    catyCost: '\u20ac0',
    catyCostLabel: 'cost extra WhatsApp',
    catyCostExtra: 'setup: 2 minute',
    stats: [
      { value: '2 min', label: 'Setup complet' },
      { value: '\u20ac0', label: 'Cost WhatsApp extra' },
      { value: '0', label: 'Intermediari necesari' },
      { value: '24/7', label: 'AI r\u0103spunde non-stop' }
    ],
    featuresTitle: 'Ce face Caty pe WhatsApp-ul t\u0103u',
    featuresSubtitle: 'Acela\u0219i num\u0103r. Acelea\u0219i contacte. Acum cu un AI care r\u0103spunde c\u00e2nd tu nu po\u021bi.',
    features: [
      { icon: '\ud83d\udcac', title: 'R\u0103spunde automat 24/7', desc: 'Clien\u021bii t\u0103i primesc r\u0103spuns instant \u2014 noaptea, weekend, s\u0103rb\u0103tori. Tu dormi, Caty vinde.' },
      { icon: '\ud83e\udde0', title: '\u0218tie totul despre afacerea ta', desc: 'Produse, pre\u021buri, program, servicii \u2014 Caty r\u0103spunde cu informa\u021bii reale, nu inventate.' },
      { icon: '\ud83d\udc64', title: 'Clasific\u0103 contactele', desc: 'Client, prospect, furnizor, personal, spam. Ton diferit per categorie.' },
      { icon: '\ud83d\udcc5', title: 'Programeaz\u0103 \u00eent\u00e2lniri', desc: 'Google Calendar sync. Verific\u0103 disponibilitate, trimite confirmare, reminder automat.' },
      { icon: '\ud83d\udee1\ufe0f', title: 'FraudAI Shield inclus', desc: 'Blocheaz\u0103 link-uri de phishing, cereri de coduri OTP, \u0219i scam-uri \u2014 automat.' },
      { icon: '\u270b', title: 'Preia controlul oric\u00e2nd', desc: 'Admin takeover: intri \u00een conversa\u021bie, Caty se opre\u0219te. 60 secunde timeout, apoi revine.' }
    ],
    chatDemo: {
      name: 'Caty AI',
      status: 'online',
      messages: [
        { from: 'user', text: 'Bun\u0103, ave\u021bi invita\u021bii pentru nunt\u0103 cu tematic\u0103 floral\u0103?', time: '22:47' },
        { from: 'caty', text: 'Bun\u0103! \ud83c\udf38 Da, avem mai multe colec\u021bii cu tematic\u0103 floral\u0103. C\u00e2\u021bi invita\u021bi ave\u021bi la nunt\u0103? A\u0219a v\u0103 pot recomanda cel mai bun raport calitate-pre\u021b.', time: '22:47' },
        { from: 'user', text: 'Aproximativ 150', time: '22:48' },
        { from: 'caty', text: 'Pentru 150 invita\u021bi, v\u0103 recomand Colec\u021bia Papirus Floral \u2014 3.05 RON/buc. Total: ~458 RON. Include personalizare text + plic. Vre\u021bi s\u0103 vede\u021bi modele?', time: '22:48' },
        { from: 'user', text: 'Da, trimite\u021bi! \ud83d\ude0d', time: '22:48' }
      ]
    },
    steps: [
      { icon: '\ud83d\udcf1', step: 'Pasul 1', title: 'Scaneaz\u0103 QR code', time: '30 secunde' },
      { icon: '\ud83e\udde0', step: 'Pasul 2', title: 'Caty \u00eenv\u0103\u021b\u0103 afacerea ta', time: '60 secunde' },
      { icon: '\u2705', step: 'Pasul 3', title: 'Gata. Caty r\u0103spunde.', time: 'Live!' }
    ],
    stepsTitle: 'Setup în 3 pași',
    ctaTitle: 'Lipești QR-ul. Caty vinde.',
    ctaSubtitle: 'Doar €10/lună. Fără site. Fără cunoștințe tehnice.',
    ctaDesc: 'Clienții scanează, Caty răspunde instant cu prețuri, program și servicii. Tu te ocupi de treabă.',
    ctaBtn: '🟢 Începe acum — €10/lună'
  },
  en: {
    badge: 'QR-FIRST · NO WEBSITE · JUST €10/MONTH',
    title: 'WhatsApp AI',
    titleHighlight: 'No website? No problem.',
    subtitle: '500,000 businesses operate without a website. Hair salons, restaurants, mechanics, clinics — all lose customers when they can\'t answer. CatyAI QR-First solves this: stick a QR on your window, customer scans it, Caty responds instantly on WhatsApp. 2-minute setup, €10/month.',
    problemQuote: '"I was with a client, brush in hand. Phone rang. I saw the message at 11 PM. The client had already booked elsewhere."',
    othersTitle: 'Others',
    othersSubtitle: 'How it works',
    othersDesc: '"Traditional" WhatsApp AI',
    others: [
      { icon: '\u2715', title: 'Verified Meta Business account', desc: '2-4 weeks of waiting' },
      { icon: '\u2715', title: 'WhatsApp Business API', desc: '$0.05 - $0.15 per message sent' },
      { icon: '\u2715', title: 'Middleman: Twilio, Whapi, 360dialog', desc: '$50 - $200/month subscription' },
      { icon: '\u2715', title: 'Developer to configure everything', desc: 'Webhooks, templates, approval' },
      { icon: '\u2715', title: 'New dedicated phone number', desc: 'Customers don\'t recognize it' }
    ],
    othersCost: '$200+',
    othersCostLabel: '/month total cost',
    othersCostExtra: '+ setup weeks',
    catyTitle: 'CatyAI',
    catySubtitle: 'How it works',
    catyDesc: 'WhatsApp AI with CatyAI',
    caty: [
      { icon: '\u2713', title: 'Scan QR code with your phone', desc: 'Like WhatsApp Web. That\'s it.' },
      { icon: '\u2713', title: 'Zero cost per message', desc: 'Unlimited, included in plan' },
      { icon: '\u2713', title: 'Zero middlemen', desc: 'Direct connection to WhatsApp' },
      { icon: '\u2713', title: 'Zero technical setup', desc: 'No developer needed' },
      { icon: '\u2713', title: 'YOUR existing number', desc: 'Same contacts, same conversations' }
    ],
    catyCost: '\u20ac0',
    catyCostLabel: 'extra WhatsApp cost',
    catyCostExtra: 'setup: 2 minutes',
    stats: [
      { value: '2 min', label: 'Complete setup' },
      { value: '\u20ac0', label: 'Extra WhatsApp cost' },
      { value: '0', label: 'Middlemen required' },
      { value: '24/7', label: 'AI responds non-stop' }
    ],
    featuresTitle: 'What Caty does on your WhatsApp',
    featuresSubtitle: 'Same number. Same contacts. Now with an AI that responds when you can\'t.',
    features: [
      { icon: '\ud83d\udcac', title: 'Auto-responds 24/7', desc: 'Your customers get instant replies \u2014 nights, weekends, holidays. You sleep, Caty sells.' },
      { icon: '\ud83e\udde0', title: 'Knows your business', desc: 'Products, prices, hours, services \u2014 Caty responds with real info, not made up.' },
      { icon: '\ud83d\udc64', title: 'Classifies contacts', desc: 'Customer, prospect, supplier, personal, spam. Different tone per category.' },
      { icon: '\ud83d\udcc5', title: 'Schedules meetings', desc: 'Google Calendar sync. Checks availability, sends confirmation, auto reminder.' },
      { icon: '\ud83d\udee1\ufe0f', title: 'FraudAI Shield included', desc: 'Blocks phishing links, OTP code requests, and scams \u2014 automatically.' },
      { icon: '\u270b', title: 'Take over anytime', desc: 'Admin takeover: enter the conversation, Caty stops. 60 second timeout, then resumes.' }
    ],
    chatDemo: {
      name: 'Caty AI',
      status: 'online',
      messages: [
        { from: 'user', text: 'Hi, do you have wedding invitations with floral theme?', time: '22:47' },
        { from: 'caty', text: 'Hello! \ud83c\udf38 Yes, we have several floral theme collections. How many guests at your wedding? I can recommend the best value.', time: '22:47' },
        { from: 'user', text: 'Around 150', time: '22:48' },
        { from: 'caty', text: 'For 150 guests, I recommend the Papirus Floral Collection \u2014 3.05 RON/pc. Total: ~458 RON. Includes text customization + envelope. Want to see models?', time: '22:48' },
        { from: 'user', text: 'Yes, send them! \ud83d\ude0d', time: '22:48' }
      ]
    },
    steps: [
      { icon: '\ud83d\udcf1', step: 'Step 1', title: 'Scan QR code', time: '30 seconds' },
      { icon: '\ud83e\udde0', step: 'Step 2', title: 'Caty learns your business', time: '60 seconds' },
      { icon: '\u2705', step: 'Step 3', title: 'Done. Caty responds.', time: 'Live!' }
    ],
    stepsTitle: 'Setup in 3 steps',
    ctaTitle: 'Stick the QR. Caty sells.',
    ctaSubtitle: 'Just €10/month. No website. No tech skills.',
    ctaDesc: 'Customers scan, Caty responds instantly with prices, hours, and services. You focus on your work.',
    ctaBtn: '🟢 Start now — €10/month'
  }
}

export default function WhatsAppZeroMeta() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const [lang, setLang] = useState('ro')

  useEffect(() => {
    const updateLang = () => {
      const stored = localStorage.getItem('caty-lang')
      if (stored && translations[stored]) {
        setLang(stored)
      } else {
        const browserLang = navigator.language?.slice(0, 2)
        if (translations[browserLang]) setLang(browserLang)
        else setLang('ro')
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

  const t = translations[lang] || translations.ro

  return (
    <section ref={ref} id="whatsapp-zero-meta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325D366' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="text-green-400 text-sm font-bold uppercase tracking-wider">{t.badge}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {t.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-green-400 mb-6">
            {t.titleHighlight}
          </h3>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-6">
            {t.subtitle}
          </p>

          {t.problemQuote && (
            <div className="max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 rounded-xl p-4 italic text-gray-300 text-sm">
              {t.problemQuote}
            </div>
          )}
        </div>

        {/* Comparison Cards */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Others - Red Card */}
          <div className="bg-gray-900/80 rounded-3xl border border-red-500/30 overflow-hidden">
            <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20">
              <div className="text-red-400 text-sm font-semibold">{t.othersTitle}</div>
              <div className="text-gray-500 text-xs">{t.othersSubtitle}</div>
              <div className="text-white font-bold mt-1">{t.othersDesc}</div>
            </div>
            <div className="p-6 space-y-4">
              {t.others.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm font-bold">{item.icon}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-red-500/5 border-t border-red-500/20 text-center">
              <div className="text-3xl font-extrabold text-red-400">{t.othersCost}</div>
              <div className="text-red-300 text-sm">{t.othersCostLabel}</div>
              <div className="text-gray-500 text-xs">{t.othersCostExtra}</div>
            </div>
          </div>

          {/* CatyAI - Green Card */}
          <div className="bg-gray-900/80 rounded-3xl border border-green-500/30 overflow-hidden relative">
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
              RECOMANDAT
            </div>
            <div className="bg-green-500/10 px-6 py-4 border-b border-green-500/20">
              <div className="text-green-400 text-sm font-semibold">{t.catyTitle}</div>
              <div className="text-gray-500 text-xs">{t.catySubtitle}</div>
              <div className="text-white font-bold mt-1">{t.catyDesc}</div>
            </div>
            <div className="p-6 space-y-4">
              {t.caty.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-sm font-bold">{item.icon}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{item.title}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-green-500/5 border-t border-green-500/20 text-center">
              <div className="text-3xl font-extrabold text-green-400">{t.catyCost}</div>
              <div className="text-green-300 text-sm">{t.catyCostLabel}</div>
              <div className="text-gray-500 text-xs">{t.catyCostExtra}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {t.stats.map((stat, i) => (
            <div key={i} className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className={`mb-20 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.featuresTitle}</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.featuresSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 hover:border-green-500/30 transition-all">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Demo - iPhone Mockup */}
        <div className={`mb-20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-[320px] mx-auto">
            {/* iPhone Frame */}
            <div className="relative">
              {/* Outer frame - titanium look */}
              <div className="bg-gradient-to-b from-[#2a2a2e] via-[#1c1c1e] to-[#2a2a2e] rounded-[55px] p-[3px] shadow-[0_0_60px_rgba(0,0,0,0.5),inset_0_0_1px_rgba(255,255,255,0.1)]">
                {/* Inner bezel */}
                <div className="bg-black rounded-[52px] p-[10px]">
                  {/* Screen container */}
                  <div className="relative bg-black rounded-[42px] overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                      <div className="bg-black w-[120px] h-[35px] rounded-full flex items-center justify-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#1a1a1a] ring-1 ring-gray-800"></div>
                        <div className="w-2 h-2 rounded-full bg-[#0a3d2e]"></div>
                      </div>
                    </div>

                    {/* WhatsApp App */}
                    <div className="pt-12">
                      {/* WhatsApp header */}
                      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                        <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img src="/images/caty-icon-32.png" alt="Caty" className="w-7 h-7 object-contain" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{t.chatDemo.name}</div>
                          <div className="text-green-200 text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            {t.chatDemo.status}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>

                      {/* Chat messages */}
                      <div className="bg-[#0b141a] p-3 space-y-2 min-h-[320px]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-2 0a2 2 0 104 0a2 2 0 10-4 0' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E")`,
                      }}>
                        {t.chatDemo.messages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${msg.from === 'user' ? 'bg-[#005c4b] rounded-tr-sm' : 'bg-[#202c33] rounded-tl-sm'} rounded-lg px-3 py-1.5 max-w-[85%] shadow-sm`}>
                              <p className="text-white text-[13px] leading-relaxed">{msg.text}</p>
                              <p className={`${msg.from === 'user' ? 'text-[#8fbbaf]' : 'text-[#8696a0]'} text-[10px] text-right mt-0.5 flex items-center justify-end gap-1`}>
                                {msg.time}
                                {msg.from === 'user' && (
                                  <svg className="w-4 h-3 text-[#53bdeb]" viewBox="0 0 16 11" fill="currentColor">
                                    <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.136.475.475 0 0 0-.347.147.518.518 0 0 0 .003.697l2.734 2.582c.089.084.201.131.319.131h.013a.46.46 0 0 0 .322-.149l6.548-8.074a.506.506 0 0 0-.041-.701l.065.063zM15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.028-.971-.626.749 1.329 1.254c.089.084.201.131.319.131h.013a.46.46 0 0 0 .322-.149l6.548-8.074a.506.506 0 0 0-.041-.701l.039.049z"/>
                                  </svg>
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input bar */}
                      <div className="bg-[#0b141a] px-2 py-2 flex items-center gap-2">
                        <div className="flex-1 bg-[#202c33] rounded-full px-4 py-2 flex items-center gap-3">
                          <svg className="w-5 h-5 text-[#8696a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-[#8696a0] text-sm flex-1">Message</span>
                          <svg className="w-5 h-5 text-[#8696a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </div>
                        <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="bg-[#0b141a] pb-2 pt-1 flex justify-center">
                      <div className="w-32 h-1 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side buttons - left */}
              <div className="absolute left-[-2px] top-[120px] w-[3px] h-8 bg-[#2a2a2e] rounded-l-sm"></div>
              <div className="absolute left-[-2px] top-[170px] w-[3px] h-16 bg-[#2a2a2e] rounded-l-sm"></div>
              <div className="absolute left-[-2px] top-[200px] w-[3px] h-16 bg-[#2a2a2e] rounded-l-sm"></div>

              {/* Side button - right */}
              <div className="absolute right-[-2px] top-[160px] w-[3px] h-20 bg-[#2a2a2e] rounded-r-sm"></div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-green-500/30 z-30">
                24/7 AI
              </div>
            </div>
          </div>
        </div>

        {/* Setup Steps */}
        <div className={`mb-16 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8">{t.stepsTitle}</h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {t.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-gray-800/80 rounded-2xl p-6 text-center border border-gray-700/50 min-w-[160px]">
                  <div className="text-4xl mb-2">{step.icon}</div>
                  <div className="text-green-400 text-xs font-semibold mb-1">{step.step}</div>
                  <div className="text-white font-medium text-sm mb-1">{step.title}</div>
                  <div className="text-gray-500 text-xs">{step.time}</div>
                </div>
                {i < t.steps.length - 1 && (
                  <div className="hidden md:block text-gray-600 text-2xl">\u2192</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.ctaTitle}</h3>
          <p className="text-xl text-green-400 font-semibold mb-4">{t.ctaSubtitle}</p>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>

          <a
            href="https://app.catyai.io/qr-first"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]"
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
