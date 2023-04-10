import chai from 'chai'
import { round, Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Bartack plugin Tests', () => {
  it('draws a default bartack from a point', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        macro('bartack', {
          anchor: points.from,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()

    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[0].to.x).to.equal(10)
    expect(c.ops[0].to.y).to.equal(21.5)
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[1].to.x).to.equal(10)
    expect(c.ops[1].to.y).to.equal(21.5)
    expect(c.ops[2].to.x).to.equal(10)
    expect(c.ops[2].to.y).to.equal(18.5)
    expect(c.ops[3].to.x).to.equal(11)
    expect(c.ops[3].to.y).to.equal(21.5)
    expect(c.ops[4].to.x).to.equal(11)
    expect(c.ops[4].to.y).to.equal(18.5)
    expect(c.ops).to.have.lengthOf(31)
  })

  it('draws a bartack along a path', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, Path, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 30)
        macro('bartackAlong', {
          path: new Path().move(points.from).line(points.to),
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[0].to.x).to.equal(8.5)
    expect(c.ops[0].to.y).to.equal(20)
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[1].to.x).to.equal(8.5)
    expect(c.ops[1].to.y).to.equal(20)
    expect(c.ops[2].to.x).to.equal(11.5)
    expect(c.ops[2].to.y).to.equal(20)
    expect(c.ops[3].to.x).to.equal(8.5)
    expect(c.ops[3].to.y).to.equal(21)
    expect(c.ops[4].to.x).to.equal(11.5)
    expect(c.ops[4].to.y).to.equal(21)
    expect(c.ops).to.have.lengthOf(21)
  })

  it('can be called using the bartackFractionAlong syntax', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, Path, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 100)
        macro('bartackAlong', {
          path: new Path().move(points.from).line(points.to),
          start: 0.2,
          end: 0.8,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(round(c.ops[0].to.x)).to.equal(8.5)
    expect(c.ops[0].to.y).to.equal(20)
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[1].to.x)).to.equal(8.5)
    expect(c.ops[1].to.y).to.equal(20)
    expect(round(c.ops[2].to.x)).to.equal(11.5)
    expect(c.ops[2].to.y).to.equal(20)
    expect(round(c.ops[3].to.x)).to.equal(8.5)
    expect(c.ops[3].to.y).to.equal(21)
    expect(round(c.ops[4].to.x)).to.equal(11.5)
    expect(c.ops[4].to.y).to.equal(21)
    expect(c.ops).to.have.lengthOf(161)
  })

  it('can be called using the bartackFractionAlong syntax', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, Path, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 100)
        macro('bartackFractionAlong', {
          path: new Path().move(points.from).line(points.to),
          start: 0.2,
          end: 0.8,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(round(c.ops[0].to.x)).to.equal(8.5)
    expect(c.ops[0].to.y).to.equal(36)
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[1].to.x)).to.equal(8.5)
    expect(c.ops[1].to.y).to.equal(36)
    expect(round(c.ops[2].to.x)).to.equal(11.5)
    expect(c.ops[2].to.y).to.equal(36)
    expect(round(c.ops[3].to.x)).to.equal(8.5)
    expect(c.ops[3].to.y).to.equal(37)
    expect(round(c.ops[4].to.x)).to.equal(11.5)
    expect(c.ops[4].to.y).to.equal(37)
    expect(c.ops).to.have.lengthOf(97)
  })

  it('has configurable length', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        macro('bartack', {
          anchor: points.from,
          length: 20,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[0].to.x).to.equal(10)
    expect(c.ops[0].to.y).to.equal(21.5)
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[1].to.x).to.equal(10)
    expect(c.ops[1].to.y).to.equal(21.5)
    expect(c.ops[2].to.x).to.equal(10)
    expect(c.ops[2].to.y).to.equal(18.5)
    expect(c.ops[3].to.x).to.equal(11)
    expect(c.ops[3].to.y).to.equal(21.5)
    expect(c.ops[4].to.x).to.equal(11)
    expect(c.ops[4].to.y).to.equal(18.5)
    expect(c.ops).to.have.lengthOf(41)
  })

  it('has configurable width', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        macro('bartack', {
          anchor: points.from,
          width: 5,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[0].to.x).to.equal(10)
    expect(c.ops[0].to.y).to.equal(22.5)
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[1].to.x).to.equal(10)
    expect(c.ops[1].to.y).to.equal(22.5)
    expect(c.ops[2].to.x).to.equal(10)
    expect(c.ops[2].to.y).to.equal(17.5)
    expect(round(c.ops[3].to.x)).to.equal(11.67)
    expect(c.ops[3].to.y).to.equal(22.5)
    expect(round(c.ops[4].to.x)).to.equal(11.67)
    expect(c.ops[4].to.y).to.equal(17.5)
    expect(c.ops).to.have.lengthOf(19)
  })

  it('has configurable angle', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        macro('bartack', {
          anchor: points.from,
          angle: 45,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
    expect(c.ops[0].type).to.equal('move')
    expect(round(c.ops[0].to.x)).to.equal(11.06)
    expect(round(c.ops[0].to.y)).to.equal(21.06)
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[1].to.x)).to.equal(11.06)
    expect(round(c.ops[1].to.y)).to.equal(21.06)
    expect(round(c.ops[2].to.x)).to.equal(8.94)
    expect(round(c.ops[2].to.y)).to.equal(18.94)
    expect(round(c.ops[3].to.x)).to.equal(11.72)
    expect(round(c.ops[3].to.y)).to.equal(20.4)
    expect(round(c.ops[4].to.x)).to.equal(9.6)
    expect(round(c.ops[4].to.y)).to.equal(18.28)
    expect(c.ops).to.have.lengthOf(33)
  })

  it('has configurable suffix', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        macro('bartack', {
          anchor: points.from,
          suffix: 'foo',
        })

        part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.bartackfoo
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
  })

  it('has configurable prefix', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        macro('bartack', {
          anchor: points.from,
          prefix: 'foo',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft()
    const c = pattern.parts[0].test.paths.foobartack
    expect(c.attributes.get('class')).to.equal('stroke-sm stroke-mark')
  })
})
