import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const translations = {
  en: {
    badge: 'Generative Engine Optimization',
    heroTitle1: 'GEO Gateway',
    heroTitle2: 'Make Your Business Visible to AI',
    heroSubtitle: 'ChatGPT, Gemini, Perplexity, and Claude are answering your customers\' questions right now — without mentioning you. GEO Gateway changes that. 6 layers of AI infrastructure ensure every AI model knows who you are, what you do, and when to recommend you.',
    heroCta: 'Get GEO Ready',
    heroCtaSecondary: 'How It Works',
    trustBadge1: 'Supports 9 AI crawlers',
    trustBadge2: 'Structured data injection',
    trustBadge3: 'Real-time AI visibility',

    problemTitle: 'AI Answers Questions.',
    problemHighlight: 'Is Your Business In Those Answers?',
    problemBody: 'Search engines send traffic via links. AI engines send customers via recommendations. If your business isn\'t structured for AI crawlers, you\'re invisible in ChatGPT, Gemini, Perplexity, and every other AI answer engine — even if you rank #1 on Google.',
    problemPoints: [
      { icon: '🔍', text: 'AI crawlers read structure, not just text' },
      { icon: '📋', text: 'llms.txt signals what AI models should know about you' },
      { icon: '🤖', text: '9 major AI engines have active crawlers indexing the web' },
      { icon: '📉', text: 'No GEO structure = no AI recommendation = lost revenue' }
    ],

    layersTitle: '6-Layer GEO Architecture',
    layersSubtitle: 'Every layer works together to maximize your AI visibility',
    layers: [
      {
        number: '01',
        icon: '📄',
        title: 'llms.txt Index',
        desc: 'A machine-readable index file placed at your domain root. AI crawlers like GPTBot, Googlebot AI, and ClaudeBot read this file first to understand your business context, products, services, and key facts — before processing any other page.',
        color: 'blue'
      },
      {
        number: '02',
        icon: '🤖',
        title: 'AI Crawler Detection',
        desc: 'Identifies 9 known AI crawlers by user-agent: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI, and Meta AI. Each crawler receives a tailored response optimized for its indexing behavior.',
        color: 'purple'
      },
      {
        number: '03',
        icon: '💬',
        title: '/answer Portal',
        desc: 'An AI-to-AI API endpoint — one of the first in the industry. When an AI engine queries your business for structured facts, /answer responds with JSON-LD formatted data: hours, pricing, services, FAQs, and contact info. AI reads AI.',
        color: 'gold'
      },
      {
        number: '04',
        icon: '🏗️',
        title: 'Dynamic Schema.org Injection',
        desc: 'Automatically generates and injects Schema.org structured data into every page: LocalBusiness, FAQPage, Product, Service, and Review schemas. This gives AI engines the semantic context they need to accurately represent your business in answers.',
        color: 'green'
      },
      {
        number: '05',
        icon: '📡',
        title: 'AI Visibility Monitor + Beacons',
        desc: 'Tracks when AI crawlers visit your domain and what they index. Lightweight JS beacons fire on crawler visits, feeding data back to your dashboard. See which AI engines have crawled your site and what content they consumed.',
        color: 'orange'
      },
      {
        number: '06',
        icon: '🛡️',
        title: 'SENTINEL Predictive + FraudAI Shield',
        desc: 'SENTINEL monitors AI citation patterns across major engines and predicts visibility gaps before they affect your recommendations. FraudAI Shield prevents content injection attacks that could compromise what AI models learn about your business.',
        color: 'red'
      }
    ],

    crawlersTitle: '9 AI Crawlers Supported',
    crawlersSubtitle: 'GEO Gateway speaks the language of every major AI engine',
    crawlers: [
      { name: 'GPTBot', engine: 'ChatGPT / OpenAI', icon: '🧠' },
      { name: 'GoogleBot AI', engine: 'Gemini / Google AI', icon: '🔵' },
      { name: 'ClaudeBot', engine: 'Claude / Anthropic', icon: '🤖' },
      { name: 'PerplexityBot', engine: 'Perplexity AI', icon: '🔮' },
      { name: 'Applebot', engine: 'Siri / Apple Intelligence', icon: '🍎' },
      { name: 'YouBot', engine: 'You.com AI Search', icon: '🔍' },
      { name: 'BingBot AI', engine: 'Copilot / Microsoft AI', icon: '🪟' },
      { name: 'Cohere AI', engine: 'Cohere Enterprise', icon: '📊' },
      { name: 'Meta AI', engine: 'Meta AI / Llama', icon: '📘' }
    ],

    answerTitle: 'The /answer Portal',
    answerSubtitle: 'The first AI-to-AI communication layer for business visibility',
    answerBody: 'When ChatGPT or Gemini queries your business, they don\'t get a webpage — they get a structured JSON-LD response built specifically for AI consumption. Hours, pricing, services, location, FAQs — all in a format that AI models can cite with confidence.',
    answerCode: `GET /answer?q=business_hours
→ {
  "@type": "LocalBusiness",
  "name": "Your Business",
  "openingHours": ["Mo-Fr 09:00-18:00"],
  "priceRange": "€€",
  "description": "...",
  "hasOfferCatalog": [...]
}`,

    ctaTitle: 'GEO vs. Traditional SEO',
    ctaItems: [
      { feature: 'Target audience', seo: 'Google bots', geo: 'AI language models' },
      { feature: 'Content format', seo: 'Keywords in text', geo: 'Structured JSON-LD + llms.txt' },
      { feature: 'Discovery method', seo: 'Link ranking', geo: 'Semantic relevance + citation' },
      { feature: 'AI crawler support', seo: 'None', geo: '9 crawlers' },
      { feature: 'Real-time monitoring', seo: 'Not available', geo: 'Beacon + dashboard' },
      { feature: 'Schema injection', seo: 'Manual', geo: 'Dynamic + automatic' }
    ],

    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What exactly is GEO?',
        a: 'GEO stands for Generative Engine Optimization — the practice of making your business content readable, citable, and recommendable by AI language models like ChatGPT, Gemini, and Perplexity. It is not geographic targeting or IP-based routing.'
      },
      {
        q: 'Do I need GEO if I already do SEO?',
        a: 'Yes. SEO optimizes for search engine ranking. GEO optimizes for AI engine citations. As AI answer engines replace traditional search for many queries, not being GEO-optimized means being invisible in the answers AI provides to your potential customers.'
      },
      {
        q: 'How does the /answer portal work?',
        a: 'GEO Gateway adds a /answer endpoint to your domain. When an AI engine crawler queries it, the endpoint returns structured JSON-LD data about your business — hours, services, pricing, FAQs — in a machine-readable format optimized for AI ingestion.'
      },
      {
        q: 'Which AI engines does GEO Gateway support?',
        a: 'GEO Gateway currently supports 9 AI crawlers: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI, and Meta AI. New crawlers are added as they emerge.'
      },
      {
        q: 'Is GEO Gateway included in my CatyAI plan?',
        a: 'GEO Gateway features are available across all paid CatyAI plans. The llms.txt index, /answer portal, and AI crawler detection are included. Advanced monitoring and SENTINEL predictive features are available on Growth and above.'
      }
    ],

    finalCta: 'Start Getting Cited by AI',
    finalCtaBody: 'Every day without GEO is a day your competitors get recommended by ChatGPT instead of you.'
  },

  ro: {
    badge: 'Optimizare pentru Motoare Generative',
    heroTitle1: 'GEO Gateway',
    heroTitle2: 'Fă-ți Afacerea Vizibilă pentru AI',
    heroSubtitle: 'ChatGPT, Gemini, Perplexity și Claude răspund acum la întrebările clienților tăi — fără să te menționeze. GEO Gateway schimbă asta. 6 straturi de infrastructură AI asigură că fiecare model AI știe cine ești, ce faci și când să te recomande.',
    heroCta: 'Devino GEO Ready',
    heroCtaSecondary: 'Cum Funcționează',
    trustBadge1: 'Suportă 9 crawlere AI',
    trustBadge2: 'Injectare date structurate',
    trustBadge3: 'Vizibilitate AI în timp real',

    problemTitle: 'AI Răspunde la Întrebări.',
    problemHighlight: 'Este Afacerea Ta în Acele Răspunsuri?',
    problemBody: 'Motoarele de căutare trimit trafic prin linkuri. Motoarele AI trimit clienți prin recomandări. Dacă afacerea ta nu este structurată pentru crawlerele AI, ești invizibil în ChatGPT, Gemini, Perplexity și orice alt motor AI — chiar dacă ești primul pe Google.',
    problemPoints: [
      { icon: '🔍', text: 'Crawlerele AI citesc structura, nu doar textul' },
      { icon: '📋', text: 'llms.txt semnalează ce trebuie să știe modelele AI despre tine' },
      { icon: '🤖', text: '9 motoare AI majore au crawlere active care indexează web-ul' },
      { icon: '📉', text: 'Fără structură GEO = nicio recomandare AI = venituri pierdute' }
    ],

    layersTitle: 'Arhitectura GEO în 6 Straturi',
    layersSubtitle: 'Fiecare strat lucrează împreună pentru a maximiza vizibilitatea ta AI',
    layers: [
      {
        number: '01',
        icon: '📄',
        title: 'Index llms.txt',
        desc: 'Un fișier index citibil de mașini plasat în rădăcina domeniului. Crawlerele AI ca GPTBot, Googlebot AI și ClaudeBot citesc mai întâi acest fișier pentru a înțelege contextul afacerii tale, produsele, serviciile și faptele cheie.',
        color: 'blue'
      },
      {
        number: '02',
        icon: '🤖',
        title: 'Detectare Crawlere AI',
        desc: 'Identifică 9 crawlere AI cunoscute după user-agent: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI și Meta AI. Fiecare crawler primește un răspuns adaptat.',
        color: 'purple'
      },
      {
        number: '03',
        icon: '💬',
        title: 'Portal /answer',
        desc: 'Un endpoint API AI-la-AI — unul dintre primele din industrie. Când un motor AI interoghează afacerea ta pentru fapte structurate, /answer răspunde cu date formatate JSON-LD: ore, prețuri, servicii, FAQ-uri și informații de contact.',
        color: 'gold'
      },
      {
        number: '04',
        icon: '🏗️',
        title: 'Injectare Dinamică Schema.org',
        desc: 'Generează și injectează automat date structurate Schema.org în fiecare pagină: scheme LocalBusiness, FAQPage, Product, Service și Review. Oferă motoarelor AI contextul semantic de care au nevoie pentru a reprezenta corect afacerea ta.',
        color: 'green'
      },
      {
        number: '05',
        icon: '📡',
        title: 'Monitor Vizibilitate AI + Beacoane',
        desc: 'Urmărește când crawlerele AI vizitează domeniul tău și ce indexează. Beacoanele JS ușoare se declanșează la vizitele crawlerelor, alimentând date în dashboard. Vezi ce motoare AI ți-au crawlat site-ul.',
        color: 'orange'
      },
      {
        number: '06',
        icon: '🛡️',
        title: 'SENTINEL Predictiv + FraudAI Shield',
        desc: 'SENTINEL monitorizează tiparele de citare AI pe motoarele majore și prezice lacunele de vizibilitate înainte să afecteze recomandările. FraudAI Shield previne atacurile de injectare de conținut care ar putea compromite ce înțeleg modelele AI despre afacerea ta.',
        color: 'red'
      }
    ],

    crawlersTitle: '9 Crawlere AI Suportate',
    crawlersSubtitle: 'GEO Gateway vorbește limbajul fiecărui motor AI major',
    crawlers: [
      { name: 'GPTBot', engine: 'ChatGPT / OpenAI', icon: '🧠' },
      { name: 'GoogleBot AI', engine: 'Gemini / Google AI', icon: '🔵' },
      { name: 'ClaudeBot', engine: 'Claude / Anthropic', icon: '🤖' },
      { name: 'PerplexityBot', engine: 'Perplexity AI', icon: '🔮' },
      { name: 'Applebot', engine: 'Siri / Apple Intelligence', icon: '🍎' },
      { name: 'YouBot', engine: 'You.com AI Search', icon: '🔍' },
      { name: 'BingBot AI', engine: 'Copilot / Microsoft AI', icon: '🪟' },
      { name: 'Cohere AI', engine: 'Cohere Enterprise', icon: '📊' },
      { name: 'Meta AI', engine: 'Meta AI / Llama', icon: '📘' }
    ],

    answerTitle: 'Portalul /answer',
    answerSubtitle: 'Primul strat de comunicare AI-la-AI pentru vizibilitatea afacerilor',
    answerBody: 'Când ChatGPT sau Gemini interoghează afacerea ta, nu primesc o pagină web — primesc un răspuns JSON-LD structurat construit special pentru consum AI. Ore, prețuri, servicii, locație, FAQ-uri — totul într-un format pe care modelele AI îl pot cita cu încredere.',
    answerCode: `GET /answer?q=business_hours
→ {
  "@type": "LocalBusiness",
  "name": "Afacerea Ta",
  "openingHours": ["Lu-Vi 09:00-18:00"],
  "priceRange": "€€",
  "description": "...",
  "hasOfferCatalog": [...]
}`,

    ctaTitle: 'GEO vs. SEO Tradițional',
    ctaItems: [
      { feature: 'Audiența țintă', seo: 'Boții Google', geo: 'Modele de limbaj AI' },
      { feature: 'Format conținut', seo: 'Cuvinte cheie în text', geo: 'JSON-LD structurat + llms.txt' },
      { feature: 'Metodă descoperire', seo: 'Ranking linkuri', geo: 'Relevanță semantică + citare' },
      { feature: 'Suport crawlere AI', seo: 'Niciunul', geo: '9 crawlere' },
      { feature: 'Monitorizare timp real', seo: 'Indisponibil', geo: 'Beacon + dashboard' },
      { feature: 'Injectare schemă', seo: 'Manuală', geo: 'Dinamică + automată' }
    ],

    faqTitle: 'Întrebări Frecvente',
    faqs: [
      {
        q: 'Ce este exact GEO?',
        a: 'GEO înseamnă Generative Engine Optimization — practica de a face conținutul afacerii tale lizibil, citabil și recomandabil de modelele AI ca ChatGPT, Gemini și Perplexity. Nu este targetare geografică sau rutare bazată pe IP.'
      },
      {
        q: 'Am nevoie de GEO dacă deja fac SEO?',
        a: 'Da. SEO optimizează pentru ranking în motoarele de căutare. GEO optimizează pentru citările motoarelor AI. Pe măsură ce motoarele AI înlocuiesc căutarea tradițională, a nu fi optimizat GEO înseamnă a fi invizibil în răspunsurile pe care AI le oferă clienților tăi potențiali.'
      },
      {
        q: 'Cum funcționează portalul /answer?',
        a: 'GEO Gateway adaugă un endpoint /answer domeniului tău. Când un crawler AI îl interoghează, endpoint-ul returnează date JSON-LD structurate despre afacerea ta — ore, servicii, prețuri, FAQ-uri — într-un format optimizat pentru ingestia AI.'
      },
      {
        q: 'Ce motoare AI suportă GEO Gateway?',
        a: 'GEO Gateway suportă în prezent 9 crawlere AI: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI și Meta AI. Crawlere noi sunt adăugate pe măsură ce apar.'
      },
      {
        q: 'GEO Gateway este inclus în planul meu CatyAI?',
        a: 'Funcționalitățile GEO Gateway sunt disponibile în toate planurile plătite CatyAI. Indexul llms.txt, portalul /answer și detectarea crawlerelor AI sunt incluse. Monitorizarea avansată și funcționalitățile predictive SENTINEL sunt disponibile din planul Growth în sus.'
      }
    ],

    finalCta: 'Începe să Fii Citat de AI',
    finalCtaBody: 'Fiecare zi fără GEO este o zi în care concurenții tăi sunt recomandați de ChatGPT în loc de tine.'
  }
}

