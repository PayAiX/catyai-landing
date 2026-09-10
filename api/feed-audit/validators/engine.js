'use strict';

// C3 — motor de validatoare spec, 100% declarativ: regulile sunt JSON
// (validators/rules-*.json), motorul (engine.js) e generic și nu cunoaște
// niciun spec. Lecția planului comprimat (§3): motorul de reguli trebuie
// gândit generic din prima, altfel 3 specuri în 3 zile nu ies.
//
// Scor = % produse fără niciun `error` (warning-urile apar în problems, dar
// nu scad scorul). Regulile feed-level (duplicate_id) evaluează feed-ul o
// singură dată și NU afectează scorul per-produs.

const fs = require('fs');
const path = require('path');

const DISCLAIMER =
  'Evaluare pe baza specurilor publice; nu este o certificare oficială Google/Meta/OpenAI.';

const SPECS = ['google', 'meta', 'chatgpt'];

const SEVERITIES = new Set(['error', 'warning']);

// Tipuri de check suportate (cele din brief + at_least_n_of / currency_code /
// contains_html / alias+suggest în enum — necesare pentru diferențele dure
// ale celor 3 specuri, documentate în README).
const CHECK_TYPES = new Set([
  'required',
  'format',
  'max_length',
  'min_length',
  'enum',
  'gtin_checkdigit',
  'all_caps',
  'promo_text',
  'sale_price_logic',
  'duplicate_id',
  'at_least_n_of',
  'currency_code',
  'contains_html',
]);

const FIELD_TYPES = new Set([
  'required',
  'format',
  'max_length',
  'min_length',
  'enum',
  'gtin_checkdigit',
  'all_caps',
  'promo_text',
  'currency_code',
  'contains_html',
]);

// ---------------------------------------------------------------------------
// Validare structurală la startup — un ruleset stricat trebuie să oprească
// deploy-ul (fail fast), nu să dea scoruri greșite la runtime.
function validateRuleset(rules, specName = '(anonim)') {
  const prefix = `Ruleset ${specName}`;
  if (!Array.isArray(rules)) throw new Error(`${prefix}: nu e un array de reguli`);
  const ids = new Set();
  for (const rule of rules) {
    if (!rule || typeof rule !== 'object') throw new Error(`${prefix}: regulă invalidă (nu e obiect)`);
    if (typeof rule.id !== 'string' || !rule.id) throw new Error(`${prefix}: regulă fără id`);
    if (ids.has(rule.id)) throw new Error(`${prefix}: id duplicat "${rule.id}"`);
    ids.add(rule.id);
    if (typeof rule.title !== 'string' || !rule.title) throw new Error(`${prefix}: ${rule.id} fără title`);
    if (!SEVERITIES.has(rule.severity)) throw new Error(`${prefix}: ${rule.id} severity invalid "${rule.severity}"`);
    const check = rule.check;
    if (!check || typeof check !== 'object' || !CHECK_TYPES.has(check.type)) {
      throw new Error(`${prefix}: ${rule.id} check.type invalid "${check && check.type}"`);
    }
    if (FIELD_TYPES.has(check.type) && (typeof check.field !== 'string' || !check.field)) {
      throw new Error(`${prefix}: ${rule.id} check.field lipsește`);
    }
    if (check.type === 'format') {
      if (typeof check.pattern !== 'string') throw new Error(`${prefix}: ${rule.id} format fără pattern`);
      try {
        new RegExp(check.pattern);
      } catch {
        throw new Error(`${prefix}: ${rule.id} pattern regex invalid`);
      }
    }
    if ((check.type === 'max_length' || check.type === 'min_length') && !Number.isInteger(check.value)) {
      throw new Error(`${prefix}: ${rule.id} ${check.type} fără value întreg`);
    }
    if (check.type === 'enum') {
      if (!Array.isArray(check.values) || check.values.length === 0) {
        throw new Error(`${prefix}: ${rule.id} enum fără values`);
      }
      if (check.alias_severity !== undefined && !SEVERITIES.has(check.alias_severity)) {
        throw new Error(`${prefix}: ${rule.id} alias_severity invalid`);
      }
    }
    if (check.type === 'at_least_n_of') {
      if (!Array.isArray(check.fields) || check.fields.length === 0 || !Number.isInteger(check.n)) {
        throw new Error(`${prefix}: ${rule.id} at_least_n_of fields/n invalide`);
      }
    }
    if (check.type === 'sale_price_logic') {
      if (typeof check.price_field !== 'string' || typeof check.sale_field !== 'string') {
        throw new Error(`${prefix}: ${rule.id} sale_price_logic fără price_field/sale_field`);
      }
    }
    if (rule.example_limit !== undefined && (!Number.isInteger(rule.example_limit) || rule.example_limit < 1)) {
      throw new Error(`${prefix}: ${rule.id} example_limit invalid`);
    }
  }
  return true;
}

