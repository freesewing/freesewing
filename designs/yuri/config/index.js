import { version } from '../package.json'
import { config as brianConfig } from '@freesewing/brian'

const config = {
  version,
  name: 'yuri',
  design: 'Hellgy',
  code: 'Biou',
  department: 'tops',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    ...brianConfig.optionGroups,
    fit: [...brianConfig.optionGroups.fit, 'hipsEase'],
  },
  measurements: [...brianConfig.measurements, 'head', 'hips', 'hpsToBust'],
  optionalMeasurements: [ 'highBust' ],
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
    ...brianConfig.options,

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
