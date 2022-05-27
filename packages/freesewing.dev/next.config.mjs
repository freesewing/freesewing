import configBuilder from '../freesewing.shared/config/next.mjs'
import i18nConfig from './next-i18next.config.js'

const config = configBuilder('dev')
config.i18n = i18nConfig.i18n

export default config
