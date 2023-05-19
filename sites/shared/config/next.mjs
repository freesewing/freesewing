import path from 'path'
import { designs, plugins } from '../../../config/software/index.mjs'
// Remark plugins we want to use
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkCopyLinkedFiles from 'remark-copy-linked-files'
//import { remarkIntroPlugin } from './remark-intro-plugin.mjs'
//import mdxPluginToc from './mdx-plugin-toc.mjs'
import smartypants from 'remark-smartypants'
// Rehype plugins we want to use
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeJargon from '../../../packages/rehype-jargon/src/index.mjs'
import rehypeHighlightLines from '../../../packages/rehype-highlight-lines/src/index.mjs'
// Webpack MDX loadder for NextJS
//import mdxLoader from '@next/mdx'

const jargonTransform = (term, html) => `<details class="inline jargon-details">
  <summary class="jargon-term">
    ${term}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 jargon-close" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </summary>
  <div class="jargon-info">
  ${html}</div></details>`

const getMdxConfig = ({ site, jargon }) => ({
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
          //sourceDir: path.resolve(`../../markdown/${site}/${slug}`),
          staticPath: '/mdx/',
        },
      ],
      //[remarkIntroPlugin, { intro }],
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

/*
 * This mehthod will return the NextJS configuration
 * Parameters:
 *
 * site: one of 'dev', 'org', or 'lab'
 * jaron: an object holding jargon for each supported language
 */
const config = ({ site, jargon = {} }) => {
  const mdxConfig = getMdxConfig({ site, jargon })
  //const withMdx = mdxLoader(mdxConfig)

  return {
    experimental: {
      externalDir: true,
    },
    pageExtensions: ['mjs'],
    webpack: (config, options) => {
      // Fixes npm packages that depend on node modules
      if (!options.isServer) {
        config.resolve.fallback.fs = false
        config.resolve.fallback.path = false
        config.resolve.fallback.child_process = false
      }

      // MDX support
      config.module.rules.push({
        test: /\.mdx?$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            //providerImportSource: '@mdx-js/react',
            options: mdxConfig.options,
            //  mdxConfig.
            //  remarkPlugins: [remarkGfm, ...remarkPlugins],
            //},
          },
        ],
      })

      // YAML support
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'yaml-loader',
      })

      // Fix for nextjs bug #17806
      config.module.rules.push({
        test: /index.mjs$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      })

      // Suppress warnings about importing version from package.json
      // We'll deal with it in v3 of FreeSewing
      config.ignoreWarnings = [/only default export is available soon/]

      // Aliases
      config.resolve.alias.shared = path.resolve('../shared/')
      config.resolve.alias.site = path.resolve(`../${site}/`)
      config.resolve.alias.markdown = path.resolve(`../../markdown/${site}/`)
      config.resolve.alias.orgmarkdown = path.resolve(`../../markdown/org/`)
      config.resolve.alias.devmarkdown = path.resolve(`../../markdown/dev}/`)
      config.resolve.alias.config = path.resolve('../../config/')
      config.resolve.alias.designs = path.resolve('../../designs/')
      config.resolve.alias.plugins = path.resolve('../../plugins/')
      config.resolve.alias.pkgs = path.resolve('../../packages/')
      config.resolve.alias.root = path.resolve('../../')

      // Load designs from source, rather than compiled package
      for (const design in designs) {
        config.resolve.alias[`@freesewing/${design}`] = path.resolve(
          `../../designs/${design}/src/index.mjs`
        )
      }
      // Load plugins from source, rather than compiled package
      for (const plugin in plugins) {
        config.resolve.alias[`@freesewing/${plugin}`] = path.resolve(
          `../../plugins/${plugin}/src/index.mjs`
        )
      }
      // Load these from source, rather than compiled package
      for (const pkg of ['core', 'i18n', 'models', 'snapseries']) {
        config.resolve.alias[`@freesewing/${pkg}`] = path.resolve(
          `../../packages/${pkg}/src/index.mjs`
        )
      }

      return config
    },
  }
}

export default config
