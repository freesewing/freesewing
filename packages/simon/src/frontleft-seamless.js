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

  console.log("seamless buttonjholes");
  let fold = options.buttonholePlacketFoldWidth;
  let width = options.buttonholePlacketWidth;
  points.placketCfNeck = points.cfNeck;
  points.placketTopFold1 = points.cfNeck.shift(180, width / 2);
  points.placketTopFold2 = points.cfNeck.shift(180, width * 1.5);
  points.placketTopEdge = points.cfNeck.shift(180, width * 2.5);
  points.placketBottomFold1 = points.cfHem.shift(180, width / 2);
  points.placketBottomFold2 = points.cfHem.shift(180, width * 1.5);
  points.placketBottomEdge = points.cfHem.shift(180, width * 2.5);

  paths.seam
    .line(points.placketTopEdge)
    .line(points.placketBottomEdge)
    .close();

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path()
      .move(points.cfNeck)
      .line(points.cfHem)
      .attr("class", "help");
    paths.placketFold1 = new Path()
      .move(points.placketTopFold1)
      .line(points.placketBottomFold1)
      .attr("class", "dotted");
    paths.placketFold2 = new Path()
      .move(points.placketTopFold2)
      .line(points.placketBottomFold2)
      .attr("class", "dotted");
    macro("sprinkle", {
      snippet: "notch",
      on: [
        "cfNeck",
        "cfHem",
        "placketTopFold1",
        "placketTopFold2",
        "placketBottomFold1",
        "placketBottomFold2"
      ]
    });

    // Buttons
    addButtonHoles(part, "cfNeck");

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
