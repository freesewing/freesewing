/*
|-------------------------------------------------------------------------------
| Development config               https://maizzle.com/docs/environments/#local
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run the `maizzle build` or `maizzle serve` and it
| has the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  baseURL: {
    tags: {
      img: 'https://freesewing.org/',
    },
  },
  build: {
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
    },
  },
  inlineCSS: {
    applySizeAttribute: {
      width: ['IMG'],
    },
  },
  extraAttributes: {
    table: {
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
    },
  },
}
