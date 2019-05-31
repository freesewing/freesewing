import { version } from "../package.json";

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: "tutorial",
  version,
  design: "joostdecock",
  code: "joostdecock",
  department: "womenswear",
  type: "pattern",
  difficulty: 1,
  tags: [
    "freesewing",
    "design",
    "diy",
    "fashion",
    "made to measure",
    "parametric design",
    "pattern",
    "sewing",
    "sewing pattern"
  ],
  optionGroups: {
    fit: ["neckRatio", "widthRatio", "lengthRatio"],
    box: ["size"]
  },
  measurements: ["headCircumference"],
  inject: {
    step4: "step3",
    step5: "step4",
    step6: "step5",
    step7: "step6",
    step8: "step7",
    step9: "step8",
    step10: "step9",
    step11: "step10"
  },
  parts: ["step1", "step2"],
  options: {
    size: { pct: 50, min: 10, max: 100 },
    neckRatio: { pct: 80, min: 70, max: 90 },
    widthRatio: { pct: 45, min: 35, max: 55 },
    lengthRatio: { pct: 75, min: 55, max: 85 }
  }
};
