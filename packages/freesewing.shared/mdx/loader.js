// We need fs and path to read from disk
import fs from 'fs'
import path from 'path'

// MDX compiler
import { compile } from '@mdx-js/mdx'

// Remark plugins we want to use
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkCopyLinkedFiles from 'remark-copy-linked-files'
import { remarkIntroPlugin } from './remark-intro-plugin.mjs'
import smartypants from 'remark-smartypants'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
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
  const intro = []
  const mdx = String(
    await compile(md, {
      outputFormat: 'function-body',
      remarkPlugins: [
        remarkFrontmatter,
        remarkGfm,
        smartypants,
        [
          remarkCopyLinkedFiles,
          {
            destinationDir: path.resolve(`../freesewing.${site}/public/mdx`),
            sourceDir: path.resolve(`../../markdown/${site}/${slug}`),
            staticPath: '/mdx/',
          }
        ],
        [
          remarkIntroPlugin,
          { intro }
        ]
      ],
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        rehypeAutolinkHeadings,
      ],
    })
  )

  return {mdx, intro}
}

export default mdxLoader
