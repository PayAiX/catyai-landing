import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import FooterV9 from '../components/FooterV9'
import GlobalHeader from '../components/GlobalHeader'
import PartnerBadges from '../components/PartnerBadges'
import { productsShortM } from '../lib/catalogStats'

// Cifra din sursa unică (src/lib/catalogStats.js, actualizată la build). Nu hardcoda.
const MIL_DOT = productsShortM('en').slice(0, -1)
const MIL_COMMA = productsShortM('ro').slice(0, -1)

const T = {
  en: {
    meta: { title: 'Facebook & Instagram Shopping Feed Optimisation | CatyAI', desc: 'Meta catalogs fail for the same reason Google feeds do: placeholder prices, stale availability, missing attributes. CatyAI\'s channel-agnostic data-quality pipeline produces Meta-ready catalogs from one clean, validated source.' },
    badge: 'Meta Catalog Feed',
    heroTitle: 'Facebook & Instagram Shopping Feed Optimisation',
    heroSub: 'Dynamic ads, Advantage+ catalog campaigns and Instagram Shopping all consume the same product data — and inherit the same defects. Meta disapproves or silently under-delivers ads built on bad catalog data. The fix is not in Ads Manager — it is in the feed.',
    heroCta: 'Book a partnership call',
    heroCtaAlt: 'Google Shopping feeds →',
    heroBadges: ['One clean source of truth', 'Dynamic Ads · Advantage+', 'Instagram Shopping'],
    problemTitle: 'Meta catalogs fail for the same reason Google feeds do',
    problemIntro: 'A Meta product catalog is only as good as the feed behind it. Dynamic ads, Advantage+ catalog campaigns and Instagram Shopping all consume the same product data — and inherit the same defects:',
    problems: [
      { h: 'Placeholder prices', p: 'price: 1 for unavailable items renders as a real price in dynamic ads.' },
      { h: 'Stale availability', p: 'Out-of-stock products shown to retargeting audiences.' },
      { h: 'Wrong titles and missing attributes', p: 'Degrade Meta\'s matching for catalog ads.' },
      { h: 'Inconsistent identifiers', p: 'Break product matching across placements.' },
    ],
    problemOutro: 'Meta disapproves or silently under-delivers ads built on bad catalog data. The fix is not in Ads Manager — it is in the feed.',
    pipeTitle: 'The same pipeline, applied to Meta',
    pipeSub: 'CatyAI\'s data-quality pipeline is channel-agnostic. The enrichment and validation layers that produce Google-ready feeds produce Meta-ready catalogs from the same clean source:',
    steps: [
      { n: '01', h: 'One clean source of truth', p: 'Products are enriched once — titles, descriptions, attributes, categories, normalized brands — and exported per channel. Google and Meta consume the same validated data, formatted to each platform\'s spec. No divergent copies drifting out of sync.' },
      { n: '02', h: 'Accurate price and availability', p: 'Placeholder prices and unavailable products are filtered at ingest. Dynamic remarketing only works when the products shown are actually purchasable — our availability data is validated against merchant feeds on every sync cycle.' },
      { n: '03', h: 'Structured attributes for targeting', p: 'Gender, age group, size, color, material — the attributes Meta uses for catalog matching and audience relevance are extracted and normalized during enrichment, not left as free text.' },
      { n: '04', h: 'Measured quality', p: 'The same versioned validation rules and sampled-cohort measurement apply. A product that fails validation is excluded from both Google and Meta exports — quality gates are enforced before the data leaves the system, not after the ad runs.' },
    ],
    notTitle: 'What we do not claim',
    notText: 'We do not run your Meta campaigns and we do not label products based on your ad performance. We fix the data. Campaign structure, bidding and creative remain yours — they simply stop being sabotaged by a dirty catalog.',
    crossTitle: 'One pipeline, every channel',
    crossText: 'The enrichment, validation and golden-record layers behind this page are the same ones producing Google-ready feeds — over ' + MIL_DOT + ' million products processed, measured against versioned validation rules.',
    crossCta: 'Google Shopping Feed Optimisation →',
    ctaTitle: 'Book a partnership call',
    ctaSub: 'Write to us at contact@catyai.io or call +40 756 730 193 — we\'ll discuss your catalog and the right package.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgSource: 'CLEAN VALIDATED CATALOG',
    svgSourceSub: 'enriched once · versioned rules',
    svgChannels: ['GOOGLE SHOPPING', 'FACEBOOK · DYNAMIC ADS', 'INSTAGRAM SHOPPING'],
    svgChannelSubs: ['GMC spec', 'Advantage+ catalog', 'product tags'],
  },
  ro: {
    meta: { title: 'Optimizarea feed-ului Facebook & Instagram Shopping | CatyAI', desc: 'Cataloagele Meta pică din același motiv ca feed-urile Google: prețuri placeholder, disponibilitate învechită, atribute lipsă. Pipeline-ul CatyAI, agnostic la canal, produce cataloage gata de Meta din aceeași sursă curată și validată.' },
    badge: 'Feed Catalog Meta',
    heroTitle: 'Optimizarea feed-ului Facebook & Instagram Shopping',
    heroSub: 'Reclamele dinamice, campaniile Advantage+ cu catalog și Instagram Shopping consumă toate aceleași date de produs — și moștenesc aceleași defecte. Meta respinge sau sub-livrează silențios reclamele construite pe date de catalog proaste. Fixul nu e în Ads Manager — e în feed.',
    heroCta: 'Programează o discuție de parteneriat',
    heroCtaAlt: 'Feed-uri Google Shopping →',
    heroBadges: ['O singură sursă curată de adevăr', 'Reclame dinamice · Advantage+', 'Instagram Shopping'],
    problemTitle: 'Cataloagele Meta pică din același motiv ca feed-urile Google',
    problemIntro: 'Un catalog de produse Meta e doar atât de bun cât e feed-ul din spate. Reclamele dinamice, campaniile Advantage+ cu catalog și Instagram Shopping consumă toate aceleași date de produs — și moștenesc aceleași defecte:',
    problems: [
      { h: 'Prețuri placeholder', p: 'price: 1 pentru produse indisponibile se randează ca preț real în reclamele dinamice.' },
      { h: 'Disponibilitate învechită', p: 'Produse fără stoc arătate audiențelor de retargeting.' },
      { h: 'Titluri greșite și atribute lipsă', p: 'Degradează matchingul Meta pentru reclame cu catalog.' },
      { h: 'Identificatori inconsistenți', p: 'Rup potrivirea produselor între plasamente.' },
    ],
    problemOutro: 'Meta respinge sau sub-livrează silențios reclamele construite pe date de catalog proaste. Fixul nu e în Ads Manager — e în feed.',
    pipeTitle: 'Același pipeline, aplicat pe Meta',
    pipeSub: 'Pipeline-ul de calitate a datelor CatyAI e agnostic la canal. Straturile de enrichment și validare care produc feed-uri gata de Google produc cataloage gata de Meta din aceeași sursă curată:',
    steps: [
      { n: '01', h: 'O singură sursă curată de adevăr', p: 'Produsele sunt enrichate o singură dată — titluri, descrieri, atribute, categorii, branduri normalizate — și exportate per canal. Google și Meta consumă aceleași date validate, formatate pe specificațiile fiecărei platforme. Fără copii divergente care ies din sincronizare.' },
      { n: '02', h: 'Preț și disponibilitate precise', p: 'Prețurile placeholder și produsele indisponibile sunt filtrate la ingest. Remarketingul dinamic funcționează doar când produsele afișate sunt cu adevărat cumpărabile — datele noastre de disponibilitate sunt validate contra feed-urilor comerciantului la fiecare ciclu de sincronizare.' },
      { n: '03', h: 'Atribute structurate pentru targeting', p: 'Gen, grupă de vârstă, mărime, culoare, material — atributele pe care Meta le folosește pentru matching de catalog și relevanță de audiență sunt extrase și normalizate în timpul enrichment-ului, nu lăsate ca text liber.' },
      { n: '04', h: 'Calitate măsurată', p: 'Se aplică aceleași reguli de validare versionate și aceeași măsurare pe cohorte eșantionate. Un produs care pică validarea e exclus din exporturile Google și Meta deopotrivă — porțile de calitate se aplică înainte ca datele să iasă din sistem, nu după ce reclama rulează.' },
    ],
    notTitle: 'Ce NU pretindem',
    notText: 'Nu îți rulăm campaniile Meta și nu etichetăm produse pe baza performanței tale din ads. Noi reparăm datele. Structura de campanie, biddingul și creația rămân ale tale — doar că nu mai sunt sabotate de un catalog murdar.',
    crossTitle: 'Un pipeline, toate canalele',
    crossText: 'Straturile de enrichment, validare și golden records din spatele acestei pagini sunt aceleași care produc feed-uri gata de Google — peste ' + MIL_COMMA + ' milioane de produse procesate, măsurate contra regulilor de validare versionate.',
    crossCta: 'Optimizarea feed-ului Google Shopping →',
    ctaTitle: 'Programează o discuție de parteneriat',
    ctaSub: 'Scrie-ne la contact@catyai.io sau sună la +40 756 730 193 — discutăm catalogul tău și pachetul potrivit.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgSource: 'CATALOG CURAT ȘI VALIDAT',
    svgSourceSub: 'enrichat o dată · reguli versionate',
    svgChannels: ['GOOGLE SHOPPING', 'FACEBOOK · RECLAME DINAMICE', 'INSTAGRAM SHOPPING'],
    svgChannelSubs: ['spec GMC', 'catalog Advantage+', 'etichete de produs'],
  },
  es: {
    meta: { title: 'Optimización del feed de Facebook e Instagram Shopping | CatyAI', desc: 'Los catálogos de Meta fallan por la misma razón que los feeds de Google: precios placeholder, disponibilidad desactualizada, atributos ausentes. El pipeline de CatyAI, agnóstico al canal, produce catálogos listos para Meta desde una única fuente limpia y validada.' },
    badge: 'Feed de catálogo Meta',
    heroTitle: 'Optimización del feed de Facebook e Instagram Shopping',
    heroSub: 'Los anuncios dinámicos, las campañas Advantage+ con catálogo e Instagram Shopping consumen los mismos datos de producto — y heredan los mismos defectos. Meta rechaza o sub-entrega silenciosamente los anuncios construidos sobre datos de catálogo deficientes. La solución no está en el Ads Manager — está en el feed.',
    heroCta: 'Programa una llamada de colaboración',
    heroCtaAlt: 'Feeds de Google Shopping →',
    heroBadges: ['Una única fuente limpia de verdad', 'Anuncios dinámicos · Advantage+', 'Instagram Shopping'],
    problemTitle: 'Los catálogos de Meta fallan por la misma razón que los feeds de Google',
    problemIntro: 'Un catálogo de productos de Meta solo es tan bueno como el feed que lo alimenta. Los anuncios dinámicos, las campañas Advantage+ con catálogo e Instagram Shopping consumen los mismos datos de producto — y heredan los mismos defectos:',
    problems: [
      { h: 'Precios placeholder', p: 'price: 1 para productos no disponibles se renderiza como precio real en los anuncios dinámicos.' },
      { h: 'Disponibilidad desactualizada', p: 'Productos sin stock mostrados a audiencias de retargeting.' },
      { h: 'Títulos incorrectos y atributos ausentes', p: 'Degradan el matching de Meta para anuncios con catálogo.' },
      { h: 'Identificadores inconsistentes', p: 'Rompen la correspondencia de productos entre ubicaciones.' },
    ],
    problemOutro: 'Meta rechaza o sub-entrega silenciosamente los anuncios construidos sobre datos de catálogo deficientes. La solución no está en el Ads Manager — está en el feed.',
    pipeTitle: 'El mismo pipeline, aplicado a Meta',
    pipeSub: 'El pipeline de calidad de datos de CatyAI es agnóstico al canal. Las capas de enriquecimiento y validación que producen feeds listos para Google producen catálogos listos para Meta desde la misma fuente limpia:',
    steps: [
      { n: '01', h: 'Una única fuente limpia de verdad', p: 'Los productos se enriquecen una sola vez — títulos, descripciones, atributos, categorías, marcas normalizadas — y se exportan por canal. Google y Meta consumen los mismos datos validados, formateados según las especificaciones de cada plataforma. Sin copias divergentes que se desincronicen.' },
      { n: '02', h: 'Precio y disponibilidad precisos', p: 'Los precios placeholder y los productos no disponibles se filtran en la ingesta. El remarketing dinámico solo funciona cuando los productos mostrados son realmente comprables — nuestros datos de disponibilidad se validan contra los feeds del comerciante en cada ciclo de sincronización.' },
      { n: '03', h: 'Atributos estructurados para el targeting', p: 'Género, grupo de edad, talla, color, material — los atributos que Meta usa para el matching de catálogo y la relevancia de audiencia se extraen y normalizan durante el enriquecimiento, no se dejan como texto libre.' },
      { n: '04', h: 'Calidad medida', p: 'Se aplican las mismas reglas de validación versionadas y la misma medición en cohortes muestreadas. Un producto que falla la validación se excluye de las exportaciones de Google y Meta por igual — los controles de calidad se aplican antes de que los datos salgan del sistema, no después de que el anuncio se publique.' },
    ],
    notTitle: 'Lo que NO afirmamos',
    notText: 'No gestionamos tus campañas de Meta ni etiquetamos productos según tu rendimiento publicitario. Nosotros reparamos los datos. La estructura de campaña, las pujas y la creatividad siguen siendo tuyas — simplemente dejan de ser saboteadas por un catálogo sucio.',
    crossTitle: 'Un pipeline, todos los canales',
    crossText: 'Las capas de enriquecimiento, validación y golden records detrás de esta página son las mismas que producen feeds listos para Google — más de ' + MIL_COMMA + ' millones de productos procesados, medidos según reglas de validación versionadas.',
    crossCta: 'Optimización del feed de Google Shopping →',
    ctaTitle: 'Programa una llamada de colaboración',
    ctaSub: 'Escríbenos a contact@catyai.io o llama al +40 756 730 193 — hablamos de tu catálogo y del paquete adecuado.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgSource: 'CATÁLOGO LIMPIO Y VALIDADO',
    svgSourceSub: 'enriquecido una vez · reglas versionadas',
    svgChannels: ['GOOGLE SHOPPING', 'FACEBOOK · ANUNCIOS DINÁMICOS', 'INSTAGRAM SHOPPING'],
    svgChannelSubs: ['spec GMC', 'catálogo Advantage+', 'etiquetas de producto'],
  },
  pt: {
    meta: { title: 'Otimização do feed do Facebook e Instagram Shopping | CatyAI', desc: 'Os catálogos Meta falham pela mesma razão que os feeds Google: preços placeholder, disponibilidade desatualizada, atributos em falta. O pipeline da CatyAI, agnóstico ao canal, produz catálogos prontos para Meta a partir de uma única fonte limpa e validada.' },
    badge: 'Feed de catálogo Meta',
    heroTitle: 'Otimização do feed do Facebook e Instagram Shopping',
    heroSub: 'Os anúncios dinâmicos, as campanhas Advantage+ com catálogo e o Instagram Shopping consomem todos os mesmos dados de produto — e herdam os mesmos defeitos. A Meta reprova ou sub-entrega silenciosamente anúncios construídos sobre dados de catálogo fracos. A correção não está no Gestor de Anúncios — está no feed.',
    heroCta: 'Agende uma conversa de parceria',
    heroCtaAlt: 'Feeds do Google Shopping →',
    heroBadges: ['Uma única fonte limpa de verdade', 'Anúncios dinâmicos · Advantage+', 'Instagram Shopping'],
    problemTitle: 'Os catálogos Meta falham pela mesma razão que os feeds Google',
    problemIntro: 'Um catálogo de produtos Meta é tão bom quanto o feed que está por trás. Os anúncios dinâmicos, as campanhas Advantage+ com catálogo e o Instagram Shopping consomem todos os mesmos dados de produto — e herdam os mesmos defeitos:',
    problems: [
      { h: 'Preços placeholder', p: 'price: 1 para produtos indisponíveis é renderizado como preço real nos anúncios dinâmicos.' },
      { h: 'Disponibilidade desatualizada', p: 'Produtos sem stock mostrados a audiências de retargeting.' },
      { h: 'Títulos errados e atributos em falta', p: 'Degradam o matching da Meta para anúncios com catálogo.' },
      { h: 'Identificadores inconsistentes', p: 'Quebram a correspondência de produtos entre posicionamentos.' },
    ],
    problemOutro: 'A Meta reprova ou sub-entrega silenciosamente anúncios construídos sobre dados de catálogo fracos. A correção não está no Gestor de Anúncios — está no feed.',
    pipeTitle: 'O mesmo pipeline, aplicado à Meta',
    pipeSub: 'O pipeline de qualidade de dados da CatyAI é agnóstico ao canal. As camadas de enriquecimento e validação que produzem feeds prontos para Google produzem catálogos prontos para Meta a partir da mesma fonte limpa:',
    steps: [
      { n: '01', h: 'Uma única fonte limpa de verdade', p: 'Os produtos são enriquecidos uma única vez — títulos, descrições, atributos, categorias, marcas normalizadas — e exportados por canal. Google e Meta consomem os mesmos dados validados, formatados conforme as especificações de cada plataforma. Sem cópias divergentes a dessincronizar.' },
      { n: '02', h: 'Preço e disponibilidade precisos', p: 'Preços placeholder e produtos indisponíveis são filtrados na ingestão. O remarketing dinâmico só funciona quando os produtos mostrados são realmente compráveis — os nossos dados de disponibilidade são validados contra os feeds do comerciante em cada ciclo de sincronização.' },
      { n: '03', h: 'Atributos estruturados para targeting', p: 'Género, faixa etária, tamanho, cor, material — os atributos que a Meta usa para matching de catálogo e relevância de audiência são extraídos e normalizados durante o enriquecimento, não deixados como texto livre.' },
      { n: '04', h: 'Qualidade medida', p: 'Aplicam-se as mesmas regras de validação versionadas e a mesma medição em coortes amostradas. Um produto que falha a validação é excluído das exportações Google e Meta igualmente — os controlos de qualidade aplicam-se antes de os dados saírem do sistema, não depois de o anúncio correr.' },
    ],
    notTitle: 'O que NÃO afirmamos',
    notText: 'Não gerimos as suas campanhas Meta nem rotulamos produtos com base no seu desempenho publicitário. Nós corrigimos os dados. A estrutura de campanha, os lances e a criatividade continuam seus — simplesmente deixam de ser sabotados por um catálogo sujo.',
    crossTitle: 'Um pipeline, todos os canais',
    crossText: 'As camadas de enriquecimento, validação e golden records por trás desta página são as mesmas que produzem feeds prontos para Google — mais de ' + MIL_COMMA + ' milhões de produtos processados, medidos face a regras de validação versionadas.',
    crossCta: 'Otimização do feed do Google Shopping →',
    ctaTitle: 'Agende uma conversa de parceria',
    ctaSub: 'Escreva-nos para contact@catyai.io ou ligue +40 756 730 193 — falamos do seu catálogo e do pacote certo.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgSource: 'CATÁLOGO LIMPO E VALIDADO',
    svgSourceSub: 'enriquecido uma vez · regras versionadas',
    svgChannels: ['GOOGLE SHOPPING', 'FACEBOOK · ANÚNCIOS DINÂMICOS', 'INSTAGRAM SHOPPING'],
    svgChannelSubs: ['spec GMC', 'catálogo Advantage+', 'etiquetas de produto'],
  },
  fr: {
    meta: { title: 'Optimisation du flux Facebook & Instagram Shopping | CatyAI', desc: 'Les catalogues Meta échouent pour la même raison que les flux Google : prix placeholder, disponibilité obsolète, attributs manquants. Le pipeline CatyAI, agnostique au canal, produit des catalogues prêts pour Meta depuis une seule source propre et validée.' },
    badge: 'Flux catalogue Meta',
    heroTitle: 'Optimisation du flux Facebook & Instagram Shopping',
    heroSub: 'Les publicités dynamiques, les campagnes Advantage+ catalogue et Instagram Shopping consomment tous les mêmes données produit — et en héritent les mêmes défauts. Meta refuse ou sous-diffuse silencieusement les publicités construites sur des données de catalogue médiocres. La correction n\'est pas dans le Gestionnaire de publicités — elle est dans le flux.',
    heroCta: 'Planifiez un échange partenariat',
    heroCtaAlt: 'Flux Google Shopping →',
    heroBadges: ['Une seule source de vérité propre', 'Publicités dynamiques · Advantage+', 'Instagram Shopping'],
    problemTitle: 'Les catalogues Meta échouent pour la même raison que les flux Google',
    problemIntro: 'Un catalogue produits Meta n\'est aussi bon que le flux qui l\'alimente. Les publicités dynamiques, les campagnes Advantage+ catalogue et Instagram Shopping consomment tous les mêmes données produit — et en héritent les mêmes défauts :',
    problems: [
      { h: 'Prix placeholder', p: 'price: 1 pour des produits indisponibles s\'affiche comme un prix réel dans les publicités dynamiques.' },
      { h: 'Disponibilité obsolète', p: 'Des produits en rupture montrés aux audiences de retargeting.' },
      { h: 'Titres erronés et attributs manquants', p: 'Dégradent le matching Meta pour les publicités catalogue.' },
      { h: 'Identifiants incohérents', p: 'La correspondance des produits se brise entre les emplacements.' },
    ],
    problemOutro: 'Meta refuse ou sous-diffuse silencieusement les publicités construites sur des données de catalogue médiocres. La correction n\'est pas dans le Gestionnaire de publicités — elle est dans le flux.',
    pipeTitle: 'Le même pipeline, appliqué à Meta',
    pipeSub: 'Le pipeline de qualité de données CatyAI est agnostique au canal. Les couches d\'enrichissement et de validation qui produisent des flux prêts pour Google produisent des catalogues prêts pour Meta depuis la même source propre :',
    steps: [
      { n: '01', h: 'Une seule source de vérité propre', p: 'Les produits sont enrichis une seule fois — titres, descriptions, attributs, catégories, marques normalisées — puis exportés par canal. Google et Meta consomment les mêmes données validées, formatées selon les spécifications de chaque plateforme. Pas de copies divergentes qui se désynchronisent.' },
      { n: '02', h: 'Prix et disponibilité précis', p: 'Les prix placeholder et les produits indisponibles sont filtrés à l\'ingestion. Le remarketing dynamique ne fonctionne que si les produits affichés sont réellement achetables — nos données de disponibilité sont validées contre les flux marchands à chaque cycle de synchronisation.' },
      { n: '03', h: 'Attributs structurés pour le ciblage', p: 'Genre, tranche d\'âge, taille, couleur, matière — les attributs que Meta utilise pour le matching catalogue et la pertinence d\'audience sont extraits et normalisés pendant l\'enrichissement, pas laissés en texte libre.' },
      { n: '04', h: 'Qualité mesurée', p: 'Les mêmes règles de validation versionnées et la même mesure sur cohortes échantillonnées s\'appliquent. Un produit qui échoue la validation est exclu des exports Google et Meta de la même façon — les contrôles qualité s\'appliquent avant que les données ne quittent le système, pas après la diffusion de la publicité.' },
    ],
    notTitle: 'Ce que nous ne prétendons PAS',
    notText: 'Nous ne gérons pas vos campagnes Meta et nous n\'étiquetons pas les produits selon vos performances publicitaires. Nous réparons les données. La structure de campagne, les enchères et la création restent vôtres — elles cessent simplement d\'être sabotées par un catalogue sale.',
    crossTitle: 'Un pipeline, tous les canaux',
    crossText: 'Les couches d\'enrichissement, de validation et de golden records derrière cette page sont les mêmes qui produisent des flux prêts pour Google — plus de ' + MIL_COMMA + ' millions de produits traités, mesurés selon des règles de validation versionnées.',
    crossCta: 'Optimisation du flux Google Shopping →',
    ctaTitle: 'Planifiez un échange partenariat',
    ctaSub: 'Écrivez-nous à contact@catyai.io ou appelez le +40 756 730 193 — nous parlons de votre catalogue et de l\'offre adaptée.',
    ctaCta: 'contact@catyai.io',
    ctaAlt: '+40 756 730 193',
    svgSource: 'CATALOGUE PROPRE ET VALIDÉ',
    svgSourceSub: 'enrichi une fois · règles versionnées',
    svgChannels: ['GOOGLE SHOPPING', 'FACEBOOK · PUBS DYNAMIQUES', 'INSTAGRAM SHOPPING'],
    svgChannelSubs: ['spec GMC', 'catalogue Advantage+', 'tags produit'],
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', name: 'CatyAI', url: 'https://catyai.io', description: 'Channel-agnostic data-quality pipeline for product feeds: one clean, validated source exported to Google Shopping and Meta catalogs.', parentOrganization: { '@type': 'Organization', name: 'PayAi-X FZE' } },
    { '@type': 'Service', name: 'Facebook & Instagram Shopping Feed Optimisation', serviceType: 'Meta product catalog data-quality pipeline', provider: { '@type': 'Organization', name: 'CatyAI' }, areaServed: 'EU', description: 'Accurate price and availability, structured attributes for catalog matching and audience relevance, versioned validation and sampled-cohort quality measurement — Meta-ready catalogs from the same clean source as Google-ready feeds.' },
  ],
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '9999px', background: '#34d399', boxShadow: '0 0 8px #34d39988', display: 'inline-block', flexShrink: 0 }} />
}

