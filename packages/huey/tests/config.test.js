// This file is auto-generated.
// Changes you make will be overwritten.
const expect = require("chai").expect;
const models = require("@freesewing/models")
const patterns = require("@freesewing/pattern-info")

const Huey  = require('../dist')
const testPatternConfig = require('../../../tests/patterns/config')

// Test config
testPatternConfig(
  'huey',
  new Huey(),
  expect,
  models,
  patterns
)
