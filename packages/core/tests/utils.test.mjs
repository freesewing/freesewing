import chai from 'chai'
import {
  Point,
  Design,
  capitalize,
  beamsIntersect,
  linesIntersect,
  pointOnBeam,
  pointOnLine,
  pointOnCurve,
  splitCurve,
  beamIntersectsX,
  beamIntersectsY,
  units,
  lineIntersectsCurve,
  curveIntersectsX,
  curveIntersectsY,
  curvesIntersect,
  circlesIntersect,
  beamIntersectsCircle,
  lineIntersectsCircle,
  stretchToScale,
  round,
  deg2rad,
  rad2deg,
  pctBasedOn,
  generateStackTransform,
} from '../src/index.mjs'

const { expect } = chai

describe('Utils', () => {
  it('Should find the intersection of two endless line segments', () => {
    let a = new Point(10, 20)
    let b = new Point(20, 24)
    let c = new Point(90, 19)
    let d = new Point(19, 70)
    let X = beamsIntersect(a, b, c, d)
    expect(round(X.x)).to.equal(60.49)
    expect(round(X.y)).to.equal(40.2)
  })

  it('Should detect parallel lines', () => {
    let a = new Point(10, 20)
    let b = new Point(20, 20)
    let c = new Point(90, 40)
    let d = new Point(19, 40)
    expect(beamsIntersect(a, b, c, d)).to.equal(false)
    expect(linesIntersect(a, b, c, d)).to.equal(false)
  })

  it('Should detect vertical lines', () => {
    let a = new Point(10, 20)
    let b = new Point(10, 90)
    let c = new Point(90, 40)
    let d = new Point(19, 40)
    let X = beamsIntersect(a, b, c, d)
    expect(X.x).to.equal(10)
    expect(X.y).to.equal(40)
    X = beamsIntersect(c, d, a, b)
    expect(X.x).to.equal(10)
  })

  it('Should swap direction prior to finding beam intersection', () => {
    let a = new Point(10, 20)
    let b = new Point(0, 90)
    let c = new Point(90, 40)
    let d = new Point(19, 40)
    let X = beamsIntersect(a, b, c, d)
    expect(round(X.x)).to.equal(7.14)
    expect(round(X.y)).to.equal(40)
  })

  it("Should return false when two lines don't intersect", () => {
    let a = new Point(10, 20)
    let b = new Point(20, 24)
    let c = new Point(90, 19)
    let d = new Point(19, 70)
    expect(linesIntersect(a, b, c, d)).to.equal(false)
  })

  it('Should find the intersection of two line segments', () => {
    let a = new Point(10, 10)
    let b = new Point(90, 74)
    let c = new Point(90, 19)
    let d = new Point(11, 70)
    let X = linesIntersect(a, b, c, d)
    expect(round(X.x)).to.equal(51.95)
    expect(round(X.y)).to.equal(43.56)
  })

  it('Should find the intersection of an endles line and a give X-value', () => {
    let a = new Point(10, 10)
    let b = new Point(90, 74)
    let X = beamIntersectsX(a, b, 69)
    expect(X.x).to.equal(69)
    expect(X.y).to.equal(57.2)
  })

  it('Should find the intersection of an endles line and a give Y-value', () => {
    let a = new Point(10, 10)
    let b = new Point(90, 74)
    let X = beamIntersectsY(a, b, 69)
    expect(X.x).to.equal(83.75)
    expect(X.y).to.equal(69)
  })

  it('Should detect vertical lines never pass a give X-value', () => {
    let a = new Point(10, 10)
    let b = new Point(10, 90)
    expect(beamIntersectsX(a, b, 69)).to.equal(false)
  })

  it('Should detect horizontal lines never pass a give Y-value', () => {
    let a = new Point(10, 10)
    let b = new Point(90, 10)
    expect(beamIntersectsY(a, b, 69)).to.equal(false)
  })

  it('Should find no intersections between a curve and a line', () => {
    let A = new Point(10, 10)
    let Acp = new Point(310, 40)
    let B = new Point(110, 70)
    let Bcp = new Point(-210, 40)
    let E = new Point(-20, -20)
    let D = new Point(30, -85)

    let hit = lineIntersectsCurve(E, D, A, Acp, Bcp, B)
    expect(hit).to.equal(false)
  })

  it('Should find 1 intersection between a curve and a line', () => {
    let A = new Point(10, 10)
    let Acp = new Point(310, 40)
    let B = new Point(110, 70)
    let Bcp = new Point(-210, 40)
    let E = new Point(20, 20)
    let D = new Point(30, -85)

    let hit = lineIntersectsCurve(E, D, A, Acp, Bcp, B)
    expect(round(hit.x)).to.equal(20.85)
    expect(round(hit.y)).to.equal(11.11)
  })

  it('Should find 3 intersections between a curve and a line', () => {
    let A = new Point(10, 10)
    let Acp = new Point(310, 40)
    let B = new Point(110, 70)
    let Bcp = new Point(-210, 40)
    let E = new Point(20, -5)
    let D = new Point(100, 85)

    let hits = lineIntersectsCurve(E, D, A, Acp, Bcp, B)
    expect(hits.length).to.equal(3)
  })

  describe('curvesIntersect', function () {
    it('Should find 9 intersections between two curves', () => {
      let A = new Point(10, 10)
      let Acp = new Point(310, 40)
      let B = new Point(110, 70)
      let Bcp = new Point(-210, 40)
      let C = new Point(20, -5)
      let Ccp = new Point(60, 300)
      let D = new Point(100, 85)
      let Dcp = new Point(70, -220)

      let hits = curvesIntersect(A, Acp, Bcp, B, C, Ccp, Dcp, D)
      expect(hits.length).to.equal(9)
    })

    it('Should find 1 intersection between two curves', () => {
      let A = new Point(10, 10)
      let Acp = new Point(310, 40)
      let B = new Point(110, 70)
      let Bcp = new Point(-210, 40)
      let C = new Point(20, -5)
      let Ccp = new Point(-60, 300)
      let D = new Point(-200, 85)
      let Dcp = new Point(-270, -220)

      let hit = curvesIntersect(A, Acp, Bcp, B, C, Ccp, Dcp, D)
      expect(round(hit.x)).to.equal(15.58)
      expect(round(hit.y)).to.equal(10.56)
    })

    it('Should find no intersection between two curves', () => {
      let A = new Point(10, 10)
      let Acp = new Point(310, 40)
      let B = new Point(110, 70)
      let Bcp = new Point(-210, 40)
      let C = new Point(20, -5)
      let Ccp = new Point(-60, -300)
      let D = new Point(-200, 85)
      let Dcp = new Point(-270, -220)

      let hit = curvesIntersect(A, Acp, Bcp, B, C, Ccp, Dcp, D)
      expect(hit).to.equal(false)
    })
  })

  it('Should correctly format units', () => {
    expect(units(123.456)).to.equal('12.35cm')
    expect(units(123.456, 'imperial')).to.equal('4.86&quot;')
  })

  it('Should find a start or end point on beam', () => {
    let A = new Point(12, 34)
    let B = new Point(56, 78)
    let checkA = new Point(12, 34)
    let checkB = new Point(56, 78)
    expect(pointOnBeam(A, B, checkA)).to.equal(true)
    expect(pointOnBeam(A, B, checkB)).to.equal(true)
  })

  it('Should find whether a point lies on a line segment', () => {
    let A = new Point(12, 34)
    let B = new Point(56, 78)
    let check1 = A.shiftTowards(B, 10)
    let check2 = A.shiftTowards(B, 210)
    expect(pointOnLine(A, B, check1)).to.equal(true)
    expect(pointOnLine(A, B, check2)).to.equal(false)
  })

  it('Should find a start or end point on curve', () => {
    let A = new Point(12, 34)
    let Acp = new Point(123, 4)
    let B = new Point(56, 78)
    let Bcp = new Point(5, 678)
    let checkA = new Point(12, 34)
    let checkB = new Point(56, 78)
    expect(pointOnCurve(A, Acp, Bcp, B, checkA)).to.equal(true)
    expect(pointOnCurve(A, Acp, Bcp, B, checkB)).to.equal(true)
  })

  it('Should find the intersections of a beam and circle', () => {
    let A = new Point(45, 45).attr('data-circle', 35)
    let B = new Point(5, 50)
    let C = new Point(25, 30)
    let intersections = beamIntersectsCircle(A, A.attributes.get('data-circle'), B, C, 'y')
    expect(intersections.length).to.equal(2)
    expect(round(intersections[0].x)).to.equal(45)
    expect(round(intersections[0].y)).to.equal(10)
    expect(round(intersections[1].x)).to.equal(10)
    expect(round(intersections[1].y)).to.equal(45)
  })

  it('Should not find the intersections of this beam and circle', () => {
    let A = new Point(75, 75).attr('data-circle', 35)
    let B = new Point(5, 5)
    let C = new Point(10, 5)
    let intersections = beamIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections).to.equal(false)
  })

  it('Should find one intersections between this beam and circle', () => {
    let A = new Point(5, 5).attr('data-circle', 5)
    let B = new Point(0, 0)
    let C = new Point(-10, 0)
    let intersections = beamIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections.length).to.equal(1)
    expect(intersections[0].x).to.equal(5)
    expect(intersections[0].y).to.equal(0)
  })

  it('Should find one intersections between this tangent and circle', () => {
    let A = new Point(5, 5).attr('data-circle', 5)
    let B = new Point(0, 0)
    let C = new Point(10, 0)
    let intersections = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections.length).to.equal(1)
    expect(intersections[0].x).to.equal(5)
    expect(intersections[0].y).to.equal(0)
  })

  it('Should find one intersection between this line and circle', () => {
    let A = new Point(5, 5).attr('data-circle', 5)
    let B = new Point(5, 5)
    let C = new Point(26, 25)
    let intersections = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections.length).to.equal(1)
    expect(round(intersections[0].x)).to.equal(8.62)
    expect(round(intersections[0].y)).to.equal(8.45)
  })

  it('Should not find an intersections between this line and circle', () => {
    let A = new Point(5, 5).attr('data-circle', 5)
    let B = new Point(0, 0)
    let C = new Point(-10, 0)
    let intersections = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections).to.equal(false)
  })

  it('Should find two intersections between this line and circle', () => {
    let A = new Point(6, 7).attr('data-circle', 5)
    let B = new Point(0, 10)
    let C = new Point(10, 0)
    let intersections1 = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C, 'foo')
    let intersections2 = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C, 'x')
    let intersections3 = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C, 'y')
    expect(intersections1.length).to.equal(2)
    expect(intersections2.length).to.equal(2)
    expect(intersections3.length).to.equal(2)
    expect(intersections1[0].sitsOn(intersections2[1])).to.equal(true)
    expect(intersections1[1].sitsOn(intersections2[0])).to.equal(true)
    expect(intersections1[0].sitsOn(intersections3[0])).to.equal(true)
    expect(intersections1[1].sitsOn(intersections3[1])).to.equal(true)
    expect(round(intersections1[0].x)).to.equal(7.7)
    expect(round(intersections1[0].y)).to.equal(2.3)
    expect(round(intersections1[1].x)).to.equal(1.3)
    expect(round(intersections1[1].y)).to.equal(8.7)
  })

  it('Should find the intersections of a line and circle', () => {
    let A = new Point(45, 45).attr('data-circle', 35)
    let B = new Point(5, 50)
    let C = new Point(25, 30)
    let intersections = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections.length).to.equal(1)
    expect(round(intersections[0].x)).to.equal(10)
    expect(round(intersections[0].y)).to.equal(45)
  })

  it('Should not find intersections of this line and circle', () => {
    let A = new Point(75, 75).attr('data-circle', 35)
    let B = new Point(5, 5)
    let C = new Point(10, 5)
    let intersections = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections).to.equal(false)
  })

  it('Should not find intersections of this line and circle', () => {
    let A = new Point(45, 45).attr('data-circle', 35)
    let B = new Point(40, 40)
    let C = new Point(52, 50)
    let intersections = lineIntersectsCircle(A, A.attributes.get('data-circle'), B, C)
    expect(intersections).to.equal(false)
  })

  it('Should find intersections between circles', () => {
    let A = new Point(10, 10).attr('data-circle', 15)
    let B = new Point(30, 30).attr('data-circle', 35)

    let intersections1 = circlesIntersect(
      A,
      A.attributes.get('data-circle'),
      B,
      B.attributes.get('data-circle')
    )
    let intersections2 = circlesIntersect(
      A,
      A.attributes.get('data-circle'),
      B,
      B.attributes.get('data-circle'),
      'y'
    )
    expect(intersections1.length).to.equal(2)
    expect(intersections2.length).to.equal(2)
    expect(round(intersections1[0].x)).to.equal(-2.81)
    expect(round(intersections1[0].y)).to.equal(17.81)
    expect(round(intersections1[1].x)).to.equal(17.81)
    expect(round(intersections1[1].y)).to.equal(-2.81)
    expect(round(intersections2[0].x)).to.equal(17.81)
    expect(round(intersections2[0].y)).to.equal(-2.81)
    expect(round(intersections2[1].x)).to.equal(-2.81)
    expect(round(intersections2[1].y)).to.equal(17.81)
  })

  it('Should not find intersections between non-overlapping circles', () => {
    let A = new Point(10, 10).attr('data-circle', 15)
    let B = new Point(90, 90).attr('data-circle', 35)

    let intersections = circlesIntersect(
      A,
      A.attributes.get('data-circle'),
      B,
      B.attributes.get('data-circle')
    )
    expect(intersections).to.equal(false)
  })

  it('Should not find intersections between contained circles', () => {
    let A = new Point(10, 10).attr('data-circle', 15)
    let B = new Point(10, 10).attr('data-circle', 35)

    let intersections = circlesIntersect(
      A,
      A.attributes.get('data-circle'),
      B,
      B.attributes.get('data-circle')
    )
    expect(intersections).to.equal(false)
  })

  it('Should not find intersections between identical circles', () => {
    let A = new Point(10, 10).attr('data-circle', 35)
    let B = new Point(10, 10).attr('data-circle', 35)

    let intersections = circlesIntersect(
      A,
      A.attributes.get('data-circle'),
      B,
      B.attributes.get('data-circle')
    )
    expect(intersections).to.equal(false)
  })

  it('Should return scale for a given amount of stretch', () => {
    expect(stretchToScale(0)).to.equal(1)
    expect(stretchToScale(0.25)).to.equal(0.8)
  })

  it('Should capitalize a string', () => {
    expect(capitalize('test')).to.equal('Test')
    expect(capitalize('Freesewing')).to.equal('Freesewing')
  })

  it('Should split a curve', () => {
    let a = new Point(0, 0)
    let b = new Point(50, 0)
    let c = new Point(50, 100)
    let d = new Point(100, 100)
    let X = new Point(50, 50)
    let [c1, c2] = splitCurve(a, b, c, d, X)
    expect(round(c1.cp1.x)).to.equal(25)
    expect(round(c1.cp1.y)).to.equal(0)
    expect(round(c1.cp2.x)).to.equal(37.5)
    expect(round(c1.cp2.y)).to.equal(25)
    expect(round(c2.cp1.x)).to.equal(62.5)
    expect(round(c2.cp1.y)).to.equal(75)
    expect(round(c2.cp2.x)).to.equal(75)
    expect(round(c2.cp2.y)).to.equal(100)
  })

  it('Should find where a curve intersects a given X-value', () => {
    let a = new Point(0, 0)
    let b = new Point(50, 0)
    let c = new Point(50, 100)
    let d = new Point(100, 100)
    let i = curveIntersectsX(a, b, c, d, 30)
    expect(round(i.x)).to.equal(30)
    expect(round(i.y)).to.equal(16)
  })

  it('Should find where a curve intersects a given Y-value', () => {
    let a = new Point(0, 0)
    let b = new Point(50, 0)
    let c = new Point(50, 100)
    let d = new Point(100, 100)
    let i = curveIntersectsY(a, b, c, d, 30)
    expect(round(i.x)).to.equal(39.49)
    expect(round(i.y)).to.equal(30)
  })

  // Recreate issue #1206
  it('Should find intersecting beams when a line is almost vertical', () => {
    let a = new Point(225.72, 241)
    let b = new Point(225.71999999999997, 600)
    let i = beamIntersectsY(a, b, 400)
    expect(round(i.y)).to.equal(400)
  })

  it('Should convert degrees to radians', () => {
    expect(deg2rad(0)).to.equal(0)
    expect(round(deg2rad(69))).to.equal(1.2)
  })

  it('Should convert radians to degrees', () => {
    expect(rad2deg(0)).to.equal(0)
    expect(round(rad2deg(69))).to.equal(3953.41)
  })

  it('Should shoulder return two methods for pctBasedOn', () => {
    const result = pctBasedOn('chest')
    expect(typeof result.toAbs).to.equal('function')
    expect(typeof result.fromAbs).to.equal('function')
    const measurements = { chest: 1000 }
    expect(result.toAbs(0.0123, { measurements })).to.equal(12.3)
    expect(result.fromAbs(12.3, { measurements })).to.equal(0.0123)
  })
  it('Should generate a stack transform', () => {
    const test = {
      name: 'test',
      draft: ({ points, Point, paths, Path, part }) => {
        points.from = new Point(2, 2)
        points.to = new Point(19, 76)
        paths.test = new Path().move(points.from).line(points.to)
        return part
      },
    }
    const design = new Design({ parts: [test] })
    const pattern = new design()
    const props = pattern.draft().getRenderProps()
    const transform = generateStackTransform(30, 60, 90, true, true, props.stacks.test)
    expect(transform.join(' ')).to.equal('translate(51, 138) scale(-1, -1) rotate(90, 10.5, 39)')
  })
})
