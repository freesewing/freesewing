import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'indsleeve',
  version: version,
  design: 'devanshkain',
  code: 'devanshkain',
  department: 'menswear',
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
    fit: ['size']
  },
  measurements: ['sleevelength', 'bicepcircum', 'wrist'],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ['sleeve'],
  options: {
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20 },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread2: { pct: 8.5, min: 4, max: 20 }, //8.5
    sleevecapQ3Spread1: { pct: 8, min: 4, max: 20 }, //8
    sleevecapQ3Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ4Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ4Spread2: { pct: 6, min: 4, max: 20 }
  }
}
