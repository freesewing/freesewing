// This file is auto-generated.
// Changes you make will be overwritten.
const expect = require("chai").expect;
const models = require("@freesewing/models")
const patterns = require("@freesewing/pattern-info")

const Teagan  = require('../dist')

// Shared tests
const testPatternConfig = require('../../../tests/patterns/config')
const testPatternDrafting = require('../../../tests/patterns/drafting')
const testPatternSampling = require('../../../tests/patterns/sampling')

// Test config
testPatternConfig(
  'teagan',
  new Teagan(),
  expect,
  models,
  patterns
)

// Test drafting
testPatternDrafting(
  'teagan',
  Teagan,
  expect,
  models,
  patterns
)

// Test sampling
testPatternSampling(
  'teagan',
  Teagan,
  expect,
  models,
  patterns
)
