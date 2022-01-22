const draftPluginBanner = (part) => {
  const { points, Point, paths, Path, macro } = part.shorthand()

  points.from = new Point(0, 0)
  points.to = new Point(320, 0)

  paths.banner = new Path().move(points.from).line(points.to)

  macro('banner', {
    path: 'banner',
    text: 'banner plugin',
  })

  // Prevent clipping of text
  paths.box = new Path().move(new Point(0, -20)).line(new Point(0, 20)).attr('class', 'hidden')

  return part
}

export default draftPluginBanner
