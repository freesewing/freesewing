import { version } from './package.json'

export default {
  name: '{{name}}',
  version,
  design: '{{author}}',
  code: '{{author}}',
  department: '{{department}}',
  type: '{{type}}',
  difficulty: 3,
  tags: [ ],
  optionGroups: {
    fit: ['size'],
  },
  measurements: [],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['box'],
  options: {
    size: { pct: 50, min: 10, max: 100 },
  },
}
