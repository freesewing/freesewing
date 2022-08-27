/* This script will build the package with esbuild */
import esbuild from 'esbuild'
import { version, name, description, author, license } from './package.json' assert { type: 'json' }

// Create banner based on package info
const banner = `/**
 * ${name} | v${version}
 * ${description}
 * (c) ${new Date().getFullYear()} ${author}
 * @license ${license}
 */`

// Shared esbuild options
const options = {
  banner: { js: banner },
  bundle: true,
  entryPoints: ['src/index.mjs'],
  format: 'esm',
  outfile: 'dist/index.mjs',
  external: ["@freesewing"],
  metafile: process.env.VERBOSE ? true : false,
  minify: process.env.NO_MINIFY ? false : true,
  sourcemap: true,
}

// Let esbuild generate the build
let result
(async () => {
  result = await esbuild.build(options).catch(() => process.exit(1))

  if (process.env.VERBOSE) {
    const info = await esbuild.analyzeMetafile(result.metafile)
    console.log(info)
  }

  // Also build a version that has all dependencies bundled
  // This makes it easy to run tests
  await esbuild
  .build({
    ...options,
    minify: false,
    sourcemap: false,
    outfile: 'tests/dist/index.mjs',
    format: 'esm',
    external: [],
  })
  .catch(() => process.exit(1))

})()
