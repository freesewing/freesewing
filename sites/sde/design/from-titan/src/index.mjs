import { Design, mergeI18n } from '@freesewing/core'
import { i18n as ourI18n } from '../i18n/index.mjs'
import { i18n as titanI18n } from '@freesewing/titan'
import { back } from './back.mjs'
import { front } from './front.mjs'

/*
 * Create the design
 */
const FromTitan = new Design({
  data: {
    name: 'fromTitan',
    version: '0.0.1',
  },
  parts: [back, front],
})

/*
 * Merge translations
 */
const i18n = mergeI18n([titanI18n, ourI18n])

export { back, front, FromTitan, i18n }
