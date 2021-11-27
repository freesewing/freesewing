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
    expect(pattern.svg.defs.indexOf(`<g id="${snippet}">`)).to.not.equal(-1)
  })
}

it('Draws a button on an anchor point', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('button', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#button\" \>\<\/use\>')
})

it('Draws a buttonhole centred on an anchor point', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('buttonhole', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#buttonhole\" \>\<\/use\>')
})


it('Draws a buttonhole starting on an anchor point', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('buttonhole-start', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#buttonhole-start\" \>\<\/use\>')
})

it('Draws a buttonhole ending on an anchor point', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('buttonhole-end', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#buttonhole-end\" \>\<\/use\>')
})


it('Draws a snap-stud on an anchor point', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('snap-stud', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#snap-stud\" \>\<\/use\>')
})


it('Draws a snap-socket on an anchor point', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let { Point, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.button = new Snippet('snap-socket', new Point(10,20))
  pattern.render()
  let c = pattern.svg
  expect(c.layout.test.svg).to.equal('\n\<use x=\"10\" y=\"20\" xlink:href=\"\#snap-socket\" \>\<\/use\>')
})
