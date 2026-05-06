import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'

const translations = {
  en: {
    badge: 'No Website Needed',
    heroTitle1: 'No website?',
    heroTitle2: 'No problem.',
    heroSubtitle: 'Connect your WhatsApp in 2 minutes. Caty responds to your customers instantly. Perfect for small businesses, freelancers, and local services.',
    heroCta: 'Connect WhatsApp Now',
    heroCtaSecondary: 'See How It Works',
    trustBadge1: 'Only €10/month',
    trustBadge2: 'No technical skills',
    trustBadge3: 'Setup in 2 minutes',
    problemTitle: 'You Have Customers.',
    problemHighlight: "They Can't Find You.",
    problemStats: [
      { value: '73%', label: 'of customers prefer WhatsApp over calling' },
      { value: '45%', label: 'of small businesses have no online presence' },
      { value: '€10', label: 'per month — all inclusive' },
    ],
    problemSolution: 'Your WhatsApp becomes your 24/7 business front desk.',
    howTitle: 'How It Works',
    howSubtitle: 'Live in 2 minutes. No website. No app to install. No technical skills.',
    howSteps: [
      { title: 'Scan QR Code', desc: 'Just like WhatsApp Web. Uses your existing business number. No new number needed.', step: '01' },
      { title: 'Tell Caty About Your Business', desc: 'Services you offer, your prices, working hours, location. Voice or text — takes 5 minutes.', step: '02' },
      { title: "You're Live", desc: 'Caty responds to customers 24/7. Books appointments. Sends quotes. You focus on your work.', step: '03' },
    ],
    benefitsTitle: 'Everything You Need.',
    benefitsHighlight: "Nothing You Don't.",
    benefits: [
      { title: 'Instant Customer Response', desc: 'Customers message your WhatsApp, Caty responds instantly. No more missed messages while you are working.', highlight: '24/7' },
      { title: 'Automatic Appointments', desc: 'Caty books appointments directly into your calendar. Sends reminders. Handles rescheduling.', highlight: 'Google Calendar' },
      { title: 'Quotes in Seconds', desc: 'Customer asks for a price? Caty generates a professional PDF quote and sends it right away.', highlight: 'PDF Quotes' },
      { title: 'Scam Protection', desc: 'FraudAI Shield blocks phishing links, fake urgency scams, and suspicious requests before you see them.', highlight: 'Protected' },
      { title: 'Multi-Language', desc: 'Caty speaks Romanian, English, Spanish, Portuguese, French, and Arabic. Auto-detects customer language.', highlight: '6 Languages' },
      { title: 'Business Insights', desc: 'See what customers ask most, peak hours, and missed opportunities. Grow smarter.', highlight: 'Analytics' },
    ],
    useCasesTitle: 'Perfect For',
    useCasesSubtitle: "Small businesses and freelancers who don't need a website — just customers.",
    useCases: [
      { title: 'Hair Stylists', desc: 'Book appointments while you cut. Never miss a client.' },
      { title: 'Mechanics', desc: 'Receive repair requests. Send quotes. Confirm pickups.' },
      { title: 'Electricians & Plumbers', desc: 'Get job requests 24/7. Schedule visits automatically.' },
      { title: 'Dentists', desc: 'Book checkups. Send reminders. Handle emergencies.' },
      { title: 'Personal Trainers', desc: 'Schedule sessions. Answer fitness questions. Grow your client base.' },
      { title: 'Photographers', desc: 'Book shoots. Share packages. Confirm dates.' },
      { title: 'Cleaning Services', desc: 'Receive bookings. Send confirmations. Manage schedules.' },
      { title: 'Driving Instructors', desc: 'Book lessons. Send reminders. Handle cancellations.' },
    ],
    comparisonTitle: 'Website vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Setup time', website: '2-4 weeks', caty: '2 minutes' },
      { feature: 'Cost', website: '€500-5,000', caty: '€10/month' },
      { feature: 'Technical skills', website: 'Required', caty: 'None' },
      { feature: 'Customer response', website: 'You manually', caty: '24/7 AI' },
      { feature: 'Appointments', website: 'External tool', caty: 'Built-in' },
      { feature: 'Maintenance', website: 'Ongoing', caty: 'Zero' },
    ],
    comparisonHeaderTraditional: 'Traditional Website',
    comparisonHeaderCaty: 'WhatsApp + Caty',
    pricingTitle: 'Simple Pricing',
    pricingSubtitle: 'One plan. Everything included. Cancel anytime.',
    plan: {
      name: 'WhatsApp AI',
      price: '€10',
      period: '/month',
      desc: 'Everything you need to run your business on WhatsApp.',
      features: [
        '500 conversations / month',
        '24/7 AI responses',
        'Google Calendar sync',
        'PDF quotes & invoices',
        'FraudAI protection',
        'Multi-language support',
      ],
      cta: 'Get Started',
    },
    faqTitle: 'Questions?',
    faqs: [
      { q: 'Do I really not need a website?', a: 'Correct. Your WhatsApp number becomes your business contact. Customers message you there, Caty responds.' },
      { q: "What if Caty can't answer something?", a: 'Caty forwards the conversation to you with full context. You take over seamlessly.' },
      { q: "Will customers know it's AI?", a: 'Only if you want them to. Caty can respond as your business, with your name and style.' },
      { q: 'Can I use my existing WhatsApp number?', a: 'Yes. Caty connects to your existing business WhatsApp. No new number needed.' },
      { q: 'What languages does Caty speak?', a: "Romanian, English, Spanish, Portuguese, French, and Arabic. Auto-detects and responds in customer's language." },
      { q: 'How do I cancel?', a: 'Cancel anytime from your dashboard. No contracts, no penalties.' },
    ],
    ctaTitle: 'Ready in 2 Minutes',
    ctaSubtitle: 'Scan. Setup. Start receiving customers.',
    ctaButton: 'Connect WhatsApp Now',
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
      { value: '€10', label: 'pe lună — totul inclus' },
    ],
    problemSolution: 'WhatsApp-ul tău devine recepția ta 24/7.',
    howTitle: 'Cum Funcționează',
    howSubtitle: 'Live în 2 minute. Fără site. Fără aplicație. Fără cunoștințe tehnice.',
    howSteps: [
      { title: 'Scanează Codul QR', desc: 'Ca la WhatsApp Web. Folosești numărul tău de business. Nu ai nevoie de număr nou.', step: '01' },
      { title: 'Spune-i lui Caty Despre Afacere', desc: 'Servicii, prețuri, program, locație. Vocal sau text — durează 5 minute.', step: '02' },
      { title: 'Ești Live', desc: 'Caty răspunde clienților 24/7. Programează întâlniri. Trimite oferte. Tu te concentrezi pe muncă.', step: '03' },
    ],
    benefitsTitle: 'Tot Ce Ai Nevoie.',
    benefitsHighlight: 'Nimic în Plus.',
    benefits: [
      { title: 'Răspuns Instant', desc: 'Clienții îți scriu pe WhatsApp, Caty răspunde instant. Nu mai pierzi mesaje în timp ce lucrezi.', highlight: '24/7' },
      { title: 'Programări Automate', desc: 'Caty programează întâlnirile direct în calendarul tău. Trimite remindere. Gestionează reprogramările.', highlight: 'Google Calendar' },
      { title: 'Oferte în Secunde', desc: 'Clientul întreabă de preț? Caty generează o ofertă PDF profesională și o trimite instant.', highlight: 'PDF' },
      { title: 'Protecție Anti-Fraudă', desc: 'FraudAI Shield blochează link-uri phishing, mesaje false urgente și cereri suspecte.', highlight: 'Protejat' },
      { title: 'Multi-Limbă', desc: 'Caty vorbește română, engleză, spaniolă, portugheză, franceză și arabă. Detectează automat limba.', highlight: '6 Limbi' },
      { title: 'Statistici Business', desc: 'Vezi ce întreabă clienții cel mai des, orele de vârf și oportunitățile ratate.', highlight: 'Analytics' },
    ],
    useCasesTitle: 'Perfect Pentru',
    useCasesSubtitle: 'Afaceri mici și freelanceri care nu au nevoie de site — doar de clienți.',
    useCases: [
      { title: 'Frizeri', desc: 'Programezi în timp ce tunzi. Nu mai pierzi clienți.' },
      { title: 'Mecanici', desc: 'Primești cereri de reparații. Trimiți oferte.' },
      { title: 'Electricieni & Instalatori', desc: 'Primești cereri 24/7. Programezi vizite automat.' },
      { title: 'Stomatologi', desc: 'Programezi controale. Trimiți remindere.' },
      { title: 'Antrenori Personali', desc: 'Programezi sesiuni. Răspunzi la întrebări.' },
      { title: 'Fotografi', desc: 'Programezi ședințe. Confirmi date.' },
      { title: 'Servicii Curățenie', desc: 'Primești rezervări. Trimiți confirmări.' },
      { title: 'Instructori Auto', desc: 'Programezi lecții. Trimiți remindere.' },
    ],
    comparisonTitle: 'Site Web vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Timp setup', website: '2-4 săptămâni', caty: '2 minute' },
      { feature: 'Cost', website: '€500-5,000', caty: '€10/lună' },
      { feature: 'Cunoștințe tehnice', website: 'Necesare', caty: 'Zero' },
      { feature: 'Răspuns clienți', website: 'Tu manual', caty: 'AI 24/7' },
      { feature: 'Programări', website: 'Tool extern', caty: 'Incluse' },
      { feature: 'Întreținere', website: 'Continuă', caty: 'Zero' },
    ],
    comparisonHeaderTraditional: 'Site Tradițional',
    comparisonHeaderCaty: 'WhatsApp + Caty',
    pricingTitle: 'Preț Simplu',
    pricingSubtitle: 'Un singur plan. Totul inclus. Anulezi oricând.',
    plan: {
      name: 'WhatsApp AI',
      price: '€10',
      period: '/lună',
      desc: 'Tot ce ai nevoie pentru a-ți gestiona afacerea pe WhatsApp.',
      features: [
        '500 conversații / lună',
        'Răspunsuri AI 24/7',
        'Sync Google Calendar',
        'Oferte & facturi PDF',
        'Protecție FraudAI',
        'Suport multi-limbă',
      ],
      cta: 'Începe Acum',
    },
    faqTitle: 'Întrebări?',
    faqs: [
      { q: 'Chiar nu am nevoie de site?', a: 'Corect. Numărul tău de WhatsApp devine contactul afacerii. Clienții îți scriu acolo, Caty răspunde.' },
      { q: 'Ce se întâmplă dacă Caty nu poate răspunde?', a: 'Caty îți trimite conversația cu tot contextul. Preiei fără probleme.' },
      { q: 'Vor ști clienții că e AI?', a: 'Doar dacă vrei tu. Caty poate răspunde ca afacerea ta, cu numele și stilul tău.' },
      { q: 'Pot folosi numărul meu de WhatsApp?', a: 'Da. Caty se conectează la WhatsApp-ul tău de business. Nu ai nevoie de număr nou.' },
      { q: 'Ce limbi vorbește Caty?', a: 'Română, engleză, spaniolă, portugheză, franceză și arabă. Detectează automat limba.' },
      { q: 'Cum anulez?', a: 'Anulezi oricând din dashboard. Fără contracte, fără penalități.' },
    ],
    ctaTitle: 'Gata în 2 Minute',
    ctaSubtitle: 'Scanează. Configurează. Începe să primești clienți.',
    ctaButton: 'Conectează WhatsApp Acum',
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
      { value: '€10', label: 'al mes — todo incluido' },
    ],
    problemSolution: 'Tu WhatsApp se convierte en tu recepción 24/7.',
    howTitle: 'Cómo Funciona',
    howSubtitle: 'En vivo en 2 minutos. Sin web. Sin app. Sin conocimientos técnicos.',
    howSteps: [
      { title: 'Escanea el QR', desc: 'Como WhatsApp Web. Usa tu número de negocio existente.', step: '01' },
      { title: 'Cuéntale a Caty Tu Negocio', desc: 'Servicios, precios, horarios, ubicación. Voz o texto — toma 5 minutos.', step: '02' },
      { title: '¡Estás En Vivo!', desc: 'Caty responde a clientes 24/7. Agenda citas. Envía presupuestos.', step: '03' },
    ],
    benefitsTitle: 'Todo Lo Que Necesitas.',
    benefitsHighlight: 'Nada Más.',
    benefits: [
      { title: 'Respuesta Instantánea', desc: 'Los clientes te escriben en WhatsApp, Caty responde al instante.', highlight: '24/7' },
      { title: 'Citas Automáticas', desc: 'Caty agenda citas directamente en tu calendario.', highlight: 'Google Calendar' },
      { title: 'Presupuestos en Segundos', desc: '¿El cliente pregunta precio? Caty genera un PDF profesional.', highlight: 'PDF' },
      { title: 'Protección Anti-Fraude', desc: 'FraudAI Shield bloquea phishing y mensajes sospechosos.', highlight: 'Protegido' },
      { title: 'Multi-Idioma', desc: 'Caty habla español, inglés, rumano, portugués, francés y árabe.', highlight: '6 Idiomas' },
      { title: 'Estadísticas', desc: 'Ve qué preguntan más los clientes y las horas pico.', highlight: 'Analytics' },
    ],
    useCasesTitle: 'Perfecto Para',
    useCasesSubtitle: 'Pequeños negocios y freelancers que no necesitan web — solo clientes.',
    useCases: [
      { title: 'Peluqueros', desc: 'Agenda citas mientras cortas. Nunca pierdas un cliente.' },
      { title: 'Mecánicos', desc: 'Recibe solicitudes de reparación. Envía presupuestos.' },
      { title: 'Electricistas', desc: 'Recibe trabajos 24/7. Programa visitas automáticamente.' },
      { title: 'Dentistas', desc: 'Agenda chequeos. Envía recordatorios.' },
      { title: 'Entrenadores', desc: 'Programa sesiones. Responde preguntas.' },
      { title: 'Fotógrafos', desc: 'Agenda sesiones. Confirma fechas.' },
      { title: 'Limpieza', desc: 'Recibe reservas. Envía confirmaciones.' },
      { title: 'Instructores', desc: 'Programa clases. Envía recordatorios.' },
    ],
    comparisonTitle: 'Sitio Web vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Tiempo setup', website: '2-4 semanas', caty: '2 minutos' },
      { feature: 'Costo', website: '€500-5,000', caty: '€10/mes' },
      { feature: 'Conocimientos técnicos', website: 'Necesarios', caty: 'Ninguno' },
      { feature: 'Respuesta clientes', website: 'Tú manualmente', caty: 'AI 24/7' },
      { feature: 'Citas', website: 'Herramienta externa', caty: 'Incluidas' },
      { feature: 'Mantenimiento', website: 'Continuo', caty: 'Cero' },
    ],
    comparisonHeaderTraditional: 'Sitio Tradicional',
    comparisonHeaderCaty: 'WhatsApp + Caty',
    pricingTitle: 'Precio Simple',
    pricingSubtitle: 'Un solo plan. Todo incluido. Cancela cuando quieras.',
    plan: {
      name: 'WhatsApp AI',
      price: '€10',
      period: '/mes',
      desc: 'Todo lo que necesitas para gestionar tu negocio en WhatsApp.',
      features: [
        '500 conversaciones / mes',
        'Respuestas AI 24/7',
        'Google Calendar sync',
        'Presupuestos PDF',
        'Protección FraudAI',
        'Soporte multiidioma',
      ],
      cta: 'Empezar Ahora',
    },
    faqTitle: '¿Preguntas?',
    faqs: [
      { q: '¿Realmente no necesito sitio web?', a: 'Correcto. Tu WhatsApp se convierte en el contacto de tu negocio.' },
      { q: '¿Qué pasa si Caty no puede responder?', a: 'Caty te envía la conversación con todo el contexto.' },
      { q: '¿Sabrán los clientes que es IA?', a: 'Solo si tú quieres. Caty puede responder como tu negocio.' },
      { q: '¿Puedo usar mi número de WhatsApp?', a: 'Sí. Caty se conecta a tu WhatsApp de negocio existente.' },
      { q: '¿Qué idiomas habla Caty?', a: 'Español, inglés, rumano, portugués, francés y árabe.' },
      { q: '¿Cómo cancelo?', a: 'Cancela cuando quieras desde tu panel. Sin contratos.' },
    ],
    ctaTitle: 'Listo en 2 Minutos',
    ctaSubtitle: 'Escanea. Configura. Empieza a recibir clientes.',
    ctaButton: 'Conectar WhatsApp Ahora',
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
      { value: '€10', label: 'por mês — tudo incluído' },
    ],
    problemSolution: 'O seu WhatsApp torna-se a sua recepção 24/7.',
    howTitle: 'Como Funciona',
    howSubtitle: 'Ao vivo em 2 minutos. Sem site. Sem app. Sem conhecimentos técnicos.',
    howSteps: [
      { title: 'Digitalize o QR', desc: 'Como no WhatsApp Web. Use o seu número de negócio existente.', step: '01' },
      { title: 'Conte à Caty Sobre o Negócio', desc: 'Serviços, preços, horários, localização. Voz ou texto — leva 5 minutos.', step: '02' },
      { title: 'Está Online!', desc: 'Caty responde aos clientes 24/7. Marca consultas. Envia orçamentos.', step: '03' },
    ],
    benefitsTitle: 'Tudo O Que Precisa.',
    benefitsHighlight: 'Nada Mais.',
    benefits: [
      { title: 'Resposta Instantânea', desc: 'Os clientes escrevem no WhatsApp, Caty responde instantaneamente.', highlight: '24/7' },
      { title: 'Marcações Automáticas', desc: 'Caty marca consultas diretamente no seu calendário.', highlight: 'Google Calendar' },
      { title: 'Orçamentos em Segundos', desc: 'O cliente pergunta o preço? Caty gera um PDF profissional.', highlight: 'PDF' },
      { title: 'Proteção Anti-Fraude', desc: 'FraudAI Shield bloqueia phishing e mensagens suspeitas.', highlight: 'Protegido' },
      { title: 'Multi-Idioma', desc: 'Caty fala português, inglês, espanhol, romeno, francês e árabe.', highlight: '6 Idiomas' },
      { title: 'Estatísticas', desc: 'Veja o que os clientes mais perguntam e as horas de pico.', highlight: 'Analytics' },
    ],
    useCasesTitle: 'Perfeito Para',
    useCasesSubtitle: 'Pequenos negócios e freelancers que não precisam de site — apenas de clientes.',
    useCases: [
      { title: 'Cabeleireiros', desc: 'Marque consultas enquanto corta. Nunca perca um cliente.' },
      { title: 'Mecânicos', desc: 'Receba pedidos de reparação. Envie orçamentos.' },
      { title: 'Eletricistas', desc: 'Receba trabalhos 24/7. Agende visitas automaticamente.' },
      { title: 'Dentistas', desc: 'Marque consultas. Envie lembretes.' },
      { title: 'Personal Trainers', desc: 'Agende sessões. Responda perguntas.' },
      { title: 'Fotógrafos', desc: 'Agende sessões. Confirme datas.' },
      { title: 'Limpezas', desc: 'Receba reservas. Envie confirmações.' },
      { title: 'Instrutores', desc: 'Agende aulas. Envie lembretes.' },
    ],
    comparisonTitle: 'Website vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Tempo setup', website: '2-4 semanas', caty: '2 minutos' },
      { feature: 'Custo', website: '€500-5,000', caty: '€10/mês' },
      { feature: 'Conhecimentos técnicos', website: 'Necessários', caty: 'Nenhum' },
      { feature: 'Resposta clientes', website: 'Você manualmente', caty: 'AI 24/7' },
      { feature: 'Marcações', website: 'Ferramenta externa', caty: 'Incluídas' },
      { feature: 'Manutenção', website: 'Contínua', caty: 'Zero' },
    ],
    comparisonHeaderTraditional: 'Site Tradicional',
    comparisonHeaderCaty: 'WhatsApp + Caty',
    pricingTitle: 'Preço Simples',
    pricingSubtitle: 'Um só plano. Tudo incluído. Cancele quando quiser.',
    plan: {
      name: 'WhatsApp AI',
      price: '€10',
      period: '/mês',
      desc: 'Tudo o que precisa para gerir o seu negócio no WhatsApp.',
      features: [
        '500 conversas / mês',
        'Respostas AI 24/7',
        'Google Calendar sync',
        'Orçamentos PDF',
        'Proteção FraudAI',
        'Suporte multi-idioma',
      ],
      cta: 'Começar Agora',
    },
    faqTitle: 'Perguntas?',
    faqs: [
      { q: 'Realmente não preciso de site?', a: 'Correto. O seu WhatsApp torna-se o contacto do seu negócio.' },
      { q: 'E se Caty não conseguir responder?', a: 'Caty envia-lhe a conversa com todo o contexto.' },
      { q: 'Os clientes saberão que é IA?', a: 'Só se você quiser. Caty pode responder como o seu negócio.' },
      { q: 'Posso usar o meu número de WhatsApp?', a: 'Sim. Caty conecta-se ao seu WhatsApp de negócio existente.' },
      { q: 'Que idiomas fala Caty?', a: 'Português, inglês, espanhol, romeno, francês e árabe.' },
      { q: 'Como cancelo?', a: 'Cancele quando quiser no seu painel. Sem contratos.' },
    ],
    ctaTitle: 'Pronto em 2 Minutos',
    ctaSubtitle: 'Digitalize. Configure. Comece a receber clientes.',
    ctaButton: 'Conectar WhatsApp Agora',
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
      { value: '45%', label: "des petites entreprises n'ont pas de présence en ligne" },
      { value: '€10', label: 'par mois — tout inclus' },
    ],
    problemSolution: 'Votre WhatsApp devient votre réception 24/7.',
    howTitle: 'Comment Ça Marche',
    howSubtitle: "En ligne en 2 minutes. Pas de site. Pas d'app. Pas de compétences techniques.",
    howSteps: [
      { title: 'Scannez le QR', desc: 'Comme WhatsApp Web. Utilisez votre numéro professionnel existant.', step: '01' },
      { title: "Parlez de Votre Entreprise à Caty", desc: 'Services, prix, horaires, emplacement. Voix ou texte — prend 5 minutes.', step: '02' },
      { title: 'Vous Êtes En Ligne!', desc: 'Caty répond aux clients 24/7. Prend des rendez-vous. Envoie des devis.', step: '03' },
    ],
    benefitsTitle: 'Tout Ce Dont Vous Avez Besoin.',
    benefitsHighlight: 'Rien de Plus.',
    benefits: [
      { title: 'Réponse Instantanée', desc: 'Les clients vous écrivent sur WhatsApp, Caty répond instantanément.', highlight: '24/7' },
      { title: 'Rendez-vous Automatiques', desc: 'Caty prend les rendez-vous directement dans votre calendrier.', highlight: 'Google Calendar' },
      { title: 'Devis en Secondes', desc: 'Le client demande un prix? Caty génère un PDF professionnel.', highlight: 'PDF' },
      { title: 'Protection Anti-Fraude', desc: 'FraudAI Shield bloque le phishing et les messages suspects.', highlight: 'Protégé' },
      { title: 'Multi-Langue', desc: 'Caty parle français, anglais, espagnol, portugais, roumain et arabe.', highlight: '6 Langues' },
      { title: 'Statistiques', desc: 'Voyez ce que les clients demandent le plus et les heures de pointe.', highlight: 'Analytics' },
    ],
    useCasesTitle: 'Parfait Pour',
    useCasesSubtitle: "Petites entreprises et freelances qui n'ont pas besoin de site — juste de clients.",
    useCases: [
      { title: 'Coiffeurs', desc: 'Prenez des rendez-vous pendant que vous coupez.' },
      { title: 'Mécaniciens', desc: 'Recevez des demandes de réparation. Envoyez des devis.' },
      { title: 'Électriciens', desc: 'Recevez des travaux 24/7. Planifiez les visites.' },
      { title: 'Dentistes', desc: 'Prenez des rendez-vous. Envoyez des rappels.' },
      { title: 'Coachs Sportifs', desc: 'Planifiez des séances. Répondez aux questions.' },
      { title: 'Photographes', desc: 'Planifiez des séances. Confirmez les dates.' },
      { title: 'Nettoyage', desc: 'Recevez des réservations. Envoyez des confirmations.' },
      { title: 'Moniteurs', desc: 'Planifiez des leçons. Envoyez des rappels.' },
    ],
    comparisonTitle: 'Site Web vs. WhatsApp + Caty',
    comparisonItems: [
      { feature: 'Temps setup', website: '2-4 semaines', caty: '2 minutes' },
      { feature: 'Coût', website: '€500-5,000', caty: '€10/mois' },
      { feature: 'Compétences techniques', website: 'Nécessaires', caty: 'Aucune' },
      { feature: 'Réponse clients', website: 'Vous manuellement', caty: 'IA 24/7' },
      { feature: 'Rendez-vous', website: 'Outil externe', caty: 'Inclus' },
      { feature: 'Maintenance', website: 'Continue', caty: 'Zéro' },
    ],
    comparisonHeaderTraditional: 'Site Traditionnel',
    comparisonHeaderCaty: 'WhatsApp + Caty',
    pricingTitle: 'Prix Simple',
    pricingSubtitle: 'Un seul plan. Tout inclus. Annulez quand vous voulez.',
    plan: {
      name: 'WhatsApp AI',
      price: '€10',
      period: '/mois',
      desc: 'Tout ce dont vous avez besoin pour gérer votre entreprise sur WhatsApp.',
      features: [
        '500 conversations / mois',
        'Réponses IA 24/7',
        'Google Calendar sync',
        'Devis PDF',
        'Protection FraudAI',
        'Support multi-langue',
      ],
      cta: 'Commencer Maintenant',
    },
    faqTitle: 'Questions?',
    faqs: [
      { q: "Je n'ai vraiment pas besoin de site?", a: 'Correct. Votre WhatsApp devient le contact de votre entreprise.' },
      { q: 'Et si Caty ne peut pas répondre?', a: 'Caty vous envoie la conversation avec tout le contexte.' },
      { q: "Les clients sauront que c'est une IA?", a: 'Seulement si vous le voulez. Caty peut répondre comme votre entreprise.' },
      { q: 'Puis-je utiliser mon numéro WhatsApp?', a: 'Oui. Caty se connecte à votre WhatsApp professionnel existant.' },
      { q: 'Quelles langues parle Caty?', a: 'Français, anglais, espagnol, portugais, roumain et arabe.' },
      { q: "Comment j'annule?", a: 'Annulez quand vous voulez depuis votre tableau de bord. Sans contrat.' },
    ],
    ctaTitle: 'Prêt en 2 Minutes',
    ctaSubtitle: 'Scannez. Configurez. Commencez à recevoir des clients.',
    ctaButton: 'Connecter WhatsApp Maintenant',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CatyAI WhatsApp AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '10',
    priceCurrency: 'EUR',
    description: 'WhatsApp AI for businesses without a website',
  },
}

