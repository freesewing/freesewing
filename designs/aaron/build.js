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
  cjs: "js",
  esm: "mjs",
}

// Let esbuild generate different formats
let result
(async () => {
  for (const [format, ext] of Object.entries(formats)) {
    // Regular build
    result = await esbuild
      .build({ ...options, format, outfile: `dist/index.${ext}` })
      .catch(() => process.exit(1))
    // Config build
    await esbuild
      .build({ ...options, format, outfile: `dist/config.${ext}`, entryPoints: ['config/index.js'] })
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
    entryPoints: ['src/index.js'],
    minify: false,
    sourcemap: false,
    outfile: 'tests/dist/index.mjs',
    format: 'esm',
    external: [],
  })
  .catch(() => process.exit(1))

})()
