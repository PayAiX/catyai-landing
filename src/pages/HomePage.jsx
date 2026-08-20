import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ShieldCheck, RadioTower, Lock } from 'lucide-react';
import SEO from '../components/SEO';
import GlobalHeader from '../components/GlobalHeader';
import FooterV9 from '../components/FooterV9';

// Note: Lucide icons are loaded via CDN script in index.html (already added by previous PR).
// CatyAI Homepage V9 — full design with inline CSS, no Tailwind v4 utility class dependency.

const translations = {
  ro: {
    navLogin: 'Login', navCta: 'Audit Vizibilitate',
    navTrustBenchmark: 'Trust Benchmark', navProtocol: 'Protocol', navPricing: 'Prețuri',
    heroLine1: 'Produsele tale, găsite pe Google și', heroAccent: 'citate de agenții AI.',
    heroSubtitle: 'Inginerie de catalog, distribuție CSS și vizibilitate AI. CatyAI face catalogul tău citibil de ChatGPT, Perplexity și Gemini și blochează prețurile reale criptografic — ca AI-ul să nu inventeze nimic.',
    heroPlaceholder: 'https://magazinul-tau.ro', heroBtn: 'Verifică gratuit',
    socialProof: '3,5M produse · 190 de comercianți activi · Widget gratuit 14 zile, fără card',
    scanCritical: 'Vulnerabilitate critică detectată',
    scanLlm: 'Extracție date LLM:', scanLlmFail: 'Eșuat (JS blocat)',
    scanHalluc: 'Risc halucinații:', scanHallucVal: 'Extrem (>85%)',
    scanSig: 'Signature Ed25519:', scanSigVal: 'Lipsește', scanRepair: 'Repară cu CatyAI',
    crawlersLabel: 'Optimizat pentru',
    productsLabel: 'Un lanț, nu patru produse',
    productsTitle: 'De la întrebarea clientului', productsTitleAccent: 'la vânzarea dovedită.',
    productsSub: 'Fiecare verigă rezolvă o parte. Separat, sunt unelte. Împreună, sunt singura infrastructură care duce o citare AI până la o tranzacție dovedită.',
    chainLinkLabel: 'Veriga',
    chainEndTitle: 'Oferta principală:', chainEndAccent: 'Commerce Distribution',
    chainEndBody: 'Produsele tale, găsite pe Google și citate de agenții AI — inginerie de catalog, distribuție CSS, vizibilitate AI. Setup unic + abonament lunar, grilă transparentă.',
    chainEndCta: 'Vezi oferta completă',
    chainEndCta2: 'Marketplace-ul live ↗',
    howLabel: 'Cum funcționează', howTitle: 'Trei pași.', howAccent: 'proces fără tehnic.',
    layer1Tag: 'Layer 01 · Antena', layer1Title: 'Vizibilitate AI',
    layer1Tagline: 'Fă-ți business-ul lizibil pentru roboți.',
    layer1Body: 'ChatGPT și Gemini nu „văd" site-ul tău ca pe o poză. Instalăm antena care le livrează datele tale oficiale direct în creier — eliminând ghicitul și halucinațiile.',
    layer1Compliance: 'EU AI Act · Art. 50 + 52 · Transparență Nativă · compliant by design',
    layer2Tag: 'Layer 02 · Scutul', layer2Title: 'Zero Halucinații',
    layer2Tagline: 'Certificatul de Adevăr Criptografic.',
    layer2Body: 'Singura tehnologie care garantează matematic că AI-ul nu inventează prețuri sau reguli. Dacă datele sunt modificate de un hacker, sistemul se blochează automat. Matematică, nu probabilitate.',
    layer2Compliance: 'EU AI Act · Art. 10 · Data Provenance · Sigiliul de Adevăr',
    layer3Tag: 'Layer 03 · Acțiunea', layer3Title: 'Vânzări Automate',
    layer3Tagline: 'De la Conversație la Tranzacție.',
    layer3Body: 'AI-ul tău nu doar „vorbește", ci execută. Rezervă mese, vinde produse și încasează bani prin Stripe — fără ca tu să ridici un deget.',
    layer3Compliance: 'EU AI Act · M2M Audit Trail · Execuție Certificată · X-AKL signature',
    layer4Tag: 'Layer 04 · Sentinel', layer4Title: 'Paza de Noapte',
    layer4Tagline: 'Monitorizare și Imunitate Live.',
    layer4Body: 'Un sistem care veghează 24/7. Dacă AI-ul începe să se comporte ciudat sau datele tale „expiră", Sentinel repară totul instant sau oprește accesul. Zero riscuri de imagine.',
    layer4Compliance: 'EU AI Act · Art. 9 · Risk Management Lifecycle · JWKS revocation în milisecunde',
    euReadySince: 'Pregătit din prima zi',
    euReady: 'GATA',
    euBody: 'Documentație tehnică, headere de transparență, proveniența datelor și gestionarea riscurilor — implementate nativ în CatyAI.',
    euDeadline: 'Deadline: 2 august 2026 · Compliance by design, nu add-on',
    euArt9: 'Articol 9 · Gestionarea Riscurilor', euArt10: 'Articol 10 · Guvernanța Datelor',
    euArt50: 'Articol 50 · Transparență', euArt52: 'Articol 52 · Divulgare',
    testimonialsLabel: 'Testimoniale', testimonialsTitle: '4.8★ pe Google · 47 reviews',
    industriesLabel: 'Industrii', industriesTitle: 'Folosit în', industriesAccent: '14 verticale',
    ind1: 'Clinici Medicale', ind2: 'Restaurante', ind3: 'Real Estate',
    ind4: 'Saloane Beauty', ind5: 'Service Auto', ind6: 'Educație',
    ind7: 'E-commerce', ind8: 'Servicii B2B',
    faqLabel: 'FAQ', faqTitle: 'Întrebări frecvente',
    faq1Q: 'Cât durează setup-ul?',
    faq1A: '2-5 minute. Conectezi WhatsApp Business sau adaugi widget-ul cu un script tag pe site. AI-ul învață automat din conținutul site-ului tău (auto-crawl).',
    faq2Q: 'Ce se întâmplă cu datele clienților mei?',
    faq2A: 'GDPR-compliant integral. Datele sunt stocate în AWS eu-west-1 (Irlanda), criptate at-rest cu AWS KMS. ANPC + SAL + SOL compliance. Ștergem datele la cerere în max 24h.',
    faq3Q: 'Pot integra cu CRM-ul existent?',
    faq3A: 'Da. Integrări native: HubSpot, Pipedrive, Salesforce, Zoho. Custom prin webhook + API REST documentat la docs.catyai.io.',
    faq4Q: 'Cum se diferențiază de alte chatbot-uri?',
    faq4A: 'Trei lucruri: (1) FraudAI Shield — singurul cu protecție anti-phishing nativă. (2) Multi-agent — 8 agenți specializați, nu un singur LLM care încearcă să le facă pe toate. (3) GEO Gateway — site-ul tău devine vizibil pentru ChatGPT/Perplexity, nu doar pentru Google.',
    faq5Q: 'Există plan gratuit?',
    faq5A: 'Da — 100 sesiuni/lună gratuit, fără card. Include FraudAI Shield basic și chat. Pentru creștere: Starter €49/lună, Growth €99, Business €199, Enterprise €499.',
    ctaTitle1: 'Nu vindem', ctaStrike: 'chatboturi', ctaTitle2: 'Instalăm', ctaAccent: 'infrastructură',
    ctaSubtitle: 'Începe gratuit. Setup în 2 minute. Fără card. Fără bullshit.', ctaBtn: 'Setup gratuit acum',
    footerTagline: 'GEO intel săptămânal,\nînainte de concurență.',
    footerNewsletter: 'Update-uri lunare despre AI search, comportament LLM, protocol CatyAI. Fără spam.',
    footerNoSpam: 'No spam · GDPR compliant · Unsubscribe oricând',
    footerDesc: 'Infrastructura neurală pentru AI internet. Ne asigurăm că GPTBot, ClaudeBot și Perplexity te recomandă.',
    footerProduct: 'Produs', footerResources: 'Resurse', footerCompany: 'Companie', footerLegal: 'Legal',
    footerPricing: 'Prețuri', footerDocs: 'Documentație', footerAbout: 'Despre',
    footerCareers: 'Cariere', footerTerms: 'Termeni', footerSecurity: 'Securitate',
    prod1Name: 'Web Widget', prod1Tagline: 'Clientul întreabă. AI-ul vinde.',
    prod1F1: 'Conversație 24/7 pe site și WhatsApp', prod1F2: 'Răspunde cu date reale din catalogul tău', prod1F3: 'Programări, lead-uri, oferte PDF', prod1F4: 'FraudAI Shield inclus standard', prod1Cta: 'Detalii Widget',
    prod2Name: 'FraudAI Shield', prod2Tagline: 'Scam-ul nu ajunge la client.',
    prod2F1: '8 module de detecție anti-phishing', prod2F2: 'Blochează prompt injection', prod2F3: 'Oprește impersonarea brandului', prod2F4: 'Conversații curate, brand intact', prod2Cta: 'Detalii FraudAI',
    prod3Name: 'GEO Gateway', prod3Tagline: 'Devii răspunsul, nu nota de subsol.',
    prod3F1: 'llms.txt + JSON-LD + catalog SSR', prod3F2: 'Citit de GPTBot, ClaudeBot, Perplexity', prod3F3: 'AI-ul te citează pe tine, nu competitorul', prod3F4: 'Vizibilitate măsurabilă în dashboard', prod3Cta: 'Detalii GEO',
    prod4Name: 'Trust Gateway', prod4Tagline: 'AI-ul nu poate inventa prețul tău.',
    prod4F1: 'Fiecare răspuns semnat criptografic', prod4F2: 'Verificabil public, gratuit (JWKS)', prod4F3: 'Blocare automată la manipulare', prod4F4: 'Matematică, nu promisiune', prod4Cta: 'Detalii Trust',
  },
  en: {
    navLogin: 'Login', navCta: 'Audit Visibility',
    navTrustBenchmark: 'Trust Benchmark', navProtocol: 'Protocol', navPricing: 'Pricing',
    heroLine1: 'Your products, found on Google and', heroAccent: 'cited by AI agents.',
    heroSubtitle: 'Catalog engineering, CSS distribution and AI visibility. CatyAI makes your catalog readable by ChatGPT, Perplexity and Gemini and locks your real prices cryptographically — so AI invents nothing.',
    heroPlaceholder: 'https://your-store.com', heroBtn: 'Check free',
    socialProof: '3.5M products · 190 active merchants · Widget free for 14 days, no credit card',
    scanCritical: 'Critical vulnerability detected',
    scanLlm: 'LLM data extraction:', scanLlmFail: 'Failed (JS blocked)',
    scanHalluc: 'Hallucination risk:', scanHallucVal: 'Extreme (>85%)',
    scanSig: 'Ed25519 Signature:', scanSigVal: 'Missing', scanRepair: 'Fix with CatyAI',
    crawlersLabel: 'Optimized for',
    productsLabel: 'One chain, not four products',
    productsTitle: "From the customer's question", productsTitleAccent: 'to the proven sale.',
    productsSub: 'Each link solves one part. Apart, they are tools. Together, they are the only infrastructure that takes an AI citation all the way to a proven transaction.',
    chainLinkLabel: 'Link',
    chainEndTitle: 'The main offer:', chainEndAccent: 'Commerce Distribution',
    chainEndBody: 'Your products, found on Google and cited by AI agents — catalog engineering, CSS distribution, AI visibility. One-time setup + monthly subscription, transparent pricing.',
    chainEndCta: 'See the full offer',
    chainEndCta2: 'The live marketplace ↗',
    howLabel: 'How it works', howTitle: 'Three steps.', howAccent: 'no-code process.',
    layer1Tag: 'Layer 01 · Antenna', layer1Title: 'AI Visibility',
    layer1Tagline: 'Make your business readable by robots.',
    layer1Body: "ChatGPT and Gemini don't \"see\" your website like a picture. We install the antenna that delivers your official data directly to their brain — eliminating guessing and hallucinations.",
    layer1Compliance: 'EU AI Act · Art. 50 + 52 · Native Transparency · compliant by design',
    layer2Tag: 'Layer 02 · Shield', layer2Title: 'Zero Hallucinations',
    layer2Tagline: 'The Cryptographic Truth Certificate.',
    layer2Body: "The only technology that mathematically guarantees AI won't invent prices or rules. If data is tampered by a hacker, the system blocks automatically. Math, not probability.",
    layer2Compliance: 'EU AI Act · Art. 10 · Data Provenance · Truth Seal',
    layer3Tag: 'Layer 03 · Action', layer3Title: 'Automated Sales',
    layer3Tagline: 'From Conversation to Transaction.',
    layer3Body: "Your AI doesn't just \"talk\", it executes. Books tables, sells products and collects payments via Stripe — without you lifting a finger.",
    layer3Compliance: 'EU AI Act · M2M Audit Trail · Certified Execution · X-AKL signature',
    layer4Tag: 'Layer 04 · Sentinel', layer4Title: 'Night Watch',
    layer4Tagline: 'Live Monitoring and Immunity.',
    layer4Body: 'A system that watches 24/7. If AI starts behaving strangely or your data "expires", Sentinel fixes everything instantly or blocks access. Zero reputation risks.',
    layer4Compliance: 'EU AI Act · Art. 9 · Risk Management Lifecycle · JWKS revocation in milliseconds',
    euReadySince: 'Ready since launch',
    euReady: 'READY',
    euBody: 'Technical documentation, transparency headers, data provenance and risk management — natively implemented in CatyAI.',
    euDeadline: 'Deadline: August 2, 2026 · Compliance by design, not add-on',
    euArt9: 'Article 9 · Risk Management', euArt10: 'Article 10 · Data Governance',
    euArt50: 'Article 50 · Transparency', euArt52: 'Article 52 · Disclosure',
    testimonialsLabel: 'Testimonials', testimonialsTitle: '4.8★ on Google · 47 reviews',
    industriesLabel: 'Industries', industriesTitle: 'Used in', industriesAccent: '14 verticals',
    ind1: 'Medical Clinics', ind2: 'Restaurants', ind3: 'Real Estate',
    ind4: 'Beauty Salons', ind5: 'Auto Service', ind6: 'Education',
    ind7: 'E-commerce', ind8: 'B2B Services',
    faqLabel: 'FAQ', faqTitle: 'Frequently asked questions',
    faq1Q: 'How long does setup take?',
    faq1A: '2-5 minutes. Connect WhatsApp Business or add the widget with a script tag on your site. AI automatically learns from your site content (auto-crawl).',
    faq2Q: "What happens to my customers' data?",
    faq2A: 'Fully GDPR-compliant. Data is stored in AWS eu-west-1 (Ireland), encrypted at-rest with AWS KMS. We delete data on request within 24h.',
    faq3Q: 'Can I integrate with my existing CRM?',
    faq3A: 'Yes. Native integrations: HubSpot, Pipedrive, Salesforce, Zoho. Custom via webhook + REST API documented at docs.catyai.io.',
    faq4Q: 'How is it different from other chatbots?',
    faq4A: 'Three things: (1) FraudAI Shield — the only one with native anti-phishing protection. (2) Multi-agent — 8 specialized agents. (3) GEO Gateway — your site becomes visible to ChatGPT/Perplexity, not just Google.',
    faq5Q: 'Is there a free plan?',
    faq5A: 'Yes — 100 sessions/month free, no credit card. Includes basic FraudAI Shield and chat. For growth: Starter €49/month, Growth €99, Business €199, Enterprise €499.',
    ctaTitle1: "We don't sell", ctaStrike: 'chatbots', ctaTitle2: 'We install', ctaAccent: 'infrastructure',
    ctaSubtitle: 'Start for free. Setup in 2 minutes. No card. No bullshit.', ctaBtn: 'Free setup now',
    footerTagline: 'Weekly GEO intel,\nbefore the competition.',
    footerNewsletter: 'Monthly updates on AI search, LLM behavior, CatyAI protocol. No spam.',
    footerNoSpam: 'No spam · GDPR compliant · Unsubscribe anytime',
    footerDesc: 'Neural infrastructure for AI internet. We make sure GPTBot, ClaudeBot and Perplexity recommend you.',
    footerProduct: 'Product', footerResources: 'Resources', footerCompany: 'Company', footerLegal: 'Legal',
    footerPricing: 'Pricing', footerDocs: 'Documentation', footerAbout: 'About',
    footerCareers: 'Careers', footerTerms: 'Terms', footerSecurity: 'Security',
    prod1Name: 'Web Widget', prod1Tagline: 'The customer asks. AI sells.',
    prod1F1: '24/7 conversation on site & WhatsApp', prod1F2: 'Answers with real data from your catalog', prod1F3: 'Bookings, leads, PDF quotes', prod1F4: 'FraudAI Shield included as standard', prod1Cta: 'Widget details',
    prod2Name: 'FraudAI Shield', prod2Tagline: 'Scams never reach the customer.',
    prod2F1: '8 anti-phishing detection modules', prod2F2: 'Blocks prompt injection', prod2F3: 'Stops brand impersonation', prod2F4: 'Clean conversations, intact brand', prod2Cta: 'FraudAI details',
    prod3Name: 'GEO Gateway', prod3Tagline: 'Become the answer, not the footnote.',
    prod3F1: 'llms.txt + JSON-LD + SSR catalog', prod3F2: 'Read by GPTBot, ClaudeBot, Perplexity', prod3F3: 'AI cites you, not your competitor', prod3F4: 'Measurable visibility in the dashboard', prod3Cta: 'GEO details',
    prod4Name: 'Trust Gateway', prod4Tagline: 'AI cannot invent your price.',
    prod4F1: 'Every answer cryptographically signed', prod4F2: 'Publicly verifiable, free (JWKS)', prod4F3: 'Automatic blocking on tampering', prod4F4: 'Math, not promises', prod4Cta: 'Trust details',
  },
  es: {
    navLogin: 'Iniciar sesión', navCta: 'Auditar Visibilidad',
    navTrustBenchmark: 'Trust Benchmark', navProtocol: 'Protocolo', navPricing: 'Precios',
    heroLine1: 'La IA vende. Nosotros nos aseguramos de que venda', heroAccent: 'tu verdad.',
    heroSubtitle: 'CatyAI hace tu catálogo legible por ChatGPT, Perplexity y Gemini, bloquea tus precios reales criptográficamente — para que la IA no invente nada — y convierte cada cita en una transacción medible.',
    heroPlaceholder: 'https://tu-tienda.com', heroBtn: 'Verificar gratis',
    socialProof: '3,5M productos · 190 comerciantes activos · comisión solo al entregar · Gratis, sin tarjeta',
    scanCritical: 'Vulnerabilidad crítica detectada',
    scanLlm: 'Extracción datos LLM:', scanLlmFail: 'Fallido (JS bloqueado)',
    scanHalluc: 'Riesgo de alucinaciones:', scanHallucVal: 'Extremo (>85%)',
    scanSig: 'Firma Ed25519:', scanSigVal: 'Ausente', scanRepair: 'Reparar con CatyAI',
    crawlersLabel: 'Optimizado para',
    productsLabel: 'Una cadena, no cuatro productos',
    productsTitle: 'De la pregunta del cliente', productsTitleAccent: 'a la comisión en tu cuenta.',
    productsSub: 'Cada eslabón resuelve una parte. Por separado, son herramientas. Juntos, son la única infraestructura que lleva una cita de IA hasta una transacción probada.',
    chainLinkLabel: 'Eslabón',
    chainEndTitle: 'Y todo termina en dinero:', chainEndAccent: 'Agentic Marketplace',
    chainEndBody: 'Click atribuido, pedido probado, comisión facturada automáticamente al entregar. 3,5M productos en vivo ahora mismo.',
    chainEndCta: 'Abrir el marketplace',
    howLabel: 'Cómo funciona', howTitle: 'Tres pasos.', howAccent: 'proceso sin código.',
    layer1Tag: 'Capa 01 · Antena', layer1Title: 'Visibilidad IA',
    layer1Tagline: 'Haz tu negocio legible para robots.',
    layer1Body: 'ChatGPT y Gemini no "ven" tu sitio web como una foto. Instalamos la antena que entrega tus datos oficiales directamente a su cerebro — eliminando suposiciones y alucinaciones.',
    layer1Compliance: 'EU AI Act · Art. 50 + 52 · Transparencia Nativa · compliant by design',
    layer2Tag: 'Capa 02 · Escudo', layer2Title: 'Zero Alucinaciones',
    layer2Tagline: 'El Certificado de Verdad Criptográfica.',
    layer2Body: 'La única tecnología que garantiza matemáticamente que la IA no inventa precios ni reglas. Si los datos son modificados por un hacker, el sistema se bloquea automáticamente.',
    layer2Compliance: 'EU AI Act · Art. 10 · Data Provenance · Sello de Verdad',
    layer3Tag: 'Capa 03 · Acción', layer3Title: 'Ventas Automatizadas',
    layer3Tagline: 'De la Conversación a la Transacción.',
    layer3Body: 'Tu IA no solo "habla", ejecuta. Reserva mesas, vende productos y cobra pagos via Stripe — sin que tengas que mover un dedo.',
    layer3Compliance: 'EU AI Act · M2M Audit Trail · Ejecución Certificada · X-AKL signature',
    layer4Tag: 'Capa 04 · Sentinel', layer4Title: 'Guardia Nocturna',
    layer4Tagline: 'Monitoreo e Inmunidad en Vivo.',
    layer4Body: 'Un sistema que vigila 24/7. Si la IA comienza a comportarse de forma extraña o tus datos "expiran", Sentinel lo repara instantáneamente o bloquea el acceso.',
    layer4Compliance: 'EU AI Act · Art. 9 · Ciclo de Gestión de Riesgos · JWKS revocación en milisegundos',
    euReadySince: 'Listo desde el lanzamiento',
    euReady: 'LISTO',
    euBody: 'Documentación técnica, cabeceras de transparencia, proveniencia de datos y gestión de riesgos — implementados nativamente en CatyAI.',
    euDeadline: 'Fecha límite: 2 agosto 2026 · Compliance by design, no add-on',
    euArt9: 'Artículo 9 · Gestión de Riesgos', euArt10: 'Artículo 10 · Gobernanza de Datos',
    euArt50: 'Artículo 50 · Transparencia', euArt52: 'Artículo 52 · Divulgación',
    testimonialsLabel: 'Testimonios', testimonialsTitle: '4.8★ en Google · 47 reseñas',
    industriesLabel: 'Industrias', industriesTitle: 'Usado en', industriesAccent: '14 verticales',
    ind1: 'Clínicas Médicas', ind2: 'Restaurantes', ind3: 'Real Estate',
    ind4: 'Salones de Belleza', ind5: 'Talleres Auto', ind6: 'Educación',
    ind7: 'E-commerce', ind8: 'Servicios B2B',
    faqLabel: 'Preguntas Frecuentes', faqTitle: 'Preguntas frecuentes',
    faq1Q: '¿Cuánto dura la configuración?',
    faq1A: '2-5 minutos. Conectas WhatsApp Business o añades el widget con un script tag en tu sitio. La IA aprende automáticamente del contenido de tu sitio (auto-crawl).',
    faq2Q: '¿Qué pasa con los datos de mis clientes?',
    faq2A: 'Completamente compatible con GDPR. Los datos se almacenan en AWS eu-west-1 (Irlanda), cifrados en reposo con AWS KMS. Eliminamos los datos a petición en máx 24h.',
    faq3Q: '¿Puedo integrar con mi CRM existente?',
    faq3A: 'Sí. Integraciones nativas: HubSpot, Pipedrive, Salesforce, Zoho. Personalizado via webhook + API REST documentado en docs.catyai.io.',
    faq4Q: '¿Cómo se diferencia de otros chatbots?',
    faq4A: 'Tres cosas: (1) FraudAI Shield — el único con protección anti-phishing nativa. (2) Multi-agente — 8 agentes especializados. (3) GEO Gateway — tu sitio se vuelve visible para ChatGPT/Perplexity.',
    faq5Q: '¿Hay plan gratuito?',
    faq5A: 'Sí — 100 sesiones/mes gratis, sin tarjeta. Incluye FraudAI Shield básico y chat. Para crecer: Starter €49/mes, Growth €99, Business €199, Enterprise €499.',
    ctaTitle1: 'No vendemos', ctaStrike: 'chatbots', ctaTitle2: 'Instalamos', ctaAccent: 'infraestructura',
    ctaSubtitle: 'Empieza gratis. Configuración en 2 minutos. Sin tarjeta.', ctaBtn: 'Configuración gratuita ahora',
    footerTagline: 'Inteligencia GEO semanal,\nantes que la competencia.',
    footerNewsletter: 'Actualizaciones mensuales sobre búsqueda IA, comportamiento LLM, protocolo CatyAI. Sin spam.',
    footerNoSpam: 'Sin spam · GDPR compliant · Cancelar en cualquier momento',
    footerDesc: 'Infraestructura neural para internet IA. Nos aseguramos de que GPTBot, ClaudeBot y Perplexity te recomienden.',
    footerProduct: 'Producto', footerResources: 'Recursos', footerCompany: 'Empresa', footerLegal: 'Legal',
    footerPricing: 'Precios', footerDocs: 'Documentación', footerAbout: 'Acerca de',
    footerCareers: 'Empleo', footerTerms: 'Términos', footerSecurity: 'Seguridad',
    prod1Name: 'Web Widget', prod1Tagline: 'El cliente pregunta. La IA vende.',
    prod1F1: 'Conversación 24/7 en sitio y WhatsApp', prod1F2: 'Responde con datos reales de tu catálogo', prod1F3: 'Reservas, leads, presupuestos PDF', prod1F4: 'FraudAI Shield incluido estándar', prod1Cta: 'Detalles Widget',
    prod2Name: 'FraudAI Shield', prod2Tagline: 'Las estafas no llegan al cliente.',
    prod2F1: '8 módulos de detección anti-phishing', prod2F2: 'Bloquea prompt injection', prod2F3: 'Detiene la suplantación de marca', prod2F4: 'Conversaciones limpias, marca intacta', prod2Cta: 'Detalles FraudAI',
    prod3Name: 'GEO Gateway', prod3Tagline: 'Conviértete en la respuesta, no en la nota.',
    prod3F1: 'llms.txt + JSON-LD + catálogo SSR', prod3F2: 'Leído por GPTBot, ClaudeBot, Perplexity', prod3F3: 'La IA te cita a ti, no al competidor', prod3F4: 'Visibilidad medible en el panel', prod3Cta: 'Detalles GEO',
    prod4Name: 'Trust Gateway', prod4Tagline: 'La IA no puede inventar tu precio.',
    prod4F1: 'Cada respuesta firmada criptográficamente', prod4F2: 'Verificable públicamente, gratis (JWKS)', prod4F3: 'Bloqueo automático ante manipulación', prod4F4: 'Matemáticas, no promesas', prod4Cta: 'Detalles Trust',
  },
  pt: {
    navLogin: 'Entrar', navCta: 'Auditar Visibilidade',
    navTrustBenchmark: 'Trust Benchmark', navProtocol: 'Protocolo', navPricing: 'Preços',
    heroLine1: 'A IA vende. Nós garantimos que ela vende', heroAccent: 'a sua verdade.',
    heroSubtitle: 'A CatyAI torna o seu catálogo legível pelo ChatGPT, Perplexity e Gemini, bloqueia os seus preços reais criptograficamente — para que a IA não invente nada — e transforma cada citação numa transação mensurável.',
    heroPlaceholder: 'https://sua-loja.com', heroBtn: 'Verificar grátis',
    socialProof: '3,5M produtos · 190 comerciantes ativos · comissão só na entrega · Grátis, sem cartão',
    scanCritical: 'Vulnerabilidade crítica detectada',
    scanLlm: 'Extração de dados LLM:', scanLlmFail: 'Falhou (JS bloqueado)',
    scanHalluc: 'Risco de alucinações:', scanHallucVal: 'Extremo (>85%)',
    scanSig: 'Assinatura Ed25519:', scanSigVal: 'Ausente', scanRepair: 'Reparar com CatyAI',
    crawlersLabel: 'Otimizado para',
    productsLabel: 'Uma cadeia, não quatro produtos',
    productsTitle: 'Da pergunta do cliente', productsTitleAccent: 'à comissão na sua conta.',
    productsSub: 'Cada elo resolve uma parte. Separados, são ferramentas. Juntos, são a única infraestrutura que leva uma citação de IA até uma transação comprovada.',
    chainLinkLabel: 'Elo',
    chainEndTitle: 'E tudo termina em dinheiro:', chainEndAccent: 'Agentic Marketplace',
    chainEndBody: 'Clique atribuído, pedido comprovado, comissão faturada automaticamente na entrega. 3,5M produtos ao vivo agora mesmo.',
    chainEndCta: 'Abrir o marketplace',
    howLabel: 'Como funciona', howTitle: 'Três passos.', howAccent: 'processo sem código.',
    layer1Tag: 'Camada 01 · Antena', layer1Title: 'Visibilidade IA',
    layer1Tagline: 'Torne seu negócio legível para robôs.',
    layer1Body: 'ChatGPT e Gemini não "veem" seu site como uma foto. Instalamos a antena que entrega seus dados oficiais diretamente no cérebro deles — eliminando suposições e alucinações.',
    layer1Compliance: 'EU AI Act · Art. 50 + 52 · Transparência Nativa · compliant by design',
    layer2Tag: 'Camada 02 · Escudo', layer2Title: 'Zero Alucinações',
    layer2Tagline: 'O Certificado de Verdade Criptográfica.',
    layer2Body: 'A única tecnologia que garante matematicamente que a IA não inventa preços ou regras. Se os dados forem modificados por um hacker, o sistema bloqueia automaticamente.',
    layer2Compliance: 'EU AI Act · Art. 10 · Data Provenance · Selo de Verdade',
    layer3Tag: 'Camada 03 · Ação', layer3Title: 'Vendas Automatizadas',
    layer3Tagline: 'Da Conversa à Transação.',
    layer3Body: 'Sua IA não apenas "fala", ela executa. Reserva mesas, vende produtos e recebe pagamentos via Stripe — sem você precisar mexer um dedo.',
    layer3Compliance: 'EU AI Act · M2M Audit Trail · Execução Certificada · X-AKL signature',
    layer4Tag: 'Camada 04 · Sentinel', layer4Title: 'Guarda Noturna',
    layer4Tagline: 'Monitoramento e Imunidade ao Vivo.',
    layer4Body: 'Um sistema que vigia 24/7. Se a IA começar a se comportar estranhamente ou seus dados "expirarem", o Sentinel conserta tudo instantaneamente ou bloqueia o acesso.',
    layer4Compliance: 'EU AI Act · Art. 9 · Ciclo de Gestão de Riscos · JWKS revogação em milissegundos',
    euReadySince: 'Pronto desde o lançamento',
    euReady: 'PRONTO',
    euBody: 'Documentação técnica, cabeçalhos de transparência, proveniência de dados e gestão de riscos — implementados nativamente no CatyAI.',
    euDeadline: 'Prazo: 2 agosto 2026 · Compliance by design, não add-on',
    euArt9: 'Artigo 9 · Gestão de Riscos', euArt10: 'Artigo 10 · Governança de Dados',
    euArt50: 'Artigo 50 · Transparência', euArt52: 'Artigo 52 · Divulgação',
    testimonialsLabel: 'Depoimentos', testimonialsTitle: '4.8★ no Google · 47 avaliações',
    industriesLabel: 'Indústrias', industriesTitle: 'Usado em', industriesAccent: '14 verticais',
    ind1: 'Clínicas Médicas', ind2: 'Restaurantes', ind3: 'Real Estate',
    ind4: 'Salões de Beleza', ind5: 'Oficinas Auto', ind6: 'Educação',
    ind7: 'E-commerce', ind8: 'Serviços B2B',
    faqLabel: 'Perguntas Frequentes', faqTitle: 'Perguntas frequentes',
    faq1Q: 'Quanto tempo leva a configuração?',
    faq1A: '2-5 minutos. Conecte o WhatsApp Business ou adicione o widget com uma tag de script no seu site. A IA aprende automaticamente do conteúdo do seu site (auto-crawl).',
    faq2Q: 'O que acontece com os dados dos meus clientes?',
    faq2A: 'Totalmente compatível com GDPR. Os dados são armazenados no AWS eu-west-1 (Irlanda), criptografados em repouso com AWS KMS. Excluímos os dados mediante solicitação em até 24h.',
    faq3Q: 'Posso integrar com meu CRM existente?',
    faq3A: 'Sim. Integrações nativas: HubSpot, Pipedrive, Salesforce, Zoho. Personalizado via webhook + API REST documentado em docs.catyai.io.',
    faq4Q: 'Como se diferencia de outros chatbots?',
    faq4A: 'Três coisas: (1) FraudAI Shield — o único com proteção anti-phishing nativa. (2) Multi-agente — 8 agentes especializados. (3) GEO Gateway — seu site fica visível para ChatGPT/Perplexity.',
    faq5Q: 'Existe plano gratuito?',
    faq5A: 'Sim — 100 sessões/mês grátis, sem cartão. Inclui FraudAI Shield básico e chat. Para crescer: Starter €49/mês, Growth €99, Business €199, Enterprise €499.',
    ctaTitle1: 'Não vendemos', ctaStrike: 'chatbots', ctaTitle2: 'Instalamos', ctaAccent: 'infraestrutura',
    ctaSubtitle: 'Comece grátis. Configuração em 2 minutos. Sem cartão.', ctaBtn: 'Configuração gratuita agora',
    footerTagline: 'Intel GEO semanal,\nantes da concorrência.',
    footerNewsletter: 'Atualizações mensais sobre busca IA, comportamento LLM, protocolo CatyAI. Sem spam.',
    footerNoSpam: 'Sem spam · GDPR compliant · Cancelar a qualquer momento',
    footerDesc: 'Infraestrutura neural para internet IA. Garantimos que GPTBot, ClaudeBot e Perplexity recomendem você.',
    footerProduct: 'Produto', footerResources: 'Recursos', footerCompany: 'Empresa', footerLegal: 'Legal',
    footerPricing: 'Preços', footerDocs: 'Documentação', footerAbout: 'Sobre',
    footerCareers: 'Carreiras', footerTerms: 'Termos', footerSecurity: 'Segurança',
    prod1Name: 'Web Widget', prod1Tagline: 'O cliente pergunta. A IA vende.',
    prod1F1: 'Conversa 24/7 no site e WhatsApp', prod1F2: 'Responde com dados reais do seu catálogo', prod1F3: 'Agendamentos, leads, orçamentos PDF', prod1F4: 'FraudAI Shield incluído padrão', prod1Cta: 'Detalhes Widget',
    prod2Name: 'FraudAI Shield', prod2Tagline: 'Os golpes não chegam ao cliente.',
    prod2F1: '8 módulos de detecção anti-phishing', prod2F2: 'Bloqueia prompt injection', prod2F3: 'Impede a personificação da marca', prod2F4: 'Conversas limpas, marca intacta', prod2Cta: 'Detalhes FraudAI',
    prod3Name: 'GEO Gateway', prod3Tagline: 'Torne-se a resposta, não a nota de rodapé.',
    prod3F1: 'llms.txt + JSON-LD + catálogo SSR', prod3F2: 'Lido por GPTBot, ClaudeBot, Perplexity', prod3F3: 'A IA cita você, não o concorrente', prod3F4: 'Visibilidade mensurável no painel', prod3Cta: 'Detalhes GEO',
    prod4Name: 'Trust Gateway', prod4Tagline: 'A IA não pode inventar o seu preço.',
    prod4F1: 'Cada resposta assinada criptograficamente', prod4F2: 'Verificável publicamente, grátis (JWKS)', prod4F3: 'Bloqueio automático em manipulação', prod4F4: 'Matemática, não promessas', prod4Cta: 'Detalhes Trust',
  },
  fr: {
    navLogin: 'Connexion', navCta: "Auditer la Visibilité",
    navTrustBenchmark: 'Trust Benchmark', navProtocol: 'Protocole', navPricing: 'Tarifs',
    heroLine1: 'Vos produits, trouvés sur Google et', heroAccent: 'cités par les agents IA.',
    heroSubtitle: "Ingénierie de catalogue, distribution CSS et visibilité IA. CatyAI rend votre catalogue lisible par ChatGPT, Perplexity et Gemini et verrouille vos prix réels cryptographiquement — pour que l'IA n'invente rien.",
    heroPlaceholder: 'https://votre-boutique.fr', heroBtn: 'Vérifier gratuitement',
    socialProof: "3,5M produits · 190 marchands actifs · Widget gratuit 14 jours, sans carte",
    scanCritical: 'Vulnérabilité critique détectée',
    scanLlm: 'Extraction données LLM :', scanLlmFail: 'Échoué (JS bloqué)',
    scanHalluc: "Risque d'hallucinations :", scanHallucVal: 'Extrême (>85%)',
    scanSig: 'Signature Ed25519 :', scanSigVal: 'Manquante', scanRepair: 'Réparer avec CatyAI',
    crawlersLabel: 'Optimisé pour',
    productsLabel: 'Une chaîne, pas quatre produits',
    productsTitle: 'De la question du client', productsTitleAccent: 'à la vente prouvée.',
    productsSub: "Chaque maillon résout une partie. Séparés, ce sont des outils. Ensemble, c'est la seule infrastructure qui mène une citation IA jusqu'à une transaction prouvée.",
    chainLinkLabel: 'Maillon',
    chainEndTitle: "L'offre principale :", chainEndAccent: 'Commerce Distribution',
    chainEndBody: 'Vos produits, trouvés sur Google et cités par les agents IA — ingénierie de catalogue, distribution CSS, visibilité IA. Setup unique + abonnement mensuel, grille transparente.',
    chainEndCta: "Voir l'offre complète",
    chainEndCta2: 'Le marketplace live ↗',
    howLabel: 'Comment ça fonctionne', howTitle: 'Trois étapes.', howAccent: 'processus sans code.',
    layer1Tag: 'Couche 01 · Antenne', layer1Title: 'Visibilité IA',
    layer1Tagline: 'Rendez votre entreprise lisible par les robots.',
    layer1Body: "ChatGPT et Gemini ne \"voient\" pas votre site comme une photo. Nous installons l'antenne qui leur livre vos données officielles directement dans le cerveau — éliminant les suppositions et les hallucinations.",
    layer1Compliance: 'EU AI Act · Art. 50 + 52 · Transparence Native · compliant by design',
    layer2Tag: 'Couche 02 · Bouclier', layer2Title: 'Zéro Hallucination',
    layer2Tagline: 'Le Certificat de Vérité Cryptographique.',
    layer2Body: "La seule technologie qui garantit mathématiquement que l'IA n'invente pas de prix ou de règles. Si les données sont modifiées par un hacker, le système se bloque automatiquement.",
    layer2Compliance: 'EU AI Act · Art. 10 · Data Provenance · Sceau de Vérité',
    layer3Tag: 'Couche 03 · Action', layer3Title: 'Ventes Automatisées',
    layer3Tagline: 'De la Conversation à la Transaction.',
    layer3Body: "Votre IA ne fait pas que \"parler\", elle exécute. Réserve des tables, vend des produits et encaisse des paiements via Stripe — sans que vous ayez à lever le petit doigt.",
    layer3Compliance: 'EU AI Act · M2M Audit Trail · Exécution Certifiée · X-AKL signature',
    layer4Tag: 'Couche 04 · Sentinel', layer4Title: 'Garde de Nuit',
    layer4Tagline: 'Surveillance et Immunité en Direct.',
    layer4Body: "Un système qui veille 24/7. Si l'IA commence à se comporter étrangement ou si vos données \"expirent\", Sentinel répare tout instantanément ou bloque l'accès.",
    layer4Compliance: 'EU AI Act · Art. 9 · Cycle de Gestion des Risques · révocation JWKS en millisecondes',
    euReadySince: 'Prêt dès le lancement',
    euReady: 'PRÊT',
    euBody: 'Documentation technique, en-têtes de transparence, provenance des données et gestion des risques — implémentés nativement dans CatyAI.',
    euDeadline: 'Échéance : 2 août 2026 · Compliance by design, pas un add-on',
    euArt9: 'Article 9 · Gestion des Risques', euArt10: 'Article 10 · Gouvernance des Données',
    euArt50: 'Article 50 · Transparence', euArt52: 'Article 52 · Divulgation',
    testimonialsLabel: 'Témoignages', testimonialsTitle: '4.8★ sur Google · 47 avis',
    industriesLabel: 'Industries', industriesTitle: 'Utilisé dans', industriesAccent: '14 secteurs',
    ind1: 'Cliniques Médicales', ind2: 'Restaurants', ind3: 'Immobilier',
    ind4: 'Salons de Beauté', ind5: 'Garages Auto', ind6: 'Éducation',
    ind7: 'E-commerce', ind8: 'Services B2B',
    faqLabel: 'Questions Fréquentes', faqTitle: 'Questions fréquentes',
    faq1Q: 'Combien de temps dure la configuration ?',
    faq1A: "2-5 minutes. Connectez WhatsApp Business ou ajoutez le widget avec une balise script sur votre site. L'IA apprend automatiquement du contenu de votre site (auto-crawl).",
    faq2Q: 'Que se passe-t-il avec les données de mes clients ?',
    faq2A: 'Entièrement conforme au RGPD. Les données sont stockées dans AWS eu-west-1 (Irlande), chiffrées au repos avec AWS KMS. Suppression des données sur demande en max 24h.',
    faq3Q: 'Puis-je intégrer avec mon CRM existant ?',
    faq3A: 'Oui. Intégrations natives : HubSpot, Pipedrive, Salesforce, Zoho. Personnalisé via webhook + API REST documentée sur docs.catyai.io.',
    faq4Q: 'Comment se différencie-t-il des autres chatbots ?',
    faq4A: "Trois choses : (1) FraudAI Shield — le seul avec protection anti-phishing native. (2) Multi-agent — 8 agents spécialisés. (3) GEO Gateway — votre site devient visible pour ChatGPT/Perplexity.",
    faq5Q: 'Y a-t-il un plan gratuit ?',
    faq5A: 'Oui — 100 sessions/mois gratuites, sans carte. Inclut FraudAI Shield basique et chat. Pour grandir : Starter 49€/mois, Growth 99€, Business 199€, Enterprise 499€.',
    ctaTitle1: 'Nous ne vendons pas de', ctaStrike: 'chatbots', ctaTitle2: 'Nous installons', ctaAccent: "l'infrastructure",
    ctaSubtitle: 'Commencez gratuitement. Configuration en 2 minutes. Sans carte.', ctaBtn: 'Configuration gratuite maintenant',
    footerTagline: 'Intel GEO hebdomadaire,\navant la concurrence.',
    footerNewsletter: 'Mises à jour mensuelles sur la recherche IA, le comportement LLM, le protocole CatyAI. Sans spam.',
    footerNoSpam: 'Sans spam · Conforme RGPD · Désabonnement à tout moment',
    footerDesc: "Infrastructure neurale pour l'internet IA. Nous nous assurons que GPTBot, ClaudeBot et Perplexity vous recommandent.",
    footerProduct: 'Produit', footerResources: 'Ressources', footerCompany: 'Entreprise', footerLegal: 'Légal',
    footerPricing: 'Tarifs', footerDocs: 'Documentation', footerAbout: 'À propos',
    footerCareers: 'Carrières', footerTerms: 'Conditions', footerSecurity: 'Sécurité',
    prod1Name: 'Web Widget', prod1Tagline: "Le client demande. L'IA vend.",
    prod1F1: "Conversation 24/7 sur site et WhatsApp", prod1F2: 'Répond avec les données réelles de votre catalogue', prod1F3: 'Réservations, leads, devis PDF', prod1F4: 'FraudAI Shield inclus en standard', prod1Cta: 'Détails Widget',
    prod2Name: 'FraudAI Shield', prod2Tagline: "Les arnaques n'atteignent pas le client.",
    prod2F1: '8 modules de détection anti-phishing', prod2F2: 'Bloque le prompt injection', prod2F3: "Stoppe l'usurpation de marque", prod2F4: 'Conversations propres, marque intacte', prod2Cta: 'Détails FraudAI',
    prod3Name: 'GEO Gateway', prod3Tagline: 'Devenez la réponse, pas la note de bas de page.',
    prod3F1: 'llms.txt + JSON-LD + catalogue SSR', prod3F2: 'Lu par GPTBot, ClaudeBot, Perplexity', prod3F3: "L'IA vous cite, pas votre concurrent", prod3F4: 'Visibilité mesurable dans le tableau de bord', prod3Cta: 'Détails GEO',
    prod4Name: 'Trust Gateway', prod4Tagline: "L'IA ne peut pas inventer votre prix.",
    prod4F1: 'Chaque réponse signée cryptographiquement', prod4F2: 'Vérifiable publiquement, gratuit (JWKS)', prod4F3: 'Blocage automatique en cas de manipulation', prod4F4: "Des maths, pas des promesses", prod4Cta: 'Détails Trust',
  },
};

