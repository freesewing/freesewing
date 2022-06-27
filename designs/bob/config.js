import { version } from './package.json'

export default {
  version,
  name: 'bob',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    fit: ['neckRatio', 'widthRatio', 'lengthRatio'],
    size: ['headSize'],
  },
  measurements: [],
  optionalMeasurements: ['head'],
  parts: ['bib'],
  options: {
    neckRatio: { pct: 80, min: 70, max: 90 },
    widthRatio: { pct: 45, min: 35, max: 55 },
    lengthRatio: { pct: 75, min: 55, max: 85 },
    headSize: { pct: 100, min: 10, max: 200, snap: 5 },
  },
}
