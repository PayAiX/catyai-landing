import { Helmet } from 'react-helmet-async';

const defaultMeta = {
  title: 'CatyAI — E-Commerce Conversion AI & Business Intelligence',
  description: 'Transform visitors into customers with AI: intent detection, real-time lead scoring, Knowledge Base RAG, Business Intelligence. From free to enterprise.',
  image: 'https://catyai.io/og-image.png',
  url: 'https://catyai.io',
};

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  article = null,
  breadcrumbs = null,
  faq = null
}) {
  const seo = {
    title: title ? `${title} | CatyAI` : defaultMeta.title,
    description: description || defaultMeta.description,
    image: image || defaultMeta.image,
    url: url || defaultMeta.url,
  };

  // Article JSON-LD Schema
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: seo.description,
    image: seo.image,
    author: {
      '@type': 'Organization',
      name: 'CatyAI',
      url: 'https://catyai.io'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CatyAI',
      url: 'https://catyai.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://catyai.io/images/caty-logo.png'
      }
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.url
    },
    keywords: article.tags?.join(', ')
  } : null;

  // Breadcrumb JSON-LD Schema
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  } : null;

  // FAQ JSON-LD Schema
  const faqSchema = faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="CatyAI" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Article meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author || 'CatyAI'} />
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* JSON-LD Structured Data */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}
