export default function (part) {
  let { Point, Path, points, paths, complete, sa, paperless, macro } = part.shorthand()

  // Clear paths from Brian, but keep sleevecap
  for (let p of Object.keys(paths)) {
    if (p !== 'sleevecap') delete paths[p]
  }

  // Paths
  paths.saBase = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .line(points.wristLeft)
    .attr('class', 'various stroke-xxl')
  paths.hemBase = new Path()
    .move(points.wristLeft)
    .line(points.wristRight)
    .attr('class', 'various stroke-xxl')
  paths.saBase.render = false
  paths.hemBase.render = false

  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('grainline', {
      from: new Point(0, points.wristLeft.y),
      to: new Point(0, points.backPitch.y),
    })
    if (sa) {
      paths.sa = paths.saBase
        .clone()
        .offset(sa)
        .join(paths.hemBase.offset(3 * sa))
        .close()
      paths.sa.attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    const hemSa = 3 * sa
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + hemSa + 15,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - sa - 15,
    })
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
  }

  return part
}
