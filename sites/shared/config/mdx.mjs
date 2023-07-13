import path from 'path'
// Remark plugins we want to use
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkCopyLinkedFiles from 'remark-copy-linked-files'
//import { remarkIntroPlugin } from './remark-intro-plugin.mjs'
import mdxPluginToc from '../mdx/mdx-plugin-toc.mjs'
import smartypants from 'remark-smartypants'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeJargon from '../../../packages/rehype-jargon/src/index.mjs'
import rehypeHighlightLines from '../../../packages/rehype-highlight-lines/src/index.mjs'

const jargonTransform = (term, html) => `<details class="inline jargon-details">
  <summary class="jargon-term">
    ${term}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 jargon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </summary>
  <div class="jargon-info">
  ${html}</div></details>`

export const getMdxConfig = ({ site, jargon, slug }) => ({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    format: 'mdx',
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      smartypants,
      [
        remarkCopyLinkedFiles,
        {
          destinationDir: path.resolve(`../${site}/public/mdx`),
          sourceDir: slug && path.resolve(`../../markdown/${site}/${slug}`),
          staticPath: '/mdx/',
        },
      ],
      //[remarkIntroPlugin, { intro }],
      mdxPluginToc,
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
  },
})
