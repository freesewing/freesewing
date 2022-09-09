import chai from 'chai'
import { round, Design, Point, pctBasedOn } from '../src/index.mjs'

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
      expect(typeof pattern.settings).to.equal('object')
      expect(typeof pattern.config).to.equal('object')
      expect(typeof pattern.parts).to.equal('object')
      expect(typeof pattern.store).to.equal('object')
      expect(Object.keys(pattern).length).to.equal(4)
    })

    it('Pattern constructor should add non-enumerable properties', () => {
      const Pattern = new Design()
      const pattern = new Pattern()
      expect(typeof pattern.plugins).to.equal('object')
      expect(typeof pattern.autoLayout).to.equal('object')
      expect(typeof pattern.hooks).to.equal('object')
      expect(typeof pattern.Point).to.equal('function')
      expect(typeof pattern.Path).to.equal('function')
      expect(typeof pattern.Snippet).to.equal('function')
      expect(typeof pattern.Attributes).to.equal('function')
      expect(typeof pattern.macros).to.equal('object')
      expect(typeof pattern.__parts).to.equal('object')
      expect(typeof pattern.__inject).to.equal('object')
      expect(typeof pattern.__dependencies).to.equal('object')
      expect(typeof pattern.__resolvedDependencies).to.equal('object')
      expect(typeof pattern.__hide).to.equal('object')
      expect(Array.isArray(pattern.__draftOrder)).to.equal(true)
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
        debug: false,
        options: {},
        absoluteOptions: {},
      }
      for (const [key, value] of Object.entries(dflts)) {
        if (typeof value === 'object') expect(Object.keys(value).length).to.equal(0)
        else expect(pattern.settings[key]).to.equal(value)
      }
    })

  })

  describe('Pattern.init()', () => {

    const partA = {
      name: 'test.partA',
      measurements: ['head', 'knee'],
      optionalMeasurements: [ 'chest', 'waist'],
      options: {
        optA: { pct: 40, min: 20, max: 80 }
      },
      draft: () => { }
    }
    const partB = {
      name: 'test.partB',
      measurements: ['head', 'knee'],
      optionalMeasurements: [ 'knee'],
      after: partA,
      plugins: [{
        name: 'testPlugin',
        hooks: {
          preRender: () => {}
        }
      }],
      options: {
        optB: { deg: 40, min: 20, max: 80 }
      },
      draft: () => { }
    }
    const partC = {
      name: 'test.partC',
      measurements: ['head', 'knee'],
      optionalMeasurements: [ 'knee'],
      from: partB,
      options: {
        optC: { pct: 20, min: 10, max: 30 }
      },
      draft: () => { }
    }

    const Pattern = new Design({
      data: {
        name: 'test',
        version: '1.2.3',
      },
      parts: [ partC ]
    })
    const pattern = new Pattern()
    pattern.init()

    it('Pattern.init() should resolve all measurements', () => {
      expect([
        ...pattern.config.measurements,
        ...pattern.config.optionalMeasurements
      ].length).to.equal(4)
    })

    it('Pattern.init() should resolve required measurements', () => {
      expect(pattern.config.measurements.length).to.equal(2)
      expect(pattern.config.measurements[0]).to.equal('head')
      expect(pattern.config.measurements[1]).to.equal('knee')
    })

    it('Pattern.init() should resolve optional measurements', () => {
      expect(pattern.config.optionalMeasurements.length).to.equal(2)
      expect(pattern.config.optionalMeasurements[0]).to.equal('chest')
      expect(pattern.config.optionalMeasurements[1]).to.equal('waist')
    })

    it('Pattern.init() should resolve options', () => {
      expect(Object.keys(pattern.config.options).length).to.equal(3)
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

    it('Pattern.init() should resolve parts', () => {
      expect(pattern.config.parts.length).to.equal(3)
    })

    it('Pattern.init() should resolve plugins', () => {
      expect(pattern.config.plugins.length).to.equal(1)
    })

    it('Pattern.init() should set config data in the store', () => {
      expect(pattern.store.get('data.name')).to.equal('test')
      expect(pattern.store.get('data.version')).to.equal('1.2.3')
    })

    it('Pattern.init() should resolve dependencies', () => {
      expect(typeof pattern.config.resolvedDependencies).to.equal('object')
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partA'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partA'].length).to.equal(0)
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partB'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partB'].length).to.equal(1)
      expect(pattern.config.resolvedDependencies['test.partB'][0]).to.equal('test.partA')
      expect(Array.isArray(pattern.config.resolvedDependencies['test.partC'])).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partC'].length).to.equal(2)
      expect(pattern.config.resolvedDependencies['test.partC'].indexOf('test.partA') !== -1).to.equal(true)
      expect(pattern.config.resolvedDependencies['test.partC'].indexOf('test.partB') !== -1).to.equal(true)
    })

    it('Pattern.init() should resolve the draft order', () => {
      expect(Array.isArray(pattern.config.draftOrder)).to.equal(true)
      expect(pattern.config.draftOrder[0]).to.equal('test.partA')
      expect(pattern.config.draftOrder[1]).to.equal('test.partB')
      expect(pattern.config.draftOrder[2]).to.equal('test.partC')
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
          choices: ['a', 'b' ,'c', 'd']
        },
        count: { count: 4, min: 1, max: 13 },
        bool: { bool: false },
      },
      draft: () => { }
    }
    const Pattern = new Design({
      data: {
        name: 'test',
        version: '1.2.3',
      },
      parts: [ part ]
    })
    const pattern = new Pattern()
    pattern.init()

    it('Pattern settings should contain percentage options', () => {
      expect(pattern.settings.options.pct).to.equal(0.3)
    })

    it('Pattern settings should contain millimeter options', () => {
      expect(pattern.settings.options.mm).to.equal(12)
    })

    it('Pattern settings should contain degree options', () => {
      expect(pattern.settings.options.deg).to.equal(2)
    })

    it('Pattern settings should contain list options', () => {
      expect(pattern.settings.options.list).to.equal('d')
    })

    it('Pattern settings should contain count options', () => {
      expect(pattern.settings.options.count).to.equal(4)
    })

    it('Pattern settings should contain bool options', () => {
      expect(pattern.settings.options.bool).to.equal(false)
    })
  })
})

