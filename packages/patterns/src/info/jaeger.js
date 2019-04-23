export default {
  name: "jaeger",
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 5,
  tags: ["top", "jacket"],
  parts: [
    "backBase",
    "bentBack",
    "bentBase",
    "bentFront",
    "bentSleeve",
    "bentTopSleeve",
    "bentUnderSleeve",
    "collar",
    "collarstand",
    "front",
    "frontBase",
    "pocket",
    "side",
    "topSleeve",
    "underCollar",
    "underSleeve"
  ],
  optionGroups: {
    fit: [
      "acrossBackFactor",
      "armholeDepthFactor",
      "bicepsEase",
      "centerBackDart",
      "chestEase",
      "collarEase",
      "cuffEase",
      "hipsEase",
      "lengthBonus",
      "shoulderEase",
      "waistEase"
    ],
    sleeves: [
      "sleeveBend",
      "sleeveLengthBonus",
      "sleeveVentLength",
      "sleeveVentWidth"
    ],
    advanced: [
      "backNeckCutout",
      "chestShaping",
      "frontArmholeDeeper",
      "frontDartPlacement",
      "frontOverlap",
      "sideFrontPlacement",
      "shoulderSlopeReduction",
      "sleevecapHeight",
      "sleevecapEase"
    ],
    pockets: [
      "chestPocketDepth",
      "chestPocketWidth",
      "chestPocketPlacement",
      "chestPocketAngle",
      "chestPocketWeltSize",
      "frontPocketPlacement",
      "frontPocketWidth",
      "frontPocketDepth",
      "frontPocketRadius",
      "innerPocketPlacement",
      "innerPocketWidth",
      "innerPocketDepth",
      "innerPocketWeltHeight",
      "pocketFoldover"
    ],
    style: [
      "centerFrontHemDrop",
      "backVent",
      "backVentLength",
      "buttonLength",
      "buttons",
      "frontCutawayAngle",
      "frontCutawayStart",
      "frontCutawayEnd",
      "hemRadius",
      "lapelStart",
      "lapelReduction"
    ],
    collar: [
      "collarSpread",
      "collarHeight",
      "collarNotchDepth",
      "collarNotchAngle",
      "collarNotchReturn",
      "collarRoll",
      "rollLineCollarHeight"
    ]
  }
};
