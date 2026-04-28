import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "SoftwareApplication"],
  "name": "CatyAI for Real Estate Agencies",
  "applicationCategory": "BusinessApplication",
  "description": "AI agent that qualifies leads and schedules property viewings automatically. 24/7 on WhatsApp and web.",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "EUR" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://catyai.io/solutii/agentii-imobiliare",
    "serviceType": "AI Real Estate Lead Qualification"
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

export default function ForRealEstate() {
  return (
    <>
      <Helmet>
        <title>CatyAI for Real Estate — AI Lead Qualification 24/7 | WhatsApp + Web</title>
        <meta name="description" content="AI agent that qualifies buyers by budget, property type, and location — then delivers ready-to-view leads. No manual follow-up needed." />
        <link rel="canonical" href="https://catyai.io/solutii/agentii-imobiliare" />
        <meta property="og:title" content="CatyAI for Real Estate — 24/7 Lead Qualification" />
        <meta property="og:description" content="Qualify leads automatically. Schedule viewings without lifting the phone." />
        <meta property="og:url" content="https://catyai.io/solutii/agentii-imobiliare" />
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
              🏠 Solution for Real Estate Agencies
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              CatyAI for{' '}
              <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">
                Real Estate
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Qualify leads automatically — budget, property type, preferred area —
              and receive only viewing-ready prospects.
            </p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              AI agent that handles inquiries on WhatsApp and your website 24/7.
              You focus on closing deals, not chasing unqualified calls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free — 2 minute setup →
              </a>
              <Link to="/pricing"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                See pricing
              </Link>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Problems costing you deals every week</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">Sound familiar? CatyAI handles all of these automatically.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PainCard icon="🕐" title="Hours wasted on unqualified leads"
                desc="Agents spend half their day on calls with buyers who don't have the budget or aren't ready to commit." />
              <PainCard icon="📉" title="Leads lost overnight"
                desc="A buyer messages at 11 PM. By morning, they've already scheduled a viewing with a competitor who replied first." />
              <PainCard icon="📊" title="No structured data on preferences"
                desc="Without proper qualification, agents don't know which properties to show first — wasting everyone's time." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">How it works for your agency</h2>
            <div className="space-y-8">
              <StepCard step="1" title="Prospect messages on WhatsApp or your website"
                desc="CatyAI responds instantly and starts qualification: budget, property type, preferred area, purchase timeline." />
              <StepCard step="2" title="Qualified lead lands in your dashboard"
                desc="You get a notification with all details: name, contact, preferences — ready for follow-up." />
              <StepCard step="3" title="Viewing scheduled automatically"
                desc="CatyAI proposes available slots and confirms the viewing directly on WhatsApp. You just show up." />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Features built for real estate</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureItem icon="🎯" text="Automatic qualification: budget, property type, location, timeline — before you pick up the phone." />
              <FeatureItem icon="💬" text="WhatsApp 24/7 without Meta API — works with your existing business number." />
              <FeatureItem icon="📋" text="Exportable leads from dashboard with all collected data." />
              <FeatureItem icon="🔔" text="Instant notifications for new qualified leads." />
              <FeatureItem icon="🌐" text="Web widget on your agency website — same AI, unified inbox." />
              <FeatureItem icon="🛡️" text="FraudAI Shield included — filters fake inquiries before they waste your time." />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a2744]/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">More viewings, less phone tag</h2>
            <p className="text-gray-400 mb-8">CatyAI works 24/7 — you focus on closing deals.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free →
              </a>
              <Link to="/features"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                See all features
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
