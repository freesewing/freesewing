export default function (part) {
  let { points, Path, paths, macro } = part.shorthand()

  macro('round', {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: points.bottomRight.x / 4,
    render: true,
    prefix: 'bottomLeft',
  })
  macro('round', {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: points.bottomRight.x / 4,
    render: true,
    prefix: 'bottomRight',
  })

  paths.seam = new Path()
    .move(points.edgeLeft)
    .line(points.bottomLeftStart)
    .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
    .line(points.bottomRightStart)
    .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
    .line(points.edgeRight)
    .curve(points.edgeRightCp, points.edgeTopRightCp, points.tipLeftTopStart)
    .curve(points.tipLeftTopCp1, points.tipLeftTopCp2, points.tipLeftTopEnd)
    .curve(points.tipLeftBottomCp1, points.tipLeftBottomCp2, points.tipLeftBottomEnd)
    .curve(points.topCp1, points.rightCp2, points.right)
    .curve(points.rightCp1, points.bottomCp2, points.bottom)
    .curve(points.bottomCp1, points.leftCp2, points.left)
    .curve(points.leftCp1, points.topCp2, points.tipRightBottomEnd)
    .curve(points.tipRightBottomCp2, points.tipRightBottomCp1, points.tipRightBottomStart)
    .curve(points.tipRightTopCp2, points.tipRightTopCp1, points.tipRightTopStart)
    .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
    .close()

  return part
}
