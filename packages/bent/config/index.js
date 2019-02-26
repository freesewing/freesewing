import { version } from "../package.json";

export default {
  name: "bent",
  version: version,
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
    underSleeve: "sleeve",
  },
  inject: {
    back: "base",
    front: "back",
    topSleeve: "sleeve",
    underSleeve: "sleeve",
  },
  hide: ["base", "sleeve"],
  options: {
    // Constants
    brianFitSleeve: true,
    brianFitCollar: true,
    collarFactor: 4.8,

    // Percentages
    acrossBackFactor:       { pct:  97, min: 93, max: 100 },
    armholeDepthFactor:     { pct:  65, min: 50, max:  70 },
    backNeckCutout:         { pct:   5, min:  2, max:   8 },
    bicepsEase:             { pct:  20, min:  0, max:  50 },
    chestEase:              { pct:   8, min: -4, max:  20 },
    collarEase:             { pct: 3.5, min:  0, max:  10 },
    cuffEase:               { pct:  20, min:  0, max: 200 },
    frontArmholeDeeper:     { pct: 0.5, min:  0, max: 1.5 },
    lengthBonus:            { pct:  0, min:  -4, max:  60 },
    shoulderEase:           { pct:   0, min: -2, max:   6 },
    shoulderSlopeReduction: { pct:   0, min:  0, max:   8 },

    sleeveBend: { deg: 10, min: 0, max: 20 },
    sleevecapHeight: {pct: 45, min: 40, max: 60 },
    sleevecapEase:          { pct:   1, min:  0, max:  10 },
    sleevecapTopFactorX:    { pct:  63, min: 25, max:  75 },
    sleevecapTopFactorY:    { pct: 100, min: 35, max: 165 },
    sleevecapBackFactorX:   { pct:  30, min: 30, max:  75 },
    sleevecapBackFactorY:   { pct:  33, min: 35, max:  65 },
    sleevecapFrontFactorX:  { pct:  85, min: 35, max:  85 },
    sleevecapFrontFactorY:  { pct:  33, min: 35, max:  65 },
    sleevecapQ1Offset:      { pct:   2, min:  0, max:   7 },
    sleevecapQ2Offset:      { pct:   5, min:  0, max:   7 },
    sleevecapQ3Offset:      { pct:   2, min: -5, max:   7 },
    sleevecapQ4Offset:      { pct:   4, min:  0, max:   7 },
    sleevecapQ1Spread1:     { pct:   8, min:  4, max:  20 },
    sleevecapQ1Spread2:     { pct:   5, min:  4, max:  20 },
    sleevecapQ2Spread1:     { pct:  15, min:  4, max:  20 },
    sleevecapQ2Spread2:     { pct:  10, min:  4, max:  20 },
    sleevecapQ3Spread1:     { pct:  15, min:  4, max:  20 },
    sleevecapQ3Spread2:     { pct:   5, min:  4, max:  20 },
    sleevecapQ4Spread1:     { pct:  20, min:  4, max:  20 },
    sleevecapQ4Spread2:     { pct:  16, min:  4, max:  20 },
    sleeveWidthGuarantee:   { pct:  90, min: 25, max: 100 },
    sleeveLengthBonus:      { pct:   0, min:-40, max:  10 },
  }
};
