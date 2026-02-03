import { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
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

// Language Context
const LanguageContext = createContext()

const translations = {
  en: {
    nav: { home: 'Home', features: 'Features', howItWorks: 'How it Works', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Get Started Free' },
    hero: {
      badge: 'AI-Powered Chatbot',
      title1: 'AI That Actually',
      title2: 'Converts',
      subtitle: 'Transform your website visitors into paying customers with an intelligent chatbot that understands intent, captures leads, and works 24/7.',
      cta1: 'Start Free Trial',
      cta2: 'See How It Works',
      analyzeLink: 'Analyze your website FREE - See AI insights in real-time',
      noCard: 'No credit card required',
      fiveMin: '5-minute setup',
      cancel: 'Cancel anytime',
      tryMe: 'Try Me Now!',
      tryMeDesc: 'Click the chat icon in the bottom right corner',
      tryWidget: 'Try the real widget',
      mockupOnline: 'Online',
      mockupGreeting: "Hi! I'm Caty, your AI assistant. How can I help you today?",
      mockupUserQ: 'What pricing plans do you offer?',
      mockupBotA: 'We offer Free, Starter (€149/mo), Growth (€299/mo), Business (€499/mo), and Enterprise plans. Would you like details on any specific plan?',
      mockupPlaceholder: 'Type a message...'
    },
    features: {
      title: 'Everything You Need to',
      titleHighlight: 'Convert More',
      subtitle: 'Powerful AI features that work together to turn visitors into customers',
      intentTitle: 'Intent Detection',
      intentDesc: 'AI understands what visitors want - ready to buy, need support, or just browsing. Responds appropriately every time.',
      leadTitle: 'Lead Capture',
      leadDesc: 'Automatically collect contact information at the right moment. Smart forms that dont feel pushy.',
      kbTitle: 'Knowledge Base',
      kbDesc: 'Train your AI on your products, FAQs, and docs. Answers questions accurately with your actual information.',
      availTitle: '24/7 Availability',
      availDesc: 'Never miss a lead again. Your AI assistant works around the clock, even when youre sleeping.',
      handoffTitle: 'Human Handoff',
      handoffDesc: 'Seamlessly transfer complex issues to your team. AI knows when to escalate.',
      analyticsTitle: 'Analytics Dashboard',
      analyticsDesc: 'Track conversations, conversion rates, and ROI. Know exactly whats working.'
    },
    howItWorks: {
      title: 'Live in',
      titleHighlight: '5 Minutes',
      subtitle: 'No complex setup. No coding required. Just copy, paste, and convert.',
      step1Title: 'Install Widget',
      step1Desc: 'One-click integrations for WordPress, Shopify, WooCommerce. Or add one line of code to any website. Works everywhere.',
      step2Title: 'Train Your AI',
      step2Desc: 'Upload FAQs and docs, OR use Auto-Crawl to scan your entire website automatically. Caty learns your business in minutes.',
      step3Title: 'Start Converting',
      step3Desc: 'Watch as Caty engages visitors, answers questions, captures leads, and drives sales 24/7. Real-time analytics included.'
    },
    integrations: {
      title: 'Powerful',
      titleHighlight: 'Integrations',
      subtitle: 'Connect your favorite platforms with one click. No technical skills required.',
      wordpress: {
        title: 'WordPress',
        desc: 'One-click plugin installation. Sync your posts, products, and pages automatically. Works with WooCommerce.'
      },
      shopify: {
        title: 'Shopify',
        desc: 'Instant integration with your Shopify store. Auto-sync products, collections, and inventory in real-time.'
      },
      autoCrawl: {
        title: 'Auto-Crawl',
        desc: 'Let Caty scan your entire website automatically. Extract content, products, and FAQs without manual upload.'
      }
    },
    pricing: {
      title: 'Simple, Transparent',
      titleHighlight: 'Pricing',
      subtitle: 'Simple, transparent pricing for every business',
      mostPopular: 'Most Popular',
      sessions: 'Sessions',
      widgets: 'Widgets',
      perMonth: '/mo',
      setup: 'setup',
      startFree: 'Start Free',
      getStarted: 'Get Started',
      contactSales: 'Contact Sales',
      trial: 'All paid plans include a 14-day free trial. No credit card required.',
      free: { name: 'Free', features: ['Basic chat', 'Lead capture', 'Email support'] },
      starter: { name: 'Starter', features: ['Everything in Free', 'Behavioral tracking', 'Proactive messages', 'Priority support'] },
      growth: { name: 'Growth', features: ['Everything in Starter', 'CRM integrations', 'Live handoff', 'Advanced analytics'] },
      business: { name: 'Business', features: ['Everything in Growth', 'White-label', 'API access', 'Account manager'] },
      enterprise: { name: 'Enterprise', features: ['Everything in Business', 'SSO / SAML', 'SLA guarantee', 'Dedicated support'] }
    },
    faq: {
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      subtitle: 'Everything you need to know about Caty.AI',
      q1: 'How does Caty.AI work?',
      a1: 'Caty.AI is a smart chatbot widget that you embed on your website. It uses advanced AI to understand visitor questions and respond intelligently. You can train it on your specific products, FAQs, and documentation so it gives accurate answers about your business.',
      q2: 'How long does setup take?',
      a2: 'Most customers are live in under 5 minutes. Just copy our script tag into your website, configure your widget in our dashboard, and you are ready to go. No coding required.',
      q3: 'Can I customize the appearance?',
      a3: 'Absolutely! You can customize colors, position, greeting messages, avatar, and more to match your brand. The widget is designed to feel like a natural part of your website.',
      q4: 'What happens when Caty cannot answer a question?',
      a4: 'Caty is smart about knowing its limits. When it cannot answer confidently, it can either collect the visitors info for follow-up, transfer to a human agent, or offer to create a support ticket - whatever you configure.',
      q5: 'Is my data secure?',
      a5: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are GDPR compliant and never use your data to train AI models. Your business information stays yours.',
      q6: 'Can I cancel anytime?',
      a6: 'Yes, you can cancel your subscription at any time. No long-term contracts, no cancellation fees. Your service continues until the end of your billing period.'
    },
    cta: {
      title: 'Ready to Convert More Visitors?',
      subtitle: 'Join thousands of businesses using Caty.AI to grow their revenue. Start your free trial today - no credit card required.',
      btn1: 'Start Free Trial',
      btn2: 'View Dashboard Demo'
    },
    footer: {
      tagline: 'The AI chatbot that actually converts. Built for businesses that want results.',
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
      badge: 'Chatbot cu AI',
      title1: 'AI care chiar',
      title2: 'Convertește',
      subtitle: 'Transformă vizitatorii site-ului în clienți plătitori cu un chatbot inteligent care înțelege intenția, captează lead-uri și lucrează 24/7.',
      cta1: 'Încearcă Gratuit',
      cta2: 'Vezi cum funcționează',
      analyzeLink: 'Analizează-ți site-ul GRATUIT - Vezi insight-uri AI în timp real',
      noCard: 'Fără card bancar',
      fiveMin: 'Setup în 5 minute',
      cancel: 'Anulează oricând',
      tryMe: 'Încearcă-mă!',
      tryMeDesc: 'Click pe iconița de chat din colțul dreapta jos',
      tryWidget: 'Încearcă widget-ul real',
      mockupOnline: 'Online',
      mockupGreeting: 'Bună! Sunt Caty, asistentul tău AI. Cu ce te pot ajuta astăzi?',
      mockupUserQ: 'Ce planuri de prețuri aveți?',
      mockupBotA: 'Oferim planurile Free, Starter (€149/lună), Growth (€299/lună), Business (€499/lună) și Enterprise. Dorești detalii despre un plan anume?',
      mockupPlaceholder: 'Scrie un mesaj...'
    },
    features: {
      title: 'Tot ce ai nevoie pentru a',
      titleHighlight: 'Converti Mai Mult',
      subtitle: 'Funcții AI puternice care lucrează împreună pentru a transforma vizitatorii în clienți',
      intentTitle: 'Detectare Intenție',
      intentDesc: 'AI înțelege ce vor vizitatorii - gata să cumpere, au nevoie de suport sau doar navighează.',
      leadTitle: 'Captare Lead-uri',
      leadDesc: 'Colectează automat informații de contact la momentul potrivit. Formulare smart care nu par insistente.',
      kbTitle: 'Bază de Cunoștințe',
      kbDesc: 'Antrenează AI pe produsele, FAQ-urile și documentația ta. Răspunde precis cu informațiile tale.',
      availTitle: 'Disponibil 24/7',
      availDesc: 'Nu mai pierde niciun lead. Asistentul tău AI lucrează non-stop, chiar și când dormi.',
      handoffTitle: 'Transfer la Om',
      handoffDesc: 'Transferă fără probleme problemele complexe echipei tale. AI știe când să escaladeze.',
      analyticsTitle: 'Dashboard Analytics',
      analyticsDesc: 'Urmărește conversațiile, ratele de conversie și ROI. Știi exact ce funcționează.'
    },
    howItWorks: {
      title: 'Live în',
      titleHighlight: '5 Minute',
      subtitle: 'Fără configurare complicată. Fără cod. Doar copiază, lipește și convertește.',
      step1Title: 'Instalează Widget',
      step1Desc: 'Integrări one-click pentru WordPress, Shopify, WooCommerce. Sau adaugă o linie de cod pe orice site. Funcționează peste tot.',
      step2Title: 'Antrenează AI-ul',
      step2Desc: 'Încarcă FAQ-uri și documente, SAU folosește Auto-Crawl să scaneze automat întreg site-ul. Caty învață business-ul tău în minute.',
      step3Title: 'Începe să Convertești',
      step3Desc: 'Privește cum Caty interacționează cu vizitatorii, răspunde la întrebări, captează lead-uri și generează vânzări 24/7. Analytics în timp real inclus.'
    },
    integrations: {
      title: 'Integrări',
      titleHighlight: 'Puternice',
      subtitle: 'Conectează platformele tale favorite cu un singur click. Fără cunoștințe tehnice necesare.',
      wordpress: {
        title: 'WordPress',
        desc: 'Instalare plugin cu un click. Sincronizare automată a postărilor, produselor și paginilor. Funcționează cu WooCommerce.'
      },
      shopify: {
        title: 'Shopify',
        desc: 'Integrare instantanee cu magazinul tău Shopify. Auto-sincronizare produse, colecții și inventar în timp real.'
      },
      autoCrawl: {
        title: 'Auto-Crawl',
        desc: 'Lasă Caty să scaneze automat întreg site-ul tău. Extrage conținut, produse și FAQ-uri fără upload manual.'
      }
    },
    pricing: {
      title: 'Prețuri',
      titleHighlight: 'Transparente',
      subtitle: 'Prețuri simple și transparente pentru orice business',
      mostPopular: 'Cel mai popular',
      sessions: 'Sesiuni',
      widgets: 'Widget-uri',
      perMonth: '/lună',
      setup: 'setup',
      startFree: 'Începe Gratuit',
      getStarted: 'Începe',
      contactSales: 'Contactează Vânzări',
      trial: 'Toate planurile includ 14 zile gratuit. Fără card bancar.',
      free: { name: 'Gratuit', features: ['Chat de bază', 'Captare lead-uri', 'Suport email'] },
      starter: { name: 'Starter', features: ['Tot din Gratuit', 'Tracking comportament', 'Mesaje proactive', 'Suport prioritar'] },
      growth: { name: 'Growth', features: ['Tot din Starter', 'Integrări CRM', 'Transfer live', 'Analytics avansat'] },
      business: { name: 'Business', features: ['Tot din Growth', 'White-label', 'Acces API', 'Account manager'] },
      enterprise: { name: 'Enterprise', features: ['Tot din Business', 'SSO / SAML', 'Garanție SLA', 'Suport dedicat'] }
    },
    faq: {
      title: 'Întrebări',
      titleHighlight: 'Frecvente',
      subtitle: 'Tot ce trebuie să știi despre Caty.AI',
      q1: 'Cum funcționează Caty.AI?',
      a1: 'Caty.AI este un widget chatbot inteligent pe care îl integrezi pe site. Folosește AI avansat pentru a înțelege întrebările vizitatorilor și a răspunde inteligent.',
      q2: 'Cât durează configurarea?',
      a2: 'Majoritatea clienților sunt live în sub 5 minute. Copiază tag-ul script pe site, configurează widget-ul în dashboard și ești gata.',
      q3: 'Pot personaliza aspectul?',
      a3: 'Absolut! Poți personaliza culorile, poziția, mesajele de salut, avatarul și multe altele pentru a se potrivi cu brandul tău.',
      q4: 'Ce se întâmplă când Caty nu poate răspunde?',
      a4: 'Caty știe când să-și recunoască limitele. Poate colecta info pentru follow-up, transfera la un agent uman sau crea un ticket de suport.',
      q5: 'Datele mele sunt sigure?',
      a5: 'Da. Toate datele sunt criptate în tranzit (TLS 1.3) și în repaus (AES-256). Suntem conformi GDPR și nu folosim datele tale pentru antrenament AI.',
      q6: 'Pot anula oricând?',
      a6: 'Da, poți anula abonamentul oricând. Fără contracte pe termen lung, fără taxe de anulare.'
    },
    cta: {
      title: 'Gata să Convertești Mai Mulți Vizitatori?',
      subtitle: 'Alătură-te miilor de business-uri care folosesc Caty.AI pentru a-și crește veniturile. Începe gratuit - fără card bancar.',
      btn1: 'Încearcă Gratuit',
      btn2: 'Vezi Demo Dashboard'
    },
    footer: {
      tagline: 'Chatbot-ul AI care chiar convertește. Creat pentru business-uri care vor rezultate.',
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
      badge: 'Chatbot con IA',
      title1: 'IA que realmente',
      title2: 'Convierte',
      subtitle: 'Transforma los visitantes de tu sitio web en clientes con un chatbot inteligente que entiende la intención, captura leads y trabaja 24/7.',
      cta1: 'Prueba Gratis',
      cta2: 'Ver cómo funciona',
      analyzeLink: 'Analiza tu sitio GRATIS - Ve insights de IA en tiempo real',
      noCard: 'Sin tarjeta de crédito',
      fiveMin: 'Configuración en 5 min',
      cancel: 'Cancela cuando quieras',
      tryMe: '¡Pruébame!',
      tryMeDesc: 'Haz clic en el icono de chat en la esquina inferior derecha',
      tryWidget: 'Prueba el widget real',
      mockupOnline: 'En línea',
      mockupGreeting: '¡Hola! Soy Caty, tu asistente de IA. ¿Cómo puedo ayudarte hoy?',
      mockupUserQ: '¿Qué planes de precios ofrecen?',
      mockupBotA: 'Ofrecemos Free, Starter (€149/mes), Growth (€299/mes), Business (€499/mes) y Enterprise. ¿Te gustaría más detalles sobre algún plan?',
      mockupPlaceholder: 'Escribe un mensaje...'
    },
    features: {
      title: 'Todo lo que necesitas para',
      titleHighlight: 'Convertir Más',
      subtitle: 'Potentes funciones de IA que trabajan juntas para convertir visitantes en clientes',
      intentTitle: 'Detección de Intención',
      intentDesc: 'La IA entiende lo que quieren los visitantes - listos para comprar, necesitan soporte o solo navegan.',
      leadTitle: 'Captura de Leads',
      leadDesc: 'Recopila automáticamente información de contacto en el momento adecuado.',
      kbTitle: 'Base de Conocimiento',
      kbDesc: 'Entrena tu IA con tus productos, FAQs y documentación.',
      availTitle: 'Disponible 24/7',
      availDesc: 'Nunca pierdas un lead. Tu asistente de IA trabaja las 24 horas.',
      handoffTitle: 'Transferencia Humana',
      handoffDesc: 'Transfiere problemas complejos a tu equipo sin problemas.',
      analyticsTitle: 'Panel de Analytics',
      analyticsDesc: 'Rastrea conversaciones, tasas de conversión y ROI.'
    },
    howItWorks: {
      title: 'En vivo en',
      titleHighlight: '5 Minutos',
      subtitle: 'Sin configuración compleja. Sin código. Solo copia, pega y convierte.',
      step1Title: 'Instala el Widget',
      step1Desc: 'Integraciones con un clic para WordPress, Shopify, WooCommerce. O añade una línea de código. Funciona en todas partes.',
      step2Title: 'Entrena tu IA',
      step2Desc: 'Sube FAQs y documentos, O usa Auto-Crawl para escanear tu sitio web automáticamente. Caty aprende tu negocio en minutos.',
      step3Title: 'Empieza a Convertir',
      step3Desc: 'Observa cómo Caty interactúa con visitantes, responde preguntas, captura leads y genera ventas 24/7. Analytics en tiempo real incluido.'
    },
    integrations: {
      title: 'Integraciones',
      titleHighlight: 'Potentes',
      subtitle: 'Conecta tus plataformas favoritas con un solo clic. No se requieren habilidades técnicas.',
      wordpress: {
        title: 'WordPress',
        desc: 'Instalación de plugin con un clic. Sincroniza tus publicaciones, productos y páginas automáticamente. Funciona con WooCommerce.'
      },
      shopify: {
        title: 'Shopify',
        desc: 'Integración instantánea con tu tienda Shopify. Auto-sincroniza productos, colecciones e inventario en tiempo real.'
      },
      autoCrawl: {
        title: 'Auto-Crawl',
        desc: 'Deja que Caty escanee tu sitio web completo automáticamente. Extrae contenido, productos y FAQs sin carga manual.'
      }
    },
    pricing: {
      title: 'Precios',
      titleHighlight: 'Transparentes',
      subtitle: 'Precios simples y transparentes para cualquier negocio',
      mostPopular: 'Más Popular',
      sessions: 'Sesiones',
      widgets: 'Widgets',
      perMonth: '/mes',
      setup: 'configuración',
      startFree: 'Empezar Gratis',
      getStarted: 'Empezar',
      contactSales: 'Contactar Ventas',
      trial: 'Todos los planes incluyen 14 días gratis. Sin tarjeta de crédito.',
      free: { name: 'Gratis', features: ['Chat básico', 'Captura de leads', 'Soporte email'] },
      starter: { name: 'Starter', features: ['Todo en Gratis', 'Tracking comportamiento', 'Mensajes proactivos', 'Soporte prioritario'] },
      growth: { name: 'Growth', features: ['Todo en Starter', 'Integraciones CRM', 'Transferencia en vivo', 'Analytics avanzado'] },
      business: { name: 'Business', features: ['Todo en Growth', 'White-label', 'Acceso API', 'Account manager'] },
      enterprise: { name: 'Enterprise', features: ['Todo en Business', 'SSO / SAML', 'Garantía SLA', 'Soporte dedicado'] }
    },
    faq: {
      title: 'Preguntas',
      titleHighlight: 'Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre Caty.AI',
      q1: '¿Cómo funciona Caty.AI?',
      a1: 'Caty.AI es un widget de chatbot inteligente que integras en tu sitio. Usa IA avanzada para entender preguntas y responder inteligentemente.',
      q2: '¿Cuánto tarda la configuración?',
      a2: 'La mayoría de clientes están en vivo en menos de 5 minutos.',
      q3: '¿Puedo personalizar la apariencia?',
      a3: '¡Absolutamente! Puedes personalizar colores, posición, mensajes de saludo y más.',
      q4: '¿Qué pasa cuando Caty no puede responder?',
      a4: 'Caty sabe reconocer sus límites. Puede recopilar info para seguimiento o transferir a un agente humano.',
      q5: '¿Mis datos están seguros?',
      a5: 'Sí. Todos los datos están encriptados. Somos compatibles con GDPR.',
      q6: '¿Puedo cancelar en cualquier momento?',
      a6: 'Sí, puedes cancelar tu suscripción en cualquier momento.'
    },
    cta: {
      title: '¿Listo para Convertir Más Visitantes?',
      subtitle: 'Únete a miles de negocios usando Caty.AI. Empieza gratis - sin tarjeta de crédito.',
      btn1: 'Prueba Gratis',
      btn2: 'Ver Demo'
    },
    footer: {
      tagline: 'El chatbot de IA que realmente convierte. Creado para negocios que quieren resultados.',
      product: 'Producto',
      company: 'Empresa',
      legal: 'Legal',
      about: 'Sobre nosotros',
      blog: 'Blog',
      careers: 'Carreras',
      contact: 'Contacto',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      gdpr: 'GDPR',
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
      badge: 'Chatbot com IA',
      title1: 'IA que realmente',
      title2: 'Converte',
      subtitle: 'Transforme os visitantes do seu site em clientes pagantes com um chatbot inteligente que entende a intenção, captura leads e trabalha 24/7.',
      cta1: 'Teste Grátis',
      cta2: 'Veja como funciona',
      analyzeLink: 'Analise seu site GRÁTIS - Veja insights de IA em tempo real',
      noCard: 'Sem cartão de crédito',
      fiveMin: 'Configuração em 5 min',
      cancel: 'Cancele quando quiser',
      tryMe: 'Experimente!',
      tryMeDesc: 'Clique no ícone de chat no canto inferior direito',
      tryWidget: 'Experimente o widget real',
      mockupOnline: 'Online',
      mockupGreeting: 'Olá! Sou a Caty, sua assistente de IA. Como posso ajudá-lo hoje?',
      mockupUserQ: 'Quais planos de preços vocês oferecem?',
      mockupBotA: 'Oferecemos Free, Starter (€149/mês), Growth (€299/mês), Business (€499/mês) e Enterprise. Gostaria de mais detalhes sobre algum plano?',
      mockupPlaceholder: 'Digite uma mensagem...'
    },
    features: {
      title: 'Tudo que você precisa para',
      titleHighlight: 'Converter Mais',
      subtitle: 'Recursos de IA poderosos que trabalham juntos para converter visitantes em clientes',
      intentTitle: 'Detecção de Intenção',
      intentDesc: 'A IA entende o que os visitantes querem - prontos para comprar, precisam de suporte ou apenas navegando.',
      leadTitle: 'Captura de Leads',
      leadDesc: 'Colete automaticamente informações de contato no momento certo.',
      kbTitle: 'Base de Conhecimento',
      kbDesc: 'Treine sua IA com seus produtos, FAQs e documentação.',
      availTitle: 'Disponível 24/7',
      availDesc: 'Nunca perca um lead. Seu assistente de IA trabalha o tempo todo.',
      handoffTitle: 'Transferência Humana',
      handoffDesc: 'Transfira problemas complexos para sua equipe sem problemas.',
      analyticsTitle: 'Painel de Analytics',
      analyticsDesc: 'Acompanhe conversas, taxas de conversão e ROI.'
    },
    howItWorks: {
      title: 'Ao vivo em',
      titleHighlight: '5 Minutos',
      subtitle: 'Sem configuração complexa. Sem código. Apenas copie, cole e converta.',
      step1Title: 'Instale o Widget',
      step1Desc: 'Integrações com um clique para WordPress, Shopify, WooCommerce. Ou adicione uma linha de código. Funciona em qualquer lugar.',
      step2Title: 'Treine sua IA',
      step2Desc: 'Faça upload de FAQs e documentos, OU use Auto-Crawl para escanear seu site automaticamente. Caty aprende seu negócio em minutos.',
      step3Title: 'Comece a Converter',
      step3Desc: 'Veja como Caty interage com visitantes, responde perguntas, captura leads e gera vendas 24/7. Analytics em tempo real incluído.'
    },
    integrations: {
      title: 'Integrações',
      titleHighlight: 'Poderosas',
      subtitle: 'Conecte suas plataformas favoritas com um único clique. Nenhuma habilidade técnica necessária.',
      wordpress: {
        title: 'WordPress',
        desc: 'Instalação de plugin com um clique. Sincronize suas postagens, produtos e páginas automaticamente. Funciona com WooCommerce.'
      },
      shopify: {
        title: 'Shopify',
        desc: 'Integração instantânea com sua loja Shopify. Auto-sincronize produtos, coleções e inventário em tempo real.'
      },
      autoCrawl: {
        title: 'Auto-Crawl',
        desc: 'Deixe Caty escanear todo o seu site automaticamente. Extraia conteúdo, produtos e FAQs sem upload manual.'
      }
    },
    pricing: {
      title: 'Preços',
      titleHighlight: 'Transparentes',
      subtitle: 'Preços simples e transparentes para qualquer negócio',
      mostPopular: 'Mais Popular',
      sessions: 'Sessões',
      widgets: 'Widgets',
      perMonth: '/mês',
      setup: 'configuração',
      startFree: 'Começar Grátis',
      getStarted: 'Começar',
      contactSales: 'Contatar Vendas',
      trial: 'Todos os planos incluem 14 dias grátis. Sem cartão de crédito.',
      free: { name: 'Grátis', features: ['Chat básico', 'Captura de leads', 'Suporte email'] },
      starter: { name: 'Starter', features: ['Tudo no Grátis', 'Tracking comportamento', 'Mensagens proativas', 'Suporte prioritário'] },
      growth: { name: 'Growth', features: ['Tudo no Starter', 'Integrações CRM', 'Transferência ao vivo', 'Analytics avançado'] },
      business: { name: 'Business', features: ['Tudo no Growth', 'White-label', 'Acesso API', 'Account manager'] },
      enterprise: { name: 'Enterprise', features: ['Tudo no Business', 'SSO / SAML', 'Garantia SLA', 'Suporte dedicado'] }
    },
    faq: {
      title: 'Perguntas',
      titleHighlight: 'Frequentes',
      subtitle: 'Tudo que você precisa saber sobre Caty.AI',
      q1: 'Como funciona Caty.AI?',
      a1: 'Caty.AI é um widget de chatbot inteligente que você integra ao seu site. Usa IA avançada para entender perguntas e responder inteligentemente.',
      q2: 'Quanto tempo leva a configuração?',
      a2: 'A maioria dos clientes está ao vivo em menos de 5 minutos.',
      q3: 'Posso personalizar a aparência?',
      a3: 'Absolutamente! Você pode personalizar cores, posição, mensagens de saudação e mais.',
      q4: 'O que acontece quando Caty não pode responder?',
      a4: 'Caty sabe reconhecer seus limites. Pode coletar info para acompanhamento ou transferir para um agente humano.',
      q5: 'Meus dados estão seguros?',
      a5: 'Sim. Todos os dados são criptografados. Somos compatíveis com GDPR.',
      q6: 'Posso cancelar a qualquer momento?',
      a6: 'Sim, você pode cancelar sua assinatura a qualquer momento.'
    },
    cta: {
      title: 'Pronto para Converter Mais Visitantes?',
      subtitle: 'Junte-se a milhares de negócios usando Caty.AI. Comece grátis - sem cartão de crédito.',
      btn1: 'Teste Grátis',
      btn2: 'Ver Demo'
    },
    footer: {
      tagline: 'O chatbot de IA que realmente converte. Criado para negócios que querem resultados.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      about: 'Sobre',
      blog: 'Blog',
      careers: 'Carreiras',
      contact: 'Contato',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
      gdpr: 'GDPR',
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
      badge: 'Chatbot IA',
      title1: 'Une IA qui',
      title2: 'Convertit',
      subtitle: 'Transformez les visiteurs de votre site en clients payants avec un chatbot intelligent qui comprend l\'intention, capture des leads et travaille 24/7.',
      cta1: 'Essai Gratuit',
      cta2: 'Voir comment ça marche',
      analyzeLink: 'Analysez votre site GRATUITEMENT - Voyez les insights IA en temps réel',
      noCard: 'Sans carte bancaire',
      fiveMin: 'Configuration en 5 min',
      cancel: 'Annulez quand vous voulez',
      tryMe: 'Essayez-moi!',
      tryMeDesc: 'Cliquez sur l\'icône de chat en bas à droite',
      tryWidget: 'Essayez le vrai widget',
      mockupOnline: 'En ligne',
      mockupGreeting: 'Bonjour! Je suis Caty, votre assistant IA. Comment puis-je vous aider aujourd\'hui?',
      mockupUserQ: 'Quels plans tarifaires proposez-vous?',
      mockupBotA: 'Nous proposons Free, Starter (€149/mois), Growth (€299/mois), Business (€499/mois) et Enterprise. Voulez-vous plus de détails sur un plan?',
      mockupPlaceholder: 'Tapez un message...'
    },
    features: {
      title: 'Tout ce dont vous avez besoin pour',
      titleHighlight: 'Convertir Plus',
      subtitle: 'Des fonctionnalités IA puissantes qui travaillent ensemble pour convertir les visiteurs en clients',
      intentTitle: 'Détection d\'Intention',
      intentDesc: 'L\'IA comprend ce que veulent les visiteurs - prêts à acheter, besoin de support ou juste en navigation.',
      leadTitle: 'Capture de Leads',
      leadDesc: 'Collectez automatiquement les informations de contact au bon moment.',
      kbTitle: 'Base de Connaissances',
      kbDesc: 'Entraînez votre IA sur vos produits, FAQs et documentation.',
      availTitle: 'Disponible 24/7',
      availDesc: 'Ne manquez plus jamais un lead. Votre assistant IA travaille en permanence.',
      handoffTitle: 'Transfert Humain',
      handoffDesc: 'Transférez les problèmes complexes à votre équipe sans problème.',
      analyticsTitle: 'Tableau de Bord Analytics',
      analyticsDesc: 'Suivez les conversations, taux de conversion et ROI.'
    },
    howItWorks: {
      title: 'En ligne en',
      titleHighlight: '5 Minutes',
      subtitle: 'Pas de configuration complexe. Pas de code. Copiez, collez et convertissez.',
      step1Title: 'Installez le Widget',
      step1Desc: 'Intégrations en un clic pour WordPress, Shopify, WooCommerce. Ou ajoutez une ligne de code. Fonctionne partout.',
      step2Title: 'Entraînez votre IA',
      step2Desc: 'Téléchargez FAQs et documents, OU utilisez Auto-Crawl pour scanner votre site automatiquement. Caty apprend votre entreprise en minutes.',
      step3Title: 'Commencez à Convertir',
      step3Desc: 'Regardez Caty interagir avec les visiteurs, répondre aux questions, capturer des leads et générer des ventes 24/7. Analytics en temps réel inclus.'
    },
    integrations: {
      title: 'Intégrations',
      titleHighlight: 'Puissantes',
      subtitle: 'Connectez vos plateformes préférées en un clic. Aucune compétence technique requise.',
      wordpress: {
        title: 'WordPress',
        desc: 'Installation de plugin en un clic. Synchronisez vos articles, produits et pages automatiquement. Fonctionne avec WooCommerce.'
      },
      shopify: {
        title: 'Shopify',
        desc: 'Intégration instantanée avec votre boutique Shopify. Auto-synchronisez produits, collections et inventaire en temps réel.'
      },
      autoCrawl: {
        title: 'Auto-Crawl',
        desc: 'Laissez Caty scanner automatiquement tout votre site. Extrayez contenu, produits et FAQs sans téléchargement manuel.'
      }
    },
    pricing: {
      title: 'Tarifs',
      titleHighlight: 'Transparents',
      subtitle: 'Des tarifs simples et transparents pour toute entreprise',
      mostPopular: 'Le Plus Populaire',
      sessions: 'Sessions',
      widgets: 'Widgets',
      perMonth: '/mois',
      setup: 'configuration',
      startFree: 'Commencer Gratuit',
      getStarted: 'Commencer',
      contactSales: 'Contacter Ventes',
      trial: 'Tous les plans incluent 14 jours gratuits. Sans carte bancaire.',
      free: { name: 'Gratuit', features: ['Chat basique', 'Capture de leads', 'Support email'] },
      starter: { name: 'Starter', features: ['Tout dans Gratuit', 'Tracking comportement', 'Messages proactifs', 'Support prioritaire'] },
      growth: { name: 'Growth', features: ['Tout dans Starter', 'Intégrations CRM', 'Transfert en direct', 'Analytics avancé'] },
      business: { name: 'Business', features: ['Tout dans Growth', 'White-label', 'Accès API', 'Account manager'] },
      enterprise: { name: 'Enterprise', features: ['Tout dans Business', 'SSO / SAML', 'Garantie SLA', 'Support dédié'] }
    },
    faq: {
      title: 'Questions',
      titleHighlight: 'Fréquentes',
      subtitle: 'Tout ce que vous devez savoir sur Caty.AI',
      q1: 'Comment fonctionne Caty.AI?',
      a1: 'Caty.AI est un widget chatbot intelligent que vous intégrez à votre site. Il utilise l\'IA avancée pour comprendre les questions et répondre intelligemment.',
      q2: 'Combien de temps prend la configuration?',
      a2: 'La plupart des clients sont en ligne en moins de 5 minutes.',
      q3: 'Puis-je personnaliser l\'apparence?',
      a3: 'Absolument! Vous pouvez personnaliser les couleurs, la position, les messages d\'accueil et plus.',
      q4: 'Que se passe-t-il quand Caty ne peut pas répondre?',
      a4: 'Caty sait reconnaître ses limites. Il peut collecter des infos pour un suivi ou transférer à un agent humain.',
      q5: 'Mes données sont-elles sécurisées?',
      a5: 'Oui. Toutes les données sont chiffrées. Nous sommes conformes au RGPD.',
      q6: 'Puis-je annuler à tout moment?',
      a6: 'Oui, vous pouvez annuler votre abonnement à tout moment.'
    },
    cta: {
      title: 'Prêt à Convertir Plus de Visiteurs?',
      subtitle: 'Rejoignez des milliers d\'entreprises utilisant Caty.AI. Commencez gratuitement - sans carte bancaire.',
      btn1: 'Essai Gratuit',
      btn2: 'Voir Démo'
    },
    footer: {
      tagline: 'Le chatbot IA qui convertit vraiment. Conçu pour les entreprises qui veulent des résultats.',
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
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">{t.nav.home}</Link>
            <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">{t.nav.features}</Link>
            <Link to="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">{t.nav.howItWorks}</Link>
            <Link to="/#pricing" className="text-gray-300 hover:text-white transition-colors">{t.nav.pricing}</Link>
            <Link to="/#faq" className="text-gray-300 hover:text-white transition-colors">{t.nav.faq}</Link>
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
              <Link to="/" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link>
              <Link to="/#features" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</Link>
              <Link to="/#how-it-works" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.howItWorks}</Link>
              <Link to="/#pricing" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.pricing}</Link>
              <Link to="/#faq" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>{t.nav.faq}</Link>
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
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background Image - Full cover, more faded, responsive */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/caty-talk.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-top opacity-50"
        />
        {/* Stronger dark overlay for readability - more on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/85 via-gray-950/80 to-gray-950 sm:from-gray-950/80 sm:via-gray-950/75"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
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
            <a href="https://app.catyai.io/signup" className="btn-primary text-lg px-8 py-4">
              {t.hero.cta1}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              {t.hero.cta2}
            </a>
          </div>

          <div className="mb-16">
            <Link to="/analyze" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/30 text-primary-400 hover:text-primary-300 hover:border-primary-400/50 font-medium transition-all group">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
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

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10"></div>
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/caty-logo.png" alt="Caty" className="h-12 object-contain animate-pulse" />
              <div>
                <h3 className="font-semibold text-white">{t.hero.tryMe}</h3>
                <p className="text-sm text-gray-400">{t.hero.tryMeDesc}</p>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 max-w-md mx-auto">
              {/* Chat Widget Mockup */}
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-primary-600 px-4 py-3 flex items-center gap-3">
                  <img src="/images/caty-logo.png" alt="Caty" className="h-8 object-contain" />
                  <div>
                    <p className="text-white font-medium text-sm">Caty.AI</p>
                    <p className="text-primary-200 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      {t.hero.mockupOnline}
                    </p>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3 min-h-[200px]">
                  <div className="flex gap-2">
                    <img src="/images/caty-logo.png" alt="Caty" className="h-6 object-contain" />
                    <div className="bg-gray-800 rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
                      <p className="text-gray-200 text-sm">{t.hero.mockupGreeting}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary-600 rounded-lg rounded-tr-none px-3 py-2 max-w-[80%]">
                      <p className="text-white text-sm">{t.hero.mockupUserQ}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src="/images/caty-logo.png" alt="Caty" className="h-6 object-contain" />
                    <div className="bg-gray-800 rounded-lg rounded-tl-none px-3 py-2 max-w-[80%]">
                      <p className="text-gray-200 text-sm">{t.hero.mockupBotA}</p>
                    </div>
                  </div>
                </div>
                {/* Input */}
                <div className="px-4 pb-4">
                  <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
                    <span className="text-gray-500 text-sm flex-1">{t.hero.mockupPlaceholder}</span>
                    <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Floating indicator arrow pointing to widget */}
              <div className="flex items-center justify-end gap-2 mt-4 mr-[-20px]">
                <span className="text-primary-400 text-sm font-medium animate-pulse">{t.hero.tryWidget}</span>
                <svg className="w-6 h-6 text-primary-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const { t } = useLanguage()

  const featureIcons = [
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ]

  const features = [
    { icon: featureIcons[0], title: t.features.intentTitle, description: t.features.intentDesc },
    { icon: featureIcons[1], title: t.features.leadTitle, description: t.features.leadDesc },
    { icon: featureIcons[2], title: t.features.kbTitle, description: t.features.kbDesc },
    { icon: featureIcons[3], title: t.features.availTitle, description: t.features.availDesc },
    { icon: featureIcons[4], title: t.features.handoffTitle, description: t.features.handoffDesc },
    { icon: featureIcons[5], title: t.features.analyticsTitle, description: t.features.analyticsDesc }
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

// How It Works Section
function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    { number: '01', title: t.howItWorks.step1Title, description: t.howItWorks.step1Desc, code: '<script src="https://api.catyai.io/widget.js?v=20260203-1919" data-widget-id="YOUR_WIDGET_ID"></script>', image: '/images/caty-point-right.png' },
    { number: '02', title: t.howItWorks.step2Title, description: t.howItWorks.step2Desc, image: '/images/caty-think.png' },
    { number: '03', title: t.howItWorks.step3Title, description: t.howItWorks.step3Desc, image: '/images/caty-happy.png' }
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
                <div className="text-5xl font-bold text-primary-500/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                {step.image && (
                  <div className="flex justify-center my-4">
                    <img src={step.image} alt={step.title} className="h-32 object-contain" />
                  </div>
                )}
                {step.code && (
                  <div className="bg-gray-950 rounded-lg p-3 sm:p-4 overflow-x-auto mt-4">
                    <code className="text-xs sm:text-sm text-primary-400 break-all sm:break-normal sm:whitespace-nowrap">{step.code}</code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Integrations Section
function Integrations() {
  const { t } = useLanguage()

  const integrations = [
    {
      title: t.integrations.wordpress.title,
      description: t.integrations.wordpress.desc,
      image: '/images/caty-wave.png',
      badge: 'Plugin',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: t.integrations.shopify.title,
      description: t.integrations.shopify.desc,
      image: '/images/caty-walk.png',
      badge: 'App',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: t.integrations.autoCrawl.title,
      description: t.integrations.autoCrawl.desc,
      image: '/images/caty-point-left.png',
      badge: 'AI-Powered',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">{t.integrations.title} <span className="gradient-text">{t.integrations.titleHighlight}</span></h2>
        <p className="section-subtitle">{t.integrations.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {integrations.map((integration, index) => (
            <div key={index} className="card hover:border-primary-500/50 transition-all duration-300 group relative overflow-hidden">
              {/* Gradient overlay */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${integration.color}`}></div>

              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${integration.color} text-white`}>
                  {integration.badge}
                </span>
              </div>

              {/* Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={integration.image}
                  alt={integration.title}
                  className="h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 text-center">{integration.title}</h3>
              <p className="text-gray-400 text-center">{integration.description}</p>

              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function Pricing() {
  const { t } = useLanguage()

  const plans = [
    {
      id: 'free',
      name: t.pricing.free.name,
      price: '0',
      setupFee: null,
      sessions: '100',
      widgets: '1',
      features: t.pricing.free.features,
      cta: t.pricing.startFree,
      ctaLink: 'https://app.catyai.io/signup?plan=free',
      popular: false
    },
    {
      id: 'starter',
      name: t.pricing.starter.name,
      price: '149',
      setupFee: '499',
      sessions: '1,000',
      widgets: '1',
      features: t.pricing.starter.features,
      cta: t.pricing.getStarted,
      ctaLink: 'https://app.catyai.io/signup?plan=starter',
      popular: false
    },
    {
      id: 'growth',
      name: t.pricing.growth.name,
      price: '299',
      setupFee: '999',
      sessions: '5,000',
      widgets: '3',
      features: t.pricing.growth.features,
      cta: t.pricing.getStarted,
      ctaLink: 'https://app.catyai.io/signup?plan=growth',
      popular: true
    },
    {
      id: 'business',
      name: t.pricing.business.name,
      price: '499',
      setupFee: '1,999',
      sessions: '20,000',
      widgets: 'Unlimited',
      features: t.pricing.business.features,
      cta: t.pricing.getStarted,
      ctaLink: 'https://app.catyai.io/signup?plan=business',
      popular: false
    },
    {
      id: 'enterprise',
      name: t.pricing.enterprise.name,
      price: '800+',
      setupFee: '3,800',
      sessions: 'Unlimited',
      widgets: 'Unlimited',
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
        <p className="section-subtitle">
          {t.pricing.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
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
                <h3 className="text-lg font-semibold text-white mb-3">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-white">€{plan.price}</span>
                  <span className="text-gray-400 text-sm">{t.pricing.perMonth}</span>
                </div>
                {plan.setupFee && (
                  <p className="text-gray-500 text-xs mt-1">+€{plan.setupFee} {t.pricing.setup}</p>
                )}
              </div>

              <div className="border-t border-gray-800 pt-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>{t.pricing.sessions}</span>
                    <span className="text-white font-medium">{plan.sessions}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>{t.pricing.widgets}</span>
                    <span className="text-white font-medium">{plan.widgets}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaLink}
                className={`w-full block text-center py-2.5 rounded-lg font-medium transition-all ${
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

        <p className="text-center text-gray-500 text-sm mt-8">
          {t.pricing.trial}
        </p>
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
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
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
            <a href="https://app.catyai.io" className="btn-secondary text-lg px-8 py-4">
              {t.cta.btn2}
            </a>
          </div>
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
            <a href="https://twitter.com/catyai" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="https://linkedin.com/company/catyai" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/catyai" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
    window.location.href = '/analyze'
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
            🎯 <strong>Analyze your website FREE</strong> - See AI insights in real-time
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

// Home Page
function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Integrations />
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
      <Footer />
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
