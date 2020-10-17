import { version } from '../package.json'

export default {
  name: 'albert',
  version,
  design: 'WouterVdub',
  code: 'WouterVdub',
  department: 'unisex',
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
    'sewing pattern'
  ],
  optionGroups: {
    fit: ['backOpening', 'chestDepth'],
    style: ['lengthBonus', 'bibLength', 'bibWidth', 'strapWidth']
  },
  measurements: ['chest', 'waist', 'hips', 'hpsToWaistBack', 'waistToKnee'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['front', 'strap', 'pocket'],
  options: {
    backOpening: { pct: 10, min: 0, max: 25 },
    lengthBonus: { pct: 0, min: -20, max: 25 },
    chestDepth: { pct: 22, min: 15, max: 90 },
    bibLength: { pct: 75, min: 0, max: 90 },
    bibWidth: { pct: 100, min: 50, max: 125 },
    strapWidth: { pct: 60, min: 20, max: 100 }
  }
}
