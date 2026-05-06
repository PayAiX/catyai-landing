import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import SEO from '../components/SEO'

const T = {
  en: {
    badge: 'GDPR-Compliant AI Infrastructure',
    heroTitle: 'Healthcare. Absolute Precision.',
    heroSub: 'Neural infrastructure built for zero-hallucination medical environments',
    heroBody: 'Deploy GDPR-compliant AI that automates patient scheduling with complete data isolation. Built for clinics, hospitals, and healthcare networks that cannot afford errors — in data, in answers, or in trust.',
    heroCta: 'Deploy for Your Clinic',
    heroCtaAlt: 'See Compliance Docs',
    metrics: ['GDPR Art. 9', 'Zero-Hallucination SLA', 'Ed25519 Signed', 'ISO 27001'],
    featuresTitle: 'Built for Medical Grade',
    featuresSubtitle: 'Every module designed with patient safety as the first constraint',
    features: [
      {
        n: '01', icon: '📅', title: 'Patient Scheduling AI', tag: 'Scheduling Layer',
        tagline: 'Zero missed appointments.',
        body: 'AI schedules, reschedules, and sends reminders across all patient touchpoints. Handles multi-language queries without ever exposing protected health information — appointments managed with precision, identity kept private.',
        pill: 'Multi-language · PHI-safe · Calendar Sync',
      },
      {
        n: '02', icon: '🔒', title: 'GDPR Data Vault', tag: 'Compliance Layer',
        tagline: 'Data isolation at the architecture level.',
        body: 'Patient data is isolated per clinic and encrypted at rest with AES-256. Information never crosses clinic boundaries. Full GDPR Article 9 compliance for special category health data — built into the infrastructure, not bolted on.',
        pill: 'AES-256 · Art.9 GDPR · Data Residency',
      },
      {
        n: '03', icon: '🧠', title: 'Zero-Hallucination SLA', tag: 'Accuracy Layer',
        tagline: 'Medical facts only. Never invented.',
        body: 'Every AI response is grounded exclusively in your clinic\'s verified knowledge base. No generative improvisation. No fabricated answers. Contractual accuracy SLA ensures the AI only states what it knows — and stays silent when it doesn\'t.',
        pill: 'KB-grounded · SLA 99.9% · Fact-checked',
      },
      {
        n: '04', icon: '📋', title: 'Audit Trail Engine', tag: 'Traceability Layer',
        tagline: 'Full accountability, always.',
        body: 'Every AI interaction is logged with timestamp, user, session ID, and cryptographic input/output hash. Immutable audit logs are available for regulatory inspection at any time — compliant with HIPAA, GDPR, and national health authority requirements.',
        pill: 'Immutable Logs · HIPAA-ready · Hash-signed',
      },
      {
        n: '05', icon: '🏥', title: 'Multi-Clinic Management', tag: 'Operations Layer',
        tagline: 'One platform. Many locations.',
        body: 'Manage multiple clinic locations from a single dashboard. Each location maintains fully isolated data, a custom knowledge base, and separate SLA contracts. Scale across a healthcare network without ever mixing patient records.',
        pill: 'Multi-tenant · Isolated KBs · Custom SLAs',
      },
      {
        n: '06', icon: '🌐', title: 'AI Crawler Visibility', tag: 'Discovery Layer',
        tagline: 'Get found by AI-first patients.',
        body: 'GEO Gateway integration ensures your clinic surfaces correctly in ChatGPT and Gemini answers. Zero misinformation risk — structured, signed data feeds AI models accurate hours, services, and contact information.',
        pill: 'GEO Gateway · llms.txt · AI Citation',
      },
    ],
    complianceTitle: 'Compliance Architecture',
    complianceItems: [
      { icon: '🇪🇺', label: 'GDPR Art. 9', sub: 'Special category health data' },
      { icon: '🏛️', label: 'HIPAA-ready', sub: 'US health data standards' },
      { icon: '🔐', label: 'ISO 27001', sub: 'Information security management' },
      { icon: '✅', label: 'SOC 2 Type II', sub: 'Security & availability controls' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Does CatyAI store patient data on its servers?',
        a: 'No. Patient data is processed and stored exclusively within your clinic\'s isolated data vault. CatyAI infrastructure enforces strict data residency — patient records never leave your designated environment. CatyAI\'s servers do not retain, copy, or process identifiable health information.',
      },
      {
        q: 'How does CatyAI ensure GDPR Article 9 compliance for health data?',
        a: 'Health data qualifies as special category data under GDPR Article 9. CatyAI implements architecture-level isolation: AES-256 encryption at rest, TLS 1.3 in transit, per-clinic data vaults, and data processing agreements compliant with GDPR Chapter IV. We offer EU-based data residency and DPA documentation on request.',
      },
      {
        q: 'What is the hallucination risk with medical information?',
        a: 'The hallucination risk is contractually zero for verified knowledge base content. CatyAI\'s Zero-Hallucination SLA constrains the AI to your clinic\'s own approved knowledge base. The model cannot generate medical advice, invented treatment protocols, or speculative health information. Responses outside the knowledge base are explicitly refused — never fabricated.',
      },
      {
        q: 'Can CatyAI integrate with our existing EHR or clinic management system?',
        a: 'Yes. CatyAI provides webhook and REST API integration points for calendar systems, EHR platforms (including HL7 FHIR-compatible systems), and clinic management software. Integration is read-only from CatyAI\'s side for scheduling queries — no write access to your EHR is required unless specifically configured.',
      },
      {
        q: 'How is pricing structured for healthcare clinics?',
        a: 'Healthcare plans are priced per clinic location, with volume discounts for networks of three or more locations. Each plan includes the GDPR Data Vault, Zero-Hallucination SLA, and Audit Trail Engine. Multi-clinic management and custom SLA agreements are available from the Growth plan. Contact us for enterprise network pricing.',
      },
    ],
    finalCta: 'Deploy Medical-Grade AI Today',
    finalBody: 'Get your clinic running on GDPR-compliant neural infrastructure with a Zero-Hallucination SLA — schedule a compliance call to see a live deployment.',
    finalBtn: 'Book a Compliance Call',
    docsBtn: 'Read Security Docs',
  },
  ro: {
    badge: 'Infrastructură AI Conformă GDPR',
    heroTitle: 'Sănătate. Precizie Absolută.',
    heroSub: 'Infrastructură neurală construită pentru medii medicale fără halucinații',
    heroBody: 'Implementați AI conform GDPR care automatizează programările pacienților cu izolare completă a datelor. Construit pentru clinici, spitale și rețele medicale care nu își permit erori — în date, în răspunsuri sau în încredere.',
    heroCta: 'Implementați pentru Clinica Dvs.',
    heroCtaAlt: 'Vezi Documentația de Conformitate',
    metrics: ['GDPR Art. 9', 'SLA Zero-Halucinare', 'Semnat Ed25519', 'ISO 27001'],
    featuresTitle: 'Construit pentru Grad Medical',
    featuresSubtitle: 'Fiecare modul proiectat cu siguranța pacientului ca primă constrângere',
    features: [
      {
        n: '01', icon: '📅', title: 'AI pentru Programări Pacienți', tag: 'Strat Programare',
        tagline: 'Zero programări ratate.',
        body: 'AI programează, reprogramează și trimite remindere pe toate punctele de contact cu pacienții. Gestionează interogări multilingve fără a expune informații protejate despre sănătate — programările sunt gestionate cu precizie, identitatea rămâne privată.',
        pill: 'Multi-limbă · Sigur PHI · Sincronizare Calendar',
      },
      {
        n: '02', icon: '🔒', title: 'Seif de Date GDPR', tag: 'Strat Conformitate',
        tagline: 'Izolarea datelor la nivel de arhitectură.',
        body: 'Datele pacienților sunt izolate per clinică și criptate în repaus cu AES-256. Informațiile nu traversează niciodată granițele clinicii. Conformitate completă GDPR Articolul 9 pentru date speciale de sănătate — integrat în infrastructură, nu adăugat ulterior.',
        pill: 'AES-256 · Art.9 GDPR · Rezidență Date',
      },
      {
        n: '03', icon: '🧠', title: 'SLA Zero-Halucinare', tag: 'Strat Acuratețe',
        tagline: 'Doar fapte medicale. Niciodată inventate.',
        body: 'Fiecare răspuns AI este bazat exclusiv pe baza de cunoștințe verificată a clinicii dvs. Fără improvizație generativă. Fără răspunsuri fabricate. SLA-ul contractual de acuratețe asigură că AI spune doar ce știe — și tace când nu știe.',
        pill: 'Bazat pe KB · SLA 99.9% · Verificat Factual',
      },
      {
        n: '04', icon: '📋', title: 'Motor de Audit Trail', tag: 'Strat Trasabilitate',
        tagline: 'Responsabilitate completă, întotdeauna.',
        body: 'Fiecare interacțiune AI este înregistrată cu marcaj temporal, utilizator, ID sesiune și hash criptografic intrare/ieșire. Jurnalele de audit imuabile sunt disponibile pentru inspecție regulatorie oricând — conforme cu HIPAA, GDPR și cerințele autorităților naționale de sănătate.',
        pill: 'Jurnale Imuabile · Pregătit HIPAA · Semnat Hash',
      },
      {
        n: '05', icon: '🏥', title: 'Management Multi-Clinică', tag: 'Strat Operațional',
        tagline: 'O platformă. Mai multe locații.',
        body: 'Gestionați mai multe locații de clinici dintr-un singur tablou de bord. Fiecare locație menține date complet izolate, o bază de cunoștințe personalizată și contracte SLA separate. Scalați în toată rețeaua de sănătate fără a amesteca niciodată înregistrările pacienților.',
        pill: 'Multi-chiriaș · KB-uri Izolate · SLA-uri Personalizate',
      },
      {
        n: '06', icon: '🌐', title: 'Vizibilitate Crawlere AI', tag: 'Strat Descoperire',
        tagline: 'Fiți găsiți de pacienții AI-first.',
        body: 'Integrarea GEO Gateway asigură că clinica dvs. apare corect în răspunsurile ChatGPT și Gemini. Zero risc de dezinformare — datele structurate și semnate alimentează modelele AI cu ore, servicii și informații de contact precise.',
        pill: 'GEO Gateway · llms.txt · Citare AI',
      },
    ],
    complianceTitle: 'Arhitectura de Conformitate',
    complianceItems: [
      { icon: '🇪🇺', label: 'GDPR Art. 9', sub: 'Date speciale de sănătate' },
      { icon: '🏛️', label: 'Pregătit HIPAA', sub: 'Standarde SUA pentru date medicale' },
      { icon: '🔐', label: 'ISO 27001', sub: 'Managementul securității informației' },
      { icon: '✅', label: 'SOC 2 Tip II', sub: 'Controale de securitate și disponibilitate' },
    ],
    faqTitle: 'Întrebări Frecvente',
    faqs: [
      {
        q: 'Stochează CatyAI datele pacienților pe serverele sale?',
        a: 'Nu. Datele pacienților sunt procesate și stocate exclusiv în seiful de date izolat al clinicii dvs. Infrastructura CatyAI aplică rezidență strictă a datelor — înregistrările pacienților nu părăsesc niciodată mediul dvs. desemnat. Serverele CatyAI nu rețin, copiază sau procesează informații identificabile de sănătate.',
      },
      {
        q: 'Cum asigură CatyAI conformitatea cu GDPR Articolul 9 pentru datele de sănătate?',
        a: 'Datele de sănătate se califică drept date din categorii speciale conform GDPR Articolul 9. CatyAI implementează izolare la nivel de arhitectură: criptare AES-256 în repaus, TLS 1.3 în tranzit, seifuri de date per clinică și acorduri de procesare a datelor conforme cu Capitolul IV GDPR. Oferim rezidență date în UE și documentație DPA la cerere.',
      },
      {
        q: 'Care este riscul de halucinare cu informații medicale?',
        a: 'Riscul de halucinare este contractual zero pentru conținutul bazei de cunoștințe verificate. SLA-ul Zero-Halucinare al CatyAI constrânge AI-ul la propria bază de cunoștințe aprobată a clinicii. Modelul nu poate genera sfaturi medicale, protocoale de tratament inventate sau informații speculative de sănătate. Răspunsurile în afara bazei de cunoștințe sunt explicit refuzate — niciodată fabricate.',
      },
      {
        q: 'Poate CatyAI să se integreze cu sistemul EHR sau de management al clinicii existent?',
        a: 'Da. CatyAI oferă puncte de integrare webhook și REST API pentru sisteme de calendar, platforme EHR (inclusiv sisteme compatibile HL7 FHIR) și software de management al clinicii. Integrarea este doar în citire din partea CatyAI pentru interogări de programare — nu este necesar acces de scriere în EHR-ul dvs. dacă nu este configurat specific.',
      },
      {
        q: 'Cum este structurat prețul pentru clinicile medicale?',
        a: 'Planurile medicale sunt prețuite per locație de clinică, cu reduceri de volum pentru rețele de trei sau mai multe locații. Fiecare plan include Seiful de Date GDPR, SLA Zero-Halucinare și Motorul de Audit Trail. Managementul multi-clinică și acordurile SLA personalizate sunt disponibile din planul Growth. Contactați-ne pentru prețuri de rețea enterprise.',
      },
    ],
    finalCta: 'Implementați AI Medical-Grade Astăzi',
    finalBody: 'Puneți clinica pe infrastructură neurală conformă GDPR cu un SLA Zero-Halucinare — programați un apel de conformitate pentru a vedea o implementare live.',
    finalBtn: 'Rezervați un Apel de Conformitate',
    docsBtn: 'Citiți Documentația de Securitate',
  },
  fr: {
    badge: 'Infrastructure IA Conforme RGPD',
    heroTitle: 'Santé. Précision Absolue.',
    heroSub: 'Infrastructure neurale conçue pour les environnements médicaux sans hallucination',
    heroBody: "Déployez une IA conforme au RGPD qui automatise la prise de rendez-vous des patients avec une isolation complète des données. Conçue pour les cliniques, hôpitaux et réseaux de santé qui ne peuvent se permettre aucune erreur — dans les données, les réponses ou la confiance.",
    heroCta: 'Déployer pour votre Clinique',
    heroCtaAlt: 'Voir la Documentation Conformité',
    metrics: ['RGPD Art. 9', 'SLA Zéro-Hallucination', 'Signé Ed25519', 'ISO 27001'],
    featuresTitle: 'Conçu pour le Grade Médical',
    featuresSubtitle: 'Chaque module pensé avec la sécurité des patients comme première contrainte',
    features: [
      {
        n: '01', icon: '📅', title: 'IA de Planification des Patients', tag: 'Couche Planification',
        tagline: 'Zéro rendez-vous manqué.',
        body: "L'IA planifie, replanifie et envoie des rappels sur tous les points de contact patients. Gère les demandes multilingues sans jamais exposer les informations de santé protégées — rendez-vous gérés avec précision, identité préservée.",
        pill: 'Multi-langue · PHI-sécurisé · Sync Calendrier',
      },
      {
        n: '02', icon: '🔒', title: 'Coffre de Données RGPD', tag: 'Couche Conformité',
        tagline: "Isolation des données au niveau architectural.",
        body: "Les données patients sont isolées par clinique et chiffrées au repos avec AES-256. Les informations ne franchissent jamais les frontières des cliniques. Conformité totale RGPD Article 9 pour les données de santé à caractère particulier — intégrée dans l'infrastructure, non ajoutée après coup.",
        pill: 'AES-256 · Art.9 RGPD · Résidence des Données',
      },
      {
        n: '03', icon: '🧠', title: 'SLA Zéro-Hallucination', tag: 'Couche Précision',
        tagline: "Faits médicaux uniquement. Jamais inventés.",
        body: "Chaque réponse IA est ancrée exclusivement dans la base de connaissances vérifiée de votre clinique. Aucune improvisation générative. Aucune réponse fabriquée. Le SLA d'exactitude contractuel garantit que l'IA ne dit que ce qu'elle sait — et se tait dans le cas contraire.",
        pill: 'Ancré KB · SLA 99.9% · Vérifié Factuel',
      },
      {
        n: '04', icon: '📋', title: "Moteur de Piste d'Audit", tag: 'Couche Traçabilité',
        tagline: "Responsabilité totale, en permanence.",
        body: "Chaque interaction IA est journalisée avec horodatage, utilisateur, ID de session et hash cryptographique des entrées/sorties. Les journaux d'audit immuables sont disponibles pour inspection réglementaire à tout moment — conformes HIPAA, RGPD et aux exigences des autorités sanitaires nationales.",
        pill: 'Journaux Immuables · Prêt HIPAA · Signé Hash',
      },
      {
        n: '05', icon: '🏥', title: 'Gestion Multi-Cliniques', tag: 'Couche Opérations',
        tagline: 'Une plateforme. Plusieurs sites.',
        body: "Gérez plusieurs sites de cliniques depuis un tableau de bord unique. Chaque site maintient des données totalement isolées, une base de connaissances personnalisée et des contrats SLA séparés. Déployez sur tout un réseau de santé sans jamais mélanger les dossiers patients.",
        pill: 'Multi-tenant · KB Isolées · SLA Personnalisés',
      },
      {
        n: '06', icon: '🌐', title: 'Visibilité IA Crawlers', tag: 'Couche Découverte',
        tagline: "Soyez trouvé par les patients IA-first.",
        body: "L'intégration GEO Gateway garantit que votre clinique apparaît correctement dans les réponses ChatGPT et Gemini. Risque de désinformation nul — des données structurées et signées alimentent les modèles IA avec des horaires, services et coordonnées précis.",
        pill: 'GEO Gateway · llms.txt · Citation IA',
      },
    ],
    complianceTitle: "Architecture de Conformité",
    complianceItems: [
      { icon: '🇪🇺', label: 'RGPD Art. 9', sub: 'Données de santé à caractère particulier' },
      { icon: '🏛️', label: 'Prêt HIPAA', sub: 'Normes américaines de santé' },
      { icon: '🔐', label: 'ISO 27001', sub: 'Gestion de la sécurité de l\'information' },
      { icon: '✅', label: 'SOC 2 Type II', sub: 'Contrôles de sécurité et disponibilité' },
    ],
    faqTitle: 'Questions Fréquentes',
    faqs: [
      {
        q: 'CatyAI stocke-t-il les données des patients sur ses serveurs ?',
        a: "Non. Les données patients sont traitées et stockées exclusivement dans le coffre de données isolé de votre clinique. L'infrastructure CatyAI applique une résidence stricte des données — les dossiers patients ne quittent jamais votre environnement désigné. Les serveurs CatyAI ne conservent, copient ni traitent aucune information de santé identifiable.",
      },
      {
        q: "Comment CatyAI assure-t-il la conformité au RGPD Article 9 pour les données de santé ?",
        a: "Les données de santé constituent des données à caractère particulier au titre du RGPD Article 9. CatyAI implémente une isolation au niveau architectural : chiffrement AES-256 au repos, TLS 1.3 en transit, coffres de données par clinique et accords de traitement conformes au Chapitre IV du RGPD. Nous proposons la résidence des données dans l'UE et la documentation DPA sur demande.",
      },
      {
        q: "Quel est le risque d'hallucination avec les informations médicales ?",
        a: "Le risque d'hallucination est contractuellement nul pour le contenu de la base de connaissances vérifiée. Le SLA Zéro-Hallucination de CatyAI contraint l'IA à la base de connaissances approuvée de votre clinique. Le modèle ne peut générer de conseils médicaux, de protocoles de traitement inventés ou d'informations de santé spéculatives. Les réponses hors base de connaissances sont explicitement refusées — jamais fabriquées.",
      },
      {
        q: "CatyAI peut-il s'intégrer à notre DPI ou logiciel de gestion de clinique existant ?",
        a: "Oui. CatyAI fournit des points d'intégration webhook et API REST pour les systèmes de calendrier, les plateformes DPI (y compris les systèmes compatibles HL7 FHIR) et les logiciels de gestion de clinique. L'intégration est en lecture seule côté CatyAI pour les requêtes de planification — aucun accès en écriture à votre DPI n'est requis sauf configuration spécifique.",
      },
      {
        q: "Comment la tarification est-elle structurée pour les cliniques médicales ?",
        a: "Les plans santé sont tarifés par site de clinique, avec des remises de volume pour les réseaux de trois sites ou plus. Chaque plan inclut le Coffre de Données RGPD, le SLA Zéro-Hallucination et le Moteur de Piste d'Audit. La gestion multi-cliniques et les accords SLA personnalisés sont disponibles à partir du plan Growth. Contactez-nous pour la tarification réseau enterprise.",
      },
    ],
    finalCta: "Déployez une IA Grade Médical Aujourd'hui",
    finalBody: "Faites passer votre clinique sur une infrastructure neurale conforme RGPD avec un SLA Zéro-Hallucination — planifiez un appel conformité pour voir un déploiement en direct.",
    finalBtn: 'Réserver un Appel Conformité',
    docsBtn: 'Lire la Documentation Sécurité',
  },
  de: {
    badge: 'DSGVO-konforme KI-Infrastruktur',
    heroTitle: 'Gesundheitswesen. Absolute Präzision.',
    heroSub: 'Neurale Infrastruktur für halluzinationsfreie medizinische Umgebungen',
    heroBody: 'Implementieren Sie DSGVO-konforme KI, die Patientenplanung mit vollständiger Datenisolation automatisiert. Entwickelt für Kliniken, Krankenhäuser und Gesundheitsnetzwerke, die keine Fehler tolerieren können — in Daten, Antworten oder Vertrauen.',
    heroCta: 'Für Ihre Klinik deployen',
    heroCtaAlt: 'Compliance-Docs ansehen',
    metrics: ['DSGVO Art. 9', 'Zero-Halluzination SLA', 'Ed25519-signiert', 'ISO 27001'],
    featuresTitle: 'Für medizinischen Einsatz gebaut',
    featuresSubtitle: 'Jedes Modul mit Patientensicherheit als oberster Bedingung entwickelt',
    features: [
      {
        n: '01', icon: '📅', title: 'Patienten-Terminplanung KI', tag: 'Planungs-Schicht',
        tagline: 'Null verpasste Termine.',
        body: 'KI plant, plant um und sendet Erinnerungen an allen Patientenkontaktpunkten. Verarbeitet mehrsprachige Anfragen, ohne geschützte Gesundheitsinformationen preiszugeben — Termine präzise verwaltet, Identität geschützt.',
        pill: 'Mehrsprachig · PHI-sicher · Kalender-Sync',
      },
      {
        n: '02', icon: '🔒', title: 'DSGVO-Datentresor', tag: 'Compliance-Schicht',
        tagline: 'Datenisolation auf Architekturebene.',
        body: 'Patientendaten sind pro Klinik isoliert und im Ruhezustand mit AES-256 verschlüsselt. Informationen überschreiten nie Klinikgrenzen. Vollständige DSGVO-Artikel-9-Konformität für besondere Gesundheitsdatenkategorien — in die Infrastruktur eingebaut, nicht nachträglich hinzugefügt.',
        pill: 'AES-256 · Art.9 DSGVO · Datenresidenz',
      },
      {
        n: '03', icon: '🧠', title: 'Zero-Halluzination SLA', tag: 'Genauigkeits-Schicht',
        tagline: 'Nur medizinische Fakten. Niemals erfunden.',
        body: 'Jede KI-Antwort basiert ausschließlich auf der verifizierten Wissensbasis Ihrer Klinik. Keine generative Improvisation. Keine fabrizierten Antworten. Der vertragliche Genauigkeits-SLA stellt sicher, dass die KI nur das sagt, was sie weiß — und schweigt, wenn sie es nicht tut.',
        pill: 'KB-verankert · SLA 99.9% · Faktengeprüft',
      },
      {
        n: '04', icon: '📋', title: 'Audit-Trail-Engine', tag: 'Rückverfolgbarkeits-Schicht',
        tagline: 'Vollständige Rechenschaftspflicht, immer.',
        body: 'Jede KI-Interaktion wird mit Zeitstempel, Benutzer, Sitzungs-ID und kryptografischem Ein-/Ausgabe-Hash protokolliert. Unveränderliche Audit-Logs stehen jederzeit für regulatorische Prüfungen zur Verfügung — HIPAA-, DSGVO- und nationale Gesundheitsbehörden-konform.',
        pill: 'Unveränderliche Logs · HIPAA-bereit · Hash-signiert',
      },
      {
        n: '05', icon: '🏥', title: 'Multi-Klinik-Management', tag: 'Betriebs-Schicht',
        tagline: 'Eine Plattform. Viele Standorte.',
        body: 'Verwalten Sie mehrere Klinikstandorte über ein einziges Dashboard. Jeder Standort behält vollständig isolierte Daten, eine eigene Wissensbasis und separate SLA-Verträge. Skalieren Sie über ein Gesundheitsnetzwerk, ohne Patientenakten zu vermischen.',
        pill: 'Multi-Tenant · Isolierte KBs · Individuelle SLAs',
      },
      {
        n: '06', icon: '🌐', title: 'KI-Crawler-Sichtbarkeit', tag: 'Entdeckungs-Schicht',
        tagline: 'Von KI-affinen Patienten gefunden werden.',
        body: 'Die GEO-Gateway-Integration stellt sicher, dass Ihre Klinik in ChatGPT- und Gemini-Antworten korrekt erscheint. Null Desinformationsrisiko — strukturierte, signierte Daten versorgen KI-Modelle mit genauen Öffnungszeiten, Leistungen und Kontaktdaten.',
        pill: 'GEO Gateway · llms.txt · KI-Zitation',
      },
    ],
    complianceTitle: 'Compliance-Architektur',
    complianceItems: [
      { icon: '🇪🇺', label: 'DSGVO Art. 9', sub: 'Besondere Gesundheitsdaten' },
      { icon: '🏛️', label: 'HIPAA-bereit', sub: 'US-Gesundheitsdatenstandards' },
      { icon: '🔐', label: 'ISO 27001', sub: 'Informationssicherheitsmanagement' },
      { icon: '✅', label: 'SOC 2 Typ II', sub: 'Sicherheits- und Verfügbarkeitskontrollen' },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Speichert CatyAI Patientendaten auf seinen Servern?',
        a: 'Nein. Patientendaten werden ausschließlich im isolierten Datentresor Ihrer Klinik verarbeitet und gespeichert. Die CatyAI-Infrastruktur erzwingt strenge Datenresidenz — Patientenakten verlassen nie Ihre bezeichnete Umgebung. CatyAI-Server speichern, kopieren oder verarbeiten keine identifizierbaren Gesundheitsinformationen.',
      },
      {
        q: 'Wie stellt CatyAI die DSGVO-Artikel-9-Konformität für Gesundheitsdaten sicher?',
        a: 'Gesundheitsdaten gelten als besondere Datenkategorie gemäß DSGVO Artikel 9. CatyAI implementiert Isolation auf Architekturebene: AES-256-Verschlüsselung im Ruhezustand, TLS 1.3 bei der Übertragung, klinikspezifische Datentresore und Datenverarbeitungsverträge konform mit DSGVO Kapitel IV. Wir bieten EU-Datenresidenz und DPA-Dokumentation auf Anfrage.',
      },
      {
        q: 'Wie hoch ist das Halluzinationsrisiko bei medizinischen Informationen?',
        a: 'Das Halluzinationsrisiko ist für verifizierten Wissensbasisinhalt vertraglich null. CatyAIs Zero-Halluzination-SLA beschränkt die KI auf die eigene genehmigte Wissensbasis Ihrer Klinik. Das Modell kann keine medizinischen Ratschläge, erfundene Behandlungsprotokolle oder spekulative Gesundheitsinformationen generieren. Antworten außerhalb der Wissensbasis werden explizit verweigert — nie fabriziert.',
      },
      {
        q: 'Kann CatyAI in unser bestehendes KIS oder Klinik-Management-System integriert werden?',
        a: 'Ja. CatyAI bietet Webhook- und REST-API-Integrationspunkte für Kalendersysteme, KIS-Plattformen (einschließlich HL7-FHIR-kompatible Systeme) und Klinik-Management-Software. Die Integration erfolgt nur lesend von CatyAI-Seite für Planungsabfragen — kein Schreibzugriff auf Ihr KIS erforderlich, sofern nicht spezifisch konfiguriert.',
      },
      {
        q: 'Wie ist die Preisgestaltung für medizinische Kliniken strukturiert?',
        a: 'Gesundheitspläne werden pro Klinikstandort berechnet, mit Mengenrabatten für Netzwerke ab drei Standorten. Jeder Plan umfasst den DSGVO-Datentresor, den Zero-Halluzination-SLA und die Audit-Trail-Engine. Multi-Klinik-Management und individuelle SLA-Vereinbarungen sind ab dem Growth-Plan verfügbar. Kontaktieren Sie uns für Enterprise-Netzwerkpreise.',
      },
    ],
    finalCta: 'Implementieren Sie medizinische KI heute',
    finalBody: 'Bringen Sie Ihre Klinik auf DSGVO-konforme neurale Infrastruktur mit einem Zero-Halluzination-SLA — vereinbaren Sie einen Compliance-Call für eine Live-Demonstration.',
    finalBtn: 'Compliance-Call buchen',
    docsBtn: 'Sicherheitsdokumentation lesen',
  },
  es: {
    badge: 'Infraestructura IA Conforme con RGPD',
    heroTitle: 'Salud. Precisión Absoluta.',
    heroSub: 'Infraestructura neural construida para entornos médicos sin alucinaciones',
    heroBody: 'Implementa IA conforme con el RGPD que automatiza la programación de citas con aislamiento completo de datos. Diseñada para clínicas, hospitales y redes de salud que no pueden permitirse errores — en datos, respuestas o confianza.',
    heroCta: 'Implementar para tu Clínica',
    heroCtaAlt: 'Ver Documentación de Cumplimiento',
    metrics: ['RGPD Art. 9', 'SLA Cero-Alucinación', 'Firmado Ed25519', 'ISO 27001'],
    featuresTitle: 'Construido para Grado Médico',
    featuresSubtitle: 'Cada módulo diseñado con la seguridad del paciente como primera restricción',
    features: [
      {
        n: '01', icon: '📅', title: 'IA de Programación de Pacientes', tag: 'Capa de Programación',
        tagline: 'Cero citas perdidas.',
        body: 'La IA programa, reprograma y envía recordatorios en todos los puntos de contacto con pacientes. Gestiona consultas multilingüe sin exponer nunca información de salud protegida — citas gestionadas con precisión, identidad privada.',
        pill: 'Multi-idioma · PHI-seguro · Sync Calendario',
      },
      {
        n: '02', icon: '🔒', title: 'Bóveda de Datos RGPD', tag: 'Capa de Cumplimiento',
        tagline: 'Aislamiento de datos a nivel arquitectónico.',
        body: 'Los datos de pacientes están aislados por clínica y cifrados en reposo con AES-256. La información nunca cruza las fronteras de la clínica. Cumplimiento total del RGPD Artículo 9 para datos especiales de salud — integrado en la infraestructura, no añadido después.',
        pill: 'AES-256 · Art.9 RGPD · Residencia de Datos',
      },
      {
        n: '03', icon: '🧠', title: 'SLA Cero-Alucinación', tag: 'Capa de Precisión',
        tagline: 'Solo hechos médicos. Nunca inventados.',
        body: 'Cada respuesta de IA está fundamentada exclusivamente en la base de conocimiento verificada de tu clínica. Sin improvisación generativa. Sin respuestas fabricadas. El SLA de precisión contractual garantiza que la IA solo dice lo que sabe — y guarda silencio cuando no lo sabe.',
        pill: 'Anclado en KB · SLA 99.9% · Verificado Factual',
      },
      {
        n: '04', icon: '📋', title: 'Motor de Pista de Auditoría', tag: 'Capa de Trazabilidad',
        tagline: 'Responsabilidad total, siempre.',
        body: 'Cada interacción de IA se registra con marca temporal, usuario, ID de sesión y hash criptográfico de entrada/salida. Los registros de auditoría inmutables están disponibles para inspección regulatoria en cualquier momento — conformes con HIPAA, RGPD y requisitos de autoridades sanitarias nacionales.',
        pill: 'Registros Inmutables · Listo HIPAA · Hash-firmado',
      },
      {
        n: '05', icon: '🏥', title: 'Gestión Multi-Clínica', tag: 'Capa de Operaciones',
        tagline: 'Una plataforma. Múltiples ubicaciones.',
        body: 'Gestiona múltiples ubicaciones de clínicas desde un único panel de control. Cada ubicación mantiene datos completamente aislados, una base de conocimiento personalizada y contratos SLA separados. Escala en toda una red de salud sin mezclar nunca los registros de pacientes.',
        pill: 'Multi-tenant · KBs Aisladas · SLAs Personalizados',
      },
      {
        n: '06', icon: '🌐', title: 'Visibilidad Rastreadores IA', tag: 'Capa de Descubrimiento',
        tagline: 'Sé encontrado por pacientes IA-first.',
        body: 'La integración de GEO Gateway garantiza que tu clínica aparezca correctamente en las respuestas de ChatGPT y Gemini. Riesgo de desinformación cero — datos estructurados y firmados alimentan los modelos IA con horarios, servicios e información de contacto precisos.',
        pill: 'GEO Gateway · llms.txt · Citación IA',
      },
    ],
    complianceTitle: 'Arquitectura de Cumplimiento',
    complianceItems: [
      { icon: '🇪🇺', label: 'RGPD Art. 9', sub: 'Datos especiales de salud' },
      { icon: '🏛️', label: 'Listo HIPAA', sub: 'Estándares de salud de EE.UU.' },
      { icon: '🔐', label: 'ISO 27001', sub: 'Gestión de seguridad de la información' },
      { icon: '✅', label: 'SOC 2 Tipo II', sub: 'Controles de seguridad y disponibilidad' },
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Almacena CatyAI los datos de los pacientes en sus servidores?',
        a: 'No. Los datos de pacientes se procesan y almacenan exclusivamente en la bóveda de datos aislada de tu clínica. La infraestructura de CatyAI aplica una residencia estricta de datos — los registros de pacientes nunca abandonan tu entorno designado. Los servidores de CatyAI no retienen, copian ni procesan información de salud identificable.',
      },
      {
        q: '¿Cómo garantiza CatyAI el cumplimiento del RGPD Artículo 9 para datos de salud?',
        a: 'Los datos de salud son datos de categoría especial conforme al RGPD Artículo 9. CatyAI implementa aislamiento a nivel arquitectónico: cifrado AES-256 en reposo, TLS 1.3 en tránsito, bóvedas de datos por clínica y acuerdos de tratamiento conformes con el Capítulo IV del RGPD. Ofrecemos residencia de datos en la UE y documentación DPA a petición.',
      },
      {
        q: '¿Cuál es el riesgo de alucinación con información médica?',
        a: 'El riesgo de alucinación es contractualmente cero para el contenido de la base de conocimiento verificada. El SLA Cero-Alucinación de CatyAI restringe la IA a la base de conocimiento aprobada de tu clínica. El modelo no puede generar consejos médicos, protocolos de tratamiento inventados o información de salud especulativa. Las respuestas fuera de la base de conocimiento se rechazan explícitamente — nunca se fabrican.',
      },
      {
        q: '¿Puede CatyAI integrarse con nuestro HCE o software de gestión de clínica existente?',
        a: 'Sí. CatyAI proporciona puntos de integración webhook y API REST para sistemas de calendario, plataformas HCE (incluidos sistemas compatibles con HL7 FHIR) y software de gestión de clínica. La integración es de solo lectura desde el lado de CatyAI para consultas de programación — no se requiere acceso de escritura a tu HCE a menos que se configure específicamente.',
      },
      {
        q: '¿Cómo está estructurado el precio para clínicas médicas?',
        a: 'Los planes de salud tienen precio por ubicación de clínica, con descuentos por volumen para redes de tres ubicaciones o más. Cada plan incluye la Bóveda de Datos RGPD, el SLA Cero-Alucinación y el Motor de Pista de Auditoría. La gestión multi-clínica y los acuerdos SLA personalizados están disponibles desde el plan Growth. Contáctanos para precios de red enterprise.',
      },
    ],
    finalCta: 'Implementa IA Grado Médico Hoy',
    finalBody: 'Pon tu clínica en una infraestructura neural conforme con el RGPD con un SLA Cero-Alucinación — programa una llamada de cumplimiento para ver un despliegue en vivo.',
    finalBtn: 'Reservar una Llamada de Cumplimiento',
    docsBtn: 'Leer Documentación de Seguridad',
  },
}

