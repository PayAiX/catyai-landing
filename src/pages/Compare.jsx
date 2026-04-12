import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { useLanguage } from '../App'

const translations = {
  en: {
    badge: 'Honest Comparison',
    heroTitle1: 'Why CatyAI and not',
    heroTitle2: 'Tidio or Intercom?',
    heroSubtitle: 'At competitors, the price on the website is just the beginning. AI, automations, and integrations are separate add-ons. At CatyAI, everything is included.',
    heroCta: 'Start Free Trial',
    heroCtaSecondary: 'See Pricing',
    trustBadge1: 'No hidden fees',
    trustBadge2: 'AI included',
    trustBadge3: 'Cancel anytime',
    feature: 'Feature',
    total: 'TOTAL',
    calloutTitle: 'At CatyAI, AI is included. Not an add-on.',
    calloutDesc: 'You pay one price, you get everything: AI, WhatsApp, FraudAI, documents, automations.',
    cta: 'Start Free →',
    source: '* Prices verified on official Tidio and Intercom websites, March 2026. Tidio Lyro: €32.50/month for 50 conv. Tidio Flows: €24.17/month.',
    features: [
      { name: 'Monthly price', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'Conversational AI', caty: '✓ Included', tidio: '+€32/mo (Lyro)', intercom: '+$0.99/resolution' },
      { name: 'Automations', caty: '✓ Included', tidio: '+€24/mo (Flows)', intercom: '✓ Limited' },
      { name: 'Native WhatsApp', caty: '✓ Included', tidio: '✗ No', intercom: '✗ No' },
      { name: 'FraudAI (anti-scam)', caty: '✓ Included', tidio: '✗ Doesn\'t exist', intercom: '✗ Doesn\'t exist' },
      { name: 'Document generation', caty: '✓ Included', tidio: '✗ Doesn\'t exist', intercom: '✗ Doesn\'t exist' },
      { name: 'QR setup in 2 min', caty: '✓ Yes', tidio: '✗ No', intercom: '✗ No' },
      { name: 'REAL cost/month', caty: '€49', tidio: '€205+', intercom: '$500+' }
    ],
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
      dashboard: 'Dashboard'
    },
    footer: {
      tagline: 'AI Sales Assistant that never sleeps.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      dashboard: 'Dashboard',
      docs: 'Documentation',
      about: 'About',
      blog: 'Blog',
      careers: 'Careers',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      gdpr: 'GDPR',
      licensing: 'Licensing',
      copyright: 'CatyAI by PayAi-X FZE. All rights reserved.'
    }
  },
  ro: {
    badge: 'Comparație Onestă',
    heroTitle1: 'De ce CatyAI și nu',
    heroTitle2: 'Tidio sau Intercom?',
    heroSubtitle: 'La competitori, prețul de pe site e doar începutul. AI-ul, automatizările și integrările sunt add-on-uri separate. La CatyAI, totul e inclus.',
    heroCta: 'Începe Gratuit',
    heroCtaSecondary: 'Vezi Prețuri',
    trustBadge1: 'Fără costuri ascunse',
    trustBadge2: 'AI inclus',
    trustBadge3: 'Anulezi oricând',
    feature: 'Funcție',
    total: 'TOTAL',
    calloutTitle: 'La CatyAI, AI-ul e inclus. Nu e add-on.',
    calloutDesc: 'Plătești un preț, primești totul: AI, WhatsApp, FraudAI, documente, automatizări.',
    cta: 'Începe Gratuit →',
    source: '* Prețuri verificate pe site-urile oficiale Tidio și Intercom, Martie 2026. Tidio Lyro: €32.50/lună pentru 50 conv. Tidio Flows: €24.17/lună.',
    features: [
      { name: 'Preț lunar', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'AI conversațional', caty: '✓ Inclus', tidio: '+€32/lună (Lyro)', intercom: '+$0.99/rezoluție' },
      { name: 'Automatizări', caty: '✓ Inclus', tidio: '+€24/lună (Flows)', intercom: '✓ Limitat' },
      { name: 'WhatsApp nativ', caty: '✓ Inclus', tidio: '✗ Nu', intercom: '✗ Nu' },
      { name: 'FraudAI (anti-scam)', caty: '✓ Inclus', tidio: '✗ Nu există', intercom: '✗ Nu există' },
      { name: 'Generare documente', caty: '✓ Inclus', tidio: '✗ Nu există', intercom: '✗ Nu există' },
      { name: 'Setup QR în 2 min', caty: '✓ Da', tidio: '✗ Nu', intercom: '✗ Nu' },
      { name: 'Cost REAL/lună', caty: '€49', tidio: '€205+', intercom: '$500+' }
    ],
    nav: {
      features: 'Funcții',
      pricing: 'Prețuri',
      contact: 'Contact',
      dashboard: 'Dashboard'
    },
    footer: {
      tagline: 'Asistent AI de vânzări care nu doarme niciodată.',
      product: 'Produs',
      company: 'Companie',
      legal: 'Legal',
      dashboard: 'Dashboard',
      docs: 'Documentație',
      about: 'Despre',
      blog: 'Blog',
      careers: 'Cariere',
      contact: 'Contact',
      privacy: 'Politica de confidențialitate',
      terms: 'Termeni și Condiții',
      gdpr: 'GDPR',
      licensing: 'Licențiere',
      copyright: 'CatyAI de PayAi-X FZE. Toate drepturile rezervate.'
    }
  },
  es: {
    badge: 'Comparación Honesta',
    heroTitle1: '¿Por qué CatyAI y no',
    heroTitle2: 'Tidio o Intercom?',
    heroSubtitle: 'En los competidores, el precio del sitio web es solo el comienzo. IA, automatizaciones e integraciones son add-ons separados. En CatyAI, todo está incluido.',
    heroCta: 'Prueba Gratis',
    heroCtaSecondary: 'Ver Precios',
    trustBadge1: 'Sin costos ocultos',
    trustBadge2: 'IA incluida',
    trustBadge3: 'Cancela cuando quieras',
    feature: 'Función',
    total: 'TOTAL',
    calloutTitle: 'En CatyAI, la IA está incluida. No es un add-on.',
    calloutDesc: 'Pagas un precio, obtienes todo: IA, WhatsApp, FraudAI, documentos, automatizaciones.',
    cta: 'Empieza Gratis →',
    source: '* Precios verificados en los sitios web oficiales de Tidio e Intercom, Marzo 2026. Tidio Lyro: €32.50/mes por 50 conv. Tidio Flows: €24.17/mes.',
    features: [
      { name: 'Precio mensual', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'IA conversacional', caty: '✓ Incluido', tidio: '+€32/mes (Lyro)', intercom: '+$0.99/resolución' },
      { name: 'Automatizaciones', caty: '✓ Incluido', tidio: '+€24/mes (Flows)', intercom: '✓ Limitado' },
      { name: 'WhatsApp nativo', caty: '✓ Incluido', tidio: '✗ No', intercom: '✗ No' },
      { name: 'FraudAI (anti-estafa)', caty: '✓ Incluido', tidio: '✗ No existe', intercom: '✗ No existe' },
      { name: 'Generación documentos', caty: '✓ Incluido', tidio: '✗ No existe', intercom: '✗ No existe' },
      { name: 'Setup QR en 2 min', caty: '✓ Sí', tidio: '✗ No', intercom: '✗ No' },
      { name: 'Costo REAL/mes', caty: '€49', tidio: '€205+', intercom: '$500+' }
    ],
    nav: {
      features: 'Funciones',
      pricing: 'Precios',
      contact: 'Contacto',
      dashboard: 'Dashboard'
    },
    footer: {
      tagline: 'Asistente de ventas con IA que nunca duerme.',
      product: 'Producto',
      company: 'Empresa',
      legal: 'Legal',
      dashboard: 'Dashboard',
      docs: 'Documentación',
      about: 'Acerca de',
      blog: 'Blog',
      careers: 'Carreras',
      contact: 'Contacto',
      privacy: 'Política de privacidad',
      terms: 'Términos de Servicio',
      gdpr: 'GDPR',
      licensing: 'Licencias',
      copyright: 'CatyAI por PayAi-X FZE. Todos los derechos reservados.'
    }
  },
  pt: {
    badge: 'Comparação Honesta',
    heroTitle1: 'Por que CatyAI e não',
    heroTitle2: 'Tidio ou Intercom?',
    heroSubtitle: 'Nos concorrentes, o preço do site é apenas o começo. IA, automações e integrações são add-ons separados. No CatyAI, tudo está incluído.',
    heroCta: 'Teste Grátis',
    heroCtaSecondary: 'Ver Preços',
    trustBadge1: 'Sem custos ocultos',
    trustBadge2: 'IA incluída',
    trustBadge3: 'Cancele quando quiser',
    feature: 'Recurso',
    total: 'TOTAL',
    calloutTitle: 'No CatyAI, a IA está incluída. Não é um add-on.',
    calloutDesc: 'Você paga um preço, recebe tudo: IA, WhatsApp, FraudAI, documentos, automações.',
    cta: 'Comece Grátis →',
    source: '* Preços verificados nos sites oficiais do Tidio e Intercom, Março 2026. Tidio Lyro: €32.50/mês por 50 conv. Tidio Flows: €24.17/mês.',
    features: [
      { name: 'Preço mensal', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + fees' },
      { name: 'IA conversacional', caty: '✓ Incluído', tidio: '+€32/mês (Lyro)', intercom: '+$0.99/resolução' },
      { name: 'Automações', caty: '✓ Incluído', tidio: '+€24/mês (Flows)', intercom: '✓ Limitado' },
      { name: 'WhatsApp nativo', caty: '✓ Incluído', tidio: '✗ Não', intercom: '✗ Não' },
      { name: 'FraudAI (anti-golpe)', caty: '✓ Incluído', tidio: '✗ Não existe', intercom: '✗ Não existe' },
      { name: 'Geração de documentos', caty: '✓ Incluído', tidio: '✗ Não existe', intercom: '✗ Não existe' },
      { name: 'Setup QR em 2 min', caty: '✓ Sim', tidio: '✗ Não', intercom: '✗ Não' },
      { name: 'Custo REAL/mês', caty: '€49', tidio: '€205+', intercom: '$500+' }
    ],
    nav: {
      features: 'Recursos',
      pricing: 'Preços',
      contact: 'Contato',
      dashboard: 'Dashboard'
    },
    footer: {
      tagline: 'Assistente de vendas com IA que nunca dorme.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      dashboard: 'Dashboard',
      docs: 'Documentação',
      about: 'Sobre',
      blog: 'Blog',
      careers: 'Carreiras',
      contact: 'Contato',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Serviço',
      gdpr: 'GDPR',
      licensing: 'Licenciamento',
      copyright: 'CatyAI por PayAi-X FZE. Todos os direitos reservados.'
    }
  },
  fr: {
    badge: 'Comparaison Honnête',
    heroTitle1: 'Pourquoi CatyAI et pas',
    heroTitle2: 'Tidio ou Intercom ?',
    heroSubtitle: 'Chez les concurrents, le prix affiché n\'est que le début. L\'IA, les automatisations et les intégrations sont des add-ons séparés. Chez CatyAI, tout est inclus.',
    heroCta: 'Essai Gratuit',
    heroCtaSecondary: 'Voir les Tarifs',
    trustBadge1: 'Sans frais cachés',
    trustBadge2: 'IA incluse',
    trustBadge3: 'Annulez à tout moment',
    feature: 'Fonctionnalité',
    total: 'TOTAL',
    calloutTitle: 'Chez CatyAI, l\'IA est incluse. Ce n\'est pas un add-on.',
    calloutDesc: 'Vous payez un prix, vous obtenez tout : IA, WhatsApp, FraudAI, documents, automatisations.',
    cta: 'Commencer Gratuit →',
    source: '* Prix vérifiés sur les sites officiels de Tidio et Intercom, Mars 2026. Tidio Lyro : €32.50/mois pour 50 conv. Tidio Flows : €24.17/mois.',
    features: [
      { name: 'Prix mensuel', caty: '€49', tidio: '€149 + add-ons', intercom: '$39/seat + frais' },
      { name: 'IA conversationnelle', caty: '✓ Inclus', tidio: '+€32/mois (Lyro)', intercom: '+$0.99/résolution' },
      { name: 'Automatisations', caty: '✓ Inclus', tidio: '+€24/mois (Flows)', intercom: '✓ Limité' },
      { name: 'WhatsApp natif', caty: '✓ Inclus', tidio: '✗ Non', intercom: '✗ Non' },
      { name: 'FraudAI (anti-arnaque)', caty: '✓ Inclus', tidio: '✗ N\'existe pas', intercom: '✗ N\'existe pas' },
      { name: 'Génération de documents', caty: '✓ Inclus', tidio: '✗ N\'existe pas', intercom: '✗ N\'existe pas' },
      { name: 'Setup QR en 2 min', caty: '✓ Oui', tidio: '✗ Non', intercom: '✗ Non' },
      { name: 'Coût RÉEL/mois', caty: '€49', tidio: '€205+', intercom: '$500+' }
    ],
    nav: {
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      contact: 'Contact',
      dashboard: 'Dashboard'
    },
    footer: {
      tagline: 'Assistant de vente IA qui ne dort jamais.',
      product: 'Produit',
      company: 'Entreprise',
      legal: 'Légal',
      dashboard: 'Dashboard',
      docs: 'Documentation',
      about: 'À propos',
      blog: 'Blog',
      careers: 'Carrières',
      contact: 'Contact',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
      gdpr: 'RGPD',
      licensing: 'Licences',
      copyright: 'CatyAI par PayAi-X FZE. Tous droits réservés.'
    }
  }
}

