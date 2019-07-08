import { version } from "../package.json";

export default {
  name: "benjamin",
  version: version,
  design: "Wouter Van Wageningen",
  code: "Wouter Van Wageningen",
  department: "accessories",
  type: "pattern",
  difficulty: 3,
  tags: ["top", "basics"],
  optionGroups: {
    fit: ["collarEase", "adjustmentRibbon"],
    style: ["tipWidth", "knotWidth", "bowLength", "bowStyle", "endStyle"]
  },
  measurements: ["neckCircumference"],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["base"],
  options: {
    transitionLength: 0.7, // 70% of bandLength
    bandLength: {
      pct: 17,
      min: 15,
      max: 20
    },
    ribbonWidth: {
      pct: 6,
      min: 4,
      max: 8
    },
    tipWidth: {
      pct: 15,
      min: 5,
      max: 20
    },
    knotWidth: {
      pct: 7,
      min: 6,
      max: 9
    },
    bowLength: {
      pct: 28,
      min: 23,
      max: 33
    },
    collarEase: {
      pct: 3,
      min: 0,
      max: 6
    },
    bowStyle: {
      dflt: "butterfly",
      list: ["diamond", "butterfly", "square", "widesquare"]
    },
    endStyle: {
      dflt: "straight",
      list: ["straight", "pointed", "rounded"]
    },
    adjustmentRibbon: { bool: false }
  }
};
