import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as teaganI18n } from '@freesewing/teagan'
import { i18n as tinaI18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { sleeve as teaganSleeve } from '@freesewing/teagan'
import { frontBottom } from './frontBottom.mjs'

// Setup our new design
const Tina = new Design({
  data,
  parts: [back, front, frontBottom, teaganSleeve],
})

// Merge translations
const i18n = mergeI18n([brianI18n, teaganI18n, tinaI18n], {
  o: { drop: ['sleeveLengthBonus'] },
})

// Named exports
export { front, frontBottom, back, teaganSleeve, Tina, i18n }