// Încarcă și validează cele 3 ruleseturi dintr-un director.
function loadRules(rulesDir) {
  const map = {};
  for (const spec of SPECS) {
    const file = path.join(rulesDir, `rules-${spec}.json`);
    let rules;
    try {
      rules = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      throw new Error(`Nu pot încărca regulile ${spec} din ${file}: ${err.message}`);
    }
    validateRuleset(rules, spec);
    map[spec] = rules;
  }
  return map;
}

// ---------------------------------------------------------------------------
// Evaluare per item. Returnează { v: boolean, severity?, detail? } —
// severity poate coborî (enum alias → warning) niciodată să urce peste severity-ul regulii.

function isEmpty(v) {
  return v === undefined || v === null || String(v).trim() === '';
}

// GS1 check-digit pentru GTIN-8/12/13/14.
function validGtin(raw) {
  const gtin = String(raw).replace(/\s+/g, '');
  if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(gtin)) return { ok: false, reason: 'format' };
  const digits = gtin.split('').map(Number);
  const check = digits.pop();
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += digits[i] * ((digits.length - i) % 2 === 1 ? 3 : 1);
  }
  return { ok: (10 - (sum % 10)) % 10 === check, reason: 'checkdigit' };
}

function isAllCaps(s) {
  const letters = String(s).replace(/[^a-zA-ZĂÂÎȘȚăâîșț]/g, '');
  return letters.length >= 5 && letters === letters.toUpperCase();
}

function evalCheck(check, item) {
  switch (check.type) {
    case 'required':
      return { v: isEmpty(item[check.field]) };

    case 'format': {
      const v = item[check.field];
      if (v === undefined || v === null || v === '') return { v: false };
      return { v: !new RegExp(check.pattern).test(String(v)) };
    }

    case 'max_length': {
      const v = item[check.field];
      if (isEmpty(v)) return { v: false };
      return { v: String(v).length > check.value };
    }

    case 'min_length': {
      const v = item[check.field];
      if (isEmpty(v)) return { v: false };
      return { v: String(v).length < check.value };
    }

    case 'enum': {
      const raw = item[check.field];
      if (isEmpty(raw)) return { v: false }; // lipsa e treaba regulii required
      const val = String(raw).trim().toLowerCase();
      if (check.values.includes(val)) return { v: false };
      if (check.aliases && Object.prototype.hasOwnProperty.call(check.aliases, val)) {
        // alias cunoscut: fără alias_severity → acceptat silențios;
        // cu alias_severity → violation cu severitatea dată (mapping recomandat)
        if (!check.alias_severity) return { v: false };
        return {
          v: true,
          severity: check.alias_severity,
          detail: `valoare non-standard "${raw}" → standard: "${check.aliases[val]}"`,
        };
      }
      if (check.suggest && Object.prototype.hasOwnProperty.call(check.suggest, val)) {
        return { v: true, detail: `valoare invalidă "${raw}" → folosește "${check.suggest[val]}"` };
      }
      return { v: true, detail: `valoare "${raw}" în afara enum-ului` };
    }

    case 'gtin_checkdigit': {
      const raw = item[check.field];
      if (isEmpty(raw)) return { v: false };
      const r = validGtin(raw);
      if (r.ok) return { v: false };
      return {
        v: true,
        detail: r.reason === 'format' ? `GTIN "${raw}" nu are 8/12/13/14 cifre` : `GTIN "${raw}" are cifra de control invalidă`,
      };
    }

    case 'all_caps':
      return { v: !isEmpty(item[check.field]) && isAllCaps(item[check.field]) };

    case 'promo_text': {
      const v = item[check.field];
      if (isEmpty(v)) return { v: false };
      return { v: new RegExp(check.pattern, 'i').test(String(v)) };
    }

    case 'sale_price_logic': {
      const saleRaw = item[check.sale_field];
      if (isEmpty(saleRaw)) return { v: false }; // nu e obligatoriu
      const price = Number(item[`${check.price_field}_numeric`] ?? NaN);
      const sale = Number(item[`${check.sale_field}_numeric`] ?? NaN);
      // lecția parsePrice: 0 e valoare reală invalidă, NU "câmp lipsă"
      if (!Number.isFinite(price) || price <= 0) return { v: true, detail: `price invalid (${item[check.price_field]}) pentru sale_price=${saleRaw}` };
      if (!Number.isFinite(sale) || sale <= 0) return { v: true, detail: `sale_price=${saleRaw} nu e > 0` };
      if (sale >= price) return { v: true, detail: `sale_price=${sale} ≥ price=${price}` };
      return { v: false };
    }

    case 'at_least_n_of': {
      const present = check.fields.filter((f) => !isEmpty(item[f]));
      if (present.length >= check.n) return { v: false };
      return {
        v: true,
        detail: `prezenți doar ${present.length}/${check.fields.length}: ${present.join(', ') || 'niciunul'}`,
      };
    }

    case 'currency_code': {
      const raw = item[check.field];
      if (isEmpty(raw)) return { v: false };
      const s = String(raw);
      const hasCode = /(?:^|\s)[A-Z]{3}(?:\s|$)/.test(s) || /[€$£]/.test(s);
      return { v: !hasCode, detail: `preț "${s}" fără monedă (ex. 299 RON)` };
    }

    case 'contains_html': {
      const v = item[check.field];
      if (isEmpty(v)) return { v: false };
      return { v: /<[a-zA-Z][^>]*>/.test(String(v)) };
    }

    default:
      return { v: false };
  }
}

