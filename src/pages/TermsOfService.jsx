import { useEffect } from 'react'

function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Effective Date: January 1, 2025</p>
            <p className="text-gray-400">Last Updated: January 1, 2025</p>
          </div>

          <div className="prose prose-invert prose-gray max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Welcome to Caty.AI. These Terms of Service ("Terms") govern your access to and use of the
                  Caty.AI website (catyai.io), AI chatbot widget services, dashboard, APIs, and all related
                  services (collectively, the "Services") provided by Caty.AI ("Company," "we," "our," or "us").
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree
                  to these Terms, you may not access or use our Services.
                </p>
              </div>

              <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                <p className="text-primary-300 text-sm">
                  <strong>Please read these Terms carefully.</strong> They contain important information about
                  your legal rights, remedies, and obligations, including limitations of liability and a
                  binding arbitration clause.
                </p>
              </div>
            </section>

            {/* Table of Contents */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
              <nav className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <ol className="list-decimal list-inside space-y-2 text-primary-400">
                  <li><a href="#service-description" className="hover:text-primary-300 transition-colors">Service Description</a></li>
                  <li><a href="#account-terms" className="hover:text-primary-300 transition-colors">Account Terms</a></li>
                  <li><a href="#subscription-billing" className="hover:text-primary-300 transition-colors">Subscription and Billing</a></li>
                  <li><a href="#acceptable-use" className="hover:text-primary-300 transition-colors">Acceptable Use Policy</a></li>
                  <li><a href="#user-content" className="hover:text-primary-300 transition-colors">User Content and Data</a></li>
                  <li><a href="#intellectual-property" className="hover:text-primary-300 transition-colors">Intellectual Property Rights</a></li>
                  <li><a href="#third-party-services" className="hover:text-primary-300 transition-colors">Third-Party Services</a></li>
                  <li><a href="#confidentiality" className="hover:text-primary-300 transition-colors">Confidentiality</a></li>
                  <li><a href="#warranties-disclaimers" className="hover:text-primary-300 transition-colors">Warranties and Disclaimers</a></li>
                  <li><a href="#limitation-liability" className="hover:text-primary-300 transition-colors">Limitation of Liability</a></li>
                  <li><a href="#indemnification" className="hover:text-primary-300 transition-colors">Indemnification</a></li>
                  <li><a href="#termination" className="hover:text-primary-300 transition-colors">Termination</a></li>
                  <li><a href="#dispute-resolution" className="hover:text-primary-300 transition-colors">Dispute Resolution</a></li>
                  <li><a href="#governing-law" className="hover:text-primary-300 transition-colors">Governing Law</a></li>
                  <li><a href="#general-provisions" className="hover:text-primary-300 transition-colors">General Provisions</a></li>
                  <li><a href="#contact-information" className="hover:text-primary-300 transition-colors">Contact Information</a></li>
                </ol>
              </nav>
            </section>

            {/* Section 1: Service Description */}
            <section id="service-description" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">1</span>
                Service Description
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.1 Overview</h3>
                  <p className="text-gray-300 mb-4">Caty.AI provides an AI-powered chatbot widget service that enables businesses to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Embed intelligent conversational chatbots on their websites</li>
                    <li>Automate customer support and engagement 24/7</li>
                    <li>Capture leads and qualify potential customers</li>
                    <li>Understand visitor intent through advanced AI processing</li>
                    <li>Train AI on custom knowledge bases and documentation</li>
                    <li>Access analytics and insights about customer interactions</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.2 Service Availability</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>We strive to maintain 99.9% uptime for our Services</li>
                    <li>Scheduled maintenance windows will be communicated in advance</li>
                    <li>Emergency maintenance may occur without prior notice</li>
                    <li>We do not guarantee uninterrupted or error-free service</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">1.3 Service Modifications</h3>
                  <p className="text-gray-300">
                    We reserve the right to modify, suspend, or discontinue any aspect of the Services at any
                    time. We will provide reasonable notice of material changes that negatively affect your
                    use of the Services. Continued use of the Services after such modifications constitutes
                    acceptance of the changes.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Account Terms */}
            <section id="account-terms" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">2</span>
                Account Terms
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.1 Eligibility</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You must be at least 18 years old to create an account</li>
                    <li>You must have the legal authority to bind any business entity you represent</li>
                    <li>You must provide accurate and complete registration information</li>
                    <li>One person or legal entity may not maintain more than one free account</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.2 Account Security</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You are responsible for maintaining the security of your account credentials</li>
                    <li>You must notify us immediately of any unauthorized access or security breach</li>
                    <li>You are liable for all activities that occur under your account</li>
                    <li>We strongly recommend enabling two-factor authentication</li>
                    <li>You may not share your account credentials with third parties</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">2.3 Account Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You must keep your account information accurate and up-to-date</li>
                    <li>You must provide valid contact information for account-related communications</li>
                    <li>Business accounts must provide valid business information and documentation upon request</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Subscription and Billing */}
            <section id="subscription-billing" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">3</span>
                Subscription and Billing
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.1 Free Trial</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>We may offer a free trial period for new users</li>
                    <li>Free trials are limited to one per person or business entity</li>
                    <li>We may require payment information to start a free trial</li>
                    <li>At the end of the trial, your account will convert to a paid subscription unless cancelled</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.2 Pricing and Payment</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Subscription fees are charged in advance on a monthly or annual basis</li>
                    <li>All fees are quoted in Euros (EUR) unless otherwise specified</li>
                    <li>Prices may change with 30 days notice; existing subscriptions are honored until renewal</li>
                    <li>Payment is due immediately upon subscription or renewal</li>
                    <li>Failed payments may result in service suspension</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.3 Usage Limits</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Each subscription plan has defined conversation limits</li>
                    <li>Exceeding limits may result in overage charges or service throttling</li>
                    <li>We will notify you when approaching usage limits</li>
                    <li>Unused conversations do not roll over to the next billing period</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.4 Refunds</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Subscription fees are generally non-refundable</li>
                    <li>Refund requests may be considered on a case-by-case basis within 14 days of purchase</li>
                    <li>Refunds for annual subscriptions are prorated based on unused time</li>
                    <li>No refunds are provided for partial months or unused conversation credits</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">3.5 Taxes</h3>
                  <p className="text-gray-300">
                    All fees are exclusive of applicable taxes (including VAT, GST, or sales tax). You are
                    responsible for paying all taxes associated with your use of the Services. If we are
                    required to collect taxes, they will be added to your invoice.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Acceptable Use */}
            <section id="acceptable-use" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">4</span>
                Acceptable Use Policy
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">4.1 Permitted Use</h3>
                  <p className="text-gray-300 mb-4">You may use our Services only for lawful business purposes in accordance with these Terms.</p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">4.2 Prohibited Activities</h3>
                  <p className="text-gray-300 mb-4">You agree NOT to use the Services to:</p>

                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Illegal or Harmful Content</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>Engage in any illegal activities or promote violence</li>
                        <li>Distribute malware, viruses, or harmful code</li>
                        <li>Facilitate fraud, phishing, or deceptive practices</li>
                        <li>Infringe on intellectual property rights of others</li>
                        <li>Distribute child sexual abuse material (CSAM) or exploit minors</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Abuse and Harassment</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>Harass, abuse, threaten, or intimidate others</li>
                        <li>Distribute hate speech or discriminatory content</li>
                        <li>Stalk or invade the privacy of others</li>
                        <li>Impersonate any person or entity</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Technical Abuse</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with or disrupt the Services or servers</li>
                        <li>Circumvent usage limits or security measures</li>
                        <li>Scrape, data mine, or extract data through automated means</li>
                        <li>Reverse engineer, decompile, or disassemble the Services</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-2">Spam and Manipulation</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                        <li>Send unsolicited bulk communications (spam)</li>
                        <li>Manipulate or artificially inflate metrics</li>
                        <li>Create multiple accounts to circumvent restrictions</li>
                        <li>Use the Services to build a competing product</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">4.3 Enforcement</h3>
                  <p className="text-gray-300">
                    We reserve the right to investigate and take appropriate action against violations of this
                    policy, including removing content, suspending or terminating accounts, and reporting to
                    law enforcement authorities.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: User Content */}
            <section id="user-content" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">5</span>
                User Content and Data
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.1 Your Content</h3>
                  <p className="text-gray-300 mb-4">
                    "User Content" includes all data, text, documents, and other materials you upload, submit,
                    or transmit through the Services, including knowledge base documents and chatbot training data.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You retain ownership of all User Content you submit</li>
                    <li>You grant us a limited license to use User Content to provide and improve the Services</li>
                    <li>You are responsible for the accuracy and legality of your User Content</li>
                    <li>You must have all necessary rights to submit User Content</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.2 License Grant</h3>
                  <p className="text-gray-300">
                    By submitting User Content, you grant Caty.AI a worldwide, non-exclusive, royalty-free
                    license to use, reproduce, modify, and display such content solely for the purpose of
                    providing the Services. This license terminates when you delete the content or close
                    your account, except for content shared with third parties or retained for legal compliance.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.3 End User Data</h3>
                  <p className="text-gray-300 mb-4">
                    When end users interact with your chatbot widget, we collect data on your behalf. You acknowledge that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You are the data controller for end user data collected through your widget</li>
                    <li>You are responsible for obtaining appropriate consents from end users</li>
                    <li>You must maintain a privacy policy that discloses the use of our Services</li>
                    <li>We act as a data processor on your behalf under our Data Processing Agreement</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">5.4 Data Backup</h3>
                  <p className="text-gray-300">
                    While we maintain regular backups, you are responsible for maintaining your own backup
                    copies of User Content. We are not liable for any loss or corruption of User Content.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Intellectual Property */}
            <section id="intellectual-property" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">6</span>
                Intellectual Property Rights
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.1 Our Intellectual Property</h3>
                  <p className="text-gray-300 mb-4">
                    The Services and all associated intellectual property rights are owned by Caty.AI or our
                    licensors. This includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>The Caty.AI name, logo, and branding</li>
                    <li>Website design, graphics, and user interface</li>
                    <li>Software, code, algorithms, and AI models</li>
                    <li>Documentation, tutorials, and marketing materials</li>
                    <li>All improvements, modifications, and derivative works</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.2 Limited License</h3>
                  <p className="text-gray-300">
                    We grant you a limited, non-exclusive, non-transferable, revocable license to access and
                    use the Services during your subscription period solely for your internal business purposes
                    in accordance with these Terms.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.3 Restrictions</h3>
                  <p className="text-gray-300 mb-4">You may not:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Copy, modify, or distribute our intellectual property without authorization</li>
                    <li>Remove or alter any proprietary notices or labels</li>
                    <li>Use our trademarks without prior written consent</li>
                    <li>Create derivative works based on the Services</li>
                    <li>Sublicense, rent, lease, or lend the Services to third parties</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">6.4 Feedback</h3>
                  <p className="text-gray-300">
                    If you provide feedback, suggestions, or ideas about the Services, you grant us a
                    perpetual, irrevocable, royalty-free license to use such feedback for any purpose,
                    including to improve our Services, without any obligation to you.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Third-Party Services */}
            <section id="third-party-services" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">7</span>
                Third-Party Services
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-4">Our Services may integrate with or link to third-party services, including:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                  <li>OpenAI for AI language models</li>
                  <li>Payment processors (e.g., Stripe)</li>
                  <li>Analytics services</li>
                  <li>CRM integrations</li>
                  <li>Cloud infrastructure providers</li>
                </ul>
                <p className="text-gray-300">
                  Your use of third-party services is subject to their respective terms and privacy policies.
                  We are not responsible for the availability, accuracy, or content of third-party services,
                  nor for any damages arising from your use of them.
                </p>
              </div>
            </section>

            {/* Section 8: Confidentiality */}
            <section id="confidentiality" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">8</span>
                Confidentiality
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">8.1 Definition</h3>
                  <p className="text-gray-300">
                    "Confidential Information" means any non-public information disclosed by either party,
                    whether orally or in writing, that is designated as confidential or that reasonably
                    should be understood to be confidential, including business plans, technical data,
                    product ideas, and customer information.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">8.2 Obligations</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Both parties agree to protect Confidential Information with reasonable care</li>
                    <li>Confidential Information may only be used for purposes related to these Terms</li>
                    <li>Disclosure to employees or contractors is permitted on a need-to-know basis</li>
                    <li>Confidentiality obligations survive termination for three (3) years</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">8.3 Exceptions</h3>
                  <p className="text-gray-300 mb-4">Confidentiality obligations do not apply to information that:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Is or becomes publicly available without breach</li>
                    <li>Was known before disclosure</li>
                    <li>Is independently developed without use of Confidential Information</li>
                    <li>Is required to be disclosed by law or court order</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9: Warranties and Disclaimers */}
            <section id="warranties-disclaimers" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">9</span>
                Warranties and Disclaimers
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">9.1 Our Warranties</h3>
                  <p className="text-gray-300 mb-4">We warrant that:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>We have the right to provide the Services</li>
                    <li>The Services will perform substantially as described in our documentation</li>
                    <li>We will provide the Services with reasonable skill and care</li>
                    <li>We maintain appropriate security measures to protect your data</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">9.2 Disclaimer of Warranties</h3>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-300 font-medium mb-4">IMPORTANT DISCLAIMER</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      EXCEPT AS EXPRESSLY PROVIDED HEREIN, THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE"
                      WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                      IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                      NON-INFRINGEMENT.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mt-4">
                      WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY
                      SECURE. WE DO NOT WARRANT THE ACCURACY OR COMPLETENESS OF AI-GENERATED RESPONSES.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">9.3 AI Limitations</h3>
                  <p className="text-gray-300">
                    You acknowledge that AI-generated responses may contain errors, inaccuracies, or
                    inappropriate content. The AI is not a substitute for professional advice in legal,
                    medical, financial, or other specialized fields. You are responsible for reviewing
                    and verifying AI outputs before relying on them.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10: Limitation of Liability */}
            <section id="limitation-liability" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">10</span>
                Limitation of Liability
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">10.1 Exclusion of Consequential Damages</h3>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CATY.AI BE LIABLE FOR ANY
                      INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
                      LIMITED TO LOSS OF PROFITS, DATA, BUSINESS, GOODWILL, OR OTHER INTANGIBLE LOSSES,
                      ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">10.2 Liability Cap</h3>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES
                      SHALL NOT EXCEED THE GREATER OF: (A) THE TOTAL FEES PAID BY YOU TO CATY.AI IN THE
                      TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED EUROS (EUR 100).
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">10.3 Exceptions</h3>
                  <p className="text-gray-300">
                    The limitations in this section do not apply to: (a) your breach of the Acceptable Use
                    Policy; (b) your indemnification obligations; (c) your violation of our intellectual
                    property rights; or (d) liability that cannot be limited by applicable law.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 11: Indemnification */}
            <section id="indemnification" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">11</span>
                Indemnification
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  You agree to indemnify, defend, and hold harmless Caty.AI, its officers, directors,
                  employees, agents, and affiliates from and against any and all claims, damages, losses,
                  liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of
                  or related to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Your use of the Services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your User Content</li>
                  <li>Your violation of applicable laws or regulations</li>
                  <li>Claims by your end users relating to your use of the Services</li>
                </ul>
              </div>
            </section>

            {/* Section 12: Termination */}
            <section id="termination" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">12</span>
                Termination
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">12.1 Termination by You</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>You may cancel your subscription at any time through your account dashboard</li>
                    <li>Cancellation takes effect at the end of the current billing period</li>
                    <li>No refunds are provided for early cancellation (except as required by law)</li>
                    <li>You may request deletion of your account and data</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">12.2 Termination by Us</h3>
                  <p className="text-gray-300 mb-4">We may suspend or terminate your access to the Services:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Immediately for violation of the Acceptable Use Policy</li>
                    <li>Immediately for non-payment after reasonable notice</li>
                    <li>With 30 days notice for any reason or no reason</li>
                    <li>Immediately if required by law or to protect our rights</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">12.3 Effect of Termination</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Your right to access and use the Services terminates immediately</li>
                    <li>Your chatbot widgets will stop functioning</li>
                    <li>We will retain your data for 30 days to allow for export</li>
                    <li>After 30 days, your data may be permanently deleted</li>
                    <li>Sections that by their nature should survive will survive termination</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 13: Dispute Resolution */}
            <section id="dispute-resolution" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">13</span>
                Dispute Resolution
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">13.1 Informal Resolution</h3>
                  <p className="text-gray-300">
                    Before initiating any formal dispute resolution, you agree to first contact us at
                    <a href="mailto:legal@catyai.io" className="text-primary-400 hover:text-primary-300 ml-1">legal@catyai.io</a> and
                    attempt to resolve the dispute informally for at least 30 days.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">13.2 Arbitration Agreement</h3>
                  <p className="text-gray-300 mb-4">
                    If informal resolution is unsuccessful, you agree that any dispute, claim, or controversy
                    arising out of or relating to these Terms or the Services shall be resolved by binding
                    arbitration, rather than in court, except that you may assert claims in small claims
                    court if your claims qualify.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Note: This arbitration agreement does not apply where prohibited by applicable law,
                    including for EU consumers who have the right to bring claims in their local courts.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">13.3 Class Action Waiver</h3>
                  <p className="text-gray-300">
                    To the extent permitted by law, you agree that any dispute resolution proceedings will
                    be conducted only on an individual basis and not in a class, consolidated, or
                    representative action.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 14: Governing Law */}
            <section id="governing-law" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">14</span>
                Governing Law
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction],
                  without regard to its conflict of laws principles.
                </p>
                <p className="text-gray-300">
                  If you are a consumer in the European Union, you may benefit from mandatory provisions of
                  the law of your country of residence, and nothing in these Terms affects your rights as
                  a consumer to rely on such mandatory provisions.
                </p>
              </div>
            </section>

            {/* Section 15: General Provisions */}
            <section id="general-provisions" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">15</span>
                General Provisions
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.1 Entire Agreement</h3>
                  <p className="text-gray-300">
                    These Terms, together with our Privacy Policy and any other agreements expressly
                    incorporated by reference, constitute the entire agreement between you and Caty.AI
                    regarding the Services.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.2 Severability</h3>
                  <p className="text-gray-300">
                    If any provision of these Terms is found to be unenforceable, the remaining provisions
                    will remain in full force and effect.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.3 No Waiver</h3>
                  <p className="text-gray-300">
                    Our failure to enforce any right or provision of these Terms shall not be deemed a
                    waiver of such right or provision.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.4 Assignment</h3>
                  <p className="text-gray-300">
                    You may not assign or transfer these Terms without our prior written consent. We may
                    assign these Terms without restriction.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.5 Force Majeure</h3>
                  <p className="text-gray-300">
                    Neither party shall be liable for any failure or delay in performance due to circumstances
                    beyond its reasonable control, including natural disasters, war, terrorism, riots,
                    embargoes, acts of civil or military authorities, fire, floods, accidents, pandemic,
                    strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.6 Notices</h3>
                  <p className="text-gray-300">
                    Notices to you may be sent to the email address associated with your account. Notices
                    to us should be sent to <a href="mailto:legal@catyai.io" className="text-primary-400 hover:text-primary-300">legal@catyai.io</a>.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">15.7 Changes to Terms</h3>
                  <p className="text-gray-300">
                    We may modify these Terms at any time. Material changes will be notified via email or
                    through the Services at least 30 days before they take effect. Your continued use of
                    the Services after changes take effect constitutes acceptance of the modified Terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 16: Contact Information */}
            <section id="contact-information" className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-primary-500/20 rounded-lg text-primary-400 text-sm font-bold">16</span>
                Contact Information
              </h2>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <p className="text-gray-300 mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Legal Inquiries</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:legal@catyai.io" className="text-primary-400 hover:text-primary-300">legal@catyai.io</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">General Support</h4>
                    <p className="text-gray-300 text-sm">
                      Email: <a href="mailto:support@catyai.io" className="text-primary-400 hover:text-primary-300">support@catyai.io</a>
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Website</h4>
                    <p className="text-gray-300 text-sm">
                      <a href="https://catyai.io" className="text-primary-400 hover:text-primary-300">https://catyai.io</a>
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
                  <strong>Disclaimer:</strong> These Terms of Service are a template for informational purposes.
                  Consult with a qualified attorney for legal advice specific to your situation and jurisdiction.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
  )
}

export default TermsOfService
