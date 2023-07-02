import designs from '../../config/software/designs.json' assert { type: 'json' }
import { isUtilityDesign, getShortName } from './config.mjs'
import chai from 'chai'

const expect = chai.expect

/*
 * This runs unit tests for the pattern translation files
 * It expects the following:
 *
 * @param string Pattern: The Pattern constructor
 */
export const testPatternI18n = (Pattern, i18n) => {
  const name = getShortName(Pattern.designConfig.data.name)
  const parts = Pattern.patternConfig.draftOrder
  const options = Object.keys(Pattern.patternConfig.options)
  describe('Pattern translation:', function () {
    it(`  - The design should have a translated title`, () => {
      expect(typeof i18n.en.t).to.equal('string')
      expect(i18n.en.t.length).to.be.above(4)
    })
    it(`  - The design should have a translated description`, () => {
      expect(typeof i18n.en.d).to.equal('string')
      expect(i18n.en.t.length).to.be.above(8)
    })
    if (!isUtilityDesign(name)) {
      it(`  - The strings (s) object should exist`, () => {
        expect(typeof i18n.en.s).to.equal('object')
      })
      for (const [key, val] of Object.entries(i18n.en.s)) {
        it(`  - The translation of s.${key} should be a non-empty string`, () => {
          expect(typeof i18n.en.s[key]).to.equal('string')
          expect(i18n.en.s[key].length).to.be.above(1)
        })
      }
      it(`  - The parts (p) object should exist`, () => {
        expect(typeof i18n.en.p).to.equal('object')
      })
      for (const [key, val] of Object.entries(i18n.en.p)) {
        it(`  - The translation of p.${key} should be a non-empty string`, () => {
          expect(typeof i18n.en.p[key]).to.equal('string')
          expect(i18n.en.p[key].length).to.be.above(1)
        })
      }
      for (const part of parts
        .filter((p) => p.split('.')[0] === name)
        .map((p) => p.split('.')[1])) {
        it(`  - The part name for the "${part}" part should be a non-empty string`, () => {
          expect(typeof i18n.en.p[part]).to.equal('string')
          expect(i18n.en.p[part].length).to.be.above(1)
        })
      }
      it(`  - The options (o) object should exist`, () => {
        expect(typeof i18n.en.o).to.equal('object')
      })
      for (const [key, val] of Object.entries(i18n.en.o)) {
        it(`  - The translation of o.${key}.t should be a non-empty string`, () => {
          expect(typeof i18n.en.o[key].t).to.equal('string')
          expect(i18n.en.o[key].t.length).to.be.above(1)
        })
        it(`  - The translation of o.${key}.d should be a non-empty string`, () => {
          expect(typeof i18n.en.o[key].d).to.equal('string')
          expect(i18n.en.o[key].d.length).to.be.above(1)
        })
      }
      for (const option of options.filter((o) => typeof o === 'object')) {
        it(`  - The option title for the "${option}" option should be a non-empty string`, () => {
          expect(typeof i18n.en.o[option].t).to.equal('string')
          expect(i18n.en.o[option].t.length).to.be.above(1)
        })
      }
    }
  })
}
