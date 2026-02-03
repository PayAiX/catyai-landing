import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'https://api.catyai.io'

// Translations for 5 languages
const translations = {
  en: {
    badge: 'Free AI Analysis',
    title: 'Discover Your',
    titleHighlight: "Website's Potential",
    subtitle: 'Enter your website URL and get instant AI analysis with ROI projections, personalized demo, and optimization recommendations.',
    placeholder: 'example.com or https://example.com',
    analyzeButton: 'Analyze Free',
    analyzing: 'Analyzing...',
    steps: [
      { text: 'Connecting to site...', icon: '🌐' },
      { text: 'Scanning pages...', icon: '📄' },
      { text: 'Detecting products...', icon: '🛍️' },
      { text: 'AI Analysis...', icon: '🤖' },
      { text: 'Generating ROI report...', icon: '📊' }
    ],
    analysisComplete: 'Analysis complete for',
    roiTitle: 'Estimated ROI with Caty.AI',
    leadsMonth: 'Leads / month',
    additionalRevenue: 'Additional Revenue',
    supportHours: 'Support hours saved',
    supportSavings: 'Support savings',
    totalAnnualValue: 'Total estimated annual value',
    perMonth: 'Per month',
    whatCatySolves: 'What Caty Can Solve',
    opportunities: 'Opportunities',
    demoConversation: 'Demo Conversation',
    faqTitle: 'Frequently asked visitor questions',
    recommendedPlan: 'Recommended plan',
    startFreeTrial: 'Start Free 14 Days',
    noCreditCard: 'No credit card. Cancel anytime.',
    analyzeAnother: '← Analyze another site',
    trustFree: 'Free analysis',
    trust30sec: '30 seconds',
    trustNoReg: 'No registration',
    backHome: 'Back to Home',
    errorRequired: 'Please enter your website URL',
    errorInvalid: 'Invalid URL format',
    errorFailed: 'Analysis failed. Please try again.'
  },
  ro: {
    badge: 'Analiză AI Gratuită',
    title: 'Descoperă Potențialul',
    titleHighlight: 'Site-ului Tău',
    subtitle: 'Introdu URL-ul site-ului tău și primești instant o analiză AI cu ROI estimat, demo personalizat și recomandări de optimizare.',
    placeholder: 'exemplu.ro sau https://exemplu.ro',
    analyzeButton: 'Analizează Gratis',
    analyzing: 'Analizez...',
    steps: [
      { text: 'Conectare la site...', icon: '🌐' },
      { text: 'Scanare pagini...', icon: '📄' },
      { text: 'Detectare produse...', icon: '🛍️' },
      { text: 'Analiză AI...', icon: '🤖' },
      { text: 'Generare raport ROI...', icon: '📊' }
    ],
    analysisComplete: 'Analiză completă pentru',
    roiTitle: 'ROI Estimat cu Caty.AI',
    leadsMonth: 'Lead-uri / lună',
    additionalRevenue: 'Venit adițional',
    supportHours: 'Ore suport economisite',
    supportSavings: 'Economii suport',
    totalAnnualValue: 'Valoare totală anuală estimată',
    perMonth: 'Per lună',
    whatCatySolves: 'Ce poate rezolva Caty',
    opportunities: 'Oportunități',
    demoConversation: 'Demo Conversație',
    faqTitle: 'Întrebări frecvente de la vizitatori',
    recommendedPlan: 'Plan recomandat',
    startFreeTrial: 'Începe Gratuit 14 Zile',
    noCreditCard: 'Fără card de credit. Anulează oricând.',
    analyzeAnother: '← Analizează alt site',
    trustFree: 'Analiză gratuită',
    trust30sec: '30 secunde',
    trustNoReg: 'Fără înregistrare',
    backHome: 'Înapoi la Home',
    errorRequired: 'Te rugăm să introduci URL-ul site-ului tău',
    errorInvalid: 'Format URL invalid',
    errorFailed: 'Analiza a eșuat. Te rugăm să încerci din nou.'
  },
  es: {
    badge: 'Análisis AI Gratis',
    title: 'Descubre el Potencial',
    titleHighlight: 'de Tu Sitio Web',
    subtitle: 'Ingresa la URL de tu sitio web y obtén análisis AI instantáneo con proyecciones de ROI, demo personalizada y recomendaciones.',
    placeholder: 'ejemplo.com o https://ejemplo.com',
    analyzeButton: 'Analizar Gratis',
    analyzing: 'Analizando...',
    steps: [
      { text: 'Conectando al sitio...', icon: '🌐' },
      { text: 'Escaneando páginas...', icon: '📄' },
      { text: 'Detectando productos...', icon: '🛍️' },
      { text: 'Análisis AI...', icon: '🤖' },
      { text: 'Generando informe ROI...', icon: '📊' }
    ],
    analysisComplete: 'Análisis completo para',
    roiTitle: 'ROI Estimado con Caty.AI',
    leadsMonth: 'Leads / mes',
    additionalRevenue: 'Ingresos adicionales',
    supportHours: 'Horas de soporte ahorradas',
    supportSavings: 'Ahorro en soporte',
    totalAnnualValue: 'Valor anual total estimado',
    perMonth: 'Por mes',
    whatCatySolves: 'Lo que Caty Puede Resolver',
    opportunities: 'Oportunidades',
    demoConversation: 'Demo de Conversación',
    faqTitle: 'Preguntas frecuentes de visitantes',
    recommendedPlan: 'Plan recomendado',
    startFreeTrial: 'Empieza Gratis 14 Días',
    noCreditCard: 'Sin tarjeta de crédito. Cancela cuando quieras.',
    analyzeAnother: '← Analizar otro sitio',
    trustFree: 'Análisis gratis',
    trust30sec: '30 segundos',
    trustNoReg: 'Sin registro',
    backHome: 'Volver al Inicio',
    errorRequired: 'Por favor ingresa la URL de tu sitio',
    errorInvalid: 'Formato de URL inválido',
    errorFailed: 'El análisis falló. Por favor intenta de nuevo.'
  },
  pt: {
    badge: 'Análise AI Grátis',
    title: 'Descubra o Potencial',
    titleHighlight: 'do Seu Site',
    subtitle: 'Digite a URL do seu site e receba análise AI instantânea com projeções de ROI, demo personalizada e recomendações.',
    placeholder: 'exemplo.com ou https://exemplo.com',
    analyzeButton: 'Analisar Grátis',
    analyzing: 'Analisando...',
    steps: [
      { text: 'Conectando ao site...', icon: '🌐' },
      { text: 'Escaneando páginas...', icon: '📄' },
      { text: 'Detectando produtos...', icon: '🛍️' },
      { text: 'Análise AI...', icon: '🤖' },
      { text: 'Gerando relatório ROI...', icon: '📊' }
    ],
    analysisComplete: 'Análise completa para',
    roiTitle: 'ROI Estimado com Caty.AI',
    leadsMonth: 'Leads / mês',
    additionalRevenue: 'Receita adicional',
    supportHours: 'Horas de suporte economizadas',
    supportSavings: 'Economia em suporte',
    totalAnnualValue: 'Valor anual total estimado',
    perMonth: 'Por mês',
    whatCatySolves: 'O que Caty Pode Resolver',
    opportunities: 'Oportunidades',
    demoConversation: 'Demo de Conversa',
    faqTitle: 'Perguntas frequentes dos visitantes',
    recommendedPlan: 'Plano recomendado',
    startFreeTrial: 'Comece Grátis 14 Dias',
    noCreditCard: 'Sem cartão de crédito. Cancele quando quiser.',
    analyzeAnother: '← Analisar outro site',
    trustFree: 'Análise grátis',
    trust30sec: '30 segundos',
    trustNoReg: 'Sem registro',
    backHome: 'Voltar ao Início',
    errorRequired: 'Por favor digite a URL do seu site',
    errorInvalid: 'Formato de URL inválido',
    errorFailed: 'A análise falhou. Por favor tente novamente.'
  },
  fr: {
    badge: 'Analyse AI Gratuite',
    title: 'Découvrez le Potentiel',
    titleHighlight: 'de Votre Site',
    subtitle: 'Entrez l\'URL de votre site et obtenez instantanément une analyse AI avec projections ROI, démo personnalisée et recommandations.',
    placeholder: 'exemple.com ou https://exemple.com',
    analyzeButton: 'Analyser Gratuit',
    analyzing: 'Analyse en cours...',
    steps: [
      { text: 'Connexion au site...', icon: '🌐' },
      { text: 'Scan des pages...', icon: '📄' },
      { text: 'Détection des produits...', icon: '🛍️' },
      { text: 'Analyse AI...', icon: '🤖' },
      { text: 'Génération du rapport ROI...', icon: '📊' }
    ],
    analysisComplete: 'Analyse terminée pour',
    roiTitle: 'ROI Estimé avec Caty.AI',
    leadsMonth: 'Leads / mois',
    additionalRevenue: 'Revenus supplémentaires',
    supportHours: 'Heures de support économisées',
    supportSavings: 'Économies support',
    totalAnnualValue: 'Valeur annuelle totale estimée',
    perMonth: 'Par mois',
    whatCatySolves: 'Ce que Caty Peut Résoudre',
    opportunities: 'Opportunités',
    demoConversation: 'Démo de Conversation',
    faqTitle: 'Questions fréquentes des visiteurs',
    recommendedPlan: 'Plan recommandé',
    startFreeTrial: 'Commencer Gratuit 14 Jours',
    noCreditCard: 'Sans carte de crédit. Annulez quand vous voulez.',
    analyzeAnother: '← Analyser un autre site',
    trustFree: 'Analyse gratuite',
    trust30sec: '30 secondes',
    trustNoReg: 'Sans inscription',
    backHome: 'Retour à l\'Accueil',
    errorRequired: 'Veuillez entrer l\'URL de votre site',
    errorInvalid: 'Format d\'URL invalide',
    errorFailed: 'L\'analyse a échoué. Veuillez réessayer.'
  }
}

