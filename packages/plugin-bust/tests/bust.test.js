import freesewing from '@freesewing/core'
import { version } from '../package.json'
const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

describe('plugin-bust', function () {
  it('Should set the plugin name:version attribute', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    const { macro } = pattern.parts.test.shorthand()
    macro('bust', {
      measurements: {},
    })
    pattern.render()
    expect(pattern.svg.attributes.get('freesewing:plugin-bust')).to.equal(version)
  })

  it('Should copy measurement from chest to bust and from highBust to chest', function () {
    let config = {measurements:{}}
    const testPattern = new freesewing.Design(config,plugin)
    let pattern = new testPattern()
    let userMeasurements = {chest: 50, highBust: 60}
    pattern.settings.measurements = userMeasurements;
    pattern.draft()
    expect(pattern.settings.measurements.bust).to.equal(50)
    expect(pattern.settings.measurements.chest).to.equal(60)   
  })

  it('Should not overwrite existing bust measurements', function () {
    let config = {measurements:{}}
    const testPattern = new freesewing.Design(config,plugin)
    let pattern = new testPattern()
    let userMeasurements = {chest: 50, highBust: 60, bust: 55}
    pattern.settings.measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings.measurements.bust).to.equal(55)
    expect(pattern.settings.measurements.chest).to.equal(50)   
  })

})
