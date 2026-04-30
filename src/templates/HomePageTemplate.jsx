import { useState, useRef } from 'react';
import PageLayout from '../components/layout/PageLayout';
import HeroBadge from '../components/sections/HeroBadge';
import MarqueeCrawlers from '../components/sections/MarqueeCrawlers';
import StackingCards from '../components/sections/StackingCards';
import StackCard from '../components/sections/StackCard';
import CardBase from '../components/ui/CardBase';
import StatusDot from '../components/ui/StatusDot';

/* ─── HERO ──────────────────────────────────────────── */
function HeroSection({ t }) {
  const [state, setState] = useState('idle'); // idle | loading | result
  const [domain, setDomain] = useState('');
  const inputRef = useRef(null);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setState('loading');
    setTimeout(() => setState('result'), 2200);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      {/* ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,161,101,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl w-full text-center">
        <HeroBadge label={t.hero.badge} />

        <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight text-slate-50 leading-[1.05]">
          {t.hero.h1[0]}{' '}
          <span className="text-gold">{t.hero.h1[1]}</span>
          {t.hero.h1[2] && <><br />{t.hero.h1[2]}</>}
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t.hero.sub}
        </p>

        {/* diagnostic form */}
        <form onSubmit={handleAudit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder={t.hero.placeholder}
            className="newsletter-input flex-1 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500"
          />
          <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold">
            {t.hero.cta}
          </button>
        </form>

        {/* loading bar */}
        {state === 'loading' && (
          <div className="mt-6 relative h-1 rounded-full overflow-hidden bg-navy-800 max-w-lg mx-auto">
            <div
              className="absolute top-0 h-full w-1/3 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #C8A165, transparent)',
                animation: 'ds-loading 1.2s ease-in-out infinite',
              }}
            />
          </div>
        )}

        {/* result card */}
        {state === 'result' && (
          <div className="mt-6 ds-card p-4 text-left max-w-lg mx-auto flex items-start gap-3">
            <StatusDot />
            <div>
              <p className="text-sm font-semibold text-gold">{t.hero.resultTitle}</p>
              <p className="text-xs text-slate-400 mt-0.5">{domain} — {t.hero.resultSub}</p>
            </div>
          </div>
        )}
      </div>

      {/* trust strip */}
      <div className="relative z-10 mt-16 flex items-center gap-3 text-xs text-slate-500">
        <StatusDot />
        <span>{t.hero.trust}</span>
      </div>
    </section>
  );
}

