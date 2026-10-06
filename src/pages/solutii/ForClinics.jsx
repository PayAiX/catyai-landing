import SolutionPage from './SolutionPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalOrganization', 'SoftwareApplication'],
  name: 'CatyAI for Medical Clinics',
  applicationCategory: 'BusinessApplication',
  description: 'AI assistant that handles appointment booking and answers questions about services and insurance 24/7. No dedicated receptionist needed.',
  offers: { '@type': 'Offer', price: '49', priceCurrency: 'EUR' },
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://catyai.io/solutii/clinici-medicale', serviceType: 'AI Medical Appointment Assistant' },
  provider: { '@type': 'Organization', name: 'PayAi-X FZE', url: 'https://catyai.io' },
}

const T = {
  en: {
    meta: { title: 'CatyAI for Medical Clinics — AI Appointment Booking 24/7 | No Receptionist', desc: 'AI assistant that handles appointment booking, answers insurance and service questions around the clock. No dedicated staff needed.' },
    badge: '🏥 Solution for Medical Clinics',
    h1Prefix: 'CatyAI for', h1Accent: 'Medical Clinics',
    heroLead: '24/7 appointment booking — patients always get a response, your reception is never overwhelmed.',
    heroSub: 'AI assistant that handles bookings, answers insurance and service questions — around the clock. No dedicated staff needed.',
    ctaPrimary: 'Start free — 2 minute setup →',
    ctaSecondary: { label: 'See pricing', to: '/pricing' },
    painsTitle: 'Problems costing you patients every day',
    painsSub: 'Sound familiar? CatyAI handles all of these automatically.',
    pains: [
      { icon: '📞', title: 'Patients calling at 10 PM', desc: "They need an urgent appointment. Nobody answers. By morning they've booked at another clinic — and you never knew they tried." },
      { icon: '🔄', title: 'The same questions, endlessly', desc: 'Opening hours, prices, accepted insurance, parking, address. Your reception answers the same 20 questions manually, 50 times a day.' },
      { icon: '❌', title: 'Missed bookings on weekends', desc: 'Saturday and Sunday — zero availability. Patients searching on weekends choose any clinic that actually responds.' },
    ],
    stepsTitle: 'How it works for your clinic',
    steps: [
      { title: 'Patient writes on your website or WhatsApp — any time', desc: '10 PM Saturday or 7 AM Monday. CatyAI responds instantly with availability, prices and service information.' },
      { title: 'CatyAI qualifies and collects the necessary data', desc: 'Consultation type, insurance, contact details, urgency. The patient receives immediate confirmation with the right slot.' },
      { title: 'You find the qualified lead in the morning', desc: 'Every new booking appears in your dashboard with all data. Reception confirms or adjusts in 2 clicks.' },
    ],
    featuresTitle: 'Features built for clinics',
    features: [
      { icon: '📚', text: 'Knowledge Base with your full service list, prices and accepted insurance — updated anytime from the dashboard.' },
      { icon: '📱', text: 'WhatsApp Business integration without Meta API — works with your existing number, zero BSP costs.' },
      { icon: '📋', text: 'Pre-appointment data collection: name, contact, consultation type, insurance — before the booking is confirmed.' },
      { icon: '🌐', text: '14 languages: ideal for clinics with international patients or expat communities.' },
      { icon: '🛡️', text: 'FraudAI Shield included — filters fake inquiries and spam before they reach reception.' },
      { icon: '📊', text: 'Analytics: most requested services, peak hours, conversion rate from chat to confirmed appointment.' },
    ],
    finalTitle: 'Stop losing patients outside opening hours',
    finalSub: '2 minute setup. No developer needed. From €49/month. First widget completely free.',
    finalPrimary: 'Start free →',
    finalSecondary: { label: 'See WhatsApp AI Secretary', to: '/whatsapp' },
  },
  ro: {
    meta: { title: 'CatyAI pentru clinici medicale — Programări AI 24/7 | Fără recepționer dedicat', desc: 'Pacienții primesc răspuns la orice oră, iar recepția nu mai e copleșită. Programări, întrebări despre servicii și asigurări — automat, 24/7.' },
    badge: '🏥 Soluție pentru clinici medicale',
    h1Prefix: 'CatyAI pentru', h1Accent: 'clinici medicale',
    heroLead: 'Programări 24/7 — pacienții primesc mereu răspuns, recepția ta nu e niciodată copleșită.',
    heroSub: 'Asistent AI care preia programări și răspunde la întrebări despre servicii și asigurări — non-stop, fără personal dedicat.',
    ctaPrimary: 'Începe gratuit — setup în 2 minute →',
    ctaSecondary: { label: 'Vezi prețurile', to: '/pricing' },
    painsTitle: 'Probleme care te costă pacienți zilnic',
    pains: [
      { icon: '📞', title: 'Pacienți care sună la 22:00.', desc: 'Au nevoie de o programare urgentă. Nu răspunde nimeni. Până dimineața s-au programat la altă clinică — și tu n-ai știut că au încercat.' },
      { icon: '🔄', title: 'Aceleași întrebări, la infinit.', desc: 'Program, prețuri, asigurări acceptate, parcare, adresă. Recepția răspunde manual la aceleași 20 de întrebări, de 50 de ori pe zi.' },
      { icon: '❌', title: 'Programări pierdute în weekend.', desc: 'Sâmbătă și duminică — zero disponibilitate. Pacienții care caută în weekend aleg clinica care răspunde efectiv.' },
    ],
    stepsTitle: 'Cum funcționează pentru clinica ta',
    steps: [
      { title: 'Pacientul scrie pe site sau pe WhatsApp — la orice oră.', desc: 'Sâmbătă la 22:00 sau luni la 7:00. CatyAI răspunde instant cu disponibilitate, prețuri și informații despre servicii.' },
      { title: 'CatyAI califică și colectează datele necesare.', desc: 'Tipul consultației, asigurarea, datele de contact, urgența. Pacientul primește imediat confirmarea cu slotul potrivit.' },
      { title: 'Dimineața găsești leadul calificat în dashboard.', desc: 'Fiecare programare nouă apare cu toate datele. Recepția confirmă sau ajustează în 2 click-uri.' },
    ],
    featuresTitle: 'Funcții construite pentru clinici',
    features: [
      { icon: '📚', text: 'Bază de cunoștințe cu lista completă de servicii, prețuri și asigurări acceptate — actualizabilă oricând din dashboard.' },
      { icon: '📱', text: 'Integrare WhatsApp Business fără Meta API — funcționează cu numărul tău existent, zero costuri BSP.' },
      { icon: '📋', text: 'Colectare date înainte de programare: nume, contact, tip consultație, asigurare.' },
      { icon: '🌐', text: '14 limbi — ideal pentru clinici cu pacienți internaționali sau comunități de expați.' },
      { icon: '🛡️', text: 'FraudAI Shield inclus — filtrează solicitările false și spamul înainte să ajungă la recepție.' },
      { icon: '📊', text: 'Analitice: cele mai cerute servicii, orele de vârf, conversia din chat în programare confirmată.' },
    ],
    finalTitle: 'Nu mai pierde pacienți în afara programului.',
    finalPrimary: 'Începe gratuit →',
    finalSecondary: { label: 'Vezi Secretara AI pe WhatsApp', to: '/whatsapp' },
  },
}

export default function ForClinics({ locale }) {
  return <SolutionPage slug="clinici-medicale" locale={locale} t={T[locale] || T.en} jsonLd={jsonLd} />
}
