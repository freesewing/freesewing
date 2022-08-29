export default function (part) {
  let {
    Point,
    points,
    Path,
    paths,
    absoluteOptions,
    complete,
    paperless,
    measurements,
    macro,
    snippets,
    Snippet,
  } = part.shorthand()

  points[0] = new Point(0, 0)
  points[2] = new Point(absoluteOptions.waistbandWidth, measurements.hips / 2 + 40)
  points[1] = new Point(points[2].x, points[0].y)
  points[3] = new Point(points[0].x, points[2].y)

  paths.seam = new Path()
    .move(points[0])
    .line(points[1])
    .line(points[2])
    .line(points[3])
    .line(points[0])
    .close()
    .attr('class', 'interfacing')

  // Complete pattern?
  if (complete) {
    points.title = points[0].shiftFractionTowards(points[2], 0.5)
    macro('title', {
      at: points.title,
      title: 'waistbandInterfacingRight',
      nr: '3b',
      scale: 0.5,
      rotation: -90,
    })
    points.logo = new Point(points[2].x / 2, 45)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.7)
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points[3],
      to: points[2],
      y: points[2].y + 15,
    })
    macro('vd', {
      from: points[2],
      to: points[1],
      x: points[2].x + 15,
    })
  }

  return part
}
