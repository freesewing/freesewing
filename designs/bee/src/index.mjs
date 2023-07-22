import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { cup } from './cup.mjs'
import { neckTie } from './neck-tie.mjs'
import { bandTie } from './band-tie.mjs'
import { i18n as beeI18n } from '../i18n/index.mjs'
import { i18n as bellaI18n } from '@freesewing/bella'

const Bee = new Design({
  data,
  parts: [cup, neckTie, bandTie],
})

// Merge translations
const i18n = mergeI18n([bellaI18n, beeI18n], {
  o: {
    keep: [
      ...Object.keys(cup.options),
      ...Object.keys(neckTie.options),
      ...Object.keys(bandTie.options),
      'bustDartCurve',
      'bustSpanEase',
      'chestEase',
      'fullChestEaseReduction',
      'shoulderToShoulderEase',
      'waistEase',
      'backDartHeight',
      'bustDartLength',
      'waistDartLength',
      'armholeDepth',
      'backArmholeCurvature',
      'backArmholePitchDepth',
      'backArmholeSlant',
      'frontArmholeCurvature',
      'frontArmholePitchDepth',
      'backHemSlope',
      'backNeckCutout',
      'frontShoulderWidth',
      'highBustWidth',
    ],
  },
})

export { cup, neckTie, bandTie, Bee, i18n }
