// We need fs and path to read from disk
import fs from 'fs'
import path from 'path'

// MDX compiler
import { compile } from '@mdx-js/mdx'

// Remark plugins we want to use
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'

/*
 * Summary: Loads strapi content from disk
 *
 * @param (string) language - language to load (eg: 'en')
 * @param (string) site - site to load (either 'dev' or 'org')
 * @param (string) type - type of content to load (either 'blog', 'showcase' or 'author')
 * @param (string) slug - slug of the page (eg: 'pattern-docs-option-sampling')
 *
 * @link https://mdxjs.com/guides/mdx-on-demand/
 *
 */
const strapiLoader = async (language, site, type, slug) => {

  const post = JSON.parse(
    ( await fs.promises.readFile(
        path.resolve('..', `freesewing.${site}`, 'prebuild', `strapi.${type}.${language}.${slug}.json`),
      'utf-8'
    ))
  )
  const author = JSON.parse(
    ( await fs.promises.readFile(
        path.resolve('..', `freesewing.${site}`, 'prebuild', `strapi.authors.${type}.${language}.${post.author}.json`),
      'utf-8'
    ))
  )

  // Compile MDX
  post.mdx = String(
    await compile(post.body, {
      outputFormat: 'function-body',
      remarkPlugins: [
        remarkFrontmatter,
        remarkGfm,
      ],
      rehypePlugins: [
        rehypeHighlight
      ],
    })
  )

  return { post, author }
}

export default strapiLoader
