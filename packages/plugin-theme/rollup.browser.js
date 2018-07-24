import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/theme.min.js",
    format: "iife",
    name: "freesewing_theme_default",
    banner: `/**\n * Freesewing\n * (c) ${new Date().getFullYear()} Joost De Cock\n * @license MIT\n */`
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
    terser()
  ]
};
