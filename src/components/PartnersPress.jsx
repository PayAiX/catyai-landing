// Partners & Press Section
// Shows media coverage and technology partners

const pressLinks = [
  {
    id: 1,
    name: 'Digital Romania',
    logo: '/images/partners/digital-romania.png',
    fallbackLetter: 'DR',
    url: 'https://www.digitalromania.ro/solutii-digitale/catyai',
    description: 'Chatbot AI pentru site & Secretara AI pe WhatsApp',
    color: 'from-[#1A3F7A] to-[#5B8DEF]'
  },
  {
    id: 2,
    name: 'CatyAI pe Medium',
    fallbackLetter: 'M',
    url: 'https://medium.com/@adrianvitan/catyai-a406bcb42200',
    description: 'Articol complet despre CatyAI',
    color: 'from-gold to-[#D4B57A]'
  },
  {
    id: 3,
    name: 'AUREX Guardian',
    fallbackLetter: 'M',
    url: 'https://medium.com/@adrianvitan/aurex-guardian-f3939e80d126',
    description: 'Market Intelligence Platform',
    color: 'from-gold to-[#D4B57A]'
  },
  {
    id: 4,
    name: 'Ahauros AEOS',
    fallbackLetter: 'M',
    url: 'https://medium.com/@adrianvitan/ahauros-aeos-catyai-inteligența-artificială-economică-pentru-românia-digitală-89108e433672',
    description: 'AI Economic Operating System pentru Romania',
    color: 'from-cyan-600 to-blue-600'
  },
  {
    id: 5,
    name: 'Digital Romania',
    fallbackLetter: 'DR',
    url: 'https://www.digitalromania.ro/solutii-digitale/aurex',
    description: 'Market & Competitor Intelligence',
    color: 'from-orange-600 to-red-600'
  }
]

const partners = [
  {
    id: 1,
    name: 'Digital Romania',
    logo: '/images/partners/digital-romania.png',
    fallbackLetter: 'DR',
    url: 'https://www.digitalromania.ro/partener/payai-x',
    description: 'Platforma de transformare digitala',
    type: 'Distribuitor Oficial',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'IT eXclusiv',
    logo: '/images/partners/it-exclusiv.png',
    fallbackLetter: 'IT',
    url: 'https://www.itexclusiv.ro/',
    description: 'Web Design & Digital Marketing din 2008',
    type: 'Partener Tehnologic',
    color: 'from-orange-500 to-red-500'
  }
]

// External link icon
const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

// Newspaper icon for press
const NewspaperIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
)

// Handshake icon for partners
const HandshakeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

export default function PartnersPress() {
  return (
    <section id="partners" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#010A1F]/30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            In presa & <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">Parteneri</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Citeste despre CatyAI si descopera partenerii nostri de incredere
          </p>
        </div>

        {/* Press Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gold/20 rounded-lg">
              <NewspaperIcon />
            </div>
            <h3 className="text-lg font-semibold text-white">Articole & Recenzii</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {pressLinks.map((press) => (
              <a
                key={press.id}
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-[#0A1628]/50 rounded-xl border border-[#1a2744]/50 hover:border-gold/50 hover:bg-[#0A1628]/80 transition-all duration-300"
              >
                {/* Logo placeholder */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${press.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {press.fallbackLetter}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white group-hover:text-gold transition-colors truncate">
                      {press.name}
                    </span>
                    <ExternalLinkIcon />
                  </div>
                  <p className="text-gray-500 text-sm truncate">{press.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gold/20 rounded-lg">
              <HandshakeIcon />
            </div>
            <h3 className="text-lg font-semibold text-white">Parteneri Tehnologici</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-[#0A1628]/50 rounded-xl border border-[#1a2744]/50 hover:border-gold/50 hover:bg-[#0A1628]/80 transition-all duration-300"
              >
                {/* Logo placeholder */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-bold shrink-0`}>
                  {partner.fallbackLetter}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white group-hover:text-gold transition-colors">
                      {partner.name}
                    </span>
                    <ExternalLinkIcon />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{partner.description}</p>
                  <span className="inline-block px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full">
                    {partner.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Become a partner CTA */}
        <div className="text-center mt-10 pt-8 border-t border-[#1a2744]">
          <p className="text-gray-500 text-sm mb-3">Vrei sa devii partener CatyAI?</p>
          <a
            href="mailto:contact@payai-x.com?subject=Parteneriat%20CatyAI"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-medium transition-colors"
          >
            Contacteaza-ne
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
