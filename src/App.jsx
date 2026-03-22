import { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import SEO from './components/SEO'
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
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import GDPRPolicy from './pages/GDPRPolicy'
import Licensing from './pages/Licensing'
import LicenseAGPL from './pages/LicenseAGPL'
import SiteAnalyzer from './pages/SiteAnalyzer'
import About from './pages/About'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import CommerceDemo from './pages/CommerceDemo'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import WhatsAppAI from './pages/WhatsAppAI'

// Language Context
const LanguageContext = createContext()

const translations = {
  en: {
    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Start Free' },
    hero: {
      badge: 'AI Chat Widget for Your Website',
      title1: 'AI Chat Widget',
      title2: 'for Your Website',
      subtitle: 'Capture leads, answer questions, convert visitors 24/7. One line of code. Auto-learns your business. Works on any website.',
      cta1: 'Start Free — €0/month',
      cta2: 'Book Demo',
      analyzeLink: 'Analyze your website for free',
      noCard: '100 sessions/month FREE',
      fiveMin: 'Setup in 5 min',
      cancel: 'No credit card',
      tryMe: 'Try CatyAI Now!',
      tryMeDesc: 'Click the chat widget in the corner',
      tryWidget: 'Or try the chat widget below',
      mockupOnline: 'Online 24/7',
      mockupGreeting: "Hi! I'm your AI assistant. How can I help?",
      mockupUserQ: 'What services do you offer?',
      mockupBotA: 'We offer web design, SEO, and digital marketing. Would you like a quote?',
      mockupPlaceholder: 'Type a message...'
    },
    problem: {
      title: 'Your Customers Message You.',
      titleHighlight: 'Nobody Answers.',
      stat1: '40% of customers call evenings/weekends',
      stat2: '67% switch to competitor if no response in 1 hour',
      stat3: 'A human receptionist costs €1,500/month',
      solution: 'CatyAI responds instantly, 24/7, for €0.'
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
      setupFee: 'one-time setup',
      free: {
        name: 'FREE',
        price: '€0',
        features: ['100 sessions/month', '1 widget', '10 KB docs', 'Basic chat', 'Lead capture']
      },
      starter: {
        name: 'STARTER',
        price: '€149',
        setup: '€499',
        features: ['1,000 sessions/month', '1 widget', '50 KB docs', 'Behavioral tracking', 'Proactive messages', 'Email support']
      },
      growth: {
        name: 'GROWTH',
        price: '€299',
        setup: '€999',
        features: ['5,000 sessions/month', '3 widgets', '200 KB docs', 'CRM integrations', 'Live handoff', 'Analytics', 'Priority support']
      },
      business: {
        name: 'BUSINESS',
        price: '€499',
        setup: '€1999',
        features: ['20,000 sessions/month', 'Unlimited widgets', 'Unlimited KB docs', 'API access', 'Account manager', 'Custom integrations', 'Advanced analytics']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€800',
        setup: '€3800',
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
    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'Întrebări', login: 'Autentificare', getStarted: 'Începe Gratuit' },
    hero: {
      badge: 'Widget Chat AI pentru Site-ul Tău',
      title1: 'Widget Chat AI',
      title2: 'pentru Site-ul Tău',
      subtitle: 'Captează lead-uri, răspunde la întrebări, convertește vizitatori 24/7. O singură linie de cod. Învață automat afacerea ta.',
      cta1: 'Începe Gratuit — €0/lună',
      cta2: 'Programează Demo',
      analyzeLink: 'Analizează site-ul tău gratuit',
      noCard: '100 sesiuni/lună GRATUIT',
      fiveMin: 'Setup în 5 minute',
      cancel: 'Fără card bancar',
      tryMe: 'Încearcă CatyAI Acum!',
      tryMeDesc: 'Click pe widget-ul de chat din colț',
      tryWidget: 'Sau încearcă widget-ul de chat mai jos',
      mockupOnline: 'Online 24/7',
      mockupGreeting: 'Bună! Sunt asistentul tău AI. Cu ce te pot ajuta?',
      mockupUserQ: 'Ce servicii oferiți?',
      mockupBotA: 'Oferim web design, SEO și marketing digital. Dorești o ofertă?',
      mockupPlaceholder: 'Scrie un mesaj...'
    },
    problem: {
      title: 'Clienții te contactează pe WhatsApp.',
      titleHighlight: 'Nimeni nu răspunde.',
      stat1: '40% din clienți scriu seara și în weekend',
      stat2: '67% aleg competitorul dacă nu primesc răspuns în 1 oră',
      stat3: 'O recepționeră umană costă €1.500/lună',
      solution: 'CatyAI răspunde instant, 24/7, pentru €0.'
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
      setupFee: 'setup unic',
      free: {
        name: 'GRATUIT',
        price: '€0',
        features: ['100 sesiuni/lună', '1 widget', '10 KB docs', 'Chat basic', 'Captare lead-uri']
      },
      starter: {
        name: 'STARTER',
        price: '€149',
        setup: '€499',
        features: ['1.000 sesiuni/lună', '1 widget', '50 KB docs', 'Tracking comportament', 'Mesaje proactive', 'Suport email']
      },
      growth: {
        name: 'GROWTH',
        price: '€299',
        setup: '€999',
        features: ['5.000 sesiuni/lună', '3 widget-uri', '200 KB docs', 'Integrări CRM', 'Handoff live', 'Analytics', 'Suport prioritar']
      },
      business: {
        name: 'BUSINESS',
        price: '€499',
        setup: '€1999',
        features: ['20.000 sesiuni/lună', 'Widget-uri nelimitate', 'KB docs nelimitate', 'Acces API', 'Manager cont', 'Integrări custom', 'Analytics avansat']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€800',
        setup: '€3800',
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
    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo funciona', pricing: 'Precios', faq: 'FAQ', login: 'Iniciar sesión', getStarted: 'Empezar Gratis' },
    hero: {
      badge: 'Widget Chat IA para Tu Sitio Web',
      title1: 'Widget Chat IA',
      title2: 'para Tu Sitio Web',
      subtitle: 'Captura leads, responde preguntas, convierte visitantes 24/7. Una línea de código. Aprende tu negocio automáticamente.',
      cta1: 'Empezar Gratis — €0/mes',
      cta2: 'Reservar Demo',
      analyzeLink: 'Analiza tu sitio web gratis',
      noCard: '100 sesiones/mes GRATIS',
      fiveMin: 'Configuración en 5 min',
      cancel: 'Sin tarjeta de crédito',
      tryMe: '¡Prueba CatyAI Ahora!',
      tryMeDesc: 'Haz clic en el widget de chat en la esquina',
      tryWidget: 'O prueba el widget de chat abajo',
      mockupOnline: 'En línea 24/7',
      mockupGreeting: '¡Hola! Soy tu asistente IA. ¿Cómo puedo ayudarte?',
      mockupUserQ: '¿Qué servicios ofrecéis?',
      mockupBotA: 'Ofrecemos diseño web, SEO y marketing digital. ¿Te gustaría un presupuesto?',
      mockupPlaceholder: 'Escribe un mensaje...'
    },
    problem: {
      title: 'Tus clientes te escriben.',
      titleHighlight: 'Nadie responde.',
      stat1: 'El 40% de los clientes escribe por las noches y fines de semana',
      stat2: 'El 67% elige a la competencia si no hay respuesta en 1 hora',
      stat3: 'Una recepcionista humana cuesta €1.500/mes',
      solution: 'CatyAI responde al instante, 24/7, por €0.'
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
      setupFee: 'setup único',
      free: {
        name: 'GRATIS',
        price: '€0',
        features: ['100 sesiones/mes', '1 widget', '10 KB docs', 'Chat básico', 'Captura de leads']
      },
      starter: {
        name: 'STARTER',
        price: '€149',
        setup: '€499',
        features: ['1.000 sesiones/mes', '1 widget', '50 KB docs', 'Seguimiento de comportamiento', 'Mensajes proactivos', 'Soporte email']
      },
      growth: {
        name: 'GROWTH',
        price: '€299',
        setup: '€999',
        features: ['5.000 sesiones/mes', '3 widgets', '200 KB docs', 'Integraciones CRM', 'Handoff en vivo', 'Analytics', 'Soporte prioritario']
      },
      business: {
        name: 'BUSINESS',
        price: '€499',
        setup: '€1999',
        features: ['20.000 sesiones/mes', 'Widgets ilimitados', 'KB docs ilimitados', 'Acceso API', 'Gestor de cuenta', 'Integraciones custom', 'Analytics avanzado']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€800',
        setup: '€3800',
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
    nav: { home: 'Início', features: 'Recursos', howItWorks: 'Como funciona', pricing: 'Preços', faq: 'FAQ', login: 'Entrar', getStarted: 'Começar Grátis' },
    hero: {
      badge: 'Widget Chat IA para Seu Site',
      title1: 'Widget Chat IA',
      title2: 'para Seu Site',
      subtitle: 'Capture leads, responda perguntas, converta visitantes 24/7. Uma linha de código. Aprende seu negócio automaticamente.',
      cta1: 'Começar Grátis — €0/mês',
      cta2: 'Agendar Demo',
      analyzeLink: 'Analise seu site grátis',
      noCard: '100 sessões/mês GRÁTIS',
      fiveMin: 'Configuração em 5 min',
      cancel: 'Sem cartão de crédito',
      tryMe: 'Experimente CatyAI Agora!',
      tryMeDesc: 'Clique no widget de chat no canto',
      tryWidget: 'Ou experimente o widget de chat abaixo',
      mockupOnline: 'Online 24/7',
      mockupGreeting: 'Olá! Sou seu assistente IA. Como posso ajudar?',
      mockupUserQ: 'Quais serviços vocês oferecem?',
      mockupBotA: 'Oferecemos web design, SEO e marketing digital. Gostaria de um orçamento?',
      mockupPlaceholder: 'Digite uma mensagem...'
    },
    problem: {
      title: 'Seus clientes te mandam mensagem.',
      titleHighlight: 'Ninguém responde.',
      stat1: '40% dos clientes escrevem à noite e nos fins de semana',
      stat2: '67% escolhem o concorrente se não houver resposta em 1 hora',
      stat3: 'Uma recepcionista humana custa €1.500/mês',
      solution: 'CatyAI responde instantaneamente, 24/7, por €0.'
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
      setupFee: 'setup único',
      free: {
        name: 'GRÁTIS',
        price: '€0',
        features: ['100 sessões/mês', '1 widget', '10 KB docs', 'Chat básico', 'Captura de leads']
      },
      starter: {
        name: 'STARTER',
        price: '€149',
        setup: '€499',
        features: ['1.000 sessões/mês', '1 widget', '50 KB docs', 'Rastreamento de comportamento', 'Mensagens proativas', 'Suporte email']
      },
      growth: {
        name: 'GROWTH',
        price: '€299',
        setup: '€999',
        features: ['5.000 sessões/mês', '3 widgets', '200 KB docs', 'Integrações CRM', 'Handoff ao vivo', 'Analytics', 'Suporte prioritário']
      },
      business: {
        name: 'BUSINESS',
        price: '€499',
        setup: '€1999',
        features: ['20.000 sessões/mês', 'Widgets ilimitados', 'KB docs ilimitados', 'Acesso API', 'Gerente de conta', 'Integrações custom', 'Analytics avançado']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€800',
        setup: '€3800',
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
    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment ça marche', pricing: 'Tarifs', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer Gratuit' },
    hero: {
      badge: 'Widget Chat IA pour Votre Site',
      title1: 'Widget Chat IA',
      title2: 'pour Votre Site',
      subtitle: 'Capturez des leads, répondez aux questions, convertissez des visiteurs 24/7. Une ligne de code. Apprend votre entreprise automatiquement.',
      cta1: 'Commencer Gratuit — €0/mois',
      cta2: 'Réserver une Démo',
      analyzeLink: 'Analysez votre site gratuitement',
      noCard: '100 sessions/mois GRATUIT',
      fiveMin: 'Configuration en 5 min',
      cancel: 'Sans carte bancaire',
      tryMe: 'Essayez CatyAI Maintenant!',
      tryMeDesc: 'Cliquez sur le widget de chat dans le coin',
      tryWidget: 'Ou essayez le widget de chat ci-dessous',
      mockupOnline: 'En ligne 24/7',
      mockupGreeting: 'Bonjour! Je suis votre assistant IA. Comment puis-je vous aider?',
      mockupUserQ: 'Quels services proposez-vous?',
      mockupBotA: 'Nous proposons la conception web, le SEO et le marketing digital. Souhaitez-vous un devis?',
      mockupPlaceholder: 'Tapez un message...'
    },
    problem: {
      title: 'Vos clients vous écrivent.',
      titleHighlight: 'Personne ne répond.',
      stat1: '40% des clients écrivent le soir et le week-end',
      stat2: '67% choisissent le concurrent sans réponse en 1 heure',
      stat3: 'Une réceptionniste humaine coûte €1.500/mois',
      solution: 'CatyAI répond instantanément, 24/7, pour €0.'
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
      setupFee: 'frais unique',
      free: {
        name: 'GRATUIT',
        price: '€0',
        features: ['100 sessions/mois', '1 widget', '10 KB docs', 'Chat basique', 'Capture de leads']
      },
      starter: {
        name: 'STARTER',
        price: '€149',
        setup: '€499',
        features: ['1.000 sessions/mois', '1 widget', '50 KB docs', 'Suivi comportemental', 'Messages proactifs', 'Support email']
      },
      growth: {
        name: 'GROWTH',
        price: '€299',
        setup: '€999',
        features: ['5.000 sessions/mois', '3 widgets', '200 KB docs', 'Intégrations CRM', 'Handoff en direct', 'Analytics', 'Support prioritaire']
      },
      business: {
        name: 'BUSINESS',
        price: '€499',
        setup: '€1999',
        features: ['20.000 sessions/mois', 'Widgets illimités', 'KB docs illimités', 'Accès API', 'Gestionnaire de compte', 'Intégrations custom', 'Analytics avancé']
      },
      enterprise: {
        name: 'ENTERPRISE',
        price: '€800',
        setup: '€3800',
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

function useLanguage() {
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
            <img src="/images/caty-logo.png" alt="Caty.AI" className="h-10 animate-pulse" />
            <span className="text-xl font-bold">Caty.AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-gray-300 hover:text-white transition-colors">{t.nav.home}</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">{t.nav.howItWorks}</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">{t.nav.faq}</a>
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
    <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/caty-talk.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/85 via-gray-950/80 to-gray-950 sm:from-gray-950/80 sm:via-gray-950/75"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            {t.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-balance">
            {t.hero.title1}
            <span className="gradient-text block mt-2">{t.hero.title2}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="https://app.catyai.io/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 text-xl transform hover:scale-105">
              {t.hero.cta1}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="https://calendly.com/adrian-payai-x/30min?month=2026-03" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-green-500/25">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {t.hero.cta2}
            </a>
          </div>

          <div className="mb-10">
            <Link to="/analyze" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 hover:text-primary-300 hover:border-primary-400/50 font-medium transition-all group">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <span>{t.hero.analyzeLink}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.hero.noCard}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.hero.fiveMin}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.hero.cancel}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Mockup */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-primary-500/10 to-green-500/10 blur-3xl -z-10"></div>
          <div className="card p-6 max-w-sm mx-auto">
            {/* WhatsApp-style header */}
            <div className="bg-[#075E54] rounded-t-xl px-4 py-3 flex items-center gap-3">
              <img src="/images/caty-logo.png" alt="Caty" className="h-10 w-10 rounded-full object-contain bg-white p-1" />
              <div>
                <p className="text-white font-semibold text-sm">CatyAI Secretary</p>
                <p className="text-green-200 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                  {t.hero.mockupOnline}
                </p>
              </div>
            </div>
            {/* Chat bubbles */}
            <div className="bg-[#ECE5DD] rounded-b-xl p-4 space-y-3 min-h-[200px]">
              <div className="flex gap-2 items-end">
                <div className="bg-white rounded-lg rounded-bl-none px-3 py-2 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 text-sm">{t.hero.mockupGreeting}</p>
                  <p className="text-gray-400 text-xs text-right mt-1">09:00</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-lg rounded-br-none px-3 py-2 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 text-sm">{t.hero.mockupUserQ}</p>
                  <p className="text-gray-400 text-xs text-right mt-1">09:01</p>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <div className="bg-white rounded-lg rounded-bl-none px-3 py-2 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 text-sm">{t.hero.mockupBotA}</p>
                  <p className="text-gray-400 text-xs text-right mt-1">09:01</p>
                </div>
              </div>
            </div>
            {/* Input bar */}
            <div className="bg-[#F0F0F0] rounded-b-xl px-3 py-2 flex items-center gap-2 border-t border-gray-200">
              <div className="bg-white rounded-full px-4 py-2 flex-1 text-gray-400 text-sm">{t.hero.mockupPlaceholder}</div>
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">{t.hero.tryWidget}</p>
        </div>
      </div>
    </section>
  )
}

// Problem Section
function Problem() {
  const { t } = useLanguage()
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          {t.problem.title} <span className="text-red-400">{t.problem.titleHighlight}</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <p className="text-3xl font-bold text-red-400 mb-2">40%</p>
            <p className="text-gray-400">{t.problem.stat1}</p>
          </div>
          <div className="card">
            <p className="text-3xl font-bold text-red-400 mb-2">67%</p>
            <p className="text-gray-400">{t.problem.stat2}</p>
          </div>
          <div className="card">
            <p className="text-3xl font-bold text-red-400 mb-2">€1,500</p>
            <p className="text-gray-400">{t.problem.stat3}</p>
          </div>
        </div>
        <p className="text-xl text-primary-400 font-semibold">{t.problem.solution}</p>
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

  const stepImages = ['/images/caty-point-right.png', '/images/caty-think.png', '/images/caty-happy.png']
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
                  <img src={step.image} alt={step.title} className="h-32 object-contain" />
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
  const technologies = [
    { name: 'AWS', svg: '/images/logos/aws.svg', title: 'Amazon Web Services' },
    { name: 'MongoDB', icon: 'mongodb', title: 'MongoDB Atlas' },
    { name: 'OpenAI', svg: '/images/logos/openai.svg', title: 'OpenAI' },
    { name: 'Supabase', icon: 'supabase', title: 'Supabase' },
    { name: 'Redis', icon: 'redis', title: 'Redis' },
    { name: 'Qdrant', svg: '/images/logos/qdrant.svg', title: 'Qdrant' },
    { name: 'Stripe', icon: 'stripe', title: 'Stripe' },
    { name: 'Node.js', icon: 'nodedotjs', title: 'Node.js' }
  ]

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
          Powered by
        </p>
        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-10">
          {technologies.map((tech) => (
            <img
              key={tech.name}
              src={tech.svg || `https://cdn.simpleicons.org/${tech.icon}/6b7280`}
              alt={tech.name}
              title={tech.title}
              className="h-6 md:h-7 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Logo & Tagline - full width on mobile */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <img src="/images/caty-logo.png" alt="Caty.AI" className="h-8 animate-pulse" />
              <span className="text-lg font-bold text-white">Caty.AI</span>
            </Link>
            <p className="text-gray-300 text-sm">
              {t.footer.tagline}
            </p>
          </div>
          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-base">{t.footer.product}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors block py-1">{t.nav.features}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors block py-1">{t.nav.pricing}</a></li>
              <li><a href="https://app.catyai.io" className="hover:text-white transition-colors block py-1">{t.footer.dashboard}</a></li>
              <li><a href="https://docs.catyai.io" className="hover:text-white transition-colors block py-1">{t.footer.docs}</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-base">{t.footer.company}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors block py-1">{t.footer.about}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors block py-1">{t.footer.blog}</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors block py-1">{t.footer.careers}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors block py-1">{t.footer.contact}</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-base">{t.footer.legal}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors block py-1">{t.footer.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors block py-1">{t.footer.terms}</Link></li>
              <li><Link to="/gdpr" className="hover:text-white transition-colors block py-1">{t.footer.gdpr}</Link></li>
              <li><Link to="/licensing" className="hover:text-white transition-colors block py-1">{t.footer.licensing}</Link></li>
            </ul>
          </div>
        </div>

        {/* Featured Articles - SEO Backlinks */}
        <div className="py-4 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="text-gray-500">Featured Articles:</span>
            <a href="https://medium.com/@adrianvitan/ahauros-aeos-catyai-inteligen%C8%9Ba-artificial%C4%83-economic%C4%83-pentru-rom%C3%A2nia-digital%C4%83-89108e433672"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Ahauros AEOS & CatyAI — AI for Digital Romania
            </a>
            <a href="https://medium.com/@adrianvitan/building-ai-that-works-for-business-my-journey-creating-payai-x-ahauros-and-catyai-1f407e31e109"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Building AI That Works for Business
            </a>
            <a href="https://medium.com/@adrianvitan"
               target="_blank" rel="noopener noreferrer"
               className="text-primary-400 hover:text-primary-300 transition-colors font-medium">
              All articles on Medium →
            </a>
          </div>
        </div>

        {/* Licensing Info */}
        <div className="py-6 border-t border-gray-800 mb-2">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <Link to="/licensing" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>{t.footer.licensing}:</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/licensing" className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 hover:bg-primary-500/20 transition-colors">
                <span className="font-medium">Community</span>
                <span className="text-primary-500/70">(AGPL-3.0)</span>
              </Link>
              <span className="text-gray-600">+</span>
              <Link to="/licensing" className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 hover:bg-primary-500/20 transition-colors">
                <span className="font-medium">Enterprise</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/catyai" className="text-gray-400 hover:text-white transition-colors" title="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="https://linkedin.com/company/catyai" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/catyai" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://medium.com/@adrianvitan" className="text-gray-400 hover:text-white transition-colors" title="Medium" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
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
        title="AI Secretary on WhatsApp | Free 500 Conversations/Month"
        description="AI secretary that responds to your customers 24/7 on WhatsApp. Books appointments, generates documents, blocks scams. Free forever: 100 sessions/month."
        url="https://catyai.io/"
        faq={homepageFAQ}
      />
      <Hero />
      <Problem />
      <CaseStudies />
      <ROICalculator />
      <Products />
      <WhatsAppSecretary />
      <QRFirst />
      <Features />
      <FraudShield />
      <DocGenEngine />
      <Integrations />
      <Verticals />
      <HowItWorks />
      <ComparisonTable />
      <AurexPromo />
      <Testimonials />
      <PartnersPress />
      <Pricing />
      <FAQ />
      <CTA />
      <FloatingWidgetIndicator />
      <PromotionalPopup />
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
  const standalonePages = ['/whatsapp']
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
        <Routes>
          <Route path="/whatsapp" element={<WhatsAppAI />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <ScrollToHash />
      <Header />
      <main>
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