export default function NoWebsite() {
  const [lang, setLang] = useState('en')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && translations[saved]) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  const t = translations[lang] || translations.en

  return (
    <>
      <SEO
        title="No Website? No Problem. WhatsApp AI for Small Business | CatyAI"
        description="Connect WhatsApp in 2 minutes. Caty responds 24/7, books appointments, sends quotes. €10/month. No website, no app, no technical skills required."
        canonical="https://catyai.io/no-website"
        jsonLd={jsonLd}
      />
      <GlobalHeader lang={lang} setLang={setLang} />
      <style>{`
        .nws-page { background: #010A1F; min-height: 100vh; color: #f1f5f9; }

        /* Hero */
        .nws-hero {
          padding: 8rem 1.5rem 5rem;
          text-align: center;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .nws-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,161,101,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .nws-hero-inner { position: relative; max-width: 880px; margin: 0 auto; }
        .nws-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.25);
          color: #C8A165;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.45rem 1rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }
        .nws-hero h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 6vw, 5rem);
          color: #f1f5f9;
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .nws-hero h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 6vw, 5rem);
          color: #C8A165;
          line-height: 1.02;
          letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
        }
        .nws-hero-sub {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 2.25rem;
          line-height: 1.7;
        }
        .nws-cta-row {
          display: flex;
          gap: 0.85rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .nws-cta-primary {
          background: #C8A165;
          color: #010A1F;
          padding: 0.95rem 1.75rem;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: transform 0.18s, box-shadow 0.18s;
          display: inline-block;
        }
        .nws-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,161,101,0.28); }
        .nws-cta-secondary {
          background: transparent;
          color: #f1f5f9;
          border: 1px solid rgba(255,255,255,0.18);
          padding: 0.95rem 1.75rem;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: border-color 0.18s, background 0.18s;
          display: inline-block;
        }
        .nws-cta-secondary:hover { border-color: rgba(200,161,101,0.5); background: rgba(200,161,101,0.05); }
        .nws-trust-row {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nws-trust-pill {
          font-size: 0.78rem;
          color: #94a3b8;
          padding: 0.35rem 0.85rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
        }

        /* Section base */
        .nws-section { padding: 5rem 1.5rem; }
        .nws-container { max-width: 1100px; margin: 0 auto; }
        .nws-section-head { text-align: center; margin-bottom: 3.5rem; }
        .nws-section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          color: #f1f5f9;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1rem;
        }
        .nws-section-title .nws-gold { color: #C8A165; display: block; }
        .nws-section-sub {
          font-size: 1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Stats */
        .nws-stats-section { padding: 4rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nws-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 960px;
          margin: 0 auto;
        }
        @media (max-width: 720px) { .nws-stats-grid { grid-template-columns: 1fr; } }
        .nws-stat { text-align: center; padding: 1.5rem; }
        .nws-stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: #C8A165;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 0.75rem;
        }
        .nws-stat-label { color: #94a3b8; font-size: 0.92rem; line-height: 1.5; }
        .nws-problem-solution {
          text-align: center;
          margin-top: 3rem;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.2rem, 2.2vw, 1.6rem);
          color: #f1f5f9;
        }

        /* How it works */
        .nws-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 880px) { .nws-steps { grid-template-columns: 1fr; } }
        .nws-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 2rem 1.75rem;
          position: relative;
          transition: border-color 0.2s, transform 0.2s;
        }
        .nws-step:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-3px); }
        .nws-step-num {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 0.85rem;
          color: #C8A165;
          letter-spacing: 0.18em;
          margin-bottom: 1.25rem;
        }
        .nws-step-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: #f1f5f9;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }
        .nws-step-desc { color: #94a3b8; font-size: 0.92rem; line-height: 1.65; margin: 0; }

        /* Benefits */
        .nws-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 980px) { .nws-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .nws-benefits-grid { grid-template-columns: 1fr; } }
        .nws-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
          transition: border-color 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .nws-card:hover { border-color: rgba(200,161,101,0.25); transform: translateY(-2px); }
        .nws-card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #f1f5f9;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .nws-card-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin: 0; flex: 1; }
        .nws-pill {
          align-self: flex-start;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.25);
          color: #C8A165;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 100px;
        }

        /* Use cases */
        .nws-cases-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 980px) { .nws-cases-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .nws-cases-grid { grid-template-columns: 1fr; } }
        .nws-case {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.4rem;
          transition: border-color 0.2s;
        }
        .nws-case:hover { border-color: rgba(200,161,101,0.25); }
        .nws-case-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #f1f5f9;
          margin: 0 0 0.4rem;
        }
        .nws-case-desc { color: #94a3b8; font-size: 0.85rem; line-height: 1.55; margin: 0; }

        /* Comparison */
        .nws-compare {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        .nws-compare-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 0.92rem;
        }
        .nws-compare-row:last-child { border-bottom: 0; }
        .nws-compare-head {
          background: rgba(200,161,101,0.04);
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .nws-compare-head .nws-caty { color: #C8A165; }
        .nws-compare-feature { color: #cbd5e1; font-weight: 500; }
        .nws-compare-website { color: #94a3b8; }
        .nws-compare-caty { color: #f1f5f9; font-weight: 600; }
        @media (max-width: 600px) {
          .nws-compare-row { grid-template-columns: 1fr; gap: 0.25rem; padding: 1rem 1.25rem; }
          .nws-compare-website::before { content: 'Traditional: '; color: #64748b; font-size: 0.78rem; }
          .nws-compare-caty::before { content: 'Caty: '; color: #C8A165; font-size: 0.78rem; }
        }

        /* Pricing */
        .nws-plan-wrap { max-width: 460px; margin: 0 auto; }
        .nws-plan {
          background: rgba(200,161,101,0.06);
          border: 1px solid rgba(200,161,101,0.35);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: left;
          box-shadow: 0 0 60px rgba(200,161,101,0.07);
        }
        .nws-plan-name {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.75rem;
        }
        .nws-plan-price {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 3.5rem;
          color: #f1f5f9;
          line-height: 1;
          letter-spacing: -0.04em;
          display: inline-block;
        }
        .nws-plan-period { font-size: 1rem; color: #94a3b8; margin-left: 0.4rem; }
        .nws-plan-desc {
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 1.25rem 0 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .nws-plan-features { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 0.7rem; }
        .nws-plan-features li {
          display: flex; align-items: flex-start; gap: 0.6rem;
          font-size: 0.92rem; color: #cbd5e1; line-height: 1.5;
        }
        .nws-plan-features li::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
          flex-shrink: 0;
        }
        .nws-plan-cta {
          display: block;
          text-align: center;
          background: #C8A165;
          color: #010A1F;
          padding: 0.95rem 1.5rem;
          border-radius: 100px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .nws-plan-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,161,101,0.28); }

        /* FAQ */
        .nws-faqs { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.75rem; }
        .nws-faq {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .nws-faq.open { border-color: rgba(200,161,101,0.3); }
        .nws-faq-q {
          width: 100%;
          background: transparent;
          border: 0;
          color: #f1f5f9;
          padding: 1.15rem 1.4rem;
          text-align: left;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.98rem;
          letter-spacing: -0.005em;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .nws-faq-icon { color: #C8A165; font-size: 1.4rem; line-height: 1; transition: transform 0.2s; flex-shrink: 0; }
        .nws-faq.open .nws-faq-icon { transform: rotate(45deg); }
        .nws-faq-a {
          padding: 0 1.4rem 1.25rem;
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.7;
        }

        /* Final CTA */
        .nws-final {
          padding: 6rem 1.5rem;
          text-align: center;
          background: linear-gradient(180deg, #010A1F 0%, #030D26 100%);
          position: relative;
          overflow: hidden;
        }
        .nws-final::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 60% at 50% 100%, rgba(200,161,101,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .nws-final-inner { position: relative; max-width: 720px; margin: 0 auto; }
        .nws-final h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          color: #f1f5f9;
          letter-spacing: -0.025em;
          margin: 0 0 1rem;
        }
        .nws-final p { color: #94a3b8; font-size: 1.05rem; margin: 0 0 2rem; }
      `}</style>

      <main className="nws-page">
        {/* Hero */}
        <section className="nws-hero">
          <div className="nws-hero-inner">
            <span className="nws-badge">{t.badge}</span>
            <h1>{t.heroTitle1}</h1>
            <h2>{t.heroTitle2}</h2>
            <p className="nws-hero-sub">{t.heroSubtitle}</p>
            <div className="nws-cta-row">
              <a href="https://app.catyai.io/register?plan=whatsapp" className="nws-cta-primary">{t.heroCta}</a>
              <a href="#how" className="nws-cta-secondary">{t.heroCtaSecondary}</a>
            </div>
            <div className="nws-trust-row">
              <span className="nws-trust-pill">{t.trustBadge1}</span>
              <span className="nws-trust-pill">{t.trustBadge2}</span>
              <span className="nws-trust-pill">{t.trustBadge3}</span>
            </div>
          </div>
        </section>

        {/* Stats / problem */}
        <section className="nws-stats-section">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">
                {t.problemTitle}
                <span className="nws-gold">{t.problemHighlight}</span>
              </h2>
            </div>
            <div className="nws-stats-grid">
              {t.problemStats.map((s, i) => (
                <div key={i} className="nws-stat">
                  <div className="nws-stat-value">{s.value}</div>
                  <div className="nws-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="nws-problem-solution">{t.problemSolution}</p>
          </div>
        </section>

        {/* How it works */}
        <section className="nws-section" id="how">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">{t.howTitle}</h2>
              <p className="nws-section-sub">{t.howSubtitle}</p>
            </div>
            <div className="nws-steps">
              {t.howSteps.map((s, i) => (
                <div key={i} className="nws-step">
                  <div className="nws-step-num">STEP {s.step}</div>
                  <h3 className="nws-step-title">{s.title}</h3>
                  <p className="nws-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="nws-section" id="benefits">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">
                {t.benefitsTitle}
                <span className="nws-gold">{t.benefitsHighlight}</span>
              </h2>
            </div>
            <div className="nws-benefits-grid">
              {t.benefits.map((b, i) => (
                <article key={i} className="nws-card">
                  <span className="nws-pill">{b.highlight}</span>
                  <h3 className="nws-card-title">{b.title}</h3>
                  <p className="nws-card-desc">{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="nws-section">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">{t.useCasesTitle}</h2>
              <p className="nws-section-sub">{t.useCasesSubtitle}</p>
            </div>
            <div className="nws-cases-grid">
              {t.useCases.map((c, i) => (
                <div key={i} className="nws-case">
                  <h3 className="nws-case-title">{c.title}</h3>
                  <p className="nws-case-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="nws-section">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">{t.comparisonTitle}</h2>
            </div>
            <div className="nws-compare">
              <div className="nws-compare-row nws-compare-head">
                <div>&nbsp;</div>
                <div>{t.comparisonHeaderTraditional}</div>
                <div className="nws-caty">{t.comparisonHeaderCaty}</div>
              </div>
              {t.comparisonItems.map((c, i) => (
                <div key={i} className="nws-compare-row">
                  <div className="nws-compare-feature">{c.feature}</div>
                  <div className="nws-compare-website">{c.website}</div>
                  <div className="nws-compare-caty">{c.caty}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="nws-section" id="pricing">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">{t.pricingTitle}</h2>
              <p className="nws-section-sub">{t.pricingSubtitle}</p>
            </div>
            <div className="nws-plan-wrap">
              <div className="nws-plan">
                <div className="nws-plan-name">{t.plan.name}</div>
                <div>
                  <span className="nws-plan-price">{t.plan.price}</span>
                  <span className="nws-plan-period">{t.plan.period}</span>
                </div>
                <p className="nws-plan-desc">{t.plan.desc}</p>
                <ul className="nws-plan-features">
                  {t.plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <a href="https://app.catyai.io/register?plan=whatsapp" className="nws-plan-cta">{t.plan.cta}</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="nws-section" id="faq">
          <div className="nws-container">
            <div className="nws-section-head">
              <h2 className="nws-section-title">{t.faqTitle}</h2>
            </div>
            <div className="nws-faqs">
              {t.faqs.map((f, i) => (
                <div key={i} className={`nws-faq ${openFaq === i ? 'open' : ''}`}>
                  <button
                    className="nws-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{f.q}</span>
                    <span className="nws-faq-icon">+</span>
                  </button>
                  {openFaq === i && <div className="nws-faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="nws-final">
          <div className="nws-final-inner">
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaSubtitle}</p>
            <a href="https://app.catyai.io/register?plan=whatsapp" className="nws-cta-primary">{t.ctaButton}</a>
          </div>
        </section>
      </main>
      <FooterV9 lang={lang} />
    </>
  )
}
