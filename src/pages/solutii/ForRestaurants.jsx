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
      '@type': 'FoodEstablishment',
      name: 'CatyAI pentru Restaurante',
      description: 'Rezervări și meniu automat 24/7 cu QR-First.',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
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

export default function ForRestaurants() {
  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <Helmet>
        <title>CatyAI pentru Restaurante — Rezervări și Meniu Automat 24/7 | QR-First</title>
        <meta
          name="description"
          content="QR la masă → clienții scanează → CatyAI răspunde cu meniu, alergeni, disponibilitate și face rezervări automat. Fără recepționer."
        />
        <link rel="canonical" href="https://catyai.io/solutii/restaurante" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-sm font-medium mb-6">
            <span>🍽️</span>
            Soluție pentru Restaurante
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Rezervări și Meniu AI<br />
            <span className="text-[#C48D32]">QR la Masă — Fără Recepționer</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Clientul scanează codul QR de pe masă, primește meniul, întreabă despre alergeni și face rezervare — totul pe WhatsApp, fără aplicație suplimentară.
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
              to="/no-website"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Cum funcționează QR-First
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Probleme pe care le rezolvăm</h2>
          <p className="text-gray-400 text-center mb-10">Cele mai frecvente provocări din industria HoReCa</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PainCard
              icon="📞"
              title="Telefoane la ore imposibile"
              desc="Clienții sună duminica la 22:00 să rezerve pentru vineri. CatyAI preia cererea instant și confirmă automat."
            />
            <PainCard
              icon="🌍"
              title="Turiști fără română"
              desc="CatyAI răspunde în 14 limbi — inclusiv engleză, germană și italiană — fără angajat multilingv."
            />
            <PainCard
              icon="🌙"
              title="Rezervări pierdute noaptea"
              desc="Fără recepționer de noapte, restaurantul pierde rezervări. CatyAI este activ non-stop — și weekend."
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
              title="Clientul scanează codul QR de pe masă sau de pe ușa restaurantului"
              desc="Este redirecționat direct în WhatsApp, unde CatyAI îl întâmpină cu meniul și ofertele zilei."
            />
            <StepCard
              step="2"
              title="CatyAI răspunde la întrebări despre meniu, alergeni și disponibilitate"
              desc="Informațiile sunt extrase din knowledge base-ul tău — actualizat oricând din dashboard."
            />
            <StepCard
              step="3"
              title="Rezervarea este confirmată automat cu data, ora și numărul de persoane"
              desc="Echipa primește notificare. Clientul primește confirmare pe WhatsApp cu toate detaliile."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Ce primești</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <FeatureItem icon="📱" text="QR code branduit — fără site web necesar" />
            <FeatureItem icon="🍴" text="Meniu digital actualizabil din dashboard" />
            <FeatureItem icon="🌐" text="Răspunsuri în 14 limbi automat" />
            <FeatureItem icon="🔔" text="Notificări rezervări în timp real" />
            <FeatureItem icon="💬" text="WhatsApp Business — fără Meta API" />
            <FeatureItem icon="🛡️" text="FraudAI Shield — blochează rezervările false" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Restaurantul tău deschis 24/7</h2>
          <p className="text-gray-400 mb-8">Un cod QR înlocuiește recepționerul de noapte. Setup în 30 de minute.</p>
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
              Vezi Prețuri
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
