const Mocha = require('mocha')
const { EVENT_TEST_FAIL } = Mocha.Runner.constants

// This output very little info and is intended for CI runs
class TerseReporter {
  constructor(runner) {
    runner.on(EVENT_TEST_FAIL, (test, err) => {
      console.log(` FAIL: ${test.fullTitle()}`)
      console.log(err)
    })
  }
}

module.exports = TerseReporter
