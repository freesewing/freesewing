// MDX compiler
import { compile } from '@mdx-js/mdx'
// Remark plugins from the ecosystem
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
// FreeSewing custom remark plugins
import { remarkGithubImages } from './remark-github-images.mjs'

/*
 * Compiles markdown/mdx to a function body
 */
export const compileMdx = async ({
  md, // A string holding the markdown
  site, // The site folder, one of 'org' or 'dev'
  slug, // The slug to the page below the folder (like 'guides/plugins')
}) => {
  const mdx = String(
    await compile(md, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        smartypants,
        [remarkGithubImages, { site, slug }],
      ],
    })
  )

  return mdx
}
