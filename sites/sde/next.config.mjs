import configBuilder from '../shared/config/next.mjs'
import i18nConfig from './next-i18next.config.js'
import { banner } from '../../scripts/banner.mjs'

let config = configBuilder({ site: 'sde' })
config.i18n = i18nConfig.i18n

// Say hi
console.log(banner + '\n')

export default config
