// This file is auto-generated.
// Changes you make will be overwritten.
import chai from 'chai'
import models from '@freesewing/models'
import patterns from '@freesewing/pattern-info'
import Yuri from './dist/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/patterns/config.mjs'
import { testPatternDrafting } from '../../../tests/patterns/drafting.mjs'
import { testPatternSampling } from '../../../tests/patterns/sampling.mjs'

const expect = chai.expect


// Test config
testPatternConfig(
  'yuri',
  new Yuri(),
  expect,
  models,
  patterns
)

// Test drafting
testPatternDrafting(
  'yuri',
  Yuri,
  expect,
  models,
  patterns
)

// Test sampling
testPatternSampling(
  'yuri',
  Yuri,
  expect,
  models,
  patterns
)
