export default {
  name: "simon",
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 4,
  tags: ["top", "shirt"],
  parts: [
    "cuff",
    "sleevePlacketOverlap",
    "sleevePlacketUnderlap",
    "collar",
    "collarStand",
    "frontRight",
    "frontLeft",
    "buttonPlacket",
    "butonholePlacket",
    "yoke",
    "sleeve"
  ],
  optionGroups: {
    fit: [
      "chestEase",
      "collarEase",
      "bicepsEase",
      "cuffEase",
      "shoulderEase",
      "lengthBonus",
      "sleeveLengthBonus",
      "waistEase",
      "hipsEase",
      "collarEase",
      "yokeDart"
    ],
    style: [
      "splitYoke",
      "hemStyle",
      "hemCurve",
      {
        closure: [
          "extraTopButton",
          "buttons",
          "seperateButtonPlacket",
          "buttonPlacketStyle",
          "seperateButtonholePlacket",
          "buttonholePlacketStyle",
          "buttonPlacketWidth",
          "buttonholePlacketWidth",
          "buttonholePlacketFoldWidth",
          "buttonFreeLength"
        ]
      },
      {
        cuffs: [
          "cuffStyle",
          "barrelCuffNarrowButton",
          "cuffButtonRows",
          "sleevePlacketWidth",
          "sleevePlacketLength",
          "cuffDrape",
          "cuffLength"
        ]
      },
      {
        collar: [
          "collarAngle",
          "collarStandBend",
          "collarStandCurve",
          "collarFlare",
          "collarStandWidth",
          "collarBend",
          "collarGap",
          "collarRoll"
        ]
      }
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
