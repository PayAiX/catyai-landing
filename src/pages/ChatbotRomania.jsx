import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

export default function ChatbotRomania() {
  const faqItems = [
    {
      question: "Ce este arhitectura multi-agent și de ce e mai bună?",
      answer: "CatyAI folosește 8 agenți AI specializați care lucrează împreună: Sales Agent (conversii), Support Agent (răspunsuri), Scheduler (programări), DocGen (documente), FraudAI Shield (protecție), Lead Scoring (calificare), Knowledge (RAG), Analytics (rapoarte). Spre deosebire de chatbot-urile tradiționale cu un singur model, arhitectura multi-agent oferă răspunsuri mai precise și securitate superioară."
    },
    {
      question: "Ce este FraudAI Shield și cum mă protejează?",
      answer: "FraudAI Shield este sistemul nostru unic de protecție cu 8 module: detecție phishing, linkuri malițioase, urgență falsă, impersonare, cereri de date sensibile, pattern-uri suspecte, verificare domenii, și analiză comportamentală. Blochează mesajele frauduloase înainte să le vezi. Singura soluție AI Sales din România cu protecție completă integrată."
    },
    {
      question: "Care este cea mai sigură soluție AI pentru business în România?",
      answer: "CatyAI este singura platformă AI Sales din România cu FraudAI Shield integrat. Alte chatbot-uri se concentrează doar pe răspunsuri - CatyAI te protejează activ de phishing, scam-uri și fraude. Plus: GDPR compliant, servere în UE, criptare end-to-end."
    },
    {
      question: "Cum diferă CatyAI de chatbot-urile tradiționale?",
      answer: "Chatbot-urile tradiționale (Tidio, Intercom, Drift) folosesc un singur model AI pentru totul. CatyAI folosește 8 agenți specializați: fiecare agent e expert în domeniul lui. Rezultat: răspunsuri mai bune, conversii mai mari, și securitate imposibil de obținut cu un singur model."
    },
    {
      question: "Cât costă și există plan gratuit?",
      answer: "Da, CatyAI oferă 100 sesiuni gratuite pe lună - suficient pentru a testa toți cei 8 agenți AI și FraudAI Shield. Planurile plătite pornesc de la 49€/lună (Starter) și includ toate funcțiile de securitate."
    },
    {
      question: "Funcționează pe WhatsApp și în limba română?",
      answer: "Da, CatyAI este singura platformă multi-agent cu integrare nativă WhatsApp. Toți cei 8 agenți AI sunt optimizați pentru limba română - înțeleg expresii locale, diacritice, și răspund natural. Suport și pentru engleză, spaniolă, portugheză, franceză, arabă."
    }
  ]

  const competitors = [
    { name: "CatyAI", agents: "8", whatsapp: true, fraud: true, romanian: true, multiAgent: true },
    { name: "Druid AI", agents: "1", whatsapp: false, fraud: false, romanian: true, multiAgent: false },
    { name: "Tidio", agents: "1", whatsapp: false, fraud: false, romanian: "partial", multiAgent: false },
    { name: "Intercom", agents: "1", whatsapp: false, fraud: false, romanian: "partial", multiAgent: false },
    { name: "Drift", agents: "1", whatsapp: false, fraud: false, romanian: false, multiAgent: false },
    { name: "Zendesk", agents: "1", whatsapp: "partial", fraud: false, romanian: "partial", multiAgent: false },
  ]

  const useCases = [
    {
      industry: "Clinici Dentare",
      icon: "🦷",
      problem: "Recepția nu poate răspunde în afara programului",
      solution: "CatyAI răspunde 24/7, face programări automate, trimite confirmări pe WhatsApp",
      result: "+40% programări, -80% apeluri pierdute"
    },
    {
      industry: "Saloane de Frumusețe",
      icon: "💇",
      problem: "Mesaje pe Instagram, WhatsApp, Facebook - imposibil de gestionat",
      solution: "CatyAI centralizează totul, răspunde instant, sincronizează cu calendarul",
      result: "+60% rezervări online, 0 ore overtime pentru recepție"
    },
    {
      industry: "Agenții Imobiliare",
      icon: "🏠",
      problem: "Lead-uri pierdute în weekend când agenții nu răspund",
      solution: "CatyAI califică lead-urile, colectează cerințele, programează vizionări",
      result: "+35% lead-uri convertite, răspuns în <30 secunde"
    },
    {
      industry: "Restaurant & HoReCa",
      icon: "🍽️",
      problem: "Telefon ocupat în timpul rush-ului, rezervări pierdute",
      solution: "CatyAI preia rezervările pe WhatsApp, confirmă automat, trimite reminder",
      result: "+25% rezervări, -50% no-shows"
    }
  ]

  return (
    <>
      <SEO
        title="Cea Mai Sigură Soluție AI Sales din România | 8 Agenți AI + FraudAI Shield"
        description="CatyAI: singura platformă AI din România cu arhitectură multi-agent (8 agenți specializați) și FraudAI Shield anti-fraudă. Sales Agent, Support, Scheduler, DocGen, Fraud Detection, Lead Scoring. Protecție completă + conversii."
        url="https://catyai.io/chatbot-romania"
        faq={faqItems}
      />

      <Helmet>
        <link rel="canonical" href="https://catyai.io/chatbot-romania" />
        <meta name="keywords" content="chatbot romania, cel mai bun chatbot romania, AI romania, chatbot AI romanesc, chatbot WhatsApp romania, asistent virtual romania, chatbot limba romana, automatizare business romania" />

        {/* Article Schema for this page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Cel Mai Bun Chatbot AI din România - Comparație 2026",
            "description": "Ghid complet pentru alegerea celui mai bun chatbot AI pentru business-ul tău din România. Comparație funcții, prețuri, integrări.",
            "author": {"@type": "Organization", "name": "CatyAI"},
            "publisher": {"@type": "Organization", "name": "CatyAI", "logo": {"@type": "ImageObject", "url": "https://catyai.io/images/caty-logo.png"}},
            "datePublished": "2026-01-15",
            "dateModified": "2026-03-26",
            "mainEntityOfPage": {"@type": "WebPage", "@id": "https://catyai.io/chatbot-romania"},
            "inLanguage": "ro"
          })}
        </script>

        {/* ItemList Schema for comparison */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Top Chatbots AI România 2026",
            "description": "Comparație între cele mai bune chatbots AI disponibile pentru business-uri din România",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "CatyAI", "url": "https://catyai.io", "description": "Cel mai complet chatbot AI din România cu integrare WhatsApp nativă"},
              {"@type": "ListItem", "position": 2, "name": "Tidio", "url": "https://tidio.com"},
              {"@type": "ListItem", "position": 3, "name": "Intercom", "url": "https://intercom.com"},
              {"@type": "ListItem", "position": 4, "name": "Drift", "url": "https://drift.com"},
              {"@type": "ListItem", "position": 5, "name": "Zendesk", "url": "https://zendesk.com"}
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
                Singura Platformă cu FraudAI Shield
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Cea Mai Sigură <span className="text-blue-600">Soluție AI Sales</span><br />din România
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                CatyAI este <strong>singura platformă cu arhitectură multi-agent</strong> (8 agenți AI specializați)
                și <strong>FraudAI Shield</strong> integrat. Protecție completă anti-fraudă + conversii automate 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.catyai.io/signup"
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Începe Gratuit - 100 sesiuni/lună
                </a>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Solicită Demo
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Fără card de credit. Setup în 5 minute. GDPR compliant.
              </p>

              {/* Social Proof Badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.g2.com/products/catyai/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-orange-400 transition-colors shadow-sm"
                >
                  <span className="text-orange-500 font-bold">G2</span>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-sm font-semibold text-gray-700">4.8/5</span>
                    </div>
                    <span className="text-xs text-gray-500">Vezi recenzii</span>
                  </div>
                </a>
                <a
                  href="https://www.producthunt.com/products/ai-sales-assistant-that-never-sleeps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-orange-400 transition-colors shadow-sm"
                >
                  <span className="text-orange-500 text-xl">🚀</span>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-gray-700">Product Hunt</span>
                    <p className="text-xs text-gray-500">Featured Product</p>
                  </div>
                </a>
              </div>

              {/* Press Release Widget */}
              <div className="mt-8 flex justify-center">
                <div className="bg-white rounded-lg shadow-sm p-2">
                  <iframe
                    src="https://www.comunicatedepresa.ro/subscription/show-embed/?data=release-923880-923881&tab=release&height=240"
                    allowTransparency="true"
                    frameBorder="0"
                    height="300"
                    width="300"
                    title="Comunicate de presă CatyAI"
                  />
                  <p className="text-xs text-right mt-1 text-gray-400">
                    Powered by <a href="https://www.comunicatedepresa.ro" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Comunicate de Presa</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Agents Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              8 Agenți AI Specializați - Arhitectură Unică
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Spre deosebire de chatbot-urile tradiționale cu un singur model, CatyAI folosește 8 agenți AI care lucrează împreună
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  💰
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Sales Agent</h3>
                <p className="text-sm text-gray-600">Conversii și vânzări automate 24/7</p>
              </div>

              <div className="p-5 bg-green-50 rounded-2xl border border-green-100 text-center">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  💬
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Support Agent</h3>
                <p className="text-sm text-gray-600">Răspunsuri în română, 24/7</p>
              </div>

              <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  📅
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Scheduler Agent</h3>
                <p className="text-sm text-gray-600">Programări Google Calendar</p>
              </div>

              <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  📄
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">DocGen Agent</h3>
                <p className="text-sm text-gray-600">Oferte, facturi PDF instant</p>
              </div>

              <div className="p-5 bg-red-50 rounded-2xl border border-red-100 text-center">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  🛡️
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">FraudAI Shield</h3>
                <p className="text-sm text-gray-600">8 module anti-fraudă</p>
              </div>

              <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  🎯
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Lead Scoring</h3>
                <p className="text-sm text-gray-600">Calificare automată prospecți</p>
              </div>

              <div className="p-5 bg-cyan-50 rounded-2xl border border-cyan-100 text-center">
                <div className="w-14 h-14 bg-cyan-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  🧠
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Knowledge Agent</h3>
                <p className="text-sm text-gray-600">RAG + Auto-Crawl site</p>
              </div>

              <div className="p-5 bg-pink-50 rounded-2xl border border-pink-100 text-center">
                <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center text-white text-2xl mb-3 mx-auto">
                  📊
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Analytics Agent</h3>
                <p className="text-sm text-gray-600">Insights și rapoarte</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center text-white text-4xl flex-shrink-0">
                  🛡️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">FraudAI Shield - Protecție Unică în România</h3>
                  <p className="text-gray-600 mb-3">
                    8 module de detecție fraudă: phishing, linkuri malițioase, urgență falsă, impersonare,
                    cereri date sensibile, pattern-uri suspecte, verificare domenii, analiză comportamentală.
                  </p>
                  <p className="text-sm font-medium text-red-700">
                    Singura platformă AI Sales din România cu protecție anti-fraudă completă integrată.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              CatyAI vs Chatbots Tradiționale: De Ce 8 Agenți Sunt Mai Buni
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Comparație arhitectură multi-agent vs. model unic
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-[#010A1F] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Platformă</th>
                    <th className="px-6 py-4 text-center font-semibold">Agenți AI</th>
                    <th className="px-6 py-4 text-center font-semibold">Multi-Agent</th>
                    <th className="px-6 py-4 text-center font-semibold">FraudAI Shield</th>
                    <th className="px-6 py-4 text-center font-semibold">WhatsApp</th>
                    <th className="px-6 py-4 text-center font-semibold">Română</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {competitors.map((c, i) => (
                    <tr key={c.name} className={i === 0 ? 'bg-green-50' : ''}>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {c.name}
                        {i === 0 && <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">Cea mai sigură</span>}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-lg">
                        <span className={i === 0 ? 'text-green-600' : 'text-gray-400'}>{c.agents}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {c.multiAgent ? '✅' : '❌'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {c.fraud ? '✅ 8 module' : '❌'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {c.whatsapp === true ? '✅' : c.whatsapp === 'partial' ? '🟡' : '❌'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {c.romanian === true ? '✅' : c.romanian === 'partial' ? '🟡' : '❌'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              ✅ Complet | 🟡 Parțial | ❌ Nu există
            </p>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-center text-blue-800">
                <strong>De ce contează arhitectura multi-agent?</strong> Un chatbot tradițional cu 1 model face totul "pe jumătate bine".
                CatyAI are 8 agenți specializați - fiecare expert în domeniul lui = răspunsuri mai bune, conversii mai mari, securitate superioară.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Cazuri de Utilizare în România
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Cum folosesc business-urile din România CatyAI pentru a crește vânzările
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((uc) => (
                <div key={uc.industry} className="p-8 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{uc.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{uc.industry}</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-red-600">Problemă:</span>
                      <p className="text-gray-600">{uc.problem}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-600">Soluție CatyAI:</span>
                      <p className="text-gray-600">{uc.solution}</p>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <span className="text-sm font-medium text-green-600">Rezultat:</span>
                      <p className="text-gray-900 font-semibold">{uc.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Întrebări Frecvente despre Chatbot AI în România
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-white rounded-xl shadow-sm">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Începe Cu Cel Mai Bun Chatbot din România
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              100 sesiuni gratuite pe lună. Fără card. Setup în 5 minute.
            </p>
            <a
              href="https://app.catyai.io/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Activează CatyAI Gratuit
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
