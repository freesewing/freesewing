import { cbqc } from '@freesewing/core'

export const ghost = {
  name: 'gozer.ghost',
  measurements: ['hpsToWaistBack', 'waistToFloor', 'head'],
  draft: ({ measurements, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) => {
    const eyeSize = measurements.head * 0.0416
    const size =
      measurements.hpsToWaistBack + measurements.waistToFloor + measurements.head / Math.PI

    points.middle = new Point(0, 0)
    points.eyeLine = points.middle.shift(270, measurements.head / Math.PI / 2)
    points.eyeLeft = points.eyeLine.shift(180, measurements.head * 0.13)
    points.eyeRight = points.eyeLine.shift(0, measurements.head * 0.13)
    points.top = new Point(0, -1 * size)
    points.left = new Point(-1 * size, 0)
    points.right = new Point(size, 0)
    points.bottom = new Point(0, size)
    points.topCp1 = points.top.shift(180, size * cbqc)
    points.topCp2 = points.top.shift(0, size * cbqc)
    points.leftCp1 = points.left.shift(270, size * cbqc)
    points.leftCp2 = points.left.shift(90, size * cbqc)
    points.bottomCp1 = points.bottom.shift(0, size * cbqc)
    points.bottomCp2 = points.bottom.shift(180, size * cbqc)
    points.rightCp1 = points.right.shift(90, size * cbqc)
    points.rightCp2 = points.right.shift(270, size * cbqc)

    points.eyeLeft.addCircle(eyeSize)
    points.eyeRight.addCircle(eyeSize)

    paths.seam = new Path()
      .move(points.top)
      .curve(points.topCp1, points.leftCp2, points.left)
      .curve(points.leftCp1, points.bottomCp2, points.bottom)
      .curve(points.bottomCp1, points.rightCp2, points.right)
      .curve(points.rightCp1, points.topCp2, points.top)
      .close()
      .addClass('fabric')

    points.title = points.middle.shiftFractionTowards(points.bottom, 0.65)
    macro('title', {
      nr: 1,
      at: points.title,
      title: 'Gozer',
      align: 'center',
    })
    points.logo = points.middle.shiftFractionTowards(points.bottom, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = paths.seam.offset(sa).addClass('fabric sa')
    }

    macro('hd', {
      from: points.left,
      to: points.right,
      id: 'width',
      y: points.right.y,
    })
    macro('hd', {
      from: points.eyeLeft,
      to: points.middle,
      id: 'eye',
      y: points.eyeLeft.y,
    })
    macro('vd', {
      from: points.eyeLeft,
      to: points.middle,
      id: 'eye',
      x: points.eyeLeft.x,
    })

    return part
  },
}
