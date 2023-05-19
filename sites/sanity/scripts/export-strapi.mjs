import path from 'path'
import fs from 'fs'
import axios from 'axios'
import { strapiHost } from '../../shared/config/freesewing.mjs'
import { unified } from 'unified'
import remarkParser from 'remark-parse'
import remarkCompiler from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
import yaml from 'yaml'
import { remarkIntroPlugin } from '../../shared/mdx/remark-intro-plugin.mjs'

/*
 * Helper method to extract the intro from a Strapi post
 *
 * Parameters:
 *
 *  - body: the post's body (markdown content)
 */
const postIntro = async (markdown) =>
  await unified()
    .use(remarkIntroPlugin)
    .use(remarkParser)
    .use(remarkCompiler)
    .use(remarkFrontmatter)
    .use(remarkFrontmatterExtractor, { yaml: yaml.parse })
    .process(markdown)

/*
 * Helper method to create the API url for retrieval of Strapi posts
 */
const buildUrl = (type, site, lang) => {
  if (type === 'blog')
    return `${strapiHost}/blogposts?_locale=${lang}&_sort=date:ASC&dev_${
      site === 'dev' ? 'eq' : 'ne'
    }=true`
  if (type === 'showcase') return `${strapiHost}/showcaseposts?_locale=${lang}&_sort=date:ASC`
  if (type === 'newsletter') return `${strapiHost}/newsletters?_sort=date:ASC`
}

/*
 * Helper method to load posts from Strapi
 * Exported because it's re-used by the Algolia indexing script
 */
export const getPosts = async (type, lang) => {
  let res
  try {
    res = await axios.get(buildUrl(type, 'org', lang))
  } catch (err) {
    console.log(`⚠️  Failed to load ${type} posts [${lang}]`)
  }
  const posts = {}
  for (const post of res?.data || []) {
    const intro = await postIntro(`---\n---\n\n${post.body}`)
    posts[post.slug] = { ...post, intro: intro.data.intro }
  }

  return posts
}

/*
 * Transforms a blog post from strapi to sanity
 */
const transformBlogPost = async (p, lang) => {
  const asIs = ['title', 'linktitle', 'caption', 'body']

  const post = {
    _id: `${lang}.blog.${p.slug}`,
    _type: `blog${lang}`,
  }
  for (const field of asIs) post[field] = p[field]
  post.intro = p.intro || p.title
  post.date = p.date
  post.author = 'joost'
  post.image = {
    _type: 'image',
    _sanityAsset: `image@https://posts.freesewing.org${p.image.url}`,
  }
  post.slug = {
    _type: 'slug',
    current: p.slug,
  }

  return post
}

/*
 * Exports blog posts for a given language
 */
const exportBlogPosts = async (lang) => {
  const posts = []
  const strapiPosts = await getPosts('blog', lang)
  for (const post of Object.values(strapiPosts)) {
    posts.push(await transformBlogPost(post, lang))
  }
  fs.writeFileSync(
    `./export/blog${lang}.ndjson`,
    posts.map((post) => JSON.stringify(post)).join('\n')
  )
}

/*
 * Transforms a showcase post from strapi to sanity
 */
const transformShowcasePost = async (p, lang) => {
  const asIs = ['title', 'caption', 'body']

  const post = {
    _id: `${lang}.showcase.${p.slug}`,
    _type: `showcase${lang}`,
  }
  for (const field of asIs) post[field] = p[field]
  post.intro = p.intro || p.title
  post.date = p.date
  post.maker = 'joost'
  post.image = [
    {
      _type: 'image',
      _sanityAsset: `image@https://posts.freesewing.org${p.image.url}`,
    },
  ]
  post.slug = {
    _type: 'slug',
    current: p.slug,
  }

  return post
}

/*
 * Exports showcase posts for a given language
 */
const exportShowcasePosts = async (lang) => {
  const posts = []
  const strapiPosts = await getPosts('showcase', lang)
  for (const post of Object.values(strapiPosts)) {
    posts.push(await transformShowcasePost(post, lang))
  }
  fs.writeFileSync(
    `./export/showcase${lang}.ndjson`,
    posts.map((post) => JSON.stringify(post)).join('\n')
  )
}

/*
 * Transforms a newsletter post from strapi to sanity
 */
const transformNewsletterPost = async (p) => {
  const asIs = ['title', 'body']

  const post = {
    _id: `newsletter.${p.slug}`,
    _type: 'newsletter',
  }
  for (const field of asIs) post[field] = p[field]
  post.intro = p.intro || p.title
  post.slug = {
    _type: 'slug',
    current: p.slug,
  }

  return post
}

/*
 * Exports newsletter posts
 */
const exportNewsletterPosts = async (lang) => {
  const posts = []
  const strapiPosts = await getPosts('newsletter', 'en')
  for (const post of Object.values(strapiPosts)) {
    posts.push(await transformNewsletterPost(post))
  }
  fs.writeFileSync(
    `./export/newsletter.ndjson`,
    posts.map((post) => JSON.stringify(post)).join('\n')
  )
}

/*
 * Main method that does what needs doing
 */
const exportStrapi = async () => {
  // Say hi
  console.log()
  console.log(`Exporting content from Strapi`)

  for (const lang of ['en', 'es', 'fr', 'de', 'nl']) {
    console.log(`  - Blog ${lang.toUpperCase()}`)
    await exportBlogPosts(lang)
    console.log(`  - Showcase ${lang.toUpperCase()}`)
    await exportShowcasePosts(lang)
  }
  await exportNewsletterPosts()
}

exportStrapi()