export default function Compare() {
  const { language } = useLanguage()
  const t = translations[language] || translations.en

  return (
    <div className="min-h-screen bg-gray-950">
      <SEO
        title="CatyAI vs Tidio vs Intercom - Honest Comparison | CatyAI"
        description="Compare CatyAI with Tidio and Intercom. See the real costs, features included, and why CatyAI offers better value with AI, WhatsApp, and FraudAI all included."
        canonical="https://catyai.io/compare"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/caty-logo-96.webp" alt="CatyAI" className="h-8 w-8" />
              <span className="text-white font-bold text-lg">Caty.AI</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/#features" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.features}</Link>
              <Link to="/#pricing" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.pricing}</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">{t.nav.contact}</Link>
              <a href="https://app.catyai.io" className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors text-sm">
                {t.nav.dashboard}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">{t.badge}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.heroTitle1}<br />
            <span className="text-green-400">{t.heroTitle2}</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://app.catyai.io"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              {t.heroCta}
            </a>
            <Link
              to="/#pricing"
              className="px-8 py-4 border border-gray-600 text-white rounded-xl hover:border-gray-500 transition-colors text-lg"
            >
              {t.heroCtaSecondary}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.trustBadge1}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.trustBadge2}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t.trustBadge3}
            </span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800/30 backdrop-blur rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-800/50 border-b border-gray-700/50">
              <div className="p-4 text-gray-400 text-sm font-medium">{t.feature}</div>
              <div className="p-4 text-center">
                <div className="text-cyan-400 font-bold text-lg">CatyAI</div>
                <div className="text-gray-500 text-xs">€49/mo</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-gray-300 font-medium">Tidio</div>
                <div className="text-gray-500 text-xs">€149+ /mo</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-gray-300 font-medium">Intercom</div>
                <div className="text-gray-500 text-xs">$39+ /seat</div>
              </div>
            </div>

            {/* Table Rows */}
            {t.features.map((f, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors ${i === t.features.length - 1 ? 'bg-green-500/5' : ''}`}
              >
                <div className="p-4 text-gray-300 text-sm flex items-center">
                  {f.name}
                  {i === t.features.length - 1 && <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">{t.total}</span>}
                </div>
                <div className={`p-4 text-center text-sm ${f.caty.includes('✓') || i === t.features.length - 1 ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>
                  {f.caty}
                </div>
                <div className="p-4 text-center text-sm text-gray-500">
                  {f.tidio}
                </div>
                <div className="p-4 text-center text-sm text-gray-500">
                  {f.intercom}
                </div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-2xl p-8 border border-cyan-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t.calloutTitle}
                </h3>
                <p className="text-gray-400">
                  {t.calloutDesc}
                </p>
              </div>
              <a
                href="https://app.catyai.io"
                className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                {t.cta}
              </a>
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            {t.source}
          </p>
        </div>
      </section>

      <Footer t={t} />
    </div>
  )
}
