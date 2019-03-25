export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  let length = 1.6 * (store.get("cbToDart") + store.get("dartToSide"));
  let width = measurements.centerBackNeckToWaist * options.beltWidth;

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(length, 0);
  points.bottomLeft = new Point(0, width);
  points.bottomRight = new Point(length, width);
  points.button = new Point(width/2, width/2);
  macro("round", {
    from: points.topRight,
    to: points.bottomLeft,
    via: points.topLeft,
    prefix: "roundTop",
    radius: width/4,
    render: true
  });
  macro("round", {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    prefix: "roundBottom",
    radius: width/4,
    render: true
  });

  // Paths
  paths.seam = new Path()
    .move(points.roundTopStart)
    .curve(points.roundTopCp1, points.roundTopCp2, points.roundTopEnd)
    .line(points.roundBottomStart)
    .curve(points.roundBottomCp1, points.roundBottomCp2, points.roundBottomEnd)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.roundTopStart)
    .close()
    .attr("class", "fabric");

  if (complete) {
    snippets.button = new Snippet("button", points.button).attr("data-scale", 2);
  }

  return part;
}
