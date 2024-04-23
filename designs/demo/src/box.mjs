function draftBox({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  macro,
  utils,
  part,
}) {
  // pocketOpening (grabbed from sasha svg)
  // 118.64,528.31 C 118.64,528.31 218.88,632.31 336.56,632.31
  points.po_from = new Point(118.64, 528.31)
  points.po_cp2 = new Point(218.88, 632.31)
  points.po_to = new Point(336.56, 632.31)

  paths.pocketOpening = new Path().move(points.po_from)._curve(points.po_cp2, points.po_to)

  paths.testLine = new Path()
    .move(
      points.po_to
        .translate(15, -15)
        .shift(90, options.lineStartShift * paths.pocketOpening.length())
    )
    .line(
      points.po_from.translate(-30, 0).shift(0, options.lineEndShift * paths.pocketOpening.length())
    )

  paths.testCurve = paths.pocketOpening

  const tol = options.snapTol * 100 // mm

  let opCurve = paths.testCurve.ops[1]

  console.log('calling lineIntersectsCurveAlt from box')
  const test_intersection2 = utils.lineIntersectsCurveAlt(
    paths.testLine.start(),
    paths.testLine.end(),
    paths.testCurve.start(),
    opCurve.cp1,
    opCurve.cp2,
    opCurve.to,
    tol
  )

  let num_intersects
  if (test_intersection2) {
    console.log('test_intersection:', test_intersection2)
    if (test_intersection2 instanceof Array) {
      const intersections_flat = test_intersection2.flat(Infinity)
      console.log('intersections_flat:', intersections_flat)
      let nint = 0
      for (let i of intersections_flat) {
        if (i) {
          i.addCircle(5, 'facing')
          points[`intersection_${nint++}`] = i.clone()
        }
      }
      num_intersects = nint
    } else {
      points.intersection = test_intersection2.addCircle(5, 'facing')
      num_intersects = 1
    }
  } else {
    num_intersects = 0
  }

  console.log('lineIntersectsCurveAlt found', num_intersects, 'intersections')

  console.log('paths', paths)

  let point3 = new Point(36, 160)
  let point3Cp1 = new Point(44, 106)
  let point4Cp2 = new Point(53, 67)
  let point4 = new Point(49, 17)
  let dartPoint0 = new Point(63, 78)
  let dartPoint0Cp1 = new Point(63, 78)
  let dartPoint1Cp2 = new Point(32, 64)
  let dartPoint1 = new Point(18, 63)

  paths.p1 = new Path().move(point3).curve(point3Cp1, point4Cp2, point4)
  paths.d1 = new Path().move(dartPoint0).curve(dartPoint0Cp1, dartPoint1Cp2, dartPoint1)

  console.log('calling curvesIntersectAlt from box')
  let i = utils.curvesIntersectAlt(
    point3,
    point3Cp1,
    point4Cp2,
    point4,
    dartPoint0,
    dartPoint0Cp1,
    dartPoint1Cp2,
    dartPoint1,
    tol
  )

  console.log('i', i)

  return part
}

export const box = {
  name: 'box',
  options: {
    lineEndShift: {
      pct: 0,
      min: -100,
      max: +100,
      menu: 'fit',
    },
    lineStartShift: {
      pct: -20,
      min: -50,
      max: +10,
      menu: 'fit',
    },
    snapTol: {
      pct: 100, // will be displayed as 1 (to be interpreted as mm)
      min: 1,
      max: 10,
      //snap: [0.0001, 0.001, 0.005, 0.01, 0.03, 0.05, 0.10],
      menu: 'fit',
    },
  },
  draft: draftBox,
}
