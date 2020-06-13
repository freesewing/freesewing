import { version } from '../package.json'

export default {
  name: 'theo',
  version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'menswear',
  type: 'pattern',
  difficulty: 4,
  tags: ['trousers', 'bottom'],
  optionGroups: {
    fit: ['backRise', 'wedge'],
    style: ['waistbandWidth', 'lengthBonus', 'legWidth']
  },
  measurements: [
    'crotchDepth',
    'hipsCircumference',
    'inseam',
    'kneeCircumference',
    'seatCircumference',
    'waistToHips'
  ],
  dependencies: {},
  inject: {
    front: 'back',
    waistbandLeft: 'waistbandInterfacingLeft',
    waistbandRight: 'waistbandInterfacingRight',
    waistbandLiningLeft: 'waistbandInterfacingLeft',
    waistbandLiningRight: 'waistbandInterfacingRight',
    flyPiece: 'front',
    flyShield: 'flyPiece',
    sidePiece: 'front',
    frontPocketBag: 'front',
    backOuterPocketBag: 'backInnerPocketBag',
    backPocketInterfacing: 'backPocketFacing'
  },
  hide: [],
  parts: ['waistbandInterfacingLeft', 'waistbandInterfacingRight', 'backPocketFacing', 'beltLoop'],
  options: {
    // Constants

    // Millimeter
    waistbandWidth: { mm: 40, min: 5, max: 80 },

    // Percentages
    legWidth: { pct: 10, min: 0, max: 30 },
    backRise: { pct: 3.5, min: 0.5, max: 8 },
    lengthBonus: { pct: 0, min: -10, max: 10 },
    wedge: { pct: 0, min: -3, max: 3 }
  }
}
