// This file is auto-generated | Any changes you make will be overwritten.
import { Benjamin } from './dist/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/designs/config.mjs'
import { testPatternDrafting } from '../../../tests/designs/drafting.mjs'
//import { testPatternSampling } from '../../../tests/designs/sampling.mjs'

// Test config
testPatternConfig(Benjamin)

// Test drafting - Change the second parameter to `true` to log errors
testPatternDrafting(Benjamin, false)

// Test sampling - Change the second parameter to `true` to log errors
//testPatternSampling(Benjamin, false)
