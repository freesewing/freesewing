import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Pleat Plugin Tests', () => {
  it('Should run the default pleat macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('pleat', {
          from: points.from,
          to: points.to,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    var c = pattern.parts[0].test.paths.pleatPleatFrom
    expect(c.attributes.get('class')).to.equal('note')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(20)
    expect(round(c.ops[1].to.x)).to.equal(45)
    expect(round(c.ops[1].to.y)).to.equal(20)
    c = pattern.parts[0].test.paths.pleatPleatTo
    expect(c.attributes.get('class')).to.equal('note dashed')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(220)
    expect(round(c.ops[1].to.x)).to.equal(45)
    expect(round(c.ops[1].to.y)).to.equal(220)
    c = pattern.parts[0].test.paths.pleatPleatArrow
    expect(c.attributes.get('class')).to.equal('note')
    expect(c.attributes.get('marker-end')).to.equal('url(#pleatTo)')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(18.75)
    expect(round(c.ops[0].to.y)).to.equal(20)
    expect(round(c.ops[1].to.x)).to.equal(18.75)
    expect(round(c.ops[1].to.y)).to.equal(220)
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
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part] })
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
