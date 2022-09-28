import pkg from '../package.json' assert { type: 'json' }

export default {
  name: '{{name}}',
  version: pkg.version,
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
