import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'holmes',
  version,
  design: 'Erica Alcusa Sáez',
  code: 'Erica Alcusa Sáez',
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  tags: ['hat'],
  optionGroups: {
    style: ['lengthRatio', 'goreNumber', 'brimAngle', 'brimWidth']
  },
  measurements: ['head'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['gore', 'brim', 'ear'],
  options: {
    lengthRatio: { pct: 55, min: 40, max: 60 },
    goreNumber: { count: 6, min: 4, max: 20 },
    brimAngle: { deg: 45, min: 10, max: 90 },
    brimWidth: { mm: 30, min: 5, max: 100 }
  }
}
