import { useRef, useState } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { submitAction } from '../utils/api.js';

export default function ProductCards({ payload, token }) {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  const d = payload?.payload ?? payload ?? {};
  const products = d.products ?? [];
  const title = d.title ?? 'Selectează un produs';

  async function handleConfirm() {
    if (!selected) return;
    setStatus('loading');
    try {
      await submitAction('product_selection', { ...d, selected }, token);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={s.card}>
        <p style={s.success}>✓ Produs selectat cu succes!</p>
      </div>
    );
  }

  return (
    <div style={s.card}>
      <h1 className="fade-up" style={s.title}>{title}</h1>

      <div className="fade-up-2" style={s.list}>
        {products.map((p, i) => (
          <button
            key={p.id ?? i}
            type="button"
            style={{
              ...s.productBtn,
              borderColor: selected === (p.id ?? i) ? D.gold : 'rgba(200,161,101,0.2)',
              background: selected === (p.id ?? i) ? 'rgba(200,161,101,0.1)' : 'rgba(255,255,255,0.03)',
            }}
            onClick={() => setSelected(p.id ?? i)}
          >
            <div style={s.productTop}>
              <span style={s.productName}>{p.name}</span>
              {p.price != null && (
                <span style={s.productPrice}>
                  {p.price} <span style={s.productCurrency}>{p.currency ?? 'RON'}</span>
                </span>
              )}
            </div>
            {p.description && <p style={s.productDesc}>{p.description}</p>}
          </button>
        ))}
      </div>

      <div className="fade-up-4">
        {status === 'error' && (
          <p style={s.errMsg}>Acțiune indisponibilă momentan. Încearcă din nou.</p>
        )}
        <button
          ref={btnRef}
          type="button"
          style={{ ...s.btn, opacity: (!selected || status === 'loading') ? 0.5 : 1 }}
          onClick={handleConfirm}
          disabled={!selected || status === 'loading'}
        >
          {status === 'loading' ? 'Se procesează...' : 'Confirmă selecția'}
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
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: D.text,
    marginBottom: 20,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 24,
  },
  productBtn: {
    background: 'rgba(255,255,255,0.03)',
    border: '1.5px solid rgba(200,161,101,0.2)',
    borderRadius: D.radius,
    padding: '14px 16px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.15s, background 0.15s',
    touchAction: 'manipulation',
  },
  productTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  productName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    color: D.text,
    flex: 1,
  },
  productPrice: {
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: 16,
    color: D.gold,
    whiteSpace: 'nowrap',
  },
  productCurrency: {
    fontSize: 12,
    color: D.textDim,
  },
  productDesc: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 13,
    color: D.textDim,
    marginTop: 6,
    lineHeight: 1.45,
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
    touchAction: 'manipulation',
  },
  success: {
    fontFamily: "'Syne', sans-serif",
    color: D.success,
    fontWeight: 600,
    fontSize: 16,
    textAlign: 'center',
    padding: '16px 0',
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
