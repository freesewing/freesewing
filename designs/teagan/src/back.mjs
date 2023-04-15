import { front } from './front.mjs'

function teaganBack({
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  options,
  complete,
  paperless,
  macro,
  utils,
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
  if (options.curveToWaist) {
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

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfHem,
      grainline: true,
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
    macro('scalebox', { at: points.scalebox })

    if (sa) {
      paths.sa = new Path()
        .move(points.cfHem)
        .join(paths.hemBase.offset(sa * 3))
        .join(paths.sideSeam.offset(sa))
        .join(paths.saBase.offset(sa))
        .line(points.cbNeck)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    // Remove dimensions that are front only
    macro('rmd', { ids: store.get('frontOnlyDimensions') })
    // These dimensions are only for the front
    macro('vd', {
      from: points.cbHem,
      to: points.cbNeck,
      x: points.cbHem.x - sa - 15,
    })
  }

  return part
}

export const back = {
  name: 'teagan.back',
  from: front,
  draft: teaganBack,
}
