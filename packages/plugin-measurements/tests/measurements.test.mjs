import freesewing from '@freesewing/core'
import Rendertest from '@freesewing/rendertest'
import chai from 'chai'
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

const pattern = new Rendertest({ measurements } ).use(plugin)
pattern.draft().render()
const version = plugin.name.split('@').pop().split('/').join(':')


it('Should set the plugin name:version attribute', () => {
  expect(pattern.svg.attributes.get(version)).to.equal(plugin.version)
})

it('Should set the extra measurements', () => {
  expect(pattern.settings.measurements.seatFront).to.equal(40)
  expect(pattern.settings.measurements.seatFrontArc).to.equal(20)
  expect(pattern.settings.measurements.seatBackArc).to.equal(30)
  expect(pattern.settings.measurements.waistFront).to.equal(55)
  expect(pattern.settings.measurements.waistFrontArc).to.equal(27.5)
  expect(pattern.settings.measurements.crossSeamBack).to.equal(58)
})