const LANG_OPTIONS = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ro', label: 'RO', flag: '🇷🇴' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

function LanguageSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = LANG_OPTIONS.find(o => o.code === lang) || LANG_OPTIONS[0];
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 bg-transparent border border-white/10 text-slate-400 rounded-md px-2 py-1 text-xs cursor-pointer hover:border-white/30 hover:text-white transition-colors"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <i data-lucide="chevron-down" className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 rounded-lg border border-white/10 overflow-hidden shadow-xl"
             style={{background: 'rgba(1,10,31,0.97)', backdropFilter: 'blur(12px)', minWidth: '90px'}}>
          {LANG_OPTIONS.map(opt => (
            <button key={opt.code}
              onClick={() => { setLang(opt.code); localStorage.setItem('caty-lang', opt.code); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-white/10 transition-colors ${lang === opt.code ? 'text-gold' : 'text-slate-300'}`}
            >
              <span>{opt.flag}</span><span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [scannedUrl, setScannedUrl] = useState('');

  const stackContainerRef = useRef(null);

  const [lang, setLang] = useState(localStorage.getItem('caty-lang') || 'ro');
  const t = translations[lang] || translations.ro;

  // Initialize Lucide icons after mount
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  // Stacking cards scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.stack-card');
      const total = cards.length;
      cards.forEach((card, idx) => {
        const inner = card.querySelector('.stack-card-inner');
        if (!inner) return;
        const rect = card.getBoundingClientRect();
        const stickyTopPx = window.innerHeight * 0.10;
        const distance = stickyTopPx - rect.top;
        const threshold = window.innerHeight * 0.5;
        const baseScale = 1 - (idx * 0.03);
        if (distance > 0 && idx < total - 1) {
          const progress = Math.min(distance / threshold, 1);
          const scale = baseScale - (progress * 0.05);
          inner.style.transform = `scale(${scale})`;
        } else {
          inner.style.transform = `scale(${baseScale})`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScan = (e) => {
    e.preventDefault();
    if (!scannedUrl.trim()) return;
    navigate(`/check?url=${encodeURIComponent(scannedUrl.trim())}`);
  };

  return (
    <>
      <SEO
        url="https://catyai.io/"
        description="The first native Agentic Marketplace. CatyAI's engines transform e-commerce catalogs so any AI assistant can read and transact with them directly."
        image="https://catyai.io/og-image.png?v=20260508"
        service={{
          name: 'CatyAI Platform',
          description: 'Cryptographic infrastructure that prevents AI assistants from inventing claims about your business. Ed25519 signed responses, JWKS public key verification, NAP Zero-Trust architecture, EU AI Act aligned.',
          features: [
            'Ed25519 cryptographic signatures (RFC 8032)',
            'JWKS public key verification (RFC 7517)',
            'RFC 8785 JCS canonicalization',
            'EU AI Act compliance (Articles 10, 50, 52)',
            'Live verifiable production endpoint at api.catyai.io'
          ]
        }}
      />
      <Helmet>
        <title>CatyAI — Stop AI From Lying About Your Business</title>
        <html lang="en" />
        <meta name="author" content="PayAi-X FZE" />
        <meta name="keywords" content="AI sales romania, FraudAI Shield, chatbot securizat, protectie frauda AI, multi-agent AI, 8 agenti AI, CatyAI, WhatsApp AI securizat, AI anti-phishing, chatbot sigur romania, fraud detection AI, lead scoring AI, AI sales agent romania" />
        <meta property="og:title" content="CatyAI — Stop AI From Lying About Your Business" />
        <meta property="og:description" content="If AI can't read your business, you no longer exist. CatyAI transforms your digital presence into a cryptographically verified Neural Node." />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="CatyAI — cryptographic infrastructure that prevents AI assistants from inventing claims about your business" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ro_RO" />
        <meta property="fb:app_id" content="1532216557847516" />
        <meta name="twitter:url" content="https://catyai.io/" />
        <meta name="twitter:title" content="CatyAI — Stop AI From Lying About Your Business" />
        <meta name="twitter:description" content="AI invents prices and policies your business never approved. CatyAI cryptographically signs your data — AI can only say what you authorized. Live in production." />
      </Helmet>
      <style>{`
body {
            background-color: #010A1F;
            color: #f8fafc;
            background-image:
                radial-gradient(circle at 50% 0%, rgba(200, 161, 101, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.04) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(200, 161, 101, 0.05) 0%, transparent 50%);
            background-attachment: fixed;
        }

        /* ================ NAV ================ */
        .glass-nav {
            background: rgba(1, 10, 31, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* ================ BADGES & BUTTONS ================ */
        .badge-glow {
            box-shadow: 0 0 20px rgba(200, 161, 101, 0.2);
            border: 1px solid rgba(200, 161, 101, 0.3);
            background: rgba(200, 161, 101, 0.1);
        }

        .btn-primary {
            background: #C8A165;
            color: #010A1F;
            transition: all 0.2s ease;
            box-shadow: 0 4px 20px rgba(200, 161, 101, 0.25);
        }
        .btn-primary:hover {
            background: #D4B57A;
            transform: translateY(-1px);
            box-shadow: 0 6px 28px rgba(200, 161, 101, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #f8fafc;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(200, 161, 101, 0.3);
        }

        /* ================ CARDS ================ */
        .card {
            position: relative;
            background: rgba(10, 27, 61, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            transition: all 0.3s ease;
            overflow: visible;
        }
        .card:hover {
            border-color: rgba(166, 130, 70, 0.4);
            background: rgba(10, 27, 61, 0.6);
            transform: translateY(-2px);
        }

        /* ================ UNIVERSAL GOLD-DARK BLUR GLOW ================ */
        /* Applied page-wide on every card. NOTE: stack-card uses parent for glow because .stack-card-inner has overflow:hidden */
        :root {
            --gold-dark: #A68246;
            --gold-dark-rgb: 166, 130, 70;
        }
        .card,
        .card-product,
        .ai-card,
        .stack-card,
        .testimonial-card,
        .industry-card,
        .faq-item {
            position: relative;
        }
        .card::after,
        .card-product::after,
        .ai-card::after,
        .testimonial-card::after,
        .industry-card::after,
        .faq-item::after {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            background: radial-gradient(
                circle at 50% 0%,
                rgba(var(--gold-dark-rgb), 0.18) 0%,
                rgba(var(--gold-dark-rgb), 0.08) 30%,
                transparent 70%
            );
            filter: blur(24px);
            opacity: 0.5;
            z-index: -1;
            pointer-events: none;
            transition: opacity 0.4s ease, filter 0.4s ease;
        }
        .card:hover::after,
        .card-product:hover::after,
        .ai-card:hover::after,
        .testimonial-card:hover::after,
        .industry-card:hover::after,
        .faq-item:hover::after {
            opacity: 1;
            filter: blur(36px);
        }
        /* Stack-card glow goes on parent (inner has overflow:hidden) */
        .stack-card {
            isolation: isolate;
        }
        .stack-card::before {
            content: '';
            position: absolute;
            inset: 1rem;
            border-radius: 28px;
            background: radial-gradient(
                ellipse at 50% 50%,
                rgba(var(--gold-dark-rgb), 0.15) 0%,
                rgba(var(--gold-dark-rgb), 0.05) 40%,
                transparent 75%
            );
            filter: blur(40px);
            opacity: 0.6;
            z-index: -1;
            pointer-events: none;
        }

        /* ================ STACKING CARDS — Taithon spec ================ */
        /* Sticky positioning · top 10vh · margin-bottom 20vh · progressive scale */
        .stack-card {
            position: sticky;
            top: 10vh;
            margin-bottom: 20vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 1.5rem;
            will-change: transform;
        }
        .stack-card-inner {
            width: 100%;
            max-width: 1100px;
            border-radius: 28px;
            background: linear-gradient(180deg, rgba(10, 27, 61, 0.97) 0%, rgba(1, 10, 31, 0.99) 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
                0 30px 80px -20px rgba(0, 0, 0, 0.8),
                0 0 0 1px rgba(255, 255, 255, 0.02) inset;
            padding: 4rem 3.5rem;
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            transform-origin: 50% 0%;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
        }
        .stack-card-inner::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(200, 161, 101, 0.4), transparent);
        }
        /* Progressive scale per index — JS adds offset on scroll, this is the rest state */
        .stack-card[data-index="0"] .stack-card-inner { transform: scale(1); }
        .stack-card[data-index="1"] .stack-card-inner { transform: scale(0.97); }
        .stack-card[data-index="2"] .stack-card-inner { transform: scale(0.94); }
        .stack-card[data-index="3"] .stack-card-inner { transform: scale(0.91); }

        /* Taithon Typography — title fills 40-50% of card width, minimalist */
        .stack-card-inner h3 {
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            font-weight: 700;
            letter-spacing: -0.04em;
            line-height: 0.95;
            max-width: 50%;
        }
        .stack-card-inner .layer-tagline {
            font-size: clamp(1.1rem, 1.6vw, 1.5rem);
            color: #C8A165;
            font-weight: 500;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            letter-spacing: -0.01em;
        }
        .stack-card-inner .layer-body {
            font-size: 1.05rem;
            color: #94a3b8;
            line-height: 1.65;
            max-width: 90%;
        }
        .stack-card-inner .compliance-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1.5rem;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            background: rgba(200, 161, 101, 0.06);
            border: 1px solid rgba(200, 161, 101, 0.18);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.78rem;
            color: #D4B57A;
            line-height: 1.5;
            max-width: 100%;
        }

        @media (max-width: 768px) {
            .stack-card-inner { padding: 2rem; border-radius: 20px; }
            .stack-card { padding: 1rem; margin-bottom: 10vh; }
            .stack-card-inner h3 { max-width: 100%; font-size: 2.25rem; }
            .stack-card-inner .layer-body { max-width: 100%; }
        }

        .card-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.9rem;
            border-radius: 999px;
            background: rgba(200, 161, 101, 0.08);
            border: 1px solid rgba(200, 161, 101, 0.2);
            color: #D4B57A;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
        }

        /* ================ MARQUEE ================ */
        .marquee {
            display: flex;
            gap: 4rem;
            animation: scroll-x 30s linear infinite;
            opacity: 0.5;
        }
        .marquee-reviews {
            display: flex;
            gap: 1.5rem;
            animation: scroll-reviews 40s linear infinite;
        }
        .marquee-reviews:hover { animation-play-state: paused; }
        @keyframes scroll-x {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        @keyframes scroll-reviews {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }

        /* ================ FAQ ACCORDION ================ */
        .faq-item summary {
            list-style: none;
            cursor: pointer;
            padding: 1.5rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item[open] summary .faq-icon { transform: rotate(45deg); }
        .faq-icon { transition: transform 0.3s ease; }

        /* ================ EXPOSED FOOTER ================ */
        .footer-wordmark {
            font-size: clamp(6rem, 22vw, 22rem);
            font-weight: 900;
            letter-spacing: -0.06em;
            line-height: 0.85;
            background: linear-gradient(180deg, rgba(248, 250, 252, 0.08) 0%, rgba(200, 161, 101, 0.18) 50%, rgba(1, 10, 31, 0.95) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            user-select: none;
            white-space: nowrap;
        }

        .footer-link {
            color: #94a3b8;
            transition: color 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .footer-link:hover { color: #D4B57A; }
        .footer-link i { opacity: 0; transform: translateX(-4px); transition: all 0.2s ease; }
        .footer-link:hover i { opacity: 1; transform: translateX(0); color: #C8A165; }

        .footer-col-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #64748b;
            margin-bottom: 1.5rem;
        }

        .social-icon {
            width: 40px; height: 40px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            display: inline-flex; align-items: center; justify-content: center;
            color: #94a3b8;
            transition: all 0.2s ease;
        }
        .social-icon:hover {
            background: rgba(200, 161, 101, 0.1);
            border-color: rgba(200, 161, 101, 0.3);
            color: #C8A165;
            transform: translateY(-2px);
        }

        .newsletter-input {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.2s ease;
        }
        .newsletter-input:focus {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(200, 161, 101, 0.4);
            outline: none;
        }

        .status-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 12px #10b981;
            animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* ================ HERO FULLSCREEN BACKGROUND ================ */
        .hero-fullscreen {
            position: relative;
            height: 92vh;
            min-height: 600px;
            max-height: 980px;
            display: flex;
            align-items: center;
            overflow: hidden;
            padding-top: 6rem;
        }
        .hero-bg-image {
            position: absolute;
            inset: 0;
            background-image: url('/hero-neural-node.webp');
            background-size: cover;
            background-position: 65% center;
            background-repeat: no-repeat;
            z-index: 0;
        }
        .hero-bg-overlay {
            position: absolute;
            inset: 0;
            background:
                linear-gradient(to bottom,
                    transparent 60%,
                    rgba(1, 10, 31, 0.85) 80%,
                    rgb(1, 10, 31) 100%
                ),
                linear-gradient(90deg,
                    rgba(1, 10, 31, 0.92) 0%,
                    rgba(1, 10, 31, 0.78) 30%,
                    rgba(1, 10, 31, 0.30) 55%,
                    rgba(1, 10, 31, 0.10) 80%,
                    rgba(1, 10, 31, 0.40) 100%
                ),
                radial-gradient(ellipse at 70% 50%,
                    transparent 30%,
                    rgba(1, 10, 31, 0.4) 100%
                );
            z-index: 1;
        }
        .hero-content {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }
        .hero-content-inner {
            max-width: 640px;
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .hero-content-inner { max-width: 680px; }
        }

        .hero-title {
            font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
            font-style: normal;
            font-weight: 800;
            font-size: clamp(3rem, 6.5vw, 6.5rem);
            line-height: 1.05;
            letter-spacing: -0.03em;
            text-transform: none;
            text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
        }
        .hero-title-line-1 {
            display: block;
            color: #f1f5f9;
            text-transform: none;
        }
        .hero-title-accent {
            display: block;
            color: #C8A165;
            position: relative;
            margin-top: 0.25rem;
            text-transform: none;
        }
        .hero-title-accent::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0.05em;
            width: 70%;
            height: 1px;
            background: linear-gradient(90deg, rgba(200, 161, 101, 0.7), rgba(200, 161, 101, 0.05));
        }
        .hero-subtitle {
            font-size: 1.125rem;
            line-height: 1.65;
            color: #cbd5e1;
            font-weight: 300;
            max-width: 560px;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
        }

        .hero-image-label {
            position: absolute;
            top: 6.5rem;
            right: 2rem;
            z-index: 3;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.55rem 0.95rem;
            background: rgba(1, 10, 31, 0.7);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(200, 161, 101, 0.25);
            border-radius: 999px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            color: #f8fafc;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        @media (max-width: 767px) {
            .hero-bg-overlay {
                background: linear-gradient(180deg,
                    rgba(1, 10, 31, 0.7) 0%,
                    rgba(1, 10, 31, 0.85) 50%,
                    rgba(1, 10, 31, 0.95) 100%);
            }
            .hero-image-label { display: none; }
        }

        /* ================ PRODUCT CARDS — 4 COLUMNS ================ */
        .card-chain-num {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.68rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #C8A165;
            margin-bottom: 0.9rem;
            opacity: 0.9;
        }
        .card-marketplace {
            background: linear-gradient(135deg, rgba(200, 161, 101, 0.12), rgba(200, 161, 101, 0.03));
            border: 1px solid rgba(200, 161, 101, 0.28);
            border-radius: 18px;
            padding: 2.25rem 2.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            flex-wrap: wrap;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-marketplace:hover {
            border-color: rgba(200, 161, 101, 0.45);
            box-shadow: 0 20px 50px -15px rgba(200, 161, 101, 0.2);
        }
        .card-marketplace-text { flex: 1; min-width: 280px; }
        .card-product {
            position: relative;
            background: rgba(10, 27, 61, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 2rem 1.5rem 1.75rem;
            display: flex;
            flex-direction: column;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-product:hover {
            background: rgba(10, 27, 61, 0.7);
            border-color: rgba(200, 161, 101, 0.25);
            transform: translateY(-4px);
            box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.5);
        }
        .card-product-popular {
            background: linear-gradient(180deg, rgba(200, 161, 101, 0.08) 0%, rgba(10, 27, 61, 0.6) 100%);
            border-color: rgba(200, 161, 101, 0.35);
            box-shadow: 0 20px 50px -15px rgba(200, 161, 101, 0.18);
        }
        .card-product-popular:hover {
            border-color: rgba(200, 161, 101, 0.5);
            box-shadow: 0 25px 60px -15px rgba(200, 161, 101, 0.28);
        }
        .card-product-badge {
            position: absolute;
            top: -10px;
            right: 16px;
            background: linear-gradient(90deg, #C8A165, #D4B57A);
            color: #010A1F;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.65rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            padding: 0.35rem 0.7rem;
            border-radius: 999px;
            box-shadow: 0 4px 12px -2px rgba(200, 161, 101, 0.5);
        }
        .card-product-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            border: 1px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
        }
        .card-product-title {
            font-size: 1.35rem;
            font-weight: 700;
            color: #f8fafc;
            letter-spacing: -0.01em;
            margin-bottom: 0.35rem;
        }
        .card-product-tagline {
            font-size: 0.875rem;
            color: #94a3b8;
            margin-bottom: 1.25rem;
            min-height: 2.6em;
        }
        .card-product-price {
            display: flex;
            align-items: baseline;
            gap: 0.4rem;
            padding: 0.875rem 0;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            margin-bottom: 1.25rem;
        }
        .price-amount {
            font-size: 2rem;
            font-weight: 800;
            color: #f8fafc;
            letter-spacing: -0.02em;
            line-height: 1;
        }
        .price-amount-free {
            font-size: 1.6rem;
            font-weight: 800;
            background: linear-gradient(90deg, #22c55e, #4ade80);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: -0.02em;
            line-height: 1;
        }
        .price-amount-pro {
            font-size: 1.6rem;
            font-weight: 800;
            background: linear-gradient(90deg, #C8A165, #D4B57A);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: -0.02em;
            line-height: 1;
        }
        .price-period {
            font-size: 0.875rem;
            color: #64748b;
            font-family: 'JetBrains Mono', monospace;
        }
        .card-product-features {
            list-style: none;
            padding: 0;
            margin: 0 0 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            flex-grow: 1;
        }
        .card-product-features li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: #cbd5e1;
        }
        .card-product-cta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.85rem 1rem;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #f8fafc;
            font-size: 0.875rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.25s ease;
        }
        .card-product-cta:hover {
            background: rgba(200, 161, 101, 0.08);
            border-color: rgba(200, 161, 101, 0.4);
            color: #C8A165;
        }
        .card-product-cta-primary {
            background: linear-gradient(90deg, #C8A165, #D4B57A);
            color: #010A1F;
            font-weight: 700;
            border-color: transparent;
            box-shadow: 0 8px 24px -8px rgba(200, 161, 101, 0.5);
        }
        .card-product-cta-primary:hover {
            background: linear-gradient(90deg, #D4B57A, #C8A165);
            color: #010A1F;
            transform: translateY(-1px);
            box-shadow: 0 12px 30px -8px rgba(200, 161, 101, 0.7);
        }

        /* ================ AI CRAWLER CAROUSEL ================ */
        .ai-carousel-wrapper {
            margin-top: 6rem;
            width: 100%;
            max-width: 1400px;
            margin-left: auto;
            margin-right: auto;
            overflow: hidden;
            padding: 1.5rem 0;
            position: relative;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .ai-carousel-track {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 24px;
            width: max-content;
            animation: ai-carousel-scroll 30s linear infinite;
        }
        .ai-carousel-wrapper:hover .ai-carousel-track {
            animation-play-state: paused;
        }
        @keyframes ai-carousel-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-224px * 6)); }
        }

        .ai-card {
            position: relative;
            flex-shrink: 0;
            width: 200px;
            background: rgba(10, 27, 61, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 1.75rem 1.25rem 1.5rem;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: visible;
        }
        /* Brand-colored glow blur — shows behind each card */
        .ai-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 70%;
            background: radial-gradient(circle at center, rgba(var(--brand, 200, 161, 101), 0.35) 0%, transparent 70%);
            filter: blur(28px);
            opacity: 0.6;
            z-index: -1;
            pointer-events: none;
            transition: opacity 0.4s ease, filter 0.4s ease;
        }
        .ai-card:hover {
            background: rgba(10, 27, 61, 0.85);
            border-color: rgba(var(--brand, 200, 161, 101), 0.45);
            transform: translateY(-6px);
            box-shadow:
                0 20px 50px -15px rgba(0, 0, 0, 0.6),
                0 0 30px -5px rgba(var(--brand, 200, 161, 101), 0.4);
        }
        .ai-card:hover::before {
            opacity: 1;
            filter: blur(40px);
        }
        .ai-card-icon {
            position: relative;
            width: 64px;
            height: 64px;
            border-radius: 16px;
            background: rgba(var(--brand, 200, 161, 101), 0.08);
            border: 1px solid rgba(var(--brand, 200, 161, 101), 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.1rem;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ai-card:hover .ai-card-icon {
            transform: scale(1.1);
            border-color: rgba(var(--brand, 200, 161, 101), 0.55);
            box-shadow: 0 0 24px -2px rgba(var(--brand, 200, 161, 101), 0.5);
        }
        .ai-card-name {
            color: #f8fafc;
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: -0.01em;
            margin-bottom: 0.3rem;
        }
        .ai-card-status {
            color: #64748b;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.7rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        @keyframes loading {
            0% { left: -30%; }
            100% { left: 100%; }
        }
        #loading-state .h-0\.5 > div {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
        }

        /* ================ REVEAL ================ */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ============== NAV — GlobalHeader ============== */}
          <GlobalHeader lang={lang} setLang={setLang} />

          {/* ============== 1. HERO ============== */}
          <section id="hero" className="hero-fullscreen">

              <div className="hero-bg-image"></div>
              <div className="hero-bg-overlay"></div>

              <div className="hero-content">
                  <div className="hero-content-inner">
                      <h1 className="hero-title mb-6">
                          <span className="hero-title-line-1">{t.heroLine1}</span>
                          <span className="hero-title-accent">{t.heroAccent}</span>
                      </h1>

                      <p className="hero-subtitle mb-10">
                          {t.heroSubtitle}
                      </p>

                      <div className="w-full max-w-xl relative">
                          <div className="relative z-20 rounded-xl p-2 border border-white/10 shadow-2xl"
                               style={{background: 'rgba(1, 10, 31, 0.7)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)'}}>

                                <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-2 relative">
                                    <div className="relative flex-grow">
                                        <i data-lucide="globe" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                        <input type="url" value={scannedUrl} onChange={(e) => setScannedUrl(e.target.value)} placeholder={t.heroPlaceholder} required
                                            className="w-full bg-navy/50 border border-transparent text-white placeholder-slate-500 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all font-mono text-sm" />
                                    </div>
                                    <button type="submit" className="btn-primary px-6 py-4 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap font-bold">
                                        {t.heroBtn} <i data-lucide="arrow-up-right" className="w-4 h-4" />
                                    </button>
                                </form>
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent blur-xl z-0 opacity-50"></div>
                      </div>

                      <p className="mt-8 text-sm text-slate-300 flex items-center gap-2 font-medium" style={{textShadow: '0 1px 8px rgba(0,0,0,0.6)'}}>
                          <i data-lucide="shield-check" className="w-4 h-4 text-emerald-400" />
                          {t.socialProof}
                      </p>
                  </div>
              </div>

              <div className="hero-image-label">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Neural Node · Live
              </div>

          </section>

          <section className="ai-crawlers-section max-w-6xl mx-auto px-6 mt-32">
              <div className="text-center mb-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-mono mb-3">{t.crawlersLabel}</p>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">AI Crawlers · Live Compatibility</h3>
              </div>

                  <div className="ai-carousel-wrapper">
                      <div className="ai-carousel-track">
                          <div className="ai-card" style={{'--brand': '16, 163, 127'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
                              </div>
                              <div className="ai-card-name">GPTBot</div>
                              <div className="ai-card-status">OpenAI</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '204, 120, 92'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#CC785C" d="M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.158-.134-.097-.103-.097-2.358-1.596-2.552-1.688-1.336-.97-.722-.493-.365-.462-.158-1.008.656-.722.881.06.225.061.892.686 1.908 1.476 2.491 1.834.365.304.146-.103.018-.073-.164-.274-1.355-2.45-1.446-2.49-.644-1.032-.17-.617a2.95 2.95 0 0 1-.103-.726L4.262 0l.42-.134.973.243.413.358.609 1.39.985 2.193 1.524 2.97.444.879.237.81.09.249h.152V8.85l.122-1.633.231-2.005.225-2.582.073-.728.346-.838.683-.452.535.255.439.633-.061.408-.262 1.696-.51 2.65-.327 1.776h.194l.213-.213.864-1.146 1.45-1.815 1.14-1.282.661-.722.158-.122h.328l.243.358-.158.371-.494.625-1.104 1.43-2.354 3.169-.371.541.36-.018h2.193l1.39.207.255.103.146.243-.085.486-.249.122-.401.243-1.55.55-1.836.486-1.196.231-1.45-.073-.474-.073-1.476-.219-.292.103-.146.231-.231-.158.18.444 1.282 2.46.997 1.852.255.523.073.353-.085.213-.06.146-.074.122-1.336-.523-1.336-.681-.998-.62-2.25-1.293-1.355-1.111-.219.012-1.366-2.04-1.014-1.476-.377-.225-.36.085-.097.292.207.474.401.917.535.991.358.328-.073.55-.255.292-.085.413.158.292.243.602.146.62.073.572.085 1.45.219.547-.097.18-.213-.073-.158-.146-.146-.085-.401L7.97 15.7v-.255l-.024-.024-.286.219-.61.493-.717.499-.523.225-.535-.085-.158-.207-.158-.292-.158-.401-.146-.401-.292-.681-.293-.328-.499-.231-.475-.158-.158-.085L4.71 15.957z"/></svg>
                              </div>
                              <div className="ai-card-name">ClaudeBot</div>
                              <div className="ai-card-status">Anthropic</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '32, 184, 205'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#20B8CD" stroke-width="1.8"/><path d="M7 8 L7 16 L17 16 L17 8 Z M11 5 L11 19 M3 12 L21 12" stroke="#20B8CD" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
                              </div>
                              <div className="ai-card-name">PerplexityBot</div>
                              <div className="ai-card-status">Perplexity</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '146, 73, 218'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gem-grad-real" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1C7DFF"/><stop offset="50%" stop-color="#9F4DFF"/><stop offset="100%" stop-color="#FF44A8"/></linearGradient></defs><path d="M12 1.5 L13.85 9.65 L22 11.5 L13.85 13.35 L12 22.5 L10.15 13.35 L2 11.5 L10.15 9.65 Z" fill="url(#gem-grad-real)"/></svg>
                              </div>
                              <div className="ai-card-name">Gemini</div>
                              <div className="ai-card-status">Google</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '234, 67, 53'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                              </div>
                              <div className="ai-card-name">Google-Extended</div>
                              <div className="ai-card-status">Google AI</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '0, 120, 212'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bing-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00CACC"/><stop offset="100%" stop-color="#048FCE"/></linearGradient></defs><path d="M5.16 2 L9.84 3.6 L9.84 16.32 L15.84 13.92 L13.44 13.2 L11.52 8.4 L19.92 11.4 L19.92 17.4 L9.84 22.8 L5.16 20.4 Z" fill="url(#bing-grad)"/></svg>
                              </div>
                              <div className="ai-card-name">Bingbot</div>
                              <div className="ai-card-status">Microsoft</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '16, 163, 127'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#10A37F" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
                              </div>
                              <div className="ai-card-name">GPTBot</div>
                              <div className="ai-card-status">OpenAI</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '204, 120, 92'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#CC785C" d="M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.158-.134-.097-.103-.097-2.358-1.596-2.552-1.688-1.336-.97-.722-.493-.365-.462-.158-1.008.656-.722.881.06.225.061.892.686 1.908 1.476 2.491 1.834.365.304.146-.103.018-.073-.164-.274-1.355-2.45-1.446-2.49-.644-1.032-.17-.617a2.95 2.95 0 0 1-.103-.726L4.262 0l.42-.134.973.243.413.358.609 1.39.985 2.193 1.524 2.97.444.879.237.81.09.249h.152V8.85l.122-1.633.231-2.005.225-2.582.073-.728.346-.838.683-.452.535.255.439.633-.061.408-.262 1.696-.51 2.65-.327 1.776h.194l.213-.213.864-1.146 1.45-1.815 1.14-1.282.661-.722.158-.122h.328l.243.358-.158.371-.494.625-1.104 1.43-2.354 3.169-.371.541.36-.018h2.193l1.39.207.255.103.146.243-.085.486-.249.122-.401.243-1.55.55-1.836.486-1.196.231-1.45-.073-.474-.073-1.476-.219-.292.103-.146.231-.231-.158.18.444 1.282 2.46.997 1.852.255.523.073.353-.085.213-.06.146-.074.122-1.336-.523-1.336-.681-.998-.62-2.25-1.293-1.355-1.111-.219.012-1.366-2.04-1.014-1.476-.377-.225-.36.085-.097.292.207.474.401.917.535.991.358.328-.073.55-.255.292-.085.413.158.292.243.602.146.62.073.572.085 1.45.219.547-.097.18-.213-.073-.158-.146-.146-.085-.401L7.97 15.7v-.255l-.024-.024-.286.219-.61.493-.717.499-.523.225-.535-.085-.158-.207-.158-.292-.158-.401-.146-.401-.292-.681-.293-.328-.499-.231-.475-.158-.158-.085L4.71 15.957z"/></svg>
                              </div>
                              <div className="ai-card-name">ClaudeBot</div>
                              <div className="ai-card-status">Anthropic</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '32, 184, 205'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#20B8CD" stroke-width="1.8"/><path d="M7 8 L7 16 L17 16 L17 8 Z M11 5 L11 19 M3 12 L21 12" stroke="#20B8CD" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
                              </div>
                              <div className="ai-card-name">PerplexityBot</div>
                              <div className="ai-card-status">Perplexity</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '146, 73, 218'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gem-grad-real" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1C7DFF"/><stop offset="50%" stop-color="#9F4DFF"/><stop offset="100%" stop-color="#FF44A8"/></linearGradient></defs><path d="M12 1.5 L13.85 9.65 L22 11.5 L13.85 13.35 L12 22.5 L10.15 13.35 L2 11.5 L10.15 9.65 Z" fill="url(#gem-grad-real)"/></svg>
                              </div>
                              <div className="ai-card-name">Gemini</div>
                              <div className="ai-card-status">Google</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '234, 67, 53'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                              </div>
                              <div className="ai-card-name">Google-Extended</div>
                              <div className="ai-card-status">Google AI</div>
                          </div>
                          <div className="ai-card" style={{'--brand': '0, 120, 212'}}>
                              <div className="ai-card-icon">
                                  <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bing-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00CACC"/><stop offset="100%" stop-color="#048FCE"/></linearGradient></defs><path d="M5.16 2 L9.84 3.6 L9.84 16.32 L15.84 13.92 L13.44 13.2 L11.52 8.4 L19.92 11.4 L19.92 17.4 L9.84 22.8 L5.16 20.4 Z" fill="url(#bing-grad)"/></svg>
                              </div>
                              <div className="ai-card-name">Bingbot</div>
                              <div className="ai-card-status">Microsoft</div>
                          </div>
                      </div>
                  </div>

                  <p className="text-center mt-8 text-xs text-slate-600 font-mono">
                      <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Live · 6 crawlers active · NAP Protocol v1.0
                      </span>
                  </p>
          </section>

          {/* ============== 3. PRODUSE NOI ============== */}
          <section id="produse" className="max-w-7xl mx-auto px-6 mt-32">
              <div className="text-center mb-14 reveal">
                  <span className="text-gold font-mono text-sm tracking-widest uppercase">{t.productsLabel}</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">
                      {t.productsTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">{t.productsTitleAccent}</span>
                  </h2>
                  <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">{t.productsSub}</p>
              </div>

              {/* Commerce Distribution — oferta principală */}
              <div className="mb-10 reveal">
                  <div className="card-marketplace">
                      <div className="card-marketplace-text">
                          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                              {t.chainEndTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">{t.chainEndAccent}</span>
                          </h3>
                          <p className="text-slate-400 mt-3 max-w-xl">{t.chainEndBody}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                          <a href="/agentic-marketplace" className="btn-primary px-8 py-4 rounded-lg font-bold flex items-center gap-2 whitespace-nowrap">
                              {t.chainEndCta} <i data-lucide="arrow-right" className="w-4 h-4" />
                          </a>
                          <a href="https://shop.catyai.io/aff-index" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-gold transition-colors whitespace-nowrap">
                              {t.chainEndCta2 || 'shop.catyai.io ↗'}
                          </a>
                      </div>
                  </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                  <div className="card-product reveal">
                      <div className="card-chain-num">{t.chainLinkLabel} 01</div>
                      <div className="card-product-icon" style={{background: 'rgba(200, 161, 101, 0.10)', borderColor: 'rgba(200, 161, 101, 0.35)'}}>
                          <MessageSquare className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="card-product-title">{t.prod1Name}</h3>
                      <p className="card-product-tagline text-gold" style={{color: '#D4B57A', fontWeight: 600}}>{t.prod1Tagline}</p>
                      <ul className="card-product-features">
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod1F1}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod1F2}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod1F3}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod1F4}</li>
                      </ul>
                      <a href="/widget" className="card-product-cta">
                          {t.prod1Cta}
                          <i data-lucide="arrow-right" className="w-4 h-4" />
                      </a>
                  </div>

                  <div className="card-product reveal">
                      <div className="card-chain-num">{t.chainLinkLabel} 02</div>
                      <div className="card-product-icon" style={{background: 'rgba(239, 68, 68, 0.08)', borderColor: 'rgba(239, 68, 68, 0.25)'}}>
                          <ShieldCheck className="w-6 h-6" style={{color: '#ef4444'}} />
                      </div>
                      <h3 className="card-product-title">{t.prod2Name}</h3>
                      <p className="card-product-tagline" style={{color: '#D4B57A', fontWeight: 600}}>{t.prod2Tagline}</p>
                      <ul className="card-product-features">
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod2F1}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod2F2}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod2F3}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod2F4}</li>
                      </ul>
                      <a href="/fraud-shield" className="card-product-cta">
                          {t.prod2Cta}
                          <i data-lucide="arrow-right" className="w-4 h-4" />
                      </a>
                  </div>

                  <div className="card-product reveal">
                      <div className="card-chain-num">{t.chainLinkLabel} 03</div>
                      <div className="card-product-icon" style={{background: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.25)'}}>
                          <RadioTower className="w-6 h-6" style={{color: '#3b82f6'}} />
                      </div>
                      <h3 className="card-product-title">{t.prod3Name}</h3>
                      <p className="card-product-tagline" style={{color: '#D4B57A', fontWeight: 600}}>{t.prod3Tagline}</p>
                      <ul className="card-product-features">
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod3F1}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod3F2}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod3F3}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod3F4}</li>
                      </ul>
                      <a href="/geo-gateway" className="card-product-cta">
                          {t.prod3Cta}
                          <i data-lucide="arrow-right" className="w-4 h-4" />
                      </a>
                  </div>

                  <div className="card-product reveal">
                      <div className="card-chain-num">{t.chainLinkLabel} 04</div>
                      <div className="card-product-icon" style={{background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)'}}>
                          <Lock className="w-6 h-6" style={{color: '#10b981'}} />
                      </div>
                      <h3 className="card-product-title">{t.prod4Name}</h3>
                      <p className="card-product-tagline" style={{color: '#D4B57A', fontWeight: 600}}>{t.prod4Tagline}</p>
                      <ul className="card-product-features">
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod4F1}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod4F2}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod4F3}</li>
                          <li><i data-lucide="check" className="w-4 h-4 text-gold flex-shrink-0" /> {t.prod4F4}</li>
                      </ul>
                      <a href="/trust-gateway" className="card-product-cta">
                          {t.prod4Cta}
                          <i data-lucide="arrow-right" className="w-4 h-4" />
                      </a>
                  </div>

              </div>
          </section>

          {/* ============== 4. CUM FUNCȚIONEAZĂ — STACKING CARDS ============== */}
          <section id="cum" className="mt-40 stacking-section">
              <div className="max-w-4xl mx-auto px-6 text-center mb-12 relative z-20 reveal">
                  <span className="text-gold font-mono text-sm tracking-widest uppercase">{t.howLabel}</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">
                      {t.howTitle}<br/>Un <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">{t.howAccent}</span>.
                  </h2>
              </div>

              {/* CARD 1 */}
              <div className="stack-card" data-index="0">
                  <div className="stack-card-inner">
                      <div className="grid md:grid-cols-2 gap-12 items-start">
                          <div>
                              <span className="card-tag"><i data-lucide="radio-tower" className="w-3 h-3" /> {t.layer1Tag}</span>
                              <h3>{t.layer1Title}</h3>
                              <p className="layer-tagline">{t.layer1Tagline}</p>
                              <p className="layer-body">{t.layer1Body}</p>
                              <div className="compliance-pill">
                                  <i data-lucide="shield" className="w-3.5 h-3.5" />
                                  <span>{t.layer1Compliance}</span>
                              </div>
                          </div>
                          <div className="bg-black/40 rounded-xl p-6 border border-white/5 font-mono text-sm text-slate-400 leading-relaxed">
                              <div className="text-slate-600"># /geo/v1/llms.txt</div>
                              <div><span className="text-gold">protocol</span>: <span className="text-emerald-400">"NAP/1.0"</span></div>
                              <div><span className="text-gold">node</span>: <span className="text-emerald-400">"catyai.io"</span></div>
                              <div><span className="text-gold">embeddings</span>: <span className="text-emerald-400">"titan-v2"</span></div>
                              <div><span className="text-gold">ai-context</span>: <span className="text-emerald-400">"transparent"</span></div>
                              <div><span className="text-gold">manifest</span>:</div>
                              <div>&nbsp;&nbsp;- <span className="text-gold">type</span>: <span className="text-emerald-400">service</span></div>
                              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gold">id</span>: <span className="text-emerald-400">geo-gateway</span></div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* CARD 2 */}
              <div className="stack-card" data-index="1">
                  <div className="stack-card-inner">
                      <div className="grid md:grid-cols-2 gap-12 items-start">
                          <div className="md:order-2">
                              <span className="card-tag"><i data-lucide="shield-check" className="w-3 h-3" /> {t.layer2Tag}</span>
                              <h3>{t.layer2Title}</h3>
                              <p className="layer-tagline">{t.layer2Tagline}</p>
                              <p className="layer-body">{t.layer2Body}</p>
                              <div className="compliance-pill">
                                  <i data-lucide="file-check" className="w-3.5 h-3.5" />
                                  <span>{t.layer2Compliance}</span>
                              </div>
                          </div>
                          <div className="md:order-1 bg-black/40 rounded-xl p-6 border border-white/5 font-mono text-sm text-slate-400 leading-relaxed">
                              <div className="text-slate-600"># Response headers</div>
                              <div><span className="text-gold">X-NAP-Signature</span>: <span className="text-emerald-400">ed25519:...</span></div>
                              <div><span className="text-gold">X-NAP-Public-Key</span>: <span className="text-emerald-400">a1b2c3...</span></div>
                              <div><span className="text-gold">X-Data-Source</span>: <span className="text-emerald-400">live</span></div>
                              <div><span className="text-gold">X-Provenance</span>: <span className="text-emerald-400">verified</span></div>
                              <div><span className="text-gold">Content-Type</span>: <span className="text-emerald-400">application/nap+json</span></div>
                              <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
                                  <div>
                                      <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">0%</div>
                                      <div className="text-xs text-slate-500">Hallucination</div>
                                  </div>
                                  <div>
                                      <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">100%</div>
                                      <div className="text-xs text-slate-500">Verifiable</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* CARD 3 */}
              <div className="stack-card" data-index="2">
                  <div className="stack-card-inner">
                      <div className="grid md:grid-cols-2 gap-12 items-start">
                          <div>
                              <span className="card-tag"><i data-lucide="zap" className="w-3 h-3" /> {t.layer3Tag}</span>
                              <h3>{t.layer3Title}</h3>
                              <p className="layer-tagline">{t.layer3Tagline}</p>
                              <p className="layer-body">{t.layer3Body}</p>
                              <div className="compliance-pill">
                                  <i data-lucide="file-signature" className="w-3.5 h-3.5" />
                                  <span>{t.layer3Compliance}</span>
                              </div>
                          </div>
                          <div className="space-y-3">
                              <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center"><i data-lucide="user-plus" className="w-4 h-4 text-gold" /></div>
                                      <div>
                                          <div className="text-white text-sm font-medium">POST /akl/lead</div>
                                          <div className="text-xs text-slate-500 font-mono">via Perplexity</div>
                                      </div>
                                  </div>
                                  <span className="text-xs font-mono text-emerald-400">200 OK</span>
                              </div>
                              <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center"><i data-lucide="calendar" className="w-4 h-4 text-gold" /></div>
                                      <div>
                                          <div className="text-white text-sm font-medium">POST /akl/booking</div>
                                          <div className="text-xs text-slate-500 font-mono">via ChatGPT</div>
                                      </div>
                                  </div>
                                  <span className="text-xs font-mono text-emerald-400">200 OK</span>
                              </div>
                              <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center"><i data-lucide="credit-card" className="w-4 h-4 text-gold" /></div>
                                      <div>
                                          <div className="text-white text-sm font-medium">POST /akl/checkout</div>
                                          <div className="text-xs text-slate-500 font-mono">via Gemini</div>
                                      </div>
                                  </div>
                                  <span className="text-xs font-mono text-emerald-400">200 OK</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* CARD 4 */}
              <div className="stack-card" data-index="3">
                  <div className="stack-card-inner">
                      <div className="grid md:grid-cols-2 gap-12 items-start">
                          <div className="md:order-2">
                              <span className="card-tag"><i data-lucide="eye" className="w-3 h-3" /> {t.layer4Tag}</span>
                              <h3>{t.layer4Title}</h3>
                              <p className="layer-tagline">{t.layer4Tagline}</p>
                              <p className="layer-body">{t.layer4Body}</p>
                              <div className="compliance-pill">
                                  <i data-lucide="alert-octagon" className="w-3.5 h-3.5" />
                                  <span>{t.layer4Compliance}</span>
                              </div>
                          </div>
                          <div className="md:order-1 bg-black/40 rounded-xl p-6 border border-white/5">
                              <div className="flex items-center justify-between mb-4">
                                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Live Signals</span>
                                  <span className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
                                  </span>
                              </div>
                              <div className="space-y-3">
                                  <div className="flex items-center gap-3"><i data-lucide="trending-up" className="w-4 h-4 text-emerald-400" /><span className="text-sm text-slate-300 flex-grow">Visibility ChatGPT</span><span className="text-xs font-mono text-emerald-400">+12.4%</span></div>
                                  <div className="flex items-center gap-3"><i data-lucide="trending-up" className="w-4 h-4 text-emerald-400" /><span className="text-sm text-slate-300 flex-grow">Citations Perplexity</span><span className="text-xs font-mono text-emerald-400">+8.1%</span></div>
                                  <div className="flex items-center gap-3"><i data-lucide="alert-circle" className="w-4 h-4 text-amber-400" /><span className="text-sm text-slate-300 flex-grow">Drift Gemini</span><span className="text-xs font-mono text-amber-400">corrected</span></div>
                                  <div className="flex items-center gap-3"><i data-lucide="shield" className="w-4 h-4 text-gold" /><span className="text-sm text-slate-300 flex-grow">Hallucination filter</span><span className="text-xs font-mono text-gold">active</span></div>
                                  <div className="flex items-center gap-3 pt-3 border-t border-white/10"><i data-lucide="key-round" className="w-4 h-4 text-red-400" /><span className="text-sm text-slate-300 flex-grow">JWKS revocation</span><span className="text-xs font-mono text-red-400">&lt; 50ms</span></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* ============== EU AI ACT COMPLIANCE STICKER ============== */}
          <section id="compliance-badge" className="max-w-4xl mx-auto px-6 mt-12">
              <div className="reveal relative overflow-hidden rounded-3xl p-10 md:p-12" style={{background: 'linear-gradient(135deg, rgba(200, 161, 101, 0.08) 0%, rgba(10, 27, 61, 0.6) 100%)', border: '1px solid rgba(200, 161, 101, 0.25)'}}>
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none" style={{background: 'radial-gradient(circle, #C8A165 0%, transparent 70%)'}}></div>
                  <div className="relative z-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
                      <div className="w-24 h-24 rounded-2xl border-2 border-gold/40 bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <div className="text-center">
                              <div className="text-xs font-mono text-gold tracking-widest">EU</div>
                              <div className="text-3xl font-extrabold text-gold leading-none my-1">★</div>
                              <div className="text-xs font-mono text-gold tracking-widest">2026</div>
                          </div>
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">{t.euReadySince}</span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-3">
                              EU AI ACT 2026 <span className="text-gold">{t.euReady}</span>
                          </h3>
                          <p className="text-slate-300 leading-relaxed mb-4">
                              {t.euBody}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs font-mono">
                              <span className="px-3 py-1.5 rounded-md bg-black/40 border border-white/10 text-gold">{t.euArt9}</span>
                              <span className="px-3 py-1.5 rounded-md bg-black/40 border border-white/10 text-gold">{t.euArt10}</span>
                              <span className="px-3 py-1.5 rounded-md bg-black/40 border border-white/10 text-gold">{t.euArt50}</span>
                              <span className="px-3 py-1.5 rounded-md bg-black/40 border border-white/10 text-gold">{t.euArt52}</span>
                          </div>
                          <p className="mt-4 text-xs text-slate-500 font-mono">{t.euDeadline}</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* ============== 5. TESTIMONIALS ============== */}
          <section id="testimonials" className="mt-32 overflow-hidden">
              <div className="max-w-4xl mx-auto px-6 text-center mb-12 reveal">
                  <span className="text-gold font-mono text-sm tracking-widest uppercase">{t.testimonialsLabel}</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">
                      {t.testimonialsTitle}
                  </h2>
              </div>
              <div className="relative">
                  <div className="marquee-reviews">
                      {/* Review cards */}
                      <div className="flex-shrink-0 w-80 card p-6">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">M</div>
                              <div>
                                  <h4 className="font-bold text-gold">Mihai D.</h4>
                                  <div className="text-amber-400 text-sm">★★★★★</div>
                              </div>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">"CatyAI ne-a transformat complet modul în care interacționăm cu clienții. Răspunsuri instant 24/7, conversii crescute."</p>
                          <p className="text-slate-600 text-xs mt-3 font-mono">acum 2 săptămâni</p>
                      </div>
                      <div className="flex-shrink-0 w-80 card p-6">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy font-bold">L</div>
                              <div>
                                  <h4 className="font-bold text-gold">Laura M.</h4>
                                  <div className="text-amber-400 text-sm">★★★★★</div>
                              </div>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">"Increíble plataforma de IA! Hemos reducido los tickets de soporte en un 60%."</p>
                          <p className="text-slate-600 text-xs mt-3 font-mono">hace 2 semanas</p>
                      </div>
                      <div className="flex-shrink-0 w-80 card p-6">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">P</div>
                              <div>
                                  <h4 className="font-bold text-gold">Paulo S.</h4>
                                  <div className="text-amber-400 text-sm">★★★★★</div>
                              </div>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">"Ferramenta incrível! O chatbot CatyAI atende nossos clientes 24h por dia."</p>
                          <p className="text-slate-600 text-xs mt-3 font-mono">há 3 semanas</p>
                      </div>
                      <div className="flex-shrink-0 w-80 card p-6">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-red-500 flex items-center justify-center text-white font-bold">M</div>
                              <div>
                                  <h4 className="font-bold text-gold">Marie L.</h4>
                                  <div className="text-amber-400 text-sm">★★★★★</div>
                              </div>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">"Solution IA exceptionnelle! CatyAI a transformé notre service client."</p>
                          <p className="text-slate-600 text-xs mt-3 font-mono">il y a 1 mois</p>
                      </div>
                      <div className="flex-shrink-0 w-80 card p-6">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">I</div>
                              <div>
                                  <h4 className="font-bold text-gold">Ionuț T.</h4>
                                  <div className="text-amber-400 text-sm">★★★★★</div>
                              </div>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">"Am redus cu 60% ticketele de suport după implementarea CatyAI."</p>
                          <p className="text-slate-600 text-xs mt-3 font-mono">acum 2 luni</p>
                      </div>
                      {/* Duplicate for infinite scroll */}
                      <div className="flex-shrink-0 w-80 card p-6">
                          <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">M</div>
                              <div>
                                  <h4 className="font-bold text-gold">Mihai D.</h4>
                                  <div className="text-amber-400 text-sm">★★★★★</div>
                              </div>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">"CatyAI ne-a transformat complet modul în care interacționăm cu clienții."</p>
                          <p className="text-slate-600 text-xs mt-3 font-mono">acum 2 săptămâni</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* ============== 6. INDUSTRII ============== */}
          <section id="industrii" className="max-w-6xl mx-auto px-6 mt-32">
              <div className="text-center mb-12 reveal">
                  <span className="text-gold font-mono text-sm tracking-widest uppercase">{t.industriesLabel}</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">
                      {t.industriesTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">{t.industriesAccent}</span>
                  </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="stethoscope" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind1}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">42 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="utensils" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind2}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">87 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="building" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind3}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">31 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="scissors" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind4}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">56 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="car" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind5}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">23 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="graduation-cap" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind6}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">19 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="shopping-bag" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind7}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">112 active</p>
                  </div>
                  <div className="card p-6 text-center reveal">
                      <i data-lucide="briefcase" className="w-8 h-8 text-gold mx-auto mb-3" />
                      <h3 className="text-white font-semibold text-sm">{t.ind8}</h3>
                      <p className="text-slate-500 text-xs mt-1 font-mono">38 active</p>
                  </div>
              </div>
          </section>

          {/* ============== 7. FAQ ============== */}
          <section id="faq" className="max-w-3xl mx-auto px-6 mt-32">
              <div className="text-center mb-12 reveal">
                  <span className="text-gold font-mono text-sm tracking-widest uppercase">{t.faqLabel}</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">
                      {t.faqTitle}
                  </h2>
              </div>

              <div className="space-y-2">
                  <details className="faq-item card px-6 reveal" open>
                      <summary>
                          <span className="text-white font-semibold">{t.faq1Q}</span>
                          <i data-lucide="plus" className="faq-icon w-5 h-5 text-gold" />
                      </summary>
                      <p className="text-slate-400 pb-6 leading-relaxed">{t.faq1A}</p>
                  </details>
                  <details className="faq-item card px-6 reveal">
                      <summary>
                          <span className="text-white font-semibold">{t.faq2Q}</span>
                          <i data-lucide="plus" className="faq-icon w-5 h-5 text-gold" />
                      </summary>
                      <p className="text-slate-400 pb-6 leading-relaxed">{t.faq2A}</p>
                  </details>
                  <details className="faq-item card px-6 reveal">
                      <summary>
                          <span className="text-white font-semibold">{t.faq3Q}</span>
                          <i data-lucide="plus" className="faq-icon w-5 h-5 text-gold" />
                      </summary>
                      <p className="text-slate-400 pb-6 leading-relaxed">{t.faq3A}</p>
                  </details>
                  <details className="faq-item card px-6 reveal">
                      <summary>
                          <span className="text-white font-semibold">{t.faq4Q}</span>
                          <i data-lucide="plus" className="faq-icon w-5 h-5 text-gold" />
                      </summary>
                      <p className="text-slate-400 pb-6 leading-relaxed">{t.faq4A}</p>
                  </details>
                  <details className="faq-item card px-6 reveal">
                      <summary>
                          <span className="text-white font-semibold">{t.faq5Q}</span>
                          <i data-lucide="plus" className="faq-icon w-5 h-5 text-gold" />
                      </summary>
                      <p className="text-slate-400 pb-6 leading-relaxed">{t.faq5A}</p>
                  </details>
              </div>
          </section>

          {/* ============== 8. CTA FINAL ============== */}
          <section id="cta-final" className="max-w-4xl mx-auto px-6 mt-32 text-center">
              <div className="reveal p-12 md:p-16 rounded-3xl border border-gold/20 bg-gradient-to-b from-transparent to-gold/5 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #C8A165 0, #C8A165 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px'}}></div>

                  <div className="relative z-10">
                      <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight">
                          {t.ctaTitle1} <span className="line-through decoration-red-500/50 decoration-4">{t.ctaStrike}</span>.<br/>
                          {t.ctaTitle2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">{t.ctaAccent}</span>.
                      </h2>
                      <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                          {t.ctaSubtitle}
                      </p>
                      <a href="#" className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-bold">
                          {t.ctaBtn} <i data-lucide="zap" className="w-5 h-5" />
                      </a>
                  </div>
              </div>
          </section>
          <FooterV9 lang={lang} />

          {/* WhatsApp floating button */}
          <a
            href="https://wa.me/40750195048?text=Salut! Vreau să aflu mai multe despre CatyAI"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#A68246] hover:bg-[#8f6e38] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            aria-label="Contactează-ne pe WhatsApp"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.122 1.523 5.855L.057 23.882a.5.5 0 0 0 .606.63l6.208-1.637A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.213-3.724.982.993-3.634-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
          </a>

    </>
  );
}
