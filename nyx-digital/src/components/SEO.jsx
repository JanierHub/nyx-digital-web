import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  locale = 'es_ES',
  siteName = 'Nyx Digital'
}) => {
  const [useHelmet, setUseHelmet] = useState(true);
  const [error, setError] = useState(null);

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://nyxdigital.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const siteImage = image || `${siteUrl}/og-image.jpg`;

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

  // Fallback manual SEO implementation
  const ManualSEO = () => {
    useEffect(() => {
      try {
        // Update document title
        if (title) {
          document.title = title;
        }

        // Update meta tags
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
        let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
        if (!structuredDataScript) {
          structuredDataScript = document.createElement('script');
          structuredDataScript.setAttribute('type', 'application/ld+json');
          document.head.appendChild(structuredDataScript);
        }
        structuredDataScript.textContent = JSON.stringify(structuredData);

      } catch (err) {
        console.error('SEO fallback error:', err);
      }
    }, [title, description, keywords, siteImage, fullUrl, type, locale, siteName, structuredData]);

    return null;
  };

  // Try to use Helmet, fallback to manual if it fails
  useEffect(() => {
    try {
      // Test if Helmet is available
      const test = Helmet;
      if (!test) {
        setUseHelmet(false);
      }
    } catch (err) {
      console.warn('Helmet not available, using fallback SEO');
      setUseHelmet(false);
      setError(err);
    }
  }, []);

  if (error || !useHelmet) {
    return <ManualSEO />;
  }

  try {
    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Nyx Digital" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="es" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={fullUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content={locale} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:creator" content="@nyxdigital" />
        <meta name="twitter:site" content="@nyxdigital" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#64FFDA" />
        <meta name="msapplication-TileColor" content="#0A192F" />
        <meta name="application-name" content={siteName} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    );
  } catch (err) {
    console.error('Helmet error, falling back to manual SEO:', err);
    return <ManualSEO />;
  }
};

export default SEO;
