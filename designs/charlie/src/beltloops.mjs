import { waistband } from './waistband.mjs'

function draftCharlieBeltLoops({
  store,
  points,
  Point,
  paths,
  Path,
  options,
  expand,
  units,
  complete,
  macro,
  part,
}) {
  const count = options.beltLoops
  const length = store.get('waistbandWidth') * 2.5 * count
  const width = store.get('waistbandWidth') / 4

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `charlie:cutBeltloops`,
      notes: ['flag:saUnused', 'flag:partHiddenByExpand'],
      replace: {
        count: count,
        width: units(width * 4),
        length: units(length / count),
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
  points.topRight = new Point(width * 2.8, 0)
  points.bottomLeft = new Point(0, length)
  points.bottomRight = new Point(width * 2.8, length)
  points.topFold1 = new Point(width * 0.8, 0)
  points.topFold2 = new Point(width * 1.8, 0)
  points.bottomFold1 = new Point(width * 0.8, length)
  points.bottomFold2 = new Point(width * 1.8, length)
  for (let i = 1; i < count; i++) {
    points[`cut${i}a`] = points.topLeft.shiftFractionTowards(points.bottomLeft, i / count)
    points[`cut${i}b`] = points.topRight.shiftFractionTowards(points.bottomRight, i / count)
  }

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  if (complete) {
    paths.fold = new Path()
      .move(points.topFold1)
      .line(points.bottomFold1)
      .move(points.bottomFold2)
      .line(points.topFold2)
      .attr('class', 'fabric help')
    for (let i = 1; i < count; i++) {
      paths[`cut${i}`] = new Path()
        .move(points[`cut${i}a`])
        .line(points[`cut${i}b`])
        .attr('class', 'fabric dashed')
    }
  }

  /*
   * Annotations
   */
  // CutList
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  macro('title', {
    at: new Point(width / 2, length / 2),
    nr: 12,
    title: 'beltLoops',
    rotation: 90,
    scale: 0.7,
  })
  points.grainlineTop = new Point(points.topRight.x / 2, 0)
  points.grainlineBottom = new Point(points.topRight.x / 2, length)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
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
    x: points.bottomRight.x + 15,
  })

  return part
}

export const beltLoops = {
  name: 'charlie.beltLoops',
  after: waistband,
  options: {
    beltLoops: { count: 8, min: 6, max: 12, menu: 'advanced' },
  },
  draft: draftCharlieBeltLoops,
}
