import { version } from '../package.json'
import configHelpers from '@freesewing/config-helpers'
const { pctBasedOn } = configHelpers

export default {
  version,
  name: 'holmes',
  design: 'Erica Alcusa Sáez',
  code: ['Erica Alcusa Sáez', 'bobgeorgethe3rd'],
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['headEase'],
    style: [
      'lengthRatio',
      'gores',
      'visorAngle',
      'visorWidth',
      'earLength',
      'earWidth',
      'buttonhole',
    ],
    advanced: ['visorLength'],
  },
  measurements: ['head'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['gore', 'visor', 'ear'],
  options: {
    headEase: {
      pct: 3,
      min: 0,
      max: 9,
      snap: {
        metric: [6, 13, 19, 25, 32, 38, 44, 50],
        imperial: [6.35, 12.7, 19.05, 25.4, 31.75, 38.1, 44.45, 50.8],
      },
      toAbs: (pct, { measurements }) => measurements.head * pct,
    },
    lengthRatio: { pct: 55, min: 40, max: 60 },
    gores: { count: 6, min: 4, max: 20 },
    visorAngle: { deg: 45, min: 10, max: 90 },
    visorWidth: { pct: 5, min: 1, max: 17, snap: 5, ...pctBasedOn('head') },
    earLength: { pct: 100, min: 80, max: 150 },
    earWidth: { pct: 100, min: 80, max: 150 },
    visorLength: { pct: 100, min: 80, max: 150 },
    buttonhole: { bool: false },
  },
}
