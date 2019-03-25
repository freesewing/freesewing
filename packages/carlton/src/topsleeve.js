export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength;
  let angle = points.tsWristRight.angle(points.tsWristLeft);
  points.cuffBottomRight = points.tsWristRight.shift(angle+90, length);
  points.cuffBottomLeft = points.tsWristLeft.shift(angle+90, length);
  macro("round", {
    to: points.tsWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length/3,
    render: true,
    prefix: "round"
  });
  store.set("topCuffWidth", points.tsWristLeft.dist(points.tsWristRight));
  store.set("cuffLength", length);
  store.set("cuffRadius", length/3);

  // Paths
  paths.seam = new Path()
    .move(points.tsLeftEdge)
    ._curve(points.tsElbowLeftCpTop, points.tsElbowLeft)
    .line(points.tsWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.tsWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.tsRightEdgeCpBottom, points.tsRightEdge)
    .curve_(points.tsRightEdgeCpTop, points.backPitchPoint)
    ._curve(points.topCpRight, points.top)
    .curve(points.topCpLeft, points.frontPitchPointCpTop, points.frontPitchPoint)
    .curve(points.frontPitchPointCpBottom, points.tsLeftEdgeCpRight, points.tsLeftEdge)
    .close()
    .attr("class", "fabric");

  return part;
}
