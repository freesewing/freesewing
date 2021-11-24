import freesewing from '@freesewing/core'
import { version } from '../package.json'

const chai = require('chai')
const expect = chai.expect
const plugin = require('../dist/index.js')

const pattern = new freesewing.Pattern().use(plugin)
pattern.draft().render()

it('Should set the plugin name:version attribute', () => {
  expect(pattern.svg.attributes.get('freesewing:plugin-notches')).to.equal(version)
})

it(`Should add the notches snippet to defs`, () => {
  expect(pattern.svg.defs.indexOf(`<g id="notch">`)).to.not.equal(-1)
})

it("Draws a notch on an anchor point", () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('notch', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#notch\" \>\<\/use\>')
})

