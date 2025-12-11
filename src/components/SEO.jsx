import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, getPageSEO, getCanonicalUrl } from '@/constants/seo';

/**
 * SEO component: injects dynamic meta tags with sensible fallbacks.
 */
const SEO = ({
  page = 'home',
  language = 'he',
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  datePublished,
  serviceType,
  telephone,
  email,
  sameAs = [],
  breadcrumbs = [],
  extraLd = [],
}) => {
  const siteName = SEO_CONFIG?.site?.name || 'Joya-Tech';
  const pageSEO = getPageSEO(page, language);
  const defaultTitle = pageSEO?.title || siteName;
  const defaultDescription = pageSEO?.description || '';
  const defaultKeywords = pageSEO?.keywords || '';
  const defaultImage = SEO_CONFIG?.site?.ogImage || '';
  const defaultUrl = SEO_CONFIG?.site?.url || '';
  const twitterHandle = SEO_CONFIG?.site?.twitterHandle;

  const metaTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const canonicalPath = url || `/${page === 'home' ? '' : page}`;
  const metaUrl = getCanonicalUrl(canonicalPath);
  const metaType = type || 'website';
  const siteUrl = SEO_CONFIG?.site?.url || '';

  const buildLdJson = () => {
    if (metaType === 'article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metaTitle,
        description: metaDescription,
        image: metaImage ? [metaImage] : undefined,
        author: author ? { '@type': 'Person', name: author } : { '@type': 'Organization', name: siteName },
        datePublished: datePublished || undefined,
        mainEntityOfPage: metaUrl || undefined,
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: metaImage ? { '@type': 'ImageObject', url: metaImage } : undefined,
        },
      };
    }

    if (metaType === 'service') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: metaTitle,
        description: metaDescription,
        serviceType: serviceType || metaTitle,
        provider: {
          '@type': 'Organization',
          name: siteName,
          url: metaUrl || defaultUrl,
          logo: metaImage || defaultImage,
        },
      };
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: metaUrl || defaultUrl,
      logo: metaImage || defaultImage,
      contactPoint: telephone || email
        ? [{
            '@type': 'ContactPoint',
            telephone: telephone || undefined,
            email: email || undefined,
            contactType: 'customer support',
          }]
        : undefined,
      sameAs: sameAs.length ? sameAs : undefined,
    };
  };

  const ldJson = buildLdJson();
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl || defaultUrl,
    logo: metaImage || defaultImage,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  const breadcrumbLd = breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null;
  const alternateLang = language === 'he' ? 'en' : 'he';
  const altPage = page === 'home' ? '' : page;
  const hrefLangCurrent = metaUrl;
  const hrefLangAlternate = `${siteUrl}/${altPage}?lang=${alternateLang}`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {metaUrl && <link rel="canonical" href={metaUrl} />}
      {hrefLangCurrent && <link rel="alternate" hrefLang={language} href={hrefLangCurrent} />}
      {hrefLangAlternate && <link rel="alternate" hrefLang={alternateLang} href={hrefLangAlternate} />}
      {hrefLangCurrent && <link rel="alternate" hrefLang="x-default" href={metaUrl} />}

      <meta property="og:type" content={metaType} />
      <meta property="og:title" content={metaTitle} />
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      {metaImage && <meta property="og:image" content={metaImage} />}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'he' ? 'he_IL' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'he' ? 'en_US' : 'he_IL'} />
      {metaImage && (
        <>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/png" />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      {metaImage && <meta name="twitter:image" content={metaImage} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {[organizationLd, breadcrumbLd, ldJson, ...(Array.isArray(extraLd) ? extraLd : [])]
        .filter(Boolean)
        .map((block, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
