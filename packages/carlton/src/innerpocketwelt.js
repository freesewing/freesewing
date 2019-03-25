export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.bottomRight = new Point(
    store.get("innerPocketWidth") * 1.4,
    store.get("innerPocketWeltHeight") * 6
  );
  points.bottomLeft = new Point(
    points.topLeft.x,
    points.bottomRight.y
  );
  points.topRight = new Point(
    points.bottomRight.x,
    points.topLeft.y
  );
  points.leftMid = new Point(0, points.bottomRight.y / 2);
  points.rightMid = new Point(points.bottomRight.x, points.bottomRight.y / 2);
  points.realTopLeft = new Point(
    store.get("innerPocketWidth") * 0.2,
    store.get("innerPocketWeltHeight") * 2
  );
  points.realTopRight = new Point(
    store.get("innerPocketWidth") * 1.2,
    points.realTopLeft.y
  );
  points.realBottomLeft = new Point(
    points.realTopLeft.x,
    store.get("innerPocketWeltHeight") * 4
  );
  points.realBottomRight = new Point(
    points.realTopRight.x,
    points.realBottomLeft.y
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
    .move(points.leftMid)
    .line(points.rightMid)
    .attr("class", "dashed");

  paths.welt = new Path()
    .move(points.realTopLeft)
    .line(points.realBottomLeft)
    .line(points.realBottomRight)
    .line(points.realTopRight)
    .line(points.realTopLeft)
    .close()
    .attr("class", "lashed");

  return part;
}
