import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js'
, output: {
    file: 'dist/_bundle.js'
  , format: 'iife'
  , name: 'freesewing'
  }
, plugins: [
    resolve({
      browser: true
    })
  , babel({
      exclude: 'node_modules/**'
    })
  , terser()
  ]
};
