// This file is auto-generated | Any changes you make will be overwritten.
import { Holmes, i18n } from '../src/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/designs/config.mjs'
import { testPatternI18n } from '../../../tests/designs/i18n.mjs'
import { testPatternDrafting } from '../../../tests/designs/drafting.mjs'
import { testPatternSampling } from '../../../tests/designs/sampling.mjs'

// Test config
testPatternConfig(Holmes)

// Test translation
testPatternI18n(Holmes, i18n)

// Test drafting - Change the second parameter to `true` to log errors
testPatternDrafting(Holmes, false)

// Test sampling - Change the second parameter to `true` to log errors
testPatternSampling(Holmes, false)
