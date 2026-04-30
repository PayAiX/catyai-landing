import { useState, Component } from 'react';
import HomePageTemplate from '../templates/HomePageTemplate';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="p-8 text-red-400 font-mono whitespace-pre-wrap">
          <h2 className="text-2xl mb-4">Template render error:</h2>
          <p>{String(this.state.error.message)}</p>
          <pre className="text-xs mt-4 opacity-70">{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
import ProductPageTemplate from '../templates/ProductPageTemplate';
import EnterpriseTemplate from '../templates/EnterpriseTemplate';
import StaticPageTemplate from '../templates/StaticPageTemplate';
import LegalPageTemplate from '../templates/LegalPageTemplate';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'product', label: 'Product' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'static', label: 'Static' },
  { id: 'legal', label: 'Legal' },
];

const SVG = {
  msg: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  msg2: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  net: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="6"/><rect x="16" y="16" width="6" height="6"/><rect x="2" y="16" width="6" height="6"/><path d="M5 16v-3h14v3M12 13V8"/></svg>,
  badge: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/><path d="m9 12 2 2 4-4"/></svg>,
};

export default function DsPreview() {
  const [active, setActive] = useState('home');

  let view = null;

  if (active === 'home') {
    view = <HomePageTemplate />;
  } else if (active === 'product') {
    view = (
      <ProductPageTemplate
        data={{
          hero: {
            badge: 'Widget Chat',
            title: 'Widget Chat AI pentru orice site',
            subtitle: 'Bot inteligent care răspunde clienților 24/7. 8 agenți specializați.',
            primaryCta: { label: 'Începe gratuit', href: 'https://app.catyai.io/signup' },
            secondaryCta: { label: 'Vezi demo', href: '#' },
          },
          features: [
            { icon: SVG.msg, title: 'Sales Agent', body: 'Convertește vizitatori în clienți.', bullets: ['Lead qualification', 'Pricing inteligent', 'Hand-off uman'] },
            { icon: SVG.shield, title: 'FraudAI Shield', body: 'Protejează utilizatorii de phishing.', bullets: ['Detecție URL malicios', 'Blocare auto', 'Alerte real-time'] },
            { icon: SVG.msg2, title: 'Multi-language', body: '14 limbi auto-detect.', bullets: ['RO/EN/ES/FR', 'Auto-translate', 'Persistent per session'] },
          ],
          useCases: [
            { kpi: '60%', title: 'Tickete reduse', body: 'AI răspunde la întrebările frecvente.' },
            { kpi: '3x', title: 'Conversii', body: 'Vizitatori activați 24/7.' },
            { kpi: '< 3s', title: 'Răspuns', body: 'Latență sub 3 secunde end-to-end.' },
          ],
          faqs: [
            { q: 'Cum integrez widget-ul?', a: 'Adaugi un singur script tag în head.' },
            { q: 'Funcționează pe mobile?', a: 'Da, responsive și optimizat pentru touch.' },
          ],
          cta: {
            title: 'Setează widget-ul în 2 minute',
            body: 'Gratuit pentru primele 100 sesiuni/lună.',
            button: { label: 'Începe acum', href: 'https://app.catyai.io/signup' },
          },
        }}
      />
    );
  } else if (active === 'enterprise') {
    view = (
      <EnterpriseTemplate
        data={{
          hero: {
            badge: 'GEO Gateway v3.6',
            title: 'Infrastructura neurală pentru AI internet',
            subtitle: 'Patru layere care fac site-ul tău canonical truth pentru ChatGPT, Claude, Perplexity.',
            primaryCta: { label: 'Talk to sales', href: 'mailto:enterprise@catyai.io' },
            secondaryCta: { label: 'Documentație', href: 'https://docs.catyai.io' },
          },
          layers: [
            {
              index: 0,
              tag: 'Layer 01 NAP',
              tagIcon: <SVG.net className="w-3 h-3" />,
              title: 'Native AI Protocol',
              body: 'Site-ul devine Neural Node — vectori semantici, schema markup, manifeste machine-readable.',
              code: <><span className="com"># /geo/v1/llms.txt</span>{'\n'}<span className="key">protocol</span>: <span className="str">"NAP/1.0"</span></>,
            },
            {
              index: 1,
              tag: 'Layer 02 Trust',
              tagIcon: <SVG.badge className="w-3 h-3" />,
              title: 'Ed25519 Truth Cert',
              body: 'Signature criptografic pe fiecare payload.',
              code: <><span className="key">X-NAP-Signature</span>: <span className="str">ed25519:...</span></>,
            },
          ],
          cta: {
            title: 'Vrei demo Enterprise?',
            body: 'White-label, SLA 99.95%, volume pricing.',
            button: { label: 'Contactează vânzări', href: 'mailto:enterprise@catyai.io' },
          },
        }}
      />
    );
  } else if (active === 'static') {
    view = (
      <StaticPageTemplate
        data={{
          hero: {
            eyebrow: 'Prețuri',
            title: 'Simple și transparente',
            subtitle: 'Plan gratuit + 3 tier-uri plătite.',
          },
        }}
      >
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="ds-card p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Free</h3>
            <div className="text-4xl font-extrabold text-white mb-4">€0</div>
            <p className="text-slate-400 text-sm">100 sesiuni/lună</p>
          </div>
          <div className="ds-card p-8 text-center" style={{ borderColor: 'rgba(200,161,101,0.3)' }}>
            <h3 className="font-bold text-xl mb-2" style={{ color: '#C8A165' }}>Starter</h3>
            <div className="text-4xl font-extrabold text-white mb-4">€49<span className="text-lg text-slate-400">/lună</span></div>
            <p className="text-slate-400 text-sm">5,000 sesiuni</p>
          </div>
          <div className="ds-card p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Growth</h3>
            <div className="text-4xl font-extrabold text-white mb-4">€99<span className="text-lg text-slate-400">/lună</span></div>
            <p className="text-slate-400 text-sm">25,000 sesiuni</p>
          </div>
        </div>
      </StaticPageTemplate>
    );
  } else if (active === 'legal') {
    view = (
      <LegalPageTemplate data={{ title: 'Privacy Policy', lastUpdated: '2026-04-15' }}>
        <h2>1. Date colectate</h2>
        <p>CatyAI colectează doar datele necesare. Toate datele sunt criptate at-rest cu AWS KMS.</p>
        <h2>2. Stocare</h2>
        <p>Datele sunt stocate în AWS eu-west-1 (Irlanda).</p>
      </LegalPageTemplate>
    );
  }

  return (
    <div className="bg-navy min-h-screen">
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[60] backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 flex gap-1 shadow-2xl"
        style={{ top: '5rem', background: 'rgba(2, 15, 42, 0.9)' }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full transition-colors"
            style={
              active === t.id
                ? { background: '#C8A165', color: '#010A1F' }
                : { color: '#94a3b8', background: 'transparent' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      <ErrorBoundary key={active}>{view}</ErrorBoundary>
    </div>
  );
}
