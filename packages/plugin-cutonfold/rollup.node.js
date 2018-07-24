import filesize from "rollup-plugin-filesize";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import meta from "./package.json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/node.js",
    format: "cjs",
    banner: `/**\n * ${meta.name} | v${meta.version}\n * ${
      meta.description
    }\n * (c) ${new Date().getFullYear()} ${meta.author}\n * @license ${
      meta.license
    }\n */`
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
