import filesize from 'rollup-plugin-filesize'
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js'
, output: {
    file: 'dist/bundle.js'
  , format: 'cjs'
  }
, plugins: [
    resolve({
      browser: false
    })
  , babel({
      exclude: 'node_modules/**'
    })
  , terser()
  , filesize()
  ]
};
