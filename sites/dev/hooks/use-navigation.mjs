import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import { orderedSlugLut } from 'shared/hooks/use-navigation-helpers.mjs'

/*
 * prebuildNavvigation[locale] holds the navigation structure based on MDX content.
 * The entire website only has a few pages that are now MDX-based:
 * - 404 => no navigation shown
 * - home page => no navvigation shown
 * - /contact => Added below
 *
 * Remember Mc Toshi:
 * Note: Set 'm' to truthy to show this as a main section in the side-navigation (optional)
 * Note: Set 'c' to set the control level to hide things from users (optional)
 * Note: Set 't' to the title
 * Note: Set 'o' to set the order (optional)
 * Note: Set 's' to the slug (optional insofar as it's not a real page (a spacer for the header))
 * Note: Set 'h' to indicate this is a top-level page that should be hidden from the side-nav (like search)
 * Note: Set 'i' when something should be included as top-level in the collapse side-navigation (optional)
 */

export const ns = ['account', 'sections', 'design', 'tags']

const sitePages = () => {
  const pages = {
    // Top-level pages that are the sections menu
    api: {
      m: 1,
      t: 'API Documentation',
      o: 10,
      s: 'api',
    },
    design: {
      m: 1,
      t: 'Design Sewing Patterns',
      o: 10,
      s: 'design',
    },
    contribute: {
      m: 1,
      t: 'Contribute to FreeSewing',
      o: 20,
      s: 'contribute',
    },
    i18n: {
      m: 1,
      t: 'Help Translate FreeSewing',
      o: 40,
      s: 'i18n',
    },
    infra: {
      m: 1,
      t: 'FreeSewing Infrastructure',
      o: 50,
      s: 'infra',
    },
    about: {
      m: 1,
      t: 'About FreeSewing',
      o: 60,
      s: 'about',
    },
    support: {
      m: 1,
      t: 'Support FreeSewing',
      o: 70,
      s: 'support',
    },
    search: {
      t: 'Search',
      o: 270,
      s: 'search',
      h: 1,
    },
    sitemap: {
      t: 'Sitemap',
      o: 270,
      s: 'sitemap',
      h: 1,
    },
  }
  return pages
}

export const useNavigation = () => {
  // Dev is EN only
  const siteNav = { ...pbn.en, ...sitePages() }

  // Make top-level documentation entries appear in i-list
  for (const page of ['tutorials', 'guides', 'howtos', 'reference', 'training']) {
    siteNav[page].o = 1000
    siteNav[page].i = 1
  }

  return {
    siteNav, // Site navigation
    slugLut: orderedSlugLut(siteNav), // Slug lookup table
  }
}
