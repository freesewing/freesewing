import { version } from '../package.json'
import { config as bellaConfig } from '@freesewing/bella'

export default {
  name: '{{name}}',
  version,
  optionGroups: {
    ...bellaConfig.optionGroups,
  },
  measurements: [
    ...bellaConfig.measurements,
  ],
  dependencies: {
    bellaFrontSideDart: 'bellaBack',
  },
  inject: {
    back: 'bellaBack',
    front: 'bellaFrontSideDart'
  },
  hide: [
    'bellaBack',
    'bellaFrontSideDart',
  ],
  parts: [],
  options: {
    ...bellaConfig.options,
  },
}

