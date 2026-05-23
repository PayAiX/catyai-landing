import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GlobalHeader from '../../components/GlobalHeader';
import FooterV9 from '../../components/FooterV9';

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const C = {
  void: '#0A0A14',
  plasma: '#7B61FF',
  plasmaLow: 'rgba(123,97,255,0.12)',
  plasmaMid: 'rgba(123,97,255,0.30)',
  ghost: '#F0EFF4',
  amber: '#F59E0B',
  amberLow: 'rgba(245,158,11,0.18)',
};

/* ─── CSS injected once ─────────────────────────────────────────────────── */
const PAGE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Instrument+Serif:ital@1&family=Fira+Code:wght@400;500&display=swap');

.akl-page { background: ${C.void}; color: ${C.ghost}; font-family: 'Sora', system-ui, sans-serif; }

/* noise overlay */
.akl-noise {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  opacity: 0.05;
}

/* hero */
.akl-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 120px 24px 80px; }
.akl-hero-inner { max-width: 1120px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
@media (max-width: 900px) { .akl-hero-inner { grid-template-columns: 1fr; } }

.akl-eyebrow {
  font-family: 'Fira Code', monospace;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: ${C.plasma}; margin-bottom: 20px; display: block;
}
.akl-h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
  color: ${C.ghost}; margin: 0 0 4px;
}
.akl-sub {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.1; letter-spacing: -0.02em;
  color: ${C.plasma}; margin: 0 0 28px;
}
.akl-lede {
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.7; color: rgba(240,239,244,0.65);
  max-width: 480px; margin: 0;
}

/* SVG hero wires animation */
@keyframes pulsate {
  0%, 100% { opacity: 0.15; stroke-dashoffset: 0; }
  50%       { opacity: 1;    stroke-dashoffset: -24; }
}
@keyframes flowUp {
  from { stroke-dashoffset: 80; opacity: 0.2; }
  to   { stroke-dashoffset: 0;  opacity: 0.9; }
}
.wire-pulse {
  stroke-dasharray: 8 4;
  animation: flowUp 2.4s ease-in-out infinite;
}
.wire-pulse-2 { animation-delay: 0.6s; }
.wire-pulse-3 { animation-delay: 1.2s; }
.wire-pulse-4 { animation-delay: 1.8s; }

@keyframes nodePulse {
  0%, 100% { r: 3; opacity: 0.6; }
  50%       { r: 5; opacity: 1;   }
}
.node-anim { animation: nodePulse 2s ease-in-out infinite; }
.node-anim-2 { animation-delay: 0.7s; }
.node-anim-3 { animation-delay: 1.4s; }

@keyframes glowLabel {
  0%, 100% { filter: drop-shadow(0 0 4px ${C.plasma}); }
  50%       { filter: drop-shadow(0 0 12px ${C.plasma}); }
}
.akl-label { animation: glowLabel 3s ease-in-out infinite; }

/* FAQ */
.akl-faq { max-width: 780px; margin: 0 auto; padding: 120px 24px 80px; }
.akl-section-label {
  font-family: 'Fira Code', monospace;
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: ${C.plasma}; margin-bottom: 48px; display: block;
}
.akl-faq-item { border-top: 1px solid rgba(123,97,255,0.2); padding: 36px 0; opacity: 0; transform: translateY(24px); transition: opacity 0.5s, transform 0.5s; }
.akl-faq-item.visible { opacity: 1; transform: none; }
.akl-faq-q {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 700; color: ${C.ghost}; margin: 0 0 16px;
  letter-spacing: -0.01em;
}
.akl-faq-a {
  font-size: 1rem; line-height: 1.75; color: rgba(240,239,244,0.65);
  margin: 0;
}

/* Protocol cards */
.akl-protocol { padding: 80px 24px 160px; }
.akl-protocol-inner { max-width: 1120px; margin: 0 auto; }
.akl-protocol-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800; letter-spacing: -0.02em;
  text-align: center; color: ${C.ghost};
  margin: 0 0 80px;
}
.akl-cards-track { position: relative; }
.akl-card {
  background: rgba(123,97,255,0.06);
  border: 1px solid rgba(123,97,255,0.18);
  border-radius: 20px; padding: 48px;
  display: grid; grid-template-columns: 1fr 280px; gap: 40px;
  align-items: center; margin-bottom: 24px;
  will-change: transform;
  backdrop-filter: blur(0px);
}
@media (max-width: 768px) { .akl-card { grid-template-columns: 1fr; padding: 32px 24px; } }
.akl-card-num {
  font-family: 'Fira Code', monospace;
  font-size: 11px; letter-spacing: 0.15em;
  color: ${C.plasma}; margin: 0 0 16px; display: block;
}
.akl-card-title {
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 700; letter-spacing: -0.02em;
  color: ${C.ghost}; margin: 0 0 12px;
}
.akl-card-desc {
  font-size: 1rem; line-height: 1.7;
  color: rgba(240,239,244,0.6); margin: 0;
}
.akl-card-svg { display: flex; justify-content: center; align-items: center; }

