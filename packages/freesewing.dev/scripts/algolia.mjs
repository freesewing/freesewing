/*
 * This will update (replace really) the Algolia index with the
 * current website contents. Or at least the markdown and Strapi
 * content
 *
 * It expects the following environment vars to be set in a
 * .env file in the 'packages/freesewing.dev' folder:
 *
 * ALGOLIA_APP_ID -> probably MA0Y5A2PF0
 * ALGOLIA_API_KEY -> Needs permission to index/create/delete
 * ALGOLIA_INDEX -> Name of the index to index to
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
import { getPosts } from '../../freesewing.shared/prebuild/strapi.mjs'
import { getMdxFileList } from '../../freesewing.shared/prebuild/mdx.mjs'
dotenv.config()

/*
 * Initialize Algolia client
 */
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX)

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
  console.log()
  console.log(`Indexing Strapi content to Algolia`)

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
    .then(({ objectIDs }) => console.log(objectIDs))
    .catch(err => console.log(err))
  // Index authors to Algolia
  index
    .saveObjects(Object.values(authors))
    .then(({ objectIDs }) => console.log(objectIDs))
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
 * Get and index markdown content
 */
const indexMarkdownContent = async () => {

  // Say hi
  console.log()
  console.log(`Indexing Markdown content to Algolia`)

  // Setup MDX root path
  const mdxRoot = path.resolve('..', '..', 'markdown', 'dev')

  // Get list of filenames
  const list = await getMdxFileList(mdxRoot, 'en')
  const pages = []
  for (const file of list) pages.push(await markdownLoader(file))
  // Index markdown to Algolia
  index
    .saveObjects(pages)
    .then(({ objectIDs }) => console.log(objectIDs))
    .catch(err => console.log(err))
}

const run = async () => {
  if (
    (process.env.NETLIFY && process.env.CONTEXT === 'production' && false) // disabled for now
    || process.env.FORCE_ALGOLIA
  ) {
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

