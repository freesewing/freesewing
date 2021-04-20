export default function (part) {
  let { points, Path, paths } = part.shorthand()

  points.edgeTopRightCp = points.edgeTopLeftCp.flipX()
  points.topCp1 = points.topCp2.flipX()
  points.tipLeftTopStart = points.tipRightTopStart.flipX()
  points.tipLeftTopCp1 = points.tipRightTopCp1.flipX()
  points.tipLeftTopCp2 = points.tipRightTopCp2.flipX()
  points.tipLeftTopEnd = points.tipRightTopEnd.flipX()
  points.tipLeftBottomStart = points.tipRightBottomStart.flipX()
  points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX()
  points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX()
  points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX()
  points.snapRight = points.snapLeft.flipX()

  paths.seam = new Path()
    .move(points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
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
    .attr('class', 'fabric')

  delete paths.neck
  delete paths.rect

  return part
}
