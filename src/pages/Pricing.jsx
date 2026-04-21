import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const translations = {
  en: {
    badge: 'Simple, Transparent Pricing',
    heroTitle: 'Plans for Every Business',
    heroSubtitle: 'Start free. Scale when you\'re ready. No hidden fees.',
    monthly: 'Monthly',
    popular: 'Most Popular',
    getStarted: 'Get Started',
    contactSales: 'Contact Sales',
    startFree: 'Start Free',
    tiers: [
      {
        name: 'Free',
        price: '€0',
        period: '/month',
        desc: 'Explore CatyAI with no commitment.',
        features: [
          '20 AI conversations/month',
          '1 widget',
          'Basic AI responses',
          'CatyAI branding',
          'Email support'
        ],
        cta: 'Start Free',
        ctaLink: 'https://app.catyai.io/register',
        highlighted: false
      },
      {
        name: 'Starter',
        price: '€49',
        period: '/month',
        desc: 'For solo entrepreneurs and small teams getting started.',
        features: [
          '500 AI conversations/month',
          '1 widget',
          'GPT-4 powered responses',
          'Knowledge base (5 documents)',
          'Lead capture forms',
          'Remove CatyAI branding',
          'Email support'
        ],
        cta: 'Get Started',
        ctaLink: 'https://app.catyai.io/register?plan=starter',
        highlighted: false
      },
      {
        name: 'Growth',
        price: '€99',
        period: '/month',
        desc: 'For growing businesses that need more conversations and customization.',
        features: [
          '2,000 AI conversations/month',
          '3 widgets',
          'GPT-4 powered responses',
          'Knowledge base (20 documents)',
          'GEO Gateway (AI visibility)',
          'WhatsApp integration',
          'FraudAI Shield',
          'Priority support'
        ],
        cta: 'Get Started',
        ctaLink: 'https://app.catyai.io/register?plan=growth',
        highlighted: true
      },
      {
        name: 'Business',
        price: '€199',
        period: '/month',
        desc: 'For established businesses with high conversation volume.',
        features: [
          '10,000 AI conversations/month',
          '10 widgets',
          'GPT-4 powered responses',
          'Unlimited knowledge base',
          'Full GEO Gateway suite',
          'WhatsApp + multi-channel',
          'FraudAI Shield + SENTINEL',
          'Cart recovery system',
          'Dedicated support'
        ],
        cta: 'Get Started',
        ctaLink: 'https://app.catyai.io/register?plan=business',
        highlighted: false
      },
      {
        name: 'Enterprise',
        price: '€499',
        period: '/month',
        desc: 'For large organizations requiring custom solutions and SLAs.',
        features: [
          'Unlimited AI conversations',
          'Unlimited widgets',
          'Custom AI model fine-tuning',
          'Unlimited knowledge base',
          'Full GEO Gateway suite',
          'All channel integrations',
          'FraudAI Shield + SENTINEL',
          'Custom integrations & API',
          'SSO / SAML',
          'SLA + dedicated account manager'
        ],
        cta: 'Contact Sales',
        ctaLink: '/contact?plan=enterprise',
        highlighted: false
      }
    ],
    addonsTitle: 'Add-Ons',
    addonsSubtitle: 'Extend your plan with specialized modules',
    addons: [
      {
        icon: '📱',
        name: 'QR-First',
        price: '€10',
        period: '/month',
        desc: 'Deploy CatyAI without a website. A QR code + WhatsApp flow replaces your website for customer contact. Perfect for brick-and-mortar businesses.',
        features: [
          'Branded QR code generation',
          'WhatsApp-first customer flow',
          'No website required',
          'Printable materials kit'
        ],
        cta: 'Add QR-First',
        ctaLink: '/contact?product=qr-first'
      },
      {
        icon: '🤖',
        name: 'WhatsApp AI Secretary',
        price: '+€29',
        period: '/month',
        desc: 'A full AI secretary that manages your WhatsApp inbox: books appointments, qualifies leads, sends follow-ups, and handles routine questions around the clock.',
        features: [
          'Appointment booking via WhatsApp',
          'Lead qualification flows',
          'Automated follow-ups',
          '24/7 availability',
          'Calendar integration'
        ],
        cta: 'Add Secretary',
        ctaLink: '/contact?product=wa-secretary'
      }
    ],
    faqTitle: 'Common Questions',
    faqs: [
      {
        q: 'Can I change plans at any time?',
        a: 'Yes. You can upgrade or downgrade your plan at any time from the dashboard. Changes take effect at the start of your next billing cycle. Upgrades apply immediately with prorated billing.'
      },
      {
        q: 'What happens when I reach my conversation limit?',
        a: 'When you reach your monthly conversation limit, the widget continues to work but responses are paused until the next billing cycle. You\'ll receive an email notification when you reach 80% of your limit so you can upgrade before hitting the cap.'
      },
      {
        q: 'Do add-ons work with all plans?',
        a: 'QR-First and WhatsApp AI Secretary add-ons are available on Starter plans and above. They cannot be combined with the Free plan. Both add-ons can be stacked with any paid tier.'
      }
    ]
  },

  ro: {
    badge: 'Prețuri Simple și Transparente',
    heroTitle: 'Planuri pentru Orice Afacere',
    heroSubtitle: 'Începe gratuit. Crești când ești pregătit. Fără taxe ascunse.',
    monthly: 'Lunar',
    popular: 'Cel Mai Popular',
    getStarted: 'Începe Acum',
    contactSales: 'Contactează Vânzări',
    startFree: 'Începe Gratuit',
    tiers: [
      {
        name: 'Gratuit',
        price: '€0',
        period: '/lună',
        desc: 'Explorează CatyAI fără niciun angajament.',
        features: [
          '20 conversații AI/lună',
          '1 widget',
          'Răspunsuri AI de bază',
          'Branding CatyAI',
          'Suport email'
        ],
        cta: 'Începe Gratuit',
        ctaLink: 'https://app.catyai.io/register',
        highlighted: false
      },
      {
        name: 'Starter',
        price: '€49',
        period: '/lună',
        desc: 'Pentru antreprenori și echipe mici care fac primii pași.',
        features: [
          '500 conversații AI/lună',
          '1 widget',
          'Răspunsuri cu GPT-4',
          'Bază de cunoștințe (5 documente)',
          'Formulare de captare lead-uri',
          'Elimini brandul CatyAI',
          'Suport email'
        ],
        cta: 'Începe Acum',
        ctaLink: 'https://app.catyai.io/register?plan=starter',
        highlighted: false
      },
      {
        name: 'Growth',
        price: '€99',
        period: '/lună',
        desc: 'Pentru afaceri în creștere care au nevoie de mai multe conversații și personalizare.',
        features: [
          '2.000 conversații AI/lună',
          '3 widgeturi',
          'Răspunsuri cu GPT-4',
          'Bază de cunoștințe (20 documente)',
          'GEO Gateway (vizibilitate AI)',
          'Integrare WhatsApp',
          'FraudAI Shield',
          'Suport prioritar'
        ],
        cta: 'Începe Acum',
        ctaLink: 'https://app.catyai.io/register?plan=growth',
        highlighted: true
      },
      {
        name: 'Business',
        price: '€199',
        period: '/lună',
        desc: 'Pentru afaceri consacrate cu volum mare de conversații.',
        features: [
          '10.000 conversații AI/lună',
          '10 widgeturi',
          'Răspunsuri cu GPT-4',
          'Bază de cunoștințe nelimitată',
          'Suite completă GEO Gateway',
          'WhatsApp + multicanal',
          'FraudAI Shield + SENTINEL',
          'Sistem recuperare coș abandonat',
          'Suport dedicat'
        ],
        cta: 'Începe Acum',
        ctaLink: 'https://app.catyai.io/register?plan=business',
        highlighted: false
      },
      {
        name: 'Enterprise',
        price: '€499',
        period: '/lună',
        desc: 'Pentru organizații mari care necesită soluții personalizate și SLA-uri.',
        features: [
          'Conversații AI nelimitate',
          'Widgeturi nelimitate',
          'Fine-tuning model AI personalizat',
          'Bază de cunoștințe nelimitată',
          'Suite completă GEO Gateway',
          'Toate integrările de canale',
          'FraudAI Shield + SENTINEL',
          'Integrări și API personalizate',
          'SSO / SAML',
          'SLA + manager de cont dedicat'
        ],
        cta: 'Contactează Vânzări',
        ctaLink: '/contact?plan=enterprise',
        highlighted: false
      }
    ],
    addonsTitle: 'Module Suplimentare',
    addonsSubtitle: 'Extinde-ți planul cu module specializate',
    addons: [
      {
        icon: '📱',
        name: 'QR-First',
        price: '€10',
        period: '/lună',
        desc: 'Implementează CatyAI fără website. Un cod QR + flux WhatsApp înlocuiește site-ul tău pentru contactul cu clienții. Perfect pentru afacerile fizice.',
        features: [
          'Generare cod QR branduit',
          'Flux client WhatsApp-first',
          'Nu necesită website',
          'Kit materiale printabile'
        ],
        cta: 'Adaugă QR-First',
        ctaLink: '/contact?product=qr-first'
      },
      {
        icon: '🤖',
        name: 'Secretar AI WhatsApp',
        price: '+€29',
        period: '/lună',
        desc: 'Un secretar AI complet care îți gestionează inbox-ul WhatsApp: programează întâlniri, califică lead-uri, trimite urmăriri și răspunde la întrebări de rutină non-stop.',
        features: [
          'Programare întâlniri prin WhatsApp',
          'Fluxuri de calificare lead-uri',
          'Urmăriri automate',
          'Disponibilitate 24/7',
          'Integrare calendar'
        ],
        cta: 'Adaugă Secretar',
        ctaLink: '/contact?product=wa-secretary'
      }
    ],
    faqTitle: 'Întrebări Frecvente',
    faqs: [
      {
        q: 'Pot schimba planul oricând?',
        a: 'Da. Poți upgradia sau downgradia planul oricând din dashboard. Modificările intră în vigoare la începutul următorului ciclu de facturare. Upgrade-urile se aplică imediat cu facturare proporțională.'
      },
      {
        q: 'Ce se întâmplă când ating limita de conversații?',
        a: 'Când atingi limita lunară de conversații, widgetul continuă să funcționeze dar răspunsurile sunt întrerupte până la următorul ciclu de facturare. Vei primi o notificare email când ajungi la 80% din limită, astfel încât să poți face upgrade înainte de a o atinge.'
      },
      {
        q: 'Modulele suplimentare funcționează cu toate planurile?',
        a: 'Modulele suplimentare QR-First și Secretar AI WhatsApp sunt disponibile pe planurile Starter și superioare. Nu pot fi combinate cu planul Gratuit. Ambele module pot fi stivuite cu orice nivel plătit.'
      }
    ]
  }
}

