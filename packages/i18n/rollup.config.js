import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import minify from "rollup-plugin-babel-minify";
import yaml from "rollup-plugin-yaml";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import {
  name,
  version,
  description,
  author,
  license,
  main
} from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: main,
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ modulesOnly: true }),
    commonjs(),
    json(),
    yaml(),
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
