import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

describe('Mirror Plugin Tests', () => {
  const part = {
    name: 'test',
    draft: ({ points, Point, macro, paths, Path, part }) => {
      points.mirrorA = new Point(-100, -100)
      points.mirrorB = new Point(100, 100)
      points.a = new Point(10, 20)
      points.b = new Point(30, 40)
      paths.test = new Path()
        .move(new Point(1, 2))
        .curve(new Point(10, 20), new Point(30, 40), new Point(50, 60))
      const settings = {
        mirror: [points.mirrorA, points.mirrorB],
        points: ['a', 'b'],
        paths: ['test'],
      }
      macro('mirror', settings)
      macro('mirror', { ...settings, prefix: 'test' })
      macro('mirror', { ...settings, clone: false })

      return part
    },
    plugins: [plugin],
  }
  const Pattern = new Design({ parts: [part] })
  const pattern = new Pattern()
  pattern.draft()

  it('Should mirror points', () => {
    expect(pattern.parts[0].test.points.mirroredA.x).to.equal(20)
    expect(pattern.parts[0].test.points.mirroredA.y).to.equal(10)
    expect(pattern.parts[0].test.points.mirroredB.x).to.equal(40)
    expect(pattern.parts[0].test.points.mirroredB.y).to.equal(30)
  })
  it('Should mirror points with custom prefix', () => {
    expect(pattern.parts[0].test.points.testA.x).to.equal(20)
    expect(pattern.parts[0].test.points.testA.y).to.equal(10)
    expect(pattern.parts[0].test.points.testB.x).to.equal(40)
    expect(pattern.parts[0].test.points.testB.y).to.equal(30)
  })
  it('Should mirror points without cloning them', () => {
    expect(pattern.parts[0].test.points.a.x).to.equal(20)
    expect(pattern.parts[0].test.points.a.y).to.equal(10)
    expect(pattern.parts[0].test.points.b.x).to.equal(40)
    expect(pattern.parts[0].test.points.b.y).to.equal(30)
  })
  it('Should mirror paths', () => {
    expect(pattern.parts[0].test.paths.mirroredTest.ops[0].to.x).to.equal(2)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[0].to.y).to.equal(1)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[1].cp1.x).to.equal(20)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[1].cp1.y).to.equal(10)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[1].cp2.x).to.equal(40)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[1].cp2.y).to.equal(30)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[1].to.x).to.equal(60)
    expect(pattern.parts[0].test.paths.mirroredTest.ops[1].to.y).to.equal(50)
  })
  it('Should mirror paths with custom prefix', () => {
    expect(pattern.parts[0].test.paths.testTest.ops[0].to.x).to.equal(2)
    expect(pattern.parts[0].test.paths.testTest.ops[0].to.y).to.equal(1)
    expect(pattern.parts[0].test.paths.testTest.ops[1].cp1.x).to.equal(20)
    expect(pattern.parts[0].test.paths.testTest.ops[1].cp1.y).to.equal(10)
    expect(pattern.parts[0].test.paths.testTest.ops[1].cp2.x).to.equal(40)
    expect(pattern.parts[0].test.paths.testTest.ops[1].cp2.y).to.equal(30)
    expect(pattern.parts[0].test.paths.testTest.ops[1].to.x).to.equal(60)
    expect(pattern.parts[0].test.paths.testTest.ops[1].to.y).to.equal(50)
  })
  it('Should mirror paths without cloning them', () => {
    expect(pattern.parts[0].test.paths.test.ops[0].to.x).to.equal(2)
    expect(pattern.parts[0].test.paths.test.ops[0].to.y).to.equal(1)
    expect(pattern.parts[0].test.paths.test.ops[1].cp1.x).to.equal(20)
    expect(pattern.parts[0].test.paths.test.ops[1].cp1.y).to.equal(10)
    expect(pattern.parts[0].test.paths.test.ops[1].cp2.x).to.equal(40)
    expect(pattern.parts[0].test.paths.test.ops[1].cp2.y).to.equal(30)
    expect(pattern.parts[0].test.paths.test.ops[1].to.x).to.equal(60)
    expect(pattern.parts[0].test.paths.test.ops[1].to.y).to.equal(50)
  })
})
