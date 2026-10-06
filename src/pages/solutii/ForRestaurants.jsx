import SolutionPage from './SolutionPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['FoodEstablishment', 'SoftwareApplication'],
  name: 'CatyAI for Restaurants',
  applicationCategory: 'BusinessApplication',
  description: 'AI assistant for reservations and menu inquiries 24/7. QR at the table, no receptionist needed.',
  offers: { '@type': 'Offer', price: '49', priceCurrency: 'EUR' },
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://catyai.io/solutii/restaurante', serviceType: 'AI Restaurant Reservation Assistant' },
  provider: { '@type': 'Organization', name: 'PayAi-X FZE', url: 'https://catyai.io' },
}

const T = {
  en: {
    meta: { title: 'CatyAI for Restaurants — AI Reservations & Menu 24/7 | QR-First', desc: 'QR at the table — guests scan, CatyAI answers menu questions, allergens, availability and books reservations automatically. No receptionist needed.' },
    badge: '🍽️ Solution for Restaurants',
    h1Prefix: 'CatyAI for', h1Accent: 'Restaurants',
    heroLead: 'Reservations and menu AI — guests scan QR, get answers, and book a table. No app download, no receptionist.',
    heroSub: 'CatyAI handles inquiries about menu, allergens, and availability — then confirms reservations on WhatsApp. Works 24/7, including weekends.',
    ctaPrimary: 'Start free — 2 minute setup →',
    ctaSecondary: { label: 'How QR-First works', to: '/no-website' },
    painsTitle: 'Problems costing you reservations every week',
    painsSub: 'Common HoReCa challenges — CatyAI solves all of them.',
    pains: [
      { icon: '📞', title: 'Calls at impossible hours', desc: 'Guests call Sunday at 10 PM to book for Friday. CatyAI takes the request instantly and confirms automatically.' },
      { icon: '🌍', title: "Tourists who don't speak the local language", desc: 'CatyAI responds in 14 languages — English, German, Italian, and more — without multilingual staff.' },
      { icon: '🌙', title: 'Reservations lost overnight', desc: 'Without a night receptionist, your restaurant loses bookings. CatyAI is active 24/7 — weekends included.' },
    ],
    stepsTitle: 'How it works for your restaurant',
    steps: [
      { title: 'Guest scans QR code on the table or entrance door', desc: "They're redirected to WhatsApp where CatyAI greets them with the menu and daily specials." },
      { title: 'CatyAI answers questions about menu, allergens, availability', desc: 'Information is pulled from your knowledge base — updated anytime from the dashboard.' },
      { title: 'Reservation confirmed with date, time, and party size', desc: 'Your team gets a notification. The guest gets confirmation on WhatsApp with all details.' },
    ],
    featuresTitle: 'Features built for restaurants',
    features: [
      { icon: '📱', text: 'Branded QR code — no website needed. Guests scan and chat.' },
      { icon: '🍴', text: 'Digital menu updatable from dashboard — prices, dishes, specials.' },
      { icon: '🌐', text: '14 languages automatic — perfect for tourist areas.' },
      { icon: '🔔', text: 'Real-time reservation notifications to your team.' },
      { icon: '💬', text: 'WhatsApp Business without Meta API — zero BSP costs.' },
      { icon: '🛡️', text: 'FraudAI Shield — blocks fake reservations before they reach staff.' },
    ],
    finalTitle: 'Your restaurant open for reservations 24/7',
    finalSub: 'One QR code replaces the night receptionist. Setup in 30 minutes.',
    finalPrimary: 'Start free →',
    finalSecondary: { label: 'See pricing', to: '/pricing' },
  },
  ro: {
    meta: { title: 'CatyAI pentru restaurante — Rezervări și meniu AI 24/7 | QR-First', desc: 'Oaspeții scanează QR-ul, primesc răspunsuri și rezervă masă. Fără aplicație, fără recepționer de noapte.' },
    badge: '🍽️ Soluție pentru restaurante',
    h1Prefix: 'CatyAI pentru', h1Accent: 'restaurante',
    heroLead: 'Rezervări și meniu AI — oaspeții scanează QR-ul, primesc răspunsuri și rezervă masă. Fără descărcat aplicații, fără recepționer.',
    heroSub: 'CatyAI răspunde la întrebări despre meniu, alergeni și disponibilitate — apoi confirmă rezervările pe WhatsApp. Funcționează 24/7, inclusiv în weekend.',
    ctaPrimary: 'Începe gratuit — setup în 2 minute →',
    ctaSecondary: { label: 'Cum funcționează QR-First', to: '/no-website' },
    painsTitle: 'Probleme care te costă rezervări săptămânal',
    pains: [
      { icon: '📞', title: 'Apeluri la ore imposibile.', desc: 'Oaspeții sună duminică la 22:00 pentru vineri. CatyAI preia cererea instant și confirmă automat.' },
      { icon: '🌍', title: 'Turiști care nu vorbesc limba.', desc: 'CatyAI răspunde în 14 limbi — engleză, germană, italiană și altele — fără personal multilingv.' },
      { icon: '🌙', title: 'Rezervări pierdute peste noapte.', desc: 'Fără recepționer de noapte, restaurantul pierde rezervări. CatyAI e activ 24/7 — weekend inclus.' },
    ],
    stepsTitle: 'Cum funcționează pentru restaurantul tău',
    steps: [
      { title: 'Oaspetele scanează QR-ul de pe masă sau de la intrare.', desc: 'Ajunge direct pe WhatsApp, unde CatyAI îl întâmpină cu meniul și specialitățile zilei.' },
      { title: 'CatyAI răspunde la întrebări despre meniu, alergeni, disponibilitate.', desc: 'Informațiile vin din baza ta de cunoștințe — actualizabilă oricând din dashboard.' },
      { title: 'Rezervarea se confirmă cu dată, oră și număr de persoane.', desc: 'Echipa ta primește notificare. Oaspetele primește confirmarea pe WhatsApp, cu toate detaliile.' },
    ],
    featuresTitle: 'Funcții construite pentru restaurante',
    features: [
      { icon: '📱', text: 'QR code cu brandul tău — nici măcar site nu-ți trebuie. Oaspeții scanează și vorbesc.' },
      { icon: '🍴', text: 'Meniu digital actualizabil din dashboard — prețuri, preparate, specialități.' },
      { icon: '🌐', text: '14 limbi automate — perfect pentru zone turistice.' },
      { icon: '🔔', text: 'Notificări de rezervare în timp real pentru echipă.' },
      { icon: '💬', text: 'WhatsApp Business fără Meta API — zero costuri BSP.' },
      { icon: '🛡️', text: 'FraudAI Shield — blochează rezervările false înainte să ajungă la personal.' },
    ],
    finalTitle: 'Restaurantul tău deschis pentru rezervări 24/7.',
    finalSub: 'Un QR code înlocuiește recepționerul de noapte. Setup în 30 de minute.',
    finalPrimary: 'Începe gratuit →',
    finalSecondary: { label: 'Vezi prețurile', to: '/pricing' },
  },
}

export default function ForRestaurants({ locale }) {
  return <SolutionPage slug="restaurante" locale={locale} t={T[locale] || T.en} jsonLd={jsonLd} />
}
