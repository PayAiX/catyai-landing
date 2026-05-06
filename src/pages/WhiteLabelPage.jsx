import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    badge: 'White-Label Program',
    title: 'The Invisible Engine',
    titleAccent: 'for Your Brand.',
    sub: "Deploy CatyAI's full neural infrastructure under your brand identity. Your clients see your product. We power it, invisibly.",
    cta1: 'Apply for White-Label',
    cta2: 'View All Partner Tiers',
    logoPlaceholder: 'YOUR LOGO',
    metrics: [
      { v: '35%', l: 'Revenue Share' },
      { v: '72h', l: 'Go-Live' },
      { v: '3,000+', l: 'Active Deployments' },
      { v: '99.99%', l: 'White-Label SLA' }
    ],
    featTitle: 'Everything White-Label',
    featSub: 'Full stack deployment under your brand. From dashboard to API responses, your identity is everywhere.',
    features: [
      'Custom domain & subdomain routing',
      'Branded dashboard & client portal',
      'Custom email notifications & reports',
      'Your logo on all AI-generated outputs',
      'Dedicated support channel under your brand',
      'Remove all CatyAI references'
    ],
    revTitle: '35% Revenue Share',
    revSub: 'The highest margin in the market. We handle infrastructure, updates, and security. You focus on sales.',
    revDetail: 'No minimums. No caps. Paid monthly.',
    stepsTitle: 'Go Live in 72 Hours',
    steps: [
      { n: '01', t: 'Apply & Sign NDA', d: 'Submit your agency profile. We review within 48 hours and send the partnership agreement.' },
      { n: '02', t: 'Brand Configuration', d: 'Upload your logo, colors, and domain. Our team configures the white-label environment.' },
      { n: '03', t: 'Launch', d: 'Receive your API keys, admin credentials, and go-to-market materials. Start selling immediately.' }
    ],
    ctaTitle: 'Ready to white-label the future?',
    ctaSub: 'Join agencies already deploying AI infrastructure under their brand.',
    ctaBtn: 'Apply Now',
    ctaSecondary: 'Talk to Partnerships →'
  },
  ro: {
    badge: 'Program White-Label',
    title: 'Motorul Invizibil',
    titleAccent: 'pentru Brandul Tău.',
    sub: 'Implementează întreaga infrastructură neuronală CatyAI sub identitatea brandului tău. Clienții tăi văd produsul tău. Noi îl alimentăm, invizibil.',
    cta1: 'Aplică pentru White-Label',
    cta2: 'Vezi Toate Nivelurile de Parteneriat',
    logoPlaceholder: 'LOGO-UL TĂU',
    metrics: [
      { v: '35%', l: 'Cotă din Venituri' },
      { v: '72h', l: 'Lansare' },
      { v: '3.000+', l: 'Implementări Active' },
      { v: '99,99%', l: 'SLA White-Label' }
    ],
    featTitle: 'Totul White-Label',
    featSub: 'Implementare full-stack sub brandul tău. De la dashboard la răspunsuri API, identitatea ta este peste tot.',
    features: [
      'Domeniu și subdomeniu personalizate',
      'Dashboard și portal client cu brandul tău',
      'Notificări email și rapoarte personalizate',
      'Logo-ul tău pe toate output-urile AI',
      'Canal suport dedicat sub brandul tău',
      'Eliminarea tuturor referințelor CatyAI'
    ],
    revTitle: '35% Cotă din Venituri',
    revSub: 'Cea mai mare marjă de pe piață. Noi ne ocupăm de infrastructură, actualizări și securitate. Tu te concentrezi pe vânzări.',
    revDetail: 'Fără minim. Fără plafon. Plătit lunar.',
    stepsTitle: 'Lansare în 72 de Ore',
    steps: [
      { n: '01', t: 'Aplică și Semnează NDA', d: 'Trimite profilul agenției tale. Revizuim în 48 de ore și trimitem acordul de parteneriat.' },
      { n: '02', t: 'Configurare Brand', d: 'Încarcă logo-ul, culorile și domeniul. Echipa noastră configurează mediul white-label.' },
      { n: '03', t: 'Lansare', d: 'Primește cheile API, credențiale admin și materiale go-to-market. Începe să vinzi imediat.' }
    ],
    ctaTitle: 'Gata să transformi viitorul în white-label?',
    ctaSub: 'Alătură-te agențiilor care deja implementează infrastructură AI sub brandul lor.',
    ctaBtn: 'Aplică Acum',
    ctaSecondary: 'Discută cu Partnerships →'
  },
  fr: {
    badge: 'Programme White-Label',
    title: 'Le Moteur Invisible',
    titleAccent: 'de Votre Marque.',
    sub: "Déployez l'infrastructure neuronale complète de CatyAI sous votre identité de marque. Vos clients voient votre produit. Nous l'alimentons, invisiblement.",
    cta1: 'Postuler au White-Label',
    cta2: 'Voir Tous les Niveaux Partenaires',
    logoPlaceholder: 'VOTRE LOGO',
    metrics: [
      { v: '35%', l: 'Part de Revenus' },
      { v: '72h', l: 'Mise en Ligne' },
      { v: '3 000+', l: 'Déploiements Actifs' },
      { v: '99,99%', l: 'SLA White-Label' }
    ],
    featTitle: 'Tout en White-Label',
    featSub: 'Déploiement full-stack sous votre marque. Du tableau de bord aux réponses API, votre identité est partout.',
    features: [
      'Domaine et sous-domaine personnalisés',
      'Tableau de bord et portail client à votre marque',
      'Notifications email et rapports personnalisés',
      'Votre logo sur toutes les sorties générées par IA',
      'Canal de support dédié sous votre marque',
      'Suppression de toutes les références CatyAI'
    ],
    revTitle: '35% de Part de Revenus',
    revSub: "La meilleure marge du marché. Nous gérons l'infrastructure, les mises à jour et la sécurité. Vous vous concentrez sur les ventes.",
    revDetail: 'Pas de minimum. Pas de plafond. Payé mensuellement.',
    stepsTitle: 'En Ligne en 72 Heures',
    steps: [
      { n: '01', t: 'Postuler et Signer le NDA', d: "Soumettez le profil de votre agence. Nous examinons sous 48 heures et envoyons l'accord de partenariat." },
      { n: '02', t: 'Configuration de Marque', d: 'Téléchargez votre logo, couleurs et domaine. Notre équipe configure l\'environnement white-label.' },
      { n: '03', t: 'Lancement', d: 'Recevez vos clés API, identifiants admin et supports go-to-market. Commencez à vendre immédiatement.' }
    ],
    ctaTitle: "Prêt à passer l'avenir en white-label?",
    ctaSub: "Rejoignez les agences qui déploient déjà l'infrastructure IA sous leur marque.",
    ctaBtn: 'Postuler Maintenant',
    ctaSecondary: 'Parler aux Partenariats →'
  },
  de: {
    badge: 'White-Label-Programm',
    title: 'Der Unsichtbare Motor',
    titleAccent: 'für Ihre Marke.',
    sub: 'Setzen Sie die vollständige neuronale Infrastruktur von CatyAI unter Ihrer Markenidentität ein. Ihre Kunden sehen Ihr Produkt. Wir betreiben es, unsichtbar.',
    cta1: 'Für White-Label Bewerben',
    cta2: 'Alle Partner-Stufen Anzeigen',
    logoPlaceholder: 'IHR LOGO',
    metrics: [
      { v: '35%', l: 'Umsatzbeteiligung' },
      { v: '72h', l: 'Go-Live' },
      { v: '3.000+', l: 'Aktive Bereitstellungen' },
      { v: '99,99%', l: 'White-Label SLA' }
    ],
    featTitle: 'Alles White-Label',
    featSub: 'Full-Stack-Bereitstellung unter Ihrer Marke. Vom Dashboard bis zu API-Antworten, Ihre Identität ist überall.',
    features: [
      'Eigene Domain und Subdomain-Routing',
      'Gebrandetes Dashboard und Kundenportal',
      'Individuelle E-Mail-Benachrichtigungen und Berichte',
      'Ihr Logo auf allen KI-generierten Ausgaben',
      'Dedizierter Support-Kanal unter Ihrer Marke',
      'Entfernung aller CatyAI-Verweise'
    ],
    revTitle: '35% Umsatzbeteiligung',
    revSub: 'Die höchste Marge auf dem Markt. Wir kümmern uns um Infrastruktur, Updates und Sicherheit. Sie konzentrieren sich auf den Vertrieb.',
    revDetail: 'Keine Mindestbeträge. Keine Obergrenzen. Monatlich bezahlt.',
    stepsTitle: 'Go-Live in 72 Stunden',
    steps: [
      { n: '01', t: 'Bewerben und NDA Unterschreiben', d: 'Reichen Sie Ihr Agenturprofil ein. Wir prüfen innerhalb von 48 Stunden und senden die Partnerschaftsvereinbarung.' },
      { n: '02', t: 'Markenkonfiguration', d: 'Laden Sie Ihr Logo, Farben und Ihre Domain hoch. Unser Team konfiguriert die White-Label-Umgebung.' },
      { n: '03', t: 'Launch', d: 'Erhalten Sie Ihre API-Schlüssel, Admin-Anmeldeinformationen und Go-to-Market-Materialien. Beginnen Sie sofort zu verkaufen.' }
    ],
    ctaTitle: 'Bereit, die Zukunft zu white-labeln?',
    ctaSub: 'Schließen Sie sich Agenturen an, die KI-Infrastruktur bereits unter ihrer Marke einsetzen.',
    ctaBtn: 'Jetzt Bewerben',
    ctaSecondary: 'Mit Partnerschaften Sprechen →'
  },
  es: {
    badge: 'Programa White-Label',
    title: 'El Motor Invisible',
    titleAccent: 'para Tu Marca.',
    sub: 'Despliega la infraestructura neuronal completa de CatyAI bajo la identidad de tu marca. Tus clientes ven tu producto. Nosotros lo alimentamos, invisiblemente.',
    cta1: 'Solicitar White-Label',
    cta2: 'Ver Todos los Niveles de Socio',
    logoPlaceholder: 'TU LOGO',
    metrics: [
      { v: '35%', l: 'Participación de Ingresos' },
      { v: '72h', l: 'Puesta en Marcha' },
      { v: '3.000+', l: 'Despliegues Activos' },
      { v: '99,99%', l: 'SLA White-Label' }
    ],
    featTitle: 'Todo White-Label',
    featSub: 'Despliegue full-stack bajo tu marca. Desde el panel hasta las respuestas API, tu identidad está en todas partes.',
    features: [
      'Dominio y subdominio personalizados',
      'Panel y portal cliente con tu marca',
      'Notificaciones email e informes personalizados',
      'Tu logo en todas las salidas generadas por IA',
      'Canal de soporte dedicado bajo tu marca',
      'Eliminación de todas las referencias a CatyAI'
    ],
    revTitle: '35% de Participación de Ingresos',
    revSub: 'El margen más alto del mercado. Nosotros gestionamos infraestructura, actualizaciones y seguridad. Tú te concentras en las ventas.',
    revDetail: 'Sin mínimos. Sin límites. Pagado mensualmente.',
    stepsTitle: 'En Marcha en 72 Horas',
    steps: [
      { n: '01', t: 'Solicita y Firma el NDA', d: 'Envía el perfil de tu agencia. Revisamos en 48 horas y enviamos el acuerdo de asociación.' },
      { n: '02', t: 'Configuración de Marca', d: 'Sube tu logo, colores y dominio. Nuestro equipo configura el entorno white-label.' },
      { n: '03', t: 'Lanzamiento', d: 'Recibe tus claves API, credenciales de administrador y materiales de go-to-market. Empieza a vender de inmediato.' }
    ],
    ctaTitle: '¿Listo para hacer white-label el futuro?',
    ctaSub: 'Únete a las agencias que ya despliegan infraestructura IA bajo su marca.',
    ctaBtn: 'Solicitar Ahora',
    ctaSecondary: 'Hablar con Partnerships →'
  }
}

