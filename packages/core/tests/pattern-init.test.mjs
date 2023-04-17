import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Pattern', () => {
  describe('Pattern.constructor()', () => {
    it('Pattern constructor should return pattern object', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      expect(typeof pattern).to.equal('object')
    })

    it('Pattern constructor should add enumerable properties', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      expect(Array.isArray(pattern.settings)).to.equal(true)
      expect(Array.isArray(pattern.setStores)).to.equal(true)
      expect(typeof pattern.store).to.equal('object')
      expect(typeof pattern.config).to.equal('object')
      expect(Object.keys(pattern)).to.have.lengthOf(5)
    })

    it('Pattern constructor should add non-enumerable properties', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      expect(typeof pattern.plugins).to.equal('object')
      expect(typeof pattern.autoLayout).to.equal('object')
      expect(typeof pattern.Point).to.equal('function')
      expect(typeof pattern.Path).to.equal('function')
      expect(typeof pattern.Snippet).to.equal('function')
      expect(typeof pattern.Attributes).to.equal('function')
      // expect(typeof pattern.__designParts).to.equal('object')
      // expect(typeof pattern.config.inject).to.equal('object')
      // expect(typeof pattern.config.directDependencies).to.equal('object')
      // expect(typeof pattern.__resolvedDependencies).to.equal('object')
      // expect(typeof pattern.__hide).to.equal('object')
      // expect(Array.isArray(pattern.__draftOrder)).to.equal(true)
      expect(pattern.width).to.equal(0)
      expect(pattern.height).to.equal(0)
      expect(pattern.is).to.equal('')
    })

    it('Pattern constructor should add default settings', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      const dflts = {
        complete: true,
        idPrefix: 'fs-',
        locale: 'en',
        units: 'metric',
        margin: 2,
        scale: 1,
        layout: true,
        options: {},
        absoluteOptions: {},
      }
      for (const [key, value] of Object.entries(dflts)) {
        if (typeof value === 'object') expect(Object.keys(value)).to.have.lengthOf(0)
        else expect(pattern.settings[0][key]).to.equal(value)
      }
    })
  })

  describe('Pattern.__init()', () => {
    const partA = {
      name: 'test.partA',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['chest', 'waist'],
      options: {
        optA: { pct: 40, min: 20, max: 80 },
      },
      draft: ({ part }) => part,
    }
    const partB = {
      name: 'test.partB',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['knee'],
      after: partA,
      plugins: [
        {
          name: 'testPlugin',
          hooks: {
            preRender: () => {},
          },
        },
      ],
      options: {
        optB: { deg: 40, min: 20, max: 80 },
      },
      draft: ({ part }) => part,
    }
    const partC = {
      name: 'test.partC',
      measurements: ['head', 'knee'],
      optionalMeasurements: ['knee'],
      from: partB,
      options: {
        optC: { pct: 20, min: 10, max: 30 },
      },
      draft: ({ part }) => part,
    }

    const Pattern = new Design({
      data: {
        name: 'test',
        version: '1.2.3',
      },
      parts: [partC],
    })
    const pattern = new Pattern()
    pattern.__init()

    it('Pattern.__init() should resolve all measurements', () => {
      expect(
        [...pattern.config.measurements, ...pattern.config.optionalMeasurements].length
      ).to.equal(4)
    })

    it('Pattern.__init() should resolve required measurements', () => {
      expect(pattern.config.measurements).to.have.lengthOf(2)
      expect(pattern.config.measurements[0]).to.equal('head')
      expect(pattern.config.measurements[1]).to.equal('knee')
    })

    it('Pattern.__init() should resolve optional measurements', () => {
      expect(pattern.config.optionalMeasurements).to.have.lengthOf(2)
      expect(pattern.config.optionalMeasurements[0]).to.equal('chest')
      expect(pattern.config.optionalMeasurements[1]).to.equal('waist')
    })

    it('Pattern.__init() should resolve options', () => {
      expect(Object.keys(pattern.config.options)).to.have.lengthOf(3)
      for (const [key, value] of Object.entries(partA.options.optA)) {
        expect(pattern.config.options.optA[key]).to.equal(value)
      }
      for (const [key, value] of Object.entries(partB.options.optB)) {
        expect(pattern.config.options.optB[key]).to.equal(value)
      }
      for (const [key, value] of Object.entries(partC.options.optC)) {
        expect(pattern.config.options.optC[key]).to.equal(value)
      }
    })

    it('Pattern.__init() should resolve parts', () => {
      expect(Object.keys(pattern.config.parts)).to.have.lengthOf(3)
    })

    it('Pattern.__init() should resolve plugins', () => {
      expect(Object.keys(pattern.config.plugins)).to.have.lengthOf(1)
    })

    it('Pattern.__init() should set config data in the store', () => {
      expect(pattern.store.get('data.name')).to.equal('test')
      expect(pattern.store.get('data.version')).to.equal('1.2.3')
    })

    it('Pattern.__init() should resolve dependencies', () => {
      expect(typeof pattern.config.resolvedDependencies).to.equal('object')
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partA'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partA']).to.have.lengthOf(0)
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partB'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partB']).to.have.lengthOf(1)
      expect(pattern.config.resolvedDependencies['test.partB'][0]).to.equal('test.partA')
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partC'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partC']).to.have.lengthOf(2)
      expect(
        pattern.config.resolvedDependencies['test.partC'].indexOf('test.partA') !== -1
      ).to.equal(true)
      expect(
        pattern.config.resolvedDependencies['test.partC'].indexOf('test.partB') !== -1
      ).to.equal(true)
    })

    it('Pattern.__init() should resolve the draft order', () => {
      expect(Array.isArray(pattern.config.draftOrder)).to.equal(true)
      expect(pattern.config.draftOrder[0]).to.equal('test.partA')
      expect(pattern.config.draftOrder[1]).to.equal('test.partB')
      expect(pattern.config.draftOrder[2]).to.equal('test.partC')
    })

    it('Pattern.__init() should overwrite options from dependencies', () => {
      const partD = {
        name: 'test.partD',
        from: partB,
        options: {
          optB: { deg: 25, min: 15, max: 45 },
        },
        draft: ({ part }) => part,
      }

      const Pattern = new Design({
        data: {
          name: 'test',
          version: '1.2.3',
        },
        parts: [partD],
      })
      const pattern = new Pattern()
      pattern.__init()
      for (const [key, value] of Object.entries(partD.options.optB)) {
        expect(pattern.config.options.optB[key]).to.equal(value)
      }
    })

    it('Pattern.__init() should overwrite options from complex dependencies', () => {
      const partD = {
        name: 'test.partD',
        from: partB,
        options: {
          optB: { deg: 25, min: 15, max: 45 },
        },
        draft: ({ part }) => part,
      }

      const partE = {
        name: 'test.partE',
        from: partD,
        options: {
          optB: { deg: 10, min: 15, max: 50 },
        },
        draft: ({ part }) => part,
      }

      const Pattern = new Design({
        data: {
          name: 'test',
          version: '1.2.3',
        },
        parts: [partC, partE],
      })
      const pattern = new Pattern()
      pattern.__init()
      for (const [key, value] of Object.entries(partE.options.optB)) {
        expect(pattern.config.options.optB[key]).to.equal(value)
      }
    })

    it('Pattern.__init() should resolve nested dependencies for multiple parts that depend on the same part', () => {
      const partD = {
        name: 'test.partD',
        from: partB,
        draft: ({ part }) => part,
      }

      const Pattern = new Design({
        data: {
          name: 'test',
          version: '1.2.3',
        },
        parts: [partC, partD],
      })
      const pattern = new Pattern()
      pattern.__init()
      expect(pattern.config.resolvedDependencies['test.partD']).to.have.members([
        'test.partA',
        'test.partB',
      ])
      expect(pattern.config.resolvedDependencies['test.partC']).to.have.members([
        'test.partA',
        'test.partB',
      ])
    })

    // I am aware this does too much for one unit test, but this is to simplify TDD
    // we can split it up later
    it('Pattern.__init() should resolve nested injections', () => {
      const partA = {
        name: 'partA',
        options: { optionA: { bool: true } },
        measurements: ['measieA'],
        optionalMeasurements: ['optmeasieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.a1 = new Point(1, 1)
          points.a2 = new Point(11, 11)
          paths.a = new Path().move(points.a1).line(points.a2)

          return part
        },
      }
      const partB = {
        name: 'partB',
        from: partA,
        options: { optionB: { pct: 12, min: 2, max: 20 } },
        measurements: ['measieB'],
        optionalMeasurements: ['optmeasieB', 'measieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.b1 = new Point(2, 2)
          points.b2 = new Point(22, 22)
          paths.b = new Path().move(points.b1).line(points.b2)
          return part
        },
      }
      const partC = {
        name: 'partC',
        from: partB,
        options: { optionC: { deg: 5, min: 0, max: 15 } },
        measurements: ['measieC'],
        optionalMeasurements: ['optmeasieC', 'measieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.c1 = new Point(3, 3)
          points.c2 = new Point(33, 33)
          paths.c = new Path().move(points.c1).line(points.c2)
          return part
        },
      }
      const partR = {
        // R for runtime, which is when this wil be attached
        name: 'partR',
        from: partA,
        after: partC,
        options: { optionR: { dflt: 'red', list: ['red', 'green', 'blue'] } },
        measurements: ['measieR'],
        optionalMeasurements: ['optmeasieR', 'measieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.r1 = new Point(4, 4)
          points.r2 = new Point(44, 44)
          paths.r = new Path().move(points.r1).line(points.r2)
          return part
        },
      }

      const design = new Design({ parts: [partC] })
      const pattern = new design().addPart(partR).draft()
      // Measurements
      expect(pattern.config.measurements).to.have.lengthOf(4)
      expect(pattern.config.measurements.indexOf('measieA') === -1).to.equal(false)
      expect(pattern.config.measurements.indexOf('measieB') === -1).to.equal(false)
      expect(pattern.config.measurements.indexOf('measieC') === -1).to.equal(false)
      expect(pattern.config.measurements.indexOf('measieR') === -1).to.equal(false)
      // Optional measurements
      expect(pattern.config.optionalMeasurements).to.have.lengthOf(4)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieA') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieB') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieC') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieR') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('measieA') === -1).to.equal(true)
      // Options
      expect(pattern.config.options.optionA.bool).to.equal(true)
      expect(pattern.config.options.optionB.pct).to.equal(12)
      expect(pattern.config.options.optionB.min).to.equal(2)
      expect(pattern.config.options.optionB.max).to.equal(20)
      expect(pattern.config.options.optionC.deg).to.equal(5)
      expect(pattern.config.options.optionC.min).to.equal(0)
      expect(pattern.config.options.optionC.max).to.equal(15)
      expect(pattern.config.options.optionR.dflt).to.equal('red')
      expect(pattern.config.options.optionR.list[0]).to.equal('red')
      expect(pattern.config.options.optionR.list[1]).to.equal('green')
      expect(pattern.config.options.optionR.list[2]).to.equal('blue')
      // Dependencies
      expect(pattern.config.directDependencies.partB).to.include('partA')
      expect(pattern.config.directDependencies.partC).to.include('partB')
      expect(pattern.config.directDependencies.partR).to.include('partC')
      expect(pattern.config.directDependencies.partR).to.include('partA')
      // Inject
      expect(pattern.config.inject.partB).to.equal('partA')
      expect(pattern.config.inject.partC).to.equal('partB')
      expect(pattern.config.inject.partR).to.equal('partA')
      // Draft order
      expect(pattern.config.draftOrder[0]).to.equal('partA')
      expect(pattern.config.draftOrder[1]).to.equal('partB')
      expect(pattern.config.draftOrder[2]).to.equal('partC')
      expect(pattern.config.draftOrder[3]).to.equal('partR')
      // Points
      expect(pattern.parts[0].partA.points.a1.x).to.equal(1)
      expect(pattern.parts[0].partA.points.a1.y).to.equal(1)
      expect(pattern.parts[0].partA.points.a2.x).to.equal(11)
      expect(pattern.parts[0].partA.points.a2.y).to.equal(11)
      expect(pattern.parts[0].partB.points.b1.x).to.equal(2)
      expect(pattern.parts[0].partB.points.b1.y).to.equal(2)
      expect(pattern.parts[0].partB.points.b2.x).to.equal(22)
      expect(pattern.parts[0].partB.points.b2.y).to.equal(22)
      expect(pattern.parts[0].partC.points.c1.x).to.equal(3)
      expect(pattern.parts[0].partC.points.c1.y).to.equal(3)
      expect(pattern.parts[0].partC.points.c2.x).to.equal(33)
      expect(pattern.parts[0].partC.points.c2.y).to.equal(33)
      expect(pattern.parts[0].partR.points.r1.x).to.equal(4)
      expect(pattern.parts[0].partR.points.r1.y).to.equal(4)
      expect(pattern.parts[0].partR.points.r2.x).to.equal(44)
      expect(pattern.parts[0].partR.points.r2.y).to.equal(44)
      // Paths in partA
      expect(pattern.parts[0].partA.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partA.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partA.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partA.paths.a.ops[1].to.y).to.equal(11)
      // Paths in partB
      expect(pattern.parts[0].partB.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partB.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partB.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partB.paths.a.ops[1].to.y).to.equal(11)
      expect(pattern.parts[0].partB.paths.b.ops[0].to.x).to.equal(2)
      expect(pattern.parts[0].partB.paths.b.ops[0].to.y).to.equal(2)
      expect(pattern.parts[0].partB.paths.b.ops[1].to.x).to.equal(22)
      expect(pattern.parts[0].partB.paths.b.ops[1].to.y).to.equal(22)
      // Paths in partC
      expect(pattern.parts[0].partC.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partC.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partC.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partC.paths.a.ops[1].to.y).to.equal(11)
      expect(pattern.parts[0].partC.paths.b.ops[0].to.x).to.equal(2)
      expect(pattern.parts[0].partC.paths.b.ops[0].to.y).to.equal(2)
      expect(pattern.parts[0].partC.paths.b.ops[1].to.x).to.equal(22)
      expect(pattern.parts[0].partC.paths.b.ops[1].to.y).to.equal(22)
      expect(pattern.parts[0].partC.paths.c.ops[0].to.x).to.equal(3)
      expect(pattern.parts[0].partC.paths.c.ops[0].to.y).to.equal(3)
      expect(pattern.parts[0].partC.paths.c.ops[1].to.x).to.equal(33)
      expect(pattern.parts[0].partC.paths.c.ops[1].to.y).to.equal(33)
      // Paths in partR
      expect(pattern.parts[0].partC.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partC.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partC.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partC.paths.a.ops[1].to.y).to.equal(11)
      expect(pattern.parts[0].partR.paths.r.ops[0].to.x).to.equal(4)
      expect(pattern.parts[0].partR.paths.r.ops[0].to.y).to.equal(4)
      expect(pattern.parts[0].partR.paths.r.ops[1].to.x).to.equal(44)
      expect(pattern.parts[0].partR.paths.r.ops[1].to.y).to.equal(44)
    })

    it('Pattern.__init() should resolve nested dependencies', () => {
      const partA = {
        name: 'partA',
        options: { optionA: { bool: true } },
        measurements: ['measieA'],
        optionalMeasurements: ['optmeasieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.a1 = new Point(1, 1)
          points.a2 = new Point(11, 11)
          paths.a = new Path().move(points.a1).line(points.a2)
          return part
        },
      }
      const partB = {
        name: 'partB',
        from: partA,
        options: { optionB: { pct: 12, min: 2, max: 20 } },
        measurements: ['measieB'],
        optionalMeasurements: ['optmeasieB', 'measieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.b1 = new Point(2, 2)
          points.b2 = new Point(22, 22)
          paths.b = new Path().move(points.b1).line(points.b2)
          return part
        },
      }
      const partC = {
        name: 'partC',
        from: partB,
        options: { optionC: { deg: 5, min: 0, max: 15 } },
        measurements: ['measieC'],
        optionalMeasurements: ['optmeasieC', 'measieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.c1 = new Point(3, 3)
          points.c2 = new Point(33, 33)
          paths.c = new Path().move(points.c1).line(points.c2)
          return part
        },
      }
      const partD = {
        name: 'partD',
        after: partC,
        options: { optionD: { dflt: 'red', list: ['red', 'green', 'blue'] } },
        measurements: ['measieD'],
        optionalMeasurements: ['optmeasieD', 'measieA'],
        draft: ({ points, Point, paths, Path, part }) => {
          points.d1 = new Point(4, 4)
          points.d2 = new Point(44, 44)
          paths.d = new Path().move(points.d1).line(points.d2)
          return part
        },
      }
      const design = new Design({ parts: [partD] })
      const pattern = new design().draft()
      // Measurements
      expect(pattern.config.measurements).to.have.lengthOf(4)
      expect(pattern.config.measurements.indexOf('measieA') === -1).to.equal(false)
      expect(pattern.config.measurements.indexOf('measieB') === -1).to.equal(false)
      expect(pattern.config.measurements.indexOf('measieC') === -1).to.equal(false)
      expect(pattern.config.measurements.indexOf('measieD') === -1).to.equal(false)
      // Optional measurements
      expect(pattern.config.optionalMeasurements).to.have.lengthOf(4)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieA') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieB') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieC') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('optmeasieD') === -1).to.equal(false)
      expect(pattern.config.optionalMeasurements.indexOf('measieA') === -1).to.equal(true)
      // Options
      expect(pattern.config.options.optionA.bool).to.equal(true)
      expect(pattern.config.options.optionB.pct).to.equal(12)
      expect(pattern.config.options.optionB.min).to.equal(2)
      expect(pattern.config.options.optionB.max).to.equal(20)
      expect(pattern.config.options.optionC.deg).to.equal(5)
      expect(pattern.config.options.optionC.min).to.equal(0)
      expect(pattern.config.options.optionC.max).to.equal(15)
      expect(pattern.config.options.optionD.dflt).to.equal('red')
      expect(pattern.config.options.optionD.list[0]).to.equal('red')
      expect(pattern.config.options.optionD.list[1]).to.equal('green')
      expect(pattern.config.options.optionD.list[2]).to.equal('blue')
      // Dependencies
      expect(pattern.config.directDependencies.partB[0]).to.equal('partA')
      expect(pattern.config.directDependencies.partC[0]).to.equal('partB')
      expect(pattern.config.directDependencies.partD[0]).to.equal('partC')
      // Inject
      expect(pattern.config.inject.partB).to.equal('partA')
      expect(pattern.config.inject.partC).to.equal('partB')
      // Draft order
      expect(pattern.config.draftOrder[0]).to.equal('partA')
      expect(pattern.config.draftOrder[1]).to.equal('partB')
      expect(pattern.config.draftOrder[2]).to.equal('partC')
      expect(pattern.config.draftOrder[3]).to.equal('partD')
      // Points
      expect(pattern.parts[0].partA.points.a1.x).to.equal(1)
      expect(pattern.parts[0].partA.points.a1.y).to.equal(1)
      expect(pattern.parts[0].partA.points.a2.x).to.equal(11)
      expect(pattern.parts[0].partA.points.a2.y).to.equal(11)
      expect(pattern.parts[0].partB.points.b1.x).to.equal(2)
      expect(pattern.parts[0].partB.points.b1.y).to.equal(2)
      expect(pattern.parts[0].partB.points.b2.x).to.equal(22)
      expect(pattern.parts[0].partB.points.b2.y).to.equal(22)
      expect(pattern.parts[0].partC.points.c1.x).to.equal(3)
      expect(pattern.parts[0].partC.points.c1.y).to.equal(3)
      expect(pattern.parts[0].partC.points.c2.x).to.equal(33)
      expect(pattern.parts[0].partC.points.c2.y).to.equal(33)
      expect(pattern.parts[0].partD.points.d1.x).to.equal(4)
      expect(pattern.parts[0].partD.points.d1.y).to.equal(4)
      expect(pattern.parts[0].partD.points.d2.x).to.equal(44)
      expect(pattern.parts[0].partD.points.d2.y).to.equal(44)
      // Paths in partA
      expect(pattern.parts[0].partA.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partA.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partA.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partA.paths.a.ops[1].to.y).to.equal(11)
      // Paths in partB
      expect(pattern.parts[0].partB.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partB.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partB.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partB.paths.a.ops[1].to.y).to.equal(11)
      expect(pattern.parts[0].partB.paths.b.ops[0].to.x).to.equal(2)
      expect(pattern.parts[0].partB.paths.b.ops[0].to.y).to.equal(2)
      expect(pattern.parts[0].partB.paths.b.ops[1].to.x).to.equal(22)
      expect(pattern.parts[0].partB.paths.b.ops[1].to.y).to.equal(22)
      // Paths in partC
      expect(pattern.parts[0].partC.paths.a.ops[0].to.x).to.equal(1)
      expect(pattern.parts[0].partC.paths.a.ops[0].to.y).to.equal(1)
      expect(pattern.parts[0].partC.paths.a.ops[1].to.x).to.equal(11)
      expect(pattern.parts[0].partC.paths.a.ops[1].to.y).to.equal(11)
      expect(pattern.parts[0].partC.paths.b.ops[0].to.x).to.equal(2)
      expect(pattern.parts[0].partC.paths.b.ops[0].to.y).to.equal(2)
      expect(pattern.parts[0].partC.paths.b.ops[1].to.x).to.equal(22)
      expect(pattern.parts[0].partC.paths.b.ops[1].to.y).to.equal(22)
      expect(pattern.parts[0].partC.paths.c.ops[0].to.x).to.equal(3)
      expect(pattern.parts[0].partC.paths.c.ops[0].to.y).to.equal(3)
      expect(pattern.parts[0].partC.paths.c.ops[1].to.x).to.equal(33)
      expect(pattern.parts[0].partC.paths.c.ops[1].to.y).to.equal(33)
      // Paths in partR
      expect(pattern.parts[0].partD.paths.d.ops[0].to.x).to.equal(4)
      expect(pattern.parts[0].partD.paths.d.ops[0].to.y).to.equal(4)
      expect(pattern.parts[0].partD.paths.d.ops[1].to.x).to.equal(44)
      expect(pattern.parts[0].partD.paths.d.ops[1].to.y).to.equal(44)
    })

    it('Pattern.__init() should load a single plugin', () => {
      const plugin = {
        name: 'example',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example', 1)
          },
        },
      }
      const part = {
        name: 'test.part',
        plugins: plugin,
        draft: (part) => part,
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      pattern.draft()
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(1)
    })

    it('Pattern.__init() should load array of plugins', () => {
      const plugin1 = {
        name: 'example1',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example1', 1)
          },
        },
      }
      const plugin2 = {
        name: 'example2',
        version: 2,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example2', 2)
          },
        },
      }
      const part = {
        name: 'test.part',
        plugins: [plugin1, plugin2],
        draft: (part) => part,
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      pattern.__init()
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(2)
    })

    it('Pattern.__init() should load conditional plugin if condition is met', () => {
      const plugin = {
        name: 'example',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example', 1)
          },
        },
      }
      const condition = () => true
      const part = {
        name: 'test.part',
        plugins: [{ plugin, condition }],
        draft: (part) => part,
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      pattern.__init()
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(1)
    })

    it('Pattern.__init() should not load conditional plugin if condition is not mett', () => {
      const plugin = {
        name: 'example',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example', 1)
          },
        },
      }
      const condition = () => false
      const part = {
        name: 'test.part',
        plugins: [{ plugin, condition }],
        draft: (part) => part,
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(0)
    })

    it('Pattern.__init() should load multiple conditional plugins', () => {
      const plugin1 = {
        name: 'example1',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example', 1)
          },
        },
      }
      const plugin2 = {
        name: 'example2',
        version: 2,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example', 2)
          },
        },
      }
      const condition1 = () => true
      const condition2 = () => false
      const part = {
        name: 'test.part',
        plugins: [
          { plugin: plugin1, condition: condition1 },
          { plugin: plugin2, condition: condition2 },
        ],
        draft: (part) => part,
      }
      const design = new Design({ parts: [part] })
      const pattern = new design()
      pattern.draft()
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(1)
    })

    it('Pattern.__init() should load a conditional plugin multiple times with different conditions', () => {
      const plugin1 = {
        name: 'example1',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example', 1)
          },
        },
      }

      const condition1 = () => true
      const condition2 = () => false
      const part = {
        name: 'test.part',
        plugins: [{ plugin: plugin1, condition: condition1 }],
        draft: (part) => part,
      }
      const part2 = {
        name: 'test.part2',
        plugins: [{ plugin: plugin1, condition: condition2 }],
        draft: (part) => part,
      }
      const design = new Design({ parts: [part, part2] })
      const pattern = new design()
      pattern.__init()
      expect(pattern.config.plugins).to.be.an('object').that.has.all.keys('example1', 'example1_')
      expect(pattern.config.plugins.example1.plugin).to.deep.equal(plugin1)
      expect(pattern.config.plugins.example1_.plugin).to.deep.equal(plugin1)
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(1)
    })

    it('Load conditional plugins that are also passing data', () => {
      const plugin1 = {
        name: 'example1',
        version: 1,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example1', 1)
          },
        },
      }
      const plugin2 = {
        name: 'example2',
        version: 2,
        hooks: {
          preRender: function (svg) {
            svg.attributes.add('freesewing:plugin-example2', 1)
          },
        },
      }
      const condition1 = () => true
      const condition2 = () => false
      const part1 = {
        name: 'part1',
        plugins: [[plugin1, { some: 'data' }], { plugin: plugin2, condition: condition1 }],
        draft: ({ part }) => part,
      }
      const part2 = {
        name: 'part2',
        plugins: [plugin2, { plugin: plugin2, condition: condition2 }],
        draft: ({ part }) => part,
      }
      const design = new Design({
        parts: [part1, part2],
      })
      const pattern = new design()
      pattern.__init()
      expect(pattern.plugins.hooks.preRender).to.have.lengthOf(2)
    })

    it('Pattern.__init() should register a hook via on', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      let count = 0
      pattern.on('preDraft', function () {
        count++
      })
      pattern.draft()
      expect(count).to.equal(1)
    })

    it('Pattern.__init() should register a hook from a plugin', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      let count = 0
      pattern._draft = () => {}
      const plugin = {
        name: 'test',
        version: '0.1-test',
        hooks: {
          preDraft: function () {
            count++
          },
        },
      }
      pattern.use(plugin)
      pattern.draft()
      expect(count).to.equal(1)
    })

    it('Pattern.__init() should register multiple methods on a single hook', () => {
      const plugin = {
        name: 'test',
        version: '0.1-test',
        hooks: {
          preDraft: [
            function () {
              count++
            },
            function () {
              count++
            },
          ],
        },
      }
      const Pattern = new Design()
      const pattern = new Pattern()
      let count = 0
      pattern._draft = () => {}
      pattern.use(plugin)
      pattern.draft()
      expect(count).to.equal(2)
    })

    it('Should check whether created parts get the pattern context', () => {
      let partContext
      const plugin = {
        name: 'example',
      }
      const part = {
        name: 'test',
        draft: ({ Point, paths, Path, part, context }) => {
          paths.test = new Path().move(new Point(0, 0)).line(new Point(100, 0))
          partContext = context

          return part
        },
        plugins: [plugin],
      }
      const Pattern = new Design({ parts: [part], data: { name: 'test', version: '1' } })
      const pattern = new Pattern()
      pattern.draft()
      expect(typeof partContext).to.equal('object')
      expect(typeof partContext.parts).to.equal('object')
      expect(typeof partContext.config).to.equal('object')
      expect(typeof partContext.config.options).to.equal('object')
      expect(typeof partContext.store.data).to.equal('object')
      expect(partContext.store.data.name).to.equal('test')
      expect(partContext.store.get('data.name')).to.equal('test')
      expect(Array.isArray(partContext.config.measurements)).to.equal(true)
      expect(Array.isArray(partContext.config.optionalMeasurements)).to.equal(true)
      expect(typeof partContext.config.plugins).to.equal('object')
      expect(typeof partContext.parts).to.equal('object')
      expect(partContext.settings).to.equal(pattern.settings[0])
      expect(typeof partContext.store).to.equal('object')
      expect(typeof partContext.store.log).to.equal('object')
      expect(typeof partContext.store.log.debug).to.equal('function')
      expect(typeof partContext.store.log.info).to.equal('function')
      expect(typeof partContext.store.log.warning).to.equal('function')
      expect(typeof partContext.store.log.error).to.equal('function')
      expect(typeof partContext.store.logs).to.equal('object')
      expect(Array.isArray(partContext.store.logs.debug)).to.equal(true)
      expect(Array.isArray(partContext.store.logs.info)).to.equal(true)
      expect(Array.isArray(partContext.store.logs.warning)).to.equal(true)
      expect(Array.isArray(partContext.store.logs.error)).to.equal(true)
    })
  })

  describe('Pattern.settings', () => {
    const part = {
      name: 'test.part',
      options: {
        pct: { pct: 30, min: 10, max: 50 },
        altpct: { pct: 30, min: 10, max: 50 },
        mm: { mm: 12, min: 4, max: 23 },
        deg: { deg: 2, min: 1, max: 3 },
        list: {
          dflt: 'd',
          choices: ['a', 'b', 'c', 'd'],
        },
        count: { count: 4, min: 1, max: 13 },
        bool: { bool: false },
      },
      draft: () => {},
    }
    const Pattern = new Design({
      data: {
        name: 'test',
        version: '1.2.3',
      },
      parts: [part],
    })
    const pattern = new Pattern()
    pattern.__init()

    it('Pattern settings should contain percentage options', () => {
      expect(pattern.settings[0].options.pct).to.equal(0.3)
    })

    it('Pattern settings should contain millimeter options', () => {
      expect(pattern.settings[0].options.mm).to.equal(12)
    })

    it('Pattern settings should contain degree options', () => {
      expect(pattern.settings[0].options.deg).to.equal(2)
    })

    it('Pattern settings should contain list options', () => {
      expect(pattern.settings[0].options.list).to.equal('d')
    })

    it('Pattern settings should contain count options', () => {
      expect(pattern.settings[0].options.count).to.equal(4)
    })

    it('Pattern settings should contain bool options', () => {
      expect(pattern.settings[0].options.bool).to.equal(false)
    })

    it('Pattern should throw an error for an unknown option', () => {
      const part = {
        name: 'test.part',
        options: { unknown: { foo: 30 } },
        draft: () => {},
      }
      let error
      try {
        new Design({
          data: { name: 'test', version: '1.2.3' },
          parts: [part],
        })
      } catch (err) {
        error = err
      }
      expect('' + error).to.contain('Unknown option type')
    })
  })
})
