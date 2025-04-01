import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { base } from './base.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { gusset } from './gusset.mjs'

/*
 * Let core bake a new design for us
 */
const Uma = new Design({
  data: about,
  parts: [base, back, front, gusset],
})

/*
 * Named exports
 */
export { base, back, front, gusset, Uma, i18n, about }
