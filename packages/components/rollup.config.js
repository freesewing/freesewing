import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import minify from "rollup-plugin-babel-minify";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { name, version, description, author, license } from "./package.json";
import components from "./src/index.js";

const createConfig = (component, module) => {
  console.log(component);
  return {
    input: `./src/${component}/index.js`,
    output: {
      file: `dist/${component}/index` + (module ? ".mjs" : ".js"),
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
        banner: `/**\n * ${name}/${component} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
      })
    ]
  };
};

const config = [];
for (let component of components) {
  config.push(createConfig(component, false));
  config.push(createConfig(component, true));
}
console.log(JSON.stringify(config, null, 2));
export default config;
