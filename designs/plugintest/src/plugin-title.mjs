const draftTitle = (part) => {
  const { points, Point, paths, Path, macro, options } = part.shorthand()

  if (['title', 'all'].indexOf(options.plugin) !== -1) {
    if (options.titleMeta) part.context.settings.metadata = { for: 'Some user' }
    points.a = new Point(20, 0)
    macro('title', {
      at: points.a,
      nr: options.titleNr,
      title: options.titleTitle ? 'Title here' : false,
      prefix: 'prefix',
      rotation: options.titleRotate,
      scale: options.titleScale,
    })
    // Prevent clipping of text
    paths.box = new Path().move(new Point(0, -20)).line(new Point(120, 20)).attr('class', 'hidden')
  }

  return part
}

export default draftTitle
