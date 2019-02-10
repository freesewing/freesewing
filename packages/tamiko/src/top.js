export default function(part) {
  // prettier-ignore
  let {store, sa, Point, points, Path, paths, Snippet, snippets, options, complete, paperless, macro, utils, units} = part.shorthand();

  points.top = new Point(0, 0);
  points.bottom = new Point(200, 200);

  // Seamline
  paths.seam = new Path()
    .move(points.top)
    .line(points.bottom)
    .attr("class", "fabric");

  // Complete pattern?
  if (complete) {
  }

  // Paperless?
  if (paperless) {
  }

  return part;
}
