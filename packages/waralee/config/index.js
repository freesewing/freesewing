import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'waralee',
  version,
  beta: true,
  design: 'Wouter Van Wageningen',
  code: 'Wouter Van Wageningen',
  department: 'unisex',
  type: 'pattern',
  difficulty: 3,
  tags: ['trousers', 'bottom', 'basics'],
  optionGroups: {
    fit: ['backRaise', 'waistRaise'],
    style: ['hem', 'legShortening', 'waistOverlap', 'frontPocket', 'backPocket', 'waistBand'],
    advanced: [
      'crotchFront',
      'crotchBack',
      'crotchFactorBackHor',
      'crotchFactorBackVer',
      'crotchFactorFrontHor',
      'crotchFactorFrontVer'
    ]
  },
  measurements: ['seatCircumference', 'inseam', 'crotchDepth', 'waistToHips'],
  dependencies: {},
  inject: { pants: 'pantsproto', mini: 'pantsproto' },
  hide: [],
  parts: ['cutout', 'pocket', 'backPocket', 'facings'],
  options: {
    minimizer: 5,
    frontPocketVerticalOffset: 0.07,
    frontPocketHorizontalOffset: 0.18,
    frontPocketSize: 0.65,
    frontPocket: { bool: true },
    frontPocketDepthFactor: 1.6,
    backPocketDepth: 140,
    backPocketVerticalOffset: 0.15,
    backPocketHorizontalOffset: 0.045,
    backPocketSize: 0.65,
    backPocket: { bool: true },
    hem: { mm: 15, min: 0, max: 100 },
    waistBand: { mm: 25, min: 0, max: 100 },
    waistRaise: { pct: 20, min: 0, max: 40 },
    crotchBack: { pct: 45, min: 10, max: 70 },
    crotchFront: { pct: 30, min: 10, max: 70 },
    crotchFactorFrontHor: { pct: 85, min: 10, max: 100 },
    crotchFactorFrontVer: { pct: 25, min: 10, max: 70 },
    crotchFactorBackHor: { pct: 90, min: 10, max: 100 },
    crotchFactorBackVer: { pct: 60, min: 20, max: 90 },
    waistOverlap: { pct: 50, min: 10, max: 100 },
    legShortening: { pct: 25, min: -10, max: 50 },
    backRaise: { pct: 10, min: 0, max: 25 }
  }
}
