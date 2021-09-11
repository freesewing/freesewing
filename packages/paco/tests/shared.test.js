// This file is auto-generated.
// Changes you make will be overwritten.
const expect = require("chai").expect;
const models = require("@freesewing/models")
const patterns = require("@freesewing/pattern-info")

const Paco  = require('../dist')

// Shared tests
const testPatternConfig = require('../../../tests/patterns/config')
const testPatternDrafting = require('../../../tests/patterns/drafting')
const testPatternSampling = require('../../../tests/patterns/sampling')

// Test config
testPatternConfig(
  'paco',
  new Paco(),
  expect,
  models,
  patterns
)

// Test drafting
testPatternDrafting(
  'paco',
  Paco,
  expect,
  models,
  patterns,
  true
)

// Test sampling
testPatternSampling(
  'paco',
  Paco,
  expect,
  models,
  patterns
)
