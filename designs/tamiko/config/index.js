import { version } from '../package.json'

export default {
  version,
  name: 'tamiko',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 1,
  optionGroups: {
    fit: ['armholeDepthFactor', 'chestEase', 'draftForHighBust'],
    style: ['flare', 'lengthBonus', 'shoulderseamLength'],
  },
  measurements: ['shoulderToShoulder', 'chest', 'hpsToWaistBack', 'shoulderSlope', 'waistToHips'],
  optionalMeasurements: [ 'highBust' ],
  parts: ['top'],
  options: {
    armholeDepthFactor: { pct: 50, min: 40, max: 60 },
    chestEase: { pct: 2, min: 1, max: 20 },
    flare: { deg: 15, min: -10, max: 30 },
    lengthBonus: { pct: 13, min: 0, max: 60 },
    shoulderseamLength: { pct: 10, min: 5, max: 25 },

    // draft for high bust
    draftForHighBust: { bool: false },
  },
}
