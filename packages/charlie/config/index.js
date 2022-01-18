import { version } from '../package.json'
import { elastics } from '@freesewing/snapseries'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'charlie',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'bottoms',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['seatEase', 'kneeEase', 'waistEase', 'waistbandCurve'],
    style: ['waistHeight', 'waistbandWidth', 'lengthBonus', 'crotchDrop'],
    pockets: [
      {
        backPockets: [
          'backPocketHorizontalPlacement',
          'backPocketVerticalPlacement',
          'backPocketWidth',
          'backPocketDepth',
        ],
        frontPockets: [
          'frontPocketSlantDepth',
          'frontPocketSlantWidth',
          'frontPocketSlantRound',
          'frontPocketSlantBend',
          'frontPocketWidth',
          'frontPocketDepth',
          'frontPocketFacing',
        ],
      },
    ],
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
      'beltLoops',
      {
        fly: ['flyCurve', 'flyLength', 'flyWidth'],
      },
    ],
  },
  measurements: [
    'crossSeam',
    'crossSeamFront',
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
  hide: ['titanBack', 'titanFront'],
  inject: {
    back: 'titanBack',
    front: 'titanFront',
    frontPocket: 'front',
    frontPocketFacing: 'frontPocket',
    backPocketFacing: 'backPocket',
    backPocketInterfacing: 'backPocket',
    backPocketJet: 'backPocketFacing',
    flyFacing: 'front',
    flyExtension: 'flyFacing',
  },
  parts: ['beltLoops'],
  dependencies: {
    // The inheritance makes this a bit messy
    titanFront: 'titanBack',
    back: ['titanBack', 'titanFront', 'front'],
    waistband: ['titanBack', 'titanFront', 'front', 'back'],
    waistbandCurved: ['titanBack', 'titanFront', 'front', 'back'],
  },
  options: {
    // Constants (from Titan)
    titanPaperless: true,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,
    // Lock titan options
    fitKnee: true,

    // Charlie constants
    waistbandReduction: 0.25, // See src/index.js
    waistbandFactor: 0.1,

    // Fit (Charlie)
    waistbandCurve: { pct: 0, min: 0, max: 35 },

    // Fit (from Titan)
    waistEase: { pct: 1, min: 0, max: 5 },
    seatEase: { pct: 5, min: 0, max: 10 },
    kneeEase: { pct: 15, min: 10, max: 30 },

    // Style (from Titan)
    waistHeight: { pct: -4, min: -15, max: 40 },
    waistbandWidth: { pct: 3, min: 1, max: 6, snap: elastics, ...pctBasedOn('waistToFloor') },
    //waistbandWidth: { pct: 3.5, min: 2, max: 5 },
    lengthBonus: { pct: 2, min: -20, max: 10 },
    crotchDrop: { pct: 2, min: 0, max: 15 },

    // Advanced (from Titan)
    legBalance: { pct: 57.5, min: 52.5, max: 62.5 },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100 },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85 },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 20 },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95 },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100 },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 35 },
    waistBalance: { pct: 55, min: 30, max: 90 },
    grainlinePosition: { pct: 50, min: 30, max: 60 },

    // Back pockets
    backPocketVerticalPlacement: { pct: 24, min: 18, max: 30 },
    backPocketHorizontalPlacement: { pct: 55, min: 48, max: 62 },
    backPocketWidth: { pct: 55, min: 50, max: 60 },
    backPocketDepth: { pct: 60, min: 40, max: 80 },
    backPocketFacing: { bool: true },

    // Front pockets
    frontPocketSlantDepth: { pct: 85, min: 70, max: 100 },
    frontPocketSlantWidth: { pct: 25, min: 15, max: 35 },
    frontPocketSlantRound: { pct: 30, min: 5, max: 50 },
    frontPocketSlantBend: { pct: 25, min: 5, max: 50 },
    frontPocketWidth: { pct: 55, min: 45, max: 65 },
    frontPocketDepth: { pct: 100, min: 85, max: 110 },
    frontPocketFacing: { pct: 45, min: 25, max: 65 },

    // Fly
    flyCurve: { pct: 72, min: 50, max: 100 },
    flyLength: { pct: 45, min: 30, max: 60 },
    flyWidth: { pct: 15, min: 10, max: 20 },

    // Waistband
    beltLoops: { count: 8, min: 6, max: 12 },
  },
}
