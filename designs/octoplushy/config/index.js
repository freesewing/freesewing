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
    options: ['size','type','legWidth','legLength','neckWidth','legTaper','bottomTopLegRatio','bottomLegReduction','bottomLegReductionPlushy'],
  },
  parts: ['headSection0', 'headSection1', 'legSection0', 'legSection1', 'eye0', 'eye1', 'eye2'],
  measurements: [],
  dependencies: {
    eye0: 'headSection0',
    eye1: 'headSection0',
    eye2: 'headSection0',
    legSection0: 'headSection0',
    legSection1: 'headSection1',
  },
  inject: {},
  hide: [],
  options: {
    sizeConstant: 200,
    size: { pct: 100, min: 5, max: 500 },
    type: { dflt: 'octoplushy', list: ['octoplushy', 'octopus', 'squid'] },
    legWidth: { pct: 15, min: 10, max: 30 },
    legLength: { pct: 200, min: 100, max: 500 },
    neckWidth: { pct: 25, min: 25, max: 45 },
    legTaper: { pct: 25, min: 0, max: 50 },
    bottomTopLegRatio: { pct: 87, min: 75, max: 100 },
    bottomLegReduction: {
      pct: 90,
      min: 75,
      max: 125,
      hide: ({ options }) => options.type == 'octoplushy',
    },
    bottomLegReductionPlushy: {
      pct: 80,
      min: 75,
      max: 125,
      hide: ({ options }) => options.type != 'octoplushy',
    },
  },
}
