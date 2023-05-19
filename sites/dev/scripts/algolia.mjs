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
import { visit } from 'unist-util-visit'
import remarkParser from 'remark-parse'
import remarkCompiler from 'remark-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkFrontmatterExtractor from 'remark-extract-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import yaml from 'yaml'
import { getMdxFileList } from '../../shared/prebuild/mdx.mjs'
import config from '../algolia.config.mjs'
dotenv.config()

/*
 * Initialize Algolia client
 */
const client = algoliasearch(config.algolia.app, process.env.ALGOLIA_API_WRITE_KEY)
const index = client.initIndex(config.algolia.index)

/*
 * Loads markdown from disk and compiles it into HTML for indexing
 */
const markdownLoader = async (file) => {
  const md = await fs.promises.readFile(file, 'utf-8')

  const page = await unified()
    .use(remarkParser)
    .use(remarkCompiler)
    .use(remarkFrontmatter)
    .use(remarkFrontmatterExtractor, { yaml: yaml.parse })
    .use(scrubMarkdownForSearch)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(md)
  const id = file.split('freesewing/markdown/dev').pop().slice(0, -6)

  return {
    objectID: id,
    page: id,
    title: page.data.title.trim(),
    body: page.value.trim(),
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

  for (const file of list) {
    const content = await markdownLoader(file)
    pages.push(content)
  }
  // Index markdown to Algolia
  await index.clearObjects()
  await index
    .saveObjects(pages)
    .then(() => null)
    .catch((err) => console.log(err))
}

const run = async () => {
  if (process.env.VERCEL_ENV === 'production' || process.env.FORCE_ALGOLIA) {
    console.log()
    await clearIndex()
    await indexMarkdownContent()
    console.log()
  } else {
    console.log()
    console.log('Not a producion deploy. Not indexing to Algolia.')
    console.log('To force indexing, set the FORCE_ALGOLIA environment variable')
    console.log()
  }
}

run()

// Strip YAML frontmatter from body
const noYaml = (children) => {
  if (!children || !children.length) return []
  let start = false
  let end = false
  for (const i in children) {
    const child = children[i]
    if (child.type === 'yaml') children[i] = { type: 'text', value: '' }
  }

  return children
}

// Strip examples from body
const noExamples = (children) => {
  if (!children || !children.length) return []
  let start = false
  let end = false
  for (const i in children) {
    const child = children[i]
    if (!start && child.type === 'html' && child.value.includes('<Example')) start = i
    if (!end && child.value && child.value.includes('/Example>')) end = i
  }

  return end ? [...children.slice(0, start), ...children.slice(end + 1)] : children
}

// scrubs markdown and removed content irrelevant for search
// such as inline code examples and frontmatter.
function scrubMarkdownForSearch() {
  // Tree visitor
  const visitor = (node) => {
    if (node.type === 'root') {
      if (!node.children || !node.children.length) return
      let pre = node.children.length
      let post = 0
      let children = noExamples(noYaml(node.children))
      while (pre > post) {
        pre = children.length
        children = noExamples(children)
        post = children.length
      }
      node.children = children
    }
  }

  // Transformer method using the visitor pattern
  const transform = (tree) => {
    visit(tree, 'root', visitor)
  }

  return transform
}
