const bartackOptions = (options) => ({
  angle: options.bartackAngle,
  length: options.bartackLength,
  density: options.bartackDensity,
  width: options.bartackWidth,
  start: options.bartackStart,
  end: options.bartackEnd,
})

const draftBartack = (part) => {
  const { points, Point, paths, Path, macro, options } = part.shorthand()

  if (['bartack', 'all'].indexOf(options.plugin) !== -1) {
    points.bartack = new Point(0, 0)
    macro('bartack', {
      anchor: points.bartack,
      prefix: 'a',
      ...bartackOptions(options),
    })

    points.a = new Point(20, 0)
    points.b = new Point(25, 10)
    points.c = new Point(35, 10)
    points.d = new Point(40, 0)

    paths.a = new Path()
      .move(points.a)
      .curve(points.b, points.c, points.d)
      .attr('class', 'lining dashed')

    macro('bartackAlong', {
      path: paths.a,
      prefix: 'b',
      ...bartackOptions(options),
    })

    points.e = new Point(50, 0)
    points.f = new Point(55, 10)
    points.g = new Point(65, 10)
    points.h = new Point(70, 0)

    paths.e = new Path()
      .move(points.e)
      .curve(points.f, points.g, points.h)
      .attr('class', 'lining dashed')

    macro('bartackFractionAlong', {
      prefix: 'c',
      path: paths.e,
      ...bartackOptions(options),
    })
  }

  return part
}

export default draftBartack
