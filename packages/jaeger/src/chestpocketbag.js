export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  let width = store.get("chestPocketWidth");
  let welt = store.get("chestPocketWeltHeight");
  let height = width * options.chestPocketDepth;
  let angle = options.chestPocketAngle;

  points.topLeft = new Point(0, 0);
  points.topRight = points.topLeft.shift(angle, width);
  points.foldLeft = points.topLeft.shift(-90, height);
  points.foldRight = new Point(points.topRight.x, points.foldLeft.y);
  points.bottomLeft = points.topLeft.shift(-90, height*2 + welt);
  points.bottomRight = points.bottomLeft.shift(-1 * angle, width);

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "lining");

  paths.fold = new Path()
    .move(points.foldLeft)
    .line(points.foldRight)
    .attr("class", "stroke-sm dashed lining");

  return part;
}
