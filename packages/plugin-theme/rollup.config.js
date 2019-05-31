import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import sass from "rollup-plugin-sass";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import {
  version,
  name,
  description,
  author,
  license,
  main,
  module
} from "./package.json";
import fs from "fs";

export default {
  input: "src/index.js",
  output: [
    {
      file: main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    json(),
    babel({
      exclude: "node_modules/**"
    }),
    sass({
      output(styles, styleNodes) {
        fs.writeFileSync(
          "./src/bundle.css.js",
          "export default `" + styles + "`;"
        );
      }
    }),
    terser({
      output: {
        preamble: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
      }
    })
  ]
};
