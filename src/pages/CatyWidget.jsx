import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'

const translations = {
  en: {
    badge: 'Web Sales Agent',
    heroTitle1: 'Caty Widget',
    heroTitle2: 'AI Sales Agent for Your Website',
    heroSubtitle: 'A smart chat widget that converts visitors into customers 24/7. Answers questions, qualifies leads, books appointments, and closes sales — all automatically on your website.',
    heroCta: 'Install Widget Free',
    heroCtaSecondary: 'See Live Demo',
    trustBadge1: '500 conversations/month FREE',
    trustBadge2: '2-minute installation',
    trustBadge3: 'No coding required',

    problemTitle: 'Visitors Leave.',
    problemHighlight: 'Sales Are Lost.',
    problemStats: [
      { value: '98%', label: 'of website visitors leave without buying' },
      { value: '42%', label: 'abandon if no instant response' },
      { value: '5x', label: 'more conversions with live chat vs email' }
    ],
    problemSolution: 'Caty Widget engages every visitor and converts them into customers.',

    integrationTitle: 'Install in 2 Minutes',
    integrationSubtitle: 'Copy one line of code. Paste it before </body>. Done.',
    integrationCode: '<script src="https://widget.catyai.io/embed.js" data-caty-id="YOUR_ID"></script>',
    integrationSteps: [
      { title: 'Copy Code', desc: 'Get your unique widget code from the dashboard', icon: '📋' },
      { title: 'Paste in Website', desc: 'Add it before the closing </body> tag in your HTML', icon: '💻' },
      { title: 'Customize & Go Live', desc: 'Choose colors, avatar, and greeting — you\'re live!', icon: '🚀' }
    ],
    integrationPlatforms: 'Works with: WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular, and any HTML website',

    agentTitle: 'Not a Chatbot.',
    agentHighlight: 'A Sales Agent.',
    agentDesc: 'Traditional chatbots follow scripts. Caty Widget thinks, understands context, and sells like your best employee.',
    agentComparison: [
      { chatbot: 'Follows rigid scripts', caty: 'Natural conversations' },
      { chatbot: 'Generic responses', caty: 'Personalized to your business' },
      { chatbot: 'Frustrates customers', caty: 'Delights and converts' },
      { chatbot: 'Just answers questions', caty: 'Qualifies leads & closes sales' },
      { chatbot: 'Needs constant updates', caty: 'Learns and improves automatically' }
    ],

    modulesTitle: 'Admin Dashboard Modules',
    modulesSubtitle: 'Complete control over your AI sales agent',
    modules: [
      {
        icon: '🧠',
        name: 'Knowledge Base',
        desc: '12-domain training system: products, services, pricing, policies, FAQs, team info, locations, hours, promotions, booking rules, payment methods, and custom data. Your AI knows everything about your business.',
        features: ['Product catalog import', 'FAQ builder', 'Policy documents', 'Voice training option']
      },
      {
        icon: '💬',
        name: 'Conversation AI',
        desc: 'Natural language understanding with context memory. Handles complex multi-turn conversations, understands intent, and responds in your brand voice.',
        features: ['Multi-language support', 'Sentiment analysis', 'Intent detection', 'Context memory']
      },
      {
        icon: '📅',
        name: 'Appointment Booking',
        desc: 'Integrated calendar with Google Calendar sync. Real-time availability checking, automatic confirmations, and smart reminders.',
        features: ['Google Calendar sync', 'Team member scheduling', '30-min reminders', 'Reschedule handling']
      },
      {
        icon: '📄',
        name: 'Document Generator',
        desc: 'Auto-generate quotes, invoices, booking confirmations, and contracts as PDF. Send directly in chat with payment links.',
        features: ['PDF quotes', 'Invoices', 'Booking confirmations', 'Payment links']
      },
      {
        icon: '🎯',
        name: 'Lead Qualification',
        desc: 'AI-powered lead scoring. Identifies hot prospects with smart questions, captures contact info, and prioritizes high-value leads.',
        features: ['Lead scoring', 'Smart questions', 'CRM integration', 'Priority alerts']
      },
      {
        icon: '🛡️',
        name: 'FraudAI Shield',
        desc: '8 detection modules protect against phishing, scams, and malicious messages. Your conversations stay safe.',
        features: ['Phishing detection', 'Scam blocking', 'Malware scanning', 'Data protection']
      },
      {
        icon: '📊',
        name: 'Analytics Dashboard',
        desc: 'Real-time insights: conversations, conversions, popular questions, peak hours, response times, and customer satisfaction.',
        features: ['Conversion tracking', 'Peak hours analysis', 'Question trends', 'Satisfaction scores']
      },
      {
        icon: '🔔',
        name: 'Smart Notifications',
        desc: 'Get notified of important conversations via email, SMS, or push. Escalation rules for complex queries or high-value leads.',
        features: ['Email alerts', 'SMS notifications', 'Push notifications', 'Escalation rules']
      },
      {
        icon: '🎨',
        name: 'Widget Customization',
        desc: 'Match your brand: colors, fonts, avatar, position, greeting messages, and trigger conditions.',
        features: ['Brand colors', 'Custom avatar', 'Position control', 'Trigger rules']
      },
      {
        icon: '🌍',
        name: 'Multi-Language',
        desc: 'Auto-detect visitor language. Fluent in Romanian, English, Spanish, Portuguese, French, and Arabic.',
        features: ['6 languages', 'Auto-detection', 'Real-time translation', 'Native fluency']
      },
      {
        icon: '🤖',
        name: 'Automation Rules',
        desc: 'Set up automated workflows: follow-ups, abandoned cart recovery, appointment reminders, and re-engagement campaigns.',
        features: ['Follow-up sequences', 'Cart recovery', 'Reminder automation', 'Re-engagement']
      },
      {
        icon: '🔗',
        name: 'Integrations',
        desc: 'Connect with your tools: Google Calendar, CRM systems, payment processors, email marketing, and webhooks.',
        features: ['Google Calendar', 'Stripe/PayPal', 'Zapier', 'Custom webhooks']
      }
    ],

    uniqueTitle: 'Why Caty Widget Is Unique',
    uniqueSubtitle: 'The only AI sales agent that truly understands your business',
    unique: [
      {
        icon: '🎓',
        title: 'Deep Business Training',
        desc: 'Unlike generic chatbots, Caty is trained specifically on YOUR business. Products, pricing, policies — everything. It answers like your best employee.'
      },
      {
        icon: '💰',
        title: 'Sells, Not Just Chats',
        desc: 'Most chat tools just answer questions. Caty qualifies leads, creates urgency, handles objections, and guides visitors to purchase.'
      },
      {
        icon: '📄',
        title: 'Documents in Chat',
        desc: 'Generate and send quotes, invoices, and contracts instantly — right in the conversation. No "I\'ll email you later" delays.'
      },
      {
        icon: '🔐',
        title: 'Built-in Fraud Protection',
        desc: 'FraudAI Shield protects your business from phishing and scam attempts. Competitors charge extra for this — we include it free.'
      },
      {
        icon: '🌐',
        title: 'WhatsApp + Web Unified',
        desc: 'Same AI, same knowledge base across your website and WhatsApp. One dashboard, complete customer view.'
      },
      {
        icon: '💸',
        title: 'No Per-Message Fees',
        desc: 'Unlimited conversations for one flat price. Competitors charge per resolution or per user — we don\'t.'
      }
    ],

    featuresTitle: 'Complete Feature List',
    featuresSubtitle: 'Everything included in Caty Widget',
    featuresList: [
      '24/7 AI responses in natural language',
      'Context-aware multi-turn conversations',
      'Lead capture and qualification',
      'Lead scoring with priority alerts',
      'Google Calendar appointment booking',
      'Real-time availability checking',
      'Automatic booking confirmations',
      'Smart appointment reminders',
      'PDF quote generation',
      'Invoice creation and sending',
      'Payment link integration',
      'Multi-language support (6 languages)',
      'Automatic language detection',
      'Sentiment analysis',
      'Intent detection',
      'Knowledge base with 12 domains',
      'Product catalog support',
      'FAQ management',
      'FraudAI Shield protection',
      'Phishing link detection',
      'Scam message blocking',
      'Real-time analytics dashboard',
      'Conversion tracking',
      'Peak hours analysis',
      'Question trend reports',
      'Customer satisfaction scores',
      'Email/SMS/Push notifications',
      'Escalation rules',
      'Human handoff capability',
      'Widget customization (colors, position)',
      'Custom avatars and branding',
      'Trigger conditions (time on page, scroll)',
      'Mobile-responsive design',
      'GDPR compliant',
      'AWS servers (Ireland)',
      'End-to-end encryption',
      'CRM integrations',
      'Zapier connection',
      'Custom webhooks',
      'API access'
    ],

    comparisonTitle: 'Caty Widget vs. Alternatives',
    comparisonSubtitle: 'See why businesses choose Caty',
    comparisonItems: [
      { feature: 'Monthly price', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + fees', drift: '$2,500+' },
      { feature: 'AI included', caty: 'Yes', tidio: '+€32/mo', intercom: '+$0.99/resolution', drift: 'Extra tier' },
      { feature: 'Document generation', caty: 'Yes', tidio: 'No', intercom: 'No', drift: 'No' },
      { feature: 'Fraud protection', caty: 'Yes', tidio: 'No', intercom: 'No', drift: 'No' },
      { feature: 'WhatsApp integration', caty: 'Native', tidio: 'Limited', intercom: 'Paid add-on', drift: 'No' },
      { feature: 'Booking system', caty: 'Built-in', tidio: 'External', intercom: 'External', drift: 'External' },
      { feature: 'Languages', caty: '6', tidio: '3', intercom: '5', drift: '3' },
      { feature: 'Setup time', caty: '2 minutes', tidio: '30+ minutes', intercom: '1+ hours', drift: '2+ weeks' }
    ],

    useCasesTitle: 'Perfect For',
    useCasesSubtitle: 'Businesses that want to convert more website visitors',
    useCases: [
      { icon: '🛒', title: 'E-commerce', desc: 'Answer product questions, recommend items, recover abandoned carts, process orders.' },
      { icon: '🏥', title: 'Healthcare', desc: 'Book appointments, answer service questions, collect patient info, send reminders.' },
      { icon: '🏠', title: 'Real Estate', desc: 'Qualify buyers, schedule viewings, answer property questions, capture leads.' },
      { icon: '⚖️', title: 'Legal Services', desc: 'Initial consultations, case qualification, appointment booking, document requests.' },
      { icon: '🎓', title: 'Education', desc: 'Course inquiries, enrollment assistance, schedule tours, answer FAQs.' },
      { icon: '🔧', title: 'Service Providers', desc: 'Quote requests, appointment scheduling, service explanations, lead capture.' }
    ],

    testimonialsTitle: 'What Our Customers Say',
    testimonials: [
      { quote: 'Caty Widget increased our conversions by 340%. It answers questions better than our previous live chat team.', author: 'Alexandru P.', role: 'E-commerce Owner' },
      { quote: 'Setup took 2 minutes, literally. Now it handles 80% of our inquiries automatically.', author: 'Maria S.', role: 'Dental Clinic Manager' },
      { quote: 'The document generation feature is a game-changer. Quotes sent in seconds, not hours.', author: 'Ionut M.', role: 'Real Estate Agent' }
    ],

    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How long does installation take?', a: '2 minutes. Copy one line of code, paste it in your website, and you\'re live. No developers needed.' },
      { q: 'Does it work with my website platform?', a: 'Yes. Caty Widget works with WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular, and any HTML website.' },
      { q: 'Can it handle complex questions?', a: 'Yes. Caty is trained on your specific business — products, pricing, policies. It handles complex, multi-turn conversations with context memory.' },
      { q: 'What if Caty can\'t answer?', a: 'It seamlessly hands off to a human agent with full conversation context. You can set custom escalation rules.' },
      { q: 'Is there a free trial?', a: 'Yes. 500 conversations/month free forever. No credit card required to start.' },
      { q: 'Can I customize the appearance?', a: 'Completely. Colors, avatar, position, greeting messages, trigger conditions — all customizable from the dashboard.' },
      { q: 'Does it integrate with my tools?', a: 'Yes. Google Calendar, Stripe, PayPal, CRMs, email marketing tools, and custom webhooks. Plus Zapier for 5,000+ apps.' },
      { q: 'Is my data secure?', a: 'GDPR compliant. AWS Ireland servers. End-to-end encryption. You own your data.' }
    ],

    ctaTitle: 'Ready to Convert More Visitors?',
    ctaSubtitle: 'Install Caty Widget in 2 minutes. Start converting 24/7.',
    ctaButton: 'Install Widget Free',
    ctaDemo: 'Or book a demo first →',

    pricingTitle: 'Simple, Transparent',
    pricingHighlight: 'Pricing',
    pricingSubtitle: 'Start free, upgrade when you grow',
    pricingPlans: [
      {
        name: 'FREE',
        price: '€0',
        period: '/month',
        desc: 'Perfect to get started',
        features: ['500 conversations/month', 'AI responses 24/7', 'Basic customization', 'Email support'],
        cta: 'Start Free',
        popular: false
      },
      {
        name: 'PRO',
        price: '€49',
        period: '/month',
        desc: 'For growing businesses',
        features: ['Unlimited conversations', 'Full customization', 'Document generation', 'Priority support', 'Analytics dashboard', 'CRM integrations'],
        cta: 'Get Pro',
        popular: true
      },
      {
        name: 'ENTERPRISE',
        price: 'Custom',
        period: '',
        desc: 'For large teams',
        features: ['Everything in Pro', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'On-premise option', 'Team training'],
        cta: 'Contact Sales',
        popular: false
      }
    ],

    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Start Free' },
    footer: {
      tagline: 'AI that sells for your business.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      features: 'Features',
      pricing: 'Pricing',
      whatsapp: 'WhatsApp AI',
      dashboard: 'Dashboard',
      docs: 'Documentation',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
      gdpr: 'GDPR',
      licensing: 'Licensing',
      copyright: 'PayAi-X FZE. All rights reserved.'
    }
  },
  ro: {
    badge: 'Agent de Vânzări Web',
    heroTitle1: 'Caty Widget',
    heroTitle2: 'Agent AI de Vânzări Pentru Site-ul Tău',
    heroSubtitle: 'Un widget de chat inteligent care convertește vizitatorii în clienți 24/7. Răspunde la întrebări, califică lead-uri, programează întâlniri și închide vânzări — totul automat pe site-ul tău.',
    heroCta: 'Instalează Widget Gratuit',
    heroCtaSecondary: 'Vezi Demo Live',
    trustBadge1: '500 conversații/lună GRATUIT',
    trustBadge2: 'Instalare în 2 minute',
    trustBadge3: 'Fără cod necesar',

    problemTitle: 'Vizitatorii Pleacă.',
    problemHighlight: 'Vânzările Se Pierd.',
    problemStats: [
      { value: '98%', label: 'din vizitatorii site-ului pleacă fără să cumpere' },
      { value: '42%', label: 'abandonează dacă nu primesc răspuns instant' },
      { value: '5x', label: 'mai multe conversii cu chat live vs email' }
    ],
    problemSolution: 'Caty Widget implică fiecare vizitator și îl convertește în client.',

    integrationTitle: 'Instalare în 2 Minute',
    integrationSubtitle: 'Copiezi o linie de cod. O lipești înainte de </body>. Gata.',
    integrationCode: '<script src="https://widget.catyai.io/embed.js" data-caty-id="YOUR_ID"></script>',
    integrationSteps: [
      { title: 'Copiază Codul', desc: 'Obține codul tău unic de widget din dashboard', icon: '📋' },
      { title: 'Lipește în Site', desc: 'Adaugă-l înainte de tag-ul </body> în HTML-ul tău', icon: '💻' },
      { title: 'Personalizează & Activează', desc: 'Alege culori, avatar și mesaj de întâmpinare — ești live!', icon: '🚀' }
    ],
    integrationPlatforms: 'Funcționează cu: WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular și orice site HTML',

    agentTitle: 'Nu E un Chatbot.',
    agentHighlight: 'E un Agent de Vânzări.',
    agentDesc: 'Chatbot-urile tradiționale urmează scripturi. Caty Widget gândește, înțelege contextul și vinde ca cel mai bun angajat al tău.',
    agentComparison: [
      { chatbot: 'Urmează scripturi rigide', caty: 'Conversații naturale' },
      { chatbot: 'Răspunsuri generice', caty: 'Personalizat pentru afacerea ta' },
      { chatbot: 'Frustrează clienții', caty: 'Încântă și convertește' },
      { chatbot: 'Doar răspunde la întrebări', caty: 'Califică lead-uri și închide vânzări' },
      { chatbot: 'Necesită actualizări constante', caty: 'Învață și se îmbunătățește automat' }
    ],

    modulesTitle: 'Module Dashboard Admin',
    modulesSubtitle: 'Control complet asupra agentului tău AI de vânzări',
    modules: [
      {
        icon: '🧠',
        name: 'Knowledge Base',
        desc: 'Sistem de training cu 12 domenii: produse, servicii, prețuri, politici, FAQ, info echipă, locații, program, promoții, reguli rezervări, metode plată și date personalizate. AI-ul tău știe totul despre afacerea ta.',
        features: ['Import catalog produse', 'Constructor FAQ', 'Documente politici', 'Opțiune training vocal']
      },
      {
        icon: '💬',
        name: 'AI Conversațional',
        desc: 'Înțelegere limbaj natural cu memorie de context. Gestionează conversații complexe multi-turn, înțelege intenția și răspunde în vocea brand-ului tău.',
        features: ['Suport multi-limbă', 'Analiză sentiment', 'Detecție intenție', 'Memorie context']
      },
      {
        icon: '📅',
        name: 'Programări',
        desc: 'Calendar integrat cu sincronizare Google Calendar. Verificare disponibilitate în timp real, confirmări automate și remindere inteligente.',
        features: ['Sync Google Calendar', 'Programare membri echipă', 'Remindere 30 min', 'Gestionare reprogramări']
      },
      {
        icon: '📄',
        name: 'Generator Documente',
        desc: 'Auto-generare oferte, facturi, confirmări rezervări și contracte PDF. Trimise direct în chat cu link-uri de plată.',
        features: ['Oferte PDF', 'Facturi', 'Confirmări rezervări', 'Link-uri plată']
      },
      {
        icon: '🎯',
        name: 'Calificare Lead-uri',
        desc: 'Scoring lead-uri alimentat de AI. Identifică prospecți fierbinți cu întrebări inteligente, capturează info contact și prioritizează lead-uri valoroase.',
        features: ['Scoring lead-uri', 'Întrebări inteligente', 'Integrare CRM', 'Alerte prioritare']
      },
      {
        icon: '🛡️',
        name: 'FraudAI Shield',
        desc: '8 module de detecție protejează împotriva phishing, escrocherii și mesaje malițioase. Conversațiile tale rămân în siguranță.',
        features: ['Detecție phishing', 'Blocare escrocherii', 'Scanare malware', 'Protecție date']
      },
      {
        icon: '📊',
        name: 'Dashboard Analitics',
        desc: 'Insights în timp real: conversații, conversii, întrebări populare, ore de vârf, timpi răspuns și satisfacție clienți.',
        features: ['Tracking conversii', 'Analiză ore vârf', 'Trenduri întrebări', 'Scoruri satisfacție']
      },
      {
        icon: '🔔',
        name: 'Notificări Inteligente',
        desc: 'Fii notificat de conversații importante prin email, SMS sau push. Reguli de escaladare pentru query-uri complexe sau lead-uri valoroase.',
        features: ['Alerte email', 'Notificări SMS', 'Push notifications', 'Reguli escaladare']
      },
      {
        icon: '🎨',
        name: 'Personalizare Widget',
        desc: 'Potrivește-te cu brand-ul tău: culori, fonturi, avatar, poziție, mesaje de întâmpinare și condiții de declanșare.',
        features: ['Culori brand', 'Avatar personalizat', 'Control poziție', 'Reguli trigger']
      },
      {
        icon: '🌍',
        name: 'Multi-Limbă',
        desc: 'Auto-detectare limbă vizitator. Fluent în română, engleză, spaniolă, portugheză, franceză și arabă.',
        features: ['6 limbi', 'Auto-detectare', 'Traducere timp real', 'Fluență nativă']
      },
      {
        icon: '🤖',
        name: 'Reguli Automatizare',
        desc: 'Configurează workflow-uri automate: follow-up-uri, recuperare coșuri abandonate, remindere programări și campanii de re-engagement.',
        features: ['Secvențe follow-up', 'Recuperare coșuri', 'Automatizare remindere', 'Re-engagement']
      },
      {
        icon: '🔗',
        name: 'Integrări',
        desc: 'Conectează cu tool-urile tale: Google Calendar, sisteme CRM, procesatori plăți, email marketing și webhook-uri.',
        features: ['Google Calendar', 'Stripe/PayPal', 'Zapier', 'Webhook-uri custom']
      }
    ],

    uniqueTitle: 'De Ce Caty Widget E Unic',
    uniqueSubtitle: 'Singurul agent AI de vânzări care înțelege cu adevărat afacerea ta',
    unique: [
      {
        icon: '🎓',
        title: 'Training Profund Pe Afacere',
        desc: 'Spre deosebire de chatbot-urile generice, Caty e antrenat specific pe afacerea TA. Produse, prețuri, politici — totul. Răspunde ca cel mai bun angajat al tău.'
      },
      {
        icon: '💰',
        title: 'Vinde, Nu Doar Vorbește',
        desc: 'Majoritatea tool-urilor de chat doar răspund la întrebări. Caty califică lead-uri, creează urgență, gestionează obiecții și ghidează vizitatorii spre cumpărare.'
      },
      {
        icon: '📄',
        title: 'Documente în Chat',
        desc: 'Generează și trimite oferte, facturi și contracte instant — direct în conversație. Fără întârzieri "Îți trimit pe email".'
      },
      {
        icon: '🔐',
        title: 'Protecție Anti-Fraudă Inclusă',
        desc: 'FraudAI Shield îți protejează afacerea de phishing și tentative de escrocherie. Competitorii taxează extra pentru asta — noi o includem gratuit.'
      },
      {
        icon: '🌐',
        title: 'WhatsApp + Web Unificat',
        desc: 'Același AI, aceeași bază de cunoștințe pe site-ul tău și WhatsApp. Un dashboard, vedere completă a clientului.'
      },
      {
        icon: '💸',
        title: 'Fără Taxe Per Mesaj',
        desc: 'Conversații nelimitate la un preț fix. Competitorii taxează per rezoluție sau per utilizator — noi nu.'
      }
    ],

    featuresTitle: 'Lista Completă de Funcții',
    featuresSubtitle: 'Totul inclus în Caty Widget',
    featuresList: [
      'Răspunsuri AI 24/7 în limbaj natural',
      'Conversații multi-turn cu context',
      'Capturare și calificare lead-uri',
      'Scoring lead-uri cu alerte prioritare',
      'Programări cu Google Calendar',
      'Verificare disponibilitate în timp real',
      'Confirmări automate rezervări',
      'Remindere inteligente programări',
      'Generare oferte PDF',
      'Creare și trimitere facturi',
      'Integrare link-uri plată',
      'Suport multi-limbă (6 limbi)',
      'Detectare automată limbă',
      'Analiză sentiment',
      'Detecție intenție',
      'Knowledge base cu 12 domenii',
      'Suport catalog produse',
      'Management FAQ',
      'Protecție FraudAI Shield',
      'Detecție link-uri phishing',
      'Blocare mesaje escrocherie',
      'Dashboard analytics timp real',
      'Tracking conversii',
      'Analiză ore de vârf',
      'Rapoarte trenduri întrebări',
      'Scoruri satisfacție clienți',
      'Notificări Email/SMS/Push',
      'Reguli de escaladare',
      'Capabilitate handoff către om',
      'Personalizare widget (culori, poziție)',
      'Avatar și branding custom',
      'Condiții trigger (timp pe pagină, scroll)',
      'Design responsive mobil',
      'Conform GDPR',
      'Servere AWS (Irlanda)',
      'Criptare end-to-end',
      'Integrări CRM',
      'Conexiune Zapier',
      'Webhook-uri custom',
      'Acces API'
    ],

    comparisonTitle: 'Caty Widget vs. Alternative',
    comparisonSubtitle: 'Vezi de ce afacerile aleg Caty',
    comparisonItems: [
      { feature: 'Preț lunar', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + taxe', drift: '$2,500+' },
      { feature: 'AI inclus', caty: 'Da', tidio: '+€32/lună', intercom: '+$0.99/rezoluție', drift: 'Tier extra' },
      { feature: 'Generare documente', caty: 'Da', tidio: 'Nu', intercom: 'Nu', drift: 'Nu' },
      { feature: 'Protecție fraudă', caty: 'Da', tidio: 'Nu', intercom: 'Nu', drift: 'Nu' },
      { feature: 'Integrare WhatsApp', caty: 'Nativ', tidio: 'Limitat', intercom: 'Add-on plătit', drift: 'Nu' },
      { feature: 'Sistem rezervări', caty: 'Inclus', tidio: 'Extern', intercom: 'Extern', drift: 'Extern' },
      { feature: 'Limbi', caty: '6', tidio: '3', intercom: '5', drift: '3' },
      { feature: 'Timp setup', caty: '2 minute', tidio: '30+ minute', intercom: '1+ ore', drift: '2+ săptămâni' }
    ],

    useCasesTitle: 'Perfect Pentru',
    useCasesSubtitle: 'Afaceri care vor să convertească mai mulți vizitatori',
    useCases: [
      { icon: '🛒', title: 'E-commerce', desc: 'Răspunde la întrebări despre produse, recomandă articole, recuperează coșuri abandonate, procesează comenzi.' },
      { icon: '🏥', title: 'Sănătate', desc: 'Programează întâlniri, răspunde la întrebări despre servicii, colectează info pacient, trimite remindere.' },
      { icon: '🏠', title: 'Imobiliare', desc: 'Califică cumpărători, programează vizionări, răspunde la întrebări despre proprietăți, capturează lead-uri.' },
      { icon: '⚖️', title: 'Servicii Juridice', desc: 'Consultații inițiale, calificare cazuri, programări, cereri documente.' },
      { icon: '🎓', title: 'Educație', desc: 'Întrebări cursuri, asistență înscriere, programări tururi, răspunsuri FAQ.' },
      { icon: '🔧', title: 'Furnizori Servicii', desc: 'Cereri oferte, programări, explicații servicii, capturare lead-uri.' }
    ],

    testimonialsTitle: 'Ce Spun Clienții Noștri',
    testimonials: [
      { quote: 'Caty Widget ne-a crescut conversiile cu 340%. Răspunde la întrebări mai bine decât echipa noastră anterioară de live chat.', author: 'Alexandru P.', role: 'Proprietar E-commerce' },
      { quote: 'Setup-ul a durat 2 minute, literal. Acum gestionează 80% din întrebări automat.', author: 'Maria S.', role: 'Manager Clinică Dentară' },
      { quote: 'Funcția de generare documente e revoluționară. Ofertele trimise în secunde, nu ore.', author: 'Ionuț M.', role: 'Agent Imobiliar' }
    ],

    faqTitle: 'Întrebări Frecvente',
    faqs: [
      { q: 'Cât durează instalarea?', a: '2 minute. Copiezi o linie de cod, o lipești în site și ești live. Nu ai nevoie de programatori.' },
      { q: 'Funcționează cu platforma mea de site?', a: 'Da. Caty Widget funcționează cu WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular și orice site HTML.' },
      { q: 'Poate gestiona întrebări complexe?', a: 'Da. Caty e antrenat pe afacerea ta specifică — produse, prețuri, politici. Gestionează conversații complexe, multi-turn cu memorie de context.' },
      { q: 'Ce se întâmplă dacă Caty nu poate răspunde?', a: 'Transferă fără probleme către un agent uman cu tot contextul conversației. Poți seta reguli personalizate de escaladare.' },
      { q: 'Există trial gratuit?', a: 'Da. 500 conversații/lună gratuit pentru totdeauna. Nu ai nevoie de card bancar pentru a începe.' },
      { q: 'Pot personaliza aspectul?', a: 'Complet. Culori, avatar, poziție, mesaje de întâmpinare, condiții trigger — totul personalizabil din dashboard.' },
      { q: 'Se integrează cu tool-urile mele?', a: 'Da. Google Calendar, Stripe, PayPal, CRM-uri, tool-uri email marketing și webhook-uri custom. Plus Zapier pentru 5,000+ aplicații.' },
      { q: 'Datele mele sunt în siguranță?', a: 'Conform GDPR. Servere AWS Irlanda. Criptare end-to-end. Datele tale rămân ale tale.' }
    ],

    ctaTitle: 'Gata Să Convertești Mai Mulți Vizitatori?',
    ctaSubtitle: 'Instalează Caty Widget în 2 minute. Începe să convertești 24/7.',
    ctaButton: 'Instalează Widget Gratuit',
    ctaDemo: 'Sau programează un demo întâi →',

    pricingTitle: 'Prețuri Simple,',
    pricingHighlight: 'Transparente',
    pricingSubtitle: 'Începi gratuit, faci upgrade când crești',
    pricingPlans: [
      {
        name: 'GRATUIT',
        price: '€0',
        period: '/lună',
        desc: 'Perfect pentru început',
        features: ['500 conversații/lună', 'Răspunsuri AI 24/7', 'Personalizare de bază', 'Suport email'],
        cta: 'Începe Gratuit',
        popular: false
      },
      {
        name: 'PRO',
        price: '€49',
        period: '/lună',
        desc: 'Pentru afaceri în creștere',
        features: ['Conversații nelimitate', 'Personalizare completă', 'Generare documente', 'Suport prioritar', 'Dashboard analitics', 'Integrări CRM'],
        cta: 'Obține Pro',
        popular: true
      },
      {
        name: 'ENTERPRISE',
        price: 'Personalizat',
        period: '',
        desc: 'Pentru echipe mari',
        features: ['Tot din Pro', 'Manager de cont dedicat', 'Integrări custom', 'Garanție SLA', 'Opțiune on-premise', 'Training echipă'],
        cta: 'Contactează Vânzări',
        popular: false
      }
    ],

    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Gratuit' },
    footer: {
      tagline: 'AI care vinde pentru afacerea ta.',
      product: 'Produs',
      company: 'Companie',
      legal: 'Legal',
      features: 'Funcții',
      pricing: 'Prețuri',
      whatsapp: 'WhatsApp AI',
      dashboard: 'Dashboard',
      docs: 'Documentație',
      about: 'Despre',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidențialitate',
      terms: 'Termeni',
      gdpr: 'GDPR',
      licensing: 'Licențiere',
      copyright: 'PayAi-X FZE. Toate drepturile rezervate.'
    }
  },
  es: {
    badge: 'Agente de Ventas Web',
    heroTitle1: 'Caty Widget',
    heroTitle2: 'Agente AI de Ventas Para Tu Web',
    heroSubtitle: 'Un widget de chat inteligente que convierte visitantes en clientes 24/7. Responde preguntas, califica leads, agenda citas y cierra ventas — todo automáticamente en tu sitio web.',
    heroCta: 'Instalar Widget Gratis',
    heroCtaSecondary: 'Ver Demo en Vivo',
    trustBadge1: '500 conversaciones/mes GRATIS',
    trustBadge2: 'Instalación en 2 minutos',
    trustBadge3: 'Sin código necesario',

    problemTitle: 'Los Visitantes Se Van.',
    problemHighlight: 'Las Ventas Se Pierden.',
    problemStats: [
      { value: '98%', label: 'de visitantes web se van sin comprar' },
      { value: '42%', label: 'abandonan si no hay respuesta instantánea' },
      { value: '5x', label: 'más conversiones con chat en vivo vs email' }
    ],
    problemSolution: 'Caty Widget atrae a cada visitante y los convierte en clientes.',

    integrationTitle: 'Instala en 2 Minutos',
    integrationSubtitle: 'Copia una línea de código. Pégala antes de </body>. Listo.',
    integrationCode: '<script src="https://widget.catyai.io/embed.js" data-caty-id="YOUR_ID"></script>',
    integrationSteps: [
      { title: 'Copia el Código', desc: 'Obtén tu código único del widget desde el dashboard', icon: '📋' },
      { title: 'Pega en Tu Web', desc: 'Agrégalo antes de la etiqueta </body> en tu HTML', icon: '💻' },
      { title: 'Personaliza y Activa', desc: 'Elige colores, avatar y saludo — ¡estás en vivo!', icon: '🚀' }
    ],
    integrationPlatforms: 'Funciona con: WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular y cualquier sitio HTML',

    agentTitle: 'No Es un Chatbot.',
    agentHighlight: 'Es un Agente de Ventas.',
    agentDesc: 'Los chatbots tradicionales siguen scripts. Caty Widget piensa, entiende contexto y vende como tu mejor empleado.',
    agentComparison: [
      { chatbot: 'Sigue scripts rígidos', caty: 'Conversaciones naturales' },
      { chatbot: 'Respuestas genéricas', caty: 'Personalizado para tu negocio' },
      { chatbot: 'Frustra a clientes', caty: 'Deleita y convierte' },
      { chatbot: 'Solo responde preguntas', caty: 'Califica leads y cierra ventas' },
      { chatbot: 'Necesita actualizaciones constantes', caty: 'Aprende y mejora automáticamente' }
    ],

    modulesTitle: 'Módulos del Dashboard Admin',
    modulesSubtitle: 'Control completo sobre tu agente AI de ventas',
    modules: [
      {
        icon: '🧠',
        name: 'Base de Conocimiento',
        desc: 'Sistema de entrenamiento de 12 dominios: productos, servicios, precios, políticas, FAQs, info equipo, ubicaciones, horarios, promociones, reglas de reserva, métodos de pago y datos personalizados.',
        features: ['Importar catálogo', 'Constructor FAQ', 'Documentos de políticas', 'Entrenamiento por voz']
      },
      {
        icon: '💬',
        name: 'IA Conversacional',
        desc: 'Comprensión del lenguaje natural con memoria de contexto. Maneja conversaciones complejas de múltiples turnos.',
        features: ['Soporte multiidioma', 'Análisis de sentimiento', 'Detección de intención', 'Memoria de contexto']
      },
      {
        icon: '📅',
        name: 'Reserva de Citas',
        desc: 'Calendario integrado con sincronización de Google Calendar. Verificación de disponibilidad en tiempo real.',
        features: ['Sync Google Calendar', 'Programación de equipo', 'Recordatorios 30 min', 'Reprogramación']
      },
      {
        icon: '📄',
        name: 'Generador de Documentos',
        desc: 'Auto-genera cotizaciones, facturas, confirmaciones de reserva y contratos como PDF.',
        features: ['Cotizaciones PDF', 'Facturas', 'Confirmaciones', 'Links de pago']
      },
      {
        icon: '🎯',
        name: 'Calificación de Leads',
        desc: 'Puntuación de leads con IA. Identifica prospectos calientes con preguntas inteligentes.',
        features: ['Puntuación leads', 'Preguntas inteligentes', 'Integración CRM', 'Alertas prioritarias']
      },
      {
        icon: '🛡️',
        name: 'FraudAI Shield',
        desc: '8 módulos de detección protegen contra phishing, estafas y mensajes maliciosos.',
        features: ['Detección phishing', 'Bloqueo estafas', 'Escaneo malware', 'Protección datos']
      },
      {
        icon: '📊',
        name: 'Dashboard Analytics',
        desc: 'Insights en tiempo real: conversaciones, conversiones, preguntas populares, horas pico.',
        features: ['Tracking conversiones', 'Análisis horas pico', 'Tendencias preguntas', 'Puntuaciones satisfacción']
      },
      {
        icon: '🔔',
        name: 'Notificaciones Inteligentes',
        desc: 'Recibe notificaciones de conversaciones importantes vía email, SMS o push.',
        features: ['Alertas email', 'Notificaciones SMS', 'Push notifications', 'Reglas escalamiento']
      },
      {
        icon: '🎨',
        name: 'Personalización Widget',
        desc: 'Coincide con tu marca: colores, fuentes, avatar, posición, mensajes de saludo.',
        features: ['Colores de marca', 'Avatar personalizado', 'Control de posición', 'Reglas trigger']
      },
      {
        icon: '🌍',
        name: 'Multi-Idioma',
        desc: 'Auto-detecta idioma del visitante. Fluido en rumano, inglés, español, portugués, francés y árabe.',
        features: ['6 idiomas', 'Auto-detección', 'Traducción tiempo real', 'Fluidez nativa']
      },
      {
        icon: '🤖',
        name: 'Reglas de Automatización',
        desc: 'Configura workflows automáticos: seguimientos, recuperación de carritos abandonados, recordatorios.',
        features: ['Secuencias follow-up', 'Recuperación carritos', 'Automatización recordatorios', 'Re-engagement']
      },
      {
        icon: '🔗',
        name: 'Integraciones',
        desc: 'Conecta con tus herramientas: Google Calendar, sistemas CRM, procesadores de pago, email marketing.',
        features: ['Google Calendar', 'Stripe/PayPal', 'Zapier', 'Webhooks personalizados']
      }
    ],

    uniqueTitle: 'Por Qué Caty Widget Es Único',
    uniqueSubtitle: 'El único agente AI de ventas que realmente entiende tu negocio',
    unique: [
      {
        icon: '🎓',
        title: 'Entrenamiento Profundo',
        desc: 'A diferencia de chatbots genéricos, Caty está entrenado específicamente en TU negocio. Productos, precios, políticas — todo.'
      },
      {
        icon: '💰',
        title: 'Vende, No Solo Chatea',
        desc: 'La mayoría de herramientas de chat solo responden preguntas. Caty califica leads, crea urgencia, maneja objeciones y guía a la compra.'
      },
      {
        icon: '📄',
        title: 'Documentos en Chat',
        desc: 'Genera y envía cotizaciones, facturas y contratos instantáneamente — directo en la conversación.'
      },
      {
        icon: '🔐',
        title: 'Protección Anti-Fraude Incluida',
        desc: 'FraudAI Shield protege tu negocio de phishing y estafas. Los competidores cobran extra — nosotros lo incluimos gratis.'
      },
      {
        icon: '🌐',
        title: 'WhatsApp + Web Unificado',
        desc: 'Mismo AI, misma base de conocimiento en tu web y WhatsApp. Un dashboard, vista completa del cliente.'
      },
      {
        icon: '💸',
        title: 'Sin Cobros Por Mensaje',
        desc: 'Conversaciones ilimitadas por un precio fijo. Los competidores cobran por resolución o por usuario — nosotros no.'
      }
    ],

    featuresTitle: 'Lista Completa de Funciones',
    featuresSubtitle: 'Todo incluido en Caty Widget',
    featuresList: [
      'Respuestas AI 24/7 en lenguaje natural',
      'Conversaciones multi-turno con contexto',
      'Captura y calificación de leads',
      'Puntuación de leads con alertas',
      'Reserva de citas con Google Calendar',
      'Verificación de disponibilidad en tiempo real',
      'Confirmaciones automáticas de reserva',
      'Recordatorios inteligentes de citas',
      'Generación de cotizaciones PDF',
      'Creación y envío de facturas',
      'Integración de links de pago',
      'Soporte multi-idioma (6 idiomas)',
      'Detección automática de idioma',
      'Análisis de sentimiento',
      'Detección de intención',
      'Base de conocimiento con 12 dominios',
      'Soporte de catálogo de productos',
      'Gestión de FAQ',
      'Protección FraudAI Shield',
      'Detección de links phishing',
      'Bloqueo de mensajes de estafa',
      'Dashboard analytics en tiempo real',
      'Tracking de conversiones',
      'Análisis de horas pico',
      'Reportes de tendencias',
      'Puntuaciones de satisfacción',
      'Notificaciones Email/SMS/Push',
      'Reglas de escalamiento',
      'Capacidad de handoff humano',
      'Personalización widget',
      'Avatares y branding custom',
      'Condiciones de trigger',
      'Diseño responsive móvil',
      'Cumple GDPR',
      'Servidores AWS (Irlanda)',
      'Cifrado end-to-end',
      'Integraciones CRM',
      'Conexión Zapier',
      'Webhooks personalizados',
      'Acceso API'
    ],

    comparisonTitle: 'Caty Widget vs. Alternativas',
    comparisonSubtitle: 'Mira por qué los negocios eligen Caty',
    comparisonItems: [
      { feature: 'Precio mensual', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + tarifas', drift: '$2,500+' },
      { feature: 'AI incluido', caty: 'Sí', tidio: '+€32/mes', intercom: '+$0.99/resolución', drift: 'Tier extra' },
      { feature: 'Generación documentos', caty: 'Sí', tidio: 'No', intercom: 'No', drift: 'No' },
      { feature: 'Protección fraude', caty: 'Sí', tidio: 'No', intercom: 'No', drift: 'No' },
      { feature: 'Integración WhatsApp', caty: 'Nativo', tidio: 'Limitado', intercom: 'Add-on pagado', drift: 'No' },
      { feature: 'Sistema reservas', caty: 'Incluido', tidio: 'Externo', intercom: 'Externo', drift: 'Externo' },
      { feature: 'Idiomas', caty: '6', tidio: '3', intercom: '5', drift: '3' },
      { feature: 'Tiempo setup', caty: '2 minutos', tidio: '30+ minutos', intercom: '1+ horas', drift: '2+ semanas' }
    ],

    useCasesTitle: 'Perfecto Para',
    useCasesSubtitle: 'Negocios que quieren convertir más visitantes web',
    useCases: [
      { icon: '🛒', title: 'E-commerce', desc: 'Responde preguntas de productos, recomienda artículos, recupera carritos abandonados.' },
      { icon: '🏥', title: 'Salud', desc: 'Agenda citas, responde preguntas de servicios, recolecta info de pacientes.' },
      { icon: '🏠', title: 'Inmobiliaria', desc: 'Califica compradores, agenda visitas, responde preguntas de propiedades.' },
      { icon: '⚖️', title: 'Servicios Legales', desc: 'Consultas iniciales, calificación de casos, agendamiento, solicitud de documentos.' },
      { icon: '🎓', title: 'Educación', desc: 'Consultas de cursos, asistencia de inscripción, agenda tours, responde FAQs.' },
      { icon: '🔧', title: 'Proveedores de Servicios', desc: 'Solicitudes de cotización, agendamiento, explicaciones de servicios.' }
    ],

    testimonialsTitle: 'Lo Que Dicen Nuestros Clientes',
    testimonials: [
      { quote: 'Caty Widget aumentó nuestras conversiones un 340%. Responde preguntas mejor que nuestro equipo anterior de chat en vivo.', author: 'Alejandro P.', role: 'Dueño E-commerce' },
      { quote: 'El setup tomó 2 minutos, literalmente. Ahora maneja el 80% de nuestras consultas automáticamente.', author: 'María S.', role: 'Gerente Clínica Dental' },
      { quote: 'La función de generación de documentos es revolucionaria. Cotizaciones enviadas en segundos, no horas.', author: 'Juan M.', role: 'Agente Inmobiliario' }
    ],

    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      { q: '¿Cuánto toma la instalación?', a: '2 minutos. Copia una línea de código, pégala en tu web y estás en vivo. Sin programadores.' },
      { q: '¿Funciona con mi plataforma web?', a: 'Sí. Caty Widget funciona con WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular y cualquier web HTML.' },
      { q: '¿Puede manejar preguntas complejas?', a: 'Sí. Caty está entrenado en tu negocio específico — productos, precios, políticas. Maneja conversaciones complejas con memoria de contexto.' },
      { q: '¿Qué pasa si Caty no puede responder?', a: 'Transfiere a un agente humano con todo el contexto de la conversación. Puedes configurar reglas de escalamiento.' },
      { q: '¿Hay prueba gratuita?', a: 'Sí. 500 conversaciones/mes gratis para siempre. Sin tarjeta de crédito para empezar.' },
      { q: '¿Puedo personalizar la apariencia?', a: 'Completamente. Colores, avatar, posición, mensajes de saludo, condiciones de trigger — todo personalizable.' },
      { q: '¿Se integra con mis herramientas?', a: 'Sí. Google Calendar, Stripe, PayPal, CRMs, herramientas de email marketing y webhooks. Más Zapier para 5,000+ apps.' },
      { q: '¿Mis datos están seguros?', a: 'Cumple GDPR. Servidores AWS Irlanda. Cifrado end-to-end. Tus datos son tuyos.' }
    ],

    ctaTitle: '¿Listo Para Convertir Más Visitantes?',
    ctaSubtitle: 'Instala Caty Widget en 2 minutos. Empieza a convertir 24/7.',
    ctaButton: 'Instalar Widget Gratis',
    ctaDemo: 'O agenda un demo primero →',

    pricingTitle: 'Precios Simples,',
    pricingHighlight: 'Transparentes',
    pricingSubtitle: 'Empieza gratis, actualiza cuando crezcas',
    pricingPlans: [
      {
        name: 'GRATIS',
        price: '€0',
        period: '/mes',
        desc: 'Perfecto para empezar',
        features: ['500 conversaciones/mes', 'Respuestas AI 24/7', 'Personalización básica', 'Soporte email'],
        cta: 'Empezar Gratis',
        popular: false
      },
      {
        name: 'PRO',
        price: '€49',
        period: '/mes',
        desc: 'Para negocios en crecimiento',
        features: ['Conversaciones ilimitadas', 'Personalización completa', 'Generación de documentos', 'Soporte prioritario', 'Dashboard analítico', 'Integraciones CRM'],
        cta: 'Obtener Pro',
        popular: true
      },
      {
        name: 'ENTERPRISE',
        price: 'Personalizado',
        period: '',
        desc: 'Para equipos grandes',
        features: ['Todo en Pro', 'Gestor de cuenta dedicado', 'Integraciones custom', 'Garantía SLA', 'Opción on-premise', 'Capacitación de equipo'],
        cta: 'Contactar Ventas',
        popular: false
      }
    ],

    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo Funciona', pricing: 'Precios', faq: 'FAQ', login: 'Iniciar Sesión', getStarted: 'Empezar Gratis' },
    footer: {
      tagline: 'AI que vende para tu negocio.',
      product: 'Producto',
      company: 'Empresa',
      legal: 'Legal',
      features: 'Funciones',
      pricing: 'Precios',
      whatsapp: 'WhatsApp AI',
      dashboard: 'Dashboard',
      docs: 'Documentación',
      about: 'Acerca de',
      blog: 'Blog',
      contact: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos',
      gdpr: 'GDPR',
      licensing: 'Licencias',
      copyright: 'PayAi-X FZE. Todos los derechos reservados.'
    }
  },
  pt: {
    badge: 'Agente de Vendas Web',
    heroTitle1: 'Caty Widget',
    heroTitle2: 'Agente de Vendas IA para o Seu Site',
    heroSubtitle: 'Um widget de chat inteligente que converte visitantes em clientes 24/7. Responde perguntas, qualifica leads, agenda compromissos e fecha vendas — tudo automaticamente no seu site.',
    heroCta: 'Instalar Widget Grátis',
    heroCtaSecondary: 'Ver Demo Ao Vivo',
    trustBadge1: '500 conversas/mês GRÁTIS',
    trustBadge2: 'Instalação em 2 minutos',
    trustBadge3: 'Sem necessidade de código',

    problemTitle: 'Visitantes Saem.',
    problemHighlight: 'Vendas São Perdidas.',
    problemStats: [
      { value: '98%', label: 'dos visitantes do site saem sem comprar' },
      { value: '42%', label: 'abandonam se não houver resposta instantânea' },
      { value: '5x', label: 'mais conversões com chat ao vivo vs email' }
    ],
    problemSolution: 'Caty Widget engaja cada visitante e os converte em clientes.',

    integrationTitle: 'Instale em 2 Minutos',
    integrationSubtitle: 'Copie uma linha de código. Cole antes de </body>. Pronto.',
    integrationCode: '<script src="https://widget.catyai.io/embed.js" data-caty-id="YOUR_ID"></script>',
    integrationSteps: [
      { title: 'Copie o Código', desc: 'Obtenha seu código único do widget no painel', icon: '📋' },
      { title: 'Cole no Site', desc: 'Adicione antes da tag </body> no seu HTML', icon: '💻' },
      { title: 'Personalize e Publique', desc: 'Escolha cores, avatar e saudação — está no ar!', icon: '🚀' }
    ],
    integrationPlatforms: 'Funciona com: WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular e qualquer site HTML',

    agentTitle: 'Não é um Chatbot.',
    agentHighlight: 'É um Agente de Vendas.',
    agentDesc: 'Chatbots tradicionais seguem scripts. Caty Widget pensa, entende contexto e vende como seu melhor funcionário.',
    agentComparison: [
      { chatbot: 'Segue scripts rígidos', caty: 'Conversas naturais' },
      { chatbot: 'Respostas genéricas', caty: 'Personalizado para seu negócio' },
      { chatbot: 'Frustra clientes', caty: 'Encanta e converte' },
      { chatbot: 'Só responde perguntas', caty: 'Qualifica leads e fecha vendas' },
      { chatbot: 'Precisa de atualizações constantes', caty: 'Aprende e melhora automaticamente' }
    ],

    modulesTitle: 'Módulos do Painel Admin',
    modulesSubtitle: 'Controle completo sobre seu agente de vendas IA',
    modules: [
      {
        icon: '🧠',
        name: 'Base de Conhecimento',
        desc: 'Sistema de treinamento de 12 domínios: produtos, serviços, preços, políticas, FAQs, equipe, localizações, horários, promoções, regras de reserva, métodos de pagamento e dados personalizados.',
        features: ['Importação de catálogo', 'Construtor de FAQ', 'Documentos de política', 'Treinamento por voz']
      },
      {
        icon: '💬',
        name: 'IA Conversacional',
        desc: 'Compreensão de linguagem natural com memória de contexto. Lida com conversas complexas de múltiplas etapas.',
        features: ['Suporte multilíngue', 'Análise de sentimento', 'Detecção de intenção', 'Memória de contexto']
      },
      {
        icon: '📅',
        name: 'Agendamento',
        desc: 'Calendário integrado com sincronização Google Calendar. Verificação de disponibilidade em tempo real e lembretes automáticos.',
        features: ['Sincronização Google Calendar', 'Agendamento de equipe', 'Lembretes de 30 min', 'Reagendamento']
      },
      {
        icon: '📄',
        name: 'Gerador de Documentos',
        desc: 'Gere automaticamente orçamentos, faturas, confirmações de reserva e contratos em PDF.',
        features: ['Orçamentos PDF', 'Faturas', 'Confirmações de reserva', 'Links de pagamento']
      },
      {
        icon: '🎯',
        name: 'Qualificação de Leads',
        desc: 'Pontuação de leads por IA. Identifica prospects quentes com perguntas inteligentes.',
        features: ['Pontuação de leads', 'Perguntas inteligentes', 'Integração CRM', 'Alertas prioritários']
      },
      {
        icon: '🛡️',
        name: 'FraudAI Shield',
        desc: '8 módulos de detecção protegem contra phishing, golpes e mensagens maliciosas.',
        features: ['Detecção de phishing', 'Bloqueio de golpes', 'Varredura de malware', 'Proteção de dados']
      },
      {
        icon: '📊',
        name: 'Painel de Analytics',
        desc: 'Insights em tempo real: conversas, conversões, perguntas populares, horários de pico.',
        features: ['Rastreamento de conversão', 'Análise de pico', 'Tendências de perguntas', 'Pontuações de satisfação']
      },
      {
        icon: '🔔',
        name: 'Notificações Inteligentes',
        desc: 'Receba notificações de conversas importantes via email, SMS ou push.',
        features: ['Alertas por email', 'Notificações SMS', 'Notificações push', 'Regras de escalonamento']
      },
      {
        icon: '🎨',
        name: 'Personalização do Widget',
        desc: 'Combine com sua marca: cores, fontes, avatar, posição, mensagens de saudação.',
        features: ['Cores da marca', 'Avatar personalizado', 'Controle de posição', 'Regras de gatilho']
      },
      {
        icon: '🌍',
        name: 'Multi-Idioma',
        desc: 'Detecta automaticamente o idioma do visitante. Fluente em Português, Inglês, Espanhol, Romeno, Francês e Árabe.',
        features: ['6 idiomas', 'Detecção automática', 'Tradução em tempo real', 'Fluência nativa']
      },
      {
        icon: '🤖',
        name: 'Regras de Automação',
        desc: 'Configure fluxos automatizados: follow-ups, recuperação de carrinho, lembretes.',
        features: ['Sequências de follow-up', 'Recuperação de carrinho', 'Automação de lembretes', 'Reengajamento']
      },
      {
        icon: '🔗',
        name: 'Integrações',
        desc: 'Conecte com suas ferramentas: Google Calendar, CRM, processadores de pagamento, email marketing.',
        features: ['Google Calendar', 'Stripe/PayPal', 'Zapier', 'Webhooks personalizados']
      }
    ],

    uniqueTitle: 'Por Que o Caty Widget É Único',
    uniqueSubtitle: 'O único agente de vendas IA que realmente entende seu negócio',
    unique: [
      { icon: '🎓', title: 'Treinamento Profundo', desc: 'Diferente de chatbots genéricos, Caty é treinado especificamente no SEU negócio.' },
      { icon: '💰', title: 'Vende, Não Só Conversa', desc: 'A maioria das ferramentas só responde perguntas. Caty qualifica leads e fecha vendas.' },
      { icon: '📄', title: 'Documentos no Chat', desc: 'Gere e envie orçamentos e faturas instantaneamente — direto na conversa.' },
      { icon: '🔐', title: 'Proteção Anti-Fraude', desc: 'FraudAI Shield protege seu negócio de phishing e golpes. Incluído gratuitamente.' },
      { icon: '🌐', title: 'WhatsApp + Web Unificado', desc: 'Mesma IA, mesma base de conhecimento no site e WhatsApp. Um painel, visão completa.' },
      { icon: '💸', title: 'Sem Taxas por Mensagem', desc: 'Conversas ilimitadas por um preço fixo. Concorrentes cobram por resolução.' }
    ],

    featuresTitle: 'Lista Completa de Recursos',
    featuresSubtitle: 'Tudo incluído no Caty Widget',
    featuresList: [
      'Respostas IA 24/7 em linguagem natural',
      'Conversas multi-turno com contexto',
      'Captura e qualificação de leads',
      'Pontuação de leads com alertas',
      'Agendamento Google Calendar',
      'Verificação de disponibilidade em tempo real',
      'Confirmações automáticas de reserva',
      'Lembretes inteligentes',
      'Geração de orçamentos PDF',
      'Criação e envio de faturas',
      'Integração de links de pagamento',
      'Suporte multi-idioma (6 idiomas)',
      'Detecção automática de idioma',
      'Análise de sentimento',
      'Detecção de intenção',
      'Base de conhecimento com 12 domínios',
      'Suporte a catálogo de produtos',
      'Gestão de FAQ',
      'Proteção FraudAI Shield',
      'Detecção de links de phishing',
      'Bloqueio de mensagens de golpe',
      'Painel de analytics em tempo real',
      'Rastreamento de conversão',
      'Análise de horários de pico',
      'Relatórios de tendências',
      'Pontuações de satisfação',
      'Notificações Email/SMS/Push',
      'Regras de escalonamento',
      'Capacidade de handoff humano',
      'Personalização do widget',
      'Avatares e branding personalizados',
      'Condições de gatilho',
      'Design responsivo mobile',
      'Conformidade GDPR',
      'Servidores AWS (Irlanda)',
      'Criptografia ponta a ponta',
      'Integrações CRM',
      'Conexão Zapier',
      'Webhooks personalizados',
      'Acesso API'
    ],

    comparisonTitle: 'Caty Widget vs. Alternativas',
    comparisonSubtitle: 'Veja por que empresas escolhem Caty',
    comparisonItems: [
      { feature: 'Preço mensal', caty: '€49', tidio: '€149 + extras', intercom: '$39/usuário + taxas', drift: '$2,500+' },
      { feature: 'IA incluída', caty: 'Sim', tidio: '+€32/mês', intercom: '+$0.99/resolução', drift: 'Tier extra' },
      { feature: 'Geração de documentos', caty: 'Sim', tidio: 'Não', intercom: 'Não', drift: 'Não' },
      { feature: 'Proteção anti-fraude', caty: 'Sim', tidio: 'Não', intercom: 'Não', drift: 'Não' },
      { feature: 'Integração WhatsApp', caty: 'Nativa', tidio: 'Limitada', intercom: 'Add-on pago', drift: 'Não' },
      { feature: 'Sistema de reservas', caty: 'Integrado', tidio: 'Externo', intercom: 'Externo', drift: 'Externo' },
      { feature: 'Idiomas', caty: '6', tidio: '3', intercom: '5', drift: '3' },
      { feature: 'Tempo de setup', caty: '2 minutos', tidio: '30+ minutos', intercom: '1+ horas', drift: '2+ semanas' }
    ],

    useCasesTitle: 'Perfeito Para',
    useCasesSubtitle: 'Negócios que querem converter mais visitantes',
    useCases: [
      { icon: '🛒', title: 'E-commerce', desc: 'Responda perguntas sobre produtos, recomende itens, recupere carrinhos abandonados.' },
      { icon: '🏥', title: 'Saúde', desc: 'Agende consultas, responda sobre serviços, colete informações de pacientes.' },
      { icon: '🏠', title: 'Imobiliário', desc: 'Qualifique compradores, agende visitas, responda sobre imóveis, capture leads.' },
      { icon: '⚖️', title: 'Serviços Jurídicos', desc: 'Consultas iniciais, qualificação de casos, agendamento, pedidos de documentos.' },
      { icon: '🎓', title: 'Educação', desc: 'Consultas sobre cursos, assistência em matrículas, agendamento de tours, FAQs.' },
      { icon: '🔧', title: 'Prestadores de Serviço', desc: 'Pedidos de orçamento, agendamento, explicações de serviços, captura de leads.' }
    ],

    testimonialsTitle: 'O Que Nossos Clientes Dizem',
    testimonials: [
      { quote: 'Caty Widget aumentou nossas conversões em 340%. Responde perguntas melhor que nossa equipe anterior.', author: 'Alexandre P.', role: 'Dono de E-commerce' },
      { quote: 'A instalação levou 2 minutos, literalmente. Agora lida com 80% das nossas consultas automaticamente.', author: 'Maria S.', role: 'Gerente de Clínica Dental' },
      { quote: 'O recurso de geração de documentos é revolucionário. Orçamentos enviados em segundos, não horas.', author: 'João M.', role: 'Agente Imobiliário' }
    ],

    faqTitle: 'Perguntas Frequentes',
    faqs: [
      { q: 'Quanto tempo leva a instalação?', a: '2 minutos. Copie uma linha de código, cole no seu site e está no ar. Sem necessidade de desenvolvedores.' },
      { q: 'Funciona com minha plataforma?', a: 'Sim. Caty Widget funciona com WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular e qualquer site HTML.' },
      { q: 'Pode lidar com perguntas complexas?', a: 'Sim. Caty é treinado no seu negócio específico — produtos, preços, políticas. Lida com conversas complexas com memória de contexto.' },
      { q: 'E se Caty não conseguir responder?', a: 'Transfere perfeitamente para um agente humano com todo o contexto da conversa.' },
      { q: 'Há teste gratuito?', a: 'Sim. 500 conversas/mês grátis para sempre. Sem cartão de crédito para começar.' },
      { q: 'Posso personalizar a aparência?', a: 'Completamente. Cores, avatar, posição, mensagens de saudação — tudo personalizável no painel.' },
      { q: 'Integra com minhas ferramentas?', a: 'Sim. Google Calendar, Stripe, PayPal, CRMs, ferramentas de email marketing e webhooks. Mais Zapier para 5.000+ apps.' },
      { q: 'Meus dados estão seguros?', a: 'Conformidade GDPR. Servidores AWS Irlanda. Criptografia ponta a ponta. Você é dono dos seus dados.' }
    ],

    ctaTitle: 'Pronto Para Converter Mais Visitantes?',
    ctaSubtitle: 'Instale Caty Widget em 2 minutos. Comece a converter 24/7.',
    ctaButton: 'Instalar Widget Grátis',
    ctaDemo: 'Ou agende uma demo primeiro →',

    pricingTitle: 'Preços Simples,',
    pricingHighlight: 'Transparentes',
    pricingSubtitle: 'Comece grátis, faça upgrade quando crescer',
    pricingPlans: [
      {
        name: 'GRÁTIS',
        price: '€0',
        period: '/mês',
        desc: 'Perfeito para começar',
        features: ['500 conversas/mês', 'Respostas IA 24/7', 'Personalização básica', 'Suporte por email'],
        cta: 'Começar Grátis',
        popular: false
      },
      {
        name: 'PRO',
        price: '€49',
        period: '/mês',
        desc: 'Para negócios em crescimento',
        features: ['Conversas ilimitadas', 'Personalização completa', 'Geração de documentos', 'Suporte prioritário', 'Dashboard analítico', 'Integrações CRM'],
        cta: 'Obter Pro',
        popular: true
      },
      {
        name: 'ENTERPRISE',
        price: 'Personalizado',
        period: '',
        desc: 'Para grandes equipes',
        features: ['Tudo no Pro', 'Gerente de conta dedicado', 'Integrações custom', 'Garantia SLA', 'Opção on-premise', 'Treinamento de equipe'],
        cta: 'Contatar Vendas',
        popular: false
      }
    ],

    nav: { home: 'Início', features: 'Recursos', howItWorks: 'Como Funciona', pricing: 'Preços', faq: 'FAQ', login: 'Login', getStarted: 'Começar Grátis' },
    footer: {
      tagline: 'IA que vende para o seu negócio.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      features: 'Recursos',
      pricing: 'Preços',
      whatsapp: 'WhatsApp AI',
      dashboard: 'Dashboard',
      docs: 'Documentação',
      about: 'Sobre',
      blog: 'Blog',
      contact: 'Contato',
      privacy: 'Privacidade',
      terms: 'Termos',
      gdpr: 'GDPR',
      licensing: 'Licenciamento',
      copyright: 'PayAi-X FZE. Todos os direitos reservados.'
    }
  },
  fr: {
    badge: 'Agent Commercial Web',
    heroTitle1: 'Caty Widget',
    heroTitle2: 'Agent Commercial IA pour Votre Site Web',
    heroSubtitle: 'Un widget de chat intelligent qui convertit les visiteurs en clients 24h/24. Répond aux questions, qualifie les leads, prend des rendez-vous et conclut des ventes — tout automatiquement sur votre site.',
    heroCta: 'Installer le Widget Gratuit',
    heroCtaSecondary: 'Voir la Démo',
    trustBadge1: '500 conversations/mois GRATUITES',
    trustBadge2: 'Installation en 2 minutes',
    trustBadge3: 'Aucun code requis',

    problemTitle: 'Les Visiteurs Partent.',
    problemHighlight: 'Les Ventes Sont Perdues.',
    problemStats: [
      { value: '98%', label: 'des visiteurs partent sans acheter' },
      { value: '42%', label: 'abandonnent sans réponse instantanée' },
      { value: '5x', label: 'plus de conversions avec chat vs email' }
    ],
    problemSolution: 'Caty Widget engage chaque visiteur et les convertit en clients.',

    integrationTitle: 'Installez en 2 Minutes',
    integrationSubtitle: 'Copiez une ligne de code. Collez avant </body>. Terminé.',
    integrationCode: '<script src="https://widget.catyai.io/embed.js" data-caty-id="YOUR_ID"></script>',
    integrationSteps: [
      { title: 'Copiez le Code', desc: 'Obtenez votre code widget unique depuis le tableau de bord', icon: '📋' },
      { title: 'Collez sur le Site', desc: 'Ajoutez-le avant la balise </body> dans votre HTML', icon: '💻' },
      { title: 'Personnalisez et Publiez', desc: 'Choisissez couleurs, avatar et message — c\'est en ligne!', icon: '🚀' }
    ],
    integrationPlatforms: 'Fonctionne avec: WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular et tout site HTML',

    agentTitle: 'Pas un Chatbot.',
    agentHighlight: 'Un Agent Commercial.',
    agentDesc: 'Les chatbots traditionnels suivent des scripts. Caty Widget pense, comprend le contexte et vend comme votre meilleur employé.',
    agentComparison: [
      { chatbot: 'Suit des scripts rigides', caty: 'Conversations naturelles' },
      { chatbot: 'Réponses génériques', caty: 'Personnalisé pour votre entreprise' },
      { chatbot: 'Frustre les clients', caty: 'Ravit et convertit' },
      { chatbot: 'Répond juste aux questions', caty: 'Qualifie leads et conclut ventes' },
      { chatbot: 'Nécessite des mises à jour constantes', caty: 'Apprend et s\'améliore automatiquement' }
    ],

    modulesTitle: 'Modules du Tableau de Bord Admin',
    modulesSubtitle: 'Contrôle complet sur votre agent commercial IA',
    modules: [
      {
        icon: '🧠',
        name: 'Base de Connaissances',
        desc: 'Système d\'entraînement à 12 domaines: produits, services, prix, politiques, FAQs, équipe, emplacements, horaires, promotions, règles de réservation.',
        features: ['Import catalogue', 'Constructeur FAQ', 'Documents politiques', 'Formation vocale']
      },
      {
        icon: '💬',
        name: 'IA Conversationnelle',
        desc: 'Compréhension du langage naturel avec mémoire contextuelle. Gère les conversations complexes à plusieurs tours.',
        features: ['Support multilingue', 'Analyse de sentiment', 'Détection d\'intention', 'Mémoire contextuelle']
      },
      {
        icon: '📅',
        name: 'Prise de Rendez-vous',
        desc: 'Calendrier intégré avec synchronisation Google Calendar. Vérification de disponibilité en temps réel.',
        features: ['Sync Google Calendar', 'Planning équipe', 'Rappels 30 min', 'Gestion reprogrammation']
      },
      {
        icon: '📄',
        name: 'Générateur de Documents',
        desc: 'Générez automatiquement devis, factures, confirmations de réservation et contrats en PDF.',
        features: ['Devis PDF', 'Factures', 'Confirmations', 'Liens de paiement']
      },
      {
        icon: '🎯',
        name: 'Qualification de Leads',
        desc: 'Scoring de leads par IA. Identifie les prospects chauds avec des questions intelligentes.',
        features: ['Scoring leads', 'Questions intelligentes', 'Intégration CRM', 'Alertes prioritaires']
      },
      {
        icon: '🛡️',
        name: 'FraudAI Shield',
        desc: '8 modules de détection protègent contre le phishing, les arnaques et messages malveillants.',
        features: ['Détection phishing', 'Blocage arnaques', 'Scan malware', 'Protection données']
      },
      {
        icon: '📊',
        name: 'Tableau de Bord Analytics',
        desc: 'Insights en temps réel: conversations, conversions, questions populaires, heures de pointe.',
        features: ['Suivi conversion', 'Analyse pics', 'Tendances questions', 'Scores satisfaction']
      },
      {
        icon: '🔔',
        name: 'Notifications Intelligentes',
        desc: 'Recevez des notifications par email, SMS ou push pour les conversations importantes.',
        features: ['Alertes email', 'Notifications SMS', 'Notifications push', 'Règles d\'escalade']
      },
      {
        icon: '🎨',
        name: 'Personnalisation Widget',
        desc: 'Adaptez à votre marque: couleurs, polices, avatar, position, messages d\'accueil.',
        features: ['Couleurs marque', 'Avatar personnalisé', 'Contrôle position', 'Règles déclenchement']
      },
      {
        icon: '🌍',
        name: 'Multi-Langue',
        desc: 'Détecte automatiquement la langue du visiteur. Fluent en Français, Anglais, Espagnol, Portugais, Roumain et Arabe.',
        features: ['6 langues', 'Détection auto', 'Traduction temps réel', 'Fluence native']
      },
      {
        icon: '🤖',
        name: 'Règles d\'Automatisation',
        desc: 'Configurez des flux automatisés: suivis, récupération panier, rappels de rendez-vous.',
        features: ['Séquences suivi', 'Récupération panier', 'Automatisation rappels', 'Réengagement']
      },
      {
        icon: '🔗',
        name: 'Intégrations',
        desc: 'Connectez vos outils: Google Calendar, CRM, processeurs de paiement, email marketing.',
        features: ['Google Calendar', 'Stripe/PayPal', 'Zapier', 'Webhooks personnalisés']
      }
    ],

    uniqueTitle: 'Pourquoi Caty Widget Est Unique',
    uniqueSubtitle: 'Le seul agent commercial IA qui comprend vraiment votre entreprise',
    unique: [
      { icon: '🎓', title: 'Formation Approfondie', desc: 'Contrairement aux chatbots génériques, Caty est formé spécifiquement sur VOTRE entreprise.' },
      { icon: '💰', title: 'Vend, Ne Discute Pas Seulement', desc: 'La plupart des outils répondent juste aux questions. Caty qualifie et conclut des ventes.' },
      { icon: '📄', title: 'Documents dans le Chat', desc: 'Générez et envoyez devis et factures instantanément — directement dans la conversation.' },
      { icon: '🔐', title: 'Protection Anti-Fraude', desc: 'FraudAI Shield protège votre entreprise du phishing et des arnaques. Inclus gratuitement.' },
      { icon: '🌐', title: 'WhatsApp + Web Unifiés', desc: 'Même IA, même base de connaissances sur site et WhatsApp. Un tableau de bord, vue complète.' },
      { icon: '💸', title: 'Pas de Frais par Message', desc: 'Conversations illimitées pour un prix fixe. Les concurrents facturent par résolution.' }
    ],

    featuresTitle: 'Liste Complète des Fonctionnalités',
    featuresSubtitle: 'Tout inclus dans Caty Widget',
    featuresList: [
      'Réponses IA 24/7 en langage naturel',
      'Conversations multi-tours avec contexte',
      'Capture et qualification de leads',
      'Scoring leads avec alertes',
      'Réservation Google Calendar',
      'Vérification disponibilité temps réel',
      'Confirmations automatiques',
      'Rappels intelligents',
      'Génération devis PDF',
      'Création et envoi factures',
      'Intégration liens paiement',
      'Support multi-langue (6 langues)',
      'Détection automatique langue',
      'Analyse de sentiment',
      'Détection d\'intention',
      'Base connaissances 12 domaines',
      'Support catalogue produits',
      'Gestion FAQ',
      'Protection FraudAI Shield',
      'Détection liens phishing',
      'Blocage messages arnaque',
      'Tableau analytics temps réel',
      'Suivi conversion',
      'Analyse heures de pointe',
      'Rapports tendances',
      'Scores satisfaction',
      'Notifications Email/SMS/Push',
      'Règles d\'escalade',
      'Transfert humain',
      'Personnalisation widget',
      'Avatars et branding personnalisés',
      'Conditions déclenchement',
      'Design responsive mobile',
      'Conformité GDPR',
      'Serveurs AWS (Irlande)',
      'Chiffrement bout en bout',
      'Intégrations CRM',
      'Connexion Zapier',
      'Webhooks personnalisés',
      'Accès API'
    ],

    comparisonTitle: 'Caty Widget vs. Alternatives',
    comparisonSubtitle: 'Voyez pourquoi les entreprises choisissent Caty',
    comparisonItems: [
      { feature: 'Prix mensuel', caty: '€49', tidio: '€149 + extras', intercom: '$39/siège + frais', drift: '$2,500+' },
      { feature: 'IA incluse', caty: 'Oui', tidio: '+€32/mois', intercom: '+$0.99/résolution', drift: 'Tier extra' },
      { feature: 'Génération documents', caty: 'Oui', tidio: 'Non', intercom: 'Non', drift: 'Non' },
      { feature: 'Protection anti-fraude', caty: 'Oui', tidio: 'Non', intercom: 'Non', drift: 'Non' },
      { feature: 'Intégration WhatsApp', caty: 'Native', tidio: 'Limitée', intercom: 'Add-on payant', drift: 'Non' },
      { feature: 'Système réservation', caty: 'Intégré', tidio: 'Externe', intercom: 'Externe', drift: 'Externe' },
      { feature: 'Langues', caty: '6', tidio: '3', intercom: '5', drift: '3' },
      { feature: 'Temps installation', caty: '2 minutes', tidio: '30+ minutes', intercom: '1+ heures', drift: '2+ semaines' }
    ],

    useCasesTitle: 'Parfait Pour',
    useCasesSubtitle: 'Les entreprises qui veulent convertir plus de visiteurs',
    useCases: [
      { icon: '🛒', title: 'E-commerce', desc: 'Répondez aux questions produits, recommandez articles, récupérez paniers abandonnés.' },
      { icon: '🏥', title: 'Santé', desc: 'Prenez rendez-vous, répondez sur les services, collectez infos patients.' },
      { icon: '🏠', title: 'Immobilier', desc: 'Qualifiez acheteurs, planifiez visites, répondez sur propriétés, capturez leads.' },
      { icon: '⚖️', title: 'Services Juridiques', desc: 'Consultations initiales, qualification dossiers, prise de rendez-vous, demandes documents.' },
      { icon: '🎓', title: 'Éducation', desc: 'Renseignements cours, assistance inscription, planification visites, FAQs.' },
      { icon: '🔧', title: 'Prestataires', desc: 'Demandes de devis, prise de rendez-vous, explications services, capture leads.' }
    ],

    testimonialsTitle: 'Ce Que Disent Nos Clients',
    testimonials: [
      { quote: 'Caty Widget a augmenté nos conversions de 340%. Il répond mieux que notre ancienne équipe chat.', author: 'Alexandre P.', role: 'Propriétaire E-commerce' },
      { quote: 'L\'installation a pris 2 minutes, littéralement. Maintenant il gère 80% de nos demandes automatiquement.', author: 'Marie S.', role: 'Directrice Clinique Dentaire' },
      { quote: 'La génération de documents est révolutionnaire. Devis envoyés en secondes, pas en heures.', author: 'Jean M.', role: 'Agent Immobilier' }
    ],

    faqTitle: 'Questions Fréquentes',
    faqs: [
      { q: 'Combien de temps prend l\'installation?', a: '2 minutes. Copiez une ligne de code, collez sur votre site et c\'est en ligne. Pas besoin de développeurs.' },
      { q: 'Fonctionne avec ma plateforme?', a: 'Oui. Caty Widget fonctionne avec WordPress, Shopify, Wix, Squarespace, Webflow, React, Vue, Angular et tout site HTML.' },
      { q: 'Peut gérer questions complexes?', a: 'Oui. Caty est formé sur votre entreprise spécifique. Il gère conversations complexes avec mémoire contextuelle.' },
      { q: 'Si Caty ne peut pas répondre?', a: 'Transfert fluide vers un agent humain avec tout le contexte de conversation.' },
      { q: 'Y a-t-il un essai gratuit?', a: 'Oui. 500 conversations/mois gratuites pour toujours. Pas de carte bancaire pour commencer.' },
      { q: 'Puis-je personnaliser l\'apparence?', a: 'Complètement. Couleurs, avatar, position, messages d\'accueil — tout personnalisable depuis le tableau de bord.' },
      { q: 'S\'intègre avec mes outils?', a: 'Oui. Google Calendar, Stripe, PayPal, CRMs, outils email marketing et webhooks. Plus Zapier pour 5,000+ apps.' },
      { q: 'Mes données sont sécurisées?', a: 'Conformité GDPR. Serveurs AWS Irlande. Chiffrement bout en bout. Vous êtes propriétaire de vos données.' }
    ],

    ctaTitle: 'Prêt à Convertir Plus de Visiteurs?',
    ctaSubtitle: 'Installez Caty Widget en 2 minutes. Commencez à convertir 24/7.',
    ctaButton: 'Installer Widget Gratuit',
    ctaDemo: 'Ou réservez une démo d\'abord →',

    pricingTitle: 'Tarifs Simples,',
    pricingHighlight: 'Transparents',
    pricingSubtitle: 'Commencez gratuitement, passez au niveau supérieur quand vous grandissez',
    pricingPlans: [
      {
        name: 'GRATUIT',
        price: '€0',
        period: '/mois',
        desc: 'Parfait pour commencer',
        features: ['500 conversations/mois', 'Réponses IA 24/7', 'Personnalisation de base', 'Support email'],
        cta: 'Commencer Gratuit',
        popular: false
      },
      {
        name: 'PRO',
        price: '€49',
        period: '/mois',
        desc: 'Pour les entreprises en croissance',
        features: ['Conversations illimitées', 'Personnalisation complète', 'Génération de documents', 'Support prioritaire', 'Tableau de bord analytique', 'Intégrations CRM'],
        cta: 'Obtenir Pro',
        popular: true
      },
      {
        name: 'ENTERPRISE',
        price: 'Sur mesure',
        period: '',
        desc: 'Pour les grandes équipes',
        features: ['Tout dans Pro', 'Gestionnaire de compte dédié', 'Intégrations personnalisées', 'Garantie SLA', 'Option on-premise', 'Formation équipe'],
        cta: 'Contacter Ventes',
        popular: false
      }
    ],

    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment ça Marche', pricing: 'Tarifs', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer Gratuit' },
    footer: {
      tagline: 'IA qui vend pour votre entreprise.',
      product: 'Produit',
      company: 'Entreprise',
      legal: 'Légal',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      whatsapp: 'WhatsApp AI',
      dashboard: 'Dashboard',
      docs: 'Documentation',
      about: 'À Propos',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      gdpr: 'RGPD',
      licensing: 'Licences',
      copyright: 'PayAi-X FZE. Tous droits réservés.'
    }
  }
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');

