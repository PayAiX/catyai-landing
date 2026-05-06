import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import SEO from '../components/SEO'

const T = {
  en: {
    badge: 'AI-Powered Commerce',
    heroTitle: 'E-commerce.',
    heroTitle2: 'The Zero-Click Storefront.',
    heroSub: 'Your inventory, natively indexed by ChatGPT and Gemini',
    heroBody: 'Transform your e-commerce store into an AI-readable storefront that ChatGPT, Gemini, and Perplexity can cite, recommend, and link directly to purchase. Capture buyers in the Zero-Click era before they ever open a browser tab.',
    heroCta: 'Sync Your Store',
    heroCtaAlt: 'See Live Demo',
    metrics: ['ChatGPT Native', 'Real-Time Sync', '0-Click Discovery', '9 AI Engines'],
    featuresTitle: 'The AI Commerce Stack',
    featuresSubtitle: 'Every layer optimized for discovery in the zero-click search era',
    features: [
      {
        n: '01',
        icon: '🔄',
        title: 'Live Inventory Sync',
        tag: 'Data Layer',
        tagline: 'Stock levels. Real-time. Everywhere.',
        body: 'Your inventory syncs to AI engines every 90 seconds — out-of-stock items are automatically de-prioritized in AI answers. No more AI recommending unavailable products to buyers ready to purchase.',
        pill: '90s Sync · Auto-deprioritize · Webhook-driven',
      },
      {
        n: '02',
        icon: '📦',
        title: 'AI Product Schema',
        tag: 'Structure Layer',
        tagline: 'Products AI can read, cite, and recommend.',
        body: 'Every product is auto-wrapped in Schema.org Product markup with price, availability, reviews, and category — the exact format ChatGPT Product Search reads natively, so your catalog becomes a first-class AI data source.',
        pill: 'Schema.org · Product · Offer · AggregateRating',
      },
      {
        n: '03',
        icon: '🎯',
        title: 'Zero-Click Discovery',
        tag: 'Visibility Layer',
        tagline: 'Discovered before the search begins.',
        body: "When a buyer asks ChatGPT \"best running shoes under €100\", your in-stock products appear directly in the answer — no ad spend, no click required. Pure AI-native visibility at the moment of intent.",
        pill: 'GPTBot · Gemini · PerplexityBot',
      },
      {
        n: '04',
        icon: '🛍️',
        title: 'ChatGPT Shopping Integration',
        tag: 'Commerce Layer',
        tagline: 'Native in the AI storefront.',
        body: "OpenAI's shopping plugin reads your /answer endpoint for real-time product data — price, stock, variants, reviews — served in the exact JSON-LD format OpenAI requires for native product cards inside ChatGPT.",
        pill: 'OpenAI Plugin · JSON-LD · Real-time',
      },
      {
        n: '05',
        icon: '📈',
        title: 'AI Conversion Analytics',
        tag: 'Intelligence Layer',
        tagline: 'See which AI engines drive purchases.',
        body: 'Track which AI crawler visited your catalog, which products were cited in AI answers, and which citations converted to sales — the first attribution model built for the AI era, not the click-based past.',
        pill: 'AI Attribution · Citation Tracking · Revenue',
      },
      {
        n: '06',
        icon: '🏪',
        title: 'Multi-Store Management',
        tag: 'Operations Layer',
        tagline: 'One platform. All your storefronts.',
        body: 'Manage AI visibility for multiple stores, brands, or markets from one dashboard — each store with its own AI product catalog, sync schedule, and GEO score. Built for agencies and enterprise retailers alike.',
        pill: 'Multi-store · Per-brand KB · Unified Dashboard',
      },
    ],
    statsTitle: 'The Zero-Click Reality',
    stats: [
      { value: '33%', label: 'of Google traffic gone in 2025' },
      { value: '0 clicks', label: 'buyers ask AI and buy directly' },
      { value: '€0', label: 'ad spend for AI-discovered sales' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Does CatyAI work with Shopify and WooCommerce?',
        a: 'Yes. CatyAI connects natively to Shopify, WooCommerce, PrestaShop, and any platform with a product API or feed. Setup takes under 10 minutes — install the plugin or paste your API key and the sync begins automatically.',
      },
      {
        q: 'How often does inventory sync to AI engines?',
        a: 'Inventory syncs every 90 seconds via webhook. When a product goes out of stock, it is automatically flagged and de-prioritized in AI answers within two sync cycles — so AI never recommends something your customer cannot buy.',
      },
      {
        q: 'How accurate are AI product recommendations?',
        a: 'Because CatyAI feeds AI engines structured, verified product data in real time, recommendations are drawn directly from your live catalog — not from cached or scraped data. Price, availability, and reviews are always current.',
      },
      {
        q: 'What does CatyAI E-commerce cost?',
        a: 'E-commerce AI is available on Growth and Enterprise plans. Pricing is based on catalog size and number of storefronts. Visit the Pricing page for details, or book a demo for a custom quote on large catalogs.',
      },
      {
        q: 'How long does it take to get started?',
        a: 'Most stores are fully synced and visible to AI engines within 24 hours of connecting. The /answer endpoint goes live immediately, Schema.org injection runs on first crawl, and your first GEO score appears in the dashboard within the hour.',
      },
    ],
    finalCta: 'Capture the Zero-Click Buyer',
    finalBody: 'While competitors lose sales to AI-generated answers that skip their store, you capture AI-native buyers at the exact moment they decide to purchase.',
    finalBtn: 'Connect Your Store',
    demoBtn: 'Book a Demo',
  },

  ro: {
    badge: 'Comerț Alimentat de AI',
    heroTitle: 'E-commerce.',
    heroTitle2: 'Vitrina Zero-Click.',
    heroSub: 'Inventarul tău, indexat nativ de ChatGPT și Gemini',
    heroBody: 'Transformă-ți magazinul e-commerce într-o vitrină citibilă de AI pe care ChatGPT, Gemini și Perplexity o pot cita, recomanda și lega direct la cumpărare. Captează cumpărători în era Zero-Click înainte să deschidă un tab de browser.',
    heroCta: 'Sincronizează Magazinul',
    heroCtaAlt: 'Vezi Demo Live',
    metrics: ['ChatGPT Nativ', 'Sincronizare Real-Time', 'Descoperire 0-Click', '9 Motoare AI'],
    featuresTitle: 'Stiva AI Commerce',
    featuresSubtitle: 'Fiecare strat optimizat pentru descoperire în era căutării zero-click',
    features: [
      {
        n: '01',
        icon: '🔄',
        title: 'Sincronizare Inventar Live',
        tag: 'Stratul Date',
        tagline: 'Niveluri de stoc. Real-time. Peste tot.',
        body: 'Inventarul tău se sincronizează cu motoarele AI la fiecare 90 de secunde — produsele epuizate sunt automat de-prioritizate în răspunsurile AI. Niciun AI nu va mai recomanda produse indisponibile cumpărătorilor gata să achiziționeze.',
        pill: 'Sincronizare 90s · Auto-deprioritizare · Webhook',
      },
      {
        n: '02',
        icon: '📦',
        title: 'Schema AI pentru Produse',
        tag: 'Stratul Structură',
        tagline: 'Produse pe care AI le poate citi, cita și recomanda.',
        body: 'Fiecare produs este automat împachetat în markup Schema.org Product cu preț, disponibilitate, recenzii și categorie — exact formatul pe care ChatGPT Product Search îl citește nativ, făcând catalogul tău o sursă de date AI de primă clasă.',
        pill: 'Schema.org · Product · Offer · AggregateRating',
      },
      {
        n: '03',
        icon: '🎯',
        title: 'Descoperire Zero-Click',
        tag: 'Stratul Vizibilitate',
        tagline: 'Descoperit înainte să înceapă căutarea.',
        body: 'Când un cumpărător întreabă ChatGPT „cele mai bune adidași sub 100 €", produsele tale în stoc apar direct în răspuns — fără cheltuieli publicitare, fără click necesar. Vizibilitate AI-nativă pură la momentul intenției.',
        pill: 'GPTBot · Gemini · PerplexityBot',
      },
      {
        n: '04',
        icon: '🛍️',
        title: 'Integrare ChatGPT Shopping',
        tag: 'Stratul Comerț',
        tagline: 'Nativ în vitrina AI.',
        body: 'Pluginul de shopping OpenAI citește endpoint-ul tău /answer pentru date de produs în timp real — preț, stoc, variante, recenzii — servite în formatul exact JSON-LD pe care OpenAI îl necesită pentru carduri native de produse în ChatGPT.',
        pill: 'Plugin OpenAI · JSON-LD · Real-time',
      },
      {
        n: '05',
        icon: '📈',
        title: 'Analiticã AI Conversii',
        tag: 'Stratul Inteligență',
        tagline: 'Vezi ce motoare AI generează achiziții.',
        body: 'Urmărește ce crawler AI ți-a vizitat catalogul, ce produse au fost citate în răspunsurile AI și ce citări s-au convertit în vânzări — primul model de atribuire construit pentru era AI, nu pentru trecutul bazat pe clickuri.',
        pill: 'Atribuire AI · Tracking Citări · Venituri',
      },
      {
        n: '06',
        icon: '🏪',
        title: 'Management Multi-Magazine',
        tag: 'Stratul Operațiuni',
        tagline: 'O platformă. Toate vitrinele tale.',
        body: 'Gestionează vizibilitatea AI pentru mai multe magazine, branduri sau piețe dintr-un singur dashboard — fiecare magazin cu propriul catalog AI, program de sincronizare și scor GEO. Construit pentru agenții și retaileri enterprise.',
        pill: 'Multi-magazin · KB per brand · Dashboard Unificat',
      },
    ],
    statsTitle: 'Realitatea Zero-Click',
    stats: [
      { value: '33%', label: 'din traficul Google dispărut în 2025' },
      { value: '0 clickuri', label: 'cumpărătorii întreabă AI și cumpără direct' },
      { value: '€0', label: 'cheltuieli publicitare pentru vânzări descoperite AI' },
    ],
    faqTitle: 'Întrebări Frecvente',
    faqs: [
      {
        q: 'CatyAI funcționează cu Shopify și WooCommerce?',
        a: 'Da. CatyAI se conectează nativ la Shopify, WooCommerce, PrestaShop și orice platformă cu API de produs sau feed. Configurarea durează sub 10 minute — instalează pluginul sau lipește cheia API și sincronizarea începe automat.',
      },
      {
        q: 'Cât de des se sincronizează inventarul cu motoarele AI?',
        a: 'Inventarul se sincronizează la fiecare 90 de secunde prin webhook. Când un produs se epuizează, este automat marcat și de-prioritizat în răspunsurile AI în două cicluri de sincronizare — deci AI nu va recomanda niciodată ceva ce clientul tău nu poate cumpăra.',
      },
      {
        q: 'Cât de precise sunt recomandările AI pentru produse?',
        a: 'Deoarece CatyAI alimentează motoarele AI cu date structurate, verificate în timp real, recomandările sunt extrase direct din catalogul tău live — nu din date cache sau scraped. Prețul, disponibilitatea și recenziile sunt mereu actuale.',
      },
      {
        q: 'Cât costă CatyAI E-commerce?',
        a: 'E-commerce AI este disponibil în planurile Growth și Enterprise. Prețul se bazează pe dimensiunea catalogului și numărul de magazine. Vizitează pagina de Prețuri pentru detalii sau rezervă un demo pentru o ofertă personalizată pentru cataloage mari.',
      },
      {
        q: 'Cât durează să începi?',
        a: 'Majoritatea magazinelor sunt complet sincronizate și vizibile motoarelor AI în 24 de ore de la conectare. Endpoint-ul /answer intră live imediat, injectarea Schema.org rulează la primul crawl, iar primul scor GEO apare în dashboard în decurs de o oră.',
      },
    ],
    finalCta: 'Captează Cumpărătorul Zero-Click',
    finalBody: 'În timp ce concurenții pierd vânzări la răspunsuri AI care le sar magazinul, tu captezi cumpărători AI-nativi exact în momentul în care decid să achiziționeze.',
    finalBtn: 'Conectează Magazinul',
    demoBtn: 'Rezervă Demo',
  },

  fr: {
    badge: 'Commerce Propulsé par IA',
    heroTitle: 'E-commerce.',
    heroTitle2: 'La Vitrine Zéro-Clic.',
    heroSub: 'Votre inventaire, indexé nativement par ChatGPT et Gemini',
    heroBody: "Transformez votre boutique e-commerce en vitrine lisible par IA que ChatGPT, Gemini et Perplexity peuvent citer, recommander et lier directement à l'achat. Captez les acheteurs à l'ère Zéro-Clic avant même qu'ils ouvrent un onglet de navigateur.",
    heroCta: 'Synchroniser la Boutique',
    heroCtaAlt: 'Voir la Démo',
    metrics: ['ChatGPT Natif', 'Sync Temps Réel', 'Découverte 0-Clic', '9 Moteurs IA'],
    featuresTitle: 'La Stack AI Commerce',
    featuresSubtitle: "Chaque couche optimisée pour la découverte à l'ère de la recherche zéro-clic",
    features: [
      {
        n: '01',
        icon: '🔄',
        title: "Sync d'Inventaire Live",
        tag: 'Couche Données',
        tagline: 'Niveaux de stock. Temps réel. Partout.',
        body: "Votre inventaire se synchronise avec les moteurs IA toutes les 90 secondes — les articles en rupture de stock sont automatiquement dé-priorisés dans les réponses IA. Plus jamais d'IA recommandant des produits indisponibles.",
        pill: 'Sync 90s · Auto-déprioritisation · Webhook',
      },
      {
        n: '02',
        icon: '📦',
        title: 'Schéma Produit IA',
        tag: 'Couche Structure',
        tagline: "Des produits que l'IA peut lire, citer et recommander.",
        body: "Chaque produit est automatiquement encapsulé dans le balisage Schema.org Product avec prix, disponibilité, avis et catégorie — le format exact que ChatGPT Product Search lit nativement, faisant de votre catalogue une source de données IA de premier rang.",
        pill: 'Schema.org · Product · Offer · AggregateRating',
      },
      {
        n: '03',
        icon: '🎯',
        title: 'Découverte Zéro-Clic',
        tag: 'Couche Visibilité',
        tagline: 'Découvert avant que la recherche commence.',
        body: "Quand un acheteur demande à ChatGPT \"meilleures chaussures de course à moins de 100 €\", vos produits en stock apparaissent directement dans la réponse — sans dépenses publicitaires, sans clic requis. Visibilité IA-native pure au moment de l'intention.",
        pill: 'GPTBot · Gemini · PerplexityBot',
      },
      {
        n: '04',
        icon: '🛍️',
        title: 'Intégration ChatGPT Shopping',
        tag: 'Couche Commerce',
        tagline: 'Natif dans la vitrine IA.',
        body: "Le plugin shopping d'OpenAI lit votre endpoint /answer pour des données produit en temps réel — prix, stock, variantes, avis — servies dans le format JSON-LD exact qu'OpenAI requiert pour les cartes produit natives dans ChatGPT.",
        pill: 'Plugin OpenAI · JSON-LD · Temps réel',
      },
      {
        n: '05',
        icon: '📈',
        title: 'Analytique Conversions IA',
        tag: 'Couche Intelligence',
        tagline: "Voyez quels moteurs IA génèrent des achats.",
        body: "Suivez quel crawler IA a visité votre catalogue, quels produits ont été cités dans les réponses IA et quelles citations ont converti en ventes — le premier modèle d'attribution construit pour l'ère IA, pas pour le passé basé sur les clics.",
        pill: 'Attribution IA · Suivi Citations · Revenus',
      },
      {
        n: '06',
        icon: '🏪',
        title: 'Gestion Multi-Boutiques',
        tag: 'Couche Opérations',
        tagline: 'Une plateforme. Toutes vos vitrines.',
        body: "Gérez la visibilité IA pour plusieurs boutiques, marques ou marchés depuis un seul tableau de bord — chaque boutique avec son propre catalogue IA, planning de sync et score GEO. Conçu pour les agences et les retailers enterprise.",
        pill: 'Multi-boutique · KB par marque · Dashboard unifié',
      },
    ],
    statsTitle: 'La Réalité Zéro-Clic',
    stats: [
      { value: '33%', label: 'du trafic Google disparu en 2025' },
      { value: '0 clic', label: "les acheteurs demandent à l'IA et achètent directement" },
      { value: '€0', label: 'dépense pub pour les ventes découvertes par IA' },
    ],
    faqTitle: 'Questions Fréquentes',
    faqs: [
      {
        q: 'CatyAI fonctionne-t-il avec Shopify et WooCommerce ?',
        a: "Oui. CatyAI se connecte nativement à Shopify, WooCommerce, PrestaShop et toute plateforme avec une API produit ou un flux. La configuration prend moins de 10 minutes — installez le plugin ou collez votre clé API et la synchronisation commence automatiquement.",
      },
      {
        q: "À quelle fréquence l'inventaire se synchronise-t-il avec les moteurs IA ?",
        a: "L'inventaire se synchronise toutes les 90 secondes via webhook. Quand un produit est en rupture, il est automatiquement signalé et dé-priorisé dans les réponses IA en deux cycles de sync — l'IA ne recommandera jamais quelque chose que votre client ne peut pas acheter.",
      },
      {
        q: 'Quelle est la précision des recommandations produit IA ?',
        a: "Parce que CatyAI alimente les moteurs IA avec des données structurées et vérifiées en temps réel, les recommandations sont tirées directement de votre catalogue live — pas de données mises en cache ou scrapées. Prix, disponibilité et avis sont toujours à jour.",
      },
      {
        q: 'Quel est le tarif de CatyAI E-commerce ?',
        a: "E-commerce AI est disponible dans les plans Growth et Enterprise. La tarification est basée sur la taille du catalogue et le nombre de boutiques. Visitez la page Tarifs pour les détails, ou réservez une démo pour un devis personnalisé pour les grands catalogues.",
      },
      {
        q: 'Combien de temps faut-il pour démarrer ?',
        a: "La plupart des boutiques sont entièrement synchronisées et visibles par les moteurs IA dans les 24 heures suivant la connexion. L'endpoint /answer est opérationnel immédiatement, l'injection Schema.org s'exécute au premier crawl et votre premier score GEO apparaît dans le tableau de bord dans l'heure.",
      },
    ],
    finalCta: "Captez l'Acheteur Zéro-Clic",
    finalBody: "Pendant que vos concurrents perdent des ventes à cause de réponses IA qui sautent leur boutique, vous captez des acheteurs IA-natifs au moment exact où ils décident d'acheter.",
    finalBtn: 'Connecter la Boutique',
    demoBtn: 'Réserver une Démo',
  },

  de: {
    badge: 'KI-gestützter Handel',
    heroTitle: 'E-Commerce.',
    heroTitle2: 'Die Zero-Click-Storefront.',
    heroSub: 'Ihr Inventar, nativ indexiert von ChatGPT und Gemini',
    heroBody: 'Verwandeln Sie Ihren Online-Shop in eine KI-lesbare Storefront, die ChatGPT, Gemini und Perplexity zitieren, empfehlen und direkt zum Kauf verlinken können. Gewinnen Sie Käufer im Zero-Click-Zeitalter, bevor sie überhaupt einen Browser-Tab öffnen.',
    heroCta: 'Shop Synchronisieren',
    heroCtaAlt: 'Live-Demo Ansehen',
    metrics: ['ChatGPT Nativ', 'Echtzeit-Sync', '0-Click Discovery', '9 KI-Engines'],
    featuresTitle: 'Der KI Commerce Stack',
    featuresSubtitle: 'Jede Ebene optimiert für Entdeckung im Zero-Click-Suchzeitalter',
    features: [
      {
        n: '01',
        icon: '🔄',
        title: 'Live Inventar-Sync',
        tag: 'Daten-Ebene',
        tagline: 'Lagerbestände. Echtzeit. Überall.',
        body: 'Ihr Inventar synchronisiert sich alle 90 Sekunden mit KI-Engines — nicht vorrätige Artikel werden in KI-Antworten automatisch de-priorisiert. Keine KI empfiehlt mehr nicht verfügbare Produkte an kaufbereite Käufer.',
        pill: '90s Sync · Auto-De-Priorisierung · Webhook',
      },
      {
        n: '02',
        icon: '📦',
        title: 'KI-Produktschema',
        tag: 'Struktur-Ebene',
        tagline: 'Produkte, die KI lesen, zitieren und empfehlen kann.',
        body: 'Jedes Produkt wird automatisch in Schema.org Product-Markup eingebettet mit Preis, Verfügbarkeit, Bewertungen und Kategorie — das genaue Format, das ChatGPT Product Search nativ liest und Ihren Katalog zur erstklassigen KI-Datenquelle macht.',
        pill: 'Schema.org · Product · Offer · AggregateRating',
      },
      {
        n: '03',
        icon: '🎯',
        title: 'Zero-Click Discovery',
        tag: 'Sichtbarkeits-Ebene',
        tagline: 'Entdeckt, bevor die Suche beginnt.',
        body: 'Wenn ein Käufer ChatGPT fragt „beste Laufschuhe unter 100 €", erscheinen Ihre vorrätigen Produkte direkt in der Antwort — ohne Werbebudget, ohne erforderlichen Klick. Pure KI-native Sichtbarkeit im Moment der Kaufabsicht.',
        pill: 'GPTBot · Gemini · PerplexityBot',
      },
      {
        n: '04',
        icon: '🛍️',
        title: 'ChatGPT Shopping-Integration',
        tag: 'Commerce-Ebene',
        tagline: 'Nativ in der KI-Storefront.',
        body: "OpenAIs Shopping-Plugin liest Ihren /answer-Endpunkt für Echtzeit-Produktdaten — Preis, Bestand, Varianten, Bewertungen — im exakten JSON-LD-Format, das OpenAI für native Produktkarten in ChatGPT benötigt.",
        pill: 'OpenAI Plugin · JSON-LD · Echtzeit',
      },
      {
        n: '05',
        icon: '📈',
        title: 'KI-Konversions-Analytics',
        tag: 'Intelligenz-Ebene',
        tagline: 'Sehen Sie, welche KI-Engines Käufe antreiben.',
        body: 'Verfolgen Sie, welcher KI-Crawler Ihren Katalog besucht hat, welche Produkte in KI-Antworten zitiert wurden und welche Zitierungen zu Verkäufen konvertierten — das erste Attributionsmodell für das KI-Zeitalter, nicht die klickbasierte Vergangenheit.',
        pill: 'KI-Attribution · Zitierungs-Tracking · Umsatz',
      },
      {
        n: '06',
        icon: '🏪',
        title: 'Multi-Shop-Verwaltung',
        tag: 'Betriebs-Ebene',
        tagline: 'Eine Plattform. Alle Ihre Storefronts.',
        body: 'Verwalten Sie KI-Sichtbarkeit für mehrere Shops, Marken oder Märkte aus einem Dashboard — jeder Shop mit eigenem KI-Produktkatalog, Sync-Zeitplan und GEO-Score. Gebaut für Agenturen und Enterprise-Händler gleichermaßen.',
        pill: 'Multi-Shop · Marken-KB · Unified Dashboard',
      },
    ],
    statsTitle: 'Die Zero-Click-Realität',
    stats: [
      { value: '33%', label: 'des Google-Traffics verschwunden in 2025' },
      { value: '0 Klicks', label: 'Käufer fragen KI und kaufen direkt' },
      { value: '€0', label: 'Werbeausgaben für KI-entdeckte Verkäufe' },
    ],
    faqTitle: 'Häufig Gestellte Fragen',
    faqs: [
      {
        q: 'Funktioniert CatyAI mit Shopify und WooCommerce?',
        a: 'Ja. CatyAI verbindet sich nativ mit Shopify, WooCommerce, PrestaShop und jeder Plattform mit einer Produkt-API oder einem Feed. Die Einrichtung dauert unter 10 Minuten — installieren Sie das Plugin oder fügen Sie Ihren API-Schlüssel ein und die Synchronisation beginnt automatisch.',
      },
      {
        q: 'Wie oft synchronisiert sich das Inventar mit KI-Engines?',
        a: 'Das Inventar synchronisiert sich alle 90 Sekunden per Webhook. Wenn ein Produkt vergriffen ist, wird es automatisch markiert und in KI-Antworten innerhalb von zwei Sync-Zyklen de-priorisiert — KI empfiehlt nie etwas, das Ihr Kunde nicht kaufen kann.',
      },
      {
        q: 'Wie genau sind KI-Produktempfehlungen?',
        a: 'Da CatyAI KI-Engines mit strukturierten, verifizierten Echtzeitdaten versorgt, werden Empfehlungen direkt aus Ihrem Live-Katalog gezogen — nicht aus gecachten oder gescrapten Daten. Preis, Verfügbarkeit und Bewertungen sind immer aktuell.',
      },
      {
        q: 'Was kostet CatyAI E-Commerce?',
        a: 'E-Commerce AI ist in den Plänen Growth und Enterprise verfügbar. Die Preisgestaltung basiert auf Kataloggröße und Anzahl der Shops. Besuchen Sie die Preisseite für Details oder buchen Sie eine Demo für ein individuelles Angebot bei großen Katalogen.',
      },
      {
        q: 'Wie lange dauert der Start?',
        a: 'Die meisten Shops sind innerhalb von 24 Stunden nach der Verbindung vollständig synchronisiert und für KI-Engines sichtbar. Der /answer-Endpunkt geht sofort live, Schema.org-Injektion läuft beim ersten Crawl und Ihr erster GEO-Score erscheint innerhalb einer Stunde im Dashboard.',
      },
    ],
    finalCta: 'Gewinnen Sie den Zero-Click-Käufer',
    finalBody: 'Während Konkurrenten Verkäufe an KI-Antworten verlieren, die ihren Shop überspringen, gewinnen Sie KI-native Käufer genau in dem Moment, in dem sie sich zum Kauf entscheiden.',
    finalBtn: 'Shop Verbinden',
    demoBtn: 'Demo Buchen',
  },

  es: {
    badge: 'Comercio Potenciado por IA',
    heroTitle: 'E-commerce.',
    heroTitle2: 'La Tienda Cero-Clics.',
    heroSub: 'Tu inventario, indexado nativamente por ChatGPT y Gemini',
    heroBody: 'Transforma tu tienda e-commerce en una vitrina legible por IA que ChatGPT, Gemini y Perplexity puedan citar, recomendar y enlazar directamente a la compra. Captura compradores en la era Cero-Clics antes de que abran una pestaña del navegador.',
    heroCta: 'Sincronizar Tienda',
    heroCtaAlt: 'Ver Demo en Vivo',
    metrics: ['ChatGPT Nativo', 'Sync Tiempo Real', 'Descubrimiento 0-Clics', '9 Motores IA'],
    featuresTitle: 'El Stack AI Commerce',
    featuresSubtitle: 'Cada capa optimizada para el descubrimiento en la era de búsqueda cero-clics',
    features: [
      {
        n: '01',
        icon: '🔄',
        title: 'Sync de Inventario en Vivo',
        tag: 'Capa Datos',
        tagline: 'Niveles de stock. Tiempo real. En todas partes.',
        body: 'Tu inventario se sincroniza con los motores IA cada 90 segundos — los artículos agotados se de-priorizan automáticamente en las respuestas IA. La IA nunca volverá a recomendar productos no disponibles a compradores listos para comprar.',
        pill: 'Sync 90s · Auto-deprioritización · Webhook',
      },
      {
        n: '02',
        icon: '📦',
        title: 'Esquema Producto IA',
        tag: 'Capa Estructura',
        tagline: 'Productos que la IA puede leer, citar y recomendar.',
        body: 'Cada producto se envuelve automáticamente en marcado Schema.org Product con precio, disponibilidad, reseñas y categoría — el formato exacto que ChatGPT Product Search lee nativamente, convirtiendo tu catálogo en una fuente de datos IA de primera clase.',
        pill: 'Schema.org · Product · Offer · AggregateRating',
      },
      {
        n: '03',
        icon: '🎯',
        title: 'Descubrimiento Cero-Clics',
        tag: 'Capa Visibilidad',
        tagline: 'Descubierto antes de que comience la búsqueda.',
        body: 'Cuando un comprador pregunta a ChatGPT "mejores zapatillas de running por menos de 100 €", tus productos en stock aparecen directamente en la respuesta — sin gasto publicitario, sin clic requerido. Visibilidad IA-nativa pura en el momento de la intención.',
        pill: 'GPTBot · Gemini · PerplexityBot',
      },
      {
        n: '04',
        icon: '🛍️',
        title: 'Integración ChatGPT Shopping',
        tag: 'Capa Comercio',
        tagline: 'Nativo en la vitrina IA.',
        body: 'El plugin de shopping de OpenAI lee tu endpoint /answer para datos de producto en tiempo real — precio, stock, variantes, reseñas — servidos en el formato JSON-LD exacto que OpenAI requiere para tarjetas de producto nativas dentro de ChatGPT.',
        pill: 'Plugin OpenAI · JSON-LD · Tiempo real',
      },
      {
        n: '05',
        icon: '📈',
        title: 'Analítica de Conversiones IA',
        tag: 'Capa Inteligencia',
        tagline: 'Ve qué motores IA generan compras.',
        body: 'Rastrea qué crawler IA visitó tu catálogo, qué productos fueron citados en respuestas IA y qué citas convirtieron en ventas — el primer modelo de atribución construido para la era IA, no para el pasado basado en clics.',
        pill: 'Atribución IA · Seguimiento Citas · Ingresos',
      },
      {
        n: '06',
        icon: '🏪',
        title: 'Gestión Multi-Tienda',
        tag: 'Capa Operaciones',
        tagline: 'Una plataforma. Todas tus tiendas.',
        body: 'Gestiona la visibilidad IA para múltiples tiendas, marcas o mercados desde un solo dashboard — cada tienda con su propio catálogo IA, calendario de sync y puntuación GEO. Construido para agencias y retailers enterprise por igual.',
        pill: 'Multi-tienda · KB por marca · Dashboard Unificado',
      },
    ],
    statsTitle: 'La Realidad Cero-Clics',
    stats: [
      { value: '33%', label: 'del tráfico de Google desaparecido en 2025' },
      { value: '0 clics', label: 'los compradores preguntan a IA y compran directamente' },
      { value: '€0', label: 'gasto publicitario para ventas descubiertas por IA' },
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿CatyAI funciona con Shopify y WooCommerce?',
        a: 'Sí. CatyAI se conecta nativamente a Shopify, WooCommerce, PrestaShop y cualquier plataforma con una API de producto o feed. La configuración toma menos de 10 minutos — instala el plugin o pega tu clave API y la sincronización comienza automáticamente.',
      },
      {
        q: '¿Con qué frecuencia se sincroniza el inventario con los motores IA?',
        a: 'El inventario se sincroniza cada 90 segundos vía webhook. Cuando un producto se agota, se marca automáticamente y se de-prioriza en las respuestas IA en dos ciclos de sync — la IA nunca recomendará algo que tu cliente no pueda comprar.',
      },
      {
        q: '¿Qué tan precisas son las recomendaciones de producto IA?',
        a: 'Dado que CatyAI alimenta los motores IA con datos estructurados y verificados en tiempo real, las recomendaciones se extraen directamente de tu catálogo en vivo — no de datos cacheados o scrapeados. Precio, disponibilidad y reseñas siempre están actualizados.',
      },
      {
        q: '¿Cuánto cuesta CatyAI E-commerce?',
        a: 'E-commerce AI está disponible en los planes Growth y Enterprise. El precio se basa en el tamaño del catálogo y el número de tiendas. Visita la página de Precios para detalles, o reserva una demo para un presupuesto personalizado en catálogos grandes.',
      },
      {
        q: '¿Cuánto tiempo lleva comenzar?',
        a: 'La mayoría de tiendas están completamente sincronizadas y visibles para los motores IA dentro de las 24 horas de conexión. El endpoint /answer entra en vivo inmediatamente, la inyección Schema.org se ejecuta en el primer crawl y tu primera puntuación GEO aparece en el dashboard en menos de una hora.',
      },
    ],
    finalCta: 'Captura al Comprador Cero-Clics',
    finalBody: 'Mientras los competidores pierden ventas ante respuestas IA que se saltan su tienda, tú capturas compradores IA-nativos en el momento exacto en que deciden comprar.',
    finalBtn: 'Conectar Tienda',
    demoBtn: 'Reservar Demo',
  },
}

