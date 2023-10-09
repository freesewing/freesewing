import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as simonI18n } from '@freesewing/simon'
import { i18n as simoneI18n } from '../i18n/index.mjs'
import {
  // We use these as-is from simon
  back,
  collar,
  collarStand,
  cuff,
  sleeve,
  sleevePlacketOverlap,
  sleevePlacketUnderlap,
  yoke,
  // We'll update these to use simone's front as dependency
  buttonholePlacket as simonButtonholePlacket,
  buttonPlacket as simonButtonPlacket,
  frontRight as simonFrontRight,
  frontLeft as simonFrontLeft,
} from '@freesewing/simon'
// Re-export skeleton parts so peope can re-use them
import { fbaFront } from './fba-front.mjs'

// Update these to use simone's front as dependency
const buttonholePlacket = {
  ...simonButtonholePlacket,
  from: fbaFront,
}
const buttonPlacket = {
  ...simonButtonPlacket,
  from: fbaFront,
}
const frontRight = {
  ...simonFrontRight,
  from: fbaFront,
}
const frontLeft = {
  ...simonFrontLeft,
  from: fbaFront,
}

// Setup our new design
const Simone = new Design({
  data,
  parts: [
    fbaFront,
    back,
    collar,
    collarStand,
    cuff,
    sleeve,
    sleevePlacketOverlap,
    sleevePlacketUnderlap,
    yoke,
    buttonholePlacket,
    buttonPlacket,
    frontRight,
    frontLeft,
  ],
})

// Merge translations
const i18n = mergeI18n([simonI18n, simoneI18n])

// Export all parts to facilitate extending this pattern
export {
  fbaFront,
  back,
  collar,
  collarStand,
  cuff,
  sleeve,
  sleevePlacketOverlap,
  sleevePlacketUnderlap,
  yoke,
  buttonholePlacket,
  buttonPlacket,
  frontRight,
  frontLeft,
  Simone,
  i18n,
}
