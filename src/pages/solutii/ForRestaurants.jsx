import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "SoftwareApplication"],
  "name": "CatyAI for Restaurants",
  "applicationCategory": "BusinessApplication",
  "description": "AI assistant for reservations and menu inquiries 24/7. QR at the table, no receptionist needed.",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "EUR" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://catyai.io/solutii/restaurante",
    "serviceType": "AI Restaurant Reservation Assistant"
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

export default function ForRestaurants() {
  return (
    <>
      <Helmet>
        <title>CatyAI for Restaurants — AI Reservations & Menu 24/7 | QR-First</title>
        <meta name="description" content="QR at the table — guests scan, CatyAI answers menu questions, allergens, availability and books reservations automatically. No receptionist needed." />
        <link rel="canonical" href="https://catyai.io/solutii/restaurante" />
        <meta property="og:title" content="CatyAI for Restaurants — 24/7 AI Reservations" />
        <meta property="og:description" content="QR code replaces the night receptionist. Reservations confirmed automatically." />
        <meta property="og:url" content="https://catyai.io/solutii/restaurante" />
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
              🍽️ Solution for Restaurants
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              CatyAI for{' '}
              <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">
                Restaurants
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Reservations and menu AI — guests scan QR, get answers,
              and book a table. No app download, no receptionist.
            </p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              CatyAI handles inquiries about menu, allergens, and availability —
              then confirms reservations on WhatsApp. Works 24/7, including weekends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free — 2 minute setup →
              </a>
              <Link to="/no-website"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                How QR-First works
              </Link>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Problems costing you reservations every week</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">Common HoReCa challenges — CatyAI solves all of them.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PainCard icon="📞" title="Calls at impossible hours"
                desc="Guests call Sunday at 10 PM to book for Friday. CatyAI takes the request instantly and confirms automatically." />
              <PainCard icon="🌍" title="Tourists who don't speak the local language"
                desc="CatyAI responds in 14 languages — English, German, Italian, and more — without multilingual staff." />
              <PainCard icon="🌙" title="Reservations lost overnight"
                desc="Without a night receptionist, your restaurant loses bookings. CatyAI is active 24/7 — weekends included." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">How it works for your restaurant</h2>
            <div className="space-y-8">
              <StepCard step="1" title="Guest scans QR code on the table or entrance door"
                desc="They're redirected to WhatsApp where CatyAI greets them with the menu and daily specials." />
              <StepCard step="2" title="CatyAI answers questions about menu, allergens, availability"
                desc="Information is pulled from your knowledge base — updated anytime from the dashboard." />
              <StepCard step="3" title="Reservation confirmed with date, time, and party size"
                desc="Your team gets a notification. The guest gets confirmation on WhatsApp with all details." />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Features built for restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureItem icon="📱" text="Branded QR code — no website needed. Guests scan and chat." />
              <FeatureItem icon="🍴" text="Digital menu updatable from dashboard — prices, dishes, specials." />
              <FeatureItem icon="🌐" text="14 languages automatic — perfect for tourist areas." />
              <FeatureItem icon="🔔" text="Real-time reservation notifications to your team." />
              <FeatureItem icon="💬" text="WhatsApp Business without Meta API — zero BSP costs." />
              <FeatureItem icon="🛡️" text="FraudAI Shield — blocks fake reservations before they reach staff." />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a2744]/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Your restaurant open for reservations 24/7</h2>
            <p className="text-gray-400 mb-8">One QR code replaces the night receptionist. Setup in 30 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free →
              </a>
              <Link to="/pricing"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
