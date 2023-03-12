import { sleeve as sleeveBase } from '@freesewing/brian'
import { front } from './front.mjs'
import { back } from './front.mjs'
import { hidePresets } from '@freesewing/core'

function draftDianaSleeve({ sa, points, paths, Path, complete, paperless, macro, part }) {
  paths.seam = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .line(points.wristLeft)
    .line(points.wristRight)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('grainline', {
      from: points.centerWrist,
      to: points.grainlineTo,
    })
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
      paths.sa.line(paths.sa.start()).close().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.wristLeft,
      to: points.bicepsLeft,
      x: points.bicepsLeft.x - sa - 15,
    })
    macro('vd', {
      from: points.wristLeft,
      to: points.sleeveTip,
      x: points.bicepsLeft.x - sa - 30,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - sa - 30,
    })
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + sa * 3 + 15,
    })
    macro('pd', {
      path: paths.sleevecap.reverse(),
      d: -1 * sa - 15,
    })
  }

  return part
}

export const sleeve = {
  name: 'diana.sleeve',
  from: sleeveBase,
  after: [front, back],
  hide: hidePresets.HIDE_TREE,
  draft: draftDianaSleeve,
}
