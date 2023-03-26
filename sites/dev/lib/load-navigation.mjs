import get from 'lodash.get'
import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import orderBy from 'lodash.orderby'

const createCrumbs = (saa) =>
  saa.map((crumb, i) => {
    const entry = get(pbn.en, saa.slice(0, i + 1))
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
    sections[slug] = val
  }

  return orderBy(sections, 'o')
}

export const loadNavigation = (saa = []) => {
  // Creat crumbs array
  const crumbs = createCrumbs(saa)

  return {
    saa,
    slug: saa.join('/'),
    crumbs,
    sections: createSections(),
    nav: saa.length > 1 ? get(pbn.en, saa[0]) : pbn.en[saa[0]],
    title: crumbs.slice(-1)[0].t,
  }
}
