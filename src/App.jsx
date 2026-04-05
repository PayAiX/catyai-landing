import { useState, useEffect, createContext, useContext, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import SEO from './components/SEO'
import FooterComponent from './components/Footer'
import Testimonials from './components/Testimonials'
import PartnersPress from './components/PartnersPress'
import AurexPromo from './components/AurexPromo'
import QRFirst from './components/QRFirst'
import CaseStudies from './components/CaseStudies'
import ROICalculator from './components/ROICalculator'
import FraudShield from './components/FraudShield'
import DocGenEngine from './components/DocGenEngine'
import ComparisonTable from './components/ComparisonTable'
import WhatsAppSecretary from './components/WhatsAppSecretary'
import WhatsAppZeroMeta from './components/WhatsAppZeroMeta'

// Lazy load pages for better performance (code splitting)
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const GDPRPolicy = lazy(() => import('./pages/GDPRPolicy'))
const Licensing = lazy(() => import('./pages/Licensing'))
const LicenseAGPL = lazy(() => import('./pages/LicenseAGPL'))
const SiteAnalyzer = lazy(() => import('./pages/SiteAnalyzer'))
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))
const CommerceDemo = lazy(() => import('./pages/CommerceDemo'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const WhatsAppAI = lazy(() => import('./pages/WhatsAppAI'))
const FraudAI = lazy(() => import('./pages/FraudAI'))
const ChatbotRomania = lazy(() => import('./pages/ChatbotRomania'))
const NoWebsite = lazy(() => import('./pages/NoWebsite'))
const TrustCenter = lazy(() => import('./pages/TrustCenter'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
)

// Language Context
const LanguageContext = createContext()

const translations = {
  en: {
    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', whatsapp: 'WhatsApp AI', fraudai: 'FraudAI', login: 'Login', getStarted: 'Start Free' },
    hero: {
      title1: 'Turn Conversations Into',
      title2: 'Paying Customers',
      subtitle: 'AI that responds, qualifies & converts — automatically, 24/7',
      cta1: 'Book a Demo',
      cta2: 'Get Started Free',
      trust1: '500 conversations FREE',
      trust2: 'No credit card',
      trust3: 'Setup in 2 min'
    },
    problem: {
      title: "You're Losing Customers Every Day",
      stats: [
        { value: '40%', label: 'of messages come after hours' },
        { value: '67%', label: 'leave if no reply in 1 hour' },
        { value: '€0', label: 'revenue from missed leads' }
      ]
    },
    solution: {
      badge: 'THE SOLUTION',
      title1: 'This Is Not a Chatbot.',
      title2: 'This Is a Sales System.',
      subtitle: 'CatyAI captures, qualifies & converts leads automatically'
    },
    coreFlow: {
      title: 'How CatyAI Works',
      steps: [
        { name: 'CAPTURE', icon: '📥', title: '24/7 Response', desc: 'Never miss a lead. Instant replies any time.' },
        { name: 'QUALIFY', icon: '🎯', title: 'AI Scoring', desc: 'Smart questions. Identifies hot prospects.' },
        { name: 'CONVERT', icon: '💰', title: 'Book & Sell', desc: 'Schedules meetings. Closes deals.' }
      ]
    },
    features: {
      title: 'Your Secretary',
      titleHighlight: 'Never Sleeps',
      subtitle: 'Everything a receptionist does, automated on WhatsApp',
      feature1Title: 'Answers Customers 24/7',
      feature1Desc: 'Responds instantly in natural language. Remembers conversation context. Speaks Romanian, English, Spanish, Portuguese, French, Arabic fluently with auto-detection.',
      feature2Title: 'Books Appointments',
      feature2Desc: 'Syncs with Google Calendar. Checks availability in real-time. Sends booking confirmations and 30-minute reminders directly on WhatsApp.',
      feature3Title: 'Generates Documents',
      feature3Desc: 'Creates quotes, invoices, booking confirmations, and receipts as PDF. Sends them directly in WhatsApp chat. Payment links included.',
      feature4Title: 'Blocks Scams with FraudAI',
      feature4Desc: 'FraudAI Shield with 8 detection modules: phishing links, fake urgency, impersonation, suspicious requests. Protects you before you even see the message.',
      feature5Title: 'Extracts Tasks Automatically',
      feature5Desc: '"Call Ion tomorrow at 10" becomes a task with reminder. "Order supplies" gets tracked. Daily digest email with everything extracted.',
      feature6Title: 'Knows Your Business Inside Out',
      feature6Desc: '12-domain Knowledge Base: services, pricing, hours, locations, team members, policies, FAQs, promotions, booking rules, payment methods, and more.'
    },
    products: {
      title: 'Two Ways to',
      titleHighlight: 'Engage Customers',
      subtitle: 'CatyAI works on your website AND on WhatsApp',
      widget: {
        title: 'Website Chat Widget',
        desc: 'Embed on any website. Captures leads, answers questions, converts visitors 24/7.',
        features: ['One-line embed code', 'Auto-Crawl Knowledge Base', 'Lead capture forms', 'Real-time analytics']
      },
      whatsapp: {
        title: 'WhatsApp Secretary',
        desc: 'Responds to customers on WhatsApp. Books appointments, generates documents, blocks scams.',
        features: ['QR code setup', 'Calendar sync', 'Document generation', 'FraudAI Shield']
      }
    },
    integrations: {
      title: 'Powerful',
      titleHighlight: 'Integrations',
      subtitle: 'Connect your platforms with one click. Auto-Crawl learns your business automatically.',
      wordpress: { title: 'WordPress', desc: 'One-click plugin. Syncs posts, products, pages automatically.' },
      shopify: { title: 'Shopify', desc: 'Instant integration. Auto-sync products and inventory.' },
      autoCrawl: { title: 'Auto-Crawl', desc: 'Scans your entire website. Extracts content, products, FAQs automatically.' },
      calendar: { title: 'Google Calendar', desc: 'Real-time availability. Automatic booking and reminders.' }
    },
    verticals: {
      title: 'Built for Businesses That',
      titleHighlight: 'Live on WhatsApp',
      industries: ['Dental Clinics', 'Hair Salons', 'Restaurants', 'Fitness', 'Real Estate', 'Services'],
      trusted: 'Trusted by: Simple Smile, Digital Romania, D&S Gaz'
    },
    howItWorks: {
      title: 'Live in',
      titleHighlight: '5 Minutes',
      subtitle: 'No app to install. No complex setup. Just connect and go.',
      step1Title: 'Scan QR Code',
      step1Desc: 'Connects your WhatsApp number instantly. Like WhatsApp Web.',
      step2Title: 'Tell CatyAI About Your Business',
      step2Desc: 'Services, prices, hours, team. CatyAI learns in minutes.',
      step3Title: 'CatyAI Takes Over',
      step3Desc: 'Check results in the morning. All conversations handled.'
    },
    pricing: {
      title: 'Simple',
      titleHighlight: 'Pricing',
      subtitle: 'Start free, upgrade when you need more',
      mostPopular: 'Most Popular',
      perMonth: '/mo',
      startFree: 'Start Free',
      getStarted: 'Get Started',
      contactSales: 'Contact Sales',
      free: {
        name: 'FREE',
        price: '€0',
        features: ['100 sessions/month', '1 widget', '10 KB docs', 'Basic chat', 'Lead capture']
      },
      starter: {
        name: 'STARTER',
        price: '€49',
        features: ['1,000 sessions/month', '1 widget', '50 KB docs', 'Behavioral tracking', 'Proactive messages', 'Email support']
      },
      growth: {
        name: 'GROWTH',
        price: '€99',
        features: ['5,000 sessions/month', '3 widgets', '200 KB docs', 'CRM integrations', 'Live handoff', 'Analytics', 'Priority support']
      },
      business: {
        name: 'BUSINESS',
        price: '€199',
        features: ['20,000 sessions/month', 'Unlimited widgets', 'Unlimited KB docs', 'API access', 'Account manager', 'Custom integrations', 'Advanced analytics']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€499',
        features: ['Unlimited sessions', 'Unlimited widgets', 'Unlimited KB docs', 'White-label branding', 'SSO / SAML', 'Dedicated support', 'SLA guarantee', 'Custom development']
      }
    },
    faq: {
      title: 'Questions',
      titleHighlight: 'Answered',
      subtitle: 'Everything you need to know about CatyAI',
      q1: 'Is it really free?',
      a1: 'Yes. 100 sessions per month, forever. No credit card required.',
      q2: 'How does it connect to my WhatsApp?',
      a2: 'Scan a QR code, like WhatsApp Web. Uses your existing business number. Takes 2 minutes.',
      q3: 'Will customers know it\'s AI?',
      a3: 'Only if you want them to. CatyAI responds as your business, with your style.',
      q4: 'What if CatyAI can\'t answer a question?',
      a4: 'It forwards the conversation to you with full context. You take over seamlessly.',
      q5: 'Is my data safe?',
      a5: 'GDPR compliant. AWS Ireland servers. You own your data. We never share or sell it.',
      q6: 'Does it work in Romanian?',
      a6: 'Fluently! Also English, Spanish, Portuguese, French, and Arabic with auto-detection.'
    },
    cta: {
      title: 'Your Competitors Are Already Responding Faster.',
      subtitle: 'Get CatyAI free. 100 sessions/month. Setup in 5 minutes.',
      btn1: 'Get CatyAI Free',
      btn2: 'Book Demo Call'
    },
    footer: {
      tagline: 'AI Secretary on WhatsApp. Responds 24/7. Books appointments. Blocks scams.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      about: 'About',
      blog: 'Blog',
      careers: 'Careers',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      gdpr: 'GDPR',
      licensing: 'Licensing',
      docs: 'Documentation',
      dashboard: 'Dashboard',
      copyright: 'PayAi-X FZE (Caty.AI). All rights reserved.'
    },
    floatingIndicator: 'Try me!'
  },
  ro: {
    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'Întrebări', whatsapp: 'WhatsApp AI', fraudai: 'FraudAI', login: 'Autentificare', getStarted: 'Începe Gratuit' },
    hero: {
      title1: 'Transformă Conversațiile în',
      title2: 'Clienți Plătitori',
      subtitle: 'AI care răspunde, califică și convertește — automat, 24/7',
      cta1: 'Programează Demo',
      cta2: 'Începe Gratuit',
      trust1: '500 conversații GRATUIT',
      trust2: 'Fără card bancar',
      trust3: 'Setup în 2 min'
    },
    problem: {
      title: 'Pierzi Clienți în Fiecare Zi',
      stats: [
        { value: '40%', label: 'din mesaje vin după program' },
        { value: '67%', label: 'pleacă dacă nu răspunzi în 1h' },
        { value: '€0', label: 'venit din lead-uri pierdute' }
      ]
    },
    solution: {
      badge: 'SOLUȚIA',
      title1: 'Nu Este un Chatbot.',
      title2: 'Este un Sistem de Vânzări.',
      subtitle: 'CatyAI captează, califică și convertește lead-uri automat'
    },
    coreFlow: {
      title: 'Cum Funcționează CatyAI',
      steps: [
        { name: 'CAPTEAZĂ', icon: '📥', title: 'Răspuns 24/7', desc: 'Nu pierzi niciun lead. Răspunsuri instant.' },
        { name: 'CALIFICĂ', icon: '🎯', title: 'Scorare AI', desc: 'Întrebări inteligente. Identifică prospecți fierbinți.' },
        { name: 'CONVERTEȘTE', icon: '💰', title: 'Programează & Vinde', desc: 'Stabilește întâlniri. Închide vânzări.' }
      ]
    },
    features: {
      title: 'Secretara ta',
      titleHighlight: 'Nu Doarme Niciodată',
      subtitle: 'Tot ce face o recepționeră, automatizat pe WhatsApp',
      feature1Title: 'Răspunde Clienților 24/7',
      feature1Desc: 'Răspunde instant în limbaj natural. Ține minte contextul conversației. Vorbește fluent română, engleză, spaniolă, portugheză, franceză, arabă cu auto-detectare.',
      feature2Title: 'Programează Întâlniri',
      feature2Desc: 'Sincronizare cu Google Calendar. Verifică disponibilitatea în timp real. Trimite confirmări și remindere la 30 minute direct pe WhatsApp.',
      feature3Title: 'Generează Documente',
      feature3Desc: 'Creează oferte, facturi, confirmări rezervări și chitanțe ca PDF. Le trimite direct în chat WhatsApp. Include link-uri de plată.',
      feature4Title: 'Blochează Escrocherii cu FraudAI',
      feature4Desc: 'FraudAI Shield cu 8 module de detecție: link-uri phishing, urgențe false, impersonare, cereri suspecte. Te protejează înainte să vezi mesajul.',
      feature5Title: 'Extrage Sarcini Automat',
      feature5Desc: '"Sună-l pe Ion mâine la 10" devine task cu reminder. "Comandă consumabile" e urmărit. Email zilnic cu tot ce a extras.',
      feature6Title: 'Cunoaște Afacerea Ta în Detaliu',
      feature6Desc: 'Knowledge Base cu 12 domenii: servicii, prețuri, program, locații, echipă, politici, FAQ, promoții, reguli rezervări, metode plată și mai mult.'
    },
    products: {
      title: 'Două Moduri de a',
      titleHighlight: 'Interacționa cu Clienții',
      subtitle: 'CatyAI funcționează pe site-ul tău ȘI pe WhatsApp',
      widget: {
        title: 'Widget Chat pe Site',
        desc: 'Se integrează pe orice site. Captează lead-uri, răspunde la întrebări, convertește vizitatori 24/7.',
        features: ['O singură linie de cod', 'Auto-Crawl Knowledge Base', 'Formulare captare lead-uri', 'Analytics în timp real']
      },
      whatsapp: {
        title: 'Secretară pe WhatsApp',
        desc: 'Răspunde clienților pe WhatsApp. Programează întâlniri, generează documente, blochează escrocherii.',
        features: ['Setup cu cod QR', 'Sincronizare calendar', 'Generare documente', 'FraudAI Shield']
      }
    },
    integrations: {
      title: 'Integrări',
      titleHighlight: 'Puternice',
      subtitle: 'Conectează platformele tale cu un singur click. Auto-Crawl învață afacerea ta automat.',
      wordpress: { title: 'WordPress', desc: 'Plugin cu un click. Sincronizează postări, produse, pagini automat.' },
      shopify: { title: 'Shopify', desc: 'Integrare instantanee. Auto-sync produse și inventar.' },
      autoCrawl: { title: 'Auto-Crawl', desc: 'Scanează întreg site-ul tău. Extrage conținut, produse, FAQ automat.' },
      calendar: { title: 'Google Calendar', desc: 'Disponibilitate în timp real. Rezervări și remindere automate.' }
    },
    verticals: {
      title: 'Creat pentru Afaceri Care',
      titleHighlight: 'Trăiesc pe WhatsApp',
      industries: ['Clinici Dentare', 'Saloane de Frumusețe', 'Restaurante', 'Fitness', 'Imobiliare', 'Servicii'],
      trusted: 'De încredere: Simple Smile, Digital Romania, D&S Gaz'
    },
    howItWorks: {
      title: 'Live în',
      titleHighlight: '5 Minute',
      subtitle: 'Nicio aplicație de instalat. Nicio configurare complicată. Conectezi și gata.',
      step1Title: 'Scanezi Codul QR',
      step1Desc: 'Îți conectează numărul de WhatsApp instant. Ca WhatsApp Web.',
      step2Title: 'Spui CatyAI Despre Afacerea Ta',
      step2Desc: 'Servicii, prețuri, orar, echipă. CatyAI învață în câteva minute.',
      step3Title: 'CatyAI Preia Controlul',
      step3Desc: 'Verifici rezultatele dimineața. Toate conversațiile gestionate.'
    },
    pricing: {
      title: 'Prețuri',
      titleHighlight: 'Simple',
      subtitle: 'Începe gratuit, actualizează când ai nevoie de mai mult',
      mostPopular: 'Cel mai popular',
      perMonth: '/lună',
      startFree: 'Începe Gratuit',
      getStarted: 'Începe',
      contactSales: 'Contactează Vânzări',
      free: {
        name: 'GRATUIT',
        price: '€0',
        features: ['100 sesiuni/lună', '1 widget', '10 KB docs', 'Chat basic', 'Captare lead-uri']
      },
      starter: {
        name: 'STARTER',
        price: '€49',
        features: ['1.000 sesiuni/lună', '1 widget', '50 KB docs', 'Tracking comportament', 'Mesaje proactive', 'Suport email']
      },
      growth: {
        name: 'GROWTH',
        price: '€99',
        features: ['5.000 sesiuni/lună', '3 widget-uri', '200 KB docs', 'Integrări CRM', 'Handoff live', 'Analytics', 'Suport prioritar']
      },
      business: {
        name: 'BUSINESS',
        price: '€199',
        features: ['20.000 sesiuni/lună', 'Widget-uri nelimitate', 'KB docs nelimitate', 'Acces API', 'Manager cont', 'Integrări custom', 'Analytics avansat']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€499',
        features: ['Sesiuni nelimitate', 'Widget-uri nelimitate', 'KB docs nelimitate', 'White-label branding', 'SSO / SAML', 'Suport dedicat', 'Garanție SLA', 'Dezvoltare custom']
      }
    },
    faq: {
      title: 'Întrebări',
      titleHighlight: 'Frecvente',
      subtitle: 'Tot ce trebuie să știi despre CatyAI',
      q1: 'Este cu adevărat gratuit?',
      a1: 'Da. 100 de sesiuni pe lună, pe viață. Fără card bancar.',
      q2: 'Cum se conectează la WhatsApp-ul meu?',
      a2: 'Scanezi un cod QR, ca la WhatsApp Web. Folosește numărul tău de business existent. Durează 2 minute.',
      q3: 'Vor ști clienții că e AI?',
      a3: 'Doar dacă vrei tu. CatyAI răspunde ca afacerea ta, cu stilul tău.',
      q4: 'Ce se întâmplă dacă CatyAI nu poate răspunde?',
      a4: 'Îți redirecționează conversația cu tot contextul. Preiei controlul fără probleme.',
      q5: 'Datele mele sunt în siguranță?',
      a5: 'Conform GDPR. Servere AWS Irlanda. Tu ești proprietarul datelor. Nu le împărtășim sau vindem.',
      q6: 'Funcționează în română?',
      a6: 'Fluent! De asemenea engleză, spaniolă, portugheză, franceză și arabă cu auto-detecție.'
    },
    cta: {
      title: 'Competitorii Tăi Răspund Deja Mai Repede.',
      subtitle: 'Obține CatyAI gratuit. 100 sesiuni/lună. Setup în 5 minute.',
      btn1: 'Obține CatyAI Gratuit',
      btn2: 'Programează Demo'
    },
    footer: {
      tagline: 'Secretară AI pe WhatsApp. Răspunde 24/7. Programează întâlniri. Blochează escrocherii.',
      product: 'Produs',
      company: 'Companie',
      legal: 'Legal',
      about: 'Despre',
      blog: 'Blog',
      careers: 'Cariere',
      contact: 'Contact',
      privacy: 'Politica de Confidențialitate',
      terms: 'Termeni și Condiții',
      gdpr: 'GDPR',
      licensing: 'Licențiere',
      docs: 'Documentație',
      dashboard: 'Dashboard',
      copyright: 'PayAi-X FZE (Caty.AI). Toate drepturile rezervate.'
    },
    floatingIndicator: 'Încearcă-mă!'
  },
  es: {
    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo funciona', pricing: 'Precios', faq: 'FAQ', whatsapp: 'WhatsApp AI', fraudai: 'FraudAI', login: 'Iniciar sesión', getStarted: 'Empezar Gratis' },
    hero: {
      title1: 'Convierte Conversaciones en',
      title2: 'Clientes que Pagan',
      subtitle: 'IA que responde, califica y convierte — automáticamente, 24/7',
      cta1: 'Reservar Demo',
      cta2: 'Empezar Gratis',
      trust1: '500 conversaciones GRATIS',
      trust2: 'Sin tarjeta de crédito',
      trust3: 'Setup en 2 min'
    },
    problem: {
      title: 'Pierdes Clientes Cada Día',
      stats: [
        { value: '40%', label: 'de mensajes llegan fuera de horario' },
        { value: '67%', label: 'se van si no respondes en 1h' },
        { value: '€0', label: 'ingresos de leads perdidos' }
      ]
    },
    solution: {
      badge: 'LA SOLUCIÓN',
      title1: 'Esto No Es un Chatbot.',
      title2: 'Es un Sistema de Ventas.',
      subtitle: 'CatyAI captura, califica y convierte leads automáticamente'
    },
    coreFlow: {
      title: 'Cómo Funciona CatyAI',
      steps: [
        { name: 'CAPTURA', icon: '📥', title: 'Respuesta 24/7', desc: 'Nunca pierdas un lead. Respuestas al instante.' },
        { name: 'CALIFICA', icon: '🎯', title: 'Scoring IA', desc: 'Preguntas inteligentes. Identifica prospectos.' },
        { name: 'CONVIERTE', icon: '💰', title: 'Agenda & Vende', desc: 'Programa citas. Cierra ventas.' }
      ]
    },
    features: {
      title: 'Tu Secretaria',
      titleHighlight: 'Nunca Duerme',
      subtitle: 'Todo lo que hace una recepcionista, automatizado en WhatsApp',
      feature1Title: 'Responde Clientes 24/7',
      feature1Desc: 'Lenguaje natural, recuerda el contexto, habla 6+ idiomas con fluidez.',
      feature2Title: 'Reserva Citas',
      feature2Desc: 'Sincronización con Google Calendar. Envía confirmaciones y recordatorios 30 min antes.',
      feature3Title: 'Genera Documentos',
      feature3Desc: 'Presupuestos, facturas, confirmaciones en PDF. Enviados directamente en WhatsApp.',
      feature4Title: 'Bloquea Estafas',
      feature4Desc: 'FraudAI Shield con 8 módulos de detección. Detecta el phishing antes de que lo veas.',
      feature5Title: 'Extrae Tareas',
      feature5Desc: '"Llama a Juan mañana" se convierte en una tarea. Resumen diario de todo.',
      feature6Title: 'Conoce Tu Negocio',
      feature6Desc: 'Base de conocimiento de 12 dominios: precios, servicios, horarios, políticas, equipo, ubicaciones.'
    },
    products: {
      title: 'Dos Formas de',
      titleHighlight: 'Conectar con Clientes',
      subtitle: 'CatyAI funciona en tu sitio web Y en WhatsApp',
      widget: {
        title: 'Widget Chat Web',
        desc: 'Incrusta en cualquier sitio. Captura leads, responde preguntas, convierte visitantes 24/7.',
        features: ['Una línea de código', 'Auto-Crawl Base de Conocimiento', 'Formularios de captura', 'Analytics en tiempo real']
      },
      whatsapp: {
        title: 'Secretaria WhatsApp',
        desc: 'Responde clientes en WhatsApp. Reserva citas, genera documentos, bloquea estafas.',
        features: ['Setup con código QR', 'Sincronización calendario', 'Generación de documentos', 'FraudAI Shield']
      }
    },
    integrations: {
      title: 'Integraciones',
      titleHighlight: 'Potentes',
      subtitle: 'Conecta tus plataformas con un clic. Auto-Crawl aprende tu negocio automáticamente.',
      wordpress: { title: 'WordPress', desc: 'Plugin con un clic. Sincroniza posts, productos, páginas.' },
      shopify: { title: 'Shopify', desc: 'Integración instantánea. Auto-sync productos e inventario.' },
      autoCrawl: { title: 'Auto-Crawl', desc: 'Escanea todo tu sitio. Extrae contenido, productos, FAQs.' },
      calendar: { title: 'Google Calendar', desc: 'Disponibilidad en tiempo real. Reservas y recordatorios.' }
    },
    verticals: {
      title: 'Creado para Negocios Que',
      titleHighlight: 'Viven en WhatsApp',
      industries: ['Clínicas Dentales', 'Salones de Belleza', 'Restaurantes', 'Fitness', 'Inmobiliaria', 'Servicios'],
      trusted: 'De confianza: Simple Smile, Digital Romania, D&S Gaz'
    },
    howItWorks: {
      title: 'En vivo en',
      titleHighlight: '5 Minutos',
      subtitle: 'Sin app que instalar. Sin configuración compleja. Solo conecta y listo.',
      step1Title: 'Escanea el Código QR',
      step1Desc: 'Conecta tu número de WhatsApp al instante. Como WhatsApp Web.',
      step2Title: 'Cuéntale a CatyAI Sobre Tu Negocio',
      step2Desc: 'Servicios, precios, horarios, equipo. CatyAI aprende en minutos.',
      step3Title: 'CatyAI Toma el Control',
      step3Desc: 'Revisa los resultados por la mañana. Todas las conversaciones gestionadas.'
    },
    pricing: {
      title: 'Precios',
      titleHighlight: 'Simples',
      subtitle: 'Empieza gratis, actualiza cuando necesites más',
      mostPopular: 'Más Popular',
      perMonth: '/mes',
      startFree: 'Empezar Gratis',
      getStarted: 'Empezar',
      contactSales: 'Contactar Ventas',
      free: {
        name: 'GRATIS',
        price: '€0',
        features: ['100 sesiones/mes', '1 widget', '10 KB docs', 'Chat básico', 'Captura de leads']
      },
      starter: {
        name: 'STARTER',
        price: '€49',
        features: ['1.000 sesiones/mes', '1 widget', '50 KB docs', 'Seguimiento de comportamiento', 'Mensajes proactivos', 'Soporte email']
      },
      growth: {
        name: 'GROWTH',
        price: '€99',
        features: ['5.000 sesiones/mes', '3 widgets', '200 KB docs', 'Integraciones CRM', 'Handoff en vivo', 'Analytics', 'Soporte prioritario']
      },
      business: {
        name: 'BUSINESS',
        price: '€199',
        features: ['20.000 sesiones/mes', 'Widgets ilimitados', 'KB docs ilimitados', 'Acceso API', 'Gestor de cuenta', 'Integraciones custom', 'Analytics avanzado']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€499',
        features: ['Sesiones ilimitadas', 'Widgets ilimitados', 'KB docs ilimitados', 'White-label branding', 'SSO / SAML', 'Soporte dedicado', 'Garantía SLA', 'Desarrollo custom']
      }
    },
    faq: {
      title: 'Preguntas',
      titleHighlight: 'Respondidas',
      subtitle: 'Todo lo que necesitas saber sobre CatyAI',
      q1: '¿Es realmente gratis?',
      a1: 'Sí. 100 sesiones al mes, para siempre. Sin tarjeta de crédito.',
      q2: '¿Cómo se conecta a mi WhatsApp?',
      a2: 'Escaneas un código QR, como WhatsApp Web. Usa tu número de negocio existente. Tarda 2 minutos.',
      q3: '¿Sabrán los clientes que es IA?',
      a3: 'Solo si tú quieres. CatyAI responde como tu negocio, con tu estilo.',
      q4: '¿Qué pasa si CatyAI no puede responder?',
      a4: 'Te reenvía la conversación con todo el contexto. Tomas el control sin problemas.',
      q5: '¿Mis datos están seguros?',
      a5: 'Cumple con el RGPD. Servidores AWS Irlanda. Tú eres dueño de tus datos. Nunca los compartimos ni vendemos.',
      q6: '¿Funciona en español?',
      a6: '¡Con fluidez! También inglés, rumano, portugués, francés y árabe con auto-detección.'
    },
    cta: {
      title: 'Tus Competidores Ya Responden Más Rápido.',
      subtitle: 'Obtén CatyAI gratis. 100 sesiones/mes. Configuración en 5 minutos.',
      btn1: 'Obtener CatyAI Gratis',
      btn2: 'Reservar Demo'
    },
    footer: {
      tagline: 'Secretaria IA en WhatsApp. Responde 24/7. Reserva citas. Bloquea estafas.',
      product: 'Producto',
      company: 'Empresa',
      legal: 'Legal',
      about: 'Sobre nosotros',
      blog: 'Blog',
      careers: 'Carreras',
      contact: 'Contacto',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      gdpr: 'RGPD',
      licensing: 'Licencias',
      docs: 'Documentación',
      dashboard: 'Dashboard',
      copyright: 'PayAi-X FZE (Caty.AI). Todos los derechos reservados.'
    },
    floatingIndicator: '¡Pruébame!'
  },
  pt: {
    nav: { home: 'Início', features: 'Recursos', howItWorks: 'Como funciona', pricing: 'Preços', faq: 'FAQ', whatsapp: 'WhatsApp AI', fraudai: 'FraudAI', login: 'Entrar', getStarted: 'Começar Grátis' },
    hero: {
      title1: 'Transforme Conversas em',
      title2: 'Clientes Pagantes',
      subtitle: 'IA que responde, qualifica e converte — automaticamente, 24/7',
      cta1: 'Agendar Demo',
      cta2: 'Começar Grátis',
      trust1: '500 conversas GRÁTIS',
      trust2: 'Sem cartão de crédito',
      trust3: 'Setup em 2 min'
    },
    problem: {
      title: 'Você Perde Clientes Todo Dia',
      stats: [
        { value: '40%', label: 'das mensagens chegam fora do horário' },
        { value: '67%', label: 'vão embora sem resposta em 1h' },
        { value: '€0', label: 'receita de leads perdidos' }
      ]
    },
    solution: {
      badge: 'A SOLUÇÃO',
      title1: 'Isso Não É um Chatbot.',
      title2: 'É um Sistema de Vendas.',
      subtitle: 'CatyAI captura, qualifica e converte leads automaticamente'
    },
    coreFlow: {
      title: 'Como o CatyAI Funciona',
      steps: [
        { name: 'CAPTURA', icon: '📥', title: 'Resposta 24/7', desc: 'Nunca perca um lead. Respostas instantâneas.' },
        { name: 'QUALIFICA', icon: '🎯', title: 'Scoring IA', desc: 'Perguntas inteligentes. Identifica prospectos.' },
        { name: 'CONVERTE', icon: '💰', title: 'Agenda & Vende', desc: 'Marca reuniões. Fecha negócios.' }
      ]
    },
    features: {
      title: 'Sua Secretária',
      titleHighlight: 'Nunca Dorme',
      subtitle: 'Tudo que uma recepcionista faz, automatizado no WhatsApp',
      feature1Title: 'Responde Clientes 24/7',
      feature1Desc: 'Linguagem natural, lembra o contexto, fala 6+ idiomas com fluência.',
      feature2Title: 'Agenda Consultas',
      feature2Desc: 'Sincronização com Google Calendar. Envia confirmações e lembretes 30 min antes.',
      feature3Title: 'Gera Documentos',
      feature3Desc: 'Orçamentos, faturas, confirmações em PDF. Enviados diretamente no WhatsApp.',
      feature4Title: 'Bloqueia Golpes',
      feature4Desc: 'FraudAI Shield com 8 módulos de detecção. Detecta phishing antes de você ver.',
      feature5Title: 'Extrai Tarefas',
      feature5Desc: '"Liga para o João amanhã" vira uma tarefa. Resumo diário de tudo.',
      feature6Title: 'Conhece Seu Negócio',
      feature6Desc: 'Base de conhecimento de 12 domínios: preços, serviços, horários, políticas, equipe, localizações.'
    },
    products: {
      title: 'Duas Formas de',
      titleHighlight: 'Conectar com Clientes',
      subtitle: 'CatyAI funciona no seu site E no WhatsApp',
      widget: {
        title: 'Widget Chat Web',
        desc: 'Incorpore em qualquer site. Captura leads, responde perguntas, converte visitantes 24/7.',
        features: ['Uma linha de código', 'Auto-Crawl Base de Conhecimento', 'Formulários de captura', 'Analytics em tempo real']
      },
      whatsapp: {
        title: 'Secretária WhatsApp',
        desc: 'Responde clientes no WhatsApp. Agenda consultas, gera documentos, bloqueia golpes.',
        features: ['Setup com código QR', 'Sincronização calendário', 'Geração de documentos', 'FraudAI Shield']
      }
    },
    integrations: {
      title: 'Integrações',
      titleHighlight: 'Poderosas',
      subtitle: 'Conecte suas plataformas com um clique. Auto-Crawl aprende seu negócio automaticamente.',
      wordpress: { title: 'WordPress', desc: 'Plugin com um clique. Sincroniza posts, produtos, páginas.' },
      shopify: { title: 'Shopify', desc: 'Integração instantânea. Auto-sync produtos e inventário.' },
      autoCrawl: { title: 'Auto-Crawl', desc: 'Escaneia todo seu site. Extrai conteúdo, produtos, FAQs.' },
      calendar: { title: 'Google Calendar', desc: 'Disponibilidade em tempo real. Agendamentos e lembretes.' }
    },
    verticals: {
      title: 'Criado para Negócios Que',
      titleHighlight: 'Vivem no WhatsApp',
      industries: ['Clínicas Odontológicas', 'Salões de Beleza', 'Restaurantes', 'Fitness', 'Imóveis', 'Serviços'],
      trusted: 'Confiado por: Simple Smile, Digital Romania, D&S Gaz'
    },
    howItWorks: {
      title: 'Ao vivo em',
      titleHighlight: '5 Minutos',
      subtitle: 'Nenhum app para instalar. Sem configuração complexa. Só conectar e pronto.',
      step1Title: 'Escaneie o Código QR',
      step1Desc: 'Conecta seu número de WhatsApp instantaneamente. Como o WhatsApp Web.',
      step2Title: 'Conte ao CatyAI Sobre Seu Negócio',
      step2Desc: 'Serviços, preços, horários, equipe. CatyAI aprende em minutos.',
      step3Title: 'CatyAI Assume o Controle',
      step3Desc: 'Verifique os resultados de manhã. Todas as conversas tratadas.'
    },
    pricing: {
      title: 'Preços',
      titleHighlight: 'Simples',
      subtitle: 'Comece grátis, atualize quando precisar de mais',
      mostPopular: 'Mais Popular',
      perMonth: '/mês',
      startFree: 'Começar Grátis',
      getStarted: 'Começar',
      contactSales: 'Contatar Vendas',
      free: {
        name: 'GRÁTIS',
        price: '€0',
        features: ['100 sessões/mês', '1 widget', '10 KB docs', 'Chat básico', 'Captura de leads']
      },
      starter: {
        name: 'STARTER',
        price: '€49',
        features: ['1.000 sessões/mês', '1 widget', '50 KB docs', 'Rastreamento de comportamento', 'Mensagens proativas', 'Suporte email']
      },
      growth: {
        name: 'GROWTH',
        price: '€99',
        features: ['5.000 sessões/mês', '3 widgets', '200 KB docs', 'Integrações CRM', 'Handoff ao vivo', 'Analytics', 'Suporte prioritário']
      },
      business: {
        name: 'BUSINESS',
        price: '€199',
        features: ['20.000 sessões/mês', 'Widgets ilimitados', 'KB docs ilimitados', 'Acesso API', 'Gerente de conta', 'Integrações custom', 'Analytics avançado']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€499',
        features: ['Sessões ilimitadas', 'Widgets ilimitados', 'KB docs ilimitados', 'White-label branding', 'SSO / SAML', 'Suporte dedicado', 'Garantia SLA', 'Desenvolvimento custom']
      }
    },
    faq: {
      title: 'Perguntas',
      titleHighlight: 'Respondidas',
      subtitle: 'Tudo que você precisa saber sobre CatyAI',
      q1: 'É realmente grátis?',
      a1: 'Sim. 100 sessões por mês, para sempre. Sem cartão de crédito.',
      q2: 'Como se conecta ao meu WhatsApp?',
      a2: 'Você escaneia um código QR, como o WhatsApp Web. Usa seu número de negócio existente. Leva 2 minutos.',
      q3: 'Os clientes vão saber que é IA?',
      a3: 'Só se você quiser. CatyAI responde como seu negócio, com seu estilo.',
      q4: 'E se CatyAI não puder responder?',
      a4: 'Ela encaminha a conversa para você com todo o contexto. Você assume sem problemas.',
      q5: 'Meus dados estão seguros?',
      a5: 'Em conformidade com LGPD/GDPR. Servidores AWS Irlanda. Você é dono dos seus dados. Nunca compartilhamos ou vendemos.',
      q6: 'Funciona em português?',
      a6: 'Com fluência! Também inglês, espanhol, romeno, francês e árabe com auto-detecção.'
    },
    cta: {
      title: 'Seus Concorrentes Já Respondem Mais Rápido.',
      subtitle: 'Obtenha CatyAI grátis. 100 sessões/mês. Configuração em 5 minutos.',
      btn1: 'Obter CatyAI Grátis',
      btn2: 'Agendar Demo'
    },
    footer: {
      tagline: 'Secretária IA no WhatsApp. Responde 24/7. Agenda consultas. Bloqueia golpes.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      about: 'Sobre',
      blog: 'Blog',
      careers: 'Carreiras',
      contact: 'Contato',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
      gdpr: 'LGPD/GDPR',
      licensing: 'Licenciamento',
      docs: 'Documentação',
      dashboard: 'Dashboard',
      copyright: 'PayAi-X FZE (Caty.AI). Todos os direitos reservados.'
    },
    floatingIndicator: 'Experimente!'
  },
  fr: {
    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment ça marche', pricing: 'Tarifs', faq: 'FAQ', whatsapp: 'WhatsApp AI', fraudai: 'FraudAI', login: 'Connexion', getStarted: 'Commencer Gratuit' },
    hero: {
      title1: 'Transformez les Conversations en',
      title2: 'Clients Payants',
      subtitle: 'IA qui répond, qualifie et convertit — automatiquement, 24/7',
      cta1: 'Réserver une Démo',
      cta2: 'Commencer Gratuit',
      trust1: '500 conversations GRATUIT',
      trust2: 'Sans carte bancaire',
      trust3: 'Setup en 2 min'
    },
    problem: {
      title: 'Vous Perdez des Clients Chaque Jour',
      stats: [
        { value: '40%', label: 'des messages arrivent hors horaires' },
        { value: '67%', label: 'partent sans réponse en 1h' },
        { value: '€0', label: 'revenus des leads perdus' }
      ]
    },
    solution: {
      badge: 'LA SOLUTION',
      title1: "Ce N'est Pas un Chatbot.",
      title2: "C'est un Système de Vente.",
      subtitle: 'CatyAI capture, qualifie et convertit les leads automatiquement'
    },
    coreFlow: {
      title: 'Comment CatyAI Fonctionne',
      steps: [
        { name: 'CAPTURE', icon: '📥', title: 'Réponse 24/7', desc: 'Ne manquez jamais un lead. Réponses instantanées.' },
        { name: 'QUALIFIE', icon: '🎯', title: 'Scoring IA', desc: 'Questions intelligentes. Identifie les prospects.' },
        { name: 'CONVERTIT', icon: '💰', title: 'Réserve & Vend', desc: 'Planifie des réunions. Conclut des ventes.' }
      ]
    },
    features: {
      title: 'Votre Secrétaire',
      titleHighlight: 'Ne Dort Jamais',
      subtitle: 'Tout ce que fait une réceptionniste, automatisé sur WhatsApp',
      feature1Title: 'Répond aux Clients 24/7',
      feature1Desc: 'Langage naturel, se souvient du contexte, parle couramment 6+ langues.',
      feature2Title: 'Prend des Rendez-vous',
      feature2Desc: 'Synchronisation Google Calendar. Envoie des confirmations et rappels 30 min avant.',
      feature3Title: 'Génère des Documents',
      feature3Desc: 'Devis, factures, confirmations en PDF. Envoyés directement dans WhatsApp.',
      feature4Title: 'Bloque les Arnaques',
      feature4Desc: 'FraudAI Shield avec 8 modules de détection. Détecte le phishing avant que vous le voyiez.',
      feature5Title: 'Extrait des Tâches',
      feature5Desc: '"Appelle Jean demain" devient une tâche. Résumé quotidien de tout.',
      feature6Title: 'Connaît Votre Entreprise',
      feature6Desc: 'Base de connaissances de 12 domaines: prix, services, horaires, politiques, équipe, lieux.'
    },
    products: {
      title: 'Deux Façons de',
      titleHighlight: 'Connecter avec les Clients',
      subtitle: 'CatyAI fonctionne sur votre site web ET sur WhatsApp',
      widget: {
        title: 'Widget Chat Web',
        desc: 'Intégrez sur tout site. Capture des leads, répond aux questions, convertit les visiteurs 24/7.',
        features: ['Une ligne de code', 'Auto-Crawl Base de Connaissances', 'Formulaires de capture', 'Analytics en temps réel']
      },
      whatsapp: {
        title: 'Secrétaire WhatsApp',
        desc: 'Répond aux clients sur WhatsApp. Prend des rendez-vous, génère des documents, bloque les arnaques.',
        features: ['Setup avec code QR', 'Synchronisation calendrier', 'Génération de documents', 'FraudAI Shield']
      }
    },
    integrations: {
      title: 'Intégrations',
      titleHighlight: 'Puissantes',
      subtitle: 'Connectez vos plateformes en un clic. Auto-Crawl apprend votre entreprise automatiquement.',
      wordpress: { title: 'WordPress', desc: 'Plugin en un clic. Synchronise posts, produits, pages.' },
      shopify: { title: 'Shopify', desc: 'Intégration instantanée. Auto-sync produits et inventaire.' },
      autoCrawl: { title: 'Auto-Crawl', desc: 'Scanne tout votre site. Extrait contenu, produits, FAQs.' },
      calendar: { title: 'Google Calendar', desc: 'Disponibilité en temps réel. Réservations et rappels.' }
    },
    verticals: {
      title: 'Créé pour les Entreprises Qui',
      titleHighlight: 'Vivent sur WhatsApp',
      industries: ['Cabinets Dentaires', 'Salons de Beauté', 'Restaurants', 'Fitness', 'Immobilier', 'Services'],
      trusted: 'Approuvé par: Simple Smile, Digital Romania, D&S Gaz'
    },
    howItWorks: {
      title: 'En ligne en',
      titleHighlight: '5 Minutes',
      subtitle: 'Aucune appli à installer. Pas de configuration complexe. Connectez et c\'est parti.',
      step1Title: 'Scannez le Code QR',
      step1Desc: 'Connecte votre numéro WhatsApp instantanément. Comme WhatsApp Web.',
      step2Title: 'Présentez Votre Entreprise à CatyAI',
      step2Desc: 'Services, prix, horaires, équipe. CatyAI apprend en quelques minutes.',
      step3Title: 'CatyAI Prend le Relais',
      step3Desc: 'Vérifiez les résultats le matin. Toutes les conversations gérées.'
    },
    pricing: {
      title: 'Tarifs',
      titleHighlight: 'Simples',
      subtitle: 'Commencez gratuitement, passez à niveau quand vous en avez besoin',
      mostPopular: 'Le Plus Populaire',
      perMonth: '/mois',
      startFree: 'Commencer Gratuit',
      getStarted: 'Commencer',
      contactSales: 'Contacter les Ventes',
      free: {
        name: 'GRATUIT',
        price: '€0',
        features: ['100 sessions/mois', '1 widget', '10 KB docs', 'Chat basique', 'Capture de leads']
      },
      starter: {
        name: 'STARTER',
        price: '€49',
        features: ['1.000 sessions/mois', '1 widget', '50 KB docs', 'Suivi comportemental', 'Messages proactifs', 'Support email']
      },
      growth: {
        name: 'GROWTH',
        price: '€99',
        features: ['5.000 sessions/mois', '3 widgets', '200 KB docs', 'Intégrations CRM', 'Handoff en direct', 'Analytics', 'Support prioritaire']
      },
      business: {
        name: 'BUSINESS',
        price: '€199',
        features: ['20.000 sessions/mois', 'Widgets illimités', 'KB docs illimités', 'Accès API', 'Gestionnaire de compte', 'Intégrations custom', 'Analytics avancé']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€499',
        features: ['Sessions illimitées', 'Widgets illimités', 'KB docs illimités', 'White-label branding', 'SSO / SAML', 'Support dédié', 'Garantie SLA', 'Développement custom']
      }
    },
    faq: {
      title: 'Questions',
      titleHighlight: 'Répondues',
      subtitle: 'Tout ce que vous devez savoir sur CatyAI',
      q1: 'Est-ce vraiment gratuit?',
      a1: 'Oui. 100 sessions par mois, pour toujours. Sans carte bancaire.',
      q2: 'Comment se connecte-t-il à mon WhatsApp?',
      a2: 'Vous scannez un code QR, comme WhatsApp Web. Utilise votre numéro professionnel existant. Prend 2 minutes.',
      q3: 'Les clients sauront-ils que c\'est une IA?',
      a3: 'Seulement si vous le souhaitez. CatyAI répond comme votre entreprise, avec votre style.',
      q4: 'Que se passe-t-il si CatyAI ne peut pas répondre?',
      a4: 'Elle vous transfère la conversation avec tout le contexte. Vous prenez le relais sans problème.',
      q5: 'Mes données sont-elles sécurisées?',
      a5: 'Conforme au RGPD. Serveurs AWS Irlande. Vous êtes propriétaire de vos données. Nous ne les partageons ni ne les vendons jamais.',
      q6: 'Fonctionne-t-il en français?',
      a6: 'Couramment! Aussi anglais, espagnol, roumain, portugais et arabe avec auto-détection.'
    },
    cta: {
      title: 'Vos Concurrents Répondent Déjà Plus Vite.',
      subtitle: 'Obtenez CatyAI gratuitement. 100 sessions/mois. Configuration en 5 minutes.',
      btn1: 'Obtenir CatyAI Gratuit',
      btn2: 'Réserver une Démo'
    },
    footer: {
      tagline: 'Secrétaire IA sur WhatsApp. Répond 24/7. Prend des rendez-vous. Bloque les arnaques.',
      product: 'Produit',
      company: 'Entreprise',
      legal: 'Légal',
      about: 'À propos',
      blog: 'Blog',
      careers: 'Carrières',
      contact: 'Contact',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d\'Utilisation',
      gdpr: 'RGPD',
      licensing: 'Licences',
      docs: 'Documentation',
      dashboard: 'Dashboard',
      copyright: 'PayAi-X FZE (Caty.AI). Tous droits réservés.'
    },
    floatingIndicator: 'Essayez-moi!'
  }
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('caty-lang')
    return saved || 'en'
  })

  useEffect(() => {
    localStorage.setItem('caty-lang', lang)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Language Selector Component
function LanguageSelector() {
  const { lang, setLang, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-sm"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline text-gray-300">{currentLang.code.toUpperCase()}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 py-1 min-w-[140px]">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => { setLang(language.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${lang === language.code ? 'text-primary-400 bg-gray-800/50' : 'text-gray-300'}`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/images/caty-logo-96.webp" alt="Caty.AI" className="h-10 animate-pulse" width="40" height="40" />
            <span className="text-xl font-bold">Caty.AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-gray-300 hover:text-white transition-colors">{t.nav.home}</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">{t.nav.faq}</a>
            <Link to="/whatsapp" className="text-green-400 hover:text-green-300 transition-colors font-medium">{t.nav.whatsapp}</Link>
            <Link to="/fraud-shield" className="text-red-400 hover:text-red-300 transition-colors font-medium">{t.nav.fraudai}</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white transition-colors">{t.nav.login}</a>
            <a href="https://app.catyai.io/signup" className="btn-primary text-sm">{t.nav.getStarted}</a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <a href="#hero" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
              <a href="#features" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.howItWorks}</a>
              <a href="#pricing" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</a>
              <a href="#faq" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.faq}</a>
              <Link to="/whatsapp" className="text-green-400 hover:text-green-300 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.whatsapp}</Link>
              <Link to="/fraud-shield" className="text-red-400 hover:text-red-300 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.fraudai}</Link>
              <hr className="border-gray-800" />
              <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white">{t.nav.login}</a>
              <a href="https://app.catyai.io/signup" className="btn-primary text-center">{t.nav.getStarted}</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Hero Section
function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-end pb-32">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero-showcase-mobile.webp" />
          <source media="(min-width: 769px)" srcSet="/images/hero-showcase.webp" />
          <img
            src="/images/hero-showcase.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top md:object-center opacity-60"
            fetchpriority="high"
            width="1920"
            height="1080"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/60 to-gray-950"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-balance leading-tight">
            {t.hero.title1}
            <span className="gradient-text block mt-2">{t.hero.title2}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="https://calendly.com/adrian-payai-x/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.hero.cta1}
            </a>
            <a href="https://app.catyai.io/signup" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl transition-all shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 text-lg transform hover:scale-105">
              {t.hero.cta2}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.hero.trust1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.hero.trust2}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.hero.trust3}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Problem Section
function Problem() {
  const { t } = useLanguage()
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-12">
          {t.problem.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.problem.stats.map((stat, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-red-500/20">
              <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Solution Section
function Solution() {
  const { t } = useLanguage()
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">{t.solution.badge}</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-white">{t.solution.title1}</span>
          <span className="gradient-text block mt-2">{t.solution.title2}</span>
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {t.solution.subtitle}
        </p>
      </div>
    </section>
  )
}

// Core Flow Section
function CoreFlow() {
  const { t } = useLanguage()
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
          {t.coreFlow.title}
        </h3>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting arrows - desktop only */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary-500/50 to-primary-500/50 -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary-500/50 to-primary-500/50 -translate-y-1/2 z-0"></div>

          {t.coreFlow.steps.map((step, i) => (
            <div key={i} className="relative z-10 bg-gray-800/80 rounded-2xl p-6 border border-gray-700 hover:border-primary-500/50 transition-colors text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-bold rounded-full mb-3">
                {step.name}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const { t } = useLanguage()

  const featureIcons = [
    // 24/7 chat
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    // calendar
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    // document
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    // shield fraud
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    // tasks
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    // knowledge base
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ]

  const features = [
    { icon: featureIcons[0], title: t.features.feature1Title, description: t.features.feature1Desc },
    { icon: featureIcons[1], title: t.features.feature2Title, description: t.features.feature2Desc },
    { icon: featureIcons[2], title: t.features.feature3Title, description: t.features.feature3Desc },
    { icon: featureIcons[3], title: t.features.feature4Title, description: t.features.feature4Desc },
    { icon: featureIcons[4], title: t.features.feature5Title, description: t.features.feature5Desc },
    { icon: featureIcons[5], title: t.features.feature6Title, description: t.features.feature6Desc }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">{t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.features.subtitle}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card hover:border-primary-500/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Products Section - Widget + WhatsApp
function Products() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">{t.products.title} <span className="gradient-text">{t.products.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.products.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Website Widget */}
          <div className="card border-2 border-primary-500/30 hover:border-primary-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white">{t.products.widget.title}</h3>
            </div>
            <p className="text-gray-400 mb-6">{t.products.widget.desc}</p>
            <ul className="space-y-2">
              {t.products.widget.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="https://app.catyai.io/signup" className="btn-primary mt-6 w-full justify-center">
              Add Widget to Site
            </a>
          </div>

          {/* WhatsApp Secretary */}
          <div className="card border-2 border-green-500/30 hover:border-green-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-white">{t.products.whatsapp.title}</h3>
            </div>
            <p className="text-gray-400 mb-6">{t.products.whatsapp.desc}</p>
            <ul className="space-y-2">
              {t.products.whatsapp.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="https://app.catyai.io/signup" className="inline-flex items-center justify-center gap-2 w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all">
              Connect WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Integrations Section - Auto-Crawl, WordPress, Shopify, Calendar
function Integrations() {
  const { t } = useLanguage()

  const integrations = [
    { key: 'autoCrawl', icon: '🔍', color: 'from-purple-500 to-pink-500' },
    { key: 'wordpress', icon: '📝', color: 'from-blue-500 to-cyan-500' },
    { key: 'shopify', icon: '🛍️', color: 'from-green-500 to-emerald-500' },
    { key: 'calendar', icon: '📅', color: 'from-orange-500 to-amber-500' }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">{t.integrations.title} <span className="gradient-text">{t.integrations.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.integrations.subtitle}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {integrations.map((int) => (
            <div key={int.key} className="card hover:border-primary-500/50 transition-all group relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${int.color}`}></div>
              <span className="text-3xl mb-3 block">{int.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{t.integrations[int.key].title}</h3>
              <p className="text-gray-400 text-sm">{t.integrations[int.key].desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/analyze" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:text-purple-300 hover:border-purple-400/50 font-medium rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Try Auto-Crawl Free — Analyze Your Website
          </Link>
        </div>
      </div>
    </section>
  )
}

// Verticals Section
function Verticals() {
  const { t } = useLanguage()
  const industryIcons = ['🦷', '💇', '🍽️', '🏋️', '🏠', '🔧']

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">
          {t.verticals.title} <span className="gradient-text">{t.verticals.titleHighlight}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-12 mb-8">
          {t.verticals.industries.map((industry, index) => (
            <div key={index} className="card flex items-center gap-3 hover:border-primary-500/50 transition-colors">
              <span className="text-2xl">{industryIcons[index]}</span>
              <span className="text-white font-medium">{industry}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm">{t.verticals.trusted}</p>
      </div>
    </section>
  )
}

// Intelligence section removed — replaced by Verticals

// How It Works Section
function HowItWorks() {
  const { t } = useLanguage()

  const stepImages = ['/images/caty-point-right.webp', '/images/caty-think.webp', '/images/caty-happy.webp']
  const stepIcons = [
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ]

  const steps = [
    { number: '01', title: t.howItWorks.step1Title, description: t.howItWorks.step1Desc, icon: stepIcons[0], image: stepImages[0] },
    { number: '02', title: t.howItWorks.step2Title, description: t.howItWorks.step2Desc, icon: stepIcons[1], image: stepImages[1] },
    { number: '03', title: t.howItWorks.step3Title, description: t.howItWorks.step3Desc, icon: stepIcons[2], image: stepImages[2] }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">{t.howItWorks.title} <span className="gradient-text">{t.howItWorks.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.howItWorks.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent -z-10"></div>
              )}
              <div className="card h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-primary-500/20">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                <div className="flex justify-center my-4">
                  <img src={step.image} alt={step.title} className="h-32 object-contain" width="128" height="128" loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Integrations section removed — replaced by Verticals

// Pricing Section
function Pricing() {
  const { t } = useLanguage()

  const plans = [
    {
      id: 'free',
      name: t.pricing.free.name,
      price: t.pricing.free.price,
      setup: null,
      features: t.pricing.free.features,
      cta: t.pricing.startFree,
      ctaLink: 'https://app.catyai.io/signup?plan=free',
      popular: false
    },
    {
      id: 'starter',
      name: t.pricing.starter.name,
      price: t.pricing.starter.price,
      setup: t.pricing.starter.setup,
      features: t.pricing.starter.features,
      cta: t.pricing.getStarted,
      ctaLink: 'https://app.catyai.io/signup?plan=starter',
      popular: false
    },
    {
      id: 'growth',
      name: t.pricing.growth.name,
      price: t.pricing.growth.price,
      setup: t.pricing.growth.setup,
      features: t.pricing.growth.features,
      cta: t.pricing.getStarted,
      ctaLink: 'https://app.catyai.io/signup?plan=growth',
      popular: true
    },
    {
      id: 'business',
      name: t.pricing.business.name,
      price: t.pricing.business.price,
      setup: t.pricing.business.setup,
      features: t.pricing.business.features,
      cta: t.pricing.getStarted,
      ctaLink: 'https://app.catyai.io/signup?plan=business',
      popular: false
    },
    {
      id: 'enterprise',
      name: t.pricing.enterprise.name,
      price: t.pricing.enterprise.price,
      setup: t.pricing.enterprise.setup,
      features: t.pricing.enterprise.features,
      cta: t.pricing.contactSales,
      ctaLink: 'mailto:contact@payai-x.com?subject=Enterprise%20Plan%20Inquiry',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">{t.pricing.title} <span className="gradient-text">{t.pricing.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.pricing.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card relative flex flex-col ${plan.popular ? 'border-primary-500 lg:scale-105 z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 rounded-full text-xs font-medium whitespace-nowrap">
                  {t.pricing.mostPopular}
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="text-sm font-bold text-gray-400 tracking-wider mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{t.pricing.perMonth}</span>
                </div>
                {plan.setup && (
                  <div className="text-xs text-gray-500 mt-1">+ {plan.setup} {t.pricing.setupFee}</div>
                )}
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-gray-300 text-xs">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                className={`w-full block text-center py-2.5 rounded-lg font-medium transition-all text-sm ${
                  plan.popular
                    ? 'btn-primary'
                    : plan.id === 'free'
                      ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                      : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 }
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">{t.faq.title} <span className="gradient-text">{t.faq.titleHighlight}</span></h2>
        <p className="section-subtitle">
          {t.faq.subtitle}
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 text-gray-400 border-t border-gray-800 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="card bg-gradient-to-br from-green-500/10 to-primary-500/10 border-green-500/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.catyai.io/signup" className="btn-primary text-lg px-8 py-4">
              {t.cta.btn1}
            </a>
            <a href="https://calendly.com/adrian-payai-x/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-8 py-4">
              {t.cta.btn2}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Powered By Section
function PoweredBy() {
  const { t } = useLanguage()

  const features = {
    en: [
      { icon: '🧠', title: 'Contextual Memory', desc: 'Remembers conversations across sessions. Never asks the same question twice.' },
      { icon: '👤', title: 'Visitor Recognition', desc: 'Returning visitors are recognized with their full history and preferences.' }
    ],
    ro: [
      { icon: '🧠', title: 'Memorie Contextuală', desc: 'Ține minte conversațiile între sesiuni. Nu pune aceeași întrebare de două ori.' },
      { icon: '👤', title: 'Recunoaștere Vizitatori', desc: 'Vizitatorii care revin sunt recunoscuți cu tot istoricul și preferințele lor.' }
    ],
    es: [
      { icon: '🧠', title: 'Memoria Contextual', desc: 'Recuerda conversaciones entre sesiones. Nunca hace la misma pregunta dos veces.' },
      { icon: '👤', title: 'Reconocimiento de Visitantes', desc: 'Los visitantes que regresan son reconocidos con todo su historial.' }
    ],
    pt: [
      { icon: '🧠', title: 'Memória Contextual', desc: 'Lembra conversas entre sessões. Nunca faz a mesma pergunta duas vezes.' },
      { icon: '👤', title: 'Reconhecimento de Visitantes', desc: 'Visitantes que retornam são reconhecidos com todo seu histórico.' }
    ],
    fr: [
      { icon: '🧠', title: 'Mémoire Contextuelle', desc: 'Se souvient des conversations entre sessions. Ne pose jamais la même question deux fois.' },
      { icon: '👤', title: 'Reconnaissance des Visiteurs', desc: 'Les visiteurs récurrents sont reconnus avec tout leur historique.' }
    ]
  }

  const currentFeatures = features[t.nav?.home === 'Acasă' ? 'ro' : t.nav?.home === 'Inicio' ? 'es' : t.nav?.home === 'Início' ? 'pt' : t.nav?.home === 'Accueil' ? 'fr' : 'en']

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <span className="text-primary-400 text-sm font-semibold">AUREX v2</span>
          </div>
          <p className="text-gray-400">AI Memory Engine</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {currentFeatures.map((feature, i) => (
            <div key={i} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/30 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component - uses shared Footer from components
function Footer() {
  const { t } = useLanguage()
  return <FooterComponent t={t} />
}

// Promotional Popup - appears after 3 seconds
function PromotionalPopup() {
  const { t } = useLanguage()
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user already dismissed it today
    const lastDismissed = localStorage.getItem('catyPromoLastDismissed')
    const today = new Date().toDateString()

    if (lastDismissed === today) {
      return
    }

    // Show after 3 seconds
    const timer = setTimeout(() => {
      setShow(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    localStorage.setItem('catyPromoLastDismissed', new Date().toDateString())
  }

  const handleAnalyze = () => {
    window.open('https://wa.me/40750195048?text=demo', '_blank')
  }

  if (!show || dismissed) return null

  return (
    <>
      {/* Caty with speech bubble - CommerceDemo style */}
      <div
        className="caty-promo-container"
        style={{
          position: 'fixed',
          left: '50%',
          bottom: '180px',
          transform: 'translateX(-50%)',
          zIndex: 2147483646,
        }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 bg-gray-900 rounded-full p-1.5 text-gray-400 hover:text-white transition-colors z-10 shadow-lg border border-gray-700"
          style={{ zIndex: 2147483647 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Speech Bubble - EXACT CommerceDemo style */}
        <div
          className="caty-bubble"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '15px',
            background: 'white',
            borderRadius: '20px',
            padding: '16px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
            minWidth: '320px',
            maxWidth: '380px',
            zIndex: 2147483647,
          }}
        >
          <p style={{
            color: '#333',
            textAlign: 'center',
            fontSize: '15px',
            lineHeight: 1.5,
            margin: 0,
            fontWeight: 500
          }}>
            <strong>Try CatyAI on WhatsApp</strong> — Send "demo" to +40 756 730 193
          </p>

          {/* Arrow pointing down to Caty */}
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '12px solid white',
          }} />
        </div>

        {/* Caty with laser effect - EXACT CommerceDemo style */}
        <div className="relative" style={{ width: '160px', height: '160px' }}>
          {/* Laser beams - from CommerceDemo */}
          <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
            <div
              className="caty-laser caty-laser-1"
              style={{
                position: 'absolute',
                top: '30%',
                right: '100%',
                width: '300px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, #00d4ff, transparent)',
                transformOrigin: 'right center',
                opacity: 0.7,
              }}
            />
            <div
              className="caty-laser caty-laser-2"
              style={{
                position: 'absolute',
                top: '50%',
                right: '100%',
                width: '280px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, #00ffaa, transparent)',
                transformOrigin: 'right center',
                opacity: 0.6,
              }}
            />
            <div
              className="caty-laser caty-laser-3"
              style={{
                position: 'absolute',
                top: '70%',
                right: '100%',
                width: '320px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, #ff00ff, transparent)',
                transformOrigin: 'right center',
                opacity: 0.5,
              }}
            />
          </div>

          {/* Caty sprite */}
          <img
            src="/images/caty-point-left.png"
            alt="Caty AI"
            className="caty-sprite-pointing"
            style={{
              width: '160px',
              height: 'auto',
              position: 'relative',
              zIndex: 10,
              filter: 'drop-shadow(0 8px 25px rgba(0, 212, 255, 0.5))',
              cursor: 'pointer',
            }}
            onClick={handleAnalyze}
          />

          {/* Glow effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 0,
          }} />
        </div>
      </div>

      <style>{`
        /* CommerceDemo animations */
        .caty-promo-container {
          animation: catyEntrance 0.6s ease-out;
        }
        @keyframes catyEntrance {
          0% { opacity: 0; transform: translateX(-50%) translateY(60px) scale(0.5); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        .caty-bubble {
          animation: bubbleIn 0.3s ease-out;
        }
        @keyframes bubbleIn {
          0% { opacity: 0; transform: translateX(-50%) translateY(15px) scale(0.9); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        .caty-sprite-pointing {
          animation: pointPulse 1s ease-in-out infinite;
        }
        @keyframes pointPulse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-12px); }
        }

        /* Laser beam animations - EXACT CommerceDemo */
        .caty-laser-1 {
          animation: laserPulse1 2s ease-in-out infinite;
        }
        .caty-laser-2 {
          animation: laserPulse2 2s ease-in-out infinite 0.3s;
        }
        .caty-laser-3 {
          animation: laserPulse3 2s ease-in-out infinite 0.6s;
        }
        @keyframes laserPulse1 {
          0%, 100% { opacity: 0.3; transform: scaleX(0.6) rotate(-2deg); }
          50% { opacity: 0.9; transform: scaleX(1.2) rotate(2deg); }
        }
        @keyframes laserPulse2 {
          0%, 100% { opacity: 0.3; transform: scaleX(0.7) rotate(1deg); }
          50% { opacity: 0.8; transform: scaleX(1.1) rotate(-1deg); }
        }
        @keyframes laserPulse3 {
          0%, 100% { opacity: 0.2; transform: scaleX(0.8) rotate(-1deg); }
          50% { opacity: 0.7; transform: scaleX(1.3) rotate(1deg); }
        }
      `}</style>
    </>
  )
}

// Floating Widget Indicator - only shows in hero section
function FloatingWidgetIndicator() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling past 600px (approximately end of hero)
      setVisible(window.scrollY < 600)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-center gap-2 animate-bounce">
      <div className="bg-primary-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
        {t.floatingIndicator}
      </div>
      <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

// Home Page FAQ data for structured data
const homepageFAQ = [
  {
    question: 'Is CatyAI really free?',
    answer: 'Yes. 100 sessions per month, forever. No credit card required.'
  },
  {
    question: 'What does CatyAI do?',
    answer: 'CatyAI is an AI secretary on WhatsApp that responds to customers 24/7, books appointments, generates documents, and blocks scams with FraudAI Shield.'
  },
  {
    question: 'How does CatyAI connect to WhatsApp?',
    answer: 'Scan a QR code, like WhatsApp Web. Uses your existing business number. Takes 2 minutes.'
  },
  {
    question: 'Does CatyAI work in Romanian?',
    answer: 'Fluently. Also English, Spanish, Portuguese, French, Arabic with auto-detection.'
  },
  {
    question: 'Will customers know it\'s AI?',
    answer: 'Only if you want them to. CatyAI can respond as your business, with your name and style.'
  },
  {
    question: 'What if CatyAI can\'t answer?',
    answer: 'It forwards the conversation to you with full context, so you can take over seamlessly.'
  }
];

function HomePage() {
  return (
    <>
      <SEO
        title="AI Chatbot That Converts Visitors Into Customers"
        description="CatyAI is an AI sales agent that responds, qualifies and converts your website visitors into real customers. 24/7 automation for WhatsApp and websites."
        url="https://catyai.io/"
        faq={homepageFAQ}
      />
      <Hero />
      <Problem />
      <Solution />
      <WhatsAppZeroMeta />
      <CoreFlow />
      <CaseStudies />
      <ROICalculator />
      <Products />
      <DocGenEngine />
      <Integrations />
      <Verticals />
      <HowItWorks />
      <ComparisonTable />
      <Testimonials />
      <PartnersPress />
      <Pricing />
      <FAQ />
      <CTA />
      <FloatingWidgetIndicator />
    </>
  )
}

// Scroll to hash handler
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else if (location.pathname !== window.location.pathname) {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

// Main App
function AppContent() {
  const location = useLocation()

  // Pages with their own layout (no shared Header/Footer)
  const standalonePages = ['/whatsapp', '/fraud-shield', '/no-website', '/trust-center']
  const isStandalonePage = standalonePages.includes(location.pathname)

  // Track referral code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      // Store in localStorage for signup flow
      localStorage.setItem('catyai_ref', ref.toUpperCase())

      // Track visit (optional)
      fetch('https://api.catyai.io/api/public/track/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: ref,
          event: 'visit',
          landing_page: window.location.pathname,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign')
        })
      }).catch(() => {}) // Ignore errors
    }
  }, [])

  // Standalone pages render without shared layout
  if (isStandalonePage) {
    return (
      <div className="min-h-screen">
        <ScrollToHash />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/whatsapp" element={<WhatsAppAI />} />
            <Route path="/fraud-shield" element={<FraudAI />} />
            <Route path="/chatbot-romania" element={<ChatbotRomania />} />
            <Route path="/no-website" element={<NoWebsite />} />
            <Route path="/trust-center" element={<TrustCenter />} />
          </Routes>
        </Suspense>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ScrollToHash />
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/gdpr" element={<GDPRPolicy />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/license-agpl" element={<LicenseAGPL />} />
            <Route path="/analyze" element={<SiteAnalyzer />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/commerce" element={<CommerceDemo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
          </Routes>
        </Suspense>
      </main>
      <PoweredBy />
      <Footer />

      {/* WhatsApp Direct Button - Left Side */}
      <a
        href="https://wa.me/40750195048?text=Salut! Vreau să aflu mai multe despre CatyAI"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        title="Chat on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="font-medium hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
