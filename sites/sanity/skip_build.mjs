import { shouldSkipBuild } from '../../scripts/skip-build-base.mjs'
import process from 'node:process'

// For now, never build CMS
process.exit(0)

shouldSkipBuild('Sanity', '.')
