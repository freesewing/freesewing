import path from 'path'
import { readdirSync } from 'fs'
import i18nConfig from './next-i18next.config.js'

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const pkgs = getDirectories(path.resolve(`../`))

const config = {
  experimental: {
    externalDir: true,
  },
  i18n: i18nConfig.i18n,
  pageExtensions: [ 'js' ],
  webpack: (config, options) => {
    // YAML support
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader'
    })

    // Aliases
    config.resolve.alias.shared = path.resolve('../freesewing.shared/')
    config.resolve.alias.site = path.resolve(`.`)
    //config.resolve.alias.markdown = path.resolve(`../../markdown/${site}/`)
    config.resolve.alias.pkgs = path.resolve(`../`)
    // This forces webpack to load the code from source, rather than compiled bundle
    for (const pkg of pkgs) {
      config.resolve.alias[`@freesewing/${pkg}$`] = path.resolve(`../${pkg}/src/index.js`)
    }

    return config
  }
}
export default config
