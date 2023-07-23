import path from 'path'
import fs from 'fs'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'
import { extendSiteNav as dev } from './sitenav-dev.mjs'
import { extendSiteNav as org } from './sitenav-org.mjs'
import { extendSiteNav as lab } from './sitenav-lab.mjs'
import { pageHasChildren } from '../utils.mjs'
import { header } from './shared.mjs'

const extendNav = { dev, org, lab }

/*
 * A method to recursively add the ordered slugs to the LUT
 */
const flattenOrderedChildPages = (nav) => {
  const slugs = []
  for (const page of orderBy(nav, ['o', 't'], ['asc', 'asc'])) {
    if (page.s) {
      slugs.push(page.s)
      if (pageHasChildren(page)) slugs.push(...flattenOrderedChildPages(page))
    }
  }

  return slugs
}

/*
 * This builds the slugLut (slug look up table) which makes it trivial to
 * build the PrevNext component as it builds a flat list of all pages in
 * the order they are naturally presented to the reader. So if you have
 * a page's slug, you merely need to look it up in the list and return the
 * next entry (or previous)
 */
export const orderedSlugLut = (nav) => {
  const slugs = []
  for (const page of orderBy(nav, ['o', 't'], ['asc', 'asc'])) {
    if (page.s) {
      slugs.push(page.s)
      if (pageHasChildren(page)) slugs.push(...flattenOrderedChildPages(page))
    }
  }

  return slugs
}

/*
 * Main method that does what needs doing
 */
export const prebuildNavigation = async (store) => {
  const { site, language, docs = false, posts = false } = store
  /*
   * Since this is written to disk and loaded as JSON, we minimize
   * the data to load by using the following 1-character keys:
   *
   * t: title
   * o: order, optional
   * s: slug without leading or trailing slash (/)
   */
  let sitenav = {}

  // Handle docs if there are any
  if (docs) {
    for (const slug of Object.keys(docs).sort()) {
      const page = docs[slug]
      const val = {
        t: page.t,
        s: slug,
      }
      if (page.o) val.o = page.o
      set(sitenav, slug.split('/'), val)
    }
  }

  // Handle posts if there are any
  if (posts) {
    for (const type in posts) {
      for (const [slug, post] of Object.entries(posts[type].posts)) {
        set(sitenav, slug.split('/'), { t: post.t, o: post.o, s: slug })
      }
    }
  }

  // Extend navigation if there's a method for that
  if (extendNav[site]) sitenav = await extendNav[site](sitenav, language)

  // Write out navigation object
  fs.writeFileSync(
    path.resolve('..', site, 'prebuild', `sitenav.mjs`),
    `${header}export const siteNav =  ${JSON.stringify(sitenav, null, 2)}`
  )

  /*
   * Write out slug lookup table
   */
  const sluglut = orderedSlugLut(sitenav)
  fs.writeFileSync(
    path.resolve('..', site, 'prebuild', `sluglut.mjs`),
    `${header}export const slugLut =  ${JSON.stringify(sluglut)}`
  )

  return (store.navigation = { sluglut, sitenav })
}
