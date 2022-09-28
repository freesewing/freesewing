import { step4 } from './step1-4.mjs'

export const step5 = {
  name: 'tutorial.step5',
  from: step4,
  draft: ({ Point, points, Path, paths, measurements, options, part }) => {
    const width = measurements.head * options.widthRatio
    const length = measurements.head * options.lengthRatio

    points.topLeft = new Point(width / -2, points.top.y - (width / 2 - points.right.x))
    points.topRight = points.topLeft.shift(0, width)
    points.bottomLeft = points.topLeft.shift(-90, length)
    points.bottomRight = points.topRight.shift(-90, length)

    paths.rect = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()

    return part
  },
}

export const step6 = {
  name: 'tutorial.step6',
  from: step5,
  draft: ({ Point, points, Path, paths, part }) => {
    points.edgeLeft = new Point(points.topLeft.x, points.left.y)
    points.edgeRight = new Point(points.topRight.x, points.right.y)
    points.edgeTop = new Point(0, points.topLeft.y)

    points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5)
    points.edgeRightCp = points.edgeLeftCp.flipX()
    points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(points.topLeft, 0.5)
    points.edgeTopRightCp = points.edgeTopLeftCp.flipX()

    paths.rect = new Path()
      .move(points.edgeTop)
      .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.edgeRight)
      .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
      .close()

    return part
  },
}

export const step7 = {
  name: 'tutorial.step7',
  from: step6,
  draft: ({ Point, points, macro, part }) => {
    const strap = points.edgeTop.dy(points.top)

    points.tipRight = points.edgeTop.translate(strap / 2, strap / 2)
    points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y)
    points.tipRightBottom = new Point(points.tipRight.x, points.top.y)

    macro('round', {
      from: points.edgeTop,
      to: points.tipRight,
      via: points.tipRightTop,
      prefix: 'tipRightTop',
    })
    macro('round', {
      from: points.tipRight,
      to: points.top,
      via: points.tipRightBottom,
      prefix: 'tipRightBottom',
    })

    return part
  },
}

export const step8 = {
  name: 'tutorial.step8',
  from: step7,
  draft: ({ points, Path, paths, macro, part }) => {
    const rotateThese = [
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
    })
    macro('round', {
      from: points.tipRight,
      to: points.top,
      via: points.tipRightBottom,
      prefix: 'tipRightBottom',
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
  },
}
