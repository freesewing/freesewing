import { version } from '../package.json'

export default {
  name: '{{name}}',
  version,
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

