import path from 'path'
import i18nConfig from './next-i18next.config.js'

const config = {
  i18n: i18nConfig.i18n,
  pageExtensions: ['mjs'],
  webpack: (config, options) => {
    // Aliases
    config.resolve.alias.shared = path.resolve('./shared/')
    config.resolve.alias.site = path.resolve('./lab/')
    config.resolve.alias.design = path.resolve('./design/')

    return config
  },
}
export default config
