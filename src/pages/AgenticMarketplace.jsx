import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'

const T = {
  en: {
    meta: { title: 'Agentic Marketplace — verified AI-to-AI commerce | CatyAI', desc: 'CatyAI makes real merchants\' products discoverable and recommendable by AI agents. Cryptographically signed catalog, deterministic validation, redirect to merchant. No crypto, no API, no PII.' },
    badge: 'Agentic Marketplace',
    heroTitle: 'AI-to-AI Commerce.',
    heroTitle2: 'For real products.',
    heroSub: 'ChatGPT, Claude, Perplexity and Gemini already recommend products to your customers — without mentioning you. CatyAI makes your catalog discoverable, trustworthy and transactable for them. No site rebuild, no crypto, no handing over money or customer data.',
    heroCta: 'Connect your store',
    heroCtaAlt: 'How it works →',
    heroBadges: ['9 AI crawlers', 'Ed25519 signature', 'Merchant = MoR', '0 PII data'],
    principles: [
      { label: 'No money touched', desc: 'The merchant remains Merchant of Record. Payment and delivery stay fully with them.' },
      { label: 'No data touched', desc: 'Zero personal customer data sent to AI models. Compliance by design.' },
      { label: 'No site rebuild', desc: 'The catalog becomes visible to agents without any changes to the existing store.' },
    ],
    contextTitle: 'Agentic commerce is already real — but on someone else\'s turf',
    contextP1: 'Major protocols are already building infrastructure for agent-to-agent transactions: Stripe is working on agent-initiated payments and machine-readable catalogs; Coinbase and the x402 ecosystem launched markets where agents discover and pay for digital services in stablecoin; Google is pushing agent-to-agent payment protocols. The direction is no longer speculation.',
    contextP2: ['All these platforms solve ', 'digital services commerce', ', settled in crypto, with the agent as a wallet-holding buyer. None address the traditional merchant — one who sells physical products, collects in local currency, has no x402 wallet and will not rebuild infrastructure. ', 'Exactly where CatyAI operates.'],
    problemTitle: 'The problem: AI Blindness',
    problemSub: 'LLM-oriented crawlers read raw HTML and ignore JavaScript executed in the browser. Stores built as dynamic apps appear to agents as nearly empty pages. The product exists, but for AI it\'s invisible.',
    problemCards: [
      { h: 'Invisible', p: 'Browser-rendered content never reaches the AI crawler. The product can\'t even be cited.' },
      { h: 'Cited ≠ trusted', p: 'Even if a product is mentioned, the agent can\'t verify who the seller is, whether the price is real, or if the offer still exists.' },
      { h: 'Trusted ≠ sellable', p: 'Without a structured offer and a clear purchase path, the recommendation stays a good word, not a transaction.' },
    ],
    whatTitle: 'What is CatyAI',
    whatSub: ['CatyAI is a ', 'discovery and attribution layer', ' for agentic commerce. It sits between the AI agent and the merchant: makes the catalog discoverable, validates offers deterministically before any recommendation, and directs the customer, via redirect, straight to the merchant.'],
    whatIsLabel: 'What it is',
    whatIsNotLabel: 'What it is NOT',
    whatIs: ['Discovery layer for agents', 'Attribution layer (who brought the order)', 'Deterministic offer validation', 'Bridge between AI and the real merchant'],
    whatIsNot: ['Not Merchant of Record', 'Does not process payments, does not touch money', 'Does not collect personal customer data', 'Does not use crypto / wallets / x402'],
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
    merchantsTitle: 'For merchants',
    merchantBullets: [
      { b: 'Agentic visibility', rest: ' without rebuilding the site — the catalog becomes discoverable as-is.' },
      { b: 'You stay Merchant of Record', rest: ' — payment and delivery stay fully with you.' },
      { b: 'Zero personal data', rest: ' of customers sent to AI models.' },
      { b: 'Commission on result', rest: ' — you pay only for confirmed, delivered and collected orders.' },
    ],
    modelLabel: 'Commercial model',
    modelTitle: 'You pay when you sell.\nNot before.',
    modelDesc: 'A percentage of the value of orders brought through the agentic channel, applied only to completed orders. No startup subscription to be discoverable.',
    modelCta: 'I want to be discoverable',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What is an Agentic Marketplace?', a: 'A discovery layer for AI-to-AI commerce: agents (ChatGPT, Claude, Perplexity, Gemini) discover, evaluate and recommend products from real merchants, reading a cryptographically signed catalog instead of heavy web pages.' },
      { q: 'Does CatyAI process payments or deliveries?', a: 'No. CatyAI is a discovery and attribution layer. The merchant remains Merchant of Record: the customer pays and receives the order directly from the merchant. CatyAI does not touch money and does not collect personal data.' },
      { q: 'Do I need to rebuild my site?', a: 'No. Your catalog becomes visible to agents without changes to the site. The agent\'s recommendation brings the customer, via redirect, directly to your page.' },
      { q: 'Do you use crypto or wallets for payment?', a: 'No. Unlike x402 / AP2 protocols, payment remains classic, at the merchant, in local currency. CatyAI does not use stablecoin or on-chain settlement.' },
      { q: 'How is billing done?', a: 'Commission on result: a percentage of the value of confirmed orders (delivered and collected), not at simple placement.' },
    ],
    ctaTitle: 'Make your products discoverable for the next generation of buyers.',
    ctaSub: 'Connect your store and enter the agentic catalog. No site rebuild, no risk.',
    ctaCta: 'Connect your store',
    ctaDocs: 'Documentation',
    svgLabels: ['SIGNED CATALOG', 'DISCOVERY', 'VALIDATION', 'shop.catyai.io · 302', 'MERCHANT · MoR'],
    svgSubs: ['NAP · Ed25519 · semantic index', 'direct query, machine format', 'APO → CEE → TSO', 'sig · offer · price', 'redirect to merchant + ?ref'],
  },
  ro: {
    meta: { title: 'Agentic Marketplace — comerț AI-to-AI verificat | CatyAI', desc: 'CatyAI face produsele comercianților reali descoperibile și recomandabile de agenții AI. Catalog semnat Ed25519, validare deterministă, redirect la comerciant. Fără cripto, fără API, fără PII.' },
    badge: 'Agentic Marketplace',
    heroTitle: 'Comerț AI-to-AI.',
    heroTitle2: 'Pentru produse reale.',
    heroSub: 'ChatGPT, Claude, Perplexity și Gemini recomandă deja produse clienților tăi — fără să te menționeze. CatyAI îți face catalogul descoperibil, de încredere și tranzacționabil pentru ei. Fără să-ți refaci site-ul, fără cripto, fără să predai banii sau datele clientului.',
    heroCta: 'Conectează magazinul',
    heroCtaAlt: 'Cum funcționează →',
    heroBadges: ['9 crawlere AI', 'Semnătură Ed25519', 'Comerciant = MoR', '0 date PII'],
    principles: [
      { label: 'Nu atinge banii', desc: 'Comerciantul rămâne Merchant of Record. Plata și livrarea rămân integral la el.' },
      { label: 'Nu atinge datele', desc: 'Zero date personale ale clientului trimise către modelele AI. Conformitate prin design.' },
      { label: 'Nu refaci site-ul', desc: 'Catalogul devine vizibil agenților fără nicio modificare a magazinului existent.' },
    ],
    contextTitle: 'Comerțul agentic e deja realitate — dar pe alt teren',
    contextP1: 'Marile protocoale construiesc deja infrastructura pentru tranzacții între agenți: Stripe lucrează la plăți inițiate de agent și cataloage citibile de mașini; Coinbase și ecosistemul x402 au lansat piețe unde agenții descoperă și plătesc servicii digitale în stablecoin; Google împinge protocoale de plată agent-la-agent. Direcția nu mai e o speculație.',
    contextP2: ['Toate aceste platforme rezolvă însă ', 'comerțul cu servicii digitale', ', decontat cripto, cu agentul ca un cumpărător cu portofel. Niciuna nu se adresează comerciantului tradițional — cel care vinde produse fizice, încasează în lei, nu are wallet x402 și nu-și va rescrie infrastructura. ', 'Exact acolo operează CatyAI.'],
    problemTitle: 'Problema: AI Blindness',
    problemSub: 'Crawlerele orientate spre modele de limbaj citesc HTML brut și ignoră JavaScript-ul executat în browser. Magazinele construite ca aplicații dinamice le apar agenților ca pagini aproape goale. Produsul există, dar pentru AI e invizibil.',
    problemCards: [
      { h: 'Invizibil', p: 'Conținutul randat în browser nu ajunge niciodată la crawlerul AI. Produsul nu poate fi nici măcar citat.' },
      { h: 'Citat ≠ de încredere', p: 'Chiar dacă un produs e menționat, agentul nu poate verifica cine e vânzătorul, dacă prețul e real sau dacă oferta mai există.' },
      { h: 'De încredere ≠ vandabil', p: 'Fără o ofertă structurată și o cale clară de cumpărare, recomandarea rămâne o vorbă bună, nu o tranzacție.' },
    ],
    whatTitle: 'Ce este CatyAI',
    whatSub: ['CatyAI este un ', 'strat de descoperire și atribuire', ' pentru comerțul agentic. Stă între agentul AI și comerciant: face catalogul descoperibil, validează ofertele determinist înainte de orice recomandare și conduce clientul, prin redirect, direct la comerciant.'],
    whatIsLabel: 'Ce este',
    whatIsNotLabel: 'Ce NU este',
    whatIs: ['Strat de descoperire pentru agenți', 'Strat de atribuire (cine a adus comanda)', 'Validare deterministă a ofertelor', 'Punte între AI și comerciantul real'],
    whatIsNot: ['Nu e Merchant of Record', 'Nu procesează plăți, nu atinge banii', 'Nu colectează datele personale ale clientului', 'Nu folosește cripto / wallet-uri / x402'],
    howTitle: 'Cum funcționează, pas cu pas',
    steps: [
      { n: '01', h: 'Catalog semnat', p: 'Catalogul comerciantului e indexat semantic și semnat criptografic (Ed25519), împreună cu datele de identitate verificate (NAP). Agentul nu primește text liber pe care trebuie să-l creadă, ci date a căror autenticitate o poate verifica matematic.' },
      { n: '02', h: 'Descoperire', p: 'Când un agent caută un produs, interoghează catalogul semantic direct, în format conceput pentru mașini — nu prin scraping de pagini. Răspunsul e structurat, complet și instant.' },
      { n: '03', h: 'Validare deterministă', p: 'Înainte ca o ofertă să fie recomandată, trece printr-un lanț determinist: se verifică semnătura, existența reală a ofertei și corectitudinea prețului. Niciodată o ofertă nesigură sau inventată.', tag: 'APO → CEE → TSO' },
      { n: '04', h: 'Redirect prin shop.catyai.io', p: 'Linkul pe care agentul îl recomandă trăiește pe domeniul CatyAI — shop.catyai.io/{magazin}/{produs} — care face un redirect 302 către pagina reală a produsului de pe site-ul comerciantului, purtând cu el un parametru de referință.' },
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
    merchantsTitle: 'Pentru comercianți',
    merchantBullets: [
      { b: 'Vizibilitate agentică', rest: ' fără refacerea site-ului — catalogul devine descoperibil așa cum e.' },
      { b: 'Rămâi Merchant of Record', rest: ' — plata și livrarea rămân integral la tine.' },
      { b: 'Zero date personale', rest: ' ale clienților trimise către modelele AI.' },
      { b: 'Comision pe rezultat', rest: ' — plătești doar pentru comenzile confirmate, livrate și încasate.' },
    ],
    modelLabel: 'Model comercial',
    modelTitle: 'Plătești când vinzi.\nNu înainte.',
    modelDesc: 'Un procent din valoarea comenzilor aduse prin canalul agentic, aplicat doar la comenzile finalizate. Fără abonament de pornire pentru a fi descoperibil.',
    modelCta: 'Vreau să fiu descoperibil',
    faqTitle: 'Întrebări frecvente',
    faq: [
      { q: 'Ce este un Agentic Marketplace?', a: 'Un strat de descoperire pentru comerțul AI-to-AI: agenții (ChatGPT, Claude, Perplexity, Gemini) descoperă, evaluează și recomandă produse de la comercianți reali, citind un catalog semnat criptografic în loc de pagini web greoaie.' },
      { q: 'CatyAI procesează plățile sau livrările?', a: 'Nu. CatyAI este strat de descoperire și atribuire. Comerciantul rămâne Merchant of Record: clientul plătește și primește comanda direct la comerciant. CatyAI nu atinge banii și nu colectează date personale.' },
      { q: 'Trebuie să-mi refac site-ul?', a: 'Nu. Catalogul tău devine vizibil agenților fără modificări pe site. Recomandarea agentului duce clientul, prin redirect, direct la pagina ta.' },
      { q: 'Folosiți cripto sau wallet-uri pentru plată?', a: 'Nu. Spre deosebire de protocoalele x402 / AP2, plata rămâne clasică, la comerciant, în lei. CatyAI nu folosește stablecoin sau decontare on-chain.' },
      { q: 'Cum se facturează?', a: 'Comision pe rezultat: un procent din valoarea comenzilor confirmate (livrate și încasate), nu la simpla plasare.' },
    ],
    ctaTitle: 'Fă-ți produsele descoperibile pentru următoarea generație de cumpărători.',
    ctaSub: 'Conectează magazinul și intră în catalogul agentic. Fără refacere de site, fără risc.',
    ctaCta: 'Conectează magazinul',
    ctaDocs: 'Documentație',
    svgLabels: ['CATALOG SEMNAT', 'DESCOPERIRE', 'VALIDARE', 'shop.catyai.io · 302', 'COMERCIANT · MoR'],
    svgSubs: ['NAP · Ed25519 · indexat semantic', 'interogare directă, format mașină', 'APO → CEE → TSO', 'semnătură · ofertă · preț', 'redirect → comerciant + ?ref'],
  },
  es: {
    meta: { title: 'Agentic Marketplace — comercio IA-a-IA verificado | CatyAI', desc: 'CatyAI hace que los productos de comerciantes reales sean descubribles por agentes de IA. Catálogo firmado Ed25519, validación determinista, redirección al comerciante.' },
    badge: 'Agentic Marketplace',
    heroTitle: 'Comercio IA-a-IA.',
    heroTitle2: 'Para productos reales.',
    heroSub: 'ChatGPT, Claude, Perplexity y Gemini ya recomiendan productos a tus clientes — sin mencionarte. CatyAI hace que tu catálogo sea descubrible, confiable y transaccionable. Sin reconstruir tu sitio, sin cripto, sin entregar dinero ni datos del cliente.',
    heroCta: 'Conecta tu tienda',
    heroCtaAlt: 'Cómo funciona →',
    heroBadges: ['9 crawlers IA', 'Firma Ed25519', 'Comerciante = MoR', '0 datos PII'],
    principles: [
      { label: 'No toca el dinero', desc: 'El comerciante sigue siendo Merchant of Record. El pago y la entrega quedan íntegramente con él.' },
      { label: 'No toca los datos', desc: 'Cero datos personales del cliente enviados a los modelos de IA. Cumplimiento por diseño.' },
      { label: 'No reconstruyes el sitio', desc: 'El catálogo se vuelve visible para los agentes sin ninguna modificación de la tienda existente.' },
    ],
    contextTitle: 'El comercio agéntico ya es real — pero en otro terreno',
    contextP1: 'Los grandes protocolos ya están construyendo infraestructura para transacciones entre agentes: Stripe trabaja en pagos iniciados por agentes; Coinbase y el ecosistema x402 lanzaron mercados donde los agentes pagan servicios digitales en stablecoin; Google impulsa protocolos de pago agente-a-agente.',
    contextP2: ['Todas estas plataformas resuelven el ', 'comercio de servicios digitales', ', liquidado en cripto, con el agente como comprador con cartera. Ninguna se dirige al comerciante tradicional que vende productos físicos y cobra en moneda local. ', 'Exactamente donde opera CatyAI.'],
    problemTitle: 'El problema: AI Blindness',
    problemSub: 'Los crawlers orientados a LLM leen HTML bruto e ignoran el JavaScript ejecutado en el navegador. Las tiendas construidas como apps dinámicas aparecen ante los agentes como páginas casi vacías.',
    problemCards: [
      { h: 'Invisible', p: 'El contenido renderizado en el navegador nunca llega al crawler de IA. El producto ni siquiera puede ser citado.' },
      { h: 'Citado ≠ confiable', p: 'Aunque se mencione un producto, el agente no puede verificar quién es el vendedor, si el precio es real o si la oferta existe.' },
      { h: 'Confiable ≠ vendible', p: 'Sin una oferta estructurada y un camino claro de compra, la recomendación queda como una buena palabra, no una transacción.' },
    ],
    whatTitle: 'Qué es CatyAI',
    whatSub: ['CatyAI es una ', 'capa de descubrimiento y atribución', ' para el comercio agéntico. Se sitúa entre el agente de IA y el comerciante: hace el catálogo descubrible, valida las ofertas de forma determinista y lleva al cliente directamente al comerciante.'],
    whatIsLabel: 'Qué es',
    whatIsNotLabel: 'Qué NO es',
    whatIs: ['Capa de descubrimiento para agentes', 'Capa de atribución (quién trajo el pedido)', 'Validación determinista de ofertas', 'Puente entre la IA y el comerciante real'],
    whatIsNot: ['No es Merchant of Record', 'No procesa pagos, no toca el dinero', 'No recopila datos personales del cliente', 'No usa cripto / carteras / x402'],
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
    posSub: ['CatyAI no compite con los rieles de pago agéntico — los complementa. CatyAI resuelve la ', 'última milla para los productos físicos de comerciantes reales', ', que no tienen tiempo ni presupuesto para reconstruir su infraestructura.'],
    posLeft: { tag: 'Protocolos globales (x402, AP2, Stripe)', items: ['Venden servicios / APIs digitales', 'Comprador: agente con cartera, sin humano', 'Liquidación en stablecoin / on-chain', 'Requieren API e integración del comerciante'] },
    posRight: { tag: 'CatyAI', items: ['Productos físicos de retail (RO / UE)', 'Comprador: humano finaliza en el comerciante', 'Pago clásico, en moneda local', 'Cero reconstrucción de sitio, cero API obligatoria'] },
    merchantsTitle: 'Para comerciantes',
    merchantBullets: [
      { b: 'Visibilidad agéntica', rest: ' sin reconstruir el sitio — el catálogo se vuelve descubrible tal como está.' },
      { b: 'Sigues siendo Merchant of Record', rest: ' — el pago y la entrega quedan íntegramente contigo.' },
      { b: 'Cero datos personales', rest: ' de clientes enviados a los modelos de IA.' },
      { b: 'Comisión por resultado', rest: ' — pagas solo por los pedidos confirmados, entregados y cobrados.' },
    ],
    modelLabel: 'Modelo comercial',
    modelTitle: 'Pagas cuando vendes.\nNo antes.',
    modelDesc: 'Un porcentaje del valor de los pedidos traídos por el canal agéntico, solo a los pedidos completados. Sin suscripción inicial para ser descubrible.',
    modelCta: 'Quiero ser descubrible',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Qué es un Agentic Marketplace?', a: 'Una capa de descubrimiento para el comercio IA-a-IA: los agentes descubren, evalúan y recomiendan productos de comerciantes reales, leyendo un catálogo firmado criptográficamente.' },
      { q: '¿CatyAI procesa pagos o entregas?', a: 'No. CatyAI es una capa de descubrimiento y atribución. El comerciante sigue siendo Merchant of Record. CatyAI no toca el dinero ni recopila datos personales.' },
      { q: '¿Necesito reconstruir mi sitio?', a: 'No. Tu catálogo se vuelve visible para los agentes sin cambios en el sitio.' },
      { q: '¿Usan cripto o carteras para el pago?', a: 'No. El pago sigue siendo clásico, en el comerciante, en moneda local. CatyAI no usa stablecoin ni liquidación on-chain.' },
      { q: '¿Cómo se factura?', a: 'Comisión por resultado: un porcentaje del valor de los pedidos confirmados, no al simple registro.' },
    ],
    ctaTitle: 'Haz que tus productos sean descubribles para la próxima generación de compradores.',
    ctaSub: 'Conecta tu tienda y entra en el catálogo agéntico. Sin reconstrucción de sitio, sin riesgo.',
    ctaCta: 'Conecta tu tienda',
    ctaDocs: 'Documentación',
    svgLabels: ['CATÁLOGO FIRMADO', 'DESCUBRIMIENTO', 'VALIDACIÓN', 'shop.catyai.io · 302', 'COMERCIANTE · MoR'],
    svgSubs: ['NAP · Ed25519 · índice semántico', 'consulta directa, formato máquina', 'APO → CEE → TSO', 'sig · oferta · precio', 'redirección → comerciante + ?ref'],
  },
  pt: {
    meta: { title: 'Agentic Marketplace — comércio IA-a-IA verificado | CatyAI', desc: 'CatyAI torna os produtos de comerciantes reais descobríveis por agentes de IA. Catálogo assinado Ed25519, validação determinística, redirecionamento ao comerciante.' },
    badge: 'Agentic Marketplace',
    heroTitle: 'Comércio IA-a-IA.',
    heroTitle2: 'Para produtos reais.',
    heroSub: 'ChatGPT, Claude, Perplexity e Gemini já recomendam produtos aos seus clientes — sem mencionar você. CatyAI torna seu catálogo descobrível, confiável e transacionável. Sem reconstruir seu site, sem cripto, sem entregar dinheiro ou dados do cliente.',
    heroCta: 'Conectar sua loja',
    heroCtaAlt: 'Como funciona →',
    heroBadges: ['9 crawlers IA', 'Assinatura Ed25519', 'Comerciante = MoR', '0 dados PII'],
    principles: [
      { label: 'Não toca o dinheiro', desc: 'O comerciante permanece Merchant of Record. O pagamento e a entrega ficam integralmente com ele.' },
      { label: 'Não toca os dados', desc: 'Zero dados pessoais do cliente enviados aos modelos de IA. Conformidade por design.' },
      { label: 'Não reconstrói o site', desc: 'O catálogo torna-se visível aos agentes sem nenhuma modificação na loja existente.' },
    ],
    contextTitle: 'O comércio agêntico já é realidade — mas em outro terreno',
    contextP1: 'Os grandes protocolos já estão construindo infraestrutura para transações entre agentes: a Stripe trabalha em pagamentos iniciados por agentes; a Coinbase e o ecossistema x402 lançaram mercados onde os agentes pagam serviços digitais em stablecoin; o Google impulsiona protocolos agente-a-agente.',
    contextP2: ['Todas essas plataformas resolvem o ', 'comércio de serviços digitais', ', liquidado em cripto. Nenhuma se dirige ao comerciante que vende produtos físicos e recebe em moeda local. ', 'Exatamente onde o CatyAI opera.'],
    problemTitle: 'O problema: AI Blindness',
    problemSub: 'Os crawlers orientados para LLM leem HTML bruto e ignoram o JavaScript. As lojas construídas como apps dinâmicos aparecem para os agentes como páginas quase vazias.',
    problemCards: [
      { h: 'Invisível', p: 'O conteúdo renderizado no navegador nunca chega ao crawler de IA. O produto nem sequer pode ser citado.' },
      { h: 'Citado ≠ confiável', p: 'Mesmo que um produto seja mencionado, o agente não pode verificar quem é o vendedor, se o preço é real ou se a oferta existe.' },
      { h: 'Confiável ≠ vendável', p: 'Sem uma oferta estruturada e um caminho claro de compra, a recomendação fica como uma boa palavra, não uma transação.' },
    ],
    whatTitle: 'O que é o CatyAI',
    whatSub: ['O CatyAI é uma ', 'camada de descoberta e atribuição', ' para o comércio agêntico. Fica entre o agente de IA e o comerciante: torna o catálogo descobrível, valida as ofertas deterministicamente e direciona o cliente diretamente ao comerciante.'],
    whatIsLabel: 'O que é',
    whatIsNotLabel: 'O que NÃO é',
    whatIs: ['Camada de descoberta para agentes', 'Camada de atribuição (quem trouxe o pedido)', 'Validação determinística de ofertas', 'Ponte entre a IA e o comerciante real'],
    whatIsNot: ['Não é Merchant of Record', 'Não processa pagamentos, não toca o dinheiro', 'Não coleta dados pessoais do cliente', 'Não usa cripto / carteiras / x402'],
    howTitle: 'Como funciona, passo a passo',
    steps: [
      { n: '01', h: 'Catálogo assinado', p: 'O catálogo do comerciante é indexado semanticamente e assinado criptograficamente (Ed25519), com os dados de identidade verificados (NAP). O agente recebe dados cuja autenticidade pode verificar matematicamente.' },
      { n: '02', h: 'Descoberta', p: 'Quando um agente busca um produto, consulta o catálogo semântico diretamente, em formato projetado para máquinas. A resposta é estruturada, completa e instantânea.' },
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
    posSub: ['O CatyAI não compete com os trilhos de pagamento agêntico — os complementa. CatyAI resolve a ', 'última milha para os produtos físicos de comerciantes reais', ', que não têm tempo nem orçamento para reconstruir sua infraestrutura.'],
    posLeft: { tag: 'Protocolos globais (x402, AP2, Stripe)', items: ['Vendem serviços / APIs digitais', 'Comprador: agente com carteira, sem humano', 'Liquidação em stablecoin / on-chain', 'Exigem API e integração do comerciante'] },
    posRight: { tag: 'CatyAI', items: ['Produtos físicos de varejo (RO / UE)', 'Comprador: humano finaliza no comerciante', 'Pagamento clássico, em moeda local', 'Zero reconstrução de site, zero API obrigatória'] },
    merchantsTitle: 'Para comerciantes',
    merchantBullets: [
      { b: 'Visibilidade agêntica', rest: ' sem reconstruir o site — o catálogo torna-se descobrível como está.' },
      { b: 'Você permanece Merchant of Record', rest: ' — o pagamento e a entrega ficam integralmente com você.' },
      { b: 'Zero dados pessoais', rest: ' de clientes enviados aos modelos de IA.' },
      { b: 'Comissão por resultado', rest: ' — você paga apenas pelos pedidos confirmados, entregues e recebidos.' },
    ],
    modelLabel: 'Modelo comercial',
    modelTitle: 'Você paga quando vende.\nNão antes.',
    modelDesc: 'Uma porcentagem do valor dos pedidos trazidos pelo canal agêntico, apenas aos pedidos concluídos. Sem assinatura inicial para ser descobrível.',
    modelCta: 'Quero ser descobrível',
    faqTitle: 'Perguntas frequentes',
    faq: [
      { q: 'O que é um Agentic Marketplace?', a: 'Uma camada de descoberta para o comércio IA-a-IA: os agentes descobrem, avaliam e recomendam produtos de comerciantes reais, lendo um catálogo assinado criptograficamente.' },
      { q: 'O CatyAI processa pagamentos ou entregas?', a: 'Não. O comerciante permanece Merchant of Record. O CatyAI não toca o dinheiro nem coleta dados pessoais.' },
      { q: 'Preciso reconstruir meu site?', a: 'Não. Seu catálogo torna-se visível para os agentes sem mudanças no site.' },
      { q: 'Vocês usam cripto ou carteiras para pagamento?', a: 'Não. O pagamento permanece clássico, no comerciante, em moeda local.' },
      { q: 'Como é faturado?', a: 'Comissão por resultado: uma porcentagem do valor dos pedidos confirmados, não no simples registro.' },
    ],
    ctaTitle: 'Torne seus produtos descobríveis para a próxima geração de compradores.',
    ctaSub: 'Conecte sua loja e entre no catálogo agêntico. Sem reconstrução de site, sem risco.',
    ctaCta: 'Conectar sua loja',
    ctaDocs: 'Documentação',
    svgLabels: ['CATÁLOGO ASSINADO', 'DESCOBERTA', 'VALIDAÇÃO', 'shop.catyai.io · 302', 'COMERCIANTE · MoR'],
    svgSubs: ['NAP · Ed25519 · índice semântico', 'consulta direta, formato máquina', 'APO → CEE → TSO', 'sig · oferta · preço', 'redirecionamento → comerciante + ?ref'],
  },
  fr: {
    meta: { title: 'Agentic Marketplace — commerce IA-à-IA vérifié | CatyAI', desc: 'CatyAI rend les produits des vrais commerçants découvrables par les agents IA. Catalogue signé Ed25519, validation déterministe, redirection vers le commerçant.' },
    badge: 'Agentic Marketplace',
    heroTitle: 'Commerce IA-à-IA.',
    heroTitle2: 'Pour de vrais produits.',
    heroSub: 'ChatGPT, Claude, Perplexity et Gemini recommandent déjà des produits à vos clients — sans vous mentionner. CatyAI rend votre catalogue découvrable, fiable et transactionnable. Sans reconstruire votre site, sans crypto, sans céder l\'argent ni les données client.',
    heroCta: 'Connecter ma boutique',
    heroCtaAlt: 'Comment ça marche →',
    heroBadges: ['9 crawlers IA', 'Signature Ed25519', 'Commerçant = MoR', '0 données PII'],
    principles: [
      { label: 'Ne touche pas l\'argent', desc: 'Le commerçant reste Merchant of Record. Le paiement et la livraison restent entièrement chez lui.' },
      { label: 'Ne touche pas les données', desc: 'Zéro donnée personnelle du client envoyée aux modèles IA. Conformité par conception.' },
      { label: 'Ne reconstruit pas le site', desc: 'Le catalogue devient visible aux agents sans aucune modification du magasin existant.' },
    ],
    contextTitle: 'Le commerce agentique est déjà réel — mais sur un autre terrain',
    contextP1: 'Les grands protocoles construisent déjà l\'infrastructure pour les transactions entre agents : Stripe travaille sur les paiements initiés par agents ; Coinbase et l\'écosystème x402 ont lancé des marchés où les agents paient des services numériques en stablecoin ; Google pousse des protocoles de paiement agent-à-agent.',
    contextP2: ['Toutes ces plateformes résolvent le ', 'commerce de services numériques', ', réglé en crypto. Aucune ne s\'adresse au commerçant traditionnel qui vend des produits physiques et encaisse en monnaie locale. ', 'C\'est exactement là qu\'opère CatyAI.'],
    problemTitle: 'Le problème : AI Blindness',
    problemSub: 'Les crawlers orientés LLM lisent du HTML brut et ignorent le JavaScript. Les boutiques construites comme des apps dynamiques apparaissent aux agents comme des pages presque vides.',
    problemCards: [
      { h: 'Invisible', p: 'Le contenu rendu dans le navigateur n\'atteint jamais le crawler IA. Le produit ne peut même pas être cité.' },
      { h: 'Cité ≠ fiable', p: 'Même si un produit est mentionné, l\'agent ne peut pas vérifier qui est le vendeur, si le prix est réel ou si l\'offre existe encore.' },
      { h: 'Fiable ≠ vendable', p: 'Sans une offre structurée et un chemin d\'achat clair, la recommandation reste une bonne parole, pas une transaction.' },
    ],
    whatTitle: 'Qu\'est-ce que CatyAI',
    whatSub: ['CatyAI est une ', 'couche de découverte et d\'attribution', ' pour le commerce agentique. Il se situe entre l\'agent IA et le commerçant : rend le catalogue découvrable, valide les offres de manière déterministe et dirige le client directement vers le commerçant.'],
    whatIsLabel: 'Ce qu\'il est',
    whatIsNotLabel: 'Ce qu\'il N\'est PAS',
    whatIs: ['Couche de découverte pour les agents', 'Couche d\'attribution (qui a apporté la commande)', 'Validation déterministe des offres', 'Pont entre l\'IA et le vrai commerçant'],
    whatIsNot: ['N\'est pas Merchant of Record', 'Ne traite pas les paiements, ne touche pas l\'argent', 'Ne collecte pas les données personnelles du client', 'N\'utilise pas de crypto / portefeuilles / x402'],
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
    posSub: ['CatyAI ne concurrence pas les rails de paiement agentique — il les complète. CatyAI résout le ', 'dernier kilomètre pour les produits physiques des vrais commerçants', ', qui n\'ont pas le temps ni le budget pour reconstruire leur infrastructure.'],
    posLeft: { tag: 'Protocoles globaux (x402, AP2, Stripe)', items: ['Vendent des services / APIs numériques', 'Acheteur : agent avec portefeuille, sans humain', 'Règlement en stablecoin / on-chain', 'Requièrent API et intégration du commerçant'] },
    posRight: { tag: 'CatyAI', items: ['Produits physiques de détail (RO / UE)', 'Acheteur : humain finalise chez le commerçant', 'Paiement classique, en monnaie locale', 'Zéro reconstruction de site, zéro API obligatoire'] },
    merchantsTitle: 'Pour les commerçants',
    merchantBullets: [
      { b: 'Visibilité agentique', rest: ' sans reconstruire le site — le catalogue devient découvrable tel quel.' },
      { b: 'Vous restez Merchant of Record', rest: ' — le paiement et la livraison restent entièrement chez vous.' },
      { b: 'Zéro donnée personnelle', rest: ' des clients envoyée aux modèles IA.' },
      { b: 'Commission sur résultat', rest: ' — vous ne payez que pour les commandes confirmées, livrées et encaissées.' },
    ],
    modelLabel: 'Modèle commercial',
    modelTitle: 'Vous payez quand vous vendez.\nPas avant.',
    modelDesc: 'Un pourcentage de la valeur des commandes apportées par le canal agentique, appliqué uniquement aux commandes complétées. Sans abonnement de démarrage.',
    modelCta: 'Je veux être découvrable',
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Qu\'est-ce qu\'un Agentic Marketplace ?', a: 'Une couche de découverte pour le commerce IA-à-IA : les agents découvrent, évaluent et recommandent des produits de vrais commerçants, en lisant un catalogue signé cryptographiquement.' },
      { q: 'CatyAI traite-t-il les paiements ou les livraisons ?', a: 'Non. Le commerçant reste Merchant of Record. CatyAI ne touche pas l\'argent et ne collecte pas de données personnelles.' },
      { q: 'Dois-je reconstruire mon site ?', a: 'Non. Votre catalogue devient visible aux agents sans modifications du site.' },
      { q: 'Utilisez-vous de la crypto ou des portefeuilles pour le paiement ?', a: 'Non. Le paiement reste classique, chez le commerçant, en monnaie locale.' },
      { q: 'Comment est-ce facturé ?', a: 'Commission sur résultat : un pourcentage du valeur des commandes confirmées, pas au simple enregistrement.' },
    ],
    ctaTitle: 'Rendez vos produits découvrables pour la prochaine génération d\'acheteurs.',
    ctaSub: 'Connectez votre boutique et entrez dans le catalogue agentique. Sans reconstruction de site, sans risque.',
    ctaCta: 'Connecter ma boutique',
    ctaDocs: 'Documentation',
    svgLabels: ['CATALOGUE SIGNÉ', 'DÉCOUVERTE', 'VALIDATION', 'shop.catyai.io · 302', 'COMMERÇANT · MoR'],
    svgSubs: ['NAP · Ed25519 · index sémantique', 'requête directe, format machine', 'APO → CEE → TSO', 'sig · offre · prix', 'redirection → commerçant + ?ref'],
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'CatyAI', url: 'https://catyai.io', description: 'Discovery and attribution layer for AI-to-AI agentic commerce, with deterministic validation and cryptographically signed offers.', parentOrganization: { '@type': 'Organization', name: 'PayAi-X FZE' } },
    { '@type': 'Service', name: 'CatyAI Agentic Marketplace', serviceType: 'AI-to-AI commerce discovery & attribution', provider: { '@type': 'Organization', name: 'CatyAI' }, areaServed: 'EU', description: 'Ed25519 signed catalog, deterministic APO→CEE→TSO validation, redirect to merchant as Merchant of Record.' },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What is an Agentic Marketplace?', acceptedAnswer: { '@type': 'Answer', text: 'A discovery layer for AI-to-AI commerce: agents discover and recommend products from real merchants via a cryptographically signed catalog.' } },
      { '@type': 'Question', name: 'Does CatyAI process payments?', acceptedAnswer: { '@type': 'Answer', text: 'No. The merchant remains Merchant of Record. CatyAI does not touch money and does not collect personal customer data.' } },
      { '@type': 'Question', name: 'Do I need to rebuild my site?', acceptedAnswer: { '@type': 'Answer', text: 'No. The catalog becomes visible to agents without changes to the existing site.' } },
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
                <h1 className="font-extrabold tracking-tight text-5xl sm:text-6xl leading-[1.02] mt-6 text-white">{t.heroTitle}</h1>
                <p className="font-extrabold tracking-tight text-3xl sm:text-4xl text-[#d4b07a] mt-1">{t.heroTitle2}</p>
                <p className="text-[17px] text-[#8b96ab] mt-6 leading-relaxed max-w-xl">{t.heroSub}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#contact" className="font-bold px-6 py-3 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>{t.heroCta}</a>
                  <a href="#cum" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-6 py-3 rounded-lg text-white hover:border-[#5c6883] transition">{t.heroCtaAlt}</a>
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

          {/* PRINCIPLES STRIP */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid sm:grid-cols-3 gap-px bg-[#1f293f] border-x border-[#1f293f]">
                {t.principles.map((p) => (
                  <div key={p.label} className="bg-[#0c1322] p-7">
                    <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{p.label}</div>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MARKET CONTEXT */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.contextTitle}</h2>
              <div className="grid md:grid-cols-2 gap-10 mt-8">
                <p className="text-[#8b96ab] leading-relaxed">{t.contextP1}</p>
                <p className="text-[#8b96ab] leading-relaxed">
                  {t.contextP2[0]}<span className="text-[#c7d0e0] font-semibold">{t.contextP2[1]}</span>{t.contextP2[2]}<span className="text-[#d4b07a] font-semibold">{t.contextP2[3]}</span>
                </p>
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

          {/* WHAT IS */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.whatTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">
                {t.whatSub[0]}<span className="text-[#c7d0e0] font-semibold">{t.whatSub[1]}</span>{t.whatSub[2]}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="border border-[#34d399]/30 bg-[#34d399]/[.05] rounded-xl p-6">
                  <div className="text-[11px] text-[#34d399] mb-3 uppercase font-mono tracking-widest">{t.whatIsLabel}</div>
                  <ul className="space-y-2 text-sm text-[#8b96ab]">{t.whatIs.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
                <div className="border border-[#ef4444]/25 bg-[#ef4444]/[.05] rounded-xl p-6">
                  <div className="text-[11px] text-[#ef4444] mb-3 uppercase font-mono tracking-widest">{t.whatIsNotLabel}</div>
                  <ul className="space-y-2 text-sm text-[#8b96ab]">{t.whatIsNot.map((item) => <li key={item}>— {item}</li>)}</ul>
                </div>
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

          {/* MERCHANTS + MODEL */}
          <section id="comercianti" className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.merchantsTitle}</h2>
              <div className="grid md:grid-cols-2 gap-10 mt-8 items-stretch">
                <ul className="space-y-4 self-center">
                  {t.merchantBullets.map((b) => (
                    <li key={b.b} className="flex gap-3">
                      <span className="text-[#d4b07a] mt-0.5">●</span>
                      <span className="text-[#8b96ab]"><span className="text-[#c7d0e0] font-semibold">{b.b}</span>{b.rest}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#111a2c] border border-[#1f293f] rounded-2xl p-8 flex flex-col justify-center">
                  <div className="text-[12px] text-[#5c6883] uppercase font-mono tracking-widest">{t.modelLabel}</div>
                  <p className="font-extrabold text-2xl mt-2 leading-snug text-white whitespace-pre-line">{t.modelTitle}</p>
                  <p className="text-sm text-[#8b96ab] mt-3 leading-relaxed">{t.modelDesc}</p>
                  <a href="#contact" className="mt-6 inline-block w-max font-bold px-5 py-2.5 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>
                    {t.modelCta}
                  </a>
                </div>
              </div>
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
                <a href="https://shop.catyai.io?ref=caty_lp_am" className="font-bold px-7 py-3.5 rounded-lg transition bg-[#d4b07a] text-[#0a0f1c] hover:bg-[#e7cfa3]" style={{ boxShadow: '0 8px 30px -10px rgba(212,176,122,.5)' }}>{t.ctaCta}</a>
                <a href="/protocol" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-7 py-3.5 rounded-lg text-white hover:border-[#5c6883] transition">{t.ctaDocs}</a>
              </div>
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}
