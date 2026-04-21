import { Link } from 'react-router-dom'

// Footer Component - Accepts translations as prop
export default function Footer({ t }) {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gold/30 bg-[#010A1F]">
      <div className="max-w-7xl mx-auto">
        {/* Grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Logo & Tagline - full width on mobile */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <img src="/images/caty-logo.png" alt="Caty.AI" className="h-8" width="32" height="32" />
              <span className="text-lg font-bold"><span className="text-white">Caty</span><span className="text-gold">AI</span></span>
            </Link>
            <p className="text-gray-300 text-sm">
              {t.footer.tagline}
            </p>
          </div>
          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-base">{t.footer.product}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/#features" className="hover:text-white transition-colors block py-1">{t.nav.features}</a></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors block py-1">{t.nav.pricing}</Link></li>
              <li><a href="https://app.catyai.io" className="hover:text-white transition-colors block py-1">{t.footer.dashboard}</a></li>
              <li><a href="https://docs.catyai.io" className="hover:text-white transition-colors block py-1">{t.footer.docs}</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-base">{t.footer.company}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors block py-1">{t.footer.about}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors block py-1">{t.footer.blog}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors block py-1">{t.footer.contact}</Link></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-base">{t.footer.legal}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors block py-1">{t.footer.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors block py-1">{t.footer.terms}</Link></li>
              <li><Link to="/gdpr" className="hover:text-white transition-colors block py-1">{t.footer.gdpr}</Link></li>
              <li><Link to="/licensing" className="hover:text-white transition-colors block py-1">{t.footer.licensing}</Link></li>
            </ul>
          </div>
        </div>

        {/* Reviews & Social Proof */}
        <div className="py-4 border-t border-gold/30">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-4">
            <span className="text-gray-500">Reviews:</span>
            <a href="https://www.g2.com/products/catyai/reviews"
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-1 bg-[#0A1628] rounded-full text-gray-300 hover:text-white hover:bg-[#1a2744] transition-colors">
              <span className="text-orange-500 font-bold text-xs">G2</span>
              <span className="text-yellow-500 text-xs">★★★★★</span>
              <span>4.8/5</span>
            </a>
            <a href="https://www.producthunt.com/products/ai-sales-assistant-that-never-sleeps"
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-1 bg-[#0A1628] rounded-full text-gray-300 hover:text-white hover:bg-[#1a2744] transition-colors">
              <span>🚀</span>
              <span>Product Hunt</span>
            </a>
          </div>
        </div>

        {/* Featured Articles - SEO Backlinks */}
        <div className="py-4 border-t border-gold/30">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="text-gray-500">Featured Articles:</span>
            <a href="https://medium.com/@adrianvitan/ahauros-aeos-catyai-inteligen%C8%9Ba-artificial%C4%83-economic%C4%83-pentru-rom%C3%A2nia-digital%C4%83-89108e433672"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Ahauros AEOS & CatyAI — AI for Digital Romania
            </a>
            <a href="https://medium.com/@adrianvitan/building-ai-that-works-for-business-my-journey-creating-payai-x-ahauros-and-catyai-1f407e31e109"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Building AI That Works for Business
            </a>
            <a href="https://medium.com/@adrianvitan/titlu-revolu%C8%9Bia-siguran%C8%9Bei-%C3%AEn-ai-fraudai-shield-de-ce-catyai-este-singura-platform%C4%83-din-rom%C3%A2nia-6a3aa608543f"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              FraudAI Shield — Singura Platformă Sigură din România
            </a>
            <a href="https://www.prlog.org/13135632-catyai-launches-fraudai-shield-romanias-first-ai-sales-platform-with-integrated-anti-fraud-protect.html"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              [PRLog] CatyAI Launches FraudAI Shield
            </a>
            <a href="https://medium.com/aws-in-plain-english/why-most-ai-chatbots-fail-at-sales-and-what-we-built-instead-b5e140b84f34"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Why Most AI Chatbots Fail at Sales
            </a>
            <a href="https://medium.com/@adrianvitan/500-000-businesses-in-romania-have-no-website-but-they-all-use-whatsapp-3d436b027692"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              500,000 Businesses Use WhatsApp
            </a>
            <a href="https://medium.com/codetodeploy/am-construit-un-ai-care-vinde-non-stop-4f558f7bb9af"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Am Construit un AI Care Vinde Non-Stop
            </a>
            <a href="https://www.comunicatedepresa.ro/payai-x-srl/catyai-lanseaza-fraudai-shield-prima-platforma-ai-sales-din-romania-cu-protectie-anti-frauda-integrata"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              [Comunicat] FraudAI Shield România
            </a>
            <a href="https://medium.com/codetodeploy/navigating-the-ai-search-era-with-a-robust-ai-sales-engine-59f693845130"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Navigating the AI Search Era
            </a>
            <a href="https://medium.com/codetodeploy/google-ai-overviews-killed-60-of-organic-clicks-heres-how-to-get-them-back-f68362ab2ef8"
               target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary-400 transition-colors">
              Google AI Overviews & Organic Clicks
            </a>
            <a href="https://medium.com/@adrianvitan"
               target="_blank" rel="noopener noreferrer"
               className="text-gold hover:text-[#D4B57A] transition-colors font-medium">
              All articles on Medium →
            </a>
          </div>
        </div>

        {/* Licensing Info */}
        <div className="py-6 border-t border-gold/30 mb-2">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
            <Link to="/licensing" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>{t.footer.licensing}:</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/licensing" className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold hover:bg-gold/20 transition-colors">
                <span className="font-medium">Proprietary</span>
              </Link>
              <span className="text-gold/60">+</span>
              <Link to="/licensing" className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/30 rounded-full text-gold hover:bg-gold/20 transition-colors">
                <span className="font-medium">Enterprise</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gold/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/company/payai-x" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://medium.com/@adrianvitan" className="text-gray-400 hover:text-white transition-colors" title="Medium" target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
