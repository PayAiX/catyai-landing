import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GeoAuditWidget from '../components/GeoAuditWidget'
import FooterV9 from '../components/FooterV9'

function LanguageSelector({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false)
  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'ro', flag: '🇷🇴', name: 'RO' },
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' },
  ]
  const current = languages.find(l => l.code === lang) || languages[0]
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#0A1628]/50 hover:bg-[#1a2744]/50 transition-colors text-sm">
        <span>{current.flag}</span>
        <span className="text-gray-300">{current.name}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-24 bg-[#0A1628] rounded-lg shadow-xl border border-[#1a2744] z-50">
          {languages.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); localStorage.setItem('caty-lang', l.code); setIsOpen(false) }}
              className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-[#1a2744] ${lang === l.code ? 'text-yellow-400' : 'text-gray-300'}`}>
              <span>{l.flag}</span> {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const translations = {
  en: {
    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', faq: 'FAQ', login: 'Login', getStarted: 'Get Started' },
    badge: 'Generative Engine Optimization',
    heroBadge: 'GEO Gateway · 6 Active Layers',
    card1Icon: '!',
    card1Title: 'AI is',
    card1TitleAccent: 'blind',
    card1TitleEnd: 'to your website',
    card1Body: "GPTBot, ClaudeBot and Perplexity don't run JavaScript. They see only an empty HTML shell. Your products, prices, services — invisible.",
    card2Icon: '✓',
    card2TitleStart: '',
    card2TitleAccent: 'Truth Protocol',
    card2TitleEnd: 'readable by any AI',
    card2Body: 'CatyAI GEO Gateway transforms your site into a verifiable Truth Protocol — signed Ed25519, structured for every AI engine.',
    heroCta: 'Test your GEO score',
    heroCtaSecondary: 'How it works →',
    trustBadge1: 'Ed25519 Signature',
    trustBadge2: '9 AI Crawlers',
    trustBadge3: '300ms',
    trustBadge4: '0% Hallucination',

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
    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Acum' },
    badge: 'Generative Engine Optimization',
    heroBadge: 'GEO Gateway · 6 Straturi Active',
    card1Icon: '!',
    card1Title: 'AI-ul este',
    card1TitleAccent: 'orb',
    card1TitleEnd: 'pe site-ul tău',
    card1Body: 'GPTBot, ClaudeBot și Perplexity nu rulează JavaScript. Văd doar un shell HTML gol. Produsele, prețurile, serviciile tale — invizibile.',
    card2Icon: '✓',
    card2TitleStart: '',
    card2TitleAccent: 'Protocol de Adevăr',
    card2TitleEnd: 'citibil de orice AI',
    card2Body: 'CatyAI GEO Gateway transformă site-ul tău într-un Protocol de Adevăr verificabil — semnat Ed25519, structurat pentru orice motor AI.',
    heroCta: 'Testează-ți scorul GEO',
    heroCtaSecondary: 'Cum funcționează →',
    trustBadge1: 'Ed25519 Signature',
    trustBadge2: '9 AI Crawlers',
    trustBadge3: '300ms',
    trustBadge4: '0% Halucinare',

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
  },

  es: {
    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo Funciona', faq: 'FAQ', login: 'Entrar', getStarted: 'Empezar' },
    badge: 'Generative Engine Optimization',
    heroBadge: 'GEO Gateway · 6 Capas Activas',
    card1Icon: '!',
    card1Title: 'La AI está',
    card1TitleAccent: 'ciega',
    card1TitleEnd: 'a tu sitio web',
    card1Body: 'GPTBot, ClaudeBot y Perplexity no ejecutan JavaScript. Solo ven un shell HTML vacío. Tus productos, precios, servicios — invisibles.',
    card2Icon: '✓',
    card2TitleStart: '',
    card2TitleAccent: 'Protocolo de Verdad',
    card2TitleEnd: 'legible por cualquier AI',
    card2Body: 'CatyAI GEO Gateway transforma tu sitio en un Protocolo de Verdad verificable — firmado Ed25519, estructurado para cualquier motor AI.',
    heroCta: 'Prueba tu puntuación GEO',
    heroCtaSecondary: 'Cómo funciona →',
    trustBadge1: 'Ed25519 Signature',
    trustBadge2: '9 AI Crawlers',
    trustBadge3: '300ms',
    trustBadge4: '0% Alucinación'
  },

  pt: {
    nav: { home: 'Início', features: 'Funções', howItWorks: 'Como Funciona', faq: 'FAQ', login: 'Entrar', getStarted: 'Começar' },
    badge: 'Generative Engine Optimization',
    heroBadge: 'GEO Gateway · 6 Camadas Ativas',
    card1Icon: '!',
    card1Title: 'A AI está',
    card1TitleAccent: 'cega',
    card1TitleEnd: 'para o seu site',
    card1Body: 'GPTBot, ClaudeBot e Perplexity não executam JavaScript. Eles veem apenas um shell HTML vazio. Seus produtos, preços, serviços — invisíveis.',
    card2Icon: '✓',
    card2TitleStart: '',
    card2TitleAccent: 'Protocolo da Verdade',
    card2TitleEnd: 'legível por qualquer AI',
    card2Body: 'CatyAI GEO Gateway transforma seu site em um Protocolo da Verdade verificável — assinado Ed25519, estruturado para qualquer motor AI.',
    heroCta: 'Teste sua pontuação GEO',
    heroCtaSecondary: 'Como funciona →',
    trustBadge1: 'Ed25519 Signature',
    trustBadge2: '9 AI Crawlers',
    trustBadge3: '300ms',
    trustBadge4: '0% Alucinação'
  },

  fr: {
    nav: { home: 'Accueil', features: 'Fonctions', howItWorks: 'Comment ça marche', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer' },
    badge: 'Generative Engine Optimization',
    heroBadge: 'GEO Gateway · 6 Couches Actives',
    card1Icon: '!',
    card1Title: "L'AI est",
    card1TitleAccent: 'aveugle',
    card1TitleEnd: 'à votre site',
    card1Body: "GPTBot, ClaudeBot et Perplexity n'exécutent pas JavaScript. Ils ne voient qu'un shell HTML vide. Vos produits, prix, services — invisibles.",
    card2Icon: '✓',
    card2TitleStart: '',
    card2TitleAccent: 'Protocole de Vérité',
    card2TitleEnd: 'lisible par toute AI',
    card2Body: "CatyAI GEO Gateway transforme votre site en un Protocole de Vérité vérifiable — signé Ed25519, structuré pour tout moteur AI.",
    heroCta: 'Testez votre score GEO',
    heroCtaSecondary: 'Comment ça marche →',
    trustBadge1: 'Ed25519 Signature',
    trustBadge2: '9 AI Crawlers',
    trustBadge3: '300ms',
    trustBadge4: '0% Hallucination'
  }
}

const ggCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');
.gg-page { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
.gg-page h2, .gg-page h3, .gg-page h4 { font-family: 'Playfair Display', Georgia, serif; font-style: italic; }
.gg-page p, .gg-page span, .gg-page li, .gg-page a, .gg-page button { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
.gg-stack-track { position: relative; }
.gg-stack-card { position: sticky; top: 10vh; margin-bottom: 20vh; }
.gg-stack-card:last-child { margin-bottom: 0; }
.gg-stack-inner {
  background: #0A1628;
  border: 1px solid rgba(100,160,255,0.12);
  border-radius: 20px;
  transform-origin: top center;
  will-change: transform;
  transition: transform 0.1s ease-out;
  overflow: hidden;
}
.gg-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 100px;
  background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25);
  color: #60A5FA; font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px;
}
.gg-tagline {
  font-family: 'Playfair Display', Georgia, serif !important; font-style: italic !important;
  font-size: clamp(1.5rem, 2.5vw, 2.2rem); font-weight: 700; color: #F8F6F0;
  line-height: 1.25; margin-bottom: 16px;
}
.gg-tagline span { color: #C8A165; }
.gg-body { color: #8B9AB5; font-size: 15px; line-height: 1.7; }
.gg-terminal {
  background: #040E20; border-radius: 12px; border: 1px solid rgba(59,130,246,0.18);
  font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 20px; overflow: hidden;
}
.gg-terminal-hdr {
  display: flex; align-items: center; gap: 6px; margin-bottom: 14px;
  padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.gg-terminal-dot { width: 8px; height: 8px; border-radius: 50%; }
.gg-terminal-title { color: rgba(255,255,255,0.3); font-size: 11px; margin-left: 4px; }
.gg-lk { color: #60A5FA; } .gg-lv { color: #34D399; } .gg-lc { color: rgba(255,255,255,0.3); } .gg-lu { color: #F59E0B; }
.gg-crawler-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 10px; border-radius: 8px; margin-bottom: 5px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
}
.gg-crawler-name { color: #E2E8F0; font-size: 12px; font-weight: 500; }
.gg-crawler-engine { color: rgba(255,255,255,0.35); font-size: 10px; }
.gg-badge-on {
  padding: 2px 7px; border-radius: 100px;
  background: rgba(22,199,132,0.12); border: 1px solid rgba(22,199,132,0.25);
  color: #16C784; font-size: 9px; font-family: 'JetBrains Mono', monospace; white-space: nowrap;
}
.gg-jk { color: #93C5FD; } .gg-js { color: #86EFAC; } .gg-jn { color: #FCD34D; } .gg-jb { color: rgba(255,255,255,0.4); }
.gg-schema-row {
  display: flex; align-items: center; gap: 10px; padding: 7px 10px;
  border-radius: 8px; margin-bottom: 5px; background: rgba(255,255,255,0.03);
}
.gg-schema-type {
  font-size: 11px; padding: 2px 8px; border-radius: 100px;
  font-family: 'JetBrains Mono', monospace;
}
.gg-schema-ok { font-size: 10px; color: #16C784; font-family: 'JetBrains Mono', monospace; margin-left: auto; }
`

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    if (desc) desc.setAttribute('content', t.card1Body)
  }, [lang])

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.gg-stack-card')
      const total = cards.length
      cards.forEach((card, idx) => {
        const inner = card.querySelector('.gg-stack-inner')
        if (!inner) return
        const rect = card.getBoundingClientRect()
        const stickyTopPx = window.innerHeight * 0.10
        const distance = stickyTopPx - rect.top
        const threshold = window.innerHeight * 0.5
        const baseScale = 1 - (idx * 0.03)
        if (distance > 0 && idx < total - 1) {
          const progress = Math.min(distance / threshold, 1)
          inner.style.transform = `scale(${baseScale - progress * 0.05})`
        } else {
          inner.style.transform = `scale(${baseScale})`
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const t = { ...translations.en, ...(translations[lang] || {}) }

  return (
    <div className="gg-page bg-[#010A1F] text-white min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: ggCss }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#010A1F]/80 backdrop-blur-lg border-b border-[#1a2744]/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src="/images/caty-logo.png" alt="CatyAI" className="h-10" width="40" height="40" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.home}</Link>
              <a href="#layers" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.features}</a>
              <a href="#audit" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.howItWorks}</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.faq}</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector lang={lang} setLang={setLang} />
              <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white text-sm">{t.nav.login}</a>
              <a href="https://app.catyai.io/signup"
                 className="px-4 py-2 rounded-xl font-semibold text-sm text-[#010A1F] transition-all hover:opacity-90"
                 style={{ background: '#C8A165' }}>
                {t.nav.getStarted}
              </a>
            </div>
            <div className="flex md:hidden items-center gap-2">
              <LanguageSelector lang={lang} setLang={setLang} />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#1a2744]/50">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-300 hover:text-white text-sm">{t.nav.home}</Link>
                <a href="#layers" className="text-gray-300 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
                <a href="#audit" className="text-gray-300 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.howItWorks}</a>
                <a href="#faq" className="text-gray-300 hover:text-white text-sm" onClick={() => setMobileMenuOpen(false)}>{t.nav.faq}</a>
                <a href="https://app.catyai.io/signup"
                   className="px-4 py-2 rounded-xl font-semibold text-sm text-[#010A1F] text-center"
                   style={{ background: '#C8A165' }}>
                  {t.nav.getStarted}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <SEO
        title={lang === 'ro' ? 'GEO Gateway — Vizibilitate AI pentru Afacerea Ta | CatyAI' : 'GEO Gateway — AI Visibility for Your Business | CatyAI'}
        description={t.card1Body}
      />

      {/* Hero — clean image with top badge only */}
      <section style={{
        position:'relative', width:'100%',
        aspectRatio:'1380/752', minHeight:'420px', maxHeight:'80vh',
        display:'flex', alignItems:'flex-start', justifyContent:'center',
        overflow:'hidden', background:'#010A1F'
      }}>
        <img
          src="/images/geo-gateway-hero.png"
          alt="GEO Gateway AI Visibility Protocol"
          width={1380} height={752}
          loading="eager"
          fetchpriority="high"
          style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%',
            objectFit:'contain', objectPosition:'center'
          }}
        />
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'30%',
          background:'linear-gradient(to bottom, rgba(1,10,31,0.6) 0%, transparent 100%)',
          pointerEvents:'none'
        }} />
        <div style={{position:'relative', zIndex:2, padding:'24px 16px 0'}}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium tracking-widest uppercase"
               style={{background:'rgba(196,141,50,0.12)', borderColor:'rgba(196,141,50,0.35)', color:'#D4A84B'}}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{boxShadow:'0 0 6px #16C784'}} />
            {t.heroBadge}
          </div>
        </div>
      </section>

      {/* Hero Cards — 2 explanation cards + CTA + trust */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">

            <div className="rounded-2xl p-7"
                 style={{background:'rgba(196,141,50,0.04)', border:'1px solid rgba(196,141,50,0.2)'}}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 font-mono font-bold"
                   style={{background:'rgba(196,141,50,0.12)', color:'#C48D32'}}>
                {t.card1Icon}
              </div>
              <h3 className="text-2xl font-bold leading-tight mb-3"
                  style={{fontFamily:'Syne,sans-serif', color:'#F8F6F0'}}>
                {t.card1Title}{' '}
                <span style={{color:'#C48D32'}}>{t.card1TitleAccent}</span>{' '}
                {t.card1TitleEnd}
              </h3>
              <p className="text-sm leading-relaxed" style={{color:'#A0AABF'}}>
                {t.card1Body}
              </p>
            </div>

            <div className="rounded-2xl p-7"
                 style={{background:'rgba(196,141,50,0.04)', border:'1px solid rgba(196,141,50,0.2)'}}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 font-mono font-bold"
                   style={{background:'rgba(196,141,50,0.12)', color:'#C48D32'}}>
                {t.card2Icon}
              </div>
              <h3 className="text-2xl font-bold leading-tight mb-3"
                  style={{fontFamily:'Syne,sans-serif', color:'#F8F6F0'}}>
                {t.card2TitleStart}
                <span style={{color:'#C48D32'}}>{t.card2TitleAccent}</span>{' '}
                {t.card2TitleEnd}
              </h3>
              <p className="text-sm leading-relaxed" style={{color:'#A0AABF'}}>
                {t.card2Body}
              </p>
            </div>

          </div>

          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <a href="#audit"
               className="px-7 py-3.5 rounded-xl font-bold text-[#010A1F] transition-all hover:-translate-y-0.5"
               style={{background:'#C48D32', boxShadow:'0 4px 24px rgba(196,141,50,0.35)', fontSize:'15px'}}>
              {t.heroCta}
            </a>
            <a href="#layers"
               className="px-7 py-3.5 rounded-xl font-medium text-white transition-all"
               style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.18)', fontSize:'15px'}}>
              {t.heroCtaSecondary}
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap mt-6">
            {[t.trustBadge1, t.trustBadge2, t.trustBadge3, t.trustBadge4].map(badge => (
              <div key={badge} className="flex items-center gap-1.5 text-xs font-mono"
                   style={{color:'rgba(255,255,255,0.5)'}}>
                <span className="w-1.5 h-1.5 rounded-full" style={{background:'#16C784', boxShadow:'0 0 6px #16C784'}} />
                {badge}
              </div>
            ))}
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

      {/* 6-Layer Architecture — stacking cards */}
      <section className="px-4 bg-[#010A1F]" id="layers" style={{ paddingTop: '80px', paddingBottom: '20px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gg-tagline" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>{t.layersTitle}</h2>
            <p style={{ color: '#8B9AB5', fontSize: '17px', marginTop: '8px' }}>{t.layersSubtitle}</p>
          </div>

          <div className="gg-stack-track" style={{ paddingBottom: '30vh' }}>

            {/* Card 0 — llms.txt Index */}
            <div className="gg-stack-card" style={{ zIndex: 10 }}>
              <div className="gg-stack-inner" style={{ padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,40px)' }}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="gg-tag"><span>📄</span> Layer {t.layers[0].number}</div>
                    <h3 className="gg-tagline">{t.layers[0].title}</h3>
                    <p className="gg-body">{t.layers[0].desc}</p>
                  </div>
                  <div className="gg-terminal">
                    <div className="gg-terminal-hdr">
                      <div className="gg-terminal-dot" style={{ background: '#FF5F57' }} />
                      <div className="gg-terminal-dot" style={{ background: '#FEBC2E' }} />
                      <div className="gg-terminal-dot" style={{ background: '#28C840' }} />
                      <span className="gg-terminal-title">llms.txt — root index</span>
                    </div>
                    <div><span className="gg-lc"># llms.txt — AI Crawler Index</span></div>
                    <div style={{ marginTop: '8px' }}><span className="gg-lc">&gt; </span><span className="gg-lv">CatyAI: AI Sales Agent</span></div>
                    <div style={{ marginTop: '12px' }}><span className="gg-lk">## Products</span></div>
                    <div><span className="gg-lc">- </span><span className="gg-lv">CatyAI Widget: Embeddable AI sales agent</span></div>
                    <div><span className="gg-lc">- </span><span className="gg-lv">GEO Gateway: AI visibility protocol</span></div>
                    <div><span className="gg-lc">- </span><span className="gg-lv">FraudAI Shield: Fraud detection layer</span></div>
                    <div style={{ marginTop: '12px' }}><span className="gg-lk">## Contact</span></div>
                    <div><span className="gg-lu">Email: contact@catyai.io</span></div>
                    <div><span className="gg-lu">Hours: Mon–Fri 09:00–18:00</span></div>
                    <div style={{ marginTop: '12px' }}><span className="gg-lk">## Sources</span></div>
                    <div><span className="gg-lc">- </span><span className="gg-lu">/answer?q=pricing</span></div>
                    <div><span className="gg-lc">- </span><span className="gg-lu">/answer?q=products</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 1 — AI Crawler Detection */}
            <div className="gg-stack-card" style={{ zIndex: 11 }}>
              <div className="gg-stack-inner" style={{ padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,40px)', borderColor: 'rgba(168,85,247,0.15)' }}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="gg-terminal" style={{ borderColor: 'rgba(168,85,247,0.2)' }}>
                    <div className="gg-terminal-hdr">
                      <div className="gg-terminal-dot" style={{ background: '#FF5F57' }} />
                      <div className="gg-terminal-dot" style={{ background: '#FEBC2E' }} />
                      <div className="gg-terminal-dot" style={{ background: '#28C840' }} />
                      <span className="gg-terminal-title">crawler-detection.log</span>
                    </div>
                    {[
                      ['GPTBot', 'ChatGPT / OpenAI'],
                      ['GoogleBot AI', 'Gemini / Google AI'],
                      ['ClaudeBot', 'Claude / Anthropic'],
                      ['PerplexityBot', 'Perplexity AI'],
                      ['Applebot', 'Siri / Apple'],
                      ['YouBot', 'You.com AI'],
                      ['BingBot AI', 'Copilot / Microsoft'],
                      ['Cohere AI', 'Cohere Enterprise'],
                      ['Meta AI', 'Meta AI / Llama'],
                    ].map(([name, engine]) => (
                      <div key={name} className="gg-crawler-row">
                        <div>
                          <div className="gg-crawler-name">{name}</div>
                          <div className="gg-crawler-engine">{engine}</div>
                        </div>
                        <span className="gg-badge-on">ACTIVE</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="gg-tag" style={{ background: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.28)', color: '#C084FC' }}>
                      <span>🤖</span> Layer {t.layers[1].number}
                    </div>
                    <h3 className="gg-tagline">{t.layers[1].title}</h3>
                    <p className="gg-body">{t.layers[1].desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — /answer Portal */}
            <div className="gg-stack-card" style={{ zIndex: 12 }}>
              <div className="gg-stack-inner" style={{ padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,40px)', borderColor: 'rgba(200,161,101,0.18)' }}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="gg-tag" style={{ background: 'rgba(200,161,101,0.12)', borderColor: 'rgba(200,161,101,0.28)', color: '#C8A165' }}>
                      <span>💬</span> Layer {t.layers[2].number}
                    </div>
                    <h3 className="gg-tagline">{t.layers[2].title}</h3>
                    <p className="gg-body">{t.layers[2].desc}</p>
                  </div>
                  <div className="gg-terminal" style={{ borderColor: 'rgba(200,161,101,0.2)' }}>
                    <div className="gg-terminal-hdr">
                      <div className="gg-terminal-dot" style={{ background: '#FF5F57' }} />
                      <div className="gg-terminal-dot" style={{ background: '#FEBC2E' }} />
                      <div className="gg-terminal-dot" style={{ background: '#28C840' }} />
                      <span className="gg-terminal-title">GET /answer?q=business_hours</span>
                    </div>
                    <div><span className="gg-lu">GET /answer?q=business_hours</span></div>
                    <div style={{ marginTop: '8px' }}><span className="gg-jb">{'→ {'}</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"@context"</span><span className="gg-jb">: </span><span className="gg-js">"https://schema.org"</span><span className="gg-jb">,</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"@type"</span><span className="gg-jb">: </span><span className="gg-js">"LocalBusiness"</span><span className="gg-jb">,</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"name"</span><span className="gg-jb">: </span><span className="gg-js">"Your Business"</span><span className="gg-jb">,</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"openingHours"</span><span className="gg-jb">: [</span><span className="gg-js">"Mo-Fr 09:00-18:00"</span><span className="gg-jb">],</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"priceRange"</span><span className="gg-jb">: </span><span className="gg-js">"€€"</span><span className="gg-jb">,</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"description"</span><span className="gg-jb">: </span><span className="gg-js">"..."</span><span className="gg-jb">,</span></div>
                    <div style={{ paddingLeft: '16px' }}><span className="gg-jk">"hasOfferCatalog"</span><span className="gg-jb">: [...]</span></div>
                    <div><span className="gg-jb">{'}'}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Dynamic Schema.org */}
            <div className="gg-stack-card" style={{ zIndex: 13 }}>
              <div className="gg-stack-inner" style={{ padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,40px)', borderColor: 'rgba(34,197,94,0.15)' }}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="gg-terminal" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
                    <div className="gg-terminal-hdr">
                      <div className="gg-terminal-dot" style={{ background: '#FF5F57' }} />
                      <div className="gg-terminal-dot" style={{ background: '#FEBC2E' }} />
                      <div className="gg-terminal-dot" style={{ background: '#28C840' }} />
                      <span className="gg-terminal-title">schema-injection.log</span>
                    </div>
                    <div style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>Schema.org Dynamic Injection — All Pages</div>
                    {[
                      ['LocalBusiness', 'rgba(59,130,246,0.15)', '#60A5FA'],
                      ['FAQPage', 'rgba(168,85,247,0.15)', '#C084FC'],
                      ['Product', 'rgba(200,161,101,0.15)', '#C8A165'],
                      ['Service', 'rgba(34,197,94,0.15)', '#4ADE80'],
                      ['Review', 'rgba(249,115,22,0.15)', '#FB923C'],
                      ['BreadcrumbList', 'rgba(100,116,139,0.15)', '#94A3B8'],
                    ].map(([schema, bg, color]) => (
                      <div key={schema} className="gg-schema-row">
                        <span className="gg-schema-type" style={{ background: bg, color, border: `1px solid ${color}40` }}>{schema}</span>
                        <span className="gg-schema-ok">INJECTED ✓</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="gg-tag" style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.28)', color: '#4ADE80' }}>
                      <span>🏗️</span> Layer {t.layers[3].number}
                    </div>
                    <h3 className="gg-tagline">{t.layers[3].title}</h3>
                    <p className="gg-body">{t.layers[3].desc}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Layers 05–06 mini grid */}
          <div className="grid md:grid-cols-2 gap-5" style={{ marginTop: '60px', marginBottom: '60px' }}>
            {t.layers.slice(4).map((layer, i) => {
              const c = colorMap[layer.color]
              return (
                <div key={i} className="p-6 rounded-2xl" style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold font-mono opacity-50 ${c.text}`}>{layer.number}</span>
                    <span className="text-xl">{layer.icon}</span>
                    <h3 className={`font-semibold text-base ${c.text}`} style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'normal' }}>{layer.title}</h3>
                  </div>
                  <p style={{ color: '#8B9AB5', fontSize: '14px', lineHeight: '1.65' }}>{layer.desc}</p>
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

      {/* GEO Audit Tool */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]" id="audit">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase mb-4"
                  style={{ background: 'rgba(196,141,50,0.08)', border: '1px solid rgba(196,141,50,0.25)', color: '#D4A84B' }}>
              GEO Visibility Audit
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ fontFamily: 'Syne,sans-serif', color: '#F8F6F0' }}>
              Testează-ți scorul GEO
            </h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">
              Gratuit · Fără cont · 5 audit-uri / zi
            </p>
          </div>
          <GeoAuditWidget />
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center mt-20">
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

      <FooterV9 lang={lang} />
    </div>
  )
}
