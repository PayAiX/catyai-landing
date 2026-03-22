import { useParams, Link, Navigate } from 'react-router-dom';
import { blogArticles } from './Blog';
import SEO from '../components/SEO';

// Import article content from synced JSON
import articleContent from '../data/articleContent.json';

export default function BlogArticle() {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);
  const content = articleContent[slug];

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // If no content found, show a basic article page
  const hasContent = content && content.content;

  // Find related articles (same category or next/prev)
  const currentIndex = blogArticles.findIndex(a => a.slug === slug);
  const relatedArticles = blogArticles.filter((a, i) => i !== currentIndex).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <SEO
        title={article.title}
        description={content?.metaDescription || article.excerpt}
        image={article.image}
        url={`https://catyai.io/blog/${slug}`}
        type="article"
        article={{
          publishedTime: article.date,
          author: 'CatyAI Team',
          tags: article.keywords
        }}
        breadcrumbs={[
          { name: 'Home', url: 'https://catyai.io/' },
          { name: 'Blog', url: 'https://catyai.io/blog' },
          { name: article.title, url: `https://catyai.io/blog/${slug}` }
        ]}
      />

      {/* Schema.org JSON-LD */}
      {content?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.schema) }}
        />
      )}
      {content?.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(content.faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full mb-4">
            {article.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-400 mb-8">
            <span>{article.date}</span>
            <span>-</span>
            <span>{article.readTime}</span>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {hasContent ? (
            <article className="prose prose-lg prose-invert prose-indigo max-w-none">
              <div
                className="text-gray-300 leading-relaxed
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-4
                  [&>p]:mb-4
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:mb-2
                  [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400
                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_a]:text-indigo-400 [&_a]:hover:text-indigo-300"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </article>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">This article is coming soon.</p>
              <Link to="/blog" className="text-indigo-400 hover:text-indigo-300">
                Browse other articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Boost Your Conversions?
            </h2>
            <p className="text-indigo-100 mb-6">
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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relArticle) => (
                <Link
                  key={relArticle.slug}
                  to={`/blog/${relArticle.slug}`}
                  className="group block bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relArticle.image}
                      alt={relArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {relArticle.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{relArticle.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
