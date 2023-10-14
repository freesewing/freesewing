import { Design, mergeI18n } from '@freesewing/core'
import { i18n as ourI18n } from '../i18n/index.mjs'
import { i18n as bellaI18n } from '@freesewing/bella'
import { back } from './back.mjs'
import { front } from './front.mjs'

/*
 * Create the design
 */
const FromBella = new Design({
  data: {
    name: 'fromBella',
    version: '0.0.1',
  },
  parts: [back, front],
})

/*
 * Merge translations
 */
const i18n = mergeI18n([bellaI18n, ourI18n])

export { back, front, FromBella, i18n }
