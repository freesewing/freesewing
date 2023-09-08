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
      expect(i18n.en.d.length).to.be.above(8)
    })
    if (!isUtilityDesign(name)) {
      it(`  - The strings (s) object should exist`, () => {
        expect(typeof i18n.en.s).to.equal('object')
      })
      for (const key of Object.keys(i18n.en.s)) {
        it(`  - The translation of s.${key} should be a non-empty string`, () => {
          expect(typeof i18n.en.s[key]).to.equal('string')
          expect(i18n.en.s[key].length).to.be.above(1)
        })
      }
      it(`  - The parts (p) object should exist`, () => {
        expect(typeof i18n.en.p).to.equal('object')
      })
      for (const key of Object.keys(i18n.en.p)) {
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
      for (const key of Object.keys(i18n.en.o)) {
        it(`  - The translation of o.${key}.t should be a non-empty string`, () => {
          expect(typeof i18n.en.o[key].t).to.equal('string')
          expect(i18n.en.o[key].t.length).to.be.above(1)
        })
        it(`  - The translation of o.${key}.d should be a non-empty string`, () => {
          expect(typeof i18n.en.o[key].d).to.equal('string')
          expect(i18n.en.o[key].d.length).to.be.above(1)
        })
        if (key.slice(-3) === 'Yes') {
          it(`  - The Yes translation of boolean option o.${key} should have a corresponding No translation`, () => {
            expect(typeof i18n.en.o[key.slice(0, -3) + 'No'].t).to.equal('string')
          })
        } else if (key.slice(-2) === 'No') {
          it(`  - The No translation of boolean option o.${key} should have a corresponding Yes translation`, () => {
            expect(typeof i18n.en.o[key.slice(0, -2) + 'Yes'].t).to.equal('string')
          })
        } else {
          it(`  - The translation of o.${key} should correspond to a known option`, () => {
            expect(options.includes(key)).to.equal(true)
          })
        }
      }
      for (const option of options.filter(
        (o) => typeof Pattern.patternConfig.options[o] === 'object'
      )) {
        it(`  - The option title for the "${option}" option should be a non-empty string`, () => {
          expect(typeof i18n.en.o[option].t).to.equal('string')
          expect(i18n.en.o[option].t.length).to.be.above(1)
        })
      }
    }
  })
}
