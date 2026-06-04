import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    badge1: 'MCP Server',
    badge2: '45 Tools',
    badge3: 'Production Ready',
    heroTitle: 'Add 45 AI Commerce Tools',
    heroTitle2: 'to Claude in 60 seconds.',
    heroSub: 'CatyAI MCP extends Claude Desktop and Claude Code with fraud detection, semantic enrichment, Zero-Trust commerce, and real-time market intelligence. Built for agencies and developers. Ready for production.',
    heroCta: 'Subscribe — from €299/month',
    heroCtaAlt: 'View Live Endpoint',
    heroNote: 'Works with Claude Desktop · Claude Code · Any MCP client',
    toolsTitle: '45 Tools. 4 Categories.',
    toolsSub: 'Production-ready tools for Trust, Commerce, Intelligence, and Autonomy.',
    categories: [
      {
        icon: '🔐',
        tag: 'Trust Layer',
        title: 'Trust & Visibility',
        tagline: 'Cryptographic verification for AI.',
        body: 'Make your business data verifiable by AI crawlers. EdDSA signatures, JWKS endpoints, and Zero-Trust commerce protocols that prove authenticity to GPT, Gemini, Claude, and Perplexity.',
        pill: '8 tools · EdDSA · JWKS · NAP V3',
      },
      {
        icon: '🛒',
        tag: 'Commerce Layer',
        title: 'E-commerce & Fraud',
        tagline: 'COD fraud scoring for CEE/MENA.',
        body: 'Real-time fraud detection built for cash-on-delivery markets. Order shields, behavioral DNA analysis, and catalog enrichment that reduces chargebacks and prevents delivery fraud.',
        pill: '10 tools · Fraud DNA · Order Shield',
      },
      {
        icon: '🧠',
        tag: 'Intelligence Layer',
        title: 'Semantic & Semiotic',
        tagline: '15-layer content enrichment.',
        body: 'Transform product descriptions into semantic gold. Auto-keywords, market signals, competitor monitoring, and autonomous knowledge base management powered by DeepSeek enrichment.',
        pill: '10 tools · DeepSeek · Auto-Brain',
      },
      {
        icon: '⚡',
        tag: 'Autonomy Layer',
        title: 'Ahauros SAG Agents',
        tagline: 'Zero LLM calls. Zero hallucinations.',
        body: 'Deterministic agents for pricing optimization, demand forecasting, supplier evaluation, and logistics. Pure computation — no probabilistic guessing, no token costs, no drift.',
        pill: '11 tools · SAG · Deterministic',
      },
    ],
    howTitle: 'Up and running in 3 steps.',
    howSub: 'No local server, no Docker, no configuration overhead.',
    steps: [
      { num: '01', title: 'Subscribe', desc: 'Choose your plan and get your API key instantly.' },
      { num: '02', title: 'Add config', desc: 'Paste the JSON snippet into claude_desktop_config.json.' },
      { num: '03', title: 'Use 45 tools', desc: 'Claude has access to all production tools immediately.' },
    ],
    pricingTitle: 'Simple Pricing. Serious Tools.',
    pricingSub: 'All plans include every tool. No hidden fees.',
    plans: [
      { name: 'Agency', price: '€299', features: ['50,000 calls/month', 'All 45 tools', 'Claude Desktop + Code', 'Email support'], cta: 'Start Agency' },
      { name: 'Studio', price: '€599', features: ['200,000 calls/month', 'All 45 tools', 'Priority support', 'Usage analytics'], cta: 'Start Studio', popular: true },
      { name: 'Enterprise', price: '€1,499', features: ['Unlimited calls', 'All 45 tools', 'SLA 99.9%', 'Dedicated support', 'Custom integrations'], cta: 'Contact Sales' },
    ],
    liveLabel: 'Live',
    liveMeta: '45 tools active · NAP V3 · EdDSA signed · EU AI Act compliant',
    trustText: 'Built with Anthropic technology · NAP V3 Protocol · EU AI Act compliant · PayAi-X FZE',
  },
  ro: {
    badge1: 'Server MCP',
    badge2: '45 Unelte',
    badge3: 'Gata de Producție',
    heroTitle: 'Adaugă 45 Unelte AI Commerce',
    heroTitle2: 'în Claude în 60 de secunde.',
    heroSub: 'CatyAI MCP extinde Claude Desktop și Claude Code cu detecție fraude, îmbogățire semantică, comerț Zero-Trust și inteligență de piață în timp real. Construit pentru agenții și developeri.',
    heroCta: 'Abonează-te — de la €299/lună',
    heroCtaAlt: 'Vezi Endpoint Live',
    heroNote: 'Funcționează cu Claude Desktop · Claude Code · Orice client MCP',
    toolsTitle: '45 Unelte. 4 Categorii.',
    toolsSub: 'Unelte gata de producție pentru Trust, Comerț, Inteligență și Autonomie.',
    categories: [
      {
        icon: '🔐',
        tag: 'Stratul Trust',
        title: 'Trust & Vizibilitate',
        tagline: 'Verificare criptografică pentru AI.',
        body: 'Fă datele afacerii tale verificabile de crawlerele AI. Semnături EdDSA, endpoint-uri JWKS și protocoale Zero-Trust care dovedesc autenticitatea pentru GPT, Gemini, Claude și Perplexity.',
        pill: '8 unelte · EdDSA · JWKS · NAP V3',
      },
      {
        icon: '🛒',
        tag: 'Stratul Comerț',
        title: 'E-commerce & Fraudă',
        tagline: 'Scoring fraudă COD pentru CEE/MENA.',
        body: 'Detecție fraudă în timp real construită pentru piețele cu plată la livrare. Scuturi pentru comenzi, analiză ADN comportamental și îmbogățire catalog care reduce chargebacks și previne frauda la livrare.',
        pill: '10 unelte · Fraud DNA · Order Shield',
      },
      {
        icon: '🧠',
        tag: 'Stratul Inteligență',
        title: 'Semantic & Semiotic',
        tagline: 'Îmbogățire conținut pe 15 straturi.',
        body: 'Transformă descrierile produselor în aur semantic. Auto-keywords, semnale de piață, monitorizare competitori și management autonom al bazei de cunoștințe alimentat de DeepSeek.',
        pill: '10 unelte · DeepSeek · Auto-Brain',
      },
      {
        icon: '⚡',
        tag: 'Stratul Autonomie',
        title: 'Agenți Ahauros SAG',
        tagline: 'Zero apeluri LLM. Zero halucinații.',
        body: 'Agenți deterministici pentru optimizare prețuri, prognoză cerere, evaluare furnizori și logistică. Calcul pur — fără ghicire probabilistică, fără costuri token, fără derivă.',
        pill: '11 unelte · SAG · Deterministic',
      },
    ],
    howTitle: 'Funcțional în 3 pași.',
    howSub: 'Fără server local, fără Docker, fără overhead de configurare.',
    steps: [
      { num: '01', title: 'Abonează-te', desc: 'Alege planul și primești cheia API instant.' },
      { num: '02', title: 'Adaugă config', desc: 'Lipește snippet-ul JSON în claude_desktop_config.json.' },
      { num: '03', title: 'Folosește 45 unelte', desc: 'Claude are acces la toate uneltele imediat.' },
    ],
    pricingTitle: 'Prețuri Simple. Unelte Serioase.',
    pricingSub: 'Toate planurile includ fiecare unealtă. Fără taxe ascunse.',
    plans: [
      { name: 'Agency', price: '€299', features: ['50.000 apeluri/lună', 'Toate cele 45 unelte', 'Claude Desktop + Code', 'Suport email'], cta: 'Start Agency' },
      { name: 'Studio', price: '€599', features: ['200.000 apeluri/lună', 'Toate cele 45 unelte', 'Suport prioritar', 'Analiză utilizare'], cta: 'Start Studio', popular: true },
      { name: 'Enterprise', price: '€1.499', features: ['Apeluri nelimitate', 'Toate cele 45 unelte', 'SLA 99.9%', 'Suport dedicat', 'Integrări custom'], cta: 'Contactează Vânzări' },
    ],
    liveLabel: 'Live',
    liveMeta: '45 unelte active · NAP V3 · Semnat EdDSA · Conform EU AI Act',
    trustText: 'Construit cu tehnologie Anthropic · Protocol NAP V3 · Conform EU AI Act · PayAi-X FZE',
  },
  fr: {
    badge1: 'Serveur MCP',
    badge2: '45 Outils',
    badge3: 'Prêt Production',
    heroTitle: 'Ajoutez 45 outils IA Commerce',
    heroTitle2: 'à Claude en 60 secondes.',
    heroSub: "CatyAI MCP étend Claude Desktop et Claude Code avec détection de fraude, enrichissement sémantique, commerce Zero-Trust et intelligence de marché en temps réel. Conçu pour agences et développeurs.",
    heroCta: "S'abonner — à partir de €299/mois",
    heroCtaAlt: 'Voir Endpoint Live',
    heroNote: 'Fonctionne avec Claude Desktop · Claude Code · Tout client MCP',
    toolsTitle: '45 Outils. 4 Catégories.',
    toolsSub: 'Outils prêts pour la production pour Trust, Commerce, Intelligence et Autonomie.',
    categories: [
      {
        icon: '🔐',
        tag: 'Couche Trust',
        title: 'Trust & Visibilité',
        tagline: 'Vérification cryptographique pour IA.',
        body: "Rendez vos données d'entreprise vérifiables par les crawlers IA. Signatures EdDSA, endpoints JWKS et protocoles Zero-Trust qui prouvent l'authenticité pour GPT, Gemini, Claude et Perplexity.",
        pill: '8 outils · EdDSA · JWKS · NAP V3',
      },
      {
        icon: '🛒',
        tag: 'Couche Commerce',
        title: 'E-commerce & Fraude',
        tagline: 'Scoring fraude COD pour CEE/MENA.',
        body: "Détection de fraude en temps réel pour les marchés de paiement à la livraison. Boucliers de commande, analyse ADN comportemental et enrichissement catalogue qui réduit les chargebacks.",
        pill: '10 outils · Fraud DNA · Order Shield',
      },
      {
        icon: '🧠',
        tag: 'Couche Intelligence',
        title: 'Sémantique & Sémiotique',
        tagline: 'Enrichissement contenu 15 couches.',
        body: "Transformez les descriptions de produits en or sémantique. Auto-keywords, signaux de marché, surveillance concurrents et gestion autonome de base de connaissances alimentée par DeepSeek.",
        pill: '10 outils · DeepSeek · Auto-Brain',
      },
      {
        icon: '⚡',
        tag: 'Couche Autonomie',
        title: 'Agents Ahauros SAG',
        tagline: 'Zéro appels LLM. Zéro hallucinations.',
        body: "Agents déterministes pour optimisation prix, prévision demande, évaluation fournisseurs et logistique. Calcul pur — pas de devinette probabiliste, pas de coûts token, pas de dérive.",
        pill: '11 outils · SAG · Déterministe',
      },
    ],
    howTitle: 'Opérationnel en 3 étapes.',
    howSub: 'Pas de serveur local, pas de Docker, pas de surcharge de configuration.',
    steps: [
      { num: '01', title: "S'abonner", desc: 'Choisissez votre plan et recevez votre clé API instantanément.' },
      { num: '02', title: 'Ajouter config', desc: 'Collez le snippet JSON dans claude_desktop_config.json.' },
      { num: '03', title: 'Utiliser 45 outils', desc: 'Claude a accès à tous les outils immédiatement.' },
    ],
    pricingTitle: 'Tarifs Simples. Outils Sérieux.',
    pricingSub: 'Tous les plans incluent chaque outil. Pas de frais cachés.',
    plans: [
      { name: 'Agency', price: '€299', features: ['50 000 appels/mois', 'Tous les 45 outils', 'Claude Desktop + Code', 'Support email'], cta: 'Démarrer Agency' },
      { name: 'Studio', price: '€599', features: ['200 000 appels/mois', 'Tous les 45 outils', 'Support prioritaire', 'Analytique usage'], cta: 'Démarrer Studio', popular: true },
      { name: 'Enterprise', price: '€1 499', features: ['Appels illimités', 'Tous les 45 outils', 'SLA 99.9%', 'Support dédié', 'Intégrations custom'], cta: 'Contacter Ventes' },
    ],
    liveLabel: 'Live',
    liveMeta: '45 outils actifs · NAP V3 · Signé EdDSA · Conforme EU AI Act',
    trustText: 'Construit avec technologie Anthropic · Protocole NAP V3 · Conforme EU AI Act · PayAi-X FZE',
  },
  es: {
    badge1: 'Servidor MCP',
    badge2: '45 Herramientas',
    badge3: 'Listo Producción',
    heroTitle: 'Añade 45 herramientas IA Commerce',
    heroTitle2: 'a Claude en 60 segundos.',
    heroSub: 'CatyAI MCP extiende Claude Desktop y Claude Code con detección de fraude, enriquecimiento semántico, comercio Zero-Trust e inteligencia de mercado en tiempo real. Construido para agencias y desarrolladores.',
    heroCta: 'Suscribirse — desde €299/mes',
    heroCtaAlt: 'Ver Endpoint Live',
    heroNote: 'Funciona con Claude Desktop · Claude Code · Cualquier cliente MCP',
    toolsTitle: '45 Herramientas. 4 Categorías.',
    toolsSub: 'Herramientas listas para producción para Trust, Comercio, Inteligencia y Autonomía.',
    categories: [
      {
        icon: '🔐',
        tag: 'Capa Trust',
        title: 'Trust & Visibilidad',
        tagline: 'Verificación criptográfica para IA.',
        body: 'Haz que los datos de tu negocio sean verificables por crawlers IA. Firmas EdDSA, endpoints JWKS y protocolos Zero-Trust que prueban autenticidad para GPT, Gemini, Claude y Perplexity.',
        pill: '8 herramientas · EdDSA · JWKS · NAP V3',
      },
      {
        icon: '🛒',
        tag: 'Capa Comercio',
        title: 'E-commerce & Fraude',
        tagline: 'Scoring fraude COD para CEE/MENA.',
        body: 'Detección de fraude en tiempo real para mercados de pago contra entrega. Escudos de pedido, análisis ADN comportamental y enriquecimiento de catálogo que reduce chargebacks.',
        pill: '10 herramientas · Fraud DNA · Order Shield',
      },
      {
        icon: '🧠',
        tag: 'Capa Inteligencia',
        title: 'Semántico & Semiótico',
        tagline: 'Enriquecimiento contenido 15 capas.',
        body: 'Transforma descripciones de productos en oro semántico. Auto-keywords, señales de mercado, monitoreo de competidores y gestión autónoma de base de conocimiento con DeepSeek.',
        pill: '10 herramientas · DeepSeek · Auto-Brain',
      },
      {
        icon: '⚡',
        tag: 'Capa Autonomía',
        title: 'Agentes Ahauros SAG',
        tagline: 'Cero llamadas LLM. Cero alucinaciones.',
        body: 'Agentes determinísticos para optimización de precios, pronóstico de demanda, evaluación de proveedores y logística. Cálculo puro — sin adivinanza probabilística, sin costos de token.',
        pill: '11 herramientas · SAG · Determinístico',
      },
    ],
    howTitle: 'Funcionando en 3 pasos.',
    howSub: 'Sin servidor local, sin Docker, sin sobrecarga de configuración.',
    steps: [
      { num: '01', title: 'Suscribirse', desc: 'Elige tu plan y recibe tu clave API al instante.' },
      { num: '02', title: 'Añadir config', desc: 'Pega el snippet JSON en claude_desktop_config.json.' },
      { num: '03', title: 'Usar 45 herramientas', desc: 'Claude tiene acceso a todas las herramientas inmediatamente.' },
    ],
    pricingTitle: 'Precios Simples. Herramientas Serias.',
    pricingSub: 'Todos los planes incluyen cada herramienta. Sin tarifas ocultas.',
    plans: [
      { name: 'Agency', price: '€299', features: ['50.000 llamadas/mes', 'Las 45 herramientas', 'Claude Desktop + Code', 'Soporte email'], cta: 'Empezar Agency' },
      { name: 'Studio', price: '€599', features: ['200.000 llamadas/mes', 'Las 45 herramientas', 'Soporte prioritario', 'Analítica de uso'], cta: 'Empezar Studio', popular: true },
      { name: 'Enterprise', price: '€1.499', features: ['Llamadas ilimitadas', 'Las 45 herramientas', 'SLA 99.9%', 'Soporte dedicado', 'Integraciones custom'], cta: 'Contactar Ventas' },
    ],
    liveLabel: 'Live',
    liveMeta: '45 herramientas activas · NAP V3 · Firmado EdDSA · Cumple EU AI Act',
    trustText: 'Construido con tecnología Anthropic · Protocolo NAP V3 · Cumple EU AI Act · PayAi-X FZE',
  },
  de: {
    badge1: 'MCP Server',
    badge2: '45 Tools',
    badge3: 'Produktionsbereit',
    heroTitle: 'Füge 45 KI-Commerce-Tools',
    heroTitle2: 'zu Claude in 60 Sekunden hinzu.',
    heroSub: 'CatyAI MCP erweitert Claude Desktop und Claude Code mit Betrugserkennung, semantischer Anreicherung, Zero-Trust-Commerce und Echtzeit-Marktintelligenz. Für Agenturen und Entwickler.',
    heroCta: 'Abonnieren — ab €299/Monat',
    heroCtaAlt: 'Live Endpoint ansehen',
    heroNote: 'Funktioniert mit Claude Desktop · Claude Code · Jedem MCP-Client',
    toolsTitle: '45 Tools. 4 Kategorien.',
    toolsSub: 'Produktionsbereite Tools für Trust, Commerce, Intelligence und Autonomie.',
    categories: [
      {
        icon: '🔐',
        tag: 'Trust-Schicht',
        title: 'Trust & Sichtbarkeit',
        tagline: 'Kryptografische Verifizierung für KI.',
        body: 'Machen Sie Ihre Geschäftsdaten für KI-Crawler verifizierbar. EdDSA-Signaturen, JWKS-Endpoints und Zero-Trust-Protokolle, die Authentizität für GPT, Gemini, Claude und Perplexity beweisen.',
        pill: '8 Tools · EdDSA · JWKS · NAP V3',
      },
      {
        icon: '🛒',
        tag: 'Commerce-Schicht',
        title: 'E-Commerce & Betrug',
        tagline: 'COD-Betrugs-Scoring für CEE/MENA.',
        body: 'Echtzeit-Betrugserkennung für Nachnahme-Märkte. Bestellschutz, verhaltensbasierte DNA-Analyse und Kataloganreicherung, die Chargebacks reduziert und Lieferbetrug verhindert.',
        pill: '10 Tools · Fraud DNA · Order Shield',
      },
      {
        icon: '🧠',
        tag: 'Intelligence-Schicht',
        title: 'Semantisch & Semiotisch',
        tagline: '15-Schichten-Content-Anreicherung.',
        body: 'Verwandeln Sie Produktbeschreibungen in semantisches Gold. Auto-Keywords, Marktsignale, Wettbewerbsüberwachung und autonomes Wissensmanagement mit DeepSeek-Anreicherung.',
        pill: '10 Tools · DeepSeek · Auto-Brain',
      },
      {
        icon: '⚡',
        tag: 'Autonomie-Schicht',
        title: 'Ahauros SAG Agenten',
        tagline: 'Keine LLM-Aufrufe. Keine Halluzinationen.',
        body: 'Deterministische Agenten für Preisoptimierung, Nachfrageprognose, Lieferantenbewertung und Logistik. Reines Rechnen — kein probabilistisches Raten, keine Token-Kosten, kein Drift.',
        pill: '11 Tools · SAG · Deterministisch',
      },
    ],
    howTitle: 'In 3 Schritten einsatzbereit.',
    howSub: 'Kein lokaler Server, kein Docker, kein Konfigurationsaufwand.',
    steps: [
      { num: '01', title: 'Abonnieren', desc: 'Wählen Sie Ihren Plan und erhalten Sie Ihren API-Schlüssel sofort.' },
      { num: '02', title: 'Config hinzufügen', desc: 'Fügen Sie das JSON-Snippet in claude_desktop_config.json ein.' },
      { num: '03', title: '45 Tools nutzen', desc: 'Claude hat sofort Zugriff auf alle Tools.' },
    ],
    pricingTitle: 'Einfache Preise. Ernsthafte Tools.',
    pricingSub: 'Alle Pläne enthalten jedes Tool. Keine versteckten Gebühren.',
    plans: [
      { name: 'Agency', price: '€299', features: ['50.000 Aufrufe/Monat', 'Alle 45 Tools', 'Claude Desktop + Code', 'E-Mail-Support'], cta: 'Agency starten' },
      { name: 'Studio', price: '€599', features: ['200.000 Aufrufe/Monat', 'Alle 45 Tools', 'Priority-Support', 'Nutzungsanalyse'], cta: 'Studio starten', popular: true },
      { name: 'Enterprise', price: '€1.499', features: ['Unbegrenzte Aufrufe', 'Alle 45 Tools', 'SLA 99.9%', 'Dedizierter Support', 'Custom-Integrationen'], cta: 'Vertrieb kontaktieren' },
    ],
    liveLabel: 'Live',
    liveMeta: '45 Tools aktiv · NAP V3 · EdDSA-signiert · EU AI Act konform',
    trustText: 'Gebaut mit Anthropic-Technologie · NAP V3 Protokoll · EU AI Act konform · PayAi-X FZE',
  },
  pt: {
    badge1: 'Servidor MCP',
    badge2: '45 Ferramentas',
    badge3: 'Pronto Produção',
    heroTitle: 'Adicione 45 ferramentas IA Commerce',
    heroTitle2: 'ao Claude em 60 segundos.',
    heroSub: 'CatyAI MCP estende Claude Desktop e Claude Code com detecção de fraude, enriquecimento semântico, comércio Zero-Trust e inteligência de mercado em tempo real. Construído para agências e desenvolvedores.',
    heroCta: 'Assinar — a partir de €299/mês',
    heroCtaAlt: 'Ver Endpoint Live',
    heroNote: 'Funciona com Claude Desktop · Claude Code · Qualquer cliente MCP',
    toolsTitle: '45 Ferramentas. 4 Categorias.',
    toolsSub: 'Ferramentas prontas para produção para Trust, Comércio, Inteligência e Autonomia.',
    categories: [
      {
        icon: '🔐',
        tag: 'Camada Trust',
        title: 'Trust & Visibilidade',
        tagline: 'Verificação criptográfica para IA.',
        body: 'Torne os dados do seu negócio verificáveis por crawlers IA. Assinaturas EdDSA, endpoints JWKS e protocolos Zero-Trust que provam autenticidade para GPT, Gemini, Claude e Perplexity.',
        pill: '8 ferramentas · EdDSA · JWKS · NAP V3',
      },
      {
        icon: '🛒',
        tag: 'Camada Comércio',
        title: 'E-commerce & Fraude',
        tagline: 'Scoring fraude COD para CEE/MENA.',
        body: 'Detecção de fraude em tempo real para mercados de pagamento na entrega. Escudos de pedido, análise DNA comportamental e enriquecimento de catálogo que reduz chargebacks.',
        pill: '10 ferramentas · Fraud DNA · Order Shield',
      },
      {
        icon: '🧠',
        tag: 'Camada Inteligência',
        title: 'Semântico & Semiótico',
        tagline: 'Enriquecimento conteúdo 15 camadas.',
        body: 'Transforme descrições de produtos em ouro semântico. Auto-keywords, sinais de mercado, monitoramento de concorrentes e gestão autónoma de base de conhecimento com DeepSeek.',
        pill: '10 ferramentas · DeepSeek · Auto-Brain',
      },
      {
        icon: '⚡',
        tag: 'Camada Autonomia',
        title: 'Agentes Ahauros SAG',
        tagline: 'Zero chamadas LLM. Zero alucinações.',
        body: 'Agentes determinísticos para otimização de preços, previsão de demanda, avaliação de fornecedores e logística. Cálculo puro — sem adivinhação probabilística, sem custos de token.',
        pill: '11 ferramentas · SAG · Determinístico',
      },
    ],
    howTitle: 'Funcionando em 3 passos.',
    howSub: 'Sem servidor local, sem Docker, sem sobrecarga de configuração.',
    steps: [
      { num: '01', title: 'Assinar', desc: 'Escolha seu plano e receba sua chave API instantaneamente.' },
      { num: '02', title: 'Adicionar config', desc: 'Cole o snippet JSON em claude_desktop_config.json.' },
      { num: '03', title: 'Usar 45 ferramentas', desc: 'Claude tem acesso a todas as ferramentas imediatamente.' },
    ],
    pricingTitle: 'Preços Simples. Ferramentas Sérias.',
    pricingSub: 'Todos os planos incluem cada ferramenta. Sem taxas ocultas.',
    plans: [
      { name: 'Agency', price: '€299', features: ['50.000 chamadas/mês', 'Todas as 45 ferramentas', 'Claude Desktop + Code', 'Suporte email'], cta: 'Iniciar Agency' },
      { name: 'Studio', price: '€599', features: ['200.000 chamadas/mês', 'Todas as 45 ferramentas', 'Suporte prioritário', 'Analítica de uso'], cta: 'Iniciar Studio', popular: true },
      { name: 'Enterprise', price: '€1.499', features: ['Chamadas ilimitadas', 'Todas as 45 ferramentas', 'SLA 99.9%', 'Suporte dedicado', 'Integrações custom'], cta: 'Contactar Vendas' },
    ],
    liveLabel: 'Live',
    liveMeta: '45 ferramentas ativas · NAP V3 · Assinado EdDSA · Conforme EU AI Act',
    trustText: 'Construído com tecnologia Anthropic · Protocolo NAP V3 · Conforme EU AI Act · PayAi-X FZE',
  },
}

