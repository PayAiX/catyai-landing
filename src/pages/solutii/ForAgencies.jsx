import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

function PainCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-[#0A1628]/50 rounded-2xl border border-[#1a2744]/50 hover:border-[#C48D32]/50 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function StepCard({ step, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-[#C48D32]/20 border border-[#C48D32]/40 flex items-center justify-center text-[#C48D32] font-bold text-sm">
        {step}
      </div>
      <div>
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#010A1F]/50 rounded-xl border border-[#1a2744]/40">
      <span className="text-xl shrink-0">{icon}</span>
      <span className="text-gray-300 text-sm">{text}</span>
    </div>
  )
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'CatyAI pentru Agenții de Marketing',
      description: 'AI Sales Agent white-label pentru clienții agenției tale — funcțional în 24 de ore.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'CatyAI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Plan gratuit disponibil',
      },
    },
  ],
}

export default function ForAgencies() {
  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <Helmet>
        <title>CatyAI pentru Agenții de Marketing — AI pentru Clienții Tăi în 24h</title>
        <meta
          name="description"
          content="Oferă clienților tăi un asistent AI funcțional în 24 de ore. Multi-widget, branding personalizat, Analytics exportabil. Model reseller disponibil."
        />
        <link rel="canonical" href="https://catyai.io/solutii/agentii-marketing" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-sm font-medium mb-6">
            <span>📣</span>
            Soluție pentru Agenții de Marketing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            AI Sales Agent<br />
            <span className="text-[#C48D32]">pentru Clienții Tăi — în 24h</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Adaugă un asistent AI la oferta agenției tale. Instalezi CatyAI pentru clienți în mai puțin de o zi — cu branding personalizat și analytics exportabil.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F] rounded-xl font-semibold transition-colors"
            >
              Testează Gratuit
            </a>
            <a
              href="mailto:contact@catyai.io"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Contactează Echipa
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Probleme pe care le rezolvăm</h2>
          <p className="text-gray-400 text-center mb-10">Provocările agenției moderne de marketing digital</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PainCard
              icon="⏳"
              title="Setup lent pentru clienți noi"
              desc="Implementarea unui chatbot tradițional durează săptămâni. Cu CatyAI, clientul tău este live în 24 de ore."
            />
            <PainCard
              icon="🎨"
              title="Branding al clientului, nu al tău"
              desc="CatyAI permite branding complet personalizat — logo, culori, ton de comunicare adaptat fiecărui client."
            />
            <PainCard
              icon="📈"
              title="Fără rapoarte de performanță"
              desc="Dashboard cu analytics detaliat exportabil — conversații, lead-uri, conversii — pe care îl prezinți clientului la ședința lunară."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Cum funcționează pentru agenție</h2>
          <div className="space-y-8">
            <StepCard
              step="1"
              title="Creezi un widget separat pentru fiecare client"
              desc="Din dashboard-ul CatyAI, configurezi widgetul cu logo, culori și knowledge base-ul clientului. Durează sub o oră."
            />
            <StepCard
              step="2"
              title="Clientul instalează un singur rând de cod pe site"
              desc="Sau tu îl instalezi direct — embed simplu compatibil cu orice CMS. Fără dependențe externe."
            />
            <StepCard
              step="3"
              title="Monitorizezi performanța din dashboard și raportezi lunar"
              desc="Conversații, lead-uri capturate, teme frecvente — toate exportabile în CSV sau PDF pentru raportul tău."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Ce primești</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <FeatureItem icon="🎨" text="Branding complet personalizat per client" />
            <FeatureItem icon="📊" text="Analytics exportabil CSV/PDF" />
            <FeatureItem icon="🔗" text="Multi-widget — un cont, mai mulți clienți" />
            <FeatureItem icon="🌐" text="Widget web + WhatsApp pentru fiecare client" />
            <FeatureItem icon="⚡" text="Setup sub 24h per client" />
            <FeatureItem icon="🛡️" text="FraudAI Shield inclus în toate planurile" />
          </div>
        </div>
      </section>

      {/* Reseller CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-[#0A1628]/50 rounded-2xl border border-[#C48D32]/30 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold mb-3">Model Reseller CatyAI</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revinde CatyAI sub brandul tău cu marjă proprie. Acces la tarife speciale pentru agenții cu portofoliu de minimum 5 clienți activi.
            </p>
            <a
              href="mailto:contact@catyai.io?subject=Parteneriat Reseller CatyAI"
              className="inline-block px-8 py-3 bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F] rounded-xl font-semibold transition-colors"
            >
              Solicită Detalii Reseller
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Adaugă AI la oferta agenției tale</h2>
          <p className="text-gray-400 mb-8">Primul client live în 24 de ore. Fără costuri inițiale.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F] rounded-xl font-semibold transition-colors"
            >
              Începe Gratuit
            </a>
            <Link
              to="/pricing"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Prețuri Agenție
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
