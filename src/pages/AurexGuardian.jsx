import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const translations = {
  en: {
    badge: 'AI Infrastructure',
    heroTitle1: 'Powered by',
    heroTitle2: 'AUREX Guardian v3',
    heroSubtitle: 'The AI engine behind CatyAI — handling market intelligence, SEO signals, and real-time analytics so your business always stays ahead.',
    heroCta: 'Access AUREX Guardian',
    heroCtaSecondary: 'Learn More',
    trustBadge1: '6+ data sources',
    trustBadge2: '24/7 monitoring',
    trustBadge3: 'Real-time signals',

    whatTitle: 'What is',
    whatHighlight: 'AUREX Guardian?',
    whatDesc: 'AUREX Guardian v3 is the underlying AI infrastructure that powers CatyAI and other PayAi-X products. It provides market intelligence, SEO optimization, and business analytics in real-time.',

    featuresTitle: 'Core',
    featuresHighlight: 'Capabilities',
    features: [
      {
        id: 'nexus',
        name: 'NEXUS',
        tagline: 'Market Signals Intelligence',
        description: 'Automatically discover profitable keywords, monitor competition and find growth opportunities.',
        features: ['Google Autocomplete & Trends', 'DataForSEO integration', 'Automatic Profit Scoring', 'Intent Classification AI'],
        color: 'from-cyan-500 to-blue-600'
      },
      {
        id: 'gbp',
        name: 'GBP Optimizer',
        tagline: 'Google Business Profile',
        description: 'Manage your Google Business profile, respond to reviews and increase local visibility.',
        features: ['Auto-sync profiles', 'AI review responses', 'Posts & Q&A management', 'Insights & Analytics'],
        color: 'from-gold to-[#D4B57A]'
      },
      {
        id: 'indexing',
        name: 'Indexing Engine',
        tagline: 'SEO & Fast Indexing',
        description: 'Index pages instantly in Google with IndexNow and monitor SEO performance.',
        features: ['IndexNow instant push', 'Sitemap auto-generation', 'Rank tracking', 'Technical SEO audit'],
        color: 'from-purple-500 to-pink-600'
      }
    ],

    statsTitle: 'AUREX by the Numbers',
    stats: [
      { value: '6+', label: 'Data Sources' },
      { value: '24/7', label: 'Monitoring' },
      { value: 'AI', label: 'Profit Scoring' },
      { value: 'Real-time', label: 'Market Signals' }
    ],

    integrationsTitle: 'Integrated',
    integrationsHighlight: 'Everywhere',
    integrations: [
      { name: 'CatyAI', desc: 'Sales chatbot powered by AUREX intelligence' },
      { name: 'Ahauros', desc: 'Marketing platform with AUREX analytics' },
      { name: 'Guardian Dashboard', desc: 'Direct access to all AUREX features' }
    ],

    ctaTitle: 'Ready to leverage AI intelligence?',
    ctaSubtitle: 'Access AUREX Guardian directly for full control over market signals and SEO optimization.',
    ctaButton: 'Access AUREX Guardian',

    footer: {
      copyright: '© 2024 PayAi-X FZE. All rights reserved.',
      company: 'A PayAi-X Product'
    }
  },
  ro: {
    badge: 'Infrastructură AI',
    heroTitle1: 'Powered by',
    heroTitle2: 'AUREX Guardian v3',
    heroSubtitle: 'Motorul AI din spatele CatyAI — gestionează inteligența de piață, semnale SEO și analize în timp real pentru ca afacerea ta să fie mereu în față.',
    heroCta: 'Accesează AUREX Guardian',
    heroCtaSecondary: 'Află mai multe',
    trustBadge1: '6+ surse de date',
    trustBadge2: 'Monitorizare 24/7',
    trustBadge3: 'Semnale în timp real',

    whatTitle: 'Ce este',
    whatHighlight: 'AUREX Guardian?',
    whatDesc: 'AUREX Guardian v3 este infrastructura AI care alimentează CatyAI și alte produse PayAi-X. Oferă inteligență de piață, optimizare SEO și analiză de business în timp real.',

    featuresTitle: 'Capabilități',
    featuresHighlight: 'Principale',
    features: [
      {
        id: 'nexus',
        name: 'NEXUS',
        tagline: 'Inteligență Semnale Piață',
        description: 'Descoperă automat keywords profitabile, monitorizează competiția și găsește oportunități de creștere.',
        features: ['Google Autocomplete & Trends', 'Integrare DataForSEO', 'Profit Scoring automat', 'Clasificare Intent AI'],
        color: 'from-cyan-500 to-blue-600'
      },
      {
        id: 'gbp',
        name: 'GBP Optimizer',
        tagline: 'Google Business Profile',
        description: 'Gestionează profilul Google Business, răspunde la recenzii și crește vizibilitatea locală.',
        features: ['Sync automat profiluri', 'Răspunsuri AI la recenzii', 'Management Posts & Q&A', 'Insights & Analytics'],
        color: 'from-gold to-[#D4B57A]'
      },
      {
        id: 'indexing',
        name: 'Indexing Engine',
        tagline: 'SEO & Indexare Rapidă',
        description: 'Indexează paginile instant în Google cu IndexNow și monitorizează performanța SEO.',
        features: ['IndexNow instant push', 'Generare automată sitemap', 'Tracking poziții', 'Audit SEO tehnic'],
        color: 'from-purple-500 to-pink-600'
      }
    ],

    statsTitle: 'AUREX în Cifre',
    stats: [
      { value: '6+', label: 'Surse de Date' },
      { value: '24/7', label: 'Monitorizare' },
      { value: 'AI', label: 'Profit Scoring' },
      { value: 'Real-time', label: 'Semnale Piață' }
    ],

    integrationsTitle: 'Integrat',
    integrationsHighlight: 'Peste Tot',
    integrations: [
      { name: 'CatyAI', desc: 'Chatbot de vânzări alimentat de inteligența AUREX' },
      { name: 'Ahauros', desc: 'Platformă marketing cu analize AUREX' },
      { name: 'Guardian Dashboard', desc: 'Acces direct la toate funcțiile AUREX' }
    ],

    ctaTitle: 'Gata să folosești inteligența AI?',
    ctaSubtitle: 'Accesează AUREX Guardian direct pentru control total asupra semnalelor de piață și optimizării SEO.',
    ctaButton: 'Accesează AUREX Guardian',

    footer: {
      copyright: '© 2024 PayAi-X FZE. Toate drepturile rezervate.',
      company: 'Un produs PayAi-X'
    }
  },
  es: {
    badge: 'Infraestructura AI',
    heroTitle1: 'Powered by',
    heroTitle2: 'AUREX Guardian v3',
    heroSubtitle: 'El motor AI detrás de CatyAI — maneja inteligencia de mercado, señales SEO y análisis en tiempo real para que tu negocio siempre esté adelante.',
    heroCta: 'Acceder a AUREX Guardian',
    heroCtaSecondary: 'Saber Más',
    trustBadge1: '6+ fuentes de datos',
    trustBadge2: 'Monitoreo 24/7',
    trustBadge3: 'Señales en tiempo real',

    whatTitle: 'Qué es',
    whatHighlight: 'AUREX Guardian?',
    whatDesc: 'AUREX Guardian v3 es la infraestructura AI que alimenta CatyAI y otros productos PayAi-X. Proporciona inteligencia de mercado, optimización SEO y análisis de negocio en tiempo real.',

    featuresTitle: 'Capacidades',
    featuresHighlight: 'Principales',
    features: [
      {
        id: 'nexus',
        name: 'NEXUS',
        tagline: 'Inteligencia de Señales de Mercado',
        description: 'Descubre automáticamente keywords rentables, monitorea la competencia y encuentra oportunidades de crecimiento.',
        features: ['Google Autocomplete & Trends', 'Integración DataForSEO', 'Profit Scoring automático', 'Clasificación de Intent AI'],
        color: 'from-cyan-500 to-blue-600'
      },
      {
        id: 'gbp',
        name: 'GBP Optimizer',
        tagline: 'Google Business Profile',
        description: 'Gestiona tu perfil de Google Business, responde a reseñas y aumenta la visibilidad local.',
        features: ['Sync automático perfiles', 'Respuestas AI a reseñas', 'Gestión Posts & Q&A', 'Insights & Analytics'],
        color: 'from-gold to-[#D4B57A]'
      },
      {
        id: 'indexing',
        name: 'Indexing Engine',
        tagline: 'SEO & Indexación Rápida',
        description: 'Indexa páginas instantáneamente en Google con IndexNow y monitorea el rendimiento SEO.',
        features: ['IndexNow instant push', 'Generación automática sitemap', 'Tracking de posiciones', 'Auditoría SEO técnica'],
        color: 'from-purple-500 to-pink-600'
      }
    ],

    statsTitle: 'AUREX en Números',
    stats: [
      { value: '6+', label: 'Fuentes de Datos' },
      { value: '24/7', label: 'Monitoreo' },
      { value: 'AI', label: 'Profit Scoring' },
      { value: 'Real-time', label: 'Señales de Mercado' }
    ],

    integrationsTitle: 'Integrado',
    integrationsHighlight: 'En Todas Partes',
    integrations: [
      { name: 'CatyAI', desc: 'Chatbot de ventas alimentado por inteligencia AUREX' },
      { name: 'Ahauros', desc: 'Plataforma de marketing con análisis AUREX' },
      { name: 'Guardian Dashboard', desc: 'Acceso directo a todas las funciones AUREX' }
    ],

    ctaTitle: '¿Listo para aprovechar la inteligencia AI?',
    ctaSubtitle: 'Accede a AUREX Guardian directamente para control total sobre señales de mercado y optimización SEO.',
    ctaButton: 'Acceder a AUREX Guardian',

    footer: {
      copyright: '© 2024 PayAi-X FZE. Todos los derechos reservados.',
      company: 'Un producto PayAi-X'
    }
  }
}

