import pkg from '../package.json'

export default {
  name: 'tamiko',
  version: pkg.version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 1,
  optionGroups: {
    fit: ['armholeDepthFactor', 'chestEase'],
    style: ['flare', 'lengthBonus', 'shoulderseamLength'],
  },
  measurements: ['shoulderToShoulder', 'chest', 'hpsToWaistBack', 'shoulderSlope', 'waistToHips'],
  parts: ['top'],
  options: {
    armholeDepthFactor: { pct: 50, min: 40, max: 60 },
    chestEase: { pct: 2, min: 1, max: 20 },
    flare: { deg: 15, min: -10, max: 30 },
    lengthBonus: { pct: 13, min: 0, max: 60 },
    shoulderseamLength: { pct: 10, min: 5, max: 25 },
  },
}
