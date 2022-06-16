const draftRound = (part) => {
  const { Point, points, Path, paths, macro, options } = part.shorthand()

  if (['round', 'all'].indexOf(options.plugin) !== -1) {
    points.topLeft = new Point(0, 0)
    points.bottomLeft = new Point(0, 30)
    points.topRight = new Point(100, 0)
    points.bottomRight = new Point(100, 30)

    paths.demo = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .close()
      .attr('class', 'note dashed')

    const opts = {
      radius: options.roundRadius,
      render: options.roundRender,
    }

    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      prefix: 'bl',
      ...opts,
    })
    macro('round', {
      from: points.bottomRight,
      to: points.topLeft,
      via: points.topRight,
      prefix: 'tr',
      ...opts,
    })
  }

  return part
}

export default draftRound
