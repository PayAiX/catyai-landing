import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Store, Search, MousePointerClick, ShieldCheck } from 'lucide-react'
import SEO from '../components/SEO'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import { pageUrl, alternatesFor } from '../lib/localeUrls'

// Pagina /pentru-vanzatori-marketplace — nișa „seller eMAG/Trendyol fără site propriu".
// Model multi-limbă identic cu GoogleShoppingFeed/Campanii: T = {en, ro, es, pt, fr};
// RO = conținut verbatim aprobat de Adrian (19.10); EN/ES/PT/FR = traduceri.
// Poziționare din studiile de nișă (sinteza AGENT-88, 19.10): durerea e identitatea
// — sellerul nu are nimic al lui în afara feedului din marketplace.
// Postează la /api/leads/catalog-audit cu caty_source 'vanzatori-marketplace'
// (valorile câmpurilor trebuie să rămână identice cu QUALIFICATION_OPTIONS din
// src/api/leads/catalog-audit.js).

const SLUG = 'pentru-vanzatori-marketplace'
const LEADS_API = 'https://api.catyai.io/api/leads/catalog-audit'
const CATY_SOURCE = 'vanzatori-marketplace'

const T = {
  ro: {
    meta: {
      title: 'Nu ai site? Pagina ta de vânzător, vizibilă în Google și în ChatGPT — CatyAI',
      desc: 'Selleri eMAG și Trendyol fără site propriu: pagina ta de vânzător cu produsele tale, indexată în Google și citibilă de ChatGPT. Clientul cumpără tot de la tine, pe marketplace. Audit gratuit de catalog.',
    },
    hero: {
      eyebrow: 'PENTRU VÂNZĂTORI eMAG · TRENDYOL',
      titlePre: 'Nu ai site? ',
      titleAccent: 'Ai acum pagina ta de vânzător',
      titlePost: ' — cu produsele tale, vizibilă în Google și în ChatGPT.',
      sub: 'Dacă vinzi doar prin eMAG sau Trendyol, în afara marketplace-ului nu exiști: nimeni nu te găsește pe Google, iar ChatGPT nu știe de tine. Îți facem pagina ta — cu numele tău și produsele tale — iar cumpărarea rămâne pe marketplace, unde e deja.',
    },
    whatYouGet: [
      { h: 'Pagina ta de vânzător', p: 'Un spațiu al tău pe catyai.io, cu numele magazinului tău și pagini pentru produsele tale. Nu mai exiști doar ca o linie „vândut de…” în interiorul marketplace-ului.' },
      { h: 'Produsele tale în Google', p: 'Paginile sunt indexate de Google și au date structurate complete — ceva ce fără site propriu nu poți avea, pentru că Google Shopping cere un site verificat.' },
      { h: 'Vizibile pentru ChatGPT și Perplexity', p: 'Fișier llms.txt și conținut structurat, ca agenții AI să poată citi și recomanda produsele tale. Promitem „descoperibil” — recomandarea se câștigă în timp, nu se garantează.' },
      { h: 'Clientul cumpără tot de la tine', p: 'Butonul de cumpărare duce direct pe listingul tău de pe eMAG sau Trendyol. Comanda, plata și livrarea rămân la tine — noi nu ne atingem de ele.' },
    ],
    stepsTitle: 'CUM FUNCȚIONEAZĂ',
    steps: [
      'Completezi formularul și ne trimiți exportul de produse (îți spunem noi exact ce format).',
      'Verificăm catalogul — EAN-uri, titluri, poze — și publicăm pagina ta cu produsele.',
      'Primești raport de vizibilitate: ce s-a indexat, ce apare în Google, ce citește AI-ul.',
    ],
    already: {
      h: 'Cine plătește deja pentru asta',
      sub: 'Sellerii serioși investesc deja în vizibilitate și operațiuni. Pagina ta de vânzător completează exact ce lipsește: prezența în afara marketplace-ului.',
      items: [
        ['BaseLinker sau alte integratoare', 'ca să țină stocul și comenzile pe mai multe canale'],
        ['eMAG Ads', 'ca produsele să apară mai sus în interiorul marketplace-ului'],
        ['FBE — Fulfillment by eMAG', 'ca livrarea să fie rapidă, plătită per comandă'],
      ],
    },
    forWho: {
      yesH: 'Pentru cine e',
      yes: [
        '— Vinzi serios pe eMAG sau Trendyol (zeci-sute de produse) și vrei să exiști și în afara marketplace-ului.',
        '— Nu ai site propriu și nu vrei să plătești mii de euro pentru unul.',
        '— Ai buget de promovare și vrei rezultate măsurabile, nu promisiuni.',
      ],
      noH: 'Pentru cine NU e',
      no: [
        '— Vânzări ocazionale, câteva produse fără stoc constant.',
        '— Așteptări de vânzări garantate — noi măsurăm vizibilitatea și clickurile, nu promitem cifre.',
        '— Dacă ești la început, auditul gratuit e tot ce-ți trebuie acum.',
      ],
      auditLink: '/audit-gratuit',
    },
    faqTitle: 'Întrebări frecvente',
    faq: [
      ['Nu-mi arată eMAG deja produsele?', 'În interiorul eMAG, da. Dar în afara lui — pe Google, în ChatGPT — nu exiști: fără site propriu nu ai cum apărea. Pagina ta de vânzător e singura ta proprietate vizibilă în afara marketplace-ului, fără să-ți faci un magazin întreg.'],
      ['Cine ia comanda și banii?', 'Tu, ca și până acum. Clientul ajunge pe listingul tău de pe eMAG sau Trendyol și cumpără de acolo. Noi doar îți aducem vizibilitatea în plus.'],
      ['Ce se întâmplă dacă scot un produs de pe marketplace?', 'Verificăm periodic linkurile; dacă un produs nu mai există, pagina lui se ia jos. Nu rămân linkuri moarte.'],
      ['Cât durează până apar paginile?', 'După ce primim exportul, paginile sunt publicate în câteva zile lucrătoare. Indexarea în Google și citirea de către agenții AI vin apoi, în zile-săptămâni.'],
      ['Cât costă?', 'Depinde de numărul de produse și de pachet. Îți spunem prețul concret după ce vedem catalogul — fără angajamente, iar auditul inițial e gratuit.'],
      ['De ce nu-mi fac propriul meu site?', 'Poți — dacă ai buget de mii de euro și timp de întreținere. Pagina de vânzător e varianta fără site: apari în Google și în AI în zile, nu în luni, și fără costul unui magazin.'],
    ],
    form: {
      storeLabel: 'Numele firmei tale *',
      storePh: 'S.C. Exemplu S.R.L.',
      sellerLabel: 'Magazinul de pe marketplace',
      sellerPh: 'numele magazinului sau ID seller',
      marketLabel: 'Unde vinzi? *',
      market: ['eMAG', 'Trendyol', 'Ambele'],
      catalogLabel: 'Câte produse ai? *',
      catalog: ['Sub 500 de produse', '500 – 2.000 de produse', 'Peste 2.000 de produse'],
      salesLabel: 'Cât vinzi pe lună, aproximativ? *',
      sales: ['Sub 50.000 lei / lună', '50.000 – 200.000 lei / lună', 'Peste 200.000 lei / lună'],
      budgetLabel: 'Ce buget ai pentru promovare, lunar? *',
      budget: ['Sub 500 lei / lună', '500 – 2.000 lei / lună', 'Peste 2.000 lei / lună'],
      nameLabel: 'Numele tău *',
      emailLabel: 'Email *',
      phoneLabel: 'Telefon',
      gdprPre: 'Sunt de acord să fiu contactat de CatyAI (PayAi-X S.R.L.) despre ofertă. Datele nu sunt transmise terților. ',
      gdprLink: 'Politica GDPR',
      submit: 'Vreau pagina mea de vânzător',
      sending: 'Se trimite…',
      doneH: 'Am primit cererea',
      doneP: 'Verificăm catalogul tău de marketplace și revenim pe email cu ce se poate lista și cu auditul gratuit.',
      foot: 'Fără obligații. Revenim pe email cu verificarea catalogului tău.',
      errConn: 'Problemă de conexiune. Verifică internetul și încearcă din nou.',
      errRate: 'Prea multe trimiteri de pe această adresă. Încearcă din nou peste o oră.',
      errGeneric: 'Nu am putut trimite formularul. Scrie-ne la contact@catyai.io.',
    },
  },

  en: {
    meta: {
      title: 'No website? Your own seller page, visible in Google and ChatGPT — CatyAI',
      desc: 'eMAG and Trendyol sellers without a website: your own seller page with your products, indexed by Google and readable by ChatGPT. Customers still buy from you, on the marketplace. Free catalog audit.',
    },
    hero: {
      eyebrow: 'FOR eMAG · TRENDYOL SELLERS',
      titlePre: 'No website? ',
      titleAccent: 'You get your own seller page now',
      titlePost: ' — with your products, visible in Google and in ChatGPT.',
      sub: 'If you sell only through eMAG or Trendyol, you do not exist outside the marketplace: nobody finds you on Google and ChatGPT has never heard of you. We build your page — with your name and your products — while the sale stays on the marketplace, where it already is.',
    },
    whatYouGet: [
      { h: 'Your own seller page', p: 'Your own space on catyai.io, with your store name and pages for your products. You no longer exist only as a “sold by…” line inside the marketplace.' },
      { h: 'Your products in Google', p: 'Pages are indexed by Google with complete structured data — something you cannot have without a website, because Google Shopping requires a verified site.' },
      { h: 'Visible to ChatGPT and Perplexity', p: 'An llms.txt file and structured content so AI agents can read and recommend your products. We promise “discoverable” — being recommended is earned over time, not guaranteed.' },
      { h: 'Customers still buy from you', p: 'The buy button leads straight to your eMAG or Trendyol listing. Orders, payment and delivery stay with you — we never touch them.' },
    ],
    stepsTitle: 'HOW IT WORKS',
    steps: [
      'Fill in the form and send us your product export (we tell you the exact format).',
      'We check the catalog — EAN codes, titles, images — and publish your page with the products.',
      'You get a visibility report: what got indexed, what shows in Google, what AI agents read.',
    ],
    already: {
      h: 'Who already pays for this',
      sub: 'Serious sellers already invest in visibility and operations. Your seller page fills exactly what is missing: a presence outside the marketplace.',
      items: [
        ['BaseLinker or other integrators', 'to keep stock and orders in sync across channels'],
        ['eMAG Ads', 'to make products rank higher inside the marketplace'],
        ['FBE — Fulfillment by eMAG', 'for fast delivery, paid per order'],
      ],
    },
    forWho: {
      yesH: 'Who it is for',
      yes: [
        '— You sell seriously on eMAG or Trendyol (tens to hundreds of products) and want to exist outside the marketplace too.',
        '— You have no website and do not want to pay thousands of euros for one.',
        '— You have a promotion budget and want measurable results, not promises.',
      ],
      noH: 'Who it is NOT for',
      no: [
        '— Occasional sales, a few products without steady stock.',
        '— Expectations of guaranteed sales — we measure visibility and clicks, we do not promise figures.',
        '— If you are just starting out, the free audit is all you need right now.',
      ],
      auditLink: '/audit-gratuit',
    },
    faqTitle: 'Frequently asked questions',
    faq: [
      ['Does eMAG not already show my products?', 'Inside eMAG, yes. But outside it — on Google, in ChatGPT — you do not exist: without a website there is no way to appear. Your seller page is your only visible property outside the marketplace, without building a whole store.'],
      ['Who takes the order and the money?', 'You, exactly as before. The customer lands on your eMAG or Trendyol listing and buys there. We only bring you the extra visibility.'],
      ['What happens if I remove a product from the marketplace?', 'We check links periodically; if a product no longer exists, its page comes down. No dead links remain.'],
      ['How long until the pages appear?', 'Once we receive the export, pages are published within a few business days. Indexing in Google and reading by AI agents follow, in days to weeks.'],
      ['How much does it cost?', 'It depends on the number of products and the package. We give you a concrete price after seeing the catalog — no commitments, and the initial audit is free.'],
      ['Why not build my own website?', 'You can — if you have a budget of thousands of euros and time for maintenance. The seller page is the no-website option: you appear in Google and in AI in days, not months, and without the cost of a full store.'],
    ],
    form: {
      storeLabel: 'Your company name *',
      storePh: 'Example LLC',
      sellerLabel: 'Your marketplace store',
      sellerPh: 'store name or seller ID',
      marketLabel: 'Where do you sell? *',
      market: ['eMAG', 'Trendyol', 'Both'],
      catalogLabel: 'How many products do you have? *',
      catalog: ['Under 500 products', '500 – 2,000 products', 'Over 2,000 products'],
      salesLabel: 'Approximate monthly sales? *',
      sales: ['Under 50,000 lei / month', '50,000 – 200,000 lei / month', 'Over 200,000 lei / month'],
      budgetLabel: 'What monthly promotion budget do you have? *',
      budget: ['Under 500 lei / month', '500 – 2,000 lei / month', 'Over 2,000 lei / month'],
      nameLabel: 'Your name *',
      emailLabel: 'Email *',
      phoneLabel: 'Phone',
      gdprPre: 'I agree to be contacted by CatyAI (PayAi-X S.R.L.) about the offer. Data is not shared with third parties. ',
      gdprLink: 'GDPR policy',
      submit: 'I want my seller page',
      sending: 'Sending…',
      doneH: 'Request received',
      doneP: 'We check your marketplace catalog and get back by email with what can be listed and the free audit.',
      foot: 'No obligations. We get back by email after checking your catalog.',
      errConn: 'Connection problem. Check your internet and try again.',
      errRate: 'Too many submissions from this address. Try again in an hour.',
      errGeneric: 'We could not submit the form. Write to contact@catyai.io.',
    },
  },

  es: {
    meta: {
      title: '¿Sin web? Tu página de vendedor, visible en Google y en ChatGPT — CatyAI',
      desc: 'Vendedores de eMAG y Trendyol sin web propia: tu página de vendedor con tus productos, indexada en Google y legible por ChatGPT. El cliente sigue comprándote en el marketplace. Auditoría de catálogo gratuita.',
    },
    hero: {
      eyebrow: 'PARA VENDEDORES eMAG · TRENDYOL',
      titlePre: '¿Sin web? ',
      titleAccent: 'Ahora tienes tu página de vendedor',
      titlePost: ' — con tus productos, visible en Google y en ChatGPT.',
      sub: 'Si vendes solo a través de eMAG o Trendyol, fuera del marketplace no existes: nadie te encuentra en Google y ChatGPT no sabe de ti. Te creamos tu página — con tu nombre y tus productos — y la compra sigue en el marketplace, donde ya está.',
    },
    whatYouGet: [
      { h: 'Tu página de vendedor', p: 'Tu propio espacio en catyai.io, con el nombre de tu tienda y páginas para tus productos. Ya no existes solo como una línea de «vendido por…» dentro del marketplace.' },
      { h: 'Tus productos en Google', p: 'Las páginas se indexan en Google con datos estructurados completos — algo que no puedes tener sin web propia, porque Google Shopping exige un sitio verificado.' },
      { h: 'Visibles para ChatGPT y Perplexity', p: 'Un archivo llms.txt y contenido estructurado para que los agentes de IA puedan leer y recomendar tus productos. Prometemos «descubrible» — la recomendación se gana con el tiempo, no se garantiza.' },
      { h: 'El cliente sigue comprándote a ti', p: 'El botón de compra lleva directamente a tu ficha de eMAG o Trendyol. El pedido, el pago y la entrega siguen siendo tuyos — nosotros no los tocamos.' },
    ],
    stepsTitle: 'CÓMO FUNCIONA',
    steps: [
      'Rellenas el formulario y nos envías la exportación de productos (te decimos el formato exacto).',
      'Revisamos el catálogo — EAN, títulos, fotos — y publicamos tu página con los productos.',
      'Recibes un informe de visibilidad: qué se indexó, qué aparece en Google, qué leen los agentes de IA.',
    ],
    already: {
      h: 'Quién ya paga por esto',
      sub: 'Los vendedores serios ya invierten en visibilidad y operaciones. Tu página de vendedor completa justo lo que falta: presencia fuera del marketplace.',
      items: [
        ['BaseLinker u otros integradores', 'para mantener stock y pedidos sincronizados entre canales'],
        ['eMAG Ads', 'para que los productos aparezcan más arriba dentro del marketplace'],
        ['FBE — Fulfillment by eMAG', 'para entregas rápidas, pagadas por pedido'],
      ],
    },
    forWho: {
      yesH: 'Para quién es',
      yes: [
        '— Vendes en serio en eMAG o Trendyol (decenas o cientos de productos) y quieres existir también fuera del marketplace.',
        '— No tienes web propia y no quieres pagar miles de euros por una.',
        '— Tienes presupuesto de promoción y quieres resultados medibles, no promesas.',
      ],
      noH: 'Para quién NO es',
      no: [
        '— Ventas ocasionales, unos pocos productos sin stock constante.',
        '— Expectativas de ventas garantizadas — medimos visibilidad y clics, no prometemos cifras.',
        '— Si estás empezando, la auditoría gratuita es todo lo que necesitas ahora.',
      ],
      auditLink: '/audit-gratuit',
    },
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿eMAG no muestra ya mis productos?', 'Dentro de eMAG, sí. Pero fuera — en Google, en ChatGPT — no existes: sin web propia no puedes aparecer. Tu página de vendedor es tu única propiedad visible fuera del marketplace, sin montar una tienda entera.'],
      ['¿Quién recibe el pedido y el dinero?', 'Tú, igual que hasta ahora. El cliente llega a tu ficha de eMAG o Trendyol y compra allí. Nosotros solo te aportamos la visibilidad extra.'],
      ['¿Qué pasa si quito un producto del marketplace?', 'Revisamos los enlaces periódicamente; si un producto ya no existe, su página se retira. No quedan enlaces rotos.'],
      ['¿Cuánto tardan en aparecer las páginas?', 'Tras recibir la exportación, las páginas se publican en unos días laborables. La indexación en Google y la lectura por agentes de IA llegan después, en días o semanas.'],
      ['¿Cuánto cuesta?', 'Depende del número de productos y del paquete. Te damos un precio concreto después de ver el catálogo — sin compromiso, y la auditoría inicial es gratuita.'],
      ['¿Por qué no me hago mi propia web?', 'Puedes — si tienes presupuesto de miles de euros y tiempo de mantenimiento. La página de vendedor es la opción sin web: apareces en Google y en la IA en días, no en meses, y sin el coste de una tienda completa.'],
    ],
    form: {
      storeLabel: 'Nombre de tu empresa *',
      storePh: 'Ejemplo S.L.',
      sellerLabel: 'Tu tienda en el marketplace',
      sellerPh: 'nombre de la tienda o ID de vendedor',
      marketLabel: '¿Dónde vendes? *',
      market: ['eMAG', 'Trendyol', 'Ambos'],
      catalogLabel: '¿Cuántos productos tienes? *',
      catalog: ['Menos de 500 productos', '500 – 2.000 productos', 'Más de 2.000 productos'],
      salesLabel: '¿Cuánto vendes al mes, aproximadamente? *',
      sales: ['Menos de 50.000 lei / mes', '50.000 – 200.000 lei / mes', 'Más de 200.000 lei / mes'],
      budgetLabel: '¿Qué presupuesto de promoción tienes al mes? *',
      budget: ['Menos de 500 lei / mes', '500 – 2.000 lei / mes', 'Más de 2.000 lei / mes'],
      nameLabel: 'Tu nombre *',
      emailLabel: 'Email *',
      phoneLabel: 'Teléfono',
      gdprPre: 'Acepto que CatyAI (PayAi-X S.R.L.) me contacte sobre la oferta. Los datos no se comparten con terceros. ',
      gdprLink: 'Política GDPR',
      submit: 'Quiero mi página de vendedor',
      sending: 'Enviando…',
      doneH: 'Hemos recibido tu solicitud',
      doneP: 'Revisamos tu catálogo del marketplace y volvemos por email con lo que se puede publicar y la auditoría gratuita.',
      foot: 'Sin compromiso. Volvemos por email tras revisar tu catálogo.',
      errConn: 'Problema de conexión. Comprueba internet e inténtalo de nuevo.',
      errRate: 'Demasiados envíos desde esta dirección. Inténtalo de nuevo en una hora.',
      errGeneric: 'No pudimos enviar el formulario. Escríbenos a contact@catyai.io.',
    },
  },

  pt: {
    meta: {
      title: 'Sem site? A sua página de vendedor, visível no Google e no ChatGPT — CatyAI',
      desc: 'Vendedores eMAG e Trendyol sem site próprio: a sua página de vendedor com os seus produtos, indexada no Google e legível pelo ChatGPT. O cliente continua a comprar de si, no marketplace. Auditoria de catálogo gratuita.',
    },
    hero: {
      eyebrow: 'PARA VENDEDORES eMAG · TRENDYOL',
      titlePre: 'Sem site? ',
      titleAccent: 'Agora tem a sua página de vendedor',
      titlePost: ' — com os seus produtos, visível no Google e no ChatGPT.',
      sub: 'Se vende apenas através do eMAG ou do Trendyol, fora do marketplace não existe: ninguém o encontra no Google e o ChatGPT não sabe de si. Criamos a sua página — com o seu nome e os seus produtos — e a compra continua no marketplace, onde já está.',
    },
    whatYouGet: [
      { h: 'A sua página de vendedor', p: 'O seu próprio espaço no catyai.io, com o nome da sua loja e páginas para os seus produtos. Deixa de existir apenas como uma linha «vendido por…» dentro do marketplace.' },
      { h: 'Os seus produtos no Google', p: 'As páginas são indexadas pelo Google com dados estruturados completos — algo que não pode ter sem site próprio, porque o Google Shopping exige um site verificado.' },
      { h: 'Visíveis para o ChatGPT e o Perplexity', p: 'Um ficheiro llms.txt e conteúdo estruturado para que os agentes de IA possam ler e recomendar os seus produtos. Prometemos «descobrível» — a recomendação conquista-se com o tempo, não se garante.' },
      { h: 'O cliente continua a comprar de si', p: 'O botão de compra leva diretamente ao seu anúncio no eMAG ou Trendyol. A encomenda, o pagamento e a entrega continuam consigo — nós não os tocamos.' },
    ],
    stepsTitle: 'COMO FUNCIONA',
    steps: [
      'Preenche o formulário e envia-nos a exportação de produtos (dizemos-lhe o formato exato).',
      'Verificamos o catálogo — EAN, títulos, fotos — e publicamos a sua página com os produtos.',
      'Recebe um relatório de visibilidade: o que foi indexado, o que aparece no Google, o que os agentes de IA leem.',
    ],
    already: {
      h: 'Quem já paga por isto',
      sub: 'Os vendedores sérios já investem em visibilidade e operações. A sua página de vendedor completa exatamente o que falta: presença fora do marketplace.',
      items: [
        ['BaseLinker ou outros integradores', 'para manter stock e encomendas sincronizados entre canais'],
        ['eMAG Ads', 'para os produtos aparecerem mais acima dentro do marketplace'],
        ['FBE — Fulfillment by eMAG', 'para entregas rápidas, pagas por encomenda'],
      ],
    },
    forWho: {
      yesH: 'Para quem é',
      yes: [
        '— Vende a sério no eMAG ou no Trendyol (dezenas ou centenas de produtos) e quer existir também fora do marketplace.',
        '— Não tem site próprio e não quer pagar milhares de euros por um.',
        '— Tem orçamento de promoção e quer resultados mensuráveis, não promessas.',
      ],
      noH: 'Para quem NÃO é',
      no: [
        '— Vendas ocasionais, alguns produtos sem stock constante.',
        '— Expectativas de vendas garantidas — medimos visibilidade e cliques, não prometemos números.',
        '— Se está a começar, a auditoria gratuita é tudo o que precisa agora.',
      ],
      auditLink: '/audit-gratuit',
    },
    faqTitle: 'Perguntas frequentes',
    faq: [
      ['O eMAG já não mostra os meus produtos?', 'Dentro do eMAG, sim. Mas fora dele — no Google, no ChatGPT — não existe: sem site próprio não há como aparecer. A sua página de vendedor é a sua única propriedade visível fora do marketplace, sem construir uma loja inteira.'],
      ['Quem recebe a encomenda e o dinheiro?', 'Você, como sempre. O cliente chega ao seu anúncio no eMAG ou Trendyol e compra lá. Nós apenas trazemos a visibilidade extra.'],
      ['O que acontece se eu remover um produto do marketplace?', 'Verificamos os links periodicamente; se um produto deixar de existir, a página dele é removida. Não ficam links mortos.'],
      ['Quanto tempo até as páginas aparecerem?', 'Após recebermos a exportação, as páginas são publicadas em poucos dias úteis. A indexação no Google e a leitura pelos agentes de IA vêm depois, em dias ou semanas.'],
      ['Quanto custa?', 'Depende do número de produtos e do pacote. Dizemos-lhe o preço concreto depois de ver o catálogo — sem compromisso, e a auditoria inicial é gratuita.'],
      ['Porque não faço o meu próprio site?', 'Pode — se tiver orçamento de milhares de euros e tempo de manutenção. A página de vendedor é a opção sem site: aparece no Google e na IA em dias, não em meses, e sem o custo de uma loja completa.'],
    ],
    form: {
      storeLabel: 'Nome da sua empresa *',
      storePh: 'Exemplo Lda.',
      sellerLabel: 'A sua loja no marketplace',
      sellerPh: 'nome da loja ou ID de vendedor',
      marketLabel: 'Onde vende? *',
      market: ['eMAG', 'Trendyol', 'Ambos'],
      catalogLabel: 'Quantos produtos tem? *',
      catalog: ['Menos de 500 produtos', '500 – 2.000 produtos', 'Mais de 2.000 produtos'],
      salesLabel: 'Quanto vende por mês, aproximadamente? *',
      sales: ['Menos de 50.000 lei / mês', '50.000 – 200.000 lei / mês', 'Mais de 200.000 lei / mês'],
      budgetLabel: 'Qual o seu orçamento de promoção mensal? *',
      budget: ['Menos de 500 lei / mês', '500 – 2.000 lei / mês', 'Mais de 2.000 lei / mês'],
      nameLabel: 'O seu nome *',
      emailLabel: 'Email *',
      phoneLabel: 'Telefone',
      gdprPre: 'Concordo em ser contactado pela CatyAI (PayAi-X S.R.L.) sobre a oferta. Os dados não são partilhados com terceiros. ',
      gdprLink: 'Política GDPR',
      submit: 'Quero a minha página de vendedor',
      sending: 'A enviar…',
      doneH: 'Recebemos o seu pedido',
      doneP: 'Verificamos o seu catálogo do marketplace e respondemos por email com o que pode ser publicado e a auditoria gratuita.',
      foot: 'Sem compromisso. Respondemos por email após verificar o seu catálogo.',
      errConn: 'Problema de ligação. Verifique a internet e tente novamente.',
      errRate: 'Demasiados envios deste endereço. Tente novamente dentro de uma hora.',
      errGeneric: 'Não conseguimos enviar o formulário. Escreva para contact@catyai.io.',
    },
  },

  fr: {
    meta: {
      title: 'Pas de site ? Votre page vendeur, visible sur Google et dans ChatGPT — CatyAI',
      desc: 'Vendeurs eMAG et Trendyol sans site propre : votre page vendeur avec vos produits, indexée sur Google et lisible par ChatGPT. Le client achète toujours chez vous, sur le marketplace. Audit de catalogue gratuit.',
    },
    hero: {
      eyebrow: 'POUR LES VENDEURS eMAG · TRENDYOL',
      titlePre: 'Pas de site ? ',
      titleAccent: 'Vous avez maintenant votre page vendeur',
      titlePost: ' — avec vos produits, visible sur Google et dans ChatGPT.',
      sub: 'Si vous vendez uniquement via eMAG ou Trendyol, vous n’existe pas en dehors du marketplace : personne ne vous trouve sur Google et ChatGPT ne vous connaît pas. Nous créons votre page — avec votre nom et vos produits — et l’achat reste sur le marketplace, où il est déjà.',
    },
    whatYouGet: [
      { h: 'Votre page vendeur', p: 'Votre propre espace sur catyai.io, avec le nom de votre boutique et des pages pour vos produits. Vous n’existez plus seulement comme une ligne « vendu par… » à l’intérieur du marketplace.' },
      { h: 'Vos produits sur Google', p: 'Les pages sont indexées par Google avec des données structurées complètes — ce que vous ne pouvez pas avoir sans site propre, car Google Shopping exige un site vérifié.' },
      { h: 'Visibles pour ChatGPT et Perplexity', p: 'Un fichier llms.txt et un contenu structuré pour que les agents IA puissent lire et recommander vos produits. Nous promettons « découvrable » — la recommandation se mérite avec le temps, elle ne se garantit pas.' },
      { h: 'Le client achète toujours chez vous', p: 'Le bouton d’achat mène directement à votre annonce eMAG ou Trendyol. La commande, le paiement et la livraison restent chez vous — nous ne les touchons pas.' },
    ],
    stepsTitle: 'COMMENT ÇA MARCHE',
    steps: [
      'Vous remplissez le formulaire et nous envoyez l’export de vos produits (nous vous donnons le format exact).',
      'Nous vérifions le catalogue — EAN, titres, photos — et publions votre page avec les produits.',
      'Vous recevez un rapport de visibilité : ce qui a été indexé, ce qui apparaît sur Google, ce que les agents IA lisent.',
    ],
    already: {
      h: 'Qui paie déjà pour cela',
      sub: 'Les vendeurs sérieux investissent déjà en visibilité et en opérations. Votre page vendeur complète exactement ce qui manque : une présence en dehors du marketplace.',
      items: [
        ['BaseLinker ou d’autres intégrateurs', 'pour garder stock et commandes synchronisés entre les canaux'],
        ['eMAG Ads', 'pour que les produits apparaissent plus haut dans le marketplace'],
        ['FBE — Fulfillment by eMAG', 'pour des livraisons rapides, payées par commande'],
      ],
    },
    forWho: {
      yesH: 'Pour qui c’est fait',
      yes: [
        '— Vous vendez sérieusement sur eMAG ou Trendyol (des dizaines ou des centaines de produits) et voulez exister aussi en dehors du marketplace.',
        '— Vous n’avez pas de site propre et ne voulez pas payer des milliers d’euros pour en avoir un.',
        '— Vous avez un budget de promotion et voulez des résultats mesurables, pas des promesses.',
      ],
      noH: 'Pour qui ce N’est PAS fait',
      no: [
        '— Ventes occasionnelles, quelques produits sans stock régulier.',
        '— Attentes de ventes garanties — nous mesurons la visibilité et les clics, nous ne promettons pas de chiffres.',
        '— Si vous débutez, l’audit gratuit est tout ce dont vous avez besoin pour l’instant.',
      ],
      auditLink: '/audit-gratuit',
    },
    faqTitle: 'Questions fréquentes',
    faq: [
      ['eMAG n’affiche-t-il pas déjà mes produits ?', 'À l’intérieur d’eMAG, oui. Mais en dehors — sur Google, dans ChatGPT — vous n’existe pas : sans site propre, impossible d’apparaître. Votre page vendeur est votre seule propriété visible hors du marketplace, sans construire toute une boutique.'],
      ['Qui prend la commande et l’argent ?', 'Vous, comme avant. Le client arrive sur votre annonce eMAG ou Trendyol et achète là-bas. Nous, nous apportons juste la visibilité en plus.'],
      ['Que se passe-t-il si je retire un produit du marketplace ?', 'Nous vérifions les liens périodiquement ; si un produit n’existe plus, sa page est retirée. Aucun lien mort ne reste.'],
      ['Combien de temps avant que les pages apparaissent ?', 'Après réception de l’export, les pages sont publiées en quelques jours ouvrés. L’indexation sur Google et la lecture par les agents IA suivent, en jours ou semaines.'],
      ['Combien ça coûte ?', 'Cela dépend du nombre de produits et du forfait. Nous vous donnons un prix concret après avoir vu le catalogue — sans engagement, et l’audit initial est gratuit.'],
      ['Pourquoi ne pas créer mon propre site ?', 'Vous pouvez — si vous avez un budget de milliers d’euros et du temps de maintenance. La page vendeur est l’option sans site : vous apparaissez sur Google et dans l’IA en jours, pas en mois, et sans le coût d’une boutique complète.'],
    ],
    form: {
      storeLabel: 'Nom de votre entreprise *',
      storePh: 'Exemple SARL',
      sellerLabel: 'Votre boutique sur le marketplace',
      sellerPh: 'nom de la boutique ou ID vendeur',
      marketLabel: 'Où vendez-vous ? *',
      market: ['eMAG', 'Trendyol', 'Les deux'],
      catalogLabel: 'Combien de produits avez-vous ? *',
      catalog: ['Moins de 500 produits', '500 – 2 000 produits', 'Plus de 2 000 produits'],
      salesLabel: 'Combien vendez-vous par mois, environ ? *',
      sales: ['Moins de 50 000 lei / mois', '50 000 – 200 000 lei / mois', 'Plus de 200 000 lei / mois'],
      budgetLabel: 'Quel budget de promotion avez-vous par mois ? *',
      budget: ['Moins de 500 lei / mois', '500 – 2 000 lei / mois', 'Plus de 2 000 lei / mois'],
      nameLabel: 'Votre nom *',
      emailLabel: 'Email *',
      phoneLabel: 'Téléphone',
      gdprPre: 'J’accepte d’être contacté par CatyAI (PayAi-X S.R.L.) au sujet de l’offre. Les données ne sont pas transmises à des tiers. ',
      gdprLink: 'Politique GDPR',
      submit: 'Je veux ma page vendeur',
      sending: 'Envoi…',
      doneH: 'Demande reçue',
      doneP: 'Nous vérifions votre catalogue de marketplace et revenons par email avec ce qui peut être publié et l’audit gratuit.',
      foot: 'Sans engagement. Nous revenons par email après vérification de votre catalogue.',
      errConn: 'Problème de connexion. Vérifiez internet et réessayez.',
      errRate: 'Trop d’envois depuis cette adresse. Réessayez dans une heure.',
      errGeneric: 'Nous n’avons pas pu envoyer le formulaire. Écrivez à contact@catyai.io.',
    },
  },
}

