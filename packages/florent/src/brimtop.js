export default function(part) {
  let {
    paperless,
    sa,
    store,
    complete,
    points,
    options,
    macro,
    Point,
    paths,
    Path,
    measurements
  } = part.shorthand();

  paths.hint = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp2, points.outerMidCp1, points.outerMid)
    .curve(points.outerMidCp2, points.tipRightCp1, points.tipRight)
    .attr("class", "dashed stroke-sm");

  paths.seam = paths.hint.offset(3);
  paths.seam = paths.seam
    .line(points.tipRight)
    .curve(points.tipRightCp2, points.innerMidCp1, points.innerMid)
    .curve(points.innerMidCp2, points.tipLeftCp1, points.tipLeft)
    .line(paths.seam.start())
    .close()
    .attr("class", "fabric");

  if (complete) {
    if (sa) {
    }

    if (paperless) {
    }
  }

  return part;
}
