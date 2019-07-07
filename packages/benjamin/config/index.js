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
  parts: ["front"],
  options: {
    tipWidth: {
      mm: 65,
      min: 24,
      max: 80
    },
    knotWidth: {
      mm: 30,
      min: 24,
      max: 40
    },
    bowLength: {
      mm: 120,
      min: 100,
      max: 140
    },
    collarEase: {
      mm: 15,
      min: 0,
      max: 15
    },
    bowStyle: {
      dflt: "butterfly",
      list: ["diamond", "butterfly", "square", "widesquare"]
    },
    endStyle: {
      dflt: "straight",
      list: ["straight", "pointed", "rounded"]
    },
    adjustmentRibbon: {
      dflt: "0",
      list: ["0", "1"]
    }
  }
};
