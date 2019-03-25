export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.bottomRight = new Point(
    store.get("innerPocketWidth"),
    store.get("innerPocketWidth") * options.innerPocketDepth / 2
  );
  points.bottomLeft = new Point(
    points.topLeft.x,
    points.bottomRight.y
  );
  points.topRight = new Point(
    points.bottomRight.x,
    points.topLeft.y
  );
  points.startLeft = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.33);
  points.endLeft = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.66);
  points.startRight = points.topRight.shiftFractionTowards(points.bottomRight, 0.33);
  points.endRight = points.topRight.shiftFractionTowards(points.bottomRight, 0.66);

  paths.seam = new Path()
    .move(points.startRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.startLeft)
    .move(points.endLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.endRight)
    .attr("class", "lining");

  paths.hint = new Path()
    .move(points.startLeft)
    .line(points.endLeft)
    .move(points.endRight)
    .line(points.startRight)
    .attr("class", "lining dashed");

  return part;
}
