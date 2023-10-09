import { front } from './front.mjs'

function teaganBack({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  options,
  macro,
  utils,
  units,
  measurements,
  part,
}) {
  // Adjust neckline
  points.cbNeck = new Point(0, points.neck.y + options.backNeckCutout * measurements.neck)
  points.cbNeckCp1 = points.cbNeck.shift(0, points.neck.x / 2)
  points.neckCp2 = utils.beamIntersectsY(points.neck, points.neckCp2, points.cbNeck.y)

  // Adjust armhole
  points.shoulderCp1 = points.shoulderCp1.shiftFractionTowards(points.shoulder, 0.25)

  // Draw seamline
  paths.hemBase = new Path().move(points.cfHem).line(points.hem).hide()
  if (options.fitWaist) {
    paths.sideSeam = new Path()
      .move(points.hem)
      .curve(points.hipsCp2, points.waistCp1, points.waist)
      .curve_(points.waistCp2, points.armhole)
      .hide()
  } else {
    paths.sideSeam = new Path().move(points.hem).curve_(points.waistCp2, points.armhole).hide()
  }
  paths.saBase = new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve(points.neckCp2, points.cbNeckCp1, points.cbNeck)
    .hide()
  paths.seam = new Path()
    .move(points.cfHem)
    .join(paths.hemBase)
    .join(paths.sideSeam)
    .join(paths.saBase)
    .line(points.cfHem)
    .close()
    .setClass('fabric')

  if (sa)
    paths.sa = new Path()
      .move(points.cfHem)
      .join(paths.hemBase.offset(sa * 3))
      .join(paths.sideSeam.offset(sa))
      .join(paths.saBase.offset(sa))
      .line(points.cbNeck)
      .attr('class', 'fabric sa')

  // Set store values required to draft sleevecap
  store.set('sleevecapEase', 0)
  store.set(
    'backArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
      .curve(points.armholeHollowCp2, points.shoulderCp1, points.shoulder)
      .length()
  )

  // Let the user know how long the neck opening is
  store.flag.info({
    msg: 'teagan:neckOpeningLength',
    replace: {
      length: units(
        store.get('lengthFrontNeckOpening') +
          2 *
            new Path()
              .move(points.neck)
              .curve(points.neckCp2, points.cbNeckCp1, points.cbNeck)
              .length()
      ),
    },
  })

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  // Cutonfold
  macro('cutonfold', {
    from: points.cfNeck,
    to: points.cfHem,
    grainline: true,
  })

  // Title
  macro('title', { at: points.title, nr: 2, title: 'back' })

  // Scalebox
  points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
  macro('scalebox', { at: points.scalebox })

  // Dimensions
  macro('vd', {
    id: 'hHemToNeck',
    from: points.cbHem,
    to: points.cbNeck,
    x: points.cbHem.x - sa - 15,
  })

  return part
}

export const back = {
  name: 'teagan.back',
  from: front,
  draft: teaganBack,
}
