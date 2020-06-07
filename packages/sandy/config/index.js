import { version } from '../package.json'

export default {
  name: 'sandy',
  version,
  design: 'Erica Alcusa Sáez',
  code: ['Erica Alcusa Sáez', 'Joost De Cock'],
  department: 'womenswear',
  type: 'pattern',
  difficulty: 3,
  tags: ['skirt', 'bottom', 'basics'],
  optionGroups: {
    fit: ['waistbandPosition', 'waistbandShape'],
    style: ['lengthBonus', 'circleRatio', 'waistbandWidth', 'waistbandOverlap', 'gathering'],
    construction: ['seamlessFullCircle', 'hemWidth']
  },
  measurements: ['waistCircumference', 'waistToFloor', 'waistToHips', 'hipsCircumference'],
  dependencies: {
    waistband: 'skirt'
  },
  options: {
    // Constants
    minimumOverlap: 15, // Lower than this and we don't draw a button

    // Bool
    seamlessFullCircle: { bool: false },

    // Millimeter
    waistbandWidth: { mm: 40, min: 5, max: 150 },

    // Percentages
    waistbandPosition: { pct: 50, min: 0, max: 100 },
    lengthBonus: { pct: 50, min: 10, max: 100 },
    circleRatio: { pct: 50, min: 20, max: 100 },
    waistbandOverlap: { pct: 3, min: 0, max: 15 },
    gathering: { pct: 0, min: 0, max: 200 },
    hemWidth: { pct: 2, min: 1, max: 10 },

    // Lists
    waistbandShape: {
      list: ['straight', 'curved'],
      dflt: 'straight'
    }
  }
}
