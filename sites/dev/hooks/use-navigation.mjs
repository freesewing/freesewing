import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import { orderedSlugLut } from 'shared/hooks/use-navigation-helpers.mjs'

/*
 * prebuildNavvigation[locale] holds the navigation structure based on MDX content.
 * The entire website only has a few pages that are now MDX-based:
 * - 404 => no navigation shown
 * - home page => no navvigation shown
 * - /contact => Added below
 *
 * Remember Mc Shifto:
 * Note: Set 'm' to truthy to show this as a main section in the side-navigation (optional)
 * Note: Set 'c' to set the control level to hide things from users (optional)
 * Note: Set 's' to the slug (optional insofar as it's not a real page (a spacer for the header))
 * Note: Set 'h' to indicate this is a top-level page that should be hidden from the side-nav (like search)
 * Note: Set 'i' when something should be included as top-level in the collapse side-navigation (optional)
 * Note: Set 'f' to add the page to the footer
 * Note: Set 't' to the title
 * Note: Set 'o' to set the order (optional)
 */

export const ns = ['account', 'sections', 'design', 'tags']

const sitePages = () => {
  const pages = {
    // Top-level pages that are the sections menu
    api: {
      m: 1,
      s: 'api',
      t: 'API Documentation',
      o: 10,
    },
    design: {
      m: 1,
      s: 'design',
      t: 'Design Sewing Patterns',
      o: 10,
    },
    contribute: {
      m: 1,
      s: 'contribute',
      t: 'Contribute to FreeSewing',
      o: 20,
    },
    i18n: {
      m: 1,
      s: 'i18n',
      t: 'Help Translate FreeSewing',
      o: 40,
    },
    infra: {
      m: 1,
      s: 'infra',
      t: 'FreeSewing Infrastructure',
      o: 50,
    },
    about: {
      m: 1,
      s: 'about',
      f: 1,
      t: 'About FreeSewing',
      o: 60,
    },
    support: {
      m: 1,
      s: 'support',
      f: 1,
      t: 'Support FreeSewing',
      o: 70,
    },
    search: {
      s: 'search',
      h: 1,
      f: 1,
      t: 'Search',
      o: 270,
    },
    sitemap: {
      s: 'sitemap',
      h: 1,
      f: 1,
      t: 'Sitemap',
      o: 270,
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

  // Hide contact from the sitenav
  siteNav.contact.h = 1

  return {
    siteNav, // Site navigation
    slugLut: orderedSlugLut(siteNav), // Slug lookup table
  }
}
