import { version } from "../package.json";

export default {
  name: "simon",
  version,
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaist",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "hipsCircumference",
    "shoulderToElbow",
    "shoulderToWrist",
    "wristCircumference"
  ],
  dependencies: {
    frontBase: "base",
    backBase: "base",
    back: "backBase",
    front: "frontBase",
    frontRight: "front",
    frontLeft: "front",
    buttonPlacket: "front",
    buttonholePlacket: "front",
    yoke: "backBase",
    sleeve: ["sleeveBase", "front", "back"]
  },
  inject: {
    frontBase: "base",
    backBase: "base",
    back: "backBase",
    front: "frontBase",
    frontRight: "front",
    frontLeft: "front",
    buttonPlacket: "front",
    buttonholePlacket: "front",
    yoke: "backBase",
    sleeve: "sleeveBase"
  },
  hide: ["base", "frontBase", "front", "backBase", "sleeveBase"],
  options: {
    // Constants
    collarFactor: 5,
    minimalDartShaping: 5,
    brianFitSleeve: true,
    cuffOverlap: 0.05,
    frenchCuffRoundFactor: 0.05,

    // Lists
    extraTopButton: {
      list: ["yes", "no"],
      dflt: "yes"
    },
    splitYoke: {
      list: ["yes", "no"],
      dflt: "no"
    },
    barrelcuffNarrowButton: {
      list: ["yes", "no"],
      dflt: "yes"
    },
    hemStyle: {
      list: ["straight", "baseball", "slashed"],
      dflt: "straight"
    },
    buttonPlacketType: {
      list: ["cutOn", "seperate"],
      dflt: "cutOn"
    },
    buttonPlacketStyle: {
      list: ["classic", "seamless"],
      dflt: "classic"
    },
    buttonholePlacketType: {
      list: ["cutOn", "seperate"],
      dflt: "cutOn"
    },
    buttonholePlacketStyle: {
      list: ["classic", "seamless"],
      dflt: "seamless"
    },
    cuffStyle: {
      list: [
        "roundedBarrelCuff",
        "angledBarrelCuff",
        "straightBarrelCuff",
        "roundedFrenchcuff",
        "angledFrenchCuff",
        "straightFrenchCuff"
      ],
      dflt: "angledBarrelCuff"
    },

    // Counters
    buttons: { count: 7, min: 4, max: 12 },
    cuffButtonRows: { count: 1, min: 1, max: 2 },

    // Angles
    collarAngle: { deg: 85, min: 60, max: 130 },

    // Millimeter
    buttonPlacketWidth: { mm: 20, min: 10, max: 30 },
    buttonholePlacketWidth: { mm: 35, min: 20, max: 45 },
    buttonholePlacketFoldWidth: { mm: 6, min: 3, max: 10 },
    collarStandWidth: { mm: 35, min: 15, max: 60 },
    sleevePlacketWidth: { mm: 25, min: 15, max: 35 },

    // Percentages
    acrossBackFactor: { pct: 97, min: 93, max: 100 },
    armholeDepthFactor: { pct: 60, min: 50, max: 70 },
    backNeckCutout: { pct: 5, min: 2, max: 8 },
    bicepsEase: { pct: 15, min: 0, max: 50 },
    buttonFreeLength: { pct: 2, min: 0, max: 15 },
    chestEase: { pct: 8, min: -4, max: 20 },
    collarBend: { pct: 5, min: 0, max: 10 },
    collarEase: { pct: 3.5, min: 0, max: 10 },
    collarFlare: { pct: 3, min: 0, max: 6 },
    collarGap: { pct: 3, min: 0, max: 6 },
    collarRoll: { pct: 3, min: 0, max: 6 },
    collarStandBend: { pct: 5, min: 0, max: 10 },
    collarStandCurve: { pct: 5, min: 0, max: 10 },
    cuffDrape: { pct: 10, min: 0, max: 20 },
    cuffEase: { pct: 20, min: 0, max: 200 },
    cuffLength: { pct: 5, min: 3, max: 10 },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5 },
    hemCurve: { pct: 75, min: 25, max: 100 },
    hipsEase: { pct: 8, min: -4, max: 20 },
    lengthBonus: { pct: 0, min: -4, max: 60 },
    shoulderEase: { pct: 0, min: -2, max: 6 },
    shoulderSlopeReduction: { pct: 0, min: 0, max: 8 },
    sleevecapEase: { pct: 1, min: 0, max: 10 },
    sleevecapBackFactorX: { pct: 60, min: 35, max: 65 },
    sleevecapBackFactorY: { pct: 33, min: 35, max: 65 },
    sleevecapFrontFactorX: { pct: 55, min: 35, max: 65 },
    sleevecapFrontFactorY: { pct: 33, min: 35, max: 65 },
    sleevecapQ1Offset: { pct: 3, min: 0, max: 7 },
    sleevecapQ2Offset: { pct: 5.5, min: 0, max: 7 },
    sleevecapQ3Offset: { pct: 4.5, min: 0, max: 7 },
    sleevecapQ4Offset: { pct: 1, min: 0, max: 7 },
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20 },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread2: { pct: 10, min: 4, max: 20 },
    sleevecapQ3Spread1: { pct: 10, min: 4, max: 20 },
    sleevecapQ3Spread2: { pct: 8, min: 4, max: 20 },
    sleevecapQ4Spread1: { pct: 7, min: 4, max: 20 },
    sleevecapQ4Spread2: { pct: 7, min: 4, max: 20 },
    sleeveWidthGuarantee: { pct: 90, min: 25, max: 100 },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10 },
    sleevePlacketLength: { pct: 25, min: 15, max: 35 },
    waistEase: { pct: 8, min: -4, max: 20 },
    yokeDart: { pct: 0, min: 0, max: 15 }
  }
};
