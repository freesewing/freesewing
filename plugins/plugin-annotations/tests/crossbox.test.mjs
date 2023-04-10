import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Crossbox Plugin Tests', () => {
  it('Should run the default crossbox macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 10)
        points.to = new Point(30, 30)
        macro('crossbox', {
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
    var c = pattern.parts[0].test.paths['1crossBox']
    expect(c.attributes.get('class')).to.equal('lining dotted stroke-sm')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[2].type).to.equal('line')
    expect(c.ops[3].type).to.equal('line')
    expect(c.ops[4].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(10)
    expect(round(c.ops[1].to.x)).to.equal(30)
    expect(round(c.ops[1].to.y)).to.equal(10)
    expect(round(c.ops[2].to.x)).to.equal(30)
    expect(round(c.ops[2].to.y)).to.equal(30)
    expect(round(c.ops[3].to.x)).to.equal(10)
    expect(round(c.ops[3].to.y)).to.equal(30)
    expect(round(c.ops[4].to.x)).to.equal(10)
    expect(round(c.ops[4].to.y)).to.equal(10)
    c = pattern.parts[0].test.paths['1_topCross']
    expect(c.attributes.get('class')).to.equal('lining dotted stroke-sm')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[2].type).to.equal('line')
    expect(c.ops[3].type).to.equal('line')
    expect(c.ops[4].type).to.equal('line')
    expect(c.ops[5].type).to.equal('line')
    expect(c.ops[6].type).to.equal('move')
    expect(c.ops[7].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(12)
    expect(round(c.ops[0].to.y)).to.equal(12)
    expect(round(c.ops[1].to.x)).to.equal(28)
    expect(round(c.ops[1].to.y)).to.equal(28)
    expect(round(c.ops[2].to.x)).to.equal(28)
    expect(round(c.ops[2].to.y)).to.equal(12)
    expect(round(c.ops[3].to.x)).to.equal(12)
    expect(round(c.ops[3].to.y)).to.equal(28)
    expect(round(c.ops[4].to.x)).to.equal(12)
    expect(round(c.ops[4].to.y)).to.equal(12)
    expect(round(c.ops[5].to.x)).to.equal(28)
    expect(round(c.ops[5].to.y)).to.equal(12)
    expect(round(c.ops[6].to.x)).to.equal(28)
    expect(round(c.ops[6].to.y)).to.equal(28)
    expect(round(c.ops[7].to.x)).to.equal(12)
    expect(round(c.ops[7].to.y)).to.equal(28)
  })

  it('Should run the crossbox macro with text', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 10)
        points.to = new Point(30, 30)
        macro('crossbox', {
          from: points.from,
          to: points.to,
          text: 'test',
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    const c = pattern.parts[0].test.points.textAnchor
    expect(c.attributes.get('data-text')).to.equal('test')
  })
})
