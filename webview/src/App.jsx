import { useState, useEffect } from 'react';
import { isExpired } from './utils/jwt.js';
import { D } from './utils/design.js';
import PaymentView from './components/PaymentView.jsx';
import BookingView from './components/BookingView.jsx';
import ConfirmView from './components/ConfirmView.jsx';
import FormView from './components/FormView.jsx';
import ProductCards from './components/ProductCards.jsx';
import ExpiredView from './components/ExpiredView.jsx';
import ErrorView from './components/ErrorView.jsx';

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export default function App() {
  const [state, setState] = useState({ loading: true, payload: null, token: null, expired: false, error: null });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('sid');
    if (!sid) {
      setState({ loading: false, error: 'Link invalid.' });
      return;
    }
    fetch(`https://api.catyai.io/api/webview/resolve/${sid}`)
      .then((r) => r.json())
      .then(({ token, payload, error: apiErr }) => {
        if (apiErr || !token) { setState({ loading: false, error: apiErr || 'Link invalid.' }); return; }
        if (isExpired(payload)) { setState({ loading: false, expired: true }); return; }
        setState({ loading: false, payload, token });
      })
      .catch(() => setState({ loading: false, error: 'Eroare de rețea.' }));
  }, []);

  const { loading, payload, token, expired, error } = state;

  function renderContent() {
    if (loading) return <div style={{ color: D.textDim, textAlign: 'center', marginTop: 60 }}>Se încarcă...</div>;
    if (error) return <ErrorView message={error} />;
    if (expired) return <ExpiredView />;
    if (!payload) return <ErrorView message="Token lipsă." />;

    switch (payload.action) {
      case 'payment':           return <PaymentView payload={payload} token={token} />;
      case 'booking':           return <BookingView payload={payload} token={token} />;
      case 'confirm':           return <ConfirmView payload={payload} token={token} />;
      case 'form':              return <FormView payload={payload} token={token} />;
      case 'product_selection': return <ProductCards payload={payload} token={token} />;
      default:                  return <ErrorView message="Acțiune necunoscută." />;
    }
  }

  return (
    <div style={s.root}>
      {/* Noise overlay */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: 0.04, backgroundImage: NOISE_SVG }} />

      {/* Ambient glow */}
      <div style={s.glow} />

      {/* Header */}
      <header className="fade-up" style={s.header}>
        <div style={s.logoRow}>
          <span style={s.logoText}>CATY</span>
          <span style={s.logoGold}>AI</span>
        </div>
        <span style={s.tagline}>Secured by NAP Protocol</span>
        <div style={s.separator} />
      </header>

      {/* Content */}
      <main style={s.content}>
        {renderContent()}
      </main>
    </div>
  );
}

const s = {
  root: {
    minHeight: '100dvh',
    background: D.bg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem 1rem 3rem',
    fontFamily: "'Syne', sans-serif",
    color: D.text,
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'fixed',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 600,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(200,161,101,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    marginBottom: 28,
    position: 'relative',
    zIndex: 1,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 1,
  },
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 28,
    letterSpacing: '0.12em',
    color: D.text,
  },
  logoGold: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 28,
    letterSpacing: '0.12em',
    color: D.gold,
  },
  tagline: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: D.textDim,
    letterSpacing: '0.08em',
  },
  separator: {
    width: 40,
    height: 1,
    background: `rgba(200,161,101,0.15)`,
    marginTop: 4,
  },
  content: {
    width: '100%',
    maxWidth: 420,
    position: 'relative',
    zIndex: 1,
  },
};
