const site = process.env.SITE === 'org' ? 'org' : 'dev'
const fs = require('fs')
const path = require('path')
const mdx = require('../lib/mdx')
const config = require(`../../freesewing.${site}/freesewing.config`)
const patternInfo = site === 'org' ? require('@freesewing/pattern-info') : []
const designPages = ['cutting', 'fabric', 'instructions', 'options', 'measurements', 'needs']
const strings = site === 'org' ? require('@freesewing/i18n').strings : {}

const prebuild = async (folder) => {
  const allPaths = {}
  const allPages = {}
  for (const lang of config.languages) {
    let [paths, pages] = await mdx.get(config)
    if (hooks?.[site]?.paths) paths = hooks[site].paths(paths, lang)
    if (hooks?.[site]?.pages) pages = hooks[site].pages(pages, lang)
    allPaths[lang] = paths
    allPages[lang] = pages
    fs.writeFileSync(
      path.join(...folder, `${lang}.mdx.js`),
      `export const paths = ${JSON.stringify(paths, null, 2)}\n` +
      `export const pages = ${JSON.stringify(pages, null, 2)}`
    )
  }

  return { paths: allPaths, pages: allPages}
}

const t = (key,lang) => strings[lang][key]
const translations = {
  cutting: 'cutting',
  fabric: 'fabricOptions',
  instructions: 'instructions',
  options: 'patternOptions',
  measurements: 'requiredMeasurments',
  needs: 'whatYouNeed',
}

const addPatternPages = (pages, lang) => {
  for (const design of patternInfo.list) {
    pages[`docs/patterns/${design}`].frontmatter.title = t(`designs.${design}.t`, lang)
    for (const page of designPages) {
      const key = `docs/patterns/${design}/${page}`
      if (typeof pages[key] === 'undefined') {
        console.log(`[${lang}] No ${page} page for ${design}`)
      } else pages[key].frontmatter.title = t(translations[page], lang)
    }
    for (const option of patternInfo.options[design]) {
      const key = `docs/patterns/${design}/options/${option.toLowerCase()}`
      if (typeof pages[key] === 'undefined') {
        console.log(`[${lang}] No page for ${design}'s ${option} option`)
      } else pages[key].frontmatter.title = t(`options.${design}.${option}.t`, lang)
    }
  }

  return pages
}

const hooks = {
  dev: {
    paths: false,
    pages: false,
  },
  org: {
    paths: false,
    pages: addPatternPages,
  }
}

module.exports = prebuild

