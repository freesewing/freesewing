const draftCutonfold = (part) => {
  const { points, Point, paths, Path, options, macro } = part.shorthand()

  if (['cutonfold', 'all'].indexOf(options.plugin) !== -1) {
    points.a = new Point(0, 0)
    points.b = new Point(200, 0)
    macro('cutonfold', {
      from: points.a,
      to: points.b,
      margin: options.cutonfoldMargin,
      offset: options.cutonfoldOffset,
      grainline: options.cutonfoldGrainline,
    })

    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -30)).line(new Point(210, 10)).attr('class', 'hidden')
  }

  return part
}

export default draftCutonfold
