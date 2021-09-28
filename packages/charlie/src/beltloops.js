export default (part) => {
  // Shorthand
  let { store, points, Point, paths, Path, options, complete, paperless, macro, sa } =
    part.shorthand()

  let count = options.beltLoops
  let length = store.get('waistbandWidth') * 2.5 * count
  let width = store.get('waistbandWidth') / 4

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width * 2.8, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(width * 2.8, length)
  points.topFold1 = new Point(width * 0.8, 0)
  points.topFold2 = new Point(width * 1.8, 0)
  points.bottomFold1 = new Point(width * 0.8, length)
  points.bottomFold2 = new Point(width * 1.8, length)
  for (let i = 1; i < count; i++) {
    points[`cut${i}a`] = points.topLeft.shiftFractionTowards(points.bottomLeft, i / count)
    points[`cut${i}b`] = points.topRight.shiftFractionTowards(points.bottomRight, i / count)
  }

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    paths.fold = new Path()
      .move(points.topFold1)
      .line(points.bottomFold1)
      .move(points.bottomFold2)
      .line(points.topFold2)
      .attr('class', 'fabric help')
    macro('title', {
      at: new Point(width / 2, length / 2),
      nr: 12,
      title: 'beltLoops',
      rotation: 90,
      scale: 0.7,
    })
    points.grainlineTop = new Point(points.topRight.x / 2, 0)
    points.grainlineBottom = new Point(points.topRight.x / 2, length)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })
    for (let i = 1; i < count; i++) {
      paths[`cut${i}`] = new Path()
        .move(points[`cut${i}a`])
        .line(points[`cut${i}b`])
        .attr('class', 'fabric dashed')
    }

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.bottomRight.x + sa + 15,
      })
    }
  }

  return part
}
