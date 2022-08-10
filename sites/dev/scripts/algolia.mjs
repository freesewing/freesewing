/*
 * This will update (replace really) the Algolia index with the
 * current website contents. Or at least the markdown and Strapi
 * content
 *
 * It expects the following environment vars to be set in a
 * .env file in the 'sites/dev' folder:
 *
 * ALGOLIA_API_WRITE_KEY -> Needs permission to index/create/delete
 *
 */
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import algoliasearch from 'algoliasearch'
import { unified } from 'unified'
import remarkParser from 'remark-parse'
import remarkCompiler from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import yaml from 'yaml'
import { getPosts } from '../../shared/prebuild/strapi.mjs'
import { getMdxFileList } from '../../shared/prebuild/mdx.mjs'
import config from '../algolia.config.mjs'
dotenv.config()

/*
 * Initialize Algolia client
 */
const client = algoliasearch(
  config.algolia.app,
  process.env.ALGOLIA_API_WRITE_KEY
)
const index = client.initIndex(config.algolia.index)

/*
 * Turn a Strapi blog post into an object ready for indexing
 */
const transformBlogpost = post => ({
  objectID: `/blog/${post.slug}`,
  page: `/blog/${post.slug}`,
  title: post.title,
  date: post.date,
  slug: post.slug,
  body: post.body,
  author: post.author,
  caption: post.caption,
  type: 'blog',
})

/*
 * Turn a Strapi author into an object ready for indexing
 */
const transformAuthor = author => ({
  objectID: `/blog/authors/${author.name}`,
  page: `/blog/authors/${author.name}`,
  name: author.name,
  displayname: author.displayname,
  about: author.about,
})

/*
 * Get and index blog posts and author info from Strapi
 */
const indexStrapiContent = async () => {

  // Say hi
  console.log(`🗂️  Indexing Strapi content to Algolia`)

  const authors = {}
  const rawPosts = await getPosts('blog', 'dev', 'en')
  // Extract list of authors
  for (const [slug, post] of Object.entries(rawPosts)) {
    authors[post.author.slug] = transformAuthor(post.author)
    rawPosts[slug].author = post.author.slug
  }
  // Index posts to Algolia
  index
    .saveObjects(Object.values(rawPosts).map(post => transformBlogpost(post)))
    .then(({ objectIDs }) => null)
    .catch(err => console.log(err))
  // Index authors to Algolia
  index
    .saveObjects(Object.values(authors))
    .then(({ objectIDs }) => null)
    .catch(err => console.log(err))
}

/*
 * Loads markdown from disk and compiles it into HTML for indexing
 */
const markdownLoader = async file => {

  const md = await fs.promises.readFile(file, 'utf-8')

  const page = await unified()
    .use(remarkParser)
    .use(remarkCompiler)
    .use(remarkFrontmatter)
    .use(remarkFrontmatterExtractor, { yaml: yaml.parse })
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(md)
  const id = file.split('freesewing/markdown/dev').pop().slice(0, -6)

  return {
    objectID: id,
    page: id,
    title: page.data.title,
    body: page.value,
    type: 'docs',
  }
}

/*
 * Clear the index to scrub old pages
 */
const clearIndex = async () => {
  console.log(`🗑️  Clearing index`)
  await index.clearObjects()
}


/*
 * Get and index markdown content
 */
const indexMarkdownContent = async () => {

  // Say hi
  console.log(`🗂️  Indexing Markdown content to Algolia`)

  // Setup MDX root path
  const mdxRoot = path.resolve('..', '..', 'markdown', 'dev')

  // Get list of filenames
  const list = await getMdxFileList(mdxRoot, 'en')
  const pages = []

  for (const file of list) pages.push(await markdownLoader(file))
  // Index markdown to Algolia
  await index.clearObjects()
  await index
    .saveObjects(pages)
    .then(({ objectIDs }) => null)
    .catch(err => console.log(err))
}

const run = async () => {
  if (
    process.env.VERCEL_ENV === 'production' ||
    process.env.FORCE_ALGOLIA
  ) {
    console.log()
    await clearIndex()
    await indexMarkdownContent()
    await indexStrapiContent()
    console.log()
  } else {
    console.log()
    console.log('Not a producion deploy. Not indexing to Algolia.')
    console.log('To force indexing, set the FORCE_ALGOLIA environment variable')
    console.log()
  }
}

run()

