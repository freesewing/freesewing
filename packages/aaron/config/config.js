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
    armholeDrop:            { pct:  10, min:  1, max:  75 },
    backlineBend:           { pct:  50, min: 50, max: 100 },
    chestEase:              { pct:   8, min:  0, max:  20 },
    hipsEase:               { pct:   8, min:  0, max:  20 },
    lengthBonus:            { pct:  10, min:-20, max:  60 },
    necklineBend:           { pct: 100, min: 40, max: 100 },
    necklineDrop:           { pct:  20, min: 10, max:  35 },
    stretchFactor:          { pct:   5, min:  0, max:  15 },
    shoulderStrapWidth:     { pct:  15, min: 10, max:  40 },
    shoulderStrapPlacement: { pct:  40, min: 20, max:  80 },
  }
};
