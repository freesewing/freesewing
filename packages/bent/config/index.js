import { version } from "../package.json";

export default {
  name: "bent",
  version: version,
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "block",
  difficulty: 3,
  tags: ["top"],
  optionGroups: {
    fit: [
      "chestEase",
      "collarEase",
      "bicepsEase",
      "cuffEase",
      "shoulderEase",
      "lengthBonus",
      "sleeveLengthBonus",
      "sleeveBend"
    ],
    advanced: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "backNeckCutout",
      "frontArmholeDeeper",
      "shoulderSlopeReduction",
      "sleevecapHeight",
      "sleevecapEase"
    ]
  },
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToElbow",
    "shoulderToShoulder",
    "shoulderToWrist",
    "wristCircumference"
  ],
  dependencies: {
    back: "base",
    front: "back",
    topSleeve: "sleeve",
    underSleeve: "sleeve"
  },
  inject: {
    back: "base",
    front: "back",
    topSleeve: "sleeve",
    underSleeve: "sleeve"
  },
  hide: ["base", "sleeve"],
  options: {
    // Constants
    brianFitSleeve: true,
    brianFitCollar: true,
    collarFactor: 4.8,

    // Percentages
    acrossBackFactor: { pct: 97, min: 93, max: 100 },
    armholeDepthFactor: { pct: 65, min: 50, max: 70 },
    backNeckCutout: { pct: 5, min: 2, max: 8 },
    bicepsEase: { pct: 20, min: 0, max: 50 },
    chestEase: { pct: 8, min: -4, max: 20 },
    collarEase: { pct: 3.5, min: 0, max: 10 },
    cuffEase: { pct: 20, min: 0, max: 200 },
    frontArmholeDeeper: { pct: 0.5, min: 0, max: 1.5 },
    lengthBonus: { pct: 0, min: -4, max: 60 },
    shoulderEase: { pct: 0, min: -2, max: 6 },
    shoulderSlopeReduction: { pct: 0, min: 0, max: 8 },

    sleeveBend: { deg: 10, min: 0, max: 20 },
    sleevecapHeight: { pct: 45, min: 40, max: 60 },
    sleevecapEase: { pct: 1, min: 0, max: 10 },
    sleeveLengthBonus: { pct: 0, min: -40, max: 10 }
  }
};
