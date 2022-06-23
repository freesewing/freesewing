import path from 'path'
import i18nConfig from './next-i18next.config.js'

const config = {
  experimental: {
    externalDir: true,
  },
  i18n: i18nConfig.i18n,
  pageExtensions: [ 'js', 'mjs' ],
  webpack: (config, options) => {

    // Suppress warnings about importing version from package.json
    // We'll deal with it in v3 of FreeSewing
    config.ignoreWarnings = [
      /only default export is available soon/
    ]

    // Aliases
    config.resolve.alias.shared = path.resolve('./shared/')
    config.resolve.alias.site = path.resolve('./lab/')
    config.resolve.alias.design = path.resolve('./design/')

    return config
  }
}
export default config
