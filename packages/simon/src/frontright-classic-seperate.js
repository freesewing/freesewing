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
    points.placketBottomIn = points.cfHem.shift(180, width / 2);
    paths.seam = paths.seam.split(points.placketTopIn)[0];
    paths.seam.ops[0].to = points.placketBottomIn;
    paths.seam.close().attr("class", "fabric");
  }

  // Complete pattern?
  if (complete) {
    // Title
    macro("title", { at: points.title, nr: 1, title: "rightFront" });

    if (sa) paths.saFromArmhole.line(paths.hemSa.start());
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
