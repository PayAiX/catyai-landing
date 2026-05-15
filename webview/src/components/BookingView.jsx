import { useRef, useState, useEffect } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { submitAction } from '../utils/api.js';

export default function BookingView({ payload, token }) {
  const [status, setStatus] = useState('idle');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  const d = payload?.payload ?? payload ?? {};

  useEffect(() => {
    if (d.visitor_name) setName(d.visitor_name);
    if (d.date) setDate(d.date);
    if (d.time) setTime(d.time);
  }, []);

  async function handleConfirm() {
    if (!name.trim() || !date || !time) {
      setStatus('missing');
      return;
    }
    setStatus('loading');
    try {
      await submitAction('booking', { ...payload, payload: { ...d, name, date, time } }, token);
      setStatus('success');
      setTimeout(() => { window.location.href = 'whatsapp://'; }, 2500);
    } catch {
      setStatus('error');
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={s.card}>
      <h1 className="fade-up" style={s.title}>Programare</h1>

      {status === 'success' ? (
        <>
          <p style={s.success}>✓ Programare confirmată!</p>
          <p style={s.redirectMsg}>Te redirecționăm la WhatsApp...</p>
          <button style={s.btnSecondary} onClick={() => { window.location.href = 'whatsapp://'; }}>
            Înapoi la WhatsApp
          </button>
        </>
      ) : (
        <>
          <div className="fade-up-2" style={s.formGroup}>
            <label style={s.label}>Numele tău</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Adrian Popescu"
              style={s.input}
            />
          </div>

          <div className="fade-up-3" style={s.formGroup}>
            <label style={s.label}>Data</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              style={s.input}
            />
          </div>

          <div className="fade-up-3" style={s.formGroup}>
            <label style={s.label}>Ora</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={s.input}
            />
          </div>

          {status === 'missing' && (
            <p style={s.errMsg}>Completează toate câmpurile.</p>
          )}
          {status === 'error' && (
            <p style={s.errMsg}>Eroare. Încearcă din nou.</p>
          )}

          <div className="fade-up-4">
            <button
              ref={btnRef}
              style={{ ...s.btn, opacity: status === 'loading' ? 0.7 : 1 }}
              onClick={handleConfirm}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Se procesează...' : 'Confirmă programarea'}
            </button>
            <button
              style={s.btnSecondary}
              onClick={() => { window.location.href = 'whatsapp://'; }}
            >
              Înapoi la WhatsApp
            </button>
            <p style={s.badge}>🔒 Link securizat · expiră în 15 min</p>
          </div>
        </>
      )}
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: 'rgba(232,237,242,0.55)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    background: 'rgba(232,237,242,0.05)',
    border: `1px solid ${D.border}`,
    borderRadius: D.radius,
    padding: '12px 14px',
    color: D.text,
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
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
    marginBottom: 12,
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
  success: {
    fontFamily: "'Syne', sans-serif",
    color: D.success,
    fontWeight: 700,
    fontSize: 18,
    textAlign: 'center',
    padding: '12px 0 4px',
  },
  redirectMsg: {
    fontFamily: "'JetBrains Mono', monospace",
    color: D.textDim,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
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