const colorMap = {
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', hover: 'hover:border-blue-500/30' },
  purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', hover: 'hover:border-purple-500/30' },
  gold: { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', hover: 'hover:border-yellow-500/30' },
  green: { border: 'border-green-500/30', text: 'text-green-400', bg: 'bg-green-500/10', hover: 'hover:border-green-500/30' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', hover: 'hover:border-orange-500/30' },
  red: { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-red-500/10', hover: 'hover:border-red-500/30' }
}

export default function GeoGateway() {
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

  useEffect(() => {
    document.title = lang === 'ro'
      ? 'GEO Gateway — Vizibilitate AI pentru Afacerea Ta | CatyAI'
      : 'GEO Gateway — AI Visibility for Your Business | CatyAI'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t.heroSubtitle)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <SEO
        title={lang === 'ro' ? 'GEO Gateway — Vizibilitate AI pentru Afacerea Ta | CatyAI' : 'GEO Gateway — AI Visibility for Your Business | CatyAI'}
        description={t.heroSubtitle}
      />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <span>🌐</span>
                {t.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {t.heroTitle1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {t.heroTitle2}
                </span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{t.heroSubtitle}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors">
                  {t.heroCta}
                </Link>
                <a href="#how-it-works" className="px-6 py-3 border border-[#1a2744] hover:border-blue-500/50 rounded-xl font-semibold transition-colors text-gray-300 hover:text-white">
                  {t.heroCtaSecondary}
                </a>
              </div>
              <div className="flex flex-wrap gap-4">
                {[t.trustBadge1, t.trustBadge2, t.trustBadge3].map((b, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-blue-400">✓</span>{b}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#0A1628]/60 rounded-2xl border border-[#1a2744]/50 p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                  <span className="ml-2 text-gray-500 text-xs">AI Crawler Activity</span>
                </div>
                {[
                  { bot: 'GPTBot', action: 'READ /llms.txt', status: '200 OK', color: 'text-green-400' },
                  { bot: 'ClaudeBot', action: 'GET /answer?q=services', status: '200 OK', color: 'text-green-400' },
                  { bot: 'PerplexityBot', action: 'CRAWL /schema.json', status: '200 OK', color: 'text-green-400' },
                  { bot: 'GoogleBot AI', action: 'INDEX structured data', status: 'CITED', color: 'text-blue-400' }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[#1a2744]/30 last:border-0">
                    <div>
                      <span className="text-purple-400 font-semibold">{row.bot}</span>
                      <span className="text-gray-500 ml-3">{row.action}</span>
                    </div>
                    <span className={`text-xs font-semibold ${row.color}`}>{row.status}</span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-[#1a2744]/30 text-center text-xs text-gray-500">
                  Live AI crawler feed • catyai.io
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 bg-gray-950" id="problem">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.problemTitle}{' '}
            <span className="text-blue-400">{t.problemHighlight}</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">{t.problemBody}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.problemPoints.map((p, i) => (
              <div key={i} className="p-5 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 text-left flex items-start gap-3">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-gray-300">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Layer Architecture */}
      <section className="py-16 px-4 bg-[#010A1F]" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.layersTitle}</h2>
            <p className="text-gray-400 text-lg">{t.layersSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.layers.map((layer, i) => {
              const c = colorMap[layer.color]
              return (
                <div key={i} className={`p-5 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 ${c.hover} transition-colors`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold ${c.text} opacity-60`}>{layer.number}</span>
                    <span className="text-2xl">{layer.icon}</span>
                    <h3 className={`font-bold ${c.text}`}>{layer.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{layer.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Crawlers */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.crawlersTitle}</h2>
            <p className="text-gray-400 text-lg">{t.crawlersSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {t.crawlers.map((c, i) => (
              <div key={i} className="p-4 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 hover:border-blue-500/30 transition-colors text-center">
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="font-bold text-sm text-white">{c.name}</div>
                <div className="text-xs text-gray-500 mt-1">{c.engine}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* /answer Portal */}
      <section className="py-16 px-4 bg-[#010A1F]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-5">
                <span>⚡</span> FIRST in Industry
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.answerTitle}</h2>
              <p className="text-gray-400 mb-3 text-sm font-medium uppercase tracking-wider">{t.answerSubtitle}</p>
              <p className="text-gray-300 leading-relaxed">{t.answerBody}</p>
            </div>
            <div className="bg-[#0A1628]/60 rounded-2xl border border-[#1a2744]/50 p-6 font-mono text-sm">
              <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">{t.answerCode}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* GEO vs SEO Comparison */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t.ctaTitle}</h2>
          <div className="rounded-2xl border border-[#1a2744]/50 overflow-hidden">
            <div className="grid grid-cols-3 bg-[#0A1628]/60 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-[#1a2744]/50">
              <span>Feature</span>
              <span className="text-center">Traditional SEO</span>
              <span className="text-center text-blue-400">GEO Gateway</span>
            </div>
            {t.ctaItems.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 px-5 py-4 border-b border-[#1a2744]/30 last:border-0 ${i % 2 === 0 ? 'bg-[#0A1628]/20' : ''}`}>
                <span className="text-gray-300 text-sm">{row.feature}</span>
                <span className="text-center text-gray-500 text-sm">{row.seo}</span>
                <span className="text-center text-blue-400 text-sm font-medium">{row.geo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#010A1F]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faqs.map((faq, i) => (
              <details key={i} className="group p-5 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 hover:border-blue-500/30 transition-colors cursor-pointer">
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

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.finalCta}</h2>
          <p className="text-gray-400 mb-8">{t.finalCtaBody}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors">
              {t.heroCta}
            </Link>
            <Link to="/pricing" className="px-8 py-3 border border-[#1a2744] hover:border-blue-500/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors">
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
