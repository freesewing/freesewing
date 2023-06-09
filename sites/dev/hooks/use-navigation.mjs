import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'

/*
 * prebuildNavvigation[locale] holds the navigation structure based on MDX content.
 * The entire website only has a few pages that are now MDX-based:
 * - 404 => no navigation shown
 * - home page => no navvigation shown
 * - /contact => Added below
 *
 * Note: Set 'h' to truthy to not show a top-level entry as a section
 * Note: Set 'c' to set the control level to hide things from users
 */

export const ns = ['account', 'sections', 'design', 'tags']

const sitePages = () => {
  const pages = {
    // Top-level pages that are the sections menu
    api: {
      t: 'API Documentation',
      s: 'api',
      o: 10,
    },
    design: {
      t: 'Design Sewing Patterns',
      s: 'design',
      o: 10,
    },
    contribute: {
      t: 'Contribute to FreeSewing',
      s: 'contribute',
      o: 20,
    },
    i18n: {
      t: 'Help Translate FreeSewing',
      s: 'i18n',
      o: 40,
    },
    infra: {
      t: 'FreeSewing Infrastructure',
      s: 'infra',
      o: 50,
    },
    about: {
      t: 'About FreeSewing',
      s: 'about',
      o: 60,
    },
    support: {
      t: 'Support FreeSewing',
      s: 'support',
      o: 70,
    },
    spacer1: {
      t: 'spacer',
      o: 100,
      b: 1,
    },
    spacer2: {
      t: 'spacer',
      o: 2000,
      b: 1,
    },
    search: {
      t: 'Search',
      s: 'search',
      o: 270,
      h: 1,
    },
    sitemap: {
      t: 'Sitemap',
      s: 'sitemap',
      o: 270,
      h: 1,
    },
  }
  return pages
}

export const useNavigation = (params = {}) => {
  const { path = [], locale = 'en' } = params
  const nav = { ...pbn[locale], ...sitePages() }
  // Make top-level documentation entries appear in b-list
  for (const page of ['tutorials', 'guides', 'howtos', 'reference', 'training']) {
    nav[page].o = 1000
    nav[page].b = 1
  }
  nav.contact.h = 1

  return nav
}
