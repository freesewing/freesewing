import chai from 'chai'
import { Design } from '@freesewing/core'
import { plugin } from './dist/index.mjs'

const expect = chai.expect

describe('Flip Plugin Tests', () => {
  const part = {
    name: 'test',
    draft: ({ Point, points, macro, paths, Path, snippets, Snippet }) => {
      points.from = new Point(10, 20)
      points.to = new Point(30, 40)
      paths.test = new Path()
        .move(new Point(1, 2))
        .curve(new Point(10, 20), new Point(30, 40), new Point(50, 60))
      snippets.test = new Snippet('logo', new Point(-66, 20))
      macro('flip')
    },
  }
  const Test = new Design({ plugins: [plugin], parts: [part] })
  const pattern = new Test()
  pattern.draft()
  it('Should flip points', () => {
    expect(pattern.parts.test.points.from.x).to.equal(-10)
    expect(pattern.parts.test.points.from.y).to.equal(20)
    expect(pattern.parts.test.points.to.x).to.equal(-30)
    expect(pattern.parts.test.points.to.y).to.equal(40)
  })

  it('Should flip paths', () => {
    expect(pattern.parts.test.paths.test.ops[0].to.x).to.equal(-1)
    expect(pattern.parts.test.paths.test.ops[0].to.y).to.equal(2)
    expect(pattern.parts.test.paths.test.ops[1].cp1.x).to.equal(-10)
    expect(pattern.parts.test.paths.test.ops[1].cp1.y).to.equal(20)
    expect(pattern.parts.test.paths.test.ops[1].cp2.x).to.equal(-30)
    expect(pattern.parts.test.paths.test.ops[1].cp2.y).to.equal(40)
    expect(pattern.parts.test.paths.test.ops[1].to.x).to.equal(-50)
    expect(pattern.parts.test.paths.test.ops[1].to.y).to.equal(60)
  })

  it('Should flip snippets', () => {
    expect(pattern.parts.test.snippets.test.anchor.x).to.equal(66)
    expect(pattern.parts.test.snippets.test.anchor.y).to.equal(20)
  })

  it('Should flip points in a part on their vertical axis', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, paths, Path, snippets, Snippet }) => {
        points.from = new Point(10, 20)
        points.to = new Point(40, 230)
        macro('flip', {})
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts.test.points
    expect(c.from.x).to.equal(-10)
    expect(c.to.x).to.equal(-40)
  })

  it('Should flip points in a path on their vertical axis', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, paths, Path, snippets, Snippet }) => {
        points.from = new Point(10, 20)
        points.cp1 = new Point(40, 0)
        points.cp2 = new Point(60, 30)
        points.to = new Point(40, 230)
        points.pathTo = new Point(90, 20)
        paths.line = new Path().move(points.from).curve(points.cp1, points.cp2, points.pathTo)
        macro('flip', {})
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
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
    const part = {
      name: 'test',
      draft: ({ Point, points, snippets, Snippet, macro, part }) => {
        points.anchorPoint = new Point(40, 0)
        snippets.testSnippet = new Snippet('button', points.anchorPoint)
        macro('flip', {})
        return part
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft().render()
    let c = pattern.parts.test
    expect(c.snippets.testSnippet.anchor.x).to.equal(-40)
  })
})
