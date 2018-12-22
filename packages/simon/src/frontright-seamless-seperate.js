export default part => {
  // prettier-ignore
  let {store, measurements, utils, sa, Point, points, Path, paths, Snippet, snippets, complete, paperless, macro, options} = part.shorthand();

  let width = options.buttonPlacketWidth;
  if (options.buttonHoleType === "seperate") {
  } else {
    points.placketTopIn = utils.lineIntersectsCurve(
      new Point(width / -2, points.cfNeck.y + 20),
      new Point(width / -2, points.cfNeck.y - 20),
      points.cfNeck,
      points.cfNeckCp1,
      points.neckCp2Front,
      points.neck
    );
    points.placketTopOut = points.cfNeck.shift(0, width / 2);
    points.placketTopEdge = points.cfNeck.shift(0, width * 1.5);
    points.placketBottomIn = points.cfHem.shift(180, width / 2);
    points.placketBottomOut = points.cfHem.shift(0, width / 2);
    points.placketBottomEdge = points.cfHem.shift(0, width * 1.5);

    paths.placketInnerFold = new Path()
      .move(points.placketTopIn)
      .line(points.placketBottomIn)
      .attr("class", "help");
    paths.placketOuterFold = new Path()
      .move(points.placketTopOut)
      .line(points.placketBottomOut)
      .attr("class", "help");

    paths.tmp = new Path()
      .move(points.placketTopEdge)
      .line(points.placketBottomEdge);
  }

  // Complete pattern?
  if (complete) {
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
