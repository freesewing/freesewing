import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as bibiI18n } from '@freesewing/bibi'
import { sleeve as bibiSleeve } from '@freesewing/bibi'
import { waistband as bibiWaistband } from '@freesewing/bibi'
import { armholeBinding as bibiArmholeBinding } from '@freesewing/bibi'
import { cuff as bibiCuff } from '@freesewing/bibi'
import { i18n as tinaI18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { frontBottom } from './frontBottom.mjs'
import { neckBinding } from './neckBinding.mjs'

// Setup our new design
const Tina = new Design({
  data,
  parts: [
    back,
    front,
    frontBottom,
    bibiSleeve,
    bibiWaistband,
    bibiArmholeBinding,
    bibiCuff,
    neckBinding,
  ],
})

// Merge translations
const i18n = mergeI18n([bibiI18n, tinaI18n], {
  o: { drop: ['sleeveLengthBonus'] },
})

// Named exports
export { front, frontBottom, back, neckBinding, Tina, i18n }
