# feed-audit — PR-1 (C1+C2) + PR-2 (C3) + PR-3 (C5) din SPEC MVP „Audit Feed Public"

Cod Lambda (Node.js 20, CommonJS, **zero dependențe externe** — doar builtin-uri:
`http/https`, `zlib`, `stream`, `dns`, `url`, `node:test`). Nu intră în bundle-ul
vite; se va deploya ca Lambda + Function URL (decizia §8.6 din spec).

## Module

| Fișier | Rol |
|---|---|
| `validate-url.js` | Validare SSRF: doar http/https, porturi 80/443, fără userinfo; respinge IP-uri literale private (10/8, 172.16/12, 192.168/16, 127/8, 169.254/16 incl. 169.254.169.254, 0.0.0.0/8, 100.64/10, 192.0.0/24 + IPv6 ::1, fc00::/7, fe80::/10, ::ffff:x.x.x.x mapped); pentru nume DNS verifică **fiecare** adresă rezolvată (`dns.lookup {all:true}`). Returnează `URL` normalizat sau aruncă `HttpError(400)`. |
| `fetch-feed.js` | Fetcher streaming: redirect `manual` max 5 hop-uri cu **re-validare SSRF la fiecare hop** (capcana `/img-proxy`), timeout 15s connect / 120s total, cap 200MB (→ `truncated:true`, nu eroare), sniff gzip din magic bytes `1f 8b` + decomprimare streaming, allow-list content-type (xml/rss/atom/csv/tsv/text/plain/octet-stream/gzip; altceva → 400). Exportează `{ stream, contentType, finalUrl, truncated }`. |
| `parse-feed.js` | Parser streaming multi-format: detectare encoding (BOM utf-8/utf-16le/utf-16be + sniff NUL-uri — capcana utf-16le+TSV), XML RSS/Atom prin tokenizer pe `<item>`/`<entry>` (prefix namespace acceptat, `<!DOCTYPE>` tăiat din prolog, doar entități built-in + `&#NN;` — fără XXE), CSV/TSV cu sniff delimiter (tab > ; > ,), header obligatoriu, cap 1MB/rând. Normalizare la forma internă `{ id, title, link, image, price, sale_price, availability, brand, gtin, mpn, description, category }` cu aliasuri (`g:*`, `url`/`product_url`, `ean`/`upc`→gtin etc.); `price` brut + `price_numeric` minimal (parseFloat pe primul număr). Cutoff 5000 iteme → `truncated:true` + destroy curat; rândurile invalide se numără în `stats.invalid_rows`, erorile de conținut devin `stats.error`, nu crash. |
| `index.js` | Handler Lambda minimal (zilele 1–2 din plan): `POST /api/feed-audit {url}` → validare → `202 {audit_id, status_url}`; job async în același warm container (Map module-level, TTL 72h ca să nu crească la infinit; persistența reală = ziua 4/C6). `GET ?audit_id=…` → `{status, result?}` cu `result = { sample_size, stats, specs: {google, meta, chatgpt}, top_fields_missing }` — C3 (PR-2) calculează scorurile spec în același job, imediat după parsing. Feed >5000 → `result.notice` „auditul gratuit acoperă un eșantion de 5000 produse". Testabil fără Lambda: `createHandler({ validateUrl, fetcher })`. Loghează doar domeniul, niciodată URL-ul complet. |
| `validators/engine.js` + `validators/rules-{google,meta,chatgpt}.json` | C3 — motor de validatoare spec 100% declarativ (lecția planului: motor generic, nu cod hardcodat per regulă). Tipuri de check: `required`, `format` (regex), `max_length`/`min_length`, `enum` (cu `aliases`: fără `alias_severity` = acceptat silențios; cu `alias_severity` = warning de mapping; cu `suggest` = error + sugestie de corectare), `gtin_checkdigit` (GS1, 8/12/13/14 cifre), `all_caps`, `promo_text`, `sale_price_logic` (0 e valoare reală invalidă, nu „lipsă" — lecția parsePrice), `duplicate_id` (feed-level, nu afectează scorul), `at_least_n_of` (2-din-3 brand+GTIN+MPN), `currency_code`, `contains_html`. Scor = % produse fără `error` (warning nu scade scorul); `problems` sortate după count desc, cu rânduri-exemplu (max `example_limit`, default 3); severitatea problemei = severitatea maximă întâlnită (alias warning vs valoare necunoscută error). Reguli validate structural la startup (fail fast). Fiecare rezultat include `disclaimer`: „Evaluare pe baza specurilor publice; nu este o certificare oficială Google/Meta/OpenAI." (§5). |
| `comparator.js` | C5 — comparatorul „peste piață" (moat-ul ganchoului): match GTIN-only prin interfață injectabilă (`lookupGtins: async (gtin[]) => Map<gtin, {price, merchant_count, title}>`), zero DB wiring în modul. GTIN-urile trebuie să aibă check-digit GS1 valid (reutilizează `validGtin` din engine). Preț propriu: `price_numeric`, fallback `sale_price_numeric`. Output: `{matched, competitors, above_market, below_market, median_delta_pct, examples_above, examples_below, hidden}` — dacă `matched < minMatches` (default 20) → `{hidden: true, matched}` (§7 risc 4: nu afișăm cifre pe zgomot). Fără `lookupGtins` → `{skipped: true}`. |
| `db-adapter.js` | C5 — adaptor subțire FIȚIER DE INTERFAȚĂ pentru wiring-ul Mongo de la deploy (PR-4): `createGoldenRecordsLookup({collection})` peste o colecție cu interfață Mongo-like. Colecția țintă: **`retail_product_offers`** (numele corect din spec — NU caty_*; golden records e motor de dedup, nu sursă). DOAR citiri indexate (index pe gtin), read-only, zero scrieri (contract fabrici). Nu se rulează fără DB. |
| `local.js` | (Opțional) server local peste handler: `node api/feed-audit/local.js` → `http://localhost:3001/api/feed-audit`. Atenție: validatorul real respinge 127.0.0.1 (privat). |

## Cum rulezi testele

```bash
node --test api/feed-audit/
```

Fixture-urile sunt stringuri mici generate în teste. **ALLOW_MOCK=false**: parserul
și fetcher-ul rulează pe logică reală; singurul test double (`test/helpers.js`)
permite loopback pe porturi efemere pentru mock servere HTTP locale — producția
(`validateSafeUrl`) respinge 127.0.0.1, iar toate redirecturile spre exterior trec
prin validatorul real (vezi testul „capcana /img-proxy").

## Decizii și limite cunoscute

- **`0.0.0.0/0` din brief e interpretat ca `0.0.0.0/8`.** Literal, `/0` ar bloca
  orice adresă IPv4 și tool-ul n-ar mai putea fetch-ui nimic; `/8` (= „this
  network", lista standard SSRF) păstrează intenția. Devieri similare: la fel ca
  orice listă statică, nu acoperă re-broadcast/rezolvări DNS care se schimbă
  între validare și conectare (mitigare ulterioară: pin IP la connect).
- XML-ul e parsat cu tokenizer pe blocuri `<item>`, nu cu SAX complet: taguri
  nested de aceeași formă în interiorul unui câmp pot trunchia acel câmp;
  acceptable pentru MVP (feedurile de produse au câmpuri plate).
- Encoding: utf-8 + utf-16le/BE. Fără sniffing exotic (latin-1 etc.) — conform
  planului comprimat, ziua 1.
- Surrogate pairs utf-16 tăiate exact la granița de chunk: tratate cu carry de
  octet, perechea intactă; un text care începe chiar pe o jumătate de pair e
  marginea acceptată.
- Joburile trăiesc în memoria containerului warm — un cold start pierde joburile
  în zbor. Persistența (72h, URL secret) vine în C6.
- Rate limită / anti-abuz (C7) NU e în acest PR — dar fără el endpointul nu se
  lansează (§0, §8.4).
- Decizii de clasificare C3 (documentate onest): `availability` non-standard la
  Google (ex. `in stock`, `available`, `pre_order`) = **warning** cu maparea
  recomandată, nu error — feedurile reale folosesc variantele astea masiv;
  la Meta variantele snake_case sunt acceptate silențios; la ChatGPT enum e
  strict (`pre_order` → error cu sugestia `preorder`, `unknown` respins);
  `sale_price=0` cu `price>0` = error la Google (valoare reală invalidă, nu
  „câmp lipsă"), warning la Meta; lipsa monedei la preț = warning Meta, error
  ChatGPT; `duplicate_id` e feed-level și nu afectează scorul per-produs.
- Decizii C5 (comparator): mediană de piață e calculată de adaptorul de date
  (`db-adapter.js` / query pe `retail_product_offers`), NU în comparator —
  comparatorul primește `price` ca preț de piață final; `matched` numără
  produsele cu GTIN găsit chiar dacă prețul propriu lipsește (delta doar când
  există preț de comparat); itemele cu `price` lipsă dar `sale_price` valid se
  compară la `sale_price`; comparatorul e defensiv în job — o eroare de lookup
  nu rupe auditul (rămâne `{skipped: true}`); la Lambda fără DB injectat
  secțiunea e `{skipped: true}` până la wiring-ul din PR-4.

## Rollback

Directorul `api/feed-audit/` e complet izolat: ștergerea lui nu atinge `src/`,
vite config sau orice alt cod. Ruta `/api/feed-audit` nu e înregistrată nicăieri
în SPA încă (vine cu C6).
