import { useState } from 'react'
import { Link } from 'react-router-dom'

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'We\'d love to hear from you',
    backHome: 'Back to Home',
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
      email: { label: 'Email', value: 'contact@payai-x.com' },
      sales: { label: 'Sales', value: 'contact@payai-x.com' },
      support: { label: 'Support', value: 'contact@payai-x.com' },
      address: {
        label: 'Address',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, UAE'
      }
    },
    social: {
      title: 'Follow Us'
    }
  },
  ro: {
    title: 'Contacteaza-ne',
    subtitle: 'Ne-ar placea sa auzim de la tine',
    backHome: 'Inapoi la Home',
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
      email: { label: 'Email', value: 'contact@payai-x.com' },
      sales: { label: 'Vanzari', value: 'sales@catyai.io' },
      support: { label: 'Suport', value: 'support@catyai.io' },
      address: {
        label: 'Adresa',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, UAE'
      }
    },
    social: {
      title: 'Urmareste-ne'
    }
  },
  es: {
    title: 'Contactanos',
    subtitle: 'Nos encantaria saber de ti',
    backHome: 'Volver al Inicio',
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
      email: { label: 'Correo', value: 'contact@payai-x.com' },
      sales: { label: 'Ventas', value: 'sales@catyai.io' },
      support: { label: 'Soporte', value: 'support@catyai.io' },
      address: {
        label: 'Direccion',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, EAU'
      }
    },
    social: {
      title: 'Siguenos'
    }
  },
  pt: {
    title: 'Contate-nos',
    subtitle: 'Adorariamos ouvir de voce',
    backHome: 'Voltar ao Inicio',
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
      email: { label: 'Email', value: 'contact@payai-x.com' },
      sales: { label: 'Vendas', value: 'sales@catyai.io' },
      support: { label: 'Suporte', value: 'support@catyai.io' },
      address: {
        label: 'Endereco',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, EAU'
      }
    },
    social: {
      title: 'Siga-nos'
    }
  },
  fr: {
    title: 'Contactez-nous',
    subtitle: 'Nous serions ravis de vous entendre',
    backHome: 'Retour a l\'Accueil',
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
      email: { label: 'Email', value: 'contact@payai-x.com' },
      sales: { label: 'Ventes', value: 'sales@catyai.io' },
      support: { label: 'Support', value: 'support@catyai.io' },
      address: {
        label: 'Adresse',
        value: 'PayAi-X FZE\nDubai Silicon Oasis\nDubai, EAU'
      }
    },
    social: {
      title: 'Suivez-nous'
    }
  }
}

export default function Contact() {
  const lang = localStorage.getItem('caty-lang') || 'en'
  const t = translations[lang] || translations.en

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState(null) // 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // For now, open mailto
    const mailtoLink = `mailto:contact@payai-x.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
    window.location.href = mailtoLink

    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t.title}</span>
          </h1>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.form.subject}
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                >
                  <option value="">--</option>
                  {t.subjects.map((subject, idx) => (
                    <option key={idx} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                  {t.form.success}
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {t.form.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.form.sending}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t.form.send}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">{t.info.title}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.info.email.label}</p>
                    <a href={`mailto:${t.info.email.value}`} className="text-white hover:text-primary-400 transition-colors">
                      {t.info.email.value}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.info.sales.label}</p>
                    <a href={`mailto:${t.info.sales.value}`} className="text-white hover:text-primary-400 transition-colors">
                      {t.info.sales.value}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.info.support.label}</p>
                    <a href={`mailto:${t.info.support.value}`} className="text-white hover:text-primary-400 transition-colors">
                      {t.info.support.value}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.info.address.label}</p>
                    <p className="text-white whitespace-pre-line">{t.info.address.value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="card">
              <h2 className="text-lg font-bold text-white mb-4">{t.social.title}</h2>
              <div className="flex gap-4">
                <a href="https://twitter.com/catyai" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/catyai" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 z-40 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {t.backHome}
      </Link>
    </div>
  )
}
