import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as bibiI18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { waistband } from './waistband.mjs'
import { cuff } from './cuff.mjs'
import { armholeBinding } from './armholeBinding.mjs'
import { neckBinding } from './neckBinding.mjs'
import { sleeve } from './sleeve.mjs'
import {
  constructFrontPoints,
  constructBackPoints,
  calculateFba,
  correctArmHole,
  constructSideSeam,
  adjustSidePoints,
  constructBackHem,
  constructFrontHem,
  createArmHoles,
  plotSideLineMeasurements,
  draftRibbing,
  draftKnitBinding,
} from './shared.mjs'

// Setup our new design
const Bibi = new Design({
  data,
  parts: [waistband, cuff, armholeBinding, neckBinding, sleeve, back, front],
})

// Merge translations
const i18n = mergeI18n([brianI18n, bibiI18n], {
  o: { drop: ['sleeveLengthBonus'] },
})

// Named exports
export {
  front,
  back,
  sleeve,
  waistband,
  neckBinding,
  armholeBinding,
  cuff,
  constructFrontPoints,
  constructBackPoints,
  calculateFba,
  correctArmHole,
  constructSideSeam,
  adjustSidePoints,
  constructBackHem,
  constructFrontHem,
  createArmHoles,
  plotSideLineMeasurements,
  draftRibbing,
  draftKnitBinding,
  Bibi,
  i18n,
}
