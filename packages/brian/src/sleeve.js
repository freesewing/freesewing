export default (part) => {
  let {
    store,
    sa,
    measurements,
    options,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
  } = part.shorthand()

  // Wrist
  let top = paths.sleevecap.bbox().topLeft.y
  points.centerWrist = new Point(
    0,
    top + measurements.shoulderToWrist * (1 + options.sleeveLengthBonus)
  )
  points.wristRight = points.centerWrist.shift(0, (measurements.wrist * (1 + options.cuffEase)) / 2)
  points.wristLeft = points.wristRight.rotate(180, points.centerWrist)
  points.sleeveTip = paths.sleevecap.shiftFractionAlong(0.5)

  // Paths
  paths.sleevecap.render = false
  paths.seam = new Path()
    .move(points.bicepsLeft)
    .move(points.wristLeft)
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .close()
    .attr('class', 'fabric')

  // Anchor point for sampling
  points.gridAnchor = new Point(0, 0)

  // Complete pattern?
  if (complete) {
    points.logo = points.centerBiceps.shiftFractionTowards(points.centerWrist, 0.3)
    snippets.logo = new Snippet('logo', points.logo)
    macro('title', { at: points.centerBiceps, nr: 3, title: 'sleeve' })
    macro('grainline', { from: points.centerWrist, to: points.centerBiceps })
    points.scaleboxAnchor = points.scalebox = points.centerBiceps.shiftFractionTowards(
      points.centerWrist,
      0.5
    )
    macro('scalebox', { at: points.scalebox })

    points.frontNotch = paths.sleevecap.shiftAlong(store.get('frontArmholeToArmholePitch'))
    points.backNotch = paths.sleevecap.reverse().shiftAlong(store.get('backArmholeToArmholePitch'))
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    snippets.backNotch = new Snippet('bnotch', points.backNotch)
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.wristLeft,
      to: points.bicepsLeft,
      x: points.bicepsLeft.x - sa - 15,
    })
    macro('vd', {
      from: points.wristLeft,
      to: points.sleeveTip,
      x: points.bicepsLeft.x - sa - 30,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - sa - 30,
    })
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + sa + 30,
    })
    macro('pd', {
      path: paths.sleevecap.reverse(),
      d: -1 * sa - 15,
    })
  }
  return part
}
