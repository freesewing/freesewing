import { prebuildRunner } from '../shared/prebuild/runner.mjs'

/*
 * This handles the prebuild step for FreeSewing.dev
 * It runs via an NPM run script, so in a pure NodeJS context
 *
 * See the org or dev site for an example with inline-comments
 */
prebuildRunner({
  site: 'sde',
  prebuild: {
    // Always prebuild
    i18n: true,
    navigation: true,
    designs: true,
    // Never prebuild
    favicon: false,
    ogImages: false,
    docs: false,
    contributors: false,
    crowdin: false,
    git: false,
    patrons: false,
    posts: false,
  },
})
