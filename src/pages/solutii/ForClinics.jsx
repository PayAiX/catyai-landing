import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

function PainCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-[#0A1628]/50 rounded-2xl border border-[#1a2744]/50 hover:border-[#C48D32]/50 transition-colors">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function StepCard({ step, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-[#C48D32]/20 border border-[#C48D32]/40 flex items-center justify-center text-[#C48D32] font-bold text-sm">
        {step}
      </div>
      <div>
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#010A1F]/50 rounded-xl border border-[#1a2744]/40">
      <span className="text-xl shrink-0">{icon}</span>
      <span className="text-gray-300 text-sm">{text}</span>
    </div>
  )
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      name: 'CatyAI pentru Clinici Medicale',
      description: 'Asistent AI pentru programări automate și răspuns la întrebări — non-stop.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'CatyAI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Plan gratuit disponibil',
      },
    },
  ],
}

export default function ForClinics() {
  return (
    <div className="bg-[#010A1F] text-white min-h-screen">
      <Helmet>
        <title>CatyAI pentru Clinici Medicale — Programări Automate AI 24/7 | România</title>
        <meta
          name="description"
          content="Asistentul AI care preia programările și răspunde la întrebări despre servicii și asigurări — non-stop. Fără angajat dedicat la recepție."
        />
        <link rel="canonical" href="https://catyai.io/solutii/clinici-medicale" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C48D32]/10 border border-[#C48D32]/20 text-[#C48D32] text-sm font-medium mb-6">
            <span>🏥</span>
            Soluție pentru Clinici Medicale
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Programări Automate<br />
            <span className="text-[#C48D32]">24/7 — Fără Recepționer</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            CatyAI preia apelurile și mesajele pacienților, programează consultații, răspunde la întrebări despre servicii și asigurări — non-stop, în română și engleză.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F] rounded-xl font-semibold transition-colors"
            >
              Testează Gratuit
            </a>
            <Link
              to="/pricing"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Vezi Prețuri
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Probleme pe care le rezolvăm</h2>
          <p className="text-gray-400 text-center mb-10">Cele mai frecvente provocări din clinicile medicale românești</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PainCard
              icon="📞"
              title="Telefoane ratate"
              desc="Pacienții sună în afara programului și nu primesc răspuns. CatyAI preia mesajele și programează automat — 24/7."
            />
            <PainCard
              icon="📄"
              title="Întrebări repetitive"
              desc="Recepționerii pierd ore întregi răspunzând la aceleași întrebări despre prețuri, asigurări și servicii disponibile."
            />
            <PainCard
              icon="❌"
              title="Programări anulate"
              desc="Pacienții uită de programări. CatyAI trimite remindere automate pe WhatsApp și reduce no-show-urile cu până la 40%."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Cum funcționează</h2>
          <div className="space-y-8">
            <StepCard
              step="1"
              title="Pacientul trimite mesaj pe WhatsApp sau scrie pe site"
              desc="CatyAI răspunde instant — întreabă despre tipul de consultație, data preferată și datele de contact."
            />
            <StepCard
              step="2"
              title="AI-ul verifică disponibilitatea și face programarea"
              desc="Integrare cu Google Calendar sau sistemul tău de programări. Confirmarea ajunge imediat pe WhatsApp-ul pacientului."
            />
            <StepCard
              step="3"
              title="Reminder automat cu 24h înainte"
              desc="CatyAI trimite un mesaj de confirmare și reduce no-show-urile fără niciun efort din partea echipei tale."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Ce primești</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <FeatureItem icon="🗓️" text="Programări automate integrate cu Google Calendar" />
            <FeatureItem icon="💬" text="Răspuns WhatsApp 24/7 — fără Meta API" />
            <FeatureItem icon="🔔" text="Remindere automate pre-programare" />
            <FeatureItem icon="📋" text="Captare date pacient (formular lead)" />
            <FeatureItem icon="🌐" text="Widget web instalat în 5 minute" />
            <FeatureItem icon="🛡️" text="FraudAI Shield — blochează spamul și scam-urile" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-[#010A1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Gata să automatizezi recepția?</h2>
          <p className="text-gray-400 mb-8">Setup în 30 de minute. Fără angajat suplimentar. Fără noapte albă.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://app.catyai.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#C48D32] hover:bg-[#D4B57A] text-[#010A1F] rounded-xl font-semibold transition-colors"
            >
              Începe Gratuit
            </a>
            <Link
              to="/whatsapp"
              className="px-8 py-3 border border-[#1a2744] hover:border-[#C48D32]/50 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors"
            >
              CatyAI pe WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
