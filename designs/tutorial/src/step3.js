export default function (part) {
  let { Point, points, Path, paths, measurements, options } = part.shorthand()

  let tweak = 1
  let target = (measurements.head * options.neckRatio) / 4
  let delta
  do {
    points.right = new Point((tweak * measurements.head) / 10, 0)
    points.bottom = new Point(0, (tweak * measurements.head) / 12)

    points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right) / 2)
    points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right) / 2)

    paths.neck = new Path()
      .move(points.right)
      .curve(points.rightCp1, points.bottomCp2, points.bottom)

    delta = paths.neck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)

  return part
}
