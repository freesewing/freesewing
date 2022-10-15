/* This script will build the package with esbuild */
import esbuild from 'esbuild'
import pkg from './package.json' assert { type: 'json' }

// Create banner based on package info
const banner = `/**
 * ${pkg.name} | v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

// Let esbuild generate the build
;(async () => {
  const result = await esbuild
    .build({
      banner: { js: banner },
      bundle: true,
      entryPoints: ['index.mjs'],
      format: 'esm',
      outfile: 'dist/index.mjs',
      external: [],
      metafile: process.env.VERBOSE ? true : false,
      minify: process.env.NO_MINIFY ? false : true,
      sourcemap: true,
      platform: 'node',
    })
    .catch(() => process.exit(1))

  if (process.env.VERBOSE) {
    const info = await esbuild.analyzeMetafile(result.metafile)
    console.log(info)
  }
})()
