export default (part) => {
  let { store, sa, points, paths, Path, complete, paperless, macro, options } = part.shorthand()

  if (options.ribbing) {
    let ribbingHeight = store.get('ribbingHeight')
    points.wristLeft = points.wristLeft.shift(90, ribbingHeight)
    points.wristRight = points.wristRight.shift(90, ribbingHeight)
    points.centerWrist = points.centerWrist.shift(90, ribbingHeight)
  }

  paths.seam = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .line(points.wristLeft)
    .line(points.wristRight)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('grainline', {
      from: points.centerWrist,
      to: points.grainlineTo,
    })
    if (sa) {
      paths.saBase = new Path()
        .move(points.wristRight)
        .line(points.bicepsRight)
        .join(paths.sleevecap)
        .line(points.wristLeft)
      paths.hemBase = new Path().move(points.wristLeft).line(points.wristRight)
      paths.saBase.render = false
      paths.hemBase.render = false
      paths.sa = paths.saBase.offset(sa).join(paths.hemBase.offset(sa * (options.ribbing ? 1 : 3)))
      paths.sa.line(paths.sa.start()).close().attr('class', 'fabric sa')
    }
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
      y: points.wristLeft.y + sa * (options.ribbing ? 1 : 3) + 15,
    })
    macro('pd', {
      path: paths.sleevecap.reverse(),
      d: -1 * sa - 15,
    })
  }

  return part
}
