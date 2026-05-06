import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import SEO from '../components/SEO'
import GeoAuditWidget from '../components/GeoAuditWidget'

const T = {
  en: {
    badge: 'Generative Engine Optimization',
    heroTitle: 'GEO Gateway.',
    heroTitle2: 'The AI-to-AI Conduit.',
    heroSub: 'A complete 6-layer system for AI-to-AI communication',
    heroBody: 'ChatGPT, Gemini, Perplexity, and Claude are answering your customers\' questions right now — without mentioning you. GEO Gateway changes that.',
    heroCta: 'Get GEO Ready',
    heroCtaAlt: 'How It Works',
    metrics: ['9 AI Crawlers', 'Ed25519 Signature', '300ms Response', '0% Hallucination'],
    layersTitle: 'GEO Gateway Layers',
    layersSubtitle: 'A complete 6-layer system for AI-to-AI communication',
    layers: [
      { n:'01', icon:'📄', title:'llms.txt Index', tag:'Foundation Layer', tagline:'Your AI truth document.', body:'A machine-readable index at your domain root. GPTBot, Googlebot AI, and ClaudeBot read this first to understand your business — before processing any other page.', pill:'RFC 9309 · llms.txt v1.2 · JWKS Anchor' },
      { n:'02', icon:'🤖', title:'AI Crawler Detection', tag:'Intelligence Layer', tagline:'Know who is reading you.', body:'Identifies 9 known AI crawlers by user-agent: GPTBot, GoogleBot AI, ClaudeBot, PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI, and Meta AI. Each gets a tailored response.', pill:'9 Crawlers · User-Agent Matrix · Adaptive Response' },
      { n:'03', icon:'💬', title:'/answer Portal', tag:'Communication Layer', tagline:'AI reads AI.', body:'An AI-to-AI API endpoint — one of the first in the industry. When an AI engine queries your business, /answer responds with JSON-LD: hours, pricing, services, FAQs, and contacts.', pill:'JSON-LD · Schema.org · M2M Protocol' },
      { n:'04', icon:'🏗️', title:'Dynamic Schema.org Injection', tag:'Structure Layer', tagline:'Semantic context, automatically.', body:'Generates and injects Schema.org structured data into every page: LocalBusiness, FAQPage, Product, Service, and Review schemas. AI engines get the context they need to represent you accurately.', pill:'LocalBusiness · FAQPage · Product · Service · Review' },
      { n:'05', icon:'📡', title:'AI Visibility Monitor', tag:'Observability Layer', tagline:'See who crawls you.', body:'Tracks when AI crawlers visit your domain and what they index. Lightweight JS beacons fire on crawler visits, feeding data to your dashboard. See which AI engines have crawled your site.', pill:'Real-Time Beacons · Dashboard · Crawler Logs' },
      { n:'06', icon:'🛡️', title:'SENTINEL + FraudAI Shield', tag:'Defense Layer', tagline:'Predictive protection.', body:'SENTINEL monitors AI citation patterns and predicts visibility gaps before they affect recommendations. FraudAI Shield prevents content injection attacks that could compromise what AI models learn about you.', pill:'EU AI Act · Art. 9 · JWKS Revocation · Sentinel v3' },
    ],
    crawlersTitle: '9 AI Crawlers Supported',
    crawlersSubtitle: 'GEO Gateway speaks the language of every major AI engine',
    answerTitle: 'The /answer Portal',
    answerSub: 'First AI-to-AI communication layer for business visibility',
    answerBody: 'When ChatGPT or Gemini queries your business, they don\'t get a webpage — they get structured JSON-LD built for AI consumption. Hours, pricing, services, FAQs — all in a format AI can cite with confidence.',
    tableTitle: 'GEO vs. Traditional SEO',
    tableRows: [
      { f:'Target audience', seo:'Google bots', geo:'AI language models' },
      { f:'Content format', seo:'Keywords in text', geo:'Structured JSON-LD + llms.txt' },
      { f:'Discovery method', seo:'Link ranking', geo:'Semantic relevance + citation' },
      { f:'AI crawler support', seo:'None', geo:'9 crawlers' },
      { f:'Real-time monitoring', seo:'Not available', geo:'Beacon + dashboard' },
      { f:'Schema injection', seo:'Manual', geo:'Dynamic + automatic' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q:'What exactly is GEO?', a:'GEO stands for Generative Engine Optimization — making your business content readable, citable, and recommendable by AI models like ChatGPT, Gemini, and Perplexity. It is not geographic targeting or IP-based routing.' },
      { q:'Do I need GEO if I already do SEO?', a:'Yes. SEO optimizes for search rankings. GEO optimizes for AI engine citations. As AI answer engines replace traditional search, not being GEO-optimized means being invisible in the answers AI provides to your customers.' },
      { q:'How does the /answer portal work?', a:'GEO Gateway adds a /answer endpoint to your domain. When an AI crawler queries it, the endpoint returns structured JSON-LD data — hours, services, pricing, FAQs — optimized for AI ingestion.' },
      { q:'Which AI engines does GEO Gateway support?', a:'Currently 9: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI, and Meta AI. New crawlers are added as they emerge.' },
      { q:'Is GEO Gateway included in my CatyAI plan?', a:'GEO Gateway is available across all paid CatyAI plans. The llms.txt index, /answer portal, and AI crawler detection are included. Advanced monitoring and SENTINEL predictive features require Growth and above.' },
    ],
    auditTitle: 'Test Your GEO Score',
    auditSub: 'Free · No account · 5 audits/day',
    finalCta: 'Start Getting Cited by AI',
    finalBody: 'Every day without GEO is a day your competitors get recommended by ChatGPT instead of you.',
    finalBtn: 'Get GEO Ready',
    pricingBtn: 'See Pricing',
  },
  ro: {
    badge: 'Optimizare pentru Motoare Generative',
    heroTitle: 'GEO Gateway.',
    heroTitle2: 'Conductul AI-la-AI.',
    heroSub: 'Un sistem complet cu 6 straturi pentru comunicarea AI-la-AI',
    heroBody: 'ChatGPT, Gemini, Perplexity și Claude răspund acum la întrebările clienților tăi — fără să te menționeze. GEO Gateway schimbă asta.',
    heroCta: 'Devino GEO Ready',
    heroCtaAlt: 'Cum Funcționează',
    metrics: ['9 Crawlere AI', 'Semnătură Ed25519', 'Răspuns 300ms', '0% Halucinare'],
    layersTitle: 'Straturile GEO Gateway',
    layersSubtitle: 'Un sistem complet cu 6 straturi pentru comunicarea AI-la-AI',
    layers: [
      { n:'01', icon:'📄', title:'Index llms.txt', tag:'Stratul Fundament', tagline:'Documentul tău de adevăr AI.', body:'Un fișier index citibil de mașini la rădăcina domeniului. GPTBot, Googlebot AI și ClaudeBot citesc mai întâi acest fișier pentru a înțelege afacerea ta — înainte de orice altă pagină.', pill:'RFC 9309 · llms.txt v1.2 · Ancoră JWKS' },
      { n:'02', icon:'🤖', title:'Detectare Crawlere AI', tag:'Stratul Inteligență', tagline:'Știi cine te citește.', body:'Identifică 9 crawlere AI cunoscute după user-agent: GPTBot, GoogleBot AI, ClaudeBot, PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI și Meta AI. Fiecare primește un răspuns adaptat.', pill:'9 Crawlere · Matrice User-Agent · Răspuns Adaptiv' },
      { n:'03', icon:'💬', title:'Portal /answer', tag:'Stratul Comunicare', tagline:'AI citește AI.', body:'Un endpoint API AI-la-AI — unul dintre primele din industrie. Când un motor AI interoghează afacerea ta, /answer răspunde cu JSON-LD: ore, prețuri, servicii, FAQ-uri și contacte.', pill:'JSON-LD · Schema.org · Protocol M2M' },
      { n:'04', icon:'🏗️', title:'Injectare Dinamică Schema.org', tag:'Stratul Structură', tagline:'Context semantic, automat.', body:'Generează și injectează automat date structurate Schema.org în fiecare pagină: scheme LocalBusiness, FAQPage, Product, Service și Review. Motoarele AI obțin contextul pentru a te reprezenta corect.', pill:'LocalBusiness · FAQPage · Product · Service · Review' },
      { n:'05', icon:'📡', title:'Monitor Vizibilitate AI', tag:'Stratul Observabilitate', tagline:'Vezi cine te crawlează.', body:'Urmărește când crawlerele AI vizitează domeniul tău și ce indexează. Beaconuri JS ușoare se declanșează la vizite, alimentând date în dashboard. Vezi ce motoare AI ți-au crawlat site-ul.', pill:'Beacoane Real-Time · Dashboard · Jurnale Crawler' },
      { n:'06', icon:'🛡️', title:'SENTINEL + FraudAI Shield', tag:'Stratul Apărare', tagline:'Protecție predictivă.', body:'SENTINEL monitorizează tiparele de citare AI și prezice lacunele de vizibilitate înainte să afecteze recomandările. FraudAI Shield previne atacurile de injectare care ar putea compromite ce înțeleg modelele AI despre tine.', pill:'EU AI Act · Art. 9 · Revocare JWKS · Sentinel v3' },
    ],
    crawlersTitle: '9 Crawlere AI Suportate',
    crawlersSubtitle: 'GEO Gateway vorbește limbajul fiecărui motor AI major',
    answerTitle: 'Portalul /answer',
    answerSub: 'Primul strat de comunicare AI-la-AI pentru vizibilitatea afacerilor',
    answerBody: 'Când ChatGPT sau Gemini interoghează afacerea ta, nu primesc o pagină web — primesc un JSON-LD structurat construit pentru consum AI. Ore, prețuri, servicii, FAQ-uri — totul în format pe care AI îl poate cita cu încredere.',
    tableTitle: 'GEO vs. SEO Tradițional',
    tableRows: [
      { f:'Audiența țintă', seo:'Boții Google', geo:'Modele de limbaj AI' },
      { f:'Format conținut', seo:'Cuvinte cheie în text', geo:'JSON-LD structurat + llms.txt' },
      { f:'Metodă descoperire', seo:'Ranking linkuri', geo:'Relevanță semantică + citare' },
      { f:'Suport crawlere AI', seo:'Niciunul', geo:'9 crawlere' },
      { f:'Monitorizare timp real', seo:'Indisponibil', geo:'Beacon + dashboard' },
      { f:'Injectare schemă', seo:'Manuală', geo:'Dinamică + automată' },
    ],
    faqTitle: 'Întrebări Frecvente',
    faqs: [
      { q:'Ce este exact GEO?', a:'GEO înseamnă Generative Engine Optimization — practica de a face conținutul afacerii tale lizibil, citabil și recomandabil de modelele AI ca ChatGPT, Gemini și Perplexity. Nu este targetare geografică sau rutare IP.' },
      { q:'Am nevoie de GEO dacă deja fac SEO?', a:'Da. SEO optimizează pentru ranking în motoarele de căutare. GEO optimizează pentru citările motoarelor AI. Pe măsură ce AI înlocuiește căutarea tradițională, fără GEO ești invizibil în răspunsurile AI.' },
      { q:'Cum funcționează portalul /answer?', a:'GEO Gateway adaugă un endpoint /answer domeniului tău. Când un crawler AI îl interoghează, returnează date JSON-LD structurate — ore, servicii, prețuri, FAQ-uri — optimizate pentru ingestia AI.' },
      { q:'Ce motoare AI suportă GEO Gateway?', a:'Momentan 9: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI și Meta AI. Crawlere noi sunt adăugate pe măsură ce apar.' },
      { q:'GEO Gateway este inclus în planul meu CatyAI?', a:'GEO Gateway este disponibil în toate planurile plătite CatyAI. Indexul llms.txt, portalul /answer și detectarea crawlerelor sunt incluse. Monitorizarea avansată și SENTINEL sunt disponibile din planul Growth.' },
    ],
    auditTitle: 'Testează-ți scorul GEO',
    auditSub: 'Gratuit · Fără cont · 5 audit-uri / zi',
    finalCta: 'Începe să Fii Citat de AI',
    finalBody: 'Fiecare zi fără GEO este o zi în care concurenții tăi sunt recomandați de ChatGPT în loc de tine.',
    finalBtn: 'Devino GEO Ready',
    pricingBtn: 'Vezi Prețuri',
  },
  fr: {
    badge: 'Optimisation pour Moteurs Génératifs',
    heroTitle: 'GEO Gateway.',
    heroTitle2: 'Le Conduit IA-à-IA.',
    heroSub: 'Un système complet à 6 couches pour la communication IA-à-IA',
    heroBody: "ChatGPT, Gemini, Perplexity et Claude répondent aux questions de vos clients en ce moment — sans vous mentionner. GEO Gateway change cela.",
    heroCta: 'Devenez GEO Ready',
    heroCtaAlt: 'Comment ça marche',
    metrics: ['9 Crawlers IA', 'Signature Ed25519', 'Réponse 300ms', '0% Hallucination'],
    layersTitle: 'Couches GEO Gateway',
    layersSubtitle: 'Un système complet à 6 couches pour la communication IA-à-IA',
    layers: [
      { n:'01', icon:'📄', title:'Index llms.txt', tag:'Couche Fondation', tagline:'Votre document de vérité IA.', body:"Un fichier index lisible par machine à la racine de votre domaine. GPTBot, Googlebot AI et ClaudeBot lisent ce fichier en premier pour comprendre votre activité avant toute autre page.", pill:'RFC 9309 · llms.txt v1.2 · Ancre JWKS' },
      { n:'02', icon:'🤖', title:'Détection Crawlers IA', tag:'Couche Intelligence', tagline:'Sachez qui vous lit.', body:"Identifie 9 crawlers IA connus par user-agent : GPTBot, GoogleBot AI, ClaudeBot, PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI et Meta AI. Chacun reçoit une réponse adaptée.", pill:'9 Crawlers · Matrice User-Agent · Réponse Adaptative' },
      { n:'03', icon:'💬', title:'Portail /answer', tag:'Couche Communication', tagline:"L'IA lit l'IA.", body:"Un endpoint API IA-à-IA — l'un des premiers du secteur. Quand un moteur IA interroge votre entreprise, /answer répond avec du JSON-LD : horaires, tarifs, services, FAQ et contacts.", pill:'JSON-LD · Schema.org · Protocole M2M' },
      { n:'04', icon:'🏗️', title:'Injection Schema.org Dynamique', tag:'Couche Structure', tagline:'Contexte sémantique, automatiquement.', body:"Génère et injecte des données structurées Schema.org dans chaque page : LocalBusiness, FAQPage, Product, Service et Review. Les moteurs IA obtiennent le contexte pour vous représenter avec précision.", pill:'LocalBusiness · FAQPage · Product · Service · Review' },
      { n:'05', icon:'📡', title:'Moniteur Visibilité IA', tag:'Couche Observabilité', tagline:'Voyez qui vous crawle.', body:"Suit quand les crawlers IA visitent votre domaine et ce qu'ils indexent. Des balises JS légères se déclenchent lors des visites, alimentant votre tableau de bord. Voyez quels moteurs IA ont crawlé votre site.", pill:'Balises Temps Réel · Dashboard · Journaux Crawler' },
      { n:'06', icon:'🛡️', title:'SENTINEL + FraudAI Shield', tag:'Couche Défense', tagline:'Protection prédictive.', body:"SENTINEL surveille les modèles de citation IA et prédit les lacunes avant qu'elles affectent les recommandations. FraudAI Shield prévient les attaques d'injection qui pourraient compromettre ce que les modèles IA apprennent sur vous.", pill:"EU AI Act · Art. 9 · Révocation JWKS · Sentinel v3" },
    ],
    crawlersTitle: '9 Crawlers IA Supportés',
    crawlersSubtitle: 'GEO Gateway parle le langage de chaque moteur IA majeur',
    answerTitle: 'Le Portail /answer',
    answerSub: 'Première couche de communication IA-à-IA pour la visibilité des entreprises',
    answerBody: "Quand ChatGPT ou Gemini interroge votre entreprise, ils ne reçoivent pas une page web — ils reçoivent du JSON-LD structuré conçu pour la consommation IA. Horaires, tarifs, services, FAQ — dans un format que l'IA peut citer avec confiance.",
    tableTitle: 'GEO vs. SEO Traditionnel',
    tableRows: [
      { f:'Audience cible', seo:'Bots Google', geo:'Modèles de langage IA' },
      { f:'Format contenu', seo:'Mots-clés en texte', geo:'JSON-LD structuré + llms.txt' },
      { f:'Méthode découverte', seo:'Classement liens', geo:'Pertinence sémantique + citation' },
      { f:'Support crawlers IA', seo:'Aucun', geo:'9 crawlers' },
      { f:'Monitoring temps réel', seo:'Non disponible', geo:'Balise + tableau de bord' },
      { f:'Injection schéma', seo:'Manuelle', geo:'Dynamique + automatique' },
    ],
    faqTitle: 'Questions Fréquentes',
    faqs: [
      { q:"Qu'est-ce que le GEO exactement ?", a:"GEO signifie Generative Engine Optimization — la pratique de rendre votre contenu lisible, citable et recommandable par les modèles IA comme ChatGPT, Gemini et Perplexity. Ce n'est pas du ciblage géographique." },
      { q:"Ai-je besoin du GEO si je fais déjà du SEO ?", a:"Oui. Le SEO optimise pour le classement dans les moteurs de recherche. Le GEO optimise pour les citations des moteurs IA. Sans GEO, vous êtes invisible dans les réponses IA à vos clients potentiels." },
      { q:"Comment fonctionne le portail /answer ?", a:"GEO Gateway ajoute un endpoint /answer à votre domaine. Quand un crawler IA l'interroge, il retourne des données JSON-LD structurées — horaires, services, tarifs, FAQ — optimisées pour l'ingestion IA." },
      { q:"Quels moteurs IA GEO Gateway supporte-t-il ?", a:"Actuellement 9 : GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI et Meta AI. De nouveaux crawlers sont ajoutés au fil des émergences." },
      { q:"GEO Gateway est-il inclus dans mon plan CatyAI ?", a:"GEO Gateway est disponible dans tous les plans CatyAI payants. L'index llms.txt, le portail /answer et la détection des crawlers sont inclus. Le monitoring avancé et SENTINEL nécessitent le plan Growth ou supérieur." },
    ],
    auditTitle: 'Testez votre score GEO',
    auditSub: 'Gratuit · Sans compte · 5 audits/jour',
    finalCta: "Commencez à être cité par l'IA",
    finalBody: "Chaque jour sans GEO est un jour où vos concurrents sont recommandés par ChatGPT à votre place.",
    finalBtn: 'Devenez GEO Ready',
    pricingBtn: 'Voir les Tarifs',
  },
  de: {
    badge: 'Optimierung für Generative Engines',
    heroTitle: 'GEO Gateway.',
    heroTitle2: 'Der KI-zu-KI-Kanal.',
    heroSub: 'Ein vollständiges 6-Schichten-System für KI-zu-KI-Kommunikation',
    heroBody: 'ChatGPT, Gemini, Perplexity und Claude beantworten gerade die Fragen Ihrer Kunden — ohne Sie zu erwähnen. GEO Gateway ändert das.',
    heroCta: 'GEO Ready werden',
    heroCtaAlt: 'Wie es funktioniert',
    metrics: ['9 KI-Crawler', 'Ed25519-Signatur', '300ms Antwort', '0% Halluzination'],
    layersTitle: 'GEO Gateway Schichten',
    layersSubtitle: 'Ein vollständiges 6-Schichten-System für KI-zu-KI-Kommunikation',
    layers: [
      { n:'01', icon:'📄', title:'llms.txt Index', tag:'Fundament-Schicht', tagline:'Ihr KI-Wahrheitsdokument.', body:'Eine maschinenlesbare Indexdatei im Domain-Root. GPTBot, Googlebot AI und ClaudeBot lesen diese Datei zuerst, um Ihr Unternehmen zu verstehen — bevor sie eine andere Seite verarbeiten.', pill:'RFC 9309 · llms.txt v1.2 · JWKS-Anker' },
      { n:'02', icon:'🤖', title:'KI-Crawler-Erkennung', tag:'Intelligenz-Schicht', tagline:'Wissen, wer Sie liest.', body:'Identifiziert 9 bekannte KI-Crawler per User-Agent: GPTBot, GoogleBot AI, ClaudeBot, PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI und Meta AI. Jeder erhält eine maßgeschneiderte Antwort.', pill:'9 Crawler · User-Agent-Matrix · Adaptive Antwort' },
      { n:'03', icon:'💬', title:'/answer Portal', tag:'Kommunikations-Schicht', tagline:'KI liest KI.', body:'Ein KI-zu-KI-API-Endpunkt — einer der ersten der Branche. Wenn eine KI-Engine Ihr Unternehmen abfragt, antwortet /answer mit JSON-LD: Öffnungszeiten, Preise, Services, FAQs und Kontakte.', pill:'JSON-LD · Schema.org · M2M-Protokoll' },
      { n:'04', icon:'🏗️', title:'Dynamische Schema.org-Injektion', tag:'Struktur-Schicht', tagline:'Semantischer Kontext, automatisch.', body:'Generiert und injiziert Schema.org-Strukturdaten in jede Seite: LocalBusiness, FAQPage, Product, Service und Review. KI-Engines erhalten den Kontext, um Sie präzise darzustellen.', pill:'LocalBusiness · FAQPage · Product · Service · Review' },
      { n:'05', icon:'📡', title:'KI-Sichtbarkeitsmonitor', tag:'Observabilitäts-Schicht', tagline:'Sehen, wer Sie crawlt.', body:'Verfolgt, wann KI-Crawler Ihre Domain besuchen und was sie indexieren. Leichte JS-Beacons feuern bei Crawler-Besuchen und speisen Daten in Ihr Dashboard. Sehen Sie, welche KI-Engines Ihre Site gecrawlt haben.', pill:'Echtzeit-Beacons · Dashboard · Crawler-Logs' },
      { n:'06', icon:'🛡️', title:'SENTINEL + FraudAI Shield', tag:'Verteidigungs-Schicht', tagline:'Prädiktiver Schutz.', body:'SENTINEL überwacht KI-Zitationsmuster und sagt Sichtbarkeitslücken voraus, bevor sie Empfehlungen beeinflussen. FraudAI Shield verhindert Content-Injection-Angriffe, die beeinflussen könnten, was KI-Modelle über Sie lernen.', pill:'EU KI-Gesetz · Art. 9 · JWKS-Widerruf · Sentinel v3' },
    ],
    crawlersTitle: '9 KI-Crawler unterstützt',
    crawlersSubtitle: 'GEO Gateway spricht die Sprache jeder wichtigen KI-Engine',
    answerTitle: 'Das /answer Portal',
    answerSub: 'Erste KI-zu-KI-Kommunikationsschicht für Unternehmensvisibilität',
    answerBody: 'Wenn ChatGPT oder Gemini Ihr Unternehmen abfragt, erhalten sie keine Webseite — sondern strukturiertes JSON-LD, das für KI-Konsum gebaut ist. Öffnungszeiten, Preise, Services, FAQs — in einem Format, das KI mit Vertrauen zitieren kann.',
    tableTitle: 'GEO vs. Traditionelles SEO',
    tableRows: [
      { f:'Zielgruppe', seo:'Google-Bots', geo:'KI-Sprachmodelle' },
      { f:'Inhaltsformat', seo:'Keywords im Text', geo:'Strukturiertes JSON-LD + llms.txt' },
      { f:'Entdeckungsmethode', seo:'Link-Ranking', geo:'Semantische Relevanz + Zitation' },
      { f:'KI-Crawler-Unterstützung', seo:'Keine', geo:'9 Crawler' },
      { f:'Echtzeit-Monitoring', seo:'Nicht verfügbar', geo:'Beacon + Dashboard' },
      { f:'Schema-Injektion', seo:'Manuell', geo:'Dynamisch + automatisch' },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q:'Was genau ist GEO?', a:'GEO steht für Generative Engine Optimization — die Praxis, Ihre Unternehmensinhalte für KI-Modelle wie ChatGPT, Gemini und Perplexity lesbar, zitierbar und empfehlbar zu machen. Kein geografisches Targeting.' },
      { q:'Brauche ich GEO, wenn ich bereits SEO betreibe?', a:'Ja. SEO optimiert für Suchrankings. GEO optimiert für KI-Engine-Zitierungen. Da KI-Engines die traditionelle Suche ersetzen, bedeutet kein GEO: in KI-Antworten unsichtbar sein.' },
      { q:'Wie funktioniert das /answer Portal?', a:'GEO Gateway fügt Ihrer Domain einen /answer-Endpunkt hinzu. Wenn ein KI-Crawler ihn abfragt, gibt er strukturierte JSON-LD-Daten zurück — Öffnungszeiten, Services, Preise, FAQs — optimiert für KI-Ingestion.' },
      { q:'Welche KI-Engines unterstützt GEO Gateway?', a:'Derzeit 9: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI und Meta AI. Neue Crawler werden laufend hinzugefügt.' },
      { q:'Ist GEO Gateway in meinem CatyAI-Plan enthalten?', a:'GEO Gateway ist in allen bezahlten CatyAI-Plänen verfügbar. Der llms.txt-Index, das /answer-Portal und die Crawler-Erkennung sind enthalten. Erweitertes Monitoring und SENTINEL erfordern den Growth-Plan oder höher.' },
    ],
    auditTitle: 'Testen Sie Ihren GEO-Score',
    auditSub: 'Kostenlos · Kein Konto · 5 Audits/Tag',
    finalCta: 'Werden Sie von KI zitiert',
    finalBody: 'Jeder Tag ohne GEO ist ein Tag, an dem Ihre Konkurrenten von ChatGPT statt Ihnen empfohlen werden.',
    finalBtn: 'GEO Ready werden',
    pricingBtn: 'Preise ansehen',
  },
  es: {
    badge: 'Optimización para Motores Generativos',
    heroTitle: 'GEO Gateway.',
    heroTitle2: 'El Conducto IA-a-IA.',
    heroSub: 'Un sistema completo de 6 capas para la comunicación IA-a-IA',
    heroBody: 'ChatGPT, Gemini, Perplexity y Claude están respondiendo las preguntas de tus clientes ahora mismo — sin mencionarte. GEO Gateway cambia eso.',
    heroCta: 'Hazte GEO Ready',
    heroCtaAlt: 'Cómo funciona',
    metrics: ['9 Rastreadores IA', 'Firma Ed25519', 'Respuesta 300ms', '0% Alucinación'],
    layersTitle: 'Capas GEO Gateway',
    layersSubtitle: 'Un sistema completo de 6 capas para la comunicación IA-a-IA',
    layers: [
      { n:'01', icon:'📄', title:'Índice llms.txt', tag:'Capa Fundación', tagline:'Tu documento de verdad IA.', body:'Un archivo índice legible por máquinas en la raíz del dominio. GPTBot, Googlebot AI y ClaudeBot leen este archivo primero para entender tu negocio — antes de procesar cualquier otra página.', pill:'RFC 9309 · llms.txt v1.2 · Ancla JWKS' },
      { n:'02', icon:'🤖', title:'Detección de Rastreadores IA', tag:'Capa Inteligencia', tagline:'Sabe quién te lee.', body:'Identifica 9 rastreadores IA conocidos por user-agent: GPTBot, GoogleBot AI, ClaudeBot, PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI y Meta AI. Cada uno recibe una respuesta adaptada.', pill:'9 Rastreadores · Matriz User-Agent · Respuesta Adaptativa' },
      { n:'03', icon:'💬', title:'Portal /answer', tag:'Capa Comunicación', tagline:'La IA lee a la IA.', body:'Un endpoint API IA-a-IA — uno de los primeros de la industria. Cuando un motor IA consulta tu negocio, /answer responde con JSON-LD: horarios, precios, servicios, FAQs y contactos.', pill:'JSON-LD · Schema.org · Protocolo M2M' },
      { n:'04', icon:'🏗️', title:'Inyección Dinámica Schema.org', tag:'Capa Estructura', tagline:'Contexto semántico, automáticamente.', body:'Genera e inyecta datos estructurados Schema.org en cada página: LocalBusiness, FAQPage, Product, Service y Review. Los motores IA obtienen el contexto para representarte con precisión.', pill:'LocalBusiness · FAQPage · Product · Service · Review' },
      { n:'05', icon:'📡', title:'Monitor de Visibilidad IA', tag:'Capa Observabilidad', tagline:'Ve quién te rastrea.', body:'Rastrea cuándo los crawlers IA visitan tu dominio y qué indexan. Balizas JS ligeras se activan en visitas de crawlers, alimentando tu dashboard. Ve qué motores IA han rastreado tu sitio.', pill:'Balizas Tiempo Real · Dashboard · Registros Crawler' },
      { n:'06', icon:'🛡️', title:'SENTINEL + FraudAI Shield', tag:'Capa Defensa', tagline:'Protección predictiva.', body:'SENTINEL monitorea patrones de citas IA y predice brechas de visibilidad antes de que afecten recomendaciones. FraudAI Shield previene ataques de inyección de contenido que podrían comprometer lo que los modelos IA aprenden sobre ti.', pill:'EU AI Act · Art. 9 · Revocación JWKS · Sentinel v3' },
    ],
    crawlersTitle: '9 Rastreadores IA Soportados',
    crawlersSubtitle: 'GEO Gateway habla el idioma de cada motor IA principal',
    answerTitle: 'El Portal /answer',
    answerSub: 'Primera capa de comunicación IA-a-IA para visibilidad empresarial',
    answerBody: 'Cuando ChatGPT o Gemini consulta tu negocio, no reciben una página web — reciben JSON-LD estructurado construido para consumo IA. Horarios, precios, servicios, FAQs — en un formato que la IA puede citar con confianza.',
    tableTitle: 'GEO vs. SEO Tradicional',
    tableRows: [
      { f:'Audiencia objetivo', seo:'Bots de Google', geo:'Modelos de lenguaje IA' },
      { f:'Formato de contenido', seo:'Keywords en texto', geo:'JSON-LD estructurado + llms.txt' },
      { f:'Método de descubrimiento', seo:'Ranking de enlaces', geo:'Relevancia semántica + citación' },
      { f:'Soporte crawlers IA', seo:'Ninguno', geo:'9 rastreadores' },
      { f:'Monitoreo tiempo real', seo:'No disponible', geo:'Baliza + dashboard' },
      { f:'Inyección de esquema', seo:'Manual', geo:'Dinámica + automática' },
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { q:'¿Qué es exactamente GEO?', a:'GEO significa Generative Engine Optimization — la práctica de hacer tu contenido empresarial legible, citable y recomendable por modelos IA como ChatGPT, Gemini y Perplexity. No es segmentación geográfica.' },
      { q:'¿Necesito GEO si ya hago SEO?', a:'Sí. El SEO optimiza para rankings en buscadores. El GEO optimiza para citas en motores IA. A medida que la IA reemplaza la búsqueda tradicional, sin GEO eres invisible en las respuestas IA a tus clientes potenciales.' },
      { q:'¿Cómo funciona el portal /answer?', a:'GEO Gateway añade un endpoint /answer a tu dominio. Cuando un crawler IA lo consulta, devuelve datos JSON-LD estructurados — horarios, servicios, precios, FAQs — optimizados para ingesta IA.' },
      { q:'¿Qué motores IA soporta GEO Gateway?', a:'Actualmente 9: GPTBot (OpenAI), GoogleBot AI (Gemini), ClaudeBot (Anthropic), PerplexityBot, Applebot, YouBot, BingBot AI, Cohere AI y Meta AI. Se añaden nuevos rastreadores según emergen.' },
      { q:'¿GEO Gateway está incluido en mi plan CatyAI?', a:'GEO Gateway está disponible en todos los planes CatyAI de pago. El índice llms.txt, el portal /answer y la detección de crawlers están incluidos. El monitoring avanzado y SENTINEL requieren el plan Growth o superior.' },
    ],
    auditTitle: 'Prueba tu puntuación GEO',
    auditSub: 'Gratis · Sin cuenta · 5 auditorías/día',
    finalCta: 'Empieza a ser citado por IA',
    finalBody: 'Cada día sin GEO es un día en que tus competidores son recomendados por ChatGPT en lugar de ti.',
    finalBtn: 'Hazte GEO Ready',
    pricingBtn: 'Ver Precios',
  },
}

