import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import minify from 'rollup-plugin-babel-minify'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { name, version, description, author, license, main, module } from './package.json'

const output = [
  {
    file: main,
    format: 'cjs',
    sourcemap: true
  }
]
if (typeof module !== 'undefined')
  output.push({
    file: module,
    format: 'es',
    sourcemap: true
  })

export default {
  input: 'src/index.js',
  output,
  plugins: [
    peerDepsExternal(),
    resolve({ modulesOnly: true }),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-proposal-object-rest-spread']
    }),
    minify({
      comments: false,
      sourceMap: true,
      banner: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
    })
  ]
}
