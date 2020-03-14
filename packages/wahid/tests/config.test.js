// This file is auto-generated.
// Changes you make will be overwritten.
const expect = require("chai").expect;
const models = require("@freesewing/models")
const patterns = require("@freesewing/pattern-info")

const Wahid  = require('../dist')
const testPatternConfig = require('../../../tests/patterns/config')

// Test config
testPatternConfig(
  'wahid',
  new Wahid(),
  expect,
  models,
  patterns
)
