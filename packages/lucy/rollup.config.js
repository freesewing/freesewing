import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { name, version, description, author, license, main, module, rollup } from './package.json'

const banner = `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
const output = [
  {
    banner,
    file: main,
    format: 'cjs',
    sourcemap: true,
    exports: rollup.exports,
  },
]
if (typeof module !== 'undefined')
  output.push({
    banner,
    file: module,
    format: 'es',
    sourcemap: true,
  })

export default {
  input: 'src/index.js',
  output,
  plugins: [peerDepsExternal(), resolve({ modulesOnly: true }), commonjs(), json()],
}
