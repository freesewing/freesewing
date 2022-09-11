// This file is auto-generated | Any changes you make will be overwritten.
import { Ursula } from '../src/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/designs/config.mjs'
import { testPatternDrafting } from '../../../tests/designs/drafting.mjs'
//import { testPatternSampling } from '../../../tests/designs/sampling.mjs'

// Test config
testPatternConfig(Ursula)

// Test drafting - Change the second parameter to `true` to log errors
testPatternDrafting(Ursula, false)

// Test sampling - Change the second parameter to `true` to log errors
//testPatternSampling(Ursula, false)
