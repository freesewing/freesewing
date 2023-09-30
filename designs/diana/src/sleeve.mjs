import { sleeve as sleeveBase } from '@freesewing/brian'
import { front } from './front.mjs'
import { back } from './front.mjs'
import { hidePresets } from '@freesewing/core'

function draftDianaSleeve({ sa, points, paths, Path, macro, store, part }) {
  paths.seam = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .line(points.wristLeft)
    .line(points.wristRight)
    .close()
    .addClass('fabric')

  if (sa) {
    paths.saBase = new Path()
      .move(points.wristRight)
      .line(points.bicepsRight)
      .join(paths.sleevecap)
      .line(points.wristLeft)
    paths.hemBase = new Path().move(points.wristLeft).line(points.wristRight)
    paths.saBase.hide()
    paths.hemBase.hide()
    paths.sa = paths.saBase.offset(sa).join(paths.hemBase.offset(sa * 3))
    paths.sa.line(paths.sa.start()).close().addClass('fabric sa')
  }

  /*
   * Annotations
   */
  // cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Grainline
  macro('grainline', {
    from: points.centerWrist,
    to: points.sleeveTop,
  })

  // Dimensions
  macro('vd', {
    id: 'hWristToSleevecapBottom',
    from: points.wristLeft,
    to: points.bicepsLeft,
    x: points.bicepsLeft.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.wristLeft,
    to: points.sleeveTip,
    x: points.bicepsLeft.x - sa - 30,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bicepsLeft,
    to: points.bicepsRight,
    y: points.sleeveTip.y - sa - 30,
  })
  macro('hd', {
    id: 'wWrist',
    from: points.wristLeft,
    to: points.wristRight,
    y: points.wristLeft.y + sa * 3 + 15,
  })
  macro('pd', {
    id: 'lSleevecap',
    path: paths.sleevecap.reverse(),
    d: -1 * sa - 15,
  })
  // Remove this one from Brian
  macro('rmhd', 'wCuff')

  return part
}

export const sleeve = {
  name: 'diana.sleeve',
  from: sleeveBase,
  after: [front, back],
  hide: hidePresets.HIDE_TREE,
  draft: draftDianaSleeve,
}