// Valorile trimise la server — identice cu QUALIFICATION_OPTIONS din backend
// (nu se traduc, sunt chei).
const V = {
  market: ['emag', 'trendyol', 'emag+trendyol'],
  catalog: ['sub-500', '500-2000', 'peste-2000'],
  sales: ['sub-50k', '50k-200k', 'peste-200k'],
  budget: ['sub-500', '500-2000', 'peste-2000'],
}

const ICONS = [Store, Search, MousePointerClick, ShieldCheck]

export default function VanzatoriMarketplace({ locale }) {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState(locale || 'en')

  useEffect(() => {
    if (locale) return
    const saved = localStorage.getItem('catyai_lang')
    if (saved && T[saved]) setLang(saved)
  }, [locale])

  useEffect(() => { if (!locale) localStorage.setItem('catyai_lang', lang) }, [lang, locale])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = T[lang] || T.en

  return (
    <>
      <SEO
        title={t.meta.title}
        description={t.meta.desc}
        url={pageUrl(SLUG, locale || lang)}
        lang={lang}
        alternates={alternatesFor(SLUG)}
      />
      <Helmet>
        <html lang={lang} />
      </Helmet>

      <div className="min-h-screen bg-navy text-slate-200 font-sans antialiased">
        <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />

        <main>
          <section aria-labelledby="vm-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold mb-4">{t.hero.eyebrow}</p>
              <h1 id="vm-heading" className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-white">
                {t.hero.titlePre}<span className="text-gold">{t.hero.titleAccent}</span>{t.hero.titlePost}
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10">{t.hero.sub}</p>

              <ul className="space-y-6 mb-12">
                {t.whatYouGet.map((item, i) => {
                  const Icon = ICONS[i]
                  return (
                    <li key={item.h} className="flex gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl border border-gold/40 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="font-semibold text-white mb-1">{item.h}</h2>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.p}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="rounded-2xl border border-navy-lighter bg-navy-light p-6">
                <h2 className="text-xs tracking-[0.2em] text-slate-500 mb-4">{t.stepsTitle}</h2>
                <ol className="space-y-3">
                  {t.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-slate-300">
                      <span className="text-gold font-bold">{i + 1}.</span>{s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <MarketplaceForm t={t.form} lang={lang} />
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            <div className="rounded-2xl border border-gold/30 bg-navy-light p-8">
              <h2 className="text-lg font-bold text-white mb-2">{t.already.h}</h2>
              <p className="text-sm text-slate-400 mb-6">{t.already.sub}</p>
              <ul className="grid md:grid-cols-3 gap-4">
                {t.already.items.map(([h, p]) => (
                  <li key={h} className="rounded-xl border border-navy-lighter bg-navy p-5">
                    <h3 className="font-semibold text-white text-sm mb-2">{h}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gold/30 bg-navy-light p-8">
              <h2 className="text-lg font-bold text-white mb-4">{t.forWho.yesH}</h2>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                {t.forWho.yes.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-navy-lighter bg-navy-light p-8">
              <h2 className="text-lg font-bold text-white mb-4">{t.forWho.noH}</h2>
              <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                {t.forWho.no.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-8">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faq.map(([q, a]) => (
                <details key={q} className="rounded-2xl border border-navy-lighter bg-navy-light px-6 py-4 group">
                  <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center">
                    {q}
                    <span className="text-gold text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-slate-400 leading-relaxed mt-4">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <FooterV9 lang={lang} />
      </div>
    </>
  )
}

function MarketplaceForm({ t, lang }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [utm] = useState(() => {
    if (typeof window === 'undefined') return {}
    const q = new URLSearchParams(window.location.search)
    const captured = {}
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      if (q.get(k)) captured[k] = q.get(k)
    }
    return captured
  })

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    // „Ambele" = ambele canale bifate; valorile trebuie să fie în QUALIFICATION_OPTIONS.channels.
    const marketplace = form.get('marketplace')
    const channels = marketplace === 'emag+trendyol' ? ['emag', 'trendyol'] : [marketplace]
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      store: form.get('store'),
      marketplace_seller: form.get('marketplace_seller'),
      platform: 'Fara site (doar marketplace)',
      channels,
      catalog_size: form.get('catalog_size'),
      monthly_sales: form.get('monthly_sales'),
      budget: form.get('budget'),
      gdpr_consent: form.get('gdpr_consent') === 'on',
      company_website: form.get('company_website'),
      ...utm,
      caty_source: CATY_SOURCE,
    }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch(LEADS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.success) {
        setStatus('done')
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: CATY_SOURCE })
        }
      } else {
        setStatus('error')
        setError(body.error === 'rate_limited' ? t.errRate : (body.error || t.errGeneric))
      }
    } catch (err) {
      console.error('[VanzatoriMarketplace] submit failed', { message: err.message })
      setStatus('error')
      setError(t.errConn)
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-gold/40 bg-navy-light p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="text-xl font-bold mb-3 text-white">{t.doneH}</h2>
        <p className="text-slate-400 leading-relaxed">{t.doneP}</p>
      </div>
    )
  }

  const inputCls = 'w-full rounded-xl border border-navy-lighter bg-navy px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/40 transition-colors'
  const labelCls = 'block text-sm font-medium text-slate-300 mb-2'
  const legendCls = 'text-sm font-medium text-slate-300 mb-3'
  const choiceCls = 'flex items-start gap-3 rounded-lg border border-navy-lighter px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:border-gold/40 has-[:checked]:border-gold/70 has-[:checked]:bg-gold/5 transition-colors'

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-navy-lighter bg-navy-light p-6 sm:p-8 space-y-7" noValidate={false}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="vm-store" className={labelCls}>{t.storeLabel}</label>
          <input id="vm-store" name="store" type="text" required placeholder={t.storePh} autoComplete="organization" className={inputCls} />
        </div>
        <div>
          <label htmlFor="vm-seller" className={labelCls}>{t.sellerLabel}</label>
          <input id="vm-seller" name="marketplace_seller" type="text" placeholder={t.sellerPh} className={inputCls} />
        </div>
      </div>

      <fieldset>
        <legend className={legendCls}>{t.marketLabel}</legend>
        <div className="grid sm:grid-cols-3 gap-2">
          {t.market.map((l, i) => (
            <label key={V.market[i]} className={choiceCls}>
              <input type="radio" name="marketplace" value={V.market[i]} required defaultChecked={i === 0} className="mt-0.5 accent-[#C8A165]" />{l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>{t.catalogLabel}</legend>
        <div className="grid gap-2">
          {t.catalog.map((l, i) => (
            <label key={V.catalog[i]} className={choiceCls}>
              <input type="radio" name="catalog_size" value={V.catalog[i]} required className="mt-0.5 accent-[#C8A165]" />{l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>{t.salesLabel}</legend>
        <div className="grid gap-2">
          {t.sales.map((l, i) => (
            <label key={V.sales[i]} className={choiceCls}>
              <input type="radio" name="monthly_sales" value={V.sales[i]} required className="mt-0.5 accent-[#C8A165]" />{l}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendCls}>{t.budgetLabel}</legend>
        <div className="grid gap-2">
          {t.budget.map((l, i) => (
            <label key={V.budget[i]} className={choiceCls}>
              <input type="radio" name="budget" value={V.budget[i]} required className="mt-0.5 accent-[#C8A165]" />{l}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label htmlFor="vm-name" className={labelCls}>{t.nameLabel}</label>
          <input id="vm-name" name="name" type="text" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="vm-email" className={labelCls}>{t.emailLabel}</label>
          <input id="vm-email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </div>
        <div>
          <label htmlFor="vm-phone" className={labelCls}>{t.phoneLabel}</label>
          <input id="vm-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </div>
      </div>

      {/* Honeypot — invizibil pentru oameni; completat doar de boți (serverul îl ignoră silențios). */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="vm-company-website">Nu completa acest câmp</label>
        <input id="vm-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed cursor-pointer">
        <input type="checkbox" name="gdpr_consent" required className="mt-0.5 accent-[#C8A165]" />
        <span>{t.gdprPre}<a href="/gdpr" className="text-gold underline underline-offset-2">{t.gdprLink}</a></span>
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">{error}</p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-60">
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <p className="text-[11px] text-slate-500 leading-relaxed">{t.foot}</p>
    </form>
  )
}
