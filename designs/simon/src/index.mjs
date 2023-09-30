import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as simonI18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { frontRight } from './frontright.mjs'
import { frontLeft } from './frontleft.mjs'
import { buttonPlacket } from './buttonplacket.mjs'
import { buttonholePlacket } from './buttonholeplacket.mjs'
import { yoke } from './yoke.mjs'
import { sleeve } from './sleeve.mjs'
import { collarStand } from './collarstand.mjs'
import { collar } from './collar.mjs'
import { sleevePlacketUnderlap } from './sleeveplacket-underlap.mjs'
import { sleevePlacketOverlap } from './sleeveplacket-overlap.mjs'
import { cuff } from './cuff.mjs'
/* Re-export skeleton part */
import { front } from './front.mjs'

// Setup our new design
const Simon = new Design({
  data,
  parts: [
    back,
    buttonholePlacket,
    buttonPlacket,
    collar,
    collarStand,
    cuff,
    front,
    frontRight,
    frontLeft,
    sleeve,
    sleevePlacketOverlap,
    sleevePlacketUnderlap,
    yoke,
  ],
})

// Merge translations
const i18n = mergeI18n([brianI18n, simonI18n])

// Named exports
export {
  back,
  buttonholePlacket,
  buttonPlacket,
  collar,
  collarStand,
  cuff,
  front,
  frontRight,
  frontLeft,
  sleeve,
  sleevePlacketOverlap,
  sleevePlacketUnderlap,
  yoke,
  Simon,
  i18n,
}
