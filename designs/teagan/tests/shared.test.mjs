// This file is auto-generated.
// Changes you make will be overwritten.
import chai from 'chai'
import models from '@freesewing/models'
import patterns from '@freesewing/pattern-info'
import Pattern from './dist/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/patterns/config.mjs'
import { testPatternDrafting } from '../../../tests/patterns/drafting.mjs'
import { testPatternSampling } from '../../../tests/patterns/sampling.mjs'

const expect = chai.expect

// Test config
testPatternConfig(
  "teagan",
  new Pattern(),
  expect,
  models,
  patterns
)

// Test drafting
testPatternDrafting(
  "teagan",
  Pattern,
  expect,
  models,
  patterns
)

// Test sampling
testPatternSampling(
  "teagan",
  Pattern,
  expect,
  models,
  patterns
)
