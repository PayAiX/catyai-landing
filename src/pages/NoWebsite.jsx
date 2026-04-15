import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const translations = {
  en: {
    badge: 'No Website Needed',
    heroTitle1: 'No website?',
    heroTitle2: 'No problem.',
    heroSubtitle: 'Connect your WhatsApp in 2 minutes. Caty responds to your customers instantly. Perfect for small businesses, freelancers, and local services.',
    heroCta: 'Connect WhatsApp Now',
    heroCtaSecondary: 'See How It Works',
    trustBadge1: 'Only €10/month',
    trustBadge2: 'No technical skills needed',
    trustBadge3: 'Setup in 2 minutes',

    problemTitle: 'You Have Customers.',
    problemHighlight: 'They Can\'t Find You.',
    problemStats: [
      { value: '73%', label: 'of customers prefer WhatsApp over calling' },
      { value: '45%', label: 'of small businesses have no online presence' },
      { value: '€10', label: 'per month - all inclusive' }
    ],
    problemSolution: 'Your WhatsApp becomes your 24/7 business front desk.',

    howTitle: 'How It Works',
    howSubtitle: 'Live in 2 minutes. No website. No app to install. No technical skills.',
    howSteps: [
      { title: 'Scan QR Code', desc: 'Just like WhatsApp Web. Uses your existing business number. No new number needed.', icon: '📱' },
      { title: 'Tell Caty About Your Business', desc: 'Services you offer, your prices, working hours, location. Voice or text — takes 5 minutes.', icon: '💬' },
      { title: 'You\'re Live!', desc: 'Caty responds to customers 24/7. Books appointments. Sends quotes. You focus on your work.', icon: '🚀' }
    ],

    benefitsTitle: 'Everything You Need.',
    benefitsHighlight: 'Nothing You Don\'t.',
    benefits: [
      {
        icon: '💬',
        title: 'Instant Customer Response',
        desc: 'Customers message your WhatsApp, Caty responds instantly. No more missed messages while you\'re working.',
        highlight: '24/7'
      },
      {
        icon: '📅',
        title: 'Automatic Appointments',
        desc: 'Caty books appointments directly into your calendar. Sends reminders. Handles rescheduling.',
        highlight: 'Google Calendar'
      },
      {
        icon: '📄',
        title: 'Quotes in Seconds',
        desc: 'Customer asks for a price? Caty generates a professional PDF quote and sends it right away.',
        highlight: 'PDF Quotes'
      },
      {
        icon: '🛡️',
        title: 'Scam Protection',
        desc: 'FraudAI Shield blocks phishing links, fake urgency scams, and suspicious requests before you see them.',
        highlight: 'Protected'
      },
      {
        icon: '🌍',
        title: 'Multi-Language',
        desc: 'Caty speaks Romanian, English, Spanish, Portuguese, French, and Arabic. Auto-detects customer language.',
        highlight: '6 Languages'
      },
      {
        icon: '📊',
        title: 'Business Insights',
        desc: 'See what customers ask most, peak hours, and missed opportunities. Grow smarter.',
        highlight: 'Analytics'
      }
    ],

    useCasesTitle: 'Perfect For',
    useCasesSubtitle: 'Small businesses and freelancers who don\'t need a website — just customers.',
    useCases: [
      { icon: '💇', title: 'Hair Stylists', desc: 'Book appointments while you cut. Never miss a client.' },
      { icon: '🔧', title: 'Mechanics', desc: 'Receive repair requests. Send quotes. Confirm pickups.' },
      { icon: '🔌', title: 'Electricians & Plumbers', desc: 'Get job requests 24/7. Schedule visits automatically.' },
      { icon: '🦷', title: 'Dentists', desc: 'Book checkups. Send reminders. Handle emergencies.' },
      { icon: '🏋️', title: 'Personal Trainers', desc: 'Schedule sessions. Answer fitness questions. Grow your client base.' },
      { icon: '📸', title: 'Photographers', desc: 'Book shoots. Share packages. Confirm dates.' },
      { icon: '🧹', title: 'Cleaning Services', desc: 'Receive bookings. Send confirmations. Manage schedules.' },
      { icon: '🚗', title: 'Driving Instructors', desc: 'Book lessons. Send reminders. Handle cancellations.' }
    ],

    comparisonTitle: 'Website vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Setup time', website: '2-4 weeks', caty: '2 minutes' },
      { feature: 'Cost', website: '€500-5,000', caty: '€10/month' },
      { feature: 'Technical skills', website: 'Required', caty: 'None' },
      { feature: 'Customer response', website: 'You manually', caty: '24/7 AI' },
      { feature: 'Appointments', website: 'External tool', caty: 'Built-in' },
      { feature: 'Maintenance', website: 'Ongoing', caty: 'Zero' }
    ],

    testimonialsTitle: 'What They Say',
    testimonials: [
      { quote: 'I connected in 2 minutes. Now Caty books my appointments while I work on cars.', author: 'Andrei', role: 'Auto Mechanic' },
      { quote: 'No website, no problem. My clients message on WhatsApp and Caty handles everything.', author: 'Maria', role: 'Hair Stylist' },
      { quote: 'I was skeptical about AI but it speaks Romanian perfectly. My clients love it.', author: 'Ion', role: 'Plumber' }
    ],

    pricingTitle: 'Simple Pricing',
    pricingSubtitle: 'One plan. Everything included. Cancel anytime.',
    plans: [
      {
        name: 'WhatsApp AI',
        price: '€10',
        period: '/month',
        desc: 'Everything you need',
        features: [
          '500 conversations/month',
          '24/7 AI responses',
          'Google Calendar sync',
          'PDF quotes & invoices',
          'FraudAI protection',
          'Multi-language support'
        ],
        cta: 'Get Started',
        highlight: true
      }
    ],

    faqTitle: 'Questions?',
    faqs: [
      { q: 'Do I really not need a website?', a: 'Correct. Your WhatsApp number becomes your business contact. Customers message you there, Caty responds.' },
      { q: 'What if Caty can\'t answer something?', a: 'Caty forwards the conversation to you with full context. You take over seamlessly.' },
      { q: 'Will customers know it\'s AI?', a: 'Only if you want them to. Caty can respond as your business, with your name and style.' },
      { q: 'Can I use my existing WhatsApp number?', a: 'Yes! Caty connects to your existing business WhatsApp. No new number needed.' },
      { q: 'What languages does Caty speak?', a: 'Romanian, English, Spanish, Portuguese, French, and Arabic. Auto-detects and responds in customer\'s language.' },
      { q: 'How do I cancel?', a: 'Cancel anytime from your dashboard. No contracts, no penalties.' }
    ],

    ctaTitle: 'Ready in 2 Minutes',
    ctaSubtitle: 'Scan. Setup. Start receiving customers.',
    ctaButton: 'Connect WhatsApp Now',

    paymentMethodsTitle: 'Payment Methods',
    paymentMethodsSubtitle: 'Your customers pay how they want. You decide which methods to accept.',
    paymentMethods: [
      { icon: '💵', title: 'Cash', desc: 'Customer pays in person when receiving the service.', badge: 'FREE', badgeColor: 'green' },
      { icon: '🏦', title: 'Bank Transfer', desc: 'Caty sends your IBAN automatically. Customer pays via bank app.', badge: 'FREE', badgeColor: 'green' },
      { icon: '🔄', title: 'Revolut', desc: 'Instant payment via Revolut link. Money arrives in seconds.', badge: 'FREE', badgeColor: 'green' },
      { icon: '💳', title: 'Card Online', desc: 'Stripe integration for card payments. Professional checkout.', badge: '5%', badgeColor: 'gold' }
    ],

    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Get Started' },
    footer: {
      tagline: 'AI that works for your business.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      features: 'Features',
      pricing: 'Pricing',
      whatsapp: 'WhatsApp AI',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms',
      gdpr: 'GDPR',
      copyright: '© 2024 PayAi-X FZE. All rights reserved.'
    }
  },
  ro: {
    badge: 'Fără Site Web',
    heroTitle1: 'Nu ai site?',
    heroTitle2: 'Nu-i problemă.',
    heroSubtitle: 'Conectează-ți WhatsApp-ul în 2 minute. Caty răspunde instant clienților tăi. Perfect pentru afaceri mici, freelanceri și servicii locale.',
    heroCta: 'Conectează WhatsApp Acum',
    heroCtaSecondary: 'Vezi Cum Funcționează',
    trustBadge1: 'Doar €10/lună',
    trustBadge2: 'Fără cunoștințe tehnice',
    trustBadge3: 'Setup în 2 minute',

    problemTitle: 'Ai Clienți.',
    problemHighlight: 'Nu Te Pot Găsi.',
    problemStats: [
      { value: '73%', label: 'din clienți preferă WhatsApp în loc să sune' },
      { value: '45%', label: 'din afacerile mici nu au prezență online' },
      { value: '€10', label: 'pe lună - totul inclus' }
    ],
    problemSolution: 'WhatsApp-ul tău devine recepția ta 24/7.',

    howTitle: 'Cum Funcționează',
    howSubtitle: 'Live în 2 minute. Fără site. Fără aplicație de instalat. Fără cunoștințe tehnice.',
    howSteps: [
      { title: 'Scanează Codul QR', desc: 'Ca la WhatsApp Web. Folosești numărul tău de business. Nu ai nevoie de număr nou.', icon: '📱' },
      { title: 'Spune-i lui Caty Despre Afacerea Ta', desc: 'Servicii, prețuri, program, locație. Vocal sau text — durează 5 minute.', icon: '💬' },
      { title: 'Ești Live!', desc: 'Caty răspunde clienților 24/7. Programează întâlniri. Trimite oferte. Tu te concentrezi pe muncă.', icon: '🚀' }
    ],

    benefitsTitle: 'Tot Ce Ai Nevoie.',
    benefitsHighlight: 'Nimic în Plus.',
    benefits: [
      {
        icon: '💬',
        title: 'Răspuns Instant Clienților',
        desc: 'Clienții îți scriu pe WhatsApp, Caty răspunde instant. Nu mai pierzi mesaje în timp ce lucrezi.',
        highlight: '24/7'
      },
      {
        icon: '📅',
        title: 'Programări Automate',
        desc: 'Caty programează întâlnirile direct în calendarul tău. Trimite remindere. Gestionează reprogramările.',
        highlight: 'Google Calendar'
      },
      {
        icon: '📄',
        title: 'Oferte în Secunde',
        desc: 'Clientul întreabă de preț? Caty generează o ofertă PDF profesională și o trimite instant.',
        highlight: 'PDF'
      },
      {
        icon: '🛡️',
        title: 'Protecție Anti-Fraudă',
        desc: 'FraudAI Shield blochează link-uri phishing, mesaje false urgente și cereri suspecte.',
        highlight: 'Protejat'
      },
      {
        icon: '🌍',
        title: 'Multi-Limbă',
        desc: 'Caty vorbește română, engleză, spaniolă, portugheză, franceză și arabă. Detectează automat limba.',
        highlight: '6 Limbi'
      },
      {
        icon: '📊',
        title: 'Statistici Business',
        desc: 'Vezi ce întreabă clienții cel mai des, orele de vârf și oportunitățile ratate. Crești mai inteligent.',
        highlight: 'Analytics'
      }
    ],

    useCasesTitle: 'Perfect Pentru',
    useCasesSubtitle: 'Afaceri mici și freelanceri care nu au nevoie de site — doar de clienți.',
    useCases: [
      { icon: '💇', title: 'Frizeri', desc: 'Programezi în timp ce tunzi. Nu mai pierzi clienți.' },
      { icon: '🔧', title: 'Mecanici', desc: 'Primești cereri de reparații. Trimiți oferte. Confirmi ridicări.' },
      { icon: '🔌', title: 'Electricieni & Instalatori', desc: 'Primești cereri 24/7. Programezi vizite automat.' },
      { icon: '🦷', title: 'Stomatologi', desc: 'Programezi controale. Trimiți remindere. Gestionezi urgențe.' },
      { icon: '🏋️', title: 'Antrenori Personali', desc: 'Programezi sesiuni. Răspunzi la întrebări. Crești baza de clienți.' },
      { icon: '📸', title: 'Fotografi', desc: 'Programezi ședințe. Împărtășești pachete. Confirmi date.' },
      { icon: '🧹', title: 'Servicii Curățenie', desc: 'Primești rezervări. Trimiți confirmări. Gestionezi programul.' },
      { icon: '🚗', title: 'Instructori Auto', desc: 'Programezi lecții. Trimiți remindere. Gestionezi anulări.' }
    ],

    comparisonTitle: 'Site Web vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Timp setup', website: '2-4 săptămâni', caty: '2 minute' },
      { feature: 'Cost', website: '€500-5,000', caty: '€10/lună' },
      { feature: 'Cunoștințe tehnice', website: 'Necesare', caty: 'Zero' },
      { feature: 'Răspuns clienți', website: 'Tu manual', caty: 'AI 24/7' },
      { feature: 'Programări', website: 'Tool extern', caty: 'Incluse' },
      { feature: 'Întreținere', website: 'Continuă', caty: 'Zero' }
    ],

    testimonialsTitle: 'Ce Spun Ei',
    testimonials: [
      { quote: 'M-am conectat în 2 minute. Acum Caty îmi face programări în timp ce lucrez la mașini.', author: 'Andrei', role: 'Mecanic Auto' },
      { quote: 'Fără site, fără problemă. Clienții mei scriu pe WhatsApp și Caty se ocupă de tot.', author: 'Maria', role: 'Stilist' },
      { quote: 'Am fost sceptic cu AI-ul dar vorbește română perfect. Clienții mei adoră.', author: 'Ion', role: 'Instalator' }
    ],

    pricingTitle: 'Preț Simplu',
    pricingSubtitle: 'Un singur plan. Totul inclus. Anulezi oricând.',
    plans: [
      {
        name: 'WhatsApp AI',
        price: '€10',
        period: '/lună',
        desc: 'Tot ce ai nevoie',
        features: [
          '500 conversații/lună',
          'Răspunsuri AI 24/7',
          'Sync Google Calendar',
          'Oferte & facturi PDF',
          'Protecție FraudAI',
          'Suport multi-limbă'
        ],
        cta: 'Începe Acum',
        highlight: true
      }
    ],

    faqTitle: 'Întrebări?',
    faqs: [
      { q: 'Chiar nu am nevoie de site?', a: 'Corect. Numărul tău de WhatsApp devine contactul afacerii. Clienții îți scriu acolo, Caty răspunde.' },
      { q: 'Ce se întâmplă dacă Caty nu poate răspunde?', a: 'Caty îți trimite conversația cu tot contextul. Preiei fără probleme.' },
      { q: 'Vor ști clienții că e AI?', a: 'Doar dacă vrei tu. Caty poate răspunde ca afacerea ta, cu numele și stilul tău.' },
      { q: 'Pot folosi numărul meu de WhatsApp?', a: 'Da! Caty se conectează la WhatsApp-ul tău de business. Nu ai nevoie de număr nou.' },
      { q: 'Ce limbi vorbește Caty?', a: 'Română, engleză, spaniolă, portugheză, franceză și arabă. Detectează automat și răspunde în limba clientului.' },
      { q: 'Cum anulez?', a: 'Anulezi oricând din dashboard. Fără contracte, fără penalități.' }
    ],

    ctaTitle: 'Gata în 2 Minute',
    ctaSubtitle: 'Scanează. Configurează. Începe să primești clienți.',
    ctaButton: 'Conectează WhatsApp Acum',

    paymentMethodsTitle: 'Metode de Plată',
    paymentMethodsSubtitle: 'Clienții tăi plătesc cum vor. Tu decizi ce metode accepți.',
    paymentMethods: [
      { icon: '💵', title: 'Cash', desc: 'Clientul plătește în persoană când primește serviciul.', badge: 'GRATIS', badgeColor: 'green' },
      { icon: '🏦', title: 'Transfer Bancar', desc: 'Caty trimite IBAN-ul tău automat. Clientul plătește din aplicația băncii.', badge: 'GRATIS', badgeColor: 'green' },
      { icon: '🔄', title: 'Revolut', desc: 'Plată instant prin link Revolut. Banii ajung în secunde.', badge: 'GRATIS', badgeColor: 'green' },
      { icon: '💳', title: 'Card Online', desc: 'Integrare Stripe pentru plăți cu cardul. Checkout profesional.', badge: '5%', badgeColor: 'gold' }
    ],

    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Acum' },
    footer: {
      tagline: 'AI care lucrează pentru afacerea ta.',
      product: 'Produs',
      company: 'Companie',
      legal: 'Legal',
      features: 'Funcții',
      pricing: 'Prețuri',
      whatsapp: 'WhatsApp AI',
      about: 'Despre',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidențialitate',
      terms: 'Termeni',
      gdpr: 'GDPR',
      copyright: '© 2024 PayAi-X FZE. Toate drepturile rezervate.'
    }
  },
  es: {
    badge: 'Sin Sitio Web',
    heroTitle1: '¿No tienes web?',
    heroTitle2: 'No hay problema.',
    heroSubtitle: 'Conecta tu WhatsApp en 2 minutos. Caty responde a tus clientes al instante. Perfecto para pequeños negocios, freelancers y servicios locales.',
    heroCta: 'Conectar WhatsApp Ahora',
    heroCtaSecondary: 'Ver Cómo Funciona',
    trustBadge1: 'Solo €10/mes',
    trustBadge2: 'Sin conocimientos técnicos',
    trustBadge3: 'Setup en 2 minutos',

    problemTitle: 'Tienes Clientes.',
    problemHighlight: 'No Pueden Encontrarte.',
    problemStats: [
      { value: '73%', label: 'de clientes prefieren WhatsApp a llamar' },
      { value: '45%', label: 'de pequeños negocios no tienen presencia online' },
      { value: '€10', label: 'al mes - todo incluido' }
    ],
    problemSolution: 'Tu WhatsApp se convierte en tu recepción 24/7.',

    howTitle: 'Cómo Funciona',
    howSubtitle: 'En vivo en 2 minutos. Sin web. Sin app para instalar. Sin conocimientos técnicos.',
    howSteps: [
      { title: 'Escanea el Código QR', desc: 'Como WhatsApp Web. Usa tu número de negocio existente. No necesitas número nuevo.', icon: '📱' },
      { title: 'Cuéntale a Caty Tu Negocio', desc: 'Servicios, precios, horarios, ubicación. Voz o texto — toma 5 minutos.', icon: '💬' },
      { title: '¡Estás En Vivo!', desc: 'Caty responde a clientes 24/7. Agenda citas. Envía presupuestos. Tú te enfocas en tu trabajo.', icon: '🚀' }
    ],

    benefitsTitle: 'Todo Lo Que Necesitas.',
    benefitsHighlight: 'Nada Que No.',
    benefits: [
      { icon: '💬', title: 'Respuesta Instantánea', desc: 'Los clientes te escriben en WhatsApp, Caty responde al instante.', highlight: '24/7' },
      { icon: '📅', title: 'Citas Automáticas', desc: 'Caty agenda citas directamente en tu calendario.', highlight: 'Google Calendar' },
      { icon: '📄', title: 'Presupuestos en Segundos', desc: '¿El cliente pregunta precio? Caty genera un PDF profesional.', highlight: 'PDF' },
      { icon: '🛡️', title: 'Protección Anti-Fraude', desc: 'FraudAI Shield bloquea phishing y mensajes sospechosos.', highlight: 'Protegido' },
      { icon: '🌍', title: 'Multi-Idioma', desc: 'Caty habla español, inglés, rumano, portugués, francés y árabe.', highlight: '6 Idiomas' },
      { icon: '📊', title: 'Estadísticas', desc: 'Ve qué preguntan más los clientes y las horas pico.', highlight: 'Analytics' }
    ],

    useCasesTitle: 'Perfecto Para',
    useCasesSubtitle: 'Pequeños negocios y freelancers que no necesitan web — solo clientes.',
    useCases: [
      { icon: '💇', title: 'Peluqueros', desc: 'Agenda citas mientras cortas. Nunca pierdas un cliente.' },
      { icon: '🔧', title: 'Mecánicos', desc: 'Recibe solicitudes de reparación. Envía presupuestos.' },
      { icon: '🔌', title: 'Electricistas', desc: 'Recibe trabajos 24/7. Programa visitas automáticamente.' },
      { icon: '🦷', title: 'Dentistas', desc: 'Agenda chequeos. Envía recordatorios. Gestiona urgencias.' },
      { icon: '🏋️', title: 'Entrenadores', desc: 'Programa sesiones. Responde preguntas de fitness.' },
      { icon: '📸', title: 'Fotógrafos', desc: 'Agenda sesiones. Comparte paquetes. Confirma fechas.' },
      { icon: '🧹', title: 'Limpieza', desc: 'Recibe reservas. Envía confirmaciones.' },
      { icon: '🚗', title: 'Instructores', desc: 'Programa clases. Envía recordatorios.' }
    ],

    comparisonTitle: 'Sitio Web vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Tiempo setup', website: '2-4 semanas', caty: '2 minutos' },
      { feature: 'Costo', website: '€500-5,000', caty: '€10/mes' },
      { feature: 'Conocimientos técnicos', website: 'Necesarios', caty: 'Ninguno' },
      { feature: 'Respuesta clientes', website: 'Tú manualmente', caty: 'AI 24/7' },
      { feature: 'Citas', website: 'Herramienta externa', caty: 'Incluidas' },
      { feature: 'Mantenimiento', website: 'Continuo', caty: 'Cero' }
    ],

    testimonialsTitle: 'Lo Que Dicen',
    testimonials: [
      { quote: 'Me conecté en 2 minutos. Ahora Caty agenda mis citas mientras trabajo.', author: 'Carlos', role: 'Mecánico' },
      { quote: 'Sin web, sin problema. Mis clientes escriben en WhatsApp y Caty maneja todo.', author: 'María', role: 'Estilista' },
      { quote: 'Era escéptico con la IA pero habla español perfectamente.', author: 'Juan', role: 'Fontanero' }
    ],

    pricingTitle: 'Precio Simple',
    pricingSubtitle: 'Un solo plan. Todo incluido. Cancela cuando quieras.',
    plans: [
      {
        name: 'WhatsApp AI',
        price: '€10',
        period: '/mes',
        desc: 'Todo lo que necesitas',
        features: [
          '500 conversaciones/mes',
          'Respuestas AI 24/7',
          'Google Calendar sync',
          'Presupuestos PDF',
          'Protección FraudAI',
          'Soporte multiidioma'
        ],
        cta: 'Empezar Ahora',
        highlight: true
      }
    ],

    faqTitle: '¿Preguntas?',
    faqs: [
      { q: '¿Realmente no necesito sitio web?', a: 'Correcto. Tu WhatsApp se convierte en el contacto de tu negocio.' },
      { q: '¿Qué pasa si Caty no puede responder?', a: 'Caty te envía la conversación con todo el contexto. Tomas el control.' },
      { q: '¿Sabrán los clientes que es IA?', a: 'Solo si tú quieres. Caty puede responder como tu negocio.' },
      { q: '¿Puedo usar mi número de WhatsApp?', a: 'Sí! Caty se conecta a tu WhatsApp de negocio existente.' },
      { q: '¿Qué idiomas habla Caty?', a: 'Español, inglés, rumano, portugués, francés y árabe. Detecta automáticamente.' },
      { q: '¿Cómo cancelo?', a: 'Cancela cuando quieras desde tu panel. Sin contratos.' }
    ],

    ctaTitle: 'Listo en 2 Minutos',
    ctaSubtitle: 'Escanea. Configura. Empieza a recibir clientes.',
    ctaButton: 'Conectar WhatsApp Ahora',

    paymentMethodsTitle: 'Métodos de Pago',
    paymentMethodsSubtitle: 'Tus clientes pagan como quieran. Tú decides qué métodos aceptar.',
    paymentMethods: [
      { icon: '💵', title: 'Efectivo', desc: 'El cliente paga en persona al recibir el servicio.', badge: 'GRATIS', badgeColor: 'green' },
      { icon: '🏦', title: 'Transferencia', desc: 'Caty envía tu IBAN automáticamente. El cliente paga desde su app bancaria.', badge: 'GRATIS', badgeColor: 'green' },
      { icon: '🔄', title: 'Revolut', desc: 'Pago instantáneo vía link Revolut. El dinero llega en segundos.', badge: 'GRATIS', badgeColor: 'green' },
      { icon: '💳', title: 'Tarjeta Online', desc: 'Integración Stripe para pagos con tarjeta. Checkout profesional.', badge: '5%', badgeColor: 'gold' }
    ],

    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo Funciona', pricing: 'Precios', faq: 'FAQ', login: 'Entrar', getStarted: 'Empezar Ahora' },
    footer: {
      tagline: 'IA que trabaja para tu negocio.',
      product: 'Producto',
      company: 'Empresa',
      legal: 'Legal',
      features: 'Funciones',
      pricing: 'Precios',
      whatsapp: 'WhatsApp AI',
      about: 'Nosotros',
      blog: 'Blog',
      contact: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos',
      gdpr: 'GDPR',
      copyright: '© 2024 PayAi-X FZE. Todos los derechos reservados.'
    }
  },
  pt: {
    badge: 'Sem Website',
    heroTitle1: 'Sem site?',
    heroTitle2: 'Sem problema.',
    heroSubtitle: 'Conecte seu WhatsApp em 2 minutos. Caty responde aos seus clientes instantaneamente. Perfeito para pequenos negócios, freelancers e serviços locais.',
    heroCta: 'Conectar WhatsApp Agora',
    heroCtaSecondary: 'Ver Como Funciona',
    trustBadge1: 'Apenas €10/mês',
    trustBadge2: 'Sem conhecimentos técnicos',
    trustBadge3: 'Setup em 2 minutos',

    problemTitle: 'Tem Clientes.',
    problemHighlight: 'Não Conseguem Encontrá-lo.',
    problemStats: [
      { value: '73%', label: 'dos clientes preferem WhatsApp a ligar' },
      { value: '45%', label: 'dos pequenos negócios não têm presença online' },
      { value: '€10', label: 'por mês - tudo incluído' }
    ],
    problemSolution: 'O seu WhatsApp torna-se a sua recepção 24/7.',

    howTitle: 'Como Funciona',
    howSubtitle: 'Ao vivo em 2 minutos. Sem site. Sem app para instalar. Sem conhecimentos técnicos.',
    howSteps: [
      { title: 'Digitalize o Código QR', desc: 'Como no WhatsApp Web. Use o seu número de negócio existente. Não precisa de número novo.', icon: '📱' },
      { title: 'Conte à Caty Sobre o Seu Negócio', desc: 'Serviços, preços, horários, localização. Voz ou texto — leva 5 minutos.', icon: '💬' },
      { title: 'Está Online!', desc: 'Caty responde aos clientes 24/7. Marca consultas. Envia orçamentos. Você foca no seu trabalho.', icon: '🚀' }
    ],

    benefitsTitle: 'Tudo O Que Precisa.',
    benefitsHighlight: 'Nada Que Não.',
    benefits: [
      { icon: '💬', title: 'Resposta Instantânea', desc: 'Os clientes escrevem no WhatsApp, Caty responde instantaneamente.', highlight: '24/7' },
      { icon: '📅', title: 'Marcações Automáticas', desc: 'Caty marca consultas diretamente no seu calendário.', highlight: 'Google Calendar' },
      { icon: '📄', title: 'Orçamentos em Segundos', desc: 'O cliente pergunta o preço? Caty gera um PDF profissional.', highlight: 'PDF' },
      { icon: '🛡️', title: 'Proteção Anti-Fraude', desc: 'FraudAI Shield bloqueia phishing e mensagens suspeitas.', highlight: 'Protegido' },
      { icon: '🌍', title: 'Multi-Idioma', desc: 'Caty fala português, inglês, espanhol, romeno, francês e árabe.', highlight: '6 Idiomas' },
      { icon: '📊', title: 'Estatísticas', desc: 'Veja o que os clientes mais perguntam e as horas de pico.', highlight: 'Analytics' }
    ],

    useCasesTitle: 'Perfeito Para',
    useCasesSubtitle: 'Pequenos negócios e freelancers que não precisam de site — apenas de clientes.',
    useCases: [
      { icon: '💇', title: 'Cabeleireiros', desc: 'Marque consultas enquanto corta. Nunca perca um cliente.' },
      { icon: '🔧', title: 'Mecânicos', desc: 'Receba pedidos de reparação. Envie orçamentos.' },
      { icon: '🔌', title: 'Eletricistas', desc: 'Receba trabalhos 24/7. Agende visitas automaticamente.' },
      { icon: '🦷', title: 'Dentistas', desc: 'Marque consultas. Envie lembretes. Gerencie urgências.' },
      { icon: '🏋️', title: 'Personal Trainers', desc: 'Agende sessões. Responda perguntas de fitness.' },
      { icon: '📸', title: 'Fotógrafos', desc: 'Agende sessões. Partilhe pacotes. Confirme datas.' },
      { icon: '🧹', title: 'Limpezas', desc: 'Receba reservas. Envie confirmações.' },
      { icon: '🚗', title: 'Instrutores', desc: 'Agende aulas. Envie lembretes.' }
    ],

    comparisonTitle: 'Website vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Tempo setup', website: '2-4 semanas', caty: '2 minutos' },
      { feature: 'Custo', website: '€500-5,000', caty: '€10/mês' },
      { feature: 'Conhecimentos técnicos', website: 'Necessários', caty: 'Nenhum' },
      { feature: 'Resposta clientes', website: 'Você manualmente', caty: 'AI 24/7' },
      { feature: 'Marcações', website: 'Ferramenta externa', caty: 'Incluídas' },
      { feature: 'Manutenção', website: 'Contínua', caty: 'Zero' }
    ],

    testimonialsTitle: 'O Que Dizem',
    testimonials: [
      { quote: 'Conectei em 2 minutos. Agora Caty marca as minhas consultas enquanto trabalho.', author: 'Carlos', role: 'Mecânico' },
      { quote: 'Sem site, sem problema. Os meus clientes escrevem no WhatsApp e Caty trata de tudo.', author: 'Maria', role: 'Cabeleireira' },
      { quote: 'Era cético com IA mas fala português perfeitamente.', author: 'João', role: 'Canalizador' }
    ],

    pricingTitle: 'Preço Simples',
    pricingSubtitle: 'Um só plano. Tudo incluído. Cancele quando quiser.',
    plans: [
      {
        name: 'WhatsApp AI',
        price: '€10',
        period: '/mês',
        desc: 'Tudo o que precisa',
        features: [
          '500 conversas/mês',
          'Respostas AI 24/7',
          'Google Calendar sync',
          'Orçamentos PDF',
          'Proteção FraudAI',
          'Suporte multi-idioma'
        ],
        cta: 'Começar Agora',
        highlight: true
      }
    ],

    faqTitle: 'Perguntas?',
    faqs: [
      { q: 'Realmente não preciso de site?', a: 'Correto. O seu WhatsApp torna-se o contacto do seu negócio.' },
      { q: 'E se Caty não conseguir responder?', a: 'Caty envia-lhe a conversa com todo o contexto. Você assume o controlo.' },
      { q: 'Os clientes saberão que é IA?', a: 'Só se você quiser. Caty pode responder como o seu negócio.' },
      { q: 'Posso usar o meu número de WhatsApp?', a: 'Sim! Caty conecta-se ao seu WhatsApp de negócio existente.' },
      { q: 'Que idiomas fala Caty?', a: 'Português, inglês, espanhol, romeno, francês e árabe. Deteta automaticamente.' },
      { q: 'Como cancelo?', a: 'Cancele quando quiser no seu painel. Sem contratos.' }
    ],

    ctaTitle: 'Pronto em 2 Minutos',
    ctaSubtitle: 'Digitalize. Configure. Comece a receber clientes.',
    ctaButton: 'Conectar WhatsApp Agora',

    paymentMethodsTitle: 'Métodos de Pagamento',
    paymentMethodsSubtitle: 'Os seus clientes pagam como quiserem. Você decide que métodos aceitar.',
    paymentMethods: [
      { icon: '💵', title: 'Dinheiro', desc: 'O cliente paga presencialmente ao receber o serviço.', badge: 'GRÁTIS', badgeColor: 'green' },
      { icon: '🏦', title: 'Transferência', desc: 'Caty envia o seu IBAN automaticamente. O cliente paga pela app do banco.', badge: 'GRÁTIS', badgeColor: 'green' },
      { icon: '🔄', title: 'Revolut', desc: 'Pagamento instantâneo via link Revolut. O dinheiro chega em segundos.', badge: 'GRÁTIS', badgeColor: 'green' },
      { icon: '💳', title: 'Cartão Online', desc: 'Integração Stripe para pagamentos com cartão. Checkout profissional.', badge: '5%', badgeColor: 'gold' }
    ],

    nav: { home: 'Início', features: 'Funcionalidades', howItWorks: 'Como Funciona', pricing: 'Preços', faq: 'FAQ', login: 'Entrar', getStarted: 'Começar Agora' },
    footer: {
      tagline: 'IA que trabalha para o seu negócio.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      features: 'Funcionalidades',
      pricing: 'Preços',
      whatsapp: 'WhatsApp AI',
      about: 'Sobre',
      blog: 'Blog',
      contact: 'Contacto',
      privacy: 'Privacidade',
      terms: 'Termos',
      gdpr: 'RGPD',
      copyright: '© 2024 PayAi-X FZE. Todos os direitos reservados.'
    }
  },
  fr: {
    badge: 'Sans Site Web',
    heroTitle1: 'Pas de site?',
    heroTitle2: 'Pas de problème.',
    heroSubtitle: 'Connectez votre WhatsApp en 2 minutes. Caty répond instantanément à vos clients. Parfait pour les petites entreprises, freelances et services locaux.',
    heroCta: 'Connecter WhatsApp Maintenant',
    heroCtaSecondary: 'Voir Comment Ça Marche',
    trustBadge1: 'Seulement €10/mois',
    trustBadge2: 'Aucune compétence technique',
    trustBadge3: 'Setup en 2 minutes',

    problemTitle: 'Vous Avez des Clients.',
    problemHighlight: 'Ils Ne Peuvent Pas Vous Trouver.',
    problemStats: [
      { value: '73%', label: 'des clients préfèrent WhatsApp aux appels' },
      { value: '45%', label: 'des petites entreprises n\'ont pas de présence en ligne' },
      { value: '€10', label: 'par mois - tout inclus' }
    ],
    problemSolution: 'Votre WhatsApp devient votre réception 24/7.',

    howTitle: 'Comment Ça Marche',
    howSubtitle: 'En ligne en 2 minutes. Pas de site. Pas d\'app à installer. Pas de compétences techniques.',
    howSteps: [
      { title: 'Scannez le Code QR', desc: 'Comme WhatsApp Web. Utilisez votre numéro professionnel existant. Pas besoin de nouveau numéro.', icon: '📱' },
      { title: 'Parlez de Votre Entreprise à Caty', desc: 'Services, prix, horaires, emplacement. Voix ou texte — prend 5 minutes.', icon: '💬' },
      { title: 'Vous Êtes En Ligne!', desc: 'Caty répond aux clients 24/7. Prend des rendez-vous. Envoie des devis. Vous vous concentrez sur votre travail.', icon: '🚀' }
    ],

    benefitsTitle: 'Tout Ce Dont Vous Avez Besoin.',
    benefitsHighlight: 'Rien de Plus.',
    benefits: [
      { icon: '💬', title: 'Réponse Instantanée', desc: 'Les clients vous écrivent sur WhatsApp, Caty répond instantanément.', highlight: '24/7' },
      { icon: '📅', title: 'Rendez-vous Automatiques', desc: 'Caty prend les rendez-vous directement dans votre calendrier.', highlight: 'Google Calendar' },
      { icon: '📄', title: 'Devis en Secondes', desc: 'Le client demande un prix? Caty génère un PDF professionnel.', highlight: 'PDF' },
      { icon: '🛡️', title: 'Protection Anti-Fraude', desc: 'FraudAI Shield bloque le phishing et les messages suspects.', highlight: 'Protégé' },
      { icon: '🌍', title: 'Multi-Langue', desc: 'Caty parle français, anglais, espagnol, portugais, roumain et arabe.', highlight: '6 Langues' },
      { icon: '📊', title: 'Statistiques', desc: 'Voyez ce que les clients demandent le plus et les heures de pointe.', highlight: 'Analytics' }
    ],

    useCasesTitle: 'Parfait Pour',
    useCasesSubtitle: 'Petites entreprises et freelances qui n\'ont pas besoin de site — juste de clients.',
    useCases: [
      { icon: '💇', title: 'Coiffeurs', desc: 'Prenez des rendez-vous pendant que vous coupez. Ne perdez jamais un client.' },
      { icon: '🔧', title: 'Mécaniciens', desc: 'Recevez des demandes de réparation. Envoyez des devis.' },
      { icon: '🔌', title: 'Électriciens', desc: 'Recevez des travaux 24/7. Planifiez les visites automatiquement.' },
      { icon: '🦷', title: 'Dentistes', desc: 'Prenez des rendez-vous. Envoyez des rappels. Gérez les urgences.' },
      { icon: '🏋️', title: 'Coachs Sportifs', desc: 'Planifiez des séances. Répondez aux questions fitness.' },
      { icon: '📸', title: 'Photographes', desc: 'Planifiez des séances. Partagez vos forfaits. Confirmez les dates.' },
      { icon: '🧹', title: 'Nettoyage', desc: 'Recevez des réservations. Envoyez des confirmations.' },
      { icon: '🚗', title: 'Moniteurs', desc: 'Planifiez des leçons. Envoyez des rappels.' }
    ],

    comparisonTitle: 'Site Web vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Temps setup', website: '2-4 semaines', caty: '2 minutes' },
      { feature: 'Coût', website: '€500-5,000', caty: '€10/mois' },
      { feature: 'Compétences techniques', website: 'Nécessaires', caty: 'Aucune' },
      { feature: 'Réponse clients', website: 'Vous manuellement', caty: 'IA 24/7' },
      { feature: 'Rendez-vous', website: 'Outil externe', caty: 'Inclus' },
      { feature: 'Maintenance', website: 'Continue', caty: 'Zéro' }
    ],

    testimonialsTitle: 'Ce Qu\'ils Disent',
    testimonials: [
      { quote: 'Je me suis connecté en 2 minutes. Maintenant Caty prend mes rendez-vous pendant que je travaille.', author: 'Pierre', role: 'Mécanicien' },
      { quote: 'Pas de site, pas de problème. Mes clients écrivent sur WhatsApp et Caty gère tout.', author: 'Marie', role: 'Coiffeuse' },
      { quote: 'J\'étais sceptique avec l\'IA mais elle parle français parfaitement.', author: 'Jean', role: 'Plombier' }
    ],

    pricingTitle: 'Prix Simple',
    pricingSubtitle: 'Un seul plan. Tout inclus. Annulez quand vous voulez.',
    plans: [
      {
        name: 'WhatsApp AI',
        price: '€10',
        period: '/mois',
        desc: 'Tout ce dont vous avez besoin',
        features: [
          '500 conversations/mois',
          'Réponses IA 24/7',
          'Google Calendar sync',
          'Devis PDF',
          'Protection FraudAI',
          'Support multi-langue'
        ],
        cta: 'Commencer Maintenant',
        highlight: true
      }
    ],

    faqTitle: 'Questions?',
    faqs: [
      { q: 'Je n\'ai vraiment pas besoin de site?', a: 'Correct. Votre WhatsApp devient le contact de votre entreprise.' },
      { q: 'Et si Caty ne peut pas répondre?', a: 'Caty vous envoie la conversation avec tout le contexte. Vous prenez le relais.' },
      { q: 'Les clients sauront que c\'est une IA?', a: 'Seulement si vous le voulez. Caty peut répondre comme votre entreprise.' },
      { q: 'Puis-je utiliser mon numéro WhatsApp?', a: 'Oui! Caty se connecte à votre WhatsApp professionnel existant.' },
      { q: 'Quelles langues parle Caty?', a: 'Français, anglais, espagnol, portugais, roumain et arabe. Détection automatique.' },
      { q: 'Comment j\'annule?', a: 'Annulez quand vous voulez depuis votre tableau de bord. Sans contrat.' }
    ],

    ctaTitle: 'Prêt en 2 Minutes',
    ctaSubtitle: 'Scannez. Configurez. Commencez à recevoir des clients.',
    ctaButton: 'Connecter WhatsApp Maintenant',

    paymentMethodsTitle: 'Méthodes de Paiement',
    paymentMethodsSubtitle: 'Vos clients paient comme ils veulent. Vous décidez quelles méthodes accepter.',
    paymentMethods: [
      { icon: '💵', title: 'Espèces', desc: 'Le client paie en personne lors de la réception du service.', badge: 'GRATUIT', badgeColor: 'green' },
      { icon: '🏦', title: 'Virement', desc: 'Caty envoie votre IBAN automatiquement. Le client paie via son app bancaire.', badge: 'GRATUIT', badgeColor: 'green' },
      { icon: '🔄', title: 'Revolut', desc: 'Paiement instantané via lien Revolut. L\'argent arrive en secondes.', badge: 'GRATUIT', badgeColor: 'green' },
      { icon: '💳', title: 'Carte en Ligne', desc: 'Intégration Stripe pour les paiements par carte. Checkout professionnel.', badge: '5%', badgeColor: 'gold' }
    ],

    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment Ça Marche', pricing: 'Tarifs', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer' },
    footer: {
      tagline: 'IA qui travaille pour votre entreprise.',
      product: 'Produit',
      company: 'Entreprise',
      legal: 'Légal',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      whatsapp: 'WhatsApp AI',
      about: 'À Propos',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      gdpr: 'RGPD',
      copyright: '© 2024 PayAi-X FZE. Tous droits réservés.'
    }
  }
}

