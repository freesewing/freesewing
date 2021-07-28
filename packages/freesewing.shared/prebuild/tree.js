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

const addBlogPosts = (tree, posts, lang, i18n) => {
  tree.blog = {
    _path: '/blog',
    _title: i18n ? i18n[lang].blog : 'Blog',
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

const addShowcasePosts = (tree, posts, lang, i18n) => {
  tree.showcase = {
    _path: '/showcase',
    _title: i18n ? i18n[lang].showcase : 'Showcase',
    _order: '999999999999',
  }
  for (const [slug, post] of Object.entries(posts)) {
    set(tree, ['showcase', slug], {
      _path: `/showcase/${slug}`,
      _title: post.title,
      _order: future - new Date(post.date).getTime(),
    })
  }

  return tree
}

const prebuild = async (folder, mdx, strapi, i18n) => {
  for (const lang of config.languages) {
    let tree = addBlogPosts(buildMdxTree(mdx.pages[lang]), strapi.blog.posts[lang], lang, i18n)
    if (process.env.SITE === 'org') tree = addShowcasePosts(tree, strapi.showcase.posts[lang], lang, i18n)
    fs.writeFileSync(
      path.join(...folder, `${lang}.tree.js`),
      `export const tree = ${JSON.stringify(tree)}\n`
    )
  }
}

module.exports = prebuild
