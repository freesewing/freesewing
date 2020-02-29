import { version } from '../package.json'

export default {
  name: 'fu',
  version: version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 1,
  tags: [],
  optionGroups: {
    fit: ['height', 'length', 'curve', 'shaping']
  },
  measurements: ['headCircumference'],
  parts: ['mask'],
  options: {
    length: { pct: 40, min: 30, max: 50 },
    height: { pct: 25, min: 20, max: 30 },
    curve: { pct: 6, min: 3, max: 9 },
    shaping: { pct: 50, min: 25, max: 75 }
  }
}
