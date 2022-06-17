const draftDimension = (part) => {
  const { points, Point, paths, Path, snippets, Snippet, options, macro } = part.shorthand()

  if (['mirror', 'all'].indexOf(options.plugin) !== -1) {
    points.mirrorA = new Point(0, 0)
    points.mirrorB = new Point(70, 30)
    points.mirrorC = new Point(0, 50)
    points.mirrorD = new Point(30, -30)
    paths.mirrorA = new Path()
      .move(points.mirrorA)
      .line(points.mirrorB)
      .attr('class', 'dashed note')
      .attr('data-text', 'Mirror A')
      .attr('data-text-class', 'right')
    paths.mirrorB = new Path()
      .move(points.mirrorC)
      .line(points.mirrorD)
      .attr('class', 'dashed note')
      .attr('data-text', 'Mirror B')
      .attr('data-text-class', 'right')

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

    if (options.mirrorLine !== 'none') {
      macro('mirror', {
        mirror:
          options.mirrorLine === 'a'
            ? [points.mirrorA, points.mirrorB]
            : [points.mirrorC, points.mirrorD],
        points: [
          points.b1,
          points.h2,
          points.h3,
          points.v2,
          points.v3,
          points.a,
          points.b,
          points.c,
          points.d,
          points.e,
        ],
        paths: [paths.a, paths.b],
        clone: options.mirrorClone,
      })
    }
  }

  return part
}

export default draftDimension
