export function draftStraightWaistband({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  units,
  macro,
  expand,
  absoluteOptions,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    const extraSa = sa ? 2 * sa : 0
    store.flag.note({
      msg: `sandy:cutWaistband`,
      notes: [sa ? 'flag:saIncluded' : 'flag:saExcluded', 'flag:partHiddenByExpand'],
      replace: {
        w: units(absoluteOptions.waistbandWidth * 2 + extraSa),
        l: units(store.get('topCircumference') + store.get('waistbandOverlap') + extraSa),
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

  /**
   * The straight waistband is just a rectangle with the width
   * of double the waistband width, since it will be folded
   */

  // Calculate the corners of the rectangle and other auxiliar points
  points.center = new Point(0, 0)
  points.centerLeft = new Point(store.get('topCircumference') / -2, 0)
  points.centerRight = new Point(
    store.get('topCircumference') / 2 + store.get('waistbandOverlap'),
    0
  )
  points.topRight = points.centerRight.shift(90, absoluteOptions.waistbandWidth)
  points.topLeft = points.centerLeft.shift(90, absoluteOptions.waistbandWidth)
  points.bottomRight = points.topRight.flipY()
  points.bottomLeft = points.topLeft.flipY()

  // Draft the rectangle
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  // Draft the foldline
  paths.fold = new Path()
    .move(points.centerRight)
    .line(points.centerLeft)
    .attr('class', 'fabric dashed')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Title
  points.title = points.center.shiftFractionTowards(points.centerRight, 0.5)
  macro('title', { at: points.title, nr: 2, title: 'straightWaistband' })

  // Grainline
  points.grainlineFrom = points.centerLeft.shiftFractionTowards(points.topLeft, 0.5)
  points.grainlineTo = points.grainlineFrom.flipX()
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  // Button(hole)
  points.button = points.centerRight
    .shiftFractionTowards(points.bottomRight, 0.5)
    .shift(180, store.get('waistbandOverlap') / 2)
  points.buttonhole = points.centerLeft
    .shiftFractionTowards(points.bottomLeft, 0.5)
    .shift(0, store.get('waistbandOverlap') / 2)
  snippets.button = new Snippet('button', points.button)
  snippets.buttonhole = new Snippet('buttonhole', points.buttonhole)

  // Notches
  points.centerNotch = new Point((-1 * store.get('waistbandOverlap')) / 2, points.bottomLeft.y)
  points.buttonNotch = points.bottomRight.shift(180, store.get('waistbandOverlap'))
  macro('sprinkle', {
    snippet: 'notch',
    on: ['centerNotch', 'buttonNotch', 'bottomLeft'],
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + sa + 15,
  })

  return part
}
