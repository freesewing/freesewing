import { sleeve as brianSleeve } from '@freesewing/brian'
import { back } from './back.mjs'
import { hidePresets } from '@freesewing/core'

function draftHueySleeve({
  Point,
  Path,
  points,
  paths,
  store,
  options,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  // Clear paths from Brian, but keep sleevecap
  for (let p of Object.keys(paths)) {
    if (p !== 'sleevecap') delete paths[p]
  }

  // Shorten sleeve to take ribbing into account
  if (options.ribbing) {
    for (let p of ['wristLeft', 'wristRight'])
      points[p] = points[p].shift(90, store.get('ribbingHeight'))
  }

  // Paths
  paths.saBase = new Path()
    .move(points.wristRight)
    .line(points.bicepsRight)
    .join(paths.sleevecap)
    .line(points.wristLeft)
    .attr('class', 'various stroke-xxl')
  paths.hemBase = new Path()
    .move(points.wristLeft)
    .line(points.wristRight)
    .attr('class', 'various stroke-xxl')
  paths.saBase.hide()
  paths.hemBase.hide()

  paths.seam = paths.saBase.join(paths.hemBase).close().attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('grainline', {
      from: new Point(0, points.wristLeft.y),
      to: new Point(0, points.backPitch.y),
    })
    if (sa) {
      if (options.ribbing) paths.sa = paths.seam.offset(sa)
      else {
        paths.sa = paths.saBase
          .clone()
          .offset(sa)
          .join(paths.hemBase.offset(3 * sa))
          .close()
      }
      paths.sa.attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    let hemSa = sa
    if (!options.ribbing) hemSa = 3 * sa
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
  name: 'huey.sleeve',
  from: brianSleeve,
  after: back,
  draft: draftHueySleeve,
  hide: hidePresets.HIDE_TREE,
}
