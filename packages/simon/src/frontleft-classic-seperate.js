import { addButtonHoles } from "./shared";

export default part => {
  // prettier-ignore
  let {store, measurements, utils, sa, Point, points, Path, paths, Snippet, snippets, complete, paperless, macro, options} = part.shorthand();

  let fold = options.buttonholePlacketFoldWidth;
  points.neckEdge = utils.lineIntersectsCurve(
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y + 20),
    new Point(points.cfNeck.x + fold * 2, points.cfNeck.y - 20),
    points.cfNeck,
    points.cfNeckCp1,
    points.neckCp2Front,
    points.neck
  );
  points.hemEdge = new Point(points.neckEdge.x, points.cfHem.y);

  paths.seam = paths.seam.split(points.neckEdge)[0];
  paths.seam.ops[0].to = points.hemEdge;
  paths.seam.close().attr("class", "fabric");

  // Complete pattern?
  if (complete) {
    // Title
    macro("title", { at: points.title, nr: "2a", title: "frontLeft" });

    if (sa) {
      paths.saFromArmhole.end().x = points.neckEdge.x - sa;
      paths.hemSa.start().x = points.neckEdge.x - sa;
      paths.saClosure = new Path()
        .move(paths.saFromArmhole.end())
        .line(paths.hemSa.start())
        .attr("class", "fabric sa");
    }
  }

  // Paperless?
  if (paperless) {
  }
  return part;
};
