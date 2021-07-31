const fs = require('fs')
const path = require('path')
const strapi = require('../lib/strapi')

const types = ['blog']

const prebuild = async (folder) => {
  if (process.env.SITE === 'org') types.push('showcase')
  const all = {}
  for (const type of types) {
    let indexImport = ''
    let indexExport = 'export default { '
    all[type] = {
      paths: {},
      posts: {}
    }
    for (const lang of strapi.languages) {
      indexImport += `import * as ${lang} from './${lang}.strapi.${type}posts.js'\n`
      indexExport += `${lang}, `
      const [paths, posts] = await strapi.getPosts(type, process.env.SITE, lang)
      all[type].paths[lang] = paths
      all[type].posts[lang] = posts
      fs.writeFileSync(
        path.join(...folder, `${lang}.strapi.${type}posts.js`),
        `export const paths = ${JSON.stringify(paths)}\n` +
        `export const posts = ${JSON.stringify(posts)}`
      )
    }
    fs.writeFileSync(
      path.join(...folder, `${type}posts.js`),
      `${indexImport}\n${indexExport.slice(0,-2)} }\n\n`
    )
  }

  return all
}

module.exports = prebuild

