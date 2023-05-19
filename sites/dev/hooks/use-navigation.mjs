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
    developers: {
      t: 'For all Developers',
      s: 'developers',
      o: 10,
    },
    designers: {
      t: 'For Pattern Designers & Coders',
      s: 'designers',
      o: 20,
    },
    writers: {
      t: 'For Writers',
      s: 'writers',
      o: 30,
    },
    translators: {
      t: 'For Translators',
      s: 'translators',
      o: 40,
    },
    infrastructure: {
      t: 'FreeSewing Infrastructure',
      s: 'infrastructure',
      o: 50,
    },
    teamwork: {
      t: 'Open Source & Teamwork',
      s: 'teamwork',
      o: 60,
    },
    about: {
      t: 'About FreeSewing',
      s: 'about',
      o: 99,
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

export const useNavigation = ({ path, locale = 'en' }) => {
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
  }
}