export default function WhiteLabelPage() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const s = localStorage.getItem('catyai_lang'); if (s && T[s]) setLang(s) }, [])
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
        title="White-Label Program — CatyAI"
        description="Deploy CatyAI's full neural infrastructure under your brand. 35% revenue share, 72-hour go-live, full white-label control."
        canonical="https://catyai.io/white-label"
      />
      <style>{`
        .wl-page {
          background: #010A1F;
          color: #f1f5f9;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
        }
        .wl-section {
          padding: 7rem 1.5rem;
        }
        .wl-section-alt {
          background: #030D26;
        }
        .wl-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .wl-badge {
          display: inline-block;
          padding: 0.4rem 0.85rem;
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C8A165;
          border: 1px solid rgba(200,161,101,0.3);
          border-radius: 999px;
          background: rgba(200,161,101,0.05);
          margin-bottom: 1.75rem;
        }
        .wl-h1 {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
        }
        .wl-accent {
          color: #C8A165;
          display: block;
        }
        .wl-h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 1.25rem;
        }
        .wl-sub {
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          line-height: 1.65;
          color: #94a3b8;
          margin: 0 0 2.5rem;
          max-width: 560px;
        }
        .wl-hero {
          padding-top: 8.5rem;
        }
        .wl-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .wl-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }
        .wl-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.95rem 1.6rem;
          background: #C8A165;
          color: #010A1F;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .wl-btn-primary:hover {
          background: #D4B57A;
          transform: translateY(-1px);
        }
        .wl-btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.95rem 1.6rem;
          color: #f1f5f9;
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: 8px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.15);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .wl-btn-secondary:hover {
          border-color: rgba(200,161,101,0.5);
          background: rgba(200,161,101,0.05);
        }

        /* Hero visual */
        .wl-visual {
          position: relative;
          height: 420px;
          background: rgba(10,22,40,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .wl-core {
          position: absolute;
          width: 140px; height: 140px;
          background: #C8A165;
          border-radius: 50%;
          filter: blur(80px);
          animation: wl-breathe 3s ease-in-out infinite;
        }
        @keyframes wl-breathe {
          0%,100% { opacity:0.55; transform:scale(1); }
          50% { opacity:0.9; transform:scale(1.12); }
        }
        .wl-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(200,161,101,0.15);
          animation: wl-expand 3s ease-in-out infinite;
          width: 130px; height: 130px;
        }
        .wl-ring:nth-child(2) { width:200px;height:200px; animation-delay:0.5s; }
        .wl-ring:nth-child(3) { width:280px;height:280px; animation-delay:1s; border-color: rgba(200,161,101,0.08); }
        @keyframes wl-expand {
          0%,100% { opacity:0.6; }
          50% { opacity:1; }
        }
        .wl-glass {
          position: relative; z-index: 10;
          width: 260px; height: 150px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center; gap: 0.75rem;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .wl-logo-box {
          width: 36px; height: 36px;
          border: 1.5px dashed rgba(255,255,255,0.3);
          border-radius: 6px;
          animation: wl-dash 2s ease-in-out infinite;
        }
        @keyframes wl-dash { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .wl-logo-text {
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .wl-visual-caption {
          position: absolute; bottom: 1.2rem;
          font-family: monospace; font-size: 0.62rem;
          letter-spacing: 0.2em; text-transform: uppercase; color: #64748b;
        }

        /* Metrics */
        .wl-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .wl-metric {
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .wl-metric:last-child { border-right: none; }
        .wl-metric-v {
          font-size: clamp(1.75rem, 2.5vw, 2.5rem);
          font-weight: 800;
          color: #C8A165;
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
        }
        .wl-metric-l {
          font-family: monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #94a3b8;
        }

        /* Features */
        .wl-feat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .wl-feat-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .wl-feat-item {
          padding: 1.1rem 1.25rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          font-size: 0.95rem;
          color: #e2e8f0;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          display: flex; align-items: center; gap: 0.85rem;
        }
        .wl-feat-item:hover {
          border-color: rgba(200,161,101,0.3);
          background: rgba(200,161,101,0.04);
          transform: translateX(4px);
        }
        .wl-feat-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C8A165;
          flex-shrink: 0;
        }

        /* Revenue */
        .wl-rev {
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
        }
        .wl-rev-figure {
          font-size: clamp(4rem, 9vw, 7.5rem);
          font-weight: 800;
          color: #C8A165;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 1.25rem;
        }
        .wl-rev-detail {
          margin-top: 2rem;
          display: inline-block;
          padding: 0.7rem 1.5rem;
          font-family: monospace;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8A165;
          border: 1px solid rgba(200,161,101,0.25);
          border-radius: 999px;
          background: rgba(200,161,101,0.04);
        }

        /* Steps */
        .wl-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3.5rem;
        }
        .wl-step {
          padding: 2rem 1.75rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .wl-step:hover {
          border-color: rgba(200,161,101,0.3);
          transform: translateY(-4px);
        }
        .wl-step-n {
          font-family: monospace;
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          color: #C8A165;
          margin-bottom: 1.25rem;
        }
        .wl-step-t {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 0.65rem;
          letter-spacing: -0.01em;
        }
        .wl-step-d {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #94a3b8;
          margin: 0;
        }

        /* CTA */
        .wl-cta {
          text-align: center;
          padding: 6rem 1.5rem;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          border-top: 1px solid rgba(200,161,101,0.15);
        }
        .wl-cta-title {
          font-size: clamp(1.85rem, 3.2vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
        }
        .wl-cta-sub {
          color: #94a3b8;
          font-size: 1.05rem;
          max-width: 560px;
          margin: 0 auto 2.25rem;
        }
        .wl-cta-row-center {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.85rem;
        }

        .wl-section-head {
          margin-bottom: 1.5rem;
        }

        @media (max-width: 900px) {
          .wl-hero-grid,
          .wl-feat-grid,
          .wl-steps {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .wl-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
          .wl-metric:nth-child(2) { border-right: none; }
          .wl-metric:nth-child(1), .wl-metric:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .wl-section { padding: 5rem 1.25rem; }
          .wl-hero { padding-top: 7rem; }
          .wl-visual { height: 340px; }
        }
      `}</style>
      <div className="wl-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* HERO */}
        <section className="wl-section wl-hero">
          <div className="wl-container wl-hero-grid">
            <div>
              <span className="wl-badge">{t.badge}</span>
              <h1 className="wl-h1">
                {t.title}
                <span className="wl-accent">{t.titleAccent}</span>
              </h1>
              <p className="wl-sub">{t.sub}</p>
              <div className="wl-cta-row">
                <Link to="/contact" className="wl-btn-primary">{t.cta1}</Link>
                <Link to="/partners" className="wl-btn-secondary">{t.cta2}</Link>
              </div>
            </div>
            <div className="wl-visual" aria-hidden="true">
              <div className="wl-ring"></div>
              <div className="wl-ring"></div>
              <div className="wl-ring"></div>
              <div className="wl-core"></div>
              <div className="wl-glass">
                <div className="wl-logo-box"></div>
                <span className="wl-logo-text">{t.logoPlaceholder}</span>
              </div>
              <span className="wl-visual-caption">Powered by CatyAI · Invisibly</span>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section style={{ background: '#030D26' }}>
          <div className="wl-container">
            <div className="wl-metrics">
              {t.metrics.map((m, i) => (
                <div key={i} className="wl-metric">
                  <div className="wl-metric-v">{m.v}</div>
                  <div className="wl-metric-l">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="wl-section">
          <div className="wl-container wl-feat-grid">
            <div className="wl-section-head">
              <span className="wl-badge">Features</span>
              <h2 className="wl-h2">{t.featTitle}</h2>
              <p className="wl-sub">{t.featSub}</p>
            </div>
            <ul className="wl-feat-list">
              {t.features.map((f, i) => (
                <li key={i} className="wl-feat-item">
                  <span className="wl-feat-dot" aria-hidden="true"></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* REVENUE */}
        <section className="wl-section wl-section-alt">
          <div className="wl-container wl-rev">
            <span className="wl-badge">Revenue</span>
            <div className="wl-rev-figure">35%</div>
            <h2 className="wl-h2" style={{ marginBottom: '1rem' }}>{t.revTitle}</h2>
            <p className="wl-sub" style={{ margin: '0 auto', maxWidth: 600 }}>{t.revSub}</p>
            <div className="wl-rev-detail">{t.revDetail}</div>
          </div>
        </section>

        {/* STEPS */}
        <section className="wl-section">
          <div className="wl-container">
            <div style={{ textAlign: 'center' }}>
              <span className="wl-badge">Onboarding</span>
              <h2 className="wl-h2">{t.stepsTitle}</h2>
            </div>
            <div className="wl-steps">
              {t.steps.map((s, i) => (
                <article key={i} className="wl-step">
                  <div className="wl-step-n">{s.n}</div>
                  <h3 className="wl-step-t">{s.t}</h3>
                  <p className="wl-step-d">{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="wl-cta">
          <div className="wl-container">
            <h2 className="wl-cta-title">{t.ctaTitle}</h2>
            <p className="wl-cta-sub">{t.ctaSub}</p>
            <div className="wl-cta-row-center">
              <Link to="/contact" className="wl-btn-primary">{t.ctaBtn}</Link>
              <Link to="/contact" className="wl-btn-secondary">{t.ctaSecondary}</Link>
            </div>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
