import chai from 'chai'
import { round, Design, Point, pctBasedOn } from '../src/index.mjs'

const expect = chai.expect

describe('Stacks', () => {
  describe('Pattern.init()', () => {
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
      //  stack: 'box',
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
    console.log(pattern.store.logs)
    //console.log(pattern.parts)
    //pattern.render()
    console.log(pattern.render())

    it('Pattern.init() should resolve dependencies', () => {
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
  })
})