// Language options
const languageOptions = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'ro', flag: '🇷🇴', name: 'Română' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'pt', flag: '🇵🇹', name: 'Português' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' }
]

// Loading spinner
const Spinner = () => (
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

// Check icon
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

// Arrow icon
const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

// Format currency
const formatCurrency = (value) => {
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(1)}k`
  }
  return `€${value}`
}

// Demo Chat Component
function DemoChat({ demo, businessName, t }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const conversations = demo?.conversations || []

  if (!demo) return null

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-md mx-auto">
      <div className="bg-primary-600 px-4 py-3 flex items-center gap-3">
        <img src="/images/logo1.png" alt="Caty" className="w-8 h-8 rounded-full" />
        <div>
          <p className="text-white font-medium text-sm">Caty - {businessName}</p>
          <p className="text-primary-200 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Online
          </p>
        </div>
      </div>

      <div className="p-4 space-y-3 min-h-[250px]">
        <div className="flex gap-2">
          <img src="/images/logo1.png" alt="Caty" className="w-6 h-6 rounded-full flex-shrink-0" />
          <div className="bg-gray-800 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
            <p className="text-gray-200 text-sm">{demo.greeting}</p>
          </div>
        </div>

        {conversations[currentIndex] && (
          <>
            <div className="flex justify-end">
              <div className="bg-primary-600 rounded-lg rounded-tr-none px-3 py-2 max-w-[85%]">
                <p className="text-white text-sm">{conversations[currentIndex].user}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <img src="/images/logo1.png" alt="Caty" className="w-6 h-6 rounded-full flex-shrink-0" />
              <div className="bg-gray-800 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
                <p className="text-gray-200 text-sm">{conversations[currentIndex].assistant}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {conversations.length > 1 && (
        <div className="px-4 pb-4 flex gap-2 justify-center">
          {conversations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-primary-500 w-4' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}

      <div className="px-4 pb-4">
        <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
          <span className="text-gray-500 text-sm flex-1">Type a message...</span>
          <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ROI Card Component
function ROICard({ title, current, improved, unit = '', icon }) {
  const increase = improved - current
  const percentIncrease = current > 0 ? Math.round((increase / current) * 100) : 0

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-gray-500 text-xs line-through">{unit}{current.toLocaleString()}</p>
          <p className="text-2xl font-bold text-white">{unit}{improved.toLocaleString()}</p>
        </div>
        <div className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
          +{percentIncrease}%
        </div>
      </div>
    </div>
  )
}

// Language Selector Component
function LanguageSelector({ lang, setLang }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-6">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          onClick={() => setLang(option.code)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
            lang === option.code
              ? 'bg-primary-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span>{option.flag}</span>
          <span className="hidden sm:inline">{option.name}</span>
        </button>
      ))}
    </div>
  )
}

// Main Site Analyzer Component
export default function SiteAnalyzer() {
  const [url, setUrl] = useState('')
  const [lang, setLang] = useState('en')
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const t = translations[lang] || translations.en

  const handleAnalyze = async (e) => {
    e.preventDefault()

    if (!url.trim()) {
      setError(t.errorRequired)
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)
    setCurrentStep(0)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < t.steps.length - 1) return prev + 1
        return prev
      })
    }, 3000)

    try {
      const response = await fetch(`${API_URL}/api/public/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url.trim(), lang })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.errorFailed)
      }

      clearInterval(stepInterval)
      setCurrentStep(t.steps.length - 1)
      setResult(data)

    } catch (err) {
      clearInterval(stepInterval)
      setError(err.message || t.errorFailed)
    } finally {
      setLoading(false)
    }
  }

  const getRecommendedPlan = () => {
    if (!result) return null
    const planMap = {
      'starter': { name: 'Starter', price: '149', setup: '499' },
      'growth': { name: 'Growth', price: '299', setup: '999' },
      'business': { name: 'Business', price: '499', setup: '1999' }
    }
    return planMap[result.recommendations?.plan] || planMap.starter
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
            {t.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            {t.title}
            <span className="gradient-text block mt-1">{t.titleHighlight}</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* URL Input Form */}
        {!result && (
          <form onSubmit={handleAnalyze} className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.placeholder}
                  disabled={loading}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Spinner />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <span>{t.analyzeButton}</span>
                    <ArrowIcon />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
          </form>
        )}

        {/* Loading Progress */}
        {loading && (
          <div className="max-w-md mx-auto">
            <div className="card">
              <div className="space-y-4">
                {t.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      index <= currentStep ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <span className={`text-sm ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>
                      {step.text}
                    </span>
                    {index < currentStep && <CheckIcon />}
                    {index === currentStep && <Spinner />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-fadeIn">

            {/* Business Info Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-4">
                <CheckIcon />
                {t.analysisComplete} {result.domain}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {result.business?.name || result.domain}
              </h2>
              <p className="text-gray-400">
                {result.business?.industry} • {result.business?.target_audience}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

              {/* Left Column - ROI & Insights */}
              <div className="space-y-6">

                {/* ROI Cards */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span>📈</span> {t.roiTitle}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <ROICard
                      title={t.leadsMonth}
                      current={result.roi?.leads?.current || 0}
                      improved={result.roi?.leads?.with_caty || 0}
                      icon="👥"
                    />
                    <ROICard
                      title={t.additionalRevenue}
                      current={0}
                      improved={result.roi?.revenue?.additional_monthly || 0}
                      unit="€"
                      icon="💰"
                    />
                    <ROICard
                      title={t.supportHours}
                      current={0}
                      improved={result.roi?.support?.hours_saved || 0}
                      icon="⏱️"
                    />
                    <ROICard
                      title={t.supportSavings}
                      current={0}
                      improved={result.roi?.support?.cost_saved || 0}
                      unit="€"
                      icon="💵"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-xl p-4 border border-primary-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{t.totalAnnualValue}</p>
                        <p className="text-3xl font-bold text-white">
                          {formatCurrency(result.roi?.total_yearly_value || 0)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{t.perMonth}</p>
                        <p className="text-xl font-semibold text-primary-400">
                          {formatCurrency(result.roi?.total_monthly_value || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problems & Opportunities */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🎯</span> {t.whatCatySolves}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {(result.insights?.problems || []).slice(0, 4).map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-red-400 text-lg">✗</span>
                        <span className="text-gray-300 text-sm">{problem}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-lg font-medium text-white mb-3">{t.opportunities}</h4>
                  <div className="space-y-3">
                    {(result.insights?.opportunities || []).slice(0, 4).map((opp, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-green-400 text-lg">✓</span>
                        <span className="text-gray-300 text-sm">{opp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Demo & CTA */}
              <div className="space-y-6">

                {/* Demo Chat */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span>💬</span> {t.demoConversation}
                  </h3>
                  <DemoChat
                    demo={result.demo}
                    businessName={result.business?.name || result.domain}
                    t={t}
                  />
                </div>

                {/* Key Questions */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>❓</span> {t.faqTitle}
                  </h3>
                  <div className="space-y-2">
                    {(result.insights?.key_questions || []).map((q, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800/50 rounded-lg px-3 py-2 text-gray-300 text-sm border border-gray-700"
                      >
                        "{q}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t.recommendedPlan}: {getRecommendedPlan()?.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-3xl font-bold text-white">€{getRecommendedPlan()?.price}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">
                      + €{getRecommendedPlan()?.setup} setup
                    </p>

                    <a
                      href={`https://app.catyai.io/signup?plan=${result.recommendations?.plan || 'starter'}&domain=${encodeURIComponent(result.domain)}&lang=${lang}`}
                      className="btn-primary w-full py-4 text-lg mb-3"
                    >
                      {t.startFreeTrial}
                    </a>

                    <p className="text-gray-500 text-xs">
                      {t.noCreditCard}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analyze Another */}
            <div className="text-center pt-8">
              <button
                onClick={() => {
                  setResult(null)
                  setUrl('')
                }}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                {t.analyzeAnother}
              </button>
            </div>
          </div>
        )}

        {/* Trust indicators */}
        {!loading && !result && (
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.trustFree}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.trust30sec}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>{t.trustNoReg}</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating back link */}
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
