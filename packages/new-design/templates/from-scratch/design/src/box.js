export default (part) => {
  const {
    Point, points,
    Path, paths,
    Snippet, snippets,
    complete,
    options,
    sa,
    paperless,
    macro
  } = part.shorthand()

  // Add points to make a box
  const w = 500 * options.size
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, w / 2)
  points.bottomRight = new Point(w, w / 2)

  // Create a path for the box outline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    // Add a logo
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    // Add some text
    points.text = points.logo
      .shift(-90, w / 8)
      .attr('data-text', 'FreeSewing')
      .attr('data-text-class', 'center')

    if (sa) {
      // Add seam allowance
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Add dimensions for paperless mode
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
