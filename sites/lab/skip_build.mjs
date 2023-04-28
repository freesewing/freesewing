import { shouldSkipBuild } from '../../scripts/skip-build-base.mjs'

const triggerFolders = [
  '../shared',
  '../../plugins',
  '../../designs',
  '.',
  '../../packages/core',
].join(' ')

shouldSkipBuild('Lab', triggerFolders)