export default function AurexGuardian() {
  const [lang, setLang] = useState('en')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkLang = () => {
      const stored = localStorage.getItem('catyai-lang')
      if (stored && ['en', 'ro', 'es'].includes(stored)) {
        setLang(stored)
      }
    }
    checkLang()
    const interval = setInterval(checkLang, 500)
    return () => clearInterval(interval)
  }, [])

  const t = translations[lang] || translations.en

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SEO
        title="AUREX Guardian v3 | AI Infrastructure"
        description="AUREX Guardian v3 - The AI engine powering CatyAI. Market intelligence, SEO signals, and real-time analytics for your business."
        url="https://catyai.io/aurex"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-[#1a2744]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/caty-logo.png" alt="CatyAI" className="h-10 w-10" width="40" height="40" />
            <span className="font-bold text-xl text-white">CatyAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://guardian.ahauros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-all"
            >
              {t.heroCta}
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-[#0a0a1a] to-gray-950 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/aurex-guardian-logo.webp"
              alt="AUREX Guardian v3"
              className="h-40 w-auto"
            />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t.heroTitle1}<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">{t.heroTitle2}</span>
          </h1>

          <p className="text-gray-400 text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://guardian.ahauros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
            >
              {t.heroCta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#features" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A1628]/50 text-white font-semibold text-lg rounded-2xl border border-[#1a2744] hover:bg-[#1a2744]/50 transition-all">
              {t.heroCtaSecondary}
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {[t.trustBadge1, t.trustBadge2, t.trustBadge3].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is AUREX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.whatTitle} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{t.whatHighlight}</span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed">
            {t.whatDesc}
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.featuresTitle} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{t.featuresHighlight}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.features.map((feature) => (
              <div
                key={feature.id}
                className="group relative bg-[#010A1F]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1a2744] hover:border-[#1a2744] transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{feature.name}</h3>
                    <p className={`text-sm bg-gradient-to-r ${feature.color} bg-clip-text text-transparent font-medium`}>
                      {feature.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 min-h-[48px]">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t.statsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-[#010A1F]/50 rounded-xl border border-[#1a2744]">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-gray-400 text-lg mb-8">{t.ctaSubtitle}</p>
          <a
            href="https://guardian.ahauros.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-xl rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
          >
            {t.ctaButton}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-[#010A1F] border-t border-[#1a2744]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/caty-logo.png" alt="CatyAI" className="h-8 w-8" width="32" height="32" />
            <span className="text-gray-400 text-sm">{t.footer.company}</span>
          </div>
          <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
            ← Back to CatyAI
          </Link>
        </div>
      </footer>
    </div>
  )
}
