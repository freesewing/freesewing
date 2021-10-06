import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { name, version, description, author, license } from './package.json'
import utils from './src/index.js'

const banner = `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`

const createConfig = (util, module) => {
  return {
    input: `./src/${util + '/'}index.js`,
    output: {
      banner,
      file: `./${util}/index` + (module ? '.mjs' : '.js'),
      format: module ? 'es' : 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      peerDepsExternal(),
      resolve({ modulesOnly: true }),
      json(),
    ]
  }
}

const config = []
for (let util of utils) {
  config.push(createConfig(util, false))
  // Using .mjs causes problems. See #1079
  //config.push(createConfig(util, true));
}
export default config
