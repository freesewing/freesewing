export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  let width = store.get("pocketWidth");
  let depth = store.get("pocketDepth");

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(width, 0);
  points.bottomLeft = new Point(0, depth);
  points.bottomRight = new Point(width, depth);
  // Add foldover points
  points.edgeLeft = points.bottomLeft.shiftFractionTowards(
    points.topLeft,
    1 + options.pocketFoldover
  );
  points.edgeRight = new Point(
    points.topRight.x,
    points.edgeLeft.y
  );

  // Paths
  paths.seam = new Path()
    .move(points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .line(points.edgeLeft)
    .close()
    .attr("class", "fabric");

  paths.fold = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .attr("class", "fabric dashed");

  return part;
}
