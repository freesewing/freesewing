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
    style: ['size','hungry','nosePointiness','aggressive'],
  },
  measurements: [],
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
    size: {pct: 100, min: 5, max: 500 },
    hungry: {pct: 50, min: 0, max: 100 },
    nosePointiness: {pct: 0, min: -5,max: +10},
    aggressive: {bool: false},
  },
}
