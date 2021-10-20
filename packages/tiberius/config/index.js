import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'tiberius',
  version,
  design: 'Rika Tamaike',
  code: 'Rika Tamaike',
  department: 'tops',
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
    fit: ['headRatio', 'armholeDrop'],
    style: [
      'lengthBonus',
      'widthBonus',
      { clavi: ['clavi', 'clavusLocation', 'clavusWidth'] },
      'length',
      'width',
    ],
    advanced: ['forceWidth'],
  },
  measurements: [
    'head',
    'shoulderToElbow',
    'shoulderToShoulder',
    'biceps',
    'hpsToWaistBack',
    'waistToKnee',
    'waist',
    'chest',
    'seat',
    'hips',
    'waistToFloor',
    'waistToUpperLeg',
  ],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['tunica'],
  options: {
    headRatio: { pct: 100, min: 80, max: 120 },
    armholeDrop: { pct: 110, min: 100, max: 150 },
    lengthBonus: { pct: 90, min: 60, max: 130 },
    widthBonus: { pct: 100, min: 50, max: 130 },
    clavi: { bool: false },
    clavusLocation: { pct: 65, min: 50, max: 80 },
    clavusWidth: { pct: 100, min: 50, max: 150 },
    length: {
      list: ['toKnee', 'toMidLeg', 'toFloor'],
      dflt: 'toKnee',
    },
    width: {
      list: ['toElbow', 'toShoulder', 'toMidArm'],
      dflt: 'toMidArm',
    },
    // advanced
    forceWidth: { bool: false },
  },
}
