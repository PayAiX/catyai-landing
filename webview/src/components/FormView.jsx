import { useRef, useState } from 'react';
import { D } from '../utils/design.js';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { submitAction } from '../utils/api.js';

const DEFAULT_FIELDS = [
  { name: 'name',    label: 'Nume',    type: 'text',     required: true },
  { name: 'phone',   label: 'Telefon', type: 'tel',      required: true },
  { name: 'message', label: 'Mesaj',   type: 'textarea', required: false },
];

export default function FormView({ payload, token }) {
  const d = payload?.payload ?? payload ?? {};
  const fields = d.fields?.length ? d.fields : DEFAULT_FIELDS;
  const title = d.title ?? 'Completează formularul';

  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map((f) => [f.name, '']))
  );
  const [status, setStatus] = useState('idle');
  const btnRef = useRef(null);
  useMagnetic(btnRef);

  function handleChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitAction('form', formData, token);
      setStatus('success');
      setTimeout(() => { window.location.href = 'whatsapp://'; }, 2500);
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={s.card}>
      <h1 className="fade-up" style={s.title}>{title}</h1>

      {status === 'success' ? (
        <>
          <p style={s.success}>✓ Trimis cu succes!</p>
          <p style={s.redirectMsg}>Te redirecționăm la WhatsApp...</p>
          <button style={s.btnSecondary} onClick={() => { window.location.href = 'whatsapp://'; }}>
            Înapoi la WhatsApp
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} style={s.form}>
          {fields.map((field, i) => (
            <div key={field.name} className={i === 0 ? 'fade-up-2' : i === 1 ? 'fade-up-3' : 'fade-up-3'} style={s.fieldGroup}>
              <label style={s.label} htmlFor={field.name}>
                {field.label}
                {field.required && <span style={s.req}> *</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  style={{ ...s.input, ...s.textarea }}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  rows={4}
                  placeholder={`Introdu ${field.label.toLowerCase()}...`}
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type ?? 'text'}
                  style={s.input}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  placeholder={`Introdu ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}

          {status === 'error' && (
            <p style={s.errMsg}>Acțiune indisponibilă momentan. Încearcă din nou.</p>
          )}

          <div className="fade-up-4">
            <button
              ref={btnRef}
              type="submit"
              style={{ ...s.btn, opacity: status === 'loading' ? 0.7 : 1 }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Se trimite...' : 'Trimite'}
            </button>
            <button
              type="button"
              style={s.btnSecondary}
              onClick={() => { window.location.href = 'whatsapp://'; }}
            >
              Înapoi la WhatsApp
            </button>
            <p style={s.badge}>🔒 Link securizat · expiră în 15 min</p>
          </div>
        </form>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    fontWeight: 500,
    color: D.textDim,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
  },
  req: { color: D.gold },
  input: {
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${D.border}`,
    borderRadius: '10px',
    color: D.text,
    padding: '12px 14px',
    fontSize: 16,
    fontFamily: "'Syne', sans-serif",
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    WebkitAppearance: 'none',
    touchAction: 'manipulation',
    userSelect: 'text',
    WebkitUserSelect: 'text',
  },
  textarea: {
    resize: 'vertical',
    minHeight: 100,
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
  },
  badge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    color: D.textDim,
    letterSpacing: '0.04em',
    textAlign: 'center',
  },
};
