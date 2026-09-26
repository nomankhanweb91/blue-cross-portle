import React, { useEffect } from 'react';
import { BreadcrumbItem } from '../../types';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article' | 'WebApplication';
  schema?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schema,
  breadcrumbs,
  noindex = false,
}) => {
  const siteUrl = 'https://blue-cross.org';
  const fullCanonical = `${siteUrl}${canonicalPath}`;
  const fullTitle = `${title} | BLUE CROSS — INDIA SUPER PORTAL`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Helper for setting meta tags
    const setMeta = (nameOrProperty: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameOrProperty}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameOrProperty, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:site_name', 'Blue Cross India');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:card', 'summary_large_image');

    if (noindex) {
      setMeta('name', 'robots', 'noindex, follow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large');
    }

    // 3. Update Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonical);

    // 4. Inject Dynamic Schema.org JSON-LD
    const jsonLdElements: HTMLScriptElement[] = [];

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.setAttribute('data-dynamic-schema', 'true');
      document.head.appendChild(script);
      jsonLdElements.push(script);
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbListSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.label,
          'item': b.url ? `${siteUrl}${b.url}` : fullCanonical,
        })),
      };
      const bScript = document.createElement('script');
      bScript.type = 'application/ld+json';
      bScript.text = JSON.stringify(breadcrumbListSchema);
      bScript.setAttribute('data-dynamic-breadcrumb', 'true');
      document.head.appendChild(bScript);
      jsonLdElements.push(bScript);
    }

    return () => {
      // Clean up injected script elements on unmount
      jsonLdElements.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [fullTitle, description, fullCanonical, type, schema, breadcrumbs, noindex]);

  return null;
};