// Language selector component
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
        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-sm"
      >
        <span>{current.flag}</span>
        <span className="text-gray-300">{current.name}</span>
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-24 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); localStorage.setItem('caty-lang', l.code); setIsOpen(false) }}
              className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-gray-700 ${lang === l.code ? 'text-green-400' : 'text-gray-300'}`}
            >
              <span>{l.flag}</span> {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NoWebsite() {
  const [lang, setLang] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    const interval = setInterval(updateLang, 500)
    return () => clearInterval(interval)
  }, [])

  const t = translations[lang] || translations.en

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO
        title="QR-First | CatyAI - WhatsApp AI for Small Businesses"
        description="Nu ai site? Nicio problemă. Lipești QR code pe vitrină, clientul scanează, Caty răspunde instant pe WhatsApp. Setup 2 minute, doar €10/lună."
        url="https://catyai.io/no-website"
        service={{
          name: 'CatyAI QR-First',
          description: 'WhatsApp AI for businesses without a website. Stick a QR code on your shop window, customers scan it, Caty responds instantly with prices, hours, and services.',
          price: '10',
          features: ['QR code for shop window', '24/7 AI responses', 'Appointment booking', 'Price quotes', 'No website needed', '2-minute setup']
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src="/images/caty-logo.webp" alt="CatyAI" className="h-20" width="80" height="80" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">{t.nav.home}</Link>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">{t.nav.features}</a>
              <a href="#how" className="text-gray-300 hover:text-white transition-colors">{t.nav.howItWorks}</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">{t.nav.pricing}</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">{t.nav.faq}</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector lang={lang} setLang={setLang} />
              <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white transition-colors">{t.nav.login}</a>
              <a href="https://app.catyai.io/signup" className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">{t.nav.getStarted}</a>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <LanguageSelector lang={lang} setLang={setLang} />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800/50">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-300 hover:text-white">{t.nav.home}</Link>
                <a href="#benefits" className="text-gray-300 hover:text-white">{t.nav.features}</a>
                <a href="#how" className="text-gray-300 hover:text-white">{t.nav.howItWorks}</a>
                <a href="#pricing" className="text-gray-300 hover:text-white">{t.nav.pricing}</a>
                <a href="#faq" className="text-gray-300 hover:text-white">{t.nav.faq}</a>
                <a href="https://app.catyai.io/signup" className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl text-center">{t.nav.getStarted}</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-green-950/20 to-gray-900 relative overflow-hidden">
        {/* WhatsApp pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2325D366' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t.heroTitle1}<br />
                <span className="text-green-400">{t.heroTitle2}</span>
              </h1>

              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://qr.catyai.io/qr-first/dashboard" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.heroCta}
                </a>
                <a href="#how" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800/50 text-white font-semibold text-lg rounded-2xl border border-gray-700 hover:bg-gray-700/50 transition-all">
                  {t.heroCtaSecondary}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[t.trustBadge1, t.trustBadge2, t.trustBadge3].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Realistic iPhone mockup with proper aspect ratio */}
            <div className="relative mx-auto" style={{ width: '280px', height: '570px' }}>
              {/* iPhone Frame - proper 19.5:9 aspect ratio */}
              <div className="relative w-full h-full bg-[#1C1C1E] rounded-[45px] p-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-[2px] border-[#3A3A3C]">
                {/* Side buttons */}
                <div className="absolute -left-[3px] top-[80px] w-[3px] h-[28px] bg-[#3A3A3C] rounded-l-sm"></div>
                <div className="absolute -left-[3px] top-[120px] w-[3px] h-[50px] bg-[#3A3A3C] rounded-l-sm"></div>
                <div className="absolute -left-[3px] top-[180px] w-[3px] h-[50px] bg-[#3A3A3C] rounded-l-sm"></div>
                <div className="absolute -right-[3px] top-[130px] w-[3px] h-[70px] bg-[#3A3A3C] rounded-r-sm"></div>

                {/* Screen container */}
                <div className="w-full h-full bg-black rounded-[35px] overflow-hidden relative flex flex-col">
                  {/* Dynamic Island */}
                  <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-50"></div>

                  {/* Status bar */}
                  <div className="bg-[#075E54] px-5 pt-[42px] pb-1 flex justify-between items-center text-white text-[11px] font-semibold shrink-0">
                    <span className="font-bold">9:41</span>
                    <div className="flex items-center gap-[3px]">
                      <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                      </svg>
                      <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 22h20V2z" opacity="0.3"/><path d="M2 22h20V2zm2-2V8.83l16 9.53V20z"/>
                      </svg>
                      <div className="flex items-center ml-[2px]">
                        <div className="w-[22px] h-[10px] border-[1.5px] border-white rounded-[3px] relative">
                          <div className="absolute inset-[1.5px] right-[3px] bg-white rounded-[1px]"></div>
                        </div>
                        <div className="w-[1.5px] h-[4px] bg-white rounded-r-sm ml-[1px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp header */}
                  <div className="bg-[#075E54] px-2 py-[6px] flex items-center gap-[6px] shrink-0">
                    <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      S
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-[13px] truncate">Salon Beauty</div>
                      <div className="text-[#8EDEB8] text-[10px] flex items-center gap-1">
                        <span className="w-[6px] h-[6px] bg-green-400 rounded-full animate-pulse"></span>
                        CatyAI Online
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <svg className="w-[18px] h-[18px] text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                      <svg className="w-[18px] h-[18px] text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Chat area - fills remaining space */}
                  <div className="flex-1 bg-[#ECE5DD] relative overflow-hidden" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23c7c7c7\' fill-opacity=\'0.12\'%3E%3Cpath d=\'M20 20h-2v2h2v2h2v-2h2v-2h-2v-2h-2v2zM0 20h2v-2H0v2zm0 0h2v2H0v-2z\'/%3E%3C/g%3E%3C/svg%3E")' }}>
                    <div className="p-2 space-y-[6px] pb-[50px]">
                      {/* Today pill */}
                      <div className="flex justify-center mb-2">
                        <div className="bg-[#E1F3FB] text-[#5B7083] px-2 py-[2px] rounded text-[9px] shadow-sm">
                          TODAY
                        </div>
                      </div>

                      {/* Customer message */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg rounded-tl-none px-2 py-[5px] max-w-[78%] shadow-sm">
                          <p className="text-[#303030] text-[12px] leading-[15px]">Bună! Aveți loc mâine pentru tunsoare?</p>
                          <p className="text-[#8696A0] text-[9px] text-right mt-[2px]">10:23</p>
                        </div>
                      </div>

                      {/* AI response */}
                      <div className="flex justify-end">
                        <div className="bg-[#D9FDD3] rounded-lg rounded-tr-none px-2 py-[5px] max-w-[78%] shadow-sm">
                          <p className="text-[#303030] text-[12px] leading-[15px]">Bună! 👋 Da, avem:</p>
                          <p className="text-[#303030] text-[12px] leading-[15px]">• 10:00 ✅</p>
                          <p className="text-[#303030] text-[12px] leading-[15px]">• 14:00 ✅</p>
                          <p className="text-[#303030] text-[12px] leading-[15px]">• 16:30 ✅</p>
                          <p className="text-[#8696A0] text-[9px] text-right mt-[2px] flex items-center justify-end gap-[2px]">
                            10:23
                            <svg className="w-3 h-3 text-[#53BDEB]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.266a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                          </p>
                        </div>
                      </div>

                      {/* Customer reply */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg rounded-tl-none px-2 py-[5px] max-w-[78%] shadow-sm">
                          <p className="text-[#303030] text-[12px] leading-[15px]">14:00 vă rog 🙏</p>
                          <p className="text-[#8696A0] text-[9px] text-right mt-[2px]">10:24</p>
                        </div>
                      </div>

                      {/* AI confirmation with card */}
                      <div className="flex justify-end">
                        <div className="bg-[#D9FDD3] rounded-lg rounded-tr-none px-2 py-[5px] max-w-[78%] shadow-sm">
                          <p className="text-[#303030] text-[12px] leading-[15px]">Perfect! ✨ Confirmat:</p>
                          <div className="bg-[#C8E6C9] rounded px-2 py-1 mt-1 border border-[#A5D6A7]">
                            <p className="text-[#2E7D32] text-[10px] font-medium">📅 Mâine, 14:00</p>
                            <p className="text-[#2E7D32] text-[10px]">✂️ Tunsoare</p>
                          </div>
                          <p className="text-[#303030] text-[12px] leading-[15px] mt-1">Reminder cu 1h înainte! 💈</p>
                          <p className="text-[#8696A0] text-[9px] text-right mt-[2px] flex items-center justify-end gap-[2px]">
                            10:24
                            <svg className="w-3 h-3 text-[#53BDEB]" viewBox="0 0 16 15" fill="currentColor"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.266a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Input bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[#F0F0F0] px-[6px] py-[5px] flex items-center gap-[5px]">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-[16px]">😊</span>
                      </div>
                      <div className="flex-1 bg-white rounded-full px-3 py-[6px]">
                        <span className="text-[#8696A0] text-[12px]">Message</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="bg-black py-2 shrink-0">
                    <div className="mx-auto w-[100px] h-[4px] bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce z-10">
                24/7 Active!
              </div>

              {/* Bottom badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-[10px] font-medium shadow-lg flex items-center gap-1 z-10 whitespace-nowrap">
                <span className="w-[6px] h-[6px] bg-green-500 rounded-full animate-pulse"></span>
                Powered by CatyAI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.problemTitle} <span className="text-red-400">{t.problemHighlight}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
            {t.problemStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xl text-green-400 font-semibold">{t.problemSolution}</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.howTitle}</h2>
            <p className="text-gray-400 text-lg">{t.howSubtitle}</p>
          </div>
          <div className="space-y-6">
            {t.howSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-6 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-3xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-green-500 text-white font-bold flex items-center justify-center text-sm">{i + 1}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.paymentMethodsTitle}</h2>
            <p className="text-gray-400 text-lg">{t.paymentMethodsSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.paymentMethods.map((method, i) => (
              <div key={i} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 text-center relative overflow-hidden">
                {/* Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                  method.badgeColor === 'green'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {method.badge}
                </div>
                <div className="text-5xl mb-4 mt-2">{method.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.benefitsTitle} <span className="text-green-400">{t.benefitsHighlight}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.map((benefit, i) => (
              <div key={i} className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-green-500/30 transition-colors">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">{benefit.highlight}</span>
                </div>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.useCasesTitle}</h2>
            <p className="text-gray-400">{t.useCasesSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.useCases.map((useCase, i) => (
              <div key={i} className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 text-center hover:border-green-500/30 transition-colors">
                <div className="text-3xl mb-2">{useCase.icon}</div>
                <h3 className="text-white font-semibold mb-1">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.comparisonTitle}</h2>
          <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-800/50 p-4">
              <div className="text-gray-400 font-medium"></div>
              <div className="text-center text-gray-400 font-medium">Website</div>
              <div className="text-center text-green-400 font-bold">WhatsApp + Caty</div>
            </div>
            {t.comparisonItems.map((item, i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-t border-gray-700/50">
                <div className="text-gray-300">{item.feature}</div>
                <div className="text-center text-gray-400">{item.website}</div>
                <div className="text-center text-green-400 font-semibold">{item.caty}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.map((testimonial, i) => (
              <div key={i} className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.pricingTitle}</h2>
            <p className="text-gray-400">{t.pricingSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.plans.map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${plan.highlight ? 'bg-gradient-to-b from-green-500/10 to-transparent border-green-500/30' : 'bg-gray-800/30 border-gray-700/50'}`}>
                {plan.highlight && <div className="text-green-400 text-sm font-semibold mb-4">MOST POPULAR</div>}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="https://app.catyai.io/signup" className={`block w-full py-3 rounded-xl font-semibold text-center transition-opacity ${plan.highlight ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqs.map((faq, i) => (
              <details key={i} className="group p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
                <summary className="flex items-center justify-between cursor-pointer text-white font-semibold list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-green-950/30 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-8">{t.ctaSubtitle}</p>
          <a href="https://qr.catyai.io/qr-first/dashboard" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.ctaButton}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img src="/images/caty-logo.webp" alt="CatyAI" className="h-14" width="56" height="56" />
              </Link>
              <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.product}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/#features" className="hover:text-white">{t.footer.features}</Link></li>
                <li><Link to="/#pricing" className="hover:text-white">{t.footer.pricing}</Link></li>
                <li><Link to="/whatsapp" className="hover:text-white">{t.footer.whatsapp}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/about" className="hover:text-white">{t.footer.about}</Link></li>
                <li><Link to="/blog" className="hover:text-white">{t.footer.blog}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{t.footer.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/privacy" className="hover:text-white">{t.footer.privacy}</Link></li>
                <li><Link to="/terms" className="hover:text-white">{t.footer.terms}</Link></li>
                <li><Link to="/gdpr" className="hover:text-white">{t.footer.gdpr}</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800/50 text-center text-gray-400 text-sm">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  )
}
