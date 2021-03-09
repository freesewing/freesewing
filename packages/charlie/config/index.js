import { version } from '../package.json'

export default {
  name: 'charlie',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'unisex',
  type: 'block',
  difficulty: 2,
  tags: ['bottom', 'basics'],
  optionGroups: {
    fit: ['seatEase', 'kneeEase', 'waistEase'],
    style: ['waistHeight', 'lengthBonus', 'crotchDrop'],
    pockets: [
      {
        backPockets: [
          'backPocketHorizontalPlacement',
          'backPocketVerticalPlacement',
          'backPocketWidth',
          'backPocketDepth'
        ],
        frontPockets: ['frontPocketSlantDepth', 'frontPocketSlantWidth']
      }
    ],
    advanced: [
      'crossSeamCurveStart',
      'crossSeamCurveBend',
      'crotchSeamCurveStart',
      'crotchSeamCurveBend',
      'grainlinePosition',
      'legBalance',
      'waistBalance',
      {
        fly: ['flyCurve', 'flyLength', 'flyWidth']
      }
    ]
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
    'waistToUpperLeg'
  ],
  hide: ['titanBack', 'titanFront'],
  inject: {
    back: 'titanBack',
    front: 'titanFront'
  },
  options: {
    // Constants (from Titan)
    titanPaperless: true,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,

    // Lock titan options
    fitKnee: false,

    // Charlie constants
    waistbandReduction: 0.3, // See src/index.js

    // Fit (from Titan)
    waistEase: { pct: 3, min: 0, max: 10 },
    seatEase: { pct: 3, min: 0, max: 10 },
    kneeEase: { pct: 15, min: 1, max: 25 },

    // Style (from Titan)
    waistHeight: { pct: 0, min: 0, max: 25 },
    lengthBonus: { pct: 2, min: -20, max: 10 },
    crotchDrop: { pct: 2, min: 0, max: 15 },

    // Advanced (from Titan)
    legBalance: { pct: 57.5, min: 52.5, max: 62.5 },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100 },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85 },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95 },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100 },
    waistBalance: { pct: 60, min: 30, max: 90 },
    grainlinePosition: { pct: 45, min: 30, max: 60 },

    // Back pockets
    backPocketVerticalPlacement: { pct: 24, min: 18, max: 30 },
    backPocketHorizontalPlacement: { pct: 55, min: 48, max: 62 },
    backPocketWidth: { pct: 55, min: 10, max: 90 },
    backPocketDepth: { pct: 20, min: 10, max: 40 },

    // Back pockets
    frontPocketSlantDepth: { pct: 75, min: 50, max: 100 },
    frontPocketSlantWidth: { pct: 20, min: 10, max: 30 },

    // Belt
    waistbandWidth: { mm: 25, min: 5, max: 45 },

    // Advanced - Fly
    flyCurve: { pct: 66, min: 50, max: 100 },
    flyLength: { pct: 35, min: 0, max: 70 },
    flyWidth: { pct: 15, min: 10, max: 20 }

    // Pockets
  }
}
