import { Link } from 'react-router-dom';

// Blog articles data
export const blogArticles = [
  {
    slug: 'ai-chatbot-ecommerce-conversions',
    title: 'How AI Chatbots Increase E-commerce Conversions by 30%',
    excerpt: 'Discover the data behind AI chatbot effectiveness and learn how top e-commerce stores are using conversational AI to boost sales.',
    date: 'February 3, 2025',
    readTime: '8 min read',
    category: 'Conversion Optimization',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    keywords: ['ai chatbot', 'ecommerce conversion', 'sales optimization', 'customer engagement']
  },
  {
    slug: 'best-shopify-ai-chatbot-2025',
    title: 'Best AI Chatbot for Shopify Stores in 2025',
    excerpt: 'Compare the top AI chatbot solutions for Shopify. Features, pricing, and real results from store owners.',
    date: 'February 10, 2025',
    readTime: '10 min read',
    category: 'Shopify',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    keywords: ['shopify chatbot', 'best ai chatbot', 'shopify app', 'ecommerce ai']
  },
  {
    slug: '24-7-customer-support-ai',
    title: '24/7 Customer Support Without Hiring: The AI Solution',
    excerpt: 'How to provide round-the-clock customer service without expanding your team. Real ROI data included.',
    date: 'February 17, 2025',
    readTime: '7 min read',
    category: 'Customer Support',
    image: 'https://images.unsplash.com/photo-1553775927-a071d5a6a39a?w=800',
    keywords: ['24/7 support', 'ai customer service', 'automation', 'cost savings']
  },
  {
    slug: 'woocommerce-ai-chatbot-setup',
    title: 'WooCommerce AI Chatbot: Complete Setup Guide',
    excerpt: 'Step-by-step tutorial to install and configure an AI chatbot on your WooCommerce store in under 10 minutes.',
    date: 'February 24, 2025',
    readTime: '12 min read',
    category: 'WooCommerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    keywords: ['woocommerce chatbot', 'wordpress ai', 'chatbot setup', 'tutorial']
  },
  {
    slug: 'why-stores-lose-sales-at-night',
    title: 'Why Online Stores Lose Sales at Night (And How to Fix It)',
    excerpt: '52% of online purchases happen outside business hours. Learn how to capture these sales with AI automation.',
    date: 'March 3, 2025',
    readTime: '6 min read',
    category: 'Sales Strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    keywords: ['night sales', 'cart abandonment', 'after hours', 'automation']
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
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

      {/* Featured Article */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <Link to={`/blog/${blogArticles[0].slug}`} className="block group">
            <div className="relative rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700 hover:border-indigo-500/50 transition-all">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto">
                  <img
                    src={blogArticles[0].image}
                    alt={blogArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full w-fit mb-4">
                    Featured
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                    {blogArticles[0].title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {blogArticles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{blogArticles[0].date}</span>
                    <span>•</span>
                    <span>{blogArticles[0].readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.slice(1).map((article) => (
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