const PLAN_HREFS = {
  Agency: 'https://app.catyai.io/mcp/checkout?plan=mcp_agency',
  Studio: 'https://app.catyai.io/mcp/checkout?plan=mcp_studio',
  Enterprise: 'mailto:contact@catyai.io',
}

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "catyai": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://api.catyai.io/api/mcp"
      ],
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}`

const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CatyAI MCP Server',
  description: 'Extend Claude Desktop and Claude Code with 45 production tools: fraud detection, Zero-Trust commerce, semantic enrichment, and market intelligence.',
  url: 'https://catyai.io/mcp',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  offers: [
    { '@type': 'Offer', price: '299', priceCurrency: 'EUR', name: 'Agency' },
    { '@type': 'Offer', price: '599', priceCurrency: 'EUR', name: 'Studio' },
    { '@type': 'Offer', price: '1499', priceCurrency: 'EUR', name: 'Enterprise' },
  ],
  provider: { '@type': 'Organization', name: 'PayAi-X FZE', url: 'https://catyai.io' },
}

export default function McpPage() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && T[saved]) setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('catyai_lang', lang)
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText(CONFIG_SNIPPET).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const t = T[lang] || T.en

  return (
    <>
      <SEO
        title="CatyAI MCP Server — 45 AI Commerce Tools for Claude"
        description="Extend Claude Desktop and Claude Code with 45 production tools: fraud detection, Zero-Trust commerce, semantic enrichment, and market intelligence. Official Anthropic partner. From €299/month."
        canonical="https://catyai.io/mcp"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(SOFTWARE_SCHEMA)}</script>
      </Helmet>
      <style>{`
        .mcp-page { background: #010A1F; color: #f1f5f9; font-family: 'Inter', sans-serif; }

        /* Hero */
        .mcp-hero {
          min-height: 92vh;
          background: #010A1F;
          display: flex;
          align-items: center;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow: hidden;
        }
        .mcp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 65% 5%, rgba(99,102,241,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(200,161,101,0.09) 0%, transparent 60%);
          pointer-events: none;
        }
        .mcp-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .mcp-badge-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.8rem; }
        .mcp-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.28);
          color: #818cf8;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
        }
        .mcp-badge-gold {
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.28);
          color: #C8A165;
        }

        .mcp-hero-title {
          font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }
        .mcp-hero-title span { color: #818cf8; }
        .mcp-hero-sub {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #94a3b8;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .mcp-hero-note {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 1.2rem;
        }
        .mcp-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .mcp-cta-primary {
          background: #818cf8;
          color: #010A1F;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mcp-cta-primary:hover { background: #a5b4fc; }
        .mcp-cta-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.18);
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .mcp-cta-secondary:hover { border-color: #818cf8; background: rgba(99,102,241,0.06); }

        /* Code block */
        .mcp-code-block {
          background: #020C1B;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
        }
        .mcp-code-header {
          background: rgba(255,255,255,0.04);
          padding: 0.75rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mcp-code-dots { display: flex; gap: 0.4rem; }
        .mcp-code-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mcp-code-title {
          font-family: monospace;
          font-size: 0.72rem;
          color: #475569;
          letter-spacing: 0.08em;
        }
        .mcp-copy-btn {
          background: rgba(129,140,248,0.12);
          border: 1px solid rgba(129,140,248,0.25);
          color: #818cf8;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.04em;
        }
        .mcp-copy-btn:hover { background: rgba(129,140,248,0.22); }
        .mcp-code-body {
          padding: 1.5rem 1.4rem;
          font-family: 'Courier New', monospace;
          font-size: 0.78rem;
          line-height: 1.8;
          color: #94a3b8;
          white-space: pre;
          overflow-x: auto;
        }

        /* Categories */
        .mcp-tools { padding: 6rem 1.5rem; background: #010A1F; }
        .mcp-section-inner { max-width: 1200px; margin: 0 auto; }
        .mcp-section-title {
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.025em;
          color: #f1f5f9;
          margin-bottom: 0.75rem;
        }
        .mcp-section-sub {
          font-size: 1rem;
          color: #64748b;
          margin-bottom: 3.5rem;
          font-weight: 300;
        }
        .mcp-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        /* Category Card (GeoGateway style) */
        .mcp-card {
          position: relative;
          background: linear-gradient(145deg, rgba(10,27,61,0.6) 0%, rgba(1,10,31,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(12px);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }
        .mcp-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(129,140,248,0.35), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .mcp-card:hover {
          border-color: rgba(129,140,248,0.35);
          transform: translateY(-3px);
          box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7), 0 0 40px -10px rgba(129,140,248,0.12);
        }
        .mcp-card:hover::before { opacity: 1; }

        .mcp-card-icon { font-size: 2rem; margin-bottom: 0.75rem; display: block; }
        .mcp-card-tag {
          display: inline-flex;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          background: rgba(129,140,248,0.08);
          border: 1px solid rgba(129,140,248,0.2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #818cf8;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .mcp-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 0.5rem;
        }
        .mcp-card-tagline {
          font-size: 0.95rem;
          font-weight: 500;
          color: #818cf8;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .mcp-card-body {
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .mcp-card-pill {
          display: inline-flex;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          background: rgba(129,140,248,0.05);
          border: 1px solid rgba(129,140,248,0.15);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #a5b4fc;
          line-height: 1.5;
        }

        /* How It Works */
        .mcp-how {
          padding: 6rem 1.5rem;
          background: #030D26;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .mcp-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-top: 3.5rem;
        }
        .mcp-step { display: flex; flex-direction: column; gap: 1rem; }
        .mcp-step-num {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: rgba(129,140,248,0.18);
          line-height: 1;
        }
        .mcp-step-title { font-weight: 700; font-size: 1.1rem; color: #e2e8f0; }
        .mcp-step-desc { font-size: 0.9rem; color: #64748b; line-height: 1.65; font-weight: 300; }

        /* Pricing */
        .mcp-pricing {
          padding: 6rem 1.5rem;
          background: #010A1F;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .mcp-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3.5rem;
        }
        .mcp-plan {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          transition: border-color 0.2s;
        }
        .mcp-plan:hover { border-color: rgba(129,140,248,0.25); }
        .mcp-plan-popular {
          border-color: rgba(129,140,248,0.35);
          background: rgba(99,102,241,0.06);
        }
        .mcp-popular-badge {
          position: absolute;
          top: -0.7rem;
          left: 50%;
          transform: translateX(-50%);
          background: #818cf8;
          color: #010A1F;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.2rem 0.9rem;
          border-radius: 100px;
          white-space: nowrap;
        }
        .mcp-plan-name {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .mcp-plan-price {
          font-weight: 800;
          font-size: 2.4rem;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          line-height: 1;
        }
        .mcp-plan-period {
          font-size: 0.85rem;
          color: #475569;
          font-weight: 400;
          margin-left: 0.2rem;
        }
        .mcp-plan-features {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .mcp-plan-features li {
          font-size: 0.88rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mcp-plan-features li::before {
          content: '✓';
          color: #818cf8;
          font-weight: 700;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .mcp-plan-cta {
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mcp-plan-cta-primary { background: #818cf8; color: #010A1F; }
        .mcp-plan-cta-primary:hover { background: #a5b4fc; }
        .mcp-plan-cta-outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #f1f5f9;
        }
        .mcp-plan-cta-outline:hover { border-color: #818cf8; background: rgba(99,102,241,0.06); }

        /* Live Status */
        .mcp-status {
          padding: 4rem 1.5rem;
          background: #030D26;
          border-top: 1px solid rgba(99,102,241,0.12);
          text-align: center;
        }
        .mcp-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #4ade80;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.55rem 1.2rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mcp-live-badge:hover { background: rgba(34,197,94,0.14); }
        .mcp-live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          animation: mcpPulse 1.8s ease-in-out infinite;
        }
        @keyframes mcpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .mcp-status-meta {
          font-size: 0.85rem;
          color: #475569;
          font-family: monospace;
          letter-spacing: 0.04em;
        }

        /* Footer Trust */
        .mcp-trust {
          padding: 4rem 1.5rem 2rem;
          background: #010A1F;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .mcp-trust-text {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .mcp-categories-grid { grid-template-columns: 1fr; }
          .mcp-pricing-grid { grid-template-columns: 1fr; max-width: 420px; }
          .mcp-steps { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 900px) {
          .mcp-hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .mcp-pricing-grid { max-width: 100%; grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .mcp-pricing-grid { grid-template-columns: 1fr; }
          .mcp-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="mcp-page">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        {/* Hero */}
        <section className="mcp-hero">
          <div className="mcp-hero-inner">
            <div>
              <div className="mcp-badge-row">
                <span className="mcp-badge">{t.badge1}</span>
                <span className="mcp-badge">{t.badge2}</span>
                <span className="mcp-badge mcp-badge-gold">{t.badge3}</span>
              </div>
              <h1 className="mcp-hero-title">
                {t.heroTitle}<br />
                <span>{t.heroTitle2}</span>
              </h1>
              <p className="mcp-hero-sub">{t.heroSub}</p>
              <div className="mcp-cta-row">
                <a href="https://app.catyai.io/mcp/checkout?plan=mcp_agency" className="mcp-cta-primary">
                  {t.heroCta}
                </a>
                <a
                  href="https://api.catyai.io/.well-known/ai-context"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mcp-cta-secondary"
                >
                  {t.heroCtaAlt} ↗
                </a>
              </div>
              <p className="mcp-hero-note">{t.heroNote}</p>
            </div>

            {/* Code block */}
            <div className="mcp-code-block">
              <div className="mcp-code-header">
                <div className="mcp-code-dots">
                  <div className="mcp-code-dot" style={{ background: '#ef4444' }} />
                  <div className="mcp-code-dot" style={{ background: '#f59e0b' }} />
                  <div className="mcp-code-dot" style={{ background: '#22c55e' }} />
                </div>
                <span className="mcp-code-title">claude_desktop_config.json</span>
                <button className="mcp-copy-btn" onClick={handleCopy} type="button">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="mcp-code-body">{CONFIG_SNIPPET}</div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mcp-tools">
          <div className="mcp-section-inner">
            <h2 className="mcp-section-title">{t.toolsTitle}</h2>
            <p className="mcp-section-sub">{t.toolsSub}</p>
            <div className="mcp-categories-grid">
              {t.categories.map((cat, i) => (
                <div key={i} className="mcp-card">
                  <span className="mcp-card-icon">{cat.icon}</span>
                  <span className="mcp-card-tag">{cat.tag}</span>
                  <div className="mcp-card-title">{cat.title}</div>
                  <div className="mcp-card-tagline">{cat.tagline}</div>
                  <div className="mcp-card-body">{cat.body}</div>
                  <span className="mcp-card-pill">{cat.pill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mcp-how">
          <div className="mcp-section-inner">
            <h2 className="mcp-section-title">{t.howTitle}</h2>
            <p className="mcp-section-sub">{t.howSub}</p>
            <div className="mcp-steps">
              {t.steps.map((step) => (
                <div key={step.num} className="mcp-step">
                  <div className="mcp-step-num">{step.num}</div>
                  <div className="mcp-step-title">{step.title}</div>
                  <div className="mcp-step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mcp-pricing">
          <div className="mcp-section-inner">
            <h2 className="mcp-section-title">{t.pricingTitle}</h2>
            <p className="mcp-section-sub">{t.pricingSub}</p>
            <div className="mcp-pricing-grid">
              {t.plans.map((plan) => (
                <div key={plan.name} className={`mcp-plan${plan.popular ? ' mcp-plan-popular' : ''}`}>
                  {plan.popular && <span className="mcp-popular-badge">Most Popular</span>}
                  <div className="mcp-plan-name">{plan.name}</div>
                  <div>
                    <span className="mcp-plan-price">{plan.price}</span>
                    <span className="mcp-plan-period">/month</span>
                  </div>
                  <ul className="mcp-plan-features">
                    {plan.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <a
                    href={PLAN_HREFS[plan.name]}
                    className={`mcp-plan-cta ${plan.popular ? 'mcp-plan-cta-primary' : 'mcp-plan-cta-outline'}`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Status */}
        <section className="mcp-status">
          <a
            href="https://api.catyai.io/api/mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="mcp-live-badge"
          >
            <span className="mcp-live-dot" />
            {t.liveLabel} · api.catyai.io/api/mcp
          </a>
          <div className="mcp-status-meta">{t.liveMeta}</div>
        </section>

        {/* Footer Trust */}
        <section className="mcp-trust">
          <p className="mcp-trust-text">{t.trustText}</p>
        </section>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
