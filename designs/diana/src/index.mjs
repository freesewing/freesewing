import { Design, mergeI18n } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as dianaI18n } from '../i18n/index.mjs'
// Parts
import { front, back } from './front.mjs'
import { sleeve } from './sleeve.mjs'

// Create design
const Diana = new Design({
  data: about,
  parts: [front, back, sleeve],
})

// Merge translations
const i18n = mergeI18n([brianI18n, dianaI18n])

// Named exports
export { front, back, sleeve, Diana, i18n, about }
