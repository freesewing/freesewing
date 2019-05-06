import { version } from "../package.json";

export default {
  name: "rendertest",
  version,
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 1,
  tags: ["test"],
  optionGroups: {
    fit: ["width"]
  },
  measurements: [],
  dependencies: {},
  parts: ["colors"],
  inject: {},
  hide: [],
  options: {
    width: { mm: 200, min: 50, max: 500 }
  }
};
