import chai from 'chai'
import freesewing from '@freesewing/core'
import plugin from '../dist/index.mjs'

const expect = chai.expect
const round = freesewing.utils.round

describe('Dimension Plugin Tests', () => {

  describe('Measures horizontal dimensions', function () {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 20)
    pattern.parts.test.points.to = new pattern.Point(200, 20)
    const { macro } = pattern.parts.test.shorthand()
    macro('hd', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      y: 35,
    })

    it('should draw a line and add text to indicate its length', () => {
      const c = pattern.parts.test.paths['__paperless1']
      expect(c.attributes.get('class')).to.equal('mark')
      expect(c.attributes.get('marker-start')).to.equal('url(#dimensionFrom)')
      expect(c.attributes.get('marker-end')).to.equal('url(#dimensionTo)')
      expect(c.attributes.get('data-text')).to.equal('19cm')
      expect(c.attributes.get('data-text-class')).to.equal('fill-mark center')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(35)
      expect(c.ops[1].to.x).to.equal(200)
      expect(c.ops[1].to.y).to.equal(35)
    })

    it('should draw the start marker', () => {
      const c = pattern.parts.test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(20)
      expect(c.ops[1].to.x).to.equal(10)
      expect(c.ops[1].to.y).to.equal(35)
    })

    it('should draw the end marker', () => {
      const c = pattern.parts.test.paths['__paperless1_le']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(200)
      expect(c.ops[0].to.y).to.equal(20)
      expect(c.ops[1].to.x).to.equal(200)
      expect(c.ops[1].to.y).to.equal(35)
    })
  })

  describe('Measures vertical dimensions', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 20)
    pattern.parts.test.points.to = new pattern.Point(10, 200)
    const { macro } = pattern.parts.test.shorthand()
    macro('vd', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      x: 25,
    })

    it('Should draw a line and add text to indicate its length', () => {
      const c = pattern.parts.test.paths['__paperless1']
      expect(c.attributes.get('class')).to.equal('mark')
      expect(c.attributes.get('marker-start')).to.equal('url(#dimensionFrom)')
      expect(c.attributes.get('marker-end')).to.equal('url(#dimensionTo)')
      expect(c.attributes.get('data-text')).to.equal('18cm')
      expect(c.attributes.get('data-text-class')).to.equal('fill-mark center')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(25)
      expect(c.ops[0].to.y).to.equal(20)
      expect(c.ops[1].to.x).to.equal(25)
      expect(c.ops[1].to.y).to.equal(200)
    })

    it('Should draw the start marker', () => {
      const c = pattern.parts.test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(20)
      expect(c.ops[1].to.x).to.equal(25)
      expect(c.ops[1].to.y).to.equal(20)
    })

    it('Should draw the end marker', () => {
      const c = pattern.parts.test.paths['__paperless1_le']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(200)
      expect(c.ops[1].to.x).to.equal(25)
      expect(c.ops[1].to.y).to.equal(200)
    })
  })

  describe('Measures the length of straight lines', () => {
    const pattern = new freesewing.Pattern().use(plugin)
    pattern.parts.test = new pattern.Part()
    pattern.parts.test.points.from = new pattern.Point(10, 10)
    pattern.parts.test.points.to = new pattern.Point(100, 100)
    const { macro } = pattern.parts.test.shorthand()
    macro('ld', {
      from: pattern.parts.test.points.from,
      to: pattern.parts.test.points.to,
      d: 15,
    })

    it('Should draw a line and add text to indicate its length', () => {
      const c = pattern.parts.test.paths['__paperless1']
      expect(c.attributes.get('class')).to.equal('mark')
      expect(c.attributes.get('marker-start')).to.equal('url(#dimensionFrom)')
      expect(c.attributes.get('marker-end')).to.equal('url(#dimensionTo)')
      expect(c.attributes.get('data-text')).to.equal('12.73cm')
      expect(c.attributes.get('data-text-class')).to.equal('fill-mark center')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(round(c.ops[0].to.x)).to.equal(20.61)
      expect(round(c.ops[0].to.y)).to.equal(-0.61)
      expect(round(c.ops[1].to.x)).to.equal(110.61)
      expect(round(c.ops[1].to.y)).to.equal(89.39)
    })

    it('Should draw the start marker', () => {
      const c = pattern.parts.test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(round(c.ops[0].to.x)).to.equal(10)
      expect(round(c.ops[0].to.y)).to.equal(10)
      expect(round(c.ops[1].to.x)).to.equal(20.61)
      expect(round(c.ops[1].to.y)).to.equal(-0.61)
    })

    it('Should draw the end marker', () => {
      const c = pattern.parts.test.paths['__paperless1_le']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(round(c.ops[0].to.x)).to.equal(100)
      expect(round(c.ops[0].to.y)).to.equal(100)
      expect(round(c.ops[1].to.x)).to.equal(110.61)
      expect(round(c.ops[1].to.y)).to.equal(89.39)
    })
  })

  describe('Measures curved lines', () => {
    const pattern = new freesewing.Pattern()
    pattern.draft = function () {}
    pattern.use(plugin)
    pattern.parts.test = new pattern.Part()
    const from = new pattern.Point(10, 10)
    const cp1 = new pattern.Point(100, 10)
    const cp2 = new pattern.Point(10, 100)
    const to = new pattern.Point(100, 100)
    const { macro } = pattern.parts.test.shorthand()
    macro('pd', {
      path: new pattern.Path().move(from).curve(cp1, cp2, to),
      d: 15,
    })

    it('Should draw a line and add text to indicate the length', () => {
      const c = pattern.parts.test.paths['__paperless1']
      expect(c.attributes.get('class')).to.equal('mark')
      expect(c.attributes.get('marker-start')).to.equal('url(#dimensionFrom)')
      expect(c.attributes.get('marker-end')).to.equal('url(#dimensionTo)')
      expect(c.attributes.get('data-text')).to.equal('15.09cm')
      expect(c.attributes.get('data-text-class')).to.equal('fill-mark center')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('curve')
      expect(round(c.ops[0].to.x)).to.equal(10)
      expect(round(c.ops[0].to.y)).to.equal(25)
      expect(round(c.ops[1].to.x)).to.equal(37.15)
      expect(round(c.ops[1].to.y)).to.equal(32.79)
    })

    it('Should draw the start marker', () => {
      const c = pattern.parts.test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(10)
      expect(c.ops[1].to.x).to.equal(10)
      expect(c.ops[1].to.y).to.equal(25)
    })

    it('Should draw the end marker', () => {
      const c = pattern.parts.test.paths['__paperless1_le']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(100)
      expect(c.ops[0].to.y).to.equal(100)
      expect(c.ops[1].to.x).to.equal(100)
      expect(c.ops[1].to.y).to.equal(115)
    })
  })
})
