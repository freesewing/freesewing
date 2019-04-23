export default {
  name: "huey",
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 3,
  tags: ["top", "basics"],
  parts: [
    "base",
    "backBase",
    "frontBase",
    "sleevecap",
    "sleeveBase",
    "back",
    "front",
    "sleeve",
    "pocket",
    "hood",
    "cuff",
    "waistband"
  ],
  optionGroups: {
    fit: [
      "bicepsEase",
      "chestEase",
      "cuffEase",
      "collarEase",
      "ribbingStretchFactor",
      "shoulderEase",
      "waistEase",
      "hipsEase",
      "ribbingStretch"
    ],
    style: [
      "lengthBonus",
      "sleeveLengthBonus",
      "ribbing",
      "pocket",
      "ribbingWidth",
      "pocketHeight",
      "pocketWidth",
      "hoodHeight",
      "hoodCutback",
      "hoodClosure",
      "hoodDepth",
      "hoodAngle"
    ],
    advanced: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "backNeckCutout",
      "frontArmholeDeeper",
      "shoulderSlopeReduction",
      "sleeveWidthGuarantee",
      {
        sleevecap: [
          "sleevecapEase",
          "sleevecapTopFactorX",
          "sleevecapTopFactorY",
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
