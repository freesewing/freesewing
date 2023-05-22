import get from 'lodash.get'
import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import orderBy from 'lodash.orderby'

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
    sitemap: {
      t: 'Sitemap',
      s: 'sitemap',
      o: 70,
      h: 1,
    },
  }
  return pages
}

const createCrumbs = (path, nav) =>
  path.map((crumb, i) => {
    const entry = get(nav, path.slice(0, i + 1), { t: 'no-title', s: path.join('/') })
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o

    return val
  })

const createSections = (nav) => {
  const sections = {}
  for (const slug of Object.keys(nav)) {
    const entry = nav[slug]
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o
    if (!entry.h) sections[slug] = val
  }

  return orderBy(sections, ['o', 't'])
}

export const useNavigation = (params = {}) => {
  const { path = [], locale = 'en' } = params
  const nav = { ...pbn[locale], ...sitePages() }
  // Hide top-level documentation entries
  for (const page of ['tutorials', 'guides', 'howtos', 'reference', 'training']) {
    nav[page].h = 1
  }

  // Creat crumbs array
  const crumbs = createCrumbs(path, nav)
  const sections = createSections(nav)

  return {
    crumbs,
    sections,
    slug: path.join('/'),
    nav: path.length > 1 ? get(nav, path[0]) : path.length === 0 ? sections : nav[path[0]],
    title: crumbs.length > 0 ? crumbs.slice(-1)[0].t : '',
    siteNav: nav,
  }
}
