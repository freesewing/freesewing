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
 * Summary: Loads markdown from disk and compiles it as MDX.
 *
 * @param (string) language - language to load (eg: 'en')
 * @param (string) site - site to load (either 'dev' or 'org')
 * @param (string) slug - slug of the page (eg: 'guides/patterns')
 *
 * @link https://mdxjs.com/guides/mdx-on-demand/
 *
 */
const mdxLoader = async (language, site, slug) => {

  // TODO: Will this work on Windows?
  const md = await fs.promises.readFile(
    path.resolve(`../../markdown/${site}/${slug}/${language}.md`),
    'utf-8'
  )

  const mdx = String(
    await compile(md, {
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

  return mdx
}

export default mdxLoader
