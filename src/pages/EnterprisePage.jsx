import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import SEO from '../components/SEO'

const T = {
  en: {
    badge: 'Enterprise Neural Infrastructure',
    heroTitle: 'Enterprise Deployments.',
    heroTitle2: 'Fortress-Grade AI.',
    heroSub: 'SOC2-ready infrastructure for global corporations',
    heroBody: 'Deploy private vector clusters with Ed25519-signed requests across your entire enterprise stack. CatyAI delivers custom SLAs, dedicated compliance officers, and cryptographic audit trails for the most demanding global environments.',
    heroCta: 'Request Enterprise Access',
    heroCtaAlt: 'Download Security Deck',
    metrics: ['SOC2 Type II', 'Ed25519 Auth', 'Private Clusters', '99.99% SLA'],
    featuresTitle: 'Enterprise Architecture',
    featuresSubtitle: 'Every component hardened for global-scale deployment',
    features: [
      {
        n: '01',
        icon: '🏛️',
        title: 'SOC2 Type II Infrastructure',
        tag: 'Compliance Layer',
        tagline: 'Audit-ready from day one.',
        body: 'Full SOC2 Type II certification with annual penetration testing, quarterly compliance reports, and a dedicated compliance officer assigned to your account. Every control is documented, tested, and ready for your auditors.',
        pill: 'SOC2 · Pen-tested · Compliance Officer',
      },
      {
        n: '02',
        icon: '🔐',
        title: 'Private Vector Clusters',
        tag: 'Data Isolation Layer',
        tagline: 'Your data never touches shared infrastructure.',
        body: 'Dedicated Qdrant vector database clusters provisioned per enterprise tenant with zero cross-contamination guarantees. On-premises deployment available for regulated industries including healthcare, finance, and defense.',
        pill: 'Qdrant · Dedicated · On-prem Option',
      },
      {
        n: '03',
        icon: '✍️',
        title: 'Ed25519 Authentication',
        tag: 'Security Layer',
        tagline: 'Cryptographic proof on every request.',
        body: 'Every API call is signed with Ed25519 asymmetric keys with automated JWKS rotation schedules, replay-attack prevention via timestamp nonces, and a tamper-evident request chain logged to immutable storage.',
        pill: 'Ed25519 · JWKS · Replay-proof',
      },
      {
        n: '04',
        icon: '📊',
        title: 'Custom SLA Engine',
        tag: 'Reliability Layer',
        tagline: 'Contractual guarantees, not promises.',
        body: 'Custom SLA contracts with 99.99% uptime guarantee backed by financial penalty clauses. A dedicated engineering contact with defined incident response SLAs and escalation paths for P0 issues.',
        pill: '99.99% · Incident SLA · Financial Penalty',
      },
      {
        n: '05',
        icon: '🔑',
        title: 'SSO & SAML 2.0',
        tag: 'Identity Layer',
        tagline: 'Integrate with your existing identity stack.',
        body: 'Native single sign-on with Okta, Azure AD, Google Workspace, and custom SAML 2.0 providers. SCIM provisioning for automated user lifecycle management and role-based access control with full audit trail.',
        pill: 'Okta · Azure AD · SCIM · RBAC',
      },
      {
        n: '06',
        icon: '📞',
        title: 'Dedicated Support Tier',
        tag: 'Operations Layer',
        tagline: 'A named engineer. Not a ticket queue.',
        body: 'Dedicated account engineer available on a private Slack channel with 2-hour response SLA. Monthly architecture reviews, custom onboarding programs, and priority access to new features for global rollouts.',
        pill: 'Named Engineer · 2h SLA · Monthly Review',
      },
    ],
    complianceTitle: 'Global Compliance Standards',
    complianceItems: [
      { icon: '🏛️', label: 'SOC2 Type II', desc: 'Annual audit & pen test' },
      { icon: '🌐', label: 'ISO 27001', desc: 'Information security mgmt' },
      { icon: '🇪🇺', label: 'GDPR', desc: 'EU data protection' },
      { icon: '🤖', label: 'EU AI Act', desc: 'Art. 9 risk controls' },
    ],
    faqTitle: 'Enterprise FAQ',
    faqs: [
      {
        q: 'How long does an enterprise deployment take?',
        a: 'Most enterprise deployments go live within 4–6 weeks. This includes tenant provisioning, private cluster setup, SSO integration, and custom SLA negotiation. Regulated industries requiring on-premises deployment typically take 8–10 weeks.',
      },
      {
        q: 'How are private vector clusters set up for my organization?',
        a: 'We provision dedicated Qdrant clusters in your preferred cloud region (AWS, GCP, or Azure) or on-premises. Each cluster is fully isolated — no shared nodes, no shared storage, no cross-tenant traffic. Setup includes network peering, encryption at rest, and TLS in transit.',
      },
      {
        q: 'Can the SLA terms be customized beyond the standard 99.99%?',
        a: 'Yes. SLA terms are fully negotiable including uptime targets, incident response windows, escalation paths, and financial penalty structures. We can accommodate compliance-driven SLA language required by financial or healthcare regulators.',
      },
      {
        q: 'Does CatyAI support multi-region enterprise deployments?',
        a: 'Yes. We support active-active and active-passive multi-region configurations across AWS, GCP, and Azure. Data residency controls allow you to restrict where vector data is stored and processed to meet sovereignty requirements.',
      },
      {
        q: 'How is enterprise pricing structured?',
        a: 'Enterprise pricing is usage-based with a negotiated floor commitment. Pricing factors include number of tenants, vector cluster size, monthly API call volume, and support tier. Contact our enterprise team for a custom quote and proof-of-concept proposal.',
      },
    ],
    finalCta: 'Ready for Fortress-Grade AI?',
    finalBody: 'Global enterprise teams trust CatyAI to deliver private, cryptographically-secured AI infrastructure at scale.',
    finalBtn: 'Request Enterprise Demo',
    deckBtn: 'Download Security Deck',
  },

  ro: {
    badge: 'Infrastructură Neurală Enterprise',
    heroTitle: 'Implementări Enterprise.',
    heroTitle2: 'AI de Grad Fortăreață.',
    heroSub: 'Infrastructură pregătită SOC2 pentru corporații globale',
    heroBody: 'Implementează clustere vectoriale private cu cereri semnate Ed25519 în întregul tău stack enterprise. CatyAI oferă SLA-uri personalizate, ofițeri de conformitate dedicați și trasee de audit criptografice pentru cele mai solicitante medii globale.',
    heroCta: 'Solicită Acces Enterprise',
    heroCtaAlt: 'Descarcă Documentul de Securitate',
    metrics: ['SOC2 Tip II', 'Autentificare Ed25519', 'Clustere Private', 'SLA 99,99%'],
    featuresTitle: 'Arhitectură Enterprise',
    featuresSubtitle: 'Fiecare componentă consolidată pentru implementare la scară globală',
    features: [
      {
        n: '01',
        icon: '🏛️',
        title: 'Infrastructură SOC2 Tip II',
        tag: 'Stratul de Conformitate',
        tagline: 'Gata de audit din prima zi.',
        body: 'Certificare completă SOC2 Tip II cu testare anuală de penetrare, rapoarte trimestriale de conformitate și un ofițer de conformitate dedicat atribuit contului tău. Fiecare control este documentat, testat și pregătit pentru auditorii tăi.',
        pill: 'SOC2 · Pen-testat · Ofițer Conformitate',
      },
      {
        n: '02',
        icon: '🔐',
        title: 'Clustere Vectoriale Private',
        tag: 'Stratul de Izolare Date',
        tagline: 'Datele tale nu ating niciodată infrastructura partajată.',
        body: 'Clustere dedicate de baze de date vectoriale Qdrant provizionate per chiriaș enterprise cu garanții zero contaminare încrucișată. Implementarea on-premises disponibilă pentru industrii reglementate incluzând sănătatea, finanțele și apărarea.',
        pill: 'Qdrant · Dedicat · Opțiune On-prem',
      },
      {
        n: '03',
        icon: '✍️',
        title: 'Autentificare Ed25519',
        tag: 'Stratul de Securitate',
        tagline: 'Dovadă criptografică la fiecare cerere.',
        body: 'Fiecare apel API este semnat cu chei asimetrice Ed25519 cu programe automate de rotație JWKS, prevenirea atacurilor de reluare prin nonce-uri de timp și un lanț de cereri rezistent la manipulare înregistrat în stocare imuabilă.',
        pill: 'Ed25519 · JWKS · Protecție Reluare',
      },
      {
        n: '04',
        icon: '📊',
        title: 'Motor SLA Personalizat',
        tag: 'Stratul de Fiabilitate',
        tagline: 'Garanții contractuale, nu promisiuni.',
        body: 'Contracte SLA personalizate cu garanție de disponibilitate 99,99% susținute de clauze de penalitate financiară. Un contact ingineresc dedicat cu SLA-uri de răspuns la incidente și căi de escaladare pentru probleme P0.',
        pill: '99,99% · SLA Incident · Penalitate Financiară',
      },
      {
        n: '05',
        icon: '🔑',
        title: 'SSO și SAML 2.0',
        tag: 'Stratul de Identitate',
        tagline: 'Integrează cu stiva ta de identitate existentă.',
        body: 'Single sign-on nativ cu Okta, Azure AD, Google Workspace și furnizori SAML 2.0 personalizați. Provizionare SCIM pentru gestionarea automată a ciclului de viață al utilizatorilor și control al accesului bazat pe roluri cu traseu complet de audit.',
        pill: 'Okta · Azure AD · SCIM · RBAC',
      },
      {
        n: '06',
        icon: '📞',
        title: 'Nivel de Suport Dedicat',
        tag: 'Stratul Operațional',
        tagline: 'Un inginer cu nume. Nu o coadă de tichete.',
        body: 'Inginer de cont dedicat disponibil pe un canal Slack privat cu SLA de răspuns de 2 ore. Revizuiri lunare de arhitectură, programe de onboarding personalizate și acces prioritar la funcții noi pentru implementări globale.',
        pill: 'Inginer Dedicat · SLA 2h · Revizuire Lunară',
      },
    ],
    complianceTitle: 'Standarde Globale de Conformitate',
    complianceItems: [
      { icon: '🏛️', label: 'SOC2 Tip II', desc: 'Audit anual și test de penetrare' },
      { icon: '🌐', label: 'ISO 27001', desc: 'Managementul securității informațiilor' },
      { icon: '🇪🇺', label: 'GDPR', desc: 'Protecția datelor UE' },
      { icon: '🤖', label: 'EU AI Act', desc: 'Controale de risc Art. 9' },
    ],
    faqTitle: 'Întrebări Frecvente Enterprise',
    faqs: [
      {
        q: 'Cât durează o implementare enterprise?',
        a: 'Majoritatea implementărilor enterprise sunt active în 4–6 săptămâni. Aceasta include provizionarea chiriaşului, configurarea clusterului privat, integrarea SSO și negocierea SLA personalizat. Industriile reglementate care necesită implementare on-premises durează de obicei 8–10 săptămâni.',
      },
      {
        q: 'Cum sunt configurate clusterele vectoriale private pentru organizația mea?',
        a: 'Provizionăm clustere Qdrant dedicate în regiunea cloud preferată (AWS, GCP sau Azure) sau on-premises. Fiecare cluster este complet izolat — fără noduri partajate, fără stocare partajată, fără trafic între chiriași. Configurarea include peering de rețea, criptare în repaus și TLS în tranzit.',
      },
      {
        q: 'Pot fi personalizați termenii SLA dincolo de 99,99% standard?',
        a: 'Da. Termenii SLA sunt pe deplin negociabili incluzând ținte de disponibilitate, ferestre de răspuns la incidente, căi de escaladare și structuri de penalitate financiară. Putem acomoda limbajul SLA impus de reglementatorii financiari sau medicali.',
      },
      {
        q: 'CatyAI suportă implementări enterprise multi-regionale?',
        a: 'Da. Suportăm configurații active-active și active-pasive multi-regionale pe AWS, GCP și Azure. Controalele rezidențiale ale datelor îți permit să restricționezi unde sunt stocate și procesate datele vectoriale pentru a îndeplini cerințele de suveranitate.',
      },
      {
        q: 'Cum este structurată prețuirea enterprise?',
        a: 'Prețuirea enterprise este bazată pe utilizare cu un angajament minim negociat. Factorii de preț includ numărul de chiriași, dimensiunea clusterului vectorial, volumul lunar de apeluri API și nivelul de suport. Contactează echipa noastră enterprise pentru un ofertă personalizată.',
      },
    ],
    finalCta: 'Pregătit pentru AI de Grad Fortăreață?',
    finalBody: 'Echipele enterprise globale au încredere în CatyAI pentru a livra infrastructură AI privată și criptografic securizată la scară.',
    finalBtn: 'Solicită Demo Enterprise',
    deckBtn: 'Descarcă Documentul de Securitate',
  },

  fr: {
    badge: 'Infrastructure Neurale Entreprise',
    heroTitle: 'Déploiements Enterprise.',
    heroTitle2: 'IA de Niveau Forteresse.',
    heroSub: 'Infrastructure prête SOC2 pour les entreprises mondiales',
    heroBody: 'Déployez des clusters vectoriels privés avec des requêtes signées Ed25519 dans toute votre pile enterprise. CatyAI offre des SLA personnalisés, des responsables conformité dédiés et des pistes d\'audit cryptographiques pour les environnements mondiaux les plus exigeants.',
    heroCta: 'Demander l\'Accès Enterprise',
    heroCtaAlt: 'Télécharger le Dossier Sécurité',
    metrics: ['SOC2 Type II', 'Auth Ed25519', 'Clusters Privés', 'SLA 99,99%'],
    featuresTitle: 'Architecture Enterprise',
    featuresSubtitle: 'Chaque composant renforcé pour un déploiement à l\'échelle mondiale',
    features: [
      {
        n: '01',
        icon: '🏛️',
        title: 'Infrastructure SOC2 Type II',
        tag: 'Couche Conformité',
        tagline: 'Prêt pour l\'audit dès le premier jour.',
        body: 'Certification SOC2 Type II complète avec tests de pénétration annuels, rapports de conformité trimestriels et un responsable conformité dédié assigné à votre compte. Chaque contrôle est documenté, testé et prêt pour vos auditeurs.',
        pill: 'SOC2 · Pen-testé · Responsable Conformité',
      },
      {
        n: '02',
        icon: '🔐',
        title: 'Clusters Vectoriels Privés',
        tag: 'Couche Isolation Données',
        tagline: 'Vos données ne touchent jamais l\'infrastructure partagée.',
        body: 'Clusters de bases de données vectorielles Qdrant dédiés provisionnés par locataire enterprise avec des garanties zéro contamination croisée. Déploiement sur site disponible pour les industries réglementées incluant la santé, la finance et la défense.',
        pill: 'Qdrant · Dédié · Option On-prem',
      },
      {
        n: '03',
        icon: '✍️',
        title: 'Authentification Ed25519',
        tag: 'Couche Sécurité',
        tagline: 'Preuve cryptographique sur chaque requête.',
        body: 'Chaque appel API est signé avec des clés asymétriques Ed25519 avec des calendriers de rotation JWKS automatisés, la prévention des attaques par rejeu via des nonces horodatés et une chaîne de requêtes inviolable enregistrée dans un stockage immuable.',
        pill: 'Ed25519 · JWKS · Anti-rejeu',
      },
      {
        n: '04',
        icon: '📊',
        title: 'Moteur SLA Personnalisé',
        tag: 'Couche Fiabilité',
        tagline: 'Des garanties contractuelles, pas des promesses.',
        body: 'Contrats SLA personnalisés avec garantie de disponibilité 99,99% soutenus par des clauses de pénalité financière. Un contact ingénierie dédié avec des SLA de réponse aux incidents et des chemins d\'escalade pour les problèmes P0.',
        pill: '99,99% · SLA Incident · Pénalité Financière',
      },
      {
        n: '05',
        icon: '🔑',
        title: 'SSO et SAML 2.0',
        tag: 'Couche Identité',
        tagline: 'Intégrez votre pile d\'identité existante.',
        body: 'SSO natif avec Okta, Azure AD, Google Workspace et les fournisseurs SAML 2.0 personnalisés. Provisionnement SCIM pour la gestion automatisée du cycle de vie des utilisateurs et contrôle d\'accès basé sur les rôles avec piste d\'audit complète.',
        pill: 'Okta · Azure AD · SCIM · RBAC',
      },
      {
        n: '06',
        icon: '📞',
        title: 'Niveau Support Dédié',
        tag: 'Couche Opérations',
        tagline: 'Un ingénieur nommé. Pas une file de tickets.',
        body: 'Ingénieur de compte dédié disponible sur un canal Slack privé avec SLA de réponse de 2 heures. Revues d\'architecture mensuelles, programmes d\'onboarding personnalisés et accès prioritaire aux nouvelles fonctionnalités pour les déploiements mondiaux.',
        pill: 'Ingénieur Dédié · SLA 2h · Revue Mensuelle',
      },
    ],
    complianceTitle: 'Normes Mondiales de Conformité',
    complianceItems: [
      { icon: '🏛️', label: 'SOC2 Type II', desc: 'Audit annuel et test de pénétration' },
      { icon: '🌐', label: 'ISO 27001', desc: 'Gestion de la sécurité de l\'information' },
      { icon: '🇪🇺', label: 'RGPD', desc: 'Protection des données UE' },
      { icon: '🤖', label: 'EU AI Act', desc: 'Contrôles de risque Art. 9' },
    ],
    faqTitle: 'FAQ Enterprise',
    faqs: [
      {
        q: 'Combien de temps dure un déploiement enterprise ?',
        a: 'La plupart des déploiements enterprise sont en ligne en 4 à 6 semaines. Cela comprend le provisionnement du locataire, la configuration du cluster privé, l\'intégration SSO et la négociation du SLA personnalisé. Les industries réglementées nécessitant un déploiement sur site prennent généralement 8 à 10 semaines.',
      },
      {
        q: 'Comment les clusters vectoriels privés sont-ils configurés pour mon organisation ?',
        a: 'Nous provisionnons des clusters Qdrant dédiés dans votre région cloud préférée (AWS, GCP ou Azure) ou sur site. Chaque cluster est entièrement isolé — pas de nœuds partagés, pas de stockage partagé, pas de trafic entre locataires. La configuration comprend le peering réseau, le chiffrement au repos et TLS en transit.',
      },
      {
        q: 'Les termes SLA peuvent-ils être personnalisés au-delà du standard 99,99% ?',
        a: 'Oui. Les termes SLA sont entièrement négociables, y compris les objectifs de disponibilité, les fenêtres de réponse aux incidents, les chemins d\'escalade et les structures de pénalité financière. Nous pouvons accommoder le langage SLA requis par les régulateurs financiers ou de santé.',
      },
      {
        q: 'CatyAI supporte-t-il les déploiements enterprise multi-régions ?',
        a: 'Oui. Nous supportons des configurations actif-actif et actif-passif multi-régions sur AWS, GCP et Azure. Les contrôles de résidence des données vous permettent de restreindre où les données vectorielles sont stockées et traitées pour répondre aux exigences de souveraineté.',
      },
      {
        q: 'Comment la tarification enterprise est-elle structurée ?',
        a: 'La tarification enterprise est basée sur l\'utilisation avec un engagement minimum négocié. Les facteurs de tarification incluent le nombre de locataires, la taille du cluster vectoriel, le volume mensuel d\'appels API et le niveau de support. Contactez notre équipe enterprise pour un devis personnalisé.',
      },
    ],
    finalCta: 'Prêt pour une IA de Niveau Forteresse ?',
    finalBody: 'Les équipes enterprise mondiales font confiance à CatyAI pour fournir une infrastructure IA privée et cryptographiquement sécurisée à grande échelle.',
    finalBtn: 'Demander une Démo Enterprise',
    deckBtn: 'Télécharger le Dossier Sécurité',
  },

  de: {
    badge: 'Enterprise Neural-Infrastruktur',
    heroTitle: 'Enterprise-Deployments.',
    heroTitle2: 'KI auf Festungsniveau.',
    heroSub: 'SOC2-bereite Infrastruktur für globale Konzerne',
    heroBody: 'Deployen Sie private Vektor-Cluster mit Ed25519-signierten Anfragen in Ihrem gesamten Enterprise-Stack. CatyAI liefert individuelle SLAs, dedizierte Compliance-Beauftragte und kryptografische Prüfpfade für die anspruchsvollsten globalen Umgebungen.',
    heroCta: 'Enterprise-Zugang anfragen',
    heroCtaAlt: 'Sicherheitsdeck herunterladen',
    metrics: ['SOC2 Typ II', 'Ed25519-Auth', 'Private Cluster', '99,99% SLA'],
    featuresTitle: 'Enterprise-Architektur',
    featuresSubtitle: 'Jede Komponente gehärtet für globale Deployments',
    features: [
      {
        n: '01',
        icon: '🏛️',
        title: 'SOC2 Typ II Infrastruktur',
        tag: 'Compliance-Schicht',
        tagline: 'Ab Tag eins auditbereit.',
        body: 'Vollständige SOC2 Typ II Zertifizierung mit jährlichen Penetrationstests, vierteljährlichen Compliance-Berichten und einem dedizierten Compliance-Beauftragten für Ihr Konto. Jede Kontrolle ist dokumentiert, getestet und für Ihre Prüfer bereit.',
        pill: 'SOC2 · Pen-getestet · Compliance-Beauftragter',
      },
      {
        n: '02',
        icon: '🔐',
        title: 'Private Vektor-Cluster',
        tag: 'Datenisolierungs-Schicht',
        tagline: 'Ihre Daten berühren niemals gemeinsame Infrastruktur.',
        body: 'Dedizierte Qdrant-Vektordatenbank-Cluster pro Enterprise-Mandant mit Null-Kreuzkontaminations-Garantien. On-Premises-Deployment verfügbar für regulierte Branchen wie Gesundheitswesen, Finanzen und Verteidigung.',
        pill: 'Qdrant · Dediziert · On-prem Option',
      },
      {
        n: '03',
        icon: '✍️',
        title: 'Ed25519-Authentifizierung',
        tag: 'Sicherheits-Schicht',
        tagline: 'Kryptografischer Beweis bei jeder Anfrage.',
        body: 'Jeder API-Aufruf wird mit asymmetrischen Ed25519-Schlüsseln signiert, mit automatisierten JWKS-Rotationsplänen, Replay-Angriff-Prävention durch Zeitstempel-Nonces und einer manipulationssicheren Anfragekette in unveränderlichem Speicher.',
        pill: 'Ed25519 · JWKS · Replay-Schutz',
      },
      {
        n: '04',
        icon: '📊',
        title: 'Individueller SLA-Engine',
        tag: 'Zuverlässigkeits-Schicht',
        tagline: 'Vertragliche Garantien, keine Versprechen.',
        body: 'Individuelle SLA-Verträge mit 99,99% Verfügbarkeitsgarantie, gestützt durch Vertragsklauseln mit finanziellen Strafzahlungen. Ein dedizierter Engineering-Kontakt mit definierten Incident-Response-SLAs und Eskalationspfaden für P0-Probleme.',
        pill: '99,99% · Incident-SLA · Finanzstrafe',
      },
      {
        n: '05',
        icon: '🔑',
        title: 'SSO & SAML 2.0',
        tag: 'Identitäts-Schicht',
        tagline: 'Integration in Ihren bestehenden Identity-Stack.',
        body: 'Natives Single Sign-On mit Okta, Azure AD, Google Workspace und benutzerdefinierten SAML 2.0-Anbietern. SCIM-Provisionierung für automatisiertes Benutzer-Lebenszyklusmanagement und rollenbasierte Zugriffskontrolle mit vollständigem Prüfpfad.',
        pill: 'Okta · Azure AD · SCIM · RBAC',
      },
      {
        n: '06',
        icon: '📞',
        title: 'Dedizierter Support-Tier',
        tag: 'Operations-Schicht',
        tagline: 'Ein namentlicher Ingenieur. Kein Ticket-System.',
        body: 'Dedizierter Account-Ingenieur in einem privaten Slack-Kanal mit 2-Stunden-Response-SLA. Monatliche Architektur-Reviews, individuelle Onboarding-Programme und prioritärer Zugang zu neuen Funktionen für globale Rollouts.',
        pill: 'Namentl. Ingenieur · SLA 2h · Monatl. Review',
      },
    ],
    complianceTitle: 'Globale Compliance-Standards',
    complianceItems: [
      { icon: '🏛️', label: 'SOC2 Typ II', desc: 'Jährliches Audit & Penetrationstest' },
      { icon: '🌐', label: 'ISO 27001', desc: 'Informationssicherheitsmanagement' },
      { icon: '🇪🇺', label: 'DSGVO', desc: 'EU-Datenschutz' },
      { icon: '🤖', label: 'EU AI Act', desc: 'Risikokontrollen Art. 9' },
    ],
    faqTitle: 'Enterprise FAQ',
    faqs: [
      {
        q: 'Wie lange dauert ein Enterprise-Deployment?',
        a: 'Die meisten Enterprise-Deployments gehen in 4–6 Wochen live. Dazu gehören Mandanten-Provisionierung, Private-Cluster-Einrichtung, SSO-Integration und individuelle SLA-Verhandlung. Regulierte Branchen, die On-Premises-Deployment benötigen, dauern typischerweise 8–10 Wochen.',
      },
      {
        q: 'Wie werden private Vektor-Cluster für meine Organisation eingerichtet?',
        a: 'Wir stellen dedizierte Qdrant-Cluster in Ihrer bevorzugten Cloud-Region (AWS, GCP oder Azure) oder On-Premises bereit. Jeder Cluster ist vollständig isoliert — keine gemeinsamen Nodes, kein gemeinsamer Speicher, kein mandantenübergreifender Traffic. Die Einrichtung umfasst Netzwerk-Peering, Verschlüsselung im Ruhezustand und TLS im Transit.',
      },
      {
        q: 'Können die SLA-Bedingungen über den Standard 99,99% angepasst werden?',
        a: 'Ja. SLA-Bedingungen sind vollständig verhandelbar, einschließlich Verfügbarkeitsziele, Incident-Response-Fenster, Eskalationspfade und Strukturen für finanzielle Strafzahlungen. Wir können SLA-Sprache für Finanz- oder Gesundheitsregulatoren berücksichtigen.',
      },
      {
        q: 'Unterstützt CatyAI Multi-Region Enterprise-Deployments?',
        a: 'Ja. Wir unterstützen aktiv-aktiv und aktiv-passiv Multi-Region-Konfigurationen auf AWS, GCP und Azure. Datensidenz-Kontrollen ermöglichen es Ihnen einzuschränken, wo Vektordaten gespeichert und verarbeitet werden, um Souveränitätsanforderungen zu erfüllen.',
      },
      {
        q: 'Wie ist die Enterprise-Preisgestaltung strukturiert?',
        a: 'Enterprise-Preise sind nutzungsbasiert mit einem verhandelten Mindestengagement. Preisfaktoren umfassen Mandantenanzahl, Vektor-Cluster-Größe, monatliches API-Aufrufvolumen und Support-Tier. Kontaktieren Sie unser Enterprise-Team für ein individuelles Angebot.',
      },
    ],
    finalCta: 'Bereit für KI auf Festungsniveau?',
    finalBody: 'Globale Enterprise-Teams vertrauen CatyAI für die Bereitstellung privater, kryptografisch gesicherter KI-Infrastruktur in großem Maßstab.',
    finalBtn: 'Enterprise-Demo anfragen',
    deckBtn: 'Sicherheitsdeck herunterladen',
  },

  es: {
    badge: 'Infraestructura Neural Enterprise',
    heroTitle: 'Despliegues Enterprise.',
    heroTitle2: 'IA de Grado Fortaleza.',
    heroSub: 'Infraestructura lista para SOC2 para corporaciones globales',
    heroBody: 'Despliega clusters vectoriales privados con solicitudes firmadas Ed25519 en todo tu stack enterprise. CatyAI ofrece SLAs personalizados, oficiales de cumplimiento dedicados y rastros de auditoría criptográficos para los entornos globales más exigentes.',
    heroCta: 'Solicitar Acceso Enterprise',
    heroCtaAlt: 'Descargar Dossier de Seguridad',
    metrics: ['SOC2 Tipo II', 'Auth Ed25519', 'Clusters Privados', 'SLA 99,99%'],
    featuresTitle: 'Arquitectura Enterprise',
    featuresSubtitle: 'Cada componente reforzado para despliegue a escala global',
    features: [
      {
        n: '01',
        icon: '🏛️',
        title: 'Infraestructura SOC2 Tipo II',
        tag: 'Capa de Cumplimiento',
        tagline: 'Listo para auditoría desde el primer día.',
        body: 'Certificación SOC2 Tipo II completa con pruebas de penetración anuales, informes de cumplimiento trimestrales y un oficial de cumplimiento dedicado asignado a tu cuenta. Cada control está documentado, probado y listo para tus auditores.',
        pill: 'SOC2 · Pen-testeado · Oficial Cumplimiento',
      },
      {
        n: '02',
        icon: '🔐',
        title: 'Clusters Vectoriales Privados',
        tag: 'Capa de Aislamiento de Datos',
        tagline: 'Tus datos nunca tocan infraestructura compartida.',
        body: 'Clusters de bases de datos vectoriales Qdrant dedicados aprovisionados por inquilino enterprise con garantías de cero contaminación cruzada. Despliegue en local disponible para industrias reguladas incluyendo salud, finanzas y defensa.',
        pill: 'Qdrant · Dedicado · Opción On-prem',
      },
      {
        n: '03',
        icon: '✍️',
        title: 'Autenticación Ed25519',
        tag: 'Capa de Seguridad',
        tagline: 'Prueba criptográfica en cada solicitud.',
        body: 'Cada llamada API se firma con claves asimétricas Ed25519 con calendarios de rotación JWKS automatizados, prevención de ataques de repetición mediante nonces temporales y una cadena de solicitudes resistente a manipulaciones registrada en almacenamiento inmutable.',
        pill: 'Ed25519 · JWKS · Anti-repetición',
      },
      {
        n: '04',
        icon: '📊',
        title: 'Motor SLA Personalizado',
        tag: 'Capa de Fiabilidad',
        tagline: 'Garantías contractuales, no promesas.',
        body: 'Contratos SLA personalizados con garantía de disponibilidad del 99,99% respaldados por cláusulas de penalización financiera. Un contacto de ingeniería dedicado con SLAs de respuesta a incidentes y rutas de escalación para problemas P0.',
        pill: '99,99% · SLA Incidente · Penalización Financiera',
      },
      {
        n: '05',
        icon: '🔑',
        title: 'SSO y SAML 2.0',
        tag: 'Capa de Identidad',
        tagline: 'Integra con tu stack de identidad existente.',
        body: 'SSO nativo con Okta, Azure AD, Google Workspace y proveedores SAML 2.0 personalizados. Aprovisionamiento SCIM para gestión automatizada del ciclo de vida de usuarios y control de acceso basado en roles con pista de auditoría completa.',
        pill: 'Okta · Azure AD · SCIM · RBAC',
      },
      {
        n: '06',
        icon: '📞',
        title: 'Nivel de Soporte Dedicado',
        tag: 'Capa de Operaciones',
        tagline: 'Un ingeniero con nombre. No una cola de tickets.',
        body: 'Ingeniero de cuenta dedicado disponible en un canal privado de Slack con SLA de respuesta de 2 horas. Revisiones de arquitectura mensuales, programas de incorporación personalizados y acceso prioritario a nuevas funcionalidades para despliegues globales.',
        pill: 'Ingeniero Dedicado · SLA 2h · Revisión Mensual',
      },
    ],
    complianceTitle: 'Estándares Globales de Cumplimiento',
    complianceItems: [
      { icon: '🏛️', label: 'SOC2 Tipo II', desc: 'Auditoría anual y prueba de penetración' },
      { icon: '🌐', label: 'ISO 27001', desc: 'Gestión de seguridad de la información' },
      { icon: '🇪🇺', label: 'RGPD', desc: 'Protección de datos UE' },
      { icon: '🤖', label: 'EU AI Act', desc: 'Controles de riesgo Art. 9' },
    ],
    faqTitle: 'Preguntas Frecuentes Enterprise',
    faqs: [
      {
        q: '¿Cuánto tiempo tarda un despliegue enterprise?',
        a: 'La mayoría de los despliegues enterprise están activos en 4–6 semanas. Esto incluye el aprovisionamiento del inquilino, la configuración del cluster privado, la integración SSO y la negociación del SLA personalizado. Las industrias reguladas que requieren despliegue en local suelen tardar 8–10 semanas.',
      },
      {
        q: '¿Cómo se configuran los clusters vectoriales privados para mi organización?',
        a: 'Aprovisionamos clusters Qdrant dedicados en tu región cloud preferida (AWS, GCP o Azure) o en local. Cada cluster está completamente aislado — sin nodos compartidos, sin almacenamiento compartido, sin tráfico entre inquilinos. La configuración incluye peering de red, cifrado en reposo y TLS en tránsito.',
      },
      {
        q: '¿Pueden personalizarse los términos del SLA más allá del estándar 99,99%?',
        a: 'Sí. Los términos del SLA son completamente negociables, incluyendo objetivos de disponibilidad, ventanas de respuesta a incidentes, rutas de escalación y estructuras de penalización financiera. Podemos adaptarnos al lenguaje SLA requerido por reguladores financieros o sanitarios.',
      },
      {
        q: '¿CatyAI admite despliegues enterprise multi-región?',
        a: 'Sí. Admitimos configuraciones activo-activo y activo-pasivo multi-región en AWS, GCP y Azure. Los controles de residencia de datos te permiten restringir dónde se almacenan y procesan los datos vectoriales para cumplir con los requisitos de soberanía.',
      },
      {
        q: '¿Cómo está estructurado el precio enterprise?',
        a: 'El precio enterprise está basado en el uso con un compromiso mínimo negociado. Los factores de precio incluyen el número de inquilinos, el tamaño del cluster vectorial, el volumen mensual de llamadas API y el nivel de soporte. Contacta con nuestro equipo enterprise para una propuesta personalizada.',
      },
    ],
    finalCta: '¿Listo para una IA de Grado Fortaleza?',
    finalBody: 'Los equipos enterprise globales confían en CatyAI para entregar infraestructura IA privada y criptográficamente segura a escala.',
    finalBtn: 'Solicitar Demo Enterprise',
    deckBtn: 'Descargar Dossier de Seguridad',
  },
}

