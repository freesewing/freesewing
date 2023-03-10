import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Sewtogether Plugin Tests', () => {
  it('Should run the default sewtogether macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('sewtogether', {
          from: points.from,
          to: points.to,
        })

        return part
      },
      plugins: [annotationPlugin],
    }
    const Test = new Design({ plugins: [annotationPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    const c = pattern.parts[0].test.paths.sewtogetherSewTogether
    expect(c.attributes.get('class')).to.equal('dotted note stroke-sm')
    expect(c.attributes.get('marker-start')).to.equal('url(#sewTogetherStart)')
    expect(c.attributes.get('marker-end')).to.equal('url(#sewTogetherEnd)')
    expect(c.attributes.get('data-text')).to.equal('sewTogether')
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
        macro('sewtogether', {
          from: points.from,
          hinge: points.hinge,
          to: points.to,
        })

        return part
      },
      plugins: [annotationPlugin],
    }
    const Test = new Design({ plugins: [annotationPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    var c = pattern.parts[0].test.paths.sewtogetherSewTogetherHinge
    console.log({ c: c })
    console.log({ p: pattern.parts[0].test.paths })
    console.log({ t: pattern.parts[0].test })
    console.log({ ps0: pattern.parts[0] })
    expect(c.attributes.get('class')).to.equal('dotted note stroke-sm')
    expect(c.attributes.get('marker-start')).to.equal('url(#sewTogetherCross)')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(120)
    expect(round(c.ops[1].to.x)).to.equal(35)
    expect(round(c.ops[1].to.y)).to.equal(120)
  })

  it('Should run the pleat/reverse macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('pleat', {
          from: points.from,
          to: points.to,
          reverse: true,
        })

        return part
      },
      plugins: [annotationPlugin],
    }
    const Test = new Design({ plugins: [annotationPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    var c = pattern.parts[0].test.paths.pleatPleatFrom
    expect(c.attributes.get('class')).to.equal('note dashed')
    c = pattern.parts[0].test.paths.pleatPleatTo
    expect(c.attributes.get('class')).to.equal('note')
    c = pattern.parts[0].test.paths.pleatPleatArrow
    expect(round(c.ops[0].to.x)).to.equal(18.75)
    expect(round(c.ops[0].to.y)).to.equal(220)
    expect(round(c.ops[1].to.x)).to.equal(18.75)
    expect(round(c.ops[1].to.y)).to.equal(20)
  })
})