const CRAWLERS = [
  { name: 'GPTBot', engine: 'ChatGPT / OpenAI', icon: '🧠' },
  { name: 'GoogleBot AI', engine: 'Gemini / Google AI', icon: '🔵' },
  { name: 'ClaudeBot', engine: 'Claude / Anthropic', icon: '🤖' },
  { name: 'PerplexityBot', engine: 'Perplexity AI', icon: '🔮' },
  { name: 'Applebot', engine: 'Siri / Apple Intelligence', icon: '🍎' },
  { name: 'YouBot', engine: 'You.com AI Search', icon: '🔍' },
  { name: 'BingBot AI', engine: 'Copilot / Microsoft AI', icon: '🪟' },
  { name: 'Cohere AI', engine: 'Cohere Enterprise', icon: '📊' },
  { name: 'Meta AI', engine: 'Meta AI / Llama', icon: '📘' },
]

export default function GeoGateway() {
  const [lang, setLang] = useState(() => localStorage.getItem('caty-lang') || 'en')
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored && T[stored]) setLang(stored)
    const id = setInterval(() => {
      const l = localStorage.getItem('caty-lang')
      if (l && T[l] && l !== lang) setLang(l)
    }, 500)
    return () => clearInterval(id)
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <div style={{ background: '#010A1F', color: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        :root { --gold: #C8A165; --gold-dim: rgba(200,161,101,0.08); --gold-mid: rgba(166,130,70,0.18); --navy: #010A1F; }

        .geo-hero-orb {
          position: absolute; inset: 0; overflow: hidden;
        }
        .geo-hero-orb::before {
          content: '';
          position: absolute; top: -20%; left: 50%; transform: translateX(-50%);
          width: 900px; height: 900px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,161,101,0.12) 0%, rgba(200,161,101,0.04) 40%, transparent 70%);
          animation: geo-pulse 6s ease-in-out infinite;
        }
        .geo-hero-orb::after {
          content: '';
          position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%);
          animation: geo-pulse 8s ease-in-out infinite reverse;
        }
        @keyframes geo-pulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }
        .geo-grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(200,161,101,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,161,101,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%);
        }

        .geo-card {
          position: relative;
          background: linear-gradient(145deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        .geo-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.35), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .geo-card::after {
          content: '';
          position: absolute; inset: -2px;
          border-radius: 22px;
          background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.18) 0%, rgba(166,130,70,0.06) 40%, transparent 70%);
          filter: blur(24px);
          opacity: 0.4;
          z-index: -1;
          pointer-events: none;
          transition: opacity 0.35s ease, filter 0.35s ease;
        }
        .geo-card:hover {
          border-color: rgba(200,161,101,0.35);
          transform: translateY(-3px);
          box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7), 0 0 40px -10px rgba(200,161,101,0.12);
        }
        .geo-card:hover::before { opacity: 1; }
        .geo-card:hover::after { opacity: 1; filter: blur(36px); }

        .geo-card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(200,161,101,0.5);
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .geo-card-icon { font-size: 2rem; margin-bottom: 0.75rem; display: block; }
        .geo-card-tag {
          display: inline-flex; align-items: center;
          padding: 0.25rem 0.7rem; border-radius: 999px;
          background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; color: #C8A165; letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .geo-card-title {
          font-size: 1.15rem; font-weight: 700;
          color: #f8fafc; margin-bottom: 0.5rem;
          font-family: 'Syne', sans-serif;
        }
        .geo-card-tagline {
          font-size: 0.95rem; font-weight: 500;
          color: #C8A165; margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .geo-card-body {
          font-size: 0.875rem; color: #94a3b8;
          line-height: 1.65; margin-bottom: 1rem;
        }
        .geo-card-pill {
          display: inline-flex; align-items: center;
          padding: 0.4rem 0.75rem; border-radius: 8px;
          background: rgba(200,161,101,0.05); border: 1px solid rgba(200,161,101,0.15);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; color: #D4B57A; line-height: 1.5;
        }

        .geo-crawler-card {
          position: relative;
          background: rgba(10,27,61,0.4);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 1.25rem 1rem;
          text-align: center;
          transition: border-color 0.25s, transform 0.25s;
        }
        .geo-crawler-card:hover {
          border-color: rgba(200,161,101,0.3);
          transform: translateY(-2px);
        }

        .geo-faq-item {
          background: rgba(10,27,61,0.35);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s;
          cursor: pointer;
        }
        .geo-faq-item:hover { border-color: rgba(200,161,101,0.25); }
        .geo-faq-item.open { border-color: rgba(200,161,101,0.3); }
        .geo-faq-q {
          padding: 1.2rem 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
          font-weight: 600; font-size: 0.95rem; color: #f8fafc;
          user-select: none;
        }
        .geo-faq-a {
          padding: 0 1.5rem 1.2rem;
          font-size: 0.875rem; color: #94a3b8; line-height: 1.65;
        }
        .geo-faq-chevron {
          width: 16px; height: 16px; flex-shrink: 0; margin-left: 1rem;
          transition: transform 0.25s;
          stroke: #64748b; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
        }
        .geo-faq-item.open .geo-faq-chevron { transform: rotate(180deg); stroke: #C8A165; }

        .geo-table-row:nth-child(even) { background: rgba(10,27,61,0.2); }

        .geo-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem; border-radius: 999px;
          background: rgba(200,161,101,0.1); border: 1px solid rgba(200,161,101,0.3);
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #C8A165;
        }

        /* ── Conduit Hero Layout ── */
        .geo-hero-inner {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 4rem;
          max-width: 1180px; width: 100%; margin: 0 auto;
        }
        .geo-hero-text { flex: 1; min-width: 0; }
        .geo-conduit-outer { flex: 0 0 340px; }

        /* ── Conduit Wrap ── */
        .geo-conduit-wrap {
          position: relative; width: 340px; height: 600px; margin: 0 auto;
        }

        /* Stream pipe */
        .geo-stream-pipe {
          position: absolute; left: 50%; transform: translateX(-1.5px);
          width: 3px; top: 116px; bottom: 92px; border-radius: 2px;
          background: linear-gradient(
            0deg,
            rgba(100,110,135,0.25) 0%,
            rgba(140,150,168,0.55) 22%,
            rgba(180,150,100,0.75) 52%,
            rgba(200,161,101,0.95) 78%,
            rgba(225,190,130,1.0) 100%
          );
        }

        .geo-stream-particle {
          position: absolute; left: -1px; width: 5px;
          background: rgba(200,161,101,0.92);
          box-shadow: 0 0 8px rgba(200,161,101,0.65);
          border-radius: 3px;
          animation: geo-particle-rise linear infinite;
        }
        @keyframes geo-particle-rise {
          0%   { bottom: 0;   height: 4px;  opacity: 0; }
          6%   { opacity: 1; }
          94%  { opacity: 0.85; }
          100% { bottom: 100%; height: 10px; opacity: 0; }
        }

        /* Glass slabs */
        .geo-slab {
          position: absolute; left: 50%; transform: translateX(-50%);
          height: 46px; border-radius: 8px;
          display: flex; align-items: center; padding: 0 14px;
          overflow: hidden;
        }
        .geo-slab::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 55%);
          border-radius: 8px; pointer-events: none;
        }
        .geo-slab-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
          letter-spacing: 0.07em; white-space: nowrap; z-index: 1; flex: 1;
          padding-left: 28px; /* offset from center pipe */
        }
        .geo-slab-bars {
          display: flex; gap: 3px; align-items: center; z-index: 1;
        }
        .geo-slab-bar {
          height: 2px; border-radius: 1px;
          animation: geo-bar-pulse ease-in-out infinite;
        }
        @keyframes geo-bar-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.95; }
        }

        /* Slab 1 — L01 Foundation — grey chaos */
        .geo-slab-1 {
          bottom: 92px; width: 320px;
          background: rgba(8,18,45,0.90);
          border: 1px solid rgba(200,161,101,0.12);
          box-shadow: 0 6px 20px rgba(0,0,0,0.55);
        }
        .geo-slab-1 .geo-slab-label { color: rgba(100,115,145,0.65); }
        .geo-slab-1 .geo-slab-bar:nth-child(1) { width: 22px; background: rgba(100,112,138,0.55); animation-duration: 1.9s; }
        .geo-slab-1 .geo-slab-bar:nth-child(2) { width: 14px; background: rgba(100,112,138,0.45); animation-duration: 2.3s; animation-delay: 0.4s; }
        .geo-slab-1 .geo-slab-bar:nth-child(3) { width: 30px; background: rgba(100,112,138,0.50); animation-duration: 1.6s; animation-delay: 0.7s; }

        /* Slab 2 — L02 */
        .geo-slab-2 {
          bottom: 158px; width: 300px;
          background: rgba(9,20,50,0.87);
          border: 1px solid rgba(200,161,101,0.18);
          box-shadow: 0 6px 20px rgba(0,0,0,0.50);
        }
        .geo-slab-2 .geo-slab-label { color: rgba(135,138,155,0.72); }
        .geo-slab-2 .geo-slab-bar:nth-child(1) { width: 28px; background: rgba(148,138,110,0.58); animation-duration: 2.0s; }
        .geo-slab-2 .geo-slab-bar:nth-child(2) { width: 20px; background: rgba(148,138,110,0.48); animation-duration: 2.4s; animation-delay: 0.35s; }
        .geo-slab-2 .geo-slab-bar:nth-child(3) { width: 26px; background: rgba(148,138,110,0.53); animation-duration: 1.8s; animation-delay: 0.68s; }

        /* Slab 3 — L03 */
        .geo-slab-3 {
          bottom: 224px; width: 280px;
          background: rgba(10,22,53,0.84);
          border: 1px solid rgba(200,161,101,0.25);
          box-shadow: 0 6px 22px rgba(0,0,0,0.44);
        }
        .geo-slab-3 .geo-slab-label { color: rgba(165,150,115,0.80); }
        .geo-slab-3 .geo-slab-bar:nth-child(1) { width: 34px; background: rgba(175,150,100,0.68); animation-duration: 2.1s; }
        .geo-slab-3 .geo-slab-bar:nth-child(2) { width: 34px; background: rgba(175,150,100,0.58); animation-duration: 2.1s; animation-delay: 0.32s; }
        .geo-slab-3 .geo-slab-bar:nth-child(3) { width: 26px; background: rgba(175,150,100,0.63); animation-duration: 2.1s; animation-delay: 0.64s; }

        /* Slab 4 — L04 */
        .geo-slab-4 {
          bottom: 290px; width: 260px;
          background: rgba(11,24,56,0.80);
          border: 1px solid rgba(200,161,101,0.33);
          box-shadow: 0 6px 24px rgba(0,0,0,0.38), 0 0 22px rgba(200,161,101,0.06);
        }
        .geo-slab-4 .geo-slab-label { color: rgba(188,162,112,0.86); }
        .geo-slab-4 .geo-slab-bar:nth-child(1) { width: 40px; background: rgba(192,160,102,0.78); animation-duration: 2.2s; }
        .geo-slab-4 .geo-slab-bar:nth-child(2) { width: 40px; background: rgba(192,160,102,0.68); animation-duration: 2.2s; animation-delay: 0.28s; }
        .geo-slab-4 .geo-slab-bar:nth-child(3) { width: 32px; background: rgba(192,160,102,0.73); animation-duration: 2.2s; animation-delay: 0.56s; }

        /* Slab 5 — L05 */
        .geo-slab-5 {
          bottom: 356px; width: 240px;
          background: rgba(12,26,59,0.76);
          border: 1px solid rgba(200,161,101,0.42);
          box-shadow: 0 6px 28px rgba(0,0,0,0.32), 0 0 34px rgba(200,161,101,0.10);
        }
        .geo-slab-5 .geo-slab-label { color: rgba(200,168,120,0.92); }
        .geo-slab-5 .geo-slab-bar:nth-child(1) { width: 44px; background: rgba(200,161,101,0.88); animation-duration: 2.3s; }
        .geo-slab-5 .geo-slab-bar:nth-child(2) { width: 44px; background: rgba(200,161,101,0.78); animation-duration: 2.3s; animation-delay: 0.26s; }
        .geo-slab-5 .geo-slab-bar:nth-child(3) { width: 38px; background: rgba(200,161,101,0.83); animation-duration: 2.3s; animation-delay: 0.52s; }

        /* Slab 6 — L06 SENTINEL — pure gold output */
        .geo-slab-6 {
          bottom: 422px; width: 220px;
          background: rgba(14,28,62,0.72);
          border: 1px solid rgba(200,161,101,0.58);
          box-shadow: 0 6px 32px rgba(0,0,0,0.28), 0 0 50px rgba(200,161,101,0.18), 0 0 100px rgba(200,161,101,0.08);
        }
        .geo-slab-6 .geo-slab-label { color: #C8A165; }
        .geo-slab-6 .geo-slab-bar:nth-child(1) { width: 48px; background: rgba(200,161,101,1.0); box-shadow: 0 0 8px rgba(200,161,101,0.7); animation-duration: 2.4s; }
        .geo-slab-6 .geo-slab-bar:nth-child(2) { width: 48px; background: rgba(200,161,101,1.0); box-shadow: 0 0 8px rgba(200,161,101,0.7); animation-duration: 2.4s; animation-delay: 0.24s; }
        .geo-slab-6 .geo-slab-bar:nth-child(3) { width: 48px; background: rgba(200,161,101,1.0); box-shadow: 0 0 8px rgba(200,161,101,0.7); animation-duration: 2.4s; animation-delay: 0.48s; }

        @media (max-width: 900px) {
          .geo-conduit-outer { display: none; }
          .geo-hero-inner { flex-direction: column; align-items: center; }
          .geo-hero-text { text-align: center; }
        }

        @media (max-width: 640px) {
          .geo-card { padding: 1.5rem; }
          .geo-card-title { font-size: 1rem; }
        }
      `}</style>

      <SEO
        title={lang === 'ro'
          ? 'GEO Gateway — Vizibilitate AI pentru Afacerea Ta | CatyAI'
          : 'GEO Gateway — The AI-to-AI Conduit | CatyAI'}
        description="Deploy the 6-layer GEO Gateway. Stop being invisible to ChatGPT, Gemini, and Claude. Transform your business into structured AI-to-AI communication."
      />

      <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '8rem 1.5rem 5rem', overflow: 'hidden' }}>
        <div className="geo-hero-orb" />
        <div className="geo-grid-bg" />
        <div className="geo-hero-inner">

          {/* LEFT — Text */}
          <div className="geo-hero-text">
            <div className="geo-badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16C784', boxShadow: '0 0 6px #16C784', flexShrink: 0 }} />
              {t.badge}
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '0.5rem', color: '#f8fafc' }}>
              {t.heroTitle}
            </h1>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem', color: '#C8A165' }}>
              {t.heroTitle2}
            </h2>
            <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)', color: 'rgba(248,250,252,0.72)', maxWidth: '520px', marginBottom: '2.5rem', lineHeight: 1.65 }}>
              {t.heroBody}
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a href="#audit" style={{ padding: '0.9rem 2rem', borderRadius: '12px', background: '#C8A165', color: '#010A1F', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 4px 24px rgba(200,161,101,0.4)', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }}>
                {t.heroCta}
              </a>
              <a href="#layers" style={{ padding: '0.9rem 2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem', backdropFilter: 'blur(8px)', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }}>
                {t.heroCtaAlt} →
              </a>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {t.metrics.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(248,250,252,0.4)' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16C784', boxShadow: '0 0 4px #16C784', flexShrink: 0 }} />
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 6-Layer Conduit Visual */}
          <div className="geo-conduit-outer" aria-hidden="true">
            <div className="geo-conduit-wrap">

              {/* Top: 4 output rays to LLMs */}
              <svg width="340" height="116" viewBox="0 0 340 116" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                {/* Center source point at bottom-center (170, 116) */}
                {/* Ray to ChatGPT — far left */}
                <line x1="170" y1="116" x2="18" y2="12" stroke="rgba(200,161,101,0.70)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="18" cy="12" r="3" fill="rgba(200,161,101,0.85)" />
                <text x="22" y="16" fill="rgba(200,161,101,0.75)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em">ChatGPT</text>
                {/* Ray to Gemini — left-center */}
                <line x1="170" y1="116" x2="98" y2="8" stroke="rgba(200,161,101,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="98" cy="8" r="3" fill="rgba(200,161,101,0.70)" />
                <text x="103" y="13" fill="rgba(200,161,101,0.65)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em">Gemini</text>
                {/* Ray to Perplexity — right-center */}
                <line x1="170" y1="116" x2="218" y2="8" stroke="rgba(200,161,101,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="218" cy="8" r="3" fill="rgba(200,161,101,0.70)" />
                <text x="223" y="13" fill="rgba(200,161,101,0.65)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em">Perplexity</text>
                {/* Ray to Claude — far right */}
                <line x1="170" y1="116" x2="316" y2="12" stroke="rgba(200,161,101,0.70)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="316" cy="12" r="3" fill="rgba(200,161,101,0.85)" />
                <text x="248" y="16" fill="rgba(200,161,101,0.75)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.04em">Claude</text>
                {/* Gold burst at source */}
                <circle cx="170" cy="116" r="5" fill="rgba(200,161,101,0.95)" />
                <circle cx="170" cy="116" r="10" fill="rgba(200,161,101,0.18)" />
              </svg>

              {/* Central stream pipe */}
              <div className="geo-stream-pipe">
                <div className="geo-stream-particle" style={{ animationDuration: '2.8s', animationDelay: '0s', height: '6px' }} />
                <div className="geo-stream-particle" style={{ animationDuration: '2.8s', animationDelay: '0.93s', height: '8px' }} />
                <div className="geo-stream-particle" style={{ animationDuration: '2.8s', animationDelay: '1.87s', height: '5px' }} />
              </div>

              {/* Slab 6 — L06 SENTINEL (top, pure gold) */}
              <div className="geo-slab geo-slab-6">
                <span className="geo-slab-label">L06 · SENTINEL</span>
                <div className="geo-slab-bars">
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                </div>
              </div>

              {/* Slab 5 — L05 */}
              <div className="geo-slab geo-slab-5">
                <span className="geo-slab-label">L05 · CONTEXT</span>
                <div className="geo-slab-bars">
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                </div>
              </div>

              {/* Slab 4 — L04 */}
              <div className="geo-slab geo-slab-4">
                <span className="geo-slab-label">L04 · SCHEMA</span>
                <div className="geo-slab-bars">
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                </div>
              </div>

              {/* Slab 3 — L03 */}
              <div className="geo-slab geo-slab-3">
                <span className="geo-slab-label">L03 · ROUTING</span>
                <div className="geo-slab-bars">
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                </div>
              </div>

              {/* Slab 2 — L02 */}
              <div className="geo-slab geo-slab-2">
                <span className="geo-slab-label">L02 · PARSE</span>
                <div className="geo-slab-bars">
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                </div>
              </div>

              {/* Slab 1 — L01 Foundation (bottom, grey chaos) */}
              <div className="geo-slab geo-slab-1">
                <span className="geo-slab-label">L01 · INGEST</span>
                <div className="geo-slab-bars">
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                  <div className="geo-slab-bar" />
                </div>
              </div>

              {/* Bottom: chaos input zone */}
              <svg width="340" height="92" viewBox="0 0 340 92" fill="none" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                {/* Scattered grey chaos dots */}
                <circle cx="62"  cy="68" r="2.5" fill="rgba(100,112,138,0.45)" />
                <circle cx="95"  cy="52" r="1.8" fill="rgba(100,112,138,0.35)" />
                <circle cx="128" cy="74" r="3.0" fill="rgba(100,112,138,0.40)" />
                <circle cx="155" cy="58" r="2.0" fill="rgba(100,112,138,0.30)" />
                <circle cx="185" cy="72" r="2.5" fill="rgba(100,112,138,0.42)" />
                <circle cx="214" cy="50" r="1.8" fill="rgba(100,112,138,0.35)" />
                <circle cx="248" cy="66" r="3.0" fill="rgba(100,112,138,0.38)" />
                <circle cx="278" cy="54" r="2.2" fill="rgba(100,112,138,0.32)" />
                <circle cx="44"  cy="40" r="1.5" fill="rgba(100,112,138,0.25)" />
                <circle cx="112" cy="35" r="2.0" fill="rgba(100,112,138,0.28)" />
                <circle cx="200" cy="38" r="1.5" fill="rgba(100,112,138,0.22)" />
                <circle cx="295" cy="42" r="2.0" fill="rgba(100,112,138,0.26)" />
                {/* Upward converging arrows towards center */}
                <line x1="90"  y1="75" x2="155" y2="18" stroke="rgba(100,112,138,0.22)" strokeWidth="1" strokeLinecap="round" />
                <line x1="250" y1="75" x2="185" y2="18" stroke="rgba(100,112,138,0.22)" strokeWidth="1" strokeLinecap="round" />
                <line x1="170" y1="80" x2="170" y2="18" stroke="rgba(100,112,138,0.28)" strokeWidth="1.5" strokeLinecap="round" />
                {/* "YOUR WEBSITE" label */}
                <text x="170" y="88" fill="rgba(100,112,138,0.45)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em" textAnchor="middle">YOUR WEBSITE</text>
              </svg>

            </div>
          </div>

        </div>
      </section>

      {/* 6 Layer Cards */}
      <section id="layers" style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="geo-badge" style={{ marginBottom: '1rem' }}>6 Layers</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.75rem' }}>
              {t.layersTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '520px', margin: '0 auto' }}>
              {t.layersSubtitle}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {t.layers.map((layer) => (
              <div key={layer.n} className="geo-card">
                <div className="geo-card-num">{layer.n}</div>
                <span className="geo-card-icon">{layer.icon}</span>
                <div className="geo-card-tag">{layer.tag}</div>
                <div className="geo-card-title">{layer.title}</div>
                <div className="geo-card-tagline">{layer.tagline}</div>
                <div className="geo-card-body">{layer.body}</div>
                <div className="geo-card-pill">{layer.pill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Crawlers */}
      <section style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.75rem' }}>
              {t.crawlersTitle}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>{t.crawlersSubtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.875rem' }}>
            {CRAWLERS.map(c => (
              <div key={c.name} className="geo-crawler-card">
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.25rem' }}>{c.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#475569' }}>{c.engine}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* /answer Portal */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div className="geo-badge" style={{ marginBottom: '1.25rem' }}>⚡ First in Industry</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.75rem' }}>
              {t.answerTitle}
            </h2>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C8A165', marginBottom: '1rem' }}>
              {t.answerSub}
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.65, fontSize: '0.95rem' }}>{t.answerBody}</p>
          </div>
          <div style={{ background: 'rgba(10,27,61,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.75rem', backdropFilter: 'blur(12px)' }}>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#4ade80', whiteSpace: 'pre-wrap', lineHeight: 1.7, margin: 0 }}>{`GET /answer?q=business_hours
→ {
  "@type": "LocalBusiness",
  "name": "Your Business",
  "openingHours": ["Mo-Fr 09:00-18:00"],
  "priceRange": "€€",
  "description": "...",
  "hasOfferCatalog": [...]
}`}</pre>
          </div>
        </div>
      </section>

      {/* GEO vs SEO */}
      <section style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', textAlign: 'center', marginBottom: '2.5rem' }}>
            {t.tableTitle}
          </h2>
          <div style={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(10,27,61,0.7)', padding: '0.875rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Feature</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'center' }}>Traditional SEO</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C8A165', textAlign: 'center' }}>GEO Gateway</span>
            </div>
            {t.tableRows.map((row, i) => (
              <div key={i} className="geo-table-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1rem 1.5rem', borderBottom: i < t.tableRows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{row.f}</span>
                <span style={{ fontSize: '0.875rem', color: '#475569', textAlign: 'center' }}>{row.seo}</span>
                <span style={{ fontSize: '0.875rem', color: '#C8A165', fontWeight: 600, textAlign: 'center' }}>{row.geo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', textAlign: 'center', marginBottom: '2.5rem' }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {t.faqs.map((faq, i) => (
              <div key={i} className={`geo-faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="geo-faq-q">
                  <span>{faq.q}</span>
                  <svg className="geo-faq-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {openFaq === i && <div className="geo-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Audit Widget */}
      <section id="audit" style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="geo-badge" style={{ marginBottom: '1rem' }}>GEO Visibility Audit</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.5rem' }}>
              {t.auditTitle}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{t.auditSub}</p>
          </div>
          <GeoAuditWidget />
        </div>

        {/* Final CTA */}
        <div style={{ maxWidth: '600px', margin: '5rem auto 0', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '1rem' }}>
            {t.finalCta}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>{t.finalBody}</p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '12px', background: '#C8A165', color: '#010A1F', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 4px 24px rgba(200,161,101,0.35)', textDecoration: 'none' }}>
              {t.finalBtn}
            </Link>
            <Link to="/pricing" style={{ padding: '0.875rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              {t.pricingBtn}
            </Link>
          </div>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
