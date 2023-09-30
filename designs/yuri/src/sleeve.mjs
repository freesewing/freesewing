import { sleeve as brianSleeve } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'

function yuriSleeve({ Path, points, paths, sa, part }) {
  // This sleeve is identical to Brian, but has more hem allowance
  // Which is kinda hard to patch in so we re-create the paths

  // Paths
  paths.saBase = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .line(points.wristLeft)
    .setClass('various stroke-xxl')
    .hide()
  paths.hemBase = new Path()
    .move(points.wristLeft)
    .line(points.wristRight)
    .setClass('various stroke-xxl')
    .hide()

  paths.seam = paths.saBase.join(paths.hemBase).close().setClass('fabric')

  if (sa) {
    paths.sa = paths.saBase
      .clone()
      .offset(sa)
      .join(paths.hemBase.offset(3 * sa))
      .close()
    paths.sa.attr('class', 'fabric sa')
  }

  return part
}

export const sleeve = {
  name: 'yuri.sleeve',
  from: brianSleeve,
  hide: hidePresets.HIDE_TREE,
  draft: yuriSleeve,
}
