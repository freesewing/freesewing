import { version } from '../package.json'
import Brian from '@freesewing/brian'

const config = {
  version,
  name: 'simon',
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'tops',
  type: 'pattern',
  difficulty: 4,
  optionGroups: {
    fit: [...Brian.config.optionGroups.fit, 'waistEase', 'hipsEase', 'roundBack'],
    style: [
      ...Brian.config.optionGroups.style,
      'hemStyle',
      'hemCurve',
      'boxPleat',
      'backDarts',
      'splitYoke',
      'yokeHeight',
      {
        closure: [
          'extraTopButton',
          'buttons',
          'seperateButtonPlacket',
          'buttonPlacketStyle',
          'seperateButtonholePlacket',
          'buttonholePlacketStyle',
          'buttonPlacketWidth',
          'buttonholePlacketWidth',
          'buttonholePlacketFoldWidth',
          'buttonFreeLength',
        ],
      },
      {
        cuffs: [
          'cuffStyle',
          'barrelCuffNarrowButton',
          'cuffButtonRows',
          'sleevePlacketWidth',
          'sleevePlacketLength',
          'cuffDrape',
          'cuffLength',
        ],
      },
      {
        collar: [
          'collarAngle',
          'collarStandBend',
          'collarStandCurve',
          'collarFlare',
          'collarStandWidth',
          'collarBend',
          'collarGap',
          'collarRoll',
        ],
      },
    ],
    advanced: [
      ...Brian.config.optionGroups.advanced,
      'boxPleatWidth',
      'boxPleatFold',
      'backDartShaping',
      'ffsa',
    ],
  },
  measurements: [...Brian.config.measurements, 'waist', 'hips'],
  optionalMeasurements: [ 'highBust' ],
  dependencies: {
    sleeveBase: ['frontBase', 'backBase', 'back'],
    sleeve: ['sleeveBase', 'front', 'back'],
    frontRight: ['back'],
    frontLeft: ['back'],
    sleevePlacketUnderlap: ['back'],
    sleevePlacketOverlap: ['back'],
    collar: ['back'],
    collarStand: ['back'],
    buttonPlacket: ['back'],
    buttonholePlacket: ['back'],
  },
  inject: {
    frontBase: 'base',
    backBase: 'base',
    back: 'backBase',
    front: 'frontBase',
    frontRight: 'front',
    frontLeft: 'front',
    buttonPlacket: 'front',
    buttonholePlacket: 'front',
    yoke: 'back',
    sleeveBase: 'front',
    sleeve: 'sleeveBase',
  },
  parts: ['collarStand', 'collar', 'sleevePlacketUnderlap', 'sleevePlacketOverlap', 'cuff'],
  hide: ['base', 'frontBase', 'front', 'backBase', 'sleeveBase'],
  options: {
    ...Brian.config.options,

    // Constants | Cannot be changed
    collarFactor: 5,
    cuffOverlap: 0.15,
    frenchCuffRoundFactor: 0.05,

    // Back
    backDarts: {
      list: ['auto', 'never', 'always'],
      dflt: 'auto',
    },
    backDartShaping: { pct: 25, min: 5, max: 75 },
    boxPleat: { bool: false },
    boxPleatFold: { pct: 15, min: 10, max: 20 },
    boxPleatWidth: { pct: 7, min: 4, max: 10 },
    roundBack: { pct: 0, min: 0, max: 10 },

    // Buttons
    buttonFreeLength: { pct: 2, min: 0, max: 15 },
    buttonholePlacketStyle: {
      list: ['classic', 'seamless'],
      dflt: 'seamless',
      hide: ({ options }) => options.seperateButtonholePlacket,
    },
    buttonholePlacketWidth: { pct: 8, min: 4, max: 12 },
    buttonholePlacketFoldWidth: { pct: 16, min: 8, max: 24 },
    buttonPlacketStyle: {
      list: ['classic', 'seamless'],
      dflt: 'classic',
      hide: ({ options }) => options.seperateButtonPlacket,
    },
    buttonPlacketWidth: { pct: 5, min: 2, max: 8 },
    extraTopButton: { bool: true },
    seperateButtonPlacket: { bool: false },
    seperateButtonholePlacket: { bool: false },

    // Collar
    collarEase: { pct: 2, min: 0, max: 10 },
    collarAngle: { deg: 85, min: 60, max: 130 },
    collarBend: { pct: 3.5, min: 0, max: 10 },
    collarFlare: { deg: 3.5, min: 0, max: 10 },
    collarGap: { pct: 2.5, min: 0, max: 6 },
    collarRoll: { pct: 3, min: 0, max: 6 },

    // Collar stand
    collarStandBend: { deg: 3, min: 0, max: 5 },
    collarStandCurve: { deg: 2, min: 0, max: 5 },
    collarStandWidth: { pct: 8, min: 3, max: 13 },

    // Cuffs
    barrelCuffNarrowButton: { bool: true },
    cuffButtonRows: { count: 1, min: 1, max: 2 },
    cuffDrape: { pct: 5, min: 0, max: 10 },
    cuffEase: { pct: 20, min: 10, max: 40 },
    cuffLength: { pct: 10, min: 3, max: 15 },
    cuffStyle: {
      list: [
        'roundedBarrelCuff',
        'angledBarrelCuff',
        'straightBarrelCuff',
        'roundedFrenchCuff',
        'angledFrenchCuff',
        'straightFrenchCuff',
      ],
      dflt: 'angledBarrelCuff',
    },

    // Hem & hips
    hemCurve: { pct: 50, min: 25, max: 100 },
    hemStyle: {
      list: ['straight', 'baseball', 'slashed'],
      dflt: 'straight',
    },
    hipsEase: { pct: 15, min: 10, max: 35 },
    lengthBonus: { pct: 25, min: -4, max: 60 },

    // Shoulders
    shoulderEase: { pct: 2, min: 0, max: 15 },
    splitYoke: { bool: false },
    yokeHeight: { pct: 70, min: 40, max: 90 },

    // Sleeve
    sleeveLengthBonus: { pct: 3.5, min: -40, max: 10 },
    sleevePlacketLength: { pct: 25, min: 15, max: 35 },
    sleevePlacketWidth: { pct: 13, min: 8, max: 18 },

    // Waist
    buttons: { count: 7, min: 4, max: 12 },
    waistEase: { pct: 15, min: 10, max: 35 },

    // Various
    ffsa: { pct: 150, min: 100, max: 200 }, // Flat-felled seam allowance

    // draft for high bust
    draftForHighBust: { bool: false },
  },
}

export default config
