import path from 'path'
import fs from 'fs'
import set from 'lodash.set'

// Some arbitrary future time
const future = new Date('10-12-2026').getTime()

/*
 * Main method that does what needs doing
 */
export const prebuildNavigation = (mdxPages, strapiPosts, site) => {
  const nav = {}
  for (const lang in mdxPages) {
    nav[lang] = {}

    // Handle MDX content
    for (const slug of Object.keys(mdxPages[lang]).sort()) {
      const page = mdxPages[lang][slug]
      const chunks = slug.split('/')
      set(nav, [lang, ...chunks], {
        __title: page.title,
        __linktitle: page.linktitle || page.title,
        __slug: slug,
        __order: page.order,
      })
    }

    // Handle strapi content
    for (const type in strapiPosts) {
      set(nav, [lang, type], {
        __title: type,
        __linktitle: type,
        __slug: type,
        __order: type,
      })
      for (const [slug, page] of Object.entries(strapiPosts[type][lang])) {
        const chunks = slug.split('/')
        set(nav, [lang, type, ...chunks], {
          __title: page.title,
          __linktitle: page.linktitle,
          __slug: type + '/' + slug,
          __order: (future - new Date(page.date).getTime()) / 100000,
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
