import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const API_BASE = 'https://api.ahauros.io';

// Static articles (fallback + initial content)
const staticArticles = [
  {
    slug: 'ai-chatbot-ecommerce-conversions',
    title: 'How AI Chatbots Increase E-commerce Conversions by 30%',
    excerpt: 'Discover the data behind AI chatbot effectiveness and learn how top e-commerce stores are using conversational AI to boost sales.',
    date: 'February 3, 2025',
    readTime: '8 min read',
    category: 'Conversion Optimization',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    keywords: ['ai chatbot', 'ecommerce conversion', 'sales optimization', 'customer engagement'],
    isStatic: true,
  },
  {
    slug: 'best-shopify-ai-chatbot-2025',
    title: 'Best AI Chatbot for Shopify Stores in 2025',
    excerpt: 'Compare the top AI chatbot solutions for Shopify. Features, pricing, and real results from store owners.',
    date: 'February 10, 2025',
    readTime: '10 min read',
    category: 'Shopify',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    keywords: ['shopify chatbot', 'best ai chatbot', 'shopify app', 'ecommerce ai'],
    isStatic: true,
  },
  {
    slug: '24-7-customer-support-ai',
    title: '24/7 Customer Support Without Hiring: The AI Solution',
    excerpt: 'How to provide round-the-clock customer service without expanding your team. Real ROI data included.',
    date: 'February 17, 2025',
    readTime: '7 min read',
    category: 'Customer Support',
    image: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?w=800',
    keywords: ['24/7 support', 'ai customer service', 'automation', 'cost savings'],
    isStatic: true,
  },
];

// Export for use in BlogArticle.jsx
export const blogArticles = staticArticles;

export default function Blog() {
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/public/blog/posts?site_url=https://catyai.io&limit=50`);
        const data = await res.json();

        if (data.success && data.posts?.length > 0) {
          // Merge API articles with static ones (API first, then static)
          const apiArticles = data.posts.map(p => ({
            ...p,
            isStatic: false,
          }));

          // Filter out duplicates by slug
          const staticSlugs = new Set(apiArticles.map(a => a.slug));
          const uniqueStatic = staticArticles.filter(a => !staticSlugs.has(a.slug));

          setArticles([...apiArticles, ...uniqueStatic]);
        }
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError(err.message);
        // Keep static articles on error
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <SEO
        title="Blog - E-commerce AI Insights & Tutorials"
        description="Learn how to boost your e-commerce sales with AI chatbots. Tutorials, case studies, and conversion optimization strategies."
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
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {/* Featured Article */}
      {!loading && featuredArticle && (
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <Link
              to={featuredArticle.isStatic ? `/blog/${featuredArticle.slug}` : `/blog/${featuredArticle.slug}`}
              className="block group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700 hover:border-indigo-500/50 transition-all">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video md:aspect-auto">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full w-fit mb-4">
                      Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-400 mb-4">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{featuredArticle.date}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      {!loading && otherArticles.length > 0 && (
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all hover:-translate-y-1"
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
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto text-center py-16">
            <p className="text-gray-400">No articles yet. Check back soon!</p>
          </div>
        </section>
      )}

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
    </div>
  );
}
