import pkg from '../package.json'

export default {
  name: 'jaeger',
  version: pkg.version,
  design: 'Joost De Cock',
  code: 'Joost De Cock',
  department: 'coats',
  type: 'pattern',
  difficulty: 5,
  optionGroups: {
    fit: [
      'acrossBackFactor',
      'armholeDepthFactor',
      'bicepsEase',
      'centerBackDart',
      'chestEase',
      'collarEase',
      'cuffEase',
      'hipsEase',
      'lengthBonus',
      'shoulderEase',
      'waistEase',
    ],
    sleeves: ['sleeveBend', 'sleeveLengthBonus', 'sleeveVentLength', 'sleeveVentWidth'],
    advanced: [
      'backNeckCutout',
      'chestShaping',
      'frontArmholeDeeper',
      'frontDartPlacement',
      'frontOverlap',
      'sideFrontPlacement',
      'shoulderSlopeReduction',
      'sleevecapHeight',
      'sleevecapEase',
    ],
    pockets: [
      'chestPocketDepth',
      'chestPocketWidth',
      'chestPocketPlacement',
      'chestPocketAngle',
      'chestPocketWeltSize',
      'frontPocketPlacement',
      'frontPocketWidth',
      'frontPocketDepth',
      'frontPocketRadius',
      'innerPocketPlacement',
      'innerPocketWidth',
      'innerPocketDepth',
      'innerPocketWeltHeight',
      'pocketFoldover',
    ],
    style: [
      'centerFrontHemDrop',
      'backVent',
      'backVentLength',
      'buttonLength',
      'buttons',
      'frontCutawayAngle',
      'frontCutawayStart',
      'frontCutawayEnd',
      'hemRadius',
      'lapelStart',
      'lapelReduction',
    ],
    collar: [
      'collarSpread',
      'collarHeight',
      'collarNotchDepth',
      'collarNotchAngle',
      'collarNotchReturn',
      'collarRoll',
      'rollLineCollarHeight',
    ],
  },
  measurements: [
    'biceps',
    'chest',
    'hips',
    'hpsToWaistBack',
    'waist',
    'waistToHips',
    'neck',
    'shoulderSlope',
    'shoulderToElbow',
    'shoulderToShoulder',
    'shoulderToWrist',
    'wrist',
  ],
  dependencies: {
    bentBack: 'bentBase',
    bentFront: 'bentBack',
    bentTopSleeve: 'bentSleeve',
    bentUnderSleeve: 'bentSleeve',
    backBase: 'bentBack',
    frontBase: 'bentFront',
    front: ['frontBase', 'backBase'],
    back: 'backBase',
    side: ['frontBase', 'backBase'],
    collarStand: ['front', 'back'],
    collar: 'collarStand',
    underCollar: 'collarStand',
    pocket: ['frontBase', 'backBase'],
    pocketLining: 'pocket',
    chestPocketWelt: 'front',
    chestPocketBag: 'front',
    innerPocketWelt: 'front',
    innerPocketBag: 'front',
    topSleeve: ['bentTopSleeve', 'bentSleeve', 'bentFront'],
    underSleeve: ['bentUnderSleeve', 'bentSleeve', 'bentFront'],
  },
  inject: {
    bentBack: 'bentBase',
    bentFront: 'bentBack',
    bentTopSleeve: 'bentSleeve',
    bentUnderSleeve: 'bentSleeve',
    backBase: 'bentBack',
    frontBase: 'bentFront',
    front: 'frontBase',
    back: 'backBase',
    side: 'frontBase',
    collarStand: 'front',
    collar: 'collarStand',
    underCollar: 'collarStand',
    topSleeve: 'bentTopSleeve',
    underSleeve: 'bentUnderSleeve',
    pocketLining: 'pocket',
  },
  hide: [
    'bentBase',
    'bentBack',
    'bentFront',
    'bentSleeve',
    'bentTopSleeve',
    'bentUnderSleeve',
    'frontBase',
    'backBase',
  ],
  options: {
    // Constants
    brianFitSleeve: true,
    brianFitCollar: true,
    collarFactor: 4.8,
    chestShapingMax: 5,
    // s3 is short for Shoulder Seam Shift
    s3Collar: 0,
    s3Armhole: 0,

    // How the reduction of waist and hips is divided
    // Waist:
    //  - front dart: 10%
    //  - Side/front: 16%
    //  - Side/back: 16%
    //  - Back: 8%
    //  Total for half garment = 50%
    // Hips:
    //  - Side/front: 20%
    //  - Side/back: 20%
    //  - Back: 10%
    reduceWaistStandardFraction: 0.08,
    reduceWaistDartFraction: 0.05,
    reduceHipsStandardFraction: 0.1,

    // Options inherited from Bent
    acrossBackFactor: { pct: 97, min: 93, max: 100 },
    armholeDepthFactor: { pct: 65, min: 50, max: 70 },
    backNeckCutout: { pct: 5, min: 2, max: 8 },
    bicepsEase: { pct: 20, min: 0, max: 50 },
    chestEase: { pct: 10, min: 5, max: 20 },
    collarEase: { pct: 3.5, min: 0, max: 10 },
    cuffEase: { pct: 60, min: 30, max: 100 },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5 },
    lengthBonus: { pct: 19, min: 10, max: 25 },
    shoulderEase: { pct: 0, min: -2, max: 6 },
    sleeveBend: { deg: 10, min: 0, max: 20 },
    sleevecapHeight: { pct: 45, min: 40, max: 60 },
    sleevecapEase: { pct: 1, min: 0, max: 10 },
    sleeveLengthBonus: { pct: 2, min: 0, max: 10 },

    // Jaeger options
    frontOverlap: { pct: 1.5, min: 1, max: 2 },

    sleeveVentLength: { pct: 35, min: 25, max: 55 },
    sleeveVentWidth: { pct: 18, min: 10, max: 26 },

    innerPocketPlacement: { pct: 52, min: 42, max: 62 },
    innerPocketWidth: { pct: 50, min: 45, max: 65 },
    innerPocketDepth: { pct: 110, min: 75, max: 140 },
    innerPocketWeltHeight: { pct: 3.5, min: 2.5, max: 5 },

    pocketFoldover: { pct: 25, min: 15, max: 35 },

    waistEase: { pct: 14, min: 8, max: 25 },
    hipsEase: { pct: 12, min: 8, max: 20 },

    centerBackDart: { pct: 0.5, min: 0, max: 1.5 },

    centerFrontHemDrop: { pct: 2, min: 0, max: 4 },

    backVent: { count: 1, min: 0, max: 2 },
    backVentLength: { pct: 35, min: 15, max: 100 },

    frontCutawayAngle: { deg: 2.5, min: 1, max: 4 },
    frontCutawayStart: { pct: 30, min: 10, max: 70 },
    frontCutawayEnd: { pct: 40, min: 10, max: 40 },
    hemRadius: { pct: 100, min: 35, max: 100 },

    chestPocketDepth: { pct: 110, min: 70, max: 150 },
    chestPocketWidth: { pct: 37, min: 30, max: 45 },
    chestPocketPlacement: { pct: 52, min: 40, max: 60 },
    chestPocketAngle: { deg: 2.5, min: 0, max: 7 },
    chestPocketWeltSize: { pct: 17.5, min: 10, max: 25 },

    frontPocketPlacement: { pct: 75, min: 65, max: 85 },
    frontPocketWidth: { pct: 68, min: 55, max: 75 },
    frontPocketDepth: { pct: 110, min: 80, max: 130 },
    frontPocketRadius: { pct: 10, min: 0, max: 50 },

    lapelStart: { pct: 10, min: 0, max: 35 },
    lapelReduction: { pct: 5, min: 0, max: 10 },
    collarSpread: { deg: 13, min: 5, max: 35 },
    collarHeight: { pct: 9, min: 7, max: 10 },
    collarNotchDepth: { pct: 15, min: 15, max: 50 },
    collarNotchAngle: { deg: 45, min: 30, max: 60 },
    collarNotchReturn: { pct: 100, min: 50, max: 100 },
    collarRoll: { pct: 5, min: 0, max: 10 },

    frontDartPlacement: { pct: 55, min: 45, max: 60 },
    sideFrontPlacement: { pct: 85, min: 80, max: 90 },

    chestShaping: { pct: 30, min: 0, max: 100 },
    rollLineCollarHeight: { pct: 6, min: 5, max: 9 },
    shoulderSlopeReduction: { pct: 30, min: 0, max: 50 },

    buttonLength: { pct: 30, min: 30, max: 60 },
    buttons: {
      list: ['1', '2', '3'],
      dflt: '2',
    },
  },
}
