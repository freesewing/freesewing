import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

const measurements = {
  seatBack: 60,
  seat: 100,
  waist: 100,
  waistBack: 45,
  crossSeam: 100,
  crossSeamFront: 42,
}
const part = {
  name: 'test',
  draft: ({ points, Point, part }) => {
    points.from = new Point(10, 20)
    points.to = new Point(10, 230)

    return part
  },
  measurements: Object.keys(measurements),
  plugins: [plugin],
}
const Pattern = new Design({ parts: [part] })

describe('Measurements Plugin Tests', () => {
  it('Should set the extra measurements', () => {
    const pattern = new Pattern({ measurements })
    pattern.draft()
    expect(pattern.settings[0].measurements.seatFront).to.equal(40)
    expect(pattern.settings[0].measurements.seatFrontArc).to.equal(20)
    expect(pattern.settings[0].measurements.seatBackArc).to.equal(30)
    expect(pattern.settings[0].measurements.waistFront).to.equal(55)
    expect(pattern.settings[0].measurements.waistFrontArc).to.equal(27.5)
    expect(pattern.settings[0].measurements.crossSeamBack).to.equal(58)
  })

  it('Should calculate seatFront from seat and seatBack', function () {
    const pattern = new Pattern({ measurements: { seat: 50, seatBack: 20 } })
    pattern.draft()
    expect(pattern.settings[0].measurements.seatFront).to.equal(30)
  })

  it('Should calculate waistFrontArc and waistBackArc from waist and waistBack', function () {
    const pattern = new Pattern({ measurements: { waist: 50, waistBack: 20 } })
    pattern.draft()
    expect(pattern.settings[0].measurements.waistFrontArc).to.equal(15)
    expect(pattern.settings[0].measurements.waistBackArc).to.equal(10)
  })

  it('Should calculate crossSeamBack from crossSeam and crossSeamFront', function () {
    const pattern = new Pattern({ measurements: { crossSeam: 50, crossSeamFront: 20 } })
    pattern.draft()
    expect(pattern.settings[0].measurements.crossSeamBack).to.equal(30)
  })
})
