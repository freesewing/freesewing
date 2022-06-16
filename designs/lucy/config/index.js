import { version } from '../package.json'

export default {
  version,
  name: 'lucy',
  design: 'SeaZeeZee',
  code: 'SeaZeeZee',
  department: 'accessories',
  type: 'pattern',
  difficulty: 2,
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
    style: ['width', 'length', 'edge'],
  },
  measurements: [],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['pocket'],
  options: {
    width: { pct: 50, min: 30, max: 100 },
    length: { pct: 50, min: 30, max: 100 },
    edge: { pct: 25, min: 20, max: 50 },
  },
}
