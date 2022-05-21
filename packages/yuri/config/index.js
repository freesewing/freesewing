import pkg from '../package.json'
import Brian from '@freesewing/brian'

const config = {
  name: 'yuri',
  version: pkg.version,
  design: 'Hellgy',
  code: 'Biou',
  department: 'tops',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    ...Brian.config.optionGroups,
    fit: [
      ...Brian.config.optionGroups.fit,
      'hipsEase'
    ],
  },
  measurements: [
    ...Brian.config.measurements,
    'head',
    'hips',
    'hpsToBust',
  ],
  dependencies: {
    backBase: 'base',
    frontBase: 'backBase',
    sleevecap: 'frontBase',
    sleeveBase: 'sleevecap',
    back: 'backBase',
    front: 'frontBase',
    sleeve: 'sleeveBase',
    hoodCenter: 'hoodSide',
    hoodSide: ['front', 'back'],
    gusset: 'back',
  },
  inject: {
    backBase: 'base',
    frontBase: 'backBase',
    sleeveBase: 'sleevecap',
    back: 'backBase',
    front: 'frontBase',
    sleeve: 'sleeveBase',
  },
  hide: ['base', 'sleevecap', 'backBase', 'frontBase', 'sleeveBase'],
  parts: ['gusset', 'hoodSide', 'hoodCenter'],
  options: {
    ...Brian.config.options,

    // Brian overrides
    collarEase: { pct: 20, min: 10, max: 30 },
    cuffEase: { pct: 30, min: 20, max: 60 },
    lengthBonus: { pct: 10, min: 5, max: 15 },
    sleeveLengthBonus: { pct: 1, min: 0, max: 10 },

    // Yuri specific
    hipsEase: { pct: 0, min: 0, max: 10 },
  },
}

export default config
