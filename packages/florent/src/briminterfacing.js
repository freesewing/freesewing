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

  paths.hint = paths.seam.clone().attr("class", "dashed stroke-sm");

  paths.outset = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp2, points.outerMidCp1, points.outerMid)
    .curve(points.outerMidCp2, points.tipRightCp1, points.tipRight)
    .attr("class", "lining");
  //.offset(1.5)
  points.outsetStart = paths.outset.shiftAlong(5);
  points.outsetEnd = paths.outset.reverse().shiftAlong(5);
  paths.outset = paths.outset
    .split(points.outsetStart)
    .pop()
    .split(points.outsetEnd)
    .shift()
    .offset(1.5);

  paths.inset = new Path()
    .move(points.tipLeft)
    .curve(points.tipLeftCp1, points.innerMidCp2, points.innerMid)
    .curve(points.innerMidCp1, points.tipRightCp2, points.tipRight)
    .attr("class", "various");
  //.offset(1.5)
  points.insetStart = paths.inset.shiftAlong(5);
  points.insetEnd = paths.inset.reverse().shiftAlong(5);
  paths.inset = paths.inset
    .split(points.insetStart)
    .pop()
    .split(points.insetEnd)
    .shift()
    .offset(1.5);
  paths.inset.render = false;
  paths.outset.render = false;

  paths.hint = paths.seam.clone().attr("class", "dashed stroke-sm");
  paths.seam = paths.outset
    .clone()
    .line(paths.inset.end())
    .join(paths.inset.reverse())
    .line(paths.outset.start())
    .close()
    .attr("class", "interfacing");

  if (complete) {
    if (sa) {
    }

    if (paperless) {
    }
  }

  return part;
}
