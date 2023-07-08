import { adult, doll, giant } from '@freesewing/models'
import { getShortName, isUtilityDesign } from './config.mjs'
import chai from 'chai'
import { timingPlugin } from '@freesewing/plugin-timing'

const expect = chai.expect
const ciTimeout = 10000

/*
 * This runs unit tests for pattern drafting
 * It expects the following:
 *
 * @param object Pattern: pattern constructor
 * @param boolean log: Set to true to log errors
 */
export const testPatternDrafting = (Pattern, log = false) => {
  const design = getShortName(Pattern.designConfig.data.name)

  // Helper method to try/catch pattern drafting
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

  /*
   * Draft pattern for different models
   */
  if (!isUtilityDesign(design)) {
    describe('Draft for humans:', function () {
      this.timeout(ciTimeout)
      for (const type of ['cisFemale', 'cisMale']) {
        describe(type, () => {
          for (const size in adult[type]) {
            it(`  - Drafting for size ${size}`, () => {
              expect(
                doesItDraftAndRender(
                  new Pattern({
                    measurements: adult[type][size],
                  }).use(timingPlugin),
                  log
                )
              ).to.equal(true)
            })
          }
        })
      }
    })

    // Do the same for fantastical models (doll, giant)
    const fams = { doll, giant }
    for (const family of ['doll', 'giant']) {
      describe(`Draft for ${family}:`, function () {
        this.timeout(ciTimeout)
        for (const type of ['cisFemale', 'cisMale']) {
          describe(type, () => {
            for (const size in fams[family][type]) {
              it(`  - Drafting at ${size}%`, () => {
                expect(
                  doesItDraftAndRender(
                    new Pattern({
                      measurements: fams[family][type][size],
                    }),
                    log
                  )
                ).to.equal(true)
              })
            }
          })
        }
      })
    }
  } else {
    // Utility pattern - Just draft them once
    // FIXME: This hangs when running all tests, not sure why
    //it(`  - Draft utility pattern`, function() {
    //  this.timeout(5000);
    //  expect(
    //    doesItDraftAndRender(
    //      new Pattern({
    //        measurements: adult.cisFemale[34]
    //      }), log
    //    )
    //  ).to.equal(true)
    //  done()
    //})
  }
}

/*
 * Draft parts individually
 */
/*
  it('Draft parts individually:', () => true)
  for (const name of parts) {
    it(`  - ${name} should draft and render on its own`, () => {
      expect(
        doesItDraftAndRender(
          new Pattern({
            measurements: ourModels.size34,
            only: [name]
          }), log
        )
      ).to.equal(true)
    })
  }
  */

/*
 * Draft a paperless non-detailed pattern
 */
/*
  it('Draft paperless non-detailed pattern:', () => true)
  if (family !== 'utilities') {
    for (const sa of [0,10]) {
      it(`  - Drafting paperless non-detailed pattern for size-40 (${breasts ? 'with' : 'no'} breasts) sa: ${sa}`, () => {
        expect(
          doesItDraftAndRender(
            new Pattern({
              measurements: ourModels.size40,
              complete: false,
              paperless: true,
              sa
            }), log
          )
        ).to.equal(true)
      })
    }
  }
}
  */
