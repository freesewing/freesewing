/*
 * This runs unit tests for pattern sampling
 * It expects the following:
 *
 * @param string me: Name of the pattern (eg 'aaron')
 * @param object Pattern: pattern constructor
 *
 * @param object expect: Imported chai.expect
 * @param object models: Imported @freesewing/models
 * @param object patterns: Imported @freesewing/pattern-info
 */
const testPatternSampling = (design, Pattern, expect, models, patterns) => {

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

  // Figure out whether this is a with(out)breasts pattern
  const breasts = (patterns.withBreasts.indexOf(design) === -1) ? false : true

  const ourModels = models
    [breasts ? 'withBreasts' : 'withoutBreasts']
  const measurements = ourModels
    [breasts ? 'size34' : 'size42']

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample different measurements
     */
    it('Sample different measurements:' , () => true)
    for (let measurement of Pattern.config.measurements) {
      it(`  Sample ${measurement}:` , () => {
        expect(doesItSample(new Pattern({
          sample: {
            type: 'measurement',
            measurement
          },
          measurements
        }))).to.equal(true)
      })
    }
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample different options
     */
    it('Sample different options:' , () => true)
    for (let option in Pattern.config.options) {
      it(`  Sample ${option}:` , () => {
        expect(doesItSample(new Pattern({
          sample: {
            type: 'option',
            option
          },
          measurements
        }))).to.equal(true)
      })
    }
  }

  if (['rendertest', 'tutorial', 'examples'].indexOf(design) === -1) {
    /*
     * Sample pattern for different models
     */
    it('Sample pattern for different models:' , () => {
      expect(doesItSample(new Pattern({
        sample: {
          type: 'models',
          models: ourModels,
        },
        measurements
      }))).to.equal(true)
    })
  }

}

module.exports = testPatternSampling
