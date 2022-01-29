import pkg from '../package.json'

export default {
  name: 'benjamin',
  version: pkg.version,
  design: 'Wouter Van Wageningen',
  code: 'Wouter Van Wageningen',
  department: 'accessories',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['collarEase', 'adjustmentRibbon'],
    style: ['tipWidth', 'knotWidth', 'bowLength', 'bowStyle', 'endStyle', 'ribbonWidth'],
  },
  measurements: ['neck'],
  dependencies: {
    ribbon: 'base',
  },
  inject: {
    bow1: 'base',
    bow2: 'base',
    bow3: 'base',
  },
  hide: ['base'],
  parts: ['ribbon'],
  options: {
    transitionLength: 2, //Twice the knot
    bandLength: 0.17,
    ribbonWidth: {
      pct: 6,
      min: 5,
      max: 8,
    },
    tipWidth: {
      pct: 15,
      min: 0,
      max: 20,
    },
    knotWidth: {
      pct: 7,
      min: 5,
      max: 10,
    },
    bowLength: {
      pct: 28,
      min: 23,
      max: 33,
    },
    collarEase: {
      pct: 3,
      min: 0,
      max: 6,
    },
    bowStyle: {
      dflt: 'butterfly',
      list: ['diamond', 'butterfly', 'square', 'widesquare'],
    },
    endStyle: {
      dflt: 'straight',
      list: ['straight', 'pointed', 'rounded'],
    },
    adjustmentRibbon: {
      bool: false,
    },
    adjustmentRibbonWidth: 20,
  },
}
