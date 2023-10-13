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
  site = false, // The site folder, one of 'org' or 'dev'
  slug = false, // The slug to the page below the folder (like 'guides/plugins')
}) => {
  const remarkPlugins = [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, smartypants]
  /*
   * This is also used for inline markdown (like what users provide)
   * in which case we do not need this plugin
   */
  if (site && slug) remarkPlugins.push([remarkGithubImages, { site, slug }])
  const mdx = String(
    await compile(md, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins,
    })
  )

  return mdx
}