export default function EcommercePage() {
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
          --ecom-gold: #C8A165;
          --ecom-gold-bright: #D4B57A;
          --ecom-gold-dim: rgba(200,161,101,0.08);
          --ecom-navy: #010A1F;
        }

        /* ── Hero scene ── */
        .ecom-hero-section::before {
          content: '';
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 1100px;
          height: 900px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(200,161,101,0.20) 0%, rgba(200,161,101,0.09) 35%, rgba(14,165,233,0.05) 55%, transparent 72%);
          pointer-events: none;
          z-index: 0;
          animation: ecom-bg-pulse 8s ease-in-out infinite;
        }

        .ecom-hero-section::after {
          content: '';
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(14,165,233,0.12) 0%, rgba(200,161,101,0.06) 45%, transparent 72%);
          pointer-events: none;
          z-index: 0;
          animation: ecom-bg-pulse 6s ease-in-out infinite reverse;
        }

        @keyframes ecom-bg-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }

        .ecom-hero-scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          perspective: 800px;
        }

        .ecom-cube {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 1px solid rgba(200,161,101,0.30);
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(10,27,61,0.5) 0%, rgba(200,161,101,0.08) 100%);
          box-shadow: 0 0 24px rgba(200,161,101,0.15), inset 0 0 12px rgba(200,161,101,0.04);
        }

        .ecom-cube:nth-child(1) {
          top: 30%;
          left: 25%;
          animation: ecom-float 6s ease-in-out infinite;
        }
        .ecom-cube:nth-child(2) {
          top: 45%;
          left: 55%;
          width: 110px;
          height: 110px;
          border-color: rgba(200,161,101,0.35);
          box-shadow: 0 0 36px rgba(200,161,101,0.22), inset 0 0 18px rgba(200,161,101,0.06);
          animation: ecom-float 8s ease-in-out infinite 1s;
        }
        .ecom-cube:nth-child(3) {
          top: 20%;
          left: 65%;
          width: 60px;
          height: 60px;
          border-color: rgba(14,165,233,0.35);
          box-shadow: 0 0 20px rgba(14,165,233,0.18);
          animation: ecom-float 7s ease-in-out infinite 2s;
        }
        .ecom-cube:nth-child(4) {
          top: 60%;
          left: 35%;
          width: 75px;
          height: 75px;
          animation: ecom-float 9s ease-in-out infinite 0.5s;
        }
        .ecom-cube:nth-child(5) {
          top: 35%;
          left: 75%;
          width: 55px;
          height: 55px;
          border-color: rgba(14,165,233,0.25);
          box-shadow: 0 0 18px rgba(14,165,233,0.14);
          animation: ecom-float 5s ease-in-out infinite 1.5s;
        }

        @keyframes ecom-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-20px) rotate(5deg); }
          66%       { transform: translateY(-10px) rotate(-3deg); }
        }

        .ecom-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(200,161,101,0.7), rgba(200,161,101,1.0), rgba(200,161,101,0.7), transparent);
          box-shadow: 0 0 30px rgba(200,161,101,0.6), 0 0 60px rgba(200,161,101,0.25);
          animation: ecom-scan 4s ease-in-out infinite;
        }

        @keyframes ecom-scan {
          0%   { top: 15%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 85%; opacity: 0; }
        }

        /* ── Badge ── */
        .ecom-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          background: rgba(200,161,101,0.1);
          border: 1px solid rgba(200,161,101,0.3);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #C8A165;
        }

        /* ── Cards ── */
        .ecom-card {
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
        .ecom-card::before {
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
        .ecom-card::after {
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
        .ecom-card:hover {
          border-color: rgba(200,161,101,0.35);
          transform: translateY(-3px);
          box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7), 0 0 40px -10px rgba(200,161,101,0.12);
        }
        .ecom-card:hover::before { opacity: 1; }
        .ecom-card:hover::after  { opacity: 1; filter: blur(36px); }

        .ecom-card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(200,161,101,0.5);
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .ecom-card-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
          display: block;
        }
        .ecom-card-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          background: rgba(200,161,101,0.08);
          border: 1px solid rgba(200,161,101,0.2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #C8A165;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .ecom-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 0.5rem;
          font-family: 'Syne', sans-serif;
        }
        .ecom-card-tagline {
          font-size: 0.95rem;
          font-weight: 500;
          color: #C8A165;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .ecom-card-body {
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .ecom-card-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          background: rgba(200,161,101,0.05);
          border: 1px solid rgba(200,161,101,0.15);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #D4B57A;
          line-height: 1.5;
        }

        /* ── Stats ── */
        .ecom-stat-card {
          background: rgba(10,27,61,0.4);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: border-color 0.25s, transform 0.25s;
        }
        .ecom-stat-card:hover {
          border-color: rgba(200,161,101,0.3);
          transform: translateY(-2px);
        }

        /* ── FAQ ── */
        .ecom-faq-item {
          background: rgba(10,27,61,0.35);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s;
          cursor: pointer;
        }
        .ecom-faq-item:hover { border-color: rgba(200,161,101,0.25); }
        .ecom-faq-item.open  { border-color: rgba(200,161,101,0.3); }
        .ecom-faq-q {
          padding: 1.2rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 0.95rem;
          color: #f8fafc;
          user-select: none;
        }
        .ecom-faq-a {
          padding: 0 1.5rem 1.2rem;
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.65;
        }
        .ecom-faq-chevron {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-left: 1rem;
          transition: transform 0.25s;
          stroke: #64748b;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .ecom-faq-item.open .ecom-faq-chevron {
          transform: rotate(180deg);
          stroke: #C8A165;
        }

        /* ── Grid bg ── */
        .ecom-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(200,161,101,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,161,101,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%);
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .ecom-card { padding: 1.5rem; }
          .ecom-card-title { font-size: 1rem; }
          .ecom-cube { display: none; }
          .ecom-scan-line { display: none; }
        }
      `}</style>

      <SEO
        title="E-commerce AI — The Zero-Click Storefront | CatyAI"
        description="Transform your e-commerce into an AI-readable storefront. Sync inventory natively to ChatGPT and Gemini to capture buyers in the Zero-Click era."
      />

      <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

      {/* ── Hero ── */}
      <section
        className="ecom-hero-section"
        style={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8rem 1.5rem 5rem',
          overflow: 'hidden',
        }}
      >
        <div className="ecom-grid-bg" />
        <div className="ecom-hero-scene">
          <div className="ecom-cube" />
          <div className="ecom-cube" />
          <div className="ecom-cube" />
          <div className="ecom-cube" />
          <div className="ecom-cube" />
          <div className="ecom-scan-line" />
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '860px', width: '100%' }}>
          <div className="ecom-badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16C784', boxShadow: '0 0 6px #16C784', flexShrink: 0 }} />
            {t.badge}
          </div>

          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              marginBottom: '0.4rem',
              color: '#f8fafc',
            }}
          >
            {t.heroTitle}
          </h1>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              color: '#C8A165',
            }}
          >
            {t.heroTitle2}
          </h2>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(212,181,122,0.85)', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            {t.heroSub}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'rgba(248,250,252,0.7)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            {t.heroBody}
          </p>

          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link
              to="/contact"
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                background: '#C8A165',
                color: '#010A1F',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 24px rgba(200,161,101,0.4)',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {t.heroCta}
            </Link>
            <a
              href="#features"
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f8fafc',
                fontWeight: 600,
                fontSize: '0.95rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
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

      {/* ── Stats ── */}
      <section style={{ padding: '4rem 1.5rem', background: 'rgba(5,15,40,0.6)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc' }}>
              {t.statsTitle}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {t.stats.map((s, i) => (
              <div key={i} className="ecom-stat-card">
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    color: '#C8A165',
                    marginBottom: '0.5rem',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="ecom-badge" style={{ marginBottom: '1rem' }}>6 Layers</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.75rem' }}>
              {t.featuresTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '540px', margin: '0 auto' }}>
              {t.featuresSubtitle}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {t.features.map(f => (
              <div key={f.n} className="ecom-card">
                <div className="ecom-card-num">{f.n}</div>
                <span className="ecom-card-icon">{f.icon}</span>
                <div className="ecom-card-tag">{f.tag}</div>
                <div className="ecom-card-title">{f.title}</div>
                <div className="ecom-card-tagline">{f.tagline}</div>
                <div className="ecom-card-body">{f.body}</div>
                <div className="ecom-card-pill">{f.pill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works (product endpoint visual) ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div className="ecom-badge" style={{ marginBottom: '1.25rem' }}>⚡ First in Industry</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', marginBottom: '0.75rem' }}>
              ChatGPT reads your live catalog
            </h2>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C8A165', marginBottom: '1rem' }}>
              Real-time product data at the AI layer
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.65, fontSize: '0.95rem' }}>
              When ChatGPT or Gemini queries your store, they do not get a webpage — they get structured JSON-LD built for AI consumption. Price, stock, variants, and reviews — all in a format AI can cite with confidence and link directly to purchase.
            </p>
          </div>
          <div style={{ background: 'rgba(10,27,61,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.75rem', backdropFilter: 'blur(12px)' }}>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem', color: '#4ade80', whiteSpace: 'pre-wrap', lineHeight: 1.7, margin: 0 }}>{`GET /answer?q=products&inStock=true
