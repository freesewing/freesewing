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
  options: [
    // Constants
    { id: "frontArmholeExtra", val: 5, type: "constant" },
    { id: "shoulderSlopeReduction", val: 0, type: "constant" },
    { id: "sleevecapEase", val: 5, type: "constant" },
    { id: "collarFactor", val: 4.8, type: "constant" },

    // Measures
    { id: "shoulderEase", val: 0, min: -20, max: 60 },
    { id: "cuffEase", val: 45, min: 0, max: 100 },
    { id: "lengthBonus", val: 0, min: -40, max: 120 },
    { id: "sleeveLengthBonus", val: 0, min: -40, max: 80 },

    // Percentages
    { id: "chestEase", val: 8, type: "%", min: -4, max: 20 },
    { id: "collarEase", val: 3.5, type: "%", min: 0, max: 10 },
    { id: "bicepsEase", val: 15, type: "%", min: 0, max: 100 },
    { id: "backNeckCutout", val: 5, type: "%", min: 2, max: 8 },
    { id: "acrossBackFactor", val: 96, type: "%", min: 93, max: 99 },
    { id: "armholeDepthFactor", val: 50, type: "%", min: 35, max: 65 },
    {
      id: "sleevecapHeightFactor",
      val: 55,
      type: "percentage",
      min: 35,
      max: 75
    }
  ]
};
