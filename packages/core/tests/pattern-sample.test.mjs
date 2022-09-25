import chai from 'chai'
import { round, Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern', () => {
  describe('Pattern.sample()', () => {
    it('Should sample an option', () => {
      const part = {
        name: 'test',
        measurements: ['head'],
        options: {
          size: { pct: 50, min: 20, max: 80 },
        },
        draft: ({ Point, paths, Path, measurements, options, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(0, measurements.head * options.size))

          return part
        },
      }
      const Pattern = new Design({ parts: [part] })
      const pattern = new Pattern({
        measurements: { head: 400 },
        sample: {
          type: 'option',
          option: 'size',
        },
      })
      pattern.sample()
      expect(pattern.setStores.length).to.equal(10)
      expect(pattern.settings.length).to.equal(10)
      expect(pattern.parts[9].test.paths.test.ops[1].to.y).to.equal(320)
    })

    it('Should sample a static option', () => {
      const part = {
        name: 'test',
        measurements: ['head'],
        options: {
          size: 0.05,
        },
        draft: ({ Point, paths, Path, measurements, options, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(0, measurements.head * options.size))

          return part
        },
      }
      const Pattern = new Design({ parts: [part] })
      const pattern = new Pattern({
        measurements: { head: 400 },
        sample: {
          type: 'option',
          option: 'size',
        },
      })
      pattern.sample()
      expect(pattern.setStores.length).to.equal(10)
      expect(pattern.settings.length).to.equal(10)
      expect(round(pattern.parts[9].test.paths.test.ops[1].to.y)).to.equal(22)
    })

    it('Should sample a list option', () => {
      const part = {
        name: 'test',
        measurements: ['head'],
        options: {
          size: { dflt: 5, list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        },
        draft: ({ Point, paths, Path, measurements, options, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(0, (measurements.head * options.size) / 10))

          return part
        },
      }
      const Pattern = new Design({ parts: [part] })
      const pattern = new Pattern({
        measurements: { head: 400 },
        sample: {
          type: 'option',
          option: 'size',
        },
      })
      pattern.sample()
      expect(pattern.setStores.length).to.equal(10)
      expect(pattern.settings.length).to.equal(10)
      expect(pattern.parts[9].test.paths.test.ops[1].to.y).to.equal(400)
    })

    it('Should sample a measurement', () => {
      const part = {
        name: 'test',
        measurements: ['head'],
        options: {
          size: { pct: 50, min: 20, max: 80 },
        },
        draft: ({ Point, paths, Path, measurements, options, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(0, measurements.head * options.size))

          return part
        },
      }
      const Pattern = new Design({ parts: [part] })
      const pattern = new Pattern({
        measurements: { head: 400 },
        sample: {
          type: 'measurement',
          measurement: 'head',
        },
      })
      pattern.sample()
      expect(pattern.setStores.length).to.equal(10)
      expect(pattern.settings.length).to.equal(10)
      expect(pattern.parts[9].test.paths.test.ops[1].to.y).to.equal(216)
    })

    it('Should log an error when sampling an undefined measurement', () => {
      const part = {
        name: 'test',
        measurements: ['head'],
        options: {
          size: { pct: 50, min: 20, max: 80 },
        },
        draft: ({ Point, paths, Path, measurements, options, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(0, measurements.head * options.size))

          return part
        },
      }
      const Pattern = new Design({ parts: [part] })
      const pattern = new Pattern({
        measurements: {},
        sample: {
          type: 'measurement',
          measurement: 'head',
        },
      })
      pattern.sample()
      expect(pattern.store.logs.error.length).to.equal(1)
      expect(pattern.store.logs.error[0]).to.equal(
        "Cannot sample measurement `head` because it's `undefined`"
      )
    })

    it('Should sample models', () => {
      const part = {
        name: 'test',
        measurements: ['head'],
        options: {
          size: { pct: 50, min: 20, max: 80 },
        },
        draft: ({ Point, paths, Path, measurements, options, part }) => {
          paths.test = new Path()
            .move(new Point(0, 0))
            .line(new Point(0, measurements.head * options.size))

          return part
        },
      }
      const Pattern = new Design({ parts: [part] })
      const pattern = new Pattern({
        measurements: { head: 400 },
        sample: {
          type: 'models',
          models: {
            a: { head: 100 },
            b: { head: 200 },
            c: { head: 300 },
            d: { head: 400 },
          },
          focus: 'c',
        },
      })
      pattern.sample()
      expect(pattern.setStores.length).to.equal(4)
      expect(pattern.settings.length).to.equal(4)
      expect(pattern.parts[3].test.paths.test.ops[1].to.y).to.equal(200)
    })
  })
})
