import freesewing from '@freesewing/core'
import { strings } from '@freesewing/i18n'
import { version } from '../package.json'

const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

it('Should set the plugin name:version attribute', () => {
  const pattern = new freesewing.Pattern().use(plugin, {})
  pattern.draft().render()
  expect(pattern.svg.attributes.get('freesewing:plugin-i18n')).to.equal(version)
})

it('Should translate text on insert', () => {
  const pattern = new freesewing.Pattern().use(plugin, { strings })
  pattern.parts.test = new pattern.Part()
  pattern.parts.test.points.anchor = new pattern.Point(-12, -34).attr(
    'data-text',
    'plugin.cutTwoStripsToFinishTheArmholes'
  )
  const svg = pattern.draft().render()
  expect(svg).to.contain('Cut two strips to finish the armholes')
})
