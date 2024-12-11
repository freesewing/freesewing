// This file is auto-generated | Any changes you make will be overwritten.
import { Sabrina, about, i18n } from '../src/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/designs/config.mjs'
import { testPatternI18n } from '../../../tests/designs/i18n.mjs'
import { testPatternDrafting } from '../../../tests/designs/drafting.mjs'
import { testPatternSampling } from '../../../tests/designs/sampling.mjs'

// Test config
testPatternConfig(Sabrina, about)

// Test translation
testPatternI18n(Sabrina, i18n)

// Test drafting - Change the second parameter to `true` to log errors
testPatternDrafting(Sabrina, false)

// Test sampling - Change the second parameter to `true` to log errors
testPatternSampling(Sabrina, false)
