import path from 'path'
import fs from 'fs'
import set from 'lodash.set'
import orderBy from 'lodash.orderby'
//import { loadYaml, folders } from './i18n.mjs'
import { extendSiteNav as dev } from './sitenav-dev.mjs'
import { pageHasChildren } from '../utils.mjs'

const extendNav = { dev }

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
  const { docs, site, posts = false } = store
  /*
   * Since this is written to disk and loaded as JSON, we minimize
   * the data to load by using the following 1-character keys:
   *
   * t: title
   * o: order, optional
   * s: slug without leading or trailing slash (/)
   */
  const sitenav = {}
  const sluglut = {}
  for (const lang in docs) {
    sitenav[lang] = {}
    sluglut[lang] = {}

    // Handle docs
    for (const slug of Object.keys(docs[lang]).sort()) {
      const page = docs[lang][slug]
      const val = {
        t: page.t,
        s: slug,
      }
      if (page.o) val.o = page.o
      set(sitenav, [lang, ...slug.split('/')], val)
    }

    // Handle posts
    if (posts) {
      for (const type in posts) {
        for (const [slug, post] of Object.entries(posts[type][lang])) {
          set(sitenav, [lang, ...slug.split('/')], { t: post.t, o: post.o, s: slug })
        }
      }
    }

    // Extend navigation if there's a method for that
    if (extendNav[site]) sitenav[lang] = extendNav[site](sitenav[lang], lang)
    // Create slut lookup table
    sluglut[lang] = orderedSlugLut(sitenav[lang])

    // Write out navigation object
    fs.writeFileSync(
      path.resolve('..', site, 'prebuild', `navigation.${lang}.mjs`),
      `export const siteNav =  ${JSON.stringify(sitenav[lang])}`
    )

    // Write out slug lookup table (sluglut)
    fs.writeFileSync(
      path.resolve('..', site, 'prebuild', `sluglut.${lang}.mjs`),
      `export const slugLut =  ${JSON.stringify(sluglut[lang])}`
    )
  }

  // Update the store
  store.navigation = { sitenav, sluglut }

  return
}
