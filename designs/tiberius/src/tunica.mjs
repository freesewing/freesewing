function tiberiusTunica({
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  complete,
  snippets,
  Snippet,
  store,
  sa,
  part,
}) {
  // Handle width
  const width =
    options.width === 'toElbow'
      ? measurements.shoulderToElbow
      : options.width === 'toMidArm'
      ? measurements.shoulderToElbow / 2
      : 0
  let hwidth = (measurements.shoulderToShoulder / 2 + width) * options.widthBonus
  // Some checks, can be circumvented with forceWidth
  if (options.forceWidth === false) {
    if (hwidth < measurements.waist / 4) {
      hwidth = (measurements.waist / 4) * options.widthBonus
    }
    if (hwidth < measurements.hips / 4) {
      hwidth = (measurements.hips / 4) * options.widthBonus
    }
    if (hwidth < measurements.chest / 4) {
      hwidth = (measurements.chest / 4) * options.widthBonus
    }
    if (hwidth < measurements.seat / 4) {
      hwidth = (measurements.seat / 4) * options.widthBonus
    }
  }
  // Other variables
  const hem_pos =
    options.length === 'toKnee'
      ? measurements.waistToKnee
      : options.length === 'toMidLeg'
      ? measurements.waistToKnee / 1.3
      : measurements.waistToFloor * 0.95
  const length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
  const hhead = (measurements.head / 4) * options.headRatio
  const armhole = (measurements.biceps / 2) * 1.3 * options.armholeDrop
  const clavusWidth = (options.clavusWidth * hwidth) / 13 / options.widthBonus

  // Add points
  points.top = new Point(0, 0)
  points.bottom = new Point(0, length)
  points.topLeft = points.top.shift(0, -hwidth)
  points.headLeft = points.top.shift(180, hhead)
  // Don't go more narrow than head opening
  points.topLeftMin = points.top.shiftFractionTowards(points.headLeft, 1.1)
  if (points.topLeftMin.x < points.topLeft.x) points.topLeft.x = points.topLeftMin.x
  points.bottomLeft = points.bottom.shift(0, points.bottom.dx(points.topLeft))
  points.armholeLeft = points.topLeft.shift(-90, armhole)

  // draw paths
  paths.saBase = new Path().move(points.top).line(points.topLeft).line(points.bottomLeft).hide()
  paths.hem = new Path().move(points.bottomLeft).line(points.bottom).hide()
  paths.fold = new Path().move(points.bottom).line(points.top).hide()
  paths.seam = paths.saBase.join(paths.hem).join(paths.fold).unhide().attr('class', 'fabric')

  // clavi
  if (options.clavi && complete) {
    // make points
    points.claviCenterTop = points.top.shiftFractionTowards(points.topLeft, options.clavusLocation)
    points.claviRightTop = points.claviCenterTop.shift(0, clavusWidth)
    points.claviLeftTop = points.claviRightTop.flipX(points.claviCenterTop)
    points.claviRightBottom = new Point(points.claviRightTop.x, points.bottom.y)
    points.claviLeftBottom = new Point(points.claviLeftTop.x, points.bottom.y)
    // draw path
    paths.clavi = new Path()
      .move(points.claviRightBottom)
      .line(points.claviRightTop)
      .move(points.claviLeftBottom)
      .line(points.claviLeftTop)
      .addClass('note dashed')
    macro('banner', {
      path: paths.clavi,
      text: 'tiberius:biasTape',
      classes: 'center fill-note text-sm',
      repeat: 69,
    })
  }

  // seam allowance
  if (sa)
    paths.sa = paths.saBase
      .offset(sa)
      .join(paths.hem.offset(sa * 2.5))
      .close()
      .attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric', onFold: true })

  // Notches
  snippets.hl = new Snippet('notch', points.headLeft)
  snippets.al = new Snippet('notch', points.armholeLeft)

  // Cut on fold
  macro('cutonfold', {
    from: points.bottom,
    to: points.top,
    grainline: true,
  })

  // Logo
  points.midTop = points.top.shiftFractionTowards(points.headLeft, 0.5)
  points.midBottom = new Point(points.midTop.x, points.bottom.y)
  points.logo = points.midTop.shiftFractionTowards(points.midBottom, 0.3)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = points.midTop.shiftFractionTowards(points.midBottom, 0.5)
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'tunica',
    align: 'center',
  })

  // Scalebox
  points.scalebox = points.midTop.shiftFractionTowards(points.midBottom, 0.7)
  macro('scalebox', { at: points.scalebox })

  // Dimensions
  macro('vd', {
    id: 'hFull',
    from: points.bottom,
    to: points.top,
    x: points.bottomLeft.x - 30 - sa,
  })
  macro('vd', {
    id: 'hToNotch',
    from: points.bottomLeft,
    to: points.armholeLeft,
    x: points.armholeLeft.x - 15 - sa,
  })
  macro('vd', {
    id: 'hFromNotch',
    from: points.armholeLeft,
    to: points.topLeft,
    x: points.armholeLeft.x - 15 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.top,
    y: points.top.y - sa - (options.clavi ? 60 : 30),
  })
  macro('hd', {
    id: 'wNotchToFold',
    to: points.top,
    from: points.headLeft,
    y: points.top.y - 15 - sa,
  })

  // for clavi
  if (options.clavi) {
    macro('hd', {
      id: 'wClavi1ToFold',
      from: points.claviRightTop,
      to: points.top,
      y: points.top.y - 30 - sa,
    })
    macro('hd', {
      id: 'wClavi2ToFold',
      from: points.claviLeftTop,
      to: points.top,
      y: points.top.y - 45 - sa,
    })
  }

  return part
}

export const tunica = {
  name: 'tiberius.tunica',
  measurements: [
    'head',
    'shoulderToElbow',
    'shoulderToShoulder',
    'biceps',
    'hpsToWaistBack',
    'waistToKnee',
    'waist',
    'chest',
    'seat',
    'hips',
    'waistToFloor',
    'waistToUpperLeg',
  ],
  options: {
    headRatio: { pct: 100, min: 80, max: 120, menu: 'fit' },
    armholeDrop: { pct: 110, min: 100, max: 150, menu: 'fit' },
    lengthBonus: { pct: 90, min: 60, max: 130, menu: 'style' },
    widthBonus: { pct: 100, min: 50, max: 130, menu: 'style' },
    clavi: { bool: false, menu: 'style.clavi' },
    clavusLocation: { pct: 65, min: 50, max: 80, menu: 'style.clavi' },
    clavusWidth: { pct: 100, min: 50, max: 150, menu: 'style.clavi' },
    length: {
      list: ['toKnee', 'toMidLeg', 'toFloor'],
      dflt: 'toKnee',
      menu: 'style',
    },
    width: {
      list: ['toElbow', 'toShoulder', 'toMidArm'],
      dflt: 'toMidArm',
      menu: 'style',
    },
    forceWidth: { bool: false, menu: 'advanced' },
  },
  draft: tiberiusTunica,
}
