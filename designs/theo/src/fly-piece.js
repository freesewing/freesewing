export default function (part) {
  let { snippets, Point, macro, points, Path, paths, complete, sa, paperless } = part.shorthand()
  // Clean up paths from paperless dimensions
  for (let id in paths) delete paths[id]
  for (let id in snippets) delete snippets[id]

  // We need to split the crotch curve at the bottom of the fly
  paths.fly = new Path()
    .move(points[-501])
    .curve(points[-502], points['-6cp'], points[-6])
    .split(points[43])
    .pop()
  paths.fly.render = false

  // We need to split the waist curve at the edge of the fly
  let waist = new Path().move(points[-100101]).curve_(points[-1002], points[-1102])
  points.splitWaist = waist.shiftAlong(points[-100101].dist(points[-40]))
  paths.waist = waist.split(points.splitWaist).shift()
  paths.waist.render = false

  paths.seam = paths.waist
    .clone()
    .line(points[41])
    .curve(points[45], points[44], points[43])
    .join(paths.fly)
    .line(points[-100101])
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    if (sa) paths.sa = paths.seam.offset(sa * -1).attr('class', 'fabric sa')
    points.title = points[9019].clone()
    macro('title', {
      at: points.title,
      title: 'flyPiece',
      nr: 6,
      scale: 0.7,
    })
    points.grainlineTop = points[-100101].shiftFractionTowards(points.splitWaist, 0.3)
    points.grainlineBottom = new Point(points.grainlineTop.x, points[41].y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    delete paths.pocket
    delete paths.lining
    delete snippets.logo
    macro('scalebox', false)
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points[-100101],
      to: points.splitWaist,
      y: points.splitWaist.y - sa - 15,
    })
    macro('hd', {
      from: points.flyPretipX,
      to: points.splitWaist,
      y: points.splitWaist.y - sa - 30,
    })
    macro('vd', {
      from: points.flyPretipX,
      to: points.splitWaist,
      x: points.splitWaist.x + sa + 15,
    })
  }

  return part
}