/* ─── PRODUCTS ──────────────────────────────────────── */
function ProductsSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.products.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.products.h2}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.products.items.map((item, i) => (
            <CardBase key={i} className="p-8 flex flex-col gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <div className="card-tag">{item.tag}</div>
                <h3 className="text-xl font-bold text-slate-50 mb-2">{item.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
              <a
                href={item.href}
                className="mt-auto inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors"
              >
                {item.cta} <span aria-hidden>→</span>
              </a>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ──────────────────────────────────── */
function HowItWorksSection({ t }) {
  const cards = t.howItWorks.cards;
  return (
    <StackingCards>
      {cards.map((card, i) => (
        <StackCard key={i} index={i}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="card-tag">{card.tag}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">{card.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{card.body}</p>
              <ul className="space-y-2">
                {card.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-gold mt-0.5">✦</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="code-block w-full">
                <pre>{card.snippet}</pre>
              </div>
            </div>
          </div>
        </StackCard>
      ))}
    </StackingCards>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────── */
function TestimonialsSection({ t }) {
  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-gold/60">{t.testimonials.tag}</p>
      </div>
      <div className="relative overflow-hidden">
        <MarqueeCrawlers items={t.testimonials.items} />
      </div>
    </section>
  );
}

/* ─── INDUSTRIES ────────────────────────────────────── */
function IndustriesSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.industries.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.industries.h2}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.industries.items.map((item, i) => (
            <CardBase key={i} className="p-6 flex flex-col items-center text-center gap-3">
              <span className="text-4xl">{item.icon}</span>
              <span className="text-sm font-medium text-slate-300">{item.label}</span>
            </CardBase>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ───────────────────────────────────────────── */
function FaqSection({ t }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-gold/60 mb-3">{t.faq.tag}</p>
          <h2 className="text-4xl font-bold text-slate-50">{t.faq.h2}</h2>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <details
              key={i}
              className="ds-card group"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none text-slate-200 font-medium text-sm">
                {item.q}
                <span className="text-gold transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─────────────────────────────────────── */
function FinalCtaSection({ t }) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="rounded-3xl p-12 border border-white/8"
          style={{ background: 'linear-gradient(180deg, rgba(10,27,61,0.7) 0%, rgba(1,10,31,0.95) 100%)' }}
        >
          <HeroBadge label={t.finalCta.badge} />
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-50 mt-4 mb-4">{t.finalCta.h2}</h2>
          <p className="text-slate-400 mb-8">{t.finalCta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={t.finalCta.primaryHref} className="btn-primary rounded-xl px-8 py-3 text-sm font-semibold inline-block">
              {t.finalCta.primary}
            </a>
            <a href={t.finalCta.secondaryHref} className="btn-secondary rounded-xl px-8 py-3 text-sm font-semibold inline-block">
              {t.finalCta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── DEFAULT DATA ──────────────────────────────────── */
const DEFAULT_T = {
  hero: {
    badge: 'CatyAI v3.0 · GEO Infrastructure live',
    h1: ['Site-ul tău este', 'invizibil pentru AI?'],
    sub: 'GPTBot, ClaudeBot și Perplexity nu rulează JavaScript. Verifică în 30 secunde dacă te pot citi sau dacă halucinează prețuri și servicii inventate.',
    placeholder: 'exemplu.ro',
    cta: 'Verifică acum',
    resultTitle: 'Audit complet',
    resultSub: 'Raport generat cu succes. 3 probleme detectate.',
    trust: '300+ companii folosesc CatyAI · ZF IT Generation 2025 · Gratuit, fără card',
  },
  marquee: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Gemini', 'Bingbot'],
  products: {
    tag: 'Produse',
    h2: 'Trei produse, o singură platformă AI',
    items: [
      { icon: '💬', tag: 'Widget Chat', name: 'AI Sales Agent', desc: 'Bot AI integrat în site cu 8 agenți specializați. Sales + Support + Scheduler în una.', href: '/widget', cta: 'Află mai mult' },
      { icon: '📱', tag: 'WhatsApp AI', name: 'Secretar WhatsApp', desc: 'AI nativ pe WhatsApp. Zero BSP cost. Răspuns < 3 secunde, programări + facturi auto.', href: '/whatsapp', cta: 'Află mai mult' },
      { icon: '🛡️', tag: 'FraudAI Shield', name: 'Protecție Anti-Fraudă', desc: '8 module anti-fraudă. Singura platformă completă din RO. Anti-phishing real-time.', href: '/fraud', cta: 'Află mai mult' },
    ],
  },
  howItWorks: {
    cards: [
      {
        tag: 'Layer 01 · Audit',
        title: 'Detectăm invizibilitatea AI',
        body: 'Scanăm site-ul tău și identificăm ce vede sau nu vede fiecare crawler AI major.',
        bullets: ['GPTBot, ClaudeBot, PerplexityBot', 'JavaScript rendering detection', 'Schema markup analysis'],
        snippet: '# /geo/v1/audit\nstatus: "invisible"\ncrawlers_blocked: 3',
      },
      {
        tag: 'Layer 02 · Fix',
        title: 'Implementăm protocolul NAP',
        body: 'Native AI Protocol transformă site-ul tău în sursă de adevăr canonică pentru LLM-uri.',
        bullets: ['llms.txt manifest', 'Ed25519 signatures', 'Semantic vectors'],
        snippet: '# /geo/v1/llms.txt\nprotocol: "NAP/1.0"\ntrust_score: 98',
      },
      {
        tag: 'Layer 03 · Monitor',
        title: 'Monitorizare continuă',
        body: 'Dashboard live cu toate mențiunile în AI și alertă când apar halucinații.',
        bullets: ['Real-time AI mentions', 'Hallucination alerts', 'Competitor comparison'],
        snippet: '# /geo/v1/monitor\nmentions_today: 47\nhallucinations: 0',
      },
    ],
  },
  testimonials: {
    tag: 'Ce spun clienții',
    items: [
      '"CatyAI ne-a transformat modul în care interacționăm cu clienții." — Mihai D.',
      '"Hemos reducido los tickets un 60%." — Laura M.',
      '"O chatbot atende clientes 24h." — Paulo S.',
      '"CatyAI a transformé notre service client." — Marie L.',
      '"Am redus 60% ticketele de suport." — Ionuț T.',
    ],
  },
  industries: {
    tag: 'Industrii',
    h2: 'Folosit în 14 verticale',
    items: [
      { icon: '🏥', label: 'Clinici Medicale' },
      { icon: '🍽️', label: 'Restaurante' },
      { icon: '🏠', label: 'Real Estate' },
      { icon: '💇', label: 'Saloane Beauty' },
      { icon: '🚗', label: 'Service Auto' },
      { icon: '📚', label: 'Educație' },
      { icon: '🛒', label: 'E-commerce' },
      { icon: '🏢', label: 'Servicii B2B' },
    ],
  },
  faq: {
    tag: 'Întrebări frecvente',
    h2: 'Tot ce vrei să știi',
    items: [
      { q: 'Cât durează setup-ul?', a: '2-5 minute. Conectezi WhatsApp Business sau adaugi widget-ul cu un script tag pe site.' },
      { q: 'Ce se întâmplă cu datele clienților mei?', a: 'GDPR-compliant. Datele sunt în AWS eu-west-1 (Irlanda), criptate at-rest cu AWS KMS.' },
      { q: 'Pot integra cu CRM-ul existent?', a: 'Da. Integrări native: HubSpot, Pipedrive, Salesforce, Zoho.' },
      { q: 'Există plan gratuit?', a: 'Da — 100 sesiuni/lună gratuit, fără card. Starter €49, Growth €99, Business €199.' },
    ],
  },
  finalCta: {
    badge: 'Începe gratuit · Setup 2 min',
    h2: 'Infrastructură AI pentru afacerea ta',
    sub: 'Începe gratuit. Setup în 2 minute. Fără card.',
    primary: 'Setup gratuit acum',
    primaryHref: 'https://app.catyai.io/signup',
    secondary: 'Vorbește cu echipa',
    secondaryHref: 'mailto:contact@catyai.io',
  },
};

/* ─── TEMPLATE ──────────────────────────────────────── */
export default function HomePageTemplate({ t, lang, onLangChange }) {
  const d = t ?? DEFAULT_T;
  return (
    <PageLayout lang={lang} onLangChange={onLangChange}>
      <HeroSection t={d} />
      <MarqueeCrawlers items={d.marquee} className="py-8 border-y border-white/5" />
      <ProductsSection t={d} />
      <HowItWorksSection t={d} />
      <TestimonialsSection t={d} />
      <IndustriesSection t={d} />
      <FaqSection t={d} />
      <FinalCtaSection t={d} />
    </PageLayout>
  );
}
