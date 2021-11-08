import { version } from '../package.json'
import { elastics, smallsteps } from '@freesewing/snapseries'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'paco',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'bottoms',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['seatEase', 'waistEase', 'heelEase'],
    style: ['waistHeight', 'lengthBonus', 'crotchDrop', 'elasticatedHem'],
    elastic: ['waistbandWidth', 'ankleElastic'],
    pockets: ['frontPockets', 'backPockets'],
    advanced: [
      'crossSeamCurveStart',
      'crossSeamCurveBend',
      'crossSeamCurveAngle',
      'crotchSeamCurveStart',
      'crotchSeamCurveBend',
      'crotchSeamCurveAngle',
      'grainlinePosition',
      'legBalance',
      'waistBalance',
    ],
  },
  measurements: [
    'crossSeam',
    'crossSeamFront',
    'heel',
    'knee',
    'seat',
    'seatBack',
    'waist',
    'waistBack',
    'waistToFloor',
    'waistToKnee',
    'waistToHips',
    'waistToSeat',
    'waistToUpperLeg',
  ],
  parts: [
    'back',
    'front',
    'waistband',
    'cuff',
    'pocketBagFront',
    'pocketBagBack',
    'pocketWelt',
    'pocketWeltInterfacing',
  ],
  inject: {
    back: 'titanBack',
    front: 'titanFront',
    pocketBagFront: 'front',
    pocketBagBack: 'back',
    pocketWelt: 'pocketBagBack',
    pocketWeltInterfacing: 'pocketWelt',
  },
  dependencies: {
    front: 'back',
    pocketBagFront: 'front',
    pocketBagBack: 'back',
    pocketWelt: 'pocketBagBack',
    pocketWeltInterfacing: 'pocketWelt',
  },
  hide: ['titanBack', 'titanFront'],
  options: {
    // Constants
    titanPaperless: false,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    kneeEase: 0.06,
    fitKnee: false,
    frontPocketHeelRatio: 0.4,
    backPocketWaistRatio: 0.4,
    backPocketHeightRatio: 0.4,
    backPocketWidthRatio: 0.37,
    weltFactor: 0.15,

    // Disable this option from Titan
    waistbandHeight: 0,

    // Fit
    waistEase: { pct: 2, min: 0, max: 10 },
    seatEase: { pct: 5, min: 0, max: 15 },

    // Style
    waistHeight: { pct: 5, min: 0, max: 100 },
    lengthBonus: { pct: 0, min: -15, max: 10 },
    crotchDrop: { pct: 2, min: 0, max: 10 },
    elasticatedHem: { bool: true },

    // Elastic
    waistbandWidth: { pct: 3, min: 1, max: 6, snap: elastics, ...pctBasedOn('waistToFloor') },
    ankleElastic: { pct: 5, min: 1, max: 13, snap: elastics, ...pctBasedOn('waistToFloor') },
    heelEase: { pct: 5, min: 0, max: 50 },

    // Pockets
    frontPockets: { bool: true },
    backPockets: { bool: false },
    // Not exposed to the user
    frontPocketFlapSize: { pct: 3, min: 3, max: 3, snap: smallsteps, ...pctBasedOn('waist') },

    // Advanced
    legBalance: { pct: 57.5, min: 52.5, max: 62.5 },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100 },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85 },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 20 },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95 },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100 },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 35 },
    waistBalance: { pct: 60, min: 30, max: 90 },
    grainlinePosition: { pct: 45, min: 30, max: 60 },
  },
}
