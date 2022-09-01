import designs from "../../config/software/designs.json" assert { type: 'json' }
import { adults, dolls, giants } from '@freesewing/models'
import { getFamily } from './config.mjs'
import chai from 'chai'

const expect = chai.expect

// Some patterns are deprecated and won't support more stringent doll/giant tests
const deprecated = ['theo']

/*
 * This runs unit tests for pattern sampling
 * It expects the following:
 *
 * @param object Pattern: Pattern constructor
 * @param boolean log: Set to true to log errors
 */
export const testPatternSampling = (Pattern, log=false) => {

  const pattern = new Pattern()
  const config = pattern.getConfig()
  const design = pattern.config.data.name
  const family = getFamily(design)
  const parts = pattern.getPartList()

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

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample different measurements
     */
    describe('Sample measurements:' , () => {
      for (const measurement of config.measurements || []) {
        it(`  Sample ${measurement}:` , () => {
          expect(doesItSample(new Pattern({
            sample: {
              type: 'measurement',
              measurement
            },
            measurements: adults.sheher["36"]
          }), log)).to.equal(true)
        })
      }
    })
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample different options
     */
    describe('Sample options:' , () => {
      for (const option in Pattern.config.options) {
        if (typeof Pattern.config.options[option] === 'object') {
        it(`  Sample ${option}:` , () => {
          expect(doesItSample(new Pattern({
            sample: {
              type: 'option',
              option
            },
            measurements: adults.sheher["36"]
          }), log)).to.equal(true)
        })
        }
      }
    })
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample pattern for different models
     */
    describe(`Sample humans:` , () => {
      for (const type of ['sheher', 'hehim']) {
        it(`Sample pattern for adults ${type} size range:` , () => {
          expect(doesItSample(new Pattern({
            sample: {
              type: 'models',
              models: adults[type],
            },
          }), log)).to.equal(true)
        })
      }
    })
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    if (deprecated.indexOf(design) === -1) {
      /*
       * Sample pattern for dolls & giants
       */
      for (const family of ['dolls', 'giants']) {
        describe(`Sample ${family}:` , () => {
          for (const type of ['sheher', 'hehim']) {
            it(`Sample pattern for ${family} ${type} size range:` , () => {
              expect(doesItSample(new Pattern({
                sample: {
                  type: 'models',
                  models: family === 'dolls'
                    ? dolls[type]
                    : giants[type]
                },
              }), log)).to.equal(true)
            })
          }
        })
      }
    }
  }
}

