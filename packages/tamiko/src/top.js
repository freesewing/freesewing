export default function(part) {
  let {
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand()

  // Width at shoulders
  let shoulders = measurements.shoulderToShoulder

  // Width at chest
  let chest = (measurements.chestCircumference / 2) * (1 + options.chestEase)

  // Length
  let length = (1 + options.lengthBonus) * measurements.hpsToHipsBack

  // Armhole depth
  let arm = shoulders * options.armholeDepthFactor

  // Shoulder seam length
  let shoulderseam = shoulders * options.shoulderseamLength

  // Right shoulder seam
  points.shoulderEdge = new Point(0, 0)
  // Sew 5mm from edge, can't really scale this one with %
  points.armgapTop = new Point(5, 0)
  points.armgapNeck = points.armgapTop.shift(-90, shoulderseam)

  // Armhole
  points.bottomLeft = new Point(0, shoulders)
  points.armholeTop = new Point(shoulders / 4, shoulders)
  points.armholeBottom = points.armholeTop.shift(0, arm)
  points.armholePitch = points.armholeTop.shift(0, arm / 2).shift(90, arm / 5)
  points.armholePitchCp1 = points.armholePitch.shift(180, arm / 2.5)
  points.armholePitchCp2 = points.armholePitchCp1.flipX(points.armholePitch)

  // Left shoulder seam
  points.armholeNeck = points.armholeTop
    .shiftTowards(points.armgapNeck, shoulders * options.shoulderseamLength)
    .rotate(options.shoulderSlope, points.armholeTop)

  // Side seam
  points.armgapBottom = points.armgapTop.shift(0, arm)
  points.armgapBottom = points.armholeBottom.shiftTowards(points.armgapBottom, chest)
  points.sideBottom = points.armgapTop.shiftTowards(points.armgapBottom, length)
  points.sideEdge = points.armgapTop.shiftTowards(points.armgapBottom, length)

  // Rotate to reduce flare and balance garment
  let angle = points.armgapTop.angle(points.armgapBottom) / -2
  points.sideBottom = points.sideBottom.rotate(angle + options.flare, points.armgapBottom)

  // Top edge of garment
  points.sideEdge = points.armgapBottom.shiftFractionTowards(points.sideBottom, 1.1)

  // Finish rectangle
  points.bottomRight = points.armholeTop.shift(0, length)
  points.topRight = new Point(points.bottomRight.x, points.sideEdge.y)
  points.topLeft = new Point(0, points.topRight.y)
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.armholeTop)
    ._curve(points.armholePitchCp1, points.armholePitch)
    .curve_(points.armholePitchCp2, points.armholeBottom)
    .line(points.bottomRight)
    .line(points.bottomRight)
    .line(points.topRight)
    .close()
    .move(points.armgapTop)
    .line(points.armgapNeck)
    .move(points.armholeTop)
    .line(points.armholeNeck)
    .move(points.armgapBottom)
    .line(points.sideBottom)
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.bottomRight,
      to: points.bottomLeft,
      grainline: true,
      offset: points.armholeTop.dy(points.armholePitch) * 1.1,
      margin: 3
    })
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    macro('title', { at: points.title, nr: 1, title: 'top' })
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.15)
    snippets.logo = new Snippet('logo', points.logo)
    points.scalebox = points.topLeft.shiftFractionTowards(points.bottomRight, 0.65)
    macro('scalebox', { at: points.scalebox })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['armgapTop', 'armgapNeck', 'armgapBottom', 'armholeNeck', 'sideBottom']
    })

    if (sa) {
      paths.sa = new Path()
        .move(points.armholeTop)
        ._curve(points.armholePitchCp1, points.armholePitch)
        .curve_(points.armholePitchCp2, points.armholeBottom)
        .offset(sa)
        .attr('class', 'sa fabric')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.armgapBottom,
      y: points.topLeft.y - 15
    })
    macro('hd', {
      from: points.topLeft,
      to: points.sideBottom,
      y: points.topLeft.y - 30
    })
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - 45
    })
    macro('vd', {
      from: points.sideBottom,
      to: points.topLeft,
      x: points.sideBottom.x + 15
    })
    macro('vd', {
      from: points.armgapBottom,
      to: points.topLeft,
      x: points.topLeft.x - 15
    })
    macro('vd', {
      from: points.armgapTop,
      to: points.topLeft,
      x: points.topLeft.x - 30
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - 45
    })
    macro('vd', {
      from: points.armgapNeck,
      to: points.armgapTop,
      x: points.armgapTop.x + 15
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.armholeNeck,
      y: points.bottomLeft.y + 15
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.armholeTop,
      y: points.bottomLeft.y + 30
    })
    macro('hd', {
      from: points.armholeTop,
      to: points.armholeBottom,
      y: points.bottomLeft.y + 30
    })
    macro('vd', {
      from: points.armholeTop,
      to: points.armholePitch,
      x: points.armholePitch.x
    })
  }

  return part
}
