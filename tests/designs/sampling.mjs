import { nonHumanMeasurements } from './non-human-measurements.mjs'
import { withBreasts, withoutBreasts } from '@freesewing/models'
import chai from 'chai'

const expect = chai.expect
const models = {withBreasts, withoutBreasts}
/*
 * This runs unit tests for pattern sampling
 * It expects the following:
 *
 * @param string me: Name of the pattern (eg 'aaron')
 * @param object Pattern: pattern constructor
 * @param boolean log: Set to true to log errors
 */

// Some patterns are deprecated and won't support more stringent doll/giant tests
const deprecated = ['theo']

export const testPatternSampling = (design, Pattern, log=false) => {
  // Load non-human measurements
  const nonHuman = nonHumanMeasurements(models)

  // Helper method to try/catch pattern sampling
  const doesItSample = (pattern, log=false) => {
    try {
      pattern.sample()
      if (pattern.events.error.length < 1) return true
      if (log) console.log(pattern.events.error)
      return false
    }
    catch (err) {
      if (log) console.log(err)
      return false
    }
  }

  // FIXME: Always use breasts for now
  const breasts = true

  const ourModels = models
    [breasts ? 'withBreasts' : 'withoutBreasts']
  const measurements = ourModels
    [breasts ? 'size34' : 'size42']

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample different measurements
     */
    it('Sample different measurements:' , () => true)
    for (let measurement of Pattern.config.measurements || []) {
      it(`  Sample ${measurement}:` , () => {
        expect(doesItSample(new Pattern({
          sample: {
            type: 'measurement',
            measurement
          },
          measurements
        }), log)).to.equal(true)
      })
    }
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample different options
     */
    it('Sample different options:' , () => true)
    for (let option in Pattern.config.options) {
      if (typeof Pattern.config.options[option] === 'object') {
      it(`  Sample ${option}:` , () => {
        expect(doesItSample(new Pattern({
          sample: {
            type: 'option',
            option
          },
          measurements
        }), log)).to.equal(true)
      })
      }
    }
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample pattern for different models
     */
    it('Sample pattern for size range:' , () => {
      expect(doesItSample(new Pattern({
        sample: {
          type: 'models',
          models: ourModels,
        },
        measurements
      }), log)).to.equal(true)
    })
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    if (deprecated.indexOf(design) === -1) {
      /*
       * Sample pattern for dolls & giants
       */
      for (const type of ['dolls', 'giants']) {
        it(`Sample pattern for ${type}:` , () => {
          expect(doesItSample(new Pattern({
            sample: {
              type: 'models',
              models: nonHuman[breasts ? 'withBreasts' : 'withoutBreasts'][type]
            },
            measurements
          }), log)).to.equal(true)
        })
      }
    }
  }

}

