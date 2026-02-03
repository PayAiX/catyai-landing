import { Link } from 'react-router-dom'

const translations = {
  en: {
    title: 'Careers at Caty.AI',
    subtitle: 'Join us in building the future of customer conversations',
    backHome: 'Back to Home',
    why: {
      title: 'Why Join Caty.AI?',
      items: [
        { icon: '🚀', title: 'Early Stage Impact', desc: 'Shape the product and company culture from the ground up.' },
        { icon: '🌍', title: 'Remote First', desc: 'Work from anywhere. We believe talent has no borders.' },
        { icon: '📈', title: 'Growth Opportunity', desc: 'Grow with us as we scale across Europe and beyond.' },
        { icon: '🤖', title: 'Cutting Edge AI', desc: 'Work with the latest AI/ML technologies and LLMs.' }
      ]
    },
    perks: {
      title: 'Perks & Benefits',
      items: [
        'Competitive salary + equity',
        'Flexible working hours',
        'Remote-first culture',
        'Learning & development budget',
        'Latest hardware',
        'Annual team retreats'
      ]
    },
    positions: {
      title: 'Open Positions',
      none: 'No open positions at the moment.',
      check: 'Check back soon or send us your CV for future opportunities.',
      openings: [
        // { title: 'Senior Full-Stack Engineer', location: 'Remote (EU)', type: 'Full-time' },
        // { title: 'AI/ML Engineer', location: 'Remote (EU)', type: 'Full-time' },
      ]
    },
    spontaneous: {
      title: 'Spontaneous Application',
      text: 'Don\'t see a role that fits? We\'re always looking for exceptional talent. Send us your CV and tell us why you\'d be a great fit for Caty.AI.',
      email: 'contact@payai-x.com'
    }
  },
  ro: {
    title: 'Cariere la Caty.AI',
    subtitle: 'Alatura-te noua pentru a construi viitorul conversatiilor cu clientii',
    backHome: 'Inapoi la Home',
    why: {
      title: 'De ce Caty.AI?',
      items: [
        { icon: '🚀', title: 'Impact de la Inceput', desc: 'Modeleaza produsul si cultura companiei de la zero.' },
        { icon: '🌍', title: 'Remote First', desc: 'Lucreaza de oriunde. Credem ca talentul nu are granite.' },
        { icon: '📈', title: 'Oportunitate de Crestere', desc: 'Creste cu noi pe masura ce ne extindem in Europa si dincolo.' },
        { icon: '🤖', title: 'AI de Ultima Generatie', desc: 'Lucreaza cu cele mai noi tehnologii AI/ML si LLM-uri.' }
      ]
    },
    perks: {
      title: 'Avantaje & Beneficii',
      items: [
        'Salariu competitiv + actiuni',
        'Program de lucru flexibil',
        'Cultura remote-first',
        'Buget pentru invatare si dezvoltare',
        'Hardware de ultima generatie',
        'Retreat-uri anuale de echipa'
      ]
    },
    positions: {
      title: 'Pozitii Deschise',
      none: 'Nu avem pozitii deschise momentan.',
      check: 'Revino curand sau trimite-ne CV-ul pentru oportunitati viitoare.',
      openings: []
    },
    spontaneous: {
      title: 'Aplicatie Spontana',
      text: 'Nu vezi un rol potrivit? Cautam mereu talente exceptionale. Trimite-ne CV-ul si spune-ne de ce ai fi potrivit pentru Caty.AI.',
      email: 'contact@payai-x.com'
    }
  },
  es: {
    title: 'Carreras en Caty.AI',
    subtitle: 'Unete a nosotros para construir el futuro de las conversaciones con clientes',
    backHome: 'Volver al Inicio',
    why: {
      title: 'Por que Caty.AI?',
      items: [
        { icon: '🚀', title: 'Impacto Temprano', desc: 'Da forma al producto y la cultura de la empresa desde cero.' },
        { icon: '🌍', title: 'Remote First', desc: 'Trabaja desde cualquier lugar. Creemos que el talento no tiene fronteras.' },
        { icon: '📈', title: 'Oportunidad de Crecimiento', desc: 'Crece con nosotros mientras nos expandimos por Europa y mas alla.' },
        { icon: '🤖', title: 'IA de Vanguardia', desc: 'Trabaja con las ultimas tecnologias de AI/ML y LLMs.' }
      ]
    },
    perks: {
      title: 'Ventajas y Beneficios',
      items: [
        'Salario competitivo + acciones',
        'Horario de trabajo flexible',
        'Cultura remote-first',
        'Presupuesto para aprendizaje',
        'Hardware de ultima generacion',
        'Retiros anuales de equipo'
      ]
    },
    positions: {
      title: 'Posiciones Abiertas',
      none: 'No hay posiciones abiertas en este momento.',
      check: 'Vuelve pronto o envianos tu CV para futuras oportunidades.',
      openings: []
    },
    spontaneous: {
      title: 'Aplicacion Espontanea',
      text: 'No ves un rol que encaje? Siempre buscamos talento excepcional. Envianos tu CV y cuentanos por que serias ideal para Caty.AI.',
      email: 'contact@payai-x.com'
    }
  },
  pt: {
    title: 'Carreiras na Caty.AI',
    subtitle: 'Junte-se a nos para construir o futuro das conversas com clientes',
    backHome: 'Voltar ao Inicio',
    why: {
      title: 'Por que Caty.AI?',
      items: [
        { icon: '🚀', title: 'Impacto Inicial', desc: 'Molde o produto e a cultura da empresa desde o inicio.' },
        { icon: '🌍', title: 'Remote First', desc: 'Trabalhe de qualquer lugar. Acreditamos que o talento nao tem fronteiras.' },
        { icon: '📈', title: 'Oportunidade de Crescimento', desc: 'Cresca conosco enquanto nos expandimos pela Europa e alem.' },
        { icon: '🤖', title: 'IA de Ponta', desc: 'Trabalhe com as mais recentes tecnologias de AI/ML e LLMs.' }
      ]
    },
    perks: {
      title: 'Vantagens e Beneficios',
      items: [
        'Salario competitivo + acoes',
        'Horario de trabalho flexivel',
        'Cultura remote-first',
        'Orcamento para aprendizado',
        'Hardware de ultima geracao',
        'Retiros anuais da equipe'
      ]
    },
    positions: {
      title: 'Posicoes Abertas',
      none: 'Nenhuma posicao aberta no momento.',
      check: 'Volte em breve ou envie-nos seu CV para futuras oportunidades.',
      openings: []
    },
    spontaneous: {
      title: 'Candidatura Espontanea',
      text: 'Nao ve uma vaga que se encaixa? Estamos sempre procurando talentos excepcionais. Envie-nos seu CV e conte por que voce seria ideal para a Caty.AI.',
      email: 'contact@payai-x.com'
    }
  },
  fr: {
    title: 'Carrieres chez Caty.AI',
    subtitle: 'Rejoignez-nous pour construire l\'avenir des conversations clients',
    backHome: 'Retour a l\'Accueil',
    why: {
      title: 'Pourquoi Caty.AI?',
      items: [
        { icon: '🚀', title: 'Impact Initial', desc: 'Faconnez le produit et la culture d\'entreprise des le debut.' },
        { icon: '🌍', title: 'Remote First', desc: 'Travaillez de n\'importe ou. Nous croyons que le talent n\'a pas de frontieres.' },
        { icon: '📈', title: 'Opportunite de Croissance', desc: 'Grandissez avec nous alors que nous nous etendons en Europe et au-dela.' },
        { icon: '🤖', title: 'IA de Pointe', desc: 'Travaillez avec les dernieres technologies AI/ML et LLMs.' }
      ]
    },
    perks: {
      title: 'Avantages et Benefices',
      items: [
        'Salaire competitif + actions',
        'Horaires de travail flexibles',
        'Culture remote-first',
        'Budget formation et developpement',
        'Materiel dernier cri',
        'Retraites d\'equipe annuelles'
      ]
    },
    positions: {
      title: 'Postes Ouverts',
      none: 'Aucun poste ouvert pour le moment.',
      check: 'Revenez bientot ou envoyez-nous votre CV pour de futures opportunites.',
      openings: []
    },
    spontaneous: {
      title: 'Candidature Spontanee',
      text: 'Vous ne voyez pas un role qui correspond? Nous recherchons toujours des talents exceptionnels. Envoyez-nous votre CV et dites-nous pourquoi vous seriez ideal pour Caty.AI.',
      email: 'contact@payai-x.com'
    }
  }
}

