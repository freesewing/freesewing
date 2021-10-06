import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { main, name, version, description, author, license } from './package.json'
import yaml from 'rollup-plugin-yaml'

const banner = `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    peerDepsExternal(),
    resolve({ modulesOnly: true }),
    json(),
    yaml(),
  ]
}
