import { useEffect } from 'react'

function LicenseAGPL() {
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
            Licensing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Software License</h1>
          <p className="text-gray-400">Proprietary Software License Agreement</p>
        </div>

        {/* Product Info Banner */}
        <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white">Caty.AI | PayAi-X FZE</h2>
            <p className="text-primary-400 mt-2">Proprietary + Enterprise Licensing</p>
          </div>
        </div>

        {/* Section 1 - Proprietary License */}
        <div className="bg-gray-900/50 border border-primary-500/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">1</span>
            PROPRIETARY LICENSE
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Software:</span>
              <p className="text-white font-medium">Caty.AI Platform</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Owner:</span>
              <p className="text-white font-medium">PayAi-X FZE (Dubai, UAE)</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">License Type:</span>
              <p className="text-white">Proprietary / Closed Source</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Access:</span>
              <p className="text-white">SaaS Subscription</p>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4">
            Caty.AI is proprietary software owned by PayAi-X FZE. All rights reserved. The software, including its source code, algorithms, designs, and documentation, is protected by intellectual property laws and international treaties.
          </p>

          <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
            <h3 className="text-white font-semibold mb-2">Usage Rights</h3>
            <p className="text-gray-400 text-sm">
              By subscribing to Caty.AI, you receive a non-exclusive, non-transferable license to use the platform according to your subscription plan. You may not copy, modify, distribute, sell, or sublicense the software.
            </p>
          </div>
        </div>

        {/* Section 2 - Enterprise License */}
        <div className="bg-gray-900/50 border border-primary-500/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">2</span>
            ENTERPRISE LICENSE
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Edition:</span>
              <p className="text-white font-medium">Caty.AI Enterprise</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Pricing:</span>
              <p className="text-white">Custom (annual contracts)</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">For:</span>
              <p className="text-white">Large organizations, custom deployments</p>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400 text-sm">Contact:</span>
              <a href="mailto:enterprise@payai-x.com" className="text-primary-400 hover:text-primary-300">enterprise@payai-x.com</a>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4">
            Enterprise licenses provide extended rights and capabilities for large organizations with specific requirements.
          </p>

          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Dedicated infrastructure
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Custom integrations
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              SLA guarantees
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              24/7 priority support
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              White-label options
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              On-premise deployment
            </div>
          </div>
        </div>

        {/* Section 3 - Protected IP */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">3</span>
            INTELLECTUAL PROPERTY
          </h2>

          <p className="text-gray-300 text-sm mb-4">
            The following components are proprietary and protected intellectual property of PayAi-X FZE:
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Multi-agent AI architecture</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>FraudAI Shield system</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>WhatsApp Zero integration</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Conversation AI algorithms</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Training data & models</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Platform UI/UX design</span>
            </div>
          </div>
        </div>

        {/* Section 4 - Restrictions */}
        <div className="bg-gray-900/50 border border-red-500/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-lg text-red-400 text-sm font-bold">4</span>
            RESTRICTIONS
          </h2>

          <p className="text-gray-300 text-sm mb-4">
            Without explicit written permission from PayAi-X FZE, you may NOT:
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Copy, reproduce, or distribute the software</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Reverse engineer, decompile, or disassemble</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Create derivative works or competing products</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Sublicense, rent, lease, or sell access</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300 text-sm">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Remove or alter proprietary notices</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/30 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Questions about licensing?</h2>
          <p className="text-gray-400 mb-4">Contact our team for licensing inquiries or enterprise agreements.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:legal@payai-x.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              legal@payai-x.com
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PayAi-X FZE. All rights reserved.</p>
          <p className="mt-1">Dubai, United Arab Emirates</p>
        </div>
      </div>
    </section>
  )
}

export default LicenseAGPL
