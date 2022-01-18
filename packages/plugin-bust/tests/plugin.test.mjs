import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.js'

const expect = chai.expect

const measurements = {
  chest: 100,
  highBust: 90,
}

const pattern = new freesewing.Pattern({ measurements } ).use(plugin)
pattern.apply({measurements}).draft().render()

describe('Bust plugin Tests', () => {
  it('Should set swap the chest measurements', () => {
    expect(pattern.settings.measurements.bust).to.equal(100)
    expect(pattern.settings.measurements.chest).to.equal(90)
  })
})

