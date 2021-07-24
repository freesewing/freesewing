const fs = require('fs')
const path = require('path')
const strapi = require('../lib/strapi')

const prebuild = async (folder) => {
  const allPaths = {}
  const allPosts = {}
  for (const lang of strapi.languages) {
    const [paths, posts] = await strapi.getPosts('blog', process.env.SITE, lang)
    allPaths[lang] = paths
    allPosts[lang] = posts
    fs.writeFileSync(
      path.join(...folder, `${lang}.strapi.blogposts.js`),
      `export const paths = ${JSON.stringify(paths)}\n` +
      `export const posts = ${JSON.stringify(posts)}`
    )
  }

  return { paths: allPaths, posts: allPosts}
}

module.exports = prebuild
