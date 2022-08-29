import path from 'path'
import i18nConfig from './next-i18next.config.js'
import { designs } from './prebuild/designs.mjs'
import { plugins } from './prebuild/plugins.mjs'
import { banner } from '../../scripts/banner.mjs'

let greeting = false

const config = {
  experimental: {
    externalDir: true,
  },
  i18n: i18nConfig.i18n,
  pageExtensions: [ 'js', 'mjs' ],
  webpack: (config, options) => {

    // JSON support
    //config.module.rules.push({
    //  test: /\.json$/,
    //  type: 'json',
    //  use: 'json-loader'
    //})

    // YAML support
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader'
    })

    // Suppress warnings about importing version from package.json
    // We'll deal with it in v3 of FreeSewing
    config.ignoreWarnings = [
      /only default export is available soon/
    ]

    // Aliases
    config.resolve.alias.shared = path.resolve('../shared/')
    config.resolve.alias.site = path.resolve('.')
    config.resolve.alias.prebuild = path.resolve('./prebuild')
    config.resolve.alias.config = path.resolve('../../config/')
    config.resolve.alias.designs = path.resolve('../../designs/')
    config.resolve.alias.plugins = path.resolve('../../plugins/')
    config.resolve.alias.pkgs = path.resolve('../../packages/')

    // Load designs from source, rather than compiled package
    for (const design in designs) {
      config.resolve.alias[`@freesewing/${design}$`] = path.resolve(`../../designs/${design}/src/index.mjs`)
    }
    // Load plugins from source, rather than compiled package
    for (const plugin in plugins) {
      config.resolve.alias[`@freesewing/${plugin}$`] = path.resolve(`../../plugins/${plugin}/src/index.mjs`)
    }
    // Load these from source, rather than compiled package
    for (const pkg of ['core', 'i18n', 'models']) {
      config.resolve.alias[`@freesewing/${pkg}$`] = path.resolve(`../../packages/${pkg}/src/index.mjs`)
    }

    if (!greeting) {
      greeting = true
      console.log(banner)
    }

    return config
  }
}
export default config
