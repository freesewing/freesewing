const draftScalebox = (part) => {
  const { Point, points, macro, options } = part.shorthand()

  if (['scalebox', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)

    macro(options.scaleboxType, {
      at: points.a,
    })
  }

  return part
}

export default draftScalebox