// duplicate_id — la nivel de feed, o singură evaluare.
function evalDuplicateId(check, items, exampleLimit) {
  const counts = new Map();
  for (const item of items) {
    const id = item[check.field];
    if (!isEmpty(id)) counts.set(String(id), (counts.get(String(id)) || 0) + 1);
  }
  const dups = [...counts.entries()].filter(([, c]) => c > 1);
  return {
    count: dups.length,
    examples: dups.slice(0, exampleLimit).map(([id, c]) => ({ id, count: c })),
  };
}

function truncate(s, n = 80) {
  const str = String(s);
  return str.length > n ? `${str.slice(0, n)}…` : str;
}

// ---------------------------------------------------------------------------
// Rulează un ruleset peste items[] → rezultatul per spec din brief.
function runSpec(spec, ruleset, items) {
  validateRuleset(ruleset, spec);
  const total = items.length;
  const errorFree = new Array(total).fill(true);
  const problems = [];

  for (const rule of ruleset) {
    const exampleLimit = rule.example_limit || 3;
    let count = 0;
    let maxSeverity = 'warning'; // 'error' > 'warning': severitatea efectivă a problemei
    const examples = [];

    if (rule.check.type === 'duplicate_id') {
      const r = evalDuplicateId(rule.check, items, exampleLimit);
      if (r.count > 0) {
        problems.push({ rule_id: rule.id, title: rule.title, severity: rule.severity, count: r.count, examples: r.examples });
      }
      continue;
    }

    items.forEach((item, i) => {
      const res = evalCheck(rule.check, item);
      if (!res.v) return;
      const severity = res.severity || rule.severity;
      count++;
      if (severity === 'error') {
        errorFree[i] = false;
        maxSeverity = 'error';
      }
      if (examples.length < exampleLimit) {
        const field = rule.check.field || null;
        examples.push({
          id: item.id != null ? String(item.id) : null,
          title: item.title != null ? truncate(item.title) : null,
          field,
          value: res.detail || (field && item[field] != null ? truncate(item[field]) : null),
        });
      }
    });

    if (count > 0) {
      problems.push({ rule_id: rule.id, title: rule.title, severity: maxSeverity, count, examples });
    }
  }

  const compliant = errorFree.filter(Boolean).length;
  const score = total === 0 ? 100 : Math.round((compliant / total) * 100);
  problems.sort((a, b) => b.count - a.count);

  return { spec, score, compliant, total, disclaimer: DISCLAIMER, problems };
}

// Rulează toate cele 3 specuri peste items[].
function runAll(items, rulesMap) {
  const out = {};
  for (const spec of SPECS) {
    out[spec] = runSpec(spec, rulesMap[spec], items);
  }
  return out;
}

module.exports = { loadRules, validateRuleset, runSpec, runAll, validGtin, DISCLAIMER, SPECS };
