import { version } from '../package.json'
import { config as brianConfig } from '@freesewing/brian'

export default {
  name: '{{name}}',
  version,
  optionGroups: {
    ...brianConfig.optionGroups,
  },
  measurements: [
    ...brianConfig.measurements,
  ],
  dependencies: {
    brianSleevecap: 'brianFront',
  },
  inject: {
    brianBack: 'brianBase',
    brianFront: 'brianBack',
    brianSleeve: 'brianSleevecap',
    back: 'brianBack',
    front: 'brianFront',
    sleeve: 'brianSleeve',
  },
  hide: [
    'brianBase',
    'brianFront',
    'brianBack',
    'brianSleevecap',
    'brianSleeve',
    'sleevecap',
  ],
  parts: [],
  options: {
    ...brianConfig.options,
  },
}

