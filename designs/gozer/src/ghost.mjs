export const ghost = {
  name: 'gozer.ghost',
  measurements: ['hpsToWaistBack', 'waistToFloor', 'head'],
  draft: ({ measurements, Point, Path, points, paths, Snippet, snippets, sa, macro, part }) => {
    const c = 0.55191502449351
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
    points.topCp1 = points.top.shift(180, size * c)
    points.topCp2 = points.top.shift(0, size * c)
    points.leftCp1 = points.left.shift(270, size * c)
    points.leftCp2 = points.left.shift(90, size * c)
    points.bottomCp1 = points.bottom.shift(0, size * c)
    points.bottomCp2 = points.bottom.shift(180, size * c)
    points.rightCp1 = points.right.shift(90, size * c)
    points.rightCp2 = points.right.shift(270, size * c)

    points.eyeLefttop = points.eyeLeft.shift(90, size * eyeSize)
    points.eyeLeftleft = points.eyeLeft.shift(180, size * eyeSize)
    points.eyeLeftbottom = points.eyeLeft.shift(270, size * eyeSize)
    points.eyeLeftright = points.eyeLeft.shift(0, size * eyeSize)
    points.eyeLefttopCp1 = points.eyeLefttop.shift(180, size * c * eyeSize)
    points.eyeLefttopCp2 = points.eyeLefttop.shift(0, size * c * eyeSize)
    points.eyeLeftleftCp1 = points.eyeLeftleft.shift(270, size * c * eyeSize)
    points.eyeLeftleftCp2 = points.eyeLeftleft.shift(90, size * c * eyeSize)
    points.eyeLeftbottomCp1 = points.eyeLeftbottom.shift(0, size * c * eyeSize)
    points.eyeLeftbottomCp2 = points.eyeLeftbottom.shift(180, size * c * eyeSize)
    points.eyeLeftrightCp1 = points.eyeLeftright.shift(90, size * c * eyeSize)
    points.eyeLeftrightCp2 = points.eyeLeftright.shift(270, size * c * eyeSize)

    points.eyeRighttop = points.eyeRight.shift(90, size * eyeSize)
    points.eyeRightleft = points.eyeRight.shift(180, size * eyeSize)
    points.eyeRightbottom = points.eyeRight.shift(270, size * eyeSize)
    points.eyeRightright = points.eyeRight.shift(0, size * eyeSize)
    points.eyeRighttopCp1 = points.eyeRighttop.shift(180, size * c * eyeSize)
    points.eyeRighttopCp2 = points.eyeRighttop.shift(0, size * c * eyeSize)
    points.eyeRightleftCp1 = points.eyeRightleft.shift(270, size * c * eyeSize)
    points.eyeRightleftCp2 = points.eyeRightleft.shift(90, size * c * eyeSize)
    points.eyeRightbottomCp1 = points.eyeRightbottom.shift(0, size * c * eyeSize)
    points.eyeRightbottomCp2 = points.eyeRightbottom.shift(180, size * c * eyeSize)
    points.eyeRightrightCp1 = points.eyeRightright.shift(90, size * c * eyeSize)
    points.eyeRightrightCp2 = points.eyeRightright.shift(270, size * c * eyeSize)

    paths.seam = new Path()
      .move(points.top)
      .curve(points.topCp1, points.leftCp2, points.left)
      .curve(points.leftCp1, points.bottomCp2, points.bottom)
      .curve(points.bottomCp1, points.rightCp2, points.right)
      .curve(points.rightCp1, points.topCp2, points.top)
      .close()
      .attr('class', 'fabric')

    paths.eyeLeft = new Path()
      .move(points.eyeLefttop)
      .curve(points.eyeLefttopCp1, points.eyeLeftleftCp2, points.eyeLeftleft)
      .curve(points.eyeLeftleftCp1, points.eyeLeftbottomCp2, points.eyeLeftbottom)
      .curve(points.eyeLeftbottomCp1, points.eyeLeftrightCp2, points.eyeLeftright)
      .curve(points.eyeLeftrightCp1, points.eyeLefttopCp2, points.eyeLefttop)
      .close()
      .attr('class', 'fabric')

    paths.eyeRight = new Path()
      .move(points.eyeRighttop)
      .curve(points.eyeRighttopCp1, points.eyeRightleftCp2, points.eyeRightleft)
      .curve(points.eyeRightleftCp1, points.eyeRightbottomCp2, points.eyeRightbottom)
      .curve(points.eyeRightbottomCp1, points.eyeRightrightCp2, points.eyeRightright)
      .curve(points.eyeRightrightCp1, points.eyeRighttopCp2, points.eyeRighttop)
      .close()
      .attr('class', 'fabric')

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
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
