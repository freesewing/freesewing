import { addButtonHoles } from "./shared";

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

  let fold = options.buttonholePlacketFoldWidth;
  let width = options.buttonholePlacketWidth;
  points.placketCfNeck = points.cfNeck.shift(180, fold * 2);
  points.placketTopInnerEdgeFold = points.placketCfNeck.shift(0, width / 2);
  points.placketTopInnerEdgeOver = points.placketCfNeck.shift(
    0,
    width / 2 - fold
  );
  points.placketTopInnerEdgeUnder = points.placketCfNeck.shift(
    0,
    width / 2 + fold
  );
  points.placketTopOuterEdgeFold = points.placketCfNeck.shift(180, width / 2);
  points.placketTopOuterEdgeOver = points.placketCfNeck.shift(
    180,
    width / 2 - fold
  );
  points.placketTopOuterEdgeUnder = points.placketCfNeck.shift(
    180,
    width / 2 + fold
  );
  points.placketCfHem = points.cfHem.shift(180, fold * 2);
  points.placketBottomInnerEdgeFold = points.placketCfHem.shift(0, width / 2);
  points.placketBottomInnerEdgeOver = points.placketCfHem.shift(
    0,
    width / 2 - fold
  );
  points.placketBottomInnerEdgeUnder = points.placketCfHem.shift(
    0,
    width / 2 + fold
  );
  points.placketBottomOuterEdgeFold = points.placketCfHem.shift(180, width / 2);
  points.placketBottomOuterEdgeOver = points.placketCfHem.shift(
    180,
    width / 2 - fold
  );
  points.placketBottomOuterEdgeUnder = points.placketCfHem.shift(
    180,
    width / 2 + fold
  );
  points.placketTopEdge = points.placketTopOuterEdgeFold.shift(180, width);
  points.placketBottomEdge = points.placketBottomOuterEdgeFold.shift(
    180,
    width
  );

  paths.seam
    .line(points.placketTopEdge)
    .line(points.placketBottomEdge)
    .close();

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.placketCfNeck)
      .line(points.placketCfHem)
      .attr("class", "help");
    paths.placketInnerEdgeFold = new Path()
      .move(points.placketTopInnerEdgeFold)
      .line(points.placketBottomInnerEdgeFold)
      .attr("class", "dotted");
    paths.placketInnerEdgeOver = new Path()
      .move(points.placketTopInnerEdgeOver)
      .line(points.placketBottomInnerEdgeOver)
      .attr("class", "dotted");
    paths.placketInnerEdgeUnder = new Path()
      .move(points.placketTopInnerEdgeUnder)
      .line(points.placketBottomInnerEdgeUnder)
      .attr("class", "dotted");
    paths.placketOuterEdgeFold = new Path()
      .move(points.placketTopOuterEdgeFold)
      .line(points.placketBottomOuterEdgeFold)
      .attr("class", "dotted");
    paths.placketOuterEdgeOver = new Path()
      .move(points.placketTopOuterEdgeOver)
      .line(points.placketBottomOuterEdgeOver)
      .attr("class", "dotted");
    paths.placketOuterEdgeUnder = new Path()
      .move(points.placketTopOuterEdgeUnder)
      .line(points.placketBottomOuterEdgeUnder)
      .attr("class", "dotted");
    macro("sprinkle", {
      snippet: "notch",
      on: [
        "placketCfNeck",
        "placketCfHem",
        "placketTopInnerEdgeFold",
        "placketTopInnerEdgeOver",
        "placketTopInnerEdgeUnder",
        "placketTopOuterEdgeFold",
        "placketTopOuterEdgeOver",
        "placketTopOuterEdgeUnder",
        "placketBottomInnerEdgeFold",
        "placketBottomInnerEdgeOver",
        "placketBottomInnerEdgeUnder",
        "placketBottomOuterEdgeFold",
        "placketBottomOuterEdgeOver",
        "placketBottomOuterEdgeUnder"
      ]
    });

    // Buttons
    addButtonHoles(part, "placketCfNeck");

    // Title
    macro("title", { at: points.title, nr: 2, title: "frontLeft" });

    if (sa) {
      paths.saFromArmhole
        .line(points.placketTopEdge.shift(90, sa))
        .line(points.placketTopEdge)
        .move(points.placketBottomEdge)
        .line(points.placketBottomEdge.shift(-90, 3 * sa))
        .line(paths.hemSa.start());
    }
  }

  // Paperless?
  if (paperless) {
  }
  return part;
};
