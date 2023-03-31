import { sleeve as brianSleeve } from '@freesewing/brian'
import { hidePresets } from '@freesewing/core'

function yuriSleeve({ Point, Path, points, paths, complete, sa, paperless, macro, part }) {
  // Clear paths from Brian, but keep sleevecap
  for (let p of Object.keys(paths)) {
    if (p !== 'sleevecap') delete paths[p]
  }

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

  // Complete?
  if (complete) {
    macro('grainline', {
      from: new Point(0, points.wristLeft.y),
      to: new Point(0, points.backPitch.y),
    })
    if (sa) {
      paths.sa = paths.saBase
        .clone()
        .offset(sa)
        .join(paths.hemBase.offset(3 * sa))
        .close()
      paths.sa.attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    const hemSa = 3 * sa
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + hemSa + 15,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.sleeveTip.y - sa - 15,
    })
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
  }

  return part
}

export const sleeve = {
  name: 'yuri.sleeve',
  from: brianSleeve,
  hide: hidePresets.HIDE_TREE,
  draft: yuriSleeve,
}
