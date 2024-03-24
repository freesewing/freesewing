import { front as brianFront } from '@freesewing/brian'
import { back } from './back.mjs'
import { sharedDimensions } from './shared.mjs'

function draftHueyFront({
  utils,
  store,
  macro,
  Point,
  Path,
  points,
  paths,
  complete,
  sa,
  options,
  units,
  measurements,
  part,
}) {
  // Clear paths from Brian
  for (let i in paths) {
    if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  }

  // Shorten body to take ribbing into account
  if (options.ribbing) {
    for (let p of ['hem', 'cfHem']) points[p] = points[p].shift(90, store.get('ribbingHeight'))
  }

  // Shape side seam
  points.hips.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hem.x = points.hips.x
  points.hemCp2 = new Point(points.hips.x, Math.min(points.cfWaist.y, points.hem.y))

  // Front pocket
  points.pocketCfTop = points.cfNeck.shiftFractionTowards(points.cfHem, 1 - options.pocketHeight)
  points.pocketTopRight = points.pocketCfTop.shift(0, points.hem.x * options.pocketWidth)
  points.pocketTip = new Point(
    points.pocketTopRight.x * 1.2,
    points.pocketTopRight.y + (points.hem.y - points.pocketTopRight.y) * 0.9
  )
  points.pocketHem = new Point(
    points.pocketTopRight.x + points.pocketTopRight.dx(points.pocketTip) / 2,
    points.hem.y
  )
  points.pocketTipCp2 = utils.beamsIntersect(
    points.pocketTopRight,
    points.pocketTopRight.shift(90, 10),
    points.pocketTip,
    points.pocketHem.rotate(-90, points.pocketTip)
  )

  // Store length of the neck seam
  store.set(
    'frontNeckSeamLength',
    new Path()
      .move(points.neck)
      .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
      .length()
  )

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .curve_(points.hemCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .join(paths.frontCollar)
    .line(points.cfHem)
    .attr('class', 'note stroke-xxl')
  paths.hemBase = new Path().move(points.cfHem).line(points.hem).attr('class', 'note stroke-xxl')
  paths.saBase.hide()
  paths.hemBase.hide()

  paths.seam = paths.saBase.clone().join(paths.hemBase).close().attr('class', 'fabric')

  if (complete && options.pocket) {
    paths.pocket = new Path()
      .move(points.pocketHem)
      .line(points.pocketTip)
      .curve_(points.pocketTipCp2, points.pocketTopRight)
      .line(points.pocketCfTop)
      .attr('class', 'fabric dashed stroke-sm')
  }

  if (sa) {
    paths.sa = paths.hemBase.offset(options.ribbing ? sa : 3 * sa).join(paths.saBase.offset(sa))
    paths.sa = paths.sa.line(paths.sa.start()).close().attr('class', 'fabric sa')
  }

  /*
   * Annotations
   */
  store.flag.note({
    msg: 'huey:zipperLength',
    replace: {
      /*
       * Zipper length is the hood part, plus center front + ribbing (if there is any)
       */
      length: units(
        measurements.head * options.hoodClosure +
          points.cfNeck.dist(points.cfHem) +
          (options.ribbing ? store.get('ribbingHeight') : 0)
      ),
    },
  })

  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'front',
  })

  sharedDimensions(part, 'front')

  return part
}

export const front = {
  name: 'huey.front',
  from: brianFront,
  after: back,
  hide: {
    from: true,
  },
  options: {
    pocket: { bool: true, menu: 'style' },
    pocketHeight: { pct: 30, min: 25, max: 35, menu: 'style' },
    pocketWidth: { pct: 60, min: 50, max: 70, menu: 'style' },
  },
  draft: draftHueyFront,
}
