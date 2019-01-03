export default {
  name: "sven",
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 3,
  tags: ["top", "basics"],
  parts: ["front", "back", "sleeve", "cuff", "waistband"],
  optionGroups: {
    fit: [
      "chestEase",
      "collarEase",
      "bicepsEase",
      "cuffEase",
      "shoulderEase",
      "lengthBonus",
      "sleeveLengthBonus"
    ],
    style: ["ribbing", "ribbingHeight"],
    advanced: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "backNeckCutout",
      "frontArmholeDeeper",
      "ribbingStretch",
      "shoulderSlopeReduction",
      "sleeveWidthGuarantee",
      {
        sleevecap: [
          "sleevecapEase",
          "sleevecapBackFactorX",
          "sleevecapBackFactorY",
          "sleevecapFrontFactorX",
          "sleevecapFrontFactorY",
          "sleevecapQ1Offset",
          "sleevecapQ2Offset",
          "sleevecapQ3Offset",
          "sleevecapQ4Offset",
          "sleevecapQ1Spread1",
          "sleevecapQ1Spread2",
          "sleevecapQ2Spread1",
          "sleevecapQ2Spread2",
          "sleevecapQ3Spread1",
          "sleevecapQ3Spread2",
          "sleevecapQ4Spread1",
          "sleevecapQ4Spread2"
        ]
      }
    ]
  }
};
