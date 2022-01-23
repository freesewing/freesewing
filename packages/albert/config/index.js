import pkg from '../package.json'

export default {
  name: 'albert',
  version: pkg.version,
  design: 'Wouter Van Wageningen',
  code: 'Wouter Van Wageningen',
  department: 'accessories',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    fit: ['backOpening', 'chestDepth'],
    style: ['lengthBonus', 'bibLength', 'bibWidth', 'strapWidth'],
  },
  measurements: ['chest', 'waist', 'hips', 'hpsToWaistBack', 'waistToKnee'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['front', 'strap', 'pocket'],
  options: {
    backOpening: { pct: 10, min: 0, max: 25 },
    lengthBonus: { pct: 0, min: -20, max: 25 },
    chestDepth: { pct: 22, min: 15, max: 90 },
    bibLength: { pct: 75, min: 0, max: 90 },
    bibWidth: { pct: 100, min: 50, max: 125 },
    strapWidth: { pct: 60, min: 20, max: 100 },
  },
}
