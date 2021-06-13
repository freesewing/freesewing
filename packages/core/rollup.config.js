import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { name, version, description, author, license } from './package.json'

const banner = `/**\n * ${name} | v${version}\n * ${description}\n * (c) ${new Date().getFullYear()} ${author}\n * @license ${license}\n */`

export default {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    {
      banner,
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
      exports: 'default'
    },
    {
      banner,
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
  ]
}
