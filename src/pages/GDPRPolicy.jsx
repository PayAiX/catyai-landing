import { useEffect } from 'react'

function GDPRPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <img src="/images/logo1.png" alt="Caty.AI" className="h-10 w-10 rounded-full" />
              <span className="text-xl font-bold text-white">Caty.AI</span>
            </a>
            <a href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </a>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              GDPR Compliant
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">GDPR Compliance Policy</h1>
            <p className="text-gray-400">Effective Date: January 1, 2025</p>
            <p className="text-gray-400">Last Updated: January 1, 2025</p>
          </div>

          <div className="prose prose-invert prose-gray max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Caty.AI is committed to protecting and respecting your privacy in accordance with the
                  General Data Protection Regulation (GDPR) (EU) 2016/679. This GDPR Policy explains how
                  we collect, process, and protect personal data of individuals in the European Union (EU)
                  and European Economic Area (EEA).
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  This policy should be read alongside our <a href="/privacy" className="text-primary-400 hover:text-primary-300">Privacy Policy</a> and
                  <a href="/terms" className="text-primary-400 hover:text-primary-300 ml-1">Terms of Service</a>.
                </p>
              </div>
            </section>

            {/* Table of Contents */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
              <nav className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <ol className="list-decimal list-inside space-y-2 text-primary-400">
                  <li><a href="#data-controller" className="hover:text-primary-300 transition-colors">Data Controller Information</a></li>
                  <li><a href="#legal-basis" className="hover:text-primary-300 transition-colors">Legal Basis for Processing</a></li>
                  <li><a href="#data-categories" className="hover:text-primary-300 transition-colors">Categories of Personal Data</a></li>
                  <li><a href="#processing-purposes" className="hover:text-primary-300 transition-colors">Purposes of Processing</a></li>
                  <li><a href="#data-subject-rights" className="hover:text-primary-300 transition-colors">Data Subject Rights</a></li>
                  <li><a href="#data-retention" className="hover:text-primary-300 transition-colors">Data Retention Periods</a></li>
                  <li><a href="#international-transfers" className="hover:text-primary-300 transition-colors">International Data Transfers</a></li>
                  <li><a href="#data-security" className="hover:text-primary-300 transition-colors">Data Security Measures</a></li>
                  <li><a href="#data-processors" className="hover:text-primary-300 transition-colors">Sub-Processors and Third Parties</a></li>
                  <li><a href="#cookie-consent" className="hover:text-primary-300 transition-colors">Cookie Consent and ePrivacy</a></li>
                  <li><a href="#dpo-contact" className="hover:text-primary-300 transition-colors">Data Protection Officer</a></li>
                  <li><a href="#supervisory-authority" className="hover:text-primary-300 transition-colors">Supervisory Authority</a></li>
                  <li><a href="#dpa" className="hover:text-primary-300 transition-colors">Data Processing Agreement</a></li>
                  <li><a href="#policy-updates" className="hover:text-primary-300 transition-colors">Policy Updates</a></li>
                </ol>
              </nav>
            </section>

            {/* Section 1: Data Controller */}
            <section id="data-controller" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">1</span>
                Data Controller Information
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.1 Who We Are</h3>
                  <p className="text-gray-300 mb-4">
                    For the purposes of the GDPR, the data controller is:
                  </p>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-white font-semibold">Caty.AI</p>
                    <p className="text-gray-300">[Company Registration Number]</p>
                    <p className="text-gray-300">[Registered Address]</p>
                    <p className="text-gray-300">[City, Country, Postal Code]</p>
                    <p className="text-gray-300 mt-2">
                      Website: <a href="https://catyai.io" className="text-primary-400 hover:text-primary-300">https://catyai.io</a>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.2 Data Controller vs. Data Processor</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                      <h4 className="font-semibold text-primary-400 mb-2">When Caty.AI is the Data Controller</h4>
                      <p className="text-gray-300 text-sm">
                        We act as the data controller when we process personal data of our direct customers
                        (business users who sign up for our services), including account information, payment
                        details, and communications with us.
                      </p>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">When Caty.AI is the Data Processor</h4>
                      <p className="text-gray-300 text-sm">
                        We act as a data processor when we process personal data of end-users who interact
                        with chatbot widgets deployed by our business customers. In this case, our business
                        customer is the data controller and we process data on their behalf under a Data
                        Processing Agreement (DPA).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Legal Basis */}
            <section id="legal-basis" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">2</span>
                Legal Basis for Processing
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  Under Article 6 of the GDPR, we process personal data based on the following legal bases:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-primary-500">
                    <h4 className="font-semibold text-white mb-2">Contract Performance (Art. 6(1)(b))</h4>
                    <p className="text-gray-300 text-sm mb-2">Processing necessary for the performance of a contract:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                      <li>Account creation and management</li>
                      <li>Providing our chatbot widget services</li>
                      <li>Processing payments and subscriptions</li>
                      <li>Customer support and communications</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-white mb-2">Consent (Art. 6(1)(a))</h4>
                    <p className="text-gray-300 text-sm mb-2">Processing based on your explicit consent:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                      <li>Marketing communications and newsletters</li>
                      <li>Non-essential cookies and tracking</li>
                      <li>Participation in surveys or research</li>
                      <li>Processing of special categories of data (if applicable)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-white mb-2">Legitimate Interests (Art. 6(1)(f))</h4>
                    <p className="text-gray-300 text-sm mb-2">Processing necessary for our legitimate interests:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                      <li>Improving and developing our services</li>
                      <li>Preventing fraud and ensuring security</li>
                      <li>Analytics and service optimization</li>
                      <li>Direct marketing to existing customers (with opt-out)</li>
                    </ul>
                    <p className="text-gray-500 text-xs mt-2">
                      We always balance our interests against your rights and freedoms.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-white mb-2">Legal Obligation (Art. 6(1)(c))</h4>
                    <p className="text-gray-300 text-sm mb-2">Processing required to comply with legal obligations:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                      <li>Tax and accounting records</li>
                      <li>Responding to lawful requests from authorities</li>
                      <li>Data breach notifications</li>
                      <li>Compliance with anti-money laundering regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Data Categories */}
            <section id="data-categories" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">3</span>
                Categories of Personal Data
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-white font-semibold">Category</th>
                        <th className="py-3 px-4 text-white font-semibold">Data Types</th>
                        <th className="py-3 px-4 text-white font-semibold">Legal Basis</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Identity Data</td>
                        <td className="py-3 px-4">Name, username, company name</td>
                        <td className="py-3 px-4">Contract</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Contact Data</td>
                        <td className="py-3 px-4">Email address, phone number, billing address</td>
                        <td className="py-3 px-4">Contract</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Financial Data</td>
                        <td className="py-3 px-4">Payment card details, billing history</td>
                        <td className="py-3 px-4">Contract</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Transaction Data</td>
                        <td className="py-3 px-4">Subscription details, payment records</td>
                        <td className="py-3 px-4">Contract / Legal</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Technical Data</td>
                        <td className="py-3 px-4">IP address, browser type, device information</td>
                        <td className="py-3 px-4">Legitimate Interest</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Usage Data</td>
                        <td className="py-3 px-4">Service usage, feature interactions, analytics</td>
                        <td className="py-3 px-4">Legitimate Interest</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 font-medium text-white">Conversation Data</td>
                        <td className="py-3 px-4">Chat messages, AI interactions</td>
                        <td className="py-3 px-4">Contract</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-white">Marketing Data</td>
                        <td className="py-3 px-4">Communication preferences, consent records</td>
                        <td className="py-3 px-4">Consent</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    <strong>Special Categories of Data:</strong> We do not intentionally collect special
                    categories of personal data (such as racial or ethnic origin, political opinions,
                    religious beliefs, health data, or sexual orientation). If such data is inadvertently
                    provided through chat conversations, it will be processed only as necessary and deleted
                    as soon as practicable.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Processing Purposes */}
            <section id="processing-purposes" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">4</span>
                Purposes of Processing
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">4.1 Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Providing and maintaining our AI chatbot services</li>
                    <li>Processing and managing user accounts</li>
                    <li>Generating AI responses and conversation processing</li>
                    <li>Creating analytics reports and lead information</li>
                    <li>Providing customer support</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">4.2 AI Processing</h3>
                  <p className="text-gray-300 mb-4">We use artificial intelligence to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Process natural language and understand user queries</li>
                    <li>Generate contextually relevant responses</li>
                    <li>Detect user intent and sentiment</li>
                    <li>Improve response accuracy based on provided training data</li>
                  </ul>
                  <div className="mt-4 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                    <p className="text-primary-300 text-sm">
                      <strong>AI Training:</strong> We do NOT use your personal data or conversation data
                      to train our general AI models. AI customization is performed only using data you
                      explicitly provide for your specific widget configuration.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">4.3 Automated Decision-Making</h3>
                  <p className="text-gray-300 mb-4">
                    Our service involves automated processing to provide AI-powered responses. However:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>We do not make solely automated decisions with legal or significant effects on individuals</li>
                    <li>AI responses are informational and do not constitute binding decisions</li>
                    <li>Human oversight is available through our customer support</li>
                    <li>You can request human review of any automated processes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Data Subject Rights */}
            <section id="data-subject-rights" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">5</span>
                Data Subject Rights
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  Under the GDPR, you have the following rights regarding your personal data:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right of Access (Art. 15)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Request a copy of your personal data and information about how it is processed.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right to Rectification (Art. 16)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Request correction of inaccurate or incomplete personal data.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right to Erasure (Art. 17)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Request deletion of your personal data ("right to be forgotten").
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right to Restriction (Art. 18)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Request restriction of processing in certain circumstances.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right to Data Portability (Art. 20)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Receive your data in a structured, machine-readable format.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right to Object (Art. 21)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Object to processing based on legitimate interests or for direct marketing.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right Against Automated Decisions (Art. 22)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Not be subject to solely automated decisions with legal effects.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white">Right to Withdraw Consent (Art. 7)</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Withdraw consent at any time for consent-based processing.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">How to Exercise Your Rights</h4>
                  <p className="text-gray-300 text-sm mb-2">To exercise any of these rights, contact us at:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    <li>Email: <a href="mailto:privacy@catyai.io" className="text-primary-400 hover:text-primary-300">privacy@catyai.io</a></li>
                    <li>DPO: <a href="mailto:dpo@catyai.io" className="text-primary-400 hover:text-primary-300">dpo@catyai.io</a></li>
                    <li>Account dashboard privacy settings</li>
                  </ul>
                  <p className="text-gray-400 text-xs mt-3">
                    We will respond within 30 days of receiving your request. We may request verification of identity.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Data Retention */}
            <section id="data-retention" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">6</span>
                Data Retention Periods
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  We retain personal data only for as long as necessary to fulfill the purposes for which
                  it was collected, including to satisfy legal, accounting, or reporting requirements.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-white font-semibold">Data Category</th>
                        <th className="py-3 px-4 text-white font-semibold">Retention Period</th>
                        <th className="py-3 px-4 text-white font-semibold">Justification</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Account Data</td>
                        <td className="py-3 px-4">Duration of account + 30 days</td>
                        <td className="py-3 px-4">Service provision</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Conversation Data</td>
                        <td className="py-3 px-4">90 days (configurable)</td>
                        <td className="py-3 px-4">Service provision</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Billing Records</td>
                        <td className="py-3 px-4">7 years</td>
                        <td className="py-3 px-4">Legal obligation (tax)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Analytics Data</td>
                        <td className="py-3 px-4">24 months (anonymized)</td>
                        <td className="py-3 px-4">Legitimate interest</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Marketing Consents</td>
                        <td className="py-3 px-4">Duration of consent + 3 years</td>
                        <td className="py-3 px-4">Legal compliance</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Support Communications</td>
                        <td className="py-3 px-4">3 years from resolution</td>
                        <td className="py-3 px-4">Legitimate interest</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  When data is no longer required, it is securely deleted or anonymized in accordance with
                  our data destruction policies.
                </p>
              </div>
            </section>

            {/* Section 7: International Transfers */}
            <section id="international-transfers" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">7</span>
                International Data Transfers
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">7.1 Transfer Mechanisms</h3>
                  <p className="text-gray-300 mb-4">
                    When we transfer personal data outside the EU/EEA, we ensure adequate protection through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong className="text-white">Adequacy Decisions:</strong> Transfers to countries with adequate data protection (as determined by the European Commission)</li>
                    <li><strong className="text-white">Standard Contractual Clauses (SCCs):</strong> EU-approved contractual safeguards with recipients</li>
                    <li><strong className="text-white">Binding Corporate Rules:</strong> Where applicable for intra-group transfers</li>
                    <li><strong className="text-white">Supplementary Measures:</strong> Additional technical and organizational safeguards as needed</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">7.2 Transfer Impact Assessments</h3>
                  <p className="text-gray-300">
                    We conduct Transfer Impact Assessments (TIAs) for transfers to third countries to evaluate
                    the legal framework in the recipient country and implement additional safeguards where
                    necessary. Copies of our SCCs and TIAs are available upon request.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">7.3 EU Data Residency</h3>
                  <p className="text-gray-300">
                    For customers requiring EU data residency, we offer the option to store and process data
                    exclusively within EU-based data centers. Please contact us at
                    <a href="mailto:enterprise@catyai.io" className="text-primary-400 hover:text-primary-300 ml-1">enterprise@catyai.io</a> for
                    more information about EU-only hosting options.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Data Security */}
            <section id="data-security" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">8</span>
                Data Security Measures
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  We implement appropriate technical and organizational measures to ensure a level of
                  security appropriate to the risk, in accordance with Article 32 of the GDPR.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Technical Measures
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      <li>TLS 1.3 encryption for data in transit</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Secure key management (HSM)</li>
                      <li>Regular vulnerability assessments</li>
                      <li>Penetration testing</li>
                      <li>Intrusion detection systems</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      Organizational Measures
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      <li>Role-based access control (RBAC)</li>
                      <li>Multi-factor authentication</li>
                      <li>Regular security training</li>
                      <li>Incident response procedures</li>
                      <li>Data protection impact assessments</li>
                      <li>Confidentiality agreements</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">Data Breach Notification</h4>
                  <p className="text-gray-300 text-sm">
                    In the event of a personal data breach likely to result in a risk to your rights and
                    freedoms, we will notify the relevant supervisory authority within 72 hours and affected
                    individuals without undue delay, in accordance with Articles 33 and 34 of the GDPR.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 9: Sub-Processors */}
            <section id="data-processors" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">9</span>
                Sub-Processors and Third Parties
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  We engage the following categories of sub-processors to provide our services:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-white font-semibold">Category</th>
                        <th className="py-3 px-4 text-white font-semibold">Purpose</th>
                        <th className="py-3 px-4 text-white font-semibold">Location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300 text-sm">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Cloud Infrastructure</td>
                        <td className="py-3 px-4">Hosting and data storage</td>
                        <td className="py-3 px-4">EU/US (SCCs)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">AI Processing (OpenAI)</td>
                        <td className="py-3 px-4">Natural language processing</td>
                        <td className="py-3 px-4">US (SCCs + DPA)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Payment Processing</td>
                        <td className="py-3 px-4">Subscription billing</td>
                        <td className="py-3 px-4">EU/US (SCCs)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Email Services</td>
                        <td className="py-3 px-4">Transactional emails</td>
                        <td className="py-3 px-4">EU/US (SCCs)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Analytics</td>
                        <td className="py-3 px-4">Service monitoring</td>
                        <td className="py-3 px-4">EU</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  All sub-processors are bound by Data Processing Agreements that require them to implement
                  appropriate security measures and comply with GDPR requirements. A complete list of
                  sub-processors is available upon request.
                </p>
              </div>
            </section>

            {/* Section 10: Cookie Consent */}
            <section id="cookie-consent" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">10</span>
                Cookie Consent and ePrivacy
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">10.1 Cookie Categories</h3>
                  <p className="text-gray-300 mb-4">
                    In compliance with the ePrivacy Directive and GDPR, we categorize cookies as:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <span className="font-semibold text-green-400">Strictly Necessary:</span>
                      <span className="text-gray-300 text-sm ml-2">Required for basic functionality. No consent needed.</span>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <span className="font-semibold text-blue-400">Functional:</span>
                      <span className="text-gray-300 text-sm ml-2">Enhance user experience. Consent required.</span>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <span className="font-semibold text-yellow-400">Analytics:</span>
                      <span className="text-gray-300 text-sm ml-2">Track usage patterns. Consent required.</span>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <span className="font-semibold text-purple-400">Marketing:</span>
                      <span className="text-gray-300 text-sm ml-2">Personalized advertising. Consent required.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">10.2 Consent Management</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>We display a cookie consent banner on first visit</li>
                    <li>Users can accept, reject, or customize cookie preferences</li>
                    <li>Consent choices are recorded and can be changed at any time</li>
                    <li>No non-essential cookies are set before consent is obtained</li>
                    <li>Cookie preferences are stored for 12 months</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">10.3 Widget Cookies</h3>
                  <p className="text-gray-300">
                    Our chatbot widget uses minimal local storage for session management. Business customers
                    are responsible for obtaining appropriate consent for the widget on their websites and
                    disclosing its use in their privacy policies.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 11: DPO Contact */}
            <section id="dpo-contact" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">11</span>
                Data Protection Officer
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  We have appointed a Data Protection Officer (DPO) to oversee our data protection
                  compliance. You can contact our DPO for any questions or concerns related to your
                  personal data or this policy.
                </p>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Data Protection Officer</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="text-gray-400">Email:</span>
                      <a href="mailto:dpo@catyai.io" className="text-primary-400 hover:text-primary-300 ml-2">dpo@catyai.io</a>
                    </p>
                    <p>
                      <span className="text-gray-400">Address:</span>
                      <span className="ml-2">Caty.AI, Attn: Data Protection Officer<br />
                        <span className="ml-[4.5rem]">[Company Address]</span><br />
                        <span className="ml-[4.5rem]">[City, Country, Postal Code]</span>
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  Response time: We aim to respond to all DPO inquiries within 5 business days.
                </p>
              </div>
            </section>

            {/* Section 12: Supervisory Authority */}
            <section id="supervisory-authority" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">12</span>
                Supervisory Authority
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">12.1 Right to Lodge a Complaint</h3>
                <p className="text-gray-300 mb-4">
                  If you believe that our processing of your personal data infringes the GDPR, you have
                  the right to lodge a complaint with a supervisory authority, in particular in the EU
                  Member State of your habitual residence, place of work, or place of the alleged infringement.
                </p>

                <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
                  <h4 className="font-semibold text-white mb-2">Our Lead Supervisory Authority</h4>
                  <p className="text-gray-300 text-sm">
                    [Name of Supervisory Authority]<br />
                    [Address]<br />
                    [Website]<br />
                    [Contact Information]
                  </p>
                </div>

                <p className="text-gray-300">
                  You can find your local supervisory authority at:
                  <a
                    href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                    className="text-primary-400 hover:text-primary-300 ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    European Data Protection Board - Members
                  </a>
                </p>
              </div>
            </section>

            {/* Section 13: Data Processing Agreement */}
            <section id="dpa" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">13</span>
                Data Processing Agreement
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  For business customers who use our services to process personal data of their end users,
                  we offer a Data Processing Agreement (DPA) that:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                  <li>Complies with Article 28 of the GDPR</li>
                  <li>Includes Standard Contractual Clauses for international transfers</li>
                  <li>Defines the scope and purpose of data processing</li>
                  <li>Specifies technical and organizational security measures</li>
                  <li>Details sub-processor arrangements</li>
                  <li>Establishes data breach notification procedures</li>
                  <li>Covers assistance with data subject rights requests</li>
                </ul>

                <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                  <p className="text-primary-300 text-sm">
                    <strong>Request a DPA:</strong> Business customers can request a signed Data Processing
                    Agreement by contacting <a href="mailto:legal@catyai.io" className="text-primary-400 hover:text-primary-300">legal@catyai.io</a> or
                    through the account settings in your dashboard.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 14: Policy Updates */}
            <section id="policy-updates" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">14</span>
                Policy Updates
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  We may update this GDPR Policy from time to time to reflect changes in our practices,
                  technology, legal requirements, or other factors. When we make material changes:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                  <li>We will update the "Last Updated" date at the top of this policy</li>
                  <li>We will notify registered users via email for significant changes</li>
                  <li>We will provide a summary of key changes</li>
                  <li>We will obtain new consent where required</li>
                </ul>

                <p className="text-gray-400 text-sm">
                  We encourage you to review this policy periodically to stay informed about how we
                  protect your personal data.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  If you have any questions about this GDPR Policy or our data protection practices,
                  please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Privacy Inquiries</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:privacy@catyai.io" className="text-primary-400 hover:text-primary-300">privacy@catyai.io</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Data Protection Officer</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:dpo@catyai.io" className="text-primary-400 hover:text-primary-300">dpo@catyai.io</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Legal Department</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:legal@catyai.io" className="text-primary-400 hover:text-primary-300">legal@catyai.io</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Mailing Address</h4>
                    <p className="text-gray-300 text-sm">
                      Caty.AI<br />
                      [Company Address]<br />
                      [City, Country, Postal Code]
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mt-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <p className="text-gray-400 text-sm italic">
                  <strong>Disclaimer:</strong> This GDPR Policy is a template for informational purposes.
                  Consult with a qualified attorney for legal advice specific to your situation and jurisdiction.
                  GDPR compliance requires ongoing assessment and may require additional measures based on
                  your specific data processing activities.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo1.png" alt="Caty.AI" className="h-6 w-6 rounded-full" />
            <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Caty.AI. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="/gdpr" className="text-primary-400">GDPR</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GDPRPolicy
