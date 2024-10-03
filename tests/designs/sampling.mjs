import { adult, doll, giant } from '@freesewing/models'
import { getShortName, isUtilityDesign } from './config.mjs'
import { expect } from 'chai'

// Some patterns are deprecated and won't support more stringent doll/giant tests
const deprecated = ['theo']

/*
 * This runs unit tests for pattern sampling
 * It expects the following:
 *
 * @param object Pattern: Pattern constructor
 * @param boolean log: Set to true to log errors
 */
export const testPatternSampling = (Pattern, log = false) => {
  const config = Pattern.patternConfig
  const design = getShortName(Pattern.designConfig.data.name)
  //const parts = pattern.getPartList()

  // Helper method to try/catch pattern sampling
  const doesItSample = (pattern, log = false) => {
    try {
      pattern.sample().render()
      if (log === 'always') {
        console.log(pattern.store.logs)
        console.log(pattern.setStores[pattern.activeSet].logs)
      }
      if (
        pattern.store.logs.error.length < 1 &&
        pattern.setStores[pattern.activeSet].logs.error.length < 1
      ) {
        return true
      }
      if (log && log !== 'always') {
        console.log(pattern.settings[pattern.activeSet])
        console.log(pattern.store.logs)
        console.log(pattern.setStores[pattern.activeSet].logs)
      }

      return false
    } catch (err) {
      if (log && log !== 'always') {
        console.log(pattern.settings[pattern.activeSet])
        console.log(err)
        console.log(pattern.store.logs)
        console.log(pattern.setStores[pattern.activeSet].logs)
      }

      return false
    }
  }

  const doesItDraftAndRender = (pattern, log = false) => {
    try {
      pattern.draft().render()
      if (log) {
        console.log(pattern.store.logs)
        console.log(pattern.setStores[0].logs)
      }
      if (pattern.store.logs.error.length < 1 && pattern.setStores[0].logs.error.length < 1)
        return true
      return false
    } catch (err) {
      if (log) console.log(err)

      return false
    }
  }

  if (!isUtilityDesign(design)) {
    /*
     * Sample different measurements
     */
    describe('Sample measurements:', () => {
      for (const measurement of config.measurements || []) {
        it(`  Sample ${measurement}:`, () => {
          expect(
            doesItSample(
              new Pattern({
                sample: {
                  type: 'measurement',
                  measurement,
                },
                measurements: adult.cisFemale['36'],
              }),
              log
            )
          ).to.equal(true)
        })
      }
    })

    /*
     * Sample different options
     */
    describe('Sample options:', () => {
      let hasSampledCoreSettings = false
      for (const option in config.options) {
        let saValues = [0, 10]
        let paperlessValues = [false, true]
        let completeValues = [true, false]
        if (option.list || option.bool) {
          hasSampledCoreSettings = true
        } else {
          // Performance optimization:
          // sample different sa and paperless/complete settings only for options,
          // which likely change the pattern structure (e.g. enable/disable parts).
          // These are 'list' and 'bool' options.
          // The hasSampledCoreSettings variable is used to ensure that all variants are tested at least once,
          // even if no such options are present.
          saValues = [0]
          paperlessValues = [false]
          completeValues = [true]
        }
        for (const sa of saValues) {
          for (const complete of completeValues) {
            for (const paperless of paperlessValues) {
              if (typeof config.options[option] === 'object') {
                it(`  Sample ${option} with sa:${sa} complete:${complete} paperless:${paperless}`, () => {
                  expect(
                    doesItSample(
                      new Pattern({
                        sample: {
                          type: 'option',
                          option,
                        },
                        measurements: adult.cisFemale['36'],
                        sa: sa,
                        complete: complete,
                        paperless: paperless,
                      }),
                      log
                    )
                  ).to.equal(true)
                })
              }
            }
          }
        }
      }
      if (!hasSampledCoreSettings) {
        // test core settings without sampling a specific option
        let saValues = [0, 10]
        let paperlessValues = [false, true]
        let completeValues = [true, false]
        for (const sa of saValues) {
          for (const complete of completeValues) {
            for (const paperless of paperlessValues) {
              it(`  Draft sa:${sa} complete:${complete} paperless:${paperless}`, () => {
                expect(
                  doesItDraftAndRender(
                    new Pattern({
                      measurements: adult.cisFemale['36'],
                      sa: sa,
                      complete: complete,
                      paperless: paperless,
                    }),
                    log
                  )
                ).to.equal(true)
              })
            }
          }
        }
      }
    })

    /*
     * Sample pattern for different models
     */
    describe(`Sample human measurements:`, () => {
      for (const type of ['cisFemale', 'cisMale']) {
        it(`Sample pattern for adult ${type} size range:`, () => {
          expect(
            doesItSample(
              new Pattern({
                sample: {
                  type: 'models',
                  models: adult[type],
                },
              }),
              log
            )
          ).to.equal(true)
        })
      }
    })

    if (deprecated.indexOf(design) === -1) {
      /*
       * Sample pattern for doll & giant
       */
      for (const family of ['doll', 'giant']) {
        describe(`Sample ${family} measurements:`, () => {
          for (const type of ['cisFemale', 'cisMale']) {
            it(`Sample pattern for ${family} ${type} size range:`, () => {
              expect(
                doesItSample(
                  new Pattern({
                    sample: {
                      type: 'models',
                      models: family === 'doll' ? doll[type] : giant[type],
                    },
                  }),
                  log
                )
              ).to.equal(true)
            })
          }
        })
      }
    }
  }
}
