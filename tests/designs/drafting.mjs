import designs from "../../config/software/designs.json" assert { type: 'json' }
import { adults, dolls, giants } from '@freesewing/models'
import { getFamily } from './config.mjs'
import chai from 'chai'

const expect = chai.expect

/*
 * This runs unit tests for pattern drafting
 * It expects the following:
 *
 * @param object Pattern: pattern constructor
 * @param boolean log: Set to true to log errors
 */
export const testPatternDrafting = (Pattern, log=false) => {

  const pattern = new Pattern()
  const config = pattern.getConfig()
  const design = config.data.name
  const family = getFamily(design)
  const parts = pattern.getPartList()
  // Helper method to try/catch pattern drafting
  const doesItDraftAndRender = (pattern, log=false) => {
    try {
      pattern.draft().render()
      if (pattern.events.error.length < 1) return true
      if (log) console.log(pattern.events.error)
      return false
    } catch (err) {
      if (log) console.log(err)
      return false
    }
  }

  /*
   * Draft pattern for different models
   */
  if (family !== 'utilities') {
    describe('Draft for humans:', () => {
      for (const type of ['sheher', 'hehim']) {
        describe(type, () => {
          for (const size in adults[type]) {
            it(`  - Drafting for size ${size}`, () => {
              expect(
                doesItDraftAndRender(
                  new Pattern({
                    measurements: adults[type][size]
                  }), log
                )
              ).to.equal(true)
            })
          }
        })
      }
    })

    // Do the same for fantastical models (dolls, giants)
    const fams = { dolls, giants }
    for (const family of ['dolls', 'giants']) {
      describe(`Draft for ${family}:`, () => {
        for (const type of ['sheher', 'hehim']) {
          describe(type, () => {
            for (const size in fams[family][type]) {
              it(`  - Drafting at ${size}%`, () => {
                expect(
                  doesItDraftAndRender(
                    new Pattern({
                      measurements: fams[family][type][size]
                    }), log
                  )
                ).to.equal(true)
              })
            }
          })
        }
      })
    }
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

