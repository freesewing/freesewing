import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import minify from "rollup-plugin-babel-minify";
import { name, version, description, author, license } from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    json(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      plugins: ["@babel/plugin-proposal-object-rest-spread"]
    }),
    minify({
      comments: false,
      sourceMap: true,
      banner: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
    })
  ]
};
