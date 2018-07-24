import filesize from "rollup-plugin-filesize";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/module.js",
    format: "cjs"
  },
  plugins: [
    resolve({
      browser: false
    }),
    json(),
    babel({
      exclude: "node_modules/**"
    }),
    filesize()
  ]
};
