import { version } from './package.json'

export default {
  name: 'octoplushy',
  version,
  design: '',
  code: '',
  department: '',
  type: '',
  difficulty: 2,
  tags: [ ],
  optionGroups: {
    options: ['size','type','legWidth','legLength','neckWidth','legTaper','bottomTopLegRatio','bottomLegReduction'],
  },
  measurements: [],
  dependencies: {
    legSection0: 'headSection0',
    legSection1: 'headSection1'},
  inject: {},
  hide: [],
  parts: ['headSection0','headSection1','legSection0','legSection1'],
  options: {
    sizeConstant: 200,

    size: { pct: 100, min: 5, max: 500 },
    type: { dflt: 'octoplushy', list: ['octoplushy','octopus','squid'] },
    legWidth: { pct: 15, min: 10, max: 30 },
    legLength: { pct: 200, min: 100, max: 500 },
    neckWidth: { pct: 25, min: 25, max: 45 },
    legTaper: { pct: 25, min: 0, max: 50 },
    bottomTopLegRatio: { pct: 87, min: 75, max: 100 },
    bottomLegReduction: { pct: 80, min: 75, max: 125 },

  },
}
