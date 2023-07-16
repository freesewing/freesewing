import path from 'path'
import fs from 'fs'
import set from 'lodash.set'
import { loadYaml, folders } from './i18n.mjs'

// Some arbitrary future time
const future = new Date('10-12-2026').getTime()

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
export const prebuildNavigation = (site, pages) => {
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
  console.log('Prebuilding navigation for', site)
  fs.mkdirSync(path.resolve('..', site, 'prebuild', `navigation`), { recursive: true })
  for (const lang in pages) {
    const translations = loadTranslation(lang)
    nav[lang] = {}

    // Handle MDX content
    for (const slug of Object.keys(pages[lang])) {
      const page = pages[lang][slug]
      const chunks = slug.split('/')
      const val = {
        t: page.t || translations[slug],
        s: slug,
      }
      if (page.o) val.o = page.o
      set(nav, [lang, ...chunks], val)
    }

    fs.writeFileSync(
      path.resolve('..', site, 'prebuild', `navigation`, `${lang}.mjs`),
      `/*#__PURE__*/ export const prebuildNavigation = ${JSON.stringify(nav[lang], null, 2)}`
    )
  }

  fs.writeFileSync(
    path.resolve('..', site, 'prebuild', `navigation`, 'index.mjs'),
    `/*#__PURE__*/ export const prebuildNavigation = ${JSON.stringify(nav, null, 2)}`
  )

  return true
}
