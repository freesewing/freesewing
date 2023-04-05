import { front } from './front.mjs'
import { bottomAndSide, sleevecap, shoulderAndNeck } from './shared.mjs'

function senyaBack({
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
  log,
}) {
  // Adjust neckline
  points.cbNeck = new Point(0, points.neck.y + options.backNeckCutout * measurements.neck)
  points.cbNeckCp1 = points.cbNeck.shift(0, points.neck.x / 2)
  points.neckCp2 = utils.beamIntersectsY(points.neck, points.neckCp2, points.cbNeck.y)

  // Draw seamline
  paths.bottomAndSide = bottomAndSide(
    points.cfWaist,
    points.waist,
    points.armhole,
    points.waistCp2,
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
    .move(points.cfWaist)
    .join(paths.bottomAndSide)
    .join(paths.sleevecap)
    .join(paths.shoulderAndNeck)
    .line(points.cfWaist)
    .close()
    .setClass('fabric')

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfWaist,
      grainline: true,
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
    macro('scalebox', { at: points.scalebox })

    if (sa) {
      paths.sa = new Path()
        .move(points.cfWaist)
        .join(paths.bottomAndSide.offset(sa))
        .join(paths.sleevecap.offset(sa * 3))
        .join(paths.shoulderAndNeck.offset(sa))
        .line(points.cbNeck)
        .setClass('fabric sa')
    }
  }

  log.info(`${sa}`)
  // Paperless?
  if (paperless) {
    // Remove dimensions that are front only
    macro('rmd', { ids: ['frontOnly'] })
    macro('vd', {
      from: points.cbWaist,
      to: points.cbNeck,
      x: points.cbWaist.x - sa - 15,
    })
    // Hmm, this doesn't actually add all the sizes. :< The last one disappears.
    log.info(`${JSON.stringify(sa, null, 1)}`)
  }
  log.info('back done!')

  return part
}

export const back = {
  name: 'senya.back',
  from: front,
  draft: senyaBack,
}
