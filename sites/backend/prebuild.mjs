import { prebuildRunner } from '../shared/prebuild/runner.mjs'

/*
 * This handles the prebuild step for the FreeSewing backend
 * It runs via an NPM run script, so in a pure NodeJS context
 *
 * See `sites/org/prebuild.mjs` for an example with inline comments
 */
prebuildRunner({
  site: 'backend',
  prebuild: {
    i18n: true,
  },
})
