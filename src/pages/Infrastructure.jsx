import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

function FeatureSection({ title, badge, badgeColor = 'blue', items }) {
  const colors = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    gold: 'bg-[#C48D32]/10 border-[#C48D32]/20 text-[#C48D32]',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
  }
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${colors[badgeColor]}`}>
          {badge}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-[#0A1628] border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-colors">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const sentinelFeatures = [
  { icon: '🧠', title: 'Neural Brain V2', desc: 'Multi-stage reasoning pipeline with context fusion, intent classification, and adaptive response generation.' },
  { icon: '🔍', title: 'Bodies RAG', desc: '10 specialized retrieval bodies covering products, pricing, policies, FAQs, and real-time business data.' },
  { icon: '📊', title: 'Maturity Scoring', desc: 'Automatically scores lead digital maturity on a 1-5 scale and adapts conversation depth accordingly.' },
  { icon: '🎯', title: 'Intent Detection', desc: 'Identifies purchase intent, price inquiries, and objections in real time — triggers the right action instantly.' },
  { icon: '🌐', title: 'Multilingual', desc: 'Native support for 30+ languages with automatic detection and seamless mid-conversation switching.' },
  { icon: '⚡', title: 'Sub-second latency', desc: 'Average response time under 800 ms globally via edge inference and persistent context caching.' },
]

const napFeatures = [
  { icon: '📋', title: 'DocGen Engine', desc: 'Generates offers, contracts, technical specs, and meeting summaries on demand — in the user\'s language.' },
  { icon: '🤝', title: '6 SAG Agents', desc: 'Specialist agents for secretary, logistics, legal, finance, HR, and support — zero LLM calls, fully deterministic.' },
  { icon: '📅', title: 'Calendar Integration', desc: 'Books meetings directly in Google Calendar or Outlook from within the chat, with conflict detection.' },
  { icon: '📧', title: 'Email Automation', desc: 'Sends follow-up emails, proposal PDFs, and onboarding sequences triggered by conversation outcomes.' },
  { icon: '🔗', title: 'CRM Sync', desc: 'Pushes qualified leads and conversation summaries to HubSpot, Salesforce, and custom CRMs via webhook.' },
  { icon: '📦', title: 'Order Notifications', desc: 'Universal webhook for WooCommerce, Shopify, and custom platforms — proactive order updates on WhatsApp.' },
]

const geoFeatures = [
  { icon: '📄', title: 'Dynamic llms.txt', desc: 'Machine-readable business manifest served to AI crawlers — updated in real time as your catalog changes.' },
  { icon: '🤖', title: 'AI Crawler Detection', desc: 'Identifies GPTBot, ClaudeBot, PerplexityBot and 6 more at the edge. Serves schema-rich pre-rendered HTML.' },
  { icon: '💬', title: '/answer Portal', desc: 'Structured plain-prose answers to your top 50 FAQs — the format AI engines prefer for answer synthesis.' },
  { icon: '📡', title: 'Active Beacon', desc: 'Notifies IndexNow and AI search APIs on every content change. Appear in AI answers within minutes.' },
  { icon: '🌐', title: 'GEO Distribution', desc: 'Publishes to knowledge graphs and citation directories AI engines use as retrieval ground truth.' },
  { icon: '🛡️', title: 'SENTINEL Predictive', desc: 'Monitors AI engine outputs for hallucinations and competitor mentions. Auto-corrects with targeted payloads.' },
]

export default function Infrastructure() {
  return (
    <>
      <Helmet>
        <title>CatyAI Infrastructură — GEO SENTINEL, NAP Protocol, FraudAI | Standard AI 2026</title>
        <meta
          name="description"
          content="SENTINEL monitorizează vizibilitatea în ChatGPT și Claude la 6 ore. NAP semnează datele Ed25519. GEO generează llms.txt dinamic. Infrastructură neurală activă."
        />
        <meta property="og:title" content="CatyAI Infrastructură — GEO SENTINEL, NAP Protocol, FraudAI | Standard AI 2026" />
        <meta
          property="og:description"
          content="SENTINEL monitorizează vizibilitatea în ChatGPT și Claude la 6 ore. NAP semnează datele Ed25519. GEO generează llms.txt dinamic. Infrastructură neurală activă."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://catyai.io/infrastructura" />
        <link rel="canonical" href="https://catyai.io/infrastructura" />
      </Helmet>

      <div className="bg-[#010A1F] min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* PAGE HEADER */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1628] border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
              Neural Infrastructure
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Active AI Technology Standard
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              CatyAI is not a chatbot. It is an autonomous sales infrastructure — reasoning,
              acting, and closing while you sleep.
            </p>
            {/* Hero Image */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-[#1a2744]/50 shadow-2xl shadow-gold/10">
                <img
                  src="/images/infrastructure-hero.png"
                  alt="CatyAI Neural Infrastructure — Active AI Technology Standard NAP Protocol"
                  className="w-full h-auto"
                  loading="eager"
                  width="1200"
                  height="630"
                />
              </div>
            </div>
          </div>

          {/* SENTINEL */}
          <FeatureSection
            badge="SENTINEL · Core AI"
            badgeColor="blue"
            title="Neural Brain & Intelligence Layer"
            items={sentinelFeatures}
          />

          {/* NAP PROTOCOL */}
          <FeatureSection
            badge="NAP Protocol · Automation"
            badgeColor="purple"
            title="Secretary Agents & Action Layer"
            items={napFeatures}
          />

          {/* GEO GATEWAY */}
          <FeatureSection
            badge="GEO Gateway · Visibility"
            badgeColor="gold"
            title="Generative Engine Optimization"
            items={geoFeatures}
          />

          {/* FRAUDAI + SAG */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#0A1628] border border-red-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider bg-red-500/10 border-red-500/20 text-red-400">
                  FraudAI Shield
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Real-time fraud prevention</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Four rule categories — behavioral anomaly, velocity, pattern, and session integrity —
                evaluated on every message without adding latency. Blocks spam, abuse, and scraping
                before they reach your AI.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><span className="text-red-400">✓</span> Behavioral anomaly detection</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✓</span> Message velocity limits</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✓</span> Session integrity checks</li>
                <li className="flex items-center gap-2"><span className="text-red-400">✓</span> Pattern-based bot blocking</li>
              </ul>
            </div>

            <div className="bg-[#0A1628] border border-purple-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider bg-purple-500/10 border-purple-500/20 text-purple-400">
                  SAG Agents
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">6 deterministic specialist agents</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Secretary, logistics, legal, finance, HR, and support — each agent handles its domain
                with zero LLM calls. Fully deterministic, auditable, and compliant by design.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Zero hallucination risk (rule-based)</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Diacritic-aware Romanian NLP</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Full audit trail per action</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Extensible with custom domains</li>
              </ul>
            </div>
          </div>

          {/* UNIVERSAL BRAIN */}
          <div className="bg-gradient-to-br from-[#0A1628] to-[#010A1F] border border-gold/20 rounded-2xl p-8 md:p-12 mb-16 text-center">
            <div className="text-5xl mb-4">🧠</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              One brain. Every channel.
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether your customer contacts you on your website widget, WhatsApp, or QR code —
              they get the exact same AI behavior: same intelligence, same context, same speed.
              No channel-specific prompts. No inconsistency.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Infrastructure built to close deals.
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Every component above is active from day one. No modules to enable, no professional
              services required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/features"
                className="px-8 py-3 rounded-lg border border-gold/30 text-gold font-semibold text-base hover:bg-gold/10 transition-colors"
              >
                Discover how it works →
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-3 rounded-lg bg-gold text-[#010A1F] font-bold text-base hover:bg-gold/90 transition-colors"
              >
                Start free — 2 minute setup
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
