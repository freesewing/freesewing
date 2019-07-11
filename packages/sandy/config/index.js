import { version } from "../package.json";

export default {
  name: "sandy",
  version,
  design: "Erica Alcusa Sáez",
  code: ["Erica Alcusa Sáez", "Joost De Cock"],
  department: "womenswear",
  type: "pattern",
  difficulty: 3,
  tags: ["skirt", "top", "basics"],
  optionGroups: {
    fit: ["waistbandPosition"],
    style: [
      "lengthBonus",
      "circleRatio",
      "waistbandWidth",
      "waistbandShape",
      "waistbandOverlap",
      "gathering",
      "seamlessFullCircle",
      "hemWidth"
    ]
  },
  measurements: [
    "naturalWaist",
    "naturalWaistToFloor",
    "naturalWaistToHip",
    "hipsCircumference"
  ],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["skirt"],
  options: {
    // Bool
    seamlessFullCircle: { bool: false },

    // Millimeter
    waistbandWidth: { mm: 40, min: 5, max: 150 },

    // Percentages
    waistbandPosition: { pct: 50, min: 0, max: 100 },
    lengthBonus: { pct: 50, min: 10, max: 100 },
    circleRatio: { pct: 50, min: 20, max: 100 },
    waistbandOverlap: { pct: 0, min: 20, max: 100 },
    gathering: { pct: 0, min: 0, max: 200 },
    hemWidth: { pct: 1, min: 0, max: 5 },

    // Lists
    waistbandShape: {
      list: ["straight", "curved"],
      dflt: "straight"
    }
  }
};
