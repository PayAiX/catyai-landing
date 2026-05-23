import { useState, useEffect, useRef, useMemo, createContext, useContext, lazy, Suspense } from 'react'
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
import ComparisonTable from './components/ComparisonTable'
import WhatsAppSecretary from './components/WhatsAppSecretary'

// Lazy load pages for better performance (code splitting)
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const GDPRPolicy = lazy(() => import('./pages/GDPRPolicy'))
const Licensing = lazy(() => import('./pages/Licensing'))
const LicenseAGPL = lazy(() => import('./pages/LicenseAGPL'))
const SiteAnalyzer = lazy(() => import('./pages/SiteAnalyzer'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CommerceDemo = lazy(() => import('./pages/CommerceDemo'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const WhatsAppAI = lazy(() => import('./pages/WhatsAppAI'))
const FraudAI = lazy(() => import('./pages/FraudAI'))
const ChatbotRomania = lazy(() => import('./pages/ChatbotRomania'))
const NoWebsite = lazy(() => import('./pages/NoWebsite'))
const CatyWidget = lazy(() => import('./pages/CatyWidget'))
const GeoGateway = lazy(() => import('./pages/GeoGateway'))
const HealthcarePage = lazy(() => import('./pages/HealthcarePage'))
const FeaturesPage = lazy(() => import('./pages/Features'))
const InfrastructurePage = lazy(() => import('./pages/Infrastructure'))
const PricingPage = lazy(() => import('./pages/Pricing'))
const PlatformPage = lazy(() => import('./pages/PlatformPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const PartnersPage = lazy(() => import('./pages/PartnersPage'))
const CompanyPage = lazy(() => import('./pages/CompanyPage'))
const Investors = lazy(() => import('./pages/Investors'))
const ProtocolPage = lazy(() => import('./pages/ProtocolPage'))
const TrustCenter = lazy(() => import('./pages/TrustCenter'))
const WhiteLabelPage = lazy(() => import('./pages/WhiteLabelPage'))
const AgencyNetworkPage = lazy(() => import('./pages/AgencyNetworkPage'))
const TechPartnersPage = lazy(() => import('./pages/TechPartnersPage'))
const EnterprisePage = lazy(() => import('./pages/EnterprisePage'))
const EcommercePage = lazy(() => import('./pages/EcommercePage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const CareersPage = lazy(() => import('./pages/Careers'))
const ApiReferencePage = lazy(() => import('./pages/ApiReference'))
const ZeroTrustAiAdsEn = lazy(() => import('./pages/research/ZeroTrustAiAdsEn'))
const CeEsteCatyaiAkl = lazy(() => import('./pages/research/ce-este-catyai-akl'))
const Press = lazy(() => import('./pages/Press'))
const CheckWebsite = lazy(() => import('./pages/CheckWebsite'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#010A1F]">
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
    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', products: 'Products', whatsappSecretary: 'WhatsApp AI Secretary', whatsappDesc: 'Full-featured AI secretary', qrFirst: 'QR-First (No Website)', qrFirstDesc: 'No website? No problem.', fraudai: 'FraudAI', fraudaiDesc: 'AI scam protection', catyWidget: 'Caty Widget', catyWidgetDesc: 'AI sales agent for websites', geoGateway: 'GEO Gateway', geoGatewayDesc: 'Intelligent geographic routing', login: 'Login', getStarted: 'Start Free' },
    hero: {
      tagline: 'High-Performance Artificial Intelligence',
      title1: 'We Grow Your Revenue with',
      title2: 'Performance AI',
      subtitle: 'Discover how our advanced AI optimizes conversions and reduces operational costs for your business.',
      cta1: 'Get Started',
      cta2: 'See How It Works',
      trust1: '500 conversations FREE',
      trust2: 'No credit card',
      trust3: 'Setup in 2 min'
    },
    floatingMessages: {
      msg1: "Do you have appointments available tomorrow?",
      msg2: "Yes! We have 3 slots at 10:00, 14:00 and 16:00 ✓",
      msg3: "What are your prices?",
      msg4: "Our packages start at €49. Want details?",
      msg5: "I want to book for Saturday",
      msg6: "Done! Reservation confirmed for Saturday 😊",
      msg7: "24/7 support 🤖",
      msg8: "Send menu 📋"
    },
    mobileMessages: {
      msg1: "Tomorrow free? 📅",
      msg2: "Yes! 3 slots ✓",
      msg3: "Book! 🎉",
      msg4: "Confirmed! 😊"
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
      widgetCta: 'Add Widget to Site',
      whatsappCta: 'Connect WhatsApp',
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
      analyzeButton: 'Try Auto-Crawl Free — Analyze Your Website',
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
    floatingIndicator: 'Try me!',
    realitatea: {
      title: 'Your Website Is Dead. You Just Haven\'t Buried It Yet.',
      subtitle: 'Something no marketing agency, no web designer, and no Google Ads consultant will ever tell you.',
      paragraph: 'In 2025, something unprecedented happened. Google search traffic to websites dropped by 33% globally. Not a small dip — a third of all traffic, gone.',
      stat1Label: 'Google search traffic dropped globally in 2025',
      stat2Label: 'of searches end without a single click',
      stat3Label: 'Google Ads CTR — crashed from 11% in one month',
      bullet1: 'Organic click-through rates dropped 61% on queries where AI Overviews appear.',
      bullet2: 'Publishers lost 38% of their Google referral traffic year-over-year.',
      bullet3: 'HubSpot — one of the best SEO teams in the world — lost nearly half their organic traffic.',
      closing: 'AI is the new storefront. WhatsApp is the new channel. A QR code replaces a €5,000 website.'
    },
    products3: {
      title: 'One AI.',
      titleHighlight: 'Four products.',
      subtitle: 'Choose the right solution for your business',
      popular: 'Popular',
      qrFirst: {
        name: 'QR-First',
        tagline: 'No website? No problem.',
        price: '€10',
        period: '/month',
        features: ['QR code for WhatsApp', 'AI responds 24/7', 'Automatic appointments', 'Zero hosting costs'],
        cta: 'Start with €10'
      },
      webWidget: {
        name: 'Web Widget',
        tagline: 'AI on your website',
        price: '€49',
        period: '/month',
        features: ['Embed chat widget', 'Auto-Crawl site', 'Lead capture', 'Complete analytics'],
        cta: 'Add to site'
      },
      fraudAI: {
        name: 'FraudAI',
        tagline: 'Anti-scam protection',
        price: 'FREE',
        period: 'forever',
        features: ['8 detection modules', 'Blocks phishing', 'Real-time alert', 'Zero false positives'],
        cta: 'Activate Free'
      },
      geoGateway: {
        name: 'GEO Gateway',
        tagline: 'Intelligent geographic routing',
        price: 'Pro+',
        period: 'plans',
        features: ['180+ countries', 'AI language detection', 'Timezone-aware routing', 'LLMs.txt generation'],
        cta: 'Explore GEO'
      }
    },
    howItWorks2: {
      title: 'Live in',
      titleHighlight: '2 minutes',
      subtitle: 'No installation. No code. No waiting.',
      steps: [
        { number: '01', title: 'Scan QR', desc: 'Like WhatsApp Web. 30 seconds.', icon: '📱' },
        { number: '02', title: 'Connect WhatsApp', desc: 'Use your existing number.', icon: '💬' },
        { number: '03', title: 'Tell about your business', desc: 'Services, prices, schedule.', icon: '📝' },
        { number: '04', title: 'Start selling', desc: 'CatyAI takes over.', icon: '🚀' }
      ],
      cta: 'Start Now — Free'
    },
    industries2: {
      title: 'For any',
      titleHighlight: 'industry',
      subtitle: 'CatyAI adapts to your business',
      list: [
        { icon: '💇', name: 'Salons', desc: '24/7 appointments' },
        { icon: '🦷', name: 'Clinics', desc: 'Happy patients' },
        { icon: '🍽️', name: 'Restaurants', desc: 'Instant reservations' },
        { icon: '🔧', name: 'Mechanics', desc: 'Automatic quotes' },
        { icon: '📸', name: 'Photographers', desc: 'Simple booking' },
        { icon: '🏠', name: 'Real Estate', desc: 'Qualified leads' }
      ],
      trusted: 'Trusted by: Simple Smile, Digital Romania, D&S Gaz, INOTOOLS'
    },
    ctaFinal: {
      title: 'Your competitors are already responding faster.',
      subtitle: 'When do you start?',
      cta: 'Start Free on WhatsApp',
      trust1: 'Setup in 2 minutes',
      trust2: 'No credit card',
      trust3: 'Cancel anytime'
    },
    testimonials: {
      title: 'What our',
      titleHighlight: 'clients say',
      subtitle: 'Companies from Romania using CatyAI to increase conversions and automate customer support.',
      trustBadge: '6+ active companies',
      metric1: 'more leads',
      metric2: 'conversion',
      metric3: 'less response time',
      leaveReview: 'Leave a review',
      seeAllReviews: 'See all reviews on Google',
      companies: [
        { company: 'INOTOOLS', industry: 'DIY E-commerce', quote: 'CatyAI instantly answers customer questions about products and availability. We reduced response time from hours to seconds.', metric: '+35%', metricLabel: 'conversions' },
        { company: 'Simple Smile', industry: 'Dentistry', quote: 'Patients can schedule consultations 24/7 via chatbot. It freed up our time for what matters - patient treatment.', metric: '24/7', metricLabel: 'appointments' },
        { company: 'D&S GAZ Services', industry: 'Gas Installation', quote: 'Clients get instant information about our services and can request quotes. Team efficiency increased significantly.', metric: '+50%', metricLabel: 'leads' },
        { company: 'AiuDance', industry: 'Dance School', quote: 'Students quickly find course schedule info and can register directly. Less time on phone, more time for dancing!', metric: '3x', metricLabel: 'online signups' },
        { company: 'Digital Romania', industry: 'IT Consulting', quote: 'CatyAI helps us qualify leads automatically. We know exactly what each client is looking for before we talk to them.', metric: '+40%', metricLabel: 'qualified leads' },
        { company: 'VendX', industry: 'SaaS Platform', quote: 'Integration was simple and results came quickly. Our clients get instant support for product configuration.', metric: '-60%', metricLabel: 'support tickets' }
      ]
    }
  },
  ro: {
    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'Întrebări', products: 'Produse', whatsappSecretary: 'Secretar AI WhatsApp', whatsappDesc: 'Secretar AI complet', qrFirst: 'QR-First (Fără Site)', qrFirstDesc: 'Fără site? Nicio problemă.', fraudai: 'FraudAI', fraudaiDesc: 'Protecție AI anti-escrocherii', catyWidget: 'Caty Widget', catyWidgetDesc: 'Agent AI vânzări pentru site-uri', geoGateway: 'GEO Gateway', geoGatewayDesc: 'Rutare geografică inteligentă', login: 'Autentificare', getStarted: 'Începe Gratuit' },
    hero: {
      tagline: 'Inteligență Artificială de Performanță',
      title1: 'Creștem Veniturile Tale cu',
      title2: 'AI de Performanță',
      subtitle: 'Descoperă cum AI-ul nostru avansat optimizează conversiile și reduce costurile operaționale pentru afacerea ta.',
      cta1: 'Începe Acum',
      cta2: 'Vezi Cum Funcționează',
      trust1: '500 conversații GRATUIT',
      trust2: 'Fără card bancar',
      trust3: 'Setup în 2 min'
    },
    floatingMessages: {
      msg1: "Aveți programări disponibile mâine?",
      msg2: "Da! Avem 3 locuri la 10:00, 14:00 și 16:00 ✓",
      msg3: "Care sunt prețurile?",
      msg4: "Pachetele încep de la 49€. Vrei detalii?",
      msg5: "Vreau să rezerv pentru sâmbătă",
      msg6: "Gata! Rezervare confirmată pentru sâmbătă 😊",
      msg7: "Suport 24/7 🤖",
      msg8: "Trimite meniul 📋"
    },
    mobileMessages: {
      msg1: "Mâine liber? 📅",
      msg2: "Da! 3 locuri ✓",
      msg3: "Rezerv! 🎉",
      msg4: "Confirmat! 😊"
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
      widgetCta: 'Adaugă Widget pe Site',
      whatsappCta: 'Conectează WhatsApp',
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
      analyzeButton: 'Încearcă Auto-Crawl Gratuit — Analizează-ți Site-ul',
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
    floatingIndicator: 'Încearcă-mă!',
    realitatea: {
      title: 'Site-ul Tău E Mort. Doar Nu L-ai Îngropat Încă.',
      subtitle: 'Ceva ce nicio agenție de marketing, niciun web designer și niciun consultant Google Ads nu îți va spune vreodată.',
      paragraph: 'În 2025, s-a întâmplat ceva fără precedent. Traficul de căutare Google către site-uri web a scăzut cu 33% la nivel global. Nu o scădere mică — o treime din tot traficul, dispărut.',
      stat1Label: 'Traficul de căutare Google a scăzut global în 2025',
      stat2Label: 'din căutări se termină fără niciun click',
      stat3Label: 'CTR Google Ads — prăbușit de la 11% într-o lună',
      bullet1: 'Rata de click organic a scăzut cu 61% pentru interogările unde apar AI Overviews.',
      bullet2: 'Publisherii au pierdut 38% din traficul de referință Google de la an la an.',
      bullet3: 'HubSpot — una dintre cele mai bune echipe SEO din lume — a pierdut aproape jumătate din traficul organic.',
      closing: 'AI este noua vitrină. WhatsApp este noul canal. Un cod QR înlocuiește un site de €5,000.'
    },
    products3: {
      title: 'Un singur AI.',
      titleHighlight: 'Patru produse.',
      subtitle: 'Alege soluția potrivită pentru afacerea ta',
      popular: 'Popular',
      qrFirst: {
        name: 'QR-First',
        tagline: 'Fără site web? Fără problemă.',
        price: '€10',
        period: '/lună',
        features: ['Cod QR pentru WhatsApp', 'AI răspunde 24/7', 'Programări automate', 'Zero costuri hosting'],
        cta: 'Începe cu €10'
      },
      webWidget: {
        name: 'Web Widget',
        tagline: 'AI pe site-ul tău',
        price: '€49',
        period: '/lună',
        features: ['Widget chat embed', 'Auto-Crawl site', 'Lead capture', 'Analytics complete'],
        cta: 'Adaugă pe site'
      },
      fraudAI: {
        name: 'FraudAI',
        tagline: 'Protecție anti-escrocherii',
        price: 'GRATUIT',
        period: 'pentru totdeauna',
        features: ['8 module detecție', 'Blochează phishing', 'Alertă în timp real', 'Zero false positive'],
        cta: 'Activează Gratuit'
      },
      geoGateway: {
        name: 'GEO Gateway',
        tagline: 'Rutare geografică inteligentă',
        price: 'Pro+',
        period: 'planuri',
        features: ['180+ țări', 'Detecție limbă AI', 'Rutare după fus orar', 'Generare LLMs.txt'],
        cta: 'Explorează GEO'
      }
    },
    howItWorks2: {
      title: 'Live în',
      titleHighlight: '2 minute',
      subtitle: 'Fără instalare. Fără cod. Fără așteptare.',
      steps: [
        { number: '01', title: 'Scanează QR', desc: 'Ca WhatsApp Web. 30 secunde.', icon: '📱' },
        { number: '02', title: 'Conectează WhatsApp', desc: 'Folosește numărul tău existent.', icon: '💬' },
        { number: '03', title: 'Spune-i despre afacere', desc: 'Servicii, prețuri, program.', icon: '📝' },
        { number: '04', title: 'Începe să vinzi', desc: 'CatyAI preia controlul.', icon: '🚀' }
      ],
      cta: 'Începe Acum — Gratuit'
    },
    industries2: {
      title: 'Pentru orice',
      titleHighlight: 'industrie',
      subtitle: 'CatyAI se adaptează la afacerea ta',
      list: [
        { icon: '💇', name: 'Saloane', desc: 'Programări 24/7' },
        { icon: '🦷', name: 'Cabinete', desc: 'Pacienți mulțumiți' },
        { icon: '🍽️', name: 'Restaurante', desc: 'Rezervări instant' },
        { icon: '🔧', name: 'Mecanici', desc: 'Oferte automate' },
        { icon: '📸', name: 'Fotografi', desc: 'Booking simplu' },
        { icon: '🏠', name: 'Imobiliare', desc: 'Lead-uri calificate' }
      ],
      trusted: 'Trusted by: Simple Smile, Digital Romania, D&S Gaz, INOTOOLS'
    },
    ctaFinal: {
      title: 'Competitorii tăi răspund deja mai repede.',
      subtitle: 'Tu când începi?',
      cta: 'Începe Gratuit pe WhatsApp',
      trust1: 'Setup în 2 minute',
      trust2: 'Fără card bancar',
      trust3: 'Cancel oricând'
    },
    testimonials: {
      title: 'Ce spun',
      titleHighlight: 'clienții noștri',
      subtitle: 'Companii din România care folosesc CatyAI pentru a crește conversiile și a automatiza suportul clienți.',
      trustBadge: '6+ companii active',
      metric1: 'mai multe lead-uri',
      metric2: 'conversie',
      metric3: 'timp răspuns redus',
      leaveReview: 'Lasă o recenzie',
      seeAllReviews: 'Vezi toate recenziile pe Google',
      companies: [
        { company: 'INOTOOLS', industry: 'E-commerce Bricolaj', quote: 'CatyAI răspunde instant la întrebările clienților despre produse și disponibilitate. Am redus timpul de răspuns de la ore la secunde.', metric: '+35%', metricLabel: 'conversii' },
        { company: 'Simple Smile', industry: 'Stomatologie', quote: 'Pacienții pot programa consultații 24/7 prin chatbot. Ne-a eliberat timpul pentru ceea ce contează - tratamentul pacienților.', metric: '24/7', metricLabel: 'programări' },
        { company: 'D&S GAZ Services', industry: 'Instalații Gaz', quote: 'Clienții primesc instant informații despre serviciile noastre și pot solicita oferte. Eficiența echipei a crescut semnificativ.', metric: '+50%', metricLabel: 'lead-uri' },
        { company: 'AiuDance', industry: 'Școală de Dans', quote: 'Cursanții găsesc rapid informații despre orarul cursurilor și se pot înscrie direct. Mai puțin timp la telefon, mai mult timp pentru dans!', metric: '3x', metricLabel: 'înscrieri online' },
        { company: 'Digital Romania', industry: 'Consultanță IT', quote: 'CatyAI ne ajută să calificăm lead-urile automat. Știm exact ce caută fiecare client înainte să vorbim cu el.', metric: '+40%', metricLabel: 'lead-uri calificate' },
        { company: 'VendX', industry: 'Platformă SaaS', quote: 'Integrarea a fost simplă, iar rezultatele au venit rapid. Clienții noștri primesc suport instant pentru configurarea produselor.', metric: '-60%', metricLabel: 'tichete suport' }
      ]
    }
  },
  es: {
    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo funciona', pricing: 'Precios', faq: 'FAQ', products: 'Productos', whatsappSecretary: 'Secretario AI WhatsApp', whatsappDesc: 'Secretario AI completo', qrFirst: 'QR-First (Sin Web)', qrFirstDesc: '¿Sin sitio web? Sin problema.', fraudai: 'FraudAI', fraudaiDesc: 'Protección AI anti-estafas', catyWidget: 'Caty Widget', catyWidgetDesc: 'Agente AI de ventas para webs', geoGateway: 'GEO Gateway', geoGatewayDesc: 'Enrutamiento geográfico inteligente', login: 'Iniciar sesión', getStarted: 'Empezar Gratis' },
    hero: {
      tagline: 'El empleado digital que vende por ti',
      title1: 'Convierte Conversaciones en',
      title2: 'Clientes que Pagan',
      subtitle: 'IA que responde, califica y convierte — automáticamente, 24/7',
      cta1: 'Reservar Demo',
      cta2: 'Empezar Gratis',
      trust1: '500 conversaciones GRATIS',
      trust2: 'Sin tarjeta de crédito',
      trust3: 'Setup en 2 min'
    },
    floatingMessages: {
      msg1: "¿Tienen citas disponibles mañana?",
      msg2: "¡Sí! Tenemos 3 horarios a las 10:00, 14:00 y 16:00 ✓",
      msg3: "¿Cuáles son sus precios?",
      msg4: "Nuestros paquetes empiezan desde €49. ¿Quieres detalles?",
      msg5: "Quiero reservar para el sábado",
      msg6: "¡Listo! Reserva confirmada para el sábado 😊",
      msg7: "Soporte 24/7 🤖",
      msg8: "Enviar menú 📋"
    },
    mobileMessages: {
      msg1: "¿Mañana libre? 📅",
      msg2: "¡Sí! 3 horarios ✓",
      msg3: "¡Reservar! 🎉",
      msg4: "¡Confirmado! 😊"
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
      widgetCta: 'Añadir Widget al Sitio',
      whatsappCta: 'Conectar WhatsApp',
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
      analyzeButton: 'Prueba Auto-Crawl Gratis — Analiza Tu Sitio Web',
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
    floatingIndicator: '¡Pruébame!',
    realitatea: {
      title: 'Tu Sitio Web Está Muerto. Solo No Lo Has Enterrado Todavía.',
      subtitle: 'Algo que ninguna agencia de marketing, ningún diseñador web y ningún consultor de Google Ads te dirá jamás.',
      paragraph: 'En 2025, sucedió algo sin precedentes. El tráfico de búsqueda de Google a sitios web cayó un 33% a nivel mundial. No una pequeña caída — un tercio de todo el tráfico, desaparecido.',
      stat1Label: 'El tráfico de búsqueda de Google cayó globalmente en 2025',
      stat2Label: 'de las búsquedas terminan sin un solo clic',
      stat3Label: 'CTR de Google Ads — se desplomó del 11% en un mes',
      bullet1: 'Las tasas de clics orgánicos cayeron un 61% en consultas donde aparecen AI Overviews.',
      bullet2: 'Los editores perdieron el 38% de su tráfico de referencia de Google año tras año.',
      bullet3: 'HubSpot — uno de los mejores equipos de SEO del mundo — perdió casi la mitad de su tráfico orgánico.',
      closing: 'La IA es el nuevo escaparate. WhatsApp es el nuevo canal. Un código QR reemplaza un sitio web de €5,000.'
    },
    products3: {
      title: 'Una IA.',
      titleHighlight: 'Cuatro productos.',
      subtitle: 'Elige la solución adecuada para tu negocio',
      popular: 'Popular',
      qrFirst: {
        name: 'QR-First',
        tagline: '¿Sin sitio web? Sin problema.',
        price: '€10',
        period: '/mes',
        features: ['Código QR para WhatsApp', 'IA responde 24/7', 'Citas automáticas', 'Cero costes de hosting'],
        cta: 'Empieza con €10'
      },
      webWidget: {
        name: 'Web Widget',
        tagline: 'IA en tu sitio web',
        price: '€49',
        period: '/mes',
        features: ['Widget chat embebido', 'Auto-Crawl sitio', 'Captura de leads', 'Analytics completos'],
        cta: 'Añadir al sitio'
      },
      fraudAI: {
        name: 'FraudAI',
        tagline: 'Protección anti-estafas',
        price: 'GRATIS',
        period: 'para siempre',
        features: ['8 módulos de detección', 'Bloquea phishing', 'Alerta en tiempo real', 'Cero falsos positivos'],
        cta: 'Activar Gratis'
      },
      geoGateway: {
        name: 'GEO Gateway',
        tagline: 'Enrutamiento geográfico inteligente',
        price: 'Pro+',
        period: 'planes',
        features: ['180+ países', 'Detección de idioma IA', 'Ruteo por zona horaria', 'Generación LLMs.txt'],
        cta: 'Explorar GEO'
      }
    },
    howItWorks2: {
      title: 'En vivo en',
      titleHighlight: '2 minutos',
      subtitle: 'Sin instalación. Sin código. Sin esperas.',
      steps: [
        { number: '01', title: 'Escanea QR', desc: 'Como WhatsApp Web. 30 segundos.', icon: '📱' },
        { number: '02', title: 'Conecta WhatsApp', desc: 'Usa tu número existente.', icon: '💬' },
        { number: '03', title: 'Cuéntale tu negocio', desc: 'Servicios, precios, horario.', icon: '📝' },
        { number: '04', title: 'Empieza a vender', desc: 'CatyAI toma el control.', icon: '🚀' }
      ],
      cta: 'Empieza Ahora — Gratis'
    },
    industries2: {
      title: 'Para cualquier',
      titleHighlight: 'industria',
      subtitle: 'CatyAI se adapta a tu negocio',
      list: [
        { icon: '💇', name: 'Salones', desc: 'Citas 24/7' },
        { icon: '🦷', name: 'Clínicas', desc: 'Pacientes felices' },
        { icon: '🍽️', name: 'Restaurantes', desc: 'Reservas instantáneas' },
        { icon: '🔧', name: 'Mecánicos', desc: 'Presupuestos automáticos' },
        { icon: '📸', name: 'Fotógrafos', desc: 'Reservas simples' },
        { icon: '🏠', name: 'Inmobiliarias', desc: 'Leads cualificados' }
      ],
      trusted: 'De confianza: Simple Smile, Digital Romania, D&S Gaz, INOTOOLS'
    },
    ctaFinal: {
      title: 'Tus competidores ya responden más rápido.',
      subtitle: '¿Cuándo empiezas tú?',
      cta: 'Empieza Gratis en WhatsApp',
      trust1: 'Setup en 2 minutos',
      trust2: 'Sin tarjeta de crédito',
      trust3: 'Cancela cuando quieras'
    },
    testimonials: {
      title: 'Lo que dicen',
      titleHighlight: 'nuestros clientes',
      subtitle: 'Empresas de Rumanía que usan CatyAI para aumentar conversiones y automatizar el soporte al cliente.',
      trustBadge: '6+ empresas activas',
      metric1: 'más leads',
      metric2: 'conversión',
      metric3: 'menos tiempo de respuesta',
      leaveReview: 'Dejar una reseña',
      seeAllReviews: 'Ver todas las reseñas en Google',
      companies: [
        { company: 'INOTOOLS', industry: 'E-commerce Bricolaje', quote: 'CatyAI responde instantáneamente a las preguntas de los clientes sobre productos y disponibilidad. Redujimos el tiempo de respuesta de horas a segundos.', metric: '+35%', metricLabel: 'conversiones' },
        { company: 'Simple Smile', industry: 'Odontología', quote: 'Los pacientes pueden programar consultas 24/7 mediante chatbot. Nos liberó tiempo para lo que importa - el tratamiento de pacientes.', metric: '24/7', metricLabel: 'citas' },
        { company: 'D&S GAZ Services', industry: 'Instalaciones de Gas', quote: 'Los clientes obtienen información instantánea sobre nuestros servicios y pueden solicitar presupuestos. La eficiencia del equipo aumentó significativamente.', metric: '+50%', metricLabel: 'leads' },
        { company: 'AiuDance', industry: 'Escuela de Baile', quote: 'Los estudiantes encuentran rápidamente información sobre horarios y pueden inscribirse directamente. ¡Menos tiempo al teléfono, más tiempo para bailar!', metric: '3x', metricLabel: 'inscripciones online' },
        { company: 'Digital Romania', industry: 'Consultoría IT', quote: 'CatyAI nos ayuda a calificar leads automáticamente. Sabemos exactamente qué busca cada cliente antes de hablar con él.', metric: '+40%', metricLabel: 'leads cualificados' },
        { company: 'VendX', industry: 'Plataforma SaaS', quote: 'La integración fue simple y los resultados llegaron rápido. Nuestros clientes reciben soporte instantáneo para configurar productos.', metric: '-60%', metricLabel: 'tickets de soporte' }
      ]
    }
  },
  pt: {
    nav: { home: 'Início', features: 'Recursos', howItWorks: 'Como funciona', pricing: 'Preços', faq: 'FAQ', products: 'Produtos', whatsappSecretary: 'Secretário AI WhatsApp', whatsappDesc: 'Secretário AI completo', qrFirst: 'QR-First (Sem Site)', qrFirstDesc: 'Sem site? Sem problema.', fraudai: 'FraudAI', fraudaiDesc: 'Proteção AI anti-fraudes', catyWidget: 'Caty Widget', catyWidgetDesc: 'Agente AI de vendas para sites', geoGateway: 'GEO Gateway', geoGatewayDesc: 'Roteamento geográfico inteligente', login: 'Entrar', getStarted: 'Começar Grátis' },
    hero: {
      tagline: 'O funcionário digital que vende por você',
      title1: 'Transforme Conversas em',
      title2: 'Clientes Pagantes',
      subtitle: 'IA que responde, qualifica e converte — automaticamente, 24/7',
      cta1: 'Agendar Demo',
      cta2: 'Começar Grátis',
      trust1: '500 conversas GRÁTIS',
      trust2: 'Sem cartão de crédito',
      trust3: 'Setup em 2 min'
    },
    floatingMessages: {
      msg1: "Vocês têm horários disponíveis amanhã?",
      msg2: "Sim! Temos 3 horários às 10:00, 14:00 e 16:00 ✓",
      msg3: "Quais são os preços?",
      msg4: "Nossos pacotes começam em €49. Quer detalhes?",
      msg5: "Quero reservar para sábado",
      msg6: "Pronto! Reserva confirmada para sábado 😊",
      msg7: "Suporte 24/7 🤖",
      msg8: "Enviar menu 📋"
    },
    mobileMessages: {
      msg1: "Amanhã livre? 📅",
      msg2: "Sim! 3 horários ✓",
      msg3: "Reservar! 🎉",
      msg4: "Confirmado! 😊"
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
      widgetCta: 'Adicionar Widget ao Site',
      whatsappCta: 'Conectar WhatsApp',
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
      analyzeButton: 'Experimente Auto-Crawl Grátis — Analise Seu Site',
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
    floatingIndicator: 'Experimente!',
    realitatea: {
      title: 'Seu Site Está Morto. Você Só Não O Enterrou Ainda.',
      subtitle: 'Algo que nenhuma agência de marketing, nenhum web designer e nenhum consultor de Google Ads jamais te dirá.',
      paragraph: 'Em 2025, algo sem precedentes aconteceu. O tráfego de busca do Google para sites caiu 33% globalmente. Não uma pequena queda — um terço de todo o tráfego, desaparecido.',
      stat1Label: 'O tráfego de busca do Google caiu globalmente em 2025',
      stat2Label: 'das buscas terminam sem um único clique',
      stat3Label: 'CTR do Google Ads — despencou de 11% em um mês',
      bullet1: 'As taxas de cliques orgânicos caíram 61% em consultas onde aparecem AI Overviews.',
      bullet2: 'Os editores perderam 38% do tráfego de referência do Google ano a ano.',
      bullet3: 'HubSpot — uma das melhores equipes de SEO do mundo — perdeu quase metade do tráfego orgânico.',
      closing: 'IA é a nova vitrine. WhatsApp é o novo canal. Um código QR substitui um site de €5.000.'
    },
    products3: {
      title: 'Uma IA.',
      titleHighlight: 'Quatro produtos.',
      subtitle: 'Escolha a solução certa para o seu negócio',
      popular: 'Popular',
      qrFirst: {
        name: 'QR-First',
        tagline: 'Sem site? Sem problema.',
        price: '€10',
        period: '/mês',
        features: ['Código QR para WhatsApp', 'IA responde 24/7', 'Agendamentos automáticos', 'Zero custos de hospedagem'],
        cta: 'Comece com €10'
      },
      webWidget: {
        name: 'Web Widget',
        tagline: 'IA no seu site',
        price: '€49',
        period: '/mês',
        features: ['Widget chat embarcado', 'Auto-Crawl site', 'Captura de leads', 'Analytics completo'],
        cta: 'Adicionar ao site'
      },
      fraudAI: {
        name: 'FraudAI',
        tagline: 'Proteção anti-fraudes',
        price: 'GRÁTIS',
        period: 'para sempre',
        features: ['8 módulos de detecção', 'Bloqueia phishing', 'Alerta em tempo real', 'Zero falsos positivos'],
        cta: 'Ativar Grátis'
      },
      geoGateway: {
        name: 'GEO Gateway',
        tagline: 'Roteamento geográfico inteligente',
        price: 'Pro+',
        period: 'planos',
        features: ['180+ países', 'Detecção de idioma IA', 'Roteamento por fuso horário', 'Geração LLMs.txt'],
        cta: 'Explorar GEO'
      }
    },
    howItWorks2: {
      title: 'Ao vivo em',
      titleHighlight: '2 minutos',
      subtitle: 'Sem instalação. Sem código. Sem espera.',
      steps: [
        { number: '01', title: 'Escaneie QR', desc: 'Como WhatsApp Web. 30 segundos.', icon: '📱' },
        { number: '02', title: 'Conecte WhatsApp', desc: 'Use seu número existente.', icon: '💬' },
        { number: '03', title: 'Conte sobre o negócio', desc: 'Serviços, preços, horário.', icon: '📝' },
        { number: '04', title: 'Comece a vender', desc: 'CatyAI assume o controle.', icon: '🚀' }
      ],
      cta: 'Comece Agora — Grátis'
    },
    industries2: {
      title: 'Para qualquer',
      titleHighlight: 'indústria',
      subtitle: 'CatyAI se adapta ao seu negócio',
      list: [
        { icon: '💇', name: 'Salões', desc: 'Agendamentos 24/7' },
        { icon: '🦷', name: 'Clínicas', desc: 'Pacientes felizes' },
        { icon: '🍽️', name: 'Restaurantes', desc: 'Reservas instantâneas' },
        { icon: '🔧', name: 'Mecânicos', desc: 'Orçamentos automáticos' },
        { icon: '📸', name: 'Fotógrafos', desc: 'Reservas simples' },
        { icon: '🏠', name: 'Imobiliárias', desc: 'Leads qualificados' }
      ],
      trusted: 'Confiado por: Simple Smile, Digital Romania, D&S Gaz, INOTOOLS'
    },
    ctaFinal: {
      title: 'Seus concorrentes já respondem mais rápido.',
      subtitle: 'Quando você começa?',
      cta: 'Comece Grátis no WhatsApp',
      trust1: 'Setup em 2 minutos',
      trust2: 'Sem cartão de crédito',
      trust3: 'Cancele quando quiser'
    },
    testimonials: {
      title: 'O que nossos',
      titleHighlight: 'clientes dizem',
      subtitle: 'Empresas da Romênia que usam CatyAI para aumentar conversões e automatizar o suporte ao cliente.',
      trustBadge: '6+ empresas ativas',
      metric1: 'mais leads',
      metric2: 'conversão',
      metric3: 'menos tempo de resposta',
      leaveReview: 'Deixar uma avaliação',
      seeAllReviews: 'Ver todas as avaliações no Google',
      companies: [
        { company: 'INOTOOLS', industry: 'E-commerce Bricolagem', quote: 'CatyAI responde instantaneamente às perguntas dos clientes sobre produtos e disponibilidade. Reduzimos o tempo de resposta de horas para segundos.', metric: '+35%', metricLabel: 'conversões' },
        { company: 'Simple Smile', industry: 'Odontologia', quote: 'Pacientes podem agendar consultas 24/7 via chatbot. Liberou nosso tempo para o que importa - tratamento de pacientes.', metric: '24/7', metricLabel: 'agendamentos' },
        { company: 'D&S GAZ Services', industry: 'Instalações de Gás', quote: 'Clientes obtêm informações instantâneas sobre nossos serviços e podem solicitar orçamentos. A eficiência da equipe aumentou significativamente.', metric: '+50%', metricLabel: 'leads' },
        { company: 'AiuDance', industry: 'Escola de Dança', quote: 'Alunos encontram rapidamente informações sobre horários e podem se inscrever diretamente. Menos tempo no telefone, mais tempo para dançar!', metric: '3x', metricLabel: 'inscrições online' },
        { company: 'Digital Romania', industry: 'Consultoria TI', quote: 'CatyAI nos ajuda a qualificar leads automaticamente. Sabemos exatamente o que cada cliente busca antes de falar com ele.', metric: '+40%', metricLabel: 'leads qualificados' },
        { company: 'VendX', industry: 'Plataforma SaaS', quote: 'A integração foi simples e os resultados vieram rápido. Nossos clientes recebem suporte instantâneo para configurar produtos.', metric: '-60%', metricLabel: 'tickets de suporte' }
      ]
    }
  },
  fr: {
    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment ça marche', pricing: 'Tarifs', faq: 'FAQ', products: 'Produits', whatsappSecretary: 'Secrétaire AI WhatsApp', whatsappDesc: 'Secrétaire AI complet', qrFirst: 'QR-First (Sans Site)', qrFirstDesc: 'Pas de site ? Pas de problème.', fraudai: 'FraudAI', fraudaiDesc: 'Protection AI anti-arnaques', catyWidget: 'Caty Widget', catyWidgetDesc: 'Agent AI de ventes pour sites', geoGateway: 'GEO Gateway', geoGatewayDesc: 'Routage géographique intelligent', login: 'Connexion', getStarted: 'Commencer Gratuit' },
    hero: {
      tagline: "L'employé digital qui vend pour vous",
      title1: 'Transformez les Conversations en',
      title2: 'Clients Payants',
      subtitle: 'IA qui répond, qualifie et convertit — automatiquement, 24/7',
      cta1: 'Réserver une Démo',
      cta2: 'Commencer Gratuit',
      trust1: '500 conversations GRATUIT',
      trust2: 'Sans carte bancaire',
      trust3: 'Setup en 2 min'
    },
    floatingMessages: {
      msg1: "Avez-vous des rendez-vous disponibles demain ?",
      msg2: "Oui ! Nous avons 3 créneaux à 10h, 14h et 16h ✓",
      msg3: "Quels sont vos tarifs ?",
      msg4: "Nos forfaits commencent à 49€. Voulez-vous des détails ?",
      msg5: "Je veux réserver pour samedi",
      msg6: "C'est fait ! Réservation confirmée pour samedi 😊",
      msg7: "Support 24/7 🤖",
      msg8: "Envoyer le menu 📋"
    },
    mobileMessages: {
      msg1: "Demain libre ? 📅",
      msg2: "Oui ! 3 créneaux ✓",
      msg3: "Réserver ! 🎉",
      msg4: "Confirmé ! 😊"
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
      widgetCta: 'Ajouter Widget au Site',
      whatsappCta: 'Connecter WhatsApp',
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
      analyzeButton: 'Essayez Auto-Crawl Gratuit — Analysez Votre Site Web',
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
    floatingIndicator: 'Essayez-moi!',
    realitatea: {
      title: 'Votre Site Web Est Mort. Vous Ne L\'avez Pas Encore Enterré.',
      subtitle: 'Quelque chose qu\'aucune agence marketing, aucun web designer et aucun consultant Google Ads ne vous dira jamais.',
      paragraph: 'En 2025, quelque chose de sans précédent s\'est produit. Le trafic de recherche Google vers les sites web a chuté de 33% à l\'échelle mondiale. Pas une petite baisse — un tiers de tout le trafic, disparu.',
      stat1Label: 'Le trafic de recherche Google a chuté globalement en 2025',
      stat2Label: 'des recherches se terminent sans un seul clic',
      stat3Label: 'CTR Google Ads — effondré de 11% en un mois',
      bullet1: 'Les taux de clics organiques ont chuté de 61% sur les requêtes où apparaissent les AI Overviews.',
      bullet2: 'Les éditeurs ont perdu 38% de leur trafic de référence Google d\'une année sur l\'autre.',
      bullet3: 'HubSpot — l\'une des meilleures équipes SEO au monde — a perdu près de la moitié de son trafic organique.',
      closing: 'L\'IA est la nouvelle vitrine. WhatsApp est le nouveau canal. Un code QR remplace un site web à 5 000€.'
    },
    products3: {
      title: 'Une IA.',
      titleHighlight: 'Quatre produits.',
      subtitle: 'Choisissez la solution adaptée à votre entreprise',
      popular: 'Populaire',
      qrFirst: {
        name: 'QR-First',
        tagline: 'Pas de site web ? Pas de problème.',
        price: '€10',
        period: '/mois',
        features: ['Code QR pour WhatsApp', 'IA répond 24/7', 'Rendez-vous automatiques', 'Zéro coût d\'hébergement'],
        cta: 'Commencez avec €10'
      },
      webWidget: {
        name: 'Web Widget',
        tagline: 'IA sur votre site',
        price: '€49',
        period: '/mois',
        features: ['Widget chat intégré', 'Auto-Crawl site', 'Capture de leads', 'Analytics complet'],
        cta: 'Ajouter au site'
      },
      fraudAI: {
        name: 'FraudAI',
        tagline: 'Protection anti-arnaques',
        price: 'GRATUIT',
        period: 'pour toujours',
        features: ['8 modules de détection', 'Bloque le phishing', 'Alerte en temps réel', 'Zéro faux positifs'],
        cta: 'Activer Gratuit'
      },
      geoGateway: {
        name: 'GEO Gateway',
        tagline: 'Routage géographique intelligent',
        price: 'Pro+',
        period: 'plans',
        features: ['180+ pays', 'Détection de langue IA', 'Routage par fuseau horaire', 'Génération LLMs.txt'],
        cta: 'Explorer GEO'
      }
    },
    howItWorks2: {
      title: 'En ligne en',
      titleHighlight: '2 minutes',
      subtitle: 'Sans installation. Sans code. Sans attente.',
      steps: [
        { number: '01', title: 'Scannez QR', desc: 'Comme WhatsApp Web. 30 secondes.', icon: '📱' },
        { number: '02', title: 'Connectez WhatsApp', desc: 'Utilisez votre numéro existant.', icon: '💬' },
        { number: '03', title: 'Parlez de votre entreprise', desc: 'Services, prix, horaires.', icon: '📝' },
        { number: '04', title: 'Commencez à vendre', desc: 'CatyAI prend le relais.', icon: '🚀' }
      ],
      cta: 'Commencez Maintenant — Gratuit'
    },
    industries2: {
      title: 'Pour toute',
      titleHighlight: 'industrie',
      subtitle: 'CatyAI s\'adapte à votre entreprise',
      list: [
        { icon: '💇', name: 'Salons', desc: 'Rendez-vous 24/7' },
        { icon: '🦷', name: 'Cabinets', desc: 'Patients satisfaits' },
        { icon: '🍽️', name: 'Restaurants', desc: 'Réservations instantanées' },
        { icon: '🔧', name: 'Mécaniciens', desc: 'Devis automatiques' },
        { icon: '📸', name: 'Photographes', desc: 'Réservations simples' },
        { icon: '🏠', name: 'Immobilier', desc: 'Leads qualifiés' }
      ],
      trusted: 'Approuvé par: Simple Smile, Digital Romania, D&S Gaz, INOTOOLS'
    },
    testimonials: {
      title: 'Ce que disent',
      titleHighlight: 'nos clients',
      subtitle: 'Entreprises qui utilisent CatyAI pour augmenter les conversions et automatiser le support client.',
      trustBadge: '6+ entreprises actives',
      metric1: 'plus de leads',
      metric2: 'conversion',
      metric3: 'temps de réponse réduit',
      leaveReview: 'Laisser un avis',
      seeAllReviews: 'Voir tous les avis sur Google',
      companies: [
        { company: 'INOTOOLS', industry: 'E-commerce Bricolage', quote: 'CatyAI répond instantanément aux questions des clients sur les produits et la disponibilité. Nous avons réduit le temps de réponse de plusieurs heures à quelques secondes.', metric: '+35%', metricLabel: 'conversions', color: 'from-orange-500 to-red-500' },
        { company: 'Simple Smile', industry: 'Dentisterie', quote: 'Les patients peuvent prendre rendez-vous 24h/24 via le chatbot. Cela nous a libéré du temps pour ce qui compte vraiment — le traitement des patients.', metric: '24/7', metricLabel: 'rendez-vous', color: 'from-blue-500 to-cyan-500' },
        { company: 'D&S GAZ Services', industry: 'Installations Gaz', quote: 'Les clients obtiennent instantanément des informations sur nos services et peuvent demander des devis. L\'efficacité de l\'équipe a considérablement augmenté.', metric: '+50%', metricLabel: 'leads', color: 'from-yellow-500 to-orange-500' },
        { company: 'AiuDance', industry: 'École de Danse', quote: 'Les élèves trouvent rapidement les infos sur les horaires et peuvent s\'inscrire directement. Moins de temps au téléphone, plus de temps pour la danse!', metric: '3x', metricLabel: 'inscriptions en ligne', color: 'from-pink-500 to-purple-500' },
        { company: 'Digital Romania', industry: 'Conseil IT', quote: 'CatyAI nous aide à qualifier les leads automatiquement. Nous savons exactement ce que recherche chaque client avant de lui parler.', metric: '+40%', metricLabel: 'leads qualifiés', color: 'from-indigo-500 to-blue-500' },
        { company: 'VendX', industry: 'Plateforme SaaS', quote: 'L\'intégration a été simple et les résultats sont arrivés rapidement. Nos clients reçoivent un support instantané pour la configuration des produits.', metric: '-60%', metricLabel: 'tickets support', color: 'from-gold to-[#D4B57A]' }
      ]
    },
    ctaFinal: {
      title: 'Vos concurrents répondent déjà plus vite.',
      subtitle: 'Quand commencez-vous ?',
      cta: 'Commencez Gratuit sur WhatsApp',
      trust1: 'Setup en 2 minutes',
      trust2: 'Sans carte bancaire',
      trust3: 'Annulez quand vous voulez'
    }
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
    if (saved) return saved
    // Auto-detect browser language
    const browserLang = navigator.language?.slice(0, 2) || 'en'
    const supportedLangs = ['en', 'ro', 'es', 'pt', 'fr']
    return supportedLangs.includes(browserLang) ? browserLang : 'en'
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
  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
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
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A1628]/50 hover:bg-[#1a2744]/50 transition-colors text-sm"
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
          <div className="absolute right-0 top-full mt-2 bg-[#010A1F] border border-[#1a2744] rounded-lg shadow-xl z-50 py-1 min-w-[140px]">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => { setLang(language.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[#0A1628] transition-colors ${lang === language.code ? 'text-gold bg-[#0A1628]/50' : 'text-gray-300'}`}
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
  const [productsOpen, setProductsOpen] = useState(false)
  const productsTimeoutRef = useRef(null)
  const { t } = useLanguage()

  const handleProductsEnter = () => {
    clearTimeout(productsTimeoutRef.current)
    setProductsOpen(true)
  }

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => setProductsOpen(false), 300)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#010A1F]/80 backdrop-blur-lg border-b border-[#1a2744]/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/images/caty-logo.png" alt="Caty.AI" className="h-10" width="40" height="40" />
            <span className="text-xl font-bold"><span className="text-white">Caty</span><span className="text-gold">AI</span></span>
          </Link>

          {/* Simplified Nav: Logo │ Products │ Pricing │ FAQ │ Login │ [Start Free] */}
          <div className="hidden md:flex items-center gap-8">
            {/* Products Dropdown */}
            <div className="relative" onMouseEnter={handleProductsEnter} onMouseLeave={handleProductsLeave}>
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2">
                {t.nav.products}
                <svg className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {productsOpen && (
                <>
                  {/* Invisible bridge to cover gap */}
                  <div className="absolute top-full left-0 w-64 h-2" />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#010A1F] border border-[#1a2744] rounded-xl shadow-xl overflow-hidden">
                  <Link to="/widget" className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1628] transition-colors" onClick={() => setProductsOpen(false)}>
                    <span className="text-2xl">🌐</span>
                    <div>
                      <div className="text-gold font-medium">{t.nav.catyWidget}</div>
                      <div className="text-gray-400 text-xs">{t.nav.catyWidgetDesc}</div>
                    </div>
                  </Link>
                  <Link to="/no-website" className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1628] transition-colors" onClick={() => setProductsOpen(false)}>
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="text-white font-medium">{t.nav.qrFirst}</div>
                      <div className="text-gray-400 text-xs">{t.nav.qrFirstDesc}</div>
                    </div>
                  </Link>
                  <Link to="/whatsapp" className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1628] transition-colors" onClick={() => setProductsOpen(false)}>
                    <span className="text-2xl">💬</span>
                    <div>
                      <div className="text-gold font-medium">{t.nav.whatsappSecretary}</div>
                      <div className="text-gray-400 text-xs">{t.nav.whatsappDesc}</div>
                    </div>
                  </Link>
                  <hr className="border-[#1a2744]" />
                  <Link to="/fraud-shield" className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1628] transition-colors" onClick={() => setProductsOpen(false)}>
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <div className="text-white font-medium">{t.nav.fraudai}</div>
                      <div className="text-gray-400 text-xs">{t.nav.fraudaiDesc}</div>
                    </div>
                  </Link>
                  <Link to="/geo-gateway" className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1628] transition-colors" onClick={() => setProductsOpen(false)}>
                    <span className="text-2xl">🌍</span>
                    <div>
                      <div className="text-white font-medium">{t.nav.geoGateway}</div>
                      <div className="text-gray-400 text-xs">{t.nav.geoGatewayDesc}</div>
                    </div>
                  </Link>
                  <Link to="/infrastructura" className="flex items-center gap-3 px-4 py-3 hover:bg-[#0A1628] transition-colors" onClick={() => setProductsOpen(false)}>
                    <span className="text-lg">🧠</span>
                    <div>
                      <div className="text-sm font-medium text-white">Infrastructură Neurală</div>
                      <div className="text-xs text-gray-400">SENTINEL, NAP, Universal Brain</div>
                    </div>
                  </Link>
                </div>
                </>
              )}
            </div>

            <a href="#solutions" className="text-gray-300 hover:text-white transition-colors">{t.nav.pricing}</a>
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
          <div className="md:hidden py-4 border-t border-[#1a2744]">
            <div className="flex flex-col gap-4">
              {/* Mobile Products Section */}
              <div className="text-gray-500 text-xs uppercase tracking-wider">{t.nav.products}</div>
              <Link to="/widget" className="text-gold hover:text-yellow-300 font-medium pl-3" onClick={() => setMobileMenuOpen(false)}>🌐 {t.nav.catyWidget}</Link>
              <Link to="/no-website" className="text-white hover:text-gray-200 font-medium pl-3" onClick={() => setMobileMenuOpen(false)}>📱 {t.nav.qrFirst}</Link>
              <Link to="/whatsapp" className="text-gold hover:text-yellow-300 font-medium pl-3" onClick={() => setMobileMenuOpen(false)}>💬 {t.nav.whatsappSecretary}</Link>
              <Link to="/fraud-shield" className="text-white hover:text-gray-200 font-medium pl-3" onClick={() => setMobileMenuOpen(false)}>🛡️ {t.nav.fraudai}</Link>
              <Link to="/geo-gateway" className="text-white hover:text-gray-200 font-medium pl-3" onClick={() => setMobileMenuOpen(false)}>🌍 {t.nav.geoGateway}</Link>

              <hr className="border-[#1a2744]" />
              <a href="#solutions" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</a>
              <a href="#faq" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.faq}</a>
              <hr className="border-[#1a2744]" />
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
// Floating Messages Component for Hero
function FloatingBubbles() {
  const { t } = useLanguage()
  const [visibleIds, setVisibleIds] = useState(new Set())
  const indexRef = useRef(0)

  // Desktop bubbles - all 8
  const desktopBubbles = useMemo(() => [
    { id: 1, text: t.floatingMessages?.msg1 || "Appointments tomorrow?", type: 'client', style: { top: '12%', left: '5%' } },
    { id: 2, text: t.floatingMessages?.msg2 || "3 slots available ✓", type: 'ai', style: { top: '8%', right: '8%' } },
    { id: 3, text: t.floatingMessages?.msg3 || "What are your prices?", type: 'client', style: { top: '28%', left: '3%' } },
    { id: 4, text: t.floatingMessages?.msg4 || "Starting at €49 💰", type: 'ai', style: { top: '22%', right: '5%' } },
    { id: 5, text: t.floatingMessages?.msg5 || "Book for Saturday", type: 'client', style: { bottom: '28%', left: '4%' } },
    { id: 6, text: t.floatingMessages?.msg6 || "Confirmed! 😊", type: 'ai', style: { bottom: '22%', right: '6%' } },
    { id: 7, text: t.floatingMessages?.msg7 || "24/7 support 🤖", type: 'ai', style: { bottom: '38%', right: '3%' } },
    { id: 8, text: t.floatingMessages?.msg8 || "Send menu 📋", type: 'client', style: { bottom: '15%', left: '6%' } },
  ], [t])

  // Mobile bubbles - only 4, positioned at corners to not overlap content
  const mobileBubbles = useMemo(() => [
    { id: 101, text: t.mobileMessages?.msg1 || "Tomorrow free? 📅", type: 'client', style: { top: '8%', left: '2%' } },
    { id: 102, text: t.mobileMessages?.msg2 || "Yes! 3 slots ✓", type: 'ai', style: { top: '8%', right: '2%' } },
    { id: 103, text: t.mobileMessages?.msg3 || "Book! 🎉", type: 'client', style: { bottom: '12%', left: '2%' } },
    { id: 104, text: t.mobileMessages?.msg4 || "Confirmed! 😊", type: 'ai', style: { bottom: '12%', right: '2%' } },
  ], [t])

  useEffect(() => {
    const showNextDesktop = () => {
      const currentId = desktopBubbles[indexRef.current].id
      setVisibleIds(prev => new Set([...prev, currentId]))

      setTimeout(() => {
        setVisibleIds(prev => {
          const next = new Set(prev)
          next.delete(currentId)
          return next
        })
      }, 4000)

      indexRef.current = (indexRef.current + 1) % desktopBubbles.length
    }

    showNextDesktop()
    const interval = setInterval(showNextDesktop, 1500)
    return () => clearInterval(interval)
  }, [desktopBubbles])

  // Separate effect for mobile bubbles
  const mobileIndexRef = useRef(0)
  useEffect(() => {
    const showNextMobile = () => {
      const currentId = mobileBubbles[mobileIndexRef.current].id
      setVisibleIds(prev => new Set([...prev, currentId]))

      setTimeout(() => {
        setVisibleIds(prev => {
          const next = new Set(prev)
          next.delete(currentId)
          return next
        })
      }, 3500)

      mobileIndexRef.current = (mobileIndexRef.current + 1) % mobileBubbles.length
    }

    showNextMobile()
    const interval = setInterval(showNextMobile, 2000)
    return () => clearInterval(interval)
  }, [mobileBubbles])

  return (
    <>
      <style>{`
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Desktop bubbles - hidden on mobile */}
      {desktopBubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute z-20 hidden lg:block transition-all duration-500 ease-out ${
            visibleIds.has(bubble.id)
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 pointer-events-none'
          }`}
          style={{
            ...bubble.style,
            animation: visibleIds.has(bubble.id) ? 'floatBubble 3s ease-in-out infinite' : 'none'
          }}
        >
          <div className={`px-3 py-2 rounded-2xl text-xs shadow-lg backdrop-blur-md ${
            bubble.type === 'client'
              ? 'bg-white/90 text-gray-800 rounded-bl-sm'
              : 'bg-primary-500/90 text-white rounded-br-sm'
          }`}>
            {bubble.text}
          </div>
        </div>
      ))}

      {/* Mobile bubbles - hidden on desktop */}
      {mobileBubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute z-20 lg:hidden transition-all duration-500 ease-out ${
            visibleIds.has(bubble.id)
              ? 'opacity-90 scale-100'
              : 'opacity-0 scale-90 pointer-events-none'
          }`}
          style={{
            ...bubble.style,
            animation: visibleIds.has(bubble.id) ? 'floatBubble 3s ease-in-out infinite' : 'none'
          }}
        >
          <div className={`px-2 py-1.5 rounded-xl text-[10px] shadow-lg backdrop-blur-md ${
            bubble.type === 'client'
              ? 'bg-white/85 text-gray-800 rounded-bl-sm'
              : 'bg-primary-500/85 text-white rounded-br-sm'
          }`}>
            {bubble.text}
          </div>
        </div>
      ))}
    </>
  )
}

function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[60vh] md:h-[85vh] flex items-center justify-center bg-[#010A1F] pt-16 pb-0">
      {/* Animation keyframes */}
      <style>{`
        @keyframes slideFromRight {
          0% { opacity: 0; transform: translateX(100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes surgeFromVideo {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes surgeButtons {
          0% { opacity: 0; transform: scale(0.9) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-slide-right { animation: slideFromRight 0.8s ease-out forwards; }
        .animate-surge { animation: surgeFromVideo 0.9s ease-out forwards; }
        .animate-surge-btn { animation: surgeButtons 0.7s ease-out forwards; }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#010A1F]">
        {/* Desktop hero image */}
        <picture className="hidden md:block w-full h-full">
          <source srcSet="/images/widget-hero.webp" type="image/webp" />
          <img
            src="/images/widget-hero.png"
            alt="CatyAI Background"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
            loading="eager"
            width="2760"
            height="1504"
          />
        </picture>
        {/* Mobile hero image */}
        <picture className="md:hidden w-full h-full">
          <source srcSet="/images/hero-mobile.webp" type="image/webp" />
          <img
            src="/images/hero-mobile.png"
            alt="CatyAI Mobile"
            className="w-full h-full object-cover object-top"
            fetchpriority="high"
            loading="eager"
            width="1536"
            height="1641"
          />
        </picture>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#010A1F]/70 md:bg-[#010A1F]/50"></div>
        {/* Bottom fade overlay to blend seamlessly with next section */}
        <div className="absolute -bottom-1 left-0 right-0 h-64 bg-gradient-to-t from-[#010A1F] via-[#010A1F]/90 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          {/* Gold tagline - slides from right */}
          <p
            className="text-sm sm:text-base md:text-lg mb-6 font-bold tracking-widest uppercase animate-slide-right opacity-0"
            style={{
              color: '#C8A165',
              fontFamily: "'Inter', 'Poppins', sans-serif",
              textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
              animationDelay: '0.3s',
              letterSpacing: '0.2em'
            }}
          >
            {t.hero?.tagline || 'High-Performance Artificial Intelligence'}
          </p>

          {/* Main title - surges from video */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-balance leading-tight" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
            <span
              className="block animate-surge opacity-0"
              style={{ color: '#FFFFFF', textShadow: '2px 2px 8px rgba(0,0,0,0.9)', animationDelay: '0.6s' }}
            >
              {t.hero.title1}
            </span>
            <span
              className="block mt-2 animate-surge opacity-0"
              style={{
                background: 'linear-gradient(135deg, #C8A165 0%, #D4B57A 50%, #C8A165 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 20px rgba(200,161,101,0.3))',
                animationDelay: '0.9s'
              }}
            >
              {t.hero.title2}
            </span>
          </h1>

          {/* Subtitle - surges from video */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium animate-surge opacity-0"
            style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.8)', animationDelay: '1.2s' }}
          >
            {t.hero.subtitle}
          </p>

          {/* Buttons - surge effect */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Primary CTA - Gold gradient (Financial Success) */}
            <a
              href="https://app.catyai.io/signup"
              className="inline-flex items-center gap-2 px-10 py-4 font-bold rounded-xl transition-all text-lg transform hover:scale-105 animate-surge-btn opacity-0"
              style={{
                background: 'linear-gradient(135deg, #C8A165 0%, #D4B57A 100%)',
                color: '#010A1F',
                boxShadow: '0 4px 20px rgba(200, 161, 101, 0.4)',
                animationDelay: '1.5s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #D4B57A 0%, #C8A165 100%)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(200, 161, 101, 0.6)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #C8A165 0%, #D4B57A 100%)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(200, 161, 101, 0.4)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t.hero.cta1}
            </a>
            {/* Secondary CTA - Royal Blue outline */}
            <a
              href="#cum-functioneaza"
              className="inline-flex items-center gap-2 px-10 py-4 font-bold rounded-xl transition-all text-lg transform hover:scale-105 animate-surge-btn opacity-0"
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                border: '2px solid #1A3F7A',
                animationDelay: '1.7s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1A3F7A'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 63, 122, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {t.hero.cta2}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Trust badges - surge effect */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white text-sm animate-surge opacity-0" style={{ animationDelay: '2s' }}>
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
    <section className="relative -mt-16 pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#010A1F] z-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-12">
          {t.problem.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.problem.stats.map((stat, i) => (
            <div key={i} className="bg-[#0A1628]/50 rounded-xl p-6 border border-red-500/20">
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">{t.solution.badge}</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-white">{t.solution.title1}</span>
          <span className="gradient-text block mt-2">{t.solution.title2}</span>
        </h2>

        <p className="text-white text-lg max-w-2xl mx-auto">
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
          {t.coreFlow.title}
        </h3>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting arrows - desktop only */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-gold/50 to-gold/50 -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-gold/50 to-gold/50 -translate-y-1/2 z-0"></div>

          {t.coreFlow.steps.map((step, i) => (
            <div key={i} className="relative z-10 bg-[#0A1628]/80 rounded-2xl p-6 border border-[#1a2744] hover:border-gold/50 transition-colors text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full mb-3">
                {step.name}
              </div>
              <h4 className="text-xl font-semibold text-gold mb-2">{step.title}</h4>
              <p className="text-white text-sm">{step.desc}</p>
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
            <div key={index} className="card hover:border-gold/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">{feature.title}</h3>
              <p className="text-white">{feature.description}</p>
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">{t.products.title} <span className="gradient-text">{t.products.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.products.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Website Widget */}
          <div className="card border-2 border-gold/30 hover:border-gold/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gold">{t.products.widget.title}</h3>
            </div>
            <p className="text-white mb-6">{t.products.widget.desc}</p>
            <ul className="space-y-2">
              {t.products.widget.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-white">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="https://app.catyai.io/signup" className="btn-primary mt-6 w-full justify-center">
              {t.products?.widgetCta || 'Add Widget to Site'}
            </a>
          </div>

          {/* WhatsApp Secretary */}
          <div className="card border-2 border-gold/30 hover:border-gold/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-gold">{t.products.whatsapp.title}</h3>
            </div>
            <p className="text-white mb-6">{t.products.whatsapp.desc}</p>
            <ul className="space-y-2">
              {t.products.whatsapp.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-white">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="https://app.catyai.io/signup" className="inline-flex items-center justify-center gap-2 w-full mt-6 px-6 py-3 bg-gold hover:bg-[#D4B57A] text-white font-semibold rounded-xl transition-all">
              {t.products?.whatsappCta || 'Connect WhatsApp'}
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
            <div key={int.key} className="card hover:border-gold/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-[#D4B57A]"></div>
              <span className="text-3xl mb-3 block">{int.icon}</span>
              <h3 className="text-lg font-semibold text-gold mb-2">{t.integrations[int.key].title}</h3>
              <p className="text-white text-sm">{t.integrations[int.key].desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/analyze" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:text-purple-300 hover:border-purple-400/50 font-medium rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            {t.integrations?.analyzeButton || 'Try Auto-Crawl Free — Analyze Your Website'}
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
            <div key={index} className="card flex items-center gap-3 hover:border-gold/50 transition-colors">
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
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">{t.howItWorks.title} <span className="gradient-text">{t.howItWorks.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.howItWorks.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gold to-transparent -z-10"></div>
              )}
              <div className="card h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-bold text-gold/20">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-gold mb-3">{step.title}</h3>
                <p className="text-white mb-4">{step.description}</p>
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
              className={`card relative flex flex-col ${plan.popular ? 'border-gold lg:scale-105 z-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-[#010A1F] rounded-full text-xs font-medium whitespace-nowrap">
                  {t.pricing.mostPopular}
                </div>
              )}
              <div className="text-center mb-4">
                <h3 className="text-sm font-bold text-gold tracking-wider mb-2">{plan.name}</h3>
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
                      ? 'bg-[#0A1628]hover:bg-[#1a2744] text-white border border-[#1a2744]'
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
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
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
                <span className="text-lg font-medium text-gold">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 text-white border-t border-gold/30 pt-4">
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
        <div className="card bg-gradient-to-br from-gold/10 to-[#D4B57A]/10 border-gold/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4">
            <span className="text-gold text-sm font-semibold">AUREX v2</span>
          </div>
          <p className="text-white">AI Memory Engine</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {currentFeatures.map((feature, i) => (
            <div key={i} className="bg-[#0A1628]/50 rounded-2xl p-6 border border-gold/30 hover:border-gold/50 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gold mb-2">{feature.title}</h3>
              <p className="text-white text-sm">{feature.desc}</p>
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
          className="absolute -top-2 -right-2 bg-[#010A1F] rounded-full p-1.5 text-gray-400 hover:text-white transition-colors z-10 shadow-lg border border-[#1a2744]"
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
      <div className="bg-gold text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
        {t.floatingIndicator}
      </div>
      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

// Home Page FAQ data for structured data
const homepageFAQ = [
  {
    question: 'Is CatyAI really free?',
    answer: 'Yes. QR-First starts at just €10/month. FraudAI Shield is FREE forever.'
  },
  {
    question: 'What does CatyAI do?',
    answer: 'CatyAI is an AI sales agent that responds to customers 24/7 on WhatsApp and websites, books appointments, and blocks scams.'
  },
  {
    question: 'How fast can I get started?',
    answer: 'Live in 2 minutes. Scan QR, connect WhatsApp, start selling.'
  },
  {
    question: 'Does CatyAI work in Romanian?',
    answer: 'Fluently. Also English, Spanish, Portuguese, French, Arabic with auto-detection.'
  }
];

// SECTION 2: Realitatea - Your Website Is Dead
function Realitatea() {
  const { t } = useLanguage()
  const [counts, setCounts] = useState({ google: 0, zero: 0, ctr: 0 })
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const interval = duration / steps
          let step = 0

          const timer = setInterval(() => {
            step++
            const progress = step / steps
            const eased = 1 - Math.pow(1 - progress, 3)

            setCounts({
              google: Math.round(33 * eased),
              zero: Math.round(60 * eased),
              ctr: Math.round(3 * eased)
            })

            if (step >= steps) clearInterval(timer)
          }, interval)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="pt-0 pb-24 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-5xl mx-auto">
        {/* Main Headline - Half white, half gold */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          <span className="text-white">Your Website Is Dead.</span>{' '}
          <span className="text-gold">You Just Haven't Buried It Yet.</span>
        </h2>

        {/* Italic Subtext */}
        <p className="text-center text-lg md:text-xl italic mb-10 max-w-3xl mx-auto" style={{ color: '#A1A1AA' }}>
          {t.realitatea.subtitle}
        </p>

        {/* Paragraph */}
        <p className="text-white text-lg md:text-xl text-center mb-16 max-w-4xl mx-auto leading-relaxed">
          {t.realitatea.paragraph}
        </p>

        {/* 3 Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: -33% */}
          <div className="bg-[#010A1F] rounded-2xl p-8 border border-[#1a2744]/50 text-center">
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gold">
              -{counts.google}%
            </div>
            <div className="text-white text-base">
              {t.realitatea.stat1Label}
            </div>
          </div>

          {/* Card 2: 60% */}
          <div className="bg-[#010A1F] rounded-2xl p-8 border border-[#1a2744]/50 text-center">
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gold">
              {counts.zero}%
            </div>
            <div className="text-white text-base">
              {t.realitatea.stat2Label}
            </div>
          </div>

          {/* Card 3: 3% */}
          <div className="bg-[#010A1F] rounded-2xl p-8 border border-[#1a2744]/50 text-center">
            <div className="text-4xl md:text-5xl font-bold mb-3 text-gold">
              {counts.ctr}%
            </div>
            <div className="text-white text-base">
              {t.realitatea.stat3Label}
            </div>
          </div>
        </div>

        {/* Bullet Points */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-white text-lg">
            • {t.realitatea.bullet1}
          </p>
          <p className="text-white text-lg">
            • {t.realitatea.bullet2}
          </p>
          <p className="text-white text-lg">
            • {t.realitatea.bullet3}
          </p>
        </div>

        {/* Gold Closing Statement */}
        <p className="text-center text-xl md:text-2xl font-bold text-gold">
          {t.realitatea.closing}
        </p>
      </div>
    </section>
  )
}

// SECTION 3: Produse - One AI. Three Ways to Sell.
function ProduseNoi() {
  const { t } = useLanguage()

  const products = [
    {
      ...t.products3.qrFirst,
      color: 'from-gold to-[#D4B57A]',
      borderColor: 'border-gold/30 hover:border-gold/60',
      link: '/no-website',
      icon: '📱'
    },
    {
      ...t.products3.webWidget,
      color: 'from-gold to-[#D4B57A]',
      borderColor: 'border-gold/30 hover:border-gold/60',
      link: '/widget',
      icon: '🌐',
      popular: true
    },
    {
      ...t.products3.fraudAI,
      color: 'from-gold to-[#D4B57A]',
      borderColor: 'border-gold/30 hover:border-gold/60',
      link: '/fraud-shield',
      icon: '🛡️'
    },
    {
      ...t.products3.geoGateway,
      color: 'from-gold to-[#D4B57A]',
      borderColor: 'border-gold/30 hover:border-gold/60',
      link: '/geo-gateway',
      icon: '🌍'
    }
  ]

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.products3.title} <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">{t.products3.titleHighlight}</span>
          </h2>
          <p className="text-white text-lg">
            {t.products3.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className={`relative bg-[#0A1628]/50 rounded-2xl p-8 border-2 ${product.borderColor} transition-all hover:shadow-xl hover:shadow-gold/10 ${product.popular ? 'md:scale-105 z-10' : ''}`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold to-[#D4B57A] rounded-full text-white text-sm font-bold">
                  {t.products3.popular}
                </div>
              )}

              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-2xl font-bold text-gold mb-1">{product.name}</h3>
              <p className="text-white text-sm mb-4">{product.tagline}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                  {product.price}
                </span>
                <span className="text-gray-500 text-sm">{product.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {product.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={product.link}
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  product.popular
                    ? 'bg-gradient-to-r from-gold to-[#D4B57A] text-white hover:shadow-lg hover:shadow-gold/30'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {product.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 4: Cum Funcționează - Live in 2 Minutes
function CumFunctioneaza() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.howItWorks2.title} <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">{t.howItWorks2.titleHighlight}</span>
          </h2>
          <p className="text-white text-lg">
            {t.howItWorks2.subtitle}
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-gold via-[#D4B57A] to-gold" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.howItWorks2.steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                {/* Step Circle */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-5 bg-[#0A1628] rounded-full border-2 border-gold flex items-center justify-center group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-gold/20">
                  <span className="text-3xl">{step.icon}</span>
                </div>

                {/* Step Number */}
                <div className="text-gold/80 text-xs font-mono tracking-widest mb-2">{step.number}</div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-gold mb-1">{step.title}</h3>
                <p className="text-white text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://app.catyai.io/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-[#D4B57A] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all text-lg"
          >
            {t.howItWorks2.cta}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// SECTION 6: Industrii - 6 icons
function IndustriiNoi() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t.industries2.title} <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">{t.industries2.titleHighlight}</span>
        </h2>
        <p className="text-white text-lg mb-12">
          {t.industries2.subtitle}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {t.industries2.list.map((industry, i) => (
            <div
              key={i}
              className="bg-[#0A1628]/50 rounded-2xl p-6 border border-gold/30 hover:border-gold/50 transition-all group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{industry.icon}</div>
              <h3 className="text-lg font-bold text-gold mb-1">{industry.name}</h3>
              <p className="text-white text-sm">{industry.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-8">
          {t.industries2.trusted}
        </p>
      </div>
    </section>
  )
}

// SECTION 7: CTA Final
function CTAFinal() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-gold/10 to-[#D4B57A]/10 rounded-3xl p-12 border border-gold/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.ctaFinal.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t.ctaFinal.subtitle}
          </p>

          <a
            href="https://app.catyai.io/signup"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold to-[#D4B57A] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-gold/30 transition-all text-xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.ctaFinal.cta}
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t.ctaFinal.trust1}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t.ctaFinal.trust2}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t.ctaFinal.trust3}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
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
  const standalonePages = ['/', '/whatsapp', '/fraud-shield', '/no-website', '/widget', '/geo-gateway', '/ecommerce', '/healthcare', '/enterprise', '/platform', '/solutions', '/partners', '/company', '/investor-relations', '/protocol', '/trust-center', '/white-label', '/agency-network', '/technology-partners', '/careers', '/api-reference', '/licensing', '/pricing', '/contact', '/press', '/research/zero-trust-ai-ads-en', '/research/ce-este-catyai-akl', '/check']
  const isStandalonePage = standalonePages.includes(location.pathname) || location.pathname.startsWith('/blog')

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
            <Route path="/" element={<HomePage />} />
            <Route path="/whatsapp" element={<WhatsAppAI />} />
            <Route path="/fraud-shield" element={<FraudAI />} />
            <Route path="/chatbot-romania" element={<ChatbotRomania />} />
            <Route path="/no-website" element={<NoWebsite />} />
            <Route path="/widget" element={<CatyWidget />} />
            <Route path="/geo-gateway" element={<GeoGateway />} />
            <Route path="/ecommerce" element={<EcommercePage />} />
            <Route path="/healthcare" element={<HealthcarePage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/investor-relations" element={<Investors />} />
            <Route path="/protocol" element={<ProtocolPage />} />
            <Route path="/trust-center" element={<TrustCenter />} />
            <Route path="/white-label" element={<WhiteLabelPage />} />
            <Route path="/agency-network" element={<AgencyNetworkPage />} />
            <Route path="/technology-partners" element={<TechPartnersPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/check" element={<CheckWebsite />} />
            <Route path="/api-reference" element={<ApiReferencePage />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />
            <Route path="/research/zero-trust-ai-ads-en" element={<ZeroTrustAiAdsEn />} />
            <Route path="/research/ce-este-catyai-akl" element={<CeEsteCatyaiAkl />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />
            <Route path="/commerce" element={<CommerceDemo />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/infrastructura" element={<InfrastructurePage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/investor-relations" element={<Investors />} />
            <Route path="/protocol" element={<ProtocolPage />} />
            <Route path="/trust-center" element={<TrustCenter />} />
            <Route path="/white-label" element={<WhiteLabelPage />} />
            <Route path="/agency-network" element={<AgencyNetworkPage />} />
            <Route path="/technology-partners" element={<TechPartnersPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/api-reference" element={<ApiReferencePage />} />
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
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-gold hover:bg-[#D4B57A] text-[#010A1F] px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
