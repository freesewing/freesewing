import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as yuriI18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { gusset } from './gusset.mjs'
import { hoodSide } from './hoodside.mjs'
import { hoodCenter } from './hoodcenter.mjs'

// Setup our new design
const Yuri = new Design({
  data,
  parts: [back, front, sleeve, gusset, hoodSide, hoodCenter],
})

// Merge translations
const i18n = mergeI18n([brianI18n, yuriI18n])

// Named exports
// Named exports
export { back, front, sleeve, gusset, hoodSide, hoodCenter, Yuri, i18n }
