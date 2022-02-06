import pkg from '../package.json'

export default {
  name: 'walburga',
  version: pkg.version,
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
    fit: ['headRatio'],
    style: ['lengthBonus', 'widthBonus', 'length', 'neckoRatio', 'neckline'],
  },
  measurements: [
    'head',
    'neck',
    'shoulderToShoulder',
    'hpsToWaistBack',
    'waistToKnee',
    'waistToHips',
    'waistToFloor',
    'waistToUpperLeg',
  ],
  dependencies: { front: 'base', back: 'base' },
  inject: {
    front: 'base',
    back: 'base',
  },
  hide: ['base'],
  options: {
    headRatio: { pct: 100, min: 80, max: 120 },
    lengthBonus: { pct: 85, min: 60, max: 130 },
    widthBonus: { pct: 95, min: 50, max: 130 },
    length: {
      list: ['toKnee', 'toMidLeg', 'toFloor'],
      dflt: 'toKnee',
    },
    neckline: { bool: true },
    neckoRatio: { pct: 100, min: 10, max: 190 },
  },
}