→ {
  "@type": "ItemList",
  "itemListElement": [{
    "@type": "Product",
    "name": "Running Shoe Pro X",
    "offers": {
      "price": "89.00",
      "priceCurrency": "EUR",
      "availability": "InStock"
    },
    "aggregateRating": {
      "ratingValue": "4.8",
      "reviewCount": "312"
    }
  }]
}`}</pre>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 1.5rem', background: '#010A1F' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8fafc', textAlign: 'center', marginBottom: '2.5rem' }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {t.faqs.map((faq, i) => (
              <div
                key={i}
                className={`ecom-faq-item${openFaq === i ? ' open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="ecom-faq-q">
                  <span>{faq.q}</span>
                  <svg className="ecom-faq-chevron" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                {openFaq === i && <div className="ecom-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '5rem 1.5rem', background: 'rgba(5,15,40,0.5)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="ecom-badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A165', boxShadow: '0 0 6px #C8A165', flexShrink: 0 }} />
            AI Commerce
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f8fafc', marginBottom: '1rem', lineHeight: 1.1 }}>
            {t.finalCta}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
            {t.finalBody}
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                background: '#C8A165',
                color: '#010A1F',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 24px rgba(200,161,101,0.4)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {t.finalBtn}
            </Link>
            <Link
              to="/pricing"
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {t.demoBtn}
            </Link>
          </div>
        </div>
      </section>

      <FooterV9 lang={lang} />
    </div>
  )
}
