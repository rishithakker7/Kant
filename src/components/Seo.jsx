import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ============================================
   SEO — per-page title, description & canonical
   Rendered once inside Layout.jsx. It watches the
   route and updates the <head> for each page.
   To change any page's wording, edit PAGES below.
   ============================================ */

const SITE_URL = 'https://kantadvertising.com';

const PAGES = {
  '/': {
    title: 'KANT Advertising | Advertising Agency in Mulund, Thane & Mumbai',
    description:
      'Full-service advertising agency in Mulund, Mumbai since 1982. Print, outdoor, digital, radio, TV and production for brands across Mumbai and India.',
  },
  '/about': {
    title: 'About KANT Advertising | Mulund Ad Agency Since 1982',
    description:
      'Established in 1982, KANT Advertising is a trusted Mulund-based agency with deep print expertise and 360° advertising solutions for clients across Mumbai and Thane.',
  },
  '/services': {
    title: 'Advertising Services in Mumbai | Print, Outdoor, Digital | KANT',
    description:
      'Print, outdoor, digital, radio, television and production: integrated advertising services from KANT Advertising, Mulund. Serving Thane and all of Mumbai.',
  },
  '/contact': {
    title: 'Contact KANT Advertising | Mulund West, Mumbai',
    description:
      'Contact KANT Advertising at Ecstasy Business Park, JSD Road, Mulund West, Mumbai 400080. Call +91 9152 833 833 or send us a message.',
  },
};

function setTag(tagName, matchAttr, matchValue, valueAttr, value) {
  let el = document.head.querySelector(`${tagName}[${matchAttr}="${matchValue}"]`);
  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(matchAttr, matchValue);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const page = PAGES[path] ?? PAGES['/'];
    const url = `${SITE_URL}${path === '/' ? '/' : path}`;

    document.title = page.title;
    setTag('meta', 'name', 'description', 'content', page.description);
    setTag('link', 'rel', 'canonical', 'href', url);
    setTag('meta', 'property', 'og:title', 'content', page.title);
    setTag('meta', 'property', 'og:description', 'content', page.description);
    setTag('meta', 'property', 'og:url', 'content', url);
  }, [pathname]);

  return null;
}
