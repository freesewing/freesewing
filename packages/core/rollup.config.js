import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { name, version, description, author, license } from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
      exports: 'default'
    },
    {
      file: 'tests/dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    resolve(),
    json(),
    commonjs(),
    terser({
      output: {
        preamble: `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`
      }
    })
  ]
}
