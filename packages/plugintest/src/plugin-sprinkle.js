const draftScalebox = (part) => {
  const { Point, points, Path, paths, options, macro } = part.shorthand()

  if (['sprinkle', 'all'].indexOf(options.plugin) !== -1) {
    points.center = new Point(0, 0)
    points.top = new Point(0, 40)
    const on = []
    for (let i = 0; i < 360; i += 45) {
      points[`s${i}`] = points.top.rotate(i, points.center)
      on.push(`s${i}`)
    }

    macro('sprinkle', {
      on,
      snippet: options.sprinkleSnippet,
      scale: options.sprinkleScale,
      rotate: options.sprinkleRotate,
    })

    paths.box = new Path().move(new Point(-50, -50)).line(new Point(50, 50))
  }

  return part
}

export default draftScalebox
