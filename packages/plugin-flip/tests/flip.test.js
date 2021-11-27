import freesewing from '@freesewing/core'
import { version } from '../package.json'
let chai = require('chai')
let expect = chai.expect
chai.use(require('chai-string'))
let plugin = require('../dist/index.js')

it('Should set the plugin name:version attribute', () => {
  let pattern = new freesewing.Pattern().use(plugin)
  pattern.render()
  expect(pattern.svg.attributes.get('freesewing:plugin-flip')).to.equal(
    version
  )
})

it('Should flip points in a part on their vertical axis', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  pattern.parts.test.points.from = new pattern.Point(10,20)
  pattern.parts.test.points.to = new pattern.Point(40,230)
  
  let { macro } = pattern.parts.test.shorthand()
  macro('flip', {})
  let c = pattern.parts.test.points
  expect(c.from.x).to.equal(-10)
  expect(c.to.x).to.equal(-40)
})


it('Should flip points in a path on their vertical axis', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  pattern.parts.test.points.from = new pattern.Point(10,20)
  let cp1 = new pattern.Point(40,0)
  let cp2 = new pattern.Point(60,30)
  pattern.parts.test.points.pathTo = new pattern.Point(90,20)
  pattern.parts.test.points.to = new pattern.Point(40,230)
  let { macro, Path } = pattern.parts.test.shorthand()
  pattern.parts.test.paths.line = new Path()
    .move(pattern.parts.test.points.from)
    .curve(cp1, cp2, pattern.parts.test.points.pathTo)
  macro('flip', {})
  let c = pattern.parts.test
  expect(c.points.from.x).to.equal(-10)
  expect(c.points.to.x).to.equal(-40)
  expect(c.paths.line.ops[0].to.x).to.equal(-10)
  expect(c.paths.line.ops[1].cp1.x).to.equal(-40)
  expect(c.paths.line.ops[1].cp2.x).to.equal(-60)
  expect(c.paths.line.ops[1].to.x).to.equal(-90)
  expect(c.points.pathTo.x).to.equal(-90)
})


it('Should flip points in snippets on their vertical axis', () => {
  let pattern = new freesewing.Pattern()
  pattern.use(plugin)
  pattern.parts.test = new pattern.Part()
  let anchorPoint = new pattern.Point(40,0)
  let { macro, snippets, Snippet } = pattern.parts.test.shorthand()
  snippets.testSnippet = new Snippet('button', anchorPoint)

  macro('flip', {})
  let c = pattern.parts.test
  expect(c.snippets.testSnippet.anchor.x).to.equal(-40)
})


