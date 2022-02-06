import pkg from '../package.json'
import { smallsteps } from '@freesewing/snapseries'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'trayvon',
  version: pkg.version,
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
