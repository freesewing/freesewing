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

    if (sa) {
      paths.sa1 = new Path()
        .move(points.collarstandCbTop)
        .line(points.collarCbTop)
        .offset(sa);
      paths.sa2 = new Path()
        .move(points.collarstandTip)
        .line(points.notch)
        .line(points.notchTip)
        .offset(-1 * sa);
      paths.sa = new Path()
        .move(points.collarstandTip)
        .line(paths.sa2.start())
        .join(paths.sa2)
        .line(points.notchTip)
        .move(points.collarstandCbTop)
        .line(paths.sa1.start())
        .line(paths.sa1.end())
        .line(points.collarCbTop)
        .attr("class", "various sa");
      paths.sa1.render = false;
      paths.sa2.render = false;
    }
  }

  return part;
}
