import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import minify from "rollup-plugin-babel-minify";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { name, version, description, author, license } from "./package.json";
import utils from "./src/index.js";

const createConfig = (util, module) => {
  return {
    input: `./src/${util + "/"}index.js`,
    output: {
      file: `./${util}/index` + (module ? ".mjs" : ".js"),
      format: module ? "es" : "cjs",
      sourcemap: true
    },
    plugins: [
      peerDepsExternal(),
      resolve({ modulesOnly: true }),
      json(),
      babel({
        exclude: "node_modules/**",
        plugins: ["@babel/plugin-proposal-object-rest-spread"]
      }),
      minify({
        comments: false,
        sourceMap: true,
        banner: `/**\n * ${name}/${util} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
      })
    ]
  };
};

const config = [];
for (let util of utils) {
  config.push(createConfig(util, false));
  // Webpack doesn't handle .mjs very well
  //config.push(createConfig(util, true));
}
export default config;
