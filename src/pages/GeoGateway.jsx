import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const translations = {
  en: {
    badge: 'Intelligent Traffic Routing',
    heroTitle1: 'GEO Gateway',
    heroTitle2: '6 Layers of Geographic Intelligence',
    heroSubtitle: 'Route conversations to the right team based on location, language, timezone, and business rules. Smart traffic distribution that maximizes conversion and customer satisfaction.',
    heroCta: 'Get Started Free',
    heroCtaSecondary: 'See Architecture',
    trustBadge1: 'Sub-second routing',
    trustBadge2: '99.9% uptime',
    trustBadge3: '180+ countries supported',

    problemTitle: 'Global Traffic.',
    problemHighlight: 'Local Chaos.',
    problemStats: [
      { value: '67%', label: 'of customers prefer support in their native language' },
      { value: '3x', label: 'higher conversion when routed to local team' },
      { value: '40%', label: 'of leads lost due to timezone mismatch' }
    ],
    problemSolution: 'GEO Gateway routes every conversation intelligently.',

    solutionTitle: '6-Layer Architecture',
    solutionSubtitle: 'Each layer adds intelligence to your routing decisions',
    layers: [
      { icon: '🌍', title: 'GeoIP Detection', desc: 'Instant country and city detection from IP address. Works for WhatsApp, web widget, and all channels.', detail: '99.5% accuracy' },
      { icon: '🗣️', title: 'Language Analysis', desc: 'AI detects message language in real-time. Auto-routes to agents who speak that language.', detail: '95+ languages' },
      { icon: '⏰', title: 'Timezone Routing', desc: 'Routes to available teams based on business hours. No more 3 AM escalations to sleeping agents.', detail: '24/7 coverage' },
      { icon: '📋', title: 'Business Rules', desc: 'Custom rules: VIP customers to senior agents, enterprise leads to sales, support tickets to specialists.', detail: 'Unlimited rules' },
      { icon: '⚖️', title: 'Load Balancing', desc: 'Distributes conversations evenly across available agents. Prevents overload, ensures fast response.', detail: 'Real-time balancing' },
      { icon: '🔄', title: 'Failover & Fallback', desc: 'If primary route unavailable, auto-escalates to backup team or queue with SLA tracking.', detail: 'Zero dropped conversations' }
    ],

    howTitle: 'How GEO Gateway Works',
    howSubtitle: 'From message to perfect match in milliseconds',
    howSteps: [
      { title: 'Message Arrives', desc: 'A customer sends a message via WhatsApp, web chat, or any connected channel.', icon: '📩' },
      { title: '6 Layers Analyze', desc: 'GEO Gateway processes location, language, time, rules, load, and availability simultaneously.', icon: '🧠' },
      { title: 'Perfect Match', desc: 'The conversation is routed to the ideal agent — right language, right timezone, right expertise.', icon: '✅' }
    ],

    comparisonTitle: 'GEO Gateway vs. Manual Routing',
    comparisonItems: [
      { feature: 'Location detection', without: 'Ask customer', with: 'Automatic GeoIP' },
      { feature: 'Language matching', without: 'Customer selects', with: 'AI detection' },
      { feature: 'Timezone awareness', without: 'None', with: 'Built-in' },
      { feature: 'Load balancing', without: 'Random/manual', with: 'Real-time' },
      { feature: 'Failover', without: 'Lost conversations', with: 'Auto-escalation' },
      { feature: 'Setup time', without: 'Days of config', with: '5 minutes' }
    ],

    dashboardTitle: 'Live Dashboard Preview',
    dashboardSubtitle: 'Monitor global traffic in real-time',
    dashboardFeatures: [
      'Live world map with active conversations',
      'Per-country and per-agent metrics',
      'Language distribution charts',
      'Routing decision logs',
      'SLA compliance tracking'
    ],

    faqTitle: 'Questions About GEO Gateway',
    faqs: [
      { q: 'How accurate is GeoIP detection?', a: 'Our GeoIP database achieves 99.5% accuracy at country level and 85% at city level. We update the database weekly with fresh data from multiple providers.' },
      { q: 'Can I create custom routing rules?', a: 'Yes. You can route based on any combination of country, language, message keywords, customer tags, time of day, agent skills, and custom fields. Unlimited rules supported.' },
      { q: 'What happens if no agent is available?', a: 'GEO Gateway has built-in failover. Conversations go to backup teams, overflow queues, or AI auto-response based on your settings. No conversation is ever dropped.' },
      { q: 'Does it work with WhatsApp?', a: 'Yes. GEO Gateway works with WhatsApp Business API, web widget, Instagram, Facebook Messenger, Telegram, and all channels CatyAI supports.' },
      { q: 'How fast is the routing?', a: 'Sub-second. All 6 layers process in parallel, so routing decisions happen in under 100ms — imperceptible to your customers.' },
      { q: 'Is there a limit on countries or languages?', a: 'No limits. GEO Gateway supports 180+ countries and 95+ languages out of the box. Add custom regions and language variants as needed.' }
    ],

    ctaTitle: 'Route Smarter, Convert More',
    ctaSubtitle: 'GEO Gateway is included in all Pro and Enterprise plans.',
    ctaButton: 'Start Free Trial',

    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Start Free' },
    footer: {
      tagline: 'AI that routes intelligently.',
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
    badge: 'Rutare Inteligentă a Traficului',
    heroTitle1: 'GEO Gateway',
    heroTitle2: '6 Niveluri de Inteligență Geografică',
    heroSubtitle: 'Direcționează conversațiile către echipa potrivită în funcție de locație, limbă, fus orar și reguli de business. Distribuție inteligentă a traficului care maximizează conversia și satisfacția clienților.',
    heroCta: 'Începe Gratuit',
    heroCtaSecondary: 'Vezi Arhitectura',
    trustBadge1: 'Rutare sub o secundă',
    trustBadge2: '99.9% uptime',
    trustBadge3: '180+ țări suportate',

    problemTitle: 'Trafic Global.',
    problemHighlight: 'Haos Local.',
    problemStats: [
      { value: '67%', label: 'dintre clienți preferă suport în limba maternă' },
      { value: '3x', label: 'conversie mai mare când sunt direcționați la echipa locală' },
      { value: '40%', label: 'din lead-uri pierdute din cauza nepotrivirii fusului orar' }
    ],
    problemSolution: 'GEO Gateway direcționează fiecare conversație inteligent.',

    solutionTitle: 'Arhitectură cu 6 Niveluri',
    solutionSubtitle: 'Fiecare nivel adaugă inteligență deciziilor de rutare',
    layers: [
      { icon: '🌍', title: 'Detecție GeoIP', desc: 'Detectare instantanee a țării și orașului din adresa IP. Funcționează pentru WhatsApp, widget web și toate canalele.', detail: '99.5% acuratețe' },
      { icon: '🗣️', title: 'Analiză Limbă', desc: 'AI detectează limba mesajului în timp real. Rutează automat către agenții care vorbesc acea limbă.', detail: '95+ limbi' },
      { icon: '⏰', title: 'Rutare Fus Orar', desc: 'Rutează către echipele disponibile în funcție de orele de program. Fără escaladări la 3 dimineața.', detail: 'Acoperire 24/7' },
      { icon: '📋', title: 'Reguli Business', desc: 'Reguli personalizate: clienți VIP la agenți seniori, lead-uri enterprise la vânzări, tichete suport la specialiști.', detail: 'Reguli nelimitate' },
      { icon: '⚖️', title: 'Echilibrare Încărcare', desc: 'Distribuie conversațiile uniform între agenții disponibili. Previne supraîncărcarea, asigură răspuns rapid.', detail: 'Echilibrare în timp real' },
      { icon: '🔄', title: 'Failover & Fallback', desc: 'Dacă ruta principală nu e disponibilă, escaladează automat la echipa backup sau coadă cu tracking SLA.', detail: 'Zero conversații pierdute' }
    ],

    howTitle: 'Cum Funcționează GEO Gateway',
    howSubtitle: 'De la mesaj la potrivirea perfectă în milisecunde',
    howSteps: [
      { title: 'Mesaj Primit', desc: 'Un client trimite un mesaj prin WhatsApp, chat web sau orice canal conectat.', icon: '📩' },
      { title: '6 Niveluri Analizează', desc: 'GEO Gateway procesează locația, limba, timpul, regulile, încărcarea și disponibilitatea simultan.', icon: '🧠' },
      { title: 'Potrivire Perfectă', desc: 'Conversația e rutată către agentul ideal — limba potrivită, fusul orar potrivit, expertiza potrivită.', icon: '✅' }
    ],

    comparisonTitle: 'GEO Gateway vs. Rutare Manuală',
    comparisonItems: [
      { feature: 'Detecție locație', without: 'Întrebi clientul', with: 'GeoIP automat' },
      { feature: 'Potrivire limbă', without: 'Clientul selectează', with: 'Detecție AI' },
      { feature: 'Conștientizare fus orar', without: 'Niciuna', with: 'Integrată' },
      { feature: 'Echilibrare încărcare', without: 'Random/manual', with: 'Timp real' },
      { feature: 'Failover', without: 'Conversații pierdute', with: 'Auto-escaladare' },
      { feature: 'Timp setup', without: 'Zile de config', with: '5 minute' }
    ],

    dashboardTitle: 'Previzualizare Dashboard Live',
    dashboardSubtitle: 'Monitorizează traficul global în timp real',
    dashboardFeatures: [
      'Hartă mondială live cu conversații active',
      'Metrici per țară și per agent',
      'Grafice distribuție limbi',
      'Loguri decizii rutare',
      'Tracking conformitate SLA'
    ],

    faqTitle: 'Întrebări Despre GEO Gateway',
    faqs: [
      { q: 'Cât de precisă e detecția GeoIP?', a: 'Baza noastră de date GeoIP atinge 99.5% acuratețe la nivel de țară și 85% la nivel de oraș. Actualizăm baza de date săptămânal cu date proaspete de la multipli furnizori.' },
      { q: 'Pot crea reguli de rutare personalizate?', a: 'Da. Poți ruta pe baza oricărei combinații de țară, limbă, cuvinte cheie din mesaj, tag-uri client, ora din zi, abilități agent și câmpuri personalizate. Reguli nelimitate suportate.' },
      { q: 'Ce se întâmplă dacă niciun agent nu e disponibil?', a: 'GEO Gateway are failover integrat. Conversațiile merg la echipe backup, cozi overflow sau răspuns automat AI în funcție de setările tale. Nicio conversație nu e vreodată pierdută.' },
      { q: 'Funcționează cu WhatsApp?', a: 'Da. GEO Gateway funcționează cu WhatsApp Business API, widget web, Instagram, Facebook Messenger, Telegram și toate canalele suportate de CatyAI.' },
      { q: 'Cât de rapidă e rutarea?', a: 'Sub o secundă. Toate cele 6 niveluri procesează în paralel, așa că deciziile de rutare se iau în sub 100ms — imperceptibil pentru clienții tăi.' },
      { q: 'Există limită de țări sau limbi?', a: 'Fără limite. GEO Gateway suportă 180+ țări și 95+ limbi din start. Adaugă regiuni și variante de limbă personalizate după necesități.' }
    ],

    ctaTitle: 'Rutează Mai Inteligent, Convertește Mai Mult',
    ctaSubtitle: 'GEO Gateway este inclus în toate planurile Pro și Enterprise.',
    ctaButton: 'Începe Trial Gratuit',

    nav: { home: 'Acasă', features: 'Funcții', howItWorks: 'Cum funcționează', pricing: 'Prețuri', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Gratuit' },
    footer: {
      tagline: 'AI care rutează inteligent.',
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
    badge: 'Enrutamiento Inteligente de Tráfico',
    heroTitle1: 'GEO Gateway',
    heroTitle2: '6 Capas de Inteligencia Geográfica',
    heroSubtitle: 'Dirige conversaciones al equipo correcto según ubicación, idioma, zona horaria y reglas de negocio. Distribución inteligente que maximiza conversión y satisfacción.',
    heroCta: 'Empezar Gratis',
    heroCtaSecondary: 'Ver Arquitectura',
    trustBadge1: 'Enrutamiento sub-segundo',
    trustBadge2: '99.9% uptime',
    trustBadge3: '180+ países soportados',

    problemTitle: 'Tráfico Global.',
    problemHighlight: 'Caos Local.',
    problemStats: [
      { value: '67%', label: 'de clientes prefieren soporte en su idioma nativo' },
      { value: '3x', label: 'mayor conversión cuando se dirige al equipo local' },
      { value: '40%', label: 'de leads perdidos por diferencia de zona horaria' }
    ],
    problemSolution: 'GEO Gateway dirige cada conversación inteligentemente.',

    solutionTitle: 'Arquitectura de 6 Capas',
    solutionSubtitle: 'Cada capa añade inteligencia a tus decisiones de enrutamiento',
    layers: [
      { icon: '🌍', title: 'Detección GeoIP', desc: 'Detección instantánea de país y ciudad desde IP. Funciona para WhatsApp, widget web y todos los canales.', detail: '99.5% precisión' },
      { icon: '🗣️', title: 'Análisis de Idioma', desc: 'IA detecta el idioma del mensaje en tiempo real. Enruta automáticamente a agentes que hablan ese idioma.', detail: '95+ idiomas' },
      { icon: '⏰', title: 'Enrutamiento por Zona Horaria', desc: 'Enruta a equipos disponibles según horario laboral. Sin escalaciones a las 3 AM a agentes durmiendo.', detail: 'Cobertura 24/7' },
      { icon: '📋', title: 'Reglas de Negocio', desc: 'Reglas personalizadas: clientes VIP a agentes senior, leads enterprise a ventas, tickets a especialistas.', detail: 'Reglas ilimitadas' },
      { icon: '⚖️', title: 'Balanceo de Carga', desc: 'Distribuye conversaciones uniformemente entre agentes disponibles. Previene sobrecarga, asegura respuesta rápida.', detail: 'Balanceo en tiempo real' },
      { icon: '🔄', title: 'Failover y Fallback', desc: 'Si la ruta principal no está disponible, escala automáticamente a equipo backup o cola con tracking SLA.', detail: 'Cero conversaciones perdidas' }
    ],

    howTitle: 'Cómo Funciona GEO Gateway',
    howSubtitle: 'Del mensaje a la coincidencia perfecta en milisegundos',
    howSteps: [
      { title: 'Mensaje Llega', desc: 'Un cliente envía un mensaje por WhatsApp, chat web o cualquier canal conectado.', icon: '📩' },
      { title: '6 Capas Analizan', desc: 'GEO Gateway procesa ubicación, idioma, hora, reglas, carga y disponibilidad simultáneamente.', icon: '🧠' },
      { title: 'Coincidencia Perfecta', desc: 'La conversación se enruta al agente ideal — idioma correcto, zona horaria correcta, experiencia correcta.', icon: '✅' }
    ],

    comparisonTitle: 'GEO Gateway vs. Enrutamiento Manual',
    comparisonItems: [
      { feature: 'Detección ubicación', without: 'Preguntar al cliente', with: 'GeoIP automático' },
      { feature: 'Coincidencia idioma', without: 'Cliente selecciona', with: 'Detección IA' },
      { feature: 'Conciencia zona horaria', without: 'Ninguna', with: 'Integrada' },
      { feature: 'Balanceo de carga', without: 'Random/manual', with: 'Tiempo real' },
      { feature: 'Failover', without: 'Conversaciones perdidas', with: 'Auto-escalación' },
      { feature: 'Tiempo setup', without: 'Días de config', with: '5 minutos' }
    ],

    dashboardTitle: 'Vista Previa del Dashboard',
    dashboardSubtitle: 'Monitorea tráfico global en tiempo real',
    dashboardFeatures: [
      'Mapa mundial en vivo con conversaciones activas',
      'Métricas por país y por agente',
      'Gráficos de distribución de idiomas',
      'Logs de decisiones de enrutamiento',
      'Seguimiento de cumplimiento SLA'
    ],

    faqTitle: 'Preguntas Sobre GEO Gateway',
    faqs: [
      { q: '¿Qué tan precisa es la detección GeoIP?', a: 'Nuestra base de datos GeoIP alcanza 99.5% de precisión a nivel país y 85% a nivel ciudad. Actualizamos semanalmente con datos frescos de múltiples proveedores.' },
      { q: '¿Puedo crear reglas de enrutamiento personalizadas?', a: 'Sí. Puedes enrutar basándote en cualquier combinación de país, idioma, palabras clave, tags de cliente, hora del día, habilidades del agente y campos personalizados.' },
      { q: '¿Qué pasa si ningún agente está disponible?', a: 'GEO Gateway tiene failover integrado. Las conversaciones van a equipos backup, colas overflow o respuesta automática IA según tu configuración.' },
      { q: '¿Funciona con WhatsApp?', a: 'Sí. GEO Gateway funciona con WhatsApp Business API, widget web, Instagram, Facebook Messenger, Telegram y todos los canales de CatyAI.' },
      { q: '¿Qué tan rápido es el enrutamiento?', a: 'Sub-segundo. Las 6 capas procesan en paralelo, las decisiones se toman en menos de 100ms — imperceptible para tus clientes.' },
      { q: '¿Hay límite de países o idiomas?', a: 'Sin límites. GEO Gateway soporta 180+ países y 95+ idiomas. Añade regiones e idiomas personalizados según necesites.' }
    ],

    ctaTitle: 'Enruta Más Inteligente, Convierte Más',
    ctaSubtitle: 'GEO Gateway está incluido en todos los planes Pro y Enterprise.',
    ctaButton: 'Empezar Prueba Gratis',

    nav: { home: 'Inicio', features: 'Funciones', howItWorks: 'Cómo Funciona', pricing: 'Precios', faq: 'FAQ', login: 'Entrar', getStarted: 'Empezar Gratis' },
    footer: {
      tagline: 'IA que enruta inteligentemente.',
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
    badge: 'Roteamento Inteligente de Tráfego',
    heroTitle1: 'GEO Gateway',
    heroTitle2: '6 Camadas de Inteligência Geográfica',
    heroSubtitle: 'Direcione conversas para a equipe certa com base em localização, idioma, fuso horário e regras de negócio. Distribuição inteligente que maximiza conversão e satisfação.',
    heroCta: 'Começar Grátis',
    heroCtaSecondary: 'Ver Arquitetura',
    trustBadge1: 'Roteamento sub-segundo',
    trustBadge2: '99.9% uptime',
    trustBadge3: '180+ países suportados',

    problemTitle: 'Tráfego Global.',
    problemHighlight: 'Caos Local.',
    problemStats: [
      { value: '67%', label: 'dos clientes preferem suporte no idioma nativo' },
      { value: '3x', label: 'maior conversão quando direcionado à equipe local' },
      { value: '40%', label: 'de leads perdidos por diferença de fuso horário' }
    ],
    problemSolution: 'GEO Gateway direciona cada conversa inteligentemente.',

    solutionTitle: 'Arquitetura de 6 Camadas',
    solutionSubtitle: 'Cada camada adiciona inteligência às suas decisões de roteamento',
    layers: [
      { icon: '🌍', title: 'Detecção GeoIP', desc: 'Detecção instantânea de país e cidade pelo IP. Funciona para WhatsApp, widget web e todos os canais.', detail: '99.5% precisão' },
      { icon: '🗣️', title: 'Análise de Idioma', desc: 'IA detecta o idioma da mensagem em tempo real. Roteia automaticamente para agentes que falam esse idioma.', detail: '95+ idiomas' },
      { icon: '⏰', title: 'Roteamento por Fuso Horário', desc: 'Roteia para equipes disponíveis com base no horário comercial. Sem escalações às 3h da manhã para agentes dormindo.', detail: 'Cobertura 24/7' },
      { icon: '📋', title: 'Regras de Negócio', desc: 'Regras personalizadas: clientes VIP para agentes seniores, leads enterprise para vendas, tickets para especialistas.', detail: 'Regras ilimitadas' },
      { icon: '⚖️', title: 'Balanceamento de Carga', desc: 'Distribui conversas uniformemente entre agentes disponíveis. Previne sobrecarga, garante resposta rápida.', detail: 'Balanceamento em tempo real' },
      { icon: '🔄', title: 'Failover e Fallback', desc: 'Se a rota principal não estiver disponível, escala automaticamente para equipe backup ou fila com tracking SLA.', detail: 'Zero conversas perdidas' }
    ],

    howTitle: 'Como o GEO Gateway Funciona',
    howSubtitle: 'Da mensagem à combinação perfeita em milissegundos',
    howSteps: [
      { title: 'Mensagem Chega', desc: 'Um cliente envia uma mensagem via WhatsApp, chat web ou qualquer canal conectado.', icon: '📩' },
      { title: '6 Camadas Analisam', desc: 'GEO Gateway processa localização, idioma, horário, regras, carga e disponibilidade simultaneamente.', icon: '🧠' },
      { title: 'Combinação Perfeita', desc: 'A conversa é roteada para o agente ideal — idioma certo, fuso horário certo, expertise certa.', icon: '✅' }
    ],

    comparisonTitle: 'GEO Gateway vs. Roteamento Manual',
    comparisonItems: [
      { feature: 'Detecção localização', without: 'Perguntar ao cliente', with: 'GeoIP automático' },
      { feature: 'Combinação idioma', without: 'Cliente seleciona', with: 'Detecção IA' },
      { feature: 'Consciência fuso horário', without: 'Nenhuma', with: 'Integrada' },
      { feature: 'Balanceamento carga', without: 'Random/manual', with: 'Tempo real' },
      { feature: 'Failover', without: 'Conversas perdidas', with: 'Auto-escalação' },
      { feature: 'Tempo setup', without: 'Dias de config', with: '5 minutos' }
    ],

    dashboardTitle: 'Prévia do Dashboard ao Vivo',
    dashboardSubtitle: 'Monitore tráfego global em tempo real',
    dashboardFeatures: [
      'Mapa mundial ao vivo com conversas ativas',
      'Métricas por país e por agente',
      'Gráficos de distribuição de idiomas',
      'Logs de decisões de roteamento',
      'Rastreamento de conformidade SLA'
    ],

    faqTitle: 'Perguntas Sobre GEO Gateway',
    faqs: [
      { q: 'Quão precisa é a detecção GeoIP?', a: 'Nosso banco de dados GeoIP alcança 99.5% de precisão a nível de país e 85% a nível de cidade. Atualizamos semanalmente com dados frescos de múltiplos provedores.' },
      { q: 'Posso criar regras de roteamento personalizadas?', a: 'Sim. Você pode rotear com base em qualquer combinação de país, idioma, palavras-chave, tags de cliente, hora do dia, habilidades do agente e campos personalizados.' },
      { q: 'O que acontece se nenhum agente estiver disponível?', a: 'GEO Gateway tem failover integrado. Conversas vão para equipes backup, filas overflow ou resposta automática IA conforme suas configurações.' },
      { q: 'Funciona com WhatsApp?', a: 'Sim. GEO Gateway funciona com WhatsApp Business API, widget web, Instagram, Facebook Messenger, Telegram e todos os canais do CatyAI.' },
      { q: 'Quão rápido é o roteamento?', a: 'Sub-segundo. As 6 camadas processam em paralelo, decisões são tomadas em menos de 100ms — imperceptível para seus clientes.' },
      { q: 'Há limite de países ou idiomas?', a: 'Sem limites. GEO Gateway suporta 180+ países e 95+ idiomas. Adicione regiões e idiomas personalizados conforme necessário.' }
    ],

    ctaTitle: 'Roteie Mais Inteligente, Converta Mais',
    ctaSubtitle: 'GEO Gateway está incluído em todos os planos Pro e Enterprise.',
    ctaButton: 'Começar Teste Grátis',

    nav: { home: 'Início', features: 'Recursos', howItWorks: 'Como Funciona', pricing: 'Preços', faq: 'FAQ', login: 'Entrar', getStarted: 'Começar Grátis' },
    footer: {
      tagline: 'IA que roteia inteligentemente.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      features: 'Recursos',
      pricing: 'Preços',
      whatsapp: 'WhatsApp AI',
      about: 'Sobre',
      blog: 'Blog',
      contact: 'Contato',
      privacy: 'Privacidade',
      terms: 'Termos',
      gdpr: 'GDPR',
      copyright: '© 2024 PayAi-X FZE. Todos os direitos reservados.'
    }
  },
  fr: {
    badge: 'Routage Intelligent du Trafic',
    heroTitle1: 'GEO Gateway',
    heroTitle2: '6 Couches d\'Intelligence Géographique',
    heroSubtitle: 'Dirigez les conversations vers la bonne équipe selon la localisation, la langue, le fuseau horaire et les règles métier. Distribution intelligente qui maximise la conversion et la satisfaction.',
    heroCta: 'Commencer Gratuitement',
    heroCtaSecondary: 'Voir l\'Architecture',
    trustBadge1: 'Routage sub-seconde',
    trustBadge2: '99.9% uptime',
    trustBadge3: '180+ pays supportés',

    problemTitle: 'Trafic Global.',
    problemHighlight: 'Chaos Local.',
    problemStats: [
      { value: '67%', label: 'des clients préfèrent un support dans leur langue maternelle' },
      { value: '3x', label: 'plus de conversion quand dirigé vers l\'équipe locale' },
      { value: '40%', label: 'de leads perdus à cause du décalage horaire' }
    ],
    problemSolution: 'GEO Gateway dirige chaque conversation intelligemment.',

    solutionTitle: 'Architecture à 6 Couches',
    solutionSubtitle: 'Chaque couche ajoute de l\'intelligence à vos décisions de routage',
    layers: [
      { icon: '🌍', title: 'Détection GeoIP', desc: 'Détection instantanée du pays et de la ville par adresse IP. Fonctionne pour WhatsApp, widget web et tous les canaux.', detail: '99.5% précision' },
      { icon: '🗣️', title: 'Analyse de Langue', desc: 'L\'IA détecte la langue du message en temps réel. Route automatiquement vers les agents qui parlent cette langue.', detail: '95+ langues' },
      { icon: '⏰', title: 'Routage par Fuseau Horaire', desc: 'Route vers les équipes disponibles selon les heures ouvrables. Plus d\'escalations à 3h du matin vers des agents endormis.', detail: 'Couverture 24/7' },
      { icon: '📋', title: 'Règles Métier', desc: 'Règles personnalisées: clients VIP vers agents seniors, leads enterprise vers ventes, tickets vers spécialistes.', detail: 'Règles illimitées' },
      { icon: '⚖️', title: 'Équilibrage de Charge', desc: 'Distribue les conversations uniformément entre les agents disponibles. Prévient la surcharge, assure une réponse rapide.', detail: 'Équilibrage en temps réel' },
      { icon: '🔄', title: 'Failover et Fallback', desc: 'Si la route principale n\'est pas disponible, escale automatiquement vers l\'équipe backup ou la file avec suivi SLA.', detail: 'Zéro conversation perdue' }
    ],

    howTitle: 'Comment Fonctionne GEO Gateway',
    howSubtitle: 'Du message à la correspondance parfaite en millisecondes',
    howSteps: [
      { title: 'Message Arrive', desc: 'Un client envoie un message via WhatsApp, chat web ou tout canal connecté.', icon: '📩' },
      { title: '6 Couches Analysent', desc: 'GEO Gateway traite localisation, langue, heure, règles, charge et disponibilité simultanément.', icon: '🧠' },
      { title: 'Correspondance Parfaite', desc: 'La conversation est routée vers l\'agent idéal — bonne langue, bon fuseau horaire, bonne expertise.', icon: '✅' }
    ],

    comparisonTitle: 'GEO Gateway vs. Routage Manuel',
    comparisonItems: [
      { feature: 'Détection localisation', without: 'Demander au client', with: 'GeoIP automatique' },
      { feature: 'Correspondance langue', without: 'Client sélectionne', with: 'Détection IA' },
      { feature: 'Conscience fuseau horaire', without: 'Aucune', with: 'Intégrée' },
      { feature: 'Équilibrage charge', without: 'Random/manuel', with: 'Temps réel' },
      { feature: 'Failover', without: 'Conversations perdues', with: 'Auto-escalade' },
      { feature: 'Temps setup', without: 'Jours de config', with: '5 minutes' }
    ],

    dashboardTitle: 'Aperçu du Dashboard en Direct',
    dashboardSubtitle: 'Surveillez le trafic global en temps réel',
    dashboardFeatures: [
      'Carte mondiale en direct avec conversations actives',
      'Métriques par pays et par agent',
      'Graphiques de distribution des langues',
      'Logs des décisions de routage',
      'Suivi de conformité SLA'
    ],

    faqTitle: 'Questions Sur GEO Gateway',
    faqs: [
      { q: 'Quelle est la précision de la détection GeoIP?', a: 'Notre base de données GeoIP atteint 99.5% de précision au niveau pays et 85% au niveau ville. Nous mettons à jour hebdomadairement avec des données fraîches de multiples fournisseurs.' },
      { q: 'Puis-je créer des règles de routage personnalisées?', a: 'Oui. Vous pouvez router selon n\'importe quelle combinaison de pays, langue, mots-clés, tags client, heure du jour, compétences agent et champs personnalisés.' },
      { q: 'Que se passe-t-il si aucun agent n\'est disponible?', a: 'GEO Gateway a un failover intégré. Les conversations vont aux équipes backup, files overflow ou réponse auto IA selon vos paramètres.' },
      { q: 'Ça fonctionne avec WhatsApp?', a: 'Oui. GEO Gateway fonctionne avec WhatsApp Business API, widget web, Instagram, Facebook Messenger, Telegram et tous les canaux CatyAI.' },
      { q: 'Quelle est la rapidité du routage?', a: 'Sub-seconde. Les 6 couches traitent en parallèle, les décisions sont prises en moins de 100ms — imperceptible pour vos clients.' },
      { q: 'Y a-t-il une limite de pays ou langues?', a: 'Aucune limite. GEO Gateway supporte 180+ pays et 95+ langues. Ajoutez des régions et variantes de langue personnalisées selon vos besoins.' }
    ],

    ctaTitle: 'Routez Plus Intelligent, Convertissez Plus',
    ctaSubtitle: 'GEO Gateway est inclus dans tous les plans Pro et Enterprise.',
    ctaButton: 'Commencer l\'Essai Gratuit',

    nav: { home: 'Accueil', features: 'Fonctionnalités', howItWorks: 'Comment ça marche', pricing: 'Tarifs', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer Gratuit' },
    footer: {
      tagline: 'IA qui route intelligemment.',
      product: 'Produit',
      company: 'Entreprise',
      legal: 'Légal',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      whatsapp: 'WhatsApp AI',
      about: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      gdpr: 'RGPD',
      copyright: '© 2024 PayAi-X FZE. Tous droits réservés.'
    }
  }
}

function LanguageSelector({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false)
  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'EN' },
    { code: 'ro', flag: '🇷🇴', name: 'RO' },
    { code: 'es', flag: '🇪🇸', name: 'ES' },
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
    { code: 'fr', flag: '🇫🇷', name: 'FR' }
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
              className={`w-full px-3 py-1.5 text-left text-sm flex items-center gap-2 hover:bg-[#1a2744] ${lang === l.code ? 'text-blue-400' : 'text-gray-300'}`}>
              <span>{l.flag}</span> {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GeoGateway() {
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO
        title="GEO Gateway | CatyAI - Intelligent Geographic Traffic Routing"
        description="6-layer intelligent routing: GeoIP detection, language analysis, timezone routing, business rules, load balancing, and failover. Route conversations to the right team automatically."
        url="https://catyai.io/geo-gateway"
        service={{
          name: 'GEO Gateway',
          description: '6-layer intelligent geographic routing for WhatsApp and all channels. Automatic GeoIP detection, language analysis, timezone-aware routing, custom business rules, real-time load balancing, and failover protection.',
          price: '0',
          features: ['GeoIP Detection', 'Language Analysis', 'Timezone Routing', 'Business Rules', 'Load Balancing', 'Failover Protection']
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-[#1a2744]/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/images/caty-logo-arrow.png" alt="CatyAI" className="h-10" width="40" height="40" />
              <span className="text-xl font-bold"><span className="text-white">Caty</span><span className="text-gold">AI</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">{t.nav.home}</Link>
              <a href="#layers" className="text-gray-300 hover:text-white transition-colors">{t.nav.features}</a>
              <a href="#how" className="text-gray-300 hover:text-white transition-colors">{t.nav.howItWorks}</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">{t.nav.faq}</a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector lang={lang} setLang={setLang} />
              <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white">{t.nav.login}</a>
              <a href="https://app.catyai.io/signup" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90">{t.nav.getStarted}</a>
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
                <a href="#layers" className="text-gray-300 hover:text-white">{t.nav.features}</a>
                <a href="#how" className="text-gray-300 hover:text-white">{t.nav.howItWorks}</a>
                <a href="#faq" className="text-gray-300 hover:text-white">{t.nav.faq}</a>
                <a href="https://app.catyai.io/signup" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl text-center">{t.nav.getStarted}</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {t.heroTitle1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t.heroTitle2}</span>
              </h1>

              <p className="text-gray-400 text-xl mb-8 leading-relaxed">{t.heroSubtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="https://app.catyai.io/signup" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t.heroCta}
                </a>
                <a href="#layers" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A1628]/50 text-white font-semibold text-lg rounded-2xl border border-[#1a2744] hover:bg-[#1a2744]/50 transition-all">
                  {t.heroCtaSecondary}
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                {[t.trustBadge1, t.trustBadge2, t.trustBadge3].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Globe Visual */}
            <div className="relative mx-auto">
              <div className="w-72 h-72 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full"></div>
                <div className="absolute inset-8 bg-[#010A1F] rounded-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Floating indicators */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">ROUTING</div>
                <div className="absolute top-1/4 -left-8 bg-[#0A1628] border border-blue-500/50 px-2 py-1 rounded text-xs text-blue-400">🇺🇸 USA</div>
                <div className="absolute top-1/2 -right-8 bg-[#0A1628] border border-cyan-500/50 px-2 py-1 rounded text-xs text-cyan-400">🇧🇷 Brazil</div>
                <div className="absolute bottom-1/4 -left-4 bg-[#0A1628] border border-blue-500/50 px-2 py-1 rounded text-xs text-blue-400">🇫🇷 France</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.problemTitle} <span className="text-blue-400">{t.problemHighlight}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
            {t.problemStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xl text-blue-400 font-semibold">{t.problemSolution}</p>
        </div>
      </section>

      {/* 6 Layers */}
      <section id="layers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.solutionTitle}</h2>
            <p className="text-gray-400 text-lg">{t.solutionSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.layers.map((layer, i) => (
              <div key={i} className="p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl">{layer.icon}</div>
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">{i + 1}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{layer.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{layer.desc}</p>
                <div className="text-blue-400 text-xs font-medium">{layer.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.howTitle}</h2>
            <p className="text-gray-400 text-lg">{t.howSubtitle}</p>
          </div>
          <div className="space-y-6">
            {t.howSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-6 p-6 bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-3xl flex-shrink-0">{step.icon}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">{i + 1}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
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
              <div className="text-center text-blue-400 font-bold">With GEO Gateway</div>
            </div>
            {t.comparisonItems.map((item, i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-t border-[#1a2744]/50">
                <div className="text-gray-300">{item.feature}</div>
                <div className="text-center text-gray-400">{item.without}</div>
                <div className="text-center text-blue-400 font-semibold">{item.with}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.dashboardTitle}</h2>
            <p className="text-gray-400 text-lg">{t.dashboardSubtitle}</p>
          </div>
          <div className="bg-[#0A1628]/30 rounded-2xl border border-[#1a2744]/50 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {t.dashboardFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#010A1F] rounded-xl p-4 border border-[#1a2744]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-blue-500/20 rounded w-3/4"></div>
                  <div className="h-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded flex items-center justify-center">
                    <span className="text-blue-400 text-sm">🌍 Live World Map</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-blue-500/10 rounded flex items-center justify-center text-xs text-blue-400">🇺🇸 32%</div>
                    <div className="h-12 bg-cyan-500/10 rounded flex items-center justify-center text-xs text-cyan-400">🇧🇷 28%</div>
                    <div className="h-12 bg-blue-500/10 rounded flex items-center justify-center text-xs text-blue-400">🇪🇸 18%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-blue-950/30 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-8">{t.ctaSubtitle}</p>
          <a href="https://app.catyai.io/signup" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xl rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {t.ctaButton}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 border-t border-[#1a2744]/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <img src="/images/caty-logo-arrow.png" alt="CatyAI" className="h-8" width="32" height="32" />
                <span className="text-lg font-bold"><span className="text-white">Caty</span><span className="text-gold">AI</span></span>
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
          <div className="pt-8 border-t border-[#1a2744]/50 text-center text-gray-400 text-sm">{t.footer.copyright}</div>
        </div>
      </footer>
    </div>
  )
}
