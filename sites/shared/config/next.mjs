import path from 'path'
import remarkGfm from 'remark-gfm'
import { designs, plugins } from '../../../config/software/index.mjs'

/*
 * This mehthod will return the NextJS configuration
 * Parameters:
 *
 * site: one of 'dev', 'org', or 'lab'
 * remarkPlugins: Array of remark plugins to load
 * srcPkgs: Array of folders in the monorepo/packages that should be aliased
 * so they are loaded from source, rather than from a compiled bundle
 */
const config = (site, remarkPlugins=[]) => ({
  experimental: {
    externalDir: true,
  },
  pageExtensions: [ 'js', 'md', 'mjs' ],
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

    // YAML support
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader'
    })

    // Fix for nextjs bug #17806
    config.module.rules.push({
      test: /index.mjs$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false
      }
    })

    // Suppress warnings about importing version from package.json
    // We'll deal with it in v3 of FreeSewing
    config.ignoreWarnings = [
      /only default export is available soon/
    ]

    // Aliases
    config.resolve.alias.shared = path.resolve('../shared/')
    config.resolve.alias.site = path.resolve(`../${site}/`)
    config.resolve.alias.markdown = path.resolve(`../../markdown/${site}/`)
    config.resolve.alias.config = path.resolve('../../config/')
    config.resolve.alias.designs = path.resolve('../../designs/')
    config.resolve.alias.plugins = path.resolve('../../plugins/')
    config.resolve.alias.pkgs = path.resolve('../../packages/')

    // Load designs from source, rather than compiled package
    for (const design in designs) {
      config.resolve.alias[`@freesewing/${design}$`] = path.resolve(`../../designs/${design}/src/index.js`)
    }
    // Load plugins from source, rather than compiled package
    for (const plugin in plugins) {
      config.resolve.alias[`@freesewing/${plugin}$`] = path.resolve(`../../plugins/${plugin}/src/index.js`)
    }
    // Load these from source, rather than compiled package
    for (const pkg of ['core', 'config-helpers', 'i18n', 'models']) {
      config.resolve.alias[`@freesewing/${pkg}$`] = path.resolve(`../../packages/${pkg}/src/index.js`)
    }

    return config
  }
})

export default config
