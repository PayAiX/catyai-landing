import { useState } from 'react'
import GlobalHeader from '../components/GlobalHeader'
import FooterV9 from '../components/FooterV9'
import SEO from '../components/SEO'

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'We\'d love to hear from you',
    form: {
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! We\'ll get back to you soon.',
      error: 'Failed to send message. Please try again or email us directly.'
    },
    subjects: [
      'General Inquiry',
      'Sales Question',
      'Technical Support',
      'Partnership Opportunity',
      'Press & Media',
      'Other'
    ],
    info: {
      title: 'Other Ways to Reach Us',
      email: { label: 'Sales', value: 'sales@catyai.io' },
      sales: { label: 'Sales', value: 'sales@catyai.io' },
      support: { label: 'Support', value: 'support@catyai.io' },
      addressRo: {
        label: 'Romania Office',
        value: 'PAYAI-X S.R.L.\nStr. TRAPEZULUI, Nr. 2, Bl. M6, Sc. C, Et. 6, Ap. 113\nSector 3, București, România',
        mapUrl: 'https://maps.google.com/?q=Strada+Trapezului+2,+București,+Romania'
      },
      addressUae: {
        label: 'UAE Office',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, UAE',
        mapUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis,+Dubai,+UAE'
      },
      phone: { label: 'Phone', value: '+40 750 195 048 / +40 756 730 193' }
    },
    social: { title: 'Follow Us' }
  },
  ro: {
    title: 'Contacteaza-ne',
    subtitle: 'Ne-ar placea sa auzim de la tine',
    form: {
      name: 'Numele Tau',
      email: 'Adresa de Email',
      subject: 'Subiect',
      message: 'Mesaj',
      send: 'Trimite Mesaj',
      sending: 'Se trimite...',
      success: 'Mesaj trimis cu succes! Te vom contacta in curand.',
      error: 'Nu am putut trimite mesajul. Te rugam incearca din nou sau trimite-ne email direct.'
    },
    subjects: [
      'Intrebare Generala',
      'Intrebare Vanzari',
      'Suport Tehnic',
      'Oportunitate de Parteneriat',
      'Presa & Media',
      'Altele'
    ],
    info: {
      title: 'Alte Modalitati de Contact',
      email: { label: 'Vanzari', value: 'sales@catyai.io' },
      sales: { label: 'Vanzari', value: 'sales@catyai.io' },
      support: { label: 'Suport', value: 'support@catyai.io' },
      addressRo: {
        label: 'Sediu Romania',
        value: 'PAYAI-X S.R.L.\nStr. TRAPEZULUI, Nr. 2, Bl. M6, Sc. C, Et. 6, Ap. 113\nSector 3, București, România',
        mapUrl: 'https://maps.google.com/?q=Strada+Trapezului+2,+București,+Romania'
      },
      addressUae: {
        label: 'Sediu UAE',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, UAE',
        mapUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis,+Dubai,+UAE'
      },
      phone: { label: 'Telefon', value: '+40 750 195 048 / +40 756 730 193' }
    },
    social: { title: 'Urmareste-ne' }
  },
  es: {
    title: 'Contactanos',
    subtitle: 'Nos encantaria saber de ti',
    form: {
      name: 'Tu Nombre',
      email: 'Correo Electronico',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: 'Mensaje enviado con exito! Te responderemos pronto.',
      error: 'No se pudo enviar el mensaje. Por favor intenta de nuevo o envianos un correo directamente.'
    },
    subjects: [
      'Consulta General',
      'Pregunta de Ventas',
      'Soporte Tecnico',
      'Oportunidad de Asociacion',
      'Prensa y Medios',
      'Otro'
    ],
    info: {
      title: 'Otras Formas de Contactarnos',
      email: { label: 'Ventas', value: 'sales@catyai.io' },
      sales: { label: 'Ventas', value: 'sales@catyai.io' },
      support: { label: 'Soporte', value: 'support@catyai.io' },
      addressRo: {
        label: 'Oficina Rumania',
        value: 'PAYAI-X S.R.L.\nStr. TRAPEZULUI, Nr. 2, Bl. M6, Sc. C, Et. 6, Ap. 113\nSector 3, Bucarest, Rumania',
        mapUrl: 'https://maps.google.com/?q=Strada+Trapezului+2,+București,+Romania'
      },
      addressUae: {
        label: 'Oficina EAU',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, EAU',
        mapUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis,+Dubai,+UAE'
      },
      phone: { label: 'Telefono', value: '+40 750 195 048 / +40 756 730 193' }
    },
    social: { title: 'Siguenos' }
  },
  pt: {
    title: 'Contate-nos',
    subtitle: 'Adorariamos ouvir de voce',
    form: {
      name: 'Seu Nome',
      email: 'Endereco de Email',
      subject: 'Assunto',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso! Responderemos em breve.',
      error: 'Falha ao enviar mensagem. Por favor tente novamente ou envie-nos um email diretamente.'
    },
    subjects: [
      'Consulta Geral',
      'Pergunta de Vendas',
      'Suporte Tecnico',
      'Oportunidade de Parceria',
      'Imprensa e Midia',
      'Outro'
    ],
    info: {
      title: 'Outras Formas de Contato',
      email: { label: 'Vendas', value: 'sales@catyai.io' },
      sales: { label: 'Vendas', value: 'sales@catyai.io' },
      support: { label: 'Suporte', value: 'support@catyai.io' },
      addressRo: {
        label: 'Escritorio Romenia',
        value: 'PAYAI-X S.R.L.\nStr. TRAPEZULUI, Nr. 2, Bl. M6, Sc. C, Et. 6, Ap. 113\nSetor 3, Bucareste, Romenia',
        mapUrl: 'https://maps.google.com/?q=Strada+Trapezului+2,+București,+Romania'
      },
      addressUae: {
        label: 'Escritorio EAU',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, EAU',
        mapUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis,+Dubai,+UAE'
      },
      phone: { label: 'Telefone', value: '+40 750 195 048 / +40 756 730 193' }
    },
    social: { title: 'Siga-nos' }
  },
  fr: {
    title: 'Contactez-nous',
    subtitle: 'Nous serions ravis de vous entendre',
    form: {
      name: 'Votre Nom',
      email: 'Adresse Email',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer le Message',
      sending: 'Envoi en cours...',
      success: 'Message envoye avec succes! Nous vous repondrons bientot.',
      error: 'Echec de l\'envoi du message. Veuillez reessayer ou nous envoyer un email directement.'
    },
    subjects: [
      'Demande Generale',
      'Question Commerciale',
      'Support Technique',
      'Opportunite de Partenariat',
      'Presse et Medias',
      'Autre'
    ],
    info: {
      title: 'Autres Moyens de Nous Contacter',
      email: { label: 'Ventes', value: 'sales@catyai.io' },
      sales: { label: 'Ventes', value: 'sales@catyai.io' },
      support: { label: 'Support', value: 'support@catyai.io' },
      addressRo: {
        label: 'Bureau Roumanie',
        value: 'PAYAI-X S.R.L.\nStr. TRAPEZULUI, Nr. 2, Bl. M6, Sc. C, Et. 6, Ap. 113\nSecteur 3, Bucarest, Roumanie',
        mapUrl: 'https://maps.google.com/?q=Strada+Trapezului+2,+București,+Romania'
      },
      addressUae: {
        label: 'Bureau EAU',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, EAU',
        mapUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis,+Dubai,+UAE'
      },
      phone: { label: 'Telephone', value: '+40 750 195 048 / +40 756 730 193' }
    },
    social: { title: 'Suivez-nous' }
  }
}

