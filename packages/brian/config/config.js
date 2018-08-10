/** Pattern parts */
export default {
  name: "brian",
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "hipsCircumference",
    "shoulderToWrist",
    "wristCircumference"
  ],
  options: {
    // Constants
    // TODO shoulderSlopeReduction: { val:   0, type: "constant" },
    collarFactor:           { val: 4.8, type: "constant" },

    // Measures
    lengthBonus:       { val:  0, min: -40, max: 120, type: "measure" },
    shoulderEase:      { val:  0, min: -20, max:  60, type: "measure" },
    sleeveLengthBonus: { val:  0, min: -40, max:  80, type: "measure" },

    // Percentages
    acrossBackFactor:      { val:  97, min: 93, max: 100 },
    armholeDepthFactor:    { val:  60, min: 50, max:  70 },
    backNeckCutout:        { val:   5, min:  2, max:   8 },
    bicepsEase:            { val:  15, min:  0, max:  50 },
    chestEase:             { val:   8, min: -4, max:  20 },
    collarEase:            { val: 3.5, min:  0, max:  10 },
    cuffEase:              { val:  20, min:  0, max: 200 },
    frontArmholeDeeper:    { val: 0.5, min:  0, max: 1.5 },
    sleevecapEase:         { val:   1, min:  0, max:  10 },
    sleevecapBackFactorX:  { val:  50, min: 35, max:  65 },
    sleevecapBackFactorY:  { val:  33, min: 35, max:  65 },
    sleevecapFrontFactorX: { val:  50, min: 35, max:  65 },
    sleevecapFrontFactorY: { val:  33, min: 35, max:  65 },
    sleevecapQ1Offset:     { val:   5, min:  0, max:   7 },
    sleevecapQ2Offset:     { val: 5.5, min:  0, max:   7 },
    sleevecapQ3Offset:     { val: 4.5, min:  0, max:   7 },
    sleevecapQ4Offset:     { val:   2, min:  0, max:   7 },
    sleevecapQ1Spread1:    { val:   6, min:  4, max:  20 },
    sleevecapQ1Spread2:    { val:  15, min:  4, max:  20 },
    sleevecapQ2Spread1:    { val:  15, min:  4, max:  20 },
    sleevecapQ2Spread2:    { val:  10, min:  4, max:  20 },
    sleevecapQ3Spread1:    { val:  10, min:  4, max:  20 },
    sleevecapQ3Spread2:    { val:   8, min:  4, max:  20 },
    sleevecapQ4Spread1:    { val:   7, min:  4, max:  20 },
    sleevecapQ4Spread2:    { val:   7, min:  4, max:  20 },
    sleeveWidthGuarantee:  { val:  90, min: 25, max: 100 },
  }
};
