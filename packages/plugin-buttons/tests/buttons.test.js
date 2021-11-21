import freesewing from '@freesewing/core'
import { version } from '../package.json'

const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

const pattern = new freesewing.Pattern().use(plugin)
pattern.draft().render()

it('Should set the plugin name:version attribute', () => {
  expect(pattern.svg.attributes.get('freesewing:plugin-buttons')).to.equal(version)
})

for (const snippet of ['button', 'buttonhole', 'snap-stud', 'snap-socket']) {
  it(`Should add the ${snippet} snippet to defs`, () => {
    //const pattern = new freesewing.Pattern().use(plugin)
    //pattern.parts.test = new pattern.Part()
    //pattern.draft().render()
    expect(pattern.svg.defs.indexOf(`<g id="${snippet}">`)).to.not.equal(-1)
  })
}

