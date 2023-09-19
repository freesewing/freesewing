import { interfacingTip } from './interfacing.mjs'

function trayvonFabricLoop({ points, Point, paths, Path, store, macro, expand, units, part }) {
  const w = store.get('backTip') * 3.5
  const h = store.get('backTip')

  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `trayvon:cutLoop`,
      replace: {
        width: units(w),
        length: units(h),
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
  points.bottomRight = new Point(store.get('backTip') * 3.5, store.get('backTip'))
  points.topRight = new Point(points.bottomRight.x, points.topLeft.y)
  points.bottomLeft = new Point(points.topLeft.x, points.bottomRight.y)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'fabric')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.addCut({ cut: 1, material: 'lining' })

  // Title
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    nr: 7,
    title: 'loop',
    at: points.title,
    align: 'center',
    scale: 0.666,
  })

  // Dimensions
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomRight.y + 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.topRight,
    to: points.bottomRight,
    x: points.topRight.x + 15,
  })

  return part
}

export const fabricLoop = {
  name: 'trayvon.fabricLoop',
  after: interfacingTip,
  measurements: ['hpsToWaistBack', 'waistToHips', 'neck'],
  draft: trayvonFabricLoop,
}
