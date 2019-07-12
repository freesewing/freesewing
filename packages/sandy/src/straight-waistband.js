export default function(part) {
  /**
   * The straight waistband is just a rectangle with the width
   * of double the waistband width, since it will be folded
   */
  let {
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand();

  // Calculate the corners of the rectangle and other auxiliar points
  points.center = new Point(0, 0);
  points.centerLeft = new Point(store.get("topCircumference") / -2, 0);
  points.centerRight = new Point(
    store.get("topCircumference") / 2 + store.get("waistbandOverlap"),
    0
  );
  points.topRight = points.centerRight.shift(90, options.waistbandWidth);
  points.topLeft = points.centerLeft.shift(90, options.waistbandWidth);
  points.bottomRight = points.topRight.flipY();
  points.bottomLeft = points.topLeft.flipY();

  // Draft the rectangle
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "fabric");

  // Draft the foldline
  paths.fold = new Path()
    .move(points.centerRight)
    .line(points.centerLeft)
    .attr("class", "fabric dashed");

  // Complete pattern?
  if (complete) {
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
}
