/** Pattern parts */
export default {
  name: "brian",
  parts: ["back", "front", "_sleeve"],
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
    shoulderSlopeReduction: { val:   0, type: "constant" },
    collarFactor:           { val: 4.8, type: "constant" },

    // Measures
    cuffEase:          { val: 45, min:   0, max: 100 },
    lengthBonus:       { val:  0, min: -40, max: 120 },
    shoulderEase:      { val:  0, min: -20, max:  60 },
    sleeveLengthBonus: { val:  0, min: -40, max:  80 },

    // Percentages
    acrossBackFactor:      { val:  97, type: "%", min: 93, max: 100 },
    armholeDepthFactor:    { val:  60, type: "%", min: 35, max:  75 },
    backNeckCutout:        { val:   5, type: "%", min:  2, max:   8 },
    bicepsEase:            { val:  15, type: "%", min:  0, max: 100 },
    chestEase:             { val:   8, type: "%", min: -4, max:  20 },
    collarEase:            { val: 3.5, type: "%", min:  0, max:  10 },
    cuffEase:              { val:  20, type: "%", min:  0, max: 500 },
    frontArmholeDeeper:    { val: 0.5, type: "%", min:  0, max: 1.5 },
    sleevecapEase:         { val:   1, type: "%", min:  0, max:  10 },
    sleevecapBackFactorX:  { val:  50, type: "%", min: 35, max:  65 },
    sleevecapBackFactorY:  { val:  33, type: "%", min: 35, max:  65 },
    sleevecapFrontFactorX: { val:  50, type: "%", min: 35, max:  65 },
    sleevecapFrontFactorY: { val:  33, type: "%", min: 35, max:  65 },
    sleevecapQ1Offset:     { val:   5, type: "%", min:  0, max:   7 },
    sleevecapQ2Offset:     { val: 5.5, type: "%", min:  0, max:   7 },
    sleevecapQ3Offset:     { val: 4.5, type: "%", min:  0, max:   7 },
    sleevecapQ4Offset:     { val:   2, type: "%", min:  0, max:   7 },
    sleevecapQ1Spread1:    { val:   6, type: "%", min:  0, max:   7 },
    sleevecapQ1Spread2:    { val:  15, type: "%", min:  0, max:   7 },
    sleevecapQ2Spread1:    { val:  15, type: "%", min:  0, max:   7 },
    sleevecapQ2Spread2:    { val:  10, type: "%", min:  0, max:   7 },
    sleevecapQ3Spread1:    { val:  10, type: "%", min:  0, max:   7 },
    sleevecapQ3Spread2:    { val:   8, type: "%", min:  0, max:   7 },
    sleevecapQ4Spread1:    { val:   7, type: "%", min:  0, max:   7 },
    sleevecapQ4Spread2:    { val:   7, type: "%", min:  0, max:   7 },
    sleeveWidthGuarantee:  { val:  90, type: "%", min: 25, max: 100 },
  }
};
