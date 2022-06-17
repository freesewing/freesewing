// This file is auto-generated.
// Changes you make will be overwritten.
import chai from 'chai'
import models from '@freesewing/models'
import patterns from '@freesewing/pattern-info'
import Sandy from './dist/index.mjs'

// Shared tests
import { testPatternConfig } from '../../../tests/patterns/config.mjs'
import { testPatternDrafting } from '../../../tests/patterns/drafting.mjs'
import { testPatternSampling } from '../../../tests/patterns/sampling.mjs'

const expect = chai.expect


// Test config
testPatternConfig(
  'sandy',
  new Sandy(),
  expect,
  models,
  patterns
)

// Test drafting
testPatternDrafting(
  'sandy',
  Sandy,
  expect,
  models,
  patterns
)

// Test sampling
testPatternSampling(
  'sandy',
  Sandy,
  expect,
  models,
  patterns
)
