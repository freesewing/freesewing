import { version } from '../package.json'
import { config as brianConfig } from '@freesewing/brian'

const config = {
  version,
  name: 'teagan',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    fit: ['chestEase', 'hipsEase', 'sleeveEase', 'draftForHighBust'],
    style: ['necklineWidth', 'necklineDepth', 'necklineBend', 'lengthBonus', 'sleeveLength'],
    advanced: brianConfig.optionGroups.advanced,
  },
  measurements: [...brianConfig.measurements, 'hips', 'waist'],
  optionalMeasurements: ['highBust'],
  dependencies: {
    front: 'base',
    back: 'front',
    sleevecap: 'back',
    sleeve: 'sleevecap',
  },
  inject: {
    front: 'base',
    back: 'front',
    sleeve: 'sleevecap',
  },
  hide: ['base', 'sleevecap'],
  options: {
    ...brianConfig.options,

    // Constants
    bicepsEase: 0.05,
    shoulderEase: 0,
    collarEase: 0,
    shoulderSlopeReduction: 0,
    sleeveWidthGuarantee: 0.85,
    frontArmholeDeeper: 0.005,

    // Brian overrides
    chestEase: { pct: 12, min: 5, max: 25 },
    sleeveLength: { pct: 30, min: 20, max: 100 },
    lengthBonus: { pct: 5, min: -20, max: 60 },
    backNeckCutout: { pct: 8, min: 4, max: 12 },

    // Teagan specific
    draftForHighBust: { bool: false },
    hipsEase: { pct: 18, min: 8, max: 30 },
    sleeveEase: { pct: 15, min: 5, max: 35 },
    necklineDepth: { pct: 25, min: 20, max: 40 },
    necklineWidth: { pct: 30, min: 10, max: 50 },
    necklineBend: { pct: 30, min: 0, max: 70 },
  },
}

export default config
