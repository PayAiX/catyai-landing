import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { useLanguage } from '../App'

const TrustCenter = () => {
  const { t: mainT } = useLanguage() || {} // Main translations for Footer
  const [lang, setLang] = useState('ro')
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored) setLang(stored)
  }, [])

  const content = {
    ro: {
      badge: 'Trust Center',
      title: 'Arhitectură Tehnică',
      titleHighlight: '& Securitate',
      subtitle: 'Transparență totală despre cum funcționează CatyAI',

      whatsappSection: {
        badge: 'WhatsApp Native Connect',
        title: 'Zero taxe pe mesaj.',
        titleHighlight: 'Setup în 2 minute.',
        subtitle: 'Integrare nativă cu WhatsApp fără costurile Meta Business API',
      },

      faqs: [
        {
          question: 'Ce tehnologie folosește CatyAI pentru integrarea cu WhatsApp?',
          answer: `CatyAI utilizează o arhitectură hibridă. Pentru planurile IMM și QR-First, folosim protocolul de tip **Native Web Mirroring** (Baileys). Aceasta permite conectarea instantanee prin scanarea unui cod QR (exact ca WhatsApp Web), oferind afacerii tale control total fără a depinde de procesele de aprobare Meta, care pot dura săptămâni.`
        },
        {
          question: 'Care este avantajul acestei metode față de WhatsApp Business API oficial?',
          answer: `**Simplitatea și Eficiența Costurilor (CEE)**. Prin această metodă, CatyAI elimină taxele per conversație impuse de Meta (care pot ajunge la €0.10/mesaj). Astfel, putem oferi mesaje nelimitate în abonamentul tău de bază, fără costuri ascunse sau facturi surpriză la final de lună.`
        },
        {
          question: 'Ce se întâmplă dacă Meta face un update major de platformă?',
          answer: `Avem un **plan de continuitate stratificat**:

**1. Patch-uri Rapide:** Protocolul pe care îl folosim este susținut de o comunitate globală masivă de developeri care lansează actualizări în câteva ore de la orice schimbare Meta.

**2. Backup Nativ:** Deoarece sesiunea rulează ca un "dispozitiv asociat", poți oricând prelua controlul manual de pe telefonul tău fizic. Zero lead-uri pierdute.

**3. Migrare la Cloud API:** Pentru clienții de tip Enterprise care au volume masive și necesită redundanță oficială, oferim opțiunea de migrare către WhatsApp Business API oficial. CatyAI este agnostică față de protocolul de transport.`
        },
        {
          question: 'Este sigură această metodă pentru datele mele?',
          answer: `**Absolut.** Fluxul de date este protejat de **FraudAI Shield**. Mesajele sunt procesate criptat între dispozitivul tău și serverele noastre securizate. Mai mult, spre deosebire de API-ul oficial, ai vizibilitate totală asupra a ceea ce scrie AI-ul direct în aplicația ta de WhatsApp de pe telefon.`
        }
      ],

      benefits: [
        { icon: '💸', title: '€0 per mesaj', desc: 'Fără taxe Meta per conversație' },
        { icon: '⚡', title: '2 minute setup', desc: 'Scanează QR, gata de vânzare' },
        { icon: '👁️', title: 'Vizibilitate totală', desc: 'Vezi exact ce scrie AI-ul' },
        { icon: '🔄', title: 'Continuitate garantată', desc: 'Plan de backup în 3 straturi' }
      ],

      securitySection: {
        title: 'Securitate',
        titleHighlight: 'Enterprise-Grade',
        features: [
          { icon: '🔒', title: 'Criptare End-to-End', desc: 'Mesajele rămân criptate pe tot parcursul procesării' },
          { icon: '🛡️', title: 'FraudAI Shield', desc: '8 module de detecție: phishing, impersonare, urgență falsă' },
          { icon: '🇪🇺', title: 'GDPR Compliant', desc: 'Date procesate în conformitate cu regulamentele UE' },
          { icon: '📊', title: 'Audit Trail', desc: 'Log complet al tuturor interacțiunilor AI' }
        ]
      },

      enterpriseSection: {
        title: 'Upgrade Path pentru',
        titleHighlight: 'Enterprise',
        desc: 'Pentru volume masive (10,000+ mesaje/lună) sau cerințe de redundanță oficială, oferim migrare la WhatsApp Business API oficial cu:',
        features: [
          'SLA 99.9% uptime garantat',
          'Certificare Meta Business Partner',
          'Dedicated Account Manager',
          'Priority Support 24/7'
        ],
        cta: 'Contactează Enterprise Sales'
      },

      cta: {
        title: 'Gata să începi?',
        subtitle: 'Conectează WhatsApp în 2 minute, fără taxe per mesaj',
        button: 'Scanează QR & Conectează',
        secondary: 'Vezi Demo Live'
      }
    },
    en: {
      badge: 'Trust Center',
      title: 'Technical Architecture',
      titleHighlight: '& Security',
      subtitle: 'Full transparency on how CatyAI works',

      whatsappSection: {
        badge: 'WhatsApp Native Connect',
        title: 'Zero message fees.',
        titleHighlight: '2-minute setup.',
        subtitle: 'Native WhatsApp integration without Meta Business API costs',
      },

      faqs: [
        {
          question: 'What technology does CatyAI use for WhatsApp integration?',
          answer: `CatyAI uses a hybrid architecture. For SMB and QR-First plans, we use **Native Web Mirroring** protocol (Baileys). This allows instant connection by scanning a QR code (just like WhatsApp Web), giving your business full control without depending on Meta approval processes, which can take weeks.`
        },
        {
          question: 'What is the advantage of this method over official WhatsApp Business API?',
          answer: `**Simplicity and Cost Efficiency**. With this method, CatyAI eliminates the per-conversation fees imposed by Meta (which can reach €0.10/message). This allows us to offer unlimited messages in your base subscription, with no hidden costs or surprise bills at month end.`
        },
        {
          question: 'What happens if Meta makes a major platform update?',
          answer: `We have a **layered continuity plan**:

**1. Rapid Patches:** The protocol we use is supported by a massive global developer community that releases updates within hours of any Meta change.

**2. Native Backup:** Since the session runs as a "linked device", you can always take manual control from your physical phone. Zero lost leads.

**3. Cloud API Migration:** For Enterprise clients with massive volumes requiring official redundancy, we offer migration to the official WhatsApp Business API. CatyAI is agnostic to the transport protocol.`
        },
        {
          question: 'Is this method safe for my data?',
          answer: `**Absolutely.** The data flow is protected by **FraudAI Shield**. Messages are encrypted between your device and our secure servers. Moreover, unlike the official API, you have full visibility of what the AI writes directly in your WhatsApp app on your phone.`
        }
      ],

      benefits: [
        { icon: '💸', title: '€0 per message', desc: 'No Meta fees per conversation' },
        { icon: '⚡', title: '2-minute setup', desc: 'Scan QR, ready to sell' },
        { icon: '👁️', title: 'Full visibility', desc: 'See exactly what AI writes' },
        { icon: '🔄', title: 'Guaranteed continuity', desc: '3-layer backup plan' }
      ],

      securitySection: {
        title: 'Enterprise-Grade',
        titleHighlight: 'Security',
        features: [
          { icon: '🔒', title: 'End-to-End Encryption', desc: 'Messages remain encrypted throughout processing' },
          { icon: '🛡️', title: 'FraudAI Shield', desc: '8 detection modules: phishing, impersonation, fake urgency' },
          { icon: '🇪🇺', title: 'GDPR Compliant', desc: 'Data processed in compliance with EU regulations' },
          { icon: '📊', title: 'Audit Trail', desc: 'Complete log of all AI interactions' }
        ]
      },

      enterpriseSection: {
        title: 'Upgrade Path for',
        titleHighlight: 'Enterprise',
        desc: 'For massive volumes (10,000+ messages/month) or official redundancy requirements, we offer migration to official WhatsApp Business API with:',
        features: [
          '99.9% uptime SLA guaranteed',
          'Meta Business Partner certification',
          'Dedicated Account Manager',
          'Priority Support 24/7'
        ],
        cta: 'Contact Enterprise Sales'
      },

      cta: {
        title: 'Ready to start?',
        subtitle: 'Connect WhatsApp in 2 minutes, no per-message fees',
        button: 'Scan QR & Connect',
        secondary: 'See Live Demo'
      }
    }
  }

  const t = content[lang] || content.ro

  const formatAnswer = (answer) => {
    // Convert **text** to <strong>text</strong>
    return answer.split('\n').map((line, i) => (
      <p key={i} className={i > 0 ? 'mt-3' : ''} dangerouslySetInnerHTML={{
        __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      }} />
    ))
  }

  return (
    <>
      <SEO
        title={lang === 'ro' ? 'Trust Center - Arhitectură Tehnică & Securitate | CatyAI' : 'Trust Center - Technical Architecture & Security | CatyAI'}
        description={lang === 'ro'
          ? 'Transparență totală despre tehnologia CatyAI: WhatsApp Native Connect fără taxe Meta, securitate enterprise-grade, GDPR compliant. Arhitectură hibridă cu plan de continuitate.'
          : 'Full transparency on CatyAI technology: WhatsApp Native Connect without Meta fees, enterprise-grade security, GDPR compliant. Hybrid architecture with continuity plan.'}
        keywords="WhatsApp Native Connect, Baileys, WhatsApp Business API, FraudAI Shield, GDPR, securitate AI, arhitectură hibridă"
        canonical="/trust-center"
      />

      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2">
                <img src="/images/caty-logo-96.webp" alt="CatyAI" className="h-8 w-8" width="32" height="32" />
                <span className="font-bold text-xl">CatyAI</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/whatsapp" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp AI
                </Link>
                <Link to="/fraud-shield" className="text-gray-400 hover:text-white transition-colors">
                  FraudAI
                </Link>
                <a
                  href="https://app.catyai.io"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {lang === 'ro' ? 'Începe Gratis' : 'Start Free'}
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-6">
              {t.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.title} <span className="text-primary-500">{t.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* WhatsApp Native Connect Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20 p-8 md:p-12">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.whatsappSection.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.whatsappSection.title} <span className="text-green-400">{t.whatsappSection.titleHighlight}</span>
                </h2>
                <p className="text-lg text-gray-400">
                  {t.whatsappSection.subtitle}
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {t.benefits.map((benefit, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-xl p-4 text-center">
                    <span className="text-3xl mb-2 block">{benefit.icon}</span>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-400">{benefit.desc}</p>
                  </div>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-4">
                {t.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`bg-gray-900/80 rounded-xl overflow-hidden transition-all ${openFaq === i ? 'ring-2 ring-green-500/50' : ''}`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                    >
                      <span className="font-medium text-white pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                        {formatAnswer(faq.answer)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.securitySection.title} <span className="text-primary-500">{t.securitySection.titleHighlight}</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.securitySection.features.map((feature, i) => (
                <div key={i} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-primary-500/50 transition-colors">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl border border-primary-500/20 p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.enterpriseSection.title} <span className="text-primary-500">{t.enterpriseSection.titleHighlight}</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                  {t.enterpriseSection.desc}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {t.enterpriseSection.features.map((feature, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full text-sm">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
                <a
                  href="mailto:enterprise@payai-x.com"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  {t.enterpriseSection.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl text-gray-400 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.catyai.io"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.cta.button}
              </a>
              <Link
                to="/whatsapp"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {t.cta.secondary}
              </Link>
            </div>
          </div>
        </section>

        <Footer t={mainT} />
      </div>
    </>
  )
}

export default TrustCenter
