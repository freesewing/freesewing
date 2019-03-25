export default function(part) {
  let { paperless, sa, snippets, Snippet, utils, store, complete, points, measurements, options, macro, Point, paths, Path } = part.shorthand();

  // Add cuff
  let length = measurements.shoulderToWrist * options.cuffLength;
  let angle = points.usWristRight.angle(points.usWristLeft);
  points.cuffBottomRight = points.usWristRight.shift(angle+90, length);
  points.cuffBottomLeft = points.usWristLeft.shift(angle+90, length);
  macro("round", {
    to: points.usWristRight,
    from: points.cuffBottomLeft,
    via: points.cuffBottomRight,
    radius: length/3,
    render: true,
    prefix: "round"
  });
  store.set("underCuffWidth", points.usWristLeft.dist(points.usWristRight));

  // Paths
  paths.seam = new Path()
    .move(points.usLeftEdge)
    ._curve(points.usElbowLeftCpTop, points.usElbowLeft)
    .line(points.usWristLeft)
    .line(points.cuffBottomLeft)
    .line(points.roundStart)
    .curve(points.roundCp1, points.roundCp2, points.roundEnd)
    .line(points.usWristRight)
    .line(points.elbowRight)
    .curve(points.elbowRightCpTop, points.usRightEdgeCpBottom, points.usRightEdge)
    .curve_(points.usRightEdgeCpTop, points.usTip)
    .curve(points.usTipCpBottom, points.usLeftEdgeCpRight, points.usLeftEdgeRight)
    .line(points.usLeftEdge)
    .close()
    .attr("class", "fabric");

  return part;
}
