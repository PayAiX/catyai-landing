import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'

const translations = {
  en: {
    badge: 'Active Protection 24/7',
    heroTitle1: 'FraudAI Shield',
    heroTitle2: 'Blocks Scams Before You See Them',
    heroSubtitle: '8 AI detection modules analyze every WhatsApp message in real-time. Phishing links, fake urgency, impersonation attacks — all blocked automatically. You only see legitimate conversations.',
    heroCta: 'Get Protected Now',
    heroCtaSecondary: 'See How It Works',
    trustBadge1: 'Included FREE in all plans',
    trustBadge2: '99.2% accuracy',
    trustBadge3: '<1 second analysis',

    problemTitle: 'WhatsApp Scams Are',
    problemHighlight: 'Everywhere.',
    problemStats: [
      { value: '3.4B', label: 'scam messages sent daily on WhatsApp worldwide' },
      { value: '67%', label: 'of small businesses received a scam attempt this year' },
      { value: '€12,000', label: 'average loss per successful business scam' }
    ],
    problemSolution: 'FraudAI Shield stops them before you even see them.',

    howTitle: 'How FraudAI Works',
    howSubtitle: 'Real-time AI analysis of every incoming message',
    howSteps: [
      { title: 'Message Arrives', desc: 'A new WhatsApp message reaches your business number.', icon: '📩' },
      { title: '8 Modules Analyze', desc: 'Our AI scans for phishing, urgency tactics, impersonation, suspicious links, and more — in under 1 second.', icon: '🔍' },
      { title: 'Threat Blocked or Delivered', desc: 'Dangerous messages are quarantined. Safe messages reach you instantly.', icon: '✅' }
    ],

    modulesTitle: '8 Detection Modules',
    modulesSubtitle: 'Each module specializes in a different type of threat',
    modules: [
      { icon: '🔗', title: 'Phishing Links', desc: 'Detects fake URLs mimicking banks, PayPal, Google, and other trusted services. Checks domain age, SSL certificates, and redirect chains.', stats: '12,000+ phishing domains blocked' },
      { icon: '💸', title: 'Financial Scams', desc: 'Blocks "urgent transfer", "crypto opportunity", "guaranteed investment" and other money schemes. Pattern-matches known scam scripts.', stats: '98.7% detection rate' },
      { icon: '🎭', title: 'Impersonation Attacks', desc: 'Identifies when someone pretends to be a bank, courier, government agency, or even your own team members.', stats: 'Protects against 50+ impersonation types' },
      { icon: '⏰', title: 'Fake Urgency', desc: 'Detects artificial pressure tactics: "respond in 5 minutes", "last chance", "today only", "your account will be closed".', stats: '3,200+ urgency patterns recognized' },
      { icon: '📱', title: 'Spam & Mass Messages', desc: 'Blocks contacts sending identical messages repeatedly, chain forwards, and mass broadcast spam.', stats: 'Learns your spam patterns' },
      { icon: '🌍', title: 'Suspicious Numbers', desc: 'Alerts for unknown international numbers with aggressive first-message behavior. Cross-references global scam databases.', stats: 'Real-time scam number database' },
      { icon: '📎', title: 'Malicious Attachments', desc: 'Scans PDFs, documents, and files for malware, ransomware, and hidden executable code.', stats: 'Zero malware delivered' },
      { icon: '🔐', title: 'Data Harvesting', desc: 'Blocks attempts to extract passwords, SSN, credit cards, or other sensitive information through social engineering.', stats: 'Protects all personal data types' }
    ],

    statsTitle: 'Protection Stats',
    stats: [
      { value: '8', label: 'Detection Modules', color: 'red' },
      { value: '<1s', label: 'Analysis Time', color: 'orange' },
      { value: '99.2%', label: 'Accuracy', color: 'yellow' },
      { value: '0', label: 'False Positives/day', color: 'green' }
    ],

    comparisonTitle: 'FraudAI vs. No Protection',
    comparisonItems: [
      { feature: 'Phishing detection', without: 'Manual checking', with: 'Automatic blocking' },
      { feature: 'Response time', without: 'After you click', with: 'Before you see it' },
      { feature: 'Scam message handling', without: 'You deal with it', with: 'Auto-quarantined' },
      { feature: 'Learning', without: 'None', with: 'Improves daily' },
      { feature: 'Coverage', without: 'When you\'re available', with: '24/7 protection' },
      { feature: 'Cost at competitors', without: '€50-200/month add-on', with: 'FREE with CatyAI' }
    ],

    useCasesTitle: 'Who Needs FraudAI',
    useCases: [
      { icon: '🏪', title: 'Small Businesses', desc: 'Receive payments via WhatsApp? FraudAI blocks fake payment confirmations and phishing.' },
      { icon: '🏥', title: 'Healthcare', desc: 'Patient data is valuable. FraudAI stops social engineering attacks targeting medical info.' },
      { icon: '🏠', title: 'Real Estate', desc: 'High-value transactions attract scammers. FraudAI blocks wire fraud attempts.' },
      { icon: '💼', title: 'Consultants', desc: 'Your reputation matters. FraudAI prevents impersonation of you or your clients.' },
      { icon: '🛒', title: 'E-commerce', desc: 'Fake order confirmations, phishing links — FraudAI catches them all.' },
      { icon: '⚖️', title: 'Legal & Finance', desc: 'Sensitive client communications need maximum protection. FraudAI delivers.' }
    ],

    testimonialsTitle: 'What Users Say',
    testimonials: [
      { quote: 'FraudAI blocked 23 scam attempts in my first month. I had no idea how many dangerous messages I was receiving.', author: 'Elena', role: 'Dental Clinic Owner' },
      { quote: 'A fake "bank" message got blocked automatically. The link looked so real — FraudAI saved me from clicking it.', author: 'Mihai', role: 'Restaurant Manager' },
      { quote: 'I used to waste 30 minutes daily on spam. Now I only see real customer messages.', author: 'Ana', role: 'Freelance Designer' }
    ],

    faqTitle: 'Questions About FraudAI',
    faqs: [
      { q: 'Is FraudAI really free?', a: 'Yes. FraudAI Shield is included free in all CatyAI plans, including the free tier with 500 conversations/month.' },
      { q: 'Will it block legitimate messages?', a: 'Our 99.2% accuracy means virtually zero false positives. If a legitimate message is ever flagged, you can whitelist the sender instantly.' },
      { q: 'How fast is the analysis?', a: 'Under 1 second. Messages are analyzed in real-time — you won\'t notice any delay.' },
      { q: 'Does it work for all languages?', a: 'Yes. FraudAI detects scam patterns in Romanian, English, Spanish, Portuguese, French, Arabic, and more.' },
      { q: 'Can I see what was blocked?', a: 'Yes. Your dashboard shows a quarantine log with all blocked messages and why they were flagged.' },
      { q: 'What if a new scam type appears?', a: 'FraudAI learns continuously. Our AI updates daily with new threat patterns from our global network.' }
    ],

    ctaTitle: 'Stop Scams Today',
    ctaSubtitle: 'FraudAI Shield is included free with every CatyAI plan.',
    ctaButton: 'Get Protected Now',

    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Start Free' },
    footer: {
      tagline: 'AI that protects your business.',
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
    badge: 'Protecție Activă 24/7',
    heroTitle1: 'FraudAI Shield',
    heroTitle2: 'Blochează Escrocheriile Înainte Să Le Vezi',
    heroSubtitle: '8 module AI de detecție analizează fiecare mesaj WhatsApp în timp real. Link-uri phishing, urgență falsă, atacuri de impersonare — toate blocate automat. Tu vezi doar conversațiile legitime.',
    heroCta: 'Protejează-te Acum',
    heroCtaSecondary: 'Vezi Cum Funcționează',
    trustBadge1: 'Inclus GRATUIT în toate planurile',
    trustBadge2: '99.2% acuratețe',
    trustBadge3: '<1 secundă analiză',

    problemTitle: 'Escrocheriile WhatsApp Sunt',
    problemHighlight: 'Peste Tot.',
    problemStats: [
      { value: '3.4B', label: 'mesaje de fraudă trimise zilnic pe WhatsApp global' },
      { value: '67%', label: 'din afacerile mici au primit tentative de fraudă anul acesta' },
      { value: '€12,000', label: 'pierdere medie per fraudă reușită asupra unei afaceri' }
    ],
    problemSolution: 'FraudAI Shield le oprește înainte să le vezi.',

    howTitle: 'Cum Funcționează FraudAI',
    howSubtitle: 'Analiză AI în timp real pentru fiecare mesaj primit',
    howSteps: [
      { title: 'Mesaj Primit', desc: 'Un nou mesaj WhatsApp ajunge la numărul tău de business.', icon: '📩' },
      { title: '8 Module Analizează', desc: 'AI-ul nostru scanează pentru phishing, tactici de urgență, impersonare, link-uri suspecte — în sub 1 secundă.', icon: '🔍' },
      { title: 'Amenințare Blocată sau Livrat', desc: 'Mesajele periculoase sunt puse în carantină. Mesajele sigure ajung la tine instant.', icon: '✅' }
    ],

    modulesTitle: '8 Module de Detecție',
    modulesSubtitle: 'Fiecare modul este specializat pe un tip diferit de amenințare',
    modules: [
      { icon: '🔗', title: 'Link-uri Phishing', desc: 'Detectează URL-uri false care imită bănci, PayPal, Google și alte servicii de încredere. Verifică vârsta domeniului, certificate SSL și lanțuri de redirectare.', stats: '12,000+ domenii phishing blocate' },
      { icon: '💸', title: 'Fraude Financiare', desc: 'Blochează "transfer urgent", "oportunitate crypto", "investiție garantată" și alte scheme. Recunoaște scripturi cunoscute de fraudă.', stats: '98.7% rată de detecție' },
      { icon: '🎭', title: 'Atacuri de Impersonare', desc: 'Identifică când cineva pretinde că e bancă, curier, agenție guvernamentală sau chiar membrii echipei tale.', stats: 'Protejează împotriva a 50+ tipuri de impersonare' },
      { icon: '⏰', title: 'Urgență Falsă', desc: 'Detectează tactici de presiune artificială: "răspunde în 5 minute", "ultima șansă", "doar azi", "contul tău va fi închis".', stats: '3,200+ tipare de urgență recunoscute' },
      { icon: '📱', title: 'Spam & Mesaje în Masă', desc: 'Blochează contacte care trimit mesaje identice repetat, forward în lanț și spam broadcast.', stats: 'Învață tiparele tale de spam' },
      { icon: '🌍', title: 'Numere Suspecte', desc: 'Alertă pentru numere internaționale necunoscute cu comportament agresiv din primul mesaj. Verifică baze de date globale de fraudă.', stats: 'Bază de date în timp real' },
      { icon: '📎', title: 'Atașamente Malițioase', desc: 'Scanează PDF-uri, documente și fișiere pentru malware, ransomware și cod executabil ascuns.', stats: 'Zero malware livrat' },
      { icon: '🔐', title: 'Recoltare de Date', desc: 'Blochează încercări de extragere parole, CNP, carduri de credit sau alte informații sensibile prin inginerie socială.', stats: 'Protejează toate tipurile de date personale' }
    ],

    statsTitle: 'Statistici Protecție',
    stats: [
      { value: '8', label: 'Module Detecție', color: 'red' },
      { value: '<1s', label: 'Timp Analiză', color: 'orange' },
      { value: '99.2%', label: 'Acuratețe', color: 'yellow' },
      { value: '0', label: 'False Pozitive/zi', color: 'green' }
    ],

    comparisonTitle: 'FraudAI vs. Fără Protecție',
    comparisonItems: [
      { feature: 'Detecție phishing', without: 'Verificare manuală', with: 'Blocare automată' },
      { feature: 'Timp de răspuns', without: 'După ce dai click', with: 'Înainte să vezi' },
      { feature: 'Gestionare mesaje fraudă', without: 'Te ocupi tu', with: 'Auto-carantină' },
      { feature: 'Învățare', without: 'Niciuna', with: 'Se îmbunătățește zilnic' },
      { feature: 'Acoperire', without: 'Când ești disponibil', with: 'Protecție 24/7' },
      { feature: 'Cost la competitori', without: '€50-200/lună add-on', with: 'GRATUIT cu CatyAI' }
    ],

    useCasesTitle: 'Cine Are Nevoie de FraudAI',
    useCases: [
      { icon: '🏪', title: 'Afaceri Mici', desc: 'Primești plăți prin WhatsApp? FraudAI blochează confirmări false de plată și phishing.' },
      { icon: '🏥', title: 'Sănătate', desc: 'Datele pacienților sunt valoroase. FraudAI oprește atacuri de inginerie socială care vizează info medicale.' },
      { icon: '🏠', title: 'Imobiliare', desc: 'Tranzacțiile de valoare mare atrag escroci. FraudAI blochează tentative de fraudă cu transfer bancar.' },
      { icon: '💼', title: 'Consultanți', desc: 'Reputația ta contează. FraudAI previne impersonarea ta sau a clienților tăi.' },
      { icon: '🛒', title: 'E-commerce', desc: 'Confirmări false de comandă, link-uri phishing — FraudAI le prinde pe toate.' },
      { icon: '⚖️', title: 'Legal & Financiar', desc: 'Comunicările sensibile cu clienții necesită protecție maximă. FraudAI livrează.' }
    ],

    testimonialsTitle: 'Ce Spun Utilizatorii',
    testimonials: [
      { quote: 'FraudAI a blocat 23 de tentative de fraudă în prima lună. Nu aveam idee câte mesaje periculoase primeam.', author: 'Elena', role: 'Proprietar Cabinet Stomatologic' },
      { quote: 'Un mesaj fals de la "bancă" a fost blocat automat. Link-ul părea atât de real — FraudAI m-a salvat să dau click.', author: 'Mihai', role: 'Manager Restaurant' },
      { quote: 'Pierdeam 30 de minute zilnic pe spam. Acum văd doar mesaje reale de la clienți.', author: 'Ana', role: 'Designer Freelance' }
    ],

    faqTitle: 'Întrebări Despre FraudAI',
    faqs: [
      { q: 'FraudAI este chiar gratuit?', a: 'Da. FraudAI Shield este inclus gratuit în toate planurile CatyAI, inclusiv cel gratuit cu 500 conversații/lună.' },
      { q: 'Va bloca mesaje legitime?', a: 'Acuratețea noastră de 99.2% înseamnă practic zero false pozitive. Dacă un mesaj legitim este vreodată marcat, poți pune expeditorul pe whitelist instant.' },
      { q: 'Cât de rapidă este analiza?', a: 'Sub 1 secundă. Mesajele sunt analizate în timp real — nu vei observa nicio întârziere.' },
      { q: 'Funcționează pentru toate limbile?', a: 'Da. FraudAI detectează tipare de fraudă în română, engleză, spaniolă, portugheză, franceză, arabă și altele.' },
      { q: 'Pot vedea ce a fost blocat?', a: 'Da. Dashboard-ul tău arată un jurnal de carantină cu toate mesajele blocate și de ce au fost marcate.' },
      { q: 'Ce se întâmplă când apare un tip nou de fraudă?', a: 'FraudAI învață continuu. AI-ul nostru se actualizează zilnic cu noi tipare de amenințări din rețeaua noastră globală.' }
    ],

    ctaTitle: 'Oprește Fraudele Azi',
    ctaSubtitle: 'FraudAI Shield este inclus gratuit în fiecare plan CatyAI.',
    ctaButton: 'Protejează-te Acum',

    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Gratuit' },
    footer: {
      tagline: 'AI care îți protejează afacerea.',
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
    badge: 'Protección Activa 24/7',
    heroTitle1: 'FraudAI Shield',
    heroTitle2: 'Bloquea Estafas Antes de Que Las Veas',
    heroSubtitle: '8 módulos de detección AI analizan cada mensaje de WhatsApp en tiempo real. Links de phishing, urgencia falsa, ataques de suplantación — todo bloqueado automáticamente.',
    heroCta: 'Protégete Ahora',
    heroCtaSecondary: 'Ver Cómo Funciona',
    trustBadge1: 'Incluido GRATIS en todos los planes',
    trustBadge2: '99.2% precisión',
    trustBadge3: '<1 segundo análisis',

    problemTitle: 'Las Estafas de WhatsApp Están',
    problemHighlight: 'En Todas Partes.',
    problemStats: [
      { value: '3.4B', label: 'mensajes de estafa enviados diariamente en WhatsApp' },
      { value: '67%', label: 'de pequeños negocios recibieron intento de estafa este año' },
      { value: '€12,000', label: 'pérdida promedio por estafa exitosa a negocio' }
    ],
    problemSolution: 'FraudAI Shield los detiene antes de que los veas.',

    howTitle: 'Cómo Funciona FraudAI',
    howSubtitle: 'Análisis AI en tiempo real de cada mensaje entrante',
    howSteps: [
      { title: 'Mensaje Llega', desc: 'Un nuevo mensaje de WhatsApp llega a tu número de negocio.', icon: '📩' },
      { title: '8 Módulos Analizan', desc: 'Nuestra IA escanea phishing, tácticas de urgencia, suplantación, links sospechosos — en menos de 1 segundo.', icon: '🔍' },
      { title: 'Amenaza Bloqueada o Entregada', desc: 'Mensajes peligrosos van a cuarentena. Mensajes seguros te llegan al instante.', icon: '✅' }
    ],

    modulesTitle: '8 Módulos de Detección',
    modulesSubtitle: 'Cada módulo se especializa en un tipo diferente de amenaza',
    modules: [
      { icon: '🔗', title: 'Links Phishing', desc: 'Detecta URLs falsas que imitan bancos, PayPal, Google y otros servicios confiables.', stats: '12,000+ dominios phishing bloqueados' },
      { icon: '💸', title: 'Estafas Financieras', desc: 'Bloquea "transferencia urgente", "oportunidad crypto", "inversión garantizada".', stats: '98.7% tasa de detección' },
      { icon: '🎭', title: 'Ataques de Suplantación', desc: 'Identifica cuando alguien se hace pasar por banco, mensajería, o agencia gubernamental.', stats: 'Protege contra 50+ tipos' },
      { icon: '⏰', title: 'Urgencia Falsa', desc: 'Detecta tácticas de presión: "responde en 5 minutos", "última oportunidad", "solo hoy".', stats: '3,200+ patrones reconocidos' },
      { icon: '📱', title: 'Spam Masivo', desc: 'Bloquea contactos enviando mensajes idénticos repetidamente y spam broadcast.', stats: 'Aprende tus patrones' },
      { icon: '🌍', title: 'Números Sospechosos', desc: 'Alerta para números internacionales desconocidos con comportamiento agresivo.', stats: 'Base de datos en tiempo real' },
      { icon: '📎', title: 'Archivos Maliciosos', desc: 'Escanea PDFs, documentos y archivos para malware y código oculto.', stats: 'Zero malware entregado' },
      { icon: '🔐', title: 'Robo de Datos', desc: 'Bloquea intentos de extraer contraseñas, tarjetas y datos sensibles.', stats: 'Protege todos los tipos de datos' }
    ],

    statsTitle: 'Estadísticas de Protección',
    stats: [
      { value: '8', label: 'Módulos Detección', color: 'red' },
      { value: '<1s', label: 'Tiempo Análisis', color: 'orange' },
      { value: '99.2%', label: 'Precisión', color: 'yellow' },
      { value: '0', label: 'Falsos Positivos/día', color: 'green' }
    ],

    comparisonTitle: 'FraudAI vs. Sin Protección',
    comparisonItems: [
      { feature: 'Detección phishing', without: 'Verificación manual', with: 'Bloqueo automático' },
      { feature: 'Tiempo respuesta', without: 'Después del click', with: 'Antes de verlo' },
      { feature: 'Manejo estafas', without: 'Tú te encargas', with: 'Auto-cuarentena' },
      { feature: 'Aprendizaje', without: 'Ninguno', with: 'Mejora diariamente' },
      { feature: 'Cobertura', without: 'Cuando estás disponible', with: 'Protección 24/7' },
      { feature: 'Costo en competidores', without: '€50-200/mes add-on', with: 'GRATIS con CatyAI' }
    ],

    useCasesTitle: 'Quién Necesita FraudAI',
    useCases: [
      { icon: '🏪', title: 'Pequeños Negocios', desc: '¿Recibes pagos por WhatsApp? FraudAI bloquea confirmaciones falsas.' },
      { icon: '🏥', title: 'Salud', desc: 'Los datos de pacientes son valiosos. FraudAI detiene ataques de ingeniería social.' },
      { icon: '🏠', title: 'Inmobiliaria', desc: 'Transacciones de alto valor atraen estafadores. FraudAI bloquea fraude.' },
      { icon: '💼', title: 'Consultores', desc: 'Tu reputación importa. FraudAI previene suplantación tuya o de clientes.' },
      { icon: '🛒', title: 'E-commerce', desc: 'Confirmaciones falsas, links phishing — FraudAI los atrapa todos.' },
      { icon: '⚖️', title: 'Legal & Finanzas', desc: 'Comunicaciones sensibles necesitan máxima protección. FraudAI entrega.' }
    ],

    testimonialsTitle: 'Lo Que Dicen Los Usuarios',
    testimonials: [
      { quote: 'FraudAI bloqueó 23 intentos de estafa en mi primer mes. No tenía idea de cuántos mensajes peligrosos recibía.', author: 'Elena', role: 'Dueña Clínica Dental' },
      { quote: 'Un mensaje falso del "banco" fue bloqueado automáticamente. El link se veía tan real — FraudAI me salvó.', author: 'Miguel', role: 'Gerente Restaurante' },
      { quote: 'Perdía 30 minutos diarios en spam. Ahora solo veo mensajes reales de clientes.', author: 'Ana', role: 'Diseñadora Freelance' }
    ],

    faqTitle: 'Preguntas Sobre FraudAI',
    faqs: [
      { q: '¿FraudAI es realmente gratis?', a: 'Sí. FraudAI Shield está incluido gratis en todos los planes CatyAI, incluyendo el gratuito con 500 conversaciones/mes.' },
      { q: '¿Bloqueará mensajes legítimos?', a: 'Nuestra precisión de 99.2% significa prácticamente cero falsos positivos. Si algún mensaje legítimo es marcado, puedes añadir al remitente a la lista blanca.' },
      { q: '¿Qué tan rápido es el análisis?', a: 'Menos de 1 segundo. Los mensajes se analizan en tiempo real — no notarás ningún retraso.' },
      { q: '¿Funciona para todos los idiomas?', a: 'Sí. FraudAI detecta patrones de estafa en español, inglés, rumano, portugués, francés, árabe y más.' },
      { q: '¿Puedo ver qué fue bloqueado?', a: 'Sí. Tu panel muestra un registro de cuarentena con todos los mensajes bloqueados y por qué fueron marcados.' },
      { q: '¿Qué pasa cuando aparece un nuevo tipo de estafa?', a: 'FraudAI aprende continuamente. Nuestra IA se actualiza diariamente con nuevos patrones de amenazas.' }
    ],

    ctaTitle: 'Detén Las Estafas Hoy',
    ctaSubtitle: 'FraudAI Shield está incluido gratis en cada plan CatyAI.',
    ctaButton: 'Protégete Ahora',

    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo Funciona', pricing: 'Precios', faq: 'FAQ', login: 'Entrar', getStarted: 'Empezar Gratis' },
    footer: {
      tagline: 'IA que protege tu negocio.',
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
  }
}

function LanguageSelector({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false)
  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'ro', flag: '🇷🇴', name: 'RO' },
    { code: 'es', flag: '🇪🇸', name: 'ES' }
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
              className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-[#1a2744] ${lang === l.code ? 'text-red-400' : 'text-gray-300'}`}>
              <span>{l.flag}</span> {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FraudAI() {
  const [lang, setLang] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateLang = () => {
      const stored = localStorage.getItem('caty-lang')
      if (stored && translations[stored]) setLang(stored)
      else {
        const browserLang = navigator.language?.slice(0, 2)
        if (translations[browserLang]) setLang(browserLang)
      }
    }
    updateLang()
    const interval = setInterval(updateLang, 500)
    return () => clearInterval(interval)
  }, [])

  const t = translations[lang] || translations.en

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.fs-stack-card')
      const total = cards.length
      cards.forEach((card, idx) => {
        const inner = card.querySelector('.fs-stack-inner')
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

  const fsCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');

.fs-stack-card {
  position: sticky; top: 10vh; margin-bottom: 20vh;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem 1.5rem; isolation: isolate; will-change: transform;
}
.fs-stack-card::before {
  content: ''; position: absolute; inset: 1rem; border-radius: 28px;
  background: radial-gradient(ellipse at 50% 50%, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 40%, transparent 75%);
  filter: blur(40px); opacity: 0.6; z-index: -1; pointer-events: none;
}
.fs-stack-inner {
  width: 100%; max-width: 1100px; border-radius: 28px;
  background: linear-gradient(180deg, rgba(10,27,61,0.97) 0%, rgba(1,10,31,0.99) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02) inset;
  padding: 4rem 3.5rem; backdrop-filter: blur(30px);
  transform-origin: 50% 0%; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  position: relative; overflow: hidden;
}
.fs-stack-inner::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(239,68,68,0.35), transparent);
}
.fs-stack-card[data-index="0"] .fs-stack-inner { transform: scale(1); }
.fs-stack-card[data-index="1"] .fs-stack-inner { transform: scale(0.97); }
.fs-stack-card[data-index="2"] .fs-stack-inner { transform: scale(0.94); }
.fs-stack-card[data-index="3"] .fs-stack-inner { transform: scale(0.91); }
.fs-stack-inner h3 {
  font-family: 'Playfair Display', Georgia, serif; font-style: italic;
  font-size: clamp(2.2rem,4.5vw,4rem); font-weight: 700; letter-spacing: -0.04em;
  line-height: 0.95; max-width: 50%; color: #f8fafc;
}
.fs-tag {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.9rem; border-radius: 999px;
  background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.22);
  color: #fca5a5; font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem;
}
.fs-tagline { font-size: clamp(1rem,1.5vw,1.35rem); color: #C8A165; font-weight: 500; margin-top: 1rem; margin-bottom: 1.25rem; font-family: 'Inter', sans-serif; }
.fs-body { font-size: 1.05rem; color: #94a3b8; line-height: 1.65; max-width: 90%; font-family: 'Inter', sans-serif; }
.fs-pill {
  display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.5rem;
  padding: 0.75rem 1rem; border-radius: 10px;
  background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.18);
  font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #fca5a5;
}
@media (max-width: 768px) {
  .fs-stack-inner { padding: 2rem; border-radius: 20px; }
  .fs-stack-card { padding: 1rem; margin-bottom: 10vh; }
  .fs-stack-inner h3 { max-width: 100%; font-size: 2rem; }
  .fs-body { max-width: 100%; }
}
`

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <style dangerouslySetInnerHTML={{ __html: fsCss }} />
      <SEO
        title="FraudAI Shield | CatyAI - AI Scam Protection for WhatsApp"
        description="8 AI detection modules block phishing, scams, and fraud on WhatsApp in real-time. 99.2% accuracy, <1 second analysis. Included FREE with CatyAI."
        url="https://catyai.io/fraud-shield"
        service={{
          name: 'FraudAI Shield',
          description: '8 AI detection modules that block phishing, scams, impersonation, and fraud on WhatsApp in real-time. 99.2% accuracy, analysis under 1 second.',
          price: '0',
          features: ['Link Scanner', 'Urgency Detector', 'Impersonation Shield', 'OTP Guard', 'Pattern Analyzer', 'Reputation Check', 'Language Forensics', 'Behavior Analysis']
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-[#1a2744]/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src="/images/caty-logo.png" alt="CatyAI" className="h-10" width="40" height="40" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">{t.nav.home}</Link>
              <a href="#modules" className="text-gray-300 hover:text-white transition-colors">{t.nav.features}</a>
              <a href="#how" className="text-gray-300 hover:text-white transition-colors">{t.nav.howItWorks}</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">{t.nav.faq}</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector lang={lang} setLang={setLang} />
              <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white">{t.nav.login}</a>
              <a href="https://app.catyai.io/signup" className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90">{t.nav.getStarted}</a>
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
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#1a2744]/50">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-300 hover:text-white">{t.nav.home}</Link>
                <a href="#modules" className="text-gray-300 hover:text-white">{t.nav.features}</a>
                <a href="#how" className="text-gray-300 hover:text-white">{t.nav.howItWorks}</a>
                <a href="#faq" className="text-gray-300 hover:text-white">{t.nav.faq}</a>
                <a href="https://app.catyai.io/signup" className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl text-center">{t.nav.getStarted}</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-red-950/20 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {t.heroTitle1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">{t.heroTitle2}</span>
              </h1>

              <p className="text-gray-400 text-xl mb-8 leading-relaxed">{t.heroSubtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://app.catyai.io/signup" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  {t.heroCta}
                </a>
                <a href="#how" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A1628]/50 text-white font-semibold text-lg rounded-2xl border border-[#1a2744] hover:bg-[#1a2744]/50 transition-all">
                  {t.heroCtaSecondary}
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                {[t.trustBadge1, t.trustBadge2, t.trustBadge3].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Shield Visual */}
            <div className="relative mx-auto">
              <div className="w-72 h-72 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full"></div>
                <div className="absolute inset-8 bg-[#010A1F] rounded-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                {/* Floating threat indicators */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">BLOCKED</div>
                <div className="absolute top-1/4 -left-8 bg-[#0A1628] border border-red-500/50 px-2 py-1 rounded text-xs text-red-400">🔗 Phishing</div>
                <div className="absolute top-1/2 -right-8 bg-[#0A1628] border border-red-500/50 px-2 py-1 rounded text-xs text-red-400">💸 Scam</div>
                <div className="absolute bottom-1/4 -left-4 bg-[#0A1628] border border-red-500/50 px-2 py-1 rounded text-xs text-red-400">🎭 Fake</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
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
          <p className="text-xl text-red-400 font-semibold">{t.problemSolution}</p>
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
              <div key={i} className="flex items-start gap-6 p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-3xl flex-shrink-0">{step.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-red-500 text-white font-bold flex items-center justify-center text-sm">{i + 1}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Modules — stacking cards */}
      <section id="modules" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#010A1F' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="fs-tag" style={{ display: 'inline-flex' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              {t.modulesTitle}
            </span>
          </div>
          <div className="text-center mb-20">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, color: '#f8fafc', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              {t.modulesSubtitle.split(' ').slice(0, Math.ceil(t.modulesSubtitle.split(' ').length / 2)).join(' ')}{' '}
              <span style={{ background: 'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {t.modulesSubtitle.split(' ').slice(Math.ceil(t.modulesSubtitle.split(' ').length / 2)).join(' ')}
              </span>
            </h2>
          </div>
        </div>

        {/* Card 0 — Phishing Links */}
        <div className="fs-stack-card" data-index="0">
          <div className="fs-stack-inner">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="fs-tag">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  {t.modules[0].icon} {t.modules[0].title}
                </span>
                <h3>{t.modules[0].title}</h3>
                <p className="fs-tagline">{t.modules[0].stats}</p>
                <p className="fs-body">{t.modules[0].desc}</p>
                <div className="fs-pill">
                  <span style={{ color: '#64748b' }}>scan</span> domain · ssl · redirect-chain
                </div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', background: 'rgba(0,0,0,0.45)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', color: '#64748b' }}>
                <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// url scan results</div>
                {[
                  { url: 'paypa1.security-alert.xyz', risk: 'BLOCKED', color: '#ef4444' },
                  { url: 'g00gle-verify.com/login',  risk: 'BLOCKED', color: '#ef4444' },
                  { url: 'bank-secure-msg.tk',       risk: 'BLOCKED', color: '#ef4444' },
                  { url: 'shop.catyai.io/checkout',  risk: 'SAFE',    color: '#a3e635' },
                  { url: 'docs.google.com/forms',    risk: 'SAFE',    color: '#a3e635' },
                ].map(({ url, risk, color }) => (
                  <div key={url} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.73rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>{url}</span>
                    <span style={{ color, fontSize: '0.65rem', fontWeight: 700, flexShrink: 0, marginLeft: '0.5rem' }}>{risk}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                  {[['12k+', 'domains'], ['<50ms', 'check'], ['100%', 'auto']].map(([v, l]) => (
                    <div key={l} style={{ flex: 1, textAlign: 'center', padding: '0.5rem', background: 'rgba(239,68,68,0.05)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.15)' }}>
                      <div style={{ color: '#fca5a5', fontSize: '1rem', fontWeight: 700 }}>{v}</div>
                      <div style={{ color: '#475569', fontSize: '0.65rem' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 1 — Financial Scams */}
        <div className="fs-stack-card" data-index="1">
          <div className="fs-stack-inner">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <span className="fs-tag">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
                  {t.modules[1].icon} {t.modules[1].title}
                </span>
                <h3>{t.modules[1].title}</h3>
                <p className="fs-tagline">{t.modules[1].stats}</p>
                <p className="fs-body">{t.modules[1].desc}</p>
                <div className="fs-pill">
                  <span style={{ color: '#64748b' }}>patterns</span> matched in real-time
                </div>
              </div>
              <div className="md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { pattern: '"urgent transfer required"',   score: 97, color: '#ef4444' },
                  { pattern: '"guaranteed 300% returns"',    score: 94, color: '#ef4444' },
                  { pattern: '"crypto opportunity limited"', score: 91, color: '#f97316' },
                  { pattern: '"send fee to release funds"',  score: 89, color: '#f97316' },
                  { pattern: '"you have won a prize"',       score: 85, color: '#eab308' },
                ].map(({ pattern, score, color }) => (
                  <div key={pattern} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: "'JetBrains Mono',monospace" }}>
                    <div style={{ flex: 1, padding: '0.55rem 0.9rem', background: 'rgba(0,0,0,0.4)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.72rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pattern}</div>
                    <div style={{ width: 40, textAlign: 'right', fontSize: '0.72rem', color, fontWeight: 700, flexShrink: 0 }}>{score}%</div>
                  </div>
                ))}
                <div style={{ marginTop: '0.5rem', padding: '0.6rem 1rem', background: 'rgba(239,68,68,0.05)', borderRadius: 10, border: '1px solid rgba(239,68,68,0.12)', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: '#94a3b8' }}>
                  <span style={{ color: '#ef4444' }}>ACTION</span>: auto-quarantine · sender flagged · admin notified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Impersonation Attacks */}
        <div className="fs-stack-card" data-index="2">
          <div className="fs-stack-inner">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="fs-tag">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  {t.modules[2].icon} {t.modules[2].title}
                </span>
                <h3>{t.modules[2].title}</h3>
                <p className="fs-tagline">{t.modules[2].stats}</p>
                <p className="fs-body">{t.modules[2].desc}</p>
                <div className="fs-pill">
                  <span style={{ color: '#64748b' }}>identity</span> verified in &lt;1s
                </div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { entity: 'BCR Bank Romania',     result: 'IMPOSTOR', color: '#ef4444', detail: 'spoofed number +40xxx' },
                  { entity: 'DHL Courier',           result: 'IMPOSTOR', color: '#ef4444', detail: 'fake tracking link' },
                  { entity: 'Your CEO / Manager',    result: 'IMPOSTOR', color: '#f97316', detail: 'display name match' },
                  { entity: 'CatyAI Support',        result: 'VERIFIED', color: '#a3e635', detail: 'official number' },
                ].map(({ entity, result, color, detail }) => (
                  <div key={entity} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1rem', background: 'rgba(0,0,0,0.4)', borderRadius: 10, border: `1px solid ${color}22` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#e2e8f0', fontSize: '0.78rem' }}>{entity}</div>
                      <div style={{ color: '#475569', fontSize: '0.65rem', marginTop: 2 }}>{detail}</div>
                    </div>
                    <span style={{ color, fontSize: '0.65rem', fontWeight: 700, flexShrink: 0 }}>{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 — Data Harvesting + Fake Urgency */}
        <div className="fs-stack-card" data-index="3">
          <div className="fs-stack-inner">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <span className="fs-tag">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  {t.modules[3].icon} {t.modules[3].title} · {t.modules[7].icon} {t.modules[7].title}
                </span>
                <h3>{t.modules[7].title}</h3>
                <p className="fs-tagline">{t.modules[3].stats}</p>
                <p className="fs-body">{t.modules[7].desc}</p>
                <div className="fs-pill">
                  <span style={{ color: '#64748b' }}>shield</span> active · 0 data leaked
                </div>
              </div>
              <div className="md:order-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', background: 'rgba(0,0,0,0.45)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem' }}>
                <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>// live threat log</div>
                {[
                  { time: '14:23:01', type: 'DATA_HARVEST',  msg: 'SSN request blocked',      severity: 'CRITICAL' },
                  { time: '14:22:47', type: 'FAKE_URGENCY',  msg: '"respond in 5 min" tactic', severity: 'HIGH' },
                  { time: '14:21:33', type: 'DATA_HARVEST',  msg: 'credit card prompt blocked', severity: 'CRITICAL' },
                  { time: '14:20:15', type: 'SPAM',          msg: 'mass broadcast detected',   severity: 'MEDIUM' },
                  { time: '14:19:58', type: 'FAKE_URGENCY',  msg: '"account closure" pressure', severity: 'HIGH' },
                ].map(({ time, type, msg, severity }) => (
                  <div key={time + msg} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#334155', flexShrink: 0, fontSize: '0.65rem' }}>{time}</span>
                    <span style={{ color: severity === 'CRITICAL' ? '#ef4444' : severity === 'HIGH' ? '#f97316' : '#eab308', flexShrink: 0, fontSize: '0.65rem', width: 55 }}>{severity}</span>
                    <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{msg}</span>
                  </div>
                ))}
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a3e635', display: 'inline-block', boxShadow: '0 0 6px #a3e635' }} />
                  <span style={{ color: '#475569', fontSize: '0.68rem' }}>shield active · all threats quarantined</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.comparisonTitle}</h2>
          <div className="bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 overflow-hidden">
            <div className="grid grid-cols-3 bg-[#0A1628]/50 p-4">
              <div className="text-gray-400 font-medium"></div>
              <div className="text-center text-gray-400 font-medium">Without</div>
              <div className="text-center text-red-400 font-bold">With FraudAI</div>
            </div>
            {t.comparisonItems.map((item, i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-t border-[#1a2744]/50">
                <div className="text-gray-300">{item.feature}</div>
                <div className="text-center text-gray-400">{item.without}</div>
                <div className="text-center text-red-400 font-semibold">{item.with}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.useCasesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => (
              <div key={i} className="p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 text-center">
                <div className="text-4xl mb-4">{uc.icon}</div>
                <h3 className="text-white font-semibold mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">{t.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.map((test, i) => (
              <div key={i} className="p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50">
                <p className="text-gray-300 italic mb-4">"{test.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">{test.author[0]}</div>
                  <div>
                    <div className="text-white font-semibold">{test.author}</div>
                    <div className="text-gray-400 text-sm">{test.role}</div>
                  </div>
                </div>
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
              <details key={i} className="group p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-red-950/30 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-8">{t.ctaSubtitle}</p>
          <a href="https://app.catyai.io/signup" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            {t.ctaButton}
          </a>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
