import { useEffect } from 'react';

const SEOFallback = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  locale = 'es_ES',
  siteName = 'Nyx Digital'
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://nyxdigital.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const siteImage = image || `${siteUrl}/og-image.jpg`;

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, property = null) => {
      let tag;
      if (property) {
        tag = document.querySelector(`meta[property="${property}"]`) || 
               document.createElement('meta');
        tag.setAttribute('property', property);
      } else {
        tag = document.querySelector(`meta[name="${name}"]`) || 
               document.createElement('meta');
        tag.setAttribute('name', name);
      }
      tag.setAttribute('content', content);
      
      if (!document.head.contains(tag)) {
        document.head.appendChild(tag);
      }
    };

    // Basic meta tags
    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Nyx Digital');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'es');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Open Graph / Facebook
    updateMetaTag('og:type', type, 'og:type');
    updateMetaTag('og:url', fullUrl, 'og:url');
    updateMetaTag('og:title', title, 'og:title');
    updateMetaTag('og:description', description, 'og:description');
    updateMetaTag('og:image', siteImage, 'og:image');
    updateMetaTag('og:image:width', '1200', 'og:image:width');
    updateMetaTag('og:image:height', '630', 'og:image:height');
    updateMetaTag('og:image:alt', title, 'og:image:alt');
    updateMetaTag('og:site_name', siteName, 'og:site_name');
    updateMetaTag('og:locale', locale, 'og:locale');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', siteImage);
    updateMetaTag('twitter:creator', '@nyxdigital');
    updateMetaTag('twitter:site', '@nyxdigital');

    // Additional meta tags
    updateMetaTag('theme-color', '#64FFDA');
    updateMetaTag('msapplication-TileColor', '#0A192F');
    updateMetaTag('application-name', siteName);

    // Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === 'website' ? 'WebSite' : 'WebPage',
      "name": title,
      "description": description,
      "url": fullUrl,
      "image": siteImage,
      "publisher": {
        "@type": "Organization",
        "name": "Nyx Digital",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": 200,
          "height": 200
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-234-567-8900",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"]
        },
        "sameAs": [
          "https://twitter.com/nyxdigital",
          "https://facebook.com/nyxdigital",
          "https://instagram.com/nyxdigital",
          "https://linkedin.com/company/nyxdigital"
        ]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // This will be called when component unmounts
      // You could add cleanup logic here if needed
    };
  }, [title, description, keywords, siteImage, fullUrl, type, locale, siteName]);

  return null; // This component doesn't render anything
};

export default SEOFallback;
