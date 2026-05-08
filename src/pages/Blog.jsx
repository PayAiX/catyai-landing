import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import GlobalHeader from '../components/GlobalHeader';
import FooterV9 from '../components/FooterV9';

// Import blog articles from synced JSON (Vite handles JSON imports natively)
import syncedArticles from '../data/blogArticles.json';

// Use synced articles directly
export const blogArticles = syncedArticles;

export default function Blog() {
  const [lang, setLang] = useState(() => localStorage.getItem('caty-lang') || 'en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang');
    if (stored) setLang(stored);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />
      <SEO
        title="Blog — AI Visibility, GEO Optimization & Business Insights"
        description="CatyAI Blog: how to make your business visible to ChatGPT, Perplexity, and Gemini. GEO optimization guides, NAP Protocol tutorials, AI citation strategies."
        url="https://catyai.io/blog"
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            CatyAI Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and strategies to boost your e-commerce sales with AI
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {blogArticles.length} articles
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {blogArticles.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <Link to={`/blog/${blogArticles[0].slug}`} className="block group">
              <div className="relative rounded-2xl overflow-hidden bg-[#0A1628]/50 border border-[#1a2744] hover:border-gold/50 transition-all">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video md:aspect-auto">
                    <img
                      src={blogArticles[0].image}
                      alt={blogArticles[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm rounded-full w-fit mb-4">
                      Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                      {blogArticles[0].title}
                    </h2>
                    <p className="text-gray-400 mb-4">
                      {blogArticles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{blogArticles[0].date}</span>
                      <span>-</span>
                      <span>{blogArticles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.slice(1).map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group block bg-[#0A1628]/50 rounded-xl overflow-hidden border border-[#1a2744] hover:border-gold/50 transition-all hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span>-</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Boost Your Conversions?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
              Join thousands of e-commerce stores using CatyAI to sell more, 24/7.
            </p>
            <a
              href="https://app.catyai.io/register"
              className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </section>
      <FooterV9 lang={lang} />
    </div>
  );
}
