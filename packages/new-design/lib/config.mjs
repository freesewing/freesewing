import { version } from '../data.mjs'
import { downloads } from './download-list.mjs'

export const config = {
  // Whether we're publishing next or latest tags
  tag: 'next',
  // Minimum node version
  node: 18,
  // Site to download from
  fileUri: 'https://raw.githubusercontent.com',
  // Repository to download from
  repo: process.env.FS_REPO || 'freesewing/freesewing',
  // Branch to download from
  branch: process.env.FS_BRANCH || `v${version}`,
  i18n: [
    'account',
    'common',
    'patrons',
    'themes',
    'workbench',
    'errors',
    'i18n',
    'sde',
    'measurements',
    'optiongroups',
    'o_bella',
    'o_bent',
    'o_breanna',
    'o_brian',
    'o_titan',
    'parts',
    'plugin',
    'settings',
    'welcome',
  ],
  gitignore: `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules

# builds
dist
.next

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

`,
  fetch: {
    // account:
    // sets
    // shared
    // control
    config: [
      {
        from: 'measurements.mjs',
        to: 'shared/config/measurements.mjs',
      },
      {
        from: 'social.mjs',
        to: 'shared/config/social.mjs',
      },
      {
        from: 'roles.mjs',
        to: 'shared/config/roles.mjs',
      },
    ],
    sites: [
      // Mock MDX components
      ...[
        'highlight',
        'youtube',
        'read-more',
        'tabbed-example',
        'http',
        'legend',
        'docs-helpers',
      ].map((file) => ({
        from: `sde/mock/${file}.mjs`,
        to: `shared/components/mdx/${file}.mjs`,
      })),
      // .env file
      {
        from: 'sde/env.local',
        to: 'sde/.env.local',
      },
      ...downloads.sites,
    ],
    packages: downloads.pkgs.map((file) => ({
      from: file,
      to: `pkgs/${file}`,
    })),
  },
}

console.log(config.fetch.pkgs)
