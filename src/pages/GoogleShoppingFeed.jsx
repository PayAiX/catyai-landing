import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'
import PartnerBadges from '../components/PartnerBadges'
import { MERCHANT_COUNT, productsShortM } from '../lib/catalogStats'

// Cifrele din sursa unică (src/lib/catalogStats.js, actualizată la build din
// /api/public/catalog-stats — aceeași interogare ca aff-llms.txt). Nu hardcoda.
const N_MERCHANTS = String(MERCHANT_COUNT)
const M_DOT = productsShortM('en')      // ex. „3.4M" — locale cu punct zecimal
const M_COMMA = productsShortM('ro')    // ex. „3,4M" — locale cu virgulă
const MIL_DOT = M_DOT.slice(0, -1)
const MIL_COMMA = M_COMMA.slice(0, -1)

const T = {
  en: {
    meta: { title: 'Google Shopping Feed Optimisation — data-quality pipeline | CatyAI', desc: 'Most merchant feeds are structurally broken: placeholder prices, wrong identifiers, stale availability. CatyAI fixes the data itself — AI enrichment, versioned validation, golden records — before it reaches Google Shopping.' },
    badge: 'Google Shopping Feed',
    heroTitle: 'Google Shopping Feed Optimisation',
    heroSub: 'Google ranks and matches products based entirely on feed data. A dirty feed does not just underperform — it produces policy violations, disapprovals and wasted ad spend. CatyAI fixes the data itself, at scale, before it reaches Google.',
    heroCta: 'Book a partnership call',
    heroCtaAlt: 'Facebook & Instagram feeds →',
    stats: [
      { v: M_DOT + '+', l: 'products processed' },
      { v: '~95%', l: 'measured acceptance rate' },
      { v: N_MERCHANTS, l: 'merchants in the network' },
    ],
    problemTitle: 'The problem with merchant feeds',
    problemIntro: 'Most product feeds are broken at the source. Not slightly imperfect — structurally broken. Across the affiliate and merchant feeds we process, we routinely find:',
    problems: [
      { h: 'Placeholder prices', p: 'Feeds that send price: 1 for unavailable products, producing nonsense listings and fake discount badges.' },
      { h: 'Missing or wrong regional formatting', p: 'Titles missing diacritics in Romanian feeds, inconsistent currency and decimal formats.' },
      { h: 'Broken identifiers', p: 'Missing GTINs, MPNs used as GTINs, brand fields containing legal entity names instead of brands.' },
      { h: 'Contaminated product codes', p: 'Volume and size values extracted as product codes, poisoning deduplication.' },
      { h: 'Stale availability', p: 'Products listed as in stock days after the merchant removed them.' },
    ],
    problemOutro: 'Google Shopping ranks and matches products based entirely on feed data. A dirty feed does not just underperform — it produces policy violations, disapprovals, and wasted ad spend.',
    pipeTitle: 'What CatyAI actually does',
    pipeSub: 'CatyAI is a data-quality pipeline for product feeds. Not a labeling tool on top of campaign metrics — a system that fixes the data itself, at scale, before it reaches Google.',
    steps: [
      { n: '01', h: 'AI enrichment at scale', p: 'We process raw merchant feeds through an AI enrichment pipeline that rewrites and completes product data: clean titles with correct regional characters, structured attributes, accurate categorization, normalized brands. Over ' + MIL_DOT + ' million products processed to date, with a measured acceptance rate of ~95% against our validation rules.' },
      { n: '02', h: 'Validation, not trust', p: 'Every enriched product passes through a versioned rules engine. Products that fail — hallucinated attributes, invalid structure, regional mismatches — are rejected or flagged, never silently published. Rules are versioned, so re-eligibility is deterministic: when a rule changes, affected products are automatically re-evaluated.' },
      { n: '03', h: 'Golden records and deduplication', p: 'Products from multiple merchants are matched into single golden records. This is what makes real price comparison possible — and it requires the cleaning steps above, because matching on dirty identifiers produces garbage.' },
      { n: '04', h: 'Feed hygiene at ingest', p: 'Placeholder prices, missing images, out-of-stock listings and non-creditable offers are filtered at ingestion, not patched later. A product that cannot be honestly listed does not enter the feed.' },
      { n: '05', h: 'Continuous measurement', p: 'Enrichment quality is not assumed — it is measured on sampled cohorts with automated abort thresholds. If a processing batch degrades below the quality gate, the system stops itself before it burns budget on bad output.' },
    ],
    whyTitle: 'Why this matters for Google Shopping',
    whyCards: [
      { h: 'Relevance', p: 'Complete, accurate attributes are how Google matches your products to queries.' },
      { h: 'Policy compliance', p: 'Misrepresentation and data-quality disapprovals almost always trace back to feed defects — placeholders, stale availability, wrong identifiers.' },
      { h: 'Comparison readiness', p: 'Clean golden records are the prerequisite for any real price-comparison experience.' },
    ],
    whoTitle: 'Who builds this',
    whoText: ['CatyAI is operated by the team behind PayAI-x, operating a Google-approved Comparison Shopping Service serving a network of ', N_MERCHANTS + ' merchants', '. The pipeline was built to solve our own feed-quality problems first — the tooling is the byproduct of operating a CSS, not the other way around.'],
    crossTitle: 'Same pipeline, more channels',
    crossText: 'The clean source of truth that produces Google-ready feeds also produces Meta-ready catalogs — Facebook dynamic ads, Advantage+ and Instagram Shopping, from the same validated data.',
    crossCta: 'Facebook & Instagram Shopping Feed Optimisation →',
    ctaTitle: 'Book a partnership call',
    ctaSub: 'Write to us at contact@catyai.io or call +40 756 730 193 — we\'ll discuss your catalog and the right package.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    panelRaw: 'RAW MERCHANT FEED',
    panelClean: 'ENRICHED + VALIDATED',
    panelGate: 'validation gate · versioned rules',
  },
  ro: {
    meta: { title: 'Optimizarea feed-ului Google Shopping — pipeline de calitate a datelor | CatyAI', desc: 'Majoritatea feed-urilor de comerciant sunt structural defecte: prețuri placeholder, identificatori greșiți, disponibilitate învechită. CatyAI repară datele în sine — enrichment AI, validare versionată, golden records — înainte să ajungă la Google Shopping.' },
    badge: 'Feed Google Shopping',
    heroTitle: 'Optimizarea feed-ului Google Shopping',
    heroSub: 'Google clasează și potrivește produsele exclusiv pe baza datelor din feed. Un feed murdar nu doar subperformează — produce încălcări de politici, respingeri și buget de ads irosit. CatyAI repară datele în sine, la scară, înainte să ajungă la Google.',
    heroCta: 'Programează o discuție de parteneriat',
    heroCtaAlt: 'Feed-uri Facebook & Instagram →',
    stats: [
      { v: M_COMMA + '+', l: 'produse procesate' },
      { v: '~95%', l: 'rată de acceptare măsurată' },
      { v: N_MERCHANTS, l: 'comercianți în rețea' },
    ],
    problemTitle: 'Problema cu feed-urile comercianților',
    problemIntro: 'Majoritatea feed-urilor de produse sunt defecte la sursă. Nu ușor imperfecte — structural defecte. În feed-urile de afiliere și de comerciant pe care le procesăm, găsim constant:',
    problems: [
      { h: 'Prețuri placeholder', p: 'Feed-uri care trimit price: 1 pentru produse indisponibile, generând listări absurde și badge-uri de reducere false.' },
      { h: 'Formatare regională lipsă sau greșită', p: 'Titluri fără diacritice în feed-uri românești, formate de monedă și zecimale inconsistente.' },
      { h: 'Identificatori defecți', p: 'GTIN-uri lipsă, MPN-uri folosite drept GTIN, câmpuri de brand care conțin nume de entități juridice în loc de branduri.' },
      { h: 'Coduri de produs contaminate', p: 'Valori de volum și dimensiune extrase drept coduri de produs, otrăvind deduplicarea.' },
      { h: 'Disponibilitate învechită', p: 'Produse listate ca fiind în stoc la zile după ce comerciantul le-a retras.' },
    ],
    problemOutro: 'Google Shopping clasează și potrivește produsele exclusiv pe baza datelor din feed. Un feed murdar nu doar subperformează — produce încălcări de politici, respingeri și buget de ads irosit.',
    pipeTitle: 'Ce face CatyAI de fapt',
    pipeSub: 'CatyAI este un pipeline de calitate a datelor pentru feed-uri de produse. Nu un tool de etichetare peste metricile de campanie — un sistem care repară datele în sine, la scară, înainte să ajungă la Google.',
    steps: [
      { n: '01', h: 'Enrichment AI la scară', p: 'Procesăm feed-uri brute de comerciant printr-un pipeline de enrichment AI care rescrie și completează datele de produs: titluri curate cu caractere regionale corecte, atribute structurate, categorisire precisă, branduri normalizate. Peste ' + MIL_COMMA + ' milioane de produse procesate până acum, cu o rată de acceptare măsurată de ~95% față de regulile noastre de validare.' },
      { n: '02', h: 'Validare, nu încredere', p: 'Fiecare produs enrichat trece printr-un motor de reguli versionat. Produsele care pică — atribute halucinate, structură invalidă, nepotriviri regionale — sunt respinse sau marcate, niciodată publicate pe furiș. Regulile sunt versionate, deci re-eligibilitatea e deterministică: când o regulă se schimbă, produsele afectate sunt re-evaluate automat.' },
      { n: '03', h: 'Golden records și deduplicare', p: 'Produsele de la mai mulți comercianți sunt grupate în golden records unice. Asta face posibilă comparația reală de prețuri — și necesită pașii de curățare de mai sus, pentru că matchingul pe identificatori murdari produce gunoi.' },
      { n: '04', h: 'Igiena feed-ului la ingest', p: 'Prețurile placeholder, imaginile lipsă, listările fără stoc și ofertele necreditabile sunt filtrate la ingest, nu peticite mai târziu. Un produs care nu poate fi listat onest nu intră în feed.' },
      { n: '05', h: 'Măsurare continuă', p: 'Calitatea enrichment-ului nu e presupusă — e măsurată pe cohorte eșantionate cu praguri automate de abort. Dacă un batch de procesare degradează sub pragul de calitate, sistemul se oprește singur înainte să ardă buget pe output defect.' },
    ],
    whyTitle: 'De ce contează pentru Google Shopping',
    whyCards: [
      { h: 'Relevanță', p: 'Atribute complete și precise sunt modul în care Google potrivește produsele tale cu interogările.' },
      { h: 'Conformitate cu politicile', p: 'Respingerile pentru misrepresentation și calitatea datelor se trag aproape întotdeauna din defecte de feed — placeholder-e, disponibilitate învechită, identificatori greșiți.' },
      { h: 'Pregătire pentru comparație', p: 'Golden records curate sunt prerechizitul oricărei experiențe reale de comparație de prețuri.' },
    ],
    whoTitle: 'Cine construiește asta',
    whoText: ['CatyAI este operat de echipa din spatele PayAI-x, care operează un serviciu de comparare prețuri (CSS) aprobat de Google, deservind o rețea de ', N_MERCHANTS + ' de comercianți', '. Pipeline-ul a fost construit mai întâi pentru a ne rezolva propriile probleme de calitate a feed-ului — toolingul este un produs secundar al operării unui CSS, nu invers.'],
    crossTitle: 'Același pipeline, mai multe canale',
    crossText: 'Sursa curată de adevăr care produce feed-uri gata de Google produce și cataloage gata de Meta — reclame dinamice Facebook, Advantage+ și Instagram Shopping, din aceleași date validate.',
    crossCta: 'Optimizarea feed-ului Facebook & Instagram Shopping →',
    ctaTitle: 'Programează o discuție de parteneriat',
    ctaSub: 'Scrie-ne la contact@catyai.io sau sună la +40 756 730 193 — discutăm catalogul tău și pachetul potrivit.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    panelRaw: 'FEED BRUT DE COMERCIANT',
    panelClean: 'ENRICHAT + VALIDAT',
    panelGate: 'poartă de validare · reguli versionate',
  },
  es: {
    meta: { title: 'Optimización del feed de Google Shopping — pipeline de calidad de datos | CatyAI', desc: 'La mayoría de los feeds de comerciantes están estructuralmente rotos: precios placeholder, identificadores incorrectos, disponibilidad desactualizada. CatyAI repara los datos en sí — enriquecimiento IA, validación versionada, golden records — antes de que lleguen a Google Shopping.' },
    badge: 'Feed de Google Shopping',
    heroTitle: 'Optimización del feed de Google Shopping',
    heroSub: 'Google clasifica y empareja productos basándose exclusivamente en los datos del feed. Un feed sucio no solo rinde peor — produce violaciones de políticas, rechazos y presupuesto publicitario desperdiciado. CatyAI repara los datos en sí, a escala, antes de que lleguen a Google.',
    heroCta: 'Programa una llamada de colaboración',
    heroCtaAlt: 'Feeds de Facebook e Instagram →',
    stats: [
      { v: M_COMMA + '+', l: 'productos procesados' },
      { v: '~95%', l: 'tasa de aceptación medida' },
      { v: N_MERCHANTS, l: 'comerciantes en la red' },
    ],
    problemTitle: 'El problema con los feeds de los comerciantes',
    problemIntro: 'La mayoría de los feeds de productos están rotos en el origen. No ligeramente imperfectos — estructuralmente rotos. En los feeds de afiliación y de comerciantes que procesamos, encontramos constantemente:',
    problems: [
      { h: 'Precios placeholder', p: 'Feeds que envían price: 1 para productos no disponibles, generando listados absurdos y etiquetas de descuento falsas.' },
      { h: 'Formato regional ausente o incorrecto', p: 'Títulos sin diacríticos, formatos de moneda y decimales inconsistentes.' },
      { h: 'Identificadores rotos', p: 'GTIN ausentes, MPN usados como GTIN, campos de marca que contienen nombres de entidades legales en lugar de marcas.' },
      { h: 'Códigos de producto contaminados', p: 'Valores de volumen y tamaño extraídos como códigos de producto, envenenando la deduplicación.' },
      { h: 'Disponibilidad desactualizada', p: 'Productos listados como en stock días después de que el comerciante los retirara.' },
    ],
    problemOutro: 'Google Shopping clasifica y empareja productos basándose exclusivamente en los datos del feed. Un feed sucio no solo rinde peor — produce violaciones de políticas, rechazos y presupuesto publicitario desperdiciado.',
    pipeTitle: 'Lo que CatyAI hace realmente',
    pipeSub: 'CatyAI es un pipeline de calidad de datos para feeds de productos. No una herramienta de etiquetado sobre métricas de campaña — un sistema que repara los datos en sí, a escala, antes de que lleguen a Google.',
    steps: [
      { n: '01', h: 'Enriquecimiento con IA a escala', p: 'Procesamos feeds brutos de comerciantes a través de un pipeline de enriquecimiento con IA que reescribe y completa los datos del producto: títulos limpios con caracteres regionales correctos, atributos estructurados, categorización precisa, marcas normalizadas. Más de ' + MIL_COMMA + ' millones de productos procesados hasta la fecha, con una tasa de aceptación medida de ~95% según nuestras reglas de validación.' },
      { n: '02', h: 'Validación, no confianza', p: 'Cada producto enriquecido pasa por un motor de reglas versionado. Los productos que fallan — atributos alucinados, estructura inválida, discrepancias regionales — son rechazados o marcados, nunca publicados silenciosamente. Las reglas están versionadas, por lo que la re-elegibilidad es determinista: cuando una regla cambia, los productos afectados se reevalúan automáticamente.' },
      { n: '03', h: 'Golden records y deduplicación', p: 'Los productos de múltiples comerciantes se agrupan en golden records únicos. Esto hace posible la comparación real de precios — y requiere los pasos de limpieza anteriores, porque el matching sobre identificadores sucios produce basura.' },
      { n: '04', h: 'Higiene del feed en la ingesta', p: 'Los precios placeholder, las imágenes ausentes, los listados sin stock y las ofertas no acreditables se filtran en la ingesta, no se parchean después. Un producto que no puede listarse honestamente no entra en el feed.' },
      { n: '05', h: 'Medición continua', p: 'La calidad del enriquecimiento no se asume — se mide en cohortes muestreadas con umbrales automáticos de aborto. Si un lote de procesamiento se degrada por debajo del umbral de calidad, el sistema se detiene solo antes de quemar presupuesto en output defectuoso.' },
    ],
    whyTitle: 'Por qué importa para Google Shopping',
    whyCards: [
      { h: 'Relevancia', p: 'Los atributos completos y precisos son la forma en que Google empareja tus productos con las consultas.' },
      { h: 'Cumplimiento de políticas', p: 'Los rechazos por misrepresentation y calidad de datos casi siempre se remontan a defectos del feed — placeholders, disponibilidad desactualizada, identificadores incorrectos.' },
      { h: 'Preparación para la comparación', p: 'Los golden records limpios son el prerrequisito de cualquier experiencia real de comparación de precios.' },
    ],
    whoTitle: 'Quién construye esto',
    whoText: ['CatyAI es operado por el equipo detrás de PayAI-x, que opera un servicio de comparación de precios (CSS) aprobado por Google, sirviendo a una red de ', N_MERCHANTS + ' comerciantes', '. El pipeline se construyó primero para resolver nuestros propios problemas de calidad de feed — la herramienta es un subproducto de operar un CSS, no al revés.'],
    crossTitle: 'El mismo pipeline, más canales',
    crossText: 'La fuente limpia de verdad que produce feeds listos para Google también produce catálogos listos para Meta — anuncios dinámicos de Facebook, Advantage+ e Instagram Shopping, desde los mismos datos validados.',
    crossCta: 'Optimización del feed de Facebook e Instagram Shopping →',
    ctaTitle: 'Programa una llamada de colaboración',
    ctaSub: 'Escríbenos a contact@catyai.io o llama al +40 756 730 193 — hablamos de tu catálogo y del paquete adecuado.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    panelRaw: 'FEED BRUTO DEL COMERCIANTE',
    panelClean: 'ENRIQUECIDO + VALIDADO',
    panelGate: 'control de validación · reglas versionadas',
  },
  pt: {
    meta: { title: 'Otimização do feed do Google Shopping — pipeline de qualidade de dados | CatyAI', desc: 'A maioria dos feeds de comerciantes está estruturalmente quebrada: preços placeholder, identificadores errados, disponibilidade desatualizada. A CatyAI corrige os próprios dados — enriquecimento IA, validação versionada, golden records — antes de chegarem ao Google Shopping.' },
    badge: 'Feed do Google Shopping',
    heroTitle: 'Otimização do feed do Google Shopping',
    heroSub: 'O Google classifica e corresponde produtos com base exclusiva nos dados do feed. Um feed sujo não apenas tem desempenho inferior — produz violações de políticas, reprovações e orçamento de anúncios desperdiçado. A CatyAI corrige os próprios dados, em escala, antes de chegarem ao Google.',
    heroCta: 'Agende uma conversa de parceria',
    heroCtaAlt: 'Feeds do Facebook e Instagram →',
    stats: [
      { v: M_COMMA + '+', l: 'produtos processados' },
      { v: '~95%', l: 'taxa de aceitação medida' },
      { v: N_MERCHANTS, l: 'comerciantes na rede' },
    ],
    problemTitle: 'O problema com os feeds dos comerciantes',
    problemIntro: 'A maioria dos feeds de produtos está quebrada na origem. Não ligeiramente imperfeita — estruturalmente quebrada. Nos feeds de afiliação e de comerciantes que processamos, encontramos constantemente:',
    problems: [
      { h: 'Preços placeholder', p: 'Feeds que enviam price: 1 para produtos indisponíveis, gerando listagens absurdas e selos de desconto falsos.' },
      { h: 'Formatação regional ausente ou errada', p: 'Títulos sem diacríticos, formatos de moeda e decimais inconsistentes.' },
      { h: 'Identificadores quebrados', p: 'GTINs em falta, MPNs usados como GTINs, campos de marca contendo nomes de entidades jurídicas em vez de marcas.' },
      { h: 'Códigos de produto contaminados', p: 'Valores de volume e tamanho extraídos como códigos de produto, envenenando a deduplicação.' },
      { h: 'Disponibilidade desatualizada', p: 'Produtos listados como em stock dias depois de o comerciante os ter retirado.' },
    ],
    problemOutro: 'O Google Shopping classifica e corresponde produtos com base exclusiva nos dados do feed. Um feed sujo não apenas tem desempenho inferior — produz violações de políticas, reprovações e orçamento de anúncios desperdiçado.',
    pipeTitle: 'O que a CatyAI faz realmente',
    pipeSub: 'A CatyAI é um pipeline de qualidade de dados para feeds de produtos. Não uma ferramenta de rotulagem sobre métricas de campanha — um sistema que corrige os próprios dados, em escala, antes de chegarem ao Google.',
    steps: [
      { n: '01', h: 'Enriquecimento com IA em escala', p: 'Processamos feeds brutos de comerciantes através de um pipeline de enriquecimento com IA que reescreve e completa os dados do produto: títulos limpos com caracteres regionais corretos, atributos estruturados, categorização precisa, marcas normalizadas. Mais de ' + MIL_COMMA + ' milhões de produtos processados até à data, com uma taxa de aceitação medida de ~95% face às nossas regras de validação.' },
      { n: '02', h: 'Validação, não confiança', p: 'Cada produto enriquecido passa por um motor de regras versionado. Produtos que falham — atributos alucinados, estrutura inválida, discrepâncias regionais — são rejeitados ou sinalizados, nunca publicados silenciosamente. As regras são versionadas, pelo que a reelegibilidade é determinística: quando uma regra muda, os produtos afetados são automaticamente reavaliados.' },
      { n: '03', h: 'Golden records e deduplicação', p: 'Produtos de múltiplos comerciantes são agrupados em golden records únicos. Isto torna possível a comparação real de preços — e requer os passos de limpeza acima, porque o matching sobre identificadores sujos produz lixo.' },
      { n: '04', h: 'Higiene do feed na ingestão', p: 'Preços placeholder, imagens em falta, listagens sem stock e ofertas não creditáveis são filtrados na ingestão, não corrigidos depois. Um produto que não pode ser listado honestamente não entra no feed.' },
      { n: '05', h: 'Medição contínua', p: 'A qualidade do enriquecimento não é presumida — é medida em coortes amostradas com limiares automáticos de aborto. Se um lote de processamento degradar abaixo do limiar de qualidade, o sistema para-se a si próprio antes de queimar orçamento em output defeituoso.' },
    ],
    whyTitle: 'Por que importa para o Google Shopping',
    whyCards: [
      { h: 'Relevância', p: 'Atributos completos e precisos são a forma como o Google corresponde os seus produtos às consultas.' },
      { h: 'Conformidade com políticas', p: 'As reprovações por misrepresentation e qualidade de dados quase sempre remontam a defeitos do feed — placeholders, disponibilidade desatualizada, identificadores errados.' },
      { h: 'Prontidão para comparação', p: 'Golden records limpos são o pré-requisito de qualquer experiência real de comparação de preços.' },
    ],
    whoTitle: 'Quem constrói isto',
    whoText: ['A CatyAI é operada pela equipa por trás da PayAI-x, que opera um serviço de comparação de preços (CSS) aprovado pela Google, servindo uma rede de ', N_MERCHANTS + ' comerciantes', '. O pipeline foi construído primeiro para resolver os nossos próprios problemas de qualidade de feed — a ferramenta é um subproduto de operar um CSS, não o contrário.'],
    crossTitle: 'O mesmo pipeline, mais canais',
    crossText: 'A fonte limpa de verdade que produz feeds prontos para Google também produz catálogos prontos para Meta — anúncios dinâmicos do Facebook, Advantage+ e Instagram Shopping, a partir dos mesmos dados validados.',
    crossCta: 'Otimização do feed do Facebook e Instagram Shopping →',
    ctaTitle: 'Agende uma conversa de parceria',
    ctaSub: 'Escreva-nos para contact@catyai.io ou ligue +40 756 730 193 — falamos do seu catálogo e do pacote certo.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    panelRaw: 'FEED BRUTO DO COMERCIANTE',
    panelClean: 'ENRIQUECIDO + VALIDADO',
    panelGate: 'porta de validação · regras versionadas',
  },
  fr: {
    meta: { title: 'Optimisation du flux Google Shopping — pipeline de qualité de données | CatyAI', desc: 'La plupart des flux marchands sont structurellement cassés : prix placeholder, identifiants erronés, disponibilité obsolète. CatyAI répare les données elles-mêmes — enrichissement IA, validation versionnée, golden records — avant qu\'elles n\'atteignent Google Shopping.' },
    badge: 'Flux Google Shopping',
    heroTitle: 'Optimisation du flux Google Shopping',
    heroSub: 'Google classe et associe les produits exclusivement sur la base des données du flux. Un flux sale ne sous-performe pas seulement — il produit des violations de règles, des refus et du budget publicitaire gaspillé. CatyAI répare les données elles-mêmes, à grande échelle, avant qu\'elles n\'atteignent Google.',
    heroCta: 'Planifiez un échange partenariat',
    heroCtaAlt: 'Flux Facebook & Instagram →',
    stats: [
      { v: M_COMMA + '+', l: 'produits traités' },
      { v: '~95%', l: 'taux d\'acceptation mesuré' },
      { v: N_MERCHANTS, l: 'marchands dans le réseau' },
    ],
    problemTitle: 'Le problème des flux marchands',
    problemIntro: 'La plupart des flux produits sont cassés à la source. Pas légèrement imparfaits — structurellement cassés. Dans les flux d\'affiliation et de marchands que nous traitons, nous trouvons constamment :',
    problems: [
      { h: 'Prix placeholder', p: 'Des flux qui envoient price: 1 pour des produits indisponibles, générant des annonces absurdes et de faux badges de réduction.' },
      { h: 'Formatage régional absent ou erroné', p: 'Titres sans diacritiques, formats de devise et de décimales incohérents.' },
      { h: 'Identifiants cassés', p: 'GTIN manquants, MPN utilisés comme GTIN, champs de marque contenant des noms d\'entités juridiques au lieu de marques.' },
      { h: 'Codes produit contaminés', p: 'Des valeurs de volume et de taille extraites comme codes produit, empoisonnant la déduplication.' },
      { h: 'Disponibilité obsolète', p: 'Des produits listés en stock des jours après leur retrait par le marchand.' },
    ],
    problemOutro: 'Google Shopping classe et associe les produits exclusivement sur la base des données du flux. Un flux sale ne sous-performe pas seulement — il produit des violations de règles, des refus et du budget publicitaire gaspillé.',
    pipeTitle: 'Ce que CatyAI fait réellement',
    pipeSub: 'CatyAI est un pipeline de qualité de données pour flux produits. Pas un outil d\'étiquetage par-dessus des métriques de campagne — un système qui répare les données elles-mêmes, à grande échelle, avant qu\'elles n\'atteignent Google.',
    steps: [
      { n: '01', h: 'Enrichissement IA à grande échelle', p: 'Nous traitons les flux bruts des marchands via un pipeline d\'enrichissement IA qui réécrit et complète les données produit : titres propres avec caractères régionaux corrects, attributs structurés, catégorisation précise, marques normalisées. Plus de ' + MIL_COMMA + ' millions de produits traités à ce jour, avec un taux d\'acceptation mesuré de ~95 % selon nos règles de validation.' },
      { n: '02', h: 'Validation, pas confiance', p: 'Chaque produit enrichi passe par un moteur de règles versionné. Les produits qui échouent — attributs hallucinés, structure invalide, incohérences régionales — sont rejetés ou signalés, jamais publiés silencieusement. Les règles sont versionnées, donc la rééligibilité est déterministe : quand une règle change, les produits affectés sont automatiquement réévalués.' },
      { n: '03', h: 'Golden records et déduplication', p: 'Les produits de plusieurs marchands sont regroupés en golden records uniques. C\'est ce qui rend possible la comparaison réelle des prix — et cela exige les étapes de nettoyage ci-dessus, car le matching sur des identifiants sales produit des déchets.' },
      { n: '04', h: 'Hygiène du flux à l\'ingestion', p: 'Les prix placeholder, les images manquantes, les annonces sans stock et les offres non créditables sont filtrés à l\'ingestion, pas corrigés plus tard. Un produit qui ne peut pas être listé honnêtement n\'entre pas dans le flux.' },
      { n: '05', h: 'Mesure continue', p: 'La qualité de l\'enrichissement n\'est pas supposée — elle est mesurée sur des cohortes échantillonnées avec des seuils d\'abandon automatiques. Si un lot de traitement se dégrade sous le seuil de qualité, le système s\'arrête de lui-même avant de brûler du budget sur un output défectueux.' },
    ],
    whyTitle: 'Pourquoi c\'est important pour Google Shopping',
    whyCards: [
      { h: 'Pertinence', p: 'Des attributs complets et précis sont la manière dont Google associe vos produits aux requêtes.' },
      { h: 'Conformité aux règles', p: 'Les refus pour misrepresentation et qualité des données remontent presque toujours à des défauts du flux — placeholders, disponibilité obsolète, identifiants erronés.' },
      { h: 'Préparation à la comparaison', p: 'Des golden records propres sont le prérequis de toute expérience réelle de comparaison de prix.' },
    ],
    whoTitle: 'Qui construit cela',
    whoText: ['CatyAI est opéré par l\'équipe derrière PayAI-x, qui exploite un service de comparaison de prix (CSS) approuvé par Google, au service d\'un réseau de ', N_MERCHANTS + ' marchands', '. Le pipeline a d\'abord été construit pour résoudre nos propres problèmes de qualité de flux — l\'outil est un sous-produit de l\'exploitation d\'un CSS, pas l\'inverse.'],
    crossTitle: 'Le même pipeline, plus de canaux',
    crossText: 'La source de vérité propre qui produit des flux prêts pour Google produit aussi des catalogues prêts pour Meta — publicités dynamiques Facebook, Advantage+ et Instagram Shopping, depuis les mêmes données validées.',
    crossCta: 'Optimisation du flux Facebook & Instagram Shopping →',
    ctaTitle: 'Planifiez un échange partenariat',
    ctaSub: 'Écrivez-nous à contact@catyai.io ou appelez le +40 756 730 193 — nous parlons de votre catalogue et de l\'offre adaptée.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    panelRaw: 'FLUX MARCHAND BRUT',
    panelClean: 'ENRICHI + VALIDÉ',
    panelGate: 'contrôle de validation · règles versionnées',
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'CatyAI', url: 'https://catyai.io', description: 'Data-quality pipeline for product feeds: AI enrichment, versioned validation, golden records and feed hygiene for Google Shopping.', parentOrganization: { '@type': 'Organization', name: 'PayAi-X FZE' } },
    { '@type': 'Service', name: 'Google Shopping Feed Optimisation', serviceType: 'Product feed data-quality pipeline', provider: { '@type': 'Organization', name: 'CatyAI' }, areaServed: 'EU', description: 'AI enrichment at scale, versioned validation rules, golden records and deduplication, feed hygiene at ingest and continuous quality measurement — over ' + MIL_DOT + ' million products processed with a ~95% measured acceptance rate, operated by the team behind the PayAI-x CSS, a Google-approved Comparison Shopping Service serving a network of ' + N_MERCHANTS + ' merchants.' },
  ],
}