export default function PricingPage() {
  const [lang, setLang] = useState('ro')

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored && translations[stored]) setLang(stored)
    const id = setInterval(() => {
      const l = localStorage.getItem('caty-lang')
      if (l && translations[l] && l !== lang) setLang(l)
    }, 500)
    return () => clearInterval(id)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <SEO
        title={lang === 'ro' ? 'Prețuri CatyAI — Planuri pentru Orice Afacere' : 'CatyAI Pricing — Plans for Every Business'}
        description={t.heroSubtitle}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-sm font-medium mb-6">
            <span>💎</span>
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-gray-400 text-lg">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {t.tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-6 transition-colors ${
                  tier.highlighted
                    ? 'border-[#C48D32]/60 bg-gradient-to-b from-[#C48D32]/5 to-[#0A1628]/40 shadow-lg shadow-[#C48D32]/10'
                    : 'border-[#1a2744]/50 bg-[#0A1628]/30 hover:border-[#1a2744]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C48D32] text-[#010A1F] text-xs font-bold rounded-full whitespace-nowrap">
                    {t.popular}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-white mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-3xl font-extrabold ${tier.highlighted ? 'text-[#C48D32]' : 'text-white'}`}>{tier.price}</span>
                    <span className="text-gray-500 text-sm">{tier.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{tier.desc}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-[#C48D32]' : 'text-blue-400'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {tier.ctaLink.startsWith('http') ? (
                  <a
                    href={tier.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      tier.highlighted
                        ? 'bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F]'
                        : 'border border-[#1a2744] hover:border-blue-500/50 text-gray-300 hover:text-white'
                    }`}
                  >
                    {tier.cta}
                  </a>
                ) : (
                  <Link
                    to={tier.ctaLink}
                    className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      tier.highlighted
                        ? 'bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F]'
                        : 'border border-[#1a2744] hover:border-blue-500/50 text-gray-300 hover:text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{t.addonsTitle}</h2>
            <p className="text-gray-400">{t.addonsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {t.addons.map((addon, i) => (
              <div key={i} className="p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 hover:border-[#C48D32]/30 transition-colors flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{addon.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{addon.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#C48D32] font-bold text-xl">{addon.price}</span>
                      <span className="text-gray-500 text-sm">{addon.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{addon.desc}</p>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {addon.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-[#C48D32]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={addon.ctaLink}
                  className="block text-center py-2.5 rounded-xl font-semibold text-sm border border-[#C48D32]/40 text-[#C48D32] hover:bg-[#C48D32]/10 transition-colors"
                >
                  {addon.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#010A1F]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faqs.map((faq, i) => (
              <details key={i} className="group p-5 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 hover:border-[#C48D32]/30 transition-colors cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-white list-none">
                  {faq.q}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {lang === 'ro' ? 'Gata să Începi?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-gray-400 mb-8">
            {lang === 'ro'
              ? 'Înregistrează-te gratuit și explorează CatyAI fără card de credit.'
              : 'Sign up for free and explore CatyAI — no credit card required.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F] rounded-xl font-semibold transition-colors"
            >
              {t.startFree}
            </a>
            <Link to="/contact" className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors">
              {t.contactSales}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