export default function Careers() {
  const lang = localStorage.getItem('caty-lang') || 'en'
  const t = translations[lang] || translations.en

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

        {/* Why Join */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{t.why.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.why.items.map((item, idx) => (
              <div key={idx} className="card">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Perks */}
        <section className="mb-16">
          <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">{t.perks.title}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {t.perks.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{t.positions.title}</h2>
          {t.positions.openings.length > 0 ? (
            <div className="space-y-4">
              {t.positions.openings.map((position, idx) => (
                <div key={idx} className="card flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{position.title}</h3>
                    <p className="text-gray-400 text-sm">{position.location} • {position.type}</p>
                  </div>
                  <a href={`mailto:contact@payai-x.com?subject=Application: ${position.title}`} className="btn-primary px-4 py-2 text-sm">
                    Apply
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <p className="text-gray-400 mb-2">{t.positions.none}</p>
              <p className="text-gray-500 text-sm">{t.positions.check}</p>
            </div>
          )}
        </section>

        {/* Spontaneous Application */}
        <section className="text-center">
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-4">{t.spontaneous.title}</h2>
            <p className="text-gray-400 mb-6">{t.spontaneous.text}</p>
            <a
              href={`mailto:${t.spontaneous.email}`}
              className="btn-primary px-8 py-3 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t.spontaneous.email}
            </a>
          </div>
        </section>
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
