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
//import mdxMermaid from 'mdx-mermaid'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeJargon from 'pkgs/rehype-jargon/src/index.mjs'
import rehypeHighlightLines from 'pkgs/rehype-highlight-lines/src/index.mjs'
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

export const mdxLoader = async (language, site, slug, jargon) => {
  // TODO: Will this work on Windows?
  const md = await fs.promises.readFile(
    path.resolve(`../../markdown/${site}/${slug}/${language}.md`),
    'utf-8'
  )
  const intro = []
  const mdx = String(
    await compile(md, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [
        //mdxMermaid,
        remarkFrontmatter,
        remarkGfm,
        smartypants,
        [
          remarkCopyLinkedFiles,
          {
            destinationDir: path.resolve(`../${site}/public/mdx`),
            sourceDir: path.resolve(`../../markdown/${site}/${slug}`),
            staticPath: '/mdx/',
          },
        ],
        [remarkIntroPlugin, { intro }],
      ],
      rehypePlugins: [
        [rehypeJargon, { jargon, transform: jargonTransform }],
        [
          rehypeHighlight,
          {
            plainText: ['dot', 'http', 'mermaid'],
            aliases: {
              javascript: [
                'design/src/index.mjs',
                'design/src/part.mjs',
                'design/src/bib.mjs',
                'index.mjs',
                'part.mjs',
                'bib.mjs',
              ],
              json: [
                '200.json',
                '201.json',
                '204.json',
                '400.json',
                '401.json',
                '403.json',
                '404.json',
                '500.json',
              ],
              markdown: ['en.md'],
            },
          },
        ],
        [
          rehypeHighlightLines,
          {
            highlightClass: ['highlight-lines', 'border-l-4'],
            strikeoutClass: [
              'strikeout-lines',
              'bg-orange-300',
              'bg-opacity-5',
              'border-l-4',
              'opacity-80',
              'line-through',
              'decoration-orange-500',
            ],
          },
        ],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: { className: 'heading-autolink' },
          },
        ],
      ],
    })
  )

  // This is not ideal as we're adding a second pass but for now it will do
  // See: https://github.com/remarkjs/remark-toc/issues/37
  const toc = String(
    await compile(md, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [remarkFrontmatter, remarkGfm, smartypants, [mdxPluginToc, { language }]],
      rehypePlugins: [rehypeSlug],
    })
  )

  return { mdx, intro, toc, frontmatter: frontmatter(md)?.attributes }
}
