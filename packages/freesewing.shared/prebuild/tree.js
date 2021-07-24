const fs = require('fs')
const path = require('path')
const set = require('lodash.set')
//const sortBy = require('lodash.sortby')
const config = require(`../../freesewing.${process.env.SITE}/freesewing.config`)

const mdxToTree = (path, page, pages) => ({
  _path: page.path,
  _title: page.frontmatter.title,
  _order: page.order,
})

const buildMdxTree = pages => {
  const tree = {}
  // Get children per page
  const leaves = {}
  for (const [path, page] of Object.entries(pages)) {
    const steps = path.split('/')
    set(tree, steps, mdxToTree(path, page, pages))
  }

  return tree
}

// Some arbitrary future time
const future = new Date(10-12-2026).getTime()

const addPosts = (tree, posts) => {
  tree.blog = {
    _path: '/blog',
    _title: 'Blog',
    _order: '999999999999',
  }
  for (const [slug, post] of Object.entries(posts)) {
    set(tree, ['blog', slug], {
      _path: `/blog/${slug}`,
      _title: post.linktitle,
      _order: future - new Date(post.date).getTime(),
    })
  }

  return tree
}


const prebuild = async (folder, mdx, strapi) => {
  for (const lang of config.languages) {
    const tree = addPosts(buildMdxTree(mdx.pages[lang]), strapi.posts[lang])
    fs.writeFileSync(
      path.join(...folder, `${lang}.tree.js`),
      `export const tree = ${JSON.stringify(tree)}\n`
    )
  }
}

module.exports = prebuild
