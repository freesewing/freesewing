export default {
  name: "bent",
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "block",
  difficulty: 3,
  tags: ["top"],
  parts: ["front", "back", "topsleeve", "undersleeve"],
  optionGroups: {
    fit: [
      "chestEase",
      "collarEase",
      "bicepsEase",
      "cuffEase",
      "shoulderEase",
      "lengthBonus",
      "sleeveLengthBonus",
      "sleeveBend"
    ],
    advanced: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "backNeckCutout",
      "frontArmholeDeeper",
      "shoulderSlopeReduction",
      "sleevecapHeight",
      "sleevecapEase"
    ]
  }
};
