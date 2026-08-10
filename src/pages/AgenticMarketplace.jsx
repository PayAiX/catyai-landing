import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    meta: { title: 'Commerce Distribution — catalog, CSS and AI visibility | CatyAI', desc: 'Catalog engineering, Comparison Shopping Service (CSS) distribution and AI-GEO visibility: your products found on Google and cited by ChatGPT, Claude, Perplexity. One-time setup + monthly subscription, transparent pricing.' },
    badge: 'Commerce Distribution',
    heroTitle: 'Your products, found on Google and cited by AI agents',
    heroSub: 'Catalog engineering, Comparison Shopping Service (CSS) distribution and visibility in artificial intelligence — one technical partner for the entire chain from feed to sale.',
    heroCta: 'Book a partnership call',
    heroCtaAlt: 'See the pricing →',
    heroBadges: ['GMC-compliant feed', 'CSS · ~20% more bidding power', 'GEO · llms.txt'],
    tiersTitle: 'One service, three layers',
    tiersSub: 'Everything a real merchant\'s catalog needs to be found — on Google and in AI answers.',
    tiers: [
      { tag: 'Layer 01', h: 'Catalog engineering', p: 'Ingest, deduplication, golden records, AI enrichment of titles and descriptions, identifiers (EAN/GTIN), GMC-compliant feed.' },
      { tag: 'Layer 02', h: 'CSS distribution', p: 'Presence in the CatyAI marketplace, free listings on Google and — through our CSS account — Shopping campaigns with ~20% more bidding power at the same budget. Campaigns managed per merchant, ROI reporting.' },
      { tag: 'Layer 03', h: 'AI visibility (GEO)', p: 'Findable by ChatGPT, Claude, Perplexity: semantic indexing in vector engines, llms.txt, complete structured data, monthly AI visibility report on your catalog.' },
    ],
    notusTitle: 'What we are NOT',
    notusHeaders: ['', 'Labeling tools', 'CatyAI'],
    notusRows: [
      ['Fixes the catalog (dedup, identifiers, enrichment)', 'No', 'Yes — full pipeline + golden records'],
      ['Requires access to your ad accounts (GA4/Ads/GMC)', 'Yes, mandatory', 'No, for the base value'],
      ['Opens new channels', 'No — only optimizes budget on the old ones', 'Yes — CSS, free listings, GEO/AI'],
      ['Your data stays yours if you leave', 'No — labels die with the subscription', 'Yes — the rebuilt catalog remains'],
    ],
    problemTitle: 'The problem: AI Blindness',
    problemSub: 'LLM-oriented crawlers read raw HTML and ignore JavaScript executed in the browser. Stores built as dynamic apps appear to agents as nearly empty pages. The product exists, but for AI it\'s invisible.',
    problemCards: [
      { h: 'Invisible', p: 'Browser-rendered content never reaches the AI crawler. The product can\'t even be cited.' },
      { h: 'Cited ≠ trusted', p: 'Even if a product is mentioned, the agent can\'t verify who the seller is, whether the price is real, or if the offer still exists.' },
      { h: 'Trusted ≠ sellable', p: 'Without a structured offer and a clear purchase path, the recommendation stays a good word, not a transaction.' },
    ],
    howTitle: 'How it works, step by step',
    steps: [
      { n: '01', h: 'Signed catalog', p: 'The merchant\'s catalog is indexed semantically and signed cryptographically (Ed25519), together with verified identity data (NAP). The agent doesn\'t receive free text it must believe, but data whose authenticity it can verify mathematically.' },
      { n: '02', h: 'Discovery', p: 'When an agent searches for a product, it queries the semantic catalog directly, in a machine-designed format — not via page scraping. The response is structured, complete and instant.' },
      { n: '03', h: 'Deterministic validation', p: 'Before an offer is recommended, it passes through a deterministic chain: the signature is verified, the real existence of the offer and the price correctness are checked. Never an unsafe or invented offer.', tag: 'APO → CEE → TSO' },
      { n: '04', h: 'Redirect via shop.catyai.io', p: 'The link the agent recommends lives on the CatyAI domain — shop.catyai.io/{store}/{product} — which makes a 302 redirect to the real product page on the merchant\'s site, carrying a reference parameter. The customer buys and pays at the merchant, as usual.' },
      { n: '05', h: 'Attribution', p: 'The completed order is correctly attributed to the discovery that generated it, through the ref=caty_… parameter carried from the shop.catyai.io redirect. The merchant sees exactly which sales came through the agentic channel.' },
    ],
    trustTitle: 'The trust architecture',
    trustSub: 'In a world where agents recommend automatically, trust cannot be a marketing promise — it must be verifiable. CatyAI builds it from three pieces.',
    trustCards: [
      { tag: 'NAP verified', h: 'Identity', p: 'The merchant\'s name, address and contact are verified and tied to the catalog. The agent knows who it\'s talking to.' },
      { tag: 'Ed25519 signature', h: 'Integrity', p: 'Every data set is cryptographically signed. Any unauthorized modification invalidates the signature — data cannot be falsified in transit.' },
      { tag: 'Validated offer · TSO', h: 'Correctness', p: 'An offer reaches the agent only after deterministic validation. Never an unsafe price or a presumed availability.' },
    ],
    tableTitle: 'Classic SEO vs. CatyAI',
    tableHeaders: ['Capability', 'Classic SEO', 'CatyAI'],
    tableRows: [['Cited by agents (GEO)', 'Partial', 'Yes'], ['Trusted (NAP + signature)', 'No', 'Yes'], ['Transactable (validated offer)', 'No', 'Yes'], ['Attribution on result', 'No', 'Yes']],
    posTitle: 'Where CatyAI fits',
    posSub: ['CatyAI doesn\'t compete with agentic payment rails — it complements them. Global protocols solve agent-to-agent payment for digital services. CatyAI solves the ', 'last mile for physical products of real merchants', ', who don\'t have the time and budget to rebuild their infrastructure.'],
    posLeft: { tag: 'Global protocols (x402, AP2, Stripe)', items: ['Sell digital services / APIs', 'Buyer: agent with wallet, no human', 'Settlement in stablecoin / on-chain', 'Require merchant API and integration'] },
    posRight: { tag: 'CatyAI', items: ['Physical retail products (RO / EU)', 'Buyer: human finalizes at merchant', 'Classic payment, in local currency, at merchant', 'Zero site rebuild, zero mandatory API'] },
    priceTitle: 'Transparent pricing, per catalog size',
    priceSub: 'Figures from the commercial offer — one-time setup, monthly subscription, percentage only on ad spend run through us.',
    priceHeaders: ['Package', 'Catalog', 'Setup (one-time)', 'Monthly subscription', '+ % ad spend'],
    priceRows: [
      ['Entry', '≤ 1,000 products', '1.000 €', '250 €/month', '5%'],
      ['Starter', '1 – 2k products', '1.500 €', '300 €/month', '5%'],
      ['Growth', '2 – 10k products', '3.000 €', '600 €/month', '5%'],
      ['Pro', '10 – 50k products', '6.000 €', '1.200 €/month', '4%'],
      ['Enterprise', 'over 50k', 'custom offer', 'custom', '3–4%'],
    ],
    priceIncludedTitle: 'Included in every package',
    priceIncluded: [
      'Full pipeline: ingest → deduplication → golden records → AI enrichment → identifiers → GMC feed',
      'Presence in the CatyAI marketplace and Google free listings',
      'CSS sub-account with ~20% discount on Shopping bids (after ad spend activation)',
      'AI visibility: semantic indexing, llms.txt, structured data, monthly AI visibility report',
      'Monthly report: live products, feed health, traffic, campaign ROI',
    ],
    priceConditionsTitle: 'Commercial terms',
    priceConditions: [
      'Setup is paid in full at signing, before work begins',
      'The monthly subscription starts from the first month',
      'The percentage applies only when you run ads campaigns through us; the ads budget is yours, separate, transparent in Google Ads',
      'Minimum 6-month contract for Entry and Starter',
      'No free trial periods',
    ],
    priceArgument: 'At an ad spend of 2.000 €/month, the CSS savings alone cover the subscription.',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What is CatyAI Commerce Distribution?', a: 'The service through which we rebuild your catalog (catalog engineering), distribute it on Google through our marketplace and CSS account, and make it readable by AI agents (GEO). One partner for the entire chain from feed to sale.' },
      { q: 'Does CatyAI process payments or deliveries?', a: 'No. The merchant remains Merchant of Record: the customer pays and receives the order directly from the merchant. CatyAI does not touch money and does not collect personal data.' },
      { q: 'Do I need to rebuild my site?', a: 'No. Your catalog becomes visible to agents and Google without changes to the site. The recommendation brings the customer, via redirect, directly to your page.' },
      { q: 'Do you use crypto or wallets for payment?', a: 'No. Unlike x402 / AP2 protocols, payment remains classic, at the merchant, in local currency. CatyAI does not use stablecoin or on-chain settlement.' },
      { q: 'How is billing done?', a: 'One-time setup at signing + monthly subscription from the first month. The percentage (3–5%) applies only to ad spend run through our CSS account — the ads budget is yours, transparent in Google Ads.' },
      { q: 'What happens to my data if I leave?', a: 'The rebuilt catalog remains yours. Unlike labeling tools, where the work dies with the subscription, the golden records and enriched feed stay with you.' },
    ],
    ctaTitle: 'Book a partnership call',
    ctaSub: 'Write to us at contact@catyai.io or call +40 756 730 193 — we\'ll discuss your catalog and the right package.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgLabels: ['SIGNED CATALOG', 'DISCOVERY', 'VALIDATION', 'shop.catyai.io · 302', 'MERCHANT · MoR'],
    svgSubs: ['NAP · Ed25519 · semantic index', 'direct query, machine format', 'APO → CEE → TSO', 'sig · offer · price', 'redirect to merchant + ?ref'],
  },
  ro: {
    meta: { title: 'Commerce Distribution — catalog, CSS și vizibilitate AI | CatyAI', desc: 'Inginerie de catalog, distribuție prin Comparison Shopping Service (CSS) și vizibilitate AI-GEO: produsele tale găsite pe Google și citate de ChatGPT, Claude, Perplexity. Setup unic + abonament lunar, grilă transparentă.' },
    badge: 'Commerce Distribution',
    heroTitle: 'Produsele tale, găsite pe Google și citate de agenții AI',
    heroSub: 'Inginerie de catalog, distribuție prin Comparison Shopping Service (CSS) și vizibilitate în inteligența artificială — un singur partener tehnic pentru tot lanțul de la feed la vânzare.',
    heroCta: 'Programează o discuție de parteneriat',
    heroCtaAlt: 'Vezi grila de preț →',
    heroBadges: ['Feed conform GMC', 'CSS · ~20% putere de licitație în plus', 'GEO · llms.txt'],
    tiersTitle: 'Un serviciu, trei etaje',
    tiersSub: 'Tot ce are nevoie catalogul unui comerciant real ca să fie găsit — pe Google și în răspunsurile AI.',
    tiers: [
      { tag: 'Etajul 01', h: 'Ingineria catalogului', p: 'Ingest, deduplicare, golden records, îmbogățire AI a titlurilor și descrierilor, identificatori (EAN/GTIN), feed conform GMC.' },
      { tag: 'Etajul 02', h: 'Distribuția CSS', p: 'Prezență în marketplace-ul CatyAI, free listings pe Google și — prin contul nostru CSS — campanii Shopping cu ~20% mai multă putere de licitație la același buget. Campanii administrate per comerciant, raportare ROI.' },
      { tag: 'Etajul 03', h: 'Vizibilitate AI (GEO)', p: 'Găsibil de ChatGPT, Claude, Perplexity: indexare semantică în motoare vectoriale, llms.txt, date structurate complete, raport lunar de vizibilitate AI pe catalogul tău.' },
    ],
    notusTitle: 'Ce NU suntem',
    notusHeaders: ['', 'Tools de labeling', 'CatyAI'],
    notusRows: [
      ['Repară catalogul (dedup, identificatori, enrichment)', 'Nu', 'Da — pipeline complet + golden records'],
      ['Necesită acces la conturile tale de ads (GA4/Ads/GMC)', 'Da, obligatoriu', 'Nu, pentru valoarea de bază'],
      ['Deschide canale noi', 'Nu — doar optimizează bugetul pe cele vechi', 'Da — CSS, free listings, GEO/AI'],
      ['Datele rămân ale tale dacă pleci', 'Nu — label-urile mor cu abonamentul', 'Da — catalogul reconstruit rămâne'],
    ],
    problemTitle: 'Problema: AI Blindness',
    problemSub: 'Crawlerele orientate spre modele de limbaj citesc HTML brut și ignoră JavaScript-ul executat în browser. Magazinele construite ca aplicații dinamice le apar agenților ca pagini aproape goale. Produsul există, dar pentru AI e invizibil.',
    problemCards: [
      { h: 'Invizibil', p: 'Conținutul randat în browser nu ajunge niciodată la crawlerul AI. Produsul nu poate fi nici măcar citat.' },
      { h: 'Citat ≠ de încredere', p: 'Chiar dacă un produs e menționat, agentul nu poate verifica cine e vânzătorul, dacă prețul e real sau dacă oferta mai există.' },
      { h: 'De încredere ≠ vandabil', p: 'Fără o ofertă structurată și o cale clară de cumpărare, recomandarea rămâne o vorbă bună, nu o tranzacție.' },
    ],
    howTitle: 'Cum funcționează, pas cu pas',
    steps: [
      { n: '01', h: 'Catalog semnat', p: 'Catalogul comerciantului e indexat semantic și semnat criptografic (Ed25519), împreună cu datele de identitate verificate (NAP). Agentul nu primește text liber pe care trebuie să-l creadă, ci date a căror autenticitate o poate verifica matematic.' },
      { n: '02', h: 'Descoperire', p: 'Când un agent caută un produs, interoghează catalogul semantic direct, în format conceput pentru mașini — nu prin scraping de pagini. Răspunsul e structurat, complet și instant.' },
      { n: '03', h: 'Validare deterministă', p: 'Înainte ca o ofertă să fie recomandată, trece printr-un lanț determinist: se verifică semnătura, existența reală a ofertei și corectitudinea prețului. Niciodată o ofertă nesigură sau inventată.', tag: 'APO → CEE → TSO' },
      { n: '04', h: 'Redirect prin shop.catyai.io', p: 'Linkul pe care agentul îl recomandă trăiește pe domeniul CatyAI — shop.catyai.io/{magazin}/{produs} — care face un redirect 302 către pagina reală a produsului de pe site-ul comerciantului, purtând cu el un parametru de referință. Clientul cumpără și plătește la comerciant, ca de obicei.' },
      { n: '05', h: 'Atribuire', p: 'Comanda finalizată e atribuită corect descoperirii care a generat-o, prin parametrul ref=caty_… purtat de la redirectul shop.catyai.io. Comerciantul vede exact ce vânzări au venit prin canalul agentic.' },
    ],
    trustTitle: 'Arhitectura încrederii',
    trustSub: 'Într-o lume în care agenții recomandă automat, încrederea nu poate fi o promisiune de marketing — trebuie să fie verificabilă. CatyAI o construiește din trei piese.',
    trustCards: [
      { tag: 'NAP verificat', h: 'Identitate', p: 'Numele, adresa și contactul comerciantului sunt verificate și legate de catalog. Agentul știe cu cine vorbește.' },
      { tag: 'Semnătură Ed25519', h: 'Integritate', p: 'Fiecare set de date e semnat criptografic. Orice modificare neautorizată invalidează semnătura — datele nu pot fi falsificate pe drum.' },
      { tag: 'Ofertă validată · TSO', h: 'Corectitudine', p: 'O ofertă ajunge la agent doar după ce a fost validată determinist. Niciodată un preț nesigur sau o disponibilitate presupusă.' },
    ],
    tableTitle: 'SEO clasic vs. CatyAI',
    tableHeaders: ['Capabilitate', 'SEO clasic', 'CatyAI'],
    tableRows: [['Citat de agenți (GEO)', 'Parțial', 'Da'], ['De încredere (NAP + semnătură)', 'Nu', 'Da'], ['Tranzacționabil (ofertă validată)', 'Nu', 'Da'], ['Atribuire pe rezultat', 'Nu', 'Da']],
    posTitle: 'Unde se potrivește CatyAI',
    posSub: ['CatyAI nu concurează cu rail-urile de plată agentică — le completează. Protocoalele globale rezolvă plata agent-la-agent pentru servicii digitale. CatyAI rezolvă ', 'ultima milă pentru produsele fizice ale comercianților reali', ', care n-au timp și buget să-și refacă infrastructura.'],
    posLeft: { tag: 'Protocoalele globale (x402, AP2, Stripe)', items: ['Vând servicii / API-uri digitale', 'Cumpărător: agent cu wallet, fără om', 'Decontare în stablecoin / on-chain', 'Cer comerciantului API și integrare'] },
    posRight: { tag: 'CatyAI', items: ['Produse fizice de retail (RO / UE)', 'Cumpărător: omul finalizează la comerciant', 'Plată clasică, în lei, la comerciant', 'Zero refacere de site, zero API obligatoriu'] },
    priceTitle: 'Prețuri transparente, pe dimensiunea catalogului',
    priceSub: 'Cifrele din oferta comercială — setup o singură dată, abonament lunar, procent doar pe ad spend-ul rulat prin noi.',
    priceHeaders: ['Pachet', 'Catalog', 'Setup (o dată)', 'Abonament lunar', '+ % ad spend'],
    priceRows: [
      ['Entry', '≤ 1.000 produse', '1.000 €', '250 €/lună', '5%'],
      ['Starter', '1 – 2k produse', '1.500 €', '300 €/lună', '5%'],
      ['Growth', '2 – 10k produse', '3.000 €', '600 €/lună', '5%'],
      ['Pro', '10 – 50k produse', '6.000 €', '1.200 €/lună', '4%'],
      ['Enterprise', 'peste 50k', 'ofertă custom', 'custom', '3–4%'],
    ],
    priceIncludedTitle: 'Inclus în fiecare pachet',
    priceIncluded: [
      'Pipeline complet: ingest → deduplicare → golden records → enrichment AI → identificatori → feed GMC',
      'Prezență în marketplace-ul CatyAI și free listings Google',
      'Sub-cont CSS cu discount ~20% pe licitațiile Shopping (după activarea ad spend-ului)',
      'Vizibilitate AI: indexare semantică, llms.txt, date structurate, raport lunar de vizibilitate AI',
      'Raport lunar: produse live, sănătatea feed-ului, trafic, ROI campanii',
    ],
    priceConditionsTitle: 'Condiții comerciale',
    priceConditions: [
      'Setup-ul se achită integral la semnare, înainte de începerea lucrului',
      'Abonamentul lunar începe din prima lună',
      'Procentul se aplică doar când rulezi campanii ads prin noi; bugetul de ads e al tău, separat, transparent în Google Ads',
      'Contract minim 6 luni pentru Entry și Starter',
      'Fără perioade de trial gratuit',
    ],
    priceArgument: 'La un ad spend de 2.000 €/lună, economia CSS acoperă singură abonamentul.',
    faqTitle: 'Întrebări frecvente',
    faq: [
      { q: 'Ce este CatyAI Commerce Distribution?', a: 'Serviciul prin care îți reconstruim catalogul (inginerie de catalog), îl distribuim pe Google prin marketplace-ul nostru și contul CSS și îl facem citibil de agenții AI (GEO). Un singur partener pentru tot lanțul de la feed la vânzare.' },
      { q: 'CatyAI procesează plățile sau livrările?', a: 'Nu. Comerciantul rămâne Merchant of Record: clientul plătește și primește comanda direct la comerciant. CatyAI nu atinge banii și nu colectează date personale.' },
      { q: 'Trebuie să-mi refac site-ul?', a: 'Nu. Catalogul tău devine vizibil agenților și Google fără modificări pe site. Recomandarea duce clientul, prin redirect, direct la pagina ta.' },
      { q: 'Folosiți cripto sau wallet-uri pentru plată?', a: 'Nu. Spre deosebire de protocoalele x402 / AP2, plata rămâne clasică, la comerciant, în lei. CatyAI nu folosește stablecoin sau decontare on-chain.' },
      { q: 'Cum se facturează?', a: 'Setup unic la semnare + abonament lunar din prima lună. Procentul (3–5%) se aplică doar ad spend-ului rulat prin contul nostru CSS — bugetul de ads e al tău, transparent în Google Ads.' },
      { q: 'Ce se întâmplă cu datele mele dacă plec?', a: 'Catalogul reconstruit rămâne al tău. Spre deosebire de tools-urile de labeling, unde munca moare odată cu abonamentul, golden records-urile și feed-ul îmbogățit rămân la tine.' },
    ],
    ctaTitle: 'Programează o discuție de parteneriat',
    ctaSub: 'Scrie-ne la contact@catyai.io sau sună la +40 756 730 193 — discutăm catalogul tău și pachetul potrivit.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgLabels: ['CATALOG SEMNAT', 'DESCOPERIRE', 'VALIDARE', 'shop.catyai.io · 302', 'COMERCIANT · MoR'],
    svgSubs: ['NAP · Ed25519 · indexat semantic', 'interogare directă, format mașină', 'APO → CEE → TSO', 'semnătură · ofertă · preț', 'redirect → comerciant + ?ref'],
  },
  es: {
    meta: { title: 'Commerce Distribution — catálogo, CSS y visibilidad IA | CatyAI', desc: 'Ingeniería de catálogo, distribución a través de Comparison Shopping Service (CSS) y visibilidad IA-GEO: tus productos encontrados en Google y citados por ChatGPT, Claude, Perplexity. Setup único + suscripción mensual.' },
    badge: 'Commerce Distribution',
    heroTitle: 'Tus productos, encontrados en Google y citados por agentes de IA',
    heroSub: 'Ingeniería de catálogo, distribución a través de Comparison Shopping Service (CSS) y visibilidad en inteligencia artificial — un solo socio técnico para toda la cadena, del feed a la venta.',
    heroCta: 'Programa una llamada de colaboración',
    heroCtaAlt: 'Ver precios →',
    heroBadges: ['Feed conforme a GMC', 'CSS · ~20% más potencia de puja', 'GEO · llms.txt'],
    tiersTitle: 'Un servicio, tres niveles',
    tiersSub: 'Todo lo que necesita el catálogo de un comerciante real para ser encontrado — en Google y en las respuestas de la IA.',
    tiers: [
      { tag: 'Nivel 01', h: 'Ingeniería del catálogo', p: 'Ingesta, deduplicación, golden records, enriquecimiento IA de títulos y descripciones, identificadores (EAN/GTIN), feed conforme a GMC.' },
      { tag: 'Nivel 02', h: 'Distribución CSS', p: 'Presencia en el marketplace de CatyAI, free listings en Google y — a través de nuestra cuenta CSS — campañas Shopping con ~20% más potencia de puja con el mismo presupuesto. Campañas gestionadas por comerciante, reporte de ROI.' },
      { tag: 'Nivel 03', h: 'Visibilidad IA (GEO)', p: 'Localizable por ChatGPT, Claude, Perplexity: indexación semántica en motores vectoriales, llms.txt, datos estructurados completos, informe mensual de visibilidad IA de tu catálogo.' },
    ],
    notusTitle: 'Lo que NO somos',
    notusHeaders: ['', 'Herramientas de labeling', 'CatyAI'],
    notusRows: [
      ['Repara el catálogo (dedup, identificadores, enrichment)', 'No', 'Sí — pipeline completo + golden records'],
      ['Requiere acceso a tus cuentas de ads (GA4/Ads/GMC)', 'Sí, obligatorio', 'No, para el valor base'],
      ['Abre canales nuevos', 'No — solo optimiza el presupuesto en los viejos', 'Sí — CSS, free listings, GEO/IA'],
      ['Tus datos siguen siendo tuyos si te vas', 'No — las etiquetas mueren con la suscripción', 'Sí — el catálogo reconstruido permanece'],
    ],
    problemTitle: 'El problema: AI Blindness',
    problemSub: 'Los crawlers orientados a LLM leen HTML bruto e ignoran el JavaScript ejecutado en el navegador. Las tiendas construidas como apps dinámicas aparecen ante los agentes como páginas casi vacías.',
    problemCards: [
      { h: 'Invisible', p: 'El contenido renderizado en el navegador nunca llega al crawler de IA. El producto ni siquiera puede ser citado.' },
      { h: 'Citado ≠ confiable', p: 'Aunque se mencione un producto, el agente no puede verificar quién es el vendedor, si el precio es real o si la oferta existe.' },
      { h: 'Confiable ≠ vendible', p: 'Sin una oferta estructurada y un camino claro de compra, la recomendación queda como una buena palabra, no una transacción.' },
    ],
    howTitle: 'Cómo funciona, paso a paso',
    steps: [
      { n: '01', h: 'Catálogo firmado', p: 'El catálogo del comerciante se indexa semánticamente y se firma criptográficamente (Ed25519), junto con los datos de identidad verificados (NAP). El agente recibe datos cuya autenticidad puede verificar matemáticamente.' },
      { n: '02', h: 'Descubrimiento', p: 'Cuando un agente busca un producto, consulta el catálogo semántico directamente, en un formato diseñado para máquinas — no mediante scraping. La respuesta es estructurada, completa e instantánea.' },
      { n: '03', h: 'Validación determinista', p: 'Antes de que se recomiende una oferta, pasa por una cadena determinista: firma, existencia real y corrección del precio. El resultado es una oferta validada — nunca insegura o inventada.', tag: 'APO → CEE → TSO' },
      { n: '04', h: 'Redirección via shop.catyai.io', p: 'El enlace vive en shop.catyai.io/{tienda}/{producto} — que hace una redirección 302 a la página real del producto en el sitio del comerciante, llevando un parámetro de referencia.' },
      { n: '05', h: 'Atribución', p: 'El pedido completado se atribuye correctamente al descubrimiento que lo generó, mediante el parámetro ref=caty_… El comerciante ve exactamente qué ventas vinieron por el canal agéntico.' },
    ],
    trustTitle: 'La arquitectura de confianza',
    trustSub: 'En un mundo donde los agentes recomiendan automáticamente, la confianza debe ser verificable. CatyAI la construye desde tres piezas.',
    trustCards: [
      { tag: 'NAP verificado', h: 'Identidad', p: 'El nombre, dirección y contacto del comerciante son verificados y vinculados al catálogo. El agente sabe con quién habla.' },
      { tag: 'Firma Ed25519', h: 'Integridad', p: 'Cada conjunto de datos está firmado criptográficamente. Cualquier modificación no autorizada invalida la firma.' },
      { tag: 'Oferta validada · TSO', h: 'Corrección', p: 'Una oferta llega al agente solo después de la validación determinista. Nunca un precio inseguro o una disponibilidad presupuesta.' },
    ],
    tableTitle: 'SEO clásico vs. CatyAI',
    tableHeaders: ['Capacidad', 'SEO clásico', 'CatyAI'],
    tableRows: [['Citado por agentes (GEO)', 'Parcial', 'Sí'], ['Confiable (NAP + firma)', 'No', 'Sí'], ['Transaccionable (oferta validada)', 'No', 'Sí'], ['Atribución en resultado', 'No', 'Sí']],
    posTitle: 'Dónde encaja CatyAI',
    posSub: ['CatyAI no compite con los rieles de pago agéntico — los complementa. Los protocolos globales resuelven el pago agente-a-agente para servicios digitales. CatyAI resuelve la ', 'última milla para los productos físicos de comerciantes reales', ', que no tienen tiempo ni presupuesto para reconstruir su infraestructura.'],
    posLeft: { tag: 'Protocolos globales (x402, AP2, Stripe)', items: ['Venden servicios / APIs digitales', 'Comprador: agente con cartera, sin humano', 'Liquidación en stablecoin / on-chain', 'Requieren API e integración del comerciante'] },
    posRight: { tag: 'CatyAI', items: ['Productos físicos de retail (RO / UE)', 'Comprador: humano finaliza en el comerciante', 'Pago clásico, en moneda local', 'Cero reconstrucción de sitio, cero API obligatoria'] },
    priceTitle: 'Precios transparentes, según el tamaño del catálogo',
    priceSub: 'Cifras de la oferta comercial — setup único, suscripción mensual, porcentaje solo sobre el ad spend gestionado por nosotros.',
    priceHeaders: ['Paquete', 'Catálogo', 'Setup (único)', 'Suscripción mensual', '+ % ad spend'],
    priceRows: [
      ['Entry', '≤ 1.000 productos', '1.000 €', '250 €/mes', '5%'],
      ['Starter', '1 – 2k productos', '1.500 €', '300 €/mes', '5%'],
      ['Growth', '2 – 10k productos', '3.000 €', '600 €/mes', '5%'],
      ['Pro', '10 – 50k productos', '6.000 €', '1.200 €/mes', '4%'],
      ['Enterprise', 'más de 50k', 'oferta a medida', 'custom', '3–4%'],
    ],
    priceIncludedTitle: 'Incluido en cada paquete',
    priceIncluded: [
      'Pipeline completo: ingesta → deduplicación → golden records → enriquecimiento IA → identificadores → feed GMC',
      'Presencia en el marketplace de CatyAI y free listings de Google',
      'Subcuenta CSS con ~20% de descuento en las pujas de Shopping (tras activar el ad spend)',
      'Visibilidad IA: indexación semántica, llms.txt, datos estructurados, informe mensual de visibilidad IA',
      'Informe mensual: productos live, salud del feed, tráfico, ROI de campañas',
    ],
    priceConditionsTitle: 'Condiciones comerciales',
    priceConditions: [
      'El setup se paga íntegramente a la firma, antes de empezar el trabajo',
      'La suscripción mensual empieza desde el primer mes',
      'El porcentaje se aplica solo cuando ejecutas campañas de ads a través de nosotros; el presupuesto de ads es tuyo, separado, transparente en Google Ads',
      'Contrato mínimo de 6 meses para Entry y Starter',
      'Sin períodos de prueba gratuitos',
    ],
    priceArgument: 'Con un ad spend de 2.000 €/mes, el ahorro CSS cubre por sí solo la suscripción.',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Qué es CatyAI Commerce Distribution?', a: 'El servicio con el que reconstruimos tu catálogo (ingeniería de catálogo), lo distribuimos en Google a través de nuestro marketplace y cuenta CSS, y lo hacemos legible por los agentes de IA (GEO). Un solo socio para toda la cadena, del feed a la venta.' },
      { q: '¿CatyAI procesa pagos o entregas?', a: 'No. El comerciante sigue siendo Merchant of Record: el cliente paga y recibe el pedido directamente del comerciante. CatyAI no toca el dinero ni recopila datos personales.' },
      { q: '¿Necesito reconstruir mi sitio?', a: 'No. Tu catálogo se vuelve visible para los agentes y Google sin cambios en el sitio. La recomendación lleva al cliente, vía redirección, directamente a tu página.' },
      { q: '¿Usan cripto o carteras para el pago?', a: 'No. El pago sigue siendo clásico, en el comerciante, en moneda local. CatyAI no usa stablecoin ni liquidación on-chain.' },
      { q: '¿Cómo se factura?', a: 'Setup único a la firma + suscripción mensual desde el primer mes. El porcentaje (3–5%) se aplica solo al ad spend gestionado a través de nuestra cuenta CSS — el presupuesto de ads es tuyo, transparente en Google Ads.' },
      { q: '¿Qué pasa con mis datos si me voy?', a: 'El catálogo reconstruido sigue siendo tuyo. A diferencia de las herramientas de labeling, donde el trabajo muere con la suscripción, los golden records y el feed enriquecido se quedan contigo.' },
    ],
    ctaTitle: 'Programa una llamada de colaboración',
    ctaSub: 'Escríbenos a contact@catyai.io o llama al +40 756 730 193 — hablamos de tu catálogo y del paquete adecuado.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgLabels: ['CATÁLOGO FIRMADO', 'DESCUBRIMIENTO', 'VALIDACIÓN', 'shop.catyai.io · 302', 'COMERCIANTE · MoR'],
    svgSubs: ['NAP · Ed25519 · índice semántico', 'consulta directa, formato máquina', 'APO → CEE → TSO', 'sig · oferta · precio', 'redirección → comerciante + ?ref'],
  },
  pt: {
    meta: { title: 'Commerce Distribution — catálogo, CSS e visibilidade IA | CatyAI', desc: 'Engenharia de catálogo, distribuição via Comparison Shopping Service (CSS) e visibilidade IA-GEO: seus produtos encontrados no Google e citados por ChatGPT, Claude, Perplexity. Setup único + assinatura mensal.' },
    badge: 'Commerce Distribution',
    heroTitle: 'Seus produtos, encontrados no Google e citados por agentes de IA',
    heroSub: 'Engenharia de catálogo, distribuição via Comparison Shopping Service (CSS) e visibilidade em inteligência artificial — um único parceiro técnico para toda a cadeia, do feed à venda.',
    heroCta: 'Agende uma conversa de parceria',
    heroCtaAlt: 'Ver preços →',
    heroBadges: ['Feed conforme GMC', 'CSS · ~20% mais poder de lance', 'GEO · llms.txt'],
    tiersTitle: 'Um serviço, três camadas',
    tiersSub: 'Tudo o que o catálogo de um comerciante real precisa para ser encontrado — no Google e nas respostas de IA.',
    tiers: [
      { tag: 'Camada 01', h: 'Engenharia do catálogo', p: 'Ingestão, deduplicação, golden records, enriquecimento por IA de títulos e descrições, identificadores (EAN/GTIN), feed conforme GMC.' },
      { tag: 'Camada 02', h: 'Distribuição CSS', p: 'Presença no marketplace CatyAI, free listings no Google e — através da nossa conta CSS — campanhas Shopping com ~20% mais poder de lance com o mesmo orçamento. Campanhas geridas por comerciante, relatório de ROI.' },
      { tag: 'Camada 03', h: 'Visibilidade IA (GEO)', p: 'Encontrável por ChatGPT, Claude, Perplexity: indexação semântica em motores vetoriais, llms.txt, dados estruturados completos, relatório mensal de visibilidade IA do seu catálogo.' },
    ],
    notusTitle: 'O que NÃO somos',
    notusHeaders: ['', 'Ferramentas de labeling', 'CatyAI'],
    notusRows: [
      ['Repara o catálogo (dedup, identificadores, enrichment)', 'Não', 'Sim — pipeline completo + golden records'],
      ['Exige acesso às suas contas de ads (GA4/Ads/GMC)', 'Sim, obrigatório', 'Não, para o valor base'],
      ['Abre canais novos', 'Não — apenas otimiza o orçamento nos antigos', 'Sim — CSS, free listings, GEO/IA'],
      ['Os seus dados continuam seus se você sair', 'Não — as etiquetas morrem com a assinatura', 'Sim — o catálogo reconstruído permanece'],
    ],
    problemTitle: 'O problema: AI Blindness',
    problemSub: 'Os crawlers orientados para LLM leem HTML bruto e ignoram o JavaScript executado no navegador. As lojas construídas como apps dinâmicos aparecem para os agentes como páginas quase vazias.',
    problemCards: [
      { h: 'Invisível', p: 'O conteúdo renderizado no navegador nunca chega ao crawler de IA. O produto nem sequer pode ser citado.' },
      { h: 'Citado ≠ confiável', p: 'Mesmo que um produto seja mencionado, o agente não pode verificar quem é o vendedor, se o preço é real ou se a oferta existe.' },
      { h: 'Confiável ≠ vendável', p: 'Sem uma oferta estruturada e um caminho claro de compra, a recomendação fica como uma boa palavra, não uma transação.' },
    ],
    howTitle: 'Como funciona, passo a passo',
    steps: [
      { n: '01', h: 'Catálogo assinado', p: 'O catálogo do comerciante é indexado semanticamente e assinado criptograficamente (Ed25519), com os dados de identidade verificados (NAP). O agente recebe dados cuja autenticidade pode verificar matematicamente.' },
      { n: '02', h: 'Descoberta', p: 'Quando um agente busca um produto, consulta o catálogo semântico diretamente, em formato projetado para máquinas — não por scraping. A resposta é estruturada, completa e instantânea.' },
      { n: '03', h: 'Validação determinística', p: 'Antes de uma oferta ser recomendada, passa por uma cadeia determinística: assinatura, existência real e correção do preço. Resultado: oferta validada — nunca insegura ou inventada.', tag: 'APO → CEE → TSO' },
      { n: '04', h: 'Redirecionamento via shop.catyai.io', p: 'O link vive em shop.catyai.io/{loja}/{produto} — que faz um redirecionamento 302 para a página real do produto no site do comerciante, carregando um parâmetro de referência.' },
      { n: '05', h: 'Atribuição', p: 'O pedido concluído é corretamente atribuído à descoberta que o gerou, pelo parâmetro ref=caty_… O comerciante vê exatamente quais vendas vieram pelo canal agêntico.' },
    ],
    trustTitle: 'A arquitetura de confiança',
    trustSub: 'Num mundo onde os agentes recomendam automaticamente, a confiança deve ser verificável. O CatyAI a constrói a partir de três peças.',
    trustCards: [
      { tag: 'NAP verificado', h: 'Identidade', p: 'O nome, endereço e contato do comerciante são verificados e vinculados ao catálogo. O agente sabe com quem está falando.' },
      { tag: 'Assinatura Ed25519', h: 'Integridade', p: 'Cada conjunto de dados é assinado criptograficamente. Qualquer modificação não autorizada invalida a assinatura.' },
      { tag: 'Oferta validada · TSO', h: 'Correção', p: 'Uma oferta chega ao agente apenas após validação determinística. Nunca um preço inseguro ou disponibilidade presumida.' },
    ],
    tableTitle: 'SEO clássico vs. CatyAI',
    tableHeaders: ['Capacidade', 'SEO clássico', 'CatyAI'],
    tableRows: [['Citado por agentes (GEO)', 'Parcial', 'Sim'], ['Confiável (NAP + assinatura)', 'Não', 'Sim'], ['Transacionável (oferta validada)', 'Não', 'Sim'], ['Atribuição no resultado', 'Não', 'Sim']],
    posTitle: 'Onde o CatyAI se encaixa',
    posSub: ['O CatyAI não compete com os trilhos de pagamento agêntico — os complementa. Os protocolos globais resolvem o pagamento agente-a-agente para serviços digitais. O CatyAI resolve a ', 'última milha para os produtos físicos de comerciantes reais', ', que não têm tempo nem orçamento para reconstruir sua infraestrutura.'],
    posLeft: { tag: 'Protocolos globais (x402, AP2, Stripe)', items: ['Vendem serviços / APIs digitais', 'Comprador: agente com carteira, sem humano', 'Liquidação em stablecoin / on-chain', 'Exigem API e integração do comerciante'] },
    posRight: { tag: 'CatyAI', items: ['Produtos físicos de varejo (RO / UE)', 'Comprador: humano finaliza no comerciante', 'Pagamento clássico, em moeda local', 'Zero reconstrução de site, zero API obrigatória'] },
    priceTitle: 'Preços transparentes, pelo tamanho do catálogo',
    priceSub: 'Valores da oferta comercial — setup único, assinatura mensal, percentual apenas sobre o ad spend gerido por nós.',
    priceHeaders: ['Pacote', 'Catálogo', 'Setup (único)', 'Assinatura mensal', '+ % ad spend'],
    priceRows: [
      ['Entry', '≤ 1.000 produtos', '1.000 €', '250 €/mês', '5%'],
      ['Starter', '1 – 2k produtos', '1.500 €', '300 €/mês', '5%'],
      ['Growth', '2 – 10k produtos', '3.000 €', '600 €/mês', '5%'],
      ['Pro', '10 – 50k produtos', '6.000 €', '1.200 €/mês', '4%'],
      ['Enterprise', 'mais de 50k', 'oferta personalizada', 'custom', '3–4%'],
    ],
    priceIncludedTitle: 'Incluído em cada pacote',
    priceIncluded: [
      'Pipeline completo: ingestão → deduplicação → golden records → enriquecimento IA → identificadores → feed GMC',
      'Presença no marketplace CatyAI e free listings do Google',
      'Subconta CSS com ~20% de desconto nos lances de Shopping (após ativação do ad spend)',
      'Visibilidade IA: indexação semântica, llms.txt, dados estruturados, relatório mensal de visibilidade IA',
      'Relatório mensal: produtos live, saúde do feed, tráfego, ROI de campanhas',
    ],
    priceConditionsTitle: 'Condições comerciais',
    priceConditions: [
      'O setup é pago integralmente na assinatura, antes do início do trabalho',
      'A assinatura mensal começa no primeiro mês',
      'O percentual aplica-se apenas quando você roda campanhas de ads através de nós; o orçamento de ads é seu, separado, transparente no Google Ads',
      'Contrato mínimo de 6 meses para Entry e Starter',
      'Sem períodos de teste gratuitos',
    ],
    priceArgument: 'Com um ad spend de 2.000 €/mês, a economia CSS cobre sozinha a assinatura.',
    faqTitle: 'Perguntas frequentes',
    faq: [
      { q: 'O que é o CatyAI Commerce Distribution?', a: 'O serviço com o qual reconstruímos o seu catálogo (engenharia de catálogo), o distribuímos no Google através do nosso marketplace e conta CSS, e o tornamos legível pelos agentes de IA (GEO). Um único parceiro para toda a cadeia, do feed à venda.' },
      { q: 'O CatyAI processa pagamentos ou entregas?', a: 'Não. O comerciante permanece Merchant of Record: o cliente paga e recebe o pedido diretamente do comerciante. O CatyAI não toca o dinheiro nem coleta dados pessoais.' },
      { q: 'Preciso reconstruir meu site?', a: 'Não. O seu catálogo torna-se visível para os agentes e o Google sem mudanças no site. A recomendação leva o cliente, via redirecionamento, diretamente à sua página.' },
      { q: 'Vocês usam cripto ou carteiras para pagamento?', a: 'Não. O pagamento permanece clássico, no comerciante, em moeda local. O CatyAI não usa stablecoin nem liquidação on-chain.' },
      { q: 'Como é faturado?', a: 'Setup único na assinatura + assinatura mensal desde o primeiro mês. O percentual (3–5%) aplica-se apenas ao ad spend gerido através da nossa conta CSS — o orçamento de ads é seu, transparente no Google Ads.' },
      { q: 'O que acontece com meus dados se eu sair?', a: 'O catálogo reconstruído permanece seu. Ao contrário das ferramentas de labeling, onde o trabalho morre com a assinatura, os golden records e o feed enriquecido ficam com você.' },
    ],
    ctaTitle: 'Agende uma conversa de parceria',
    ctaSub: 'Escreva para contact@catyai.io ou ligue +40 756 730 193 — conversamos sobre o seu catálogo e o pacote certo.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgLabels: ['CATÁLOGO ASSINADO', 'DESCOBERTA', 'VALIDAÇÃO', 'shop.catyai.io · 302', 'COMERCIANTE · MoR'],
    svgSubs: ['NAP · Ed25519 · índice semântico', 'consulta direta, formato máquina', 'APO → CEE → TSO', 'sig · oferta · preço', 'redirecionamento → comerciante + ?ref'],
  },
  fr: {
    meta: { title: 'Commerce Distribution — catalogue, CSS et visibilité IA | CatyAI', desc: 'Ingénierie de catalogue, distribution via Comparison Shopping Service (CSS) et visibilité IA-GEO : vos produits trouvés sur Google et cités par ChatGPT, Claude, Perplexity. Setup unique + abonnement mensuel.' },
    badge: 'Commerce Distribution',
    heroTitle: 'Vos produits, trouvés sur Google et cités par les agents IA',
    heroSub: 'Ingénierie de catalogue, distribution via Comparison Shopping Service (CSS) et visibilité dans l\'intelligence artificielle — un seul partenaire technique pour toute la chaîne, du flux à la vente.',
    heroCta: 'Planifier un échange partenariat',
    heroCtaAlt: 'Voir les tarifs →',
    heroBadges: ['Flux conforme GMC', 'CSS · ~20% de puissance d\'enchère en plus', 'GEO · llms.txt'],
    tiersTitle: 'Un service, trois étages',
    tiersSub: 'Tout ce qu\'il faut au catalogue d\'un vrai commerçant pour être trouvé — sur Google et dans les réponses IA.',
    tiers: [
      { tag: 'Étage 01', h: 'Ingénierie du catalogue', p: 'Ingestion, déduplication, golden records, enrichissement IA des titres et descriptions, identifiants (EAN/GTIN), flux conforme GMC.' },
      { tag: 'Étage 02', h: 'Distribution CSS', p: 'Présence dans le marketplace CatyAI, free listings sur Google et — via notre compte CSS — campagnes Shopping avec ~20% de puissance d\'enchère en plus à budget égal. Campagnes gérées par commerçant, reporting ROI.' },
      { tag: 'Étage 03', h: 'Visibilité IA (GEO)', p: 'Trouvable par ChatGPT, Claude, Perplexity : indexation sémantique dans des moteurs vectoriels, llms.txt, données structurées complètes, rapport mensuel de visibilité IA de votre catalogue.' },
    ],
    notusTitle: 'Ce que nous ne sommes PAS',
    notusHeaders: ['', 'Outils de labeling', 'CatyAI'],
    notusRows: [
      ['Répare le catalogue (dedup, identifiants, enrichment)', 'Non', 'Oui — pipeline complet + golden records'],
      ['Exige l\'accès à vos comptes ads (GA4/Ads/GMC)', 'Oui, obligatoire', 'Non, pour la valeur de base'],
      ['Ouvre de nouveaux canaux', 'Non — optimise seulement le budget sur les anciens', 'Oui — CSS, free listings, GEO/IA'],
      ['Vos données restent à vous si vous partez', 'Non — les labels meurent avec l\'abonnement', 'Oui — le catalogue reconstruit reste'],
    ],
    problemTitle: 'Le problème : AI Blindness',
    problemSub: 'Les crawlers orientés LLM lisent du HTML brut et ignorent le JavaScript exécuté dans le navigateur. Les boutiques construites comme des apps dynamiques apparaissent aux agents comme des pages presque vides.',
    problemCards: [
      { h: 'Invisible', p: 'Le contenu rendu dans le navigateur n\'atteint jamais le crawler IA. Le produit ne peut même pas être cité.' },
      { h: 'Cité ≠ fiable', p: 'Même si un produit est mentionné, l\'agent ne peut pas vérifier qui est le vendeur, si le prix est réel ou si l\'offre existe encore.' },
      { h: 'Fiable ≠ vendable', p: 'Sans une offre structurée et un chemin d\'achat clair, la recommandation reste une bonne parole, pas une transaction.' },
    ],
    howTitle: 'Comment ça marche, étape par étape',
    steps: [
      { n: '01', h: 'Catalogue signé', p: 'Le catalogue du commerçant est indexé sémantiquement et signé cryptographiquement (Ed25519), avec les données d\'identité vérifiées (NAP). L\'agent reçoit des données dont il peut vérifier mathématiquement l\'authenticité.' },
      { n: '02', h: 'Découverte', p: 'Quand un agent cherche un produit, il interroge le catalogue sémantique directement, dans un format conçu pour les machines. La réponse est structurée, complète et instantanée.' },
      { n: '03', h: 'Validation déterministe', p: 'Avant qu\'une offre soit recommandée, elle passe par une chaîne déterministe : signature, existence réelle et exactitude du prix. Résultat : une offre validée — jamais non sûre ou inventée.', tag: 'APO → CEE → TSO' },
      { n: '04', h: 'Redirection via shop.catyai.io', p: 'Le lien vit sur shop.catyai.io/{boutique}/{produit} — qui fait une redirection 302 vers la page réelle du produit chez le commerçant, portant un paramètre de référence.' },
      { n: '05', h: 'Attribution', p: 'La commande complétée est correctement attribuée à la découverte qui l\'a générée, via le paramètre ref=caty_… Le commerçant voit exactement quelles ventes sont venues par le canal agentique.' },
    ],
    trustTitle: 'L\'architecture de confiance',
    trustSub: 'Dans un monde où les agents recommandent automatiquement, la confiance doit être vérifiable. CatyAI la construit à partir de trois pièces.',
    trustCards: [
      { tag: 'NAP vérifié', h: 'Identité', p: 'Le nom, l\'adresse et le contact du commerçant sont vérifiés et liés au catalogue. L\'agent sait à qui il parle.' },
      { tag: 'Signature Ed25519', h: 'Intégrité', p: 'Chaque ensemble de données est signé cryptographiquement. Toute modification non autorisée invalide la signature.' },
      { tag: 'Offre validée · TSO', h: 'Exactitude', p: 'Une offre n\'atteint l\'agent qu\'après une validation déterministe. Jamais un prix non sûr ou une disponibilité présumée.' },
    ],
    tableTitle: 'SEO classique vs. CatyAI',
    tableHeaders: ['Capacité', 'SEO classique', 'CatyAI'],
    tableRows: [['Cité par les agents (GEO)', 'Partiel', 'Oui'], ['Fiable (NAP + signature)', 'Non', 'Oui'], ['Transactionnable (offre validée)', 'Non', 'Oui'], ['Attribution sur résultat', 'Non', 'Oui']],
    posTitle: 'Où s\'intègre CatyAI',
    posSub: ['CatyAI ne concurrence pas les rails de paiement agentique — il les complète. Les protocoles globaux résolvent le paiement agent-à-agent pour les services numériques. CatyAI résout le ', 'dernier kilomètre pour les produits physiques des vrais commerçants', ', qui n\'ont pas le temps ni le budget pour reconstruire leur infrastructure.'],
    posLeft: { tag: 'Protocoles globaux (x402, AP2, Stripe)', items: ['Vendent des services / APIs numériques', 'Acheteur : agent avec portefeuille, sans humain', 'Règlement en stablecoin / on-chain', 'Requièrent API et intégration du commerçant'] },
    posRight: { tag: 'CatyAI', items: ['Produits physiques de détail (RO / UE)', 'Acheteur : humain finalise chez le commerçant', 'Paiement classique, en monnaie locale', 'Zéro reconstruction de site, zéro API obligatoire'] },
    priceTitle: 'Tarifs transparents, selon la taille du catalogue',
    priceSub: 'Chiffres de l\'offre commerciale — setup unique, abonnement mensuel, pourcentage uniquement sur l\'ad spend géré par nous.',
    priceHeaders: ['Offre', 'Catalogue', 'Setup (unique)', 'Abonnement mensuel', '+ % ad spend'],
    priceRows: [
      ['Entry', '≤ 1.000 produits', '1.000 €', '250 €/mois', '5%'],
      ['Starter', '1 – 2k produits', '1.500 €', '300 €/mois', '5%'],
      ['Growth', '2 – 10k produits', '3.000 €', '600 €/mois', '5%'],
      ['Pro', '10 – 50k produits', '6.000 €', '1.200 €/mois', '4%'],
      ['Enterprise', 'plus de 50k', 'offre sur mesure', 'custom', '3–4%'],
    ],
    priceIncludedTitle: 'Inclus dans chaque offre',
    priceIncluded: [
      'Pipeline complet : ingestion → déduplication → golden records → enrichissement IA → identifiants → flux GMC',
      'Présence dans le marketplace CatyAI et free listings Google',
      'Sous-compte CSS avec ~20% de remise sur les enchères Shopping (après activation de l\'ad spend)',
      'Visibilité IA : indexation sémantique, llms.txt, données structurées, rapport mensuel de visibilité IA',
      'Rapport mensuel : produits live, santé du flux, trafic, ROI des campagnes',
    ],
    priceConditionsTitle: 'Conditions commerciales',
    priceConditions: [
      'Le setup est payé intégralement à la signature, avant le début du travail',
      'L\'abonnement mensuel commence dès le premier mois',
      'Le pourcentage s\'applique uniquement quand vous lancez des campagnes ads via nous ; le budget ads est le vôtre, séparé, transparent dans Google Ads',
      'Contrat minimum de 6 mois pour Entry et Starter',
      'Aucune période d\'essai gratuite',
    ],
    priceArgument: 'Avec un ad spend de 2.000 €/mois, l\'économie CSS couvre à elle seule l\'abonnement.',
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Qu\'est-ce que CatyAI Commerce Distribution ?', a: 'Le service par lequel nous reconstruisons votre catalogue (ingénierie de catalogue), le distribuons sur Google via notre marketplace et notre compte CSS, et le rendons lisible par les agents IA (GEO). Un seul partenaire pour toute la chaîne, du flux à la vente.' },
      { q: 'CatyAI traite-t-il les paiements ou les livraisons ?', a: 'Non. Le commerçant reste Merchant of Record : le client paie et reçoit la commande directement chez le commerçant. CatyAI ne touche pas l\'argent et ne collecte pas de données personnelles.' },
      { q: 'Dois-je reconstruire mon site ?', a: 'Non. Votre catalogue devient visible pour les agents et Google sans modifications du site. La recommandation amène le client, via redirection, directement sur votre page.' },
      { q: 'Utilisez-vous de la crypto ou des portefeuilles pour le paiement ?', a: 'Non. Le paiement reste classique, chez le commerçant, en monnaie locale. CatyAI n\'utilise ni stablecoin ni règlement on-chain.' },
      { q: 'Comment est-ce facturé ?', a: 'Setup unique à la signature + abonnement mensuel dès le premier mois. Le pourcentage (3–5%) s\'applique uniquement à l\'ad spend géré via notre compte CSS — le budget ads est le vôtre, transparent dans Google Ads.' },
      { q: 'Que deviennent mes données si je pars ?', a: 'Le catalogue reconstruit reste à vous. Contrairement aux outils de labeling, où le travail meurt avec l\'abonnement, les golden records et le flux enrichi restent chez vous.' },
    ],
    ctaTitle: 'Planifiez un échange partenariat',
    ctaSub: 'Écrivez-nous à contact@catyai.io ou appelez le +40 756 730 193 — nous parlons de votre catalogue et de l\'offre adaptée.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgLabels: ['CATALOGUE SIGNÉ', 'DÉCOUVERTE', 'VALIDATION', 'shop.catyai.io · 302', 'COMMERÇANT · MoR'],
    svgSubs: ['NAP · Ed25519 · index sémantique', 'requête directe, format machine', 'APO → CEE → TSO', 'sig · offre · prix', 'redirection → commerçant + ?ref'],
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'CatyAI', url: 'https://catyai.io', description: 'Commerce Distribution: catalog engineering, CSS distribution and AI-GEO visibility for real merchants, with deterministic validation and cryptographically signed offers.', parentOrganization: { '@type': 'Organization', name: 'PayAi-X FZE' } },
    { '@type': 'Service', name: 'CatyAI Commerce Distribution', serviceType: 'Catalog engineering, CSS distribution and AI visibility', provider: { '@type': 'Organization', name: 'CatyAI' }, areaServed: 'EU', description: 'Ingest, deduplication, golden records, AI enrichment, GMC feed, CSS distribution with ~20% more bidding power, semantic indexing and llms.txt for AI agents.' },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is CatyAI Commerce Distribution?', acceptedAnswer: { '@type': 'Answer', text: 'Catalog engineering, CSS distribution on Google and AI-GEO visibility — one partner for the entire chain from feed to sale.' } },
      { '@type': 'Question', name: 'Does CatyAI process payments?', acceptedAnswer: { '@type': 'Answer', text: 'No. The merchant remains Merchant of Record. CatyAI does not touch money and does not collect personal customer data.' } },
      { '@type': 'Question', name: 'How is billing done?', acceptedAnswer: { '@type': 'Answer', text: 'One-time setup at signing plus a monthly subscription. The 3–5% percentage applies only to ad spend run through the CatyAI CSS account.' } },
    ] },
  ],
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '9999px', background: '#34d399', boxShadow: '0 0 8px #34d39988', display: 'inline-block', flexShrink: 0 }} />
}

