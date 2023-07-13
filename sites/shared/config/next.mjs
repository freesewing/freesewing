import path from 'path'
import { designs, plugins } from '../../../config/software/index.mjs'
import { getMdxConfig } from './mdx.mjs'

/*
 * This method will return the NextJS configuration
 * Parameters:
 *
 * site: one of 'dev', 'org', or 'lab'
 * jaron: an object holding jargon for each supported language
 */
const config = ({ site, jargon = {} }) => {
  const mdxConfig = getMdxConfig({ site, jargon })

  return {
    experimental: {
      externalDir: true,
    },
    pageExtensions: ['mjs'],
    transpilePackages: ['react'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          pathname: '/images/**',
          port: '',
        },
      ],
    },
    webpack: (config, options) => {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        // splitChunks: {
        //   chunks: 'async',
        //   minSize: 20000,
        //   minRemainingSize: 0,
        //   minChunks: 1,
        //   maxAsyncRequests: 30,
        //   maxInitialRequests: 30,
        //   enforceSizeThreshold: 50000,
        //   cacheGroups: {
        //     defaultVendors: {
        //       test: /[\\/]node_modules[\\/]/,
        //       priority: -10,
        //       reuseExistingChunk: true,
        //     },
        //     default: {
        //       minChunks: 2,
        //       priority: -20,
        //       reuseExistingChunk: true,
        //     },
        //   },
        // },
      }
      // Fixes npm packages that depend on node modules
      if (!options.isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          child_process: false,
        }
      }

      // MDX support
      config.module.rules.push({
        test: /\.mdx?$/,
        include: path.resolve('../../markdown'),
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

      // // Suppress warnings about importing version from package.json
      // // We'll deal with it in v3 of FreeSewing
      // config.ignoreWarnings = [/only default export is available soon/]

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
      for (const pkg of ['core', 'i18n', 'models', 'snapseries', 'react-components']) {
        config.resolve.alias[`@freesewing/${pkg}`] = path.resolve(
          `../../packages/${pkg}/src/index.mjs`
        )
      }

      return config
    },
  }
}

export default config