export default function EnterprisePage() {
  const [lang, setLang] = useState(() => localStorage.getItem('caty-lang') || 'en')
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    localStorage.setItem('caty-lang', lang)
  }, [lang])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <>
      <SEO
        title="Enterprise Deployments. Fortress-Grade AI. | CatyAI"
        description="SOC2-ready GEO infrastructure for global enterprises. Secure your AI visibility with private vector clusters, Ed25519 signatures, and custom SLAs."
      />

      <style>{`
        /* ── Reset & Base ── */
        *, *::before, *::after { box-sizing: border-box; }

        .ent-page {
          background: #010A1F;
          color: #e8e8f0;
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .ent-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 7rem 1.5rem 5rem;
        }

        .ent-hero::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          width: 1100px;
          height: 1100px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(200,161,101,0.18) 0%, rgba(200,161,101,0.08) 30%, rgba(14,165,233,0.04) 55%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ent-bg-pulse 8s ease-in-out infinite;
        }

        .ent-hero::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(14,165,233,0.10) 0%, rgba(200,161,101,0.06) 40%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ent-bg-pulse 6s ease-in-out infinite reverse;
        }

        @keyframes ent-bg-pulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.06); }
        }

        .ent-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(200,161,101,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,161,101,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black 0%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 50%, black 0%, transparent 100%);
          z-index: 0;
        }

        .ent-monolith-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 400px;
          z-index: 0;
          pointer-events: none;
        }

        .ent-monolith {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 400px;
          background: linear-gradient(180deg, rgba(14,20,40,0.96) 0%, rgba(5,5,15,1) 100%);
          border: 1px solid rgba(200,161,101,0.18);
          border-radius: 6px;
          box-shadow: 0 0 120px rgba(200,161,101,0.20), 0 0 240px rgba(200,161,101,0.08), inset 0 0 40px rgba(200,161,101,0.06);
          animation: ent-glow 4s ease-in-out infinite;
        }

        @keyframes ent-glow {
          0%, 100% {
            box-shadow: 0 0 100px rgba(200,161,101,0.16), 0 0 200px rgba(200,161,101,0.06), inset 0 0 30px rgba(200,161,101,0.04);
          }
          50% {
            box-shadow: 0 0 180px rgba(200,161,101,0.30), 0 0 320px rgba(200,161,101,0.12), inset 0 0 60px rgba(200,161,101,0.10);
          }
        }

        .ent-monolith-reflection {
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(200,161,101,0.04) 50%,
            transparent 70%
          );
          animation: ent-shimmer 6s ease-in-out infinite;
        }

        @keyframes ent-shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        /* Data streams */
        .ent-streams {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 6px;
        }

        .ent-stream {
          position: absolute;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, rgba(200,161,101,0.85), rgba(212,181,122,0.5), transparent);
          animation: ent-stream-rise linear infinite;
          border-radius: 2px;
          box-shadow: 0 0 6px rgba(200,161,101,0.5);
        }

        .ent-stream:nth-child(1)  { left: 18%;  height: 60%;  animation-duration: 2.8s; animation-delay: 0s; }
        .ent-stream:nth-child(2)  { left: 35%;  height: 80%;  animation-duration: 3.4s; animation-delay: 0.6s; }
        .ent-stream:nth-child(3)  { left: 52%;  height: 50%;  animation-duration: 2.2s; animation-delay: 1.1s; }
        .ent-stream:nth-child(4)  { left: 68%;  height: 70%;  animation-duration: 3.0s; animation-delay: 0.3s; }
        .ent-stream:nth-child(5)  { left: 82%;  height: 90%;  animation-duration: 3.8s; animation-delay: 0.9s; }

        @keyframes ent-stream-rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120%); opacity: 0; }
        }

        /* Floor grid streams — below monolith */
        .ent-floor-streams {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 200px;
          pointer-events: none;
          z-index: 0;
        }

        .ent-floor-line {
          position: absolute;
          bottom: 0;
          width: 1px;
          background: linear-gradient(0deg, rgba(200,161,101,0.4) 0%, transparent 100%);
          animation: ent-floor-pulse ease-in-out infinite;
        }

        .ent-floor-line:nth-child(1) { left: 20%;  height: 180px; animation-duration: 2s;   animation-delay: 0s; }
        .ent-floor-line:nth-child(2) { left: 35%;  height: 140px; animation-duration: 2.6s; animation-delay: 0.4s; }
        .ent-floor-line:nth-child(3) { left: 50%;  height: 200px; animation-duration: 1.8s; animation-delay: 0.8s; }
        .ent-floor-line:nth-child(4) { left: 65%;  height: 160px; animation-duration: 2.2s; animation-delay: 0.2s; }
        .ent-floor-line:nth-child(5) { left: 80%;  height: 130px; animation-duration: 3.0s; animation-delay: 1.0s; }

        @keyframes ent-floor-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }

        /* ── Hero Content ── */
        .ent-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 860px;
          margin: 0 auto;
        }

        .ent-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.22);
          border-radius: 100px;
          padding: 0.35rem 1rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C8A165;
          margin-bottom: 2rem;
        }

        .ent-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C8A165;
          box-shadow: 0 0 6px #C8A165;
          animation: ent-pulse-dot 2s ease-in-out infinite;
        }

        @keyframes ent-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .ent-hero-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #f0f0f8;
          margin-bottom: 0.25rem;
        }

        .ent-hero-title2 {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          background: linear-gradient(135deg, #C8A165, #D4B57A, #C8A165);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.2rem;
        }

        .ent-hero-sub {
          font-size: 1.1rem;
          color: rgba(200,161,101,0.8);
          font-weight: 500;
          margin-bottom: 0.8rem;
          letter-spacing: 0.01em;
        }

        .ent-hero-body {
          font-size: 1rem;
          color: rgba(224,224,240,0.65);
          line-height: 1.75;
          max-width: 640px;
          margin: 0 auto 2.4rem;
        }

        .ent-hero-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .ent-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #C8A165 0%, #D4B57A 50%, #C8A165 100%);
          background-size: 200% 200%;
          color: #010A1F;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.8rem 1.8rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(200,161,101,0.3);
        }

        .ent-btn-primary:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200,161,101,0.45);
        }

        .ent-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(224,224,240,0.85);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.8rem 1.8rem;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
        }

        .ent-btn-secondary:hover {
          border-color: rgba(200,161,101,0.4);
          background: rgba(200,161,101,0.06);
          transform: translateY(-2px);
        }

        /* ── Metrics row ── */
        .ent-metrics {
          display: flex;
          gap: 0;
          justify-content: center;
          flex-wrap: wrap;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(10,27,61,0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          max-width: 680px;
          margin: 0 auto;
        }

        .ent-metric {
          flex: 1;
          min-width: 140px;
          padding: 1rem 1.2rem;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }

        .ent-metric:last-child { border-right: none; }

        .ent-metric-value {
          font-size: 0.8rem;
          font-weight: 700;
          color: #C8A165;
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 0.15rem;
        }

        /* ── Sections ── */
        .ent-section {
          padding: 5rem 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ent-section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .ent-section-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #f0f0f8;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .ent-section-subtitle {
          font-size: 1rem;
          color: rgba(224,224,240,0.5);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Cards grid ── */
        .ent-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        .ent-card {
          position: relative;
          background: linear-gradient(145deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .ent-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.35), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ent-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: radial-gradient(circle at 50% 0%, rgba(166,130,70,0.18) 0%, rgba(166,130,70,0.06) 40%, transparent 70%);
          filter: blur(24px);
          opacity: 0.4;
          z-index: -1;
          pointer-events: none;
          transition: opacity 0.35s ease, filter 0.35s ease;
        }

        .ent-card:hover {
          border-color: rgba(200,161,101,0.35);
          transform: translateY(-3px);
          box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7), 0 0 40px -10px rgba(200,161,101,0.12);
        }

        .ent-card:hover::before { opacity: 1; }
        .ent-card:hover::after  { opacity: 1; filter: blur(36px); }

        .ent-card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .ent-card-num {
          font-size: 0.68rem;
          font-weight: 700;
          color: rgba(200,161,101,0.5);
          letter-spacing: 0.1em;
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .ent-card-icon {
          font-size: 1.6rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .ent-card-titles { flex: 1; }

        .ent-card-tag {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(200,161,101,0.6);
          margin-bottom: 0.3rem;
          display: block;
        }

        .ent-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0f0f8;
          line-height: 1.3;
        }

        .ent-card-tagline {
          font-size: 0.88rem;
          color: rgba(200,161,101,0.85);
          font-style: italic;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .ent-card-body {
          font-size: 0.875rem;
          color: rgba(224,224,240,0.6);
          line-height: 1.7;
          margin-bottom: 1.2rem;
        }

        .ent-card-pill {
          display: inline-block;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.18);
          border-radius: 6px;
          padding: 0.3rem 0.7rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(200,161,101,0.7);
          letter-spacing: 0.04em;
        }

        /* ── Compliance ── */
        .ent-compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .ent-compliance-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(10,27,61,0.5) 0%, rgba(1,10,31,0.7) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }

        .ent-compliance-item:hover {
          border-color: rgba(200,161,101,0.3);
          transform: translateY(-2px);
        }

        .ent-compliance-icon {
          font-size: 1.6rem;
          flex-shrink: 0;
        }

        .ent-compliance-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #f0f0f8;
          margin-bottom: 0.2rem;
        }

        .ent-compliance-desc {
          font-size: 0.75rem;
          color: rgba(224,224,240,0.45);
        }

        /* ── FAQ ── */
        .ent-faq-list {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ent-faq-item {
          background: linear-gradient(145deg, rgba(10,27,61,0.5) 0%, rgba(1,10,31,0.7) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .ent-faq-item[data-open="true"] {
          border-color: rgba(200,161,101,0.25);
        }

        .ent-faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.2rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: #f0f0f8;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: inherit;
          transition: color 0.3s ease;
        }

        .ent-faq-q:hover { color: #C8A165; }

        .ent-faq-chevron {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          border-right: 2px solid rgba(200,161,101,0.5);
          border-bottom: 2px solid rgba(200,161,101,0.5);
          transform: rotate(45deg);
          transition: transform 0.3s ease;
          margin-top: -4px;
        }

        .ent-faq-item[data-open="true"] .ent-faq-chevron {
          transform: rotate(-135deg);
          margin-top: 4px;
        }

        .ent-faq-a {
          padding: 0 1.5rem 1.2rem;
          font-size: 0.88rem;
          color: rgba(224,224,240,0.6);
          line-height: 1.75;
          display: none;
        }

        .ent-faq-item[data-open="true"] .ent-faq-a {
          display: block;
        }

        /* ── Final CTA ── */
        .ent-final {
          padding: 6rem 1.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .ent-final::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(200,161,101,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .ent-final-inner {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
        }

        .ent-final-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #f0f0f8, #C8A165);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .ent-final-body {
          font-size: 1rem;
          color: rgba(224,224,240,0.55);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .ent-final-ctas {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ── Divider ── */
        .ent-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.15), transparent);
          margin: 0 auto;
          max-width: 1200px;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ent-features-grid {
            grid-template-columns: 1fr;
          }
          .ent-compliance-grid {
            grid-template-columns: 1fr 1fr;
          }
          .ent-metrics {
            flex-direction: column;
            border-radius: 14px;
          }
          .ent-metric {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .ent-metric:last-child { border-bottom: none; }
          .ent-monolith-wrap {
            opacity: 0.3;
          }
        }
      `}</style>

      <div className="ent-page">
        <GlobalHeader lang={lang} setLang={setLang} />

        {/* ── Hero ── */}
        <section className="ent-hero">
          <div className="ent-hero-grid" aria-hidden="true" />

          {/* Monolith visual */}
          <div className="ent-monolith-wrap" aria-hidden="true">
            <div className="ent-monolith">
              <div className="ent-monolith-reflection" />
              <div className="ent-streams">
                <div className="ent-stream" />
                <div className="ent-stream" />
                <div className="ent-stream" />
                <div className="ent-stream" />
                <div className="ent-stream" />
              </div>
            </div>
          </div>

          {/* Floor data lines */}
          <div className="ent-floor-streams" aria-hidden="true">
            <div className="ent-floor-line" />
            <div className="ent-floor-line" />
            <div className="ent-floor-line" />
            <div className="ent-floor-line" />
            <div className="ent-floor-line" />
          </div>

          <div className="ent-hero-content">
            <div className="ent-badge">{t.badge}</div>

            <h1 className="ent-hero-title">{t.heroTitle}</h1>
            <h2 className="ent-hero-title2">{t.heroTitle2}</h2>

            <p className="ent-hero-sub">{t.heroSub}</p>
            <p className="ent-hero-body">{t.heroBody}</p>

            <div className="ent-hero-ctas">
              <Link to="/contact" className="ent-btn-primary">
                {t.heroCta} →
              </Link>
              <a href="/security-whitepaper.html" className="ent-btn-secondary" target="_blank" rel="noopener noreferrer">
                ↓ {t.heroCtaAlt}
              </a>
            </div>

            <div className="ent-metrics" role="list">
              {t.metrics.map((m, i) => (
                <div key={i} className="ent-metric" role="listitem">
                  <span className="ent-metric-value">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ent-divider" />

        {/* ── Feature Cards ── */}
        <section className="ent-section" aria-labelledby="ent-features-heading">
          <div className="ent-section-header">
            <h2 id="ent-features-heading" className="ent-section-title">{t.featuresTitle}</h2>
            <p className="ent-section-subtitle">{t.featuresSubtitle}</p>
          </div>

          <div className="ent-features-grid">
            {t.features.map((f) => (
              <article key={f.n} className="ent-card">
                <div className="ent-card-header">
                  <span className="ent-card-num">{f.n}</span>
                  <span className="ent-card-icon" aria-hidden="true">{f.icon}</span>
                  <div className="ent-card-titles">
                    <span className="ent-card-tag">{f.tag}</span>
                    <h3 className="ent-card-title">{f.title}</h3>
                  </div>
                </div>
                <p className="ent-card-tagline">{f.tagline}</p>
                <p className="ent-card-body">{f.body}</p>
                <span className="ent-card-pill">{f.pill}</span>
              </article>
            ))}
          </div>
        </section>

        <div className="ent-divider" />

        {/* ── Compliance ── */}
        <section className="ent-section" aria-labelledby="ent-compliance-heading">
          <div className="ent-section-header">
            <h2 id="ent-compliance-heading" className="ent-section-title">{t.complianceTitle}</h2>
          </div>

          <div className="ent-compliance-grid">
            {t.complianceItems.map((c, i) => (
              <div key={i} className="ent-compliance-item">
                <span className="ent-compliance-icon" aria-hidden="true">{c.icon}</span>
                <div>
                  <div className="ent-compliance-label">{c.label}</div>
                  <div className="ent-compliance-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ent-divider" />

        {/* ── FAQ ── */}
        <section className="ent-section" aria-labelledby="ent-faq-heading">
          <div className="ent-section-header">
            <h2 id="ent-faq-heading" className="ent-section-title">{t.faqTitle}</h2>
          </div>

          <div className="ent-faq-list" role="list">
            {t.faqs.map((faq, i) => (
              <div
                key={i}
                className="ent-faq-item"
                data-open={openFaq === i ? 'true' : 'false'}
                role="listitem"
              >
                <button
                  className="ent-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`ent-faq-answer-${i}`}
                >
                  {faq.q}
                  <span className="ent-faq-chevron" aria-hidden="true" />
                </button>
                <div
                  id={`ent-faq-answer-${i}`}
                  className="ent-faq-a"
                  role="region"
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ent-divider" />

        {/* ── Final CTA ── */}
        <section className="ent-final" aria-labelledby="ent-final-heading">
          <div className="ent-final-inner">
            <h2 id="ent-final-heading" className="ent-final-title">{t.finalCta}</h2>
            <p className="ent-final-body">{t.finalBody}</p>
            <div className="ent-final-ctas">
              <Link to="/contact" className="ent-btn-primary">
                {t.finalBtn} →
              </Link>
              <a href="/security-whitepaper.html" className="ent-btn-secondary" target="_blank" rel="noopener noreferrer">
                ↓ {t.deckBtn}
              </a>
            </div>
          </div>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