const RAW_LINES = [
  { k: 'title', v: 'PARFUM DAMA 100ml ORIGINAL!!', bad: true },
  { k: 'price', v: '1 RON', bad: true },
  { k: 'brand', v: 'SC EXAMPLE TRADING SRL', bad: true },
  { k: 'gtin', v: '—', bad: true },
  { k: 'availability', v: 'in stock (?)', bad: true },
]

const CLEAN_LINES = [
  { k: 'title', v: 'Apă de parfum X, femei, 100 ml' },
  { k: 'price', v: '189.90 RON' },
  { k: 'brand', v: 'Brand X' },
  { k: 'gtin', v: '5941234567890' },
  { k: 'availability', v: 'in_stock · verified' },
]

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '9999px', background: '#34d399', boxShadow: '0 0 8px #34d39988', display: 'inline-block', flexShrink: 0 }} />
}

function Rule() {
  return <div style={{ width: 32, height: 3, background: '#d4b07a', borderRadius: 2, marginBottom: 18 }} />
}

function FeedPanel({ t }) {
  return (
    <div className="relative font-mono text-[12px]">
      <div className="bg-[#111a2c] border border-[#3d2b2b] rounded-xl p-5">
        <div className="text-[10px] tracking-widest uppercase text-[#e08a8a] mb-3">{t.panelRaw}</div>
        {RAW_LINES.map((l) => (
          <div key={l.k} className="flex gap-2 py-0.5">
            <span className="text-[#5c6883] w-24 flex-shrink-0">{l.k}:</span>
            <span className="text-[#e08a8a] line-through decoration-[#e08a8a]/50">{l.v}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 my-3 px-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b07a] to-transparent" />
        <span className="text-[10px] tracking-widest uppercase text-[#d4b07a]">{t.panelGate}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4b07a] to-transparent" />
      </div>
      <div className="bg-[#111a2c] border border-[#34d399]/40 rounded-xl p-5" style={{ boxShadow: '0 8px 40px -18px rgba(52,211,153,.35)' }}>
        <div className="text-[10px] tracking-widest uppercase text-[#34d399] mb-3">{t.panelClean}</div>
        {CLEAN_LINES.map((l) => (
          <div key={l.k} className="flex gap-2 py-0.5">
            <span className="text-[#5c6883] w-24 flex-shrink-0">{l.k}:</span>
            <span className="text-[#c7d0e0]">{l.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GoogleShoppingFeed() {
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

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
      <SEO title={t.meta.title} description={t.meta.desc} url="https://catyai.io/google-shopping-feed" />
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
                  <a href="/facebook-instagram-feed" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-6 py-3 rounded-lg text-white hover:border-[#5c6883] transition">{t.heroCtaAlt}</a>
                </div>
                <PartnerBadges locale={lang} className="mt-6" />
                <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                  {t.stats.map((s) => (
                    <div key={s.l}>
                      <div className="font-extrabold text-2xl sm:text-3xl text-[#e7cfa3] tracking-tight">{s.v}</div>
                      <div className="text-[12px] text-[#8b96ab] mt-1 leading-snug">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <FeedPanel t={t} />
            </div>
          </section>

          {/* PROBLEM */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.problemTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.problemIntro}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {t.problems.map((c) => (
                  <div key={c.h} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="font-bold text-[#d4b07a]">{c.h}</div>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{c.p}</p>
                  </div>
                ))}
              </div>
              <p className="text-[15px] text-[#e7cfa3] font-semibold leading-relaxed mt-10 max-w-3xl">{t.problemOutro}</p>
            </div>
          </section>

          {/* PIPELINE */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.pipeTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.pipeSub}</p>
              <div className="mt-12 space-y-px bg-[#1f293f] border border-[#1f293f] rounded-2xl overflow-hidden">
                {t.steps.map((s) => (
                  <div key={s.n} className="bg-[#111a2c] p-7 sm:p-8 grid sm:grid-cols-[3rem_1fr] gap-5">
                    <div className="font-extrabold text-2xl text-[#d4b07a]">{s.n}</div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{s.h}</h3>
                      <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{s.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.whyTitle}</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {t.whyCards.map((c) => (
                  <div key={c.h} className="bg-[#111a2c] border border-[#1f293f] rounded-xl p-6">
                    <div className="font-bold text-lg text-[#d4b07a]">{c.h}</div>
                    <p className="text-sm text-[#8b96ab] mt-2 leading-relaxed">{c.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHO */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.whoTitle}</h2>
              <p className="text-[17px] text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">
                {t.whoText[0]}<span className="text-[#e7cfa3] font-semibold">{t.whoText[1]}</span>{t.whoText[2]}
              </p>
            </div>
          </section>

          {/* CROSS-LINK */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <div className="bg-[#111a2c] border border-[#1f293f] rounded-2xl p-8 sm:p-10">
                <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{t.crossTitle}</div>
                <p className="text-[#8b96ab] leading-relaxed mt-4 max-w-3xl">{t.crossText}</p>
                <a href="/facebook-instagram-feed" className="inline-block mt-6 font-semibold text-[#e7cfa3] hover:text-white transition">{t.crossCta}</a>
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
