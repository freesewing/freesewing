export default (part) => {
  // Shorthand
  let { points, Point, paths, Path, complete, paperless, macro, snippets } = part.shorthand()

  // Clean up
  for (let id in paths) delete paths[id]
  delete snippets.logo

  const weltHeight = points.bottomRight.x / 5
  points.bottomLeft = points.curveStartLeft.shift(-90, points.rightNotch.x / 1.75)
  points.bottomRight = points.bottomLeft.flipX()
  points.midLeft = points.bottomLeft.shift(90, weltHeight)
  points.midRight = points.bottomRight.shift(90, weltHeight)
  points.topLeft = points.bottomLeft.shift(90, weltHeight * 2)
  points.topRight = points.bottomRight.shift(90, weltHeight * 2)
  points.leftNotch = new Point(points.leftNotch.x, points.midRight.y)
  points.rightNotch = points.leftNotch.flipX()

  // Anchor for sampling/grid
  points.anchor = points.topLeft.shiftFractionTowards(points.topRight, 0.5)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    paths.fold = new Path().move(points.midLeft).line(points.midRight).attr('class', 'help')
    points.titleAnchor = points.rightNotch.shiftFractionTowards(points.leftNotch, 0.5)
    macro('title', {
      at: points.titleAnchor,
      nr: 4,
      title: 'backPocketWelt',
      scale: 0.5,
    })
    points.grainlineTop = points.topLeft.shiftFractionTowards(points.topRight, 0.15)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + 15,
      })
    }
  }

  return part
}
