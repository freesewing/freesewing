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
