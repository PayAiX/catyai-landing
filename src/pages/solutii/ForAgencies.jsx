import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "SoftwareApplication"],
  "name": "CatyAI for Marketing Agencies",
  "applicationCategory": "BusinessApplication",
  "description": "White-label AI Sales Agent for your agency clients — functional in 24 hours. Multi-widget, custom branding, exportable analytics.",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "EUR" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://catyai.io/solutii/agentii-marketing",
    "serviceType": "AI Agency White-Label Solution"
  },
  "provider": { "@type": "Organization", "name": "PayAi-X FZE", "url": "https://catyai.io" }
};

function PainCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0A1628]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#1a2744]/50 hover:border-gold/50 transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-sm font-bold flex-shrink-0 mt-1">
        {step}
      </div>
      <div>
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#010A1F]/50 rounded-xl border border-[#1a2744]/50">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
    </div>
  );
}

export default function ForAgencies() {
  return (
    <>
      <Helmet>
        <title>CatyAI for Marketing Agencies — AI for Your Clients in 24h</title>
        <meta name="description" content="Offer your clients a working AI assistant in 24 hours. Multi-widget, custom branding, exportable analytics. Reseller model available." />
        <link rel="canonical" href="https://catyai.io/solutii/agentii-marketing" />
        <meta property="og:title" content="CatyAI for Agencies — White-Label AI Solution" />
        <meta property="og:description" content="Deploy AI for agency clients in 24h. Custom branding. Exportable reports." />
        <meta property="og:url" content="https://catyai.io/solutii/agentii-marketing" />
        <meta property="og:image" content="https://catyai.io/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="bg-[#010A1F] min-h-screen pt-24">

        {/* HERO */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm mb-6">
              📣 Solution for Marketing Agencies
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              CatyAI for{' '}
              <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">
                Marketing Agencies
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              AI Sales Agent for your clients — deployed in 24 hours.
              Custom branding, exportable analytics, reseller pricing.
            </p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Add an AI assistant to your agency offering. Set up CatyAI for clients
              in less than a day — with their logo, colors, and knowledge base.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free — 2 minute setup →
              </a>
              <a href="mailto:contact@catyai.io"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                Contact team
              </a>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Problems agencies face today</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">Challenges of the modern digital marketing agency — solved by CatyAI.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PainCard icon="⏳" title="Slow setup for new clients"
                desc="Traditional chatbot implementation takes weeks. With CatyAI, your client is live in 24 hours." />
              <PainCard icon="🎨" title="Client branding, not yours"
                desc="CatyAI allows full custom branding — logo, colors, communication tone adapted to each client." />
              <PainCard icon="📈" title="No performance reports"
                desc="Dashboard with detailed exportable analytics — conversations, leads, conversions — ready for your monthly client report." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">How it works for agencies</h2>
            <div className="space-y-8">
              <StepCard step="1" title="Create a separate widget for each client"
                desc="From the CatyAI dashboard, configure the widget with client's logo, colors, and knowledge base. Takes under an hour." />
              <StepCard step="2" title="Client installs one line of code on their site"
                desc="Or you install it directly — simple embed compatible with any CMS. No external dependencies." />
              <StepCard step="3" title="Monitor performance from dashboard and report monthly"
                desc="Conversations, captured leads, frequent topics — all exportable to CSV or PDF for your report." />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Features built for agencies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureItem icon="🎨" text="Full custom branding per client — logo, colors, tone." />
              <FeatureItem icon="📊" text="Exportable analytics CSV/PDF — ready for client reports." />
              <FeatureItem icon="🔗" text="Multi-widget — one account, multiple clients." />
              <FeatureItem icon="🌐" text="Web widget + WhatsApp for each client." />
              <FeatureItem icon="⚡" text="Setup under 24h per client." />
              <FeatureItem icon="🛡️" text="FraudAI Shield included in all plans." />
            </div>
          </div>
        </section>

        {/* RESELLER CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-[#0A1628]/50 rounded-2xl border border-gold/30 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h2 className="text-2xl font-bold text-white mb-3">CatyAI Reseller Model</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Resell CatyAI under your own brand with your own margin. Special pricing for agencies with a portfolio of 5+ active clients.
              </p>
              <a href="mailto:contact@catyai.io?subject=CatyAI Reseller Partnership"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-[#D4B57A] text-[#010A1F] font-bold rounded-xl transition-all">
                Request Reseller Details
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a2744]/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Add AI to your agency offering</h2>
            <p className="text-gray-400 mb-8">First client live in 24 hours. No upfront costs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free →
              </a>
              <Link to="/pricing"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                Agency pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
