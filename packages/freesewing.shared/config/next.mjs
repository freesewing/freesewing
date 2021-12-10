import remarkGfm from 'remark-gfm'
import remarkJargon from 'remark-jargon'
import { jargon } from '@freesewing/i18n'

const config = {
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  pageExtensions: [ 'js' ],
  webpack: (config, options) => {

		// Fixes npm packages that depend on node modules
    if (!options.isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
    }

    // Prevent symlink loops
    config.resolve.symlinks = false

    // MDX support
    config.module.rules.push({
      test: /\.md?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          //providerImportSource: '@mdx-js/react',
          options: {
            remarkPlugins: [
              remarkGfm,
              [remarkJargon, { jargon } ],
            ]
          }
        }
      ]
    })
    // Fix for nextjs bug #17806
    config.module.rules.push({
      test: /index.mjs$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false
      }
    })

    return config
  }
}

export default config
