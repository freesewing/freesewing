const fs = require('fs')
const path = require('path')
const strapi = require('../lib/strapi')

const types = ['blog']

const prebuild = async (folder) => {
  if (process.env.SITE === 'org') types.push('showcase')
  const all = {}
  for (const type of types) {
    all[type] = {
      paths: {},
      posts: {}
    }
    for (const lang of strapi.languages) {
      const [paths, posts] = await strapi.getPosts(type, process.env.SITE, lang)
      all[type].paths[lang] = paths
      all[type].posts[lang] = posts
      fs.writeFileSync(
        path.join(...folder, `${lang}.strapi.${type}posts.js`),
        `export const paths = ${JSON.stringify(paths)}\n` +
        `export const posts = ${JSON.stringify(posts)}`
      )
    }
  }

  return all
}

module.exports = prebuild
