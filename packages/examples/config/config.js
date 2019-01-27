import { version } from "../package.json";

export default {
  name: "examples",
  version,
  dependencies: {
    path_attr: "path_clone"
  },
  parts: ["path_attr", "path_clone"]
};
