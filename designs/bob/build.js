/* This script will build the package with esbuild */
const esbuild = require('esbuild')
const pkg = require('./package.json')

// Create banner based on package info
const banner = `/**
 * ${pkg.name} | v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

// Shared esbuild options
const options = {
  banner: { js: banner },
  bundle: true,
  entryPoints: ['src/index.js'],
  external: ["@freesewing"],
  metafile: process.env.VERBOSE ? true : false,
  minify: process.env.NO_MINIFY ? false : true,
  sourcemap: true,
}

// Different formats
const formats = {
  cjs: "dist/index.js",
  esm: "dist/index.mjs",
}

// Let esbuild generate different formats
let result
(async () => {
  for (const [format, outfile] of Object.entries(formats)) {
    result = await esbuild
    .build({ ...options, outfile, format })
    .catch(() => process.exit(1))
  }

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
