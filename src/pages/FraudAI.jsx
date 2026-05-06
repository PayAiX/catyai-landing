import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
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
      { title: 'Message Arrives', desc: 'A new WhatsApp message reaches your business number.', icon: '01' },
      { title: '8 Modules Analyze', desc: 'Our AI scans for phishing, urgency tactics, impersonation, suspicious links, and more — in under 1 second.', icon: '02' },
      { title: 'Threat Blocked or Delivered', desc: 'Dangerous messages are quarantined. Safe messages reach you instantly.', icon: '03' }
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
      { value: '8', label: 'Detection Modules' },
      { value: '<1s', label: 'Analysis Time' },
      { value: '99.2%', label: 'Accuracy' },
      { value: '0', label: 'False Positives/day' }
    ],

    comparisonTitle: 'FraudAI vs. No Protection',
    comparisonHeadWithout: 'Without Protection',
    comparisonHeadWith: 'With FraudAI',
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
    ctaButton: 'Get Protected Now'
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
      { title: 'Mesaj Primit', desc: 'Un nou mesaj WhatsApp ajunge la numărul tău de business.', icon: '01' },
      { title: '8 Module Analizează', desc: 'AI-ul nostru scanează pentru phishing, tactici de urgență, impersonare, link-uri suspecte — în sub 1 secundă.', icon: '02' },
      { title: 'Amenințare Blocată sau Livrat', desc: 'Mesajele periculoase sunt puse în carantină. Mesajele sigure ajung la tine instant.', icon: '03' }
    ],

    modulesTitle: '8 Module de Detecție',
    modulesSubtitle: 'Fiecare modul este specializat pe un tip diferit de amenințare',
    modules: [
      { icon: '🔗', title: 'Link-uri Phishing', desc: 'Detectează URL-uri false care imită bănci, PayPal, Google și alte servicii de încredere.', stats: '12,000+ domenii phishing blocate' },
      { icon: '💸', title: 'Fraude Financiare', desc: 'Blochează "transfer urgent", "oportunitate crypto", "investiție garantată" și alte scheme.', stats: '98.7% rată de detecție' },
      { icon: '🎭', title: 'Atacuri de Impersonare', desc: 'Identifică când cineva pretinde că e bancă, curier, agenție guvernamentală sau membri ai echipei.', stats: 'Protejează împotriva a 50+ tipuri' },
      { icon: '⏰', title: 'Urgență Falsă', desc: 'Detectează tactici de presiune artificială: "răspunde în 5 minute", "ultima șansă", "doar azi".', stats: '3,200+ tipare recunoscute' },
      { icon: '📱', title: 'Spam & Mesaje în Masă', desc: 'Blochează contacte care trimit mesaje identice repetat, forward în lanț și spam broadcast.', stats: 'Învață tiparele tale' },
      { icon: '🌍', title: 'Numere Suspecte', desc: 'Alertă pentru numere internaționale necunoscute cu comportament agresiv din primul mesaj.', stats: 'Bază de date în timp real' },
      { icon: '📎', title: 'Atașamente Malițioase', desc: 'Scanează PDF-uri, documente și fișiere pentru malware, ransomware și cod executabil ascuns.', stats: 'Zero malware livrat' },
      { icon: '🔐', title: 'Recoltare de Date', desc: 'Blochează încercări de extragere parole, CNP, carduri de credit prin inginerie socială.', stats: 'Protejează toate datele' }
    ],

    statsTitle: 'Statistici Protecție',
    stats: [
      { value: '8', label: 'Module Detecție' },
      { value: '<1s', label: 'Timp Analiză' },
      { value: '99.2%', label: 'Acuratețe' },
      { value: '0', label: 'False Pozitive/zi' }
    ],

    comparisonTitle: 'FraudAI vs. Fără Protecție',
    comparisonHeadWithout: 'Fără Protecție',
    comparisonHeadWith: 'Cu FraudAI',
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
      { icon: '🏥', title: 'Sănătate', desc: 'Datele pacienților sunt valoroase. FraudAI oprește atacuri de inginerie socială.' },
      { icon: '🏠', title: 'Imobiliare', desc: 'Tranzacțiile de valoare mare atrag escroci. FraudAI blochează tentative de fraudă.' },
      { icon: '💼', title: 'Consultanți', desc: 'Reputația ta contează. FraudAI previne impersonarea ta sau a clienților.' },
      { icon: '🛒', title: 'E-commerce', desc: 'Confirmări false de comandă, link-uri phishing — FraudAI le prinde pe toate.' },
      { icon: '⚖️', title: 'Legal & Financiar', desc: 'Comunicările sensibile cu clienții necesită protecție maximă.' }
    ],

    testimonialsTitle: 'Ce Spun Utilizatorii',
    testimonials: [
      { quote: 'FraudAI a blocat 23 de tentative de fraudă în prima lună. Nu aveam idee câte mesaje periculoase primeam.', author: 'Elena', role: 'Proprietar Cabinet Stomatologic' },
      { quote: 'Un mesaj fals de la "bancă" a fost blocat automat. Link-ul părea atât de real — FraudAI m-a salvat.', author: 'Mihai', role: 'Manager Restaurant' },
      { quote: 'Pierdeam 30 de minute zilnic pe spam. Acum văd doar mesaje reale de la clienți.', author: 'Ana', role: 'Designer Freelance' }
    ],

    faqTitle: 'Întrebări Despre FraudAI',
    faqs: [
      { q: 'FraudAI este chiar gratuit?', a: 'Da. FraudAI Shield este inclus gratuit în toate planurile CatyAI, inclusiv cel gratuit cu 500 conversații/lună.' },
      { q: 'Va bloca mesaje legitime?', a: 'Acuratețea de 99.2% înseamnă practic zero false pozitive. Dacă un mesaj este vreodată marcat, poți pune expeditorul pe whitelist instant.' },
      { q: 'Cât de rapidă este analiza?', a: 'Sub 1 secundă. Mesajele sunt analizate în timp real — nu vei observa nicio întârziere.' },
      { q: 'Funcționează pentru toate limbile?', a: 'Da. FraudAI detectează tipare de fraudă în română, engleză, spaniolă, portugheză, franceză, arabă și altele.' },
      { q: 'Pot vedea ce a fost blocat?', a: 'Da. Dashboard-ul tău arată un jurnal de carantină cu toate mesajele blocate și de ce au fost marcate.' },
      { q: 'Ce se întâmplă când apare un tip nou de fraudă?', a: 'FraudAI învață continuu. AI-ul nostru se actualizează zilnic cu noi tipare de amenințări.' }
    ],

    ctaTitle: 'Oprește Fraudele Azi',
    ctaSubtitle: 'FraudAI Shield este inclus gratuit în fiecare plan CatyAI.',
    ctaButton: 'Protejează-te Acum'
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
      { title: 'Mensaje Llega', desc: 'Un nuevo mensaje de WhatsApp llega a tu número de negocio.', icon: '01' },
      { title: '8 Módulos Analizan', desc: 'Nuestra IA escanea phishing, tácticas de urgencia, suplantación, links sospechosos — en menos de 1 segundo.', icon: '02' },
      { title: 'Amenaza Bloqueada o Entregada', desc: 'Mensajes peligrosos van a cuarentena. Mensajes seguros te llegan al instante.', icon: '03' }
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
      { icon: '🔐', title: 'Robo de Datos', desc: 'Bloquea intentos de extraer contraseñas, tarjetas y datos sensibles.', stats: 'Protege todos los datos' }
    ],

    statsTitle: 'Estadísticas de Protección',
    stats: [
      { value: '8', label: 'Módulos Detección' },
      { value: '<1s', label: 'Tiempo Análisis' },
      { value: '99.2%', label: 'Precisión' },
      { value: '0', label: 'Falsos Positivos/día' }
    ],

    comparisonTitle: 'FraudAI vs. Sin Protección',
    comparisonHeadWithout: 'Sin Protección',
    comparisonHeadWith: 'Con FraudAI',
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
      { icon: '⚖️', title: 'Legal & Finanzas', desc: 'Comunicaciones sensibles necesitan máxima protección.' }
    ],

    testimonialsTitle: 'Lo Que Dicen Los Usuarios',
    testimonials: [
      { quote: 'FraudAI bloqueó 23 intentos de estafa en mi primer mes. No tenía idea de cuántos mensajes peligrosos recibía.', author: 'Elena', role: 'Dueña Clínica Dental' },
      { quote: 'Un mensaje falso del "banco" fue bloqueado automáticamente. El link se veía tan real — FraudAI me salvó.', author: 'Miguel', role: 'Gerente Restaurante' },
      { quote: 'Perdía 30 minutos diarios en spam. Ahora solo veo mensajes reales de clientes.', author: 'Ana', role: 'Diseñadora Freelance' }
    ],

    faqTitle: 'Preguntas Sobre FraudAI',
    faqs: [
      { q: '¿FraudAI es realmente gratis?', a: 'Sí. FraudAI Shield está incluido gratis en todos los planes CatyAI.' },
      { q: '¿Bloqueará mensajes legítimos?', a: 'Nuestra precisión de 99.2% significa prácticamente cero falsos positivos.' },
      { q: '¿Qué tan rápido es el análisis?', a: 'Menos de 1 segundo. Los mensajes se analizan en tiempo real.' },
      { q: '¿Funciona para todos los idiomas?', a: 'Sí. FraudAI detecta patrones de estafa en español, inglés, rumano, portugués, francés, árabe y más.' },
      { q: '¿Puedo ver qué fue bloqueado?', a: 'Sí. Tu panel muestra un registro de cuarentena con todos los mensajes bloqueados.' },
      { q: '¿Qué pasa cuando aparece un nuevo tipo de estafa?', a: 'FraudAI aprende continuamente y se actualiza diariamente.' }
    ],

    ctaTitle: 'Detén Las Estafas Hoy',
    ctaSubtitle: 'FraudAI Shield está incluido gratis en cada plan CatyAI.',
    ctaButton: 'Protégete Ahora'
  }
}

