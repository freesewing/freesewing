import path from 'path'
import fs from 'fs'
import set from 'lodash.set'
import { loadYaml, folders } from './i18n.mjs'

// We need to load the translation for blog + showcase
const loadTranslation = (locale) => {
  let data
  try {
    data = loadYaml(`${folders.shared[0]}/navigation/sections.${locale}.yaml`, false)
  } catch (err) {
    data = {}
  }
  if (!data) data = {}

  return data
}

/*
 * Main method that does what needs doing
 */
export const prebuildNavigation = (docPages, postPages, site) => {
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
  for (const lang in docPages) {
    const translations = loadTranslation(lang)
    nav[lang] = {}

    // Handle MDX content
    for (const slug of Object.keys(docPages[lang]).sort()) {
      const page = docPages[lang][slug]
      const chunks = slug.split('/')
      const val = {
        t: page.t,
        s: slug,
      }
      if (page.o) val.o = page.o
      set(nav, [lang, ...chunks], val)
    }

    // Handle strapi content
    for (const type in postPages) {
      set(nav, [lang, type], {
        t: translations[type] || type,
        s: type,
      })

      for (const page in postPages[type][lang]) {
        const pageData = postPages[type][lang][page]
        const chunks = page.split('/')
        set(nav, [lang, ...chunks], {
          t: pageData.t,
          s: page,
          o: pageData.o,
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
