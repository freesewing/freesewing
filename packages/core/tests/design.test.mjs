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
})
