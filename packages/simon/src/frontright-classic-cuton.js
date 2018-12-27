import { addButtons } from "./shared";

export default part => {
  let {
    store,
    measurements,
    utils,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    paperless,
    macro,
    options
  } = part.shorthand();

  let width = options.buttonPlacketWidth;
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

  paths.seam
    .line(points.placketTopEdge)
    .line(points.placketBottomEdge)
    .line(points.cfHem)
    .close();

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.cfNeck)
      .line(points.cfHem)
      .attr("class", "help");
    paths.placketInnerFold = new Path()
      .move(points.placketTopIn)
      .line(points.placketBottomIn)
      .attr("class", "dotted");
    paths.placketOuterFold = new Path()
      .move(points.placketTopOut)
      .line(points.placketBottomOut)
      .attr("class", "dotted");
    macro("sprinkle", {
      snippet: "notch",
      on: [
        "placketTopIn",
        "placketTopOut",
        "cfNeck",
        "placketBottomIn",
        "placketBottomOut",
        "cfHem"
      ]
    });

    // Buttons
    addButtons(part);

    // Title
    macro("title", { at: points.title, nr: 1, title: "frontRight" });

    if (sa) {
      paths.saFromArmhole
        .line(
          new Point(points.placketTopEdge.x + sa, points.placketTopEdge.y - sa)
        )
        .line(
          new Point(
            points.placketBottomEdge.x + sa,
            points.placketBottomEdge.y + sa * 3
          )
        )
        .line(paths.hemSa.start());
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};
