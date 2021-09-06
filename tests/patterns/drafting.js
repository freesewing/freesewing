// Some patterns are different
const isGarment = design => ([
  'rendertest',
  'tutorial',
  'examples',
  'legend',
].indexOf(design) === -1)

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
  const doesItDraft = (pattern, log=false) => {
    try {
      pattern.draft()
      if (pattern.events.error.length < 1) return true
      if (log) console.log(pattern.events.error)
      return false
    } catch (err) {
      if (log) console.log(err)
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
  if (isGarment(design)) {
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
  let parts = isGarment(design)
    ? patterns.parts[design]
    : Pattern.config.parts
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

  /*
   * Draft a paperless non-detailed pattern
   */
  it('Draft paperless non-detailed pattern:', () => true)
  if (isGarment(design)) {
    for (const sa of [0,10]) {
      it(`  - Drafting paperless non-detailed pattern for size-40 (${breasts ? 'with' : 'no'} breasts) sa: ${sa}`, () => {
        expect(
          doesItDraft(
            new Pattern({
              measurements: ourModels.size40,
              complete: false,
              paperless: true,
              sa,
              settings: {
              complete: false,
              paperless: true,
              sa,
              }
            })
          )
        ).to.equal(true)
      })
    }
  }
}

module.exports = testPatternDrafting
