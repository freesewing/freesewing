import { version } from '../package.json'

export default {
  name: 'hi',
  version: version,
  design: 'Wouter Van Wageningen',
  code: 'Wouter Van Wageningen',
  department: 'accessories',
  type: 'pattern',
  difficulty: 4,
  optionGroups: {
    style: ['size','nosePointiness','aggressive'],
  },
  measurements: ['neck'],
  parts: ['body','tail','aboveMouth','belly','topFin','bottomFin','mouth','lowerTeeth','upperTeeth'],
  dependencies: {
    tail: 'body',
    aboveMouth: ['body','mouth'],
    topFin: 'body',
    belly: ['body','aboveMouth'],
    bottomFin: ['body','belly','aboveMouth'],
    mouth: ['lowerTeeth', 'upperTeeth'],
  },
  inject: {},
  hide: [],
  options: {
    nosePointiness: {pct: 0, min: -5,max: +10},
    aggressive: {bool: false},
    size: {pct: 33, min: 5, max: 500 },
  },
}
