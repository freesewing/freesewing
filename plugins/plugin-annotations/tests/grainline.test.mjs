import chai from 'chai'
import { round, Design } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Grainline Plugin Tests', () => {
  it('Should run the default grainline macro', () => {
    const part = {
      name: 'test',
      draft: ({ points, Point, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 230)
        macro('grainline', {
          from: points.from,
          to: points.to,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Pattern = new Design({ parts: [part] })
    const pattern = new Pattern()
    pattern.draft()
    const c = pattern.parts[0].test.paths.grainline
    expect(c.attributes.get('class')).to.equal('note')
    expect(c.attributes.get('marker-start')).to.equal('url(#grainlineFrom)')
    expect(c.attributes.get('marker-end')).to.equal('url(#grainlineTo)')
    expect(c.attributes.get('data-text')).to.equal('grainline')
    expect(c.attributes.get('data-text-class')).to.equal('center fill-note')
    expect(c.ops[0].type).to.equal('move')
    expect(c.ops[1].type).to.equal('line')
    expect(round(c.ops[0].to.x)).to.equal(10)
    expect(round(c.ops[0].to.y)).to.equal(30.5)
    expect(round(c.ops[1].to.x)).to.equal(10)
    expect(round(c.ops[1].to.y)).to.equal(219.5)
  })
})
