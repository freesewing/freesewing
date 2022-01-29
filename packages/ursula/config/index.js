import pkg from '../package.json'

export default {
  name: 'ursula',
  version: pkg.version,
  design: 'Natalia Sayang',
  code: 'Natalia Sayang',
  department: 'underwear',
  type: 'pattern',
  difficulty: 1,
  tags: [
    'freesewing',
    'design',
    'diy',
    'fashion',
    'made to measure',
    'parametric design',
    'pattern',
    'sewing',
    'sewing pattern',
  ],
  optionGroups: {
    fit: ['fabricStretch', 'gussetWidth', 'gussetLength', 'elasticStretch'],
    style: ['rise', 'legOpening', 'frontDip', 'backDip', 'taperToGusset', 'backExposure'],
  },
  measurements: ['waist', 'seat', 'waistToSeat', 'waistToUpperLeg'], // Potentially useful: 'hips', 'waistToHips'
  dependencies: {
    back: 'front',
    gusset: 'back',
  },
  inject: {},
  hide: [],
  parts: ['front', 'back', 'gusset', 'elastic'],
  //Constants
  options: {
    backToFrontLength: 1.15, // Maybe include this in advanced options?
    backToFrontWidth: 1.1, // Maybe include this in advanced options?
    gussetRatio: 0.7, // Relationship between front and back gusset widths

    // Percentages
    gussetWidth: { pct: 7.2, min: 4, max: 12 }, // Gusset width in relation to seat
    gussetLength: { pct: 12.7, min: 10, max: 16 }, // Gusset length in relation to seat
    fabricStretch: { pct: 15, min: 5, max: 25 },
    rise: { pct: 46, min: 30, max: 100 },
    legOpening: { pct: 54, min: 5, max: 85 },
    frontDip: { pct: 5.0, min: -5, max: 15 },
    backDip: { pct: 2.5, min: -5, max: 15 },
    taperToGusset: { pct: 70, min: 5, max: 100 },
    backExposure: { pct: 20, min: -30, max: 90 },
    elasticStretch: { pct: 8, min: 5, max: 15 },
  },
}
