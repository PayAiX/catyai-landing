import { useState } from 'react'

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src="/images/caty 1.png" alt="Caty.AI" className="h-10 w-10" />
            <span className="text-xl font-bold">Caty.AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white transition-colors">Login</a>
            <a href="https://app.catyai.io/signup" className="btn-primary text-sm">Get Started Free</a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-300 hover:text-white">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
              <a href="#faq" className="text-gray-300 hover:text-white">FAQ</a>
              <hr className="border-gray-800" />
              <a href="https://app.catyai.io/login" className="text-gray-300 hover:text-white">Login</a>
              <a href="https://app.catyai.io/signup" className="btn-primary text-center">Get Started Free</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
            Powered by GPT-4o
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-balance">
            AI That Actually
            <span className="gradient-text block mt-2">Converts</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Transform your website visitors into paying customers with an intelligent chatbot
            that understands intent, captures leads, and works 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="https://app.catyai.io/signup" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10"></div>
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/caty 1.png" alt="Caty" className="w-12 h-12 animate-float" />
              <div>
                <h3 className="font-semibold text-white">Try Me Now!</h3>
                <p className="text-sm text-gray-400">Click the chat icon in the bottom right corner</p>
              </div>
            </div>
            <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700">
              <p className="text-gray-500">Live demo widget is active on this page</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Intent Detection',
      description: 'AI understands what visitors want - ready to buy, need support, or just browsing. Responds appropriately every time.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Lead Capture',
      description: 'Automatically collect contact information at the right moment. Smart forms that dont feel pushy.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Knowledge Base',
      description: 'Train your AI on your products, FAQs, and docs. Answers questions accurately with your actual information.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Availability',
      description: 'Never miss a lead again. Your AI assistant works around the clock, even when youre sleeping.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Human Handoff',
      description: 'Seamlessly transfer complex issues to your team. AI knows when to escalate.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Analytics Dashboard',
      description: 'Track conversations, conversion rates, and ROI. Know exactly whats working.'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Everything You Need to <span className="gradient-text">Convert More</span></h2>
        <p className="section-subtitle">
          Powerful AI features that work together to turn visitors into customers
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card hover:border-primary-500/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Install Widget',
      description: 'Add one line of code to your website. Works with any platform - WordPress, Shopify, React, or plain HTML.',
      code: '<script src="https://api.catyai.io/widget.js" data-api-key="YOUR_KEY"></script>'
    },
    {
      number: '02',
      title: 'Train Your AI',
      description: 'Upload your FAQs, docs, and product info. Caty learns your business in minutes, not days.',
      image: '/images/caty 34.png'
    },
    {
      number: '03',
      title: 'Start Converting',
      description: 'Watch as Caty engages visitors, answers questions, captures leads, and drives sales 24/7.',
      image: '/images/caty 1.png'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Live in <span className="gradient-text">5 Minutes</span></h2>
        <p className="section-subtitle">
          No complex setup. No coding required. Just copy, paste, and convert.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent -z-10"></div>
              )}
              <div className="card h-full">
                <div className="text-5xl font-bold text-primary-500/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                {step.code && (
                  <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-primary-400 whitespace-nowrap">{step.code}</code>
                  </div>
                )}
                {step.image && (
                  <div className="flex justify-center mt-4">
                    <img src={step.image} alt={step.title} className="h-24 w-24 object-contain" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '49',
      description: 'Perfect for small businesses just getting started',
      features: [
        '500 conversations/month',
        '1 widget',
        'Basic analytics',
        'Email support',
        'Knowledge base (25 docs)',
        'Intent detection'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Growth',
      price: '149',
      description: 'For growing businesses that need more power',
      features: [
        '2,000 conversations/month',
        '3 widgets',
        'Advanced analytics',
        'Priority support',
        'Knowledge base (100 docs)',
        'Lead scoring',
        'Human handoff',
        'Custom branding'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Business',
      price: '349',
      description: 'For businesses that need unlimited scale',
      features: [
        '10,000 conversations/month',
        'Unlimited widgets',
        'Enterprise analytics',
        'Dedicated support',
        'Unlimited knowledge base',
        'API access',
        'CRM integrations',
        'Custom AI training',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
        <p className="section-subtitle">
          Start free, upgrade when you need. No hidden fees.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card relative ${plan.popular ? 'border-primary-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">€{plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.catyai.io/signup"
                className={`w-full block text-center ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How does Caty.AI work?',
      answer: 'Caty.AI is a smart chatbot widget that you embed on your website. It uses GPT-4o to understand visitor questions and respond intelligently. You can train it on your specific products, FAQs, and documentation so it gives accurate answers about your business.'
    },
    {
      question: 'How long does setup take?',
      answer: 'Most customers are live in under 5 minutes. Just copy our script tag into your website, configure your widget in our dashboard, and you are ready to go. No coding required.'
    },
    {
      question: 'Can I customize the appearance?',
      answer: 'Absolutely! You can customize colors, position, greeting messages, avatar, and more to match your brand. The widget is designed to feel like a natural part of your website.'
    },
    {
      question: 'What happens when Caty cannot answer a question?',
      answer: 'Caty is smart about knowing its limits. When it cannot answer confidently, it can either collect the visitors info for follow-up, transfer to a human agent, or offer to create a support ticket - whatever you configure.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are GDPR compliant and never use your data to train AI models. Your business information stays yours.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. No long-term contracts, no cancellation fees. Your service continues until the end of your billing period.'
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
        <p className="section-subtitle">
          Everything you need to know about Caty.AI
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 text-gray-400 border-t border-gray-800 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="card bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Convert More Visitors?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Caty.AI to grow their revenue.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.catyai.io/signup" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </a>
            <a href="https://app.catyai.io" className="btn-secondary text-lg px-8 py-4">
              View Dashboard Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/caty 1.png" alt="Caty.AI" className="h-8 w-8" />
              <span className="text-lg font-bold">Caty.AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              The AI chatbot that actually converts. Built for businesses that want results.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="https://app.catyai.io" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="https://docs.catyai.io" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/gdpr" className="hover:text-white transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Caty.AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/catyai" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="https://linkedin.com/company/catyai" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/catyai" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
