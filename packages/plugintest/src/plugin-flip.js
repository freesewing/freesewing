const draftDimension = (part) => {
  const { points, Point, paths, Path, snippets, Snippet, options, macro } = part.shorthand()

  if (['flip', 'all'].indexOf(options.plugin) !== -1) {
    points.mirrorA = new Point(50, 0)
    points.mirrorB = new Point(0, 0)
    points.mirrorC = new Point(0, 50)
    paths.mirror = new Path()
      .move(points.mirrorA)
      .line(points.mirrorB)
      .line(points.mirrorC)
      .attr('class', 'dashed note')

    points.b1 = new Point(10, 10).attr('data-text', 1)
    points.h2 = new Point(20, 10).attr('data-text', 2)
    points.h3 = new Point(30, 10).attr('data-text', 3)
    points.v2 = new Point(10, 20).attr('data-text', 2)
    points.v3 = new Point(10, 30).attr('data-text', 3)
    points.a = new Point(10, 0)
    points.b = new Point(30, 30)
    points.c = new Point(50, 50)
    points.d = new Point(12, 34)
    points.e = new Point(54, 34)

    snippets.a = new Snippet('button', points.b)

    paths.a = new Path().move(points.a).line(points.b)
    paths.b = new Path().move(points.e).curve(points.a, points.d, points.c)

    macro('flip', { axis: options.flipAxis })
  }

  return part
}

export default draftDimension
