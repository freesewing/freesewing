import { front } from './front.mjs'
import { bottomAndSide, sleevecap, shoulderAndNeck } from './shared.mjs'

function senyaBack({
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
  log,
}) {
  // Adjust neckline
  points.cbNeck = new Point(0, points.neck.y + options.backNeckCutout * measurements.neck)
  points.cbNeckCp1 = points.cbNeck.shift(0, points.neck.x / 2)
  points.neckCp2 = utils.beamIntersectsY(points.neck, points.neckCp2, points.cbNeck.y)

  // Draw seamline
  paths.bottomAndSide = bottomAndSide(
    points.cfMidriffTop,
    points.midriffTop,
    points.armhole,
    points.midriffTopCp2,
    Path
  ).hide()
  paths.sleevecap = sleevecap(
    points.armhole,
    points.sleeveEnd,
    points.sleeveCp1,
    points.sleeveCp2,
    Path
  ).hide()
  paths.shoulderAndNeck = shoulderAndNeck(
    points.sleeveEnd,
    points.neck,
    points.cbNeck,
    points.cbNeckCp1,
    points.neckCp2,
    Path
  ).hide()
  paths.seam = new Path()
    .move(points.cfMidriffTop)
    .join(paths.bottomAndSide)
    .join(paths.sleevecap)
    .join(paths.shoulderAndNeck)
    .line(points.cfMidriffTop)
    .close()
    .setClass('fabric')

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfMidriffTop,
      grainline: true,
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
    macro('scalebox', { at: points.scalebox })

    if (sa) {
      paths.sa = new Path()
        .move(points.cfMidriffTop)
        .join(paths.bottomAndSide.offset(sa))
        .join(paths.sleevecap.offset(sa * 3))
        .join(paths.shoulderAndNeck.offset(sa))
        .line(points.cbNeck)
        .setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    // Remove dimensions that are front only
    macro('rmd', { ids: ['frontOnly'] })
    macro('vd', {
      id: 'backMidriffTop',
      from: points.cbMidriffTop,
      to: points.cbNeck,
      x: points.cbMidriffTop.x - sa - 15,
    })
  }
  log.info('back done!')

  return part
}

export const back = {
  name: 'senya.back',
  from: front,
  draft: senyaBack,
}
