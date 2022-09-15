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
  draft: ({ points, Point }) => {
    points.from = new Point(10, 20)
    points.to = new Point(10, 230)
  },
}
const Pattern = new Design({ plugins: [plugin], parts: [part] })
const pattern = new Pattern({ measurements })
pattern.draft()

describe('Measurements Plugin Tests', () => {
  it('Should set the extra measurements', () => {
    expect(pattern.settings.measurements.seatFront).to.equal(40)
    expect(pattern.settings.measurements.seatFrontArc).to.equal(20)
    expect(pattern.settings.measurements.seatBackArc).to.equal(30)
    expect(pattern.settings.measurements.waistFront).to.equal(55)
    expect(pattern.settings.measurements.waistFrontArc).to.equal(27.5)
    expect(pattern.settings.measurements.crossSeamBack).to.equal(58)
  })

  it('Should calculate seatFront from seat and seatBack', function () {
    const testPattern = new Design({
      measurements: {},
      plugins: [plugin],
    })
    const pattern = new testPattern()
    const userMeasurements = { seat: 50, seatBack: 20 }
    pattern.settings.measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings.measurements.seatFront).to.equal(30)
  })

  it('Should calculate waistFrontArc and waistBackArc from waist and waistBack', function () {
    const testPattern = new Design({
      measurements: {},
      plugins: [plugin],
    })
    const pattern = new testPattern()
    const userMeasurements = { waist: 50, waistBack: 20 }
    pattern.settings.measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings.measurements.waistFrontArc).to.equal(15)
    expect(pattern.settings.measurements.waistBackArc).to.equal(10)
  })

  it('Should calculate crossSeamBack from crossSeam and crossSeamFront', function () {
    const testPattern = new Design({
      measurements: {},
      plugins: [plugin],
    })
    const pattern = new testPattern()
    const userMeasurements = { crossSeam: 50, crossSeamFront: 20 }
    pattern.settings.measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings.measurements.crossSeamBack).to.equal(30)
  })
})