function Rule() {
  return <div style={{ width: 32, height: 3, background: '#d4b07a', borderRadius: 2, marginBottom: 18 }} />
}

function ChannelDiagram({ t }) {
  return (
    <svg viewBox="0 0 420 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="fb-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7cfa3" /><stop offset="1" stopColor="#9c7b44" />
        </linearGradient>
      </defs>
      <g fontFamily="'JetBrains Mono', monospace" fontSize="11">
        <rect x="72" y="30" width="276" height="56" rx="8" fill="#111a2c" stroke="#d4b07a" strokeOpacity=".6" />
        <text x="92" y="54" fill="#e7cfa3">{t.svgSource}</text>
        <text x="92" y="72" fill="#5c6883" fontSize="9">{t.svgSourceSub}</text>
      </g>
      <g stroke="url(#fb-gold)" strokeWidth="1.2" fill="none" opacity=".7">
        <path d="M210 86 L210 130" />
        <path d="M210 130 C 210 160, 110 160, 110 192" />
        <path d="M210 130 L210 192" />
        <path d="M210 130 C 210 160, 310 160, 310 192" />
      </g>
      <circle cx="210" cy="130" r="3" fill="#d4b07a" />
      <g fontFamily="'JetBrains Mono', monospace" fontSize="10">
        <rect x="30" y="192" width="160" height="52" rx="8" fill="#111a2c" stroke="#1f293f" />
        <text x="44" y="214" fill="#c7d0e0">{t.svgChannels[0]}</text>
        <text x="44" y="230" fill="#5c6883" fontSize="9">{t.svgChannelSubs[0]}</text>

        <rect x="130" y="268" width="200" height="52" rx="8" fill="#111a2c" stroke="#34d399" strokeOpacity=".5" />
        <text x="144" y="290" fill="#c7d0e0">{t.svgChannels[1]}</text>
        <text x="144" y="306" fill="#5c6883" fontSize="9">{t.svgChannelSubs[1]}</text>

        <rect x="230" y="192" width="160" height="52" rx="8" fill="#111a2c" stroke="#34d399" strokeOpacity=".5" />
        <text x="244" y="214" fill="#c7d0e0">{t.svgChannels[2]}</text>
        <text x="244" y="230" fill="#5c6883" fontSize="9">{t.svgChannelSubs[2]}</text>
      </g>
      <path d="M210 244 L210 268" stroke="url(#fb-gold)" strokeWidth="1.2" fill="none" opacity=".7" />
      <g stroke="#34d399" strokeWidth="1" opacity=".35" fill="none">
        <circle cx="110" cy="358" r="3" /><circle cx="210" cy="358" r="3" /><circle cx="310" cy="358" r="3" />
        <path d="M110 320 L110 355" /><path d="M230 320 L210 355" /><path d="M310 244 L310 355" />
      </g>
    </svg>
  )
}