export default function Contact() {
  const lang = localStorage.getItem('caty-lang') || 'en'
  const t = translations[lang] || translations.en

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const mailtoLink = `mailto:sales@catyai.io?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
    window.location.href = mailtoLink
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div style={{ background: '#010A1F', color: '#e8e8f0', minHeight: '100vh' }}>
      <SEO
        title="Contact CatyAI - Get in Touch"
        description="Contact the CatyAI team for sales inquiries, technical support, or partnership opportunities. We're here to help."
        url="https://catyai.io/contact"
      />

      <GlobalHeader lang={lang} />

      <main style={{ paddingTop: '80px' }}>
        <section style={{ maxWidth: 896, margin: '0 auto', padding: '64px 24px 96px' }}>
          {/* Page title */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, marginBottom: 12, background: 'linear-gradient(135deg,#5B8DEF,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t.title}
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>{t.subtitle}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 32 }}>
            {/* Contact Form */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: 8 }}>
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1a2744', borderRadius: 8, color: '#fff', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: 8 }}>
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1a2744', borderRadius: 8, color: '#fff', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: 8 }}>
                    {t.form.subject}
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1a2744', borderRadius: 8, color: '#fff', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  >
                    <option value="">--</option>
                    {t.subjects.map((subject, idx) => (
                      <option key={idx} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', marginBottom: 8 }}>
                    {t.form.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1a2744', borderRadius: 8, color: '#fff', outline: 'none', fontSize: '0.95rem', resize: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {status === 'success' && (
                  <div style={{ padding: '12px 16px', background: 'rgba(91,141,239,0.1)', border: '1px solid rgba(91,141,239,0.3)', borderRadius: 8, color: '#5B8DEF', fontSize: '0.875rem' }}>
                    {t.form.success}
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#f87171', fontSize: '0.875rem' }}>
                    {t.form.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{ padding: '14px 24px', background: 'linear-gradient(135deg,#5B8DEF,#A78BFA)', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'sending' ? 0.5 : 1 }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {status === 'sending' ? t.form.sending : t.form.send}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>{t.info.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  {/* Sales email */}
                  <InfoRow icon="email" color="#5B8DEF" bg="rgba(91,141,239,0.1)">
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>{t.info.email.label}</p>
                    <a href={`mailto:${t.info.email.value}`} style={{ color: '#fff', textDecoration: 'none' }}>{t.info.email.value}</a>
                  </InfoRow>

                  {/* Support email */}
                  <InfoRow icon="support" color="#A78BFA" bg="rgba(167,139,250,0.1)">
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>{t.info.support.label}</p>
                    <a href={`mailto:${t.info.support.value}`} style={{ color: '#fff', textDecoration: 'none' }}>{t.info.support.value}</a>
                  </InfoRow>

                  {/* Romania Office */}
                  <InfoRow icon="location" color="#34d399" bg="rgba(52,211,153,0.1)">
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>{t.info.addressRo.label}</p>
                    <p style={{ color: '#fff', whiteSpace: 'pre-line', margin: '2px 0' }}>{t.info.addressRo.value}</p>
                    <a href={t.info.addressRo.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#5B8DEF', fontSize: '0.8rem', textDecoration: 'none' }}>Google Maps ↗</a>
                  </InfoRow>

                  {/* UAE Office */}
                  <InfoRow icon="location" color="#5B8DEF" bg="rgba(91,141,239,0.1)">
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>{t.info.addressUae.label}</p>
                    <p style={{ color: '#fff', whiteSpace: 'pre-line', margin: '2px 0' }}>{t.info.addressUae.value}</p>
                    <a href={t.info.addressUae.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#5B8DEF', fontSize: '0.8rem', textDecoration: 'none' }}>Google Maps ↗</a>
                  </InfoRow>

                  {/* Phone */}
                  <InfoRow icon="phone" color="#fbbf24" bg="rgba(251,191,36,0.1)">
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>{t.info.phone.label}</p>
                    <p style={{ color: '#fff', margin: 0 }}>{t.info.phone.value}</p>
                  </InfoRow>
                </div>
              </div>

              {/* Social */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>{t.social.title}</h2>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href="https://linkedin.com/company/payai-x" target="_blank" rel="noopener noreferrer"
                    style={{ padding: 12, background: '#0A1628', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <svg width="20" height="20" fill="#94a3b8" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://medium.com/@adrianvitan" target="_blank" rel="noopener noreferrer"
                    style={{ padding: 12, background: '#0A1628', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <svg width="20" height="20" fill="#94a3b8" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  </a>
                  <a href="mailto:contact@payai-x.com"
                    style={{ padding: 12, background: '#0A1628', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <svg width="20" height="20" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV9 lang={lang} />
    </div>
  )
}

function InfoRow({ icon, color, bg, children }) {
  const icons = {
    email: (
      <svg width="20" height="20" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    support: (
      <svg width="20" height="20" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    location: (
      <svg width="20" height="20" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg width="20" height="20" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ padding: 8, background: bg, borderRadius: 8, flexShrink: 0 }}>
        {icons[icon]}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </div>
    </div>
  )
}
