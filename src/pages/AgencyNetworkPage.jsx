import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    badge: 'Agency Network',
    title: 'Scale the Standard.',
    titleAccent: 'Join the Network.',
    sub: 'Become a certified CatyAI reseller. Earn recurring revenue while delivering enterprise-grade AI infrastructure to your clients.',
    cta1: 'Apply to Join',
    cta2: 'View White-Label Program',
    legendT1: 'Platinum',
    legendT2: 'Gold',
    legendT3: 'Silver',
    tiersTitle: 'Three Tiers. One Network.',
    tiersSub: 'Every agency starts as Silver and grows based on managed revenue. No politics — pure performance.',
    tiers: [
      { name: 'Silver', rev: '20%', min: '$0 MRR minimum', badge: '', features: ['CatyAI certified badge', 'Partner dashboard access', 'Sales enablement kit', 'Email support'] },
      { name: 'Gold', rev: '25%', min: '$2,000 MRR', badge: 'Most Common', features: ['Everything in Silver', 'Co-marketing opportunities', 'Priority support channel', 'Quarterly business review'] },
      { name: 'Platinum', rev: '30%', min: '$10,000 MRR', badge: 'Elite', features: ['Everything in Gold', 'Named account manager', 'Early feature access', 'Custom SLA negotiation'] },
    ],
    revShare: 'Revenue Share',
    threshold: 'Threshold',
    processTitle: 'The Certification Path',
    processSub: 'From application to first sale in under 2 weeks.',
    steps: [
      { n: '01', t: 'Apply Online', d: 'Submit your agency profile and primary market. Decision in 48 hours.' },
      { n: '02', t: 'Complete Training', d: '4-hour online certification covering NAP Protocol, GEO methodology, and sales objections.' },
      { n: '03', t: 'Receive Credentials', d: 'Partner dashboard, sales materials, and your first demo account. Start selling.' },
    ],
    statsTitle: 'Built for Scale',
    stats: [
      { v: '3,000+', l: 'Active Agency Clients' },
      { v: '47', l: 'Countries Represented' },
      { v: '$2.1M', l: 'Partner Earnings Paid' },
      { v: '24/7', l: 'Partner Support' },
    ],
    ctaTitle: 'The network is growing.',
    ctaSub: 'Applications reviewed on a rolling basis. First-come certified basis in each market.',
    ctaBtn: 'Apply Now',
    ctaSecondary: 'Download Partner Brief →',
  },
  ro: {
    badge: 'Rețea de Agenții',
    title: 'Scalează Standardul.',
    titleAccent: 'Alătură-te Rețelei.',
    sub: 'Devino reseller CatyAI certificat. Câștigă venituri recurente livrând infrastructură AI enterprise clienților tăi.',
    cta1: 'Aplică pentru aderare',
    cta2: 'Vezi Programul White-Label',
    legendT1: 'Platinum',
    legendT2: 'Gold',
    legendT3: 'Silver',
    tiersTitle: 'Trei Niveluri. O Rețea.',
    tiersSub: 'Fiecare agenție începe ca Silver și crește pe baza veniturilor gestionate. Fără politică — performanță pură.',
    tiers: [
      { name: 'Silver', rev: '20%', min: 'Minim $0 MRR', badge: '', features: ['Insignă CatyAI certificată', 'Acces dashboard partener', 'Kit de vânzări', 'Suport email'] },
      { name: 'Gold', rev: '25%', min: '$2,000 MRR', badge: 'Cel mai comun', features: ['Tot din Silver', 'Oportunități co-marketing', 'Canal suport prioritar', 'Review trimestrial business'] },
      { name: 'Platinum', rev: '30%', min: '$10,000 MRR', badge: 'Elite', features: ['Tot din Gold', 'Account manager dedicat', 'Acces timpuriu la funcții', 'Negociere SLA personalizat'] },
    ],
    revShare: 'Cotă Venituri',
    threshold: 'Prag',
    processTitle: 'Calea Certificării',
    processSub: 'De la aplicație la prima vânzare în mai puțin de 2 săptămâni.',
    steps: [
      { n: '01', t: 'Aplică Online', d: 'Trimite profilul agenției și piața principală. Decizie în 48 de ore.' },
      { n: '02', t: 'Finalizează Trainingul', d: 'Certificare online de 4 ore acoperind NAP Protocol, metodologia GEO și obiecțiile de vânzare.' },
      { n: '03', t: 'Primește Credențialele', d: 'Dashboard partener, materiale de vânzări și primul tău cont demo. Începe să vinzi.' },
    ],
    statsTitle: 'Construit pentru Scalare',
    stats: [
      { v: '3,000+', l: 'Clienți Activi de Agenții' },
      { v: '47', l: 'Țări Reprezentate' },
      { v: '$2.1M', l: 'Câștiguri Plătite Partenerilor' },
      { v: '24/7', l: 'Suport Partener' },
    ],
    ctaTitle: 'Rețeaua se extinde.',
    ctaSub: 'Aplicațiile sunt revizuite continuu. Certificare în ordinea sosirii pentru fiecare piață.',
    ctaBtn: 'Aplică Acum',
    ctaSecondary: 'Descarcă Brief-ul Partenerilor →',
  },
  fr: {
    badge: "Réseau d'Agences",
    title: 'Élevez le Standard.',
    titleAccent: 'Rejoignez le Réseau.',
    sub: "Devenez revendeur CatyAI certifié. Générez des revenus récurrents en livrant une infrastructure IA d'entreprise à vos clients.",
    cta1: 'Postuler',
    cta2: 'Voir le Programme White-Label',
    legendT1: 'Platinum',
    legendT2: 'Gold',
    legendT3: 'Silver',
    tiersTitle: 'Trois Niveaux. Un Réseau.',
    tiersSub: 'Chaque agence commence en Silver et progresse selon les revenus gérés. Pas de politique — pure performance.',
    tiers: [
      { name: 'Silver', rev: '20%', min: 'Minimum $0 MRR', badge: '', features: ['Badge CatyAI certifié', 'Accès tableau de bord partenaire', 'Kit commercial', 'Support email'] },
      { name: 'Gold', rev: '25%', min: '$2,000 MRR', badge: 'Le plus courant', features: ['Tout du Silver', 'Opportunités de co-marketing', 'Canal de support prioritaire', 'Revue trimestrielle'] },
      { name: 'Platinum', rev: '30%', min: '$10,000 MRR', badge: 'Elite', features: ['Tout du Gold', 'Account manager dédié', 'Accès anticipé aux fonctionnalités', 'Négociation SLA personnalisée'] },
    ],
    revShare: 'Part des Revenus',
    threshold: 'Seuil',
    processTitle: 'Le Chemin de Certification',
    processSub: 'De la candidature à la première vente en moins de 2 semaines.',
    steps: [
      { n: '01', t: 'Postuler en Ligne', d: 'Soumettez le profil de votre agence et votre marché principal. Décision sous 48 heures.' },
      { n: '02', t: 'Compléter la Formation', d: 'Certification en ligne de 4 heures couvrant le NAP Protocol, la méthodologie GEO et les objections commerciales.' },
      { n: '03', t: 'Recevoir les Identifiants', d: 'Tableau de bord partenaire, matériaux de vente et votre premier compte démo. Commencez à vendre.' },
    ],
    statsTitle: "Conçu pour l'Échelle",
    stats: [
      { v: '3,000+', l: "Clients d'Agences Actifs" },
      { v: '47', l: 'Pays Représentés' },
      { v: '$2.1M', l: 'Gains Versés aux Partenaires' },
      { v: '24/7', l: 'Support Partenaire' },
    ],
    ctaTitle: "Le réseau s'étend.",
    ctaSub: 'Candidatures examinées en continu. Certification au premier arrivé sur chaque marché.',
    ctaBtn: 'Postuler Maintenant',
    ctaSecondary: 'Télécharger le Brief Partenaire →',
  },
  de: {
    badge: 'Agentur-Netzwerk',
    title: 'Skaliere den Standard.',
    titleAccent: 'Tritt dem Netzwerk bei.',
    sub: 'Werde zertifizierter CatyAI-Reseller. Verdiene wiederkehrende Einnahmen, indem du Enterprise-AI-Infrastruktur an deine Kunden lieferst.',
    cta1: 'Jetzt bewerben',
    cta2: 'White-Label-Programm ansehen',
    legendT1: 'Platinum',
    legendT2: 'Gold',
    legendT3: 'Silver',
    tiersTitle: 'Drei Stufen. Ein Netzwerk.',
    tiersSub: 'Jede Agentur startet als Silver und wächst basierend auf verwaltetem Umsatz. Keine Politik — reine Leistung.',
    tiers: [
      { name: 'Silver', rev: '20%', min: '$0 MRR Minimum', badge: '', features: ['Zertifiziertes CatyAI-Abzeichen', 'Partner-Dashboard-Zugang', 'Vertriebs-Toolkit', 'E-Mail-Support'] },
      { name: 'Gold', rev: '25%', min: '$2,000 MRR', badge: 'Am häufigsten', features: ['Alles aus Silver', 'Co-Marketing-Möglichkeiten', 'Prioritärer Support-Kanal', 'Quartalsweises Business-Review'] },
      { name: 'Platinum', rev: '30%', min: '$10,000 MRR', badge: 'Elite', features: ['Alles aus Gold', 'Persönlicher Account Manager', 'Früher Feature-Zugang', 'Individuelle SLA-Verhandlung'] },
    ],
    revShare: 'Umsatzbeteiligung',
    threshold: 'Schwelle',
    processTitle: 'Der Zertifizierungspfad',
    processSub: 'Von der Bewerbung bis zum ersten Verkauf in unter 2 Wochen.',
    steps: [
      { n: '01', t: 'Online bewerben', d: 'Reiche dein Agenturprofil und deinen Primärmarkt ein. Entscheidung in 48 Stunden.' },
      { n: '02', t: 'Training absolvieren', d: '4-stündige Online-Zertifizierung zu NAP Protocol, GEO-Methodik und Vertriebseinwänden.' },
      { n: '03', t: 'Zugangsdaten erhalten', d: 'Partner-Dashboard, Vertriebsmaterialien und dein erster Demo-Account. Starte mit dem Verkauf.' },
    ],
    statsTitle: 'Für Skalierung gebaut',
    stats: [
      { v: '3,000+', l: 'Aktive Agentur-Kunden' },
      { v: '47', l: 'Vertretene Länder' },
      { v: '$2.1M', l: 'An Partner ausgezahlt' },
      { v: '24/7', l: 'Partner-Support' },
    ],
    ctaTitle: 'Das Netzwerk wächst.',
    ctaSub: 'Bewerbungen werden laufend geprüft. Zertifizierung nach Eingang in jedem Markt.',
    ctaBtn: 'Jetzt bewerben',
    ctaSecondary: 'Partner-Brief herunterladen →',
  },
  es: {
    badge: 'Red de Agencias',
    title: 'Escala el Estándar.',
    titleAccent: 'Únete a la Red.',
    sub: 'Conviértete en revendedor certificado de CatyAI. Genera ingresos recurrentes entregando infraestructura de IA de nivel empresarial a tus clientes.',
    cta1: 'Solicitar Acceso',
    cta2: 'Ver Programa White-Label',
    legendT1: 'Platinum',
    legendT2: 'Gold',
    legendT3: 'Silver',
    tiersTitle: 'Tres Niveles. Una Red.',
    tiersSub: 'Cada agencia comienza como Silver y crece según los ingresos gestionados. Sin política — solo rendimiento.',
    tiers: [
      { name: 'Silver', rev: '20%', min: 'Mínimo $0 MRR', badge: '', features: ['Insignia CatyAI certificada', 'Acceso al panel de partners', 'Kit de habilitación de ventas', 'Soporte por email'] },
      { name: 'Gold', rev: '25%', min: '$2,000 MRR', badge: 'Más común', features: ['Todo lo de Silver', 'Oportunidades de co-marketing', 'Canal de soporte prioritario', 'Revisión trimestral de negocio'] },
      { name: 'Platinum', rev: '30%', min: '$10,000 MRR', badge: 'Elite', features: ['Todo lo de Gold', 'Account manager dedicado', 'Acceso anticipado a funciones', 'Negociación de SLA personalizada'] },
    ],
    revShare: 'Comisión',
    threshold: 'Umbral',
    processTitle: 'El Camino de Certificación',
    processSub: 'De la solicitud a la primera venta en menos de 2 semanas.',
    steps: [
      { n: '01', t: 'Solicitar en Línea', d: 'Envía el perfil de tu agencia y mercado principal. Decisión en 48 horas.' },
      { n: '02', t: 'Completar la Formación', d: 'Certificación online de 4 horas cubriendo NAP Protocol, metodología GEO y objeciones de ventas.' },
      { n: '03', t: 'Recibir Credenciales', d: 'Panel de partner, materiales de venta y tu primera cuenta demo. Empieza a vender.' },
    ],
    statsTitle: 'Construido para Escalar',
    stats: [
      { v: '3,000+', l: 'Clientes Activos de Agencias' },
      { v: '47', l: 'Países Representados' },
      { v: '$2.1M', l: 'Ganancias Pagadas a Partners' },
      { v: '24/7', l: 'Soporte para Partners' },
    ],
    ctaTitle: 'La red está creciendo.',
    ctaSub: 'Solicitudes revisadas de forma continua. Certificación por orden de llegada en cada mercado.',
    ctaBtn: 'Solicitar Ahora',
    ctaSecondary: 'Descargar Brief de Partners →',
  },
}

