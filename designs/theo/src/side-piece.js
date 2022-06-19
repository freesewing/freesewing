export default function (part) {
  let { macro, Point, points, Path, paths, complete, sa, paperless, snippets } = part.shorthand()
  // Clean up paths from paperless dimensions
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // Add points
  points.topLeft = new Path()
    .move(points[-1102])
    ._curve(points[-1002], points[-100101])
    .shiftAlong(100)
  points.bottomLeft = points[61].shift(180, 50)

  // Split waist curve
  paths.waist = new Path()
    .move(points[-1102])
    ._curve(points[-1002], points[-100101])
    .split(points.topLeft)
    .shift()
  paths.waist.render = false

  // Split side curve
  paths.side = new Path().move(points[-8]).curve(points[-802], points[-1401], points[-14])
  let split = paths.side.split(points[61]).shift()
  if (split) paths.side = split.reverse()
  else
    paths.side = new Path()
      .move(points[-8])
      .curve_(points[-801], points[-1102])
      .split(points[61])
      .pop()
  paths.side.render = false

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points[61])
    .join(paths.side)
    .join(paths.waist)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    paths.pocket = new Path()
      .move(points[60])
      .line(points[61])
      .attr('class', 'fabric stroke-sm lashed')
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    macro('scalebox', false)
    delete paths.fly
    delete paths.lining
    points.grainlineTop = points[60].clone()
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    points.title = points[-801].shift(180, 40)
    macro('title', { at: points.title, title: 'sidePiece', nr: 8 })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points[-1102],
      y: points[-1102].y - sa - 15,
    })
    macro('hd', {
      from: points.topLeft,
      to: points[-8],
      y: points[-1102].y - sa - 30,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points[61],
      y: points.bottomLeft.y + sa + 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points[-8],
      y: points.bottomLeft.y + sa + 30,
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.topLeft.x - sa - 15,
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points[-1102],
      x: points.topLeft.x - sa - 30,
    })
  }

  return part
}
