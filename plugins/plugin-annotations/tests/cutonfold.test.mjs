import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Cutonfold Plugin Tests', () => {
  it('Should run the default cutonfold macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('cutonfold', {
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
    const c = pattern.parts[0].test.paths.cutonfoldCutonfold
    expect(c.attributes.get('class')).to.equal('note')
    expect(c.attributes.get('marker-start')).to.equal('url(#cutonfoldFrom)')
    expect(c.attributes.get('marker-end')).to.equal('url(#cutonfoldTo)')
    expect(c.attributes.get('data-text')).to.equal('cutOnFold')
    expect(c.attributes.get('data-text-class')).to.equal('center fill-note')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[2].type).to.equal('line')
    expect(c.ops[3].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(30)
    expect(round(c.ops[1].to.x)).to.equal(25)
    expect(round(c.ops[1].to.y)).to.equal(30)
    expect(round(c.ops[2].to.x)).to.equal(25)
    expect(round(c.ops[2].to.y)).to.equal(210)
    expect(round(c.ops[3].to.x)).to.equal(10)
    expect(round(c.ops[3].to.y)).to.equal(210)
  })

  it('Should run the cutonfold/grainline macro', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('cutonfold', {
          from: points.from,
          to: points.to,
          grainline: true,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    const c = pattern.parts[0].test.paths.cutonfoldCutonfold
    expect(c.attributes.get('data-text')).to.equal('cutOnFoldAndGrainline')
  })

  it('Should run the cutonfold macro with configurable offset', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('cutonfold', {
          from: points.from,
          to: points.to,
          offset: 30,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts[0].test.paths.cutonfoldCutonfold
    expect(c.attributes.get('class')).to.equal('note')
    expect(c.attributes.get('marker-start')).to.equal('url(#cutonfoldFrom)')
    expect(c.attributes.get('marker-end')).to.equal('url(#cutonfoldTo)')
    expect(c.attributes.get('data-text')).to.equal('cutOnFold')
    expect(c.attributes.get('data-text-class')).to.equal('center fill-note')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[2].type).to.equal('line')
    expect(c.ops[3].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(30)
    expect(round(c.ops[1].to.x)).to.equal(40)
    expect(round(c.ops[1].to.y)).to.equal(30)
    expect(round(c.ops[2].to.x)).to.equal(40)
    expect(round(c.ops[2].to.y)).to.equal(210)
    expect(round(c.ops[3].to.x)).to.equal(10)
    expect(round(c.ops[3].to.y)).to.equal(210)
  })

  it('Should run the cutonfold macro with configurable margin', () => {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 220)
        macro('cutonfold', {
          from: points.from,
          to: points.to,
          margin: 20,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ plugins: [annotationsPlugin], parts: [part] })
    const pattern = new Test()
    pattern.draft()
    let c = pattern.parts[0].test.paths.cutonfoldCutonfold
    expect(c.attributes.get('class')).to.equal('note')
    expect(c.attributes.get('marker-start')).to.equal('url(#cutonfoldFrom)')
    expect(c.attributes.get('marker-end')).to.equal('url(#cutonfoldTo)')
    expect(c.attributes.get('data-text')).to.equal('cutOnFold')
    expect(c.attributes.get('data-text-class')).to.equal('center fill-note')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(c.ops[2].type).to.equal('line')
    expect(c.ops[3].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(60)
    expect(round(c.ops[1].to.x)).to.equal(25)
    expect(round(c.ops[1].to.y)).to.equal(60)
    expect(round(c.ops[2].to.x)).to.equal(25)
    expect(round(c.ops[2].to.y)).to.equal(180)
    expect(round(c.ops[3].to.x)).to.equal(10)
    expect(round(c.ops[3].to.y)).to.equal(180)
  })
})
