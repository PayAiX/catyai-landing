import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FooterV9 from '../components/FooterV9'

const ppCss = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap');
.pp-page { background: #010A1F; min-height: 100vh; font-family: 'Inter', sans-serif; color: #e2e8f0; }
.pp-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: #C8A165; background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2); padding: 0.3rem 0.85rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.4rem; }
.pp-heading { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: #f8fafc; line-height: 1.15; }
.pp-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; transition: all 0.25s ease; display: flex; flex-direction: column; }
.pp-card:hover { border-color: rgba(200,161,101,0.18); }
.pp-card-hot { background: linear-gradient(160deg, rgba(200,161,101,0.07) 0%, rgba(1,10,31,0.7) 100%); border-color: rgba(200,161,101,0.35) !important; box-shadow: 0 0 40px rgba(200,161,101,0.08), inset 0 1px 0 rgba(200,161,101,0.15); }
.pp-check { color: #C8A165; flex-shrink: 0; margin-top: 2px; }
.pp-check-blue { color: #60a5fa; flex-shrink: 0; margin-top: 2px; }
.pp-btn-gold { background: linear-gradient(135deg, #C8A165, #D4B57A); color: #010A1F; font-weight: 700; border-radius: 10px; padding: 0.8rem 1.5rem; display: block; text-align: center; text-decoration: none; transition: opacity 0.2s; border: none; cursor: pointer; font-size: 0.9rem; }
.pp-btn-gold:hover { opacity: 0.9; }
.pp-btn-ghost { background: transparent; color: #94a3b8; font-weight: 600; border-radius: 10px; padding: 0.8rem 1.5rem; display: block; text-align: center; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); transition: all 0.2s; font-size: 0.9rem; }
.pp-btn-ghost:hover { border-color: rgba(200,161,101,0.3); color: #D4B57A; }
.pp-badge-hot { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.12em; background: linear-gradient(135deg, #C8A165, #D4B57A); color: #010A1F; font-weight: 700; padding: 0.25rem 0.7rem; border-radius: 999px; }
.pp-price { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #f8fafc; }
.pp-price-hot { color: #C8A165; }
.pp-addon { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; transition: all 0.25s ease; }
.pp-addon:hover { border-color: rgba(200,161,101,0.2); background: rgba(255,255,255,0.035); }
.pp-faq-item { border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.02); transition: border-color 0.2s; }
.pp-faq-item:hover { border-color: rgba(200,161,101,0.15); }
.pp-faq-item[open] { border-color: rgba(200,161,101,0.25); }
.pp-faq-item summary { list-style: none; cursor: pointer; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; font-weight: 600; color: #f1f5f9; }
.pp-faq-item summary::-webkit-details-marker { display: none; }
.pp-faq-item summary svg { flex-shrink: 0; transition: transform 0.2s; color: #64748b; }
.pp-faq-item[open] summary svg { transform: rotate(180deg); color: #C8A165; }
.pp-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(200,161,101,0.12), transparent); margin: 0 1.5rem; }
/* Nav */
.pp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(1,10,31,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.06); }
.pp-nav-link { color: #94a3b8; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: color 0.2s; }
.pp-nav-link:hover, .pp-nav-link.active { color: #f1f5f9; }
.pp-lang-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; padding: 0.35rem 0.7rem; border-radius: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; cursor: pointer; transition: all 0.2s; }
.pp-lang-btn:hover { border-color: rgba(200,161,101,0.3); color: #C8A165; }
`

const T = {
  en: {
    badge: 'Simple, Transparent Pricing',
    heroTitle: 'Plans for Every\nBusiness',
    heroSub: 'Start free. Scale when you\'re ready. No hidden fees.',
    popular: 'Most Popular',
    startFree: 'Start Free', getStarted: 'Get Started', contactSales: 'Contact Sales',
    addonsTitle: 'Add-Ons', addonsSub: 'Extend your plan with specialized modules',
    faqTitle: 'Common Questions',
    ctaTitle: 'Ready to Get Started?',
    ctaSub: 'Sign up for free — no credit card required.',
    tiers: [
      { name: 'Free', price: '€0', period: '/month', desc: 'Explore CatyAI with no commitment.', features: ['20 AI conversations/month','1 widget','Basic AI responses','CatyAI branding','Email support'], cta: 'Start Free', ctaLink: 'https://app.catyai.io/register', hot: false },
      { name: 'Starter', price: '€49', period: '/month', desc: 'For solo entrepreneurs and small teams getting started.', features: ['500 AI conversations/month','1 widget','Advanced AI responses','Knowledge base (5 docs)','Lead capture forms','Remove CatyAI branding','Email support'], cta: 'Get Started', ctaLink: 'https://app.catyai.io/register?plan=starter', hot: false },
      { name: 'Growth', price: '€99', period: '/month', desc: 'For growing businesses that need more conversations and customization.', features: ['2,000 AI conversations/month','3 widgets','Advanced AI responses','Knowledge base (20 docs)','GEO Gateway (AI visibility)','WhatsApp integration','FraudAI Shield','Priority support'], cta: 'Get Started', ctaLink: 'https://app.catyai.io/register?plan=growth', hot: true },
      { name: 'Business', price: '€199', period: '/month', desc: 'For established businesses with high conversation volume.', features: ['10,000 AI conversations/month','10 widgets','Advanced AI responses','Unlimited knowledge base','Full GEO Gateway suite','WhatsApp + multi-channel','FraudAI Shield + SENTINEL','Cart recovery system','Dedicated support'], cta: 'Get Started', ctaLink: 'https://app.catyai.io/register?plan=business', hot: false },
      { name: 'Enterprise', price: '€499', period: '/month', desc: 'For large organizations requiring custom solutions and SLAs.', features: ['Unlimited AI conversations','Unlimited widgets','Custom AI model fine-tuning','Unlimited knowledge base','Full GEO Gateway suite','All channel integrations','FraudAI Shield + SENTINEL','Custom integrations & API','SSO / SAML','SLA + dedicated account manager'], cta: 'Contact Sales', ctaLink: '/contact?plan=enterprise', hot: false },
    ],
    addons: [
      { icon: '📱', name: 'QR-First', price: '€10', period: '/month', desc: 'Deploy CatyAI without a website. A QR code + WhatsApp flow replaces your website for customer contact. Perfect for brick-and-mortar businesses.', features: ['Branded QR code generation','WhatsApp-first customer flow','No website required','Printable materials kit'], cta: 'Add QR-First', ctaLink: '/contact?product=qr-first' },
      { icon: '🤖', name: 'WhatsApp AI Secretary', price: '+€29', period: '/month', desc: 'A full AI secretary that manages your WhatsApp inbox: books appointments, qualifies leads, sends follow-ups, and handles routine questions around the clock.', features: ['Appointment booking via WhatsApp','Lead qualification flows','Automated follow-ups','24/7 availability','Calendar integration'], cta: 'Add Secretary', ctaLink: '/contact?product=wa-secretary' },
    ],
    faqs: [
      { q: 'Can I change plans at any time?', a: 'Yes. You can upgrade or downgrade your plan at any time from the dashboard. Changes take effect at the start of your next billing cycle. Upgrades apply immediately with prorated billing.' },
      { q: 'What happens when I reach my conversation limit?', a: 'When you reach your monthly conversation limit, the widget continues to work but responses are paused until the next billing cycle. You\'ll receive an email notification when you reach 80% of your limit.' },
      { q: 'Do add-ons work with all plans?', a: 'QR-First and WhatsApp AI Secretary are available on Starter plans and above. They cannot be combined with the Free plan. Both add-ons can be stacked with any paid tier.' },
    ],
    nav: { home: 'Home', features: 'Features', pricing: 'Pricing', faq: 'FAQ', login: 'Login', getStarted: 'Start Free' },
  },
  ro: {
    badge: 'Prețuri Simple și Transparente',
    heroTitle: 'Planuri pentru\nOrice Afacere',
    heroSub: 'Începe gratuit. Crești când ești pregătit. Fără taxe ascunse.',
    popular: 'Cel Mai Popular',
    startFree: 'Începe Gratuit', getStarted: 'Începe Acum', contactSales: 'Contactează Vânzări',
    addonsTitle: 'Module Suplimentare', addonsSub: 'Extinde-ți planul cu module specializate',
    faqTitle: 'Întrebări Frecvente',
    ctaTitle: 'Gata să Începi?',
    ctaSub: 'Înregistrează-te gratuit — fără card de credit.',
    tiers: [
      { name: 'Gratuit', price: '€0', period: '/lună', desc: 'Explorează CatyAI fără niciun angajament.', features: ['20 conversații AI/lună','1 widget','Răspunsuri AI de bază','Branding CatyAI','Suport email'], cta: 'Începe Gratuit', ctaLink: 'https://app.catyai.io/register', hot: false },
      { name: 'Starter', price: '€49', period: '/lună', desc: 'Pentru antreprenori și echipe mici care fac primii pași.', features: ['500 conversații AI/lună','1 widget','Răspunsuri AI avansate','Bază de cunoștințe (5 doc.)','Formulare captare lead-uri','Elimini brandul CatyAI','Suport email'], cta: 'Începe Acum', ctaLink: 'https://app.catyai.io/register?plan=starter', hot: false },
      { name: 'Growth', price: '€99', period: '/lună', desc: 'Pentru afaceri în creștere care au nevoie de mai multe conversații și personalizare.', features: ['2.000 conversații AI/lună','3 widgeturi','Răspunsuri AI avansate','Bază de cunoștințe (20 doc.)','GEO Gateway (vizibilitate AI)','Integrare WhatsApp','FraudAI Shield','Suport prioritar'], cta: 'Începe Acum', ctaLink: 'https://app.catyai.io/register?plan=growth', hot: true },
      { name: 'Business', price: '€199', period: '/lună', desc: 'Pentru afaceri consacrate cu volum mare de conversații.', features: ['10.000 conversații AI/lună','10 widgeturi','Răspunsuri AI avansate','Bază de cunoștințe nelimitată','Suite completă GEO Gateway','WhatsApp + multicanal','FraudAI Shield + SENTINEL','Recuperare coș abandonat','Suport dedicat'], cta: 'Începe Acum', ctaLink: 'https://app.catyai.io/register?plan=business', hot: false },
      { name: 'Enterprise', price: '€499', period: '/lună', desc: 'Pentru organizații mari care necesită soluții personalizate și SLA-uri.', features: ['Conversații AI nelimitate','Widgeturi nelimitate','Fine-tuning model AI personalizat','Bază de cunoștințe nelimitată','Suite completă GEO Gateway','Toate integrările de canale','FraudAI Shield + SENTINEL','Integrări și API personalizate','SSO / SAML','SLA + manager de cont dedicat'], cta: 'Contactează Vânzări', ctaLink: '/contact?plan=enterprise', hot: false },
    ],
    addons: [
      { icon: '📱', name: 'QR-First', price: '€10', period: '/lună', desc: 'Implementează CatyAI fără website. Un cod QR + flux WhatsApp înlocuiește site-ul tău pentru contactul cu clienții. Perfect pentru afacerile fizice.', features: ['Generare cod QR branduit','Flux client WhatsApp-first','Nu necesită website','Kit materiale printabile'], cta: 'Adaugă QR-First', ctaLink: '/contact?product=qr-first' },
      { icon: '🤖', name: 'Secretar AI WhatsApp', price: '+€29', period: '/lună', desc: 'Un secretar AI complet care gestionează inbox-ul WhatsApp: programează întâlniri, califică lead-uri, trimite urmăriri și răspunde non-stop.', features: ['Programare întâlniri WhatsApp','Fluxuri calificare lead-uri','Urmăriri automate','Disponibilitate 24/7','Integrare calendar'], cta: 'Adaugă Secretar', ctaLink: '/contact?product=wa-secretary' },
    ],
    faqs: [
      { q: 'Pot schimba planul oricând?', a: 'Da. Poți upgradia sau downgradia planul oricând din dashboard. Modificările intră în vigoare la începutul următorului ciclu de facturare. Upgrade-urile se aplică imediat cu facturare proporțională.' },
      { q: 'Ce se întâmplă când ating limita de conversații?', a: 'Când atingi limita lunară, widgetul continuă să funcționeze dar răspunsurile sunt întrerupte până la următorul ciclu. Vei primi notificare email la 80% din limită.' },
      { q: 'Modulele suplimentare funcționează cu toate planurile?', a: 'QR-First și Secretar AI WhatsApp sunt disponibile pe planurile Starter și superioare. Nu pot fi combinate cu planul Gratuit.' },
    ],
    nav: { home: 'Acasă', features: 'Funcții', pricing: 'Prețuri', faq: 'FAQ', login: 'Autentificare', getStarted: 'Începe Gratuit' },
  },
  es: {
    badge: 'Precios Simples y Transparentes',
    heroTitle: 'Planes para\nCada Negocio',
    heroSub: 'Empieza gratis. Crece cuando estés listo. Sin cargos ocultos.',
    popular: 'Más Popular',
    startFree: 'Empezar Gratis', getStarted: 'Comenzar', contactSales: 'Contactar Ventas',
    addonsTitle: 'Complementos', addonsSub: 'Amplía tu plan con módulos especializados',
    faqTitle: 'Preguntas Frecuentes',
    ctaTitle: '¿Listo para Empezar?',
    ctaSub: 'Regístrate gratis — sin tarjeta de crédito.',
    tiers: [
      { name: 'Gratis', price: '€0', period: '/mes', desc: 'Explora CatyAI sin compromiso.', features: ['20 conversaciones IA/mes','1 widget','Respuestas IA básicas','Marca CatyAI','Soporte email'], cta: 'Empezar Gratis', ctaLink: 'https://app.catyai.io/register', hot: false },
      { name: 'Starter', price: '€49', period: '/mes', desc: 'Para emprendedores y pequeños equipos que están comenzando.', features: ['500 conversaciones IA/mes','1 widget','Respuestas IA avanzadas','Base de conocimiento (5 docs)','Formularios captación leads','Sin marca CatyAI','Soporte email'], cta: 'Comenzar', ctaLink: 'https://app.catyai.io/register?plan=starter', hot: false },
      { name: 'Growth', price: '€99', period: '/mes', desc: 'Para negocios en crecimiento que necesitan más conversaciones.', features: ['2.000 conversaciones IA/mes','3 widgets','Respuestas IA avanzadas','Base de conocimiento (20 docs)','GEO Gateway (visibilidad IA)','Integración WhatsApp','FraudAI Shield','Soporte prioritario'], cta: 'Comenzar', ctaLink: 'https://app.catyai.io/register?plan=growth', hot: true },
      { name: 'Business', price: '€199', period: '/mes', desc: 'Para empresas consolidadas con alto volumen de conversaciones.', features: ['10.000 conversaciones IA/mes','10 widgets','Respuestas IA avanzadas','Base de conocimiento ilimitada','Suite completa GEO Gateway','WhatsApp + multicanal','FraudAI Shield + SENTINEL','Recuperación de carrito','Soporte dedicado'], cta: 'Comenzar', ctaLink: 'https://app.catyai.io/register?plan=business', hot: false },
      { name: 'Enterprise', price: '€499', period: '/mes', desc: 'Para grandes organizaciones que requieren soluciones personalizadas.', features: ['Conversaciones IA ilimitadas','Widgets ilimitados','Fine-tuning modelo IA','Base de conocimiento ilimitada','Suite completa GEO Gateway','Todas las integraciones','FraudAI Shield + SENTINEL','API e integraciones custom','SSO / SAML','SLA + account manager dedicado'], cta: 'Contactar Ventas', ctaLink: '/contact?plan=enterprise', hot: false },
    ],
    addons: [
      { icon: '📱', name: 'QR-First', price: '€10', period: '/mes', desc: 'Despliega CatyAI sin sitio web. Un código QR + flujo WhatsApp reemplaza tu web para el contacto con clientes.', features: ['Generación QR con marca','Flujo cliente WhatsApp-first','Sin web requerida','Kit materiales imprimibles'], cta: 'Añadir QR-First', ctaLink: '/contact?product=qr-first' },
      { icon: '🤖', name: 'Secretario IA WhatsApp', price: '+€29', period: '/mes', desc: 'Un secretario IA completo que gestiona tu bandeja WhatsApp: agenda citas, califica leads y responde 24/7.', features: ['Agenda citas por WhatsApp','Flujos calificación leads','Seguimientos automáticos','Disponibilidad 24/7','Integración calendario'], cta: 'Añadir Secretario', ctaLink: '/contact?product=wa-secretary' },
    ],
    faqs: [
      { q: '¿Puedo cambiar de plan en cualquier momento?', a: 'Sí. Puedes actualizar o reducir tu plan en cualquier momento desde el panel. Los cambios entran en vigor al inicio del siguiente ciclo de facturación.' },
      { q: '¿Qué pasa cuando alcanzo el límite de conversaciones?', a: 'El widget sigue funcionando pero las respuestas se pausan hasta el próximo ciclo. Recibirás un email al llegar al 80% de tu límite.' },
      { q: '¿Los complementos funcionan con todos los planes?', a: 'QR-First y el Secretario IA WhatsApp están disponibles en planes Starter y superiores. No son compatibles con el plan Gratis.' },
    ],
    nav: { home: 'Inicio', features: 'Funciones', pricing: 'Precios', faq: 'FAQ', login: 'Iniciar sesión', getStarted: 'Empezar Gratis' },
  },
  pt: {
    badge: 'Preços Simples e Transparentes',
    heroTitle: 'Planos para\nTodo Negócio',
    heroSub: 'Comece grátis. Cresça quando estiver pronto. Sem taxas ocultas.',
    popular: 'Mais Popular',
    startFree: 'Começar Grátis', getStarted: 'Começar', contactSales: 'Contato Comercial',
    addonsTitle: 'Complementos', addonsSub: 'Expanda seu plano com módulos especializados',
    faqTitle: 'Dúvidas Frequentes',
    ctaTitle: 'Pronto para Começar?',
    ctaSub: 'Cadastre-se gratuitamente — sem cartão de crédito.',
    tiers: [
      { name: 'Grátis', price: '€0', period: '/mês', desc: 'Explore o CatyAI sem compromisso.', features: ['20 conversas IA/mês','1 widget','Respostas IA básicas','Marca CatyAI','Suporte email'], cta: 'Começar Grátis', ctaLink: 'https://app.catyai.io/register', hot: false },
      { name: 'Starter', price: '€49', period: '/mês', desc: 'Para empreendedores e pequenas equipes dando os primeiros passos.', features: ['500 conversas IA/mês','1 widget','Respostas IA avançadas','Base de conhecimento (5 docs)','Formulários de captação','Sem marca CatyAI','Suporte email'], cta: 'Começar', ctaLink: 'https://app.catyai.io/register?plan=starter', hot: false },
      { name: 'Growth', price: '€99', period: '/mês', desc: 'Para empresas em crescimento que precisam de mais conversas.', features: ['2.000 conversas IA/mês','3 widgets','Respostas IA avançadas','Base de conhecimento (20 docs)','GEO Gateway (visibilidade IA)','Integração WhatsApp','FraudAI Shield','Suporte prioritário'], cta: 'Começar', ctaLink: 'https://app.catyai.io/register?plan=growth', hot: true },
      { name: 'Business', price: '€199', period: '/mês', desc: 'Para empresas consolidadas com alto volume de conversas.', features: ['10.000 conversas IA/mês','10 widgets','Respostas IA avançadas','Base de conhecimento ilimitada','Suite completa GEO Gateway','WhatsApp + multicanal','FraudAI Shield + SENTINEL','Recuperação de carrinho','Suporte dedicado'], cta: 'Começar', ctaLink: 'https://app.catyai.io/register?plan=business', hot: false },
      { name: 'Enterprise', price: '€499', period: '/mês', desc: 'Para grandes organizações que requerem soluções personalizadas.', features: ['Conversas IA ilimitadas','Widgets ilimitados','Fine-tuning modelo IA','Base de conhecimento ilimitada','Suite completa GEO Gateway','Todas as integrações','FraudAI Shield + SENTINEL','API e integrações custom','SSO / SAML','SLA + gerente de conta dedicado'], cta: 'Contato Comercial', ctaLink: '/contact?plan=enterprise', hot: false },
    ],
    addons: [
      { icon: '📱', name: 'QR-First', price: '€10', period: '/mês', desc: 'Implante o CatyAI sem site. Um QR code + fluxo WhatsApp substitui seu site para contato com clientes.', features: ['Geração QR com marca','Fluxo cliente WhatsApp-first','Sem site necessário','Kit materiais imprimíveis'], cta: 'Adicionar QR-First', ctaLink: '/contact?product=qr-first' },
      { icon: '🤖', name: 'Secretário IA WhatsApp', price: '+€29', period: '/mês', desc: 'Um secretário IA completo que gerencia sua caixa WhatsApp: agenda reuniões, qualifica leads e atende 24/7.', features: ['Agendamento via WhatsApp','Fluxos qualificação leads','Follow-ups automáticos','Disponibilidade 24/7','Integração agenda'], cta: 'Adicionar Secretário', ctaLink: '/contact?product=wa-secretary' },
    ],
    faqs: [
      { q: 'Posso mudar de plano a qualquer momento?', a: 'Sim. Você pode fazer upgrade ou downgrade a qualquer momento pelo painel. As alterações entram em vigor no início do próximo ciclo de cobrança.' },
      { q: 'O que acontece quando atinjo o limite de conversas?', a: 'O widget continua funcionando, mas as respostas ficam pausadas até o próximo ciclo. Você receberá um email ao atingir 80% do seu limite.' },
      { q: 'Os complementos funcionam com todos os planos?', a: 'QR-First e Secretário IA WhatsApp estão disponíveis no plano Starter e superiores. Não são compatíveis com o plano Grátis.' },
    ],
    nav: { home: 'Início', features: 'Recursos', pricing: 'Preços', faq: 'FAQ', login: 'Entrar', getStarted: 'Começar Grátis' },
  },
  fr: {
    badge: 'Tarifs Simples et Transparents',
    heroTitle: 'Forfaits pour\nChaque Entreprise',
    heroSub: 'Commencez gratuitement. Évoluez à votre rythme. Sans frais cachés.',
    popular: 'Le Plus Populaire',
    startFree: 'Commencer Gratuit', getStarted: 'Commencer', contactSales: 'Contacter les Ventes',
    addonsTitle: 'Modules Complémentaires', addonsSub: 'Étendez votre forfait avec des modules spécialisés',
    faqTitle: 'Questions Fréquentes',
    ctaTitle: 'Prêt à Commencer ?',
    ctaSub: 'Inscrivez-vous gratuitement — sans carte bancaire.',
    tiers: [
      { name: 'Gratuit', price: '€0', period: '/mois', desc: 'Explorez CatyAI sans engagement.', features: ['20 conversations IA/mois','1 widget','Réponses IA de base','Marque CatyAI','Support email'], cta: 'Commencer Gratuit', ctaLink: 'https://app.catyai.io/register', hot: false },
      { name: 'Starter', price: '€49', period: '/mois', desc: 'Pour les entrepreneurs et petites équipes qui démarrent.', features: ['500 conversations IA/mois','1 widget','Réponses IA avancées','Base de connaissances (5 docs)','Formulaires de capture leads','Supprimer la marque CatyAI','Support email'], cta: 'Commencer', ctaLink: 'https://app.catyai.io/register?plan=starter', hot: false },
      { name: 'Growth', price: '€99', period: '/mois', desc: 'Pour les entreprises en croissance qui ont besoin de plus de conversations.', features: ['2 000 conversations IA/mois','3 widgets','Réponses IA avancées','Base de connaissances (20 docs)','GEO Gateway (visibilité IA)','Intégration WhatsApp','FraudAI Shield','Support prioritaire'], cta: 'Commencer', ctaLink: 'https://app.catyai.io/register?plan=growth', hot: true },
      { name: 'Business', price: '€199', period: '/mois', desc: 'Pour les entreprises établies avec un fort volume de conversations.', features: ['10 000 conversations IA/mois','10 widgets','Réponses IA avancées','Base de connaissances illimitée','Suite complète GEO Gateway','WhatsApp + multicanal','FraudAI Shield + SENTINEL','Récupération de panier','Support dédié'], cta: 'Commencer', ctaLink: 'https://app.catyai.io/register?plan=business', hot: false },
      { name: 'Enterprise', price: '€499', period: '/mois', desc: 'Pour les grandes organisations nécessitant des solutions personnalisées.', features: ['Conversations IA illimitées','Widgets illimités','Fine-tuning modèle IA','Base de connaissances illimitée','Suite complète GEO Gateway','Toutes les intégrations','FraudAI Shield + SENTINEL','API et intégrations custom','SSO / SAML','SLA + account manager dédié'], cta: 'Contacter les Ventes', ctaLink: '/contact?plan=enterprise', hot: false },
    ],
    addons: [
      { icon: '📱', name: 'QR-First', price: '€10', period: '/mois', desc: 'Déployez CatyAI sans site web. Un QR code + flux WhatsApp remplace votre site pour le contact client.', features: ['Génération QR brandé','Flux client WhatsApp-first','Sans site requis','Kit de supports imprimables'], cta: 'Ajouter QR-First', ctaLink: '/contact?product=qr-first' },
      { icon: '🤖', name: 'Secrétaire IA WhatsApp', price: '+€29', period: '/mois', desc: 'Un secrétaire IA complet qui gère votre boîte WhatsApp : prend des rendez-vous, qualifie les leads et répond 24h/24.', features: ['Prise de RDV via WhatsApp','Flux de qualification leads','Suivis automatiques','Disponibilité 24/7','Intégration agenda'], cta: 'Ajouter Secrétaire', ctaLink: '/contact?product=wa-secretary' },
    ],
    faqs: [
      { q: 'Puis-je changer de forfait à tout moment ?', a: 'Oui. Vous pouvez passer à un forfait supérieur ou inférieur à tout moment depuis le tableau de bord. Les changements prennent effet au début du prochain cycle de facturation.' },
      { q: 'Que se passe-t-il quand j\'atteins ma limite de conversations ?', a: 'Le widget continue de fonctionner mais les réponses sont mises en pause jusqu\'au prochain cycle. Vous recevrez un email quand vous atteignez 80% de votre limite.' },
      { q: 'Les modules complémentaires fonctionnent-ils avec tous les forfaits ?', a: 'QR-First et le Secrétaire IA WhatsApp sont disponibles sur les forfaits Starter et supérieurs. Ils ne sont pas compatibles avec le forfait Gratuit.' },
    ],
    nav: { home: 'Accueil', features: 'Fonctionnalités', pricing: 'Tarifs', faq: 'FAQ', login: 'Connexion', getStarted: 'Commencer Gratuit' },
  },
}

const LANGS = [
  { code: 'en', flag: '🇬🇧' },
  { code: 'ro', flag: '🇷🇴' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'pt', flag: '🇧🇷' },
  { code: 'fr', flag: '🇫🇷' },
]

function LanguageSelector({ lang, setLang }) {
  const [open, setOpen] = useState(false)
  const current = LANGS.find(l => l.code === lang)
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="pp-lang-btn flex items-center gap-1.5">
        {current?.flag} {lang.toUpperCase()}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-[#0d1b35] border border-[#1a2744] rounded-xl overflow-hidden shadow-xl z-50 min-w-[100px]">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false) }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-mono hover:bg-white/5 transition-colors"
              style={{ color: l.code === lang ? '#C8A165' : '#94a3b8' }}>
              {l.flag} {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PricingPage() {
  const [lang, setLang] = useState('ro')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored && T[stored]) setLang(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('caty-lang', lang)
  }, [lang])

  const t = T[lang] || T.en

  const title = lang === 'ro' ? 'Prețuri CatyAI — Planuri pentru Orice Afacere' : 'CatyAI Pricing — Plans for Every Business'

  return (
    <div className="pp-page">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={t.heroSub} />
      </Helmet>
      <style dangerouslySetInnerHTML={{ __html: ppCss }} />

      {/* Header */}
      <header className="pp-nav">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2 text-decoration-none" style={{ textDecoration: 'none' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,161,101,0.1)', border: '1px solid rgba(200,161,101,0.3)' }}>
                <svg className="w-4 h-4" fill="none" stroke="#C8A165" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>
              </div>
              <span className="font-bold text-white tracking-tight">Caty<span style={{ color: '#C8A165' }}>AI</span></span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="pp-nav-link">{t.nav.home}</a>
              <a href="/features" className="pp-nav-link">{t.nav.features}</a>
              <a href="/pricing" className="pp-nav-link active" style={{ color: '#C8A165' }}>{t.nav.pricing}</a>
              <a href="/#faq" className="pp-nav-link">{t.nav.faq}</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSelector lang={lang} setLang={setLang} />
              <a href="https://app.catyai.io/login" className="pp-nav-link" target="_blank" rel="noopener noreferrer">{t.nav.login}</a>
              <a href="https://app.catyai.io/register" target="_blank" rel="noopener noreferrer" className="pp-btn-gold" style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}>
                {t.nav.getStarted}
              </a>
            </div>

            <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(o => !o)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/5 flex flex-col gap-3">
              <a href="/" className="pp-nav-link py-2" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
              <a href="/features" className="pp-nav-link py-2" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
              <a href="/pricing" className="pp-nav-link py-2" style={{ color: '#C8A165' }}>{t.nav.pricing}</a>
              <div className="pt-2 border-t border-white/5 flex items-center gap-3">
                <LanguageSelector lang={lang} setLang={setLang} />
                <a href="https://app.catyai.io/register" target="_blank" rel="noopener noreferrer" className="pp-btn-gold flex-1 text-center" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                  {t.nav.getStarted}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,161,101,0.07) 0%, transparent 60%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="pp-tag">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
              {t.badge}
            </span>
          </div>
          <h1 className="pp-heading text-5xl md:text-7xl mb-6">
            {t.heroTitle.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.tiers.map((tier, i) => (
              <div key={i} className={`pp-card p-6 relative ${tier.hot ? 'pp-card-hot' : ''}`}>
                {tier.hot && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="pp-badge-hot">{t.popular}</span>
                  </div>
                )}

                <div className="mb-5">
                  <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: tier.hot ? '#C8A165' : '#64748b' }}>
                    {tier.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={`text-4xl pp-price ${tier.hot ? 'pp-price-hot' : ''}`}>{tier.price}</span>
                    <span className="text-slate-500 text-sm font-mono">{tier.period}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{tier.desc}</p>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                      <svg className={tier.hot ? 'pp-check' : 'pp-check-blue'} style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.ctaLink.startsWith('http') ? (
                  <a href={tier.ctaLink} target="_blank" rel="noopener noreferrer" className={tier.hot ? 'pp-btn-gold' : 'pp-btn-ghost'}>
                    {tier.cta}
                  </a>
                ) : (
                  <Link to={tier.ctaLink} className={tier.hot ? 'pp-btn-gold' : 'pp-btn-ghost'}>
                    {tier.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,161,101,0.12), transparent)', margin: '0 1.5rem' }} />

      {/* Add-ons */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="pp-tag mb-4">{t.addonsTitle}</span>
            <h2 className="pp-heading text-3xl md:text-4xl mt-4">{t.addonsTitle}</h2>
            <p className="text-slate-400 mt-3">{t.addonsSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {t.addons.map((addon, i) => (
              <div key={i} className="pp-addon p-7 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{addon.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-lg">{addon.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-mono font-bold" style={{ color: '#C8A165' }}>{addon.price}</span>
                      <span className="text-slate-500 text-sm">{addon.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{addon.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {addon.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="pp-check" style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={addon.ctaLink} className="pp-btn-ghost text-center" style={{ borderColor: 'rgba(200,161,101,0.3)', color: '#C8A165' }}>
                  {addon.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,161,101,0.12), transparent)', margin: '0 1.5rem' }} />

      {/* FAQ */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="pp-heading text-3xl md:text-4xl">{t.faqTitle}</h2>
          </div>
          <div className="space-y-3">
            {t.faqs.map((faq, i) => (
              <details key={i} className="pp-faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="px-6 py-20" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,161,101,0.06) 0%, transparent 70%)' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="pp-heading text-4xl md:text-5xl mb-4">{t.ctaTitle}</h2>
          <p className="text-slate-400 mb-10">{t.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://app.catyai.io/register" target="_blank" rel="noopener noreferrer" className="pp-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {t.startFree}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            <Link to="/contact" className="pp-btn-ghost">{t.contactSales}</Link>
          </div>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
