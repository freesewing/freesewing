import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import minify from "rollup-plugin-babel-minify";
import { name, version, description, author, license } from "./package.json";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url({ exclude: ["**/*.svg"] }),
    svgr(),
    babel({
      exclude: "node_modules/**"
    }),
    resolve({ browser: true }),
    json(),
    commonjs(),
    minify({
      comments: false,
      sourceMap: true,
      banner: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
    })
  ]
};
