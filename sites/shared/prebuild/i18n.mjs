import {build} from '../../../packages/i18n/src/prebuild.mjs'

export const prebuildI18n = async(site, only=false) => {
  build((loc) => site !== 'dev' || loc  === 'en', only)
}
