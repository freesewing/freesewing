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

  // Round the pocket
  if (options.frontPocketRadius > 0) {
    macro("round", {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: width * options.frontPocketRadius,
      prefix: "left"
    });
    macro("round", {
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: width * options.frontPocketRadius,
      prefix: "right"
    });
  }

  // Paths
  if (options.frontPocketRadius > 0) {
    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.leftStart)
      .curve(points.leftCp1, points.leftCp2, points.leftEnd)
      .line(points.rightStart)
      .curve(points.rightCp1, points.rightCp2, points.rightEnd)
      .line(points.edgeRight)
      .line(points.edgeLeft)
      .close()
      .attr("class", "fabric");
  } else {
    paths.seam = new Path()
      .move(points.edgeLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.edgeRight)
      .line(points.edgeLeft)
      .close()
      .attr("class", "fabric");
  }
  paths.fold = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .attr("class", "fabric dashed");

  if (complete) {
    // Title
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5);
    macro("title", {
      at: points.title,
      nr: 9,
      title: "pocket"
    });

    // Instructions
    paths.fold
      .attr("data-text", "foldAlongThisLine")
      .attr("data-text-class", "center");

    // Grainline
    macro("grainline", {
      from: points.bottomLeft.shift(0 ,10),
      to: points.edgeLeft.shift(0 ,10)
    });

    if (sa) paths.sa = paths.seam.offset(sa).attr("class", "fabric sa");
  }

  return part;
}
