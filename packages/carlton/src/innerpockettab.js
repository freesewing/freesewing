export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(
    store.get("innerPocketWidth") * 1.2,
    0
  );
  points.bottom = new Point(
    store.get("innerPocketWidth") * 0.6,
    store.get("innerPocketWidth") * 0.6,
  );
  points.top = new Point(
    store.get("innerPocketWidth") * 0.6,
    0
  );

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottom)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "lining");

  paths.hint = new Path()
    .move(points.top)
    .line(points.bottom)
    .attr("class", "lining dashed");

  return part;
}
