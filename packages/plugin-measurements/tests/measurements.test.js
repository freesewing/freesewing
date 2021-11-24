import freesewing from '@freesewing/core'
import { version } from '../package.json'
const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

describe('plugin-measurements', function () {
  it('Should set the plugin name:version attribute', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    const { macro } = pattern.parts.test.shorthand()
    macro('measurements', {
      measurements: {},
    })
    pattern.render()
    expect(pattern.svg.attributes.get('freesewing:plugin-measurements')).to.equal(version)
  })

  it('Should calculate seatFront from seat and seatBack', function () {
    let config = {measurements:{}}
    const testPattern = new freesewing.Design(config,plugin)
    let pattern = new testPattern()
    let userMeasurements = {seat: 50, seatBack: 20}
    pattern.settings.measurements = userMeasurements;
    pattern.draft()
    expect(pattern.settings.measurements.seatFront).to.equal(30)
  })

  it('Should calculate waistFrontArc and waistBackArc from waist and waistBack', function () {
    let config = {measurements:{}}
    const testPattern = new freesewing.Design(config,plugin)
    let pattern = new testPattern()
    let userMeasurements = {waist: 50, waistBack: 20}
    pattern.settings.measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings.measurements.waistFrontArc).to.equal(15)
    expect(pattern.settings.measurements.waistBackArc).to.equal(10)
  })

  it('Should calculate crossSeamBack from crossSeam and crossSeamFront', function () {
    let config = {measurements:{}}
    const testPattern = new freesewing.Design(config,plugin)
    let pattern = new testPattern()
    let userMeasurements = {crossSeam: 50, crossSeamFront: 20}
    pattern.settings.measurements = userMeasurements
    pattern.draft()
    expect(pattern.settings.measurements.crossSeamBack).to.equal(30)
  })


})
