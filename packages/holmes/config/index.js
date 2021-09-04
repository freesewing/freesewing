import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'holmes',
  version,
  design: 'Erica Alcusa Sáez',
  code: ['Erica Alcusa Sáez', 'bobgeorgethe3rd'],
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['headEase'],
    style: [
      'lengthRatio',
      'goreNumber',
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
    headEase: { mm: 19, min: 0, max: 50 },
    lengthRatio: { pct: 55, min: 40, max: 60 },
    goreNumber: { count: 6, min: 4, max: 20 },
    visorAngle: { deg: 45, min: 10, max: 90 },
    visorWidth: { mm: 30, min: 5, max: 100 },
    earLength: { pct: 100, min: 80, max: 150 },
    earWidth: { pct: 100, min: 80, max: 150 },
    visorLength: { pct: 100, min: 80, max: 150 },
    buttonhole: { bool: false },
  },
}
