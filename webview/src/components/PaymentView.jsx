import { useEffect, useRef, useState } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { submitAction } from '../utils/api.js';

export default function PaymentView({ payload, token }) {
  const [status, setStatus] = useState('idle');
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => { window.location.href = 'whatsapp://'; }, 2500);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function handleConfirm() {
    setStatus('loading');
    try {
      await submitAction('payment', payload, token);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const d = payload?.payload ?? payload ?? {};

  return (
    <div style={s.card}>
      <h1 className="fade-up" style={s.title}>Confirmare plată</h1>

      <div className="fade-up-2" style={s.detailsCard}>
        {d.description && (
          <p style={s.desc}>{d.description}</p>
        )}
        {d.amount != null && (
          <div style={s.amountRow}>
            <span style={s.amountLabel}>Total</span>
            <span style={s.amount}>
              {d.amount}{' '}
              <span style={s.currency}>{d.currency ?? 'RON'}</span>
            </span>
          </div>
        )}
      </div>

      <div className="fade-up-4">
        {status === 'success' ? (
          <>
            <p style={s.success}>✓ Plată confirmată cu succes!</p>
            <p style={s.redirectMsg}>Te redirecționăm la WhatsApp...</p>
            <button style={s.btnSecondary} onClick={() => { window.location.href = 'whatsapp://'; }}>
              Înapoi la WhatsApp
            </button>
          </>
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
              {status === 'loading' ? 'Se procesează...' : 'Confirmă plata'}
            </button>
            <button
              type="button"
              style={s.btnSecondary}
              onClick={() => { window.location.href = 'whatsapp://'; }}
            >
              Înapoi la WhatsApp
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
    marginBottom: 20,
  },
  detailsCard: {
    background: D.goldDim,
    border: `1px solid ${D.border}`,
    borderRadius: D.radius,
    padding: '1.25rem',
    marginBottom: 24,
  },
  desc: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 14,
    color: D.textDim,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  amountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  amountLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: D.textDim,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  amount: {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: 30,
    color: D.gold,
  },
  currency: {
    fontSize: 16,
    color: D.textDim,
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
  btnSecondary: {
    background: 'transparent',
    color: D.text,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    border: `1px solid ${D.border}`,
    borderRadius: D.radius,
    padding: '12px 24px',
    width: '100%',
    cursor: 'pointer',
    marginBottom: 16,
    display: 'block',
  },
  redirectMsg: {
    fontFamily: "'JetBrains Mono', monospace",
    color: D.textDim,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
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
