import pkg from '../package.json'
import { elastics } from '@freesewing/snapseries'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'titan',
  version: pkg.version,
  design: ['Debra Bean', 'Joost De Cock'],
  code: 'Joost De Cock',
  department: 'bottoms',
  type: 'block',
  difficulty: 3,
  optionGroups: {
    fit: ['seatEase', 'kneeEase', 'waistEase'],
    style: ['waistHeight', 'fitKnee', 'lengthBonus', 'crotchDrop'],
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
      'waistbandWidth',
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
  dependencies: {
    front: 'back',
  },
  options: {
    // Constants
    titanPaperless: true,
    fitCrossSeam: true,
    fitCrossSeamFront: true,
    fitCrossSeamBack: true,

    // Fit
    waistEase: { pct: 2, min: 0, max: 10 },
    seatEase: { pct: 2, min: 0, max: 10 },
    kneeEase: { pct: 6, min: 1, max: 25 },

    // Style
    waistHeight: { pct: 100, min: 0, max: 100 },
    lengthBonus: { pct: 2, min: -20, max: 10 },
    crotchDrop: { pct: 2, min: 0, max: 15 },
    fitKnee: { bool: false },

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
    waistbandWidth: { pct: 3, min: 1, max: 6, snap: elastics, ...pctBasedOn('waistToFloor') },
  },
}
