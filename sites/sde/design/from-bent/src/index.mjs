import { Design, mergeI18n } from '@freesewing/core'
import { i18n as ourI18n } from '../i18n/index.mjs'
import { i18n as bentI18n } from '@freesewing/bent'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { topSleeve } from './top-sleeve.mjs'
import { underSleeve } from './under-sleeve.mjs'

/*
 * Create the design
 */
const FromBent = new Design({
  data: {
    name: 'fromBent',
    version: '0.0.1',
  },
  parts: [back, front, topSleeve, underSleeve],
})

/*
 * Merge translations
 */
const i18n = mergeI18n([bentI18n, ourI18n])

export { back, front, topSleeve, underSleeve, FromBent, i18n }
