import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const platforms = ['WordPress', 'Shopify', 'WooCommerce', 'Wix', 'GoMag', 'Magento']

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
      '@type': 'OnlineStore',
      name: 'CatyAI pentru Magazine Online',
      description: 'Crește conversia cu AI — compatibil cu Shopify, WooCommerce, GoMag.',
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

export default function ForEcommerce() {
  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <Helmet>
        <title>CatyAI pentru Magazine Online — Crește Conversia cu AI | Shopify, WooCommerce</title>
        <meta
          name="description"
          content="Asistentul AI care răspunde la întrebări despre produse, stoc și livrare — și transformă vizitatorii în cumpărători. Compatible cu orice platformă."
        />
        <link rel="canonical" href="https://catyai.io/solutii/ecommerce" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-sm font-medium mb-6">
            <span>🛍️</span>
            Soluție pentru Magazine Online
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Crește Conversia<br />
            <span className="text-[#C48D32]">cu AI — Orice Platformă</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            CatyAI răspunde instant la întrebări despre produse, disponibilitate și livrare — și recuperează automat coșurile abandonate pe WhatsApp.
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
              to="/widget"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Caty Widget
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-10 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">Funcționează cu</p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="px-4 py-2 bg-[#0A1628]/50 border border-[#1a2744]/50 rounded-full text-sm text-gray-300 font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Probleme pe care le rezolvăm</h2>
          <p className="text-gray-400 text-center mb-10">Cele mai costisitoare fricțiuni din eCommerce</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PainCard
              icon="🛒"
              title="Coș abandonat"
              desc="70% din coșuri sunt abandonate. CatyAI trimite automat un mesaj WhatsApp cu un cupon de recuperare — în 30 de minute."
            />
            <PainCard
              icon="🔁"
              title="Întrebări repetitive pre-vânzare"
              desc="'E în stoc?', 'Când ajunge?', 'Se poate returna?'. CatyAI răspunde instant, 24/7, fără agent uman."
            />
            <PainCard
              icon="📱"
              title="Clienți care nu revin"
              desc="CatyAI trimite urmăriri automate post-cumpărare și cross-sell relevant — pe WhatsApp, canalul cu 98% rată de deschidere."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Cum funcționează</h2>
          <div className="space-y-8">
            <StepCard
              step="1"
              title="Instalezi widget-ul în 5 minute pe orice platformă"
              desc="Un rând de cod în WordPress, Shopify sau GoMag. Sau folosești integrarea nativă disponibilă în dashboard."
            />
            <StepCard
              step="2"
              title="CatyAI răspunde vizitatorilor în timp real"
              desc="Întrebări despre produse, stoc, livrare, retururi — toate rezolvate instant. Clientul rămâne pe site și cumpără."
            />
            <StepCard
              step="3"
              title="Coșurile abandonate sunt recuperate automat"
              desc="Webhook Shopify/WooCommerce → CatyAI trimite mesaj WhatsApp → rata de recuperare 15-25%."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Ce primești</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <FeatureItem icon="🛒" text="Recuperare coș abandonat WhatsApp" />
            <FeatureItem icon="📦" text="Knowledge base produse și stoc" />
            <FeatureItem icon="💬" text="Chat live pe site + WhatsApp unificat" />
            <FeatureItem icon="📊" text="Analytics conversii în dashboard" />
            <FeatureItem icon="🔗" text="Integrare Shopify, WooCommerce, GoMag" />
            <FeatureItem icon="🛡️" text="FraudAI Shield — detectează comenzile false" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Mai multe vânzări, mai puțin support</h2>
          <p className="text-gray-400 mb-8">CatyAI transformă vizitatorii în cumpărători — și cumpărătorii în clienți fideli.</p>
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
              to="/compare"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Compară cu alternativele
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
