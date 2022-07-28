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
import mdxPluginToc from './mdx-plugin-toc.mjs'
import smartypants from 'remark-smartypants'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeJargon from 'rehype-jargon/src/index.js'
// Simple frontmatter extractor
import frontmatter from 'front-matter'
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

const jargonTransform = (term, html) => `<details class="inline jargon-details">
  <summary class="jargon-term">
    ${term}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 jargon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </summary>
  <div class="jargon-info">
  ${html}</div></details>`

const mdxLoader = async (language, site, slug, jargon) => {

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
            destinationDir: path.resolve(`../${site}/public/mdx`),
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
        [rehypeJargon, { jargon, transform: jargonTransform }],
        [rehypeHighlight, { plainText: ['dot', 'http'] }],
        rehypeSlug,
        rehypeAutolinkHeadings,
      ],
    })
  )

  // This is not ideal as we're adding a second pass but for now it will do
  // See: https://github.com/remarkjs/remark-toc/issues/37
  const toc = String(
    await compile(md, {
      outputFormat: 'function-body',
      remarkPlugins: [
        remarkFrontmatter,
        remarkGfm,
        smartypants,
        [
          mdxPluginToc,
          { language }
        ]
      ],
      rehypePlugins: [
        rehypeSlug,
      ],
    })
  )

  return { mdx, intro, toc, frontmatter: frontmatter(md)?.attributes }
}

export default mdxLoader
