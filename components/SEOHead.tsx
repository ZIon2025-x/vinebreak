import React, { useEffect } from 'react';

const DEFAULT_TITLE = 'Vinebreak | Natural Vitality Skincare';
const DEFAULT_DESCRIPTION =
  'Honoring the earth, the vine, and your natural skin barrier. Artisanal soaps and skincare from Bordeaux.';
const SITE_URL = typeof window !== 'undefined' ? window.location.origin : '';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  path?: string;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage,
  path = '',
}) => {
  const fullTitle = title ? `${title} | Vinebreak` : DEFAULT_TITLE;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const image = ogImage || `${SITE_URL}/og-default.jpg`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('og:image', image, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
  }, [fullTitle, description, url, image]);

  return null;
};
