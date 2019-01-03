import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import path from "path";
import { name, version, description, author, license } from "./package.json";

export default {
  input: "src/index.js",
  plugins: [
    resolve({
      browser: true
    }),
    json(),
    babel({
      exclude: "node_modules/**"
    })
    //terser({
    //  output: {
    //    preamble: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
    //  }
    //})
  ],
  external: ["freesewing", "@freesewing/plugin-bundle"],
  output: {
    globals: {
      freesewing: "freesewing",
      "@freesewing/plugin-bundle": "freesewing.plugins.bundle"
    }
  }
};
