import { expect } from 'chai'
import { round, Path, Point } from '../src/index.mjs'
import { pathsProxy } from '../src/path.mjs'

describe('Path', () => {
  describe('circleSegment', () => {
    it('Should draw a circleSegment', () => {
      const points = {}
      points.origin = new Point(10, 20)
      // radius = 100
      points.start = points.origin.shift(77, 100)

      const test = new Path().move(points.start).circleSegment(90, points.origin)

      const endPoint = test.end()
      const expectedEndPoint = points.start.rotate(90, points.origin)

      expect(round(endPoint.x)).to.equal(round(expectedEndPoint.x))
      expect(round(endPoint.y)).to.equal(round(expectedEndPoint.y))
      expect(endPoint.sitsOn(expectedEndPoint)).to.equal(true)
      expect(Math.round(test.length())).to.equal(Math.round(Math.PI * 50))
    })

    it('Should draw a circleSegment with negative angle', () => {
      const points = {}
      points.origin = new Point(10, 20)
      // radius = 100
      points.start = points.origin.shift(-122, 100)

      const test = new Path().move(points.start).circleSegment(-45, points.origin)

      const endPoint = test.end()
      const expectedEndPoint = points.start.rotate(-45, points.origin)

      expect(round(endPoint.x)).to.equal(round(expectedEndPoint.x))
      expect(round(endPoint.y)).to.equal(round(expectedEndPoint.y))
      expect(endPoint.sitsOn(expectedEndPoint)).to.equal(true)
      expect(Math.round(test.length())).to.equal(Math.round(Math.PI * 25))
    })

    it('Should draw a full circle', () => {
      const points = {}

      points.origin = new Point(0, 0)
      // radius = 100
      points.start = points.origin.shift(0, 100)

      const test = new Path().move(points.start).circleSegment(360, points.origin)

      const endPoint = test.end()

      expect(round(endPoint.x)).to.equal(round(points.start.x))
      expect(round(endPoint.y)).to.equal(round(points.start.y))
      expect(endPoint.sitsOn(points.start)).to.equal(true)
      expect(Math.round(test.length())).to.equal(Math.round(Math.PI * 200))
      expect(test.ops.length).to.equal(5) // 1 move + 4 cubic curves
    })
  })

  describe('smurve', () => {
    it('Should draw a smurve', () => {
      const points = {}
      points.from = new Point(10, 20)
      points.cp1 = new Point(40, 10)
      points.cp2 = new Point(60, 30)
      points.to = new Point(90, 20)
      points.scp2 = new Point(140, 10)
      points.sto = new Point(170, 20)

      const test = new Path()
        .move(points.from)
        .curve(points.cp1, points.cp2, points.to)
        .smurve(points.scp2, points.sto)

      expect(round(test.ops[2].cp1.x)).to.equal(120)
      expect(round(test.ops[2].cp1.y)).to.equal(10)
    })

    it('Should draw a smurve_', () => {
      const points = {}
      points.from = new Point(10, 20)
      points.cp1 = new Point(40, 10)
      points.cp2 = new Point(60, 30)
      points.to = new Point(90, 20)
      points.sto = new Point(170, 20)

      const test = new Path()
        .move(points.from)
        .curve(points.cp1, points.cp2, points.to)
        .smurve_(points.sto)

      expect(round(test.ops[2].cp1.x)).to.equal(120)
      expect(round(test.ops[2].cp1.y)).to.equal(10)
    })

    it('Should log a warning when passing a non-Point to smurve()', () => {
      const points = {}
      points.from = new Point(10, 20)
      points.cp1 = new Point(40, 10)
      points.cp2 = new Point(60, 30)
      points.to = new Point(90, 20)

      const messages = []
      const log = { warn: (msg) => messages.push(msg) }
      new Path()
        .__withLog(log)
        .move(points.from)
        .curve(points.cp1, points.cp2, points.to)
        .smurve('hi', 'there')

      expect(messages.length).to.equal(2)
      expect(messages[0]).to.equal('Called `Path.smurve(cp2, to)` but `to` is not a `Point` object')
    })

    it('Should log a warning when passing a non-Point to smurve_()', () => {
      const messages = []
      const log = { warn: (msg) => messages.push(msg) }
      try {
        new Path().__withLog(log).smurve_('hi')
      } catch (e) {
        expect('' + e).to.contain("TypeError: Cannot read properties of undefined (reading 'cp2')")
      } finally {
        expect(messages.length).to.equal(1)
        expect(messages[0]).to.equal('Called `Path.smurve_(to)` but `to` is not a `Point` object')
      }
    })
  })

  it('Should log a warning when passing a non-Path to the paths proxy', () => {
    const messages = []
    const log = { warn: (msg) => messages.push(msg) }
    const pathsObj = {}
    const paths = pathsProxy(pathsObj, log)
    paths.set(pathsObj, 'test', 'Writing code can get very lonely sometimes')

    expect(messages.length).to.equal(2)
    expect(messages[0]).to.equal('`paths.test` was set with a value that is not a `Path` object')
    expect(messages[1]).to.equal('Could not set `name` property on `paths.test`')
  })

  describe('offset', () => {
    it('Should offset a line', () => {
      const line = new Path().move(new Point(0, 0)).line(new Point(0, 40))
      const offLine = line.offset(10)
      const bbox = offLine.bbox()
      expect(bbox.bottomRight.x).to.equal(-10)
      expect(bbox.bottomRight.y).to.equal(40)
    })

    it('Should offset a curve', () => {
      const curve = new Path()
        .move(new Point(0, 0))
        .curve(new Point(0, 40), new Point(123, 34), new Point(23, 4))
      const offset = curve.offset(10)
      const bbox = offset.bbox()
      expect(round(bbox.bottomRight.x)).to.equal(72.18)
      expect(round(bbox.bottomRight.y)).to.equal(38.26)
    })

    it('Should offset a curve where cp1 = start', () => {
      const curve = new Path().move(new Point(0, 0))._curve(new Point(123, 34), new Point(23, 4))
      const offset = curve.offset(10)
      const bbox = offset.bbox()
      expect(round(bbox.bottomRight.x)).to.equal(72.63)
      expect(round(bbox.bottomRight.y)).to.equal(26.47)
    })

    it('Should offset a curve where cp2 = end', () => {
      const curve = new Path().move(new Point(0, 0)).curve_(new Point(40, 0), new Point(123, 34))
      const offset = curve.offset(10)
      const bbox = offset.bbox()
      expect(round(bbox.bottomRight.x)).to.equal(119.86)
      expect(round(bbox.bottomRight.y)).to.equal(43.49)
    })

    it('Should offset small curves', () => {
      const curve = new Path()
        .move(new Point(0, 0))
        .curve(new Point(0.1, 0.1), new Point(0.2, 0.2), new Point(0.1, 1.1))
      const offset = curve.offset(1)
      const bbox = offset.bbox()
      expect(round(bbox.bottomRight.x)).to.equal(-0.9)
      expect(round(bbox.bottomRight.y)).to.equal(1.19)
    })

    it('Should offset zero length path', () => {
      let logged = false
      const log = { warn: () => (logged = true) }
      const curve = new Path().__withLog(log).move(new Point(0, 0)).line(new Point(0, 0)).close()
      expect(logged).to.equal(false)
      const offset = curve.offset(1)
      expect(logged).to.equal(true)
      const bbox = offset.bbox()
      expect(round(bbox.bottomRight.x)).to.equal(0)
      expect(round(bbox.bottomRight.y)).to.equal(0)
    })
  })

  describe('length', () => {
    it('Should return the length of a line', () => {
      const line = new Path().move(new Point(0, 0)).line(new Point(40, 0))
      expect(line.length()).to.equal(40)
    })

    it('Should return the length of a curve', () => {
      const curve = new Path()
        .move(new Point(0, 0))
        .curve(new Point(0, 40), new Point(123, 34), new Point(23, 4))
        .close()
      expect(round(curve.length())).to.equal(145.11)
    })
  })

  it('Should return the rough length of a curve', () => {
    const curve = new Path()
      .move(new Point(0, 0))
      .curve(new Point(0, 50), new Point(100, 50), new Point(100, 0))
      .close()
    expect(round(curve.roughLength())).to.equal(300)
  })

  it('Should return the rough length of a line', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 50))
    expect(round(line.roughLength())).to.equal(50)
  })

  it('Should return the path start point', () => {
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(23, 4))
      .close()
    expect(curve.start().x).to.equal(123)
    expect(curve.start().y).to.equal(456)
  })

  it('Should return the path end point', () => {
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(23, 4))
      .close()
    expect(curve.end().x).to.equal(123)
    expect(curve.end().y).to.equal(456)
  })

  it('Should calculate that path boundary', () => {
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
    curve.__boundary()
    expect(curve.topLeft.x).to.equal(71.6413460920667)
    expect(curve.topLeft.y).to.equal(4)
    expect(curve.bottomRight.x).to.equal(230)
    expect(curve.bottomRight.y).to.equal(456)
  })

  it('Should clone a path', () => {
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
    let b = curve.clone()
    b.__boundary()
    expect(b.topLeft.x).to.equal(71.6413460920667)
    expect(b.topLeft.y).to.equal(4)
    b = b.clone()
    expect(b.bottomRight.x).to.equal(230)
    expect(b.bottomRight.y).to.equal(456)
  })

  it('Should join paths', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40))
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
    const joint = curve.join(line)
    expect(joint.ops.length).to.equal(4)
    expect(joint.ops[2].type).to.equal('line')
  })

  it('Should join paths that have noop operations', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40)).noop('test1')
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
      .noop('test2')
    const joint = curve.join(line)
    expect(joint.ops.length).to.equal(6)
  })

  it('Should throw error when joining a closed path', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40))
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
      .close()
    expect(() => curve.join(line)).to.throw()
  })

  it('Should combine paths', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40))
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
    const combo = curve.combine(line)
    expect(combo.ops.length).to.equal(4)
    expect(combo.ops[2].type).to.equal('move')
  })

  it('Should shift along a line', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40))
    expect(line.shiftAlong(20).y).to.equal(20)
  })

  it('Should not shift along a path/line if we end up on the end point', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(10, 0))
    expect(line.shiftAlong(10).x).to.equal(10)
  })

  it('Should shift along lines', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40)).line(new Point(100, 40))
    expect(line.shiftAlong(50).x).to.equal(10)
    expect(line.shiftAlong(50).y).to.equal(40)
  })

  it('Should shift along curve + line', () => {
    const test = new Path()
      .move(new Point(0, 0))
      .line(new Point(0, 40))
      .curve(new Point(40, 40), new Point(40, 0), new Point(200, 0))
      .line(new Point(200, 400))
    expect(round(test.shiftAlong(500).x)).to.equal(200)
    expect(round(test.shiftAlong(500).y)).to.equal(253.74)
  })

  it("Should throw an error when shifting along path further than it's long", () => {
    const test = new Path().move(new Point(0, 0)).line(new Point(0, 40)).line(new Point(200, 400))
    expect(() => test.shiftAlong(500)).to.throw()
  })

  it('Should shift along with sufficient precision', () => {
    const test = new Path()
      .move(new Point(0, 0))
      .curve(new Point(123, 123), new Point(-123, 456), new Point(456, -123))
    const a = test.shiftAlong(100)
    const b = test.reverse().shiftAlong(test.length() - 100)
    expect(a.dist(b)).to.below(0.2)
  })

  it('Should shift fraction with sufficient precision', () => {
    const test = new Path()
      .move(new Point(0, 0))
      .curve(new Point(123, 123), new Point(-123, 456), new Point(456, -123))
    const a = test.shiftFractionAlong(0.5)
    const b = test.reverse().shiftFractionAlong(0.5)
    expect(a.dist(b)).to.below(0.2)
  })

  it('Should shift a fraction along a line', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(0, 40)).line(new Point(100, 40))
    expect(round(line.shiftFractionAlong(0.5).x)).to.equal(30)
    expect(round(line.shiftFractionAlong(0.5).y)).to.equal(40)
  })

  it('Should find the bounding box of a line', () => {
    let line = new Path().move(new Point(3, 2)).line(new Point(10, 40))
    let box = line.bbox()
    expect(box.topLeft.x).to.equal(3)
    expect(box.topLeft.y).to.equal(2)
    expect(box.bottomRight.x).to.equal(10)
    expect(box.bottomRight.y).to.equal(40)

    line = new Path().move(new Point(10, 40)).line(new Point(3, 2))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(3)
    expect(box.topLeft.y).to.equal(2)
    expect(box.bottomRight.x).to.equal(10)
    expect(box.bottomRight.y).to.equal(40)

    line = new Path().move(new Point(1, 40)).line(new Point(31, 2))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(1)
    expect(box.topLeft.y).to.equal(2)
    expect(box.bottomRight.x).to.equal(31)
    expect(box.bottomRight.y).to.equal(40)

    line = new Path().move(new Point(31, 2)).line(new Point(1, 40))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(1)
    expect(box.topLeft.y).to.equal(2)
    expect(box.bottomRight.x).to.equal(31)
    expect(box.bottomRight.y).to.equal(40)

    line = new Path().move(new Point(11, 2)).line(new Point(11, 40))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(11)
    expect(box.topLeft.y).to.equal(2)
    expect(box.bottomRight.x).to.equal(11)
    expect(box.bottomRight.y).to.equal(40)

    line = new Path().move(new Point(11, 40)).line(new Point(11, 2))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(11)
    expect(box.topLeft.y).to.equal(2)
    expect(box.bottomRight.x).to.equal(11)
    expect(box.bottomRight.y).to.equal(40)

    line = new Path().move(new Point(11, 12)).line(new Point(41, 12))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(11)
    expect(box.topLeft.y).to.equal(12)
    expect(box.bottomRight.x).to.equal(41)
    expect(box.bottomRight.y).to.equal(12)

    line = new Path().move(new Point(41, 12)).line(new Point(11, 12))
    box = line.bbox()
    expect(box.topLeft.x).to.equal(11)
    expect(box.topLeft.y).to.equal(12)
    expect(box.bottomRight.x).to.equal(41)
    expect(box.bottomRight.y).to.equal(12)
  })

  it('Should find the bounding box of a curve', () => {
    const curve = new Path()
      .move(new Point(123, 456))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
      .close()
    const box = curve.bbox()
    expect(round(box.topLeft.x)).to.equal(71.64)
    expect(box.topLeft.y).to.equal(4)
    expect(box.bottomRight.x).to.equal(230)
    expect(box.bottomRight.y).to.equal(456)
  })

  it('Should find the bounding box of an empty path', () => {
    const path = new Path().move(new Point(123, 456)).close()
    const box = path.bbox()
    expect(box.topLeft.x).to.equal(123)
    expect(box.topLeft.y).to.equal(456)
    expect(box.bottomRight.x).to.equal(123)
    expect(box.bottomRight.y).to.equal(456)
  })

  it('Should reverse a path', () => {
    const test = new Path()
      .move(new Point(123, 456))
      .line(new Point(12, 23))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
      .close()
    let rev = test.reverse()
    let tb = test.bbox()
    let rb = rev.bbox()
    expect(tb.topLeft.x).to.equal(rb.topLeft.x)
    expect(tb.topLeft.y).to.equal(rb.topLeft.y)
    expect(tb.bottomRight.x).to.equal(rb.bottomRight.x)
    expect(tb.bottomRight.y).to.equal(rb.bottomRight.y)
    expect(rev.ops[1].type).to.equal('curve')
    expect(rev.ops[2].type).to.equal('line')
  })

  it('Should rotate a path', () => {
    const test = new Path()
      .move(new Point(123, 456))
      .line(new Point(12, 23))
      .curve(new Point(0, 40), new Point(123, 34), new Point(230, 4))
      .close()
    let deg = 60
    let rotationOrigin = new Point(42, 100)
    let rotated = test.rotate(deg, rotationOrigin, true)
    expect(test.length()).to.equal(rotated.length())
    expect(test.ops[0].to.rotate(deg, rotationOrigin).x).to.equal(rotated.ops[0].to.x)
    expect(test.ops[0].to.rotate(deg, rotationOrigin).y).to.equal(rotated.ops[0].to.y)
  })

  it('Should find the edges of a path', () => {
    const test = new Path()
      .move(new Point(45, 60))
      .line(new Point(10, 30))
      .curve(new Point(40, 20), new Point(50, -30), new Point(90, 30))
      .curve(new Point(90, 190), new Point(-60, 90), new Point(45, 60))
      .close()
    expect(round(test.edge('topLeft').x)).to.equal(7.7)
    expect(round(test.edge('topLeft').y)).to.equal(0.97)
    expect(round(test.edge('bottomLeft').x)).to.equal(7.7)
    expect(round(test.edge('bottomLeft').y)).to.equal(118.46)
    expect(round(test.edge('bottomRight').x)).to.equal(90)
    expect(round(test.edge('bottomRight').y)).to.equal(118.46)
    expect(round(test.edge('topRight').x)).to.equal(90)
    expect(round(test.edge('topRight').y)).to.equal(0.97)
    expect(round(test.edge('left').x)).to.equal(7.7)
    expect(round(test.edge('left').y)).to.equal(91.8)
    expect(round(test.edge('bottom').x)).to.equal(40.63)
    expect(round(test.edge('bottom').y)).to.equal(118.46)
    expect(round(test.edge('right').x)).to.equal(89.76)
    expect(round(test.edge('right').y)).to.equal(29.64)
    expect(round(test.edge('top').x)).to.equal(55.98)
    expect(round(test.edge('top').y)).to.equal(0.97)
  })

  it('Should find the edges of a path for corner cases', () => {
    let test = new Path().move(new Point(-45, -60)).line(new Point(45, 60))
    expect(round(test.edge('top').x)).to.equal(-45)
    expect(round(test.edge('top').y)).to.equal(-60)
    expect(round(test.edge('left').x)).to.equal(-45)
    expect(round(test.edge('left').y)).to.equal(-60)
    expect(round(test.edge('bottom').x)).to.equal(45)
    expect(round(test.edge('bottom').y)).to.equal(60)
    expect(round(test.edge('right').x)).to.equal(45)
    expect(round(test.edge('right').y)).to.equal(60)
    test = new Path().move(new Point(45, 60)).line(new Point(-45, -60))
    expect(round(test.edge('top').x)).to.equal(-45)
    expect(round(test.edge('top').y)).to.equal(-60)
    expect(round(test.edge('left').x)).to.equal(-45)
    expect(round(test.edge('left').y)).to.equal(-60)
    expect(round(test.edge('bottom').x)).to.equal(45)
    expect(round(test.edge('bottom').y)).to.equal(60)
    expect(round(test.edge('right').x)).to.equal(45)
    expect(round(test.edge('right').y)).to.equal(60)
  })

  it('Should find the edge of a path for this edge-case', () => {
    const test = new Path()
      .move(new Point(-109.7, 77))
      .curve(new Point(-27.33, 99.19), new Point(-39.45, 137.4), new Point(-61.52, 219.77))
    expect(round(test.edge('right').x)).to.equal(-45.22)
    expect(round(test.edge('right').y)).to.equal(139.4)
  })

  it('Should find where a path intersects with an X value', () => {
    const A = new Point(95, 50)
    const B = new Point(10, 30)
    const BCp2 = new Point(40, 20)
    const C = new Point(90, 30)
    const CCp1 = new Point(50, -30)
    const D = new Point(50, 130)
    const DCp1 = new Point(150, 30)
    const test = new Path().move(A).line(B).curve(BCp2, CCp1, C).curve(DCp1, DCp1, D).close()
    const intersections = test.intersectsX(60)
    expect(intersections.length).to.equal(4)
    expect(round(intersections[0].x)).to.equal(60)
    expect(round(intersections[0].y)).to.equal(41.76)
    expect(round(intersections[1].x)).to.equal(60)
    expect(round(intersections[1].y)).to.equal(1.45)
    expect(round(intersections[2].x)).to.equal(60)
    expect(round(intersections[2].y)).to.equal(120)
    expect(round(intersections[3].x)).to.equal(60)
    expect(round(intersections[3].y)).to.equal(112.22)
  })

  it('Should find where a path intersects with an Y value', () => {
    const A = new Point(95, 50)
    const B = new Point(10, 30)
    const BCp2 = new Point(40, 20)
    const C = new Point(90, 30)
    const CCp1 = new Point(50, -30)
    const D = new Point(50, 130)
    const DCp1 = new Point(150, 30)
    const test = new Path().move(A).line(B).curve(BCp2, CCp1, C).curve(DCp1, DCp1, D).close()
    let intersections = test.intersectsY(60)
    expect(intersections.length).to.equal(2)
    expect(round(intersections[0].x)).to.equal(117.83)
    expect(round(intersections[0].y)).to.equal(60)
    expect(round(intersections[1].x)).to.equal(89.38)
    expect(round(intersections[1].y)).to.equal(60)
  })

  it('Should throw an error when not passing a value to path.intersectsX', () => {
    const test = new Path()
    expect(() => test.intersectsX()).to.throw()
    expect(() => test.intersectsY()).to.throw()
  })

  it('Should find the intersections between two paths', () => {
    const A = new Point(45, 60)
    const B = new Point(10, 30)
    const BCp2 = new Point(40, 20)
    const C = new Point(90, 30)
    const CCp1 = new Point(50, -30)
    const D = new Point(50, 130)
    const DCp1 = new Point(150, 30)

    const _A = new Point(55, 40)
    const _B = new Point(0, 55)
    const _BCp2 = new Point(40, -20)
    const _C = new Point(90, 40)
    const _CCp1 = new Point(50, -30)
    const _D = new Point(40, 120)
    const _DCp1 = new Point(180, 40)

    const example1 = new Path().move(A).line(B).curve(BCp2, CCp1, C).curve(DCp1, DCp1, D)
    const example2 = new Path().move(_A).line(_B).curve(_BCp2, _CCp1, _C).curve(_DCp1, _DCp1, _D)
    let intersections = example1.intersects(example2)
    expect(intersections.length).to.equal(6)
    expect(round(intersections[0].x)).to.equal(29.71)
    expect(round(intersections[0].y)).to.equal(46.9)
    expect(round(intersections[1].x)).to.equal(12.48)
    expect(round(intersections[1].y)).to.equal(32.12)
    expect(round(intersections[2].x)).to.equal(14.84)
    expect(round(intersections[2].y)).to.equal(27.98)
    expect(round(intersections[3].x)).to.equal(66.33)
    expect(round(intersections[3].y)).to.equal(4.1)
    expect(round(intersections[4].x)).to.equal(130.65)
    expect(round(intersections[4].y)).to.equal(40.52)
    expect(round(intersections[5].x)).to.equal(86.52)
    expect(round(intersections[5].y)).to.equal(93.31)
  })

  it('Should throw an error when running path.intersect on an identical path', () => {
    const test = new Path()
    expect(() => test.intersects(test)).to.throw()
  })

  it('Should divide a path', () => {
    const A = new Point(45, 60)
    const B = new Point(10, 30)
    const BCp2 = new Point(40, 20)
    const C = new Point(90, 30)
    const CCp1 = new Point(50, -30)
    const D = new Point(-60, 90)
    const E = new Point(90, 190)
    const test = new Path().move(A).line(B).curve(BCp2, CCp1, C).curve(E, D, A).close()
    let divided = test.divide()
    expect(divided.length).to.equal(4)
    expect(divided[0].ops[0].type).to.equal('move')
    expect(divided[0].ops[0].to.x).to.equal(45)
    expect(divided[0].ops[0].to.y).to.equal(60)
    expect(divided[0].ops[1].type).to.equal('line')
    expect(divided[0].ops[1].to.x).to.equal(10)
    expect(divided[0].ops[1].to.y).to.equal(30)
    expect(divided[1].ops[0].type).to.equal('move')
    expect(divided[1].ops[0].to.x).to.equal(10)
    expect(divided[1].ops[0].to.y).to.equal(30)
    expect(divided[1].ops[1].type).to.equal('curve')
    expect(divided[1].ops[1].cp1.x).to.equal(40)
    expect(divided[1].ops[1].cp1.y).to.equal(20)
    expect(divided[1].ops[1].cp2.x).to.equal(50)
    expect(divided[1].ops[1].cp2.y).to.equal(-30)
    expect(divided[1].ops[1].to.x).to.equal(90)
    expect(divided[1].ops[1].to.y).to.equal(30)
    expect(divided[2].ops[0].type).to.equal('move')
    expect(divided[2].ops[0].to.x).to.equal(90)
    expect(divided[2].ops[0].to.y).to.equal(30)
    expect(divided[2].ops[1].type).to.equal('curve')
    expect(divided[2].ops[1].cp1.x).to.equal(90)
    expect(divided[2].ops[1].cp1.y).to.equal(190)
    expect(divided[2].ops[1].cp2.x).to.equal(-60)
    expect(divided[2].ops[1].cp2.y).to.equal(90)
    expect(divided[2].ops[1].to.x).to.equal(45)
    expect(divided[2].ops[1].to.y).to.equal(60)
    expect(divided[3].ops[0].type).to.equal('move')
    expect(divided[3].ops[0].to.x).to.equal(45)
    expect(divided[3].ops[0].to.y).to.equal(60)
    expect(divided[3].ops[1].type).to.equal('line')
    expect(divided[3].ops[1].to.x).to.equal(45)
    expect(divided[3].ops[1].to.y).to.equal(60)
  })

  it('Should split a path on a curve', () => {
    const A = new Point(45, 60)
    const B = new Point(10, 30)
    const BCp2 = new Point(40, 20)
    const C = new Point(90, 30)
    const CCp1 = new Point(50, -30)
    const D = new Point(50, 130)
    const DCp1 = new Point(150, 30)

    const test = new Path().move(A).line(B).curve(BCp2, CCp1, C).curve(DCp1, DCp1, D)

    const split = test.shiftAlong(120)
    let halves = test.split(split)
    let curve = halves[0].ops.pop()
    expect(curve.type).to.equal('curve')
    expect(round(curve.cp1.x)).to.equal(35.08)
    expect(round(curve.cp1.y)).to.equal(21.64)
    expect(round(curve.cp2.x)).to.equal(46.18)
    expect(round(curve.cp2.y)).to.equal(-14.67)
    expect(round(curve.to.x)).to.equal(72.51)
    expect(round(curve.to.y)).to.equal(8.69)
  })

  it('Should split a path on a line', () => {
    const A = new Point(45, 60)
    const B = new Point(10, 30)
    const BCp2 = new Point(40, 20)
    const C = new Point(90, 30)
    const CCp1 = new Point(50, -30)
    const D = new Point(50, 130)
    const DCp1 = new Point(150, 30)

    const test = new Path().move(A).line(B).curve(BCp2, CCp1, C).curve(DCp1, DCp1, D)

    const split = test.shiftAlong(20)
    let halves = test.split(split)
    let line = halves[0].ops.pop()
    expect(line.type).to.equal('line')
    expect(round(line.to.x)).to.equal(29.81)
    expect(round(line.to.y)).to.equal(46.98)
  })

  it('Should split a path on a line joint', () => {
    const a = new Point(45, 60)
    const b = new Point(10, 30)
    const c = new Point(90, 30)
    const test = new Path().move(a).line(b).line(c)

    let halves = test.split(b)
    expect(halves[0].ops[1].to.x).to.equal(10)
    expect(halves[0].ops[1].to.y).to.equal(30)
    expect(halves[1].ops[0].to.x).to.equal(10)
    expect(halves[1].ops[0].to.y).to.equal(30)
  })

  it('Should split a path on roughly a line joint', () => {
    const a = new Point(45, 60)
    const b = new Point(10, 30)
    const c = new Point(90, 30)
    const test = new Path().move(a).line(b).line(c)

    let halves = test.split(new Point(10.1, 29.9))
    expect(halves[0].ops[1].to.x).to.equal(10)
    expect(halves[0].ops[1].to.y).to.equal(30)
    expect(halves[1].ops[0].to.x).to.equal(10)
    expect(halves[1].ops[0].to.y).to.equal(30)
  })

  it('Should split a path on a curve joint', () => {
    const a = new Point(45, 60)
    const b = new Point(10, 30)
    const c = new Point(90, 30)
    const test = new Path().move(a)._curve(b, b)._curve(c, c)

    let halves = test.split(b)
    expect(halves[0].ops[1].to.x).to.equal(10)
    expect(halves[0].ops[1].to.y).to.equal(30)
    expect(halves[1].ops[0].to.x).to.equal(10)
    expect(halves[1].ops[0].to.y).to.equal(30)
  })

  // Issue 6816: https://github.com/freesewing/freesewing/issues/6816
  it('Should split a path on the start of that same path', () => {
    const A = new Point(45, 60)
    const B = new Point(10, 30)

    const test = new Path().move(A).line(B)
    let halves = test.split(A)
    expect(halves[0]).to.equal(null)
    expect(halves[1].ops[0].to.x).to.equal(45)
    expect(halves[1].ops[0].to.y).to.equal(60)
    expect(halves[1].ops[1].to.x).to.equal(10)
    expect(halves[1].ops[1].to.y).to.equal(30)
  })

  // Issue 6816: https://github.com/freesewing/freesewing/issues/6816
  it('Should split a path on the end of that same path', () => {
    const A = new Point(45, 60)
    const B = new Point(10, 30)

    const test = new Path().move(A).line(B)
    let halves = test.split(B)
    expect(halves[1]).to.equal(null)
    expect(halves[0].ops[0].to.x).to.equal(45)
    expect(halves[0].ops[0].to.y).to.equal(60)
    expect(halves[0].ops[1].to.x).to.equal(10)
    expect(halves[0].ops[1].to.y).to.equal(30)
  })

  it('Should determine the angle on a path', () => {
    const a = new Point(0, 0)
    const b = new Point(0, 40)
    const c = new Point(40, 40)
    const d = new Point(100, 40)
    const e = new Point(100, 0)

    const linePoint = new Point(80, 40)
    const curvePoint = new Point(5, 35)

    const path = new Path().move(a).curve(b, b, c).line(d).line(e)

    let angleAtStart = path.angleAt(a)
    let angleOnCurve = path.angleAt(curvePoint)
    let angleOnJoint = path.angleAt(c)
    let angleOnLine = path.angleAt(linePoint)
    let angleOnCorner = path.angleAt(d)
    let angleOnEnd = path.angleAt(e)

    expect(angleAtStart).to.equal(-90)
    expect(angleOnCurve).to.equal(-45)
    expect(angleOnJoint).to.equal(0)
    expect(angleOnLine).to.equal(0)
    expect(angleOnCorner).to.equal(0)
    expect(angleOnEnd).to.equal(90)
  })

  it('Should trim a path when lines overlap', () => {
    const A = new Point(0, 0)
    const B = new Point(100, 100)
    const C = new Point(0, 100)
    const D = new Point(100, 0)

    let test = new Path().move(new Point(0, 20)).line(A).line(B).line(C).line(D).line(A).trim()

    expect(test.ops.length).to.equal(5)
    expect(test.ops[2].to.x).to.equal(50)
    expect(test.ops[2].to.y).to.equal(50)
  })

  it('Should trim a path when a line overlaps with a curve', () => {
    const A = new Point(0, 0)
    const B = new Point(100, 100)
    const C = new Point(0, 100)
    const D = new Point(100, 0)

    let test = new Path()
      .move(new Point(0, 20))
      .line(A)
      .curve(D, B, B)
      .line(C)
      .line(D)
      .line(A)
      .trim()

    expect(test.ops.length).to.equal(5)
    expect(round(test.ops[2].to.x)).to.equal(72.19)
    expect(round(test.ops[2].to.y)).to.equal(27.81)
  })

  it('Should trim a path when a curves overlap', () => {
    const A = new Point(0, 0)
    const B = new Point(100, 100)
    const C = new Point(0, 100)
    const D = new Point(100, 0)

    let test = new Path()
      .move(new Point(0, 20))
      .line(A)
      .curve(D, B, B)
      .line(C)
      .curve(C, A, D)
      .line(A)
      .trim()

    expect(test.ops.length).to.equal(5)
    expect(round(test.ops[2].to.x)).to.equal(50)
    expect(round(test.ops[2].to.y)).to.equal(11.01)
  })

  it('Should translate a path', () => {
    const A = new Point(0, 0)
    const B = new Point(100, 100)
    const C = new Point(0, 100)
    const D = new Point(100, 0)

    let base = new Path().move(A).curve(B, C, D)
    let test = base.translate(10, 20)

    expect(test.ops.length).to.equal(2)
    expect(test.ops[0].to.x).to.equal(10)
    expect(test.ops[0].to.y).to.equal(20)
    expect(test.ops[1].to.x).to.equal(110)
    expect(test.ops[1].to.y).to.equal(20)
  })

  it('Calling translate with non-numbers should generate a warning', () => {
    const log = []
    const p = new Path()
    p.log = { warn: (msg) => log.push(msg) }
    p.translate('a', 'b')
    expect(log.length).to.equal(2)
    expect(log[0]).to.equal('Called `Path.translate(x, y)` but `x` is not a number')
    expect(log[1]).to.equal('Called `Path.translate(x, y)` but `y` is not a number')
  })

  it('Should add a path attribute', () => {
    const line = new Path()
      .move(new Point(0, 0))
      .line(new Point(0, 40))
      .attr('class', 'foo')
      .attr('class', 'bar')
    expect(line.attributes.get('class')).to.equal('foo bar')
  })

  it('Should overwrite a path attribute', () => {
    const line = new Path()
    line.log = { debug: () => {} }
    line
      .move(new Point(0, 0))
      .line(new Point(0, 40))
      .attr('class', 'foo')
      .attr('class', 'bar')
      .attr('class', 'overwritten', true)

    // Paths from shorthand have the log method
    expect(line.attributes.get('class')).to.equal('overwritten')
  })

  it('Should move along a path even if it lands just on a joint', () => {
    const curve = new Path()
      .move(new Point(20.979322245694167, -219.8547313525503))
      ._curve(
        new Point(35.33122482627704, -153.54225517257478),
        new Point(61.99376179214562, -105.99242252587702)
      )
      .curve(
        new Point(88.85254026593002, -58.092613773317105),
        new Point(136.13264764576948, -11.692646171119936),
        new Point(170.69593749999996, -4.180844669736632e-14)
      )
    const test = curve.shiftAlong(121.36690836797631)
    expect(test).to.be.instanceOf(Point)
  })

  it('Should add log methods to a path', () => {
    const log = () => 'hello'
    const p1 = new Path(10, 20).__withLog(log)
    expect(p1.log()).to.equal('hello')
  })

  it('Should add log methods to a path', () => {
    const log = () => 'hello'
    const p1 = new Path().__withLog(log)
    expect(p1.log()).to.equal('hello')
  })

  it('Should set hidden to true/false', () => {
    const p1 = new Path().setHidden(true)
    expect(p1.hidden).to.equal(true)
  })

  it('Should set class with setClass', () => {
    const p1 = new Path().setClass('fabric')
    p1.setClass()
    expect(p1.attributes.get('class')).to.equal('fabric')
  })

  it('Should log a warning when moving to a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    expect(invalid).to.equal(false)
    try {
      p1.move('a')
    } catch (err) {
      expect('' + err).to.contain('check is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a line to a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    expect(invalid).to.equal(false)
    try {
      p1.line('a')
    } catch (err) {
      expect('' + err).to.contain('check is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a curve to a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const a = new Point(0, 0)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b).curve(a, b, 'c')
    } catch (err) {
      expect('' + err).to.contain('check is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a curve with a Cp1 that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const a = new Point(0, 0)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b).curve(a, 'x', b)
    } catch (err) {
      expect('' + err).to.contain('check is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a curve with a Cp1 that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b).curve('a', b, b)
    } catch (err) {
      expect('' + err).to.contain('copy is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a curve with a Cp2 that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b).curve(b, 'a', b)
    } catch (err) {
      expect('' + err).to.contain('copy is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a _curve with a To that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b)._curve(b, 'a')
    } catch (err) {
      expect('' + err).to.contain('copy is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a _curve with a Cp2 that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b)._curve('a', b)
    } catch (err) {
      expect('' + err).to.contain('copy is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a curve_ with a To that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b).curve_(b, 'a')
    } catch (err) {
      expect('' + err).to.contain('copy is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when drawing a curve_ with a Cp2 that is a non-point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const p1 = new Path().__withLog(log)
    const b = new Point(10, 10)
    expect(invalid).to.equal(false)
    try {
      p1.move(b).curve_('a', b)
    } catch (err) {
      expect('' + err).to.contain('copy is not a function')
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when calling rotate with an origin that is not a point', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const test = new Path().__withLog(log).move(new Point(123, 456)).line(new Point(12, 23))

    expect(invalid).to.equal(false)
    let deg = 60
    try {
      test.rotate(deg, 'someOrigin')
    } catch (err) {
      expect('' + err).to.contain('Cannot read properties of')
    }
    expect(invalid).to.equal(true)
  })

  it('Should add a noop operation', () => {
    const p1 = new Path().noop()
    expect(p1.ops.length).to.equal(1)
    expect(p1.ops[0].type).to.equal('noop')
  })

  it('Should handle an insop operation', () => {
    const a = new Point(0, 0)
    const b = new Point(10, 10)
    const p1 = new Path().move(a).line(b)
    const p2 = new Path().noop('test').insop('test', p1)
    expect(p2.ops.length).to.equal(2)
    expect(p1.ops[0].type).to.equal('move')
    expect(p1.ops[1].type).to.equal('line')
  })

  it('Should log a warning when an insop operation used an falsy ID', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const a = new Point(0, 0)
    const b = new Point(10, 10)
    const p1 = new Path().move(a).line(b)
    expect(invalid).to.equal(false)
    new Path().__withLog(log).noop('test').insop(false, p1)
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when an insop operation used an falsy ID', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    const a = new Point(0, 0)
    const b = new Point(10, 10)
    new Path().move(a).line(b)
    expect(invalid).to.equal(false)
    try {
      new Path().__withLog(log).noop('test').insop('test')
    } catch (err) {
      expect('' + err).to.contain("Cannot read properties of undefined (reading 'ops')")
    }
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when setting an attribute without a name', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    new Path().__withLog(log).attr()
    expect(invalid).to.equal(true)
  })

  it('Should log a warning when setting an attribute without a value', () => {
    let invalid = false
    const log = { warn: () => (invalid = true) }
    new Path().__withLog(log).attr('test')
    expect(invalid).to.equal(true)
  })

  it('Should log an error when calling offset without a distance', () => {
    let invalid = true
    const log = { warn: () => {}, error: () => (invalid = true) }
    const pointLog = { error: () => {} }
    const pointA = new Point(0, 0).__withLog(pointLog)
    const pointB = new Point(0, 40).__withLog(pointLog)
    const a = new Path().__withLog(log).move(pointA).line(pointB)
    a.offset()
    expect(invalid).to.equal(true)
  })

  it('Should log an error when calling join without a path', () => {
    let invalid = false
    const log = { error: () => (invalid = true) }
    const line = new Path()
      .move(new Point(0, 0))
      .line(new Point(0, 40))
      .attr('class', 'foo')
      .__withLog(log)

    try {
      line.join()
    } catch (e) {
      expect('' + e).to.contain("TypeError: Cannot read properties of undefined (reading 'ops')")
    } finally {
      expect(invalid).to.equal(true)
    }
  })

  it('Should log a warning when calling start on a path without drawing operations', () => {
    let invalid = false
    const log = { error: () => (invalid = true) }
    try {
      new Path().__withLog(log).start()
    } catch (err) {
      expect('' + err).to.contain("Cannot read properties of undefined (reading 'to')")
    }
    expect(invalid).to.equal(true)
  })

  it('Should log an error when calling end on a path without drawing operations', () => {
    let invalid = false
    const log = { error: () => (invalid = true) }
    try {
      new Path().__withLog(log).end()
    } catch (err) {
      expect('' + err).to.contain("Cannot read properties of undefined (reading 'type')")
    }
    expect(invalid).to.equal(true)
  })

  it('Should log an error when calling shiftAlong but distance is not a number', () => {
    let invalid = false
    const log = { error: () => (invalid = true) }
    expect(invalid).to.equal(false)
    new Path().__withLog(log).move(new Point(0, 0)).line(new Point(10, 10)).shiftAlong()
    expect(invalid).to.equal(true)
  })

  it('Should log an error when calling shiftFractionalong but fraction is not a number', () => {
    let invalid = false
    const log = { error: () => (invalid = true) }
    new Path().__withLog(log).move(new Point(0, 0)).line(new Point(0, 40)).shiftFractionAlong()
    expect(invalid).to.equal(true)
  })

  it('Should log an error when splitting a path on a non-point', () => {
    let invalid = false
    const log = { error: () => (invalid = true) }
    const pointLog = { warn: () => {} }
    try {
      new Path()
        .__withLog(log)
        .move(new Point(0, 0).__withLog(pointLog))
        .line(new Point(0, 40).__withLog(pointLog))
        .split()
    } catch (e) {
      expect(e.toString()).to.include(
        "TypeError: Cannot read properties of undefined (reading '__check')"
      )
    } finally {
      expect(invalid).to.equal(true)
    }
  })

  it('Should add a class', () => {
    const line = new Path().move(new Point(0, 0)).line(new Point(10, 10)).addClass('fabric banana')

    expect(line.attributes.get('class')).to.equal('fabric banana')
  })

  it('Should (un)hide a path with hide()/unhide()', () => {
    const path = new Path()
    expect(path.hidden).to.equal(false)
    path.hide()
    expect(path.hidden).to.equal(true)
    path.unhide()
    expect(path.hidden).to.equal(false)
  })
})
