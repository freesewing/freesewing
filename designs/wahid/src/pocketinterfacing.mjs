import { pocketWidth, pocketAngle, weltHeight } from './options.mjs'

function wahidPocketInterfacing({
  points,
  Point,
  paths,
  Path,
  measurements,
  options,
  macro,
  expand,
  units,
  store,
  complete,
  part,
}) {
  const pw = measurements.hips * options.pocketWidth // Pocket width
  const pwh = pw * options.weltHeight // Pocket welt height

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `wahid:cutPocketInterfacing`,
      replace: {
        l: units(pw),
        w: units(pwh),
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
  points.topRight = new Point(pw + 30, 0)
  points.bottomLeft = new Point(0, pwh + 20)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)
  points.notchLeft = new Point(15, 10)
  points.notchRight = new Point(pw + 15, 10)
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'interfacing')

  if (complete)
    paths.cutline = new Path()
      .move(points.notchLeft)
      .line(points.notchRight)
      .attr('class', 'interfacing stroke-sm dashed')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'interfacing' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    nr: 6,
    title: 'pocketInterfacing',
    at: points.title,
    align: 'center',
    scale: 0.666,
  })

  //Grainline
  const grainlineVariableShift = points.topLeft.dist(points.topRight) * 0.1
  points.grainlineFromInterfacing = new Point(points.topLeft.x, points.topLeft.y).shift(
    0,
    grainlineVariableShift
  )
  points.grainlineToInterfacing = new Point(points.topLeft.x, points.topLeft.y)
    .shift(0, grainlineVariableShift)
    .shift(-90, pwh + 20)
  points.grainlineToInterfacingRotated = points.grainlineToInterfacing.rotate(
    options.pocketAngle,
    points.grainlineFromInterfacing
  )
  macro('grainline', {
    from: points.grainlineFromInterfacing,
    to: points.grainlineToInterfacingRotated,
  })

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: ['notchLeft', 'notchRight'],
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15,
  })

  return part
}

export const pocketInterfacing = {
  name: 'wahid.pocketInterfacing',
  measurements: ['hips'],
  options: {
    pocketWidth,
    pocketAngle,
    weltHeight,
  },
  draft: wahidPocketInterfacing,
}
