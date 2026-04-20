// AUREX Guardian v3 + NEXUS Promotional Section
// Promotes the main products across all PayAi-X landing pages

const features = [
  {
    id: 'nexus',
    name: 'NEXUS',
    tagline: 'Market Signals Intelligence',
    description: 'Descopera automat keywords profitabile, monitorizeaza competitia si gaseste oportunitati de crestere.',
    features: [
      'Google Autocomplete & Trends',
      'DataForSEO integration',
      'Profit Scoring automat',
      'Intent Classification AI'
    ],
    color: 'from-cyan-500 to-blue-600',
    icon: 'signal'
  },
  {
    id: 'gbp',
    name: 'GBP Optimizer',
    tagline: 'Google Business Profile',
    description: 'Gestioneaza profilul Google Business, raspunde la recenzii si creste vizibilitatea locala.',
    features: [
      'Sync automat profiluri',
      'Raspunsuri AI la recenzii',
      'Posts & Q&A management',
      'Insights & Analytics'
    ],
    color: 'from-gold to-[#D4B57A]',
    icon: 'map'
  },
  {
    id: 'indexing',
    name: 'Indexing Engine',
    tagline: 'SEO & Indexare Rapida',
    description: 'Indexeaza paginile instant in Google cu IndexNow si monitorizeaza performanta SEO.',
    features: [
      'IndexNow instant push',
      'Sitemap auto-generation',
      'Rank tracking',
      'Technical SEO audit'
    ],
    color: 'from-purple-500 to-pink-600',
    icon: 'search'
  }
]

// Icons
const SignalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const MapIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const getIcon = (type) => {
  switch (type) {
    case 'signal': return <SignalIcon />
    case 'map': return <MapIcon />
    case 'search': return <SearchIcon />
    default: return <SignalIcon />
  }
}

export default function AurexPromo() {
  return (
    <section id="aurex" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-[#0a0a1a] to-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header with AUREX Guardian Logo */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/aurex-guardian-logo.webp"
              alt="AUREX Guardian v3"
              className="h-32 w-auto"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Powered by <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">AUREX Guardian v3</span>
          </h2>
          <p className="text-sm font-semibold tracking-widest uppercase text-gold/70 mb-4">
            The AI Engine Powering CatyAI
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AUREX Guardian is the underlying AI infrastructure behind CatyAI — handling market intelligence, SEO signals, and real-time analytics so your business always stays ahead.
          </p>

          {/* CTA to Guardian */}
          <div className="mt-6">
            <a
              href="https://guardian.ahauros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Acceseaza AUREX Guardian
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-[#010A1F]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1a2744] hover:border-[#1a2744] transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{feature.name}</h3>
                  <p className={`text-sm bg-gradient-to-r ${feature.color} bg-clip-text text-transparent font-medium`}>
                    {feature.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 min-h-[48px]">
                {feature.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-2">
                {feature.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '6+', label: 'Surse de date' },
            { value: '24/7', label: 'Monitoring' },
            { value: 'AI', label: 'Profit Scoring' },
            { value: 'Real-time', label: 'Market Signals' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-[#010A1F]/30 rounded-xl border border-[#1a2744]/50">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
