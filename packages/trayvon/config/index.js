import { version } from '../package.json'

export default {
  name: 'trayvon',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'accessories',
  type: 'pattern',
  difficulty: 2,
  tags: ['top', 'basics'],
  optionGroups: {
    style: ['tipWidth', 'knotWidth', 'lengthBonus']
  },
  measurements: ['hpsToWaistBack', 'waistToHips', 'neckCircumference'],
  parts: [
    'interfacingTip',
    'interfacingTail',
    'fabricTip',
    'fabricTail',
    'liningTip',
    'liningTail',
    'loop'
  ],
  options: {
    tipWidth: {
      mm: 60,
      min: 20,
      max: 120
    },
    knotWidth: {
      mm: 35,
      min: 20,
      max: 70
    },
    lengthBonus: {
      pct: 0,
      min: -50,
      max: 50
    }
  }
}
