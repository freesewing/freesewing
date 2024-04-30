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
  const tol = options.snapTol * 100 // mm

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
          i.addCircle(5, 'lining')
          points[`intersection_${nint++}`] = i.clone()
        }
      }
      num_intersects = nint
    } else {
      points.intersection = test_intersection2.addCircle(5, 'lining')
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

  points.m0 = new Point(100, 0)
  points.mX = new Point(100, 200)
  points.mY = new Point(0, 0)

  if (options.mirror == 'X') {
    macro('mirror', {
      clone: false,
      mirror: [points.m0, points.mX],
      paths: ['p1', 'd1'],
    })
  } else if (options.mirror == 'Y') {
    macro('mirror', {
      clone: false,
      mirror: [points.m0, points.mY],
      paths: ['p1', 'd1'],
    })
  } else if (options.mirror == 'XY') {
    macro('mirror', {
      clone: false,
      mirror: [points.m0, points.mX],
      paths: ['p1', 'd1'],
    })
    macro('mirror', {
      clone: false,
      mirror: [points.m0, points.mY],
      paths: ['p1', 'd1'],
    })
  }

  // confirm that rotate takes the current angle into account
  //points.test = point3.shiftFractionTowards(point4,0.5).rotate(45,point4).addCircle(10,'lining')

  /* // export utils.boundsForCurve and utils.boundsIntersect for the code below to work
  let bounds = utils.boundsForCurve(point3,point3Cp1,point4Cp2,point4,1)
  paths.bound_a = bounds[0].setClass('lining')
  paths.bound_b = bounds[1].setClass('lining sa') 
  
  points.startA = paths.bound_a.start().addCircle(2,'sa')
  
  // reverse the curve if necessary to define bounds consistently
  console.log('original angle between:',point3.angle(point4) - dartPoint0.angle(dartPoint1))
  let angleBetween = (360 + dartPoint0.angle(dartPoint1) - point3.angle(point4)) % 360 // guaranteed to be in [0 360)
  let temp_points = [dartPoint0,dartPoint0Cp1, dartPoint1Cp2, dartPoint1]
  if (angleBetween >= 90 && angleBetween < 270) {
    // reverse the array defining the path if necessary to ensure that bounds do not run in opposite direction
    temp_points = temp_points.reverse()
    angleBetween = (180 + angleBetween) % 360
    //console.log('reversed points')
  }
  // express the angle as a value in [-90 90) instead of [0 360) (with (90 270) cut out)
  angleBetween = ((angleBetween + 90) % 360) - 90
  
  console.log('angle between curves:', angleBetween)

  // define bounds for the curve
  bounds = utils.boundsForCurve(...temp_points,1)

  // mirror/invert the bounds assignment so that AC and BD are the outermost crossings
  paths.bound_c = bounds[1].setClass('mark')
  paths.bound_d = bounds[0].setClass('mark sa')  
  
  points.startC = paths.bound_c.start().addCircle(2,'sa')
  
  
  
  const lengthsToRemove = utils.boundsIntersect(
      paths.bound_a.start(),
      paths.bound_a.end(),
      paths.bound_b.start(),
      paths.bound_b.end(),
      paths.bound_c.start(),
      paths.bound_c.end(),
      paths.bound_d.start(),
      paths.bound_d.end(),
      angleBetween,
      tol
    )
    
  points.aFirst = paths.bound_a.shiftAlong(lengthsToRemove[0]).addCircle(2,'lining')
  points.aLast = paths.bound_a.reverse().shiftAlong(lengthsToRemove[1]).addCircle(2,'mark')
  points.dFirst = paths.bound_d.shiftAlong(lengthsToRemove[2]).addCircle(2,'canvas')
  points.dLast = paths.bound_d.reverse().shiftAlong(lengthsToRemove[3]).addCircle(2,'note') */

  /*   const xBD = utils.linesIntersect(paths.bound_b.start(),paths.bound_b.end(),paths.bound_d.start(),paths.bound_d.end())
  
  points.xBD = xBD || paths.bound_d.end()
  points.xBD.addCircle(10,'note') */

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

  if (i) {
    points.temp = i.addCircle(5, 'lining')
  }

  let lin = utils.linesIntersect(point3, point4, dartPoint0, dartPoint1)
  lin.addCircle(5, 'note')

  console.log('lin', lin)

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
    mirror: {
      dflt: 'none',
      list: ['none', 'X', 'Y', 'XY'],
      menu: 'fit',
    },
  },
  draft: draftBox,
}
