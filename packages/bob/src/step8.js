export default function (part) {
  let { points, Path, paths, macro } = part.shorthand()

  let rotateThese = [
    'edgeTopLeftCp',
    'edgeTop',
    'tipRight',
    'tipRightTop',
    'tipRightTopStart',
    'tipRightTopCp1',
    'tipRightTopCp2',
    'tipRightTopEnd',
    'tipRightBottomStart',
    'tipRightBottomCp1',
    'tipRightBottomCp2',
    'tipRightBottomEnd',
    'tipRightBottom',
    'top',
    'topCp2',
  ]

  while (points.tipRightBottomStart.x > -1) {
    for (let p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft)
  }

  points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5)

  macro('round', {
    from: points.edgeTop,
    to: points.tipRight,
    via: points.tipRightTop,
    prefix: 'tipRightTop',
    render: true,
  })
  macro('round', {
    from: points.tipRight,
    to: points.top,
    via: points.tipRightBottom,
    prefix: 'tipRightBottom',
    render: true,
  })

  paths.rect = new Path()
    .move(points.edgeTop)
    .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
    .close()

  return part
}
