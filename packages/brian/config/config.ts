/** Pattern parts */
export const parts = [
  "backBlock",
  "frontBlock",
  "sleeveBlock"
];

/** Requires measurements */
export const measurements = [
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
];

export const options = [

  // Constants
  { "id": "backNeckCutout",          "val": 20,  "type": "constant"},
  { "id": "bicepsEase",              "val": 50,  "type": "constant"},
  { "id": "collarEase",              "val": 15,  "type": "constant"},
  { "id": "frontArmholeExtra",       "val":  5,  "type": "constant"},
  { "id": "shoulderSlopeReduction",  "val":  0,  "type": "constant"},
  { "id": "sleevecapEase",           "val":  5,  "type": "constant"},

  // Measures
  { "id": "bicepsEase",        "val": 50,  "min":  30,  "max":  80 },
  { "id": "chestEase",         "val": 30,  "min": -40,  "max": 160 },
  { "id": "cuffEase",          "val": 45,  "min":   0,  "max": 100 },
  { "id": "lengthBonus",       "val":  0,  "min": -40,  "max": 120 },
  { "id": "sleeveLengthBonus", "val":  0,  "min": -40,  "max":  80 },

  // Percentages
  { "id": "acrossBackFactor",       "val": 96,  "type": "percentage",  "min": 93,  "max": 99 },
  { "id": "armholeDepthFactor",     "val": 50,  "type": "percentage",  "min": 50,  "max": 65 },
  { "id": "sleevecapHeightFactor",  "val": 55,  "type": "percentage",  "min": 35,  "max": 75 }
];
