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
    './src/Blockquote/index.js',
    './src/Draft/index.js',
    './src/DraftConfigurator/index.js',
    './src/Example/index.js',
    './src/Icon/index.js',
    './src/Legend/index.js',
    './src/LineDrawing/index.js',
    './src/Logo/index.js',
    './src/Robot/index.js',
    './src/SampleConfigurator/index.js',
    './src/Spinner/index.js',
    './src/withGist/index.js',
    './src/withLanguage/index.js',
    './src/withStorage/index.js',
    './src/Workbench/index.js',
  ],
  external: [
    "@freesewing",
    "react",
    "react-dom",
    "react-intl",
    "@material-ui",
    "axios",
    "babel",
    "prismjs",
    "react-markdown",
    "file-saver",
    "yaml",
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
