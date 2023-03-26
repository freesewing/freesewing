import get from 'lodash.get'
import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import orderBy from 'lodash.orderby'

/*
 * prebuildNavvigation.en holds the naigation structure based on MDX content.
 * The entire website only has a few pages that are now MDX-based:
 * - 404 => no navigation shown
 * - home page => no navvigation shown
 * - /contact => Added below
 *
 * Note: Set 'h' to truthy to not show a top-level entry as a section
 */
pbn.en.contact = { t: 'Contact information', s: 'contact', h: 1 }

const createCrumbs = (path) =>
  path.map((crumb, i) => {
    const entry = get(pbn.en, path.slice(0, i + 1))
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o

    return val
  })

const createSections = () => {
  const sections = {}
  for (const slug of Object.keys(pbn.en)) {
    const entry = pbn.en[slug]
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o
    if (!entry.h) sections[slug] = val
  }

  return orderBy(sections, 'o')
}

export const loadNavigation = (path = []) => {
  // Creat crumbs array
  const crumbs = createCrumbs(path)

  return {
    path,
    slug: path.join('/'),
    crumbs,
    sections: createSections(),
    nav: path.length > 1 ? get(pbn.en, path[0]) : pbn.en[path[0]],
    title: crumbs.slice(-1)[0].t,
  }
}
