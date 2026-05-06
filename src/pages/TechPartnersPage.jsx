import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    badge: 'Technology Partners',
    title: 'The API Conduit.',
    titleAccent: 'Seamless Integrations.',
    sub: 'Build on the GEO infrastructure layer. CatyAI\'s open API connects your platform to the neural endpoint ecosystem — bidirectional, real-time, and enterprise-ready.',
    cta1: 'View API Documentation',
    cta2: 'Apply as Tech Partner',
    ecosystemTitle: 'The Integration Ecosystem',
    ecosystemSub: 'Connect your platform to CatyAI in hours, not months. Full OpenAPI 3.1 spec, webhook support, and dedicated integration engineering.',
    integrations: [
      { name: 'CRM & Sales', items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho'] },
      { name: 'Communication', items: ['WhatsApp Business API', 'Slack', 'Microsoft Teams', 'Intercom'] },
      { name: 'Data & Vector', items: ['Qdrant', 'Pinecone', 'Weaviate', 'PostgreSQL'] },
      { name: 'Automation', items: ['Zapier', 'Make', 'n8n', 'Workato'] },
    ],
    benefitsTitle: 'Partner Engineering Benefits',
    benefits: [
      { icon: '📄', t: 'OpenAPI 3.1 Specification', d: 'Full machine-readable API spec. Generate SDKs in any language in minutes.' },
      { icon: '🔔', t: 'Webhook Event System', d: 'Real-time events for every NAP sync, fraud detection, and routing decision.' },
      { icon: '🔑', t: 'OAuth 2.0 + API Keys', d: 'Enterprise-grade auth. Scoped permissions, key rotation, and audit logs.' },
      { icon: '🛠', t: 'Dedicated Integration Team', d: 'Named integration engineer for Technology Partners. 48h response SLA.' },
      { icon: '🧪', t: 'Sandbox Environment', d: 'Full production-mirror sandbox. Test without affecting live data.' },
      { icon: '📈', t: 'Co-Marketing Program', d: 'Joint case studies, marketplace listing, and co-sell opportunities.' },
    ],
    ctaTitle: 'Build on the GEO layer.',
    ctaSub: 'Apply for Technology Partner status and get sandbox access within 24 hours.',
    ctaBtn: 'Apply for API Access',
    ctaSecondary: 'Read API Docs →',
  },
  ro: {
    badge: 'Parteneri Tehnologici',
    title: 'Conducta API.',
    titleAccent: 'Integrări Fără Cusur.',
    sub: 'Construiește pe stratul de infrastructură GEO. API-ul deschis CatyAI îți conectează platforma la ecosistemul de endpoint-uri neurale — bidirecțional, în timp real și pregătit pentru enterprise.',
    cta1: 'Vezi Documentația API',
    cta2: 'Aplică ca Partener Tech',
    ecosystemTitle: 'Ecosistemul de Integrări',
    ecosystemSub: 'Conectează-ți platforma la CatyAI în ore, nu luni. Specificație OpenAPI 3.1 completă, suport webhook și inginerie dedicată de integrare.',
    integrations: [
      { name: 'CRM & Vânzări', items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho'] },
      { name: 'Comunicare', items: ['WhatsApp Business API', 'Slack', 'Microsoft Teams', 'Intercom'] },
      { name: 'Date & Vector', items: ['Qdrant', 'Pinecone', 'Weaviate', 'PostgreSQL'] },
      { name: 'Automatizare', items: ['Zapier', 'Make', 'n8n', 'Workato'] },
    ],
    benefitsTitle: 'Beneficii de Inginerie pentru Parteneri',
    benefits: [
      { icon: '📄', t: 'Specificație OpenAPI 3.1', d: 'Spec API complet citibil de mașini. Generează SDK-uri în orice limbaj în câteva minute.' },
      { icon: '🔔', t: 'Sistem de Evenimente Webhook', d: 'Evenimente în timp real pentru fiecare sincronizare NAP, detecție fraudă și decizie de rutare.' },
      { icon: '🔑', t: 'OAuth 2.0 + Chei API', d: 'Autentificare enterprise. Permisiuni cu scope, rotație chei și log-uri de audit.' },
      { icon: '🛠', t: 'Echipă Dedicată de Integrare', d: 'Inginer dedicat pentru Partenerii Tehnologici. SLA răspuns 48h.' },
      { icon: '🧪', t: 'Mediu Sandbox', d: 'Sandbox complet care oglindește producția. Testează fără să afectezi datele live.' },
      { icon: '📈', t: 'Program Co-Marketing', d: 'Studii de caz comune, listare în marketplace și oportunități de co-vânzare.' },
    ],
    ctaTitle: 'Construiește pe stratul GEO.',
    ctaSub: 'Aplică pentru statutul de Partener Tehnologic și obține acces sandbox în 24 de ore.',
    ctaBtn: 'Aplică pentru Acces API',
    ctaSecondary: 'Citește Docs API →',
  },
  fr: {
    badge: 'Partenaires Technologiques',
    title: 'Le Conduit API.',
    titleAccent: 'Intégrations Fluides.',
    sub: 'Construisez sur la couche d\'infrastructure GEO. L\'API ouverte de CatyAI connecte votre plateforme à l\'écosystème d\'endpoints neuronaux — bidirectionnel, en temps réel et prêt pour l\'entreprise.',
    cta1: 'Voir la Documentation API',
    cta2: 'Postuler comme Partenaire Tech',
    ecosystemTitle: 'L\'Écosystème d\'Intégration',
    ecosystemSub: 'Connectez votre plateforme à CatyAI en heures, pas en mois. Spécification OpenAPI 3.1 complète, support webhook et ingénierie d\'intégration dédiée.',
    integrations: [
      { name: 'CRM & Ventes', items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho'] },
      { name: 'Communication', items: ['WhatsApp Business API', 'Slack', 'Microsoft Teams', 'Intercom'] },
      { name: 'Données & Vecteur', items: ['Qdrant', 'Pinecone', 'Weaviate', 'PostgreSQL'] },
      { name: 'Automatisation', items: ['Zapier', 'Make', 'n8n', 'Workato'] },
    ],
    benefitsTitle: 'Avantages Ingénierie Partenaire',
    benefits: [
      { icon: '📄', t: 'Spécification OpenAPI 3.1', d: 'Spec API complet lisible par machine. Générez des SDK dans n\'importe quel langage en minutes.' },
      { icon: '🔔', t: 'Système d\'Événements Webhook', d: 'Événements en temps réel pour chaque sync NAP, détection de fraude et décision de routage.' },
      { icon: '🔑', t: 'OAuth 2.0 + Clés API', d: 'Auth de qualité enterprise. Permissions scopées, rotation de clés et logs d\'audit.' },
      { icon: '🛠', t: 'Équipe d\'Intégration Dédiée', d: 'Ingénieur d\'intégration nommé pour les Partenaires Tech. SLA de réponse 48h.' },
      { icon: '🧪', t: 'Environnement Sandbox', d: 'Sandbox miroir de production complet. Testez sans affecter les données live.' },
      { icon: '📈', t: 'Programme Co-Marketing', d: 'Études de cas conjointes, listing marketplace et opportunités de co-vente.' },
    ],
    ctaTitle: 'Construisez sur la couche GEO.',
    ctaSub: 'Postulez pour le statut de Partenaire Technologique et obtenez l\'accès sandbox en 24 heures.',
    ctaBtn: 'Demander l\'Accès API',
    ctaSecondary: 'Lire les Docs API →',
  },
  de: {
    badge: 'Technologie-Partner',
    title: 'Der API-Kanal.',
    titleAccent: 'Nahtlose Integrationen.',
    sub: 'Bauen Sie auf der GEO-Infrastrukturschicht auf. Die offene API von CatyAI verbindet Ihre Plattform mit dem neuronalen Endpunkt-Ökosystem — bidirektional, in Echtzeit und enterprise-ready.',
    cta1: 'API-Dokumentation ansehen',
    cta2: 'Als Tech-Partner bewerben',
    ecosystemTitle: 'Das Integrations-Ökosystem',
    ecosystemSub: 'Verbinden Sie Ihre Plattform in Stunden mit CatyAI, nicht in Monaten. Vollständige OpenAPI 3.1-Spezifikation, Webhook-Unterstützung und dedizierte Integrations-Engineering.',
    integrations: [
      { name: 'CRM & Vertrieb', items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho'] },
      { name: 'Kommunikation', items: ['WhatsApp Business API', 'Slack', 'Microsoft Teams', 'Intercom'] },
      { name: 'Daten & Vektor', items: ['Qdrant', 'Pinecone', 'Weaviate', 'PostgreSQL'] },
      { name: 'Automatisierung', items: ['Zapier', 'Make', 'n8n', 'Workato'] },
    ],
    benefitsTitle: 'Partner-Engineering-Vorteile',
    benefits: [
      { icon: '📄', t: 'OpenAPI 3.1-Spezifikation', d: 'Vollständige maschinenlesbare API-Spec. Generieren Sie SDKs in jeder Sprache in Minuten.' },
      { icon: '🔔', t: 'Webhook-Event-System', d: 'Echtzeit-Events für jede NAP-Synchronisation, Betrugserkennung und Routing-Entscheidung.' },
      { icon: '🔑', t: 'OAuth 2.0 + API-Schlüssel', d: 'Enterprise-Auth. Scoped Permissions, Schlüsselrotation und Audit-Logs.' },
      { icon: '🛠', t: 'Dediziertes Integrationsteam', d: 'Benannter Integrationsingenieur für Technologiepartner. 48h Antwort-SLA.' },
      { icon: '🧪', t: 'Sandbox-Umgebung', d: 'Vollständiger Produktions-Spiegel-Sandbox. Testen ohne Live-Daten zu beeinflussen.' },
      { icon: '📈', t: 'Co-Marketing-Programm', d: 'Gemeinsame Case Studies, Marketplace-Listing und Co-Sell-Möglichkeiten.' },
    ],
    ctaTitle: 'Bauen Sie auf der GEO-Schicht.',
    ctaSub: 'Bewerben Sie sich um den Technologie-Partner-Status und erhalten Sie innerhalb von 24 Stunden Sandbox-Zugang.',
    ctaBtn: 'API-Zugang beantragen',
    ctaSecondary: 'API-Dokumentation lesen →',
  },
  es: {
    badge: 'Socios Tecnológicos',
    title: 'El Conducto API.',
    titleAccent: 'Integraciones Sin Fisuras.',
    sub: 'Construye sobre la capa de infraestructura GEO. La API abierta de CatyAI conecta tu plataforma al ecosistema de endpoints neuronales — bidireccional, en tiempo real y listo para empresas.',
    cta1: 'Ver Documentación API',
    cta2: 'Aplicar como Socio Tech',
    ecosystemTitle: 'El Ecosistema de Integración',
    ecosystemSub: 'Conecta tu plataforma a CatyAI en horas, no en meses. Especificación OpenAPI 3.1 completa, soporte webhook e ingeniería de integración dedicada.',
    integrations: [
      { name: 'CRM y Ventas', items: ['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho'] },
      { name: 'Comunicación', items: ['WhatsApp Business API', 'Slack', 'Microsoft Teams', 'Intercom'] },
      { name: 'Datos y Vector', items: ['Qdrant', 'Pinecone', 'Weaviate', 'PostgreSQL'] },
      { name: 'Automatización', items: ['Zapier', 'Make', 'n8n', 'Workato'] },
    ],
    benefitsTitle: 'Beneficios de Ingeniería para Socios',
    benefits: [
      { icon: '📄', t: 'Especificación OpenAPI 3.1', d: 'Spec API completa legible por máquina. Genera SDKs en cualquier lenguaje en minutos.' },
      { icon: '🔔', t: 'Sistema de Eventos Webhook', d: 'Eventos en tiempo real para cada sincronización NAP, detección de fraude y decisión de enrutamiento.' },
      { icon: '🔑', t: 'OAuth 2.0 + Claves API', d: 'Auth de grado empresarial. Permisos con scope, rotación de claves y logs de auditoría.' },
      { icon: '🛠', t: 'Equipo de Integración Dedicado', d: 'Ingeniero de integración nombrado para Socios Tecnológicos. SLA de respuesta 48h.' },
      { icon: '🧪', t: 'Entorno Sandbox', d: 'Sandbox espejo de producción completo. Prueba sin afectar datos en vivo.' },
      { icon: '📈', t: 'Programa Co-Marketing', d: 'Casos de estudio conjuntos, listado en marketplace y oportunidades de co-venta.' },
    ],
    ctaTitle: 'Construye sobre la capa GEO.',
    ctaSub: 'Aplica para el estatus de Socio Tecnológico y obtén acceso sandbox en 24 horas.',
    ctaBtn: 'Solicitar Acceso API',
    ctaSecondary: 'Leer Docs API →',
  },
}

const CSS = `
.tp-page { background: #010A1F; color: #f1f5f9; min-height: 100vh; font-family: 'Inter', -apple-system, sans-serif; }
.tp-page * { box-sizing: border-box; }
.tp-section { padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem); }
.tp-section-alt { background: #030D26; }
.tp-container { max-width: 1240px; margin: 0 auto; }

/* HERO */
.tp-hero { padding: clamp(7rem, 12vw, 10rem) clamp(1.25rem, 4vw, 3rem) clamp(4rem, 8vw, 6rem); }
.tp-hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.tp-badge {
  display: inline-block;
  font-family: monospace;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A165;
  border: 1px solid rgba(200,161,101,0.3);
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  margin-bottom: 1.5rem;
}
.tp-h1 {
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
}
.tp-h1-accent { color: #C8A165; display: block; }
.tp-sub { font-size: clamp(1.05rem, 1.4vw, 1.2rem); color: #94a3b8; line-height: 1.65; margin: 0 0 2rem; max-width: 580px; }
.tp-cta-row { display: flex; flex-wrap: wrap; gap: 1rem; }
.tp-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.95rem 1.6rem; border-radius: 8px;
  font-weight: 600; font-size: 0.95rem;
  text-decoration: none; cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.tp-btn-primary { background: #C8A165; color: #010A1F; }
.tp-btn-primary:hover { background: #D4B57A; transform: translateY(-1px); }
.tp-btn-ghost { background: transparent; color: #f1f5f9; border-color: rgba(255,255,255,0.18); }
.tp-btn-ghost:hover { border-color: #C8A165; color: #C8A165; }

/* VISUAL */
.tp-visual {
  position: relative;
  height: 440px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px;
  overflow: hidden;
}
.tp-svg-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.tp-block {
  position: absolute;
  background: #0A1628;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
  transition: transform 0.3s;
  z-index: 5;
}
.tp-block:hover { transform: translateY(-4px) scale(1.03); }
.tp-b1 { width:90px;height:70px; top:12%;left:8%; animation: tp-float 5s ease-in-out infinite; }
.tp-b2 { width:80px;height:65px; top:10%;right:12%; animation: tp-float 5s ease-in-out infinite 1.2s; }
.tp-b3 { width:100px;height:75px; top:40%;left:5%; animation: tp-float 5s ease-in-out infinite 0.8s; }
.tp-b4 { width:85px;height:68px; top:38%;right:8%; animation: tp-float 5s ease-in-out infinite 2s; }
.tp-b5 { width:90px;height:70px; bottom:12%;left:12%; animation: tp-float 5s ease-in-out infinite 1.6s; }
.tp-b6 { width:80px;height:65px; bottom:10%;right:15%; animation: tp-float 5s ease-in-out infinite 0.4s; }
.tp-b-center {
  width:110px;height:85px;
  top:50%;left:50%;
  transform:translate(-50%,-50%);
  background:#0A1628;
  border:1px solid rgba(200,161,101,0.4);
  border-radius:12px;
  z-index:10;
  box-shadow: 0 0 30px rgba(200,161,101,0.15);
  display:flex;align-items:center;justify-content:center;
  flex-direction:column;gap:4px;
  animation: tp-center-pulse 3s ease-in-out infinite;
}
@keyframes tp-center-pulse {
  0%,100% { box-shadow:0 0 20px rgba(200,161,101,0.15); }
  50% { box-shadow:0 0 40px rgba(200,161,101,0.35); }
}
.tp-center-label { font-family:monospace; font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; color:#C8A165; }
.tp-center-icon { font-size:1.4rem; line-height:1; }
@keyframes tp-float {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-7px); }
}
.tp-visual-caption {
  position:absolute;bottom:1rem;
  font-family:monospace;font-size:0.62rem;
  letter-spacing:0.2em;text-transform:uppercase;color:#1e293b;
  left:50%;transform:translateX(-50%);
}
@keyframes tp-flow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
.tp-line-flow { stroke-dasharray: 3 2; animation: tp-flow 1.5s linear infinite; }
.tp-line-flow-slow { stroke-dasharray: 3 2; animation: tp-flow 3s linear infinite; }

/* SECTION HEADERS */
.tp-section-header { text-align: center; max-width: 760px; margin: 0 auto clamp(2.5rem, 5vw, 4rem); }
.tp-h2 {
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  font-weight: 800; letter-spacing: -0.015em;
  margin: 0 0 1rem; line-height: 1.15;
}
.tp-section-sub { font-size: 1.05rem; color: #94a3b8; line-height: 1.6; margin: 0; }

/* ECOSYSTEM */
.tp-eco-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
.tp-eco-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1.75rem 1.5rem;
  transition: all 0.25s ease;
}
.tp-eco-card:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-3px); }
.tp-eco-name {
  font-family: monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #C8A165;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(200,161,101,0.25);
  margin-bottom: 1.1rem;
}
.tp-eco-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
.tp-eco-list li { font-size: 0.95rem; color: #cbd5e1; padding-left: 1rem; position: relative; }
.tp-eco-list li::before { content: '›'; position: absolute; left: 0; color: #C8A165; font-weight: 700; }

/* BENEFITS */
.tp-benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.tp-benefit-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1.85rem 1.6rem;
  transition: all 0.25s ease;
}
.tp-benefit-card:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-3px); }
.tp-benefit-icon { font-size: 1.7rem; margin-bottom: 1rem; display: block; }
.tp-benefit-title { font-size: 1.1rem; font-weight: 700; margin: 0 0 0.55rem; color: #f1f5f9; }
.tp-benefit-desc { font-size: 0.93rem; color: #94a3b8; line-height: 1.55; margin: 0; }

/* CTA */
.tp-cta-final {
  text-align: center;
  background: linear-gradient(135deg, rgba(200,161,101,0.06), rgba(99,102,241,0.04));
  border: 1px solid rgba(200,161,101,0.18);
  border-radius: 24px;
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem);
  max-width: 920px;
  margin: 0 auto;
}
.tp-cta-final .tp-h2 { margin-bottom: 0.85rem; }
.tp-cta-final .tp-section-sub { margin-bottom: 2rem; }
.tp-cta-row-final { display: inline-flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .tp-hero-grid { grid-template-columns: 1fr; }
  .tp-visual { height: 380px; }
  .tp-benefits-grid { grid-template-columns: 1fr; }
  .tp-sub { max-width: none; }
}
@media (min-width: 901px) and (max-width: 1100px) {
  .tp-benefits-grid { grid-template-columns: repeat(2, 1fr); }
}
`

export default function TechPartnersPage() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem('catyai_lang')
    if (s) setLang(s)
  }, [])
  useEffect(() => { localStorage.setItem('catyai_lang', lang) }, [lang])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <>
      <SEO
        title="Technology Partners — API & Integration Ecosystem | CatyAI"
        description="CatyAI's open API ecosystem connects your stack to 40+ enterprise integrations. Become a technology partner and integrate with the GEO infrastructure layer."
        canonical="https://catyai.io/technology-partners"
      />
      <style>{CSS}</style>
      <div className="tp-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* HERO */}
        <section className="tp-hero">
          <div className="tp-container">
            <div className="tp-hero-grid">
              <div>
                <span className="tp-badge">{t.badge}</span>
                <h1 className="tp-h1">
                  {t.title}
                  <span className="tp-h1-accent">{t.titleAccent}</span>
                </h1>
                <p className="tp-sub">{t.sub}</p>
                <div className="tp-cta-row">
                  <Link to="/api-docs" className="tp-btn tp-btn-primary">{t.cta1}</Link>
                  <Link to="/contact" className="tp-btn tp-btn-ghost">{t.cta2}</Link>
                </div>
              </div>

              <div className="tp-visual" aria-hidden="true">
                <svg className="tp-svg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="50" x2="12" y2="16" stroke="#C8A165" strokeOpacity="0.3" strokeWidth="0.4" className="tp-line-flow" />
                  <line x1="50" y1="50" x2="88" y2="13" stroke="#C8A165" strokeOpacity="0.3" strokeWidth="0.4" className="tp-line-flow-slow" />
                  <line x1="50" y1="50" x2="8"  y2="52" stroke="rgba(99,102,241,0.5)" strokeWidth="0.4" className="tp-line-flow-slow" />
                  <line x1="50" y1="50" x2="92" y2="51" stroke="#C8A165" strokeOpacity="0.3" strokeWidth="0.4" className="tp-line-flow" />
                  <line x1="50" y1="50" x2="16" y2="82" stroke="rgba(99,102,241,0.5)" strokeWidth="0.4" className="tp-line-flow-slow" />
                  <line x1="50" y1="50" x2="85" y2="84" stroke="#C8A165" strokeOpacity="0.3" strokeWidth="0.4" className="tp-line-flow" />
                </svg>

                <div className="tp-block tp-b1">💬</div>
                <div className="tp-block tp-b2">🔧</div>
                <div className="tp-block tp-b3">📊</div>
                <div className="tp-block tp-b4">🔮</div>
                <div className="tp-block tp-b5">⚡</div>
                <div className="tp-block tp-b6">🌐</div>

                <div className="tp-block tp-b-center">
                  <span className="tp-center-icon">⬡</span>
                  <span className="tp-center-label">API Hub</span>
                </div>

                <div className="tp-visual-caption">openapi 3.1 · webhooks · oauth</div>
              </div>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section className="tp-section tp-section-alt">
          <div className="tp-container">
            <div className="tp-section-header">
              <h2 className="tp-h2">{t.ecosystemTitle}</h2>
              <p className="tp-section-sub">{t.ecosystemSub}</p>
            </div>
            <div className="tp-eco-grid">
              {t.integrations.map((cat) => (
                <div key={cat.name} className="tp-eco-card">
                  <div className="tp-eco-name">{cat.name}</div>
                  <ul className="tp-eco-list">
                    {cat.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="tp-section">
          <div className="tp-container">
            <div className="tp-section-header">
              <h2 className="tp-h2">{t.benefitsTitle}</h2>
            </div>
            <div className="tp-benefits-grid">
              {t.benefits.map((b) => (
                <div key={b.t} className="tp-benefit-card">
                  <span className="tp-benefit-icon">{b.icon}</span>
                  <h3 className="tp-benefit-title">{b.t}</h3>
                  <p className="tp-benefit-desc">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tp-section tp-section-alt">
          <div className="tp-container">
            <div className="tp-cta-final">
              <h2 className="tp-h2">{t.ctaTitle}</h2>
              <p className="tp-section-sub">{t.ctaSub}</p>
              <div className="tp-cta-row-final">
                <Link to="/contact" className="tp-btn tp-btn-primary">{t.ctaBtn}</Link>
                <Link to="/api-docs" className="tp-btn tp-btn-ghost">{t.ctaSecondary}</Link>
              </div>
            </div>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
