import freesewing from '@freesewing/core'
import { version } from '../package.json'
import chai from 'chai'
import plugin from '../dist/index.js'

const expect = chai.expect

const pattern = new freesewing.Pattern().use(plugin)
pattern.draft().render()

it('Should set the plugin name:version attribute', () => {
  expect(pattern.svg.attributes.get('freesewing:plugin-buttons')).to.equal(version)
})

for (const snippet of ['button', 'buttonhole', 'snap-stud', 'snap-socket']) {
  it(`Should add the ${snippet} snippet to defs`, () => {
    expect(pattern.svg.defs.indexOf(`<g id="${snippet}">`)).to.not.equal(-1)
  })
}
