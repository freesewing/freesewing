import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as dianaI18n } from '../i18n/index.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './front.mjs'
import { sleeve } from './sleeve.mjs'

// Create design
const Diana = new Design({
  data,
  parts: [front, back, sleeve],
})

// Merge translations
const i18n = mergeI18n([brianI18n, dianaI18n])

// Named exports
export { front, back, sleeve, Diana, i18n }
