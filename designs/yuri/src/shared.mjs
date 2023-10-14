export const sharedDimensions = function (part, s) {
  const { macro, Point, points, sa } = part.shorthand()

  if (s === 'front') {
    points.cHem = points.cfBottom
    points.cNeck = points.cfNeck
  } else {
    points.cHem = points.cbBottom
    points.cNeck = points.cbNeck
  }

  macro('hd', {
    id: 'wAtHem',
    from: points.cHem,
    to: points.bottom,
    y: points.cHem.y + 3 * sa + 15,
  })
  macro('hd', {
    id: 'wHemToArmhole',
    from: points.armhole,
    to: points.bottom,
    y: points.bottom.y + 10,
  })
  if (s === 'front') {
    macro('ld', {
      id: 'wCollarToArmholePitch',
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
      id: 'wCbNeckToHps',
      from: points.cNeck,
      to: points.neck,
      y: points.neck.y - sa - 15,
    })
    macro('hd', {
      id: 'wCbNeckToShoulder',
      from: points.cNeck,
      to: points.shoulder,
      y: points.neck.y - sa - 30,
    })
    macro('hd', {
      id: 'wFull',
      from: points.cNeck,
      to: points.armhole,
      y: points.neck.y - sa - 45,
    })
  }
  if (s === 'front') {
    macro('hd', {
      id: 'wEdgeToCollar',
      from: points.button,
      to: points.s3CollarSplit,
      y: points.s3CollarSplit.y,
    })
    macro('vd', {
      id: 'hEdgeToCollar',
      from: points.button,
      to: points.s3CollarSplit,
      x: points.button.x,
    })
    macro('vd', {
      id: 'hShoulderToCollar',
      from: points.s3CollarSplit,
      to: points.s3ArmholeSplit,
      x: points.s3ArmholeSplit.x,
    })
  }
  macro('ld', {
    id: 'lShoulderSeam',
    from: points.neck,
    to: points.shoulder,
    d: -15,
  })
  macro('vd', {
    id: 'hHem',
    from: points.cHem,
    to: points.bottom,
    x: points.bottom.x + 10,
  })
  macro('vd', {
    id: 'hHemToArmhole',
    from: points.bottom,
    to: points.armhole,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    id: 'hArmholeToArmholePitch',
    from: points.armhole,
    to: points.armholePitch,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    id: 'hArmholePitchToShoulder',
    from: points.armholePitch,
    to: points.shoulder,
    x: points.armhole.x + sa + 15,
  })
  macro('vd', {
    from: points.armhole,
    id: 'hArmholeToShoulder',
    to: points.shoulder,
    x: points.armhole.x + sa + 30,
  })
  macro('vd', {
    id: 'hArmholeToHps',
    from: points.armhole,
    to: points.neck,
    x: points.armhole.x + sa + 45,
  })
  if (s === 'back') {
    macro('vd', {
      id: 'hCbNeckToHps',
      from: points.cNeck,
      to: points.neck,
      x: points.cNeck.x - 15,
    })
    macro('vd', {
      id: 'hHemToCbHeck',
      from: points.cHem,
      to: points.cNeck,
      x: points.cNeck.x - 15,
    })
    macro('vd', {
      id: 'hFull',
      from: points.cHem,
      to: points.neck,
      x: points.cNeck.x - 30,
    })
  }
}
