import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

if (!expect) console.log('shut up eslint REMOVE')

describe('Multisets', () => {
  describe('FIXME', () => {
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
      //stack: 'box',
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
      //stack: 'box',
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
      //stack: 'box',
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
    const pattern = new Pattern([
      {
        measurements: { head: 400 },
      },
      {
        measurements: { head: 400 },
      },
    ])
    pattern.draft()
  })
})
