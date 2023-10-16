import chai from 'chai'
import { Design, Point, Attributes } from '../src/index.mjs'
import { Stack } from '../src/stack.mjs'

const expect = chai.expect

describe('Stacks', () => {
  describe('Pattern.__init()', () => {
    const partA = {
      name: 'test.partA',
      measurements: ['head'],
      options: {
        size: { pct: 40, min: 20, max: 80 },
      },
      draft: ({ points, Point, paths, Path, part, store, measurements, options }) => {
        store.set('size', measurements.head * options.size)
        points.from = new Point(0, 0)
        points.to = new Point(0, store.get('size'))
        paths.line = new Path().move(points.from).line(points.to)
        return part
      },
      stack: 'box',
    }
    const partB = {
      name: 'test.partB',
      measurements: ['head'],
      after: partA,
      draft: ({ points, Point, paths, Path, part, store }) => {
        points.from = new Point(0, store.get('size'))
        points.to = new Point(store.get('size'), store.get('size'))
        paths.line = new Path().move(points.from).line(points.to)
        return part
      },
      stack: 'box',
    }
    const partC = {
      name: 'test.partC',
      after: partB,
      draft: ({ points, Point, paths, Path, part, store }) => {
        points.from = new Point(store.get('size'), store.get('size'))
        points.to = new Point(store.get('size'), 0)
        paths.line = new Path().move(points.from).line(points.to)
        return part
      },
      stack: 'box',
    }
    const partD = {
      name: 'test.partD',
      after: partC,
      draft: ({ points, Point, paths, Path, part, store }) => {
        points.from = new Point(store.get('size'), 0)
        points.to = new Point(0, 0)
        paths.line = new Path().move(points.from).line(points.to)
        return part
      },
    }

    const Pattern = new Design({
      data: {
        name: 'test',
        version: '1.2.3',
      },
      parts: [partD],
    })
    const pattern = new Pattern({
      measurements: {
        head: 400,
      },
    })
    pattern.draft()

    it('Pattern.__init() should resolve dependencies', () => {
      expect(typeof pattern.config.resolvedDependencies).to.equal('object')
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partA'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partA'].length).to.equal(0)
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partB'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partB'].length).to.equal(1)
      expect(pattern.config.resolvedDependencies['test.partB'][0]).to.equal('test.partA')
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partC'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partC'].length).to.equal(2)
      expect(
        pattern.config.resolvedDependencies['test.partC'].indexOf('test.partA') !== -1
      ).to.equal(true)
      expect(
        pattern.config.resolvedDependencies['test.partC'].indexOf('test.partB') !== -1
      ).to.equal(true)
    })

    it('Should calculate the part boundary', () => {
      const part = {
        name: 'test',
        draft: ({ points, Point, paths, Path, part }) => {
          points.from = new Point(123, 456)
          points.to = new Point(19, 76)
          paths.test = new Path().move(points.from).line(points.to)

          return part
        },
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      pattern.draft().render()
      expect(pattern.stacks.test.topLeft.x).to.equal(17)
      expect(pattern.stacks.test.topLeft.y).to.equal(74)
      pattern.render()
      expect(pattern.stacks.test.bottomRight.x).to.equal(125)
      expect(pattern.stacks.test.bottomRight.y).to.equal(458)
      expect(pattern.stacks.test.width).to.equal(108)
      expect(pattern.stacks.test.height).to.equal(384)
    })

    it('Should calculate the part boundary with custom margin', () => {
      const part = {
        name: 'test',
        draft: ({ points, Point, paths, Path, part }) => {
          points.from = new Point(123, 456)
          points.to = new Point(19, 76)
          paths.test = new Path().move(points.from).line(points.to)

          return part
        },
      }
      const design = new Design({ parts: [part] })
      const pattern = new design({ margin: 5 })
      pattern.draft().render()
      expect(pattern.stacks.test.topLeft.x).to.equal(14)
      expect(pattern.stacks.test.topLeft.y).to.equal(71)
      expect(pattern.stacks.test.bottomRight.x).to.equal(128)
      expect(pattern.stacks.test.bottomRight.y).to.equal(461)
      expect(pattern.stacks.test.width).to.equal(114)
      expect(pattern.stacks.test.height).to.equal(390)
    })

    it('Should calculate the part boundary for paperless', () => {
      const part = {
        name: 'test',
        draft: ({ points, Point, paths, Path, part }) => {
          points.from = new Point(123, 456)
          points.to = new Point(19, 76)
          paths.test = new Path().move(points.from).line(points.to)

          return part
        },
      }
      const design = new Design({ parts: [part] })
      const pattern = new design({ paperless: true })
      pattern.draft().render()
      expect(pattern.stacks.test.topLeft.x).to.equal(9)
      expect(pattern.stacks.test.topLeft.y).to.equal(66)
    })

    it('Should generate the stack transforms', () => {
      const part = {
        name: 'test',
        draft: ({ points, Point, paths, Path, part }) => {
          points.from = new Point(2, 2)
          points.to = new Point(19, 76)
          paths.test = new Path().move(points.from).line(points.to)

          return part
        },
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      pattern.draft().render()
      pattern.stacks.test.generateTransform({
        move: {
          x: 10,
          y: 20,
        },
      })
      expect(pattern.stacks.test.attributes.list.transform.length).to.equal(1)
      expect(pattern.stacks.test.attributes.list.transform[0]).to.equal('translate(10, 20)')
    })
  })

  describe('Stack.prototype.home()', () => {
    function dummyPart(tl, br) {
      return {
        __boundary: () => null,
        topLeft: new Point(tl.x, tl.y),
        bottomRight: new Point(br.x, br.y),
        attributes: new Attributes(),
      }
    }

    it('Should calculate the bounds using all part bounds', () => {
      const stack = new Stack('test')
      stack.context = { settings: [{ margin: 0 }] }
      const expectedTlX = -1
      const expectedTlY = -2
      const expectedBrX = 20
      const expectedBrY = 20

      stack.addPart(dummyPart({ x: 0, y: expectedTlY }, { x: expectedBrX, y: 10 }))

      stack.addPart(dummyPart({ x: expectedTlX, y: 0 }, { x: expectedBrX, y: expectedBrY }))

      stack.home()
      expect(stack.topLeft.x).to.equal(expectedTlX)
      expect(stack.topLeft.y).to.equal(expectedTlY)
      expect(stack.bottomRight.x).to.equal(expectedBrX)
      expect(stack.bottomRight.y).to.equal(expectedBrY)
    })

    it('Should calculate the bounds using all transformed part bounds', () => {
      const stack = new Stack('test')
      stack.context = { settings: [{ margin: 0 }] }

      const part1 = dummyPart({ x: 0, y: 0 }, { x: 10, y: 10 })
      part1.attributes.add('transform', 'scale(1, -1)')
      part1.attributes.add('transform', 'rotate(45)')
      stack.addPart(part1)

      stack.home()
      expect(stack.topLeft.x).to.equal(-7.071067811865475)
      expect(stack.topLeft.y).to.equal(-14.142135623730951)
      expect(stack.bottomRight.x).to.equal(7.0710678118654755)
      expect(stack.bottomRight.y).to.equal(0)
    })

    it('Should handle an empty stack', () => {
      const stack = new Stack('test')
      stack.context = { settings: [{ margin: 0 }] }
      stack.home()
      expect(stack.topLeft.x).to.equal(0)
      expect(stack.topLeft.y).to.equal(0)
      expect(stack.bottomRight.x).to.equal(0)
      expect(stack.bottomRight.y).to.equal(0)
    })
  })

  it('Should get the anchor for the stack', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.anchor = new Point(2, 2)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft().render()
    const anchor = pattern.stacks.test.getAnchor()
    expect(anchor.name).to.equal('anchor')
    expect(anchor.x).to.equal(2)
    expect(anchor.y).to.equal(2)
  })

  it('Should get the gridAnchor for the stack', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.gridAnchor = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft().render()
    const anchor = pattern.stacks.test.getAnchor()
    expect(anchor.name).to.equal('gridAnchor')
    expect(anchor.x).to.equal(3)
    expect(anchor.y).to.equal(3)
  })

  it('Should get the default aAnchor for the stack', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, part }) => {
        points.test = new Point(3, 3)

        return part
      },
    }
    const design = new Design({ parts: [part] })
    const pattern = new design()
    pattern.draft().render()
    const anchor = pattern.stacks.test.getAnchor()
    expect(anchor.x).to.equal(0)
    expect(anchor.y).to.equal(0)
  })
})
