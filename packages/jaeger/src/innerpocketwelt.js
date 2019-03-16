export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  let width = store.get("innerPocketWidth");
  let height = store.get("innerPocketWeltHeight");

  points.topLeft = new Point(0, 0);
  points.topRight = new Point(width, 0);
  points.foldLeft = new Point(0, height);
  points.foldRight = new Point(width, height);
  points.bottomLeft = new Point(0, height*2);
  points.bottomRight = new Point(width, height*2);

  // Paths
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr("class", "fabric");

  paths.fold = new Path()
    .move(points.foldLeft)
    .line(points.foldRight)
    .attr("class", "stroke-sm dashed");

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5);
    // Title
    macro("title", {
      at: points.title,
      nr: 13,
      title: "innerPocketWelt"
    });

    if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
  }

  return part;
}
