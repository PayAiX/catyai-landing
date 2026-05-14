import { useRef, useState } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { submitAction } from '../utils/api.js';

export default function BookingView({ payload }) {
  const [status, setStatus] = useState('idle');
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  async function handleConfirm() {
    setStatus('loading');
    try {
      await submitAction('booking', payload);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const d = payload?.payload ?? payload ?? {};

  return (
    <div style={s.card}>
      <h1 className="fade-up" style={s.title}>Programare</h1>

      <div className="fade-up-2" style={s.detailsCard}>
        {d.service && <DetailRow label="Serviciu" value={d.service} />}
        {d.date && <DetailRow label="Data" value={d.date} />}
        {d.time && <DetailRow label="Ora" value={d.time} last />}
      </div>

      <div className="fade-up-4">
        {status === 'success' ? (
          <p style={s.success}>✓ Programare confirmată cu succes!</p>
        ) : (
          <>
            {status === 'error' && (
              <p style={s.errMsg}>Acțiune indisponibilă momentan. Încearcă din nou.</p>
            )}
            <button
              ref={btnRef}
              style={{ ...s.btn, opacity: status === 'loading' ? 0.7 : 1 }}
              onClick={handleConfirm}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Se procesează...' : 'Confirmă programarea'}
            </button>
            <p style={s.badge}>🔒 Link securizat · expiră în 15 min</p>
          </>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: last ? 0 : 12, marginBottom: last ? 0 : 12, borderBottom: last ? 'none' : '1px solid rgba(200,161,101,0.12)' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(232,237,242,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: '#E8EDF2' }}>{value}</span>
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
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: D.text,
    marginBottom: 20,
  },
  detailsCard: {
    background: D.goldDim,
    border: `1px solid ${D.border}`,
    borderRadius: D.radius,
    padding: '1.25rem',
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
    display: 'block',
  },
  success: {
    fontFamily: "'Syne', sans-serif",
    color: D.success,
    fontWeight: 600,
    fontSize: 16,
    textAlign: 'center',
    padding: '12px 0',
  },
  errMsg: {
    fontFamily: "'Syne', sans-serif",
    color: D.error,
    fontSize: 13,
    marginBottom: 12,
  },
  badge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: D.textDim,
    letterSpacing: '0.04em',
    textAlign: 'center',
  },
};
