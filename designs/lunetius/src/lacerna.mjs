function lunetiusLacerna({
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  snippets,
  Snippet,
  sa,
  store,
  utils,
  part,
}) {
  // Store length and width
  store.set(
    'length',
    (measurements.hpsToWaistBack +
      (options.length === 'toBelowKnee'
        ? 1.3 * measurements.waistToKnee
        : measurements[`waist${utils.capitalize(options.length)}`])) *
      options.lengthRatio
  )
  store.set(
    'width',
    (0.6 * measurements.shoulderToShoulder + 1.8 * measurements.shoulderToElbow) *
      options.widthRatio
  )

  // Add points
  points.top = new Point(0, 0)
  points.bottom = new Point(0, store.get('length'))
  points.topLeft = points.top.shift(180, store.get('width'))
  points.bottomLeft = points.topLeft.shift(-90, points.top.dy(points.bottom))
  points.middleLeft = points.topLeft.shift(
    -90,
    measurements.hpsToWaistBack + measurements.waistToHips
  )
  // Don't let middleLeft be lower than the hem
  if (points.middleLeft.y > points.bottomLeft.y) points.middleLeft.y = points.bottomLeft.y

  points.topShoulder = points.top.shift(
    180,
    store.get('width') - 1.2 * measurements.shoulderToElbow
  )
  points.bottomShoulder = points.topShoulder.shift(-90, points.top.dy(points.bottom))
  points.bottomShoulderCp1 = points.middleLeft.shift(-90, points.middleLeft.dy(points.bottom) / 2)
  points.bottomShoulderCp2 = points.bottomLeft.shiftFractionTowards(points.bottomShoulder, 0.5)

  // Add paths
  paths.fold = new Path().move(points.bottom).line(points.top).hide()
  paths.hem = new Path()
    .move(points.topLeft)
    .line(points.middleLeft)
    .curve(points.bottomShoulderCp1, points.bottomShoulderCp2, points.bottomShoulder)
    .line(points.bottom)
    .hide()
  paths.saBase = new Path().move(points.top).line(points.topLeft).hide()
  paths.seam = paths.saBase.join(paths.hem).join(paths.fold).attr('class', 'fabric')

  if (sa)
    paths.sa = paths.saBase
      .offset(sa)
      .join(paths.hem.offset(sa * 1.5))
      .close()
      .addClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  // Notches
  snippets.shoulder = new Snippet('notch', points.topShoulder)

  // cut on fold
  macro('cutonfold', {
    from: points.bottom,
    to: points.top,
    grainline: true,
  })

  // Logo
  points.logo = points.top.shift(45, points.bottom.dy(points.top) / 3)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = points.logo.shift(90, points.bottom.dy(points.top) / 4)
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'Lacerna',
    align: 'center',
  })

  // scalebox
  points.scalebox = points.title.shift(90, points.bottom.dy(points.top) / 5)
  macro('scalebox', { at: points.scalebox })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.top,
    y: points.top.y - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottom,
    to: points.top,
    x: points.top.x + 15,
  })
  macro('hd', {
    id: 'wToNeck',
    from: points.topLeft,
    to: points.topShoulder,
    y: points.top.y - sa - 15,
  })
  macro('hd', {
    id: 'wNeck',
    from: points.topShoulder,
    to: points.top,
    y: points.top.y - sa - 15,
  })
  macro('hd', {
    id: 'wToRoundStart',
    from: points.bottomShoulder,
    to: points.bottom,
    y: points.bottom.y + sa + 15,
  })
  macro('hd', {
    id: 'wRound',
    from: points.bottomLeft,
    to: points.bottomShoulder,
    y: points.bottom.y + sa + 15,
  })
  macro('vd', {
    id: 'hFromRound',
    from: points.middleLeft,
    to: points.topLeft,
    x: points.topLeft.x - sa - 15,
  })
  if (!['toHips', 'toUpperLeg'].includes(options.length)) {
    macro('ld', {
      id: 'lRoundDiag',
      from: points.middleLeft,
      to: points.bottomShoulder,
      d: 0,
    })
  }
  macro('vd', {
    id: 'hRound',
    from: points.bottomLeft,
    to: points.middleLeft,
    x: points.bottomLeft.x - 10,
  })

  return part
}

export const lacerna = {
  name: 'lunetius.lacerna',
  measurements: [
    'waistToKnee',
    'waistToUpperLeg',
    'waistToFloor',
    'hpsToWaistBack',
    'neck',
    'shoulderToShoulder',
    'shoulderToElbow',
    'waistToHips',
  ],
  options: {
    lengthRatio: { pct: 105, min: 60, max: 130, menu: 'style' },
    widthRatio: { pct: 100, min: 50, max: 130, menu: 'style' },
    length: {
      list: ['toKnee', 'toBelowKnee', 'toHips', 'toUpperLeg', 'toFloor'],
      dflt: 'toBelowKnee',
      menu: 'style',
    },
  },
  draft: lunetiusLacerna,
}
