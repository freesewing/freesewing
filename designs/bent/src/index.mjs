import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { front, back, i18n as brianI18n } from '@freesewing/brian'
import { sleeve } from './sleeve.mjs'
import { topSleeve } from './topsleeve.mjs'
import { underSleeve } from './undersleeve.mjs'
import { i18n as bentI18n } from '../i18n/index.mjs'

// Create new design
const Bent = new Design({
  data,
  parts: [front, back, sleeve, topSleeve, underSleeve],
})

// Merge translations
const i18n = mergeI18n([brianI18n, bentI18n], {
  o: {
    keep: [...Object.keys(sleeve.options)],
  },
})

// Named exports
export { front, back, sleeve, topSleeve, underSleeve, Bent, i18n }
