import chai from 'chai'
import { round, Design } from '@freesewing/core'
import { plugin } from '../src/index.mjs'

const expect = chai.expect

describe('Gore Plugin Tests', () => {
  it('Should create a default gore', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro }) => {
        points.anchorPoint = new Point(50, 50)
        macro('gore', {
          from: points.anchorPoint,
          radius: 25,
          gores: 4,
          extraLength: 0,
          prefix: 'gore',
        })
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts.test.points
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(50)
    expect(round(c.gorep2.y)).to.equal(30.37)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(30.37)
  })

  it('Should use a configurable number of gores', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro }) => {
        points.anchorPoint = new Point(50, 50)
        macro('gore', {
          from: points.anchorPoint,
          radius: 25,
          gores: 8,
          extraLength: 0,
          prefix: 'gore',
        })
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts.test.points
    expect(round(c.gorep1.x)).to.equal(89.27)
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(50)
    expect(round(c.gorep2.y)).to.equal(40.18)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(40.18)
  })

  it('Should use a configurable extra length', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro }) => {
        points.anchorPoint = new Point(50, 50)
        macro('gore', {
          from: points.anchorPoint,
          radius: 25,
          gores: 4,
          extraLength: 20,
          prefix: 'gore',
        })
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts.test.points
    expect(round(c.gorep1.x)).to.equal(109.27)
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(70)
    expect(round(c.gorep2.y)).to.equal(30.37)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(30.37)
  })

  it('Should use a configurable radius', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro }) => {
        points.anchorPoint = new Point(50, 50)
        macro('gore', {
          from: points.anchorPoint,
          radius: 30,
          gores: 4,
          extraLength: 0,
          prefix: 'gore',
        })
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts.test.points
    expect(round(c.gorep1.x)).to.equal(97.12)
    expect(round(c.gorep1.y)).to.equal(50)
    expect(round(c.gorep2.x)).to.equal(50)
    expect(round(c.gorep2.y)).to.equal(26.44)
    expect(round(c.gorep3.x)).to.equal(50)
    expect(round(c.gorep3.y)).to.equal(26.44)
  })

  it('Should generate a seam path', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro }) => {
        points.anchorPoint = new Point(50, 50)
        macro('gore', {
          from: points.anchorPoint,
          radius: 25,
          gores: 4,
          extraLength: 0,
          prefix: 'gore',
        })
      },
    }
    const Test = new Design({ plugins: [plugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts.test.paths.goreseam.ops
    expect(round(c[1].to.x)).to.equal(89.27)
    expect(round(c[1].to.y)).to.equal(50)
    expect(round(c[2].to.x)).to.equal(50)
    expect(round(c[2].to.y)).to.equal(30.37)
  })
})
