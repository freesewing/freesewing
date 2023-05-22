import { pluginBundle } from '@freesewing/plugin-bundle'

export const bib = {
  name: 'bob.bib',
  measurements: [],
  optionalMeasurements: ['head'],
  options: {
    neckRatio: { pct: 80, min: 70, max: 90, menu: 'fit' },
    widthRatio: { pct: 45, min: 35, max: 55, menu: 'fit' },
    lengthRatio: { pct: 75, min: 55, max: 85, menu: 'fit' },
    headSize: { pct: 100, min: 10, max: 200, snap: 5, menu: 'size' },
  },
  plugins: [pluginBundle],
  draft: ({
    Point,
    points,
    Path,
    paths,
    measurements,
    options,
    macro,
    log,
    complete,
    snippets,
    Snippet,
    paperless,
    part,
  }) => {
    // Head size
    const head = (`head` in measurements ? measurements.head : 360) * options.headSize

    // Construct the neck opening
    let tweak = 1
    let target = (head * options.neckRatio) / 4
    let delta
    do {
      points.right = new Point((tweak * head) / 10, 0)
      points.bottom = new Point(0, (tweak * head) / 12)

      points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right) / 2)
      points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right) / 2)

      paths.neck = new Path()
        .move(points.right)
        .curve(points.rightCp1, points.bottomCp2, points.bottom)

      delta = paths.neck.length() - target
      if (delta > 0) tweak = tweak * 0.99
      else tweak = tweak * 1.02
    } while (Math.abs(delta) > 1)

    points.rightCp2 = points.rightCp1.flipY()
    points.bottomCp1 = points.bottomCp2.flipX()

    points.left = points.right.flipX()
    points.leftCp1 = points.rightCp2.flipX()
    points.leftCp2 = points.rightCp1.flipX()

    points.top = points.bottom.flipY()
    points.topCp1 = points.bottomCp2.flipY()
    points.topCp2 = points.bottomCp1.flipY()

    // Construct the outline
    let width = head * options.widthRatio
    let length = head * options.lengthRatio

    points.topLeft = new Point(width / -2, points.top.y - (width / 2 - points.right.x))
    points.topRight = points.topLeft.shift(0, width)
    points.bottomLeft = points.topLeft.shift(-90, length)
    points.bottomRight = points.topRight.shift(-90, length)

    points.edgeLeft = new Point(points.topLeft.x, points.left.y)
    points.edgeRight = new Point(points.topRight.x, points.right.y)
    points.edgeTop = new Point(0, points.topLeft.y)

    points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5)
    points.edgeRightCp = points.edgeLeftCp.flipX()
    points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(points.topLeft, 0.5)
    points.edgeTopRightCp = points.edgeTopLeftCp.flipX()

    // Round the end of the straps
    let strap = points.edgeTop.dy(points.top)

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

    // Rotate straps so they don't overlap
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

    // Add points to anchor snaps on
    points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5)

    // Mirror points to the other side
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

    // Round the bottom of the bib
    // Radius is fixed, but you could use an option for it)
    macro('round', {
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: points.bottomRight.x / 4,
      prefix: 'bottomLeft',
    })
    macro('round', {
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: points.bottomRight.x / 4,
      prefix: 'bottomRight',
    })

    // Construct the path
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
      .attr('class', 'fabric')

    log.info(['biasTapeLength', { mm: paths.seam.length() }])
    log.info(['fabricHeight', { mm: points.tipRightTopStart.dy(points.bottomLeftEnd) }])
    log.info(['fabricWidth', { mm: points.bottomLeftStart.dx(points.bottomRightEnd) }])

    // Complete?
    if (complete) {
      // Add the snaps
      snippets.snapStud = new Snippet('snap-stud', points.snapLeft)
      snippets.snapSocket = new Snippet('snap-socket', points.snapRight).attr('opacity', 0.5)

      // Add the bias tape
      paths.bias = paths.seam
        .offset(-5)
        .attr('class', 'various dashed')
        .attr('data-text', 'finishWithBiasTape')
        .attr('data-text-class', 'center fill-various')

      // Add the title
      points.title = points.bottom.shift(-90, 45)
      macro('title', {
        at: points.title,
        nr: 1,
        title: 'bib',
      })

      // Add the scalebox
      points.scalebox = points.title.shift(-90, 55)
      macro('scalebox', { at: points.scalebox })

      // Add the logo
      points.logo = new Point(0, 0)
      snippets.logo = new Snippet('logo', points.logo)

      // Paperless?
      if (paperless) {
        // Add dimensions
        macro('hd', {
          from: points.bottomLeftStart,
          to: points.bottomRightEnd,
          y: points.bottomLeft.y + 15,
        })
        macro('vd', {
          from: points.bottomRightStart,
          to: points.bottom,
          x: points.bottomRight.x + 15,
        })
        macro('vd', {
          from: points.bottomRightStart,
          to: points.right,
          x: points.bottomRight.x + 30,
        })
        macro('vd', {
          from: points.bottomRightStart,
          to: points.tipLeftTopStart,
          x: points.bottomRight.x + 45,
        })
        macro('hd', {
          from: points.left,
          to: points.right,
          y: points.left.y + 25,
        })
        macro('ld', {
          from: points.tipLeftBottomEnd,
          to: points.tipLeftTopStart,
          d: -15,
        })
      }
    }

    return part
  },
}
