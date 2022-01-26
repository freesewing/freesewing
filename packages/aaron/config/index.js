import pkg from '../package.json'

export default (core) => ({
  name: 'aaron',
  version: pkg.version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    fit: ['chestEase', 'hipsEase', 'stretchFactor'],
    style: [
      'armholeDrop',
      'backlineBend',
      'necklineBend',
      'necklineDrop',
      'shoulderStrapWidth',
      'shoulderStrapPlacement',
      'lengthBonus',
    ],
  },
  measurements: [
    'biceps',
    'chest',
    'hpsToWaistBack',
    'waistToHips',
    'neck',
    'shoulderSlope',
    'shoulderToShoulder',
    'hips',
  ],
  dependencies: {
    front: 'base',
    back: 'front',
  },
  inject: {
    front: 'base',
    back: 'front',
  },
  hide: ['base'],
  options: {
    // Constants
    brianFitCollar: false,
    collarFactor: 4.8,
    acrossBackFactor: 0.97,
    backNeckCutout: 0.05,
    bicepsEase: 0.05,
    shoulderEase: 0,
    collarEase: 0,
    frontArmholeDeeper: 0,
    armholeDepthFactor: 0.6,
    shoulderSlopeReduction: 0,

    // Percentages
    armholeDrop: { pct: 10, min: 0, max: 75 },
    backlineBend: { pct: 50, min: 25, max: 100 },
    chestEase: { pct: 8, min: 0, max: 20, ...core.pctBasedOn('chest') },
    hipsEase: { pct: 8, min: 0, max: 20 },
    lengthBonus: { pct: 10, min: -20, max: 60 },
    necklineBend: { pct: 100, min: 40, max: 100 },
    necklineDrop: { pct: 20, min: 10, max: 35 },
    stretchFactor: { pct: 5, min: 0, max: 15 },
    shoulderStrapWidth: { pct: 15, min: 10, max: 40 },
    shoulderStrapPlacement: { pct: 40, min: 20, max: 80 },
  },
})
