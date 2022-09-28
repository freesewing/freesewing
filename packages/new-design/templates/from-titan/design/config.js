import pkg from '../package.json' assert { type: 'json' }
import { config as titanConfig } from '@freesewing/titan'

export default {
  name: '{{name}}',
  version: pkg.version,
  optionGroups: {
    ...titanConfig.optionGroups,
  },
  measurements: [...titanConfig.measurements],
  dependencies: {
    titanFront: 'titanBack',
  },
  inject: {
    front: 'titanFront',
    back: 'titanBack',
  },
  hide: ['titanFront', 'titanBack'],
  options: {
    ...titanConfig.options,
  },
}
