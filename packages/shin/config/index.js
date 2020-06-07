import { version } from '../package.json'

export default {
  name: 'shin',
  version: version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'menswear',
  type: 'pattern',
  difficulty: 2,
  tags: ['swimwear', 'bottom'],
  optionGroups: {
    fit: ['bulge', 'backRise', 'legReduction', 'stretch'],
    style: ['lengthBonus', 'rise']
  },
  measurements: ['hipsCircumference', 'upperLegCircumference', 'waistToUpperLeg', 'waistToHips'],
  parts: ['back', 'front', 'waistband'],
  options: {
    // Constants
    frontFactor: 0.58,
    legFrontFactor: 0.48,
    gussetFactor: 0.0714,
    angle: 10,

    // Millimeters
    elasticWidth: { mm: 35, min: 15, max: 60 },

    // Percentages
    stretch: { pct: 20, min: 10, max: 30 },
    bulge: { pct: 2.5, min: 0, max: 5 },
    legReduction: { pct: 5, min: 0, max: 10 },
    lengthBonus: { pct: 0, min: 0, max: 50 },
    rise: { pct: 0, min: 0, max: 25 },
    backRise: { pct: 5, min: 0, max: 10 }
  }
}
