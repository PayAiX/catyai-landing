# AGENT 89 — Homepage catyai.io „Vizibilitate” — 2026-10-08

> Mandat: refacere homepage pe structura mockup 10Web + identitatea vizuală
> catyai.io + date reale cu sursă. Branch `feat/homepage-vizibilitate` în
> `PayAiX/catyai-landing`. READ-ONLY pe orice altceva. Fără deploy.

## 1. Ce s-a construit (secțiuni, în ordine)

1. **Hero** — badge „FEED AUTOMATION & GEO ENGINE", H1 „Facem catalogul tău
   vizibil pe Google Shopping și în ChatGPT", sub despre sincronizare CSS/AI,
   CTA „Vezi planurile de preț" + secundar „Fă-ți catalogul vizibil".
   Widget terminal decorativ cu **cifre reale din `catalogStats`** (build-time,
   `api.catyai.io/api/public/catalog-stats`) — NU cifre inventate ca mockupul
   („LIVE SYNC: 14.820 SKU" a fost respins de mandat).
2. **Cele trei piese** — 01 Catalog Automation · 02 GEO/Vizibilitate AI ·
   03 Google CSS Partner (texte rescrise, fără „25% mai multe afișări").
3. **Clienți reali** — gotrendy.ro + luxoryavelar.com, doar cifre cu sursă
   (tabelul e la §4). Fără rate de aprobare GMC (neverificate de 77).
4. **Verticală** — Ecommerce principal (4 feature-uri) + „Alte verticale, la
   cerere" (clinici/imobiliare/restaurante/agenții — fără secțiuni dedicate,
   conform mandatului până la confirmarea lui Adrian).
5. **CSS direct** — mecanismul ~20%: comparație „~80% vs 100% din bid ajunge
   în licitație". Fără procente de performanță neverificate.
6. **Prețuri** — `{{LUNAR}}` / `{{SETUP}}` placeholder vizibil + notă
   „Cifrele finale se publică după confirmarea grilei de preț."
7. **CTA/Formular** — Nume/Email/Telefon/Site → `POST api.catyai.io/api/leads/
   catalog-audit` cu `caty_source: 'homepage-vizibilitate'` (același endpoint
   public folosit de /chatgpt-feed). Copy: „analiză tehnică a feedului în max.
   24h lucrătoare", fără cuvântul „gratuit". GDPR note + UTM capture.
8. **Footer** — FooterV9: © PayAi-X S.R.L. · contact@catyai.io (era „PayAi-X
   FZE" + mailto contact@payai-x.com). Impact: toate paginile care folosesc
   FooterV9 — corecție legală cerută de mandat/metadata.

## 2. Metadata — ce s-a corectat în index.html

| # | Problema | Fix |
|---|---|---|
| 1 | `LocalBusiness „CatyAI România"` cu **„Calea Victoriei 155, București" — adresă inventată** (confirmat de Adrian; introdusă f524c09, 5 apr 2026), geo fals, telefon, rating | Bloc **eliminat complet** |
| 2 | `aggregateRating 4.8/47` + recenzii „Horia N."/„Maria D." în SoftwareApplication | **Eliminat** — fără sursă; risc de spam structurat Google |
| 3 | `offers` 0/49/99/199/499 EUR (planuri chatbot vechi) în SoftwareApplication + Service + LocalBusiness | **Eliminat** — intră în conflict cu noua grilă (încă nedecisă) |
| 4 | `keywords` meta = poziționare veche (FraudAI/chatbot) | Rescrise pe feed/CSS/GEO |
| 5 | `theme-color #6366F1` (indigo, în afara paletei) | `#0A1628` (navy-light, din `@theme`) |
| 6 | `<noscript>` h1 = „AI Sales Platform" | „Facem catalogul tău vizibil pe Google Shopping și în ChatGPT" |
| 7 | Organization `legalName: PayAi-X FZE`, adresă Dubai, `foundingDate 2024`, contactPoint fără email, knowsAbout chatbot | `legalName: PayAi-X S.R.L.`, adresă RO/Bucharest (fără stradă — real, din payai-x.com), `foundingDate 2023`, `email: contact@catyai.io`, knowsAbout pe feed/CSS/GEO |
| 8 | `author` meta „PayAi-X FZE" | „PayAi-X S.R.L." (entitatea EU care operează catyai.io — decizie de documentat; FZE rămâne entitatea Dubai pentru contracte internaționale) |
| 9 | Service schema = chatbot + oferte gratuite | Rescris: „Feed Automation & GEO Engine", fără oferte |
| 10 | Person schema | Neschimbat (date reale, păstrate) |

Toate cele 4 blocuri ld+json rămase parsează valid (verificat cu node).

## 3. Paleta folosită (sursă canonică: src/index.css @theme)

navy `#010A1F` fundal · navy-light `#0A1628` carduri · navy-lighter `#1a2744`
border-e · gold `#C8A165` accent/CTA · gold-light `#D4B57A` · royal `#1A3F7A`
glow hero · text `#FFFFFF`/`#B0B0B0`/`#6B7280` · font Inter (+ JetBrains Mono
pentru etichete tehnice). Design-ul mockupului (WordPress/10Web, violet) NU a
fost preluat.

## 4. Tabel „cifră → sursă" (fiecare număr de pe pagină)

| Cifră de pe pagină | Unde | Sursă |
|---|---|---|
| produse din catalog (ex. „3,4M") + comercianți activi | widget hero terminal | `catalogStats` → `scripts/fetch-catalog-stats.mjs` → `GET api.catyai.io/api/public/catalog-stats` (aceeași interogare ca shop.catyai.io/aff-llms.txt), la build |
| 185 produse în feed | client gotrendy | CATYAI_STATE v2.165/166: feed gotrendy republicat 6 oct 2026, 185 iteme, sha 2e099b74 |
| 26/76 defecte reparate în <48h | client gotrendy | payai-x.com, secțiunea Case studies, CS.04 (feed audit gotrendy) |
| 52 produse în feed (v6) | client luxoryavelar | CATYAI_STATE v2.163: feed v6 publicat 6 oct 2026, 52 iteme, sha 118357a1 |
| 28 descrieri rescrise | client luxoryavelar | CATYAI_STATE v2.163: 28 descrieri scrise în GoMag 6 oct 2026 |
| ~20% reținut de Google din CPC / ~80% vs 100% din bid | secțiunea CSS | mecanism CSS documentat în mandat (formulare standard Google) — claim structural, nu metrică de performanță |
| „max. 24 ore lucrătoare" răspuns tehnic | formular + hero | mandat |

Cifre din mockup respinse ca neverificate: 14.820 SKU · 18.450 produse /
99,8% gotrendy · 9.120 produse / 100% luxoryavelar · „25% mai multe
afișări" · telefon +40 31 229 5900 · „CSS Partner ID: 948210" ·
contact@catyai.ro · „Cluj-Napoca" · „audit gratuit".

## 5. Placeholder-i rămași (decizia lui Adrian)

- `{{LUNAR}}` — abonament lunar
- `{{SETUP}}` — implementare unică
- Telefon în footer — **omis intenționat** (mandat: doar după confirmare)
- „CSS Partner ID" — **omis intenționat** (doar după confirmare)
- Paginile de verticală Clinici/Imobiliare/Restaurante/Agenții — doar
  „la cerere" până confirmi că le vindem
- Entitatea din schema Organization (S.R.L. vs FZE) — flip ușor dacă alegi FZE

## 6. Ce NU am putut verifica

1. **Endpoint formular** — am reutilizat `POST api.catyai.io/api/leads/catalog-audit`
   din codul /chatgpt-feed; nu am trimis un POST de test (zero scrieri). Nu
   confirm că acceptă `caty_source: 'homepage-vizibilitate'` fără allowlist —
   primul lead real de pe formular trebuie verificat în DB/API după deploy.
2. **CORS** — presupun că endpointul permite origin catyai.io (la fel ca pe
   /chatgpt-feed), dar nu am verificat live cu un POST.
3. **Rate de aprobare GMC** pentru gotrendy/luxoryavelar — necesită acces GMC;
   77 nu le-a confirmat → omise.
4. **Chromium local** — build + prerender rulate local; rezultatul poate diferi
   minim de CI (GitHub Actions).
5. **Catalog-stats la build** — dacă API-ul nu răspunde la momentul deploy-ului,
   buildul rulează fail-soft pe ultimul JSON comis (comportament existent).
6. Nu am atins: shop.catyai.io, api, xl, Fabrica, feed-cron, orice producție.
   Singurele „atingeri” externe repo-ului: clone locală + PR.

## 7. Dovadă

- `npx eslint src/pages/HomePage.jsx src/components/FooterV9.jsx` → 0 erori.
- `npm run build` (fetch-catalog-stats → sitemap → vite → prerender 141 rute).
- Screenshots desktop + mobile în PR.

## 8. Verificări externe (AGENT 77, read-only, 8 oct 2026)

Raport: `docs/audit/AGENT77-verificari-agent89-homepage-2026-10-08.md` (repo Caty.AI).

1. **Endpoint formular CONFIRMAT din cod** (`src/api/leads/catalog-audit.js:106`):
   `caty_source` e curățat doar la 100 caractere, fără whitelist/enum →
   `homepage-vizibilitate` e acceptat și salvat în `caty_catalog_audit_leads`,
   cu log + email de notificare. Trafic: 0 leaduri în ultimele 24 h, niciun
   POST de test. → punctul 1 din „Ce NU am putut verifica" e REZOLVAT.
2. **Cifrele catalog CONFIRMATE live**: `GET /api/public/catalog-stats` → 200,
   `totalMerchants: 191, totalProducts: 3971435` (8 oct 08:51 UTC) — identic
   cu ce a intrat în build (§4, rândul 1). → punctul 5 parțial rezolvat.
3. **Rate GMC rămân neverificate** (per 77): nu există endpoint read-only;
   ar însemna cod nou pe producție cu OAuth Google. Alternativa: Adrian citește
   în Merchant Center → Produse → Diagnosticare, per cont.
