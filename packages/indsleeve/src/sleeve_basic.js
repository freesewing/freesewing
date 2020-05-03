export default function (part) {
  let {
    Point,
    points,
    Path,
    paths,
    measurements,
    options,
    utils,
    snippets,
    snippet,
    macro
  } = part.shorthand()
  // Design pattern here
  let capheight = options.capheightlength //increased to 5.5 inches
  points.origin = new Point(0, 0)
  points.graintop = points.origin.shift(-90, 15)
  points.cap = new Point(0, -capheight)
  points.bicepright = new Point(measurements.bicepsCircumference / 2, 0)
  points.bicepleft = points.bicepright.flipX()
  points.wristCircumferenceright = new Point(
    measurements.wristCircumference / 2,
    measurements.shoulderToWrist - capheight
  )
  points.wristCircumferenceleft = points.wristCircumferenceright.flipX()
  points.grainbottomtemp = points.wristCircumferenceleft.shift(
    0,
    points.wristCircumferenceleft.dx(points.wristCircumferenceright) / 2
  )
  points.grainbottom = points.grainbottomtemp.shift(90, 15)
  let Y = measurements.shoulderToWrist / 2 + 25 - capheight
  points.elbowright = utils.beamIntersectsY(points.bicepright, points.wristCircumferenceright, Y)
  points.elbowleft = points.elbowright.flipX()
  points.capright1 = points.bicepright.shiftFractionTowards(points.cap, 0.25)
  points.capright2 = points.bicepright.shiftFractionTowards(points.cap, 0.5)
  points.capright3 = points.bicepright.shiftFractionTowards(points.cap, 0.75)
  points.capleft1 = points.capright1.flipX()
  points.capleft2 = points.capright2.flipX()
  points.capleft3 = points.capright3.flipX()
  let angleleft = points.capleft1.angle(points.cap)
  let angleright = points.capright1.angle(points.cap)
  points.rightnotch1 = points.capright1.shift(angleright + 90, 12.7)
  points.rightnotch2 = points.capright3.shift(angleright - 90, 12.7)
  points.leftnotch1 = points.capleft1.shift(angleleft - 90, 6.35)
  points.leftnotch2 = points.capleft3.shift(angleleft + 90, 6.35)
  points.capright = points.cap.shift(0, 19.05) //was 12.7
  points.capleft = points.cap.shift(180, 12.7)

  //control points
  points.rightcp1 = points.rightnotch1.shift(
    points.capright2.angle(points.bicepright) - options.anglebottomfront,
    measurements.bicepsCircumference * options.sleevecapQ1Spread1
  )
  points.rightcp2 = points.rightnotch1.shift(
    points.capright2.angle(points.bicepright) - options.anglebottomfront,
    measurements.bicepsCircumference * options.sleevecapQ1Spread2 * -1
  )
  points.rightcp3 = points.rightnotch2.shift(
    points.cap.angle(points.capright2) - options.angletopfront,
    measurements.bicepsCircumference * options.sleevecapQ2Spread1
  )
  points.rightcp4 = points.rightnotch2.shift(
    points.cap.angle(points.capright2) - options.angletopfront,
    measurements.bicepsCircumference * options.sleevecapQ2Spread2 * -1
  )
  points.leftcp4 = points.leftnotch2.shift(
    points.capleft2.angle(points.cap) + options.angletopback,
    measurements.bicepsCircumference * options.sleevecapQ3Spread1
  )
  points.leftcp3 = points.leftnotch2.shift(
    points.capleft2.angle(points.cap) + options.angletopback,
    measurements.bicepsCircumference * options.sleevecapQ3Spread2 * -1
  )
  points.leftcp2 = points.leftnotch1.shift(
    points.bicepleft.angle(points.capleft2) + options.anglebottomback,
    measurements.bicepsCircumference * options.sleevecapQ4Spread1
  )
  points.leftcp1 = points.leftnotch1.shift(
    points.bicepleft.angle(points.capleft2) + options.anglebottomback,
    measurements.bicepsCircumference * options.sleevecapQ4Spread2 * -1
  )

  //paths
  paths.sleevebottom = new Path()
    .move(points.bicepleft)
    .line(points.bicepright)
    .line(points.wristCircumferenceright)
    .line(points.wristCircumferenceleft)
    .line(points.bicepleft)
    .close()
  paths.elbow = new Path().move(points.elbowleft).line(points.elbowright).close()
  paths.sleeve = new Path()
    .move(points.bicepright)
    .curve(points.bicepright, points.rightcp1, points.rightnotch1)
    .curve(points.rightcp2, points.rightcp3, points.rightnotch2)
    .curve(points.rightcp4, points.capright, points.cap)
    .curve(points.capleft, points.leftcp4, points.leftnotch2)
    .curve(points.leftcp3, points.leftcp2, points.leftnotch1)
    .curve(points.leftcp1, points.bicepleft, points.bicepleft)

  //macros
  macro('hd', {
    from: points.elbowleft,
    to: points.elbowright,
    y: points.origin.dy(points.elbowleft) - 5,
    text: 'Elbow Line'
  })
  macro('hd', {
    from: points.bicepleft,
    to: points.bicepright,
    y: points.origin.dy(points.bicepleft) - 5,
    text: 'Bicep Line'
  })
  macro('hd', {
    from: points.wristCircumferenceleft,
    to: points.wristCircumferenceright,
    y: points.origin.dy(points.wristCircumferenceleft) - 5,
    text: 'Wrist Line'
  })
  macro('grainline', {
    from: points.graintop,
    to: points.grainbottom
  })

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part
}
