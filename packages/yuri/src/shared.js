export const sharedDimensions = function (part, s) {
  let { macro, Point, points, sa } = part.shorthand()

  if (s === 'front') {
    points.cHem = points.cfBottom
    points.cNeck = points.cfNeck
  } else {
    points.cHem = points.cbBottom
    points.cNeck = points.cbNeck
  }

  macro('hd', {
    from: points.cHem,
    to: points.bottom,
    y: points.cHem.y + 3 * sa + 15,
  })
  macro('hd', {
    from: points.armhole,
    to: points.bottom,
    y: points.bottom.y + 10,
  })
  if (s === 'front') {
    macro('ld', {
      from: new Point(points.s3CollarSplit.x, points.armholePitch.y),
      to: points.armholePitch,
    })
  } else {
    macro('ld', {
      from: new Point(0, points.armholePitch.y),
      to: points.armholePitch,
    })
  }
  if (s === 'back') {
    macro('hd', {
      from: points.cNeck,
      to: points.neck,
      y: points.neck.y - sa - 15,
    })
    macro('hd', {
      from: points.cNeck,
      to: points.shoulder,
      y: points.neck.y - sa - 30,
    })
    macro('hd', {
      from: points.cNeck,
      to: points.armhole,
      y: points.neck.y - sa - 45,
    })
  }
  if (s === 'front') {
    macro('hd', {
      from: points.button,
      to: points.s3CollarSplit,
      y: points.s3CollarSplit.y,
    })
    macro('vd', {
      from: points.button,
      to: points.s3CollarSplit,
      x: points.button.x,
    })
    macro('vd', {
      from: points.s3CollarSplit,
      to: points.s3ArmholeSplit,
      x: points.s3ArmholeSplit.x,
    })
  }
  macro('ld', {
    from: points.neck,
    to: points.shoulder,
    d: -15,
  })
  macro('vd', {
    from: points.cHem,
    to: points.bottom,
    x: points.bottom.x + 10,
  })
  macro('vd', {
    from: points.bottom,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    from: points.armhole,
    to: points.armholePitch,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    from: points.armholePitch,
    to: points.shoulder,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    from: points.armhole,
    to: points.shoulder,
    x: points.armhole.x + sa + 30,
  })
  macro('vd', {
    from: points.armhole,
    to: points.neck,
    x: points.armhole.x + sa + 45,
  })
  if (s === 'back') {
    macro('vd', {
      from: points.cNeck,
      to: points.neck,
      x: points.cNeck.x - 15,
    })
    macro('vd', {
      from: points.cHem,
      to: points.cNeck,
      x: points.cNeck.x - 15,
    })
    macro('vd', {
      from: points.cHem,
      to: points.neck,
      x: points.cNeck.x - 30,
    })
  }
}

export const draftRibbing = function (part, length) {
  let {
    store,
    measurements,
    options,
    points,
    paths,
    Path,
    Point,
    sa,
    complete,
    paperless,
    macro,
    units,
  } = part.shorthand()
  // Don't run this every time, except when sampling
  if (typeof store.get('ribbingHeight') === 'undefined' || part.context.settings.sample) {
    store.set(
      'ribbingHeight',
      (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
    )
  }
  let height = store.get('ribbingHeight')
  let gap = 25
  let lead = 50
  if (length < 125) lead = length / 3

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 2, 0)
  points.leftGapStart = new Point(0, lead)
  points.rightGapEnd = new Point(points.topRight.x, lead)
  points.leftGapEnd = new Point(0, lead + gap)
  points.rightGapStart = new Point(points.topRight.x, lead + gap)
  points.bottomLeft = new Point(0, gap + 2 * lead)
  points.bottomRight = new Point(points.topRight.x, gap + 2 * lead)

  paths.seam = new Path()
    .move(points.rightGapEnd)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.leftGapStart)
    .move(points.leftGapEnd)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.rightGapStart)
    .attr('class', 'various')

  paths.hint = new Path()
    .move(points.leftGapStart)
    .line(points.leftGapEnd)
    .move(points.rightGapStart)
    .line(points.rightGapEnd)
    .attr('class', 'various dashed')

  if (complete) {
    points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2)
    if (sa) {
      paths.sa = new Path()
        .move(points.topLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .offset(sa)
        .attr('class', 'various sa')
    }
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x - 25,
      text: units(length),
    })
  }

  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topRight.y - sa - 15,
    })
  }
}
