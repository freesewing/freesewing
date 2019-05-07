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
    size: ["width"],
    content: ["colors", "circles", "text", "snippets", "macros"]
  },
  measurements: [],
  dependencies: {},
  parts: ["test"],
  inject: {},
  hide: [],
  options: {
    width: { mm: 200, min: 50, max: 500 },
    colors: { bool: true },
    circles: { bool: true },
    text: { bool: true },
    snippets: { bool: true },
    macros: { bool: true }
  }
};
