/**
 * SEO Component - Manages meta tags, Open Graph, Twitter Cards, and structured data
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'General Exchange - Algorithmic Trade Engine',
  description = 'Professional algorithmic risk management platform for options trading. Connect with Interactive Brokers. Real-time AI analysis, risk alerts, and trade optimization for professional traders.',
  keywords = 'options trading, algorithmic trading, risk management, trading platform, Interactive Brokers, AI trading, options analysis, trading algorithms, professional trading, trading software, financial technology, fintech, trading risk, portfolio management, options strategy',
  ogImage = 'https://generalexchange.com/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
  structuredData
}) => {
  const siteUrl = 'https://generalexchange.com';
  const fullTitle = title.includes('General Exchange') ? title : `${title} | General Exchange`;
  const canonicalUrl = canonical || siteUrl;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'General Exchange',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '49.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247'
    },
    description: description,
    image: ogImage,
    url: siteUrl
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="General Exchange" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@generalexchange" />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="General Exchange" />
      <meta name="publisher" content="General Exchange" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

