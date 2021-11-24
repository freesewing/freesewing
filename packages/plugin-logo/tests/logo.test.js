import freesewing from '@freesewing/core'
import { version } from '../package.json'

const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

it('Should set the plugin name:version attribute and import style and defs', () => {
  const pattern = new freesewing.Pattern().use(plugin)
  pattern.draft().render()
  expect(pattern.svg.attributes.get('freesewing:plugin-logo')).to.equal(version)
  expect(pattern.svg.defs).to.contain(
    '<g id="logo" transform="translate(-23 -36)"><path class="logo"'
  )
})
