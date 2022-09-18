import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

const measurements = { head: 400 }
const toAbs = (val, { measurements }) => measurements.head * val

describe('Snapped options', () => {
  it('Should snap a percentage options to equal steps', () => {
    const part = {
      name: 'test',
      measurements: ['head'],
      options: {
        test: { pct: 30, min: 0, max: 100, snap: 12, toAbs },
      },
    }
    const design = new Design({ parts: [part] })
    const patternA = new design({ options: { test: 0.13 }, measurements }).draft()
    const patternB = new design({ options: { test: 0.27 }, measurements }).draft()
    expect(patternA.settings[0].absoluteOptions.test).to.equal(60)
    expect(patternB.settings[0].absoluteOptions.test).to.equal(108)
  })
  it('Should snap a percentage options to the Fibonacci sequence', () => {
    const part = {
      name: 'test',
      measurements: ['head'],
      options: {
        test: {
          pct: 30,
          min: 0,
          max: 100,
          toAbs,
          snap: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
        },
      },
    }
    const design = new Design({ parts: [part] })
    const patternA = new design({ options: { test: 0.13 }, measurements }).draft()
    const patternB = new design({ options: { test: 0.27 }, measurements }).draft()
    const patternC = new design({ options: { test: 0.97 }, measurements }).draft()
    expect(patternA.settings[0].absoluteOptions.test).to.equal(55)
    expect(patternB.settings[0].absoluteOptions.test).to.equal(89)
    expect(patternC.settings[0].absoluteOptions.test).to.equal(388)
  })

  it('Should snap a percentage options to imperial snaps', () => {
    const part = {
      name: 'test',
      options: {
        test: {
          pct: 30,
          min: 0,
          max: 100,
          toAbs,
          snap: {
            metric: [25, 50, 75, 100],
            imperial: [25.4, 50.8, 76.2, 101.6],
          },
        },
      },
    }
    const design = new Design({ parts: [part] })
    const patternA = new design({ options: { test: 0.13 }, measurements, units: 'metric' }).draft()
    const patternB = new design({ options: { test: 0.27 }, measurements, units: 'metric' }).draft()
    const patternC = new design({ options: { test: 0.97 }, measurements, units: 'metric' }).draft()
    const patternD = new design({ options: { test: 0.01 }, measurements, units: 'metric' }).draft()
    expect(patternA.settings[0].absoluteOptions.test).to.equal(50)
    expect(patternB.settings[0].absoluteOptions.test).to.equal(100)
    expect(patternC.settings[0].absoluteOptions.test).to.equal(388)
    expect(patternD.settings[0].absoluteOptions.test).to.equal(4)
  })

  it('Should snap a percentage options to metrics snaps', () => {
    const part = {
      name: 'test',
      options: {
        test: {
          pct: 30,
          min: 0,
          max: 100,
          toAbs,
          snap: {
            metric: [25, 50, 75, 100],
            imperial: [25.4, 50.8, 76.2, 101.6],
          },
        },
      },
    }
    const design = new Design({ parts: [part] })
    const patternA = new design({
      options: { test: 0.13 },
      measurements,
      units: 'imperial',
    }).draft()
    const patternB = new design({
      options: { test: 0.27 },
      measurements,
      units: 'imperial',
    }).draft()
    const patternC = new design({
      options: { test: 0.97 },
      measurements,
      units: 'imperial',
    }).draft()
    const patternD = new design({
      options: { test: 0.01 },
      measurements,
      units: 'imperial',
    }).draft()
    expect(patternA.settings[0].absoluteOptions.test).to.equal(50.8)
    expect(patternB.settings[0].absoluteOptions.test).to.equal(101.6)
    expect(patternC.settings[0].absoluteOptions.test).to.equal(388)
    expect(patternD.settings[0].absoluteOptions.test).to.equal(4)
  })
})
