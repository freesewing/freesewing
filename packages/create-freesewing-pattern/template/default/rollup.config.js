import url from '@rollup/plugin-url'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { name, version, description, author, license } from './package.json'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'default'
    }
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      modules: true
    }),
    url({ exclude: ['**/*.svg'] }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({ browser: true }),
    json(),
    commonjs(),
    terser({
      output: {
        preamble: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
      }
    })
  ]
}
