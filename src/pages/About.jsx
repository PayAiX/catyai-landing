import { Link } from 'react-router-dom'

const translations = {
  en: {
    title: 'About Caty.AI',
    subtitle: 'Transforming customer conversations with AI',
    backHome: 'Back to Home',
    mission: {
      title: 'Our Mission',
      text: 'We believe every business deserves access to intelligent customer engagement. Our mission is to democratize AI-powered conversations, helping businesses of all sizes connect with their customers 24/7.'
    },
    story: {
      title: 'Our Story',
      text1: 'Caty.AI was born from a simple observation: most businesses struggle to respond to customer inquiries quickly and consistently. Website visitors leave without converting, questions go unanswered overnight, and valuable leads slip away.',
      text2: 'We built Caty to change that. Using advanced AI technology, we created a chatbot that truly understands context, learns from your business, and engages visitors like a knowledgeable team member would.',
      text3: 'Today, Caty.AI helps hundreds of businesses across Europe capture more leads, provide instant support, and convert more visitors into customers.'
    },
    values: {
      title: 'Our Values',
      items: [
        { title: 'Customer First', desc: 'Everything we build starts with understanding what our customers need.' },
        { title: 'Simplicity', desc: 'Powerful AI should be easy to use. No PhD required.' },
        { title: 'Transparency', desc: 'Clear pricing, honest communication, no hidden surprises.' },
        { title: 'Privacy', desc: 'Your data is yours. We never use it to train external models.' }
      ]
    },
    team: {
      title: 'The Team',
      text: 'We are a small, dedicated team of AI engineers, designers, and customer success specialists based in Dubai, UAE. We are backed by PayAi-X FZE and committed to building the best AI chatbot platform for businesses.'
    },
    contact: {
      title: 'Get in Touch',
      text: 'Have questions? We would love to hear from you.',
      button: 'Contact Us'
    }
  },
  ro: {
    title: 'Despre Caty.AI',
    subtitle: 'Transformam conversatiile cu clientii prin AI',
    backHome: 'Inapoi la Home',
    mission: {
      title: 'Misiunea Noastra',
      text: 'Credem ca fiecare afacere merita acces la interactiune inteligenta cu clientii. Misiunea noastra este sa democratizam conversatiile bazate pe AI, ajutand afaceri de toate dimensiunile sa se conecteze cu clientii 24/7.'
    },
    story: {
      title: 'Povestea Noastra',
      text1: 'Caty.AI s-a nascut dintr-o observatie simpla: majoritatea afacerilor se straduiesc sa raspunda rapid si consistent la intrebarile clientilor. Vizitatorii site-ului pleaca fara sa converteasca, intrebarile raman fara raspuns peste noapte, si lead-uri valoroase se pierd.',
      text2: 'Am construit Caty pentru a schimba asta. Folosind tehnologie AI avansata, am creat un chatbot care intelege cu adevarat contextul, invata despre afacerea ta si interactioneaza cu vizitatorii ca un membru al echipei.',
      text3: 'Astazi, Caty.AI ajuta sute de afaceri din Europa sa capteze mai multe lead-uri, sa ofere suport instant si sa converteasca mai multi vizitatori in clienti.'
    },
    values: {
      title: 'Valorile Noastre',
      items: [
        { title: 'Clientul pe Primul Loc', desc: 'Tot ce construim incepe cu intelegerea nevoilor clientilor nostri.' },
        { title: 'Simplitate', desc: 'AI-ul puternic trebuie sa fie usor de folosit. Nu e nevoie de doctorat.' },
        { title: 'Transparenta', desc: 'Preturi clare, comunicare onesta, fara surprize ascunse.' },
        { title: 'Confidentialitate', desc: 'Datele tale sunt ale tale. Nu le folosim niciodata pentru a antrena modele externe.' }
      ]
    },
    team: {
      title: 'Echipa',
      text: 'Suntem o echipa mica si dedicata de ingineri AI, designeri si specialisti in succes clienti, cu sediul in Dubai, UAE. Suntem sustinuti de PayAi-X FZE si dedicati construirii celei mai bune platforme de chatbot AI pentru afaceri.'
    },
    contact: {
      title: 'Contacteaza-ne',
      text: 'Ai intrebari? Ne-ar placea sa auzim de la tine.',
      button: 'Contacteaza-ne'
    }
  },
  es: {
    title: 'Sobre Caty.AI',
    subtitle: 'Transformando conversaciones con clientes mediante IA',
    backHome: 'Volver al Inicio',
    mission: {
      title: 'Nuestra Mision',
      text: 'Creemos que cada negocio merece acceso a interaccion inteligente con clientes. Nuestra mision es democratizar las conversaciones impulsadas por IA, ayudando a negocios de todos los tamanos a conectar con sus clientes 24/7.'
    },
    story: {
      title: 'Nuestra Historia',
      text1: 'Caty.AI nacio de una observacion simple: la mayoria de los negocios luchan por responder a las consultas de los clientes rapida y consistentemente. Los visitantes del sitio web se van sin convertir, las preguntas quedan sin respuesta durante la noche, y leads valiosos se pierden.',
      text2: 'Construimos Caty para cambiar eso. Usando tecnologia de IA avanzada, creamos un chatbot que realmente entiende el contexto, aprende de tu negocio e interactua con los visitantes como lo haria un miembro del equipo.',
      text3: 'Hoy, Caty.AI ayuda a cientos de negocios en Europa a capturar mas leads, proporcionar soporte instantaneo y convertir mas visitantes en clientes.'
    },
    values: {
      title: 'Nuestros Valores',
      items: [
        { title: 'Cliente Primero', desc: 'Todo lo que construimos comienza con entender lo que nuestros clientes necesitan.' },
        { title: 'Simplicidad', desc: 'La IA poderosa debe ser facil de usar. No se requiere doctorado.' },
        { title: 'Transparencia', desc: 'Precios claros, comunicacion honesta, sin sorpresas ocultas.' },
        { title: 'Privacidad', desc: 'Tus datos son tuyos. Nunca los usamos para entrenar modelos externos.' }
      ]
    },
    team: {
      title: 'El Equipo',
      text: 'Somos un equipo pequeno y dedicado de ingenieros de IA, disenadores y especialistas en exito del cliente con sede en Dubai, EAU. Estamos respaldados por PayAi-X FZE y comprometidos a construir la mejor plataforma de chatbot IA para negocios.'
    },
    contact: {
      title: 'Contactanos',
      text: 'Tienes preguntas? Nos encantaria saber de ti.',
      button: 'Contactanos'
    }
  },
  pt: {
    title: 'Sobre Caty.AI',
    subtitle: 'Transformando conversas com clientes atraves de IA',
    backHome: 'Voltar ao Inicio',
    mission: {
      title: 'Nossa Missao',
      text: 'Acreditamos que todo negocio merece acesso a interacao inteligente com clientes. Nossa missao e democratizar conversas impulsionadas por IA, ajudando negocios de todos os tamanhos a se conectar com seus clientes 24/7.'
    },
    story: {
      title: 'Nossa Historia',
      text1: 'Caty.AI nasceu de uma observacao simples: a maioria dos negocios luta para responder as consultas dos clientes de forma rapida e consistente. Visitantes do site vao embora sem converter, perguntas ficam sem resposta durante a noite, e leads valiosos escapam.',
      text2: 'Construimos Caty para mudar isso. Usando tecnologia de IA avancada, criamos um chatbot que realmente entende o contexto, aprende sobre seu negocio e interage com visitantes como um membro da equipe faria.',
      text3: 'Hoje, Caty.AI ajuda centenas de negocios na Europa a capturar mais leads, fornecer suporte instantaneo e converter mais visitantes em clientes.'
    },
    values: {
      title: 'Nossos Valores',
      items: [
        { title: 'Cliente em Primeiro', desc: 'Tudo que construimos comeca com entender o que nossos clientes precisam.' },
        { title: 'Simplicidade', desc: 'IA poderosa deve ser facil de usar. Nao e necessario doutorado.' },
        { title: 'Transparencia', desc: 'Precos claros, comunicacao honesta, sem surpresas ocultas.' },
        { title: 'Privacidade', desc: 'Seus dados sao seus. Nunca os usamos para treinar modelos externos.' }
      ]
    },
    team: {
      title: 'A Equipe',
      text: 'Somos uma equipe pequena e dedicada de engenheiros de IA, designers e especialistas em sucesso do cliente com sede em Dubai, EAU. Somos apoiados pela PayAi-X FZE e comprometidos em construir a melhor plataforma de chatbot IA para negocios.'
    },
    contact: {
      title: 'Entre em Contato',
      text: 'Tem perguntas? Adorariamos ouvir de voce.',
      button: 'Contate-nos'
    }
  },
  fr: {
    title: 'A propos de Caty.AI',
    subtitle: 'Transformer les conversations clients avec l\'IA',
    backHome: 'Retour a l\'Accueil',
    mission: {
      title: 'Notre Mission',
      text: 'Nous croyons que chaque entreprise merite un acces a l\'engagement client intelligent. Notre mission est de democratiser les conversations alimentees par l\'IA, aidant les entreprises de toutes tailles a se connecter avec leurs clients 24/7.'
    },
    story: {
      title: 'Notre Histoire',
      text1: 'Caty.AI est ne d\'une observation simple: la plupart des entreprises peinent a repondre aux demandes des clients rapidement et de maniere coherente. Les visiteurs du site partent sans convertir, les questions restent sans reponse la nuit, et des leads precieux s\'echappent.',
      text2: 'Nous avons construit Caty pour changer cela. En utilisant une technologie d\'IA avancee, nous avons cree un chatbot qui comprend vraiment le contexte, apprend de votre entreprise et interagit avec les visiteurs comme le ferait un membre de l\'equipe.',
      text3: 'Aujourd\'hui, Caty.AI aide des centaines d\'entreprises en Europe a capturer plus de leads, fournir un support instantane et convertir plus de visiteurs en clients.'
    },
    values: {
      title: 'Nos Valeurs',
      items: [
        { title: 'Client d\'Abord', desc: 'Tout ce que nous construisons commence par comprendre ce dont nos clients ont besoin.' },
        { title: 'Simplicite', desc: 'L\'IA puissante doit etre facile a utiliser. Pas besoin de doctorat.' },
        { title: 'Transparence', desc: 'Prix clairs, communication honnete, pas de surprises cachees.' },
        { title: 'Confidentialite', desc: 'Vos donnees sont les votres. Nous ne les utilisons jamais pour entrainer des modeles externes.' }
      ]
    },
    team: {
      title: 'L\'Equipe',
      text: 'Nous sommes une petite equipe dediee d\'ingenieurs IA, de designers et de specialistes du succes client basee a Dubai, EAU. Nous sommes soutenus par PayAi-X FZE et engages a construire la meilleure plateforme de chatbot IA pour les entreprises.'
    },
    contact: {
      title: 'Contactez-nous',
      text: 'Vous avez des questions? Nous serions ravis de vous entendre.',
      button: 'Nous Contacter'
    }
  }
}

export default function About() {
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

        {/* Mission */}
        <section className="mb-16">
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-4">{t.mission.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{t.mission.text}</p>
          </div>
        </section>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{t.story.title}</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>{t.story.text1}</p>
            <p>{t.story.text2}</p>
            <p>{t.story.text3}</p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{t.values.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.values.items.map((item, idx) => (
              <div key={idx} className="card">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">{t.team.title}</h2>
            <p className="text-gray-300 leading-relaxed">{t.team.text}</p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t.contact.title}</h2>
          <p className="text-gray-400 mb-6">{t.contact.text}</p>
          <Link to="/contact" className="btn-primary px-8 py-3">
            {t.contact.button}
          </Link>
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
