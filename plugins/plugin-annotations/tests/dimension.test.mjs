import chai from 'chai'
import { Design, round } from '@freesewing/core'
import { annotationsPlugin } from '../src/index.mjs'

const expect = chai.expect

describe('Dimension Plugin Tests', () => {
  describe('Measures horizontal dimensions', function () {
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(200, 20)
        macro('hd', {
          from: points.from,
          to: points.to,
          y: 35,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()

    it('should draw a line and add text to indicate its length', () => {
      const c = pattern.parts[0].test.paths['__paperless1']
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
      const c = pattern.parts[0].test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(20)
      expect(c.ops[1].to.x).to.equal(10)
      expect(c.ops[1].to.y).to.equal(35)
    })

    it('should draw the end marker', () => {
      const c = pattern.parts[0].test.paths['__paperless1_le']
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
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 20)
        points.to = new Point(10, 200)
        macro('vd', {
          from: points.from,
          to: points.to,
          x: 25,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()

    it('Should draw a line and add text to indicate its length', () => {
      const c = pattern.parts[0].test.paths['__paperless1']
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
      const c = pattern.parts[0].test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(20)
      expect(c.ops[1].to.x).to.equal(25)
      expect(c.ops[1].to.y).to.equal(20)
    })

    it('Should draw the end marker', () => {
      const c = pattern.parts[0].test.paths['__paperless1_le']
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
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, part }) => {
        points.from = new Point(10, 10)
        points.to = new Point(100, 100)
        macro('ld', {
          from: points.from,
          to: points.to,
          d: 15,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()

    it('Should draw a line and add text to indicate its length', () => {
      const c = pattern.parts[0].test.paths['__paperless1']
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
      const c = pattern.parts[0].test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(round(c.ops[0].to.x)).to.equal(10)
      expect(round(c.ops[0].to.y)).to.equal(10)
      expect(round(c.ops[1].to.x)).to.equal(20.61)
      expect(round(c.ops[1].to.y)).to.equal(-0.61)
    })

    it('Should draw the end marker', () => {
      const c = pattern.parts[0].test.paths['__paperless1_le']
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
    const part = {
      name: 'test',
      draft: ({ Point, points, macro, Path, part }) => {
        points.from = new Point(10, 10)
        points.cp1 = new Point(100, 10)
        points.cp2 = new Point(10, 100)
        points.to = new Point(100, 100)
        macro('pd', {
          path: new Path().move(points.from).curve(points.cp1, points.cp2, points.to),
          d: 15,
        })

        return part
      },
      plugins: [annotationsPlugin],
    }
    const Test = new Design({ parts: [part] })
    const pattern = new Test()
    pattern.draft()

    it('Should draw a line and add text to indicate the length', () => {
      const c = pattern.parts[0].test.paths['__paperless1']
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
      const c = pattern.parts[0].test.paths['__paperless1_ls']
      expect(c.attributes.get('class')).to.equal('mark dotted')
      expect(c.ops[0].type).to.equal('move')
      expect(c.ops[1].type).to.equal('line')
      expect(c.ops[0].to.x).to.equal(10)
      expect(c.ops[0].to.y).to.equal(10)
      expect(c.ops[1].to.x).to.equal(10)
      expect(c.ops[1].to.y).to.equal(25)
    })

    it('Should draw the end marker', () => {
      const c = pattern.parts[0].test.paths['__paperless1_le']
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
