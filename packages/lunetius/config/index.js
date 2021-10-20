import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'lunetius',
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
    style: ['lengthRatio', 'widthRatio', 'length'],
  },
  measurements: [
    'waistToKnee',
    'waistToUpperLeg',
    'waistToFloor',
    'hpsToWaistBack',
    'neck',
    'shoulderToShoulder',
    'shoulderToElbow',
    'waistToHips',
  ],
  parts: ['lacerna'],
  options: {
    lengthRatio: { pct: 105, min: 60, max: 130 },
    widthRatio: { pct: 100, min: 50, max: 130 },
    length: {
      list: ['toKnee', 'toBelowKnee', 'toHips', 'toUpperLeg', 'toFloor'],
      dflt: 'toBelowKnee',
    },
  },
}
