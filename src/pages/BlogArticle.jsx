import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogArticles } from './Blog';
import SEO from '../components/SEO';
import GlobalHeader from '../components/GlobalHeader';
import FooterV9 from '../components/FooterV9';

// Import article content from synced JSON
import articleContent from '../data/articleContent.json';

export default function BlogArticle() {
  const { slug } = useParams();
  const [lang, setLang] = useState(() => localStorage.getItem('caty-lang') || 'en');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('caty-lang');
    if (stored) setLang(stored);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <GlobalHeader lang={lang} setLang={setLang} scrolled={scrolled} />
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
          <Link to="/blog" className="inline-flex items-center text-gold hover:text-gold/80 mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm rounded-full mb-4">
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
            <article className="prose prose-lg prose-invert max-w-none">
              <div
                className="text-gray-300 leading-relaxed
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-4
                  [&>p]:mb-4
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:mb-2
                  [&>blockquote]:border-l-4 [&>blockquote]:border-gold [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400
                  [&_strong]:text-white [&_strong]:font-semibold
                  [&_a]:text-gold [&_a]:hover:text-gold/80"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </article>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">This article is coming soon.</p>
              <Link to="/blog" className="text-gold hover:text-gold/80">
                Browse other articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gold to-[#D4B57A] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Boost Your Conversions?
            </h2>
            <p className="text-gray-800 mb-6">
              Join thousands of e-commerce stores using CatyAI to sell more, 24/7.
            </p>
            <a
              href="https://app.catyai.io/register"
              className="inline-block px-8 py-3 bg-[#010A1F] text-white font-semibold rounded-lg hover:bg-[#0A1628] transition-colors"
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
                  className="group block bg-[#0A1628]/50 rounded-xl overflow-hidden border border-[#1a2744] hover:border-gold/50 transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relArticle.image}
                      alt={relArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-gold transition-colors line-clamp-2">
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
      <FooterV9 lang={lang} />
    </div>
  );
}
