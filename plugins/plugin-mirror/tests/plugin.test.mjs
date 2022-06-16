import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

describe('Mirror Plugin Tests', () => {
  const pattern = new freesewing.Pattern().use(plugin)
  pattern.parts.test = new pattern.Part()
  pattern.parts.test.points.mirrorA = new pattern.Point(-100, -100)
  pattern.parts.test.points.mirrorB = new pattern.Point(100, 100)
  pattern.parts.test.points.a = new pattern.Point(10, 20)
  pattern.parts.test.points.b = new pattern.Point(30, 40)
  pattern.parts.test.paths.test = new pattern.Path()
    .move(new pattern.Point(1,2))
    .curve(
      new pattern.Point(10,20),
      new pattern.Point(30,40),
      new pattern.Point(50,60)
    )
  const { macro } = pattern.parts.test.shorthand()
  const settings = {
    mirror: [
      pattern.parts.test.points.mirrorA,
      pattern.parts.test.points.mirrorB,
    ],
    points: [
      pattern.parts.test.points.a,
      pattern.parts.test.points.b,
    ],
    paths: [
      pattern.parts.test.paths.test,
    ]
  }
  macro('mirror', settings)
  macro('mirror', { ...settings, prefix: 'test' })
  macro('mirror', { ...settings, clone: false })
  pattern.draft().render()

  it('Should mirror points', () => {
    expect(pattern.parts.test.points.mirroredA.x).to.equal(20)
    expect(pattern.parts.test.points.mirroredA.y).to.equal(10)
    expect(pattern.parts.test.points.mirroredB.x).to.equal(40)
    expect(pattern.parts.test.points.mirroredB.y).to.equal(30)
  })
  it('Should mirror points with custom prefix', () => {
    expect(pattern.parts.test.points.testA.x).to.equal(20)
    expect(pattern.parts.test.points.testA.y).to.equal(10)
    expect(pattern.parts.test.points.testB.x).to.equal(40)
    expect(pattern.parts.test.points.testB.y).to.equal(30)
  })
  it('Should mirror points without cloning them', () => {
    expect(pattern.parts.test.points.a.x).to.equal(20)
    expect(pattern.parts.test.points.a.y).to.equal(10)
    expect(pattern.parts.test.points.b.x).to.equal(40)
    expect(pattern.parts.test.points.b.y).to.equal(30)
  })
  it('Should mirror paths', () => {
    expect(pattern.parts.test.paths.mirroredTest.ops[0].to.x).to.equal(2)
    expect(pattern.parts.test.paths.mirroredTest.ops[0].to.y).to.equal(1)
    expect(pattern.parts.test.paths.mirroredTest.ops[1].cp1.x).to.equal(20)
    expect(pattern.parts.test.paths.mirroredTest.ops[1].cp1.y).to.equal(10)
    expect(pattern.parts.test.paths.mirroredTest.ops[1].cp2.x).to.equal(40)
    expect(pattern.parts.test.paths.mirroredTest.ops[1].cp2.y).to.equal(30)
    expect(pattern.parts.test.paths.mirroredTest.ops[1].to.x).to.equal(60)
    expect(pattern.parts.test.paths.mirroredTest.ops[1].to.y).to.equal(50)
  })
  it('Should mirror paths with custom prefix', () => {
    expect(pattern.parts.test.paths.testTest.ops[0].to.x).to.equal(2)
    expect(pattern.parts.test.paths.testTest.ops[0].to.y).to.equal(1)
    expect(pattern.parts.test.paths.testTest.ops[1].cp1.x).to.equal(20)
    expect(pattern.parts.test.paths.testTest.ops[1].cp1.y).to.equal(10)
    expect(pattern.parts.test.paths.testTest.ops[1].cp2.x).to.equal(40)
    expect(pattern.parts.test.paths.testTest.ops[1].cp2.y).to.equal(30)
    expect(pattern.parts.test.paths.testTest.ops[1].to.x).to.equal(60)
    expect(pattern.parts.test.paths.testTest.ops[1].to.y).to.equal(50)
  })
  it('Should mirror paths without cloning them', () => {
    expect(pattern.parts.test.paths.test.ops[0].to.x).to.equal(2)
    expect(pattern.parts.test.paths.test.ops[0].to.y).to.equal(1)
    expect(pattern.parts.test.paths.test.ops[1].cp1.x).to.equal(20)
    expect(pattern.parts.test.paths.test.ops[1].cp1.y).to.equal(10)
    expect(pattern.parts.test.paths.test.ops[1].cp2.x).to.equal(40)
    expect(pattern.parts.test.paths.test.ops[1].cp2.y).to.equal(30)
    expect(pattern.parts.test.paths.test.ops[1].to.x).to.equal(60)
    expect(pattern.parts.test.paths.test.ops[1].to.y).to.equal(50)
  })

})
