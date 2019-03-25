export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.bottomRight = new Point(
    store.get("chestPocketWidth") * 2,
    store.get("chestPocketHeight")
  );
  points.bottomLeft = new Point(
    points.topLeft.x,
    points.bottomRight.y
  );
  points.topRight = new Point(
    points.bottomRight.x,
    points.topLeft.y
  );
  points.topMid = new Point(
    store.get("chestPocketWidth"),
    points.topRight.y
  );
  points.bottomMid = new Point(
    points.topMid.x,
    points.bottomRight.y
  );

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "fabric");

  paths.fold = new Path()
    .move(points.topMid)
    .line(points.bottomMid)
    .attr("class", "dashed");

  return part;
}
