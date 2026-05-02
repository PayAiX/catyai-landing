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
    howTitle: 'How It Works',
    howSubtitle: 'Live in 2 minutes. No website. No app to install. No technical skills.',
    howSteps: [
      { title: 'Scan QR Code', desc: 'Just like WhatsApp Web. Uses your existing business number. No new number needed.', num: '1' },
      { title: 'Tell Caty About Your Business', desc: 'Services, prices, working hours, location. Voice or text — takes 5 minutes.', num: '2' },
      { title: "You're Live!", desc: 'Caty responds to customers 24/7. Books appointments. Sends quotes. You focus on your work.', num: '3' }
    ],
    useCasesTitle: 'Built For Your Business',
    useCasesSubtitle: 'Small businesses and freelancers who just need customers.',
    useCases: [
      { tag: 'Use Case 01 · Beauty', title: 'Hair Stylists', tagline: 'Book appointments while you cut.', body: 'Caty answers new clients instantly while you work. Books slots, checks availability, sends confirmation — all over WhatsApp. Never miss a booking again.', note: 'Setup in 2 min · Works with your existing number · No app needed', customer: 'Hi! Do you have availability tomorrow at 3pm?', reply: "Hello! Yes, we have a slot at 3:00 PM tomorrow. What service would you like? ✂️", reply2: "Booking confirmed for tomorrow at 3 PM! I'll send you a reminder in the morning. 📅" },
      { tag: 'Use Case 02 · Trades', title: 'Mechanics & Plumbers', tagline: 'Repair requests. Quotes. Confirmations.', body: 'Receive repair requests 24/7, quote automatically based on your price list, confirm pickups and site visits — without stopping your work on site.', note: 'Auto-quotes · Location sharing · Calendar sync', customer: 'My car is making a strange noise. Can you check it?', reply: "Of course! We can schedule a check for tomorrow. What type of car? 🔧", reply2: "Appointment confirmed for Wednesday at 10 AM. Our address is 42 Main St. 📍" },
      { tag: 'Use Case 03 · Fitness', title: 'Trainers & Coaches', tagline: 'Turn inquiries into paying clients.', body: 'Potential clients ask about prices, packages, schedules. Caty answers instantly and converts them before they check a competitor. Session booking, payment links, reminders — automated.', note: 'Session booking · Payment links · Progress reminders', customer: 'I want to start training. What packages do you offer?', reply: "Great! We have 3 packages: 4 sessions/month €120, 8 sessions €200, unlimited €280. 💪", reply2: "Perfect! I've booked your first session for Monday at 7 AM. See you then! 🏋️" }
    ],
    testimonialsTitle: 'What They Say',
    testimonials: [
      { quote: 'I connected in 2 minutes. Now Caty books my appointments while I work on cars.', author: 'Andrei M.', role: 'Auto Mechanic, Bucharest' },
      { quote: 'No website, no problem. My clients message on WhatsApp and Caty handles everything.', author: 'Maria P.', role: 'Hair Stylist, Cluj' },
      { quote: 'I was skeptical about AI but it speaks Romanian perfectly. My clients love it.', author: 'Ion T.', role: 'Plumber, Iași' }
    ],
    pricingTitle: 'Simple Pricing',
    pricingSubtitle: 'One plan. Everything included.',
    planName: 'WhatsApp AI',
    planPrice: '€10',
    planPeriod: '/month',
    planDesc: 'Everything you need to grow',
    planFeatures: ['500 conversations/month', '24/7 AI responses', 'Google Calendar sync', 'PDF quotes & invoices', 'FraudAI protection', 'Multi-language (6 languages)', '2-minute setup'],
    planCta: 'Get Started Free',
    faqTitle: 'Questions?',
    faqs: [
      { q: 'Do I really not need a website?', a: 'Correct. Your WhatsApp number becomes your business contact. Customers message you there, Caty responds instantly.' },
      { q: "What if Caty can't answer something?", a: 'Caty forwards the conversation to you with full context. You take over seamlessly.' },
      { q: "Will customers know it's AI?", a: 'Only if you want them to. Caty can respond as your business, with your name and style.' },
      { q: 'Can I use my existing WhatsApp number?', a: 'Yes! Caty connects to your existing business WhatsApp. No new number needed.' },
      { q: 'What languages does Caty speak?', a: 'Romanian, English, Spanish, Portuguese, French, and Arabic. Auto-detects and responds in the customer language.' },
      { q: 'How do I cancel?', a: 'Cancel anytime from your dashboard. No contracts, no penalties.' }
    ],
    ctaTitle: 'Ready in 2 Minutes',
    ctaSubtitle: 'Scan. Setup. Start receiving customers.',
    ctaButton: 'Connect WhatsApp Now',
    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Get Started' },
    footer: { tagline: 'AI that works for your business.', product: 'Product', company: 'Company', legal: 'Legal', features: 'Features', pricing: 'Pricing', whatsapp: 'WhatsApp AI', about: 'About', blog: 'Blog', contact: 'Contact', privacy: 'Privacy', terms: 'Terms', gdpr: 'GDPR', copyright: '© 2025 PayAi-X FZE. All rights reserved.' }
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
    howTitle: 'Cum Funcționează',
    howSubtitle: 'Live în 2 minute. Fără site. Fără aplicație. Fără cunoștințe tehnice.',
    howSteps: [
      { title: 'Scanează Codul QR', desc: 'Ca la WhatsApp Web. Folosești numărul tău de business. Nu ai nevoie de număr nou.', num: '1' },
      { title: 'Spune-i lui Caty Despre Afacerea Ta', desc: 'Servicii, prețuri, program, locație. Vocal sau text — durează 5 minute.', num: '2' },
      { title: 'Ești Live!', desc: 'Caty răspunde clienților 24/7. Programează întâlniri. Trimite oferte. Tu te concentrezi pe muncă.', num: '3' }
    ],
    useCasesTitle: 'Construit Pentru Afacerea Ta',
    useCasesSubtitle: 'Afaceri mici și freelanceri care au nevoie doar de clienți.',
    useCases: [
      { tag: 'Caz 01 · Beauty', title: 'Frizeri & Stilisti', tagline: 'Programări în timp ce tunzi.', body: 'Caty răspunde clienților noi instant cât timp tu lucrezi. Rezervă locuri, verifică disponibilitatea, trimite confirmare — totul pe WhatsApp. Nu mai pierzi nicio programare.', note: 'Setup în 2 min · Număr existent · Fără aplicație nouă', customer: 'Bună! Aveți loc mâine la ora 15:00?', reply: 'Bună! Da, avem loc la 15:00 mâine. Ce serviciu doriți? ✂️', reply2: 'Programare confirmată pentru mâine la 15:00! Îți trimit reminder dimineața. 📅' },
      { tag: 'Caz 02 · Meserii', title: 'Mecanici & Instalatori', tagline: 'Cereri. Oferte. Confirmări.', body: 'Primești cereri 24/7, trimiți oferte automat pe baza listei tale de prețuri, confirmi vizite și ridicări — fără să te oprești din lucru.', note: 'Oferte automate · Locație · Sync calendar', customer: 'Mașina mea face un zgomot ciudat. Puteți verifica?', reply: 'Sigur! Putem programa o verificare mâine. Ce tip de mașină aveți? 🔧', reply2: 'Programare confirmată miercuri la 10:00. Adresa noastră: Str. Principală 42. 📍' },
      { tag: 'Caz 03 · Fitness', title: 'Antrenori Personali', tagline: 'Transformă întrebările în clienți plătitori.', body: 'Potențialii clienți întreabă despre prețuri, pachete, program. Caty răspunde instant și îi convertește înainte să caute altundeva. Rezervări, linkuri plată, reminder-uri — automatizat.', note: 'Rezervări ședințe · Linkuri plată · Reminder-uri', customer: 'Vreau să încep antrenamentele. Ce pachete aveți?', reply: 'Super! Avem 3 pachete: 4 ședințe/lună €120, 8 ședințe €200, nelimitat €280. 💪', reply2: 'Perfect! Am rezervat prima ședință luni la 7:00. Ne vedem acolo! 🏋️' }
    ],
    testimonialsTitle: 'Ce Spun Ei',
    testimonials: [
      { quote: 'M-am conectat în 2 minute. Acum Caty îmi face programări în timp ce lucrez la mașini.', author: 'Andrei M.', role: 'Mecanic Auto, București' },
      { quote: 'Fără site, fără problemă. Clienții mei scriu pe WhatsApp și Caty se ocupă de tot.', author: 'Maria P.', role: 'Stilist, Cluj' },
      { quote: 'Am fost sceptic cu AI-ul dar vorbește română perfect. Clienții mei adoră.', author: 'Ion T.', role: 'Instalator, Iași' }
    ],
    pricingTitle: 'Preț Simplu',
    pricingSubtitle: 'Un singur plan. Totul inclus.',
    planName: 'WhatsApp AI',
    planPrice: '€10',
    planPeriod: '/lună',
    planDesc: 'Tot ce ai nevoie să crești',
    planFeatures: ['500 conversații/lună', 'Răspunsuri AI 24/7', 'Sync Google Calendar', 'Oferte & facturi PDF', 'Protecție FraudAI', 'Multi-limbă (6 limbi)', 'Setup în 2 minute'],
    planCta: 'Începe Gratuit',
    faqTitle: 'Întrebări?',
    faqs: [
      { q: 'Chiar nu am nevoie de site?', a: 'Corect. Numărul tău de WhatsApp devine contactul afacerii. Clienții îți scriu acolo, Caty răspunde instant.' },
      { q: 'Ce se întâmplă dacă Caty nu poate răspunde?', a: 'Caty îți trimite conversația cu tot contextul. Preiei fără probleme.' },
      { q: 'Vor ști clienții că e AI?', a: 'Doar dacă vrei tu. Caty poate răspunde ca afacerea ta, cu numele și stilul tău.' },
      { q: 'Pot folosi numărul meu de WhatsApp?', a: 'Da! Caty se conectează la WhatsApp-ul tău de business. Nu ai nevoie de număr nou.' },
      { q: 'Ce limbi vorbește Caty?', a: 'Română, engleză, spaniolă, portugheză, franceză și arabă. Detectează automat și răspunde în limba clientului.' },
      { q: 'Cum anulez?', a: 'Anulezi oricând din dashboard. Fără contracte, fără penalități.' }
    ],
    ctaTitle: 'Gata în 2 Minute',
    ctaSubtitle: 'Scanează. Configurează. Începe să primești clienți.',
    ctaButton: 'Conectează WhatsApp Acum',
    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Acum' },
    footer: { tagline: 'AI care lucrează pentru afacerea ta.', product: 'Produs', company: 'Companie', legal: 'Legal', features: 'Funcții', pricing: 'Prețuri', whatsapp: 'WhatsApp AI', about: 'Despre', blog: 'Blog', contact: 'Contact', privacy: 'Confidențialitate', terms: 'Termeni', gdpr: 'GDPR', copyright: '© 2025 PayAi-X FZE. Toate drepturile rezervate.' }
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
    howTitle: 'Cómo Funciona',
    howSubtitle: 'En vivo en 2 minutos. Sin web. Sin app. Sin conocimientos técnicos.',
    howSteps: [
      { title: 'Escanea el Código QR', desc: 'Como WhatsApp Web. Usa tu número de negocio existente. No necesitas número nuevo.', num: '1' },
      { title: 'Cuéntale a Caty Tu Negocio', desc: 'Servicios, precios, horarios, ubicación. Voz o texto — toma 5 minutos.', num: '2' },
      { title: '¡Estás En Vivo!', desc: 'Caty responde a clientes 24/7. Agenda citas. Envía presupuestos. Tú te enfocas en tu trabajo.', num: '3' }
    ],
    useCasesTitle: 'Construido Para Tu Negocio',
    useCasesSubtitle: 'Pequeños negocios y freelancers que solo necesitan clientes.',
    useCases: [
      { tag: 'Caso 01 · Belleza', title: 'Peluqueros & Estilistas', tagline: 'Citas mientras cortas.', body: 'Caty responde a nuevos clientes al instante mientras trabajas. Reserva turnos, verifica disponibilidad, envía confirmación — todo por WhatsApp. Nunca pierdas una reserva.', note: 'Setup en 2 min · Tu número existente · Sin app nueva', customer: '¡Hola! ¿Tienen disponibilidad mañana a las 3pm?', reply: '¡Hola! Sí, tenemos lugar a las 3:00 PM mañana. ¿Qué servicio desea? ✂️', reply2: '¡Reserva confirmada para mañana a las 3 PM! Te enviaré un recordatorio. 📅' },
      { tag: 'Caso 02 · Oficios', title: 'Mecánicos & Fontaneros', tagline: 'Solicitudes. Presupuestos. Confirmaciones.', body: 'Recibe solicitudes 24/7, envía presupuestos automáticos según tu lista de precios, confirma visitas y recogidas — sin parar tu trabajo en el sitio.', note: 'Presupuestos auto · Ubicación · Sync calendario', customer: 'Mi coche hace un ruido extraño. ¿Pueden revisarlo?', reply: '¡Claro! Podemos programar una revisión mañana. ¿Qué tipo de coche? 🔧', reply2: 'Cita confirmada el miércoles a las 10:00. Nuestra dirección: Calle Principal 42. 📍' },
      { tag: 'Caso 03 · Fitness', title: 'Entrenadores Personales', tagline: 'Convierte consultas en clientes de pago.', body: 'Los clientes potenciales preguntan por precios, paquetes, horarios. Caty responde al instante y los convierte antes de que consulten a un competidor.', note: 'Reserva sesiones · Links de pago · Recordatorios', customer: 'Quiero empezar a entrenar. ¿Qué paquetes tienen?', reply: '¡Genial! Tenemos 3 paquetes: 4 sesiones/mes €120, 8 sesiones €200, ilimitado €280. 💪', reply2: '¡Perfecto! He reservado tu primera sesión el lunes a las 7:00. ¡Nos vemos! 🏋️' }
    ],
    testimonialsTitle: 'Lo Que Dicen',
    testimonials: [
      { quote: 'Me conecté en 2 minutos. Ahora Caty agenda mis citas mientras trabajo.', author: 'Carlos M.', role: 'Mecánico, Madrid' },
      { quote: 'Sin web, sin problema. Mis clientes escriben en WhatsApp y Caty maneja todo.', author: 'María P.', role: 'Estilista, Barcelona' },
      { quote: 'Era escéptico con la IA pero habla español perfectamente. Mis clientes la aman.', author: 'Juan T.', role: 'Fontanero, Valencia' }
    ],
    pricingTitle: 'Precio Simple',
    pricingSubtitle: 'Un solo plan. Todo incluido.',
    planName: 'WhatsApp AI',
    planPrice: '€10',
    planPeriod: '/mes',
    planDesc: 'Todo lo que necesitas para crecer',
    planFeatures: ['500 conversaciones/mes', 'Respuestas AI 24/7', 'Google Calendar sync', 'Presupuestos PDF', 'Protección FraudAI', 'Multi-idioma (6 idiomas)', 'Setup en 2 minutos'],
    planCta: 'Empezar Gratis',
    faqTitle: '¿Preguntas?',
    faqs: [
      { q: '¿Realmente no necesito sitio web?', a: 'Correcto. Tu WhatsApp se convierte en el contacto de tu negocio. Los clientes te escriben allí, Caty responde.' },
      { q: '¿Qué pasa si Caty no puede responder?', a: 'Caty te envía la conversación con todo el contexto. Tomas el control sin problemas.' },
      { q: '¿Sabrán los clientes que es IA?', a: 'Solo si tú quieres. Caty puede responder como tu negocio, con tu nombre y estilo.' },
      { q: '¿Puedo usar mi número de WhatsApp?', a: '¡Sí! Caty se conecta a tu WhatsApp de negocio existente.' },
      { q: '¿Qué idiomas habla Caty?', a: 'Español, inglés, rumano, portugués, francés y árabe. Detecta automáticamente el idioma.' },
      { q: '¿Cómo cancelo?', a: 'Cancela cuando quieras desde tu panel. Sin contratos.' }
    ],
    ctaTitle: 'Listo en 2 Minutos',
    ctaSubtitle: 'Escanea. Configura. Empieza a recibir clientes.',
    ctaButton: 'Conectar WhatsApp Ahora',
    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo Funciona', pricing: 'Precios', faq: 'FAQ', login: 'Entrar', getStarted: 'Empezar Ahora' },
    footer: { tagline: 'IA que trabaja para tu negocio.', product: 'Producto', company: 'Empresa', legal: 'Legal', features: 'Funciones', pricing: 'Precios', whatsapp: 'WhatsApp AI', about: 'Nosotros', blog: 'Blog', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos', gdpr: 'GDPR', copyright: '© 2025 PayAi-X FZE. Todos los derechos reservados.' }
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
    howTitle: 'Como Funciona',
    howSubtitle: 'Ao vivo em 2 minutos. Sem site. Sem app. Sem conhecimentos técnicos.',
    howSteps: [
      { title: 'Digitalize o Código QR', desc: 'Como no WhatsApp Web. Use o seu número de negócio existente. Não precisa de número novo.', num: '1' },
      { title: 'Conte à Caty Sobre o Seu Negócio', desc: 'Serviços, preços, horários, localização. Voz ou texto — leva 5 minutos.', num: '2' },
      { title: 'Está Online!', desc: 'Caty responde aos clientes 24/7. Marca consultas. Envia orçamentos. Você foca no seu trabalho.', num: '3' }
    ],
    useCasesTitle: 'Construído Para o Seu Negócio',
    useCasesSubtitle: 'Pequenos negócios e freelancers que precisam apenas de clientes.',
    useCases: [
      { tag: 'Caso 01 · Beleza', title: 'Cabeleireiros & Esteticistas', tagline: 'Marcações enquanto trabalha.', body: 'Caty responde a novos clientes instantaneamente enquanto trabalha. Reserva slots, verifica disponibilidade, envia confirmação — tudo pelo WhatsApp. Nunca perca uma marcação.', note: 'Setup em 2 min · Número existente · Sem nova app', customer: 'Olá! Têm disponibilidade amanhã às 15h?', reply: 'Olá! Sim, temos lugar às 15:00 de amanhã. Que serviço deseja? ✂️', reply2: 'Marcação confirmada para amanhã às 15:00! Envio lembrete de manhã. 📅' },
      { tag: 'Caso 02 · Ofícios', title: 'Mecânicos & Canalizadores', tagline: 'Pedidos. Orçamentos. Confirmações.', body: 'Receba pedidos 24/7, faça orçamentos automáticos com base na sua lista de preços, confirme visitas e recolhas — sem parar o trabalho no local.', note: 'Orçamentos auto · Localização · Sync calendário', customer: 'O meu carro faz um barulho estranho. Podem verificar?', reply: 'Claro! Podemos agendar uma verificação amanhã. Que tipo de carro? 🔧', reply2: 'Consulta confirmada para quarta às 10:00. Morada: Rua Principal 42. 📍' },
      { tag: 'Caso 03 · Fitness', title: 'Personal Trainers', tagline: 'Transforme consultas em clientes pagantes.', body: 'Potenciais clientes perguntam sobre preços, pacotes, horários. Caty responde instantaneamente e converte-os antes de consultarem um concorrente.', note: 'Reserva sessões · Links pagamento · Lembretes', customer: 'Quero começar a treinar. Que pacotes têm?', reply: 'Ótimo! Temos 3 pacotes: 4 sessões/mês €120, 8 sessões €200, ilimitado €280. 💪', reply2: 'Perfeito! Reservei a sua primeira sessão segunda às 7:00. Até lá! 🏋️' }
    ],
    testimonialsTitle: 'O Que Dizem',
    testimonials: [
      { quote: 'Conectei em 2 minutos. Agora Caty marca as minhas consultas enquanto trabalho.', author: 'Carlos M.', role: 'Mecânico, Lisboa' },
      { quote: 'Sem site, sem problema. Os meus clientes escrevem no WhatsApp e Caty trata de tudo.', author: 'Maria P.', role: 'Cabeleireira, Porto' },
      { quote: 'Era cético com IA mas fala português perfeitamente. Os meus clientes adoram.', author: 'João T.', role: 'Canalizador, Coimbra' }
    ],
    pricingTitle: 'Preço Simples',
    pricingSubtitle: 'Um só plano. Tudo incluído.',
    planName: 'WhatsApp AI',
    planPrice: '€10',
    planPeriod: '/mês',
    planDesc: 'Tudo o que precisa para crescer',
    planFeatures: ['500 conversas/mês', 'Respostas AI 24/7', 'Google Calendar sync', 'Orçamentos PDF', 'Proteção FraudAI', 'Multi-idioma (6 idiomas)', 'Setup em 2 minutos'],
    planCta: 'Começar Grátis',
    faqTitle: 'Perguntas?',
    faqs: [
      { q: 'Realmente não preciso de site?', a: 'Correto. O seu WhatsApp torna-se o contacto do seu negócio. Os clientes escrevem, Caty responde.' },
      { q: 'E se Caty não conseguir responder?', a: 'Caty envia-lhe a conversa com todo o contexto. Você assume o controlo facilmente.' },
      { q: 'Os clientes saberão que é IA?', a: 'Só se você quiser. Caty pode responder como o seu negócio, com o seu nome e estilo.' },
      { q: 'Posso usar o meu número de WhatsApp?', a: 'Sim! Caty conecta-se ao seu WhatsApp de negócio existente.' },
      { q: 'Que idiomas fala Caty?', a: 'Português, inglês, espanhol, romeno, francês e árabe. Deteta automaticamente o idioma.' },
      { q: 'Como cancelo?', a: 'Cancele quando quiser no seu painel. Sem contratos.' }
    ],
    ctaTitle: 'Pronto em 2 Minutos',
    ctaSubtitle: 'Digitalize. Configure. Comece a receber clientes.',
    ctaButton: 'Conectar WhatsApp Agora',
    nav: { home: 'Início', features: 'Funcionalidades', howItWorks: 'Como Funciona', pricing: 'Preços', faq: 'FAQ', login: 'Entrar', getStarted: 'Começar Agora' },
    footer: { tagline: 'IA que trabalha para o seu negócio.', product: 'Produto', company: 'Empresa', legal: 'Legal', features: 'Funcionalidades', pricing: 'Preços', whatsapp: 'WhatsApp AI', about: 'Sobre', blog: 'Blog', contact: 'Contacto', privacy: 'Privacidade', terms: 'Termos', gdpr: 'RGPD', copyright: '© 2025 PayAi-X FZE. Todos os direitos reservados.' }
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
    howTitle: 'Comment Ça Marche',
    howSubtitle: 'En ligne en 2 minutes. Sans site. Sans app. Sans compétences techniques.',
    howSteps: [
      { title: 'Scannez le Code QR', desc: 'Comme WhatsApp Web. Utilise votre numéro professionnel existant. Pas besoin de nouveau numéro.', num: '1' },
      { title: 'Parlez à Caty de Votre Business', desc: 'Services, prix, horaires, localisation. Vocal ou texte — prend 5 minutes.', num: '2' },
      { title: "Vous Êtes En Ligne!", desc: 'Caty répond aux clients 24/7. Prend des rendez-vous. Envoie des devis. Vous vous concentrez sur votre travail.', num: '3' }
    ],
    useCasesTitle: 'Construit Pour Votre Business',
    useCasesSubtitle: 'Petites entreprises et freelances qui ont juste besoin de clients.',
    useCases: [
      { tag: 'Cas 01 · Beauté', title: 'Coiffeurs & Esthéticiens', tagline: 'Des rendez-vous pendant que vous travaillez.', body: 'Caty répond aux nouveaux clients instantanément pendant que vous travaillez. Réserve des créneaux, vérifie les disponibilités, envoie la confirmation — tout sur WhatsApp. Ne ratez plus jamais une réservation.', note: 'Setup en 2 min · Votre numéro existant · Sans nouvelle app', customer: 'Bonjour! Avez-vous une disponibilité demain à 15h?', reply: 'Bonjour! Oui, nous avons un créneau à 15h00 demain. Quel service souhaitez-vous? ✂️', reply2: 'Réservation confirmée pour demain à 15h! Je vous enverrai un rappel le matin. 📅' },
      { tag: 'Cas 02 · Métiers', title: 'Mécaniciens & Plombiers', tagline: 'Demandes. Devis. Confirmations.', body: 'Recevez des demandes 24/7, établissez des devis automatiques selon votre tarif, confirmez visites et enlèvements — sans interrompre votre travail sur le chantier.', note: 'Devis auto · Localisation · Sync agenda', customer: 'Ma voiture fait un bruit étrange. Pouvez-vous vérifier?', reply: 'Bien sûr! Nous pouvons prévoir une vérification demain. Quel type de voiture? 🔧', reply2: 'Rendez-vous confirmé mercredi à 10h00. Notre adresse: 42 Rue Principale. 📍' },
      { tag: 'Cas 03 · Fitness', title: 'Coachs Sportifs', tagline: "Transformez les demandes en clients payants.", body: "Les clients potentiels posent des questions sur les prix, les forfaits, les horaires. Caty répond instantanément et les convertit avant qu'ils consultent un concurrent.", note: 'Réservation séances · Liens paiement · Rappels', customer: "Je veux commencer à m'entraîner. Quels forfaits proposez-vous?", reply: 'Super! Nous avons 3 forfaits: 4 séances/mois €120, 8 séances €200, illimité €280. 💪', reply2: "Parfait! J'ai réservé votre première séance lundi à 7h00. À bientôt! 🏋️" }
    ],
    testimonialsTitle: 'Ce Qu\'ils Disent',
    testimonials: [
      { quote: "Je me suis connecté en 2 minutes. Maintenant Caty prend mes rendez-vous pendant que je travaille.", author: 'Pierre M.', role: 'Mécanicien, Paris' },
      { quote: 'Sans site, sans problème. Mes clients écrivent sur WhatsApp et Caty gère tout.', author: 'Sophie P.', role: 'Coiffeuse, Lyon' },
      { quote: "J'étais sceptique avec l'IA mais elle parle français parfaitement. Mes clients adorent.", author: 'Thomas T.', role: 'Plombier, Marseille' }
    ],
    pricingTitle: 'Prix Simple',
    pricingSubtitle: 'Un seul plan. Tout inclus.',
    planName: 'WhatsApp AI',
    planPrice: '€10',
    planPeriod: '/mois',
    planDesc: 'Tout ce dont vous avez besoin pour grandir',
    planFeatures: ['500 conversations/mois', 'Réponses AI 24/7', 'Google Calendar sync', 'Devis PDF', 'Protection FraudAI', 'Multi-langue (6 langues)', 'Setup en 2 minutes'],
    planCta: 'Commencer Gratuitement',
    faqTitle: 'Questions?',
    faqs: [
      { q: "Je n'ai vraiment pas besoin de site web?", a: "Correct. Votre WhatsApp devient le contact de votre entreprise. Les clients vous écrivent là, Caty répond." },
      { q: "Que se passe-t-il si Caty ne peut pas répondre?", a: "Caty vous transfère la conversation avec tout le contexte. Vous prenez le relais facilement." },
      { q: "Les clients sauront-ils que c'est une IA?", a: "Seulement si vous le souhaitez. Caty peut répondre comme votre entreprise, avec votre nom et style." },
      { q: 'Puis-je utiliser mon numéro WhatsApp existant?', a: "Oui! Caty se connecte à votre WhatsApp professionnel existant." },
      { q: 'Quelles langues parle Caty?', a: "Français, anglais, espagnol, portugais, roumain et arabe. Détecte automatiquement la langue." },
      { q: 'Comment annuler?', a: "Annulez quand vous voulez depuis votre tableau de bord. Sans contrat." }
    ],
    ctaTitle: 'Prêt en 2 Minutes',
    ctaSubtitle: 'Scannez. Configurez. Commencez à recevoir des clients.',
    ctaButton: 'Connecter WhatsApp Maintenant',
    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment Ça Marche', pricing: 'Tarifs', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer' },
    footer: { tagline: "IA qui travaille pour votre entreprise.", product: 'Produit', company: 'Entreprise', legal: 'Légal', features: 'Fonctionnalités', pricing: 'Tarifs', whatsapp: 'WhatsApp AI', about: 'À propos', blog: 'Blog', contact: 'Contact', privacy: 'Confidentialité', terms: 'CGU', gdpr: 'RGPD', copyright: '© 2025 PayAi-X FZE. Tous droits réservés.' }
  }
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  :root {
    --gold: #C8A165;
    --gold-light: #D4B57A;
    --gold-dark: #A68246;
    --gold-dark-rgb: 166, 130, 70;
    --navy: #010A1F;
  }

  .nw-body {
    background-color: #010A1F;
    color: #f8fafc;
    font-family: 'Inter', sans-serif;
    background-image:
      radial-gradient(circle at 50% 0%, rgba(200,161,101,0.10) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(56,189,248,0.04) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(200,161,101,0.05) 0%, transparent 50%);
    background-attachment: fixed;
  }

  /* NAV */
  .nw-glass-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    background: rgba(1,10,31,0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  /* BUTTONS */
  .nw-btn-primary {
    background: #C8A165;
    color: #010A1F;
    font-weight: 700;
    transition: all 0.2s ease;
    box-shadow: 0 4px 20px rgba(200,161,101,0.25);
    border-radius: 12px;
    padding: 0.85rem 1.75rem;
    display: inline-flex; align-items: center; justify-content: center;
    text-decoration: none; gap: 0.5rem; font-size: 1rem;
    white-space: nowrap;
  }
  .nw-btn-primary:hover { background: #D4B57A; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,161,101,0.4); }

  .nw-btn-secondary {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.12);
    color: #f8fafc;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 12px;
    padding: 0.85rem 1.75rem;
    display: inline-flex; align-items: center; justify-content: center;
    text-decoration: none; gap: 0.5rem; font-size: 1rem;
    white-space: nowrap;
  }
  .nw-btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(200,161,101,0.3); }

  /* BADGE */
  .nw-badge-glow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 1rem; border-radius: 999px;
    background: rgba(200,161,101,0.10);
    border: 1px solid rgba(200,161,101,0.30);
    box-shadow: 0 0 20px rgba(200,161,101,0.15);
  }
  .nw-badge-ping {
    width: 8px; height: 8px; border-radius: 50%; background: #C8A165;
    box-shadow: 0 0 0 0 rgba(200,161,101,0.4);
    animation: nw-ping 2s cubic-bezier(0,0,0.2,1) infinite;
    flex-shrink: 0;
  }
  @keyframes nw-ping {
    0% { box-shadow: 0 0 0 0 rgba(200,161,101,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(200,161,101,0); }
    100% { box-shadow: 0 0 0 0 rgba(200,161,101,0); }
  }

  /* HERO */
  .nw-hero {
    position: relative; min-height: 92vh;
    display: flex; align-items: center; overflow: hidden;
    padding-top: 5rem; padding-bottom: 3rem;
  }
  .nw-hero-bg-pattern {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      radial-gradient(circle at 80% 30%, rgba(166,130,70,0.20), transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(34,197,94,0.06), transparent 50%);
  }
  .nw-hero-bg-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      linear-gradient(rgba(200,161,101,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,161,101,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }
  .nw-hero-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; font-weight: 400;
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    line-height: 1.05; letter-spacing: -0.02em;
  }
  .nw-hero-title-1 {
    display: block;
    background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .nw-hero-title-2 {
    display: block; position: relative; margin-top: 0.2rem;
    background: linear-gradient(135deg, #D4B57A 0%, #C8A165 40%, #A68246 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .nw-hero-title-2::after {
    content: ''; position: absolute; left: 0; bottom: 0.05em;
    width: 65%; height: 1px;
    background: linear-gradient(90deg, rgba(200,161,101,0.7), transparent);
  }

  /* QR STEPS */
  .nw-qr-step {
    position: relative;
    background: rgba(10,27,61,0.5);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    text-align: center;
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
    overflow: visible;
  }
  .nw-qr-step::after {
    content: ''; position: absolute; inset: -2px; border-radius: inherit;
    background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.18) 0%, rgba(166,130,70,0.08) 30%, transparent 70%);
    filter: blur(24px); opacity: 0.5; z-index: -1;
    pointer-events: none; transition: opacity 0.4s ease, filter 0.4s ease;
  }
  .nw-qr-step:hover::after { opacity: 1; filter: blur(36px); }
  .nw-qr-step:hover { border-color: rgba(200,161,101,0.25); transform: translateY(-4px); }
  .nw-step-number {
    width: 56px; height: 56px; border-radius: 14px;
    background: linear-gradient(135deg, #C8A165, #A68246);
    color: #010A1F;
    font-family: 'Playfair Display', serif; font-style: italic;
    font-weight: 700; font-size: 1.75rem;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: 0 8px 24px -8px rgba(200,161,101,0.5);
  }

  /* USE CASE CARDS */
  .nw-usecase-card {
    position: relative;
    background: linear-gradient(180deg, rgba(10,27,61,0.7), rgba(1,10,31,0.95));
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 22px; padding: 2rem; overflow: hidden;
    transition: all 0.35s ease;
  }
  .nw-usecase-card::after {
    content: ''; position: absolute; inset: -2px; border-radius: inherit;
    background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.15) 0%, transparent 70%);
    filter: blur(28px); opacity: 0.4; z-index: -1;
    pointer-events: none; transition: opacity 0.4s ease;
  }
  .nw-usecase-card:hover { transform: translateY(-4px); border-color: rgba(200,161,101,0.3); }
  .nw-usecase-card:hover::after { opacity: 1; }

  .nw-vertical-tag {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.4rem 0.8rem; border-radius: 999px;
    background: rgba(200,161,101,0.08);
    border: 1px solid rgba(200,161,101,0.2);
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
    color: #C8A165; letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 1rem;
  }

  /* WA MOCK */
  .nw-wa-mock {
    background: #0F1A2A; border-radius: 14px; padding: 0.875rem;
    margin-top: 1.25rem; border: 1px solid rgba(255,255,255,0.06);
    font-size: 0.83rem;
  }
  .nw-wa-bubble {
    max-width: 88%; padding: 0.55rem 0.8rem;
    border-radius: 12px; margin-bottom: 0.45rem; line-height: 1.4;
  }
  .nw-wa-in {
    background: #1F2937; color: #cbd5e1;
    border-top-left-radius: 4px; margin-right: auto;
  }
  .nw-wa-out {
    background: linear-gradient(135deg, #166534, #15803d);
    color: #f0fdf4; border-top-right-radius: 4px; margin-left: auto;
  }
  .nw-wa-time {
    font-size: 0.65rem; color: #64748b;
    font-family: 'JetBrains Mono', monospace;
    text-align: right; margin-top: 2px;
  }

  /* TESTIMONIALS */
  .nw-testimonial-card {
    position: relative;
    background: rgba(10,27,61,0.4);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px; padding: 1.75rem;
    transition: all 0.3s ease; overflow: visible;
  }
  .nw-testimonial-card::after {
    content: ''; position: absolute; inset: -2px; border-radius: inherit;
    background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.14) 0%, rgba(166,130,70,0.06) 30%, transparent 70%);
    filter: blur(24px); opacity: 0.4; z-index: -1;
    pointer-events: none; transition: opacity 0.4s ease, filter 0.4s ease;
  }
  .nw-testimonial-card:hover::after { opacity: 1; filter: blur(36px); }
  .nw-testimonial-card:hover { border-color: rgba(200,161,101,0.2); transform: translateY(-3px); }

  /* PRICING */
  .nw-pricing-tier {
    position: relative; max-width: 520px; margin: 0 auto;
    background: linear-gradient(180deg, rgba(200,161,101,0.08) 0%, rgba(10,27,61,0.7) 100%);
    border: 1px solid rgba(200,161,101,0.35);
    border-radius: 28px; padding: 3rem 2.5rem; overflow: visible;
    box-shadow: 0 30px 80px -20px rgba(200,161,101,0.25);
  }
  .nw-pricing-tier::after {
    content: ''; position: absolute; inset: -4px; border-radius: 32px;
    background: radial-gradient(ellipse at 50% 0%, rgba(166,130,70,0.4) 0%, rgba(166,130,70,0.15) 30%, transparent 70%);
    filter: blur(40px); opacity: 0.7; z-index: -1; pointer-events: none;
  }
  .nw-pricing-amount {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 5rem; font-weight: 700; line-height: 1;
    background: linear-gradient(180deg, #f8fafc 0%, #C8A165 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    letter-spacing: -0.02em;
  }
  .nw-check-item {
    display: flex; align-items: center; gap: 0.75rem;
    font-size: 0.95rem; color: #cbd5e1;
  }
  .nw-check-icon {
    width: 20px; height: 20px; border-radius: 50%;
    background: rgba(200,161,101,0.15);
    border: 1px solid rgba(200,161,101,0.3);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* FAQ */
  .nw-faq-item {
    position: relative;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow: visible;
  }
  .nw-faq-item::after {
    content: ''; position: absolute; inset: -2px; border-radius: 12px;
    background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.10) 0%, transparent 60%);
    filter: blur(20px); opacity: 0; z-index: -1;
    pointer-events: none; transition: opacity 0.4s ease;
  }
  .nw-faq-item:hover::after { opacity: 1; }
  .nw-faq-item summary {
    list-style: none; cursor: pointer; padding: 1.4rem 0;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    color: #f1f5f9; font-size: 1rem; font-weight: 500;
  }
  .nw-faq-item summary::-webkit-details-marker { display: none; }
  .nw-faq-item[open] summary .nw-faq-icon { transform: rotate(45deg); }
  .nw-faq-icon {
    transition: transform 0.3s ease; flex-shrink: 0;
    color: #C8A165; font-size: 1.25rem; font-weight: 300;
  }
  .nw-faq-answer { padding: 0 0 1.25rem; color: #94a3b8; line-height: 1.7; }

  /* IPHONE MOCKUP */
  .nw-iphone-frame {
    position: relative; width: 100%; max-width: 300px; margin: 0 auto;
    aspect-ratio: 9/19.5;
    background: linear-gradient(145deg, #C8A165 0%, #A68246 45%, #7a5e2e 100%);
    border-radius: 48px; padding: 12px 10px;
    box-shadow:
      0 50px 100px -20px rgba(0,0,0,0.7),
      0 0 0 1.5px rgba(200,161,101,0.5),
      0 0 0 6px #6b4f1e,
      0 0 80px -20px rgba(166,130,70,0.55),
      inset 0 1px 0 rgba(255,255,255,0.18);
    overflow: hidden;
  }
  .nw-iphone-notch {
    position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
    width: 90px; height: 24px; background: #000; border-radius: 999px; z-index: 30;
  }
  .nw-iphone-screen {
    width: 100%; height: 100%; background: #ECE5DD;
    border-radius: 38px; overflow: hidden; display: flex; flex-direction: column;
  }
  .nw-wa-status-bar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 24px 4px; color: white; font-size: 11px; font-weight: 600;
    background: #075E54;
  }
  .nw-wa-header {
    display: flex; align-items: center; gap: 8px; padding: 6px 12px 8px;
    background: #075E54; border-bottom: 0.5px solid rgba(255,255,255,0.08);
  }
  .nw-wa-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 700; font-size: 13px; flex-shrink: 0;
  }
  .nw-wa-chat-bg {
    flex-grow: 1; background-color: #ECE5DD;
    padding: 10px 8px 8px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 5px;
  }
  .nw-wa-day {
    align-self: center; background: rgba(225,245,254,0.92); color: #54656F;
    font-size: 10px; font-weight: 500; padding: 3px 10px; border-radius: 6px;
    box-shadow: 0 1px 0.5px rgba(0,0,0,0.13);
  }
  .nw-wa-row {
    display: flex; margin: 0 3px;
    opacity: 0; transform: translateY(6px);
    animation: nw-msg-appear 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .nw-wa-row-in { justify-content: flex-start; }
  .nw-wa-row-out { justify-content: flex-end; }
  @keyframes nw-msg-appear { to { opacity: 1; transform: translateY(0); } }
  .nw-wa-row[data-msg="1"] { animation-delay: 0.6s; }
  .nw-wa-row[data-msg="2"] { animation-delay: 2.2s; }
  .nw-wa-row[data-msg="3"] { animation-delay: 4.8s; }
  .nw-wa-row[data-msg="4"] { animation-delay: 7.8s; }
  .nw-wa-typing {
    display: flex; justify-content: flex-end; margin: 0 3px;
    opacity: 0;
    animation: nw-typing-show 0.3s ease forwards, nw-typing-hide 0.3s ease forwards;
    animation-delay: 5.8s, 7.6s;
  }
  @keyframes nw-typing-show { to { opacity: 1; } }
  @keyframes nw-typing-hide { to { opacity: 0; transform: scale(0.8); } }
  .nw-wa-bubble-iphone {
    max-width: 82%; padding: 6px 9px 4px; border-radius: 8px;
    font-size: 11.5px; line-height: 1.35; color: #111B21; position: relative;
    box-shadow: 0 1px 0.5px rgba(0,0,0,0.13); word-wrap: break-word;
  }
  .nw-wa-bubble-in-iphone { background: #FFFFFF; border-top-left-radius: 0; }
  .nw-wa-bubble-out-iphone { background: #DCF8C6; border-top-right-radius: 0; }
  .nw-wa-msg-time { display: block; font-size: 9px; color: #667781; text-align: right; margin-top: 1px; }
  .nw-wa-typing-dots {
    padding: 9px 12px; display: flex; gap: 3px; align-items: center;
    background: #DCF8C6; border-radius: 8px; border-top-right-radius: 0;
  }
  .nw-typing-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(0,0,0,0.4); animation: nw-bounce 1.4s ease-in-out infinite;
  }
  .nw-typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .nw-typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes nw-bounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-3px); opacity: 1; } }
  .nw-wa-input-bar {
    background: #F0F2F5; padding: 6px 10px;
    display: flex; align-items: center; gap: 6px;
    border-top: 0.5px solid rgba(0,0,0,0.08); flex-shrink: 0;
  }

  /* SECTION TITLES */
  .nw-section-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; font-weight: 400;
    font-size: clamp(2rem, 4vw, 3.2rem);
    letter-spacing: -0.02em; line-height: 1.1;
    background: linear-gradient(120deg, #e2e8f0 0%, #cbd5e1 35%, #C8A165 70%, #A68246 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    display: inline-block;
  }

  /* STACKING USE CASE CARDS */
  .nw-stack-scene {
    position: relative;
  }
  .nw-stack-card {
    position: sticky;
    top: 10vh;
    margin-bottom: 20vh;
  }
  .nw-stack-card:last-child {
    margin-bottom: 0;
  }
  .nw-stack-card-inner {
    position: relative;
    background: linear-gradient(135deg, rgba(10,27,61,0.92) 0%, rgba(1,10,31,0.98) 100%);
    border: 1px solid rgba(200,161,101,0.18);
    border-radius: 28px;
    padding: 4rem 3.5rem;
    max-width: 1100px;
    margin: 0 auto;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.6),
      0 0 0 1px rgba(255,255,255,0.04) inset;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  .nw-stack-card[data-index="1"] .nw-stack-card-inner { transform: scale(0.97); }
  .nw-stack-card[data-index="2"] .nw-stack-card-inner { transform: scale(0.94); }
  .nw-stack-card-inner::before {
    content: '';
    position: absolute;
    top: 0; left: 2.5rem; right: 2.5rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,161,101,0.7) 30%, rgba(212,181,122,0.9) 50%, rgba(200,161,101,0.7) 70%, transparent);
    border-radius: 1px;
  }
  .nw-card-tag {
    display: inline-flex; align-items: center;
    padding: 0.35rem 0.8rem; border-radius: 999px;
    background: rgba(200,161,101,0.08);
    border: 1px solid rgba(200,161,101,0.25);
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
    color: #C8A165; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 1.75rem;
  }
  .nw-stack-card-inner h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; font-weight: 400;
    font-size: clamp(2.5rem, 4vw, 3.8rem);
    line-height: 1.05; letter-spacing: -0.02em;
    color: #f8fafc; margin: 0 0 1.25rem;
    max-width: 90%;
  }
  .nw-layer-tagline {
    font-size: clamp(1.05rem, 1.5vw, 1.3rem);
    font-weight: 600; letter-spacing: -0.01em;
    color: #C8A165; margin-bottom: 1rem; line-height: 1.3;
  }
  .nw-layer-body {
    font-size: 1.05rem; line-height: 1.7;
    color: #94a3b8; margin-bottom: 1.5rem; font-weight: 300;
  }
  .nw-layer-compliance {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.45rem 0.9rem; border-radius: 8px;
    border: 1px solid rgba(200,161,101,0.25);
    font-family: 'JetBrains Mono', monospace; font-size: 0.78rem;
    color: #94a3b8; letter-spacing: 0.04em;
  }
  .nw-stack-wa-panel {
    background: #0F1A2A; border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem;
    box-shadow: 0 20px 60px -15px rgba(0,0,0,0.5);
  }
  .nw-stack-wa-label {
    font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
    color: #3D7A5A; letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  @media (max-width: 768px) {
    .nw-stack-card-inner {
      grid-template-columns: 1fr;
      padding: 2.5rem 1.75rem;
      gap: 2rem;
    }
    .nw-stack-card { top: 6vh; margin-bottom: 10vh; }
    .nw-stack-card[data-index="1"] .nw-stack-card-inner,
    .nw-stack-card[data-index="2"] .nw-stack-card-inner { transform: none; }
  }

  /* FOOTER */
  .nw-footer-wordmark {
    font-size: clamp(5rem, 20vw, 18rem); font-weight: 900;
    letter-spacing: -0.06em; line-height: 0.85;
    background: linear-gradient(180deg, rgba(248,250,252,0.07) 0%, rgba(200,161,101,0.15) 50%, rgba(1,10,31,0.95) 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; color: transparent;
    user-select: none; white-space: nowrap;
  }
  .nw-footer-link { color: #94a3b8; transition: color 0.2s ease; text-decoration: none; font-size: 0.9rem; }
  .nw-footer-link:hover { color: #D4B57A; }
  .nw-footer-col-title {
    font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
    text-transform: uppercase; letter-spacing: 0.15em; color: #64748b;
    margin-bottom: 1.25rem;
  }
  .nw-mono { font-family: 'JetBrains Mono', monospace; }
  .nw-status-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #10b981;
    box-shadow: 0 0 12px #10b981; flex-shrink: 0;
    animation: nw-pulse-dot 2s ease-in-out infinite;
  }
  @keyframes nw-pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

  /* LANG DROPDOWN */
  .nw-lang-btn {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.4rem 0.75rem; border-radius: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    color: #cbd5e1; font-size: 0.85rem; cursor: pointer;
    transition: all 0.2s ease;
  }
  .nw-lang-btn:hover { background: rgba(200,161,101,0.08); border-color: rgba(200,161,101,0.3); color: #C8A165; }
  .nw-lang-dropdown {
    position: absolute; top: 100%; right: 0; margin-top: 4px;
    background: rgba(8,20,50,0.97); border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px; padding: 0.5rem; min-width: 140px; z-index: 100;
    backdrop-filter: blur(16px);
  }
  .nw-lang-option {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.45rem 0.7rem; border-radius: 6px;
    cursor: pointer; font-size: 0.875rem; color: #cbd5e1;
    transition: background 0.15s;
  }
  .nw-lang-option:hover { background: rgba(200,161,101,0.10); color: #f8fafc; }
  .nw-lang-option.active { color: #C8A165; }

  /* WA FLOATING BUTTON */
  .nw-wa-float {
    position: fixed; bottom: 1.5rem; left: 1.5rem; z-index: 50;
    width: 56px; height: 56px; border-radius: 50%;
    background: #A68246;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 32px -8px rgba(166,130,70,0.6);
    transition: all 0.2s ease; text-decoration: none;
  }
  .nw-wa-float:hover { background: #8f6e38; transform: scale(1.08); box-shadow: 0 12px 40px -8px rgba(166,130,70,0.8); }

  /* SECTION LABEL */
  .nw-section-label {
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
    text-transform: uppercase; letter-spacing: 0.18em;
    color: #C8A165; margin-bottom: 0.75rem; display: block;
  }

  /* DIVIDER */
  .nw-divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 0; }

  @media (max-width: 640px) {
    .nw-hero { min-height: auto; padding-top: 6rem; padding-bottom: 4rem; }
    .nw-pricing-tier { padding: 2rem 1.5rem; }
    .nw-iphone-frame { max-width: 220px; }
  }
`

function LanguageSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  return (
    <div style={{ position: 'relative' }}>
      <button className="nw-lang-btn" onClick={() => setOpen(!open)}>
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{ opacity: 0.6 }}>
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </button>
      {open && (
        <div className="nw-lang-dropdown">
          {LANGUAGES.map(l => (
            <div
              key={l.code}
              className={`nw-lang-option${lang === l.code ? ' active' : ''}`}
              onClick={() => { setLang(l.code); localStorage.setItem('caty-lang', l.code); setOpen(false) }}
            >
              <span>{l.flag}</span> {l.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NoWebsite() {
  const [lang, setLang] = useState('ro')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored && translations[stored]) { setLang(stored); return }
    const bl = navigator.language?.slice(0, 2)
    if (translations[bl]) setLang(bl)
  }, [])

  const t = translations[lang] || translations.ro

  return (
    <div className="nw-body">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <SEO
        title="QR-First | CatyAI - WhatsApp AI for Small Businesses"
        description="Nu ai site? Nicio problemă. Conectezi WhatsApp în 2 minute, Caty răspunde instant clienților tăi. Doar €10/lună."
        url="https://catyai.io/no-website"
        service={{
          name: 'CatyAI QR-First',
          description: 'WhatsApp AI for businesses without a website. Connect in 2 minutes, respond to customers 24/7.',
          price: '10',
          features: ['24/7 AI responses', 'Appointment booking', 'PDF quotes', 'No website needed', '2-minute setup']
        }}
      />

      {/* NAV */}
      <nav className="nw-glass-nav">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src="/images/caty-logo.png" alt="CatyAI" style={{ height: '36px', width: '36px' }} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f8fafc'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>
                {t.nav.home}
              </Link>
              {['#how', '#use-cases', '#pricing', '#faq'].map((href, i) => (
                <a key={href} href={href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f8fafc'} onMouseLeave={e => e.target.style.color = '#94a3b8'}>
                  {[t.nav.howItWorks, t.nav.features, t.nav.pricing, t.nav.faq][i]}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <LanguageSelector lang={lang} setLang={setLang} />
              <a href="https://app.catyai.io/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', display: 'none' }}
                className="hidden md:block">{t.nav.login}</a>
              <a href="https://app.catyai.io/signup" className="nw-btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.875rem', borderRadius: '10px' }}>
                {t.nav.getStarted}
              </a>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.25rem', display: 'none' }}
                className="md:hidden">
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.nav.home}</Link>
              <a href="#how" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.nav.howItWorks}</a>
              <a href="#use-cases" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.nav.features}</a>
              <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.nav.pricing}</a>
              <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>{t.nav.faq}</a>
              <a href="https://app.catyai.io/signup" className="nw-btn-primary" style={{ textAlign: 'center' }}>{t.nav.getStarted}</a>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="nw-hero">
        <div className="nw-hero-bg-pattern" />
        <div className="nw-hero-bg-grid" />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div className="nw-badge-glow" style={{ marginBottom: '1.75rem' }}>
                <span className="nw-badge-ping" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C8A165' }}>
                  {t.badge}
                </span>
              </div>
              <h1 className="nw-hero-title">
                <span className="nw-hero-title-1">{t.heroTitle1}</span>
                <span className="nw-hero-title-2">{t.heroTitle2}</span>
              </h1>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: '#94a3b8', fontWeight: 300, maxWidth: '520px', marginTop: '1.5rem', marginBottom: '2rem' }}>
                {t.heroSubtitle}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2rem' }}>
                <a href="https://app.catyai.io/signup" className="nw-btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.heroCta}
                </a>
                <a href="#how" className="nw-btn-secondary">{t.heroCtaSecondary}</a>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {[t.trustBadge1, t.trustBadge2, t.trustBadge3].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="#C8A165">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            {/* Right — iPhone mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="nw-iphone-frame">
                <div className="nw-iphone-notch" />
                <div className="nw-iphone-screen">
                  <div className="nw-wa-status-bar">
                    <span style={{ fontFamily: '-apple-system, sans-serif', fontWeight: 700 }}>9:41</span>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                      <div style={{ width: '22px', height: '10px', border: '1.5px solid white', borderRadius: '3px', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '1.5px', right: '3px', background: 'white', borderRadius: '1px' }} />
                      </div>
                    </div>
                  </div>
                  <div className="nw-wa-header">
                    <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="nw-wa-avatar">S</div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ color: 'white', fontWeight: 600, fontSize: '12px' }}>Salon Beauty</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#25D366', borderRadius: '50%', display: 'inline-block' }} />
                        CatyAI Online
                      </div>
                    </div>
                  </div>
                  <div className="nw-wa-chat-bg">
                    <div className="nw-wa-day">Today</div>
                    <div className="nw-wa-row nw-wa-row-in" data-msg="1">
                      <div className="nw-wa-bubble-iphone nw-wa-bubble-in-iphone">
                        Bună! Aveți loc mâine la 15:00?
                        <span className="nw-wa-msg-time">14:32</span>
                      </div>
                    </div>
                    <div className="nw-wa-row nw-wa-row-out" data-msg="2">
                      <div className="nw-wa-bubble-iphone nw-wa-bubble-out-iphone">
                        Bună! Da, avem loc la 15:00 ✂️ Ce serviciu doriți?
                        <span className="nw-wa-msg-time">14:32 ✓✓</span>
                      </div>
                    </div>
                    <div className="nw-wa-row nw-wa-row-in" data-msg="3">
                      <div className="nw-wa-bubble-iphone nw-wa-bubble-in-iphone">
                        Tuns + vopsit, vă rog 😊
                        <span className="nw-wa-msg-time">14:35</span>
                      </div>
                    </div>
                    <div className="nw-wa-typing">
                      <div className="nw-wa-typing-dots">
                        <div className="nw-typing-dot" />
                        <div className="nw-typing-dot" />
                        <div className="nw-typing-dot" />
                      </div>
                    </div>
                    <div className="nw-wa-row nw-wa-row-out" data-msg="4">
                      <div className="nw-wa-bubble-iphone nw-wa-bubble-out-iphone">
                        Confirmat pentru mâine 15:00 📅 Îți trimit reminder dimineața!
                        <span className="nw-wa-msg-time">14:36 ✓✓</span>
                      </div>
                    </div>
                  </div>
                  <div className="nw-wa-input-bar">
                    <div style={{ flexGrow: 1, background: 'white', borderRadius: '18px', padding: '6px 12px', fontSize: '11px', color: '#aaa' }}>
                      Message
                    </div>
                    <div style={{ width: '30px', height: '30px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="nw-section-label">{t.howTitle}</span>
            <h2 className="nw-section-title" style={{ marginBottom: '1rem' }}>
              {t.howTitle}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>{t.howSubtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {t.howSteps.map((step, i) => (
              <div key={i} className="nw-qr-step">
                <div className="nw-step-number">{step.num}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="nw-divider" />

      {/* USE CASES */}
      <section id="use-cases" style={{ padding: '5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="nw-section-label">{t.useCasesTitle}</span>
            <h2 className="nw-section-title" style={{ marginBottom: '1rem' }}>
              {t.useCasesTitle}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto' }}>{t.useCasesSubtitle}</p>
          </div>
        </div>
        <div className="nw-stack-scene" style={{ padding: '0 1.5rem 8rem' }}>
          {t.useCases.map((uc, i) => (
            <div key={i} className="nw-stack-card" data-index={i}>
              <div className="nw-stack-card-inner">
                {/* Left: text */}
                <div>
                  <div className="nw-card-tag">{uc.tag}</div>
                  <h3>{uc.title}</h3>
                  <p className="nw-layer-tagline">{uc.tagline}</p>
                  <p className="nw-layer-body">{uc.body}</p>
                  <div className="nw-layer-compliance">
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="#C8A165">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {uc.note}
                  </div>
                </div>
                {/* Right: WhatsApp preview */}
                <div className="nw-stack-wa-panel">
                  <div className="nw-stack-wa-label">WhatsApp · CatyAI</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex' }}>
                      <div className="nw-wa-bubble nw-wa-in" style={{ fontSize: '0.9rem' }}>{uc.customer}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div className="nw-wa-bubble nw-wa-out" style={{ fontSize: '0.9rem' }}>{uc.reply}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div className="nw-wa-bubble nw-wa-out" style={{ fontSize: '0.9rem' }}>{uc.reply2}</div>
                    </div>
                    <div className="nw-wa-time">CatyAI · just now</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="nw-divider" />

      {/* TESTIMONIALS */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="nw-section-title">
              {t.testimonialsTitle}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {t.testimonials.map((tm, i) => (
              <div key={i} className="nw-testimonial-card">
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 20 20" fill="#C8A165">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  &ldquo;{tm.quote}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem' }}>
                  <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.9rem' }}>{tm.author}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px', fontFamily: "'JetBrains Mono', monospace" }}>{tm.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="nw-divider" />

      {/* PRICING */}
      <section id="pricing" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <span className="nw-section-label">{t.pricingTitle}</span>
          <h2 className="nw-section-title" style={{ marginBottom: '0.75rem' }}>
            {t.pricingTitle}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '3rem' }}>{t.pricingSubtitle}</p>
          <div className="nw-pricing-tier">
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#C8A165', marginBottom: '1.25rem' }}>
              {t.planName}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
              <span className="nw-pricing-amount">{t.planPrice}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#64748b', fontSize: '1rem' }}>{t.planPeriod}</span>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>{t.planDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem', textAlign: 'left' }}>
              {t.planFeatures.map((f, i) => (
                <div key={i} className="nw-check-item">
                  <div className="nw-check-icon">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#C8A165" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  {f}
                </div>
              ))}
            </div>
            <a href="https://app.catyai.io/signup" className="nw-btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', borderRadius: '14px', padding: '1rem' }}>
              {t.planCta}
            </a>
            <p style={{ color: '#475569', fontSize: '0.8rem', marginTop: '1rem', fontFamily: "'JetBrains Mono', monospace" }}>
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <hr className="nw-divider" />

      {/* FAQ */}
      <section id="faq" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              {t.faqTitle}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {t.faqs.map((faq, i) => (
              <details key={i} className="nw-faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <span className="nw-faq-icon">+</span>
                </summary>
                <div className="nw-faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(180deg, rgba(200,161,101,0.10) 0%, rgba(10,27,61,0.6) 100%)', border: '1px solid rgba(200,161,101,0.25)', borderRadius: '28px', padding: '3.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200,161,101,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.75rem', position: 'relative' }}>
              {t.ctaTitle}
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.05rem', position: 'relative' }}>{t.ctaSubtitle}</p>
            <a href="https://app.catyai.io/signup" className="nw-btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2rem', borderRadius: '14px', position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.ctaButton}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <img src="/images/caty-logo.png" alt="CatyAI" style={{ height: '36px', width: '36px', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '220px', marginBottom: '1.5rem' }}>{t.footer.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="nw-status-dot" />
                <span className="nw-mono" style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.12em' }}>All systems operational</span>
              </div>
            </div>
            <div>
              <div className="nw-footer-col-title">{t.footer.product}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="#" className="nw-footer-link">{t.footer.features}</a>
                <a href="#pricing" className="nw-footer-link">{t.footer.pricing}</a>
                <a href="#" className="nw-footer-link">{t.footer.whatsapp}</a>
              </div>
            </div>
            <div>
              <div className="nw-footer-col-title">{t.footer.company}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="#" className="nw-footer-link">{t.footer.about}</a>
                <a href="/blog" className="nw-footer-link">{t.footer.blog}</a>
                <a href="mailto:contact@payai-x.com" className="nw-footer-link">{t.footer.contact}</a>
              </div>
            </div>
            <div>
              <div className="nw-footer-col-title">{t.footer.legal}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="/privacy" className="nw-footer-link">{t.footer.privacy}</a>
                <a href="/terms" className="nw-footer-link">{t.footer.terms}</a>
                <a href="/gdpr" className="nw-footer-link">{t.footer.gdpr}</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ color: '#475569', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>{t.footer.copyright}</span>
            <a href="https://www.linkedin.com/company/payai-x" target="_blank" rel="noopener noreferrer"
              style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: 'all 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,161,101,0.10)'; e.currentTarget.style.color = '#C8A165' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = '#94a3b8' }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', overflow: 'hidden' }}>
          <div className="nw-footer-wordmark">Caty</div>
        </div>
      </footer>

      {/* WA FLOATING BUTTON */}
      <a href="https://wa.me/40700000000" target="_blank" rel="noopener noreferrer" className="nw-wa-float" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}
