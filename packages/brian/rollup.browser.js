import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import path from 'path';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/brian.min.js',
    format: 'iife',
    name: 'freesewing.patterns.brian',
    banner: `/**\n * Freesewing\n * (c) ${new Date().getFullYear()} Joost De Cock\n * @license MIT\n */`,
    globals: {
      freesewing: 'freesewing'
    }
  },
  plugins: [
    resolve({
      browser: true
    }),
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
  ],
  external: [
    'freesewing', path.resolve('./node_modules/freesewing/dist/freesewing.min.js')
  ]
};
