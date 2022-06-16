import { version } from '../package.json'

export default {
  version,
  name: 'florent',
  design: 'Quentin Felix',
  code: ['Quentin Felix', 'Joost De Cock'],
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['headEase'],
  },
  measurements: ['head'],
  dependencies: {
    side: 'top',
    brimTop: 'brimBottom',
    brimInterfacing: 'brimBottom',
  },
  inject: {
    side: 'top',
    brimTop: 'brimBottom',
    brimInterfacing: 'brimBottom',
  },
  options: {
    // Constants
    topSide: 0.8,
    brim: 0,
    // Percentages
    headEase: { pct: 2, min: 0, max: 5 },
  },
}
