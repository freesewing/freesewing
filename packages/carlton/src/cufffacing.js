export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.bottomRight = new Point(
    store.get("topCuffWidth") + store.get("underCuffWidth"),
    store.get("cuffLength") * 1.5
  );
  points.bottomLeft = new Point(
    points.topLeft.x,
    points.bottomRight.y
  );
  points.topRight = new Point(
    points.bottomRight.x,
    points.topLeft.y
  );
  macro("round", {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: store.get("cuffRadius"),
    prefix: "roundLeft"
  });
  macro("round", {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: store.get("cuffRadius"),
    prefix: "roundRight"
  });

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.roundLeftStart)
    .curve(points.roundLeftCp1, points.roundLeftCp2, points.roundLeftEnd)
    .line(points.roundRightStart)
    .curve(points.roundRightCp1, points.roundRightCp2, points.roundRightEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "fabric");

  return part;
}
