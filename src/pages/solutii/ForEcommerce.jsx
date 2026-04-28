import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const platforms = ['WordPress', 'Shopify', 'WooCommerce', 'Wix', 'GoMag', 'Magento'];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["OnlineStore", "SoftwareApplication"],
  "name": "CatyAI for E-commerce",
  "applicationCategory": "BusinessApplication",
  "description": "AI assistant that answers product questions, recovers abandoned carts on WhatsApp, and increases conversion. Works with Shopify, WooCommerce, GoMag.",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "EUR" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://catyai.io/solutii/ecommerce",
    "serviceType": "AI E-commerce Sales Assistant"
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

export default function ForEcommerce() {
  return (
    <>
      <Helmet>
        <title>CatyAI for E-commerce — Boost Conversion with AI | Shopify, WooCommerce</title>
        <meta name="description" content="AI assistant that answers product questions, stock and delivery inquiries — and recovers abandoned carts on WhatsApp. Compatible with any platform." />
        <link rel="canonical" href="https://catyai.io/solutii/ecommerce" />
        <meta property="og:title" content="CatyAI for E-commerce — AI Sales Assistant" />
        <meta property="og:description" content="Recover abandoned carts. Answer pre-sale questions 24/7. Increase conversion." />
        <meta property="og:url" content="https://catyai.io/solutii/ecommerce" />
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
              🛍️ Solution for Online Stores
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              CatyAI for{' '}
              <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">
                E-commerce
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Boost conversion with AI — answer product questions instantly
              and recover abandoned carts on WhatsApp.
            </p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              CatyAI responds to stock, delivery, and return questions 24/7 —
              and automatically follows up on abandoned carts with a recovery coupon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free — 2 minute setup →
              </a>
              <Link to="/widget"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                Caty Widget
              </Link>
            </div>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">Works with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {platforms.map((p) => (
                <span key={p} className="px-4 py-2 bg-[#0A1628]/50 border border-[#1a2744]/50 rounded-full text-sm text-gray-300 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Problems costing you sales every day</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">The most expensive friction points in e-commerce — solved by CatyAI.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PainCard icon="🛒" title="Abandoned carts"
                desc="70% of carts are abandoned. CatyAI sends a WhatsApp message with a recovery coupon within 30 minutes — 15-25% recovery rate." />
              <PainCard icon="🔁" title="Repetitive pre-sale questions"
                desc="'Is it in stock?', 'When will it arrive?', 'Can I return it?'. CatyAI answers instantly, 24/7, no human agent needed." />
              <PainCard icon="📱" title="Customers who don't return"
                desc="CatyAI sends automated post-purchase follow-ups and relevant cross-sell — on WhatsApp, the channel with 98% open rate." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">How it works for your store</h2>
            <div className="space-y-8">
              <StepCard step="1" title="Install the widget in 5 minutes on any platform"
                desc="One line of code in WordPress, Shopify, or GoMag. Or use the native integration available in the dashboard." />
              <StepCard step="2" title="CatyAI answers visitors in real-time"
                desc="Product questions, stock, delivery, returns — all resolved instantly. The customer stays on-site and buys." />
              <StepCard step="3" title="Abandoned carts are recovered automatically"
                desc="Shopify/WooCommerce webhook → CatyAI sends WhatsApp message → 15-25% recovery rate." />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Features built for e-commerce</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureItem icon="🛒" text="WhatsApp abandoned cart recovery with coupon codes." />
              <FeatureItem icon="📦" text="Product and stock knowledge base — answers based on your catalog." />
              <FeatureItem icon="💬" text="Live chat on site + WhatsApp unified — one inbox for everything." />
              <FeatureItem icon="📊" text="Conversion analytics in dashboard — see what's working." />
              <FeatureItem icon="🔗" text="Native Shopify, WooCommerce, GoMag integrations." />
              <FeatureItem icon="🛡️" text="FraudAI Shield — detects fake orders before they cost you money." />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a2744]/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">More sales, less support tickets</h2>
            <p className="text-gray-400 mb-8">CatyAI turns visitors into buyers — and buyers into repeat customers.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free →
              </a>
              <Link to="/compare"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                Compare with alternatives
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
