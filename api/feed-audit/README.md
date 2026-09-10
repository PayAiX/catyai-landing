# feed-audit — PR-1 (C1+C2) din SPEC MVP „Audit Feed Public"

Cod Lambda (Node.js 20, CommonJS, **zero dependențe externe** — doar builtin-uri:
`http/https`, `zlib`, `stream`, `dns`, `url`, `node:test`). Nu intră în bundle-ul
vite; se va deploya ca Lambda + Function URL (decizia §8.6 din spec).

## Module

| Fișier | Rol |
|---|---|
| `validate-url.js` | Validare SSRF: doar http/https, porturi 80/443, fără userinfo; respinge IP-uri literale private (10/8, 172.16/12, 192.168/16, 127/8, 169.254/16 incl. 169.254.169.254, 0.0.0.0/8, 100.64/10, 192.0.0/24 + IPv6 ::1, fc00::/7, fe80::/10, ::ffff:x.x.x.x mapped); pentru nume DNS verifică **fiecare** adresă rezolvată (`dns.lookup {all:true}`). Returnează `URL` normalizat sau aruncă `HttpError(400)`. |
| `fetch-feed.js` | Fetcher streaming: redirect `manual` max 5 hop-uri cu **re-validare SSRF la fiecare hop** (capcana `/img-proxy`), timeout 15s connect / 120s total, cap 200MB (→ `truncated:true`, nu eroare), sniff gzip din magic bytes `1f 8b` + decomprimare streaming, allow-list content-type (xml/rss/atom/csv/tsv/text/plain/octet-stream/gzip; altceva → 400). Exportează `{ stream, contentType, finalUrl, truncated }`. |
| `parse-feed.js` | Parser streaming multi-format: detectare encoding (BOM utf-8/utf-16le/utf-16be + sniff NUL-uri — capcana utf-16le+TSV), XML RSS/Atom prin tokenizer pe `<item>`/`<entry>` (prefix namespace acceptat, `<!DOCTYPE>` tăiat din prolog, doar entități built-in + `&#NN;` — fără XXE), CSV/TSV cu sniff delimiter (tab > ; > ,), header obligatoriu, cap 1MB/rând. Normalizare la forma internă `{ id, title, link, image, price, sale_price, availability, brand, gtin, mpn, description, category }` cu aliasuri (`g:*`, `url`/`product_url`, `ean`/`upc`→gtin etc.); `price` brut + `price_numeric` minimal (parseFloat pe primul număr). Cutoff 5000 iteme → `truncated:true` + destroy curat; rândurile invalide se numără în `stats.invalid_rows`, erorile de conținut devin `stats.error`, nu crash. |
| `index.js` | Handler Lambda minimal (ziua 1 din plan): `POST /api/feed-audit {url}` → validare → `202 {audit_id, status_url}`; job async în același warm container (Map module-level, TTL 72h ca să nu crească la infinit; persistența reală = ziua 4/C6). `GET ?audit_id=…` → `{status, result?}` cu `result = { sample_size, stats, top_fields_missing }` (scorurile C3 = PR-2, nu aici). Feed >5000 → `result.notice` „auditul gratuit acoperă un eșantion de 5000 produse". Testabil fără Lambda: `createHandler({ validateUrl, fetcher })`. Loghează doar domeniul, niciodată URL-ul complet. |
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
- Rata limită / anti-abuz (C7) și scorurile spec (C3) NU sunt în acest PR.

## Rollback

Directorul `api/feed-audit/` e complet izolat: ștergerea lui nu atinge `src/`,
vite config sau orice alt cod. Ruta `/api/feed-audit` nu e înregistrată nicăieri
în SPA încă (vine cu C6).
