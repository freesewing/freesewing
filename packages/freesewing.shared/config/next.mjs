import path from 'path'
import { readdirSync } from 'fs'
import remarkGfm from 'remark-gfm'

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
const pkgs = getDirectories(path.resolve(`../`))

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

    // YAML support
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
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

    // Aliases
    config.resolve.alias.shared = path.resolve('../freesewing.shared/')
    config.resolve.alias.site = path.resolve(`../freesewing.${site}/`)
    config.resolve.alias.markdown = path.resolve(`../../markdown/${site}/`)
    config.resolve.alias.pkgs = path.resolve(`../`)
    // This forces webpack to load the code from source, rather than compiled bundle
    for (const pkg of pkgs) {
      config.resolve.alias[`@freesewing/${pkg}$`] = path.resolve(`../${pkg}/src/index.js`)
    }

    return config
  }
})

export default config
