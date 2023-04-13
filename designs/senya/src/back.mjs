import { front } from './front.mjs'
import { shoulderAndNeck } from './shared.mjs'

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

  // Draw seamline; bottomAndSide and the cleevecap are identical as the front, so we don't recompute
  paths.shoulderAndNeck = shoulderAndNeck(
    points.sleeveEnd,
    points.neck,
    points.cbNeck,
    points.cbNeckCp1,
    points.neckCp2,
    Path
  ).hide()
  paths.seam = new Path()
    .move(points.cfWaistline)
    .join(paths.bottomAndSide)
    .join(paths.sleevecap)
    .join(paths.shoulderAndNeck)
    .line(points.cfWaistline)
    .close()
    .setClass('fabric')

  // Complete pattern?
  if (complete) {
    macro('cutonfold', {
      from: points.cfNeck,
      to: points.cfWaistline,
      grainline: true,
    })

    macro('title', { at: points.title, nr: 2, title: 'back' })
    points.scaleboxAnchor = points.scalebox = points.title.shift(90, 100)
    macro('scalebox', { at: points.scalebox })

    if (sa) {
      paths.sa = new Path()
        .move(points.cfWaistline)
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
      id: 'backWaistline',
      from: points.cbWaistline,
      to: points.cbNeck,
      x: points.cbWaistline.x - sa - 15,
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
