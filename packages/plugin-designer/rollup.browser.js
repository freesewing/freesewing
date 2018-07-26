import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import meta from "./package.json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/browser.js",
    format: "iife",
    name: "freesewing.plugins.designer"
  },
  plugins: [
    resolve({
      browser: true
    }),
    json(),
    commonjs(),
    babel({
      exclude: "node_modules/**"
    }),
    terser({
      output: {
        preamble: `/**\n * ${meta.name} | v${meta.version}\n * ${
          meta.description
        }\n * (c) ${new Date().getFullYear()} ${meta.author}\n * @license ${
          meta.license
        }\n */`
      }
    })
  ]
};
