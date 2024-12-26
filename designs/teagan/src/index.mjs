import { Design, mergeI18n } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as teaganI18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'

// Setup our new design
const Teagan = new Design({
  data: about,
  parts: [back, front, sleeve],
})

// Merge translations
const i18n = mergeI18n([brianI18n, teaganI18n], {
  o: { drop: ['sleeveLengthBonus'] },
})

// Named exports
export { back, front, sleeve, Teagan, i18n, about }
