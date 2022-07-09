import { version } from '../package.json'
import { config as brianConfig } from '@freesewing/brian'

export default {
  version,
  name: 'sven',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: [...brianConfig.optionGroups.fit, 'hipsEase'],
    style: [...brianConfig.optionGroups.fit, 'ribbing', 'ribbingHeight'],
    advanced: [...brianConfig.optionGroups.advanced, 'ribbingStretch'],
  },
  measurements: [...brianConfig.measurements, 'hips', 'waist'],
  optionalMeasurements: brianConfig.optionalMeasurements,
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
    ...brianConfig.options,

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
