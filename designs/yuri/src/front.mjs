import { front as brianFront } from '@freesewing/brian'
import { sharedDimensions } from './shared.mjs'
import { hidePresets } from '@freesewing/core'

function yuriFront({
  store,
  Point,
  Path,
  points,
  paths,
  complete,
  paperless,
  sa,
  options,
  measurements,
  macro,
  snippets,
  Snippet,
  part,
}) {
  // Clear paths from Brian
  for (const i in paths) {
    if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  }

  // Shape side seam
  points.hips.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hem.x = points.hips.x
  points.hemCp2 = new Point(points.hips.x, points.cfWaist.y)

  // add some points for Yuri
  points.cfBottom = new Point(0, points.cfHem.y * 1.27)
  points.bottom = new Point(points.hem.x * 1.23, points.cfBottom.y * 0.97)
  points.bottomCp2 = new Point(points.bottom.x, points.cfWaist.y)
  points.button = new Point(
    points.s3CollarSplit.x - (2 / 3) * measurements.shoulderToShoulder,
    points.s3CollarSplit.y + measurements.hpsToBust * 1.17
  )
  // end Yuri points

  // Store length of the neck seam
  store.set(
    'frontNeckSeamLength',
    new Path()
      .move(points.neck)
      .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
      .length()
  )
  store.set('neckCutoutFront', points.cfNeck.y)

  // Paths
  paths.saBase = new Path()
    .move(points.bottom)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .setClass('note stroke-xxl')
    .hide()
  paths.buttonBase = new Path()
    .move(points.s3CollarSplit)
    .line(points.button)
    .line(points.cfBottom)
    .attr('note stroke-xxl')
    .hide()
  paths.hemBase = new Path()
    .move(points.cfBottom)
    .line(points.bottom)
    .setClass('note stroke-xxl')
    .hide()

  paths.seam = paths.saBase
    .clone()
    .join(paths.buttonBase)
    .join(paths.hemBase)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('grainline', {
      from: points.s3CollarSplit,
      to: new Point(points.s3CollarSplit.x, points.bottom.y),
    })
    snippets.buttonhole = new Snippet('buttonhole-start', points.button.shift(0, 25))
      .attr('data-rotate', '90')
      .attr('data-scale', '2.5')
    snippets.button = new Snippet(
      'button',
      paths.buttonBase.shiftFractionAlong(0.146).shift(0, 30)
    ).attr('data-scale', '3.3')

    if (sa) {
      paths.sa = paths.hemBase
        .offset(3 * sa)
        .join(paths.saBase.offset(sa))
        .join(paths.buttonBase.offset(3 * sa))
      paths.sa = paths.sa.line(paths.sa.start()).close().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) sharedDimensions(part, 'front')

  return part
}

export const front = {
  name: 'yuri.front',
  from: {
    ...brianFront,
    options: {
      ...brianFront.options,
      // Overrides
      collarEase: { pct: 20, min: 10, max: 30 },
      cuffEase: { pct: 30, min: 20, max: 60 },
      lengthBonus: { pct: 10, min: 5, max: 15 },
      sleeveLengthBonus: { pct: 1, min: 0, max: 10 },
    },
  },
  hide: hidePresets.HIDE_TREE,
  options: {
    hipsEase: { pct: 0, min: 0, max: 10 },
  },
  measurements: ['hips', 'hpsToBust'],
  draft: yuriFront,
}
