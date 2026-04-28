import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "SoftwareApplication"],
  "name": "CatyAI for Medical Clinics",
  "applicationCategory": "BusinessApplication",
  "description": "AI assistant that handles appointment booking and answers questions about services and insurance 24/7. No dedicated receptionist needed.",
  "offers": { "@type": "Offer", "price": "49", "priceCurrency": "EUR" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://catyai.io/solutii/clinici-medicale",
    "serviceType": "AI Medical Appointment Assistant"
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

export default function ForClinics() {
  return (
    <>
      <Helmet>
        <title>CatyAI for Medical Clinics — AI Appointment Booking 24/7 | No Receptionist</title>
        <meta name="description" content="AI assistant that handles appointment booking, answers insurance and service questions around the clock. No dedicated staff needed." />
        <link rel="canonical" href="https://catyai.io/solutii/clinici-medicale" />
        <meta property="og:title" content="CatyAI for Medical Clinics — 24/7 AI Appointments" />
        <meta property="og:description" content="Patients booked automatically, reception freed up. No dedicated staff needed." />
        <meta property="og:url" content="https://catyai.io/solutii/clinici-medicale" />
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
              🏥 Solution for Medical Clinics
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              CatyAI for{' '}
              <span className="bg-gradient-to-r from-gold to-[#D4B57A] bg-clip-text text-transparent">
                Medical Clinics
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              24/7 appointment booking — patients always get a response,
              your reception is never overwhelmed.
            </p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              AI assistant that handles bookings, answers insurance and service questions —
              around the clock. No dedicated staff needed.
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
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Problems costing you patients every day</h2>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">Sound familiar? CatyAI handles all of these automatically.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PainCard icon="📞" title="Patients calling at 10 PM"
                desc="They need an urgent appointment. Nobody answers. By morning they've booked at another clinic — and you never knew they tried." />
              <PainCard icon="🔄" title="The same questions, endlessly"
                desc="Opening hours, prices, accepted insurance, parking, address. Your reception answers the same 20 questions manually, 50 times a day." />
              <PainCard icon="❌" title="Missed bookings on weekends"
                desc="Saturday and Sunday — zero availability. Patients searching on weekends choose any clinic that actually responds." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">How it works for your clinic</h2>
            <div className="space-y-8">
              <StepCard step="1" title="Patient writes on your website or WhatsApp — any time"
                desc="10 PM Saturday or 7 AM Monday. CatyAI responds instantly with availability, prices and service information." />
              <StepCard step="2" title="CatyAI qualifies and collects the necessary data"
                desc="Consultation type, insurance, contact details, urgency. The patient receives immediate confirmation with the right slot." />
              <StepCard step="3" title="You find the qualified lead in the morning"
                desc="Every new booking appears in your dashboard with all data. Reception confirms or adjusts in 2 clicks." />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a2744]/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Features built for clinics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureItem icon="📚" text="Knowledge Base with your full service list, prices and accepted insurance — updated anytime from the dashboard." />
              <FeatureItem icon="📱" text="WhatsApp Business integration without Meta API — works with your existing number, zero BSP costs." />
              <FeatureItem icon="📋" text="Pre-appointment data collection: name, contact, consultation type, insurance — before the booking is confirmed." />
              <FeatureItem icon="🌐" text="14 languages: ideal for clinics with international patients or expat communities." />
              <FeatureItem icon="🛡️" text="FraudAI Shield included — filters fake inquiries and spam before they reach reception." />
              <FeatureItem icon="📊" text="Analytics: most requested services, peak hours, conversion rate from chat to confirmed appointment." />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a2744]/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Stop losing patients outside opening hours</h2>
            <p className="text-gray-400 mb-8">2 minute setup. No developer needed. From €49/month. First widget completely free.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.catyai.io/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg">
                Start free →
              </a>
              <Link to="/whatsapp"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-gold/10 border border-gold/30 rounded-xl text-gold hover:bg-gold/20 transition-colors">
                See WhatsApp AI Secretary
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
