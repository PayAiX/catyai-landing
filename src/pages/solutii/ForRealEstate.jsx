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
      '@type': 'RealEstateAgent',
      name: 'CatyAI pentru Agenții Imobiliare',
      description: 'Agentul AI care califică lead-urile și programează vizionări automat.',
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

export default function ForRealEstate() {
  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <Helmet>
        <title>CatyAI pentru Agenții Imobiliare — Califică Lead-uri Automat | WhatsApp + Web</title>
        <meta
          name="description"
          content="Agentul AI care califică clienții, răspunde 24/7 la întrebări despre proprietăți și programează vizionări automat. Fără efort manual."
        />
        <link rel="canonical" href="https://catyai.io/solutii/agentii-imobiliare" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-sm font-medium mb-6">
            <span>🏠</span>
            Soluție pentru Agenții Imobiliare
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Califică Lead-uri Automat<br />
            <span className="text-[#C48D32]">WhatsApp + Web — 24/7</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            CatyAI întreabă clienții despre buget, tip de proprietate și zonă preferată — și îți livrează doar lead-urile calificate, gata de vizionare.
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
            <Link
              to="/pricing"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Vezi Prețuri
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Probleme pe care le rezolvăm</h2>
          <p className="text-gray-400 text-center mb-10">De ce agenții imobiliare pierd timp și clienți</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PainCard
              icon="🕐"
              title="Timp pierdut cu lead-uri necalificate"
              desc="Agenții petrec ore la telefon cu clienți care nu au bugetul necesar sau nu sunt pregătiți să cumpere."
            />
            <PainCard
              icon="📉"
              title="Lead-uri pierdute noaptea"
              desc="Potențialii cumpărători trimit mesaje seara și dimineața găsesc răspuns de la concurență."
            />
            <PainCard
              icon="📊"
              title="Fără date despre interesele clienților"
              desc="Fără calificare structurată, agenții nu știu care proprietăți să prezinte mai întâi fiecărui client."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Cum funcționează</h2>
          <div className="space-y-8">
            <StepCard
              step="1"
              title="Clientul scrie pe WhatsApp sau completează formularul de pe site"
              desc="CatyAI răspunde instant și începe calificarea: buget, tip de proprietate, zonă, termen de cumpărare."
            />
            <StepCard
              step="2"
              title="Lead-ul calificat ajunge direct în dashboard-ul tău"
              desc="Primești notificare cu toate detaliile: nume, contact, preferințe — gata pentru follow-up."
            />
            <StepCard
              step="3"
              title="Programare vizionare automată"
              desc="CatyAI propune date disponibile și confirmă vizionarea direct pe WhatsApp-ul clientului."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Ce primești</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <FeatureItem icon="🎯" text="Calificare automată buget + preferințe" />
            <FeatureItem icon="💬" text="Răspuns WhatsApp 24/7 — fără Meta API" />
            <FeatureItem icon="📋" text="Lead-uri exportabile din dashboard" />
            <FeatureItem icon="🔔" text="Notificări instant pentru lead-uri noi" />
            <FeatureItem icon="🌐" text="Widget web pe site-ul agenției" />
            <FeatureItem icon="🛡️" text="FraudAI Shield — filtrează cereri false" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Mai multe vizionări, mai puțin telefon</h2>
          <p className="text-gray-400 mb-8">CatyAI lucrează 24/7 — tu te concentrezi pe încheierea tranzacțiilor.</p>
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
              to="/features"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Toate Funcțiile
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
