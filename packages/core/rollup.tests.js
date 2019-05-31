import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";

export default {
  input: "src/index.js",
  output: [
    {
      file: "tests/dist/index.js",
      format: "cjs",
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
    })
  ]
};
