import path from 'path'
import remarkGfm from 'remark-gfm'

const config = (site, remarkPlugins=[]) => ({
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  pageExtensions: [ 'js', 'md' ],
  webpack: (config, options) => {

		// Fixes npm packages that depend on node modules
    if (!options.isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.path = false
      config.resolve.fallback.child_process = false
    }

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
              ...remarkPlugins,
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

    // Aliases
    config.resolve.alias.shared = path.resolve('../freesewing.shared/')
    config.resolve.alias.site = path.resolve(`../freesewing.${site}/`)
    config.resolve.alias.markdown = path.resolve(`../../markdown/${site}/`)
    config.resolve.alias.pkgs = path.resolve(`../`)

    return config
  }
})

export default config
