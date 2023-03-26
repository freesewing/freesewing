import path from 'path'
import fs from 'fs'
import set from 'lodash.set'

// Some arbitrary future time
const future = new Date('10-12-2026').getTime()

/*
 * Main method that does what needs doing
 */
export const prebuildNavigation = (mdxPages, strapiPosts, site) => {
  /*
   * Since this is written to disk and loaded as JSON, we minimize
   * the data to load by using the following 1-character keys:
   *
   * t: title
   * l: link title (shorter version of the title, optional
   * o: order, optional
   * s: slug without leading or trailing slash (/)
   */
  const nav = {}
  for (const lang in mdxPages) {
    nav[lang] = {}

    // Handle MDX content
    for (const slug of Object.keys(mdxPages[lang]).sort()) {
      const page = mdxPages[lang][slug]
      const chunks = slug.split('/')
      const val = {
        t: page.t,
        s: slug,
      }
      if (page.o) val._o = page.o
      set(nav, [lang, ...chunks], val)
    }

    // Handle strapi content
    for (const type in strapiPosts) {
      set(nav, [lang, type], {
        t: type,
        l: type,
        s: type,
        o: type,
      })
      for (const [slug, page] of Object.entries(strapiPosts[type][lang])) {
        const chunks = slug.split('/')
        set(nav, [lang, type, ...chunks], {
          t: page.title,
          l: page.linktitle,
          s: type + '/' + slug,
          o: (future - new Date(page.date).getTime()) / 100000,
        })
      }
    }
  }
  fs.writeFileSync(
    path.resolve('..', site, 'prebuild', `navigation.mjs`),
    `export const prebuildNavigation =  ${JSON.stringify(nav, null, 2)}`
  )

  return true
}
