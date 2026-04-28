import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const coreFeatures = [
  {
    icon: '🌐',
    title: 'GEO Gateway',
    desc: 'Fă-ți afacerea vizibilă pentru motoarele AI: ChatGPT, Perplexity, Gemini. NAP Protocol, SENTINEL monitoring, llms.txt dinamic.',
    link: '/geo-gateway',
  },
  {
    icon: '🛡️',
    title: 'FraudAI Shield',
    desc: 'Detectează și blochează automat mesajele spam, abuzive sau manipulative înainte să ajungă la AI-ul tău. 4 categorii de reguli.',
    link: '/infrastructura',
  },
  {
    icon: '📱',
    title: 'WhatsApp AI',
    desc: 'Conectează-ți widgetul la WhatsApp. Clienții conversează cu același AI atât pe site cât și pe WhatsApp, fără nicio diferență.',
    link: '/infrastructura',
  },
  {
    icon: '📊',
    title: 'Lead Capture',
    desc: 'Formulare inteligente declanșate în momentul potrivit al conversației. Captează date de contact fără a întrerupe fluxul.',
    link: '/infrastructura',
  },
  {
    icon: '🛒',
    title: 'Cart Recovery',
    desc: 'Recuperează coșurile abandonate automat prin WhatsApp cu mesaje personalizate și cupoane de discount generate dinamic.',
    link: '/infrastructura',
  },
  {
    icon: '📚',
    title: 'Knowledge Base',
    desc: 'Încarcă documente PDF, pagini web sau text și AI-ul tău răspunde instant bazat pe informațiile tale specifice.',
    link: '/infrastructura',
  },
]

const sagAgents = [
  { name: 'Salutation Agent', desc: 'Gestionează saluturile și tonul conversației' },
  { name: 'Qualification Agent', desc: 'Califică lead-urile după criterii definite' },
  { name: 'FAQ Agent', desc: 'Răspunsuri instant la întrebările frecvente' },
  { name: 'Escalation Agent', desc: 'Escaladează conversații complexe la oameni' },
  { name: 'Appointment Agent', desc: 'Programare întâlniri prin conversație naturală' },
  { name: 'Objection Agent', desc: 'Gestionează obiecțiile de vânzare' },
  { name: 'Follow-up Agent', desc: 'Urmăriri automate post-conversație' },
  { name: 'Cart Recovery Agent', desc: 'Recuperare coș abandonat personalizat' },
  { name: 'Order Status Agent', desc: 'Status comenzi în timp real' },
  { name: 'Feedback Agent', desc: 'Colectare feedback structurat' },
]

const geoLayers = [
  {
    icon: '📍',
    title: 'NAP Protocol',
    desc: 'Name-Address-Phone consistent pe toate platformele AI. Datele tale de contact sunt citite corect de orice motor AI.',
  },
  {
    icon: '🔭',
    title: 'SENTINEL Monitoring',
    desc: 'Monitorizare continuă a modului în care ești menționat de ChatGPT, Perplexity și Gemini. Alerte automate la deviații.',
  },
  {
    icon: '📄',
    title: 'llms.txt Dinamic',
    desc: 'Fișier llms.txt generat automat din knowledge base-ul tău. AI-urile pot citi direct informațiile tale structurate.',
  },
  {
    icon: '🗂️',
    title: 'Knowledge Indexing',
    desc: 'Indexare automată a conținutului în Qdrant. Răspunsuri bazate pe informațiile tale, nu pe date generice.',
  },
  {
    icon: '🌍',
    title: 'Manifest GEO v1',
    desc: 'Contract machine-readable conform standardului GEO Manifest v1.0. Asigură interpretarea corectă a datelor tale.',
  },
  {
    icon: '⚡',
    title: 'Dynamic Rendering',
    desc: 'CloudFront Function detectează crawlere AI și servește HTML pre-randat cu meta-date optimizate GEO.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CatyAI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  featureList: [
    'GEO Gateway — AI Search Visibility',
    'FraudAI Shield — 4 rule categories',
    'WhatsApp AI Integration',
    'Lead Capture Forms',
    'Cart Recovery System',
    'Knowledge Base RAG',
    '10 SAG Agents — deterministic, zero LLM',
    'NAP Protocol',
    'SENTINEL Monitoring',
    'llms.txt Dynamic Generation',
    'Knowledge Indexing (Qdrant)',
    'GEO Manifest v1.0',
    'Dynamic Rendering via CloudFront',
  ],
}

export default function FeaturesPage() {
  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <Helmet>
        <title>CatyAI Features — 10 Agenți AI, GEO Gateway, FraudAI Shield | 14 Limbi</title>
        <meta
          name="description"
          content="SAG Pipeline cu 10 agenți specializați, GEO Gateway 6 layere, FraudAI Shield, WhatsApp Zero Meta, QR-First, Universal Brain. Fără cod. De la €0/lună."
        />
        <link rel="canonical" href="https://catyai.io/features" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span>⚡</span>
            Toate Capabilitățile
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Un AI care face mai mult
            <br />
            <span className="text-[#C48D32]">decât să răspundă</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            CatyAI combină conversații AI avansate cu vizibilitate în motoarele de căutare AI, protecție anti-fraud și agenți deterministici — totul dintr-o singură platformă.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">6 Module Principale</h2>
            <p className="text-gray-400 text-lg">Fiecare modul rezolvă o problemă concretă de business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((f, i) => (
              <Link
                key={i}
                to={f.link}
                className="group p-6 bg-[#0A1628]/50 rounded-2xl border border-[#1a2744]/50 hover:border-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SAG Agents */}
      <section className="py-20 px-4 bg-[#050D20]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-4">
              ZERO LLM CALLS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">10 Agenți SAG Deterministici</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Secretary Agent Grid — agenți specializați care rulează logic deterministică, fără costuri LLM suplimentare.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sagAgents.map((agent, i) => (
              <div
                key={i}
                className="p-4 bg-[#0A1628]/50 rounded-xl border border-[#1a2744]/50 hover:border-purple-500/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm font-bold mb-3">
                  {i + 1}
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{agent.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Gateway Layers */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-xs font-medium mb-4">
              GEO GATEWAY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">6 Straturi de Vizibilitate AI</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Generative Engine Optimization — fii recomandat de ChatGPT, Perplexity și Gemini când clienții tăi caută soluții.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geoLayers.map((layer, i) => (
              <div
                key={i}
                className="p-6 bg-[#0A1628]/50 rounded-2xl border border-[#1a2744]/50 hover:border-[#C48D32]/20 transition-colors"
              >
                <div className="text-2xl mb-4">{layer.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{layer.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/geo-gateway"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C48D32]/10 border border-[#C48D32]/30 text-[#C48D32] rounded-xl font-semibold text-sm hover:bg-[#C48D32]/20 transition-colors"
            >
              Descoperă GEO Gateway complet →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#050D20] to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Toate acestea, într-un singur widget</h2>
          <p className="text-gray-400 mb-8">
            Instalare în 5 minute. Fără cod. Fără contract pe termen lung.
          </p>
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
