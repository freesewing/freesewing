import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.js'

const expect = chai.expect

describe('Flip Plugin Tests', () => {
  const pattern = new freesewing.Pattern().use(plugin);
  pattern.parts.test = new pattern.Part()
  pattern.parts.test.points.from = new pattern.Point(10, 20)
  pattern.parts.test.points.to = new pattern.Point(30, 40)
  pattern.parts.test.paths.test = new pattern.Path()
    .move(new pattern.Point(1,2))
    .curve(
      new pattern.Point(10,20),
      new pattern.Point(30,40),
      new pattern.Point(50,60)
    )
  pattern.parts.test.snippets.test = new pattern.Snippet('logo', new pattern.Point(-66, 20))
  const { macro } = pattern.parts.test.shorthand()
  macro('flip')
  //pattern.draft().render();
  it("Should flip points", () => {
    expect(pattern.parts.test.points.from.x).to.equal(-10)
    expect(pattern.parts.test.points.from.y).to.equal(20)
    expect(pattern.parts.test.points.to.x).to.equal(-30)
    expect(pattern.parts.test.points.to.y).to.equal(40)
  })
  it("Should flip paths", () => {
    expect(pattern.parts.test.paths.test.ops[0].to.x).to.equal(-1)
    expect(pattern.parts.test.paths.test.ops[0].to.y).to.equal(2)
    expect(pattern.parts.test.paths.test.ops[1].cp1.x).to.equal(-10)
    expect(pattern.parts.test.paths.test.ops[1].cp1.y).to.equal(20)
    expect(pattern.parts.test.paths.test.ops[1].cp2.x).to.equal(-30)
    expect(pattern.parts.test.paths.test.ops[1].cp2.y).to.equal(40)
    expect(pattern.parts.test.paths.test.ops[1].to.x).to.equal(-50)
    expect(pattern.parts.test.paths.test.ops[1].to.y).to.equal(60)
  })
  it("Should flip snippets", () => {
    expect(pattern.parts.test.snippets.test.anchor.x).to.equal(66)
    expect(pattern.parts.test.snippets.test.anchor.y).to.equal(20)
  })
})

