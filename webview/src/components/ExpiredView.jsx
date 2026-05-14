import { D } from '../utils/design.js';

export default function ExpiredView() {
  return (
    <div style={s.card}>
      <div className="fade-up" style={s.iconWrap}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={D.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h1 className="fade-up-2" style={s.title}>Link expirat</h1>
      <p className="fade-up-3" style={s.subtitle}>
        Solicită un link nou în conversația WhatsApp.
      </p>
      <p className="fade-up-4" style={s.badge}>🔒 Link securizat · expiră în 15 min</p>
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
    opacity: 0.8,
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: D.text,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    color: D.textDim,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  badge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: D.textDim,
    letterSpacing: '0.04em',
  },
};
