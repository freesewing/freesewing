import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.js'

const expect = chai.expect
const round = freesewing.utils.round

describe('Cutonfold Plugin Tests', () => {

  it('Should run the default cutonfold macro', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 20)
    pattern.parts.test.points.to = new pattern.Point(10, 220)
    const { macro } = pattern.parts.test.shorthand()
    macro('cutonfold', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
    })
    const c = pattern.parts.test.paths.cutonfold
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
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 20)
    pattern.parts.test.points.to = new pattern.Point(10, 230)
    const { macro } = pattern.parts.test.shorthand()
    macro('cutonfold', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      grainline: true,
    })
    const c = pattern.parts.test.paths.cutonfold
    expect(c.attributes.get('data-text')).to.equal('cutOnFoldAndGrainline')
  })

  it('Should run the cutonfold macro with configurable offset', () => {
    let pattern = new freesewing.Pattern()
    pattern.draft = function() {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 20)
    pattern.parts.test.points.to = new pattern.Point(10, 220)
    let { macro } = pattern.parts.test.shorthand()
    macro('cutonfold', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      offset: 30
    })
    let c = pattern.parts.test.paths.cutonfold
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
    let pattern = new freesewing.Pattern()
    pattern.draft = function() {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 20)
    pattern.parts.test.points.to = new pattern.Point(10, 220)
    let { macro } = pattern.parts.test.shorthand()
    macro('cutonfold', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      margin: 20
    })
    let c = pattern.parts.test.paths.cutonfold
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
