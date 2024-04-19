import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as bibiI18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
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
} from './shared.mjs'

// Setup our new design
const Bibi = new Design({
  data,
  parts: [sleeve, back, front],
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
  Bibi,
  i18n,
}
