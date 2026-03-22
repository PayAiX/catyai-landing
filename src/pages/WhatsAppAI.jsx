import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const translations = {
  en: {
    badge: 'WhatsApp AI Secretary',
    heroTitle1: 'Your AI Secretary',
    heroTitle2: 'on WhatsApp',
    heroSubtitle: 'Responds to customers 24/7. Books appointments. Generates documents. Blocks scams. Works on your existing WhatsApp number — no new number needed.',
    heroCta: 'Connect WhatsApp Now',
    heroCtaSecondary: 'Try Demo First',
    trustBadge1: '500 conversations/month FREE',
    trustBadge2: 'No credit card required',
    trustBadge3: 'Setup in 2 minutes',

    problemTitle: 'Your Customers Message You.',
    problemHighlight: 'Nobody Answers.',
    problemStats: [
      { value: '40%', label: 'of customers message after hours' },
      { value: '67%', label: 'switch to competitor if no reply in 1h' },
      { value: '€1,500', label: 'monthly cost of a human receptionist' }
    ],
    problemSolution: 'CatyAI responds instantly, 24/7, for €0.',

    howTitle: 'How It Works',
    howSubtitle: 'Live in 2 minutes. No app to install. No technical skills needed.',
    howSteps: [
      { title: 'Scan QR Code', desc: 'Just like WhatsApp Web. Uses your existing business number.', icon: '📱' },
      { title: 'Tell Caty About Your Business', desc: 'Services, prices, hours, team. Voice or text, takes 5 minutes.', icon: '💬' },
      { title: 'Caty Takes Over', desc: 'Responds 24/7. Books appointments. Sends quotes. You relax.', icon: '🚀' }
    ],

    featuresTitle: 'Everything a Secretary Does.',
    featuresHighlight: 'Automated.',
    features: [
      {
        icon: '💬',
        title: 'Answers Customers 24/7',
        desc: 'Instant responses in natural language. Remembers conversation context. Speaks Romanian, English, Spanish, Portuguese, French, Arabic fluently with auto-detection.',
        highlight: '24/7'
      },
      {
        icon: '📅',
        title: 'Books Appointments',
        desc: 'Syncs with Google Calendar. Checks availability in real-time. Sends booking confirmations and 30-minute reminders directly on WhatsApp.',
        highlight: 'Google Calendar'
      },
      {
        icon: '📄',
        title: 'Generates Documents',
        desc: 'Creates quotes, invoices, booking confirmations as PDF. Sends them directly in WhatsApp chat. Your logo, your colors, your brand.',
        highlight: 'PDF'
      },
      {
        icon: '🛡️',
        title: 'Blocks Scams with FraudAI',
        desc: '8 detection modules: phishing links, fake urgency, impersonation, suspicious requests. Protects you before you even see the dangerous message.',
        highlight: 'FraudAI Shield'
      },
      {
        icon: '📋',
        title: 'Extracts Tasks Automatically',
        desc: '"Call Ion tomorrow at 10" becomes a task with reminder. "Order supplies" gets tracked. Daily digest email with everything extracted.',
        highlight: 'Auto-extract'
      },
      {
        icon: '🧠',
        title: 'Knows Your Business',
        desc: '12-domain Knowledge Base: services, pricing, hours, locations, team, policies, FAQs, promotions, booking rules, payment methods, and more.',
        highlight: '12 domains'
      }
    ],

    demoTitle: 'Try It Right Now',
    demoSubtitle: 'Send "demo" to our WhatsApp and see Caty in action.',
    demoNumber: '+40 750 195 048',
    demoInstructions: 'Open WhatsApp, send "demo" to the number above. Caty will respond instantly.',
    demoCta: 'Open WhatsApp Demo',

    useCasesTitle: 'Perfect For',
    useCases: [
      { icon: '🦷', title: 'Dental Clinics', desc: 'Book appointments 24/7, send reminders, handle cancellations' },
      { icon: '💇', title: 'Hair Salons', desc: 'Manage bookings, suggest services, confirm appointments' },
      { icon: '🍽️', title: 'Restaurants', desc: 'Take reservations, answer menu questions, handle special requests' },
      { icon: '🏋️', title: 'Fitness Studios', desc: 'Class bookings, membership inquiries, schedule changes' },
      { icon: '🏠', title: 'Real Estate', desc: 'Property inquiries, viewing appointments, lead qualification' },
      { icon: '⚙️', title: 'Service Providers', desc: 'Quote requests, scheduling, customer support' }
    ],

    pricingTitle: 'Simple Pricing',
    pricingSubtitle: 'WhatsApp Secretary is an add-on to any CatyAI plan.',
    pricingAddon: '+€49/month',
    pricingBase: 'on top of your base plan',
    pricingFeatures: [
      'Unlimited WhatsApp messages',
      'Google Calendar sync',
      'Document generation (PDF)',
      'FraudAI Shield protection',
      'Multi-language support',
      'Task extraction & reminders'
    ],
    pricingCta: 'Get Started',

    faqTitle: 'Questions?',
    faqs: [
      { q: 'Do I need a new WhatsApp number?', a: 'No. Caty connects to your existing business number via QR code, just like WhatsApp Web.' },
      { q: 'Will customers know it\'s AI?', a: 'Only if you want them to. Caty responds as your business, with your name and style.' },
      { q: 'What if Caty can\'t answer?', a: 'It forwards the conversation to you with full context. You take over seamlessly anytime.' },
      { q: 'Can I use it on multiple devices?', a: 'Yes. Caty works alongside your phone. You can see and respond to any conversation.' },
      { q: 'Is my data safe?', a: 'GDPR compliant. AWS Ireland servers. End-to-end encryption. You own your data.' }
    ],

    ctaTitle: 'Ready to Never Miss a Customer Again?',
    ctaSubtitle: 'Connect your WhatsApp in 2 minutes. Start responding 24/7.',
    ctaBtn: 'Connect WhatsApp Now',
    ctaDemo: 'Or try demo first →',

    footer: {
      copyright: '© 2026 PayAi-X FZE. All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact'
    }
  },
  ro: {
    badge: 'Secretară AI pe WhatsApp',
    heroTitle1: 'Secretara ta AI',
    heroTitle2: 'pe WhatsApp',
    heroSubtitle: 'Răspunde clienților 24/7. Programează întâlniri. Generează documente. Blochează escrocherii. Funcționează pe numărul tău de WhatsApp — nu ai nevoie de număr nou.',
    heroCta: 'Conectează WhatsApp Acum',
    heroCtaSecondary: 'Încearcă Demo Întâi',
    trustBadge1: '500 conversații/lună GRATUIT',
    trustBadge2: 'Fără card bancar',
    trustBadge3: 'Setup în 2 minute',

    problemTitle: 'Clienții îți scriu pe WhatsApp.',
    problemHighlight: 'Nimeni nu răspunde.',
    problemStats: [
      { value: '40%', label: 'din clienți scriu după program' },
      { value: '67%', label: 'aleg competitorul dacă nu primesc răspuns în 1h' },
      { value: '€1.500', label: 'costul lunar al unei recepționere' }
    ],
    problemSolution: 'CatyAI răspunde instant, 24/7, pentru €0.',

    howTitle: 'Cum Funcționează',
    howSubtitle: 'Live în 2 minute. Fără aplicație de instalat. Fără cunoștințe tehnice.',
    howSteps: [
      { title: 'Scanezi Codul QR', desc: 'Exact ca la WhatsApp Web. Folosești numărul tău de business.', icon: '📱' },
      { title: 'Spui Caty Despre Afacerea Ta', desc: 'Servicii, prețuri, program, echipă. Vocal sau text, durează 5 minute.', icon: '💬' },
      { title: 'Caty Preia Controlul', desc: 'Răspunde 24/7. Programează întâlniri. Trimite oferte. Tu te relaxezi.', icon: '🚀' }
    ],

    featuresTitle: 'Tot Ce Face o Secretară.',
    featuresHighlight: 'Automatizat.',
    features: [
      {
        icon: '💬',
        title: 'Răspunde Clienților 24/7',
        desc: 'Răspunsuri instant în limbaj natural. Ține minte contextul conversației. Vorbește fluent română, engleză, spaniolă, portugheză, franceză, arabă cu auto-detectare.',
        highlight: '24/7'
      },
      {
        icon: '📅',
        title: 'Programează Întâlniri',
        desc: 'Sincronizare cu Google Calendar. Verifică disponibilitatea în timp real. Trimite confirmări și remindere la 30 minute direct pe WhatsApp.',
        highlight: 'Google Calendar'
      },
      {
        icon: '📄',
        title: 'Generează Documente',
        desc: 'Creează oferte, facturi, confirmări rezervări ca PDF. Le trimite direct în chat WhatsApp. Logo-ul tău, culorile tale, brand-ul tău.',
        highlight: 'PDF'
      },
      {
        icon: '🛡️',
        title: 'Blochează Escrocherii cu FraudAI',
        desc: '8 module de detecție: link-uri phishing, urgențe false, impersonare, cereri suspecte. Te protejează înainte să vezi mesajul periculos.',
        highlight: 'FraudAI Shield'
      },
      {
        icon: '📋',
        title: 'Extrage Sarcini Automat',
        desc: '"Sună-l pe Ion mâine la 10" devine task cu reminder. "Comandă consumabile" e urmărit. Email zilnic cu tot ce a extras.',
        highlight: 'Auto-extract'
      },
      {
        icon: '🧠',
        title: 'Cunoaște Afacerea Ta',
        desc: 'Knowledge Base cu 12 domenii: servicii, prețuri, program, locații, echipă, politici, FAQ, promoții, reguli rezervări, metode plată și mai mult.',
        highlight: '12 domenii'
      }
    ],

    demoTitle: 'Încearcă Acum',
    demoSubtitle: 'Trimite "demo" pe WhatsApp și vezi Caty în acțiune.',
    demoNumber: '+40 750 195 048',
    demoInstructions: 'Deschide WhatsApp, trimite "demo" la numărul de mai sus. Caty răspunde instant.',
    demoCta: 'Deschide Demo WhatsApp',

    useCasesTitle: 'Perfect Pentru',
    useCases: [
      { icon: '🦷', title: 'Clinici Dentare', desc: 'Programări 24/7, remindere, gestionare anulări' },
      { icon: '💇', title: 'Saloane de Frumusețe', desc: 'Gestionare rezervări, sugestii servicii, confirmări' },
      { icon: '🍽️', title: 'Restaurante', desc: 'Rezervări, întrebări meniu, cereri speciale' },
      { icon: '🏋️', title: 'Săli de Fitness', desc: 'Rezervări cursuri, întrebări abonamente, modificări program' },
      { icon: '🏠', title: 'Imobiliare', desc: 'Întrebări proprietăți, programări vizionări, calificare lead-uri' },
      { icon: '⚙️', title: 'Furnizori Servicii', desc: 'Cereri oferte, programări, suport clienți' }
    ],

    pricingTitle: 'Prețuri Simple',
    pricingSubtitle: 'Secretara WhatsApp e un add-on la orice plan CatyAI.',
    pricingAddon: '+€49/lună',
    pricingBase: 'peste planul de bază',
    pricingFeatures: [
      'Mesaje WhatsApp nelimitate',
      'Sincronizare Google Calendar',
      'Generare documente (PDF)',
      'Protecție FraudAI Shield',
      'Suport multi-limbă',
      'Extragere sarcini & remindere'
    ],
    pricingCta: 'Începe Acum',

    faqTitle: 'Întrebări?',
    faqs: [
      { q: 'Am nevoie de un număr nou de WhatsApp?', a: 'Nu. Caty se conectează la numărul tău existent prin cod QR, exact ca WhatsApp Web.' },
      { q: 'Vor ști clienții că e AI?', a: 'Doar dacă vrei tu. Caty răspunde ca afacerea ta, cu numele și stilul tău.' },
      { q: 'Ce se întâmplă dacă Caty nu poate răspunde?', a: 'Îți redirecționează conversația cu tot contextul. Preiei tu oricând, fără întrerupere.' },
      { q: 'Pot să-l folosesc pe mai multe dispozitive?', a: 'Da. Caty funcționează în paralel cu telefonul tău. Poți vedea și răspunde la orice conversație.' },
      { q: 'Datele mele sunt în siguranță?', a: 'Conform GDPR. Servere AWS Irlanda. Criptare end-to-end. Datele tale rămân ale tale.' }
    ],

    ctaTitle: 'Gata să Nu Mai Pierzi Niciun Client?',
    ctaSubtitle: 'Conectează WhatsApp în 2 minute. Începe să răspunzi 24/7.',
    ctaBtn: 'Conectează WhatsApp Acum',
    ctaDemo: 'Sau încearcă demo întâi →',

    footer: {
      copyright: '© 2026 PayAi-X FZE. Toate drepturile rezervate.',
      privacy: 'Confidențialitate',
      terms: 'Termeni',
      contact: 'Contact'
    }
  }
}