/* CTA */
.akl-cta {
  text-align: center; padding: 120px 24px 160px;
  max-width: 720px; margin: 0 auto;
}
.akl-cta-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 800; letter-spacing: -0.02em;
  color: ${C.ghost}; margin: 0 0 48px;
}
.akl-btn-primary {
  display: inline-block; background: ${C.plasma}; color: #fff;
  font-family: 'Sora', sans-serif; font-weight: 700;
  font-size: 1rem; letter-spacing: -0.01em;
  padding: 18px 40px; border-radius: 12px;
  text-decoration: none; transition: opacity 0.2s, transform 0.2s;
}
.akl-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
.akl-btn-ghost {
  display: inline-block; color: rgba(240,239,244,0.5);
  font-family: 'Fira Code', monospace; font-size: 0.85rem;
  text-decoration: none; margin-top: 20px;
  border-bottom: 1px solid rgba(123,97,255,0.3);
  padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
}
.akl-btn-ghost:hover { color: ${C.ghost}; border-color: ${C.plasma}; }

/* SVG card animations */
@keyframes spinConcentric { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes scanLine { 0% { transform: translateY(-60px); opacity: 0.8; } 100% { transform: translateY(60px); opacity: 0; } }
@keyframes ekgDraw {
  0%   { stroke-dashoffset: 240; opacity: 0.4; }
  60%  { stroke-dashoffset: 0;   opacity: 1;   }
  100% { stroke-dashoffset: -240; opacity: 0;  }
}
.spin-1 { transform-origin: center; animation: spinConcentric 8s linear infinite; }
.spin-2 { transform-origin: center; animation: spinConcentric 5s linear infinite reverse; }
.spin-3 { transform-origin: center; animation: spinConcentric 12s linear infinite; }
.scan-line { animation: scanLine 2s ease-in-out infinite; }
.ekg-path { stroke-dasharray: 240; animation: ekgDraw 2.5s ease-in-out infinite; }
`;

/* ─── JSON-LD schemas ───────────────────────────────────────────────────── */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ce este CatyAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CatyAI este primul AI Commerce Layer GEO-ready din România — un protocol determinist care structurează, semnează criptografic și livrează adevărul afacerii tale către modelele de limbaj (LLM-uri) și agenții de shopping AI. Prin protocolul AKL (AI Knowledge Layer), fiecare răspuns despre produsele, prețurile sau politicile magazinului tău este verificabil cu o semnătură EdDSA Ed25519 — eliminând halucinațiile și construind încredere certificabilă.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum oprește CatyAI halucinațiile LLM-urilor în eCommerce?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AKL nu folosește generare probabilistică. Funcționează deterministă: ingestie → normalizare semantică → răspuns cu sursă. Fiecare fapt returnat are o referință tracabilă în catalogul indexat al magazinului. Dacă informația nu există în cunoașterea verificată, protocolul tace — nu inventează. Semnătura EdDSA garantează că răspunsul nu a fost alterat între sursă și agentul AI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce legătură este între CatyAI și GoMag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CatyAI este primul scut AI-native certificat GoMag. Prin integrarea nativă, catalogul GoMag este indexat automat în AKL — produse, variante, stoc, prețuri — și expus prin GEO Signature verificabilă. Orice agent de shopping (ChatGPT Shopping, Google AI Mode, Perplexity Commerce) care întreabă despre un magazin GoMag protejat de CatyAI primește răspunsuri semnate criptografic, nu halucinații.',
      },
    },
  ],
};

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Ce este CatyAI și cum funcționează AI Knowledge Layer (AKL)',
  description:
    'CatyAI este primul AI Commerce Layer GEO-ready din România. Protocolul determinist AKL elimină halucinațiile LLM în eCommerce prin normalizare semantică și semnătură Ed25519.',
  image: 'https://catyai.io/og-akl-knowledge.png',
  datePublished: '2026-05-23T00:00:00Z',
  dateModified: '2026-05-23T00:00:00Z',
  author: {
    '@type': 'Person',
    name: 'Ioan Adrian Vitan',
    jobTitle: 'Founder',
    affiliation: { '@type': 'Organization', name: 'PayAi-X FZE' },
    sameAs: ['https://www.linkedin.com/in/adrian-vitan-lopes-35525a13/'],
  },
  publisher: {
    '@type': 'Organization',
    name: 'PayAi-X FZE',
    logo: { '@type': 'ImageObject', url: 'https://catyai.io/logo.png' },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://catyai.io/research/ce-este-catyai-akl',
  },
  inLanguage: 'ro',
  isAccessibleForFree: true,
};

/* ─── Hero SVG ──────────────────────────────────────────────────────────── */
function HeroSVG() {
  return (
    <svg
      viewBox="0 0 520 420"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 520, borderRadius: 16, overflow: 'hidden' }}
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="520" height="420" fill={C.void} />

      {/* ── Top half — structured grid layer ── */}
      {/* Grid lines horizontal */}
      {[40, 60, 80, 100, 120, 140, 160, 180, 200].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} stroke={C.plasma} strokeWidth="0.4" opacity="0.18" />
      ))}
      {/* Grid lines vertical */}
      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="210" stroke={C.plasma} strokeWidth="0.4" opacity="0.18" />
      ))}

      {/* Nodes */}
      <circle className="node-anim" cx="120" cy="80" r="3" fill={C.plasma} />
      <circle className="node-anim node-anim-2" cx="260" cy="50" r="3" fill={C.plasma} />
      <circle className="node-anim node-anim-3" cx="400" cy="100" r="3" fill={C.plasma} />
      <circle cx="180" cy="140" r="2.5" fill={C.plasma} opacity="0.5" />
      <circle cx="340" cy="120" r="2.5" fill={C.plasma} opacity="0.5" />
      <circle cx="80" cy="160" r="2" fill={C.plasma} opacity="0.4" />
      <circle cx="460" cy="70" r="2" fill={C.plasma} opacity="0.4" />

      {/* Connection lines top */}
      <line x1="120" y1="80" x2="260" y2="50" stroke={C.plasma} strokeWidth="0.8" opacity="0.35" />
      <line x1="260" y1="50" x2="400" y2="100" stroke={C.plasma} strokeWidth="0.8" opacity="0.35" />
      <line x1="120" y1="80" x2="180" y2="140" stroke={C.plasma} strokeWidth="0.6" opacity="0.25" />
      <line x1="400" y1="100" x2="340" y2="120" stroke={C.plasma} strokeWidth="0.6" opacity="0.25" />

      {/* AKL label */}
      <text
        className="akl-label"
        x="260"
        y="24"
        textAnchor="middle"
        fontFamily="'Fira Code', monospace"
        fontSize="10"
        fill={C.plasma}
        letterSpacing="3"
      >
        AKL — AI KNOWLEDGE LAYER
      </text>

      {/* Divider glow band */}
      <rect x="0" y="200" width="520" height="12" fill="url(#dividerGrad)" opacity="0.7" />
      <defs>
        <linearGradient id="dividerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.plasma} stopOpacity="0.6" />
          <stop offset="100%" stopColor={C.plasma} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wireGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={C.amber} stopOpacity="0.8" />
          <stop offset="100%" stopColor={C.plasma} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* ── Bottom half — chaotic ecommerce ── */}
      {/* Background amber tint */}
      <rect x="0" y="212" width="520" height="208" fill="rgba(245,158,11,0.04)" />

      {/* Chaotic product cards */}
      <g transform="translate(30, 230) rotate(-4)">
        <rect width="110" height="72" rx="6" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.25)" strokeWidth="1" />
        <rect x="8" y="10" width="60" height="8" rx="2" fill="rgba(245,158,11,0.35)" />
        <rect x="8" y="24" width="40" height="6" rx="2" fill="rgba(245,158,11,0.2)" />
        <text x="8" y="55" fontFamily="monospace" fontSize="11" fill="rgba(245,158,11,0.8)">€129.99</text>
      </g>
      <g transform="translate(140, 245) rotate(3)">
        <rect width="120" height="68" rx="6" fill="rgba(245,158,11,0.09)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
        <rect x="8" y="10" width="80" height="7" rx="2" fill="rgba(245,158,11,0.25)" />
        <rect x="8" y="23" width="50" height="5" rx="2" fill="rgba(245,158,11,0.15)" />
        <text x="8" y="52" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.6)">Pret: ???</text>
      </g>
      <g transform="translate(280, 225) rotate(-2)">
        <rect width="100" height="76" rx="6" fill="rgba(245,158,11,0.11)" stroke="rgba(245,158,11,0.22)" strokeWidth="1" />
        <rect x="8" y="10" width="55" height="8" rx="2" fill="rgba(245,158,11,0.3)" />
        <text x="8" y="50" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.5)">Stoc: N/A</text>
        <text x="8" y="64" fontFamily="monospace" fontSize="10" fill="rgba(245,158,11,0.7)">€89</text>
      </g>
      <g transform="translate(390, 240) rotate(5)">
        <rect width="95" height="65" rx="6" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.18)" strokeWidth="1" />
        <rect x="8" y="10" width="70" height="6" rx="2" fill="rgba(245,158,11,0.2)" />
        <text x="8" y="48" fontFamily="monospace" fontSize="9" fill="rgba(245,158,11,0.55)">Varianta?</text>
      </g>
      {/* scattered text */}
      <text x="50" y="330" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.3)" transform="rotate(-2, 50, 330)">livrare 3-5 zile</text>
      <text x="200" y="360" fontFamily="monospace" fontSize="7" fill="rgba(245,158,11,0.25)" transform="rotate(3, 200, 360)">garantie 12 luni</text>
      <text x="340" y="345" fontFamily="monospace" fontSize="8" fill="rgba(245,158,11,0.3)" transform="rotate(-1, 340, 345)">REDUCERE 20%</text>
      <text x="100" y="390" fontFamily="monospace" fontSize="7" fill="rgba(245,158,11,0.2)">culoare: rosu/negru</text>
      <text x="310" y="395" fontFamily="monospace" fontSize="7" fill="rgba(245,158,11,0.2)">model 2024</text>

      {/* ── Luminous wires connecting chaos → layer ── */}
      {/* Wire 1 */}
      <line
        className="wire-pulse"
        x1="85" y1="212" x2="120" y2="80"
        stroke="url(#wireGrad)" strokeWidth="1.2"
        strokeDasharray="8 4"
      />
      {/* Wire 2 */}
      <line
        className="wire-pulse wire-pulse-2"
        x1="200" y1="212" x2="260" y2="50"
        stroke="url(#wireGrad)" strokeWidth="1.2"
        strokeDasharray="8 4"
      />
      {/* Wire 3 */}
      <line
        className="wire-pulse wire-pulse-3"
        x1="330" y1="212" x2="340" y2="120"
        stroke="url(#wireGrad)" strokeWidth="1.2"
        strokeDasharray="8 4"
      />
      {/* Wire 4 */}
      <line
        className="wire-pulse wire-pulse-4"
        x1="435" y1="212" x2="400" y2="100"
        stroke="url(#wireGrad)" strokeWidth="1.2"
        strokeDasharray="8 4"
      />

      {/* Small arrow tips at top of wires */}
      {[[120, 80], [260, 50], [340, 120], [400, 100]].map(([x, y], i) => (
        <polygon
          key={i}
          points={`${x},${y - 6} ${x - 3},${y + 2} ${x + 3},${y + 2}`}
          fill={C.plasma}
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

/* ─── Protocol SVG animations ───────────────────────────────────────────── */
function SVGConcentric() {
  return (
    <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
      <circle cx="70" cy="70" r="64" fill="none" stroke={C.plasmaMid} strokeWidth="0.5" />
      <g className="spin-1">
        <circle cx="70" cy="70" r="50" fill="none" stroke={C.plasma} strokeWidth="1" strokeDasharray="8 4" opacity="0.5" />
        <circle cx="70" cy="6" r="3" fill={C.plasma} />
      </g>
      <g className="spin-2">
        <circle cx="70" cy="70" r="36" fill="none" stroke={C.plasma} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
        <circle cx="70" cy="34" r="3.5" fill={C.plasma} opacity="0.8" />
      </g>
      <g className="spin-3">
        <circle cx="70" cy="70" r="20" fill="none" stroke={C.plasma} strokeWidth="2" opacity="0.7" />
        <circle cx="70" cy="50" r="2.5" fill={C.ghost} />
      </g>
      <circle cx="70" cy="70" r="6" fill={C.plasma} opacity="0.9" />
    </svg>
  );
}

function SVGScanGrid() {
  const dots = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 7; c++) {
      dots.push({ x: 14 + c * 18, y: 24 + r * 18, key: `${r}-${c}` });
    }
  }
  return (
    <svg viewBox="0 0 140 120" width="140" height="120" aria-hidden="true" style={{ overflow: 'hidden' }}>
      {dots.map((d) => (
        <circle key={d.key} cx={d.x} cy={d.y} r="2" fill={C.plasma} opacity="0.25" />
      ))}
      {/* scan line */}
      <g className="scan-line">
        <line x1="0" y1="60" x2="140" y2="60" stroke={C.plasma} strokeWidth="2" opacity="0.85" />
        <rect x="0" y="54" width="140" height="12" fill={C.plasma} opacity="0.08" />
      </g>
    </svg>
  );
}

function SVGEkg() {
  const path =
    'M 0 60 L 20 60 L 30 60 L 35 20 L 45 100 L 55 60 L 80 60 L 90 40 L 100 80 L 110 60 L 140 60';
  return (
    <svg viewBox="0 0 140 120" width="140" height="120" aria-hidden="true">
      <path
        className="ekg-path"
        d={path}
        fill="none"
        stroke={C.plasma}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={path} fill="none" stroke={C.plasma} strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

/* ─── Protocol cards data ───────────────────────────────────────────────── */
const CARDS = [
  {
    num: '01 / INGESTIE',
    title: 'Ingestie Structurată',
    desc: 'Catalogul tău vectorizat în timp real. Produse, variante, prețuri, stoc — izolat per magazin în propriul namespace Qdrant. Zero cross-contamination.',
    svg: <SVGConcentric />,
  },
  {
    num: '02 / NORMALIZARE',
    title: 'Normalizare Semantică',
    desc: 'Sinonimele unificate, ambiguitățile eliminate. "Roșu", "red", "vișiniu" devin același vector. Agentul AI primește un răspuns consistent, indiferent de cum a întrebat.',
    svg: <SVGScanGrid />,
  },
  {
    num: '03 / RĂSPUNS',
    title: 'Răspuns Determinist',
    desc: 'Semnătură EdDSA verificabilă sau tace. Nicio generare probabilistică — fiecare fapt are sursă tracabilă. Dacă informația nu există în KB, protocolul nu inventează.',
    svg: <SVGEkg />,
  },
];

/* ─── FAQ data ──────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Ce este CatyAI?',
    a: 'CatyAI este primul AI Commerce Layer GEO-ready din România — un protocol determinist care structurează, semnează criptografic și livrează adevărul afacerii tale către modelele de limbaj (LLM-uri) și agenții de shopping AI. Prin protocolul AKL (AI Knowledge Layer), fiecare răspuns despre produsele, prețurile sau politicile magazinului tău este verificabil cu o semnătură EdDSA Ed25519 — eliminând halucinațiile și construind încredere certificabilă.',
  },
  {
    q: 'Cum oprește CatyAI halucinațiile LLM-urilor în eCommerce?',
    a: 'AKL nu folosește generare probabilistică. Funcționează determinist: ingestie → normalizare semantică → răspuns cu sursă. Fiecare fapt returnat are o referință tracabilă în catalogul indexat al magazinului. Dacă informația nu există în cunoașterea verificată, protocolul tace — nu inventează. Semnătura EdDSA garantează că răspunsul nu a fost alterat între sursă și agentul AI.',
  },
  {
    q: 'Ce legătură este între CatyAI și GoMag?',
    a: 'CatyAI este primul scut AI-native certificat GoMag. Prin integrarea nativă, catalogul GoMag este indexat automat în AKL — produse, variante, stoc, prețuri — și expus prin GEO Signature verificabilă. Orice agent de shopping (ChatGPT Shopping, Google AI Mode, Perplexity Commerce) care întreabă despre un magazin GoMag protejat de CatyAI primește răspunsuri semnate criptografic, nu halucinații.',
  },
];

/* ─── Main component ────────────────────────────────────────────────────── */
export default function CeEsteCatyaiAkl() {
  const heroTextRef = useRef(null);
  const faqRefs = useRef([]);
  const cardsRef = useRef(null);
  const [faqVisible, setFaqVisible] = useState([false, false, false]);

  /* GSAP hero + protocol animations */
  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* Hero stagger fade-up */
        const heroEls = heroTextRef.current?.querySelectorAll('[data-hero]');
        if (heroEls?.length) {
          gsap.fromTo(
            heroEls,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.2,
            }
          );
        }

        /* Protocol cards pin + scale/blur stacking */
        const cards = cardsRef.current?.querySelectorAll('.akl-card');
        if (cards?.length) {
          cards.forEach((card, i) => {
            if (i < cards.length - 1) {
              ScrollTrigger.create({
                trigger: card,
                start: 'top 15%',
                end: `+=${cards[i + 1]?.offsetHeight ?? 400}`,
                pin: true,
                pinSpacing: false,
                onUpdate: (self) => {
                  const progress = self.progress;
                  gsap.set(card, {
                    scale: 1 - progress * 0.06,
                    filter: `blur(${progress * 8}px)`,
                    opacity: 1 - progress * 0.4,
                  });
                },
              });
            }
          });
        }
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  /* FAQ IntersectionObserver fade-in */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.faqIdx, 10);
            setFaqVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    faqRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <html lang="ro" />
        <title>Ce este CatyAI și cum funcționează AI Knowledge Layer (AKL)</title>
        <meta
          name="description"
          content="CatyAI este primul AI Commerce Layer GEO-ready din România. Protocolul determinist AKL elimină halucinațiile LLM în eCommerce prin normalizare semantică și semnătură Ed25519."
        />
        <link rel="canonical" href="https://catyai.io/research/ce-este-catyai-akl" />
        <meta property="og:title" content="Ce este CatyAI și cum funcționează AI Knowledge Layer (AKL)" />
        <meta
          property="og:description"
          content="Primul protocol GEO-ready din România — adevărul structurat al afacerii tale, semnat criptografic cu Ed25519."
        />
        <meta property="og:url" content="https://catyai.io/research/ce-este-catyai-akl" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
        <style>{PAGE_CSS}</style>
      </Helmet>

      {/* Noise overlay */}
      <svg
        className="akl-noise"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      <div className="akl-page" style={{ position: 'relative', zIndex: 1 }}>
        <GlobalHeader />

        {/* ── HERO ── */}
        <section className="akl-hero">
          <div className="akl-hero-inner">
            <div ref={heroTextRef}>
              <span className="akl-eyebrow" data-hero>
                Research / AKL Protocol — 2026
              </span>
              <h1 className="akl-h1" data-hero>
                Knowledge Layer
              </h1>
              <p className="akl-sub" data-hero>
                beyond hallucination.
              </p>
              <p className="akl-lede" data-hero>
                Primul protocol GEO-ready din România —{' '}
                <span style={{ color: C.ghost }}>adevărul structurat al afacerii tale</span>, semnat
                criptografic.
              </p>
            </div>
            <div data-hero style={{ opacity: 0 }} ref={(el) => { if (el) el.style.opacity = '1'; }}>
              <HeroSVG />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="akl-faq">
          <span className="akl-section-label">FAQ — Întrebări frecvente</span>
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`akl-faq-item${faqVisible[i] ? ' visible' : ''}`}
              ref={(el) => { faqRefs.current[i] = el; }}
              data-faq-idx={i}
            >
              <h2 className="akl-faq-q">{item.q}</h2>
              <p className="akl-faq-a">{item.a}</p>
            </div>
          ))}
        </section>

        {/* ── PROTOCOL CARDS ── */}
        <section className="akl-protocol">
          <div className="akl-protocol-inner">
            <h2 className="akl-protocol-title">
              Trei pași.{' '}
              <span style={{ color: C.plasma }}>Zero halucinații.</span>
            </h2>
            <div className="akl-cards-track" ref={cardsRef}>
              {CARDS.map((card, i) => (
                <div className="akl-card" key={i}>
                  <div>
                    <span className="akl-card-num" style={{ fontFamily: "'Fira Code', monospace" }}>
                      {card.num}
                    </span>
                    <h3 className="akl-card-title">{card.title}</h3>
                    <p className="akl-card-desc">{card.desc}</p>
                  </div>
                  <div className="akl-card-svg">{card.svg}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div className="akl-cta">
            <span
              className="akl-section-label"
              style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}
            >
              Shopping Agents · GEO · AKL Protocol
            </span>
            <h2 className="akl-cta-title">
              Magazinul tău este pregătit pentru{' '}
              <span style={{ color: C.plasma }}>shopping agents?</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <a href="https://app.catyai.io" className="akl-btn-primary">
                Testează gratuit 14 zile
              </a>
              <a href="https://docs.catyai.io" className="akl-btn-ghost">
                Citește documentația tehnică →
              </a>
            </div>
          </div>
        </section>

        <FooterV9 />
      </div>
    </>
  );
}
