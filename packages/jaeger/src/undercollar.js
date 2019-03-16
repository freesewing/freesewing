/*
 * FIXME
 *
 * This collar would benefit from a redesign
 * but I find collar design to be rather tricky business and
 * would love the input from someone with more pattern design
 * experience, or more tailoring exprience.
 */

export default function(part) {
  let { sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Clean up
  for (let i of Object.keys(paths)) delete paths[i];
  for (let i of Object.keys(snippets)) delete snippets[i];

  paths.seam = new Path()
    .move(points.collarCbTop)
    .curve_(points.collarCbTopCp, points.notchTip)
    .line(points.notch)
    .line(points.collarstandTip)
    ._curve(points.collarstandCbTopCp, points.collarstandCbTop)
    .line(points.collarCbTop)
    .close()
    .attr("class", "various");

  if (complete) {
    // Title
    points.title = points.collarCbTopCp.shiftFractionTowards(points.collarstandCbTopCp, 0.5);
    macro("title", {
      at: points.title,
      nr: 6,
      title: "underCollar"
    });

    if (sa) paths.sa = paths.seam.offset(sa).attr("class", "various sa");
  }
  return part;
}
