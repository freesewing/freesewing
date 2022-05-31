import pkg from '../package.json'
import Brian from '@freesewing/brian'

export default {
  name: 'sven',
  version: pkg.version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: [...Brian.config.optionGroups.fit, 'hipsEase'],
    style: [...Brian.config.optionGroups.fit, 'ribbing', 'ribbingHeight'],
    advanced: [...Brian.config.optionGroups.advanced, 'ribbingStretch'],
  },
  measurements: [...Brian.config.measurements, 'hips', 'waist'],
  dependencies: {
    frontBase: 'base',
    backBase: 'base',
    front: 'frontBase',
    back: 'backBase',
    sleeve: ['sleeveBase', 'front', 'back'],
  },
  inject: {
    frontBase: 'base',
    backBase: 'base',
    front: 'frontBase',
    back: 'backBase',
    sleeve: 'sleeveBase',
  },
  parts: ['cuff', 'waistband'],
  hide: ['base', 'frontBase', 'backBase', 'sleeveBase'],
  options: {
    ...Brian.config.options,

    // Constants
    waistEase: 0.08,

    // Sven specific
    ribbing: { bool: true },
    collarEase: { pct: 10, min: 5, max: 30 },
    lengthBonus: { pct: 15, min: 0, max: 30 },
    sleeveLengthBonus: { pct: 3, min: 0, max: 10 },
    ribbingHeight: { pct: 8, min: 3, max: 15 },
    ribbingStretch: { pct: 15, min: 0, max: 30 },
    hipsEase: { pct: 8, min: -4, max: 20 },
  },
}
