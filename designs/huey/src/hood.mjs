export default function (part) {
  let {
    store,
    macro,
    Point,
    Path,
    points,
    paths,
    complete,
    paperless,
    snippets,
    Snippet,
    sa,
    options,
    measurements,
  } = part.shorthand()

  let base = store.get('frontNeckSeamLength') + store.get('backNeckSeamLength')
  points.cfBottom = new Point(0, 0)
  points.cbBottom = points.cfBottom.shift(0, base).rotate(options.hoodAngle, points.cfBottom)
  points.cfHeightLeft = points.cfBottom.shift(90, measurements.head * options.hoodHeight)
  points.cfHeightRight = points.cfHeightLeft.shift(0, base)
  points.cfTop = points.cfBottom
    .shift(90, measurements.head * options.hoodClosure)
    .rotate(options.hoodAngle, points.cfBottom)
  points.frontTop = points.cfHeightLeft.shift(0, measurements.head * options.hoodCutback)
  points.frontTopCp2 = new Point(points.frontTop.x, points.cfTop.y)
  points.backPitch = new Point(
    points.cbBottom.x + measurements.head * options.hoodDepth,
    points.cfHeightRight.y * 0.6
  )
  points.backPitchCp1 = points.backPitch.shift(-90, measurements.head * 0.1)
  points.backPitchCp2 = points.backPitchCp1.flipY(points.backPitch)

  // Paths
  paths.seam = new Path()
    .move(points.cfBottom)
    .line(points.cbBottom)
    ._curve(points.backPitchCp1, points.backPitch)
    .curve(points.backPitchCp2, points.cfHeightRight, points.frontTop)
    .curve_(points.frontTopCp2, points.cfTop)
    .line(points.cfBottom)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    points.logo = points.frontTop.shiftFractionTowards(points.cbBottom, 0.7)
    points.title = points.frontTop.shiftFractionTowards(points.cbBottom, 0.3)
    snippets.logo = new Snippet('logo', points.logo)
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'hood',
    })
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.cfBottom,
      to: points.cbBottom,
      y: points.cfBottom.y + sa + 15,
    })
    macro('hd', {
      from: points.cbBottom,
      to: points.backPitch,
      y: points.cfBottom.y + sa + 15,
    })
    macro('hd', {
      from: points.cfTop,
      to: points.backPitch,
      y: points.cfBottom.y + sa + 30,
    })
    macro('hd', {
      from: points.frontTop,
      to: points.backPitch,
      y: points.frontTop.y - sa - 15,
    })
    macro('ld', {
      from: points.cfBottom,
      to: points.cfTop,
      d: -15,
    })
    macro('ld', {
      from: points.cfBottom,
      to: points.cbBottom,
      d: 15,
    })
    macro('vd', {
      from: points.cfTop,
      to: points.frontTop,
      x: points.cfBottom.x - sa - 15,
    })
    macro('vd', {
      from: points.cfBottom,
      to: points.frontTop,
      x: points.cfBottom.x - sa - 30,
    })
  }

  return part
}