.cw-page {
  background: #010A1F;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.cw-page h1, .cw-page h2, .cw-page h3, .cw-page h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
}

.cw-page p, .cw-page span, .cw-page li, .cw-page a, .cw-page button, .cw-page label {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.cw-nav {
  background: rgba(1,10,31,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(200,161,101,0.15);
}

.cw-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 20px; border-radius: 100px;
  background: rgba(200,161,101,0.08);
  border: 1px solid rgba(200,161,101,0.25);
  margin-bottom: 1.5rem;
}
.cw-badge-text {
  color: #C8A165; font-size: 0.78rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
}

.cw-hero-title1 {
  display: block;
  background: linear-gradient(135deg, #e8e8e8 0%, #ffffff 40%, #d0d0d0 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic; font-weight: 700;
  font-size: clamp(3.5rem, 7vw, 6rem);
  line-height: 1.05; letter-spacing: -0.02em;
}
.cw-hero-title2 {
  display: block;
  background: linear-gradient(135deg, #C8A165 0%, #D4B57A 50%, #A68246 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic; font-weight: 700;
  font-size: clamp(1.75rem, 4vw, 3.5rem);
  line-height: 1.2;
}

.cw-section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic; font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  background: linear-gradient(135deg, #ffffff 0%, #C8A165 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  display: inline-block; line-height: 1.2;
}
.cw-section-sub { color: #64748b; font-size: 1.05rem; max-width: 600px; margin: 1rem auto 0; }

.cw-stat-card {
  background: linear-gradient(135deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.8) 100%);
  border: 1px solid rgba(200,161,101,0.15); border-radius: 20px; padding: 2.5rem 2rem; text-align: center; position: relative; overflow: hidden;
}
.cw-stat-card::before {
  content: ''; position: absolute; top: 0; left: 20%; right: 20%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,161,101,0.5), transparent);
}
.cw-stat-value {
  font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700;
  background: linear-gradient(135deg, #C8A165, #D4B57A);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  font-family: 'Playfair Display', serif; font-style: italic; line-height: 1;
}
.cw-stat-label { color: #94a3b8; margin-top: 0.75rem; font-size: 0.95rem; }

.cw-code-block {
  background: #020d20; border: 1px solid rgba(200,161,101,0.2); border-radius: 16px; padding: 1.5rem 2rem;
  font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #C8A165; overflow-x: auto;
}

.cw-step { text-align: center; }
.cw-step-icon {
  width: 72px; height: 72px; border-radius: 18px;
  background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.75rem; margin: 0 auto 1.25rem;
}
.cw-step-title { color: #C8A165; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.4rem; }
.cw-step-desc { color: #94a3b8; font-size: 0.9rem; }

.cw-compare-wrap {
  background: rgba(10,22,40,0.3); border: 1px solid rgba(200,161,101,0.12); border-radius: 20px; overflow: hidden;
}
.cw-compare-header-row {
  background: rgba(10,22,40,0.5); border-bottom: 1px solid rgba(200,161,101,0.12);
  display: grid; grid-template-columns: 1fr 1fr 1fr;
}
.cw-compare-data-row {
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid rgba(200,161,101,0.06);
}
.cw-compare-data-row:last-child { border-bottom: none; }
.cw-compare-cell { padding: 14px 16px; font-size: 0.9rem; }

.cw-module-card {
  background: linear-gradient(135deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.9) 100%);
  border: 1px solid rgba(200,161,101,0.12); border-radius: 20px; padding: 1.75rem;
  position: relative; overflow: hidden; transition: border-color 0.25s, transform 0.25s;
}
.cw-module-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(200,161,101,0.4), transparent);
}
.cw-module-card:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-2px); }
.cw-module-name {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: 1.2rem; font-weight: 700; color: #C8A165; margin-bottom: 0.5rem;
}
.cw-module-desc { color: #94a3b8; font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.65; }
.cw-module-tag {
  display: inline-block; padding: 3px 10px;
  background: rgba(200,161,101,0.06); border: 1px solid rgba(200,161,101,0.15);
  border-radius: 100px; font-size: 0.7rem; color: #C8A165; font-family: 'JetBrains Mono', monospace;
}

/* ===== STACKING CARDS — modules section ===== */
:root { --gold-dark-rgb: 166,130,70; }
.cwstack-card {
  position: sticky; top: 10vh; margin-bottom: 20vh;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem 1.5rem; isolation: isolate; will-change: transform;
}
.cwstack-card::before {
  content: ''; position: absolute; inset: 1rem; border-radius: 28px;
  background: radial-gradient(ellipse at 50% 50%, rgba(var(--gold-dark-rgb),0.15) 0%, rgba(var(--gold-dark-rgb),0.05) 40%, transparent 75%);
  filter: blur(40px); opacity: 0.6; z-index: -1; pointer-events: none;
}
.cwstack-inner {
  width: 100%; max-width: 1100px; border-radius: 28px;
  background: linear-gradient(180deg, rgba(10,27,61,0.97) 0%, rgba(1,10,31,0.99) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02) inset;
  padding: 4rem 3.5rem; backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
  transform-origin: 50% 0%; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  position: relative; overflow: hidden;
}
.cwstack-inner::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,161,101,0.4), transparent);
}
.cwstack-card[data-index="0"] .cwstack-inner { transform: scale(1); }
.cwstack-card[data-index="1"] .cwstack-inner { transform: scale(0.97); }
.cwstack-card[data-index="2"] .cwstack-inner { transform: scale(0.94); }
.cwstack-card[data-index="3"] .cwstack-inner { transform: scale(0.91); }
.cwstack-inner h3 {
  font-size: clamp(2.5rem,5vw,4.5rem); font-weight: 700;
  letter-spacing: -0.04em; line-height: 0.95; max-width: 50%; color: #f8fafc;
}
.cwstack-tagline {
  font-size: clamp(1.1rem,1.6vw,1.5rem); color: #C8A165;
  font-weight: 500; margin-top: 1rem; margin-bottom: 1.5rem; letter-spacing: -0.01em;
}
.cwstack-body { font-size: 1.05rem; color: #94a3b8; line-height: 1.65; max-width: 90%; }
.cwstack-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-top: 1.5rem; padding: 0.75rem 1rem; border-radius: 10px;
  background: rgba(200,161,101,0.06); border: 1px solid rgba(200,161,101,0.18);
  font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #D4B57A; line-height: 1.5;
}
.cwstack-tag {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.9rem; border-radius: 999px;
  background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2);
  color: #D4B57A; font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem;
}
@media (max-width: 768px) {
  .cwstack-inner { padding: 2rem; border-radius: 20px; }
  .cwstack-card { padding: 1rem; margin-bottom: 10vh; }
  .cwstack-inner h3 { max-width: 100%; font-size: 2.25rem; }
  .cwstack-body { max-width: 100%; }
}

