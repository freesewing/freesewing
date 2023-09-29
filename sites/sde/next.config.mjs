import path from 'path'
import i18nConfig from './next-i18next.config.js'
// Remark plugins
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'

/*
 * This is the NextJS configuration
 */
const config = {
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['mjs'],
  i18n: i18nConfig.i18n,
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
          options: {
            providerImportSource: '@mdx-js/react',
            format: 'mdx',
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, smartypants],
          },
        },
      ],
    })

    // Fix for nextjs bug #17806
    config.module.rules.push({
      test: /index.mjs$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    })

    // Aliases
    config.resolve.alias.shared = path.resolve('./shared/')
    config.resolve.alias.config = path.resolve('./shared/config/')
    config.resolve.alias.pkgs = path.resolve('./pkgs/')
    config.resolve.alias.site = path.resolve(`./`)

    return config
  },
}

export default config
