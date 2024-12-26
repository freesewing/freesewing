import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { base } from './base.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import about from '../about.json' with { type: 'json' }

/*
 * Let core bake a new design for us
 */
const Umbra = new Design({
  data: about,
  parts: [base, back, front],
})

/*
 * Named exports
 */
export { base, back, front, Umbra, i18n, about }
