import pkg from '../package.json'
import { elastics } from '@freesewing/snapseries'
import freesewing from '@freesewing/core'
const { pctBasedOn } = freesewing

export default {
  name: 'sandy',
  version: pkg.version,
  design: 'Erica Alcusa Sáez',
  code: ['Erica Alcusa Sáez', 'Joost De Cock'],
  department: 'bottoms',
  type: 'pattern',
  difficulty: 3,
  optionGroups: {
    fit: ['waistbandPosition', 'waistbandShape'],
    style: ['lengthBonus', 'circleRatio', 'waistbandWidth', 'waistbandOverlap', 'gathering'],
    construction: ['seamlessFullCircle', 'hemWidth'],
  },
  measurements: ['waist', 'waistToFloor', 'waistToHips', 'hips'],
  dependencies: {
    waistband: 'skirt',
  },
  options: {
    // Constants
    minimumOverlap: 15, // Lower than this and we don't draw a button

    // Bool
    seamlessFullCircle: { bool: false },

    // Percentages
    waistbandWidth: { pct: 4, min: 1, max: 8, snap: elastics, ...pctBasedOn('waistToFloor') },
    waistbandPosition: { pct: 50, min: 0, max: 100 },
    lengthBonus: { pct: 50, min: 10, max: 100 },
    circleRatio: { pct: 50, min: 20, max: 100 },
    waistbandOverlap: { pct: 3, min: 0, max: 15 },
    gathering: { pct: 0, min: 0, max: 200 },
    hemWidth: { pct: 2, min: 1, max: 10 },

    // Lists
    waistbandShape: {
      list: ['straight', 'curved'],
      dflt: 'straight',
    },
  },
}
