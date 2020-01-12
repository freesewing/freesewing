const patternTests = require('@freesewing/pattern-tests').allTests

const pattern = require('../dist/')
const pkg = require('../package.json')

patternTests(pattern, pkg)
