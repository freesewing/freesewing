import configBuilder from '../shared/config/next.mjs'
import i18nConfig from './next-i18next.config.js'
import { banner } from '../../scripts/banner.mjs'

const config = configBuilder('dev')
config.i18n = i18nConfig.i18n

// Say hi
console.log(banner+"\n")

// Suppress warnings about importing version from package.json
// We'll deal with it in v3 of FreeSewing
config.ignoreWarnings = [
  /only default export is available soon/
]



export default config