function Rule() {
  return <div style={{ width: 32, height: 3, background: '#d4b07a', borderRadius: 2, marginBottom: 18 }} />
}

export default function AgenticMarketplace() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('catyai_lang')
    if (saved && T[saved]) setLang(saved)
  }, [])

  useEffect(() => { localStorage.setItem('catyai_lang', lang) }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <>
      <SEO title={t.meta.title} description={t.meta.desc} canonical="https://catyai.io/agentic-marketplace" />
      <Helmet><script type="application/ld+json">{JSON.stringify(JSON_LD)}</script></Helmet>

      <div className="min-h-screen bg-[#0a0f1c] text-[#c7d0e0] font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>
          {/* HERO */}
          <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-20">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(48rem 28rem at 70% -6%, rgba(212,176,122,.10), transparent 62%), radial-gradient(40rem 24rem at 18% 4%, rgba(212,176,122,.05), transparent 60%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: '52px 52px', WebkitMaskImage: 'radial-gradient(60rem 40rem at 60% 0%, #000 30%, transparent 75%)', maskImage: 'radial-gradient(60rem 40rem at 60% 0%, #000 30%, transparent 75%)' }} />
            <div className="relative grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] text-[#d4b07a] border border-[#1f293f] bg-white/[.02] rounded-full px-3 py-1.5 uppercase font-mono tracking-widest">
                  <Dot /> {t.badge}
                </span>
                <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.05] mt-6 text-white">{t.heroTitle}</h1>
                <p className="text-[17px] text-[#8b96ab] mt-6 leading-relaxed max-w-xl">{t.heroSub}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#contact" className="font-bold px-6 py-3 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>{t.heroCta}</a>
                  <a href="#pret" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-6 py-3 rounded-lg text-white hover:border-[#5c6883] transition">{t.heroCtaAlt}</a>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-[#8b96ab]">
                  {t.heroBadges.map((b) => (
                    <span key={b} className="flex items-center gap-2"><Dot /> {b}</span>
                  ))}
                </div>
              </div>

              {/* SVG conduit diagram */}
              <div className="relative">
                <svg viewBox="0 0 420 490" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="am-gold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#e7cfa3" /><stop offset="1" stopColor="#9c7b44" />
                    </linearGradient>
                  </defs>
                  <g stroke="#d4b07a" strokeWidth="1" opacity=".5" fill="none">
                    <path d="M40 36 C 120 120, 180 110, 210 150" />
                    <path d="M155 28 C 185 90, 200 110, 210 150" />
                    <path d="M275 28 C 250 90, 230 110, 210 150" />
                    <path d="M385 36 C 300 120, 248 110, 210 150" />
                  </g>
                  <g fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#8b96ab">
                    <circle cx="40" cy="34" r="3" fill="#d4b07a" /><text x="50" y="38">ChatGPT</text>
                    <circle cx="155" cy="27" r="3" fill="#d4b07a" /><text x="165" y="31">Claude</text>
                    <circle cx="275" cy="27" r="3" fill="#d4b07a" /><text x="205" y="17">Perplexity</text>
                    <circle cx="385" cy="34" r="3" fill="#d4b07a" /><text x="328" y="50">Gemini</text>
                  </g>
                  <line x1="210" y1="150" x2="210" y2="438" stroke="url(#am-gold)" strokeWidth="1.5" />
                  <g fontFamily="'JetBrains Mono', monospace" fontSize="11">
                    <rect x="72" y="150" width="276" height="48" rx="8" fill="#111a2c" stroke="#d4b07a" strokeOpacity=".5" />
                    <text x="92" y="171" fill="#e7cfa3">{t.svgLabels[0]}</text>
                    <text x="92" y="187" fill="#5c6883" fontSize="9">{t.svgSubs[0]}</text>

                    <rect x="72" y="214" width="276" height="48" rx="8" fill="#111a2c" stroke="#1f293f" />
                    <text x="92" y="235" fill="#c7d0e0">{t.svgLabels[1]}</text>
                    <text x="92" y="251" fill="#5c6883" fontSize="9">{t.svgSubs[1]}</text>

                    <rect x="72" y="278" width="276" height="48" rx="8" fill="#111a2c" stroke="#1f293f" />
                    <text x="92" y="299" fill="#c7d0e0">{t.svgLabels[2]}</text>
                    <text x="92" y="315" fill="#5c6883" fontSize="9">{t.svgSubs[2]} · {t.svgSubs[3]}</text>

                    <rect x="72" y="342" width="276" height="48" rx="8" fill="#111a2c" stroke="#1f293f" />
                    <text x="92" y="363" fill="#c7d0e0">{t.svgLabels[3]}</text>
                    <text x="92" y="379" fill="#5c6883" fontSize="9">{t.svgSubs[4]}</text>
                  </g>
                  <rect x="120" y="438" width="180" height="42" rx="8" fill="#0c1322" stroke="#34d399" strokeOpacity=".5" />
                  <circle cx="142" cy="459" r="3" fill="#34d399" />
                  <text x="156" y="463" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#34d399">{t.svgLabels[4]}</text>
                </svg>
              </div>
            </div>
          </section>

          {/* THREE LAYERS */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.tiersTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.tiersSub}</p>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {t.tiers.map((tier) => (
                  <div key={tier.tag} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{tier.tag}</div>
                    <h3 className="font-bold mt-2 text-white">{tier.h}</h3>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{tier.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT WE ARE NOT */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.notusTitle}</h2>
              <div className="mt-10 overflow-x-auto border border-[#1f293f] rounded-2xl">
                <table className="w-full text-sm">
                  <thead className="bg-[#111a2c]">
                    <tr className="text-left text-[#5c6883] font-mono text-[12px] uppercase">
                      {t.notusHeaders.map((h, i) => (
                        <th key={h || 'cap'} className={`py-4 px-6 font-medium${i === 2 ? ' text-[#d4b07a]' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.notusRows.map(([cap, tools, caty], i) => (
                      <tr key={cap} className={`border-t border-[#1f293f]${i % 2 === 1 ? ' bg-[#0c1322]/60' : ''}`}>
                        <td className="py-4 px-6">{cap}</td>
                        <td className="py-4 px-6 text-[#5c6883]">{tools}</td>
                        <td className="py-4 px-6 text-[#34d399] font-semibold">{caty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* PROBLEM */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.problemTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.problemSub}</p>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {t.problemCards.map((c) => (
                  <div key={c.h} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="font-bold text-lg text-[#d4b07a]">{c.h}</div>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{c.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="cum" className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.howTitle}</h2>
              <div className="mt-12 space-y-px bg-[#1f293f] border border-[#1f293f] rounded-2xl overflow-hidden">
                {t.steps.map((s) => (
                  <div key={s.n} className="bg-[#111a2c] p-7 sm:p-8 grid sm:grid-cols-[3rem_1fr] gap-5">
                    <div className="font-extrabold text-2xl text-[#d4b07a]">{s.n}</div>
                    <div>
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        {s.h}
                        {s.tag && <span className="font-mono text-[11px] text-[#5c6883]">{s.tag}</span>}
                      </h3>
                      <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{s.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TRUST */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.trustTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.trustSub}</p>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {t.trustCards.map((c) => (
                  <div key={c.h} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{c.tag}</div>
                    <h3 className="font-bold mt-2 text-white">{c.h}</h3>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{c.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TABLE */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.tableTitle}</h2>
              <div className="mt-10 overflow-x-auto border border-[#1f293f] rounded-2xl">
                <table className="w-full text-sm">
                  <thead className="bg-[#111a2c]">
                    <tr className="text-left text-[#5c6883] font-mono text-[12px] uppercase">
                      {t.tableHeaders.map((h, i) => (
                        <th key={h} className={`py-4 px-6 font-medium${i === 2 ? ' text-[#d4b07a]' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.tableRows.map(([cap, seo, caty], i) => (
                      <tr key={cap} className={`border-t border-[#1f293f]${i % 2 === 1 ? ' bg-[#0c1322]/60' : ''}`}>
                        <td className="py-4 px-6">{cap}</td>
                        <td className="py-4 px-6 text-[#5c6883]">{seo}</td>
                        <td className="py-4 px-6 text-[#34d399] font-semibold">{caty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* POSITIONING */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.posTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">
                {t.posSub[0]}<span className="text-[#d4b07a] font-semibold">{t.posSub[1]}</span>{t.posSub[2]}
              </p>
              <div className="grid md:grid-cols-2 gap-px bg-[#1f293f] border border-[#1f293f] rounded-2xl overflow-hidden mt-10">
                <div className="bg-[#111a2c] p-7">
                  <div className="text-[11px] text-[#5c6883] uppercase font-mono tracking-widest">{t.posLeft.tag}</div>
                  <ul className="mt-4 space-y-2 text-sm text-[#8b96ab]">{t.posLeft.items.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
                <div className="bg-[#111a2c] p-7">
                  <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{t.posRight.tag}</div>
                  <ul className="mt-4 space-y-2 text-sm text-[#8b96ab]">{t.posRight.items.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING GRID */}
          <section id="pret" className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.priceTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.priceSub}</p>
              <div className="mt-10 overflow-x-auto border border-[#1f293f] rounded-2xl">
                <table className="w-full text-sm">
                  <thead className="bg-[#111a2c]">
                    <tr className="text-left text-[#5c6883] font-mono text-[12px] uppercase">
                      {t.priceHeaders.map((h, i) => (
                        <th key={h} className={`py-4 px-6 font-medium${i === 0 ? ' text-[#d4b07a]' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.priceRows.map(([pkg, catalog, setup, monthly, pct], i) => (
                      <tr key={pkg} className={`border-t border-[#1f293f]${i % 2 === 1 ? ' bg-[#0c1322]/60' : ''}`}>
                        <td className="py-4 px-6 text-[#d4b07a] font-semibold">{pkg}</td>
                        <td className="py-4 px-6">{catalog}</td>
                        <td className="py-4 px-6">{setup}</td>
                        <td className="py-4 px-6">{monthly}</td>
                        <td className="py-4 px-6">{pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-7">
                  <div className="text-[11px] text-[#34d399] uppercase font-mono tracking-widest">{t.priceIncludedTitle}</div>
                  <ul className="mt-4 space-y-2 text-sm text-[#8b96ab]">{t.priceIncluded.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-7">
                  <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{t.priceConditionsTitle}</div>
                  <ul className="mt-4 space-y-2 text-sm text-[#8b96ab]">{t.priceConditions.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
              </div>
              <p className="mt-8 text-[15px] text-[#e7cfa3] font-semibold">{t.priceArgument}</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.faqTitle}</h2>
              <div className="mt-10 divide-y divide-[#1f293f] border-y border-[#1f293f]">
                {t.faq.map((item, i) => (
                  <div key={i} className="py-5">
                    <button
                      className="flex justify-between items-center w-full text-left font-semibold text-white cursor-pointer"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                    >
                      {item.q}
                      <span className="text-[#d4b07a] text-xl leading-none ml-4 transition-transform" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    {openFaq === i && <p className="text-sm text-[#8b96ab] mt-3 leading-relaxed max-w-3xl">{item.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="contact" className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-24 text-center">
              <h2 className="font-extrabold tracking-tight text-3xl sm:text-4xl max-w-2xl mx-auto leading-tight text-white">{t.ctaTitle}</h2>
              <p className="text-[#8b96ab] mt-5 max-w-xl mx-auto">{t.ctaSub}</p>
              <div className="mt-9 flex flex-wrap gap-3 justify-center">
                <a href="mailto:contact@catyai.io" className="font-bold px-7 py-3.5 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>{t.ctaCta}</a>
                <a href="tel:+40756730193" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-7 py-3.5 rounded-lg text-white hover:border-[#5c6883] transition">{t.ctaAlt}</a>
              </div>
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
