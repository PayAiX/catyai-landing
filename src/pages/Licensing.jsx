import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Licensing() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Dual License
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Licensing & Legal Information</h1>
          <p className="text-gray-400">Open source community edition + Enterprise licensing options</p>
        </div>

        {/* Company Information */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            <h2 className="text-xl font-bold text-white">Company Information</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Company</span>
              <p className="text-white font-medium">PayAi-X FZE</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">CEO</span>
              <p className="text-white font-medium">Ioan Adrian Vitan</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Product</span>
              <p className="text-white font-medium">Caty.AI - AI Chatbot Platform</p>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Licensing Model</span>
              <p className="text-primary-400 font-medium">DUAL LICENSE</p>
            </div>
          </div>
        </div>

        {/* License Tiers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
              </svg>
            </span>
            License Tiers
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Community License */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">Community</h3>

              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-400">License:</span>
                  <span className="text-white">AGPL-3.0-only</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Research, personal use, non-commercial
                </p>
              </div>

              <Link
                to="/license-agpl"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
              >
                View Full License Text
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <div>
                <h4 className="text-white font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Use Caty.AI for personal or research projects
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Modify source code
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Share improvements back (copyleft / viral clause)
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Community-level support
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise License */}
            <div className="bg-gray-900/50 border-2 border-primary-500 rounded-xl p-6 relative">
              <div className="absolute -top-3 right-4 px-3 py-1 bg-primary-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                Most Popular
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>

              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-400">License:</span>
                  <span className="text-white">Proprietary</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-white">Custom (multi-year contracts)</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Commercial SaaS, premium support, OEM, white-label
                </p>
              </div>

              <a
                href="mailto:legal@payai-x.com"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact: legal@payai-x.com
              </a>

              <div>
                <h4 className="text-white font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full commercial SaaS rights
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Proprietary modifications (no copyleft)
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom integrations & SLAs
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    24/7 priority support
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    White-label / OEM options
                  </li>
                  <li className="flex items-start gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No AGPL obligations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Protected Intellectual Property */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            Protected Intellectual Property
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-white font-medium">AI Intent Detection Engine:</span>
                <span className="text-gray-400 ml-2">Proprietary algorithm for understanding visitor intent and buying signals</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-white font-medium">Lead Capture System:</span>
                <span className="text-gray-400 ml-2">Smart lead qualification and scoring methodology</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-white font-medium">Knowledge Base Training:</span>
                <span className="text-gray-400 ml-2">Custom AI fine-tuning for business-specific responses</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-white font-medium">Conversation Analytics:</span>
                <span className="text-gray-400 ml-2">Proprietary metrics for measuring engagement and conversion</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-white font-medium">Human Handoff Protocol:</span>
                <span className="text-gray-400 ml-2">Intelligent escalation system for seamless agent transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Questions About Licensing?</h3>
          <p className="text-gray-400 mb-6">
            Contact our legal team for enterprise licensing inquiries, custom agreements, or any questions about our dual licensing model.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:legal@payai-x.com"
              className="btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              legal@payai-x.com
            </a>
            <a
              href="mailto:enterprise@payai-x.com"
              className="btn-secondary"
            >
              Enterprise Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Licensing