translations.pt = translations.en
translations.fr = translations.en

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FraudAI Shield',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  description: '8 AI detection modules that block phishing, scams, impersonation and fraud on WhatsApp in real-time.'
}

export default function FraudAI() {
  const [lang, setLang] = useState('en')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && translations[saved]) setLang(saved)
  }, [])

  const t = translations[lang] || translations.en

  return (
    <>
      <SEO
        title="FraudAI Shield | CatyAI - AI Scam Protection for WhatsApp"
        description="Deploy FraudAI Shield. 8 AI modules analyze every WhatsApp message in real-time to block phishing, impersonation, and scams before you even see them."
        canonical="https://catyai.io/fraud-shield"
        jsonLd={jsonLd}
      />
      <style>{`
        .fra-page { background: #010A1F; min-height: 100vh; color: #f1f5f9; }
        .fra-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

        /* Hero */
        .fra-hero {
          padding: 8rem 1.5rem 5rem;
          background: linear-gradient(180deg, #030D26 0%, #010A1F 100%);
          position: relative;
          overflow: hidden;
        }
        .fra-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 55% at 30% 0%, rgba(200,161,101,0.10) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 40% at 80% 20%, rgba(239,68,68,0.06) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Two-column hero grid */
        .fra-hero-grid {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 920px) {
          .fra-hero-grid { grid-template-columns: 1fr; gap: 3rem; }
          .fra-shield-wrap { order: -1; }
        }

        /* Left column text */
        .fra-badge-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.28);
          color: #6ee7b7;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.75rem;
        }
        .fra-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px rgba(16,185,129,0.9);
          animation: fra-dot-blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes fra-dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .fra-hero-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8A165;
          margin: 0 0 0.75rem;
        }
        .fra-hero-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f1f5f9;
          margin: 0 0 1.5rem;
        }
        .fra-hero-para {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #94a3b8;
          margin: 0 0 2.25rem;
        }
        .fra-hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .fra-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #C8A165;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          padding: 0.95rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #C8A165;
        }
        .fra-cta-primary:hover { background: #d4b078; transform: translateY(-1px); }
        .fra-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: #C8A165;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.95rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          border: 1px solid rgba(200,161,101,0.4);
          transition: all 0.2s;
        }
        .fra-cta-secondary:hover { border-color: #C8A165; background: rgba(200,161,101,0.06); }

        /* Right column — shield visual */
        .fra-shield-wrap { display: flex; justify-content: center; align-items: center; }
        .fra-shield-container {
          position: relative;
          width: 100%;
          max-width: 460px;
          height: 340px;
          border-radius: 24px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(239,68,68,0.2);
          overflow: hidden;
          animation: fra-shield-border 4s ease-in-out infinite;
        }
        @keyframes fra-shield-border {
          0%, 100% { border-color: rgba(239,68,68,0.22); box-shadow: 0 0 28px rgba(239,68,68,0.07), inset 0 0 0 1px rgba(239,68,68,0.05); }
          50%       { border-color: rgba(200,161,101,0.3); box-shadow: 0 0 32px rgba(200,161,101,0.10), inset 0 0 0 1px rgba(200,161,101,0.06); }
        }

        /* Zone backgrounds */
        .fra-zone-threat {
          position: absolute;
          top: 0; left: 0;
          width: 48%; height: 100%;
          background: radial-gradient(ellipse 80% 60% at 20% 50%, rgba(239,68,68,0.09) 0%, transparent 70%);
        }
        .fra-zone-safe {
          position: absolute;
          top: 0; right: 0;
          width: 48%; height: 100%;
          background: radial-gradient(ellipse 80% 60% at 80% 50%, rgba(200,161,101,0.07) 0%, transparent 70%);
        }

        /* Central barrier */
        .fra-barrier {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fra-barrier-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.10), rgba(200,161,101,0.18), rgba(200,161,101,0.10), transparent);
          animation: fra-barrier-pulse 3s ease-in-out infinite;
        }
        @keyframes fra-barrier-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .fra-barrier-line {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 1.5px; height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(200,161,101,0.6) 20%, rgba(200,161,101,0.9) 50%, rgba(200,161,101,0.6) 80%, transparent 100%);
        }

        /* Hexagonal mesh SVG overlay */
        .fra-hex-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.07;
          pointer-events: none;
        }

        /* Zone labels */
        .fra-zone-tag {
          position: absolute;
          top: 14px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
        }
        .fra-zone-tag-threat {
          left: 16px;
          color: rgba(239,68,68,0.7);
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.18);
        }
        .fra-zone-tag-safe {
          right: 16px;
          color: rgba(200,161,101,0.8);
          background: rgba(200,161,101,0.07);
          border: 1px solid rgba(200,161,101,0.2);
        }

        /* Zone bottom labels */
        .fra-zone-label {
          position: absolute;
          bottom: 14px;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .fra-zone-label-threat { left: 50%; transform: translateX(-130%); color: rgba(239,68,68,0.4); }
        .fra-zone-label-safe { left: 50%; transform: translateX(30%); color: rgba(200,161,101,0.4); }

        /* Threat streaks — red lines shooting from left and dissolving at barrier */
        .fra-threat {
          position: absolute;
          height: 2px;
          left: 2%;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.85), rgba(239,68,68,0.4));
          animation: fra-threat-shoot var(--tdur, 2.2s) ease-in infinite var(--tdelay, 0s);
          opacity: 0;
        }
        @keyframes fra-threat-shoot {
          0%  { width: 0; opacity: 0; }
          15% { opacity: 0.9; }
          70% { width: 44%; opacity: 0.85; }
          82% { width: 46%; opacity: 0; }
          100%{ width: 0; opacity: 0; }
        }

        /* Spark particles at barrier on impact */
        .fra-spark {
          position: absolute;
          left: calc(50% - 14px);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(239,68,68,0.9);
          box-shadow: 0 0 6px rgba(239,68,68,0.8);
          animation: fra-spark-pop var(--sdur, 2.2s) ease-out infinite var(--sdelay, 0s);
          opacity: 0;
        }
        @keyframes fra-spark-pop {
          0%  { opacity: 0; transform: translate(0, 0) scale(1); }
          70% { opacity: 0; transform: translate(0, 0) scale(1); }
          74% { opacity: 1; transform: translate(var(--sx, 6px), var(--sy, -4px)) scale(1.2); }
          86% { opacity: 0.4; transform: translate(calc(var(--sx, 6px) * 1.8), calc(var(--sy, -4px) * 2)) scale(0.6); }
          100%{ opacity: 0; }
        }

        /* Flow particles — gold lines drifting calmly through to the right */
        .fra-flow {
          position: absolute;
          height: 1.5px;
          left: 51%;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(200,161,101,0.9), rgba(200,161,101,0.5), transparent);
          animation: fra-flow-right var(--fdur, 1.8s) linear infinite var(--fdelay, 0s);
          opacity: 0;
        }
        @keyframes fra-flow-right {
          0%  { width: 0; transform: translateX(0); opacity: 0; }
          10% { opacity: 0.85; }
          60% { width: 70px; opacity: 0.7; }
          100%{ width: 40px; transform: translateX(120px); opacity: 0; }
        }

        .fra-trust-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem 2rem;
          font-size: 0.85rem;
          color: #64748b;
        }
        .fra-trust-row span {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .fra-trust-row span::before {
          content: '✓';
          color: #C8A165;
          font-weight: 700;
        }

        /* Section */
        .fra-section { padding: 6rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.07); }
        .fra-section-head { text-align: center; max-width: 720px; margin: 0 auto 3.5rem; }
        .fra-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 1rem;
        }
        .fra-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #f1f5f9;
          margin: 0 0 1rem;
        }
        .fra-h2-accent { color: #C8A165; }
        .fra-section-sub {
          font-size: 1rem;
          line-height: 1.7;
          color: #94a3b8;
        }

        /* Problem stats */
        .fra-prob-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 880px;
          margin: 0 auto 3rem;
        }
        @media (max-width: 720px) { .fra-prob-grid { grid-template-columns: 1fr; } }
        .fra-prob-stat { text-align: center; }
        .fra-prob-value {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: #C8A165;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
        }
        .fra-prob-label { color: #94a3b8; font-size: 0.92rem; line-height: 1.5; }
        .fra-prob-solution {
          text-align: center;
          font-size: 1.15rem;
          color: #C8A165;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
        }

        /* Steps */
        .fra-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) { .fra-steps-grid { grid-template-columns: 1fr; } }
        .fra-step {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 2rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .fra-step:hover { border-color: rgba(200,161,101,0.25); transform: translateY(-2px); }
        .fra-step-num {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          color: #C8A165;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          display: inline-block;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(200,161,101,0.3);
        }
        .fra-step-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #f1f5f9;
          margin: 0 0 0.6rem;
        }
        .fra-step-desc { color: #94a3b8; font-size: 0.92rem; line-height: 1.6; margin: 0; }

        /* Modules */
        .fra-mod-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1000px) { .fra-mod-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .fra-mod-grid { grid-template-columns: 1fr; } }
        .fra-mod {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s, transform 0.2s;
        }
        .fra-mod:hover { border-color: rgba(200,161,101,0.3); transform: translateY(-2px); }
        .fra-mod-icon {
          font-size: 1.6rem;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.2);
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        .fra-mod-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #f1f5f9;
          margin: 0 0 0.5rem;
        }
        .fra-mod-desc {
          color: #94a3b8;
          font-size: 0.85rem;
          line-height: 1.55;
          margin: 0 0 1rem;
          flex: 1;
        }
        .fra-mod-stat {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #C8A165;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.2);
          padding: 0.35rem 0.7rem;
          border-radius: 100px;
          align-self: flex-start;
        }

        /* Stats bar */
        .fra-statsbar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 980px;
          margin: 0 auto;
        }
        @media (max-width: 720px) { .fra-statsbar { grid-template-columns: repeat(2, 1fr); } }
        .fra-statsbar-item { text-align: center; }
        .fra-statsbar-value {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 4vw, 2.75rem);
          color: #C8A165;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .fra-statsbar-label {
          font-size: 0.8rem;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        /* Comparison table */
        .fra-table-wrap {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          max-width: 880px;
          margin: 0 auto;
        }
        .fra-table { width: 100%; border-collapse: collapse; }
        .fra-table thead {
          background: rgba(255,255,255,0.04);
        }
        .fra-table th {
          padding: 1.1rem 1.25rem;
          text-align: left;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
        }
        .fra-table th.fra-th-with { color: #C8A165; }
        .fra-table td {
          padding: 1.1rem 1.25rem;
          font-size: 0.92rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: #cbd5e1;
        }
        .fra-table tbody tr:nth-child(even) { background: rgba(255,255,255,0.015); }
        .fra-table .fra-feat { font-weight: 600; color: #f1f5f9; }
        .fra-table .fra-without {
          color: #94a3b8;
        }
        .fra-table .fra-without::before {
          content: '✕  ';
          color: #ef4444;
          font-weight: 700;
        }
        .fra-table .fra-with {
          color: #C8A165;
          font-weight: 600;
        }
        .fra-table .fra-with::before {
          content: '✓  ';
          color: #6ee7b7;
          font-weight: 700;
        }

        /* Use cases */
        .fra-uc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) { .fra-uc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .fra-uc-grid { grid-template-columns: 1fr; } }
        .fra-uc {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
          transition: border-color 0.2s;
        }
        .fra-uc:hover { border-color: rgba(200,161,101,0.25); }
        .fra-uc-icon { font-size: 1.8rem; margin-bottom: 0.9rem; }
        .fra-uc-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #f1f5f9;
          margin: 0 0 0.5rem;
        }
        .fra-uc-desc { color: #94a3b8; font-size: 0.9rem; line-height: 1.6; margin: 0; }

        /* Testimonials */
        .fra-test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) { .fra-test-grid { grid-template-columns: 1fr; } }
        .fra-test {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
        }
        .fra-test-quote {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #cbd5e1;
          font-style: italic;
          margin: 0 0 1.5rem;
          flex: 1;
        }
        .fra-test-quote::before { content: '"'; color: #C8A165; font-size: 1.5rem; margin-right: 0.2rem; }
        .fra-test-author { display: flex; align-items: center; gap: 0.85rem; }
        .fra-test-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(200,161,101,0.12);
          border: 1px solid rgba(200,161,101,0.3);
          color: #C8A165;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.95rem;
        }
        .fra-test-name { color: #f1f5f9; font-weight: 600; font-size: 0.92rem; }
        .fra-test-role { color: #64748b; font-size: 0.8rem; margin-top: 0.1rem; }

        /* FAQ */
        .fra-faq-list { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.75rem; }
        .fra-faq-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .fra-faq-item.open { border-color: rgba(200,161,101,0.3); }
        .fra-faq-q {
          width: 100%;
          background: none;
          border: none;
          color: #f1f5f9;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          text-align: left;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .fra-faq-toggle {
          color: #C8A165;
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 1;
          transition: transform 0.2s;
        }
        .fra-faq-item.open .fra-faq-toggle { transform: rotate(45deg); }
        .fra-faq-a {
          padding: 0 1.5rem 1.25rem;
          color: #94a3b8;
          font-size: 0.92rem;
          line-height: 1.7;
          margin: 0;
        }

        /* Final CTA */
        .fra-final {
          padding: 6rem 1.5rem;
          text-align: center;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,161,101,0.07) 0%, transparent 70%);
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .fra-final-h {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          color: #f1f5f9;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
        }
        .fra-final-sub {
          color: #94a3b8;
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 2.25rem;
        }
      `}</style>

      <div className="fra-page">
        <GlobalHeader />

        {/* Hero */}
        <section className="fra-hero">
          <div className="fra-hero-grid">
            {/* Left: text */}
            <div>
              <div className="fra-badge-status">
                <div className="fra-badge-dot" />
                {t.badge}
              </div>
              <p className="fra-hero-label">FraudAI Shield.</p>
              <h1 className="fra-hero-h1">{t.heroTitle2}</h1>
              <p className="fra-hero-para">{t.heroSubtitle}</p>
              <div className="fra-hero-btns">
                <a href="https://app.catyai.io/register" className="fra-cta-primary">{t.heroCta} →</a>
                <a href="#how" className="fra-cta-secondary">{t.heroCtaSecondary}</a>
              </div>
            </div>

            {/* Right: animated energy barrier visual */}
            <div className="fra-shield-wrap">
              <div className="fra-shield-container">
                {/* Zone backgrounds */}
                <div className="fra-zone-threat" />
                <div className="fra-zone-safe" />

                {/* Central barrier */}
                <div className="fra-barrier">
                  <div className="fra-barrier-glow" />
                  <div className="fra-barrier-line" />
                </div>

                {/* Hexagonal mesh overlay */}
                <svg className="fra-hex-overlay" viewBox="0 0 460 340" fill="none" aria-hidden="true">
                  {[0,1,2,3,4,5,6,7,8].map(col =>
                    [0,1,2,3,4,5].map(row => {
                      const x = col * 46 + (row % 2 === 0 ? 0 : 23)
                      const y = row * 42
                      const r = 22
                      const pts = Array.from({length:6}, (_,i) => {
                        const a = Math.PI/180*(60*i-30)
                        return `${x+r*Math.cos(a)},${y+r*Math.sin(a)}`
                      }).join(' ')
                      return <polygon key={`${col}-${row}`} points={pts} stroke="rgba(200,161,101,1)" strokeWidth="0.8" fill="none"/>
                    })
                  )}
                </svg>

                {/* Zone tags */}
                <div className="fra-zone-tag fra-zone-tag-threat">Threats</div>
                <div className="fra-zone-tag fra-zone-tag-safe">Protected</div>

                {/* Threat streaks — 6 red lines at different vertical positions */}
                {[
                  { top: '18%', tdur: '2.1s', tdelay: '0s' },
                  { top: '34%', tdur: '2.6s', tdelay: '0.4s' },
                  { top: '50%', tdur: '1.9s', tdelay: '0.9s' },
                  { top: '63%', tdur: '2.4s', tdelay: '0.2s' },
                  { top: '76%', tdur: '2.2s', tdelay: '1.1s' },
                  { top: '88%', tdur: '1.8s', tdelay: '0.6s' },
                ].map((s, i) => (
                  <div key={i} className="fra-threat" style={{ top: s.top, '--tdur': s.tdur, '--tdelay': s.tdelay }} />
                ))}

                {/* Spark particles at barrier — timed to coincide with streak impact */}
                {[
                  { top: '18%', sdur: '2.1s', sdelay: '0s',   sx: '5px',  sy: '-6px' },
                  { top: '34%', sdur: '2.6s', sdelay: '0.4s', sx: '-4px', sy: '-5px' },
                  { top: '50%', sdur: '1.9s', sdelay: '0.9s', sx: '7px',  sy: '4px'  },
                  { top: '63%', sdur: '2.4s', sdelay: '0.2s', sx: '-6px', sy: '6px'  },
                  { top: '76%', sdur: '2.2s', sdelay: '1.1s', sx: '4px',  sy: '-7px' },
                  { top: '88%', sdur: '1.8s', sdelay: '0.6s', sx: '-5px', sy: '5px'  },
                ].map((s, i) => (
                  <div key={i} className="fra-spark" style={{ top: s.top, '--sdur': s.sdur, '--sdelay': s.sdelay, '--sx': s.sx, '--sy': s.sy }} />
                ))}

                {/* Flow particles — 4 gold streams on the safe side */}
                {[
                  { top: '28%', fdur: '1.7s', fdelay: '0s'   },
                  { top: '46%', fdur: '2.1s', fdelay: '0.5s' },
                  { top: '62%', fdur: '1.6s', fdelay: '1.0s' },
                  { top: '80%', fdur: '2.3s', fdelay: '0.3s' },
                ].map((f, i) => (
                  <div key={i} className="fra-flow" style={{ top: f.top, '--fdur': f.fdur, '--fdelay': f.fdelay }} />
                ))}

                {/* Bottom zone labels */}
                <div className="fra-zone-label fra-zone-label-threat">THREAT ZONE</div>
                <div className="fra-zone-label fra-zone-label-safe">PROTECTED</div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">The Threat</div>
              <h2 className="fra-h2">{t.problemTitle} <span className="fra-h2-accent">{t.problemHighlight}</span></h2>
            </div>
            <div className="fra-prob-grid">
              {t.problemStats.map((s, i) => (
                <div key={i} className="fra-prob-stat">
                  <div className="fra-prob-value">{s.value}</div>
                  <div className="fra-prob-label">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="fra-prob-solution">{t.problemSolution}</p>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">Process</div>
              <h2 className="fra-h2">{t.howTitle}</h2>
              <p className="fra-section-sub">{t.howSubtitle}</p>
            </div>
            <div className="fra-steps-grid">
              {t.howSteps.map((step, i) => (
                <div key={i} className="fra-step">
                  <div className="fra-step-num">{step.icon}</div>
                  <h3 className="fra-step-title">{step.title}</h3>
                  <p className="fra-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">Detection Stack</div>
              <h2 className="fra-h2">{t.modulesTitle}</h2>
              <p className="fra-section-sub">{t.modulesSubtitle}</p>
            </div>
            <div className="fra-mod-grid">
              {t.modules.map((m, i) => (
                <div key={i} className="fra-mod">
                  <div className="fra-mod-icon">{m.icon}</div>
                  <h3 className="fra-mod-title">{m.title}</h3>
                  <p className="fra-mod-desc">{m.desc}</p>
                  <span className="fra-mod-stat">{m.stats}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">Performance</div>
              <h2 className="fra-h2">{t.statsTitle}</h2>
            </div>
            <div className="fra-statsbar">
              {t.stats.map((s, i) => (
                <div key={i} className="fra-statsbar-item">
                  <div className="fra-statsbar-value">{s.value}</div>
                  <div className="fra-statsbar-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">Comparison</div>
              <h2 className="fra-h2">{t.comparisonTitle}</h2>
            </div>
            <div className="fra-table-wrap">
              <table className="fra-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>{t.comparisonHeadWithout}</th>
                    <th className="fra-th-with">{t.comparisonHeadWith}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonItems.map((item, i) => (
                    <tr key={i}>
                      <td className="fra-feat">{item.feature}</td>
                      <td className="fra-without">{item.without}</td>
                      <td className="fra-with">{item.with}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">Use Cases</div>
              <h2 className="fra-h2">{t.useCasesTitle}</h2>
            </div>
            <div className="fra-uc-grid">
              {t.useCases.map((uc, i) => (
                <div key={i} className="fra-uc">
                  <div className="fra-uc-icon">{uc.icon}</div>
                  <h3 className="fra-uc-title">{uc.title}</h3>
                  <p className="fra-uc-desc">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">Testimonials</div>
              <h2 className="fra-h2">{t.testimonialsTitle}</h2>
            </div>
            <div className="fra-test-grid">
              {t.testimonials.map((tt, i) => (
                <div key={i} className="fra-test">
                  <p className="fra-test-quote">{tt.quote}</p>
                  <div className="fra-test-author">
                    <div className="fra-test-avatar">{tt.author[0]}</div>
                    <div>
                      <div className="fra-test-name">{tt.author}</div>
                      <div className="fra-test-role">{tt.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="fra-section">
          <div className="fra-container">
            <div className="fra-section-head">
              <div className="fra-eyebrow">FAQ</div>
              <h2 className="fra-h2">{t.faqTitle}</h2>
            </div>
            <div className="fra-faq-list">
              {t.faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className={`fra-faq-item ${isOpen ? 'open' : ''}`}>
                    <button className="fra-faq-q" onClick={() => setOpenFaq(isOpen ? null : i)}>
                      <span>{faq.q}</span>
                      <span className="fra-faq-toggle">+</span>
                    </button>
                    {isOpen && <p className="fra-faq-a">{faq.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="fra-final">
          <h2 className="fra-final-h">{t.ctaTitle}</h2>
          <p className="fra-final-sub">{t.ctaSubtitle}</p>
          <a href="https://app.catyai.io/register" className="fra-cta-primary">{t.ctaButton} →</a>
        </section>

        <FooterV9 />
      </div>
    </>
  )
}
