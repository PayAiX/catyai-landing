import { useRef, useState } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { submitAction } from '../utils/api.js';

export default function ConfirmView({ payload }) {
  const [status, setStatus] = useState('idle');
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  async function handleConfirm() {
    setStatus('loading');
    try {
      await submitAction('confirm', payload);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const d = payload?.payload ?? payload ?? {};
  const message = d.message ?? 'Confirmi această acțiune?';

  return (
    <div style={s.card}>
      <h1 className="fade-up" style={s.title}>Confirmare</h1>
      <p className="fade-up-2" style={s.msg}>{message}</p>

      <div className="fade-up-4">
        {status === 'success' ? (
          <p style={s.success}>✓ Confirmat cu succes!</p>
        ) : (
          <>
            {status === 'error' && (
              <p style={s.errMsg}>Acțiune indisponibilă momentan. Încearcă din nou.</p>
            )}
            <button
              ref={btnRef}
              style={{ ...s.btnPrimary, opacity: status === 'loading' ? 0.7 : 1 }}
              onClick={handleConfirm}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Se procesează...' : 'Da, confirmă'}
            </button>
            <button
              style={s.btnSecondary}
              onClick={() => { window.location.href = 'whatsapp://'; }}
              disabled={status === 'loading'}
            >
              Anulează
            </button>
            <p style={s.badge}>🔒 Link securizat · expiră în 15 min</p>
          </>
        )}
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
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: D.text,
    marginBottom: 12,
  },
  msg: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    color: D.textDim,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  btnPrimary: {
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
    marginBottom: 10,
    display: 'block',
  },
  btnSecondary: {
    background: 'rgba(255,255,255,0.06)',
    color: D.textDim,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    border: `1px solid rgba(200,161,101,0.15)`,
    borderRadius: D.radius,
    padding: '12px 24px',
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
