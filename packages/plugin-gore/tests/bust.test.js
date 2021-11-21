import freesewing from 'freesewing'
import { version } from '../package.json'

const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

it('Should set the plugin name:version attribute', () => {
  const pattern = new freesewing.Pattern().use(plugin)
  pattern.draft().render()
  expect(pattern.svg.attributes.get('freesewing:plugin-buttons')).to.equal(version)
})
