import pkg from '../package.json'
import { elastics } from '@freesewing/snapseries'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'shin',
  version: pkg.version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'swimwear',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    fit: ['bulge', 'backRise', 'legReduction', 'stretch'],
    style: ['rise', 'elasticWidth'],
  },
  measurements: ['hips', 'upperLeg', 'waistToUpperLeg', 'waistToHips'],
  dependencies: {
    front: 'back',
  },
  parts: ['back', 'front', 'waistband'],
  options: {
    // Constants
    frontFactor: 0.58,
    legFrontFactor: 0.48,
    gussetFactor: 0.0714,
    angle: 10,

    //elasticWidth: { mm: 35, min: 15, max: 60 },

    // Percentages
    elasticWidth: { pct: 10, min: 4, max: 20, snap: elastics, ...pctBasedOn('waistToUpperLeg') },
    stretch: { pct: 20, min: 10, max: 30 },
    bulge: { pct: 2.5, min: 0, max: 5 },
    legReduction: { pct: 5, min: 0, max: 10 },
    rise: { pct: 0, min: 0, max: 25 },
    backRise: { pct: 5, min: 0, max: 10 },
  },
}
