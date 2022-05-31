// MDX compiler
import { compile } from '@mdx-js/mdx'

// Remark plugins we want to use
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { remarkIntroPlugin } from './remark-intro-plugin.mjs'
import smartypants from 'remark-smartypants'
import mdxPluginToc from './mdx-plugin-toc.mjs'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
// Simple frontmatter extractor
import frontmatter from 'front-matter'
/*
 * Summary: Compiles the markdown it receives to MDX.
 *
 * @param (string) language - language to load (eg: 'en')
 * @param (string) site - site to load (either 'dev' or 'org')
 * @param (string) slug - slug of the page (eg: 'guides/patterns')
 *
 * @link https://mdxjs.com/guides/mdx-on-demand/
 *
 */
const mdxCompiler = async (md) => {

  const intro = []
  const mdx = String(
    await compile(md, {
      outputFormat: 'function-body',
      remarkPlugins: [
        remarkFrontmatter,
        remarkGfm,
        smartypants,
        [
          remarkIntroPlugin,
          { intro }
        ]
      ],
      rehypePlugins: [
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
        mdxPluginToc,
      ],
      rehypePlugins: [
        rehypeSlug,
      ],
    })
  )

  return { mdx, intro, toc, frontmatter: frontmatter(md)?.attributes }
}

export default mdxCompiler