.cw-unique-card {
  background: linear-gradient(135deg, rgba(10,27,61,0.4) 0%, rgba(1,10,31,0.7) 100%);
  border: 1px solid rgba(200,161,101,0.1); border-radius: 20px; padding: 2rem;
  transition: border-color 0.25s;
}
.cw-unique-card:hover { border-color: rgba(200,161,101,0.25); }
.cw-unique-title { color: #C8A165; font-size: 1.05rem; font-weight: 700; margin: 0.75rem 0 0.5rem; }
.cw-unique-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.65; }

.cw-usecase-card {
  background: linear-gradient(135deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.9) 100%);
  border: 1px solid rgba(200,161,101,0.12); border-radius: 20px; padding: 2rem;
  transition: border-color 0.25s, transform 0.2s;
}
.cw-usecase-card:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-3px); }
.cw-usecase-title { color: #C8A165; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
.cw-usecase-desc { color: #94a3b8; font-size: 0.875rem; line-height: 1.65; }

.cw-testimonial {
  background: linear-gradient(135deg, rgba(10,27,61,0.5) 0%, rgba(1,10,31,0.8) 100%);
  border: 1px solid rgba(200,161,101,0.12); border-radius: 20px; padding: 2rem; position: relative;
}
.cw-testimonial::before {
  content: '"'; position: absolute; top: -0.75rem; left: 1.5rem;
  font-size: 5rem; color: rgba(200,161,101,0.12);
  font-family: 'Playfair Display', serif; font-style: italic; line-height: 1;
}
.cw-testimonial-quote { color: #cbd5e1; font-style: italic; margin-bottom: 1.25rem; line-height: 1.7; }
.cw-testimonial-author { color: #C8A165; font-weight: 600; }
.cw-testimonial-role { color: #64748b; font-size: 0.85rem; }

.cw-pricing-card {
  background: linear-gradient(135deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.9) 100%);
  border: 1px solid rgba(200,161,101,0.12); border-radius: 24px; padding: 2.5rem;
}
.cw-pricing-card-popular {
  background: linear-gradient(135deg, rgba(20,37,71,0.9) 0%, rgba(10,20,51,1) 100%);
  border: 2px solid rgba(200,161,101,0.45); border-radius: 24px; padding: 2.5rem;
  position: relative; transform: scale(1.04);
  box-shadow: 0 20px 60px rgba(200,161,101,0.12);
}
.cw-pricing-popular-badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  padding: 4px 20px; border-radius: 100px;
  background: linear-gradient(90deg, #C8A165, #D4B57A);
  color: #010A1F; font-size: 0.75rem; font-weight: 700; white-space: nowrap;
  font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em;
}
.cw-pricing-name { color: #C8A165; font-size: 0.7rem; letter-spacing: 0.15em; font-weight: 700; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; }
.cw-pricing-price { font-size: 3rem; font-weight: 700; color: #ffffff; line-height: 1; }
.cw-pricing-period { color: #64748b; font-size: 0.9rem; }
.cw-pricing-desc { color: #64748b; font-size: 0.85rem; margin-top: 0.4rem; }
.cw-pricing-feature { display: flex; align-items: center; gap: 10px; color: #cbd5e1; font-size: 0.875rem; }
.cw-pricing-check { color: #C8A165; flex-shrink: 0; }
.cw-btn-gold {
  display: block; text-align: center; padding: 14px 24px; border-radius: 12px;
  font-weight: 700; background: linear-gradient(90deg, #C8A165, #D4B57A);
  color: #010A1F; transition: opacity 0.2s; text-decoration: none;
}
.cw-btn-gold:hover { opacity: 0.88; }
.cw-btn-outline {
  display: block; text-align: center; padding: 14px 24px; border-radius: 12px;
  font-weight: 600; background: rgba(200,161,101,0.06); color: #C8A165;
  border: 1px solid rgba(200,161,101,0.2); transition: background 0.2s; text-decoration: none;
}
.cw-btn-outline:hover { background: rgba(200,161,101,0.12); }

.cw-faq-item {
  background: rgba(10,22,40,0.4); border: 1px solid rgba(200,161,101,0.12); border-radius: 16px; overflow: hidden;
}
.cw-faq-item summary {
  padding: 1.25rem 1.5rem; cursor: pointer; color: #e2e8f0; font-weight: 500;
  display: flex; justify-content: space-between; align-items: center; list-style: none;
}
.cw-faq-item summary::-webkit-details-marker { display: none; }
.cw-faq-item[open] > summary { color: #C8A165; }
.cw-faq-arrow { color: #64748b; transition: transform 0.25s; display: inline-block; }
.cw-faq-item[open] .cw-faq-arrow { transform: rotate(180deg); color: #C8A165; }
.cw-faq-body { padding: 0 1.5rem 1.25rem; color: #94a3b8; line-height: 1.7; }

.cw-cta-section {
  background: linear-gradient(135deg, rgba(200,161,101,0.05) 0%, rgba(200,161,101,0.02) 100%);
  border-top: 1px solid rgba(200,161,101,0.12); border-bottom: 1px solid rgba(200,161,101,0.12);
}

.cw-feature-item-gold { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; background: rgba(200,161,101,0.07); border: 1px solid rgba(200,161,101,0.18); }
.cw-feature-item-dark { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; background: rgba(10,22,40,0.3); border: 1px solid rgba(30,50,80,0.3); }
.cw-feature-check-gold { color: #C8A165; flex-shrink: 0; }
.cw-feature-check-white { color: #e2e8f0; flex-shrink: 0; }
.cw-feature-text-gold { color: #C8A165; font-size: 0.875rem; }
.cw-feature-text-white { color: #e2e8f0; font-size: 0.875rem; }

.cw-full-compare { background: rgba(10,22,40,0.3); border: 1px solid rgba(200,161,101,0.12); border-radius: 20px; overflow: hidden; overflow-x: auto; }
.cw-full-compare table { width: 100%; border-collapse: collapse; }
.cw-full-compare thead tr { background: rgba(10,22,40,0.5); border-bottom: 1px solid rgba(200,161,101,0.15); }
.cw-full-compare th { padding: 14px 16px; font-size: 0.875rem; font-weight: 600; }
.cw-full-compare td { padding: 12px 16px; font-size: 0.875rem; border-bottom: 1px solid rgba(200,161,101,0.06); }
.cw-full-compare tbody tr:last-child td { border-bottom: none; }
.cw-th-feat { color: #64748b; text-align: left; }
.cw-th-caty { color: #C8A165; text-align: center; }
.cw-th-other { color: #475569; text-align: center; }
.cw-td-feat { color: #94a3b8; }
.cw-td-caty { color: #C8A165; text-align: center; font-weight: 600; }
.cw-td-other { color: #475569; text-align: center; }

@media (max-width: 768px) {
  .cw-pricing-card-popular { transform: none; }
}
`

function LanguageSelector({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false)
  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'ro', flag: '🇷🇴', name: 'RO' },
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'pt', flag: '🇵🇹', name: 'PT' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' }
  ]
  const current = languages.find(l => l.code === lang) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#0A1628]/50 hover:bg-[#1a2744]/50 transition-colors text-sm"
      >
        <span>{current.flag}</span>
        <span className="text-gray-300">{current.name}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-24 bg-[#0A1628] rounded-lg shadow-xl border border-[#1a2744] z-50">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); localStorage.setItem('caty-lang', l.code); setIsOpen(false) }}
              className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-[#1a2744] ${lang === l.code ? 'text-gold' : 'text-gray-300'}`}
            >
              <span>{l.flag}</span> {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CatyWidget() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const updateLang = () => {
      const stored = localStorage.getItem('caty-lang')
      if (stored && translations[stored]) {
        setLang(stored)
      } else {
        const browserLang = navigator.language?.slice(0, 2)
        if (translations[browserLang]) setLang(browserLang)
      }
    }
    updateLang()
    window.addEventListener('storage', updateLang)
    const interval = setInterval(updateLang, 500)
    return () => {
      window.removeEventListener('storage', updateLang)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.cwstack-card')
      const total = cards.length
      cards.forEach((card, idx) => {
        const inner = card.querySelector('.cwstack-inner')
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

  const t = translations[lang] || translations.en

  return (
    <>
      <SEO
        title="Caty Widget - AI Sales Agent for Your Website | CatyAI"
        description="Install Caty Widget in 2 minutes. AI that converts website visitors into customers 24/7. Answers questions, qualifies leads, books appointments, generates documents."
        keywords="website chat widget, AI chat widget, sales chatbot, lead generation chatbot, website conversion, live chat alternative"
        canonical="https://catyai.io/widget"
        ogImage="https://catyai.io/images/caty-widget-og.webp"
        lang={lang}
      />

      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="cw-page">
        {/* Navigation */}
        <nav className="cw-nav fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <img src="/images/caty-logo.png" alt="CatyAI" className="h-10" width="40" height="40" />
                <span className="font-bold text-white">CatyAI</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">{t.nav.home}</Link>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">{t.nav.features}</a>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">{t.nav.pricing}</a>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors text-sm">{t.nav.faq}</a>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSelector lang={lang} setLang={setLang} />
                <a href="https://app.catyai.io" className="text-gray-400 hover:text-white transition-colors text-sm hidden sm:block">{t.nav.login}</a>
                <a href="https://app.catyai.io" style={{ padding: '8px 16px', background: 'linear-gradient(90deg, #C8A165, #D4B57A)', color: '#010A1F', fontWeight: 700, borderRadius: '8px', fontSize: '0.875rem', textDecoration: 'none' }}>{t.nav.getStarted}</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ minHeight: '80vh' }}>
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img
              src="/images/widget-hero.png"
              alt="CatyAI Background"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(1,10,31,0.78)' }}></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="cw-badge">
              <span className="cw-badge-text">{t.badge}</span>
            </div>

            <h1 style={{ marginBottom: '1.5rem' }}>
              <span className="cw-hero-title1">{t.heroTitle1}</span>
              <span className="cw-hero-title2">{t.heroTitle2}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://app.catyai.io" style={{ padding: '1rem 2rem', background: 'linear-gradient(90deg, #C8A165, #D4B57A)', color: '#010A1F', fontWeight: 700, borderRadius: '12px', fontSize: '1.1rem', textDecoration: 'none' }}>
                {t.heroCta}
              </a>
              <a href="#demo" style={{ padding: '1rem 2rem', background: 'rgba(10,22,40,0.6)', color: '#e2e8f0', fontWeight: 600, borderRadius: '12px', fontSize: '1.1rem', border: '1px solid rgba(200,161,101,0.2)', textDecoration: 'none' }}>
                {t.heroCtaSecondary}
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2"><span className="text-gold">✓</span> {t.trustBadge1}</span>
              <span className="flex items-center gap-2"><span className="text-gold">✓</span> {t.trustBadge2}</span>
              <span className="flex items-center gap-2"><span className="text-gold">✓</span> {t.trustBadge3}</span>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(1,10,31,0.5)' }}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 style={{ marginBottom: '1rem' }}>
              <span className="cw-section-title">{t.problemTitle} {t.problemHighlight}</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
              {t.problemStats.map((stat, i) => (
                <div key={i} className="cw-stat-card">
                  <div className="cw-stat-value">{stat.value}</div>
                  <div className="cw-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '1.15rem', color: '#C8A165', fontWeight: 600 }}>{t.problemSolution}</p>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2><span className="cw-section-title">{t.integrationTitle}</span></h2>
              <p className="cw-section-sub">{t.integrationSubtitle}</p>
            </div>

            <div className="cw-code-block mb-12">
              <code>{t.integrationCode}</code>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {t.integrationSteps.map((step, i) => (
                <div key={i} className="cw-step">
                  <div className="cw-step-icon">{step.icon}</div>
                  <div className="cw-step-title">{step.title}</div>
                  <div className="cw-step-desc">{step.desc}</div>
                </div>
              ))}
            </div>

            <p className="text-center" style={{ color: '#475569', fontSize: '0.875rem' }}>{t.integrationPlatforms}</p>
          </div>
        </section>

        {/* Not a Chatbot Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(1,10,31,0.5)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2><span className="cw-section-title">{t.agentTitle} {t.agentHighlight}</span></h2>
              <p className="cw-section-sub">{t.agentDesc}</p>
            </div>

            <div className="cw-compare-wrap">
              <div className="cw-compare-header-row">
                <div className="cw-compare-cell" style={{ color: '#475569' }}></div>
                <div className="cw-compare-cell" style={{ color: '#64748b', textAlign: 'center', fontWeight: 500 }}>Chatbot Traditional</div>
                <div className="cw-compare-cell" style={{ color: '#C8A165', textAlign: 'center', fontWeight: 700 }}>Caty Widget</div>
              </div>
              {t.agentComparison.map((item, i) => (
                <div key={i} className="cw-compare-data-row">
                  <div className="cw-compare-cell" style={{ color: '#94a3b8' }}>{item.chatbot}</div>
                  <div className="cw-compare-cell" style={{ textAlign: 'center', color: '#475569' }}>✗</div>
                  <div className="cw-compare-cell" style={{ textAlign: 'center', color: '#C8A165' }}>✓ {item.caty}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admin Modules — Stacking Cards */}
        <section className="mt-32">
          <div className="max-w-4xl mx-auto px-6 text-center mb-12">
            <span className="text-gold font-mono text-sm tracking-widest uppercase">{t.modulesTitle}</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter leading-tight">
              {t.modulesSubtitle.split(' ').slice(0, 2).join(' ')}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">
                {t.modulesSubtitle.split(' ').slice(2).join(' ')}
              </span>.
            </h2>
          </div>

          {/* Card 1 — Knowledge Base */}
          <div className="cwstack-card" data-index="0">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="cwstack-tag">
                    <i data-lucide="brain" className="w-3 h-3" /> {t.modules[0].name}
                  </span>
                  <h3>{t.modules[0].name}</h3>
                  <p className="cwstack-tagline">{t.modules[0].features.join(' · ')}</p>
                  <p className="cwstack-body">{t.modules[0].desc}</p>
                  <div className="cwstack-pill">
                    <i data-lucide="database" className="w-3.5 h-3.5" />
                    <span>12 {lang === 'ro' ? 'domenii de training' : lang === 'es' ? 'dominios de entrenamiento' : lang === 'pt' ? 'domínios de treinamento' : lang === 'fr' ? 'domaines d\'entraînement' : 'training domains'} · GPT-4o + Claude</span>
                  </div>
                </div>
                <div className="bg-black/40 rounded-xl p-6 border border-white/5 font-mono text-sm text-slate-400 leading-relaxed">
                  <div className="text-slate-600"># knowledge-base/v1/domains</div>
                  <div><span className="text-gold">products</span>: <span className="text-emerald-400">"catalog + pricing"</span></div>
                  <div><span className="text-gold">services</span>: <span className="text-emerald-400">"full descriptions"</span></div>
                  <div><span className="text-gold">faq</span>: <span className="text-emerald-400">"247 entries"</span></div>
                  <div><span className="text-gold">policies</span>: <span className="text-emerald-400">"returns + gdpr"</span></div>
                  <div><span className="text-gold">team</span>: <span className="text-emerald-400">"5 members"</span></div>
                  <div><span className="text-gold">locations</span>: <span className="text-emerald-400">"3 branches"</span></div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex gap-6">
                    <div>
                      <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">12</div>
                      <div className="text-xs text-slate-500">{lang === 'ro' ? 'Domenii' : 'Domains'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-200">2 min</div>
                      <div className="text-xs text-slate-500">{lang === 'ro' ? 'Setup' : 'Setup time'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — AI Conversațional */}
          <div className="cwstack-card" data-index="1">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="md:order-2">
                  <span className="cwstack-tag">
                    <i data-lucide="message-circle" className="w-3 h-3" /> {t.modules[1].name}
                  </span>
                  <h3>{t.modules[1].name}</h3>
                  <p className="cwstack-tagline">{t.modules[1].features.join(' · ')}</p>
                  <p className="cwstack-body">{t.modules[1].desc}</p>
                  <div className="cwstack-pill">
                    <i data-lucide="sparkles" className="w-3.5 h-3.5" />
                    <span>{lang === 'ro' ? 'Memorie context · Analiză sentiment · Multi-turn' : 'Context memory · Sentiment analysis · Multi-turn'}</span>
                  </div>
                </div>
                <div className="md:order-1 bg-black/40 rounded-xl p-6 border border-white/5 space-y-3">
                  <div className="text-xs font-mono text-slate-600 mb-2 uppercase tracking-widest">Live conversation</div>
                  <div className="flex gap-2 items-start">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-xs">👤</div>
                    <div className="bg-slate-800/80 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-300 max-w-xs">
                      {lang === 'ro' ? 'Cât costă planul Pro?' : 'How much is the Pro plan?'}
                    </div>
                  </div>
                  <div className="flex gap-2 items-start justify-end">
                    <div className="bg-gold/10 border border-gold/20 rounded-xl rounded-tr-sm px-4 py-2.5 text-sm text-gold max-w-xs">
                      {lang === 'ro' ? 'Planul Pro e 49€/lună — include conversații nelimitate și toate integrările. Vrei să-l activezi acum?' : 'Pro plan is €49/mo — unlimited conversations + all integrations. Want to activate it now?'}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs">🤖</div>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex gap-4 text-xs font-mono">
                    <span className="text-emerald-400">sentiment: positive</span>
                    <span className="text-gold">intent: purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — Generator Documente */}
          <div className="cwstack-card" data-index="2">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="cwstack-tag">
                    <i data-lucide="file-text" className="w-3 h-3" /> {t.modules[3].name}
                  </span>
                  <h3>{t.modules[3].name}</h3>
                  <p className="cwstack-tagline">{t.modules[3].features.join(' · ')}</p>
                  <p className="cwstack-body">{t.modules[3].desc}</p>
                  <div className="cwstack-pill">
                    <i data-lucide="zap" className="w-3.5 h-3.5" />
                    <span>{lang === 'ro' ? 'Generat în &lt; 3s · PDF instant în chat' : 'Generated in < 3s · Instant PDF in chat'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: 'file-text', label: 'POST /docs/offer', sub: 'Ofertă PDF', status: '201 Created' },
                    { icon: 'receipt', label: 'POST /docs/invoice', sub: 'Factură proformă', status: '201 Created' },
                    { icon: 'credit-card', label: 'POST /docs/payment-link', sub: 'Stripe checkout', status: '200 OK' },
                  ].map((row, i) => (
                    <div key={i} className="bg-black/40 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                          <i data-lucide={row.icon} className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium font-mono">{row.label}</div>
                          <div className="text-xs text-slate-500">{row.sub}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 — Dashboard Analitics */}
          <div className="cwstack-card" data-index="3">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="md:order-2">
                  <span className="cwstack-tag">
                    <i data-lucide="bar-chart-2" className="w-3 h-3" /> {t.modules[6].name}
                  </span>
                  <h3>{t.modules[6].name}</h3>
                  <p className="cwstack-tagline">{t.modules[6].features.join(' · ')}</p>
                  <p className="cwstack-body">{t.modules[6].desc}</p>
                  <div className="cwstack-pill">
                    <i data-lucide="activity" className="w-3.5 h-3.5" />
                    <span>{lang === 'ro' ? 'Date în timp real · Export CSV · Webhook' : 'Real-time data · CSV export · Webhook'}</span>
                  </div>
                </div>
                <div className="md:order-1 bg-black/40 rounded-xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Live Dashboard</span>
                    <span className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3"><i data-lucide="trending-up" className="w-4 h-4 text-emerald-400" /><span className="text-sm text-slate-300 flex-grow">{lang === 'ro' ? 'Conversii azi' : 'Conversions today'}</span><span className="text-xs font-mono text-emerald-400">+18.4%</span></div>
                    <div className="flex items-center gap-3"><i data-lucide="users" className="w-4 h-4 text-emerald-400" /><span className="text-sm text-slate-300 flex-grow">{lang === 'ro' ? 'Lead-uri calificate' : 'Qualified leads'}</span><span className="text-xs font-mono text-emerald-400">47</span></div>
                    <div className="flex items-center gap-3"><i data-lucide="clock" className="w-4 h-4 text-gold" /><span className="text-sm text-slate-300 flex-grow">{lang === 'ro' ? 'Timp răspuns mediu' : 'Avg response time'}</span><span className="text-xs font-mono text-gold">1.2s</span></div>
                    <div className="flex items-center gap-3"><i data-lucide="smile" className="w-4 h-4 text-gold" /><span className="text-sm text-slate-300 flex-grow">CSAT Score</span><span className="text-xs font-mono text-gold">4.9/5</span></div>
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10"><i data-lucide="shield-check" className="w-4 h-4 text-emerald-400" /><span className="text-sm text-slate-300 flex-grow">FraudAI Shield</span><span className="text-xs font-mono text-emerald-400">{lang === 'ro' ? '3 blocate azi' : '3 blocked today'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Unique Section — stacking cards */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <span className="cwstack-tag" style={{ display: 'inline-flex' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A165', display: 'inline-block' }} />
                {t.uniqueTitle}
              </span>
            </div>
            <div className="text-center mb-20">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, color: '#f8fafc', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                {t.uniqueSubtitle.split(' ').slice(0, Math.ceil(t.uniqueSubtitle.split(' ').length / 2)).join(' ')}{' '}
                <span style={{ background: 'linear-gradient(135deg,#C8A165,#E8C882)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  {t.uniqueSubtitle.split(' ').slice(Math.ceil(t.uniqueSubtitle.split(' ').length / 2)).join(' ')}
                </span>
              </h2>
            </div>
          </div>

          {/* Card 0 — Deep Business Training */}
          <div className="cwstack-card" data-index="0">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="cwstack-tag">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A165', display: 'inline-block' }} />
                    {t.unique[0].icon} {t.unique[0].title}
                  </span>
                  <h3>{t.unique[0].title}</h3>
                  <p className="cwstack-tagline">{t.unique[0].title}</p>
                  <p className="cwstack-body">{t.unique[0].desc}</p>
                  <div className="cwstack-pill">
                    <span style={{ color: '#64748b' }}>$</span> caty train --source your-business
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', background: 'rgba(0,0,0,0.4)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', color: '#64748b' }}>
                  <div style={{ color: '#C8A165', marginBottom: '1rem', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// knowledge base loaded</div>
                  {[
                    ['products',    '247 items'],
                    ['pricing',     'dynamic rules'],
                    ['policies',    'returns · shipping'],
                    ['faq',         '89 answers'],
                    ['tone',        'brand voice'],
                    ['objections',  '34 mapped'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: '#7dd3fc' }}>{k}</span>
                      <span style={{ color: '#a3e635' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, textAlign: 'center', padding: '0.6rem', background: 'rgba(200,161,101,0.06)', borderRadius: 8, border: '1px solid rgba(200,161,101,0.15)' }}>
                      <div style={{ color: '#C8A165', fontSize: '1.1rem', fontWeight: 700 }}>6</div>
                      <div style={{ color: '#475569', fontSize: '0.68rem' }}>domains</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '0.6rem', background: 'rgba(200,161,101,0.06)', borderRadius: 8, border: '1px solid rgba(200,161,101,0.15)' }}>
                      <div style={{ color: '#C8A165', fontSize: '1.1rem', fontWeight: 700 }}>2min</div>
                      <div style={{ color: '#475569', fontSize: '0.68rem' }}>setup</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '0.6rem', background: 'rgba(200,161,101,0.06)', borderRadius: 8, border: '1px solid rgba(200,161,101,0.15)' }}>
                      <div style={{ color: '#C8A165', fontSize: '1.1rem', fontWeight: 700 }}>99%</div>
                      <div style={{ color: '#475569', fontSize: '0.68rem' }}>accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 1 — Sells, Not Just Chats */}
          <div className="cwstack-card" data-index="1">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="md:order-2">
                  <span className="cwstack-tag">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A165', display: 'inline-block' }} />
                    {t.unique[1].icon} {t.unique[1].title}
                  </span>
                  <h3>{t.unique[1].title}</h3>
                  <p className="cwstack-tagline">{t.unique[1].title}</p>
                  <p className="cwstack-body">{t.unique[1].desc}</p>
                  <div className="cwstack-pill">
                    <span style={{ color: '#64748b' }}>avg</span> 3.2× conversion lift
                  </div>
                </div>
                <div className="md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { stage: 'Visitor', action: 'asks about pricing', pct: 100, color: '#334155' },
                    { stage: 'Qualify', action: 'budget · timeline · intent', pct: 78, color: '#1e40af' },
                    { stage: 'Engage', action: 'objection handled', pct: 54, color: '#7c3aed' },
                    { stage: 'Offer',  action: 'quote sent in-chat', pct: 38, color: '#C8A165' },
                    { stage: 'Close',  action: '✓ payment link clicked', pct: 24, color: '#16a34a' },
                  ].map(({ stage, action, pct, color }) => (
                    <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 60, fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: '#475569', textAlign: 'right', flexShrink: 0 }}>{stage}</div>
                      <div style={{ flex: 1, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: color, opacity: 0.35, borderRadius: 6 }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: '#94a3b8' }}>{action}</div>
                      </div>
                      <div style={{ width: 36, fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: '#C8A165', flexShrink: 0 }}>{pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Documents in Chat */}
          <div className="cwstack-card" data-index="2">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="cwstack-tag">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A165', display: 'inline-block' }} />
                    {t.unique[2].icon} {t.unique[2].title}
                  </span>
                  <h3>{t.unique[2].title}</h3>
                  <p className="cwstack-tagline">{t.unique[2].title}</p>
                  <p className="cwstack-body">{t.unique[2].desc}</p>
                  <div className="cwstack-pill">
                    <span style={{ color: '#64748b' }}>latency</span> &lt; 800ms generation
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { method: 'POST', path: '/docs/offer',        status: '201', statusColor: '#a3e635' },
                    { method: 'POST', path: '/docs/invoice',      status: '201', statusColor: '#a3e635' },
                    { method: 'POST', path: '/docs/payment-link', status: '200', statusColor: '#60a5fa' },
                  ].map(({ method, path, status, statusColor }) => (
                    <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.4)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#C8A165', fontSize: '0.65rem', fontWeight: 700, width: 36 }}>{method}</span>
                      <span style={{ color: '#94a3b8', flex: 1 }}>{path}</span>
                      <span style={{ color: statusColor, fontSize: '0.65rem' }}>{status}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '0.5rem', padding: '1rem', background: 'rgba(200,161,101,0.04)', borderRadius: 10, border: '1px solid rgba(200,161,101,0.1)', color: '#64748b', fontSize: '0.72rem', lineHeight: 1.6 }}>
                    <span style={{ color: '#C8A165' }}>response.</span>document_url<br />
                    <span style={{ color: '#a3e635' }}>"https://docs.catyai.io/q/..."</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 — WhatsApp + Web Unified */}
          <div className="cwstack-card" data-index="3">
            <div className="cwstack-inner">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="md:order-2">
                  <span className="cwstack-tag">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A165', display: 'inline-block' }} />
                    {t.unique[4].icon} {t.unique[4].title}
                  </span>
                  <h3>{t.unique[4].title}</h3>
                  <p className="cwstack-tagline">{t.unique[4].title}</p>
                  <p className="cwstack-body">{t.unique[4].desc}</p>
                  <div className="cwstack-pill">
                    <span style={{ color: '#64748b' }}>channels</span> web · whatsapp · api
                  </div>
                </div>
                <div className="md:order-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    { label: 'Web Widget', color: '#1e40af', icon: '🌐', msg: 'What\'s the price for Pro?', reply: 'Pro is €49/mo — shall I send a quote?' },
                    { label: 'WhatsApp', color: '#16a34a', icon: '💬', msg: 'Cât costă planul Pro?', reply: 'Pro e €49/lună — îți trimit oferta?' },
                  ].map(({ label, color, icon, msg, reply }) => (
                    <div key={label} style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 14, border: `1px solid ${color}33`, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <span>{icon}</span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{msg}</div>
                      <div style={{ background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: '#C8A165', fontFamily: 'Inter, sans-serif' }}>{reply}</div>
                    </div>
                  ))}
                  <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', background: 'rgba(200,161,101,0.04)', borderRadius: 10, border: '1px solid rgba(200,161,101,0.1)', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.68rem', color: '#C8A165' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a3e635', display: 'inline-block' }} />
                    same knowledge base · same AI · one dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2><span className="cw-section-title">{t.useCasesTitle}</span></h2>
              <p className="cw-section-sub">{t.useCasesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.useCases.map((useCase, i) => (
                <div key={i} className="cw-usecase-card">
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{useCase.icon}</div>
                  <h3 className="cw-usecase-title">{useCase.title}</h3>
                  <p className="cw-usecase-desc">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(1,10,31,0.5)' }}>
          <div className="max-w-6xl mx-auto">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="cw-section-title">{t.testimonialsTitle}</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {t.testimonials.map((testimonial, i) => (
                <div key={i} className="cw-testimonial">
                  <p className="cw-testimonial-quote">"{testimonial.quote}"</p>
                  <div>
                    <div className="cw-testimonial-author">{testimonial.author}</div>
                    <div className="cw-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2><span className="cw-section-title">{t.pricingTitle} {t.pricingHighlight}</span></h2>
              <p className="cw-section-sub">{t.pricingSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8" style={{ alignItems: 'start' }}>
              {t.pricingPlans.map((plan, i) => (
                <div key={i} className={plan.popular ? 'cw-pricing-card-popular' : 'cw-pricing-card'}>
                  {plan.popular && (
                    <div className="cw-pricing-popular-badge">POPULAR</div>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div className="cw-pricing-name">{plan.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', margin: '0.75rem 0 0' }}>
                      <span className="cw-pricing-price">{plan.price}</span>
                      <span className="cw-pricing-period">{plan.period}</span>
                    </div>
                    <p className="cw-pricing-desc">{plan.desc}</p>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((feature, j) => (
                      <li key={j} className="cw-pricing-feature">
                        <span className="cw-pricing-check">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.name === 'ENTERPRISE' || plan.name === 'Personalizado' || plan.name === 'Sur mesure' ? 'mailto:contact@payai-x.com' : 'https://app.catyai.io'}
                    className={plan.popular ? 'cw-btn-gold' : 'cw-btn-outline'}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(1,10,31,0.5)' }}>
          <div className="max-w-4xl mx-auto">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="cw-section-title">{t.faqTitle}</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {t.faqs.map((faq, i) => (
                <details key={i} className="cw-faq-item">
                  <summary>
                    {faq.q}
                    <span className="cw-faq-arrow">▼</span>
                  </summary>
                  <div className="cw-faq-body">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cw-cta-section py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 style={{ marginBottom: '1rem' }}>
              <span className="cw-section-title">{t.ctaTitle}</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>{t.ctaSubtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io" className="px-8 py-4 font-bold rounded-xl text-lg" style={{ background: 'linear-gradient(90deg, #C8A165, #D4B57A)', color: '#010A1F', textDecoration: 'none' }}>
                {t.ctaButton}
              </a>
              <Link to="/contact" style={{ padding: '1rem 2rem', color: '#C8A165', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none' }}>
                {t.ctaDemo}
              </Link>
            </div>
          </div>
        </section>

      </div>
      <FooterV9 lang={lang} />
    </>
  )
}
