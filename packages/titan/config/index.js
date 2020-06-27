import { version } from '../package.json'

export default {
  name: 'titan',
  version,
  design: ['Debra Bean', 'Joost De Cock'],
  code: 'Joost De Cock',
  department: 'unisex',
  type: 'block',
  difficulty: 3,
  tags: ['bottom', 'basics'],
  optionGroups: {
    fit: ['seatEase', 'kneeEase', 'waistEase'],
    style: ['waistHeight', 'fitKnee', 'lengthBonus', 'crotchDrop'],
    advanced: [
      'crossSeamCurveStart',
      'crossSeamCurveBend',
      'crotchSeamCurveStart',
      'crotchSeamCurveBend',
      'grainlinePosition',
      'legBalance',
      'waistBalance'
    ]
  },
  measurements: [
    'backWaist',
    'crossSeam',
    'frontCrossSeam',
    'backSeat',
    'seatCircumference',
    'kneeCircumference',
    'waistCircumference',
    'waistToFloor',
    'waistToKnee',
    'waistToHips',
    'waistToSeat',
    'waistToUpperLeg'
  ],
  parts: ['back', 'front'],
  options: {
    // Constants
    fitCrossSeam: true,
    fitFrontCrossSeam: true,
    fitBackCrossSeam: true,

    // Fit
    waistEase: { pct: 2.5, min: 0, max: 10 },
    seatEase: { pct: 2.5, min: 0, max: 10 },
    kneeEase: { pct: 6, min: 1, max: 25 },

    // Style
    waistHeight: { pct: 100, min: 0, max: 100 },
    lengthBonus: { pct: 0, min: -20, max: 10 },
    crotchDrop: { pct: 2, min: 0, max: 15 },
    fitKnee: { bool: false },

    // Advanced
    legBalance: { pct: 57.5, min: 52.5, max: 62.5 },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100 },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85 },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95 },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100 },
    waistBalance: { pct: 60, min: 30, max: 90 },
    grainlinePosition: { pct: 45, min: 30, max: 60 }
  }
}
