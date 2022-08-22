import { version } from '../package.json'

export default {
  name: 'octoplushy',
  version: version,
  design: 'Wouter Van Wageningen',
  code: 'Wouter Van Wageningen',
  department: 'accessories',
  type: 'pattern',
  difficulty: 5,
  optionGroups: {
    options: ['size','type','armWidth','armLength','neckWidth','armTaper','bottomTopArmRatio','bottomArmReduction','bottomArmReductionPlushy'],
  },
  parts: ['headSection0', 'headSection1', 'armSection0', 'armSection1', 'eye0', 'eye1', 'eye2'],
  measurements: [],
  dependencies: {
    eye0: 'headSection0',
    eye1: 'headSection0',
    eye2: 'headSection0',
    armSection0: 'headSection0',
    armSection1: 'headSection1',
  },
  inject: {},
  hide: [],
  options: {
    sizeConstant: 200,
    size: { pct: 100, min: 5, max: 500 },
    type: { dflt: 'octoplushy', list: ['octoplushy', 'octopus', 'squid'] },
    armWidth: { pct: 15, min: 10, max: 30 },
    armLength: { pct: 200, min: 100, max: 500 },
    neckWidth: { pct: 25, min: 25, max: 45 },
    armTaper: { pct: 25, min: 0, max: 50 },
    bottomTopArmRatio: { pct: 87, min: 75, max: 100 },
    bottomArmReduction: {
      pct: 90,
      min: 75,
      max: 125,
      hide: ({ options }) => options.type == 'octoplushy',
    },
    bottomArmReductionPlushy: {
      pct: 80,
      min: 75,
      max: 125,
      hide: ({ options }) => options.type != 'octoplushy',
    },
  },
}