export default function HealthcarePage() {
  const [lang, setLang] = useState(() => localStorage.getItem('caty-lang') || 'en')
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang')
    if (stored && T[stored]) setLang(stored)
    const id = setInterval(() => {
      const l = localStorage.getItem('caty-lang')
      if (l && T[l] && l !== lang) setLang(l)
    }, 500)
    return () => clearInterval(id)
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <div style={{ background: '#010A1F', color: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        :root {
          --hc-gold: #C8A165;
          --hc-gold-bright: #D4B57A;
          --hc-gold-dim: rgba(200,161,101,0.08);
          --hc-gold-mid: rgba(166,130,70,0.18);
          --hc-navy: #010A1F;
        }

        .hc-hero-visual {
          position: absolute; inset: 0; overflow: hidden;
        }

        /* Large atmospheric glow — fills the hero */
        .hc-hero-visual::before {
          content: '';
          position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
          width: 1000px; height: 1000px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(14,165,233,0.13) 0%, rgba(200,161,101,0.08) 35%, transparent 70%);
          animation: hc-pulse 8s ease-in-out infinite;
        }
        /* Secondary warm core */
        .hc-hero-visual::after {
          content: '';
          position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(200,161,101,0.12) 0%, rgba(14,165,233,0.06) 50%, transparent 80%);
          animation: hc-pulse 6s ease-in-out infinite reverse;
        }

        @keyframes hc-pulse {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }
        @keyframes hc-rotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes hc-orbit {
          from { transform: translate(-50%,-50%) rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
        }
        @keyframes hc-beacon-pulse {
          0%, 100% { opacity: 0.6; box-shadow: 0 0 12px var(--beacon-color); }
          50%       { opacity: 1;   box-shadow: 0 0 28px var(--beacon-color), 0 0 48px var(--beacon-color); }
        }

        /* Rings — much more visible */
        .hc-ring-1 {
          position: absolute; top: 50%; left: 50%;
          width: 320px; height: 320px;
          border: 1px solid rgba(200,161,101,0.25);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: hc-rotate 25s linear infinite reverse;
          box-shadow: 0 0 30px rgba(200,161,101,0.06);
        }
        .hc-ring-2 {
          position: absolute; top: 50%; left: 50%;
          width: 600px; height: 600px;
          border: 1px solid rgba(14,165,233,0.18);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: hc-rotate 40s linear infinite;
          box-shadow: 0 0 40px rgba(14,165,233,0.05);
        }
        .hc-ring-3 {
          position: absolute; top: 50%; left: 50%;
          width: 900px; height: 900px;
          border: 1px solid rgba(200,161,101,0.10);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: hc-rotate 60s linear infinite reverse;
        }

        /* Orbiting beacon dots — large, visible */
        .hc-beacon {
          position: absolute; top: 50%; left: 50%;
          border-radius: 50%;
          animation: hc-orbit var(--orbit-dur, 20s) linear infinite, hc-beacon-pulse var(--pulse-dur, 3s) ease-in-out infinite;
        }
        .hc-beacon-gold {
          width: 14px; height: 14px; margin: -7px 0 0 -7px;
          background: #C8A165;
          --beacon-color: rgba(200,161,101,0.7);
        }
        .hc-beacon-cyan {
          width: 10px; height: 10px; margin: -5px 0 0 -5px;
          background: #0EA5E9;
          --beacon-color: rgba(14,165,233,0.7);
        }

        /* Center core — pulsing medical cross */
        .hc-core {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 64px; height: 64px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,161,101,0.25) 0%, rgba(14,165,233,0.12) 60%, transparent 100%);
          border: 1px solid rgba(200,161,101,0.4);
          box-shadow: 0 0 32px rgba(200,161,101,0.3), 0 0 64px rgba(14,165,233,0.1);
          animation: hc-beacon-pulse 4s ease-in-out infinite;
          --beacon-color: rgba(200,161,101,0.5);
        }
        .hc-core::before, .hc-core::after {
          content: '';
          position: absolute; top: 50%; left: 50%;
          background: rgba(200,161,101,0.5);
          border-radius: 2px;
        }
        .hc-core::before {
          width: 2px; height: 28px;
          transform: translate(-50%, -50%);
        }
        .hc-core::after {
          width: 28px; height: 2px;
          transform: translate(-50%, -50%);
        }

        .hc-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 100%);
        }

        .hc-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem; border-radius: 999px;
          background: rgba(200,161,101,0.1); border: 1px solid rgba(200,161,101,0.3);
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #C8A165;
        }

        .hc-card {
          position: relative;
          background: linear-gradient(145deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 2rem;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        .hc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.35), transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .hc-card::after {
          content: ''; position: absolute; inset: -2px; border-radius: 22px;
          background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.18) 0%, rgba(166,130,70,0.06) 40%, transparent 70%);
          filter: blur(24px); opacity: 0.4; z-index: -1; pointer-events: none;
          transition: opacity 0.35s ease, filter 0.35s ease;
        }
        .hc-card:hover {
          border-color: rgba(200,161,101,0.35); transform: translateY(-3px);
          box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7), 0 0 40px -10px rgba(200,161,101,0.12);
        }
        .hc-card:hover::before { opacity: 1; }
        .hc-card:hover::after { opacity: 1; filter: blur(36px); }

        .hc-card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; font-weight: 700;
          color: rgba(200,161,101,0.5);
          letter-spacing: 0.1em; margin-bottom: 0.75rem;
        }
        .hc-card-icon { font-size: 2rem; margin-bottom: 0.75rem; display: block; }
        .hc-card-tag {
          display: inline-flex; align-items: center;
          padding: 0.25rem 0.7rem; border-radius: 999px;
          background: rgba(200,161,101,0.08); border: 1px solid rgba(200,161,101,0.2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; color: #C8A165; letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .hc-card-title {
          font-size: 1.15rem; font-weight: 700;
          color: #f8fafc; margin-bottom: 0.5rem;
          font-family: 'Syne', sans-serif;
        }
        .hc-card-tagline {
          font-size: 0.95rem; font-weight: 500;
          color: #C8A165; margin-bottom: 0.75rem; line-height: 1.4;
        }
        .hc-card-body {
          font-size: 0.875rem; color: #94a3b8;
          line-height: 1.65; margin-bottom: 1rem;
        }
        .hc-card-pill {
          display: inline-flex; align-items: center;
          padding: 0.4rem 0.75rem; border-radius: 8px;
          background: rgba(200,161,101,0.05); border: 1px solid rgba(200,161,101,0.15);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; color: #D4B57A; line-height: 1.5;
        }

        .hc-compliance-card {
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          padding: 1.75rem 1.25rem; border-radius: 16px;
          background: rgba(10,27,61,0.5); border: 1px solid rgba(255,255,255,0.07);
          text-align: center;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .hc-compliance-card:hover {
          border-color: rgba(200,161,101,0.3); transform: translateY(-2px);
        }

        .hc-faq-item {
          background: rgba(10,27,61,0.35);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; overflow: hidden;
          transition: border-color 0.25s; cursor: pointer;
        }
        .hc-faq-item:hover { border-color: rgba(200,161,101,0.25); }
        .hc-faq-item.open { border-color: rgba(200,161,101,0.3); }
        .hc-faq-q {
          padding: 1.2rem 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
          font-weight: 600; font-size: 0.95rem; color: #f8fafc;
          user-select: none;
        }
        .hc-faq-a {
          padding: 0 1.5rem 1.2rem;
          font-size: 0.875rem; color: #94a3b8; line-height: 1.65;
        }
        .hc-faq-chevron {
          width: 16px; height: 16px; flex-shrink: 0; margin-left: 1rem;
          transition: transform 0.25s;
          stroke: #64748b; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
        }
        .hc-faq-item.open .hc-faq-chevron { transform: rotate(180deg); stroke: #C8A165; }

        @media (max-width: 640px) {
          .hc-card { padding: 1.5rem; }
          .hc-card-title { font-size: 1rem; }
          .hc-ring-1 { width: 240px; height: 240px; }
          .hc-ring-2 { width: 440px; height: 440px; }
          .hc-ring-3 { width: 620px; height: 620px; }
          .hc-hero-visual::before { width: 700px; height: 700px; }
          .hc-hero-visual::after { width: 360px; height: 360px; }
        }
      `}</style>

      <SEO
        title="Healthcare AI — GDPR-Compliant Neural Infrastructure | CatyAI"
        description="Deploy GDPR-compliant Neural Infrastructure for healthcare. Automate patient scheduling with our Zero-Hallucination SLA and absolute data isolation."
      />

      <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 1.5rem 5rem', overflow: 'hidden' }}>
        <div className="hc-hero-visual">
          <div className="hc-ring-1" />
          <div className="hc-ring-2" />
          <div className="hc-ring-3" />

          {/* Orbiting gold beacons on ring-1 (r=160px) */}
          <div className="hc-beacon hc-beacon-gold" style={{ '--orbit-r': '160px', '--orbit-dur': '18s', '--pulse-dur': '3s', animationDelay: '0s, 0s' }} />
          <div className="hc-beacon hc-beacon-gold" style={{ '--orbit-r': '160px', '--orbit-dur': '18s', '--pulse-dur': '3.4s', animationDelay: '-9s, -1s' }} />
          <div className="hc-beacon hc-beacon-cyan" style={{ '--orbit-r': '160px', '--orbit-dur': '18s', '--pulse-dur': '2.8s', animationDelay: '-6s, -0.5s' }} />

          {/* Orbiting cyan beacons on ring-2 (r=300px) */}
          <div className="hc-beacon hc-beacon-cyan" style={{ '--orbit-r': '300px', '--orbit-dur': '30s', '--pulse-dur': '4s', animationDelay: '0s, 0s' }} />
          <div className="hc-beacon hc-beacon-cyan" style={{ '--orbit-r': '300px', '--orbit-dur': '30s', '--pulse-dur': '3.6s', animationDelay: '-10s, -1.5s' }} />
          <div className="hc-beacon hc-beacon-gold" style={{ '--orbit-r': '300px', '--orbit-dur': '30s', '--pulse-dur': '3.2s', animationDelay: '-20s, -0.8s' }} />

          {/* Center medical cross core */}
          <div className="hc-core" />
        </div>
        <div className="hc-grid-bg" />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '820px', width: '100%' }}>
          <div className="hc-badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16C784', boxShadow: '0 0 6px #16C784', flexShrink: 0 }} />
            {t.badge}
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '1rem', color: '#f8fafc' }}>
            {t.heroTitle.split('. ').map((part, i, arr) => (
              <span key={i}>
                {i === 0 ? <span style={{ color: '#C8A165' }}>{part}</span> : part}
                {i < arr.length - 1 ? '. ' : ''}
              </span>
            ))}
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: '#C8A165', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            {t.heroSub}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'rgba(248,250,252,0.72)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            {t.heroBody}
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link to="/contact" style={{ padding: '0.9rem 2rem', borderRadius: '12px', background: '#C8A165', color: '#010A1F', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 4px 24px rgba(200,161,101,0.4)', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }}>
              {t.heroCta}
            </Link>
            <a href="#features" style={{ padding: '0.9rem 2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem', backdropFilter: 'blur(8px)', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }}>
              {t.heroCtaAlt} →
            </a>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {t.metrics.map(m => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'rgba(248,250,252,0.4)' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16C784', boxShadow: '0 0 4px #16C784', flexShrink: 0 }} />
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Feature Cards */}
      <section id="features" style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="hc-badge" style={{ marginBottom: '1rem' }}>6 Modules</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.75rem' }}>
              {t.featuresTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '520px', margin: '0 auto' }}>
              {t.featuresSubtitle}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {t.features.map(feat => (
              <div key={feat.n} className="hc-card">
                <div className="hc-card-num">{feat.n}</div>
                <span className="hc-card-icon">{feat.icon}</span>
                <div className="hc-card-tag">{feat.tag}</div>
                <div className="hc-card-title">{feat.title}</div>
                <div className="hc-card-tagline">{feat.tagline}</div>
                <div className="hc-card-body">{feat.body}</div>
                <div className="hc-card-pill">{feat.pill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Architecture */}
      <section style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="hc-badge" style={{ marginBottom: '1rem' }}>🛡️ Compliance</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc' }}>
              {t.complianceTitle}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {t.complianceItems.map(item => (
              <div key={item.label} className="hc-compliance-card">
                <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#C8A165' }}>{item.label}</span>
                <span style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4 }}>{item.sub}</span>
              </div>
            ))}
          </div>
          {/* Architecture callout */}
          <div style={{ marginTop: '3rem', background: 'rgba(10,27,61,0.6)', border: '1px solid rgba(200,161,101,0.12)', borderRadius: '16px', padding: '2rem 2.5rem', backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '🔑', label: 'AES-256 at rest', desc: 'Per-clinic key derivation' },
                { icon: '🚀', label: 'TLS 1.3 in transit', desc: 'Forward secrecy enforced' },
                { icon: '📍', label: 'EU data residency', desc: 'Frankfurt / Warsaw nodes' },
                { icon: '📜', label: 'DPA on request', desc: 'GDPR Chapter IV compliant' },
              ].map(a => (
                <div key={a.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.2rem' }}>{a.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#475569' }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', textAlign: 'center', marginBottom: '2.5rem' }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {t.faqs.map((faq, i) => (
              <div key={i} className={`hc-faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="hc-faq-q">
                  <span>{faq.q}</span>
                  <svg className="hc-faq-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {openFaq === i && <div className="hc-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hc-badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16C784', boxShadow: '0 0 6px #16C784', flexShrink: 0 }} />
            Medical-Grade AI
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '1rem' }}>
            {t.finalCta}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.65, fontSize: '0.95rem' }}>
            {t.finalBody}
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ padding: '0.875rem 2rem', borderRadius: '12px', background: '#C8A165', color: '#010A1F', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 4px 24px rgba(200,161,101,0.35)', textDecoration: 'none', display: 'inline-block' }}>
              {t.finalBtn}
            </Link>
            <Link to="/trust" style={{ padding: '0.875rem 2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-block' }}>
              {t.docsBtn}
            </Link>
          </div>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
