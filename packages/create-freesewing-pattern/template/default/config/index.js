import { version } from "../package.json";

// ?? 🤔 ?? --> https://{{language}}.freesewing.dev/packages/core/config

export default {
  name: "{{name}}",
  version,
  design: "{{author}}",
  code: "{{author}}",
  department: "{{department}}",
  type: "{{type}}",
  difficulty: 3,
  tags: [
    "freesewing",
    "design",
    "diy",
    "fashion",
    "made to measure",
    "parametric design",
    "{{type}}",
    "sewing",
    "sewing pattern"
  ],
  optionGroups: {
    fit: ["size"]
  },
  measurements: [],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["box"],
  options: {
    size: { pct: 50, min: 10, max: 100 }
  }
};
