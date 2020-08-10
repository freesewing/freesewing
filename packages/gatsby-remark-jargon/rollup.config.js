import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { main, module, name, version, description, author, license } from './package.json'

const output = [
  {
    file: main,
    format: 'cjs',
    sourcemap: true,
    exports: 'default'
  }
]
if (typeof module !== 'undefined')
  output.push({
    file: module,
    format: 'es',
    sourcemap: true,
    exports: 'default'
  })

export default {
  input: 'src/index.js',
  output,
  external: ['remark-jargon'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    json(),
    terser({
      output: {
        preamble: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
      }
    })
  ]
}
