import { version } from '../package.json' assert { type: 'json' }
import { config as bentConfig } from '@freesewing/bent'

export default {
  name: '{{name}}',
  version,
  optionGroups: {
    ...bentConfig.optionGroups,
  },
  measurements: [
    ...bentConfig.measurements,
  ],
  inject: {
    bentBack: 'bentBase',
    bentFront: 'bentBack',
    bentTopSleeve: 'bentSleeve',
    bentUnderSleeve: 'bentSleeve',
    front: 'bentFront',
    back: 'bentBack',
    topSleeve: 'bentTopSleeve',
    underSleeve: 'bentUnderSleeve',
  },
  hide: [
    'bentBase',
    'bentFront',
    'bentBack',
    'bentSleeve',
    'bentTopSleeve',
    'bentUnderSleeve',
  ],
  options: {
    ...bentConfig.options,
  },
}

