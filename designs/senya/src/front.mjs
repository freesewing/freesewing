import { base } from './base.mjs'
import { bottomAndSide, sleevecap, shoulderAndNeck } from './shared.mjs'

function senyaFront({
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  measurements,
  complete,
  paperless,
  macro,
  log,
  part,
}) {
  points.waistlineCp2 = points.waistline.shift(90, points.armhole.dy(points.waistline) / 3)

  // Clone cb (center back) into cf (center front)
  for (let key of ['Neck', 'Shoulder', 'Armhole', 'Waistline']) {
    points[`cf${key}`] = points[`cb${key}`].clone()
  }

  // Neckline
  points.cfNeck = new Point(0, options.necklineDepth * measurements.hpsToUnderbust)
  points.cfNeckCp1 = points.cfNeck.shift(0, points.neck.x * options.necklineBend * 2)
  points.neck = points.hps.shiftFractionTowards(points.shoulder, options.necklineWidth)
  points.neckCp2 = points.neck
    .shiftTowards(points.shoulder, points.neck.dy(points.cfNeck) * (0.2 + options.necklineBend))
    .rotate(-90, points.neck)

  points.sleeveEnd = points.shoulder.shift(
    measurements.shoulderSlope * -1,
    measurements.shoulderToElbow * options.bicepTopCoverage
  )
  points.sleeveCp1 = points.sleeveEnd.shift(
    measurements.shoulderSlope * -1 - 90,
    measurements.biceps * 0.1
  )
  points.sleeveCp2 = points.armhole.shift(10, measurements.shoulderToElbow * 0.1)

  // Draw
  paths.bottomAndSide = bottomAndSide(
    points.cfWaistline,
    points.waistline,
    points.armhole,
    points.waistlineCp2,
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
    points.cfNeck,
    points.cfNeckCp1,
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
    points.title = new Point(points.waistline.x / 2, points.armhole.y)
    macro('title', { at: points.title, nr: 1, title: 'front' })
    points.logo = points.title.shift(-90, 75)
    snippets.logo = new Snippet('logo', points.logo)

    if (sa) {
      paths.sa = new Path()
        .move(points.cfWaistline)
        .join(paths.bottomAndSide.offset(sa))
        .join(paths.sleevecap.offset(sa * 3))
        .join(paths.shoulderAndNeck.offset(sa))
        .line(points.cfNeck)
        .setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    // These dimensions will be inherited by the back part
    macro('hd', {
      from: points.cfWaistline,
      to: points.waistline,
      y: points.waistline.y + sa + 15,
    })
    macro('vd', {
      from: points.waistline,
      to: points.armhole,
      x: points.armhole.x + sa + 15,
    })
    macro('vd', {
      from: points.waistline,
      to: points.sleeveEnd,
      x: points.armhole.x + sa + 30,
    })
    macro('vd', {
      from: points.waistline,
      to: points.neck,
      x: points.armhole.x + sa + 45,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.neck,
      y: points.neck.y - sa - 15,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.sleeveEnd,
      y: points.neck.y - sa - 30,
    })
    macro('hd', {
      from: points.cfNeck,
      to: points.armhole,
      y: points.neck.y - sa - 45,
    })
    macro('vd', {
      id: 'frontOnly',
      from: points.cfWaistline,
      to: points.cfNeck,
      x: points.cfWaistline.x - sa - 15,
    })
  }
  log.info('front done!')

  return part
}

export const front = {
  name: 'senya.front',
  from: base,
  hide: 'HIDE_TREE',
  measurements: ['shoulderToElbow'],
  options: {
    necklineDepth: { pct: 25, min: 20, max: 40, menu: 'style' },
    necklineWidth: { pct: 30, min: 10, max: 50, menu: 'style' },
    necklineBend: { pct: 30, min: 0, max: 70, menu: 'style' },
    bicepTopCoverage: { pct: 69, min: 30, max: 110, menu: 'style' },
  },
  draft: senyaFront,
}
