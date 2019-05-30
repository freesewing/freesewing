export default function(part) {
  let {
    Point,
    points,
    Path,
    paths,
    measurements,
    options,
    macro
  } = part.shorthand();

  let strap = points.edgeTop.dy(points.top);

  points.tipRight = points.edgeTop.translate(strap / 2, strap / 2);
  points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y);
  points.tipRightBottom = new Point(points.tipRight.x, points.top.y);

  macro("round", {
    from: points.edgeTop,
    to: points.tipRight,
    via: points.tipRightTop,
    prefix: "tipRightTop",
    render: true
  });
  macro("round", {
    from: points.tipRight,
    to: points.top,
    via: points.tipRightBottom,
    prefix: "tipRightBottom",
    render: true
  });

  // Complete?
  if (complete) {
    if (sa) {
    }

    // Paperless?
    if (paperless) {
    }
  }

  return part;
}
