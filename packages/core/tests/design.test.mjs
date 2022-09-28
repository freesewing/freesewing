import chai from 'chai'
import { Design } from '../src/index.mjs'

const expect = chai.expect

describe('Design', () => {
  it('Design constructor should return pattern constructor', () => {
    const Pattern = new Design()
    expect(typeof Pattern).to.equal('function')
  })

  it('Design constructor should load the default config', () => {
    const Pattern = new Design()
    const config = Pattern.designConfig
    expect(Array.isArray(config.parts)).to.equal(true)
    expect(config.parts.length).to.equal(0)
    expect(typeof config.data).to.equal('object')
    expect(Object.keys(config.data).length).to.equal(0)
  })

  it(`Design constructor should add options to config`, () => {
    const settings = {
      options: {
        one: { pct: 50, min: 0, max: 100 },
        two: { deg: 10, min: 5, max: 15 },
      },
    }
    const Pattern = new Design(settings)
    const o = Pattern.designConfig.options
    expect(Object.keys(o).length).to.equal(2)
    expect(o.one.pct).to.equal(50)
    expect(o.one.min).to.equal(0)
    expect(o.one.max).to.equal(100)
    expect(o.two.deg).to.equal(10)
    expect(o.two.min).to.equal(5)
    expect(o.two.max).to.equal(15)
  })

  it(`Design constructor should generate configuration`, () => {
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
      measurements: ['hpsToWaist', 'shoulderToWrist'],
      optionalMeasurements: ['neck'],
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
      measurements: ['seat', 'ankle'],
      optionalMeasurements: ['knee', 'hpsToWaist'],
      from: partB,
      options: {
        optC: { pct: 20, min: 10, max: 30 },
      },
      draft: ({ part }) => part,
    }
    const design = new Design({
      data: {
        name: 'test',
        version: '1.2.3',
      },
      parts: [partC],
    })
    expect(design.designConfig.data.name).to.equal('test')
    expect(design.designConfig.data.version).to.equal('1.2.3')
    expect(design.patternConfig.measurements.length).to.equal(6)
    for (const m of ['seat', 'ankle', 'hpsToWaist', 'shoulderToWrist', 'head', 'knee']) {
      expect(design.patternConfig.measurements.includes(m)).to.equal(true)
    }
    for (const m of ['neck', 'chest', 'waist']) {
      expect(design.patternConfig.optionalMeasurements.includes(m)).to.equal(true)
    }
    expect(design.patternConfig.plugins.testPlugin.name).to.equal('testPlugin')
  })
})
