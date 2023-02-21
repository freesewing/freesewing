import { shouldSkipBuild } from '../../scripts/skip-build-base.mjs'

const triggerFolders = ['../shared', '../../plugins', '../../designs', '.'].join(' ')

shouldSkipBuild('Lab', triggerFolders)
