import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

const measurements = {
  chest: 100,
  highBust: 90,
}

const Pattern = new Design()
const pattern = new Pattern({ measurements }).use(plugin)
pattern.draft()

describe('Bust plugin Tests', () => {
  it('Should set swap the chest measurements', () => {
    expect(pattern.settings[0].measurements.bust).to.equal(100)
    expect(pattern.settings[0].measurements.chest).to.equal(90)
  })

  it('Should copy measurement from chest to bust and from highBust to chest', function () {
    const testPattern = new Design({
      measurements: [],
    })
    const pattern = new testPattern().use(plugin)
    const userMeasurements = { chest: 50, highBust: 60 }
    pattern.settings[0].measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings[0].measurements.bust).to.equal(50)
    expect(pattern.settings[0].measurements.chest).to.equal(60)
  })

  it('Should not overwrite existing bust measurements', function () {
    let config = { measurements: [] }
    const testPattern = new Design(config, plugin)
    let pattern = new testPattern()
    let userMeasurements = { chest: 50, highBust: 60, bust: 55 }
    pattern.settings[0].measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings[0].measurements.bust).to.equal(55)
    expect(pattern.settings[0].measurements.chest).to.equal(50)
  })
})
