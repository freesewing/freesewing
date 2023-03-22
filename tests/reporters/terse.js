const Mocha = require('mocha')
const { EVENT_TEST_FAIL, EVENT_RUN_END } = Mocha.Runner.constants

const path = require('path')
const projectRoot = path.normalize(path.join(__dirname, '../..'))
const outputLog = path.join(projectRoot, '.test-failures.log')

const red = function (string) {
  return `\x1b[31m${string}\x1b[0m`
}

const green = function (string) {
  return `\x1b[32m${string}\x1b[0m`
}

const dim = function (string) {
  return `\x1b[2m${string}\x1b[0m`
}

// Mapping of test file name to array of failing tests.
const failuresPerFile = {}

// This output very little info and is intended for CI runs
class TerseReporter {
  constructor(runner) {
    runner.on(EVENT_TEST_FAIL, (test, err) => {
      // output to the console
      console.log(`FAIL: ${test.fullTitle()}`)
      console.error(err)

      // save for adding to an output file
      test.err = err
      failuresPerFile[test.file] = failuresPerFile[test.file] || []
      failuresPerFile[test.file].push(test)
    })

    runner.on(EVENT_RUN_END, () => {
      if (Object.keys(failuresPerFile).length === 0) return

      const fs = require('fs')
      const logger = fs.createWriteStream(outputLog, { flags: 'a' })
      const writeLine = (line) => logger.write(`${line}\n`)

      for (let file in failuresPerFile) {
        const failures = failuresPerFile[file]

        // Remove project root from file path to keep log lines shorter.
        if (file.startsWith(projectRoot)) {
          file = file.substr(projectRoot.length + 1, file.length - projectRoot.length - 1)
        }

        // Print each failure.
        failures.forEach(function (failure, i) {
          const stack = failure.err.stack.split('\n')
          writeLine(`${file}:  ${i + 1}) ${failure.title}:`)
          writeLine(`${file}:`)
          writeLine(`${file}:      ${red(stack[0].trim())}`)
          writeLine(`${file}:      ${green('+ expected')} ${red('- actual')}`)
          writeLine(`${file}:`)
          writeLine(`${file}:      ${red('-' + failure.err.actual)}`)
          writeLine(`${file}:      ${green('+' + failure.err.expected)}`)
          writeLine(`${file}:`)
          stack.slice(1).forEach(function (stackLine) {
            writeLine(`${file}:      ${dim(stackLine.trim())}`)
          })
          if (i < failures.length - 1) {
            writeLine(`${file}:`)
          }
        })
      }

      logger.end()
    })
  }
}

module.exports = TerseReporter
