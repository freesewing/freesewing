/*
 * This runs unit tests for pattern drafting
 * It expects the following:
 *
 * @param string me: Name of the pattern (eg 'aaron')
 * @param object Pattern: pattern constructor
 *
 * @param object expect: Imported chai.expect
 * @param object models: Imported @freesewing/models
 * @param object patterns: Imported @freesewing/pattern-info
 */
const testPatternDrafting = (design, Pattern, expect, models, patterns) => {
  // Helper method to try/catch pattern drafting
  const doesItDraft = (pattern) => {
    try {
      pattern.draft()
      return true
    } catch (err) {
      return false
    }
  }

  // Figure out whether this is a with(out)breasts pattern
  const breasts = patterns.withBreasts.indexOf(design) === -1 ? false : true

  const ourModels = models[breasts ? 'withBreasts' : 'withoutBreasts']
  const measurements = ourModels[breasts ? 'size34' : 'size42']

  /*
   * Draft pattern for different models
   */
  if (['rendertest', 'tutorial', 'examples', 'legend'].indexOf(design) === -1) {
    it('Draft for different models:', () => true)

    for (let size in ourModels) {
      it(`  - Drafting for ${size} (${breasts ? 'with' : 'no'} breasts)`, () => {
        expect(
          doesItDraft(
            new Pattern({
              measurements: ourModels[size]
            })
          )
        ).to.equal(true)
      })
    }
  }

  /*
   * Draft parts individually
   */
  it('Draft parts individually:', () => true)
  let parts
  if (['rendertest', 'tutorial', 'examples', 'legend'].indexOf(design) === -1)
    parts = patterns.parts[design]
  else parts = Pattern.config.parts
  for (let name of parts) {
    it(`  - ${name} should draft on its own`, () => {
      expect(
        doesItDraft(
          new Pattern({
            measurements,
            settings: {
              only: [name]
            }
          })
        )
      ).to.equal(true)
    })
  }
}

module.exports = testPatternDrafting
