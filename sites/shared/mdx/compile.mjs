import path from 'path'
// MDX compiler & runner
import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
// Remark plugins from the ecosystem
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkCopyLinkedFiles from 'remark-copy-linked-files'
import smartypants from 'remark-smartypants'
// FreeSewing custom remark plugins
import { remarkIntroAsFrontmatter } from './remark-intro-as-frontmatter.mjs'
import { remarkTocAsFrontmatter } from './remark-toc-as-frontmatter.mjs'
import { remarkGithubImages } from './remark-github-images.mjs'
// Rehype plugins from the ecosystem
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeHighlightLines from 'pkgs/rehype-highlight-lines/src/index.mjs'

/*
 * Compiles markdown/mdx to a function body
 */
export const compileMdx = async ({
  md, // A string holding the markdown
  site, // The site folder, one of 'org' or 'dev'
  slug, // The slug to the page below the folder (like 'guides/plugins')
  fromGithub = false, // Set this to true when dynamically loading mdx from Github
}) => {
  const mdx = String(
    await compile(md, {
      outputFormat: 'function-body',
      baseUrl: import.meta.url,
      development: false,
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        smartypants,
        fromGithub
          ? remarkGithubImages
          : [
              remarkCopyLinkedFiles,
              {
                destinationDir: path.resolve(`../${site}/public/mdx`),
                sourceDir: path.resolve(`../../markdown/${site}/${slug}`),
                staticPath: '/mdx/',
              },
            ],
        remarkTocAsFrontmatter,
        remarkIntroAsFrontmatter,
      ],
      rehypePlugins: [
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

  /*
   * Pull frontmatter out of mdx content
   */
  const { frontmatter } = await run(mdx, runtime)

  return { mdx, frontmatter }
}
