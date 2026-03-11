import { useState } from 'react'

// Inline SVG Icons
const StarIcon = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-gray-700 group-hover:text-indigo-500/30 transition-colors" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const testimonials = [
  {
    id: 1,
    company: 'INOTOOLS',
    website: 'https://www.inotools.ro',
    industry: 'E-commerce Bricolaj',
    quote: 'CatyAI raspunde instant la intrebarile clientilor despre produse si disponibilitate. Am redus timpul de raspuns de la ore la secunde.',
    metric: '+35%',
    metricLabel: 'conversii',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    company: 'Simple Smile',
    website: 'https://simplesmile.ro',
    industry: 'Stomatologie',
    quote: 'Pacientii pot programa consultatii 24/7 prin chatbot. Ne-a eliberat timpul pentru ceea ce conteaza - tratamentul pacientilor.',
    metric: '24/7',
    metricLabel: 'programari',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    company: 'D&S GAZ Services',
    website: 'https://dsgazservices.ro',
    industry: 'Instalatii Gaz',
    quote: 'Clientii primesc instant informatii despre serviciile noastre si pot solicita oferte. Eficienta echipei a crescut semnificativ.',
    metric: '+50%',
    metricLabel: 'lead-uri',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 4,
    company: 'AiuDance',
    website: 'https://aiudance.ro',
    industry: 'Scoala de Dans',
    quote: 'Cursantii gasesc rapid informatii despre orarul cursurilor si se pot inscrie direct. Mai putin timp la telefon, mai mult timp pentru dans!',
    metric: '3x',
    metricLabel: 'inscrieri online',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 5,
    company: 'Digital Romania',
    website: 'https://www.digitalromania.ro',
    industry: 'Consultanta IT',
    quote: 'CatyAI ne ajuta sa calificam lead-urile automat. Stim exact ce cauta fiecare client inainte sa vorbim cu el.',
    metric: '+40%',
    metricLabel: 'lead-uri calificate',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 6,
    company: 'VendX',
    website: 'https://vendx.ro',
    industry: 'SaaS Platform',
    quote: 'Integrarea a fost simpla, iar rezultatele au venit rapid. Clientii nostri primesc suport instant pentru configurarea produselor.',
    metric: '-60%',
    metricLabel: 'tickete suport',
    color: 'from-green-500 to-emerald-500'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ce spun <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">clientii nostri</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Companii din Romania care folosesc CatyAI pentru a creste conversiile si a automatiza suportul clienti.
          </p>
          {/* Trust badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={true} />
              ))}
            </div>
            <span className="text-gray-300 text-sm font-medium">6+ companii active</span>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">+32%</div>
            <div className="text-gray-400 text-sm mt-1">more leads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">+18%</div>
            <div className="text-gray-400 text-sm mt-1">conversion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">50%</div>
            <div className="text-gray-400 text-sm mt-1">less response time</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4">
                <QuoteIcon />
              </div>

              {/* Metric badge */}
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.color} mb-4`}>
                <span className="text-white font-bold text-lg">{testimonial.metric}</span>
                <span className="text-white/80 text-sm">{testimonial.metricLabel}</span>
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-base leading-relaxed mb-6 min-h-[80px]">
                "{testimonial.quote}"
              </p>

              {/* Company info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                <div>
                  <a
                    href={testimonial.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-indigo-400 transition-colors flex items-center gap-1"
                  >
                    {testimonial.company}
                    <ExternalLinkIcon />
                  </a>
                  <p className="text-gray-500 text-sm">{testimonial.industry}</p>
                </div>
                {/* Industry indicator */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${testimonial.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Carousel */}
        <div className="mt-16 p-8 bg-gradient-to-r from-gray-800/80 to-gray-800/40 rounded-2xl border border-gray-700/50">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-10 h-10">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Google Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={true} />
                    ))}
                  </div>
                  <span className="text-white font-bold text-lg">5.0</span>
                  <span className="text-gray-400 text-sm">rating</span>
                </div>
              </div>
            </div>
            <a
              href="https://g.page/r/CcjJo1IOmRG8EBI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-xl transition-all shadow-lg"
            >
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              Lasa o recenzie
            </a>
          </div>

          {/* Reviews Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll-reviews hover:pause-animation">
              {/* Review 1 - Romanian */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">M</div>
                  <div>
                    <h4 className="font-bold text-white">Mihai D.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"CatyAI ne-a transformat complet modul in care interactionam cu clientii. Raspunsuri instant 24/7, conversii crescute. Recomand cu incredere!"</p>
                <p className="text-gray-500 text-xs mt-3">acum 2 saptamani</p>
              </div>

              {/* Review 2 - Spanish */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">C</div>
                  <div>
                    <h4 className="font-bold text-white">Carlos R.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Excelente servicio! CatyAI ha revolucionado la atención al cliente en nuestra tienda online. Respuestas instantáneas y clientes muy satisfechos."</p>
                <p className="text-gray-500 text-xs mt-3">hace 1 semana</p>
              </div>

              {/* Review 3 - English */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">J</div>
                  <div>
                    <h4 className="font-bold text-white">James T.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Outstanding AI chatbot! Easy integration and immediate results. Our conversion rate increased by 35% in the first month. Highly recommended!"</p>
                <p className="text-gray-500 text-xs mt-3">2 weeks ago</p>
              </div>

              {/* Review 4 - Portuguese */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-green-500 flex items-center justify-center text-white font-bold text-lg">P</div>
                  <div>
                    <h4 className="font-bold text-white">Pedro S.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Ferramenta incrível! O chatbot CatyAI atende nossos clientes 24 horas por dia. A equipe de suporte é muito profissional e atenciosa."</p>
                <p className="text-gray-500 text-xs mt-3">há 3 semanas</p>
              </div>

              {/* Review 5 - French */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-red-500 flex items-center justify-center text-white font-bold text-lg">M</div>
                  <div>
                    <h4 className="font-bold text-white">Marie L.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Solution IA exceptionnelle! CatyAI a transformé notre service client. Intégration facile et résultats impressionnants dès le premier mois."</p>
                <p className="text-gray-500 text-xs mt-3">il y a 1 mois</p>
              </div>

              {/* Review 6 - Spanish */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">L</div>
                  <div>
                    <h4 className="font-bold text-white">Laura M.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Increíble plataforma de IA! Nuestros clientes reciben respuestas instantáneas y hemos reducido los tickets de soporte en un 60%."</p>
                <p className="text-gray-500 text-xs mt-3">hace 2 semanas</p>
              </div>

              {/* Review 7 - English */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">S</div>
                  <div>
                    <h4 className="font-bold text-white">Sarah K.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Best investment for our e-commerce! CatyAI handles customer inquiries perfectly. Professional team and excellent technology."</p>
                <p className="text-gray-500 text-xs mt-3">1 month ago</p>
              </div>

              {/* Review 8 - Portuguese */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">A</div>
                  <div>
                    <h4 className="font-bold text-white">Ana C.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Solução perfeita para nosso negócio! O CatyAI responde aos clientes instantaneamente e as vendas aumentaram significativamente."</p>
                <p className="text-gray-500 text-xs mt-3">há 2 meses</p>
              </div>

              {/* Review 9 - Romanian */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">I</div>
                  <div>
                    <h4 className="font-bold text-white">Ionut T.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"Am redus cu 60% ticketele de suport dupa implementarea CatyAI. Clientii primesc raspunsuri instant si suntem mult mai eficienti."</p>
                <p className="text-gray-500 text-xs mt-3">acum 2 luni</p>
              </div>

              {/* Duplicate for infinite scroll effect */}
              <div className="flex-shrink-0 w-80 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">M</div>
                  <div>
                    <h4 className="font-bold text-white">Mihai D.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} filled={true} />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"CatyAI ne-a transformat complet modul in care interactionam cu clientii. Raspunsuri instant 24/7, conversii crescute. Recomand cu incredere!"</p>
                <p className="text-gray-500 text-xs mt-3">acum 2 saptamani</p>
              </div>
            </div>
          </div>

          {/* See all reviews link */}
          <div className="text-center mt-6">
            <a
              href="https://g.page/r/CcjJo1IOmRG8EBI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-2"
            >
              Vezi toate recenziile pe Google
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* CSS for animation */}
        <style>{`
          @keyframes scroll-reviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-reviews {
            animation: scroll-reviews 25s linear infinite;
          }
          .animate-scroll-reviews:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}
