import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

let expect = chai.expect
let round = freesewing.utils.round

describe('Gore Plugin Tests', () => {
  it('Should create a default gore', () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    let anchorPoint = new pattern.Point(50,50)
    pattern.parts.test = new pattern.Part()
    let { macro } = pattern.parts.test.shorthand()
    macro('gore', {
      from:anchorPoint,
      radius:25,
      goreNumber:4,
      extraLength:0,
      prefix:'gore'
    })
    let c = pattern.parts.test.points
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(50)
    expect(round(c.gorep2.y)).to.equal(30.37)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(30.37)
  })

  it('Should use a configurable number of gores', () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    let anchorPoint = new pattern.Point(50,50)
    pattern.parts.test = new pattern.Part()
    let { macro } = pattern.parts.test.shorthand()
    macro('gore', {
      from:anchorPoint,
      radius:25,
      goreNumber:8,
      extraLength:0,
      prefix:'gore'
    })
    let c = pattern.parts.test.points
    expect(round(c.gorep1.x)).to.equal(89.27)
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(50)
    expect(round(c.gorep2.y)).to.equal(40.18)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(40.18)
  })

  it('Should use a configurable extra length', () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    let anchorPoint = new pattern.Point(50,50)
    pattern.parts.test = new pattern.Part()
    let { macro } = pattern.parts.test.shorthand()
    macro('gore', {
      from:anchorPoint,
      radius:25,
      goreNumber:4,
      extraLength:20,
      prefix:'gore'
    })
    let c = pattern.parts.test.points
    expect(round(c.gorep1.x)).to.equal(109.27)
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(70)
    expect(round(c.gorep2.y)).to.equal(30.37)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(30.37)
  })

  it('Should use a configurable radius', () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    let anchorPoint = new pattern.Point(50,50)
    pattern.parts.test = new pattern.Part()
    let { macro } = pattern.parts.test.shorthand()
    macro('gore', {
      from:anchorPoint,
      radius:30,
      goreNumber:4,
      extraLength:0,
      prefix:'gore'
    })
    let c = pattern.parts.test.points
    expect(round(c.gorep1.x)).to.equal(97.12)
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(50)
    expect(round(c.gorep2.y)).to.equal(26.44)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(26.44)
  })

  it('Should generate a seam path', () => {
    let pattern = new freesewing.Pattern()
    pattern.use(plugin)
    let anchorPoint = new pattern.Point(50,50)
    pattern.parts.test = new pattern.Part()
    let { macro } = pattern.parts.test.shorthand()
    macro('gore', {
      from:anchorPoint,
      radius:25,
      goreNumber:4,
      extraLength:0,
      prefix:'gore'
    })
    pattern.render()
    let c = pattern.parts.test.paths.goreseam.ops
    expect(round(c[1].to.x)).to.equal(89.27)
    expect(round(c[1].to.y)).to.equal(50)
    expect(round(c[2].to.x)).to.equal(50)
    expect(round(c[2].to.y)).to.equal(30.37)
  })
})

