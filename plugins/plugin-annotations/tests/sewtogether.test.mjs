import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Sewtogether Plugin Tests', () => {
  it('Should run the default sewtogether macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('sewTogether', {
          from: points.from,
          to: points.to,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part], noCorePlugins: true })
    const pattern = new Test()
    pattern.draft()
    const c = pattern.parts[0].test.paths.__macro_sewtogether_sewtogether_curve
    expect(c.attributes.get('class')).to.equal('dotted note stroke-sm')
    expect(c.attributes.get('marker-start')).to.equal('url(#sewTogetherStart)')
    expect(c.attributes.get('marker-end')).to.equal('url(#sewTogetherEnd)')
    expect(c.attributes.get('data-text')).to.equal('plugin-annotations:sewTogether')
    expect(c.attributes.get('data-text-class')).to.equal('center fill-note text-xs')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('curve')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(20)
    expect(round(c.ops[1].cp1.x)).to.equal(76.67)
    expect(round(c.ops[1].cp1.y)).to.equal(20)
    expect(round(c.ops[1].cp2.x)).to.equal(76.67)
    expect(round(c.ops[1].cp2.y)).to.equal(220)
    expect(round(c.ops[1].to.x)).to.equal(10)
    expect(round(c.ops[1].to.y)).to.equal(220)
  })

  it('Should run the sewtogether/hinge macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.hinge = new Point(40, 110)
        points.to = new Point(10, 220)
        macro('sewTogether', {
          from: points.from,
          hinge: points.hinge,
          to: points.to,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part], noCorePlugins: true })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts[0].test.paths.__macro_sewtogether_sewtogether_hinge
    expect(c.attributes.get('class')).to.equal('note dotted stroke-sm')
    expect(c.attributes.get('marker-start')).to.equal('url(#sewTogetherCross)')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(120)
    expect(round(c.ops[1].to.x)).to.equal(35)
    expect(round(c.ops[1].to.y)).to.equal(120)
  })

  it('Should run the sewTogether/hinge (with sa) macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.hinge = new Point(40, 110)
        points.to = new Point(10, 220)
        macro('sewTogether', {
          from: points.from,
          hinge: points.hinge,
          to: points.to,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    // Note that we're not loading core plugins but the local plugin
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part], noCorePlugins: true })
    const pattern = new Test({ sa: 10 })
    pattern.draft()
    let c = pattern.parts[0].test.paths.__macro_sewtogether_sewtogether_hinge
    expect(round(c.ops[1].to.x)).to.equal(0)
  })
})
