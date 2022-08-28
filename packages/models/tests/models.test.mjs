import chai from "chai"
import * as all from "./dist/index.mjs"

const expect = chai.expect
const { measurements, sizes } = all

describe('Measurements', () => {
  it("Measurements should be a named export and match the sizes", () => {
    for (const m of measurements) {
      expect(typeof all.womenswear28[m]).to.equal('number');
    }
  })
})

for (const type in sizes) {
  describe(`Sizes: ${type}`, () => {
    for (const size of sizes[type]) {
      it(`${type}${size} should have all measurements`, () => {
        for (const m of measurements) {
          expect(typeof all[`${type}${size}`][m]).to.equal('number');
        }
      })
    }
  })
}

