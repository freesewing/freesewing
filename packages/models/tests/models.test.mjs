import chai from 'chai'
import * as all from '../src/index.mjs'

const expect = chai.expect
const { measurements, sizes } = all

describe('Measurements', () => {
  it('Measurements should be a named export and match the sizes', () => {
    for (const m of measurements) {
      expect(typeof all.cisFemaleAdult28[m]).to.equal('number')
    }
  })
})

for (const type in sizes) {
  for (const size of sizes[type]) {
    describe(`${type} size ${size}`, () => {
      for (const m of measurements) {
        it(`${type}${size} should have the ${m} measurement`, () => {
          expect(typeof all[`${type}${size}`][m]).to.equal('number')
          expect(isNaN(all[`${type}${size}`][m])).to.equal(false)
        })
      }
    })
  }
}
