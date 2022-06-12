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
  //minify: true,
  sourcemap: true,
}

// Different formats
const formats = {
  esm: "dist/index.mjs",
  cjs: "dist/index.js"
}

// Let esbuild generate different formats
for (const [format, outfile] of Object.entries(formats)) esbuild
  .build({ ...options, outfile, format })
  .catch(() => process.exit(1))


