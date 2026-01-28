import { useEffect } from 'react'

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Effective Date: January 1, 2025</p>
            <p className="text-gray-400">Last Updated: January 1, 2025</p>
          </div>

          <div className="prose prose-invert prose-gray max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Caty.AI, a product of PayAi-X FZE ("we," "our," or "us"), operates the website caty.ai and provides AI-powered
                  chatbot widget services for businesses. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our website or use our services.
                  Please read this Privacy Policy carefully. By using our services, you consent to the
                  data practices described in this policy.
                </p>
              </div>
            </section>

            {/* Table of Contents */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
              <nav className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <ol className="list-decimal list-inside space-y-2 text-primary-400">
                  <li><a href="#information-we-collect" className="hover:text-primary-300 transition-colors">Information We Collect</a></li>
                  <li><a href="#how-we-use-information" className="hover:text-primary-300 transition-colors">How We Use Your Information</a></li>
                  <li><a href="#data-sharing" className="hover:text-primary-300 transition-colors">Data Sharing and Disclosure</a></li>
                  <li><a href="#data-retention" className="hover:text-primary-300 transition-colors">Data Retention</a></li>
                  <li><a href="#your-rights" className="hover:text-primary-300 transition-colors">Your Privacy Rights</a></li>
                  <li><a href="#cookies" className="hover:text-primary-300 transition-colors">Cookies and Tracking Technologies</a></li>
                  <li><a href="#data-security" className="hover:text-primary-300 transition-colors">Data Security</a></li>
                  <li><a href="#childrens-privacy" className="hover:text-primary-300 transition-colors">Children's Privacy</a></li>
                  <li><a href="#international-transfers" className="hover:text-primary-300 transition-colors">International Data Transfers</a></li>
                  <li><a href="#third-party-links" className="hover:text-primary-300 transition-colors">Third-Party Links</a></li>
                  <li><a href="#policy-changes" className="hover:text-primary-300 transition-colors">Changes to This Policy</a></li>
                  <li><a href="#contact-us" className="hover:text-primary-300 transition-colors">Contact Us</a></li>
                </ol>
              </nav>
            </section>

            {/* Section 1: Information We Collect */}
            <section id="information-we-collect" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">1</span>
                Information We Collect
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.1 Information You Provide Directly</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><span className="font-medium text-white">Account Information:</span> Name, email address, company name, password, and billing information when you create an account</li>
                    <li><span className="font-medium text-white">Payment Information:</span> Credit card details, billing address, and transaction history (processed securely through our payment processors)</li>
                    <li><span className="font-medium text-white">Business Information:</span> Company details, website URLs, and business documentation uploaded for AI training</li>
                    <li><span className="font-medium text-white">Support Communications:</span> Messages, emails, and other communications you send to our support team</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.2 Information Collected Through Our Widget</h3>
                  <p className="text-gray-300 mb-4">When end-users interact with chatbot widgets powered by Caty.AI on our customers' websites, we may collect:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><span className="font-medium text-white">Conversation Data:</span> Messages, questions, and responses exchanged in chat sessions</li>
                    <li><span className="font-medium text-white">Contact Information:</span> Name, email, phone number, or other details voluntarily provided during conversations</li>
                    <li><span className="font-medium text-white">Lead Information:</span> Business inquiries, product interests, and purchase intentions expressed in conversations</li>
                    <li><span className="font-medium text-white">Session Data:</span> Chat timestamps, session duration, and interaction patterns</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.3 Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><span className="font-medium text-white">Device Information:</span> Browser type, operating system, device type, and unique device identifiers</li>
                    <li><span className="font-medium text-white">Usage Data:</span> Pages visited, features used, click patterns, and time spent on pages</li>
                    <li><span className="font-medium text-white">Log Data:</span> IP addresses, access times, referring URLs, and error logs</li>
                    <li><span className="font-medium text-white">Location Data:</span> Approximate geographic location derived from IP address</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: How We Use Information */}
            <section id="how-we-use-information" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">2</span>
                How We Use Your Information
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.1 Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Provide, operate, and maintain our AI chatbot services</li>
                    <li>Process and complete transactions</li>
                    <li>Train and improve AI models to provide accurate responses specific to each customer's business</li>
                    <li>Generate lead reports and analytics for our business customers</li>
                    <li>Enable real-time chat functionality and conversation history</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.2 AI Processing and Intent Detection</h3>
                  <p className="text-gray-300 mb-4">We use artificial intelligence to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Understand user intent and provide relevant responses</li>
                    <li>Identify potential leads and buying signals for our business customers</li>
                    <li>Improve response accuracy and conversational quality</li>
                    <li>Detect when human intervention may be needed</li>
                  </ul>
                  <div className="mt-4 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                    <p className="text-primary-300 text-sm">
                      <strong>Important:</strong> We do not use customer data or end-user conversations to train our general AI models.
                      AI training is performed only on data you specifically provide for your widget configuration.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.3 Analytics and Improvements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Analyze usage patterns to improve our services</li>
                    <li>Generate aggregated, anonymized analytics reports</li>
                    <li>Identify and fix technical issues</li>
                    <li>Develop new features and functionality</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.4 Communications</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Send service-related notifications and updates</li>
                    <li>Respond to inquiries and support requests</li>
                    <li>Send marketing communications (with your consent, where required)</li>
                    <li>Provide important security alerts</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.5 Legal and Security</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Comply with legal obligations and regulatory requirements</li>
                    <li>Enforce our Terms of Service and other agreements</li>
                    <li>Protect against fraud, abuse, and security threats</li>
                    <li>Exercise or defend legal claims</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Data Sharing */}
            <section id="data-sharing" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">3</span>
                Data Sharing and Disclosure
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.1 With Our Business Customers</h3>
                  <p className="text-gray-300">
                    End-user conversation data collected through our widgets is shared with the business customer
                    who deployed the widget on their website. This includes chat transcripts, lead information,
                    and analytics data. Our business customers are responsible for their own privacy practices
                    regarding this data.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.2 Service Providers</h3>
                  <p className="text-gray-300 mb-4">We may share data with trusted third-party service providers who assist us in:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Cloud hosting and infrastructure (e.g., AWS, Google Cloud)</li>
                    <li>Payment processing (e.g., Stripe)</li>
                    <li>Email services and communications</li>
                    <li>Analytics and monitoring</li>
                    <li>Customer support tools</li>
                  </ul>
                  <p className="text-gray-400 mt-4 text-sm">
                    These providers are contractually bound to use data only for providing services to us and
                    must maintain appropriate security measures.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.3 AI Service Providers</h3>
                  <p className="text-gray-300">
                    We use OpenAI's GPT models to power our conversational AI. Conversation data may be processed
                    by OpenAI to generate responses. OpenAI's data processing is governed by their privacy policy
                    and our data processing agreement with them. We have opted out of having conversation data
                    used to train OpenAI's models.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.4 Legal Requirements</h3>
                  <p className="text-gray-300 mb-4">We may disclose information if required to do so by law or in response to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Valid legal process (subpoenas, court orders, legal requests)</li>
                    <li>Government or regulatory agency requests</li>
                    <li>Enforcement of our Terms of Service</li>
                    <li>Protection of the rights, safety, or property of Caty.AI, our users, or the public</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.5 Business Transfers</h3>
                  <p className="text-gray-300">
                    In the event of a merger, acquisition, bankruptcy, or sale of all or a portion of our assets,
                    user information may be transferred as part of that transaction. We will notify you of any
                    such change in ownership or control.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.6 What We Do NOT Do</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>We do <strong>not</strong> sell your personal information to third parties</li>
                    <li>We do <strong>not</strong> share personal data for third-party advertising purposes</li>
                    <li>We do <strong>not</strong> use your data to train general AI models</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Data Retention */}
            <section id="data-retention" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">4</span>
                Data Retention
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-white font-semibold">Data Type</th>
                        <th className="py-3 px-4 text-white font-semibold">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Account Information</td>
                        <td className="py-3 px-4">Duration of account + 30 days after deletion</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Conversation Data</td>
                        <td className="py-3 px-4">90 days (configurable by business customer)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Analytics Data</td>
                        <td className="py-3 px-4">24 months (aggregated and anonymized)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Billing Records</td>
                        <td className="py-3 px-4">7 years (legal requirement)</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Support Tickets</td>
                        <td className="py-3 px-4">3 years from resolution</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Log Data</td>
                        <td className="py-3 px-4">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 5: Your Rights */}
            <section id="your-rights" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">5</span>
                Your Privacy Rights
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.1 Rights Available to All Users</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong className="text-white">Correction:</strong> Request correction of inaccurate personal data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong className="text-white">Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong className="text-white">Data Portability:</strong> Receive your data in a structured, commonly used format</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.2 Additional Rights for EU/EEA Residents</h3>
                  <p className="text-gray-300 mb-4">Under GDPR, you also have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Object to processing based on legitimate interests</li>
                    <li>Restrict processing in certain circumstances</li>
                    <li>Withdraw consent at any time (where processing is based on consent)</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                  <p className="text-gray-400 mt-4 text-sm">
                    For detailed information on GDPR rights, please see our <a href="/gdpr" className="text-primary-400 hover:text-primary-300">GDPR Policy</a>.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.3 California Residents (CCPA/CPRA)</h3>
                  <p className="text-gray-300 mb-4">California residents have additional rights including:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Right to know what personal information is collected, used, and shared</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                    <li>Right to non-discrimination for exercising privacy rights</li>
                    <li>Right to correct inaccurate personal information</li>
                    <li>Right to limit use of sensitive personal information</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.4 How to Exercise Your Rights</h3>
                  <p className="text-gray-300 mb-4">To exercise any of these rights, you can:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Email us at: <a href="mailto:privacy@payai-x.com" className="text-primary-400 hover:text-primary-300">privacy@payai-x.com</a></li>
                    <li>Use the privacy settings in your account dashboard</li>
                    <li>Submit a request through our support portal</li>
                  </ul>
                  <p className="text-gray-400 mt-4 text-sm">
                    We will respond to valid requests within 30 days (or sooner where required by law).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Cookies */}
            <section id="cookies" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">6</span>
                Cookies and Tracking Technologies
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.1 Types of Cookies We Use</h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Essential Cookies</h4>
                      <p className="text-gray-300 text-sm">Required for basic site functionality, authentication, and security. Cannot be disabled.</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Functional Cookies</h4>
                      <p className="text-gray-300 text-sm">Remember your preferences and settings for a better experience.</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Analytics Cookies</h4>
                      <p className="text-gray-300 text-sm">Help us understand how visitors interact with our website to improve our services.</p>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Marketing Cookies</h4>
                      <p className="text-gray-300 text-sm">Used to deliver relevant advertisements and track campaign effectiveness (with consent).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.2 Managing Cookies</h3>
                  <p className="text-gray-300 mb-4">You can control cookies through:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Our cookie consent banner when you first visit the site</li>
                    <li>Your browser settings (blocking or deleting cookies)</li>
                    <li>Opt-out tools provided by analytics providers</li>
                  </ul>
                  <p className="text-gray-400 mt-4 text-sm">
                    Note: Disabling certain cookies may affect website functionality.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.3 Widget Tracking</h3>
                  <p className="text-gray-300">
                    Our chatbot widget uses minimal tracking necessary for functionality. It may use local storage
                    to maintain chat session state and remember user preferences. The widget does not use
                    third-party tracking cookies unless explicitly enabled by the business customer.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Data Security */}
            <section id="data-security" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">7</span>
                Data Security
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  We implement robust security measures to protect your personal information from unauthorized
                  access, alteration, disclosure, or destruction.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Encryption
                    </h4>
                    <p className="text-gray-300 text-sm">TLS 1.3 for data in transit, AES-256 for data at rest</p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                      </svg>
                      Access Controls
                    </h4>
                    <p className="text-gray-300 text-sm">Role-based access, multi-factor authentication, audit logging</p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Compliance
                    </h4>
                    <p className="text-gray-300 text-sm">GDPR, SOC 2 Type II compliant infrastructure</p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      Infrastructure
                    </h4>
                    <p className="text-gray-300 text-sm">Enterprise-grade cloud hosting with redundancy</p>
                  </div>
                </div>

                <p className="text-gray-400 mt-6 text-sm">
                  While we implement strong security measures, no method of transmission over the Internet or
                  electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 8: Children's Privacy */}
            <section id="childrens-privacy" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">8</span>
                Children's Privacy (COPPA Compliance)
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <p className="text-yellow-300">
                    <strong>Important:</strong> Our services are not intended for children under the age of 13
                    (or 16 in the European Economic Area).
                  </p>
                </div>

                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>We do not knowingly collect personal information from children under 13</li>
                  <li>If we learn we have collected data from a child under 13, we will delete it promptly</li>
                  <li>Parents or guardians who believe we may have collected information from a child should contact us immediately</li>
                  <li>Business customers are responsible for ensuring their use of our widget complies with COPPA if their website targets children</li>
                </ul>

                <p className="text-gray-400 mt-6 text-sm">
                  If you are a parent or guardian and you are aware that your child has provided us with personal
                  information, please contact us at <a href="mailto:privacy@payai-x.com" className="text-primary-400 hover:text-primary-300">privacy@payai-x.com</a>.
                </p>
              </div>
            </section>

            {/* Section 9: International Transfers */}
            <section id="international-transfers" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">9</span>
                International Data Transfers
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  Your information may be transferred to and processed in countries other than your country of
                  residence. These countries may have different data protection laws.
                </p>

                <h3 className="text-lg font-semibold text-white mb-4">Safeguards for International Transfers</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                  <li>Data Processing Agreements with all sub-processors</li>
                  <li>Encryption of data during transfer and storage</li>
                  <li>EU-based data centers available for EU customers upon request</li>
                </ul>

                <p className="text-gray-400 mt-6 text-sm">
                  For more information about international transfers and GDPR compliance, see our
                  <a href="/gdpr" className="text-primary-400 hover:text-primary-300 ml-1">GDPR Policy</a>.
                </p>
              </div>
            </section>

            {/* Section 10: Third-Party Links */}
            <section id="third-party-links" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">10</span>
                Third-Party Links
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300">
                  Our website and services may contain links to third-party websites. We are not responsible
                  for the privacy practices of these external sites. We encourage you to read the privacy
                  policies of any third-party websites you visit. This Privacy Policy applies only to
                  information collected by Caty.AI.
                </p>
              </div>
            </section>

            {/* Section 11: Policy Changes */}
            <section id="policy-changes" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">11</span>
                Changes to This Policy
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Posting the new Privacy Policy on this page</li>
                  <li>Updating the "Last Updated" date at the top of this page</li>
                  <li>Sending an email notification for significant changes (for registered users)</li>
                </ul>
                <p className="text-gray-400 mt-4 text-sm">
                  We encourage you to review this Privacy Policy periodically for any changes. Changes are
                  effective when posted on this page.
                </p>
              </div>
            </section>

            {/* Section 12: Contact Us */}
            <section id="contact-us" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">12</span>
                Contact Us
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  If you have any questions or concerns about this Privacy Policy or our data practices,
                  please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Privacy Inquiries</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:privacy@payai-x.com" className="text-primary-400 hover:text-primary-300">privacy@payai-x.com</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Data Protection Officer</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:dpo@payai-x.com" className="text-primary-400 hover:text-primary-300">dpo@payai-x.com</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">General Support</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:contact@payai-x.com" className="text-primary-400 hover:text-primary-300">contact@payai-x.com</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Mailing Address</h4>
                    <p className="text-gray-300 text-sm">
                      PayAi-X FZE<br />
                      Dedicated Desk #23-DARTX, Floor 19<br />
                      Sheikh Rashid Tower, Dubai World Trade Centre<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mt-12">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <p className="text-gray-400 text-sm italic">
                  <strong>Disclaimer:</strong> This Privacy Policy is a template for informational purposes.
                  Consult with a qualified attorney for legal advice specific to your situation and jurisdiction.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
  )
}

export default PrivacyPolicy
