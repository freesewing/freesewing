import { prebuildRunner } from '../shared/prebuild/runner.mjs'
import { prebuildLab } from '../shared/prebuild/lab.mjs'

/*
 * This handles the prebuild step for FreeSewing.dev
 * It runs via an NPM run script, so in a pure NodeJS context
 *
 * See the org or dev site for an example with inline-comments
 */
prebuildRunner({
  site: 'lab',
  prebuild: {
    // Always prebuild
    designs: true,
    i18n: true,
    jargon: true,
    navigation: true,
    // Prebuild in production
    favicon: 'productionOnly',
    ogImages: 'productionOnly',
    // Never prebuild
    docs: false,
    contributors: false,
    crowdin: false,
    git: false,
    patrons: false,
    posts: false,
  },
})

prebuildLab()
