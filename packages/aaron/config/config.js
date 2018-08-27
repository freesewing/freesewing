export default {
  name: "aaron",
  measurements: [
    "bicepsCircumference",
    "centerBackNeckToWaist",
    "chestCircumference",
    "naturalWaistToHip",
    "neckCircumference",
    "shoulderSlope",
    "shoulderToShoulder",
    "hipsCircumference"
  ],
  options: {
    // Constants
    collarFactor: 4.8,
    acrossBackFactor: 0.97,
    backNeckCutout: 0.05,
    bicepsEase: 0.05,
    shoulderEase: 0,
    collarEase: 0,
    frontArmholeDeeper: 0,
    armholeDepthFactor: 0.6,
    shoulderSlopeReduction: 0,

    // Percentages
    armholeDrop:            { val:  10, min:  1, max:  75 },
    backlineBend:           { val:  50, min: 50, max: 100 },
    chestEase:              { val:   8, min:  0, max:  20 },
    hipsEase:               { val:   8, min:  0, max:  20 },
    lengthBonus:            { val:  10, min:-20, max:  60 },
    necklineBend:           { val: 100, min: 40, max: 100 },
    necklineDrop:           { val:  20, min: 10, max:  35 },
    stretchFactor:          { val:   5, min:  0, max:  15 },
    shoulderStrapWidth:     { val:  15, min: 10, max:  40 },
    shoulderStrapPlacement: { val:  40, min: 20, max:  80 },
  }
};
