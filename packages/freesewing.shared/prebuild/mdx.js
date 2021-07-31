const fs = require('fs')
const path = require('path')
const mdx = require('../lib/mdx')
const config = require(`../../freesewing.${process.env.SITE}/freesewing.config`)

const prebuild = async (folder) => {
  const allPaths = {}
  const allPages = {}
  for (const lang of config.languages) {
    const [paths, pages] = await mdx.get(process.env.SITE, lang)
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

module.exports = prebuild

const addPatternPages = (pages) => {

}

const hooks = {
  dev: {
    paths: {
      pre: false,
      post: false
    },
    pages: {
      pre: false,
      post: false
    },
  },
  org: {
    paths: {
      pre: false,
      post: false
    },
    pages: {
      pre: false,
      post: addPatternPages
    },
  }
}

