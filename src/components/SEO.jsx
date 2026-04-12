import { Helmet } from 'react-helmet-async';

const defaultMeta = {
  title: 'Cea Mai Sigura Solutie AI Sales din Romania | CatyAI + FraudAI Shield',
  description: 'CatyAI: singura platforma AI Sales din Romania cu 8 agenti AI specializati si FraudAI Shield anti-frauda. Arhitectura multi-agent unica: Sales, Support, Scheduler, DocGen, Fraud Detection, Lead Scoring. Protectie completa + conversii automate.',
  image: 'https://catyai.io/og-image.png',
  url: 'https://catyai.io',
  keywords: 'AI sales romania, FraudAI Shield, chatbot securizat, protectie frauda AI, multi-agent AI, 8 agenti AI, CatyAI, WhatsApp AI securizat, AI anti-phishing, chatbot sigur romania, fraud detection AI, lead scoring AI, AI sales agent romania, arhitectura multi-agent',
};

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  article = null,
  breadcrumbs = null,
  faq = null,
  service = null,  // { name, description, price, features }
  product = null   // { name, description, price, rating }
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

  // Service JSON-LD Schema
  const serviceSchema = service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'CatyAI',
      url: 'https://catyai.io'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania'
    },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'EUR'
      }
    }),
    ...(service.features && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.name,
        itemListElement: service.features.map((f, i) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: f
          }
        }))
      }
    })
  } : null;

  // Product/SoftwareApplication JSON-LD Schema
  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, WhatsApp',
    url: seo.url,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'EUR'
      }
    }),
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        bestRating: '5',
        ratingCount: product.ratingCount || '150'
      }
    })
  } : null;

  // WebPage JSON-LD Schema (always added)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: seo.url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'CatyAI',
      url: 'https://catyai.io'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CatyAI',
      url: 'https://catyai.io'
    }
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={defaultMeta.keywords} />
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
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      {/* WebPage schema always included */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
}
