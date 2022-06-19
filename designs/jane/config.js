import {pkg} from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'jane',
  version: 'pkg.version',
  design: 'SeaZeeZee',
  code: 'SeaZeeZee',
  department: 'tops',
  type: 'pattern',
  difficulty: 3,
  tags: [
    'freesewing',
    'design',
    'diy',
    'fashion',
    'made to measure',
    'parametric design',
    'pattern',
    'sewing',
    'sewing pattern',
  ],
    optionGroups: {
    fit: ['bodyEase', 'neckDepthFront', 'neckDepthBack', 'bicepsEase', 'sleeveBonus', 'neckWidth', 'shiftLength', ]
  },
  measurements: ['chest', 'hips', 'hpsToWaistBack','waistToKnee', 'shoulderToShoulder', 'neck', 'biceps', 'shoulderToElbow', 'hpsToBust', 'waistToFloor'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['body', 'sleeve', 'gusset'],
  options: {
    bodyEase: {pct: 21, min: 21, max: 50 },
    neckDepthFront: {pct: 31, min: 25, max: 50},
    neckDepthBack: {pct: 18, min: 15, max: 50},
    bicepsEase: {pct: 18, min: 18, max: 51},
    sleeveBonus: {pct: 80, min: 60, max: 100},
    neckWidth: {pct: 71, min: 65, max: 85},
    shiftLength: {pct:2, min: 0, max: 20},
    gussetSize: {pct:44, min: 44, max: 50},
  }
}