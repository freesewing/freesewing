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
    { id: "shoulderSlopeReduction", val:   0, type: "constant" },
    { id: "collarFactor",           val: 4.8, type: "constant" },

    // Measures
    { id: "shoulderEase",      val:  0, min: -20, max:  60 },
    { id: "cuffEase",          val: 45, min:   0, max: 100 },
    { id: "lengthBonus",       val:  0, min: -40, max: 120 },
    { id: "sleeveLengthBonus", val:  0, min: -40, max:  80 },

    // Percentages
    { id: "frontArmholeDeeper",    val: 0.5, type: "%", min:  0, max: 1.5 },
    { id: "chestEase",             val:   8, type: "%", min: -4, max:  20 },
    { id: "collarEase",            val: 3.5, type: "%", min:  0, max:  10 },
    { id: "bicepsEase",            val:  15, type: "%", min:  0, max: 100 },
    { id: "cuffEase",              val:  20, type: "%", min:  0, max: 500 },
    { id: "backNeckCutout",        val:   5, type: "%", min:  2, max:   8 },
    { id: "acrossBackFactor",      val:  97, type: "%", min: 93, max: 100 },
    { id: "armholeDepthFactor",    val:  50, type: "%", min: 35, max:  65 },
    { id: "sleevecapHeightFactor", val:  55, type: "%", min: 35, max:  75 },
    { id: "sleevecapBackFactorX",  val:  50, type: "%", min: 35, max:  65 },
    { id: "sleevecapBackFactorY",  val:  33, type: "%", min: 35, max:  65 },
    { id: "sleevecapFrontFactorX", val:  50, type: "%", min: 35, max:  65 },
    { id: "sleevecapFrontFactorY", val:  33, type: "%", min: 35, max:  65 },
    { id: "sleevecapQ1Offset",     val:   5, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ2Offset",     val: 5.5, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ3Offset",     val: 4.5, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ4Offset",     val:   2, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ1Spread1",    val:   6, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ1Spread2",    val:  15, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ2Spread1",    val:  15, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ2Spread2",    val:  10, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ3Spread1",    val:  10, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ3Spread2",    val:   8, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ4Spread1",    val:   7, type: "%", min:  0, max:   7 },
    { id: "sleevecapQ4Spread2",    val:   7, type: "%", min:  0, max:   7 },
    { id: "sleevecapEase",         val:   1, type: "%", min:  0, max:  10 },
  ]
};
