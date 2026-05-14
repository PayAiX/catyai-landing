import { useRef } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';

export default function ErrorView({ message }) {
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  return (
    <div style={s.card}>
      <div className="fade-up" style={s.iconWrap}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={D.error} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="fade-up-2" style={s.title}>Eroare</h1>
      <p className="fade-up-3" style={s.msg}>{message}</p>
      <div className="fade-up-4">
        <button
          ref={btnRef}
          style={s.btn}
          onClick={() => {
            if (window.history.length > 1) window.history.back();
            else window.close();
          }}
        >
          Înapoi la WhatsApp
        </button>
        <p style={s.badge}>🔒 Link securizat · expiră în 15 min</p>
      </div>
    </div>
  );
}

const s = {
  card: {
    background: D.surface,
    border: `1px solid ${D.border}`,
    borderRadius: D.radiusLg,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '2rem 1.5rem',
    textAlign: 'center',
  },
  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: D.text,
    marginBottom: 10,
  },
  msg: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    color: D.textDim,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  btn: {
    background: `linear-gradient(135deg, ${D.gold} 0%, #a07840 100%)`,
    color: '#050f1a',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: '0.05em',
    border: 'none',
    borderRadius: D.radius,
    padding: '14px 24px',
    width: '100%',
    cursor: 'pointer',
    marginBottom: 16,
  },
  badge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: D.textDim,
    letterSpacing: '0.04em',
  },
};
