import path from 'path'
import { readdirSync } from 'fs'
import i18nConfig from './next-i18next.config.js'
import { designs, plugins, packages } from '../../config/software/index.mjs'
import { banner } from '../../scripts/banner.mjs'

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const pkgs = getDirectories(path.resolve(`../`))

let greeting = false

const config = {
  experimental: {
    externalDir: true,
  },
  i18n: i18nConfig.i18n,
  pageExtensions: [ 'js', 'mjs' ],
  webpack: (config, options) => {

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
    config.resolve.alias.lib = path.resolve('./lib')
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

    if (!greeting) {
      greeting = true
      console.log(banner)
    }

    return config
  }
}
export default config
