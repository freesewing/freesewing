import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.js'

const expect = chai.expect

const measurements = {
  seatBack: 60,
  seat: 100,
  waist: 100,
  waistBack: 45,
  crossSeam: 100,
  crossSeamFront: 42
}

const pattern = new freesewing.Pattern().use(plugin)
pattern.apply({ measurements }).draft().render()

describe('Measurements Plugin Tests', () => {
  it('Should set the extra measurements', () => {
    expect(pattern.settings.measurements.seatFront).to.equal(40)
    expect(pattern.settings.measurements.seatFrontArc).to.equal(20)
    expect(pattern.settings.measurements.seatBackArc).to.equal(30)
    expect(pattern.settings.measurements.waistFront).to.equal(55)
    expect(pattern.settings.measurements.waistFrontArc).to.equal(27.5)
    expect(pattern.settings.measurements.crossSeamBack).to.equal(58)
  })
})

