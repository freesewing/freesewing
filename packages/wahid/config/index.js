import { version } from "../package.json";

export default {
  name: "wahid",
  version,
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "hipsCircumference",
    "naturalWaist",
    "shoulderToWrist",
    "wristCircumference"
  ],
  dependencies: {
    backBlock: "base",
    frontBlock: "backBlock",
    front: "frontBlock"
  },
  inject: {
    backBlock: "base",
    frontBlock: "backBlock",
    front: "frontBlock"
  },
  hide: ["base", "frontBlock"],
  parts: [
    //"base",
    //"backBlock"
    //"frontBlock",
    //"waistcoatFrontBlock",
    //"front",
    //"back",
    //"frontFacing",
    //"frontLining",
    //"pocketWelt",
    //"pocketFacing",
    //"pocketBag",
    //"pocketInterfacing"
  ],
  options: {
    // These are needed because Brian expects them
    brianFitSleeve: false,
    brianFitCollar: false,
    collarFactor: 4.8,
    backNeckCutout: 0.05,
    shoulderSlopeReduction: 0,
    collarEase: 0.035,
    shoulderEase: 0,
    bicepsEase: 0.15,
    armholeDepthFactor: 0.6,
    acrossBackFactor: 0.97,
    frontArmholeDeeper: 0.005,

    // Wahid options start here
    frontOverlap: 0.01,
    pocketLocation: {
      pct: 35,
      min: 25,
      max: 45
    },
    pocketWidth: {
      pct: 9,
      max: 12,
      min: 6
    },
    weltHeight: {
      pct: 12.5,
      max: 15,
      min: 10
    },
    chestEase: {
      pct: 2,
      min: 1,
      max: 10
    },
    waistEase: {
      pct: 8,
      min: 2,
      max: 15
    },
    hipsEase: {
      pct: 8,
      min: 2,
      max: 15
    },
    lengthBonus: {
      pct: 1,
      min: 0,
      max: 5
    },
    backScyeDart: {
      pct: 2,
      min: 0,
      max: 6
    },
    frontScyeDart: {
      deg: 6,
      min: 0,
      max: 12
    },
    centerBackDart: {
      pct: 2,
      min: 0,
      max: 5
    },
    necklineDrop: {
      pct: 100,
      min: 50,
      max: 150
    },
    frontStyle: {
      dflt: "classic",
      list: ["classic", "rounded"]
    },
    hemStyle: {
      dflt: "classic",
      list: ["classic", "rounded"]
    },
    hemRadius: {
      pct: 6,
      min: 0,
      max: 10
    },
    buttons: {
      count: 6,
      min: 4,
      max: 12
    },
    neckInset: {
      pct: 3,
      min: 0,
      max: 5
    },
    backInset: {
      pct: 4,
      min: 2,
      max: 8
    },
    frontInset: {
      pct: 15,
      min: 0,
      max: 25
    },
    shoulderInset: {
      pct: 15,
      min: 0,
      max: 25
    },
    neckInset: {
      pct: 5,
      min: 0,
      max: 15
    },
    pocketAngle: {
      deg: 5,
      min: 0,
      max: 5
    }
  }
};
