import { prebuildI18n } from './i18n.mjs'
import { config as newDesignConfig } from '../../../packages/new-design/lib/config.mjs'

prebuildI18n(
  process.env.SITE,
  process.env.SITE==='new-design/shared' ? newDesignConfig.i18n : false
)
