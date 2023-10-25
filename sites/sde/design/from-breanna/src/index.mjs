import { Design, mergeI18n } from '@freesewing/core'
import { i18n as ourI18n } from '../i18n/index.mjs'
import { i18n as breannaI18n } from '@freesewing/breanna'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'

/*
 * Create the design
 */
const FromBreanna = new Design({
  data: {
    name: 'fromBreanna',
    version: '0.0.1',
  },
  parts: [back, front, sleeve],
})

/*
 * Merge translations
 */
const i18n = mergeI18n([breannaI18n, ourI18n])

export { back, front, sleeve, FromBreanna, i18n }
