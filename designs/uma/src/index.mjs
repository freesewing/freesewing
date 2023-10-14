import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { base } from './base.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { gusset } from './gusset.mjs'

/*
 * Let core bake a new design for us
 */
const Uma = new Design({ data, parts: [base, back, front, gusset] })

/*
 * Named exports
 */
export {
  // Individual parts
  base,
  back,
  front,
  gusset,
  // The Uma design itself
  Uma,
  // Translations
  i18n,
}