export default function WhatsAppAI() {
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

  const t = translations[lang] || translations.en

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO
        title="WhatsApp AI Secretary | CatyAI"
        description="AI secretary on WhatsApp. Responds 24/7, books appointments, generates documents, blocks scams. Works on your existing number."
        url="https://catyai.io/whatsapp"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/caty-logo.webp" alt="CatyAI" className="h-10" width="40" height="40" />
              <span className="text-xl font-bold">Caty.AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors hidden sm:inline">
                ← Back to Home
              </Link>
              <a
                href="https://app.catyai.io/signup?addon=whatsapp"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {t.heroCta}
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-green-400 text-sm font-medium">{t.badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t.heroTitle1}<br />
                <span className="text-green-400">{t.heroTitle2}</span>
              </h1>

              <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://app.catyai.io/signup?addon=whatsapp"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.heroCta}
                </a>
                <a
                  href="#demo"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                >
                  {t.heroCtaSecondary}
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.trustBadge1}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.trustBadge2}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.trustBadge3}
                </span>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto" style={{ maxWidth: '320px' }}>
                {/* Phone frame */}
                <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-800">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden">
                    {/* WhatsApp header */}
                    <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                        <img src="/images/caty-logo.webp" alt="Caty" className="w-8 h-8 object-contain" width="32" height="32" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">Caty Secretary</div>
                        <div className="text-green-200 text-xs flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Online 24/7
                        </div>
                      </div>
                      <div className="flex gap-4 text-white/70">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="bg-[#0B141A] px-3 py-4 space-y-3" style={{ minHeight: '400px' }}>
                      {/* Incoming message */}
                      <div className="flex gap-2">
                        <div className="bg-[#202C33] rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
                          <p className="text-gray-200 text-sm">Bună! Aș vrea să fac o programare pentru mâine. 🙏</p>
                          <span className="text-[10px] text-gray-500 float-right mt-1">09:41</span>
                        </div>
                      </div>

                      {/* Outgoing message (Caty) */}
                      <div className="flex justify-end">
                        <div className="bg-[#005C4B] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%]">
                          <p className="text-gray-100 text-sm">Bună! 👋 Cu plăcere te ajut cu programarea.</p>
                          <p className="text-gray-100 text-sm mt-2">Mâine avem disponibile:</p>
                          <p className="text-gray-100 text-sm">• 10:00 - 11:00</p>
                          <p className="text-gray-100 text-sm">• 14:00 - 15:00</p>
                          <p className="text-gray-100 text-sm">• 16:30 - 17:30</p>
                          <p className="text-gray-100 text-sm mt-2">Care interval îți convine? 📅</p>
                          <span className="text-[10px] text-green-200 float-right mt-1 flex items-center gap-1">
                            09:41
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Incoming message */}
                      <div className="flex gap-2">
                        <div className="bg-[#202C33] rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
                          <p className="text-gray-200 text-sm">14:00 ar fi perfect!</p>
                          <span className="text-[10px] text-gray-500 float-right mt-1">09:42</span>
                        </div>
                      </div>

                      {/* Outgoing message (Caty) */}
                      <div className="flex justify-end">
                        <div className="bg-[#005C4B] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%]">
                          <p className="text-gray-100 text-sm">Excelent! ✅ Te-am programat pentru mâine, 14:00.</p>
                          <p className="text-gray-100 text-sm mt-2">Îți trimit acum confirmarea pe PDF. 📄</p>
                          <span className="text-[10px] text-green-200 float-right mt-1 flex items-center gap-1">
                            09:42
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Input bar */}
                    <div className="bg-[#1F2C33] px-3 py-2 flex items-center gap-2">
                      <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2">
                        <span className="text-gray-500 text-sm">Type a message</span>
                      </div>
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-3xl -z-10 opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.problemTitle} <span className="text-red-400">{t.problemHighlight}</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12 mb-12">
            {t.problemStats.map((stat, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-xl text-green-400 font-semibold">{t.problemSolution}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.howTitle}</h2>
            <p className="text-gray-400 text-lg">{t.howSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.howSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center h-full hover:border-green-500/50 transition-colors">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.featuresTitle} <span className="text-green-400">{t.featuresHighlight}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  {feature.title}
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.demoTitle}</h2>
            <p className="text-gray-400 text-lg mb-8">{t.demoSubtitle}</p>

            <div className="bg-gray-900 rounded-xl p-6 mb-8 inline-block">
              <div className="text-3xl font-bold text-green-400 mb-2">{t.demoNumber}</div>
              <p className="text-gray-400 text-sm">{t.demoInstructions}</p>
            </div>

            <div>
              <a
                href={`https://wa.me/40750195048?text=demo`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-3 transition-all hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.demoCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.useCasesTitle}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
                <div className="text-4xl mb-4">{uc.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricingTitle}</h2>
          <p className="text-gray-400 mb-8">{t.pricingSubtitle}</p>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500 rounded-2xl p-8">
            <div className="text-5xl font-bold text-white mb-2">{t.pricingAddon}</div>
            <p className="text-gray-400 mb-8">{t.pricingBase}</p>

            <ul className="space-y-3 text-left mb-8">
              {t.pricingFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://app.catyai.io/signup?addon=whatsapp"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl inline-block w-full transition-colors"
            >
              {t.pricingCta}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.faqTitle}</h2>

          <div className="space-y-4">
            {t.faqs.map((faq, i) => (
              <details key={i} className="group bg-gray-900 border border-gray-800 rounded-xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold">{faq.q}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-8">{t.ctaSubtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.catyai.io/signup?addon=whatsapp"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.ctaBtn}
            </a>
            <a
              href="#demo"
              className="text-green-400 hover:text-green-300 font-semibold px-8 py-4 inline-flex items-center justify-center transition-colors"
            >
              {t.ctaDemo}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">{t.footer.terms}</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t.footer.contact}</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
