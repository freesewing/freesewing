import { prebuildRunner } from '../shared/prebuild/runner.mjs'

/*
 * This handles the prebuild step for FreeSewing.org
 * It runs via an NPM run script, so in a pure NodeJS context
 */
prebuildRunner({
  /*
   * Pass the site to the runner
   */
  site: 'org',

  /*
   * This prebuild config determines which prebuild step to run
   * For each step, the options are:
   *
   *  - true:               Always run
   *  - false:              Never run
   *  - 'productionOnly':   Run in production, mock or skip in develop to save time
   *
   */
  prebuild: {
    // ALWAYS PREBUILD ////////////////////////////////////////////////////////

    /*
     * Always prebuild the designs
     */
    designs: true,

    /*
     * Always prebuild the MDX documentation
     */
    docs: true,

    /*
     * Always prebuild the MDX posts
     */
    posts: true,

    /*
     * Always prebuild the translation files
     * Even if we only support English on FreeSewing.dev,
     * we still rely on the (English) translation of strings
     */
    i18n: true,

    /*
     * Always prebuild the navigation object (sitenav) and slug lookup tables (sluglut)
     */
    navigation: true,

    // PREBUILD IN PRUDUCTION - MOCK/SKIP IN DEV ///////////////////////////////

    /*
     * Only prebuild the contributor info in production
     * Will be mocked in development mode to save time
     */
    contributors: 'productionOnly',

    /*
     * Only prebuild the crowdin info (translation statistics) in production
     * Will be mocked in development mode to save time
     */
    crowdin: 'productionOnly',

    /*
     * Only prebuild the favicon files in production
     * Will be mocked in development mode to save time
     */
    favicon: 'productionOnly',

    /*
     * Only prebuild the git author info in production
     * Will be mocked in development mode to save time
     */
    git: 'productionOnly',

    /*
     * Only prebuild the Open Graph (og) images in production
     * Will be skipped in development mode to save time
     */
    ogImages: 'productionOnly',

    /*
     * Only prebuild the patron info in production
     * Will be mocked in development mode to save time
     */
    patrons: 'productionOnly',
  },
})
