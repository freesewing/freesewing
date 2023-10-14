import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as svenI18n } from '../i18n/index.mjs'
import { front, back } from './frontback.mjs'
import { sleeve } from './sleeve.mjs'
import { cuff } from './cuff.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Sven = new Design({
  data,
  parts: [front, back, sleeve, cuff, waistband],
})

// Merge translations
const i18n = mergeI18n([brianI18n, svenI18n])

// Named exports
export { front, back, sleeve, cuff, waistband, Sven, i18n }
