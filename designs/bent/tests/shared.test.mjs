// This file is auto-generated.
// Changes you make will be overwritten.
import chai from 'chai'
import models from '@freesewing/models'
import patterns from '@freesewing/pattern-info'
import Bent from './dist/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/patterns/config.mjs'
import { testPatternDrafting } from '../../../tests/patterns/drafting.mjs'
import { testPatternSampling } from '../../../tests/patterns/sampling.mjs'

const expect = chai.expect


// Test config
testPatternConfig(
  'bent',
  new Bent(),
  expect,
  models,
  patterns
)

// Test drafting
testPatternDrafting(
  'bent',
  Bent,
  expect,
  models,
  patterns
)

// Test sampling
testPatternSampling(
  'bent',
  Bent,
  expect,
  models,
  patterns
)
