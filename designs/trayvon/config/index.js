import { version } from '../package.json'
import configHelpers from '@freesewing/config-helpers'
const { smallsteps, pctBasedOn } = configHelpers

export default {
  version,
  name: 'trayvon',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 2,
  optionGroups: {
    style: ['tipWidth', 'knotWidth', 'lengthBonus'],
  },
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  parts: [
    'interfacingTip',
    'interfacingTail',
    'fabricTip',
    'fabricTail',
    'liningTip',
    'liningTail',
    'loop',
  ],
  options: {
    tipWidth: { pct: 15, min: 5, max: 35, snap: smallsteps, ...pctBasedOn('neck') },
    knotWidth: { pct: 8, min: 4, max: 12, snap: smallsteps, ...pctBasedOn('neck') },
    lengthBonus: {
      pct: 0,
      min: -50,
      max: 50,
    },
  },
}
