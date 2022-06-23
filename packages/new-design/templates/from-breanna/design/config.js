import { version } from '../package.json'
import { config as breannaConfig } from '@freesewing/breanna'

export default {
  name: '{{name}}',
  version,
  optionGroups: {
    ...breannaConfig.optionGroups,
  },
  measurements: [
    ...breannaConfig.measurements,
  ],
  dependencies: {
  },
  inject: {
    breannaBack: 'breannaBase',
    breannaFrontBase: 'breannaBase',
    breannaFront: 'breannaFrontBase',
    breannaSleeve: 'breannaSleevecap',
    front: 'breannaFront',
    back: 'breannaBack',
    sleeve: 'breannaSleeve',
  },
  hide: [
    'breannaBase',
    'breannaBack',
    'breannaFrontBase',
    'breannaFront',
    'breannaSleevecap',
    'breannaSleeve',
  ],
  parts: [],
  options: {
    ...breannaConfig.options,
  },
}

