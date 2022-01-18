import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect

describe('Banner Plugin Tests', () => {

  const pattern = new freesewing.Pattern()
  pattern.use(plugin).render()
  pattern.parts.test = new pattern.Part()
  const { Point, points, Path, paths, macro } = pattern.parts.test.shorthand()

  it('Should add repeating text to a path', () => {
    pattern.parts.test.points.from = new pattern.Point(30, 30)
    pattern.parts.test.points.to = new pattern.Point(30, 100)
    pattern.parts.test.paths.example = new Path()
      .move(pattern.parts.test.points.from)
      .line(pattern.parts.test.points.to)

    macro('banner', {
      text: 'foo',
      path: 'example',
    })
    let c = pattern.parts.test.paths.example
    expect(c.attributes.get('data-text')).to.equal(
      '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;foo&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;'
    )
    expect(c.attributes.get('data-text-class')).to.equal('center')
    expect(c.attributes.get('data-text-dy')).to.equal('-1')
  })

  it('Number of spaces should be configurable', () => {
    pattern.parts.test.points.from = new pattern.Point(60, 30)
    pattern.parts.test.points.to = new pattern.Point(60, 100)
    pattern.parts.test.paths.example2 = new Path()
      .move(pattern.parts.test.points.from)
      .line(pattern.parts.test.points.to)

    macro('banner', {
      text: 'foo',
      path: 'example2',
      spaces: 2,
      repeat: 2,
    })
    let c = pattern.parts.test.paths.example2
    expect(c.attributes.get('data-text')).to.equal('&#160;&#160;foo&#160;&#160;foo&#160;&#160;')
  })

  it('Number of repetitions should be configurable', () => {
    pattern.parts.test.points.from = new pattern.Point(90, 30)
    pattern.parts.test.points.to = new pattern.Point(90, 100)
    pattern.parts.test.paths.example3 = new Path()
      .move(pattern.parts.test.points.from)
      .line(pattern.parts.test.points.to)

    macro('banner', {
      text: 'foo',
      path: 'example3',
      spaces: 1,
      repeat: 4,
    })
    let c = pattern.parts.test.paths.example3
    expect(c.attributes.get('data-text')).to.equal(
      '&#160;foo&#160;foo&#160;foo&#160;foo&#160;'
    )
  })
})