export default function FacebookInstagramFeed() {
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
      <SEO title={t.meta.title} description={t.meta.desc} url="https://catyai.io/facebook-instagram-feed" />
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
                  <a href="/google-shopping-feed" className="font-semibold border border-[#1f293f] bg-[#111a2c] px-6 py-3 rounded-lg text-white hover:border-[#5c6883] transition">{t.heroCtaAlt}</a>
                </div>
                <PartnerBadges locale={lang} className="mt-6" />
                <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-[#8b96ab]">
                  {t.heroBadges.map((b) => (
                    <span key={b} className="flex items-center gap-2"><Dot /> {b}</span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <ChannelDiagram t={t} />
              </div>
            </div>
          </section>

          {/* PROBLEM */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.problemTitle}</h2>
              <p className="text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.problemIntro}</p>
              <div className="grid sm:grid-cols-2 gap-6 mt-10">
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

          {/* WHAT WE DO NOT CLAIM */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <Rule />
              <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-white">{t.notTitle}</h2>
              <p className="text-[17px] text-[#8b96ab] leading-relaxed mt-6 max-w-3xl">{t.notText}</p>
            </div>
          </section>

          {/* CROSS-LINK */}
          <section className="border-t border-[#1f293f]">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <div className="bg-[#111a2c] border border-[#1f293f] rounded-2xl p-8 sm:p-10">
                <div className="text-[11px] text-[#d4b07a] uppercase font-mono tracking-widest">{t.crossTitle}</div>
                <p className="text-[#8b96ab] leading-relaxed mt-4 max-w-3xl">{t.crossText}</p>
                <a href="/google-shopping-feed" className="inline-block mt-6 font-semibold text-[#e7cfa3] hover:text-white transition">{t.crossCta}</a>
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
