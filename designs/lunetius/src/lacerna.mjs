function lunetiusLacerna({
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
  sa,
  paperless,
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

  // Complete?
  if (complete) {
    snippets.shoulder = new Snippet('notch', points.topShoulder)

    // cut on fold
    macro('cutonfold', {
      from: points.bottom,
      to: points.top,
      grainline: true,
    })

    // logo & title
    points.logo = points.top.shift(45, points.bottom.dy(points.top) / 3)
    snippets.logo = new Snippet('logo', points.logo)
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

    // seam allowance
    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .join(paths.hem.offset(sa * 1.5))
        .close()
        .attr('class', 'fabric sa')
    }

    // Paperless?
    if (paperless) {
      macro('hd', {
        from: points.topLeft,
        to: points.top,
        y: points.top.y - 20,
      })
      macro('vd', {
        from: points.top,
        to: points.bottom,
        x: points.top.x + 10,
      })
      macro('hd', {
        from: points.topLeft,
        to: points.topShoulder,
        y: points.top.y - 10,
      })
      macro('hd', {
        from: points.topShoulder,
        to: points.top,
        y: points.top.y - 10,
      })
      macro('hd', {
        from: points.bottomShoulder,
        to: points.bottom,
        y: points.bottom.y + 10,
      })
      macro('hd', {
        from: points.bottomShoulder,
        to: points.bottomLeft,
        y: points.bottom.y + 10,
      })
      macro('vd', {
        from: points.topLeft,
        to: points.middleLeft,
        x: points.topLeft.x - 10,
      })
      macro('ld', {
        from: points.middleLeft,
        to: points.bottomShoulder,
        d: 0,
      })

      macro('vd', {
        from: points.middleLeft,
        to: points.bottomLeft,
        x: points.bottomLeft.x - 10,
      })
    }
  }

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
