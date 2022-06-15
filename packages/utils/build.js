/* This script will build the various components with esbuild */
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
  entryPoints: [
    './src/backend/index.js',
    './src/camelCase/index.js',
    './src/capitalize/index.js',
    './src/cloneObject/index.js',
    './src/convertSize/index.js',
    './src/defaultGist/index.js',
    './src/defaultSa/index.js',
    './src/formatImperial/index.js',
    './src/formatMm/index.js',
    './src/isDegMeasurement/index.js',
    './src/measurementAsMm/index.js',
    './src/measurementDiffers/index.js',
    './src/neckstimate/index.js',
    './src/optionDefault/index.js',
    './src/optionType/index.js',
    './src/roundMm/index.js',
    './src/roundMmDown/index.js',
    './src/roundMmUp/index.js',
    './src/sliderStep/index.js',
    './src/smallestImperialStep/index.js',
    './src/storage/index.js',
    './src/tiler/index.js',
    './src/validateEmail/index.js',
    './src/validateTld/index.js',
  ],
  external: [
    "@freesewing",
    "axios",
  ],
  format: 'cjs',
  metafile: process.env.VERBOSE ? true : false,
  minify: process.env.NO_MINIFY ? false : true,
  loader: { '.js': 'jsx' },
  outdir: './',
  sourcemap: true,
}


// Let esbuild do its thing
// Only generating CJS since this will be dropped in v3
let result
(async () => {
  result = await esbuild
  .build(options)
  .catch(() => process.exit(1))

  if (process.env.VERBOSE) {
    const info = await esbuild.analyzeMetafile(result.metafile)
    console.log(info)
  }
})()