export default function AgencyNetworkPage() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem('catyai_lang')
    if (s) setLang(s)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <>
      <SEO
        title="Agency Network — Certified Reseller Program | CatyAI"
        description="Become a certified CatyAI reseller. Earn 20-30% recurring revenue while delivering enterprise-grade AI infrastructure to your clients across 47 countries."
        canonical="https://catyai.io/agency-network"
      />
      <style>{`
        .an-page {
          background: #010A1F;
          color: #f1f5f9;
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .an-page * { box-sizing: border-box; }

        .an-section {
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem);
        }
        .an-section-alt { background: #030D26; }
        .an-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* HERO */
        .an-hero { padding-top: clamp(7rem, 12vw, 10rem); }
        .an-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          align-items: center;
        }
        .an-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.45rem 0.95rem;
          border: 1px solid rgba(200,161,101,0.3);
          background: rgba(200,161,101,0.06);
          border-radius: 999px;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8A165;
          font-weight: 600;
          margin-bottom: 1.6rem;
        }
        .an-badge::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: #C8A165;
          box-shadow: 0 0 8px rgba(200,161,101,0.8);
        }
        .an-h1 {
          font-size: clamp(2.4rem, 5.5vw, 4.4rem);
          font-weight: 800;
          line-height: 1.04;
          letter-spacing: -0.03em;
          margin: 0 0 1.4rem;
          color: #f8fafc;
        }
        .an-h1-accent {
          display: block;
          background: linear-gradient(135deg, #C8A165 0%, #D4B57A 50%, #C8A165 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .an-sub {
          font-size: clamp(1rem, 1.3vw, 1.18rem);
          line-height: 1.6;
          color: #94a3b8;
          margin: 0 0 2.2rem;
          max-width: 540px;
        }
        .an-cta-row {
          display: flex; flex-wrap: wrap; gap: 0.85rem;
        }
        .an-btn {
          display: inline-flex; align-items: center;
          padding: 0.95rem 1.7rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all .25s ease;
          letter-spacing: 0.01em;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .an-btn-primary {
          background: #C8A165;
          color: #010A1F;
          box-shadow: 0 8px 24px -8px rgba(200,161,101,0.5);
        }
        .an-btn-primary:hover {
          background: #D4B57A;
          transform: translateY(-1px);
          box-shadow: 0 12px 30px -8px rgba(200,161,101,0.6);
        }
        .an-btn-ghost {
          background: transparent;
          color: #f1f5f9;
          border-color: rgba(255,255,255,0.18);
        }
        .an-btn-ghost:hover {
          border-color: rgba(200,161,101,0.5);
          color: #C8A165;
        }

        /* HERO VISUAL */
        .an-visual {
          position: relative;
          height: 440px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          overflow: hidden;
        }
        .an-hub {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 48px; height: 48px;
          background: #C8A165;
          border-radius: 50%;
          box-shadow: 0 0 40px rgba(200,161,101,0.6), 0 0 80px rgba(200,161,101,0.2);
          z-index: 10;
          animation: an-hub-pulse 2.5s ease-in-out infinite;
        }
        .an-hub::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(200,161,101,0.5);
          animation: an-hub-ring 2.5s ease-out infinite;
        }
        @keyframes an-hub-pulse {
          0%,100% { box-shadow: 0 0 30px rgba(200,161,101,0.5); }
          50% { box-shadow: 0 0 60px rgba(200,161,101,0.8), 0 0 100px rgba(200,161,101,0.3); }
        }
        @keyframes an-hub-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .an-node {
          position: absolute;
          border-radius: 50%;
          z-index: 8;
        }
        .an-node-t1 { width: 28px; height: 28px; background: #C8A165; box-shadow: 0 0 20px rgba(200,161,101,0.6); }
        .an-node-t2 { width: 20px; height: 20px; background: rgba(200,161,101,0.6); box-shadow: 0 0 12px rgba(200,161,101,0.3); }
        .an-node-t3 { width: 12px; height: 12px; background: rgba(200,161,101,0.3); }

        .an-n1-a { top: 28%; left: 28%; }
        .an-n1-b { top: 28%; right: 25%; }
        .an-n1-c { bottom: 28%; left: 38%; }

        .an-n2-a { top: 14%; left: 18%; }
        .an-n2-b { top: 18%; right: 15%; }
        .an-n2-c { bottom: 16%; right: 22%; }
        .an-n2-d { bottom: 20%; left: 18%; }

        .an-n3-a { top: 8%; left: 42%; }
        .an-n3-b { top: 30%; left: 6%; }
        .an-n3-c { top: 10%; right: 30%; }
        .an-n3-d { bottom: 8%; left: 55%; }
        .an-n3-e { bottom: 12%; right: 8%; }
        .an-n3-f { top: 50%; right: 5%; }

        .an-node-float { animation: an-float 4s ease-in-out infinite; }
        .an-node-float:nth-child(odd) { animation-delay: 1s; }
        .an-node-float:nth-child(3n) { animation-delay: 2s; }
        @keyframes an-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .an-legend {
          position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);
          display: flex; gap: 1.5rem;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em; text-transform: uppercase; color: #475569;
        }
        .an-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 5px; vertical-align: middle; }
        .an-legend-dot.t1 { background: #C8A165; box-shadow: 0 0 8px rgba(200,161,101,0.6); }
        .an-legend-dot.t2 { background: rgba(200,161,101,0.6); }
        .an-legend-dot.t3 { background: rgba(200,161,101,0.3); }

        /* SECTION HEADERS */
        .an-section-head { text-align: center; margin-bottom: clamp(2.5rem, 5vw, 4rem); }
        .an-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.85rem;
        }
        .an-h2 {
          font-size: clamp(1.9rem, 3.5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0 0 1rem;
          color: #f8fafc;
        }
        .an-h2-sub {
          color: #94a3b8;
          font-size: clamp(1rem, 1.15vw, 1.1rem);
          line-height: 1.6;
          max-width: 640px;
          margin: 0 auto;
        }

        /* TIERS */
        .an-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        .an-tier {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          transition: all .3s ease;
          position: relative;
        }
        .an-tier:hover {
          border-color: rgba(200,161,101,0.3);
          transform: translateY(-4px);
        }
        .an-tier-gold {
          border: 1px solid rgba(200,161,101,0.5);
          background: linear-gradient(180deg, rgba(200,161,101,0.06) 0%, rgba(200,161,101,0.02) 100%);
          box-shadow: 0 16px 50px -20px rgba(200,161,101,0.25);
        }
        .an-tier-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #C8A165;
          color: #010A1F;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
        }
        .an-tier-name {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 0.85rem;
        }
        .an-tier-rev {
          font-size: clamp(2.4rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f8fafc;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .an-tier-rev-label {
          font-size: 0.7rem;
          color: #64748b;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
        }
        .an-tier-min {
          padding: 0.6rem 0.9rem;
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          font-size: 0.85rem;
          color: #cbd5e1;
          margin-bottom: 1.6rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .an-tier-min-label {
          display: block;
          font-size: 0.6rem;
          color: #64748b;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .an-tier-features { list-style: none; padding: 0; margin: 0 0 1.6rem; flex: 1; }
        .an-tier-features li {
          padding: 0.55rem 0;
          font-size: 0.92rem;
          color: #cbd5e1;
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .an-tier-features li::before {
          content: '';
          width: 5px; height: 5px;
          background: #C8A165;
          border-radius: 50%;
          margin-top: 0.5rem;
          flex-shrink: 0;
        }

        /* PROCESS */
        .an-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          position: relative;
        }
        .an-step {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 2rem 1.6rem;
          position: relative;
          transition: all .25s ease;
        }
        .an-step:hover {
          border-color: rgba(200,161,101,0.25);
          background: rgba(200,161,101,0.03);
        }
        .an-step-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: #C8A165;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .an-step-t {
          font-size: 1.25rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }
        .an-step-d {
          color: #94a3b8;
          font-size: 0.93rem;
          line-height: 1.55;
          margin: 0;
        }

        /* STATS */
        .an-stats-head { text-align: center; margin-bottom: 3rem; }
        .an-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .an-stat {
          text-align: center;
          padding: 1.8rem 1rem;
          border-left: 1px solid rgba(255,255,255,0.07);
        }
        .an-stat:first-child { border-left: none; }
        .an-stat-v {
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #C8A165;
          line-height: 1;
          margin-bottom: 0.55rem;
        }
        .an-stat-l {
          font-size: 0.78rem;
          color: #94a3b8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* FINAL CTA */
        .an-cta-final {
          text-align: center;
          padding: clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 4vw, 3rem);
          background: linear-gradient(135deg, rgba(200,161,101,0.08) 0%, rgba(200,161,101,0.02) 100%);
          border: 1px solid rgba(200,161,101,0.18);
          border-radius: 24px;
        }
        .an-cta-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0 0 0.8rem;
          color: #f8fafc;
        }
        .an-cta-sub {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0 auto 2rem;
          max-width: 540px;
        }
        .an-cta-row-final {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 0.85rem; align-items: center;
        }
        .an-cta-secondary {
          color: #C8A165;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          padding: 0.6rem 0.4rem;
          border-bottom: 1px solid transparent;
          transition: border-color .2s ease;
        }
        .an-cta-secondary:hover { border-bottom-color: #C8A165; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .an-hero-grid { grid-template-columns: 1fr; }
          .an-visual { height: 380px; }
          .an-stats { grid-template-columns: repeat(2, 1fr); }
          .an-stat { border-left: none; border-top: 1px solid rgba(255,255,255,0.07); }
          .an-stat:first-child, .an-stat:nth-child(2) { border-top: none; }
        }
        @media (max-width: 768px) {
          .an-tiers { grid-template-columns: 1fr; }
          .an-steps { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="an-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* HERO */}
        <section className="an-section an-hero">
          <div className="an-container">
            <div className="an-hero-grid">
              <div>
                <span className="an-badge">{t.badge}</span>
                <h1 className="an-h1">
                  {t.title}
                  <span className="an-h1-accent">{t.titleAccent}</span>
                </h1>
                <p className="an-sub">{t.sub}</p>
                <div className="an-cta-row">
                  <a href="#apply" className="an-btn an-btn-primary">{t.cta1}</a>
                  <Link to="/white-label" className="an-btn an-btn-ghost">{t.cta2}</Link>
                </div>
              </div>

              <div className="an-visual" aria-hidden="true">
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="50" x2="29" y2="30" stroke="rgba(200,161,101,0.25)" strokeWidth="0.3" />
                  <line x1="50" y1="50" x2="72" y2="30" stroke="rgba(200,161,101,0.25)" strokeWidth="0.3" />
                  <line x1="50" y1="50" x2="39" y2="72" stroke="rgba(200,161,101,0.2)" strokeWidth="0.3" />
                  <line x1="29" y1="30" x2="19" y2="16" stroke="rgba(200,161,101,0.15)" strokeWidth="0.2" />
                  <line x1="72" y1="30" x2="82" y2="16" stroke="rgba(200,161,101,0.15)" strokeWidth="0.2" />
                  <line x1="72" y1="30" x2="78" y2="50" stroke="rgba(200,161,101,0.12)" strokeWidth="0.2" />
                  <line x1="29" y1="30" x2="20" y2="50" stroke="rgba(200,161,101,0.12)" strokeWidth="0.2" />
                  <line x1="39" y1="72" x2="58" y2="92" stroke="rgba(200,161,101,0.1)" strokeWidth="0.15" />
                  <line x1="39" y1="72" x2="19" y2="80" stroke="rgba(200,161,101,0.1)" strokeWidth="0.15" />
                  <line x1="82" y1="50" x2="92" y2="68" stroke="rgba(200,161,101,0.1)" strokeWidth="0.15" />
                </svg>
                <span className="an-hub" />
                <span className="an-node an-node-t1 an-n1-a" />
                <span className="an-node an-node-t1 an-n1-b" />
                <span className="an-node an-node-t1 an-n1-c" />
                <span className="an-node an-node-t2 an-node-float an-n2-a" />
                <span className="an-node an-node-t2 an-node-float an-n2-b" />
                <span className="an-node an-node-t2 an-node-float an-n2-c" />
                <span className="an-node an-node-t2 an-node-float an-n2-d" />
                <span className="an-node an-node-t3 an-node-float an-n3-a" />
                <span className="an-node an-node-t3 an-node-float an-n3-b" />
                <span className="an-node an-node-t3 an-node-float an-n3-c" />
                <span className="an-node an-node-t3 an-node-float an-n3-d" />
                <span className="an-node an-node-t3 an-node-float an-n3-e" />
                <span className="an-node an-node-t3 an-node-float an-n3-f" />
                <div className="an-legend">
                  <span><span className="an-legend-dot t1" />{t.legendT1}</span>
                  <span><span className="an-legend-dot t2" />{t.legendT2}</span>
                  <span><span className="an-legend-dot t3" />{t.legendT3}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="an-section an-section-alt">
          <div className="an-container">
            <div className="an-section-head">
              <div className="an-eyebrow">// Partner Tiers</div>
              <h2 className="an-h2">{t.tiersTitle}</h2>
              <p className="an-h2-sub">{t.tiersSub}</p>
            </div>
            <div className="an-tiers">
              {t.tiers.map((tier, i) => (
                <div key={tier.name} className={`an-tier${i === 1 ? ' an-tier-gold' : ''}`}>
                  {tier.badge && <span className="an-tier-badge">{tier.badge}</span>}
                  <div className="an-tier-name">{tier.name}</div>
                  <div className="an-tier-rev">{tier.rev}</div>
                  <div className="an-tier-rev-label">{t.revShare}</div>
                  <div className="an-tier-min">
                    <span className="an-tier-min-label">{t.threshold}</span>
                    {tier.min}
                  </div>
                  <ul className="an-tier-features">
                    {tier.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <a href="#apply" className={`an-btn ${i === 1 ? 'an-btn-primary' : 'an-btn-ghost'}`}>{t.cta1}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="an-section">
          <div className="an-container">
            <div className="an-section-head">
              <div className="an-eyebrow">// Onboarding</div>
              <h2 className="an-h2">{t.processTitle}</h2>
              <p className="an-h2-sub">{t.processSub}</p>
            </div>
            <div className="an-steps">
              {t.steps.map((step) => (
                <div key={step.n} className="an-step">
                  <div className="an-step-n">STEP {step.n}</div>
                  <h3 className="an-step-t">{step.t}</h3>
                  <p className="an-step-d">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="an-section an-section-alt">
          <div className="an-container">
            <div className="an-stats-head">
              <div className="an-eyebrow">// By the Numbers</div>
              <h2 className="an-h2">{t.statsTitle}</h2>
            </div>
            <div className="an-stats">
              {t.stats.map((s) => (
                <div key={s.l} className="an-stat">
                  <div className="an-stat-v">{s.v}</div>
                  <div className="an-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="an-section" id="apply">
          <div className="an-container">
            <div className="an-cta-final">
              <h2 className="an-cta-title">{t.ctaTitle}</h2>
              <p className="an-cta-sub">{t.ctaSub}</p>
              <div className="an-cta-row-final">
                <a href="mailto:partners@catyai.io" className="an-btn an-btn-primary">{t.ctaBtn}</a>
                <a href="/partner-brief.pdf" className="an-cta-secondary">{t.ctaSecondary}</a>
              </div>
            </div>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
