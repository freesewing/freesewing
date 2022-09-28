import { configpart } from './configpart.mjs'

export const step1 = {
  name: 'tutorial.step1',
  after: configpart,
  draft: ({
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    part,
  }) => {
    let w = 500 * options.size
    points.topLeft = new Point(0, 0)
    points.topRight = new Point(w, 0)
    points.bottomLeft = new Point(0, w / 2)
    points.bottomRight = new Point(w, w / 2)

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')

    // Complete?
    if (complete) {
      points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
      snippets.logo = new Snippet('logo', points.logo)
      points.text = points.logo
        .shift(-90, w / 8)
        .attr('data-text', 'hello')
        .attr('data-text-class', 'center')

      if (sa) {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + sa + 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + sa + 15,
      })
    }

    return part
  },
}

export const step2 = {
  name: 'tutorial.step2',
  after: configpart,
  draft: ({ Point, points, Path, paths, measurements, part }) => {
    points.right = new Point(measurements.head / 10, 0)
    points.bottom = new Point(0, measurements.head / 12)

    points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right) / 2)
    points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right) / 2)

    paths.neck = new Path()
      .move(points.right)
      .curve(points.rightCp1, points.bottomCp2, points.bottom)

    return part
  },
}

export const step3 = {
  name: 'tutorial.step3',
  after: configpart,
  draft: ({ Point, points, Path, paths, measurements, options, part }) => {
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
  },
}

export const step4 = {
  name: 'tutorial.step4',
  from: step3,
  draft: ({ points, Path, paths, part }) => {
    points.rightCp2 = points.rightCp1.flipY()
    points.bottomCp1 = points.bottomCp2.flipX()

    points.left = points.right.flipX()
    points.leftCp1 = points.rightCp2.flipX()
    points.leftCp2 = points.rightCp1.flipX()

    points.top = points.bottom.flipY()
    points.topCp1 = points.bottomCp2.flipY()
    points.topCp2 = points.bottomCp1.flipY()

    paths.neck = new Path()
      .move(points.top)
      .curve(points.topCp2, points.leftCp1, points.left)
      .curve(points.leftCp2, points.bottomCp1, points.bottom)
      .curve(points.bottomCp2, points.rightCp1, points.right)
      .curve(points.rightCp2, points.topCp1, points.top)
      .close()

    return part
  },
}
