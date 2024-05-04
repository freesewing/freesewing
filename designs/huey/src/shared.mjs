import { capitalize } from '@freesewing/core'

export function sharedDimensions(part, s) {
  const { macro, Point, points, sa } = part.shorthand()

  if (s === 'front') {
    points.cHem = points.cfHem
    points.cNeck = points.cfNeck
  } else {
    points.cHem = points.cbHem
    points.cNeck = points.cbNeck
  }

  macro('hd', {
    id: 'wHem',
    from: points.cHem,
    to: points.hem,
    y: points.cHem.y + 3 * sa + 15,
  })
  macro('hd', {
    id: 'wAtArmholePitch',
    from: new Point(0, points.armholePitch.y),
    to: points.armholePitch,
  })
  macro('hd', {
    id: 'wCfToHps',
    from: points.cNeck,
    to: points.neck,
    y: points.neck.y - sa - 15,
  })
  macro('hd', {
    id: 'wCfToShoulder',
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
  macro('ld', {
    id: 'lShoulderSeam',
    from: points.neck,
    to: points.shoulder,
    d: -15,
  })
  macro('vd', {
    id: 'hHemToArmhole',
    from: points.hem,
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
    id: 'hArmholeToShoulder',
    from: points.armhole,
    to: points.shoulder,
    x: points.armhole.x + sa + 30,
  })
  macro('vd', {
    id: 'hArmholeToHps',
    from: points.armhole,
    to: points.neck,
    x: points.armhole.x + sa + 45,
  })
  macro('vd', {
    id: 'hCfNeckToHps',
    from: points.cNeck,
    to: points.neck,
    x: points.cNeck.x - 15,
  })
  macro('vd', {
    id: 'hHemToCfNeck',
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

export function draftRibbing(part, length) {
  const { store, measurements, options, points, paths, Path, Point, expand, sa, macro, units } =
    part.shorthand()
  // Don't run this every time, except when sampling
  if (typeof store.get('ribbingHeight') === 'undefined' || part.context.settings.sample) {
    store.set(
      'ribbingHeight',
      (measurements.hpsToWaistBack + measurements.waistToHips) * options.ribbingHeight
    )
  }
  const height = store.get('ribbingHeight')

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `huey:cut${capitalize(part.name.split('.')[1])}`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(2 * height + extraSa),
        l: units(length + extraSa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  points.topLeft = new Point(0, 0)
  points.topRight = new Point(height * 2, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(points.topRight.x, length)

  paths.seam = new Path()
    .move(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .close()
    .addClass('various')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('various sa')

  /*
   * Annotations
   */
  // Title
  points.title = new Point(points.bottomRight.x / 3, points.bottomRight.y / 3)

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.topRight,
    y: points.topRight.y - sa - 15,
  })
}
